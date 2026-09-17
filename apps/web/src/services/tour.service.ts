import { db, tourReservations, packages, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

export interface CreateTourReservationInput {
  tourId: string;
  tourTitle: string;
  tourDate: string;
  guests?: number | string;
  travelerName: string;
  phoneNumber: string;
  price: number | string;
  clientIp?: string | null;
}

export interface UpdateTourReservationInput {
  id: string;
  status?: string;
  guideName?: string;
  guidePhone?: string;
  adminNotes?: string;
  adminEmail: string;
}

// Known static catalog fallback prices (USD) when database packages are offline/syncing
export const STATIC_CATALOG_PRICES: Record<string, number> = {
  t1: 25,
  t2: 65,
  t3: 149,
  t4: 35,
  t5: 55,
  t6: 85,
  "baku-old-city-walking-tour": 25,
  "absheron-peninsula-day-trip": 65,
  "sheki-cultural-journey": 149,
  "modern-baku-architecture-tour": 35,
  "gobustan-petroglyphs-mud-volcanoes": 55,
  "caucasus-mountain-highlands": 85,
};

export function generateReservationNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TR-${random}`;
}

export class TourService {
  /**
   * Look up trusted unit price from DB or static fallback catalog
   */
  async verifyTourPrice(tourId: string, tourTitle: string): Promise<number | null> {
    const key = String(tourId).trim().toLowerCase();
    if (STATIC_CATALOG_PRICES[key] !== undefined) {
      return STATIC_CATALOG_PRICES[key];
    }

    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(tourId));

      if (isUuid) {
        const dbPackage = await db.query.packages.findFirst({
          where: eq(packages.id, String(tourId)),
        });
        if (dbPackage) {
          return dbPackage.promoPrice && parseFloat(dbPackage.promoPrice) > 0
            ? parseFloat(dbPackage.promoPrice)
            : parseFloat(dbPackage.basePrice);
        }
      }

      const dbPackageByTitle = await db.query.packages.findFirst({
        where: eq(packages.title, String(tourTitle).trim()),
      });
      if (dbPackageByTitle) {
        return dbPackageByTitle.promoPrice && parseFloat(dbPackageByTitle.promoPrice) > 0
          ? parseFloat(dbPackageByTitle.promoPrice)
          : parseFloat(dbPackageByTitle.basePrice);
      }
    } catch {
      // Database connection fallback during testing or offline catalog state
    }

    // Normalized title slug check
    const titleKey = tourTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (STATIC_CATALOG_PRICES[titleKey] !== undefined) {
      return STATIC_CATALOG_PRICES[titleKey];
    }

    return null;
  }

  /**
   * Validate reservation fields and verify price tampering
   */
  async validateReservation(input: CreateTourReservationInput): Promise<{
    valid: boolean;
    error?: string;
    trustedUnitPrice?: number;
  }> {
    const { tourId, tourTitle, tourDate, travelerName, phoneNumber, price } = input;

    if (!tourId || !tourTitle || !tourDate || !travelerName || !phoneNumber) {
      return { valid: false, error: "Missing required booking details." };
    }

    const trustedUnitPrice = await this.verifyTourPrice(tourId, tourTitle);
    if (trustedUnitPrice === null) {
      return { valid: false, error: "Invalid tour selection or catalog entry not found." };
    }

    const submittedPrice = parseFloat(String(price));
    if (isNaN(submittedPrice) || Math.abs(submittedPrice - trustedUnitPrice) > 0.01) {
      logger.warn("Tour reservation price tampering detected", {
        tourId,
        tourTitle,
        submittedPrice,
        trustedUnitPrice,
        clientIp: input.clientIp,
      });
      return {
        valid: false,
        error: "Tour pricing mismatch. Please refresh the page to view current rates.",
      };
    }

    return { valid: true, trustedUnitPrice };
  }

  /**
   * Create a new tour reservation with server-side pricing verification and audit logging
   */
  async createReservation(input: CreateTourReservationInput) {
    const validation = await this.validateReservation(input);
    if (!validation.valid || validation.trustedUnitPrice === undefined) {
      throw new Error(validation.error);
    }

    const guestCount = Math.max(1, Math.min(50, Number(input.guests) || 1));
    const reservationNumber = generateReservationNumber();

    const tourDateStr: string =
      (typeof input.tourDate === "string"
        ? input.tourDate.split("T")[0]
        : new Date(input.tourDate).toISOString().split("T")[0]) || new Date().toISOString().slice(0, 10);

    const created = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(tourReservations)
        .values({
          reservationNumber,
          tourId: String(input.tourId),
          tourTitle: String(input.tourTitle),
          tourDate: tourDateStr,
          guests: guestCount,
          travelerName: String(input.travelerName).trim(),
          phoneNumber: String(input.phoneNumber).trim(),
          price: String(validation.trustedUnitPrice!.toFixed(2)),
          status: "pending",
        })
        .returning();

      if (inserted) {
        await recordAuditLog({
          entityType: "tour",
          entityId: inserted.reservationNumber,
          action: "reservation_created",
          actorRole: "customer",
          metadata: {
            tourTitle: input.tourTitle,
            tourDate: input.tourDate,
            guests: guestCount,
            travelerName: input.travelerName,
            phoneNumber: input.phoneNumber,
            verifiedPrice: validation.trustedUnitPrice,
            clientIp: input.clientIp,
          },
        });
      }

      return inserted;
    });

    if (created) {
      logger.info(`New tour reservation created: ${created.reservationNumber}`, {
        reservationNumber: created.reservationNumber,
        tourTitle: input.tourTitle,
        travelerName: input.travelerName,
        verifiedPrice: validation.trustedUnitPrice,
      });
    }

    return {
      reservationNumber: created?.reservationNumber ?? reservationNumber,
      reservation: created,
    };
  }

  /**
   * Admin: List all tour reservations
   */
  async listReservations() {
    return db.select().from(tourReservations).orderBy(desc(tourReservations.createdAt));
  }

  /**
   * Admin: Update tour reservation status or guide assignments
   */
  async updateReservation(input: UpdateTourReservationInput) {
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.status !== undefined) updateData.status = input.status;
    if (input.guideName !== undefined) updateData.guideName = input.guideName;
    if (input.guidePhone !== undefined) updateData.guidePhone = input.guidePhone;
    if (input.adminNotes !== undefined) updateData.adminNotes = input.adminNotes;

    const [updated] = await db
      .update(tourReservations)
      .set(updateData)
      .where(eq(tourReservations.id, input.id))
      .returning();

    if (updated) {
      await recordAuditLog({
        entityType: "tour",
        entityId: updated.reservationNumber,
        action: input.status ? `reservation.status_${input.status}` : "reservation.updated",
        actorEmail: input.adminEmail,
        actorRole: "admin",
        metadata: {
          status: input.status,
          guideName: input.guideName,
          guidePhone: input.guidePhone,
          adminNotes: input.adminNotes,
        },
      });

      logger.info(`Tour reservation updated: ${updated.reservationNumber}`, {
        reservationNumber: updated.reservationNumber,
        status: updated.status,
      });
    }

    return updated;
  }
}

export const tourService = new TourService();
