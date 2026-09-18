/**
 * @file types.ts
 * @description Core TypeScript types and interfaces for the transfer domain.
 */

export type VehicleClass = "sedan" | "suv" | "minivan" | "sprinter" | "economy" | "business" | "executive";

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

export type AirportCode = "GYD" | "GJA" | "NAJ";

export interface AirportInfo {
  code: AirportCode;
  name: string;
  city: string;
  fullName: string;
  lat: number;
  lng: number;
}

export interface TransferZone {
  id: string;
  airport: AirportCode;
  name: string;           // Display name
  description: string;    // Address / area description
  distanceKm: number;     // One-way distance from airport
  isCustom?: boolean;     // true = admin quotes manually
}

export type DestinationCategory = "hotel" | "district" | "region" | "custom";

export interface DestinationLocation {
  id: string;
  name: string;
  category: DestinationCategory;
  zoneId: string;
  airport: AirportCode;
  distanceKm: number;
  address?: string | undefined;
  aliases?: string[] | undefined;
  badge?: string | undefined;
  lat?: number | undefined;
  lng?: number | undefined;
}

export interface DynamicTransferPricingConfig {
  baseRates?: Partial<Record<VehicleClass, number>>;
  perKmRates?: Partial<Record<VehicleClass, number>>;
  roundTripDiscountPercent?: number;
}
