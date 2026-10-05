/**
 * Payriff Payment Gateway Integration
 * Official Documentation: https://beta-docs.payriff.com
 *
 * Supported features:
 *  - Order Creation (POST https://api.payriff.com/api/v3/orders)
 *  - Order Status Verification (GET https://api.payriff.com/api/v3/orders/:id)
 *  - Sandbox / Mock Simulation Mode (when PAYRIFF_SECRET_KEY is absent or in test mode)
 */

import { CURRENT_BRAND } from "./brand";

export interface PayriffCreateOrderParams {
  applicationNumber: string;
  amount: number;
  currency?: "USD" | "AZN" | "EUR";
  description: string;
  email: string;
  language?: "EN" | "AZ" | "RU";
}

export interface PayriffOrderResult {
  orderId: string;
  paymentUrl: string;
  isMock: boolean;
}

const PAYRIFF_SECRET_KEY = process.env.PAYRIFF_SECRET_KEY || "";
const PAYRIFF_MERCHANT_ID = process.env.PAYRIFF_MERCHANT_ID || "";
const PAYRIFF_API_URL = process.env.PAYRIFF_API_URL || "https://api.payriff.com/api/v3";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * Checks whether sandbox / test payment simulation is allowed.
 * - In development, always true.
 * - In production, allowed if ALLOW_PAYMENT_SANDBOX="true" OR when live credentials are not yet configured.
 */
export function isPaymentSandboxAllowed(): boolean {
  if (process.env.ALLOW_PAYMENT_SANDBOX === "false" || process.env.NEXT_PUBLIC_ALLOW_PAYMENT_SANDBOX === "false") {
    return false;
  }
  if (process.env.ALLOW_PAYMENT_SANDBOX === "true" || process.env.NEXT_PUBLIC_ALLOW_PAYMENT_SANDBOX === "true") {
    return true;
  }
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  // When live keys are not configured in production, enable sandbox simulation so payments and checkout can be tested
  const hasLiveKeys = Boolean(
    PAYRIFF_SECRET_KEY &&
    PAYRIFF_SECRET_KEY !== "mock" &&
    !PAYRIFF_SECRET_KEY.startsWith("test_mock")
  );
  return !hasLiveKeys;
}

/**
 * Creates a Payriff payment session for a Visa or Tour order.
 * If credentials are missing, seamlessly returns a sandbox simulation checkout URL.
 */
