import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { tourService } from "@/services/tour.service";

const log = logger.withContext({ route: "/api/tours/reserve" });

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

    const result = await tourService.createReservation({
      ...body,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      reservationNumber: result.reservationNumber,
      reservation: result.reservation,
    });
  } catch (error: any) {
    log.error("Failed to create tour reservation", error);
    const isClientError =
      error?.message?.includes("Missing") ||
      error?.message?.includes("Invalid") ||
      error?.message?.includes("mismatch");

    return NextResponse.json(
      { error: error?.message || "Failed to create tour reservation" },
      { status: isClientError ? 400 : 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await tourService.listReservations();
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

    const updated = await tourService.updateReservation({
      id,
      status,
      guideName,
      guidePhone,
      adminNotes,
      adminEmail: admin.email,
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error: any) {
    log.error("Admin tour reservation update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update tour reservation" },
      { status: 500 }
    );
  }
}
