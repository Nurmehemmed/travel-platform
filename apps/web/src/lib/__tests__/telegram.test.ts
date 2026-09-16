import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sendTelegramVisaAlert,
  sendTelegramTransferAlert,
  sendTelegramAlert,
} from "../telegram";

describe("Telegram Operations Alert Dispatcher", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("handles missing environment variables gracefully without throwing", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const visaResult = await sendTelegramVisaAlert({
      applicationNumber: "EV-TEST-123456",
      visaType: "standard",
      applicantName: "Jane Doe",
      nationality: "United States",
      passportNumber: "P12345678",
      arrivalDate: "2026-07-01",
      totalAmount: 49,
      email: "jane@example.com",
      phoneNumber: "+15551234567",
    });
    expect(visaResult).toBe(false);

    const transferResult = await sendTelegramTransferAlert({
      bookingNumber: "TR-TEST-9999",
      direction: "arrival",
      airport: "GYD",
      pickupZone: "Zone 1",
      dropoffAddress: "Hilton Baku",
      vehicleClass: "sedan",
      flightNumber: "TK332",
      flightDate: "2026-07-01",
      flightTime: "14:30",
      passengerName: "John Smith",
      passengerCount: 2,
      phoneNumber: "+15559876543",
      email: "john@example.com",
      totalAmount: 25,
      paymentMethod: "on_arrival",
    });
    expect(transferResult).toBe(false);

    const genericResult = await sendTelegramAlert("Test alert");
    expect(genericResult).toBe(false);
  });

  it("dispatches visa alerts correctly when configured", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test_token_123";
    process.env.TELEGRAM_CHAT_ID = "test_chat_456";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as any);

    const result = await sendTelegramVisaAlert({
      applicationNumber: "EV-TEST-123456",
      visaType: "urgent",
      applicantName: "Jane Doe",
      nationality: "United States",
      passportNumber: "P12345678",
      arrivalDate: "2026-07-01",
      totalAmount: 85,
      email: "jane@example.com",
      phoneNumber: "+15551234567",
    });

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest_token_123/sendMessage",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("catches network or timeout errors safely", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test_token_123";
    process.env.TELEGRAM_CHAT_ID = "test_chat_456";

    global.fetch = vi.fn().mockRejectedValue(new Error("Network timeout after 5000ms"));

    const result = await sendTelegramAlert("Critical system ping");
    expect(result).toBe(false);
  });
});
