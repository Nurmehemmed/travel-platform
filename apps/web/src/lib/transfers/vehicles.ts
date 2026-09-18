/**
 * @file vehicles.ts
 * @description Vehicle configurations, specs, and dynamic availability helpers.
 */

import { VehicleClass, VehicleConfig } from "./types";

export const ALL_VEHICLE_CLASSES: VehicleConfig[] = [
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
    baseRate: 40,
    perKmRate: 0.75,
    icon: "🚐",
    features: ["Spacious 7-seater cabin", "Large luggage capacity", "Child seat on request", "Flight monitoring"],
  },
  {
    id: "sprinter",
    label: "Minibus (Sprinter)",
    description: "Mercedes-Benz Sprinter or equivalent for larger groups, corporate delegations, and tours.",
    capacity: "8–16 passengers",
    maxPax: 16,
    luggage: "15 large bags",
    maxLuggage: 15,
    baseRate: 65,
    perKmRate: 1.10,
    icon: "🚌",
    features: ["Spacious 16-seater cabin", "Extensive luggage room", "Tour sound system", "Flight monitoring"],
  },
];

/** Baseline alias for backward compatibility */
export const VEHICLE_CLASSES = ALL_VEHICLE_CLASSES;

function parseBool(val: any, defaultVal: boolean): boolean {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === "boolean") return val;
  if (typeof val === "string") {
    const s = val.trim().toLowerCase();
    if (s === "false" || s === "0" || s === "off" || s === "disabled") return false;
    if (s === "true" || s === "1" || s === "on" || s === "enabled") return true;
  }
  return Boolean(val);
}

/** Helper to check if a specific vehicle class is active according to site operations */
export function isVehicleClassActive(
  vehicleId: string,
  operations?: {
    vehicleSedanActive?: boolean | string | any;
    vehicleSuvActive?: boolean | string | any;
    vehicleMinivanActive?: boolean | string | any;
    vehicleSprinterActive?: boolean | string | any;
  }
): boolean {
  if (!operations) {
    // Default fallback: sedan, suv, minivan active; sprinter inactive by default
    return vehicleId !== "sprinter";
  }

  const vId = vehicleId.toLowerCase();
  if (vId === "sedan") return parseBool(operations.vehicleSedanActive, true);
  if (vId === "suv") return parseBool(operations.vehicleSuvActive, true);
  if (vId === "minivan") return parseBool(operations.vehicleMinivanActive, true);
  if (vId === "sprinter") return parseBool(operations.vehicleSprinterActive, false);

  return true;
}

/** Get list of active vehicle classes dynamically */
export function getActiveVehicleClasses(
  operations?: {
    vehicleSedanActive?: boolean | string | any;
    vehicleSuvActive?: boolean | string | any;
    vehicleMinivanActive?: boolean | string | any;
    vehicleSprinterActive?: boolean | string | any;
  }
): VehicleConfig[] {
  return ALL_VEHICLE_CLASSES.filter((vc) => isVehicleClassActive(vc.id, operations));
}

/** Get vehicle config by class identifier */
export function getVehicleConfig(vehicleClass: string): VehicleConfig | undefined {
  return ALL_VEHICLE_CLASSES.find((v) => v.id.toLowerCase() === vehicleClass.toLowerCase());
}
