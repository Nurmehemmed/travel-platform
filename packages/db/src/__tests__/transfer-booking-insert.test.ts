import { describe, it, expect } from "vitest";
import { transferVehicleEnum } from "../schema";

describe("Database Enum Compatibility", () => {
  it("includes sprinter in transferVehicleEnum", () => {
    expect(transferVehicleEnum.enumValues).toContain("sprinter");
    expect(transferVehicleEnum.enumValues).toContain("sedan");
    expect(transferVehicleEnum.enumValues).toContain("suv");
    expect(transferVehicleEnum.enumValues).toContain("minivan");
  });
});
