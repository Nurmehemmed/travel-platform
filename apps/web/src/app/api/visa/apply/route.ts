import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { sendTelegramVisaAlert } from "@/lib/telegram";
import { validatePassportValidity } from "@/lib/visa-countries";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting: max 10 applications per 10 minutes per IP
    const ip = getClientIp(req);
    const rl = checkRateLimit(`visa_apply_${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many visa application requests from your connection. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      nationality,
      passportType = "Ordinary passport",
      visaType = "standard",
      arrivalDate,
      purposeOfVisit = "Tourism",
      stayAddress,
      surname,
      givenNames,
      gender,
      birthDate,
      birthCountry,
      birthPlace,
      occupation,
      phoneNumber,
      email,
      residentialAddress,
      passportNumber,
      passportIssueDate,
      passportExpiryDate,
      passportScanUrl,
      photoUrl,
    } = body;

    // 2. Payload size guard (max 7MB for passport scan)
    if (passportScanUrl && typeof passportScanUrl === "string" && passportScanUrl.length > 7 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Passport image file is too large. Maximum size is 5MB." },
        { status: 413 }
      );
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address for visa delivery." },
        { status: 400 }
      );
    }

    // Required fields validation
    if (
      !nationality ||
      !arrivalDate ||
      !stayAddress ||
      !surname ||
      !givenNames ||
      !gender ||
      !birthDate ||
      !birthCountry ||
      !birthPlace ||
      !occupation ||
      !phoneNumber ||
      !email ||
      !residentialAddress ||
      !passportNumber ||
      !passportIssueDate ||
      !passportExpiryDate
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields accurately as shown on your passport." },
        { status: 400 }
      );
    }

    // Passport validity check (minimum 3 months beyond arrival)
    const validityCheck = validatePassportValidity(arrivalDate, passportExpiryDate);
    if (!validityCheck.valid) {
      return NextResponse.json({ error: validityCheck.message }, { status: 400 });
    }

    // Nationality & ASAN Visa eligibility check
    const { getCountryEligibility } = await import("@/lib/visa-countries");
    const countryInfo = getCountryEligibility(nationality);
    if (countryInfo.category === "visa_free") {
      return NextResponse.json(
        { error: `Citizens of ${countryInfo.name} enter Azerbaijan visa-free. You do not need to apply for an e-Visa.` },
        { status: 400 }
      );
    }
    if (countryInfo.category === "embassy_required") {
      return NextResponse.json(
        { error: `Citizens of ${countryInfo.name} are not eligible for an ASAN e-Visa under Azerbaijani immigration law. An application must be submitted directly to an Embassy or Consulate of the Republic of Azerbaijan.` },
        { status: 400 }
      );
    }

    // Pricing calculation
    const isUrgent = visaType === "urgent";
    const govFee = isUrgent ? "61.00" : "26.00";
    const serviceFee = isUrgent ? "49.00" : "33.00";
    const totalAmount = isUrgent ? "110.00" : "59.00";

    // Generate unique application number (e.g., AZV-784219)
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const applicationNumber = `AZV-${randomCode}`;

    // Generate Payriff payment session
    const { createPayriffOrder } = await import("@/lib/payriff");
    const payriffOrder = await createPayriffOrder({
      applicationNumber,
      amount: Number(totalAmount),
      currency: "USD",
      description: `Azerbaijan e-Visa ${isUrgent ? "Urgent" : "Standard"} (${applicationNumber})`,
      email,
    });

    const [inserted] = await db
      .insert(visaApplications)
      .values({
        applicationNumber,
        visaType: isUrgent ? "urgent" : "standard",
        status: "received",
        nationality,
        passportType,
        arrivalDate,
        purposeOfVisit,
        stayAddress,
        surname: surname.trim().toUpperCase(),
        givenNames: givenNames.trim().toUpperCase(),
        gender,
        birthDate,
        birthCountry,
        birthPlace,
        occupation,
        phoneNumber,
        email: email.trim().toLowerCase(),
        residentialAddress,
        passportNumber: passportNumber.trim().toUpperCase(),
        passportIssueDate,
        passportExpiryDate,
        passportScanUrl: passportScanUrl || null,
        photoUrl: photoUrl || null,
        govFee,
        serviceFee,
        totalAmount,
        paymentStatus: "pending_payment",
        adminNotes: `Payriff Order ID: ${payriffOrder.orderId}`,
      })
      .returning();

    return NextResponse.json({
      success: true,
      applicationNumber,
      applicationId: inserted?.id,
      paymentUrl: payriffOrder.paymentUrl,
      isMockPayment: payriffOrder.isMock,
      message: "Application initiated. Redirecting to payment...",
    });
  } catch (error: any) {
    console.error("[visa apply error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit visa application. Please try again." },
      { status: 500 }
    );
  }
}
