/**
 * @file transfer-zones.ts
 * @description Airport transfer zone definitions, pricing engine, and booking reference generator.
 *
 * Pricing model: base_rate + (per_km_rate × distance)
 * Zones are preset per airport to avoid ambiguity for drivers and operations.
 */

// ─── Vehicle Class Config ─────────────────────────────────────────────────────

export type VehicleClass = "sedan" | "suv" | "minivan" | "economy" | "business" | "executive";

export interface VehicleConfig {
  id: VehicleClass;
  label: string;
  description: string;
  capacity: string;      // e.g. "1–3 passengers"
  maxPax: number;        // Maximum passenger count
  luggage: string;       // e.g. "2 large bags"
  maxLuggage: number;    // Maximum luggage pieces
  baseRate: number;      // USD — flat base regardless of distance
  perKmRate: number;     // USD per km
  icon: string;          // Emoji icon for UI
  features: string[];
}

export const VEHICLE_CLASSES: VehicleConfig[] = [
  {
    id: "sedan",
    label: "Sedan",
    description: "Comfortable, air-conditioned sedan. Perfect for solo travelers, couples, or small groups.",
    capacity: "1–3 passengers",
    maxPax: 3,
    luggage: "2 large bags",
    maxLuggage: 2,
    baseRate: 25,
    perKmRate: 0.45,
    icon: "🚗",
    features: ["Air conditioning", "Door-to-door service", "Flight monitoring", "Bottled water"],
  },
  {
    id: "suv",
    label: "SUV",
    description: "Spacious crossover / SUV with high comfort, all-wheel drive, and extra luggage space.",
    capacity: "1–4 passengers",
    maxPax: 4,
    luggage: "4 large bags",
    maxLuggage: 4,
    baseRate: 40,
    perKmRate: 0.60,
    icon: "🚙",
    features: ["High clearance & AWD", "Extra luggage room", "Meet & Greet service", "Flight monitoring"],
  },
  {
    id: "minivan",
    label: "Minivan",
    description: "Spacious passenger van (e.g. Mercedes Vito, VW Transporter). Ideal for families and groups.",
    capacity: "4–7 passengers",
    maxPax: 7,
    luggage: "6 large bags",
    maxLuggage: 6,
    baseRate: 55,
    perKmRate: 0.75,
    icon: "🚐",
    features: ["Spacious 7-seater cabin", "Large luggage capacity", "Child seat on request", "Flight monitoring"],
  },
];

// ─── Airport Definitions ───────────────────────────────────────────────────────

export type AirportCode = "GYD" | "GJA" | "NAJ";

export interface AirportInfo {
  code: AirportCode;
  name: string;
  city: string;
  fullName: string;
}

export const AIRPORTS: AirportInfo[] = [
  {
    code: "GYD",
    name: "Heydar Aliyev International",
    city: "Baku",
    fullName: "Heydar Aliyev International Airport (GYD)",
  },
  {
    code: "GJA",
    name: "Ganja Airport",
    city: "Ganja",
    fullName: "Ganja Airport (GJA)",
  },
  {
    code: "NAJ",
    name: "Nakhchivan Airport",
    city: "Nakhchivan",
    fullName: "Nakhchivan Airport (NAJ)",
  },
];

// ─── Zone Definitions ─────────────────────────────────────────────────────────

export interface TransferZone {
  id: string;
  airport: AirportCode;
  name: string;           // Display name
  description: string;    // Address / area description
  distanceKm: number;     // One-way distance from airport
  isCustom?: boolean;     // true = admin quotes manually
}

