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

/** Helper to check if a specific vehicle class is active according to site operations */
export function isVehicleClassActive(
  vehicleId: string,
  operations?: {
    vehicleSedanActive?: boolean;
    vehicleSuvActive?: boolean;
    vehicleMinivanActive?: boolean;
    vehicleSprinterActive?: boolean;
  }
): boolean {
  if (!operations) {
    // Default fallback: sedan, suv, minivan active; sprinter inactive by default
    return vehicleId !== "sprinter";
  }

  const vId = vehicleId.toLowerCase();
  if (vId === "sedan") return operations.vehicleSedanActive !== false;
  if (vId === "suv") return operations.vehicleSuvActive !== false;
  if (vId === "minivan") return operations.vehicleMinivanActive !== false;
  if (vId === "sprinter") return Boolean(operations.vehicleSprinterActive);

  return true;
}

/** Get list of active vehicle classes dynamically */
export function getActiveVehicleClasses(
  operations?: {
    vehicleSedanActive?: boolean;
    vehicleSuvActive?: boolean;
    vehicleMinivanActive?: boolean;
    vehicleSprinterActive?: boolean;
  }
): VehicleConfig[] {
  return ALL_VEHICLE_CLASSES.filter((vc) => isVehicleClassActive(vc.id, operations));
}

/** Get vehicle config by class identifier */
export function getVehicleConfig(vehicleClass: string): VehicleConfig | undefined {
  return ALL_VEHICLE_CLASSES.find((v) => v.id.toLowerCase() === vehicleClass.toLowerCase());
}
