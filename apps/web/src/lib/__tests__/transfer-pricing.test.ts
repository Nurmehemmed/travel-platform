import { describe, it, expect } from "vitest";
import {
  calculateTransferPrice,
  calculateRoundTripPrice,
  getZoneById,
  getAirportByCode,
  generateTransferRef,
  getDestinationsByAirport,
  getLocationById,
  searchDestinations,
  resolveLocationOrZone,
  calculateHaversineDistanceKm,
  resolveLocationByCoords,
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

    expect(ref1).toMatch(/^ATR-[A-HJ-NP-Z2-9]{6}$/);
    expect(ref2).toMatch(/^ATR-[A-HJ-NP-Z2-9]{6}$/);
    expect(ref1).not.toBe(ref2);
  });

  it("finds destinations by airport and category", () => {
    const gydDests = getDestinationsByAirport("GYD");
    expect(gydDests.length).toBeGreaterThan(20);

    // Verify hotel category exists
    const marriott = getLocationById("loc-jw-marriott");
    expect(marriott).toBeDefined();
    expect(marriott?.name).toContain("JW Marriott");
    expect(marriott?.category).toBe("hotel");

    // Verify regional search
    const shahdagResults = searchDestinations("Shahdag", "GYD");
    expect(shahdagResults.length).toBeGreaterThan(0);
    expect(shahdagResults.some((d: any) => d.id === "loc-reg-shahdag")).toBe(true);

    // Verify alias search (e.g. search "marriott" finds JW Marriott and Courtyard)
    const marriottResults = searchDestinations("marriott", "GYD");
    expect(marriottResults.length).toBeGreaterThanOrEqual(2);

    // Verify location or zone resolution
    const resolvedLoc = resolveLocationOrZone("loc-jw-marriott", "GYD");
    expect(resolvedLoc.location).toBeDefined();
    expect(resolvedLoc.zone.id).toBe("GYD-baku-center");

    const resolvedZone = resolveLocationOrZone("GYD-baku-center", "GYD");
    expect(resolvedZone.zone.id).toBe("GYD-baku-center");
  });

  it("computes Haversine distance and resolves coordinates to transfer zones", () => {
    // GYD to Baku Center (~20-25 km direct)
    const directDist = calculateHaversineDistanceKm(40.4675, 50.0469, 40.3756, 49.8450);
    expect(directDist).toBeGreaterThan(15);
    expect(directDist).toBeLessThan(30);

    // Resolve coordinates in Shahdag (North > 41 deg lat)
    const shahdagCoords = resolveLocationByCoords(41.3214, 48.1464, "GYD");
    expect(shahdagCoords.zone.id).toBe("GYD-shahdag");
    expect(shahdagCoords.distanceKm).toBe(210);

    // Resolve coordinates in Baku Boulevard
    const bulvarCoords = resolveLocationByCoords(40.3760, 49.8600, "GYD");
    expect(bulvarCoords.zone.id).toBe("GYD-baku-bulvar");

    // Resolve coordinates in Ganja
    const goygolCoords = resolveLocationByCoords(40.5500, 46.3000, "GJA");
    expect(goygolCoords.zone.id).toBe("GJA-goygol");

    // Resolve coordinates in Mingachevir
    const mingachevirCoords = resolveLocationByCoords(40.7700, 47.0500, "GYD");
    expect(mingachevirCoords.zone.id).toBe("GYD-mingachevir");
    expect(mingachevirCoords.distanceKm).toBe(285);
  });

  it("resolves custom map location pins to valid locations and calculates pricing", () => {
    // Custom pin in Baku center
    const customBaku = resolveLocationOrZone("custom:Nizami Street 45, Baku", "GYD");
    expect(customBaku.location).toBeDefined();
    expect(customBaku.location?.name).toBe("Nizami Street 45, Baku");
    expect(customBaku.zone.id).toBe("GYD-baku-center");

    const price = calculateTransferPrice(customBaku.zone, "sedan");
    expect(price).not.toBeNull();
    expect(price?.totalAmount).toBeGreaterThan(0);

    // Custom pin in Mingachevir
    const customMing = resolveLocationOrZone("custom:Mingachevir Kur Riverside Hotel", "GYD");
    expect(customMing.location).toBeDefined();
    expect(customMing.zone.id).toBe("GYD-mingachevir");

    // Custom pin in Shahdag
    const customShahdag = resolveLocationOrZone("custom:Shahdag Chalet 12", "GYD");
    expect(customShahdag.location).toBeDefined();
    expect(customShahdag.zone.id).toBe("GYD-shahdag");

    // Custom pin in Bilgah
    const customBilgah = resolveLocationOrZone("custom:Bilgah Seafront Villa", "GYD");
    expect(customBilgah.location).toBeDefined();
    expect(customBilgah.zone.id).toBe("GYD-absheron");
  });

  it("retrieves valid airport by IATA code", () => {
    const gyd = getAirportByCode("GYD");
    expect(gyd).toBeDefined();
    expect(gyd?.code).toBe("GYD");
    expect(gyd?.city).toBe("Baku");
    expect(gyd?.lat).toBeCloseTo(40.4675, 2);
    expect(gyd?.lng).toBeCloseTo(50.0469, 2);
  });
});

