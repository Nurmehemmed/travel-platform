import { describe, it, expect } from "vitest";
import { ItineraryService, generateItineraryReference } from "../itinerary.service";

describe("ItineraryService Domain Logic", () => {
  const itineraryService = new ItineraryService();

  describe("generateItineraryReference", () => {
    it("generates a reference matching ITN-YYYY-XXXXXX format", () => {
      const ref = generateItineraryReference();
      const currentYear = new Date().getFullYear();
      expect(ref).toMatch(new RegExp(`^ITN-${currentYear}-[A-Z0-9]{6}$`));
    });
  });

  describe("validateInquiry", () => {
    it("passes validation for complete customer details", () => {
      const result = itineraryService.validateInquiry({
        customer: {
          fullName: "Sarah Jenkins",
          email: "sarah@example.com",
          phone: "+447123456789",
        },
      });

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("rejects invalid customer email", () => {
      const result = itineraryService.validateInquiry({
        customer: {
          fullName: "Sarah Jenkins",
          email: "invalid-email",
          phone: "+447123456789",
        },
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("valid email");
    });

    it("rejects missing customer name or phone", () => {
      const result = itineraryService.validateInquiry({
        customer: {
          fullName: "",
          email: "sarah@example.com",
          phone: "",
        },
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("required");
    });
  });
});
