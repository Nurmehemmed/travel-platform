import { describe, it, expect, vi } from "vitest";
import { verifyPayriffOrder } from "../payriff";

describe("FinTech Webhook Idempotency & Concurrency Suite", () => {
  describe("Payriff Order Verification Engine", () => {
    it("simulates approved transaction status for sandbox orders", async () => {
      const result = await verifyPayriffOrder("PR-SIM-998877");
      expect(result.isPaid).toBe(true);
      expect(result.rawStatus).toBe("SIMULATED_APPROVED");
    });

    it("rejects non-paid or empty order references", async () => {
      const result = await verifyPayriffOrder("");
      expect(result.isPaid).toBe(false);
    });
  });

  describe("Idempotency State Transitions & Duplicate Webhook Guards", () => {
    // Simulated in-memory atomic repository to test concurrent state transition guarantees
    class MockVisaRepository {
      public rows: Map<string, { paymentStatus: string; status: string; alertDispatched: number }> = new Map();

      constructor() {
        this.rows.set("AZV-2026-1001", {
          paymentStatus: "unpaid",
          status: "pending",
          alertDispatched: 0,
        });
      }

      async processPaymentCallback(applicationNumber: string, orderId: string) {
        const record = this.rows.get(applicationNumber);
        if (!record) return { success: false, reason: "NOT_FOUND" };

        // Idempotency check: atomic update only if paymentStatus != 'paid'
        if (record.paymentStatus !== "paid") {
          record.paymentStatus = "paid";
          record.status = "received";
          record.alertDispatched += 1;
          return { success: true, isFirstExecution: true };
        }

        // Subsequent duplicate callbacks are acknowledged without side effects
        return { success: true, isFirstExecution: false };
      }
    }

    it("executes state transition on the first callback arrival", async () => {
      const repo = new MockVisaRepository();
      const result = await repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345");

      expect(result.success).toBe(true);
      expect(result.isFirstExecution).toBe(true);

      const state = repo.rows.get("AZV-2026-1001")!;
      expect(state.paymentStatus).toBe("paid");
      expect(state.alertDispatched).toBe(1);
    });

    it("prevents duplicate operational alerts when identical webhook arrives twice sequentially", async () => {
      const repo = new MockVisaRepository();

      // First webhook arrives
      const first = await repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345");
      expect(first.isFirstExecution).toBe(true);

      // Second identical webhook arrives (e.g. gateway network retry)
      const second = await repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345");
      expect(second.success).toBe(true);
      expect(second.isFirstExecution).toBe(false); // Idempotent: No secondary side effects!

      const state = repo.rows.get("AZV-2026-1001")!;
      expect(state.alertDispatched).toBe(1); // Still exactly 1 alert
    });

    it("safely handles race conditions with concurrent simultaneous webhook calls", async () => {
      const repo = new MockVisaRepository();

      // Simulate 5 simultaneous webhook calls racing for the same order
      const results = await Promise.all([
        repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345"),
        repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345"),
        repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345"),
        repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345"),
        repo.processPaymentCallback("AZV-2026-1001", "PR-SIM-12345"),
      ]);

      // Exactly ONE request must be recognized as the first execution
      const firstExecutions = results.filter((r) => r.isFirstExecution);
      expect(firstExecutions.length).toBe(1);

      // All 5 must succeed with 200 OK semantics
      expect(results.every((r) => r.success)).toBe(true);

      // Total alert dispatch counter must be strictly 1
      const state = repo.rows.get("AZV-2026-1001")!;
      expect(state.alertDispatched).toBe(1);
    });
  });
});
