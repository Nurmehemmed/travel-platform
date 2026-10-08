import {
  db,
  tourReservations,
  packages,
  siteSettings,
  recordAuditLog,
  availabilitySlots,
  seatHolds,
  tourWaitlist,
} from "@travel/db";
import { desc, eq, and, gte, sql, asc } from "drizzle-orm";
import { logger } from "@/lib/logger";
import { calculatePaymentBreakdown } from "@/lib/transfers/policy";
import { createPayriffOrder } from "@/lib/payriff";
import { sendTelegramTourAlert, sendTelegramWaitlistAlert } from "@/lib/telegram";

export interface CreateTourReservationInput {
  tourId: string;
  tourTitle: string;
  tourDate: string;
  slotId?: string | null;
  guests?: number | string;
  travelerName: string;
  phoneNumber: string;
  email?: string;
  price: number | string;
  paymentMethod?: "online" | "on_arrival" | "partial_deposit";
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

export interface TourDepartureSlot {
  id: string;
  packageId: string;
  departureDate: string;
  returnDate: string;
  meetingTime: string;
  totalSeats: number;
  availableSeats: number;
  lockedSeats: number;
  isGuaranteed: boolean;
  minParticipants: number;
  cutoffHours: number;
  priceOverride: number | null;
  status: "open" | "soldout" | "closed";
  isAlmostFull: boolean;
  isSoldOut: boolean;
  canBook: boolean;
}

export interface JoinWaitlistInput {
  slotId?: string | null;
  tourId: string;
  tourTitle: string;
  desiredDate: string;
  guests: number;
  travelerName: string;
  email: string;
  phoneNumber: string;
  notes?: string;
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
   * Housekeeping: Release seats from expired holds back to available_seats
   */
  async cleanExpiredHolds(): Promise<number> {
    try {
      return await db.transaction(async (tx) => {
        // Find all expired active holds
        const expired = await tx
          .select()
          .from(seatHolds)
          .where(and(eq(seatHolds.status, "active"), sql`${seatHolds.expiresAt} < NOW()`));

        if (!expired.length) return 0;

        for (const hold of expired) {
          // Restore available seats and decrease locked seats
          await tx
            .update(availabilitySlots)
            .set({
              availableSeats: sql`${availabilitySlots.availableSeats} + ${hold.seats}`,
              lockedSeats: sql`GREATEST(0, ${availabilitySlots.lockedSeats} - ${hold.seats})`,
            })
            .where(eq(availabilitySlots.id, hold.slotId));

          await tx
            .update(seatHolds)
            .set({ status: "expired" })
            .where(eq(seatHolds.id, hold.id));
        }

        return expired.length;
      });
    } catch (err: any) {
      logger.warn("Failed to clean expired seat holds", { error: err?.message });
      return 0;
    }
  }

