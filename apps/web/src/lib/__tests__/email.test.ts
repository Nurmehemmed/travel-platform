import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sendTransactionalEmail,
  sendVisaConfirmationEmail,
  sendTransferConfirmationEmail,
} from "../email";

describe("Transactional Email Dispatcher", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("handles missing RESEND_API_KEY gracefully without crashing", async () => {
    delete process.env.RESEND_API_KEY;

    const visaEmail = await sendVisaConfirmationEmail({
      to: "traveler@example.com",
      applicantName: "Jane Doe",
      referenceNumber: "AZV-123456",
      visaType: "standard",
      arrivalDate: "2026-07-01",
      totalAmount: 59,
    });
    expect(visaEmail).toBe(false);

    const transferEmail = await sendTransferConfirmationEmail({
      to: "traveler@example.com",
      passengerName: "John Smith",
      bookingNumber: "ATR-987654",
      direction: "arrival",
      airport: "Heydar Aliyev International Airport (GYD)",
      pickupZone: "Zone 1 - City Center",
      flightNumber: "TK332",
      flightDate: "2026-07-01",
      totalAmount: 25,
    });
    expect(transferEmail).toBe(false);
  });

  it("dispatches transactional email when configured", async () => {
    process.env.RESEND_API_KEY = "re_test_key_12345";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_msg_123" }),
    } as any);

    const result = await sendTransactionalEmail({
      to: "customer@example.com",
      subject: "Test Booking Confirmation",
      html: "<p>Hello traveler</p>",
    });

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test_key_12345",
        }),
      })
    );
  });
});
