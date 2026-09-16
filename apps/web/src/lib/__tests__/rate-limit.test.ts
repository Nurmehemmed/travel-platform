import { describe, it, expect } from "vitest";
import { checkRateLimit, getClientIp } from "../rate-limit";

describe("Rate Limiter Engine", () => {
  it("permits requests within allowed limit", () => {
    const testId = `test_user_${Date.now()}_1`;
    const r1 = checkRateLimit(testId, { limit: 3, windowMs: 5000 });
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit(testId, { limit: 3, windowMs: 5000 });
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = checkRateLimit(testId, { limit: 3, windowMs: 5000 });
    expect(r3.success).toBe(true);
    expect(r3.remaining).toBe(0);
  });

  it("blocks requests exceeding the configured limit", () => {
    const testId = `test_user_${Date.now()}_2`;
    // Consume 2 allowed tokens
    checkRateLimit(testId, { limit: 2, windowMs: 5000 });
    checkRateLimit(testId, { limit: 2, windowMs: 5000 });

    // 3rd attempt should be blocked
    const blocked = checkRateLimit(testId, { limit: 2, windowMs: 5000 });
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("extracts client IP from x-forwarded-for header", () => {
    const req = new Request("https://example.com/api/test", {
      headers: {
        "x-forwarded-for": "203.0.113.195, 70.41.3.18, 150.172.238.178",
      },
    });

    const ip = getClientIp(req);
    expect(ip).toBe("203.0.113.195");
  });

  it("falls back to x-real-ip when forwarded header is absent", () => {
    const req = new Request("https://example.com/api/test", {
      headers: {
        "x-real-ip": "198.51.100.4",
      },
    });

    const ip = getClientIp(req);
    expect(ip).toBe("198.51.100.4");
  });
});
