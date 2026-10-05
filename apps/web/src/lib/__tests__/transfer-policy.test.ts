import { describe, it, expect } from "vitest";
import {
  MIN_TRANSFER_LEAD_TIME_HOURS,
  parseFlightDateTimeToTimestamp,
  getLeadTimeHours,
  validateTransferLeadTime,
  validateReturnFlightTime,
  getMinTransferBookingDate,
  calculateTransferPaymentBreakdown,
} from "../transfers/policy";

describe("Transfer Policy & Lead Time Rules", () => {
  it("defines minimum lead time as 8 hours", () => {
    expect(MIN_TRANSFER_LEAD_TIME_HOURS).toBe(8);
  });

  describe("parseFlightDateTimeToTimestamp", () => {
    it("parses valid date and time string in Azerbaijan UTC+4 timezone", () => {
      const ts = parseFlightDateTimeToTimestamp("2026-10-10", "14:30");
      expect(ts).not.toBeNull();
      // 2026-10-10T14:30:00+04:00 is 2026-10-10T10:30:00Z
      const expectedUtc = Date.parse("2026-10-10T10:30:00Z");
      expect(ts).toBe(expectedUtc);
    });

    it("returns null for invalid date or time formats", () => {
      expect(parseFlightDateTimeToTimestamp("", "14:30")).toBeNull();
      expect(parseFlightDateTimeToTimestamp("2026-10-10", "")).toBeNull();
      expect(parseFlightDateTimeToTimestamp("invalid-date", "14:30")).toBeNull();
      expect(parseFlightDateTimeToTimestamp("2026-10-10", "25:00")).toBeNull();
      expect(parseFlightDateTimeToTimestamp("2026-10-10", "14:65")).toBeNull();
    });
  });

  describe("validateTransferLeadTime", () => {
    const fixedNow = Date.parse("2026-10-05T12:00:00Z"); // 16:00 in Baku (UTC+4)

    it("rejects booking when flight is only 2 hours away (< 8 hours)", () => {
      // 18:00 in Baku = 14:00 UTC (2 hours from 12:00 UTC)
      const res = validateTransferLeadTime("2026-10-05", "18:00", 8, fixedNow);
      expect(res.valid).toBe(false);
      expect(res.error).toContain("up to a maximum of 8 hours prior to arrival");
    });

    it("rejects booking when flight is exactly 7 hours and 59 minutes away", () => {
      // 16:00 + 7h 59m = 23:59 Baku time
      const res = validateTransferLeadTime("2026-10-05", "23:59", 8, fixedNow);
      expect(res.valid).toBe(false);
      expect(res.error).toContain("up to a maximum of 8 hours prior to arrival");
    });

    it("accepts booking when flight is exactly 8 hours away or more", () => {
      // 16:00 + 8h = 00:00 next day (2026-10-06)
      const res = validateTransferLeadTime("2026-10-06", "00:00", 8, fixedNow);
      expect(res.valid).toBe(true);
      expect(res.hoursRemaining).toBeGreaterThanOrEqual(8);
    });

    it("accepts booking for flights days in advance", () => {
      const res = validateTransferLeadTime("2026-10-10", "15:00", 8, fixedNow);
      expect(res.valid).toBe(true);
      expect(res.hoursRemaining).toBeGreaterThan(24);
    });

    it("rejects booking for flights in the past", () => {
      const res = validateTransferLeadTime("2026-10-04", "12:00", 8, fixedNow);
      expect(res.valid).toBe(false);
      expect(res.error).toContain("cannot be in the past");
    });
  });

  describe("validateReturnFlightTime", () => {
    const fixedNow = Date.parse("2026-10-05T12:00:00Z"); // 16:00 in Baku

    it("rejects round trip when return flight is scheduled before arrival flight", () => {
      const res = validateReturnFlightTime(
        "2026-10-10",
        "15:00",
        "2026-10-09",
        "15:00",
        8,
        fixedNow
      );
      expect(res.valid).toBe(false);
      expect(res.error).toContain("must be after the arrival flight");
    });

    it("rejects round trip when return flight is at the exact same minute as arrival", () => {
      const res = validateReturnFlightTime(
        "2026-10-10",
        "15:00",
        "2026-10-10",
        "15:00",
        8,
        fixedNow
      );
      expect(res.valid).toBe(false);
      expect(res.error).toContain("must be after the arrival flight");
    });

    it("rejects round trip when return flight violates 8-hour lead time", () => {
      const res = validateReturnFlightTime(
        "2026-10-05",
        "17:00",
        "2026-10-05",
        "18:00",
        8,
        fixedNow
      );
      expect(res.valid).toBe(false);
      expect(res.error).toContain("Return flight");
    });

    it("accepts valid round trip with return flight after arrival", () => {
      const res = validateReturnFlightTime(
        "2026-10-10",
        "15:00",
        "2026-10-15",
        "18:00",
        8,
        fixedNow
      );
      expect(res.valid).toBe(true);
    });
  });

  describe("getMinTransferBookingDate", () => {
    it("returns tomorrow if remaining time today is less than 8 hours", () => {
      // 18:00 in Baku on 2026-10-05 (14:00 UTC) -> 18:00 + 8h = 02:00 next day (2026-10-06)
      const nowBakuEvening = Date.parse("2026-10-05T14:00:00Z");
      const minDate = getMinTransferBookingDate(8, nowBakuEvening);
      expect(minDate).toBe("2026-10-06");
    });

    it("returns today if current time + 8 hours is still within today in Baku", () => {
      // 08:00 in Baku on 2026-10-05 (04:00 UTC) -> 08:00 + 8h = 16:00 today (2026-10-05)
      const nowBakuMorning = Date.parse("2026-10-05T04:00:00Z");
      const minDate = getMinTransferBookingDate(8, nowBakuMorning);
      expect(minDate).toBe("2026-10-05");
    });
  });

  describe("calculateTransferPaymentBreakdown", () => {
    it("calculates default 20% down payment deposit and 80% remaining amount correctly", () => {
      const breakdown = calculateTransferPaymentBreakdown(100, 20);
      expect(breakdown.depositPercent).toBe(20);
      expect(breakdown.depositAmount).toBe(20);
      expect(breakdown.remainingAmount).toBe(80);
      expect(breakdown.totalAmount).toBe(100);
      expect(breakdown.isPartial).toBe(true);
    });

    it("handles fractional totals with 2 decimal precision", () => {
      // 39 * 0.20 = 7.8
      const breakdown = calculateTransferPaymentBreakdown(39, 20);
      expect(breakdown.depositAmount).toBe(7.8);
      expect(breakdown.remainingAmount).toBe(31.2);
      expect(breakdown.depositAmount + breakdown.remainingAmount).toBe(39);
    });

    it("handles custom configurable deposit percent (e.g. 30%)", () => {
      const breakdown = calculateTransferPaymentBreakdown(200, 30);
      expect(breakdown.depositPercent).toBe(30);
      expect(breakdown.depositAmount).toBe(60);
      expect(breakdown.remainingAmount).toBe(140);
      expect(breakdown.isPartial).toBe(true);
    });

    it("handles 100% full payment without partial flag", () => {
      const breakdown = calculateTransferPaymentBreakdown(150, 100);
      expect(breakdown.depositPercent).toBe(100);
      expect(breakdown.depositAmount).toBe(150);
      expect(breakdown.remainingAmount).toBe(0);
      expect(breakdown.isPartial).toBe(false);
    });

    it("handles 0% deposit without partial flag", () => {
      const breakdown = calculateTransferPaymentBreakdown(80, 0);
      expect(breakdown.depositPercent).toBe(0);
      expect(breakdown.depositAmount).toBe(0);
      expect(breakdown.remainingAmount).toBe(80);
      expect(breakdown.isPartial).toBe(false);
    });
  });
});