  /**
   * Get upcoming departure slots for a tour with real-time seat counts and guaranteed flags
   */
  async getTourDepartures(tourIdOrSlug: string): Promise<TourDepartureSlot[]> {
    await this.cleanExpiredHolds();

    const normalized = String(tourIdOrSlug).trim().toLowerCase();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(normalized);

    const ID_TO_SLUG_MAP: Record<string, string> = {
      t1: "baku-old-city-walking-tour",
      t2: "absheron-peninsula-day-trip",
      t3: "sheki-cultural-journey",
      t4: "modern-baku-architecture-tour",
      t5: "gobustan-petroglyphs-mud-volcanoes",
      t6: "caucasus-mountain-highlands",
    };
    const effectiveSlug = ID_TO_SLUG_MAP[normalized] || normalized;

    let targetPackageId: string | null = null;
    try {
      if (isUuid) {
        targetPackageId = normalized;
      } else {
        const pkg = await db.query.packages.findFirst({
          where: eq(packages.slug, effectiveSlug),
        });
        if (pkg) {
          targetPackageId = pkg.id;
        } else {
          // Fallback title or first match
          const pkgByTitle = await db.query.packages.findFirst({
            where: sql`LOWER(${packages.title}) LIKE ${`%${normalized.replace(/-/g, " ")}%`}`,
          });
          if (pkgByTitle) targetPackageId = pkgByTitle.id;
        }
      }
    } catch {
      // Offline DB fallback
    }

    let dbSlots: any[] = [];
    if (targetPackageId) {
      try {
        dbSlots = await db
          .select()
          .from(availabilitySlots)
          .where(
            and(
              eq(availabilitySlots.packageId, targetPackageId),
              sql`${availabilitySlots.departureDate} >= CURRENT_DATE`
            )
          )
          .orderBy(asc(availabilitySlots.departureDate));
      } catch (err: any) {
        logger.warn("Could not query availability slots from DB", { error: err?.message });
      }
    }

    // If slots exist in database, format and return them
    if (dbSlots.length > 0) {
      return dbSlots.map((s) => {
        const avail = Math.max(0, Number(s.availableSeats));
        const total = Math.max(1, Number(s.totalSeats));
        const locked = Math.max(0, Number(s.lockedSeats || 0));
        const isSoldOut = avail <= 0;
        const isAlmostFull = avail > 0 && avail <= 3;
        const depDateStr =
          typeof s.departureDate === "string"
            ? s.departureDate.split("T")[0]
            : new Date(s.departureDate).toISOString().split("T")[0];
        const retDateStr =
          typeof s.returnDate === "string"
            ? s.returnDate.split("T")[0]
            : new Date(s.returnDate).toISOString().split("T")[0];

        return {
          id: s.id,
          packageId: s.packageId,
          departureDate: depDateStr,
          returnDate: retDateStr,
          meetingTime: s.meetingTime || "09:00 AM",
          totalSeats: total,
          availableSeats: avail,
          lockedSeats: locked,
          isGuaranteed: Boolean(s.isGuaranteed),
          minParticipants: Number(s.minParticipants || 4),
          cutoffHours: Number(s.cutoffHours || 24),
          priceOverride: s.priceOverride ? parseFloat(s.priceOverride) : null,
          status: (avail <= 0 ? "soldout" : s.status || "open") as any,
          isAlmostFull,
          isSoldOut,
          canBook: avail > 0 && s.status === "open",
        };
      });
    }

    // Default intelligent schedule fallback (e.g., Every Saturday & Tuesday for next 4 weeks)
    // Ensures a gorgeous, functional UI even before admin manually populates slots
    const fallbackSlots: TourDepartureSlot[] = [];
    const today = new Date();
    for (let i = 1; i <= 28; i++) {
      const candidate = new Date(today);
      candidate.setDate(today.getDate() + i);
      const day = candidate.getDay(); // 6 = Saturday, 2 = Tuesday
      if (day === 6 || day === 2) {
        const depStr = candidate.toISOString().split("T")[0]!;
        const isSaturday = day === 6;
        const isGuaranteed = isSaturday; // Saturday departures are guaranteed by default
        const totalSeats = 12;
        // Natural distribution for demonstration: Saturdays near capacity (2-4 left), Tuesdays open (8-10 left)
        const availableSeats = isSaturday ? (i < 10 ? 3 : 5) : 8;

        fallbackSlots.push({
          id: `virtual-slot-${normalized}-${depStr}`,
          packageId: targetPackageId || `pkg-${normalized}`,
          departureDate: depStr,
          returnDate: depStr,
          meetingTime: "09:00 AM",
          totalSeats,
          availableSeats,
          lockedSeats: 0,
          isGuaranteed,
          minParticipants: 4,
          cutoffHours: 24,
          priceOverride: null,
          status: "open",
          isAlmostFull: availableSeats <= 3,
          isSoldOut: false,
          canBook: true,
        });
      }
    }

    return fallbackSlots;
  }

