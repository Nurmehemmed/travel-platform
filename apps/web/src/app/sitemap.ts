import type { MetadataRoute } from "next";
import { TOURS_CATALOG } from "@/lib/tours-data";
import { DESTINATIONS_CATALOG } from "@/lib/destinations-data";
import { CURRENT_BRAND } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CURRENT_BRAND.domain}`;
  const now = new Date();

  // Signature Tour URLs
  const tourUrls: MetadataRoute.Sitemap = TOURS_CATALOG.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Destination Guide URLs
  const destinationUrls: MetadataRoute.Sitemap = DESTINATIONS_CATALOG.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    // ─── Core & High Conversion Pages ─────────────────────────────────
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/custom-itinerary`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },

    // ─── Tours and Destinations ───────────────────────────────────────
    ...tourUrls,
    ...destinationUrls,

    // ─── Airport Transfer Services ────────────────────────────────────
    {
      url: `${baseUrl}/transfer`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/transfer/book`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transfer/track`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },

    // ─── e-Visa Service ───────────────────────────────────────────────
    {
      url: `${baseUrl}/visa`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/visa/apply`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/visa/track`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    // ─── Tourist eSIM & Mobile Data ─────────────────────────────────
    {
      url: `${baseUrl}/esim`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    // ─── Medical & MICE Corporate ────────────────────────────────────
    {
      url: `${baseUrl}/medical`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mice`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
