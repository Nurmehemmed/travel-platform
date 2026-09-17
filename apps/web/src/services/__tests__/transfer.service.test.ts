import { describe, it, expect } from "vitest";
import { TransferService, CreateTransferBookingInput } from "../transfer.service";

describe("TransferService Domain Logic", () => {
  const transferService = new TransferService();

  const validOneWayInput: CreateTransferBookingInput = {
    direction: "airport_to_hotel",
    airport: "GYD",
    zoneId: "GYD-baku-center",
    dropoffAddress: "Nizami Street 10",
    vehicleClass: "sedan",
    flightNumber: "J2-075",
    flightDate: "2026-06-15",
    flightTime: "14:30",
    passengerName: "Alice Smith",
    passengerCount: 2,
    phoneNumber: "+15551234567",
    email: "alice@example.com",
    paymentMethod: "online",
  };

  describe("calculatePricing", () => {
    it("calculates one-way transfer pricing correctly for standard sedan", () => {
      const pricing = transferService.calculatePricing("GYD-baku-center", "sedan", "airport_to_hotel");
      expect(pricing).not.toBeNull();
      expect(pricing?.isCustom).toBe(false);
      expect(pricing?.totalAmount).toBe(39); // 25 + 0.45 * 30 = 38.5 -> ceil(38.5) = 39
    });

    it("calculates round-trip transfer pricing with discount", () => {
      const oneWay = transferService.calculatePricing("GYD-baku-center", "sedan", "airport_to_hotel");
      const roundTrip = transferService.calculatePricing("GYD-baku-center", "sedan", "round_trip");
      expect(oneWay).not.toBeNull();
      expect(roundTrip).not.toBeNull();
      expect(roundTrip!.totalAmount).toBe(70);
      // Round trip discount price is strictly less than 2x single price (70 < 78)
      expect(roundTrip!.totalAmount).toBeLessThan(oneWay!.totalAmount * 2);
    });

    it("handles custom regions with zero base price placeholder", () => {
      const customPricing = transferService.calculatePricing("GYD-custom", "sedan", "airport_to_hotel");
      expect(customPricing).not.toBeNull();
      expect(customPricing?.isCustom).toBe(true);
      expect(customPricing?.totalAmount).toBe(0);
    });

    it("returns null for non-existent zone", () => {
      const pricing = transferService.calculatePricing("invalid_zone_id", "sedan", "airport_to_hotel");
      expect(pricing).toBeNull();
    });
  });

  describe("validateBooking", () => {
    it("validates valid one-way booking", () => {
      const result = transferService.validateBooking(validOneWayInput);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("rejects invalid email address", () => {
      const result = transferService.validateBooking({
        ...validOneWayInput,
        email: "not-an-email",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("valid email");
    });

    it("rejects missing return flight details for round-trip", () => {
      const result = transferService.validateBooking({
        ...validOneWayInput,
        direction: "round_trip",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Return flight details are required");
    });

    it("accepts complete round-trip booking", () => {
      const result = transferService.validateBooking({
        ...validOneWayInput,
        direction: "round_trip",
        returnFlightNumber: "J2-076",
        returnDate: "2026-06-22",
        returnTime: "18:00",
      });
      expect(result.valid).toBe(true);
    });

    it("rejects invalid vehicle class", () => {
      const result = transferService.validateBooking({
        ...validOneWayInput,
        vehicleClass: "flying_carpet",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("vehicle class");
    });
  });
});
