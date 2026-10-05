import { describe, it, expect } from "vitest";
import { TourService, generateReservationNumber, STATIC_CATALOG_PRICES } from "../tour.service";
import { calculatePaymentBreakdown } from "../../lib/transfers/policy";

describe("TourService Domain Logic", () => {
  const tourService = new TourService();

  describe("generateReservationNumber", () => {
    it("generates a reservation code matching TR-XXXXXX", () => {
      const code = generateReservationNumber();
      expect(code).toMatch(/^TR-[A-Z0-9]{6}$/);
    });
  });

  describe("verifyTourPrice", () => {
    it("matches price from static catalog prices for known tour keys", async () => {
      const price = await tourService.verifyTourPrice("baku-old-city-walking-tour", "Baku Old City Walking Tour");
      expect(price).toBe(25);
    });

    it("matches price for Caucasus Mountain Highlands tour", async () => {
      const price = await tourService.verifyTourPrice("caucasus-mountain-highlands", "Caucasus Mountain Highlands");
      expect(price).toBe(85);
    });

    it("returns null for unknown tour and non-existent database package", async () => {
      const price = await tourService.verifyTourPrice("non-existent-tour-id", "Unknown Mystery Tour");
      expect(price).toBeNull();
    });
  });

  describe("validateReservation", () => {
    it("approves valid reservation with matching price", async () => {
      const result = await tourService.validateReservation({
        tourId: "baku-old-city-walking-tour",
        tourTitle: "Baku Old City Walking Tour",
        tourDate: "2026-06-20",
        guests: 2,
        travelerName: "Bob Smith",
        phoneNumber: "+15559876543",
        price: 25,
      });

      expect(result.valid).toBe(true);
      expect(result.trustedUnitPrice).toBe(25);
    });

    it("detects price tampering when client price differs from server price", async () => {
      const result = await tourService.validateReservation({
        tourId: "baku-old-city-walking-tour",
        tourTitle: "Baku Old City Walking Tour",
        tourDate: "2026-06-20",
        guests: 2,
        travelerName: "Hacker Bob",
        phoneNumber: "+15559876543",
        price: 1.0, // Client attempts to buy $25 tour for $1.00
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("mismatch");
    });

    it("rejects missing mandatory details", async () => {
      const result = await tourService.validateReservation({
        tourId: "",
        tourTitle: "",
        tourDate: "",
        travelerName: "",
        phoneNumber: "",
        price: 25,
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("Missing required");
    });
  });

  describe("Tour Deposit & Down Payment Breakdown", () => {
    it("calculates 20% down payment deposit for standard tour ($25)", () => {
      const res = calculatePaymentBreakdown(25, 20);

      expect(res.totalAmount).toBe(25);
      expect(res.depositPercent).toBe(20);
      expect(res.depositAmount).toBe(5);
      expect(res.remainingAmount).toBe(20);
      expect(res.isPartial).toBe(true);
      expect(res.depositAmount + res.remainingAmount).toBe(25);
    });

    it("calculates 20% down payment deposit for Sheki Cultural Journey ($149)", () => {
      const res = calculatePaymentBreakdown(149, 20);

      expect(res.totalAmount).toBe(149);
      expect(res.depositPercent).toBe(20);
      expect(res.depositAmount).toBe(29.8);
      expect(res.remainingAmount).toBe(119.2);
      expect(res.depositAmount + res.remainingAmount).toBe(149);
    });

    it("supports configurable deposit percentage from admin (e.g. 15% or 30%)", () => {
      const res15 = calculatePaymentBreakdown(100, 15);
      expect(res15.depositAmount).toBe(15);
      expect(res15.remainingAmount).toBe(85);

      const res30 = calculatePaymentBreakdown(100, 30);
      expect(res30.depositAmount).toBe(30);
      expect(res30.remainingAmount).toBe(70);
    });

    it("handles zero deposit (pay on tour day)", () => {
      const res = calculatePaymentBreakdown(65, 0);

      expect(res.depositAmount).toBe(0);
      expect(res.remainingAmount).toBe(65);
      expect(res.isPartial).toBe(false);
    });
  });
});

