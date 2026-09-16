import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { validateBotProtection } from "../anti-bot";

describe("Anti-Bot & Fraud Mitigation Engine", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("permits legitimate human submissions with empty honeypot and normal duration", async () => {
    const result = await validateBotProtection({
      honeypotValue: "",
      formStartedAt: Date.now() - 5000, // 5 seconds elapsed
    });

    expect(result.isBot).toBe(false);
  });

  it("catches automated bot filling hidden honeypot trap", async () => {
    const result = await validateBotProtection({
      honeypotValue: "http://spam-link.ru",
      formStartedAt: Date.now() - 5000,
    });

    expect(result.isBot).toBe(true);
    expect(result.reason).toContain("Honeypot");
  });

  it("catches superhuman form submission speed (< 1.2 seconds)", async () => {
    const result = await validateBotProtection({
      honeypotValue: "",
      formStartedAt: Date.now() - 300, // 300ms elapsed
    });

    expect(result.isBot).toBe(true);
    expect(result.reason).toContain("speed");
  });

  it("verifies Cloudflare Turnstile token when configured", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test_turnstile_secret";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as any);

    const result = await validateBotProtection({
      honeypotValue: "",
      formStartedAt: Date.now() - 4000,
      turnstileToken: "cf_token_valid_123",
      clientIp: "127.0.0.1",
    });

    expect(result.isBot).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" })
    );
  });
});
