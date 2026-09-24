import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createUnifiedPaymentSession } from "../payment-gateway";

describe("Unified Payment Gateway Router", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("routes AZN and domestic payments to Payriff simulator by default", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.PAYRIFF_SECRET_KEY;

    const result = await createUnifiedPaymentSession({
      applicationNumber: "AZV-112233",
      amount: 59,
      currency: "AZN",
      description: "Azerbaijan Visa Application",
      email: "traveler@example.com",
    });

    expect(result.provider).toBe("payriff");
    expect(result.isMock).toBe(true);
    expect(result.paymentUrl).toMatch(/(pay\/sandbox|visa\/pay)/);
  });

  it("routes international payments to Stripe when STRIPE_SECRET_KEY is present", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_123456789";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "cs_test_session_abc",
        url: "https://checkout.stripe.com/c/pay/cs_test_session_abc",
      }),
    } as any);

    const result = await createUnifiedPaymentSession({
      applicationNumber: "ATR-998877",
      amount: 45,
      currency: "USD",
      description: "Airport Transfer Sedan",
      email: "tourist@example.com",
      preferredProvider: "stripe",
    });

    expect(result.provider).toBe("stripe");
    expect(result.sessionId).toBe("cs_test_session_abc");
    expect(result.paymentUrl).toBe("https://checkout.stripe.com/c/pay/cs_test_session_abc");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.stripe.com/v1/checkout/sessions",
      expect.objectContaining({ method: "POST" })
    );
  });
});
