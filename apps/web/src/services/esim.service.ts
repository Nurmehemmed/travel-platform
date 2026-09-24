import { db, esimOrders, recordAuditLog } from "@travel/db";
import { and, desc, eq, ne } from "drizzle-orm";
import { notifyTelegram } from "@/lib/telegram";
import { logger } from "@/lib/logger";
import { ESIM_PLANS, EsimPlan } from "@/lib/esim-plans";
import { createPayriffOrder } from "@/lib/payriff";

export type { EsimPlan };
export { ESIM_PLANS };

export interface CreateEsimOrderInput {
  customerName: string;
  email: string;
  phone: string;
  planId: string;
  deviceModel?: string;
  arrivalDate?: string;
  paymentMethod?: string;
  notes?: string;
  clientIp?: string | null;
}

export function generateEsimOrderNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `ESIM-${year}-${random}`;
}

export class EsimService {
  /**
   * Create an eSIM order inquiry or confirmed order with Payriff online checkout
   */
  async createOrder(input: CreateEsimOrderInput) {
    const customerName = input.customerName?.trim();
    const email = input.email?.trim().toLowerCase();
    const phone = input.phone?.trim();
    const paymentMethod = input.paymentMethod || "online";

    if (!customerName || !email || !phone) {
      throw new Error("Full name, email address, and phone number are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const plan = ESIM_PLANS.find((p) => p.id === input.planId) || ESIM_PLANS[1]!;
    const orderNumber = generateEsimOrderNumber();

    const arrivalDateStr =
      input.arrivalDate && input.arrivalDate.length >= 10
        ? input.arrivalDate.split("T")[0]
        : null;

    // Create Payriff payment session if paying online
    let payriffResult: any = null;
    if (paymentMethod === "online") {
      payriffResult = await createPayriffOrder({
        applicationNumber: orderNumber,
        amount: plan.priceUsd,
        currency: "USD",
        description: `Azerbaijan Tourist eSIM ${plan.name} (${orderNumber})`,
        email,
      });
    }

    const created = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(esimOrders)
        .values({
          orderNumber,
          customerName,
          email,
          phone,
          planId: plan.id,
          planName: plan.name,
          dataAmountGb: plan.dataGb,
          durationDays: plan.durationDays,
          priceUsd: String(plan.priceUsd.toFixed(2)),
          costPriceUsd: String(plan.costPriceUsd.toFixed(2)),
          commissionUsd: String(plan.commissionUsd.toFixed(2)),
          currency: "USD",
          deviceModel: input.deviceModel?.trim() || null,
          arrivalDate: arrivalDateStr,
          status: "pending",
          paymentMethod,
          paymentStatus: "pending",
          payriffOrderId: payriffResult?.orderId || null,
          activationNotes: input.notes?.trim() || null,
        })
        .returning();

      if (inserted) {
        await recordAuditLog(
          {
            entityType: "esim" as any,
            entityId: inserted.orderNumber,
            action: "esim_order_created",
            actorEmail: email,
            actorRole: "customer",
            metadata: {
              orderNumber: inserted.orderNumber,
              customerName,
              email,
              planName: plan.name,
              dataAmountGb: plan.dataGb,
              priceUsd: plan.priceUsd,
              costPriceUsd: plan.costPriceUsd,
              commissionUsd: plan.commissionUsd,
              paymentMethod,
              hasPayriffOrder: !!payriffResult?.orderId,
              clientIp: input.clientIp,
            },
          },
          tx
        );
      }

      return inserted;
    });

    // Notify Telegram Operations
    const summaryText = `📱 *NEW AZERBAIJAN eSIM ORDER*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Order Number:* \`${orderNumber}\`
👤 *Customer:* ${customerName}
📱 *Phone/WA:* \`${phone}\`
✉️ *Email:* ${email}
📦 *Plan:* ${plan.name} (${plan.dataGb} GB / ${plan.durationDays} Days)
💰 *Selling Price:* $${plan.priceUsd} USD (~${Math.round(plan.priceUsd * 1.7)} AZN)
🏷️ *Wholesale Cost:* $${plan.costPriceUsd} USD
💵 *Net Commission:* +$${plan.commissionUsd} USD
💳 *Payment:* ${paymentMethod.toUpperCase()} (${payriffResult?.orderId ? "Payriff Initialized" : "Pending"})
📱 *Device:* ${input.deviceModel || "Not specified"}
🗓️ *Arrival Date:* ${arrivalDateStr || "Immediate"}
📝 *Notes:* ${input.notes || "None"}
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *Action:* Customer proceeding to online checkout / WhatsApp concierge.`;

    notifyTelegram(summaryText).catch((err) => {
      logger.warn("Telegram notification failed for eSIM order", { err: err?.message });
    });

    return {
      orderNumber,
      order: created,
      plan,
      paymentUrl: payriffResult?.paymentUrl || null,
      payriffOrderId: payriffResult?.orderId || null,
      isMockPayment: payriffResult?.isMock || false,
    };
  }

  /**
   * Confirm Payriff payment callback
   */
  async confirmPayment(orderNumber: string, payriffOrderId?: string) {
    const updated = await db.transaction(async (tx) => {
      const [row] = await tx
        .update(esimOrders)
        .set({
          paymentStatus: "paid",
          status: "confirmed",
          payriffOrderId: payriffOrderId || undefined,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(esimOrders.orderNumber, orderNumber),
            ne(esimOrders.paymentStatus, "paid")
          )
        )
        .returning();
      return row;
    });

    const order =
      updated ||
      (await db.query.esimOrders.findFirst({
        where: eq(esimOrders.orderNumber, orderNumber),
      }));

    if (updated) {
      const profitStr = updated.commissionUsd
        ? ` | *Net Profit:* +$${updated.commissionUsd} USD`
        : "";

      const alertMsg = `💳 *PAID eSIM ORDER CONFIRMED!*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Order Number:* \`${updated.orderNumber}\`
👤 *Customer:* ${updated.customerName}
✉️ *Email:* ${updated.email}
📱 *Phone:* \`${updated.phone}\`
📦 *Plan:* ${updated.planName} (${updated.dataAmountGb} GB / ${updated.durationDays} Days)
💰 *Amount Paid:* $${updated.priceUsd} USD${profitStr}
💳 *Payriff Order ID:* \`${payriffOrderId || updated.payriffOrderId || "Online Verified"}\`
━━━━━━━━━━━━━━━━━━━━━━━━━
👉 *NEXT STEP:* Send QR Code activation to customer WhatsApp & Email!`;

      notifyTelegram(alertMsg).catch((err) => {
        logger.warn("Telegram alert failed for paid eSIM", { err: err?.message });
      });
    }

    return order;
  }

  /**
   * List all eSIM orders for admin
   */
  async listOrders() {
    return db.select().from(esimOrders).orderBy(desc(esimOrders.createdAt));
  }
}

export const esimService = new EsimService();

