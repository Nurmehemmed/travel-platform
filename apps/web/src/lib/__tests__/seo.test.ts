import { describe, it, expect } from "vitest";
import { constructMetadata, SUPPORTED_LOCALES } from "../seo";

describe("Enterprise SEO & Hreflang Canonical Engine", () => {
  it("generates correct canonical URL and multi-regional hreflang alternates", () => {
    const meta = constructMetadata({
      title: "Baku Old City Walking Tour",
      description: "Discover medieval Icherisheher with private expert historian.",
      path: "/tours/baku-old-city-walking-tour",
      image: "/images/baku-old-city.jpg",
    });

    expect(meta.title).toEqual({
      default: "Baku Old City Walking Tour",
      template: "%s | AddmeTour Azerbaijan",
    });
    expect(meta.description).toBe("Discover medieval Icherisheher with private expert historian.");
    expect(meta.alternates?.canonical).toContain("/tours/baku-old-city-walking-tour");

    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages).toBeDefined();
    expect(languages["x-default"]).toContain("/tours/baku-old-city-walking-tour");

    for (const locale of SUPPORTED_LOCALES) {
      expect(languages[locale.code]).toBeDefined();
      expect(languages[locale.code]).toContain("/tours/baku-old-city-walking-tour");
    }
  });

  it("handles root path and sets OpenGraph and Twitter tags appropriately", () => {
    const meta = constructMetadata({
      path: "/",
    });

    const og = meta.openGraph as any;
    const tw = meta.twitter as any;

    expect(og?.type).toBe("website");
    expect(og?.siteName).toBe("AddmeTour Azerbaijan DMC");
    expect(tw?.card).toBe("summary_large_image");
    expect(meta.robots).toMatchObject({
      index: true,
      follow: true,
    });
  });

  it("honors noIndex flag for 404 or private admin routes", () => {
    const meta = constructMetadata({
      title: "Page Not Found",
      noIndex: true,
    });

    expect(meta.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });
});
