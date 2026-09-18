/**
 * @file vehicles.ts
 * @description Vehicle configurations, specs, and helper functions.
 */

import { VehicleConfig } from "./types";

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
  {
    id: "sprinter",
    label: "Minibus (Sprinter)",
    description: "Mercedes-Benz Sprinter or equivalent. Perfect for large delegations, corporate groups, and tours.",
    capacity: "8–16 passengers",
    maxPax: 16,
    luggage: "15 large bags",
    maxLuggage: 15,
    baseRate: 90,
    perKmRate: 1.10,
    icon: "🚌",
    features: ["16-passenger capacity", "Massive luggage space", "High roof & AC", "Flight monitoring"],
  },
];

/** Get vehicle config by class */
export function getVehicleConfig(vehicleClass: string): VehicleConfig | undefined {
  return VEHICLE_CLASSES.find((v) => v.id.toLowerCase() === vehicleClass.toLowerCase());
}
