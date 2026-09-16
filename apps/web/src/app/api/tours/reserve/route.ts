import { NextResponse } from "next/server";
import { db, tourReservations, packages, recordAuditLog } from "@travel/db";
import { desc, eq, or } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const log = logger.withContext({ route: "/api/tours/reserve" });

// Known static catalog fallback prices (USD) when database packages are offline/syncing
const STATIC_CATALOG_PRICES: Record<string, number> = {
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

function generateReservationNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TR-${random}`;
}

export async function POST(req: Request) {
  try {
    // 1. Rate limiting: 10 requests per minute per IP
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`tour_reserve_${clientIp}`, {
      limit: 10,
      windowMs: 60 * 1000,
    });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many reservation requests. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const { tourId, tourTitle, tourDate, guests, travelerName, phoneNumber, price } = body;

    if (!tourId || !tourTitle || !tourDate || !travelerName || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required booking details." },
        { status: 400 }
      );
    }

    const guestCount = Math.max(1, Math.min(50, Number(guests) || 1));

    // 2. Server-Side Price Verification: Never trust client-supplied price
    let trustedUnitPrice: number | null = null;

    // Check if tourId is a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(tourId));

    if (isUuid) {
      const dbPackage = await db.query.packages.findFirst({
        where: eq(packages.id, String(tourId)),
      });
      if (dbPackage) {
        trustedUnitPrice = dbPackage.promoPrice && parseFloat(dbPackage.promoPrice) > 0
          ? parseFloat(dbPackage.promoPrice)
          : parseFloat(dbPackage.basePrice);
      }
    }

    // If not found by UUID, try matching by title or static catalog map
    if (trustedUnitPrice === null) {
      const dbPackageByTitle = await db.query.packages.findFirst({
        where: eq(packages.title, String(tourTitle).trim()),
      });
      if (dbPackageByTitle) {
        trustedUnitPrice = dbPackageByTitle.promoPrice && parseFloat(dbPackageByTitle.promoPrice) > 0
          ? parseFloat(dbPackageByTitle.promoPrice)
          : parseFloat(dbPackageByTitle.basePrice);
      }
    }

    if (trustedUnitPrice === null) {
      const key = String(tourId).trim().toLowerCase();
      if (STATIC_CATALOG_PRICES[key] !== undefined) {
        trustedUnitPrice = STATIC_CATALOG_PRICES[key];
      }
    }

    if (trustedUnitPrice === null) {
      return NextResponse.json(
        { error: "Invalid tour selection or catalog entry not found." },
        { status: 400 }
      );
    }

    // Verify client-submitted price against server price to detect tampering
    const submittedPrice = parseFloat(String(price));
    if (isNaN(submittedPrice) || Math.abs(submittedPrice - trustedUnitPrice) > 0.01) {
      log.warn("Tour reservation price tampering detected", {
        tourId,
        tourTitle,
        submittedPrice,
        trustedUnitPrice,
        clientIp,
      });
      return NextResponse.json(
        { error: "Tour pricing mismatch. Please refresh the page to view current rates." },
        { status: 400 }
      );
    }

    const reservationNumber = generateReservationNumber();

    const tourDateStr: string =
      (typeof tourDate === "string"
        ? tourDate.split("T")[0]
        : new Date(tourDate).toISOString().split("T")[0]) || new Date().toISOString().slice(0, 10);

    const created = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(tourReservations)
        .values({
          reservationNumber,
          tourId: String(tourId),
          tourTitle: String(tourTitle),
          tourDate: tourDateStr,
          guests: guestCount,
          travelerName: String(travelerName).trim(),
          phoneNumber: String(phoneNumber).trim(),
          price: String(trustedUnitPrice!.toFixed(2)),
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
            tourTitle,
            tourDate,
            guests: guestCount,
            travelerName,
            phoneNumber,
            verifiedPrice: trustedUnitPrice,
            clientIp,
          },
        });
      }

      return inserted;
    });

    if (created) {
      log.info(`New tour reservation created: ${created.reservationNumber}`, {
        reservationNumber: created.reservationNumber,
        tourTitle,
        travelerName,
        verifiedPrice: trustedUnitPrice,
      });
    }

    return NextResponse.json({
      success: true,
      reservationNumber: created?.reservationNumber ?? reservationNumber,
      reservation: created,
    });
  } catch (error: any) {
    log.error("Failed to create tour reservation", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create tour reservation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(tourReservations)
      .orderBy(desc(tourReservations.createdAt));

    return NextResponse.json({ reservations: list });
  } catch (error: any) {
    log.error("Failed to fetch tour reservations", error);
    return NextResponse.json(
      { error: "Failed to fetch tour reservations" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, guideName, guidePhone, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Reservation ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (guideName !== undefined) updateData.guideName = guideName;
    if (guidePhone !== undefined) updateData.guidePhone = guidePhone;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const [updated] = await db
      .update(tourReservations)
      .set(updateData)
      .where(eq(tourReservations.id, id))
      .returning();

    if (updated) {
      await recordAuditLog({
        entityType: "tour",
        entityId: updated.reservationNumber,
        action: status ? `reservation.status_${status}` : "reservation.updated",
        actorEmail: admin.email,
        actorRole: "admin",
        metadata: {
          status,
          guideName,
          guidePhone,
          adminNotes,
        },
      });

      log.info(`Tour reservation updated: ${updated.reservationNumber}`, {
        reservationNumber: updated.reservationNumber,
        status: updated.status,
      });
    }

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error: any) {
    log.error("Admin tour reservation update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update tour reservation" },
      { status: 500 }
    );
  }
}
