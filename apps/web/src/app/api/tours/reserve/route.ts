import { NextResponse } from "next/server";
import { db, tourReservations, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/tours/reserve" });

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
    const body = await req.json();
    const { tourId, tourTitle, tourDate, guests, travelerName, phoneNumber, price } = body;

    if (!tourId || !tourTitle || !tourDate || !travelerName || !phoneNumber || !price) {
      return NextResponse.json(
        { error: "Missing required booking details." },
        { status: 400 }
      );
    }

    const reservationNumber = generateReservationNumber();

    const [created] = await db
      .insert(tourReservations)
      .values({
        reservationNumber,
        tourId: String(tourId),
        tourTitle: String(tourTitle),
        tourDate: new Date(tourDate) as any,
        guests: Number(guests) || 1,
        travelerName: String(travelerName).trim(),
        phoneNumber: String(phoneNumber).trim(),
        price: String(price),
        status: "pending",
      })
      .returning();

    if (created) {
      await recordAuditLog({
        entityType: "tour",
        entityId: created.reservationNumber,
        action: "reservation_created",
        actorRole: "customer",
        metadata: {
          tourTitle,
          tourDate,
          guests,
          travelerName,
          phoneNumber,
          price,
        },
      });

      log.info(`New tour reservation created: ${created.reservationNumber}`, {
        reservationNumber: created.reservationNumber,
        tourTitle,
        travelerName,
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
