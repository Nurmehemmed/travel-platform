import type { Metadata } from "next";

export const SUPPORTED_LOCALES = [
  { code: "en-US", lang: "en", path: "" },
  { code: "az-AZ", lang: "az", path: "" },
  { code: "ru-RU", lang: "ru", path: "" },
  { code: "fr-FR", lang: "fr", path: "" },
  { code: "ar-SA", lang: "ar", path: "" },
  { code: "de-DE", lang: "de", path: "" },
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
  title = "AddmeTour | Premier Azerbaijan Inbound DMC & ASAN Visa Portal",
  description = "Official Azerbaijan Inbound Tour Operator, ASAN Electronic Visa (e-Visa) agency, Baku Airport VIP transfer services, and tailor-made luxury Caucasus travel itineraries.",
  path = "",
  image = "/images/og-baku-cover.jpg",
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
    languageAlternates[locale.code] = canonicalUrl;
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
