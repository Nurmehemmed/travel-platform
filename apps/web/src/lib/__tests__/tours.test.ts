import { describe, it, expect } from "vitest";
import { TOURS_CATALOG, getTourBySlug, getAllTourSlugs } from "../tours-data";

describe("Tours Catalog Engine", () => {
  it("contains all featured tours with valid prices and durations", () => {
    expect(TOURS_CATALOG.length).toBeGreaterThan(0);

    for (const tour of TOURS_CATALOG) {
      expect(tour.id).toBeDefined();
      expect(tour.slug).toBeDefined();
      expect(tour.title).toBeTruthy();
      expect(tour.price).toBeGreaterThan(0);
      expect(tour.durationHours).toBeGreaterThan(0);
      expect(tour.rating).toBeGreaterThanOrEqual(4.5);
      expect(tour.inclusions.length).toBeGreaterThan(0);
      expect(tour.itinerary.length).toBeGreaterThan(0);
    }
  });

  it("retrieves tour by unique slug", () => {
    const tour = getTourBySlug("baku-old-city-walking-tour");
    expect(tour).toBeDefined();
    expect(tour?.id).toBe("t1");
    expect(tour?.price).toBe(25);
  });

  it("returns undefined for non-existent tour slug", () => {
    const tour = getTourBySlug("non-existent-tour-slug-12345");
    expect(tour).toBeUndefined();
  });

  it("extracts all unique tour slugs", () => {
    const slugs = getAllTourSlugs();
    expect(slugs.length).toBe(TOURS_CATALOG.length);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
