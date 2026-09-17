import { describe, it, expect, vi } from "vitest";
import {
  calculateVisaPricing,
  generateVisaApplicationNumber,
  VisaService,
} from "../visa.service";

describe("VisaService Domain Logic", () => {
  const visaService = new VisaService();

  describe("calculateVisaPricing", () => {
    it("calculates standard visa pricing accurately", () => {
      const pricing = calculateVisaPricing("standard");
      expect(pricing.isUrgent).toBe(false);
      expect(pricing.govFee).toBe("26.00");
      expect(pricing.serviceFee).toBe("33.00");
      expect(pricing.totalAmount).toBe("59.00");
    });

    it("calculates urgent visa pricing accurately", () => {
      const pricing = calculateVisaPricing("urgent");
      expect(pricing.isUrgent).toBe(true);
      expect(pricing.govFee).toBe("61.00");
      expect(pricing.serviceFee).toBe("49.00");
      expect(pricing.totalAmount).toBe("110.00");
    });
  });

  describe("generateVisaApplicationNumber", () => {
    it("generates a valid AZV reference format", () => {
      const ref = generateVisaApplicationNumber();
      expect(ref).toMatch(/^AZV-\d{6}$/);
    });
  });

  describe("validateApplication", () => {
    const validBaseInput = {
      nationality: "United States",
      arrivalDate: "2026-07-01",
      passportExpiryDate: "2027-01-01",
      stayAddress: "Four Seasons Baku",
      surname: "Doe",
      givenNames: "John",
      gender: "M",
      birthDate: "1990-01-01",
      birthCountry: "USA",
      birthPlace: "New York",
      occupation: "Engineer",
      phoneNumber: "+1234567890",
      email: "john@example.com",
      residentialAddress: "123 Main St",
      passportNumber: "P12345678",
      passportIssueDate: "2020-01-01",
    };

    it("passes validation for eligible evisa applicant with valid passport", () => {
      const result = visaService.validateApplication(validBaseInput);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("rejects passport with less than 90 days validity beyond arrival", () => {
      const result = visaService.validateApplication({
        ...validBaseInput,
        passportExpiryDate: "2026-07-20", // only 19 days after arrival
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("at least 3 months");
    });

    it("rejects visa-free nationalities with helpful message", () => {
      const result = visaService.validateApplication({
        ...validBaseInput,
        nationality: "Turkey",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("visa-free");
    });

    it("rejects embassy-required nationalities", () => {
      const result = visaService.validateApplication({
        ...validBaseInput,
        nationality: "Fictional Island",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Embassy or Consulate");
    });
  });
});
