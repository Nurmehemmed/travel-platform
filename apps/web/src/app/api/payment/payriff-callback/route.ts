import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { eq } from "drizzle-orm";
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

  // Update DB to paid
  const app = await db.query.visaApplications.findFirst({
    where: eq(visaApplications.applicationNumber, applicationNumber),
  });

  if (app) {
    await db
      .update(visaApplications)
      .set({
        paymentStatus: "paid",
        status: "received",
        adminNotes: `Payriff Order verified: ${orderId || "OK"}`,
        updatedAt: new Date(),
      })
      .where(eq(visaApplications.applicationNumber, applicationNumber));

    sendTelegramVisaAlert({
      applicationNumber: app.applicationNumber,
      visaType: app.visaType,
      applicantName: `${app.surname} ${app.givenNames}`,
      nationality: app.nationality,
      passportNumber: app.passportNumber,
      arrivalDate: app.arrivalDate,
      totalAmount: app.totalAmount,
      email: app.email,
      phoneNumber: app.phoneNumber,
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
  // Webhook listener from Payriff — hardened with server-to-server verification
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

    const app = await db.query.visaApplications.findFirst({
      where: eq(visaApplications.applicationNumber, applicationNumber),
    });

    if (app && app.paymentStatus !== "paid") {
      await db
        .update(visaApplications)
        .set({
          paymentStatus: "paid",
          status: "received",
          adminNotes: `Payriff Webhook Verified: Order ${orderId} (${check.rawStatus || "APPROVED"})`,
          updatedAt: new Date(),
        })
        .where(eq(visaApplications.applicationNumber, applicationNumber));

      // Alert operations
      sendTelegramVisaAlert({
        applicationNumber: app.applicationNumber,
        visaType: app.visaType,
        applicantName: `${app.surname} ${app.givenNames}`,
        nationality: app.nationality,
        passportNumber: app.passportNumber,
        arrivalDate: app.arrivalDate,
        totalAmount: app.totalAmount,
        email: app.email,
        phoneNumber: app.phoneNumber,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err: any) {
    console.error("Payriff Webhook Error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 400 });
  }
}
