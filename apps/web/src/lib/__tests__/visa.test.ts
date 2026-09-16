import { describe, it, expect } from "vitest";
import {
  COUNTRIES,
  getCountryEligibility,
  validatePassportValidity,
} from "../visa-countries";

describe("Azerbaijan Visa Eligibility & Rule Engine", () => {
  it("recognizes visa-free countries (Turkey, Georgia, UAE, Russia, China)", () => {
    const tr = getCountryEligibility("Turkey");
    expect(tr.category).toBe("visa_free");

    const ge = getCountryEligibility("GE");
    expect(ge.category).toBe("visa_free");

    const ae = getCountryEligibility("United Arab Emirates");
    expect(ae.category).toBe("visa_free");

    const cn = getCountryEligibility("China");
    expect(cn.category).toBe("visa_free");
  });

  it("recognizes ASAN e-Visa eligible countries (US, UK, Germany, Canada, India)", () => {
    const us = getCountryEligibility("United States");
    expect(us.category).toBe("evisa_eligible");

    const gb = getCountryEligibility("GB");
    expect(gb.category).toBe("evisa_eligible");

    const de = getCountryEligibility("Germany");
    expect(de.category).toBe("evisa_eligible");

    const inCountry = getCountryEligibility("India");
    expect(inCountry.category).toBe("evisa_eligible");
  });

  it("fails safe to embassy_required for unknown or non-eligible countries", () => {
    const unknown = getCountryEligibility("Fictional Island Nation");
    expect(unknown.category).toBe("embassy_required");
  });

  describe("Passport Expiration (90-Day Rule) Validator", () => {
    it("approves passport with > 90 days validity beyond arrival", () => {
      const arrival = "2026-06-01";
      const expiry = "2026-12-01"; // 6 months later
      const result = validatePassportValidity(arrival, expiry);
      expect(result.valid).toBe(true);
    });

    it("rejects passport expiring less than 90 days after arrival", () => {
      const arrival = "2026-06-01";
      const expiry = "2026-07-01"; // only 30 days later
      const result = validatePassportValidity(arrival, expiry);
      expect(result.valid).toBe(false);
      expect(result.message).toContain("at least 3 months (90 days)");
    });

    it("handles invalid or missing date inputs gracefully", () => {
      expect(validatePassportValidity("", "2026-12-01").valid).toBe(false);
      expect(validatePassportValidity("invalid-date", "2026-12-01").valid).toBe(false);
    });
  });
});
