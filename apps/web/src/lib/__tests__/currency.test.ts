import { describe, it, expect } from "vitest";
import { CURRENCIES } from "../currency-context";

describe("Currency Engine & Multipliers", () => {
  it("contains valid base rate for USD", () => {
    const usd = CURRENCIES.find((c) => c.code === "USD");
    expect(usd).toBeDefined();
    expect(usd?.rate).toBe(1.0);
    expect(usd?.symbol).toBe("$");
  });

  it("contains accurate exchange multiplier for AZN (1.70)", () => {
    const azn = CURRENCIES.find((c) => c.code === "AZN");
    expect(azn).toBeDefined();
    expect(azn?.rate).toBe(1.7);
    expect(azn?.symbol).toBe("₼");

    // 100 USD = 170 AZN
    const converted = Math.round(100 * azn!.rate);
    expect(converted).toBe(170);
  });

  it("contains accurate exchange multiplier for AED (3.673)", () => {
    const aed = CURRENCIES.find((c) => c.code === "AED");
    expect(aed).toBeDefined();
    expect(aed?.rate).toBeCloseTo(3.673, 3);
  });

  it("contains valid Euro and GBP configurations", () => {
    const eur = CURRENCIES.find((c) => c.code === "EUR");
    const gbp = CURRENCIES.find((c) => c.code === "GBP");

    expect(eur).toBeDefined();
    expect(eur?.symbol).toBe("€");
    expect(gbp).toBeDefined();
    expect(gbp?.symbol).toBe("£");
  });
});
