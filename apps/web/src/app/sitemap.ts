import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://addmetour.com";
  const now = new Date();

  return [
    // ─── Core Pages ───────────────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // ─── Airport Transfer Services (high-value conversion pages) ───────
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

    // ─── e-Visa Service (high-value conversion pages) ─────────────────
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
  ];
}
