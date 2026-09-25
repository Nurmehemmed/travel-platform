/**
 * Multi-Gateway Payment Router
 *
 * Provides a unified abstraction layer across payment gateways:
 * - Payriff (Azerbaijan domestic gateway for AZN / regional cards)
 * - Stripe (International credit/debit cards, Apple Pay, Google Pay)
 *
 * Auto-selects gateway based on customer currency / region and configured provider keys.
 */

import { createPayriffOrder, PayriffOrderResult } from "./payriff";
import { CURRENT_BRAND } from "./brand";

export type PaymentProvider = "payriff" | "stripe";

export interface CreatePaymentSessionParams {
  applicationNumber: string;
  amount: number;
  currency?: "USD" | "AZN" | "EUR" | "GBP" | "AED" | "SAR";
  description: string;
  email: string;
  preferredProvider?: PaymentProvider;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentSessionResult {
  provider: PaymentProvider;
  sessionId: string;
  paymentUrl: string;
  isMock: boolean;
}

/**
 * Creates a payment session with intelligent gateway selection:
 * - If STRIPE_SECRET_KEY is configured and currency is non-AZN, routes to Stripe for international payment optimization.
 * - Otherwise defaults to Payriff (with sandbox/mock fallback).
 */
export async function createUnifiedPaymentSession(
  params: CreatePaymentSessionParams
): Promise<PaymentSessionResult> {
  const {
    applicationNumber,
    amount,
    currency = "USD",
    description,
    email,
    preferredProvider,
    successUrl,
    cancelUrl,
  } = params;

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const isStripePreferred = preferredProvider === "stripe" || (!!stripeKey && currency !== "AZN");

  if (isStripePreferred && stripeKey) {
    try {
      // Direct Stripe Checkout API call without forcing heavy SDK dependency
      const stripeBody = new URLSearchParams();
      stripeBody.append("mode", "payment");
      stripeBody.append("customer_email", email);
      stripeBody.append("client_reference_id", applicationNumber);
      stripeBody.append(
        "success_url",
        successUrl ||
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/voucher?ref=${applicationNumber}&session_id={CHECKOUT_SESSION_ID}`
      );
      stripeBody.append(
        "cancel_url",
        cancelUrl ||
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/visa/pay?ref=${applicationNumber}&canceled=true`
      );
      stripeBody.append("line_items[0][price_data][currency]", currency.toLowerCase());
      stripeBody.append(
        "line_items[0][price_data][unit_amount]",
        Math.round(amount * 100).toString()
      );
      stripeBody.append(
        "line_items[0][price_data][product_data][name]",
        `${CURRENT_BRAND.name}: ${description}`
      );
      stripeBody.append("line_items[0][quantity]", "1");

      const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: stripeBody.toString(),
        signal: AbortSignal.timeout(6000),
      });

      if (stripeRes.ok) {
        const session = await stripeRes.json();
        return {
          provider: "stripe",
          sessionId: session.id,
          paymentUrl: session.url,
          isMock: false,
        };
      }
    } catch (err) {
      console.warn("[Stripe dispatch glitch, falling back to Payriff]:", err);
    }
  }

  // Domestic / Default Gateway: Payriff
  const payriffRes: PayriffOrderResult = await createPayriffOrder({
    applicationNumber,
    amount,
    currency: (currency === "AZN" || currency === "EUR" ? currency : "USD") as "USD" | "AZN" | "EUR",
    description,
    email,
    language: "EN",
  });

  return {
    provider: "payriff",
    sessionId: payriffRes.orderId,
    paymentUrl: payriffRes.paymentUrl,
    isMock: payriffRes.isMock,
  };
}
