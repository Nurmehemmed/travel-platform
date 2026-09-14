import { NextResponse } from "next/server";
import { db, transferBookings } from "@travel/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ref = url.searchParams.get("ref");
  const email = url.searchParams.get("email");

  if (!ref && !email) {
    return NextResponse.json(
      { error: "Please provide a booking reference or email address." },
      { status: 400 }
    );
  }

  try {
    let booking = null;

    if (ref) {
      booking = await db.query.transferBookings.findFirst({
        where: eq(transferBookings.bookingNumber, ref.trim().toUpperCase()),
      });
    } else if (email) {
      // Find latest booking by email
      booking = await db.query.transferBookings.findFirst({
        where: eq(transferBookings.email, email.trim().toLowerCase()),
        // Return most recent
        orderBy: (t, { desc }) => [desc(t.createdAt)],
      });
    }

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found with that reference or email address." },
        { status: 404 }
      );
    }

    // Return safe subset (no internal IDs)
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