export const TRANSFER_ZONES: TransferZone[] = [
  // ── GYD (Baku) ──────────────────────────────────────────────────────────────
  {
    id: "GYD-baku-center",
    airport: "GYD",
    name: "Baku City Center",
    description: "Old City, Fountain Square, Nizami Street, Boulevard",
    distanceKm: 30,
  },
  {
    id: "GYD-baku-bulvar",
    airport: "GYD",
    name: "Baku Boulevard / Caspian Waterfront",
    description: "Seaside National Park, Park Bulvar Mall, Marriott, Fairmont",
    distanceKm: 32,
  },
  {
    id: "GYD-sabail",
    airport: "GYD",
    name: "Sabail / Flame Towers Area",
    description: "Flame Towers, Sahil, Icheri Sheher",
    distanceKm: 28,
  },
  {
    id: "GYD-absheron",
    airport: "GYD",
    name: "Absheron (Novkhani, Pirallahi)",
    description: "Absheron district outskirts — Novkhani, Pirallahi, Balakhani",
    distanceKm: 15,
  },
  {
    id: "GYD-sumqayit",
    airport: "GYD",
    name: "Sumqayit",
    description: "Sumqayit city center and residential areas",
    distanceKm: 45,
  },
  {
    id: "GYD-khirdalan",
    airport: "GYD",
    name: "Khirdalan / Absheron Highway",
    description: "Khirdalan, Binagadi, Masazir",
    distanceKm: 20,
  },
  {
    id: "GYD-custom",
    airport: "GYD",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },

  // ── GJA (Ganja) ─────────────────────────────────────────────────────────────
  {
    id: "GJA-ganja-center",
    airport: "GJA",
    name: "Ganja City Center",
    description: "Ganja downtown, hotels, and city center",
    distanceKm: 8,
  },
  {
    id: "GJA-custom",
    airport: "GJA",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },

  // ── NAJ (Nakhchivan) ────────────────────────────────────────────────────────
  {
    id: "NAJ-nakhchivan-center",
    airport: "NAJ",
    name: "Nakhchivan City Center",
    description: "Nakhchivan city, hotels and central districts",
    distanceKm: 7,
  },
  {
    id: "NAJ-custom",
    airport: "NAJ",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },
];

// ─── Pricing Engine ───────────────────────────────────────────────────────────

/**
 * Calculates the one-way transfer price for a given zone + vehicle class.
 * Returns null for custom zones (requires manual admin quote).
 */
export function calculateTransferPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass
): { basePrice: number; totalAmount: number } | null {
  if (zone.isCustom) return null;

  const vehicle = VEHICLE_CLASSES.find((v) => v.id === vehicleClass);
  if (!vehicle) return null;

  const basePrice = vehicle.baseRate + vehicle.perKmRate * zone.distanceKm;
  const totalAmount = Math.ceil(basePrice); // round up to nearest dollar

  return { basePrice, totalAmount };
}

/**
 * Calculates the round-trip price (2× one-way with a 10% discount).
 */
export function calculateRoundTripPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass
): { basePrice: number; totalAmount: number } | null {
  const oneWay = calculateTransferPrice(zone, vehicleClass);
  if (!oneWay) return null;

  const basePrice = oneWay.basePrice * 2 * 0.9;  // 10% round-trip discount
  const totalAmount = Math.ceil(basePrice);

  return { basePrice, totalAmount };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get all zones for a given airport */
export function getZonesByAirport(airport: AirportCode): TransferZone[] {
  return TRANSFER_ZONES.filter((z) => z.airport === airport);
}

/** Find a zone by its ID (flexible to case and underscore/hyphen) */
export function getZoneById(id: string): TransferZone | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().replace(/_/g, "-");
  return TRANSFER_ZONES.find((z) => z.id.toLowerCase().replace(/_/g, "-") === normalized);
}

/** Get airport info by code */
export function getAirportByCode(code: AirportCode): AirportInfo | undefined {
  return AIRPORTS.find((a) => a.code === code);
}

/** Get vehicle config by class */
export function getVehicleConfig(vehicleClass: string): VehicleConfig | undefined {
  return VEHICLE_CLASSES.find((v) => v.id.toLowerCase() === vehicleClass.toLowerCase());
}

/**
 * Generates a unique booking reference in the format ATR-XXXXXX
 */
export function generateTransferRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Unambiguous chars
  let ref = "";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ATR-${ref}`;
}
