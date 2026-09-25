/**
 * @file brand.ts
 * @description Centralized brand identity configuration.
 * Allows effortless testing and switching of the platform's brand identity
 * (e.g. HiBaku vs Bakuya vs AddmeTour) with 100% clean reversibility.
 */

export type BrandKey = "hibaku" | "bakuya" | "addmetour";

export interface BrandConfig {
  brandKey: BrandKey;
  name: string;
  brandMark: string;
  subMark: string;
  tagline: string;
  legalName: string;
  logo: {
    full: string;
    emblem: string;
    favicon: string;
    alt: string;
  };
}

/**
 * Brand Switcher:
 * - "hibaku"   -> HiBaku ("Hi, Baku! Discover Azerbaijan")
 * - "bakuya"   -> Bakuya ("Bakuya — Discover Azerbaijan")
 * - "addmetour"-> AddmeTour (Original brand identity)
 */
export const ACTIVE_BRAND: BrandKey = "hibaku";

export const BRANDS: Record<BrandKey, BrandConfig> = {
  hibaku: {
    brandKey: "hibaku",
    name: "HiBaku",
    brandMark: "HIBAKU",
    subMark: "DISCOVER AZERBAIJAN",
    tagline: "Hi, Baku! More Than a Destination",
    legalName: "HiBaku Travel Services LLC",
    logo: {
      full: "/images/bakuya-logo.png",
      emblem: "/images/bakuya-emblem.png",
      favicon: "/images/bakuya-favicon.png",
      alt: "HiBaku — Discover Azerbaijan",
    },
  },
  bakuya: {
    brandKey: "bakuya",
    name: "Bakuya",
    brandMark: "BAKUYA",
    subMark: "DISCOVER AZERBAIJAN",
    tagline: "More Than a Destination",
    legalName: "Bakuya Travel Services LLC",
    logo: {
      full: "/images/bakuya-logo.png",
      emblem: "/images/bakuya-emblem.png",
      favicon: "/images/bakuya-favicon.png",
      alt: "Bakuya — Discover Azerbaijan",
    },
  },
  addmetour: {
    brandKey: "addmetour",
    name: "AddmeTour",
    brandMark: "addmetour",
    subMark: "Baku & Azerbaijan",
    tagline: "Handcrafted Local Tours & VIP Travel",
    legalName: "AddmeTour Travel Services LLC",
    logo: {
      full: "/images/bakuya-logo.png",
      emblem: "/images/bakuya-emblem.png",
      favicon: "/favicon.ico",
      alt: "AddmeTour — Discover Azerbaijan",
    },
  },
};

export const CURRENT_BRAND: BrandConfig = BRANDS[ACTIVE_BRAND];
