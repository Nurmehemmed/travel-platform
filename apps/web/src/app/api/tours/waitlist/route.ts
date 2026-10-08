import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { tourService } from "@/services/tour.service";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit(`tour_waitlist_${ip}`, { limit: 5, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many waitlist requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { tourId, tourTitle, desiredDate, guests, travelerName, email, phoneNumber, notes, slotId } = body;

    if (!tourTitle || !desiredDate || !travelerName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Please fill in all mandatory contact and date fields." },
        { status: 400 }
      );
    }

    const entry = await tourService.joinWaitlist({
      tourId: tourId || "custom",
      tourTitle,
      desiredDate,
      guests: Number(guests) || 2,
      travelerName,
      email,
      phoneNumber,
      notes,
      slotId,
    });

    return NextResponse.json({
      success: true,
      message: "You have been successfully added to the priority waitlist! We will notify you immediately if seats open.",
      entry,
    });
  } catch (error: any) {
    logger.error("Failed to add traveler to waitlist", error);
    return NextResponse.json(
      { error: error?.message || "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
