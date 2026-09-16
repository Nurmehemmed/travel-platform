import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { and, eq, ne } from "drizzle-orm";
import { verifyPayriffOrder } from "@/lib/payriff";
import { sendTelegramVisaAlert } from "@/lib/telegram";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const applicationNumber = url.searchParams.get("ref");
  const orderId = url.searchParams.get("orderId");
  const status = url.searchParams.get("status");

  if (!applicationNumber) {
    return NextResponse.redirect(new URL("/visa", req.url));
  }

  // If status is not success or declined
  if (status === "cancelled" || status === "declined") {
    return NextResponse.redirect(new URL(`/visa/apply?error=payment_${status}&ref=${applicationNumber}`, req.url));
  }

  // Strictly require orderId and verify order settlement with Payriff
  if (!orderId) {
    return NextResponse.redirect(new URL(`/visa/apply?error=missing_order_id&ref=${applicationNumber}`, req.url));
  }

  const check = await verifyPayriffOrder(orderId);
  if (!check.isPaid) {
    return NextResponse.redirect(new URL(`/visa/apply?error=payment_unverified&ref=${applicationNumber}`, req.url));
  }

  // Atomic idempotent update
  const updated = await db.transaction(async (tx) => {
    const [row] = await tx
      .update(visaApplications)
      .set({
        paymentStatus: "paid",
        status: "received",
        adminNotes: `Payriff Order verified: ${orderId || "OK"}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(visaApplications.applicationNumber, applicationNumber),
          ne(visaApplications.paymentStatus, "paid")
        )
      )
      .returning();
    return row;
  });

  const app = updated || (await db.query.visaApplications.findFirst({
    where: eq(visaApplications.applicationNumber, applicationNumber),
  }));

  if (updated) {
    sendTelegramVisaAlert({
      applicationNumber: updated.applicationNumber,
      visaType: updated.visaType,
      applicantName: `${updated.surname} ${updated.givenNames}`,
      nationality: updated.nationality,
      passportNumber: updated.passportNumber,
      arrivalDate: updated.arrivalDate,
      totalAmount: updated.totalAmount,
      email: updated.email,
      phoneNumber: updated.phoneNumber,
    }).catch(console.error);
  }

  return NextResponse.redirect(
    new URL(
      `/visa/track?ref=${encodeURIComponent(applicationNumber)}&email=${encodeURIComponent(app?.email || "")}&paid=true`,
      req.url
    )
  );
}

export async function POST(req: Request) {
  // Webhook listener from Payriff — hardened with server-to-server verification & idempotency
  try {
    const body = await req.json();
    const orderId = body.orderId || body.payload?.orderId;
    const orderStatus = body.orderStatus || body.payload?.orderStatus;
    const applicationNumber = body.applicationNumber || body.description?.match(/AZV-\d+/)?.[0];

    if (!applicationNumber) {
      return NextResponse.json({ error: "Missing application reference" }, { status: 400 });
    }

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId for webhook verification" }, { status: 400 });
    }

    // Direct server-to-server verification to prevent forged webhook calls
    const check = await verifyPayriffOrder(orderId);
    if (!check.isPaid) {
      console.warn("Rejected unverified Payriff webhook for order:", orderId, "Status:", orderStatus);
      return NextResponse.json({ error: "Payment verification failed with provider" }, { status: 400 });
    }

    // Atomic idempotent update (guards against parallel duplicate webhook deliveries)
    const updated = await db.transaction(async (tx) => {
      const [row] = await tx
        .update(visaApplications)
        .set({
          paymentStatus: "paid",
          status: "received",
          adminNotes: `Payriff Webhook Verified: Order ${orderId} (${check.rawStatus || "APPROVED"})`,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(visaApplications.applicationNumber, applicationNumber),
            ne(visaApplications.paymentStatus, "paid")
          )
        )
        .returning();
      return row;
    });

    if (updated) {
      // Alert operations only on initial transition to paid
      sendTelegramVisaAlert({
        applicationNumber: updated.applicationNumber,
        visaType: updated.visaType,
        applicantName: `${updated.surname} ${updated.givenNames}`,
        nationality: updated.nationality,
        passportNumber: updated.passportNumber,
        arrivalDate: updated.arrivalDate,
        totalAmount: updated.totalAmount,
        email: updated.email,
        phoneNumber: updated.phoneNumber,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, verified: true, duplicate: !updated });
  } catch (err: any) {
    console.error("Payriff Webhook Error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 400 });
  }
}
