/**
 * DestinationCard
 *
 * Hero-style card for a travel destination with an image overlay and package count badge.
 * Used in the "Popular Destinations" grid on the homepage.
 *
 * Design approach: full-bleed image with a bottom-anchored gradient overlay,
 * destination name in display font, and an animated scale effect on hover.
 */

import Image from "next/image";
import Link from "next/link";
import { MapPin, Package } from "lucide-react";
import { cn } from "../lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DestinationCardProps {
  /** URL-safe slug for routing: /destinations/[slug] */
  slug: string;
  name: string;
  country: string;
  heroImageUrl: string;
  /**
   * Number of active packages available for this destination.
   * Computed at query time — no stale data.
   */
  packageCount: number;
  /** Optional fixed height class. Defaults to h-72 */
  heightClassName?: string;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DestinationCard({
  slug,
  name,
  country,
  heroImageUrl,
  packageCount,
  heightClassName = "h-72",
  className,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl",
        heightClassName,
        "shadow-card transition-all duration-300 hover:shadow-card-hover",
        className
      )}
      aria-label={`Explore ${name}, ${country} — ${packageCount} packages`}
    >
      {/* ── Hero image ──────────────────────────────────────────────────── */}
      <Image
        src={heroImageUrl}
        alt={`${name}, ${country}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* ── Gradient overlay ────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

      {/* ── Package count badge ─────────────────────────────────────────── */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
        <Package className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">
          {packageCount} {packageCount === 1 ? "package" : "packages"}
        </span>
      </div>

      {/* ── Destination label ────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-1.5 text-white/70">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium uppercase tracking-wider">{country}</span>
        </div>
        <h3 className="mt-0.5 font-display text-2xl font-bold text-white leading-tight group-hover:text-brand-200 transition-colors">
          {name}
        </h3>

        {/* Animated "Explore →" reveal on hover */}
        <p className="mt-1 max-h-0 overflow-hidden text-sm font-medium text-brand-300 transition-all duration-300 group-hover:max-h-8">
          Explore packages →
        </p>
      </div>
    </Link>
  );
}
