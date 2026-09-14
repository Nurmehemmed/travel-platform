import { NextResponse } from "next/server";
import { db, transferBookings } from "@travel/db";
import { and, eq } from "drizzle-orm";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  // Rate limiting: 15 requests per minute per IP to protect against enumeration attacks
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`track_transfer_${clientIp}`, {
    limit: 15,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many tracking attempts. Please wait a minute and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  const url = new URL(req.url);
  const ref = url.searchParams.get("ref")?.trim();
  const email = url.searchParams.get("email")?.trim();

  // Dual-factor requirement: both booking reference AND customer email must match
  if (!ref || !email) {
    return NextResponse.json(
      { error: "Please provide both your booking reference and email address." },
      { status: 400 }
    );
  }

  try {
    const booking = await db.query.transferBookings.findFirst({
      where: and(
        eq(transferBookings.bookingNumber, ref.toUpperCase()),
        eq(transferBookings.email, email.toLowerCase())
      ),
    });

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found matching that reference and email address." },
        { status: 404 }
      );
    }

    // Return safe public subset (no sensitive DB IDs or admin notes)
    return NextResponse.json({
      bookingNumber:      booking.bookingNumber,
      status:             booking.status,
      direction:          booking.direction,
      airport:            booking.airport,
      pickupZone:         booking.pickupZone,
      dropoffAddress:     booking.dropoffAddress,
      vehicleClass:       booking.vehicleClass,
      flightNumber:       booking.flightNumber,
      flightDate:         booking.flightDate,
      flightTime:         booking.flightTime,
      returnFlightNumber: booking.returnFlightNumber,
      returnDate:         booking.returnDate,
      returnTime:         booking.returnTime,
      passengerName:      booking.passengerName,
      passengerCount:     booking.passengerCount,
      totalAmount:        booking.totalAmount,
      paymentMethod:      booking.paymentMethod,
      paymentStatus:      booking.paymentStatus,
      driverName:         booking.driverName,
      driverPhone:        booking.driverPhone,
      createdAt:          booking.createdAt,
    });

  } catch (error) {
    console.error("[Transfer Track API error]:", error);
    return NextResponse.json(
      { error: "An error occurred while looking up your booking." },
      { status: 500 }
    );
  }
}

