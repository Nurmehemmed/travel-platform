import { describe, it, expect } from "vitest";
import {
  calculateTransferPrice,
  calculateRoundTripPrice,
  getZoneById,
  getAirportByCode,
  generateTransferRef,
} from "../transfer-zones";

describe("Transfer Pricing Engine", () => {
  it("calculates one-way sedan price accurately for Baku City Center", () => {
    const zone = getZoneById("gyd-baku-center");
    expect(zone).toBeDefined();

    const price = calculateTransferPrice(zone!, "sedan");
    expect(price).not.toBeNull();
    // Sedan base: 25 + 0.45 * 30km = 25 + 13.5 = 38.5 -> ceil(38.5) = 39
    expect(price?.basePrice).toBeCloseTo(38.5, 1);
    expect(price?.totalAmount).toBe(39);
  });

  it("calculates one-way SUV price for Baku City Center", () => {
    const zone = getZoneById("gyd-baku-center");
    expect(zone).toBeDefined();

    const price = calculateTransferPrice(zone!, "suv");
    expect(price).not.toBeNull();
    // SUV base: 40 + 0.60 * 30km = 40 + 18 = 58.0 -> ceil(58) = 58
    expect(price?.basePrice).toBeCloseTo(58.0, 1);
    expect(price?.totalAmount).toBe(58);
  });

  it("applies 10% round-trip discount on both legs", () => {
    const zone = getZoneById("gyd-baku-center");
    expect(zone).toBeDefined();

    const oneWay = calculateTransferPrice(zone!, "sedan");
    const roundTrip = calculateRoundTripPrice(zone!, "sedan");

    expect(oneWay).not.toBeNull();
    expect(roundTrip).not.toBeNull();

    // 2 * 38.5 * 0.9 = 77 * 0.9 = 69.3 -> ceil(69.3) = 70
    expect(roundTrip?.basePrice).toBeCloseTo(oneWay!.basePrice * 2 * 0.9, 2);
    expect(roundTrip?.totalAmount).toBe(70);
    // Discounted price must be strictly less than 2x single price (70 < 78)
    expect(roundTrip!.totalAmount).toBeLessThan(oneWay!.totalAmount * 2);
  });

  it("returns null for custom quote zones", () => {
    const customZone = getZoneById("gyd-custom");
    if (customZone) {
      const price = calculateTransferPrice(customZone, "sedan");
      expect(price).toBeNull();
    }
  });

  it("generates collision-safe booking reference in ATR-XXXXXX format", () => {
    const ref1 = generateTransferRef();
    const ref2 = generateTransferRef();

    expect(ref1).toMatch(/^ATR-[A-Z0-9]{6}$/);
    expect(ref2).toMatch(/^ATR-[A-Z0-9]{6}$/);
    expect(ref1).not.toBe(ref2);
  });

  it("retrieves valid airport by IATA code", () => {
    const gyd = getAirportByCode("GYD");
    expect(gyd).toBeDefined();
    expect(gyd?.code).toBe("GYD");
    expect(gyd?.city).toBe("Baku");
  });
});
