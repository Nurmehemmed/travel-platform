import { NextResponse } from "next/server";
import { db, esimOrders, recordAuditLog } from "@travel/db";
import { and, eq, ne } from "drizzle-orm";
import { verifyPayriffOrder } from "@/lib/payriff";
import { notifyTelegram } from "@/lib/telegram";
import { logger } from "@/lib/logger";

/**
 * Payriff Payment Callback for Azerbaijan Tourist eSIM Orders.
 *
 * Payriff redirects the customer here after credit card / 3D-Secure payment is processed.
 * Query params: ref (orderNumber), orderId, status
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderNumber = url.searchParams.get("ref");
  const orderId = url.searchParams.get("orderId");
  const status = url.searchParams.get("status");

  if (!orderNumber) {
    return NextResponse.redirect(new URL("/esim", req.url));
  }

  // Handle cancelled or declined payments
  if (status === "cancelled" || status === "declined") {
    return NextResponse.redirect(
      new URL(`/esim?payment=cancelled&orderNumber=${encodeURIComponent(orderNumber)}`, req.url)
    );
  }

  // Strictly require orderId and verify order settlement with Payriff
  if (!orderId) {
    return NextResponse.redirect(
      new URL(`/esim?payment=missing_id&orderNumber=${encodeURIComponent(orderNumber)}`, req.url)
    );
  }

  const check = await verifyPayriffOrder(orderId);
  if (!check.isPaid) {
    return NextResponse.redirect(
      new URL(`/esim?payment=unverified&orderNumber=${encodeURIComponent(orderNumber)}`, req.url)
    );
  }

  // Atomic idempotent update
  const updated = await db.transaction(async (tx) => {
    const [row] = await tx
      .update(esimOrders)
      .set({
        paymentStatus: "paid",
        status: "confirmed",
        payriffOrderId: orderId,
        adminNotes: `Payriff Order verified: ${orderId || "OK"}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(esimOrders.orderNumber, orderNumber),
          ne(esimOrders.paymentStatus, "paid")
        )
      )
      .returning();

    if (row) {
      await recordAuditLog(
        {
          entityType: "esim" as any,
          entityId: row.orderNumber,
          action: "payment_settled",
          actorEmail: row.email,
          actorRole: "customer",
          metadata: {
            orderNumber: row.orderNumber,
            payriffOrderId: orderId,
            amountPaid: row.priceUsd,
            costPriceUsd: row.costPriceUsd,
            commissionUsd: row.commissionUsd,
          },
        },
        tx
      );
    }

    return row;
  });

  const order =
    updated ||
    (await db.query.esimOrders.findFirst({
      where: eq(esimOrders.orderNumber, orderNumber),
    }));

  if (updated && order) {
    const profitMsg = order.commissionUsd
      ? `\n💵 *Net Commission Profit:* +$${order.commissionUsd} USD`
      : "";

    const alertMsg = `💳 *PAID eSIM ORDER CONFIRMED!*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Order Number:* \`${order.orderNumber}\`
👤 *Customer:* ${order.customerName}
✉️ *Email:* ${order.email}
📱 *Phone:* \`${order.phone}\`
📦 *Plan:* ${order.planName} (${order.dataAmountGb} GB / ${order.durationDays} Days)
💰 *Selling Price:* $${order.priceUsd} USD
🏷️ *Wholesale Cost:* $${order.costPriceUsd || "N/A"} USD${profitMsg}
💳 *Payriff Order ID:* \`${orderId}\`
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *NEXT STEP:* Send QR Code activation to customer via WhatsApp / Email!`;

    notifyTelegram(alertMsg).catch((err) => {
      logger.warn("Telegram alert failed for paid eSIM callback", { err: err?.message });
    });
  }

  return NextResponse.redirect(
    new URL(`/esim?payment=success&orderNumber=${encodeURIComponent(orderNumber)}`, req.url)
  );
}
