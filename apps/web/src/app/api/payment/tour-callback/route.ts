import { NextResponse } from "next/server";
import { db, tourReservations } from "@travel/db";
import { and, eq, ne } from "drizzle-orm";
import { verifyPayriffOrder } from "@/lib/payriff";
import { sendTelegramTourAlert } from "@/lib/telegram";

/**
 * Payriff Payment Callback for Tour Reservations.
 *
 * Payriff redirects the customer here after payment is completed.
 * Query params: ref (reservationNumber), orderId, status
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const reservationNumber = url.searchParams.get("ref");
  const orderId = url.searchParams.get("orderId");
  const status = url.searchParams.get("status");

  if (!reservationNumber) {
    return NextResponse.redirect(new URL("/tours", req.url));
  }

  // Handle declined / cancelled
  if (status === "cancelled" || status === "declined") {
    return NextResponse.redirect(
      new URL(`/tours?error=payment_${status}&reservation=${reservationNumber}`, req.url)
    );
  }

  // Strictly require orderId and verify order settlement with Payriff
  if (!orderId) {
    return NextResponse.redirect(
      new URL(`/tours?error=missing_order_id&reservation=${reservationNumber}`, req.url)
    );
  }

  const check = await verifyPayriffOrder(orderId);
  if (!check.isPaid) {
    return NextResponse.redirect(
      new URL(`/tours?error=payment_unverified&reservation=${reservationNumber}`, req.url)
    );
  }

  const existingRes = await db.query.tourReservations.findFirst({
    where: eq(tourReservations.reservationNumber, reservationNumber),
  });

  const isDeposit =
    existingRes?.paymentMethod === "partial_deposit" ||
    Number(existingRes?.remainingAmount || 0) > 0;
  const newPaymentStatus = isDeposit ? "deposit_paid" : "paid";

  // Atomic idempotent update
  const updated = await db.transaction(async (tx) => {
    const [row] = await tx
      .update(tourReservations)
      .set({
        paymentStatus: newPaymentStatus,
        status: "confirmed",
        payriffOrderId: orderId,
        adminNotes: `Payriff Order verified: ${orderId || "OK"}${isDeposit ? ` (Deposit $${existingRes?.depositAmount} received)` : ""}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(tourReservations.reservationNumber, reservationNumber),
          ne(tourReservations.paymentStatus, newPaymentStatus)
        )
      )
      .returning();
    return row;
  });

  const resRecord = updated || existingRes;

  if (updated && resRecord) {
    // Fire Telegram tour alert only on initial transition to paid/deposit_paid
    sendTelegramTourAlert({
      reservationNumber: resRecord.reservationNumber,
      tourTitle: resRecord.tourTitle,
      tourDate: resRecord.tourDate,
      guests: resRecord.guests,
      travelerName: resRecord.travelerName,
      phoneNumber: resRecord.phoneNumber,
      email: resRecord.email,
      totalPrice: resRecord.price,
      depositAmount: resRecord.depositAmount,
      remainingAmount: resRecord.remainingAmount,
      paymentMethod: resRecord.paymentMethod as any,
      paymentStatus: resRecord.paymentStatus,
    }).catch(console.error);
  }

  return NextResponse.redirect(
    new URL(
      `/tours?reservation=${encodeURIComponent(reservationNumber)}&paid=true`,
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
    const reservationNumber = body.bookingNumber || body.reservationNumber || body.description?.match(/TR-[A-Z0-9]{6}/)?.[0];

    if (!reservationNumber) {
      return NextResponse.json({ error: "Missing tour reservation reference" }, { status: 400 });
    }

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId for webhook verification" }, { status: 400 });
    }

    // Direct server-to-server verification
    const check = await verifyPayriffOrder(orderId);
    if (!check.isPaid) {
      console.warn("Rejected unverified tour Payriff webhook for order:", orderId, "Status:", orderStatus);
      return NextResponse.json({ error: "Payment verification failed with provider" }, { status: 400 });
    }

    const existingRes = await db.query.tourReservations.findFirst({
      where: eq(tourReservations.reservationNumber, reservationNumber),
    });

    const isDeposit =
      existingRes?.paymentMethod === "partial_deposit" ||
      Number(existingRes?.remainingAmount || 0) > 0;
    const newPaymentStatus = isDeposit ? "deposit_paid" : "paid";

    // Atomic idempotent update
    const updated = await db.transaction(async (tx) => {
      const [row] = await tx
        .update(tourReservations)
        .set({
          paymentStatus: newPaymentStatus,
          status: "confirmed",
          payriffOrderId: orderId,
          adminNotes: `Payriff Webhook Verified: Order ${orderId} (${check.rawStatus || "APPROVED"})${isDeposit ? ` (Deposit $${existingRes?.depositAmount} received)` : ""}`,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(tourReservations.reservationNumber, reservationNumber),
            ne(tourReservations.paymentStatus, newPaymentStatus)
          )
        )
        .returning();
      return row;
    });

    if (updated) {
      sendTelegramTourAlert({
        reservationNumber: updated.reservationNumber,
        tourTitle: updated.tourTitle,
        tourDate: updated.tourDate,
        guests: updated.guests,
        travelerName: updated.travelerName,
        phoneNumber: updated.phoneNumber,
        email: updated.email,
        totalPrice: updated.price,
        depositAmount: updated.depositAmount,
        remainingAmount: updated.remainingAmount,
        paymentMethod: updated.paymentMethod as any,
        paymentStatus: updated.paymentStatus,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, verified: true, duplicate: !updated });
  } catch (err: unknown) {
    console.error("Tour Payriff Webhook Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook error" },
      { status: 400 }
    );
  }
}
