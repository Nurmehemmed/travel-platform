import { describe, it, expect } from "vitest";
import {
  DESTINATIONS_CATALOG,
  getDestinationBySlug,
  getAllDestinationSlugs,
} from "../destinations-data";

describe("Destinations Catalog Engine", () => {
  it("contains all major Azerbaijan destinations with complete metadata", () => {
    expect(DESTINATIONS_CATALOG.length).toBeGreaterThan(0);

    for (const dest of DESTINATIONS_CATALOG) {
      expect(dest.slug).toBeTruthy();
      expect(dest.name).toBeTruthy();
      expect(dest.heroImage).toBeTruthy();
      expect(dest.topHighlights.length).toBeGreaterThan(0);
      expect(dest.distanceFromBaku).toBeTruthy();
    }
  });

  it("retrieves Baku destination details by slug", () => {
    const baku = getDestinationBySlug("baku");
    expect(baku).toBeDefined();
    expect(baku?.name).toBe("Baku");
    expect(baku?.topHighlights.some((h) => h.title.includes("Icherisheher"))).toBe(true);
  });

  it("retrieves Sheki, Gabala, and Naftalan by valid slugs", () => {
    expect(getDestinationBySlug("gabala")).toBeDefined();
    expect(getDestinationBySlug("sheki")).toBeDefined();
    expect(getDestinationBySlug("naftalan")).toBeDefined();
    expect(getDestinationBySlug("shahdag")).toBeDefined();
    expect(getDestinationBySlug("gobustan")).toBeDefined();
    expect(getDestinationBySlug("absheron")).toBeDefined();
  });

  it("returns undefined for unknown destination slug", () => {
    expect(getDestinationBySlug("unknown-place-xyz")).toBeUndefined();
  });

  it("lists all unique destination slugs", () => {
    const slugs = getAllDestinationSlugs();
    expect(slugs.length).toBe(DESTINATIONS_CATALOG.length);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});