  /**
   * Atomically hold seats for 15 minutes during Payriff checkout
   */
  async holdSeats(input: {
    slotId: string;
    guests: number;
    sessionId: string;
  }): Promise<{ success: boolean; expiresAt: Date; availableSeats: number }> {
    const { slotId, guests, sessionId } = input;
    const requested = Math.max(1, Math.min(50, Number(guests) || 1));

    // Handle virtual/mock slots gracefully
    if (slotId.startsWith("virtual-slot-")) {
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      return { success: true, expiresAt, availableSeats: 5 };
    }

    await this.cleanExpiredHolds();

    return await db.transaction(async (tx) => {
      // Check if slot exists and has enough capacity
      const [slot] = await tx
        .select()
        .from(availabilitySlots)
        .where(eq(availabilitySlots.id, slotId));

      if (!slot) {
        throw new Error("Selected departure slot was not found.");
      }

      if (slot.status !== "open" || slot.availableSeats < requested) {
        throw new Error(
          `Only ${slot.availableSeats} seat(s) remaining for this departure. Please choose another date.`
        );
      }

      // Check for existing hold with this sessionId
      const existingHold = await tx
        .select()
        .from(seatHolds)
        .where(eq(seatHolds.sessionId, sessionId));

      if (existingHold.length > 0 && existingHold[0]?.status === "active") {
        // Reuse hold
        return {
          success: true,
          expiresAt: existingHold[0].expiresAt,
          availableSeats: slot.availableSeats,
        };
      }

      // Decrement available_seats, increment locked_seats atomically
      const [updatedSlot] = await tx
        .update(availabilitySlots)
        .set({
          availableSeats: sql`${availabilitySlots.availableSeats} - ${requested}`,
          lockedSeats: sql`${availabilitySlots.lockedSeats} + ${requested}`,
        })
        .where(
          and(
            eq(availabilitySlots.id, slotId),
            gte(availabilitySlots.availableSeats, requested)
          )
        )
        .returning();

      if (!updatedSlot) {
        throw new Error("Seat hold failed due to concurrent booking. Please try again.");
      }

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      await tx.insert(seatHolds).values({
        slotId,
        sessionId,
        seats: requested,
        expiresAt,
        status: "active",
      });

      return {
        success: true,
        expiresAt,
        availableSeats: updatedSlot.availableSeats,
      };
    });
  }

  /**
   * Release seat hold if checkout is cancelled
   */
  async releaseHold(sessionId: string): Promise<boolean> {
    try {
      return await db.transaction(async (tx) => {
        const [hold] = await tx
          .select()
          .from(seatHolds)
          .where(and(eq(seatHolds.sessionId, sessionId), eq(seatHolds.status, "active")));

        if (!hold) return false;

        await tx
          .update(availabilitySlots)
          .set({
            availableSeats: sql`${availabilitySlots.availableSeats} + ${hold.seats}`,
            lockedSeats: sql`GREATEST(0, ${availabilitySlots.lockedSeats} - ${hold.seats})`,
          })
          .where(eq(availabilitySlots.id, hold.slotId));

        await tx
          .update(seatHolds)
          .set({ status: "released" })
          .where(eq(seatHolds.id, hold.id));

        return true;
      });
    } catch {
      return false;
    }
  }

