/**
 * @file pricing.ts
 * @description Transfer pricing engine and unique reference code generator.
 */

import { VehicleClass, TransferZone, DynamicTransferPricingConfig } from "./types";
import { VEHICLE_CLASSES } from "./vehicles";

/**
 * Calculates the one-way transfer price for a given zone + vehicle class.
 * Returns null for custom zones (requires manual admin quote).
 */
export function calculateTransferPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass,
  config?: DynamicTransferPricingConfig
): { basePrice: number; totalAmount: number } | null {
  if (zone.isCustom) return null;

  const vehicle = VEHICLE_CLASSES.find((v) => v.id === vehicleClass);
  if (!vehicle) return null;

  const baseRate = config?.baseRates?.[vehicleClass] ?? vehicle.baseRate;
  const perKmRate = config?.perKmRates?.[vehicleClass] ?? vehicle.perKmRate;

  const basePrice = baseRate + perKmRate * zone.distanceKm;
  const totalAmount = Math.ceil(basePrice); // round up to nearest dollar

  return { basePrice, totalAmount };
}

/**
 * Calculates the round-trip price (2× one-way with a discount, default 10%).
 */
export function calculateRoundTripPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass,
  config?: DynamicTransferPricingConfig
): { basePrice: number; totalAmount: number } | null {
  const oneWay = calculateTransferPrice(zone, vehicleClass, config);
  if (!oneWay) return null;

  const discountFraction = (config?.roundTripDiscountPercent ?? 10) / 100;
  const basePrice = oneWay.basePrice * 2 * (1 - discountFraction);
  const totalAmount = Math.ceil(basePrice);

  return { basePrice, totalAmount };
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
