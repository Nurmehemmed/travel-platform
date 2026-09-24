import { NextResponse } from "next/server";
import { db, esimOrders, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { notifyTelegram } from "@/lib/telegram";
import { verifyPayriffOrder } from "@/lib/payriff";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  try {
    const rl = checkRateLimit(`esim_confirm_${ip}`, { limit: 10, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many payment confirmation requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { orderNumber, orderId, simulated } = await req.json();

    if (!orderNumber) {
      return NextResponse.json({ error: "Missing order number" }, { status: 400 });
    }

    // Strict Production Guard: NEVER allow simulated payments in production
    if (process.env.NODE_ENV === "production" && simulated) {
      return NextResponse.json(
        { error: "Unauthorized: Sandbox simulation is strictly prohibited in production mode." },
        { status: 403 }
      );
    }

    // Verify orderId with Payriff if not simulated
    if (!simulated) {
      if (!orderId) {
        return NextResponse.json(
          { error: "Missing Payriff orderId for payment settlement verification" },
          { status: 400 }
        );
      }
      const check = await verifyPayriffOrder(orderId);
      if (!check.isPaid) {
        return NextResponse.json(
          { error: "Payment verification failed. Payriff reports order is not settled." },
          { status: 400 }
        );
      }
    }

    const order = await db.query.esimOrders.findFirst({
      where: eq(esimOrders.orderNumber, orderNumber),
    });

    if (!order) {
      return NextResponse.json({ error: "eSIM order not found" }, { status: 404 });
    }

    // Generate mock QR / LPA code for instant activation delivery
    const lpaActivationCode = `LPA:1$smdp.io$AZ-TOURIST-${order.orderNumber.replace(/[^A-Z0-9]/g, "")}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(lpaActivationCode)}`;

    // Update payment status to paid atomically
    await db.transaction(async (tx) => {
      await tx
        .update(esimOrders)
        .set({
          paymentStatus: "paid",
          status: "confirmed",
          payriffOrderId: orderId || `SIM-${orderNumber}`,
          qrCodeUrl,
          activationNotes: `LPA Activation Code: ${lpaActivationCode}`,
          updatedAt: new Date(),
        })
        .where(eq(esimOrders.orderNumber, orderNumber));

      await recordAuditLog(
        {
          entityType: "esim" as any,
          entityId: order.orderNumber,
          action: "payment_settled_in_app",
          actorEmail: order.email,
          actorRole: "customer",
          metadata: {
            orderNumber: order.orderNumber,
            payriffOrderId: orderId || "simulated",
            priceUsd: order.priceUsd,
            costPriceUsd: order.costPriceUsd,
            commissionUsd: order.commissionUsd,
            simulated: !!simulated,
            clientIp: ip,
          },
        },
        tx
      );
    });

    // Notify Telegram Operations with commission profit
    const profitStr = order.commissionUsd
      ? `\n💵 *Net Commission Profit:* +$${order.commissionUsd} USD`
      : "";

    const alertMsg = `💳 *PAID eSIM ORDER CONFIRMED (IN-APP CHECKOUT)*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Order Number:* \`${order.orderNumber}\`
👤 *Customer:* ${order.customerName}
✉️ *Email:* ${order.email}
📱 *Phone:* \`${order.phone}\`
📦 *Plan:* ${order.planName} (${order.dataAmountGb} GB / ${order.durationDays} Days)
💰 *Amount Paid:* $${order.priceUsd} USD
🏷️ *Wholesale Cost:* $${order.costPriceUsd || "N/A"} USD${profitStr}
💳 *Transaction ID:* \`${orderId || "Direct Card Authorized"}\`
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *QR Code Generated & Activated!* Voucher delivered to customer screen.`;

    notifyTelegram(alertMsg).catch((err) => {
      logger.warn("Telegram alert failed for eSIM in-app confirmation", { err: err?.message });
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      qrCodeUrl,
      lpaActivationCode,
      message: "Payment confirmed successfully",
    });
  } catch (error: any) {
    logger.error("Error in eSIM payment confirmation", error);
    return NextResponse.json(
      { error: error?.message || "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
