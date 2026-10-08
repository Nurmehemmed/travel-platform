import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { tourService } from "@/services/tour.service";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit(`tour_hold_${ip}`, { limit: 15, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many reservation attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { slotId, guests, sessionId } = body;

    if (!slotId || !guests || !sessionId) {
      return NextResponse.json(
        { error: "slotId, guests, and sessionId are required." },
        { status: 400 }
      );
    }

    const holdResult = await tourService.holdSeats({
      slotId,
      guests: Number(guests) || 1,
      sessionId,
    });

    return NextResponse.json({
      success: true,
      expiresAt: holdResult.expiresAt,
      availableSeats: holdResult.availableSeats,
    });
  } catch (error: any) {
    logger.warn("Hold seats failed", { error: error?.message });
    return NextResponse.json(
      { error: error?.message || "Failed to hold seats." },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId) {
      await tourService.releaseHold(sessionId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
