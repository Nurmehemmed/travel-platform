import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { tourService } from "@/services/tour.service";
import { db, availabilitySlots } from "@travel/db";
import { eq, desc } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("packageId");

    let query = db.select().from(availabilitySlots);
    if (packageId) {
      const slots = await db
        .select()
        .from(availabilitySlots)
        .where(eq(availabilitySlots.packageId, packageId))
        .orderBy(desc(availabilitySlots.departureDate));
      return NextResponse.json({ slots });
    }

    const allSlots = await query.orderBy(desc(availabilitySlots.departureDate));
    return NextResponse.json({ slots: allSlots });
  } catch (error: any) {
    logger.error("Admin departures GET error", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch slots" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, packageId, options } = body;

    if (!packageId) {
      return NextResponse.json({ error: "packageId is required" }, { status: 400 });
    }

    if (action === "bulk_generate") {
      const generated = await tourService.generateUpcomingDepartures(packageId, options);
      return NextResponse.json({
        success: true,
        message: `Generated ${generated.length} upcoming guaranteed departure slots.`,
        slots: generated,
      });
    }

    // Single slot creation
    const { departureDate, returnDate, totalSeats, minParticipants, isGuaranteed, meetingTime } = body;
    const [inserted] = await db
      .insert(availabilitySlots)
      .values({
        packageId,
        departureDate: new Date(departureDate) as any,
        returnDate: new Date(returnDate || departureDate) as any,
        totalSeats: Number(totalSeats) || 12,
        availableSeats: Number(totalSeats) || 12,
        lockedSeats: 0,
        isGuaranteed: Boolean(isGuaranteed),
        minParticipants: Number(minParticipants) || 4,
        meetingTime: meetingTime || "09:00 AM",
        status: "open",
      })
      .returning();

    return NextResponse.json({ success: true, slot: inserted });
  } catch (error: any) {
    logger.error("Admin departures POST error", error);
    return NextResponse.json({ error: error?.message || "Failed to create slot" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slotId, isGuaranteed, totalSeats, availableSeats, meetingTime, status } = body;

    if (!slotId) {
      return NextResponse.json({ error: "slotId is required" }, { status: 400 });
    }

    const updated = await tourService.updateDepartureSlot(slotId, {
      ...(isGuaranteed !== undefined ? { isGuaranteed } : {}),
      ...(totalSeats !== undefined ? { totalSeats: Number(totalSeats) } : {}),
      ...(availableSeats !== undefined ? { availableSeats: Number(availableSeats) } : {}),
      ...(meetingTime !== undefined ? { meetingTime } : {}),
      ...(status !== undefined ? { status } : {}),
    });

    return NextResponse.json({ success: true, slot: updated });
  } catch (error: any) {
    logger.error("Admin departures PATCH error", error);
    return NextResponse.json({ error: error?.message || "Failed to update slot" }, { status: 500 });
  }
}
