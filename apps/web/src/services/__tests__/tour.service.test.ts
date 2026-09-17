import { describe, it, expect } from "vitest";
import { TourService, generateReservationNumber, STATIC_CATALOG_PRICES } from "../tour.service";

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
});
