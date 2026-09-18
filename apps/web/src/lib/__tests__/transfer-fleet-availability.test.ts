import { describe, it, expect } from "vitest";
import {
  isVehicleClassActive,
  getActiveVehicleClasses,
  ALL_VEHICLE_CLASSES,
  getVehicleConfig,
} from "../transfers/vehicles";

describe("Transfer Vehicle Fleet & Availability Management", () => {
  it("defaults to 3 standard vehicles active (sedan, suv, minivan) when no settings provided", () => {
    expect(isVehicleClassActive("sedan")).toBe(true);
    expect(isVehicleClassActive("suv")).toBe(true);
    expect(isVehicleClassActive("minivan")).toBe(true);
    expect(isVehicleClassActive("sprinter")).toBe(false);

    const activeList = getActiveVehicleClasses();
    expect(activeList.map((v) => v.id)).toEqual(["sedan", "suv", "minivan"]);
  });

  it("dynamically disables SUV when admin marks SUV as busy/disabled", () => {
    const operations = {
      vehicleSedanActive: true,
      vehicleSuvActive: false, // marked busy
      vehicleMinivanActive: true,
      vehicleSprinterActive: false,
    };

    expect(isVehicleClassActive("suv", operations)).toBe(false);
    expect(isVehicleClassActive("sedan", operations)).toBe(true);

    const activeList = getActiveVehicleClasses(operations);
    expect(activeList.map((v) => v.id)).toEqual(["sedan", "minivan"]);
  });

  it("dynamically enables Sprinter VIP when admin enables it", () => {
    const operations = {
      vehicleSedanActive: true,
      vehicleSuvActive: true,
      vehicleMinivanActive: true,
      vehicleSprinterActive: true, // enabled
    };

    expect(isVehicleClassActive("sprinter", operations)).toBe(true);

    const activeList = getActiveVehicleClasses(operations);
    expect(activeList.map((v) => v.id)).toEqual(["sedan", "suv", "minivan", "sprinter"]);
  });

  it("correctly retrieves specs for any vehicle class", () => {
    const sprinter = getVehicleConfig("sprinter");
    expect(sprinter).toBeDefined();
    expect(sprinter?.maxPax).toBe(16);
    expect(sprinter?.maxLuggage).toBe(15);
    expect(sprinter?.baseRate).toBe(65);

    const sedan = getVehicleConfig("sedan");
    expect(sedan?.maxPax).toBe(3);
    expect(sedan?.baseRate).toBe(25);
  });
});
