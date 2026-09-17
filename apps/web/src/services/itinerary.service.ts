import { db, customItineraries, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { notifyTelegram } from "@/lib/telegram";
import { logger } from "@/lib/logger";

export interface ItineraryCustomerInput {
  fullName: string;
  email: string;
  phone: string;
  notes?: string | null;
}

export interface CreateCustomItineraryInput {
  durationDays?: number | string;
  arrivalDate?: string;
  adults?: number | string;
  children?: number | string;
  destinations?: string[];
  hotelTier?: string;
  vehicleClass?: string;
  estimatedPriceUSD?: number | string;
  currency?: string;
  customer: ItineraryCustomerInput;
  clientIp?: string | null;
}

export interface UpdateItineraryInput {
  id: string;
  status?: string;
  adminNotes?: string;
  adminEmail: string;
}

export function generateItineraryReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `ITN-${year}-${random}`;
}

export class ItineraryService {
  /**
   * Validate customer inquiry inputs
   */
  validateInquiry(input: CreateCustomItineraryInput): { valid: boolean; error?: string } {
    const travelerName = input.customer?.fullName?.trim();
    const email = input.customer?.email?.trim();
    const phoneNumber = input.customer?.phone?.trim();

    if (!travelerName || !email || !phoneNumber) {
      return {
        valid: false,
        error: "Traveler full name, email, and phone number are required.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Please enter a valid email address." };
    }

    return { valid: true };
  }

  /**
   * Create a new custom bespoke itinerary inquiry
   */
  async createCustomItinerary(input: CreateCustomItineraryInput) {
    const validation = this.validateInquiry(input);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const travelerName = input.customer.fullName.trim();
    const email = input.customer.email.trim().toLowerCase();
    const phoneNumber = input.customer.phone.trim();

    const duration = Math.max(1, Math.min(30, Number(input.durationDays) || 5));
    const adultCount = Math.max(1, Math.min(50, Number(input.adults) || 2));
    const childCount = Math.max(0, Math.min(20, Number(input.children) || 0));
    const priceUsd = Math.max(0, parseFloat(String(input.estimatedPriceUSD)) || 0);

    const arrivalDateStr: string =
      (typeof input.arrivalDate === "string" && input.arrivalDate.length >= 10
        ? input.arrivalDate.split("T")[0]
        : new Date().toISOString().split("T")[0]) || new Date().toISOString().slice(0, 10);

    const referenceCode = generateItineraryReference();

    const selectedDests: string[] =
      Array.isArray(input.destinations) && input.destinations.length > 0
        ? input.destinations
        : ["Baku Old City & Modern Marvels"];

    const hotelTier = input.hotelTier || "4-Star Comfort";
    const vehicleClass = input.vehicleClass || "Mercedes VIP Van";
    const currency = input.currency || "USD";

    // Insert into Neon PostgreSQL database & Audit Log atomically
    const created = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(customItineraries)
        .values({
          referenceCode,
          travelerName,
          email,
          phoneNumber,
          durationDays: duration,
          arrivalDate: arrivalDateStr,
          adults: adultCount,
          children: childCount,
          hotelTier,
          vehicleClass,
          destinations: selectedDests,
          estimatedPriceUsd: String(priceUsd.toFixed(2)),
          currency,
          specialRequests: input.customer.notes || null,
          status: "pending",
        })
        .returning();

      if (inserted) {
        await recordAuditLog({
          entityType: "tour",
          entityId: inserted.referenceCode,
          action: "custom_itinerary_created",
          actorRole: "customer",
          metadata: {
            referenceCode: inserted.referenceCode,
            travelerName,
            email,
            durationDays: duration,
            arrivalDate: arrivalDateStr,
            estimatedPriceUSD: priceUsd,
            clientIp: input.clientIp,
          },
        });
      }

      return inserted;
    });

    if (created) {
      logger.info(`New custom itinerary inquiry saved: ${created.referenceCode}`, {
        referenceCode: created.referenceCode,
        travelerName,
        priceUsd,
      });
    }

    // Asynchronously dispatch VIP concierge Telegram alert
    const summaryText = `🗺️ *NEW BESPOKE ITINERARY INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Ref Code:* \`${created?.referenceCode || referenceCode}\`
👤 *Traveler:* ${travelerName}
📱 *Phone/WA:* \`${phoneNumber}\`
✉️ *Email:* ${email}
🏨 *Hotel Tier:* ${hotelTier}
🚗 *Vehicle:* ${vehicleClass}
📅 *Duration:* ${duration} Days (${arrivalDateStr})
👥 *Party:* ${adultCount} Adults${childCount > 0 ? `, ${childCount} Children` : ""}
📍 *Destinations Selected:*
${selectedDests.map((d: string) => `  • ${d}`).join("\n")}
💰 *Estimated Budget:* ~$${priceUsd} USD (${currency})
📝 *Special Requests:* ${input.customer.notes || "None"}
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    notifyTelegram(summaryText).catch((err) => {
      logger.warn("Telegram notification failed for custom itinerary", { err: err?.message });
    });

    return {
      referenceCode: created?.referenceCode || referenceCode,
      itinerary: created,
    };
  }

  /**
   * Admin: List all custom itineraries
   */
  async listItineraries() {
    return db.select().from(customItineraries).orderBy(desc(customItineraries.createdAt));
  }

  /**
   * Admin: Update custom itinerary status or notes with audit logging
   */
  async updateItinerary(input: UpdateItineraryInput) {
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.status !== undefined) updateData.status = input.status;
    if (input.adminNotes !== undefined) updateData.adminNotes = input.adminNotes;

    const [updated] = await db
      .update(customItineraries)
      .set(updateData)
      .where(eq(customItineraries.id, input.id))
      .returning();

    if (updated) {
      await recordAuditLog({
        entityType: "tour",
        entityId: updated.referenceCode,
        action: input.status ? `custom_itinerary.status_${input.status}` : "custom_itinerary.updated",
        actorEmail: input.adminEmail,
        actorRole: "admin",
        metadata: {
          status: input.status,
          adminNotes: input.adminNotes,
        },
      });

      logger.info(`Custom itinerary updated: ${updated.referenceCode}`, {
        referenceCode: updated.referenceCode,
        status: updated.status,
      });
    }

    return updated;
  }
}

export const itineraryService = new ItineraryService();