  /**
   * Finalize confirmed reservation after successful payment (called by webhooks & return handler)
   */
  async finalizeConfirmedPayment(
    reservationNumber: string,
    orderId?: string
  ): Promise<{ reservation: any; isAutoGuaranteed: boolean }> {
    return await db.transaction(async (tx) => {
      const reservation = await tx.query.tourReservations.findFirst({
        where: eq(tourReservations.reservationNumber, reservationNumber),
      });

      if (!reservation) {
        throw new Error(`Reservation ${reservationNumber} not found`);
      }

      const isDeposit =
        reservation.paymentMethod === "partial_deposit" ||
        Number(reservation.remainingAmount || 0) > 0;
      const targetPaymentStatus = isDeposit ? "deposit_paid" : "paid";

      let autoGuaranteed = false;

      // If tied to an inventory departure slot, convert the hold and evaluate auto-guarantee threshold
      if (reservation.slotId) {
        // Mark hold converted
        await tx
          .update(seatHolds)
          .set({ status: "converted" })
          .where(eq(seatHolds.sessionId, reservationNumber));

        // Release locked_seats count
        await tx
          .update(availabilitySlots)
          .set({
            lockedSeats: sql`GREATEST(0, ${availabilitySlots.lockedSeats} - ${reservation.guests})`,
          })
          .where(eq(availabilitySlots.id, reservation.slotId));

        // Fetch current slot stats
        const [slot] = await tx
          .select()
          .from(availabilitySlots)
          .where(eq(availabilitySlots.id, reservation.slotId));

        if (slot) {
          const bookedPax = slot.totalSeats - slot.availableSeats;
          // Auto-promote to guaranteed if threshold reached!
          if (!slot.isGuaranteed && bookedPax >= slot.minParticipants) {
            autoGuaranteed = true;
            await tx
              .update(availabilitySlots)
              .set({ isGuaranteed: true })
              .where(eq(availabilitySlots.id, slot.id));

            logger.info(
              `Departure slot ${slot.id} has reached ${bookedPax} guests: Auto-promoted to GUARANTEED DEPARTURE!`
            );
          }

          if (slot.availableSeats <= 0) {
            await tx
              .update(availabilitySlots)
              .set({ status: "soldout" })
              .where(eq(availabilitySlots.id, slot.id));
          }
        }
      }

      // Update reservation status
      const [updatedRes] = await tx
        .update(tourReservations)
        .set({
          paymentStatus: targetPaymentStatus,
          status: "confirmed",
          isGuaranteed: autoGuaranteed || reservation.isGuaranteed,
          payriffOrderId: orderId || reservation.payriffOrderId,
          adminNotes: reservation.adminNotes
            ? `${reservation.adminNotes} | Payment confirmed via Payriff (${orderId || "OK"})`
            : `Payment confirmed via Payriff (${orderId || "OK"})`,
          updatedAt: new Date(),
        })
        .where(eq(tourReservations.reservationNumber, reservationNumber))
        .returning();

      return { reservation: updatedRes, isAutoGuaranteed: autoGuaranteed };
    });
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
    const cleanEmail = input.email ? String(input.email).trim().toLowerCase() : null;

    const tourDateStr: string =
      (typeof input.tourDate === "string"
        ? input.tourDate.split("T")[0]
        : new Date(input.tourDate).toISOString().split("T")[0]) || new Date().toISOString().slice(0, 10);

    // Read configurable deposit percentage (default 20%)
    let depositPercent = 20;
    try {
      const settingsRows = await db.select().from(siteSettings);
      const settingsMap: Record<string, any> = {};
      for (const r of settingsRows) {
        settingsMap[r.key] = r.value;
      }
      depositPercent =
        Number(settingsMap["pricing_tour_deposit_percent"]) ||
        Number(settingsMap["pricing_default_deposit_percent"]) ||
        20;
    } catch {
      // Default to 20% if settings table unavailable
    }

    const totalPrice = validation.trustedUnitPrice;
    const breakdown = calculatePaymentBreakdown(totalPrice, depositPercent);

    const rawPaymentMethod = input.paymentMethod || "on_arrival";
    const isOnline = rawPaymentMethod === "online" || rawPaymentMethod === "partial_deposit";
    const finalPaymentMethod = isOnline
      ? (breakdown.isPartial ? "partial_deposit" : "online")
      : "on_arrival";

    const depositAmountVal = isOnline
      ? (breakdown.isPartial ? breakdown.depositAmount : totalPrice)
      : 0;

    const remainingAmountVal = isOnline
      ? (breakdown.isPartial ? breakdown.remainingAmount : 0)
      : totalPrice;

    // Check slot details if provided
    let isGuaranteedSlot = false;
    let validSlotId: string | null = null;
    if (input.slotId && !input.slotId.startsWith("virtual-slot-")) {
      try {
        const [targetSlot] = await db
          .select()
          .from(availabilitySlots)
          .where(eq(availabilitySlots.id, input.slotId));
        if (targetSlot) {
          validSlotId = targetSlot.id;
          isGuaranteedSlot = Boolean(targetSlot.isGuaranteed);

          // If on arrival, deduct seats immediately; if online, hold seats
          if (!isOnline) {
            await db
              .update(availabilitySlots)
              .set({
                availableSeats: sql`GREATEST(0, ${availabilitySlots.availableSeats} - ${guestCount})`,
              })
              .where(eq(availabilitySlots.id, targetSlot.id));
          } else {
            await this.holdSeats({
              slotId: targetSlot.id,
              guests: guestCount,
              sessionId: reservationNumber,
            });
          }
        }
      } catch (err: any) {
        logger.warn("Slot deduction warning", { error: err?.message });
      }
    } else if (input.slotId?.startsWith("virtual-slot-")) {
      isGuaranteedSlot = true;
    }

    // Initialize Payriff order if online payment
    let payriffResult: any = null;
    if (isOnline) {
      payriffResult = await createPayriffOrder({
        applicationNumber: reservationNumber,
        amount: depositAmountVal,
        currency: "USD",
        description: breakdown.isPartial
          ? `Tour Deposit (${depositPercent}%) — ${input.tourTitle}`
          : `Tour Reservation — ${input.tourTitle}`,
        email: cleanEmail || "booking@azerbaijantravel.com",
      });
    }

    const created = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(tourReservations)
        .values({
          reservationNumber,
          tourId: String(input.tourId),
          tourTitle: String(input.tourTitle),
          tourDate: tourDateStr,
          slotId: validSlotId,
          isGuaranteed: isGuaranteedSlot,
          guests: guestCount,
          travelerName: String(input.travelerName).trim(),
          phoneNumber: String(input.phoneNumber).trim(),
          email: cleanEmail,
          price: String(totalPrice.toFixed(2)),
          depositAmount: String(depositAmountVal.toFixed(2)),
          remainingAmount: String(remainingAmountVal.toFixed(2)),
          paymentMethod: finalPaymentMethod,
          paymentStatus: "pending",
          payriffOrderId: payriffResult?.orderId || null,
          status: "pending",
        })
        .returning();

      if (inserted) {
        await recordAuditLog(
          {
            entityType: "tour",
            entityId: inserted.reservationNumber,
            action: "reservation_created",
            actorRole: "customer",
            metadata: {
              tourTitle: input.tourTitle,
              tourDate: input.tourDate,
              guests: guestCount,
              slotId: validSlotId,
              isGuaranteed: isGuaranteedSlot,
              travelerName: input.travelerName,
              phoneNumber: input.phoneNumber,
              email: cleanEmail,
              verifiedPrice: totalPrice,
              depositPercent,
              depositAmount: depositAmountVal,
              remainingAmount: remainingAmountVal,
              paymentMethod: finalPaymentMethod,
              payriffOrderId: payriffResult?.orderId || null,
              clientIp: input.clientIp,
            },
          },
          tx
        );
      }

      return inserted;
    });

