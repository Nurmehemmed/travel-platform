import { describe, it, expect } from "vitest";
import { LANGUAGES, LanguageCode } from "../i18n";
import {
  TRANSFER_PAGE_TRANSLATIONS,
  VISA_PAGE_TRANSLATIONS,
  NAV_EXTRA_TRANSLATIONS,
} from "../pages-i18n";

describe("Internationalization (i18n) Engine", () => {
  const supportedCodes: LanguageCode[] = ["EN", "AZ", "RU", "FR", "AR", "DE"];

  it("registers all 6 supported languages with valid flags and direction", () => {
    expect(LANGUAGES.length).toBe(6);

    for (const lang of LANGUAGES) {
      expect(supportedCodes).toContain(lang.code);
      expect(lang.label).toBeTruthy();
      expect(lang.nativeLabel).toBeTruthy();
      expect(lang.flag).toBeTruthy();
      expect(["ltr", "rtl"]).toContain(lang.dir);
    }
  });

  it("correctly identifies Arabic (AR) as right-to-left (RTL)", () => {
    const arabic = LANGUAGES.find((l) => l.code === "AR");
    expect(arabic).toBeDefined();
    expect(arabic?.dir).toBe("rtl");
  });

  it("ensures all languages have complete visa page translations", () => {
    for (const code of supportedCodes) {
      const dict = VISA_PAGE_TRANSLATIONS[code];
      expect(dict).toBeDefined();
      expect(dict.standardTitle).toBeTruthy();
      expect(dict.expressTitle).toBeTruthy();
      expect(dict.applyNow).toBeTruthy();
    }
  });

  it("ensures all languages have complete transfer page translations", () => {
    for (const code of supportedCodes) {
      const dict = TRANSFER_PAGE_TRANSLATIONS[code];
      expect(dict).toBeDefined();
      expect(dict.heroBadge).toBeTruthy();
      expect(dict.proceedBooking).toBeTruthy();
      expect(dict.calcTitle).toBeTruthy();
    }
  });

  it("ensures all languages have navigation extra translations", () => {
    for (const code of supportedCodes) {
      const dict = NAV_EXTRA_TRANSLATIONS[code];
      expect(dict).toBeDefined();
      expect(dict.trackTransfer).toBeTruthy();
      expect(dict.applyVisa).toBeTruthy();
    }
  });
});
