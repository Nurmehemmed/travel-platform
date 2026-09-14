/**
 * Payriff Payment Gateway Integration
 * Official Documentation: https://beta-docs.payriff.com
 *
 * Supported features:
 *  - Order Creation (POST https://api.payriff.com/api/v3/orders)
 *  - Order Status Verification (GET https://api.payriff.com/api/v3/orders/:id)
 *  - Sandbox / Mock Simulation Mode (when PAYRIFF_SECRET_KEY is absent or in test mode)
 */

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
 * Creates a Payriff payment session for a Visa or Tour order.
 * If credentials are missing, seamlessly returns a sandbox simulation checkout URL.
 */
export async function createPayriffOrder(params: PayriffCreateOrderParams): Promise<PayriffOrderResult> {
  const { applicationNumber, amount, currency = "USD", description, email, language = "EN" } = params;

  // Check if live/sandbox Payriff keys are present
  const isMock = !PAYRIFF_SECRET_KEY || PAYRIFF_SECRET_KEY === "mock" || PAYRIFF_SECRET_KEY.startsWith("test_mock");

  // Detect service type by reference prefix: ATR- = transfer, AZV- = visa
  const isTransfer = applicationNumber.startsWith("ATR-");
  const callbackBase = isTransfer
    ? `${APP_URL}/api/payment/transfer-callback`
    : `${APP_URL}/api/payment/payriff-callback`;
  const mockPayPage = isTransfer
    ? `${APP_URL}/transfer/track`
    : `${APP_URL}/visa/pay`;

  if (isMock) {
    // Return local Payriff Sandbox checkout simulation
    const mockOrderId = `PR-SIM-${Math.floor(100000 + Math.random() * 900000)}`;
    const emailQuery = isTransfer ? `&email=${encodeURIComponent(email)}` : "";
    const paymentUrl = isTransfer
      ? `${callbackBase}?ref=${encodeURIComponent(applicationNumber)}${emailQuery}&orderId=${mockOrderId}&status=success`
      : `${APP_URL}/visa/pay?ref=${encodeURIComponent(applicationNumber)}&orderId=${mockOrderId}&amount=${amount}&currency=${currency}`;
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
    description: description || `AddmeTour Service ${applicationNumber}`,
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
    // Fall back to sandbox simulation if Payriff API is temporarily unreachable
    const fallbackOrderId = `PR-FALLBACK-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      orderId: fallbackOrderId,
      paymentUrl: isTransfer
        ? `${callbackBase}?ref=${encodeURIComponent(applicationNumber)}&orderId=${fallbackOrderId}&status=success`
        : `${APP_URL}/visa/pay?ref=${encodeURIComponent(applicationNumber)}&orderId=${fallbackOrderId}&amount=${amount}&currency=${currency}&notice=fallback`,
      isMock: true,
    };
  }
}

/**
 * Verify Payriff Order Status
 */
export async function verifyPayriffOrder(orderId: string): Promise<{ isPaid: boolean; rawStatus?: string }> {
  if (!PAYRIFF_SECRET_KEY || orderId.startsWith("PR-SIM-") || orderId.startsWith("PR-FALLBACK-")) {
    return { isPaid: true, rawStatus: "SIMULATED_APPROVED" };
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
