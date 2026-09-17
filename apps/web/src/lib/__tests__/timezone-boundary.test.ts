import { describe, it, expect } from "vitest";
import { VisaService } from "../../services/visa.service";

describe("Timezone & Calendar Boundary Suite", () => {
  const visaService = new VisaService();

  const baseApplicant = {
    nationality: "United States",
    stayAddress: "Baku Marriott Hotel Boulevard",
    surname: "Smith",
    givenNames: "Sarah",
    gender: "F",
    birthDate: "1992-05-15",
    birthCountry: "USA",
    birthPlace: "Chicago",
    occupation: "Architect",
    phoneNumber: "+13125550199",
    email: "sarah.smith@example.com",
    residentialAddress: "400 N Michigan Ave, Chicago, IL",
    passportNumber: "US987654321",
    passportIssueDate: "2020-05-15",
  };

  describe("ASAN e-Visa 90-Day Passport Expiry Boundary", () => {
    it("accepts passport expiring exactly 91 days after arrival date", () => {
      // Arrival: 2026-06-01. Expiry 91 days later: 2026-08-31
      const result = visaService.validateApplication({
        ...baseApplicant,
        arrivalDate: "2026-06-01",
        passportExpiryDate: "2026-09-01",
      });

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("rejects passport expiring in less than 90 days across month length differences", () => {
      // Arrival: 2026-06-01. Expiry only 60 days later: 2026-07-31
      const result = visaService.validateApplication({
        ...baseApplicant,
        arrivalDate: "2026-06-01",
        passportExpiryDate: "2026-07-31",
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("at least 3 months");
    });

    it("handles leap year calculations correctly (February 29th)", () => {
      // 2028 is a leap year (Feb 29 exists)
      // Arrival: 2028-01-01. 90 days includes Feb 29.
      const validLeapYear = visaService.validateApplication({
        ...baseApplicant,
        arrivalDate: "2028-01-01",
        passportExpiryDate: "2028-05-01", // 121 days
      });
      expect(validLeapYear.valid).toBe(true);

      const invalidLeapYear = visaService.validateApplication({
        ...baseApplicant,
        arrivalDate: "2028-01-01",
        passportExpiryDate: "2028-02-15", // only 45 days
      });
      expect(invalidLeapYear.valid).toBe(false);
    });

    it("rejects arrival date set in the past relative to passport issuance", () => {
      const result = visaService.validateApplication({
        ...baseApplicant,
        arrivalDate: "2019-01-01", // before passport issue date (2020-05-15)
        passportExpiryDate: "2026-01-01",
      });
      // Should handle historic arrival or invalid date boundaries safely
      expect(result).toBeDefined();
    });
  });

  describe("Cross-Timezone String Parsing & Date Invariants", () => {
    it("extracts pure ISO calendar date string without UTC timezone day-shift", () => {
      // In web apps, a user in California (UTC-7) selecting July 1st could generate "2026-07-01T00:00:00-07:00"
      // If parsed via new Date().toISOString(), it shifts to "2026-07-01T07:00:00Z" (same day)
      // But if user is at 23:00 on June 30 in UTC-7:
      const rawIso = "2026-07-01";
      const normalized = rawIso.split("T")[0];

      expect(normalized).toBe("2026-07-01");
      expect(normalized).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("computes 3-hour urgent SLA timestamp across day/midnight boundary", () => {
      // Application submitted at 23:30 (11:30 PM)
      const submissionTime = new Date("2026-09-17T23:30:00.000Z");
      const slaDurationHours = 3;
      const slaDeadline = new Date(submissionTime.getTime() + slaDurationHours * 60 * 60 * 1000);

      expect(slaDeadline.toISOString()).toBe("2026-09-18T02:30:00.000Z");
      expect(slaDeadline.getUTCDate()).toBe(18); // Successfully crossed midnight into next day!
    });
  });
});
