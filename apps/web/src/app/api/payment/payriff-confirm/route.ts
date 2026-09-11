import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { eq } from "drizzle-orm";
import { sendTelegramVisaAlert } from "@/lib/telegram";
import { verifyPayriffOrder } from "@/lib/payriff";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // 1. Rate Limit Check (max 10 requests per minute per IP)
    const ip = getClientIp(req);
    const rl = checkRateLimit(`payment_confirm_${ip}`, { limit: 10, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many payment confirmation requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { applicationNumber, orderId, simulated } = await req.json();

    if (!applicationNumber) {
      return NextResponse.json({ error: "Missing application number" }, { status: 400 });
    }

    // 2. Strict Production Guard: NEVER allow simulated payments in production
    if (process.env.NODE_ENV === "production" && simulated) {
      return NextResponse.json(
        { error: "Unauthorized: Sandbox payment simulation is strictly prohibited in production mode." },
        { status: 403 }
      );
    }

    // 3. For live orders or in production, verify order with Payriff
    if (!simulated && orderId) {
      const check = await verifyPayriffOrder(orderId);
      if (!check.isPaid) {
        return NextResponse.json(
          { error: "Payment verification failed. Payriff reports order is not settled." },
          { status: 400 }
        );
      }
    }

    // Find visa application
    const app = await db.query.visaApplications.findFirst({
      where: eq(visaApplications.applicationNumber, applicationNumber),
    });

    if (!app) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Update payment status to paid
    await db
      .update(visaApplications)
      .set({
        paymentStatus: "paid",
        status: "received",
        adminNotes: `Payment confirmed via Payriff (${orderId || "Direct"}). ${simulated ? "[Sandbox Simulation]" : "[Live Gateway]"}`,
        updatedAt: new Date(),
      })
      .where(eq(visaApplications.applicationNumber, applicationNumber));

    // Send Telegram alert with payment confirmation
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
    }).catch((err) => console.error("Telegram alert error:", err));

    return NextResponse.json({
      success: true,
      applicationNumber,
      redirectUrl: `/visa/track?ref=${encodeURIComponent(applicationNumber)}&email=${encodeURIComponent(app.email)}&paid=true`,
    });
  } catch (error: any) {
    console.error("Payriff Confirmation Error:", error);
    return NextResponse.json({ error: error.message || "Payment confirmation failed" }, { status: 500 });
  }
}
