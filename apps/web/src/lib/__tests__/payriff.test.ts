import { describe, it, expect } from "vitest";
import { createPayriffOrder, verifyPayriffOrder } from "../payriff";

describe("Payriff Payment Integration Engine", () => {
  it("creates mock sandbox order in non-production environment when secret key is not set", async () => {
    const result = await createPayriffOrder({
      applicationNumber: "AZV-202609-881234",
      amount: 49,
      currency: "USD",
      description: "Azerbaijan e-Visa Standard (AZV-202609-881234)",
      email: "traveler@example.com",
    });

    expect(result.orderId).toBeDefined();
    expect(result.orderId).toMatch(/^PR-(SIM|FALLBACK)-\d+/);
    expect(result.paymentUrl).toContain("AZV-202609-881234");
    expect(result.isMock).toBe(true);
  });

  it("creates transfer order with correct transfer callback redirect URL", async () => {
    const result = await createPayriffOrder({
      applicationNumber: "ATR-982143",
      amount: 38,
      currency: "USD",
      description: "Airport Transfer - Baku City Center (Sedan)",
      email: "guest@example.com",
    });

    expect(result.orderId).toBeDefined();
    expect(result.paymentUrl).toContain("ATR-982143");
    expect(result.paymentUrl).toContain("transfer");
  });

  it("verifies simulated order in development environment", async () => {
    const check = await verifyPayriffOrder("PR-SIM-123456");
    expect(check.isPaid).toBe(true);
    expect(check.rawStatus).toBe("SIMULATED_APPROVED");
  });

  it("permits sandbox simulation when live credentials are not configured", async () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      (process.env as any).NODE_ENV = "production";
      const result = await createPayriffOrder({
        applicationNumber: "TR-123456",
        amount: 25,
        currency: "USD",
        description: "Tour Down Payment",
        email: "tourist@example.com",
      });

      expect(result.orderId).toBeDefined();
      expect(result.isMock).toBe(true);
      expect(result.paymentUrl).toContain("TR-123456");
    } finally {
      (process.env as any).NODE_ENV = originalEnv;
    }
  });
});
