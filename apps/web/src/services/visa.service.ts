import { db, visaApplications, recordAuditLog } from "@travel/db";
import { eq, and, desc } from "drizzle-orm";
import { sendTelegramVisaAlert } from "@/lib/telegram";
import { sendVisaConfirmationEmail } from "@/lib/email";
import { validatePassportValidity, getCountryEligibility } from "@/lib/visa-countries";
import { createPayriffOrder } from "@/lib/payriff";
import { logger } from "@/lib/logger";

export interface CreateVisaApplicationInput {
  nationality: string;
  passportType?: string;
  visaType?: "standard" | "urgent";
  arrivalDate: string;
  purposeOfVisit?: string;
  stayAddress: string;
  surname: string;
  givenNames: string;
  gender: string;
  birthDate: string;
  birthCountry: string;
  birthPlace: string;
  occupation: string;
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportScanUrl?: string | null;
  photoUrl?: string | null;
  clientIp?: string | null;
}

export interface VisaPricing {
  isUrgent: boolean;
  govFee: string;
  serviceFee: string;
  totalAmount: string;
}

export function calculateVisaPricing(visaType?: "standard" | "urgent"): VisaPricing {
  const isUrgent = visaType === "urgent";
  const govFee = isUrgent ? "61.00" : "26.00";
  const serviceFee = isUrgent ? "49.00" : "33.00";
  const totalAmount = isUrgent ? "110.00" : "59.00";

  return {
    isUrgent,
    govFee,
    serviceFee,
    totalAmount,
  };
}

export function generateVisaApplicationNumber(): string {
  const randomCode = Math.floor(100000 + Math.random() * 900000);
  return `AZV-${randomCode}`;
}

export class VisaService {
  /**
   * Validate applicant eligibility and passport rules.
   */
  validateApplication(input: CreateVisaApplicationInput): { valid: boolean; error?: string | undefined } {
    const { nationality, arrivalDate, passportExpiryDate } = input;

    // Passport validity check (minimum 3 months beyond arrival)
    const validityCheck = validatePassportValidity(arrivalDate, passportExpiryDate);
    if (!validityCheck.valid) {
      return { valid: false, error: validityCheck.message ?? "Passport is not valid for travel" };
    }

    // Nationality & ASAN Visa eligibility check
    const countryInfo = getCountryEligibility(nationality);
    if (countryInfo.category === "visa_free") {
      return {
        valid: false,
        error: `Citizens of ${countryInfo.name} enter Azerbaijan visa-free. You do not need to apply for an e-Visa.`,
      };
    }
    if (countryInfo.category === "embassy_required") {
      return {
        valid: false,
        error: `Citizens of ${countryInfo.name} are not eligible for an ASAN e-Visa under Azerbaijani immigration law. An application must be submitted directly to an Embassy or Consulate of the Republic of Azerbaijan.`,
      };
    }

    return { valid: true };
  }

  /**
   * Create a new ASAN e-Visa application, initialize Payriff payment, and dispatch alerts.
   */
  async createApplication(input: CreateVisaApplicationInput) {
    const validation = this.validateApplication(input);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const pricing = calculateVisaPricing(input.visaType);
    const applicationNumber = generateVisaApplicationNumber();

    // Generate Payriff payment session
    const payriffOrder = await createPayriffOrder({
      applicationNumber,
      amount: Number(pricing.totalAmount),
      currency: "USD",
      description: `Azerbaijan e-Visa ${pricing.isUrgent ? "Urgent" : "Standard"} (${applicationNumber})`,
      email: input.email,
    });

    const inserted = await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(visaApplications)
        .values({
          applicationNumber,
          visaType: pricing.isUrgent ? "urgent" : "standard",
          status: "received",
          nationality: input.nationality,
          passportType: input.passportType || "Ordinary passport",
          arrivalDate: input.arrivalDate,
          purposeOfVisit: input.purposeOfVisit || "Tourism",
          stayAddress: input.stayAddress,
          surname: input.surname.trim().toUpperCase(),
          givenNames: input.givenNames.trim().toUpperCase(),
          gender: input.gender,
          birthDate: input.birthDate,
          birthCountry: input.birthCountry,
          birthPlace: input.birthPlace,
          occupation: input.occupation,
          phoneNumber: input.phoneNumber,
          email: input.email.trim().toLowerCase(),
          residentialAddress: input.residentialAddress,
          passportNumber: input.passportNumber.trim().toUpperCase(),
          passportIssueDate: input.passportIssueDate,
          passportExpiryDate: input.passportExpiryDate,
          passportScanUrl: input.passportScanUrl || null,
          photoUrl: input.photoUrl || null,
          govFee: pricing.govFee,
          serviceFee: pricing.serviceFee,
          totalAmount: pricing.totalAmount,
          paymentStatus: "pending_payment",
          adminNotes: `Payriff Order ID: ${payriffOrder.orderId}`,
        })
        .returning();

      if (row) {
        await recordAuditLog({
          entityType: "visa",
          entityId: applicationNumber,
          action: "submitted",
          actorEmail: input.email,
          actorRole: "customer",
          metadata: {
            visaType: pricing.isUrgent ? "urgent" : "standard",
            totalAmount: pricing.totalAmount,
            nationality: input.nationality,
            arrivalDate: input.arrivalDate,
            payriffOrderId: payriffOrder.orderId,
            clientIp: input.clientIp,
          },
        });
      }

      return row;
    });

    logger.info(`Visa application submitted: ${applicationNumber}`, {
      applicationNumber,
      visaType: pricing.isUrgent ? "urgent" : "standard",
      totalAmount: pricing.totalAmount,
      nationality: input.nationality,
    });

    // Asynchronously send customer confirmation email
    sendVisaConfirmationEmail({
      to: input.email.trim().toLowerCase(),
      applicantName: `${input.givenNames.trim()} ${input.surname.trim()}`,
      referenceNumber: applicationNumber,
      visaType: pricing.isUrgent ? "urgent" : "standard",
      arrivalDate: input.arrivalDate,
      totalAmount: Number(pricing.totalAmount),
    }).catch((err) => console.warn("[Non-fatal visa confirmation email error]:", err));

    return {
      applicationNumber,
      applicationId: inserted?.id,
      paymentUrl: payriffOrder.paymentUrl,
      isMockPayment: payriffOrder.isMock,
      inserted,
    };
  }

  /**
   * Look up a visa application by reference and email for public tracking.
   */
  async getByReferenceAndEmail(reference: string, email: string) {
    const whereClause = and(
      eq(visaApplications.applicationNumber, reference.toUpperCase()),
      eq(visaApplications.email, email.toLowerCase())
    );

    const [found] = await db
      .select({
        id: visaApplications.id,
        applicationNumber: visaApplications.applicationNumber,
        visaType: visaApplications.visaType,
        status: visaApplications.status,
        nationality: visaApplications.nationality,
        arrivalDate: visaApplications.arrivalDate,
        surname: visaApplications.surname,
        givenNames: visaApplications.givenNames,
        email: visaApplications.email,
        totalAmount: visaApplications.totalAmount,
        paymentStatus: visaApplications.paymentStatus,
        asanApplicationId: visaApplications.asanApplicationId,
        evisaPdfUrl: visaApplications.evisaPdfUrl,
        createdAt: visaApplications.createdAt,
        updatedAt: visaApplications.updatedAt,
      })
      .from(visaApplications)
      .where(whereClause);

    return found || null;
  }

  /**
   * Admin: List all visa applications
   */
  async listApplications() {
    return db.select().from(visaApplications).orderBy(desc(visaApplications.createdAt));
  }
}

export const visaService = new VisaService();