export async function createPayriffOrder(params: PayriffCreateOrderParams): Promise<PayriffOrderResult> {
  const { applicationNumber, amount, currency = "USD", description, email, language = "EN" } = params;

  // Check if live/sandbox Payriff keys are present
  const isMock = !PAYRIFF_SECRET_KEY || PAYRIFF_SECRET_KEY === "mock" || PAYRIFF_SECRET_KEY.startsWith("test_mock");

  // Detect service type by reference prefix: ATR- = transfer, ESIM- = esim, TR- = tour, ITN- = itinerary, AZV- = visa
  const isTransfer = applicationNumber.startsWith("ATR-");
  const isEsim = applicationNumber.startsWith("ESIM-");
  const isTour = applicationNumber.startsWith("TR-");
  const callbackBase = isTransfer
    ? `${APP_URL}/api/payment/transfer-callback`
    : isEsim
    ? `${APP_URL}/api/payment/esim-callback`
    : isTour
    ? `${APP_URL}/api/payment/tour-callback`
    : `${APP_URL}/api/payment/payriff-callback`;

  if (isMock) {
    if (!isPaymentSandboxAllowed()) {
      throw new Error("Payment gateway credentials (PAYRIFF_SECRET_KEY / PAYRIFF_MERCHANT_ID) are missing or invalid in production.");
    }
    // Return local Payriff Sandbox checkout simulation for all services (eSIM, Transfer, Tour, Visa)
    const mockOrderId = `PR-SIM-${Math.floor(100000 + Math.random() * 900000)}`;
    const serviceTag = isTransfer ? "transfer" : isEsim ? "esim" : isTour ? "tour" : "visa";
    const paymentUrl = `${APP_URL}/pay/sandbox?service=${serviceTag}&ref=${encodeURIComponent(applicationNumber)}&orderId=${mockOrderId}&amount=${Number(amount).toFixed(2)}&currency=${currency}`;
    return {
      orderId: mockOrderId,
      paymentUrl,
      isMock: true,
    };
  }

  // Live Payriff v3 Order Request
  const emailParam = isTransfer ? `&email=${encodeURIComponent(email)}` : "";
  const payload = {
    merchant: PAYRIFF_MERCHANT_ID,
    amount: Number(amount.toFixed(2)),
    currencyType: currency,
    description: description || `${CURRENT_BRAND.name} Service ${applicationNumber}`,
    language,
    email,
    approveURL: `${callbackBase}?ref=${encodeURIComponent(applicationNumber)}${emailParam}&status=success`,
    cancelURL:  `${callbackBase}?ref=${encodeURIComponent(applicationNumber)}${emailParam}&status=cancelled`,
    declineURL: `${callbackBase}?ref=${encodeURIComponent(applicationNumber)}${emailParam}&status=declined`,
  };

  try {
    const res = await fetch(`${PAYRIFF_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: PAYRIFF_SECRET_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || (data.code && data.code !== "00000")) {
      console.error("Payriff Order Creation Error:", data);
      throw new Error(data.message || "Failed to create Payriff payment order.");
    }

    const orderId = data.payload?.orderId || data.orderId;
    const paymentUrl = data.payload?.paymentUrl || data.paymentUrl;

    if (!paymentUrl) {
      throw new Error("Payriff did not return a checkout payment URL.");
    }

    return {
      orderId,
      paymentUrl,
      isMock: false,
    };
  } catch (err: unknown) {
    console.error("Payriff API Connection Failure:", err);
    if (!isPaymentSandboxAllowed()) {
      throw new Error("Payment gateway connection error. Please try again shortly.");
    }
    // Fall back to sandbox simulation
    const fallbackOrderId = `PR-FALLBACK-${Math.floor(100000 + Math.random() * 900000)}`;
    const serviceTag = isTransfer ? "transfer" : isEsim ? "esim" : isTour ? "tour" : "visa";
    return {
      orderId: fallbackOrderId,
      paymentUrl: `${APP_URL}/pay/sandbox?service=${serviceTag}&ref=${encodeURIComponent(applicationNumber)}&orderId=${fallbackOrderId}&amount=${amount}&currency=${currency}&notice=fallback`,
      isMock: true,
    };
  }
}

/**
 * Verify Payriff Order Status
 */
export async function verifyPayriffOrder(orderId: string): Promise<{ isPaid: boolean; rawStatus?: string }> {
  if (!orderId || !orderId.trim()) {
    return { isPaid: false, rawStatus: "INVALID_ORDER_ID" };
  }

  // Handle simulated / fallback order IDs
  if (!PAYRIFF_SECRET_KEY || orderId.startsWith("PR-SIM-") || orderId.startsWith("PR-FALLBACK-")) {
    if (isPaymentSandboxAllowed()) {
      return { isPaid: true, rawStatus: "SIMULATED_APPROVED" };
    }
    console.error("[CRITICAL SECURITY] Blocked simulated/uncredentialed payment verification in production", { orderId });
    return { isPaid: false, rawStatus: "SIMULATION_BLOCKED_IN_PRODUCTION" };
  }

  try {
    const res = await fetch(`${PAYRIFF_API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: PAYRIFF_SECRET_KEY,
      },
    });

    const data = await res.json();
    const status = data.payload?.orderStatus || data.orderStatus || data.status;
    const isPaid = status === "APPROVED" || status === "PAID" || status === "SUCCESS";

    return { isPaid, rawStatus: status };
  } catch (err) {
    console.error("Payriff Verification Error:", err);
    return { isPaid: false };
  }
}
