import { NextResponse } from "next/server";
import { db, transferBookings } from "@travel/db";
import { eq } from "drizzle-orm";
import { verifyPayriffOrder } from "@/lib/payriff";
import { sendTelegramTransferAlert } from "@/lib/telegram";
import { getAirportByCode } from "@/lib/transfer-zones";

/**
 * Payriff Payment Callback for Airport Transfer Bookings.
 *
 * Payriff redirects the customer here after payment is completed.
 * Query params: ref (bookingNumber), orderId, status
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const bookingNumber = url.searchParams.get("ref");
  const orderId = url.searchParams.get("orderId");
  const status = url.searchParams.get("status");

  if (!bookingNumber) {
    return NextResponse.redirect(new URL("/transfer", req.url));
  }

  // Handle declined / cancelled
  if (status === "cancelled" || status === "declined") {
    return NextResponse.redirect(
      new URL(`/transfer/book?error=payment_${status}&ref=${bookingNumber}`, req.url)
    );
  }

  // Verify the order with Payriff
  if (orderId) {
    const check = await verifyPayriffOrder(orderId);
    if (!check.isPaid) {
      return NextResponse.redirect(
        new URL(`/transfer/book?error=payment_unverified&ref=${bookingNumber}`, req.url)
      );
    }
  }

  // Look up and update the booking
  const booking = await db.query.transferBookings.findFirst({
    where: eq(transferBookings.bookingNumber, bookingNumber),
  });

  if (booking) {
    await db
      .update(transferBookings)
      .set({
        paymentStatus: "paid",
        status: "pending",
        payriffOrderId: orderId || booking.payriffOrderId,
        adminNotes: `Payriff Order verified: ${orderId || "OK"}`,
        updatedAt: new Date(),
      })
      .where(eq(transferBookings.bookingNumber, bookingNumber));

    const airportInfo = getAirportByCode(booking.airport as "GYD" | "GJA" | "NAJ");

    // Fire Telegram transfer alert
    sendTelegramTransferAlert({
      bookingNumber:      booking.bookingNumber,
      direction:          booking.direction,
      airport:            airportInfo?.fullName ?? booking.airport,
      pickupZone:         booking.pickupZone,
      dropoffAddress:     booking.dropoffAddress,
      vehicleClass:       booking.vehicleClass,
      flightNumber:       booking.flightNumber,
      flightDate:         booking.flightDate,
      flightTime:         booking.flightTime,
      returnFlightNumber: booking.returnFlightNumber ?? undefined,
      returnDate:         booking.returnDate ?? undefined,
      passengerName:      booking.passengerName,
      passengerCount:     booking.passengerCount,
      phoneNumber:        booking.phoneNumber,
      email:              booking.email,
      totalAmount:        booking.totalAmount,
      paymentMethod:      "online",
    }).catch(console.error);
  }

  return NextResponse.redirect(
    new URL(
      `/transfer/track?ref=${encodeURIComponent(bookingNumber)}&paid=true`,
      req.url
    )
  );
}

/**
 * Payriff Webhook POST — receives server-to-server payment confirmation.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = body.orderId || body.payload?.orderId;
    const orderStatus = body.orderStatus || body.payload?.orderStatus;
    const bookingNumber = body.bookingNumber || body.description?.match(/ATR-[A-Z0-9]{6}/)?.[0];

    if (!bookingNumber) {
      return NextResponse.json({ error: "Missing transfer booking reference" }, { status: 400 });
    }

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId for webhook verification" }, { status: 400 });
    }

    // Direct server-to-server verification
    const check = await verifyPayriffOrder(orderId);
    if (!check.isPaid) {
      console.warn("Rejected unverified transfer Payriff webhook for order:", orderId, "Status:", orderStatus);
      return NextResponse.json({ error: "Payment verification failed with provider" }, { status: 400 });
    }

    const booking = await db.query.transferBookings.findFirst({
      where: eq(transferBookings.bookingNumber, bookingNumber),
    });

    if (booking && booking.paymentStatus !== "paid") {
      await db
        .update(transferBookings)
        .set({
          paymentStatus: "paid",
          status: "pending",
          payriffOrderId: orderId,
          adminNotes: `Payriff Webhook Verified: Order ${orderId} (${check.rawStatus || "APPROVED"})`,
          updatedAt: new Date(),
        })
        .where(eq(transferBookings.bookingNumber, bookingNumber));

      const airportInfo = getAirportByCode(booking.airport as "GYD" | "GJA" | "NAJ");

      // Fire Telegram alert
      sendTelegramTransferAlert({
        bookingNumber:      booking.bookingNumber,
        direction:          booking.direction,
        airport:            airportInfo?.fullName ?? booking.airport,
        pickupZone:         booking.pickupZone,
        dropoffAddress:     booking.dropoffAddress,
        vehicleClass:       booking.vehicleClass,
        flightNumber:       booking.flightNumber,
        flightDate:         booking.flightDate,
        flightTime:         booking.flightTime,
        returnFlightNumber: booking.returnFlightNumber ?? undefined,
        returnDate:         booking.returnDate ?? undefined,
        passengerName:      booking.passengerName,
        passengerCount:     booking.passengerCount,
        phoneNumber:        booking.phoneNumber,
        email:              booking.email,
        totalAmount:        booking.totalAmount,
        paymentMethod:      "online",
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err: unknown) {
    console.error("Transfer Payriff Webhook Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook error" },
      { status: 400 }
    );
  }
}
