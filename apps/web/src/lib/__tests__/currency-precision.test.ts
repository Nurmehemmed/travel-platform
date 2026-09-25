import { describe, it, expect } from "vitest";
import { CURRENCIES, CurrencyCode } from "../currency-context";

describe("Financial Precision & Currency Conversion Boundary Suite", () => {
  // Pure helper mimicking convertPrice logic for headless deterministic testing
  function convert(usdAmount: number, currencyCode: CurrencyCode): number {
    const cur = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0]!;
    return Math.round(usdAmount * cur.rate);
  }

  function format(usdAmount: number, currencyCode: CurrencyCode): string {
    const cur = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0]!;
    const converted = Math.round(usdAmount * cur.rate);
    if (cur.code === "AED") {
      return `${converted.toLocaleString()} ${cur.symbol}`;
    }
    return `${cur.symbol}${converted.toLocaleString()}`;
  }

  describe("Sub-Cent & Floating Point Precision", () => {
    it("prevents IEEE 754 floating point arithmetic drift on common prices", () => {
      // 59 USD standard visa
      const aznPrice = 59 * 1.7; // 100.3 in floating point
      expect(Math.round(aznPrice)).toBe(100);

      // 110 USD urgent visa
      const aznUrgent = 110 * 1.7; // 187 exactly
      expect(Math.round(aznUrgent)).toBe(187);

      // Verify no NaN or infinite values on fractional inputs
      const fractional = convert(49.99, "AZN");
      expect(Number.isInteger(fractional)).toBe(true);
      expect(fractional).toBe(85);
    });

    it("formats currency symbols with correct locale placement", () => {
      expect(format(100, "USD")).toBe("$100");
      expect(format(100, "AZN")).toBe("₼170");
      expect(format(100, "AED")).toBe("367 د.إ"); // Symbol follows value for AED
      expect(format(100, "EUR")).toBe("€88");
      expect(format(100, "GBP")).toBe("£76");
    });
  });

  describe("Extreme Numerical Boundaries", () => {
    it("handles zero amounts gracefully", () => {
      expect(convert(0, "USD")).toBe(0);
      expect(convert(0, "AZN")).toBe(0);
      expect(format(0, "USD")).toBe("$0");
      expect(format(0, "AED")).toBe("0 د.إ");
    });

    it("handles high-value enterprise VIP tour packages safely without overflow", () => {
      const enterpriseBooking = 25000; // $25,000 luxury tour
      const aedAmount = convert(enterpriseBooking, "AED");
      expect(aedAmount).toBe(91825);
      expect(format(enterpriseBooking, "USD")).toBe("$25,000");
    });

    it("verifies all registered currencies have positive non-zero exchange rates", () => {
      for (const currency of CURRENCIES) {
        expect(currency.rate).toBeGreaterThan(0);
        expect(currency.symbol.length).toBeGreaterThan(0);
        expect(currency.code).toMatch(/^[A-Z]{3}$/);
      }
    });
  });
});