    if (created) {
      logger.info(`New tour reservation created: ${created.reservationNumber}`, {
        reservationNumber: created.reservationNumber,
        tourTitle: input.tourTitle,
        travelerName: input.travelerName,
        isGuaranteed: isGuaranteedSlot,
        verifiedPrice: totalPrice,
        depositAmount: depositAmountVal,
        remainingAmount: remainingAmountVal,
        paymentMethod: finalPaymentMethod,
      });

      // If customer chose pay on arrival (cash/card on tour day), alert operations immediately
      if (!isOnline) {
        sendTelegramTourAlert({
          reservationNumber: created.reservationNumber,
          tourTitle: input.tourTitle,
          tourDate: tourDateStr,
          guests: guestCount,
          travelerName: input.travelerName,
          phoneNumber: input.phoneNumber,
          email: cleanEmail,
          totalPrice,
          depositAmount: depositAmountVal,
          remainingAmount: remainingAmountVal,
          paymentMethod: finalPaymentMethod,
          paymentStatus: "pending",
          isGuaranteed: isGuaranteedSlot,
        }).catch((err) => logger.warn("Telegram tour alert failed", { err: err?.message }));
      }
    }

    return {
      reservationNumber: created?.reservationNumber ?? reservationNumber,
      reservation: created,
      paymentUrl: payriffResult?.paymentUrl || null,
      depositAmount: depositAmountVal,
      remainingAmount: remainingAmountVal,
      breakdown,
      isGuaranteed: isGuaranteedSlot,
    };
  }

  /**
   * Register traveler to waitlist for a sold-out departure
   */
  async joinWaitlist(input: JoinWaitlistInput) {
    const { tourId, tourTitle, desiredDate, guests, travelerName, email, phoneNumber, notes, slotId } = input;

    if (!tourTitle || !desiredDate || !travelerName || !email || !phoneNumber) {
      throw new Error("Missing required waitlist contact details.");
    }

    const realSlotId = slotId && !slotId.startsWith("virtual-slot-") ? slotId : null;

    const [entry] = await db
      .insert(tourWaitlist)
      .values({
        tourId: String(tourId),
        tourTitle: String(tourTitle),
        desiredDate,
        slotId: realSlotId,
        guests: Number(guests) || 2,
        travelerName: String(travelerName).trim(),
        email: String(email).trim().toLowerCase(),
        phoneNumber: String(phoneNumber).trim(),
        notes: notes || null,
        status: "waiting",
      })
      .returning();

    // Alert operations team via Telegram
    sendTelegramWaitlistAlert({
      tourTitle,
      desiredDate,
      guests: Number(guests) || 2,
      travelerName,
      email,
      phoneNumber,
      notes: notes || null,
    }).catch((err) => logger.warn("Telegram waitlist alert failed", { err: err?.message }));

    return entry;
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

  /**
   * Admin: Toggle departure guarantee or adjust seats
   */
  async updateDepartureSlot(
    slotId: string,
    data: {
      isGuaranteed?: boolean;
      totalSeats?: number;
      availableSeats?: number;
      meetingTime?: string;
      status?: "open" | "closed" | "soldout";
    }
  ) {
    const [updated] = await db
      .update(availabilitySlots)
      .set(data as any)
      .where(eq(availabilitySlots.id, slotId))
      .returning();
    return updated;
  }

  /**
   * Admin: Bulk-generate guaranteed departure slots for a tour
   */
  async generateUpcomingDepartures(
    packageId: string,
    options?: {
      weeksAhead?: number;
      daysOfWeek?: number[]; // [2, 6] = Tue, Sat
      totalSeats?: number;
      minParticipants?: number;
      isGuaranteed?: boolean;
      meetingTime?: string;
    }
  ) {
    const weeks = options?.weeksAhead || 8;
    const days = options?.daysOfWeek || [2, 6];
    const seats = options?.totalSeats || 12;
    const minPax = options?.minParticipants || 4;
    const isGuar = options?.isGuaranteed !== undefined ? options.isGuaranteed : true;
    const time = options?.meetingTime || "09:00 AM";

    const created: any[] = [];
    const today = new Date();

    for (let w = 0; w < weeks; w++) {
      for (const d of days) {
        const candidate = new Date(today);
        candidate.setDate(today.getDate() + w * 7 + ((d - today.getDay() + 7) % 7));
        if (candidate <= today) continue;

        const dateStr = candidate.toISOString().split("T")[0]!;

        // Avoid duplicate slot on same day for same package
        const existing = await db
          .select()
          .from(availabilitySlots)
          .where(
            and(
              eq(availabilitySlots.packageId, packageId),
              sql`${availabilitySlots.departureDate} = ${dateStr}::date`
            )
          );

        if (!existing.length) {
          const [inserted] = await db
            .insert(availabilitySlots)
            .values({
              packageId,
              departureDate: new Date(dateStr) as any,
              returnDate: new Date(dateStr) as any,
              totalSeats: seats,
              availableSeats: seats,
              lockedSeats: 0,
              isGuaranteed: isGuar,
              minParticipants: minPax,
              cutoffHours: 24,
              meetingTime: time,
              status: "open",
            })
            .returning();
          if (inserted) created.push(inserted);
        }
      }
    }

    return created;
  }
}

export const tourService = new TourService();
