import type { Metadata } from "next";

export const SUPPORTED_LOCALES = [
  { code: "en", lang: "en", query: "lang=en" },
  { code: "az", lang: "az", query: "lang=az" },
  { code: "ru", lang: "ru", query: "lang=ru" },
  { code: "fr", lang: "fr", query: "lang=fr" },
  { code: "ar", lang: "ar", query: "lang=ar" },
  { code: "de", lang: "de", query: "lang=de" },
] as const;

export interface ConstructMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Enterprise SEO & Hreflang Canonical Metadata Generator
 * Ensures search engine crawlers (Google, Yandex, Bing) understand multi-regional localization without duplicate penalties.
 */
export function constructMetadata({
  title = "AddmeTour | Azerbaijan Tours, Official ASAN e-Visa & VIP Transfers",
  description = "Official Azerbaijan Inbound DMC & Tour Operator. Fast 3-hour ASAN Electronic Visa (e-Visa), 24/7 Baku Airport VIP transfers, and curated Caucasus private & group tour packages. 4.9★ Rated.",
  path = "",
  image = "/images/og-main-cover.jpg",
  noIndex = false,
  type = "website",
}: ConstructMetadataProps = {}): Metadata {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://addmetour.com").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${normalizedPath === "/" ? "" : normalizedPath}`;

  const languageAlternates: Record<string, string> = {
    "x-default": canonicalUrl,
  };

  for (const locale of SUPPORTED_LOCALES) {
    const queryParam = (locale as { query?: string; code: string }).query || `lang=${locale.code}`;
    languageAlternates[locale.code] = `${canonicalUrl}${canonicalUrl.includes("?") ? "&" : "?"}${queryParam}`;
  }

  return {
    title: {
      default: title,
      template: "%s | AddmeTour Azerbaijan",
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "AddmeTour Azerbaijan DMC",
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`],
      creator: "@AddmeTour",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
