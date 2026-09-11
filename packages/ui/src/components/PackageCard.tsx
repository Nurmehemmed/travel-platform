/**
 * PackageCard
 *
 * Displays a single tour package in a card layout.
 * Used on listing pages, search results, and the homepage featured grid.
 *
 * Design tokens consumed from @travel/tailwind-config:
 *   - brand.500 — primary badge background
 *   - accent.500 — price highlight
 *   - shadow-card / shadow-card-hover — elevation system
 */

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star, Heart } from "lucide-react";
import { cn } from "../lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PackageCardProps {
  /** Unique identifier for the package (used in the booking flow) */
  id: string;
  /** URL-safe slug for routing: /packages/[slug] */
  slug: string;
  title: string;
  /** Short destination label shown under the title */
  destinationName: string;
  destinationCountry: string;
  coverImageUrl: string;
  durationDays: number;
  durationNights: number;
  /** 0.00–5.00 */
  ratingAvg: number;
  reviewCount: number;
  /** Rack rate — always present */
  basePrice: number;
  /** Promotional price — shown when defined, basePrice crossed out */
  promoPrice?: number | null;
  /** Inclusion tag labels e.g. ["Flight", "Accommodation"] */
  inclusions?: string[];
  /** Controlled wishlist state — parent manages toggle */
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PackageCard({
  id,
  slug,
  title,
  destinationName,
  destinationCountry,
  coverImageUrl,
  durationDays,
  durationNights,
  ratingAvg,
  reviewCount,
  basePrice,
  promoPrice,
  inclusions = [],
  isSaved = false,
  onToggleSave,
  className,
}: PackageCardProps) {
  const displayPrice = promoPrice ?? basePrice;
  const hasDiscount  = promoPrice !== null && promoPrice !== undefined;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white",
        "shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      {/* ── Cover image ─────────────────────────────────────────────────── */}
      <Link href={`/packages/${slug}`} className="relative block h-52 shrink-0 overflow-hidden">
        <Image
          src={coverImageUrl}
          alt={`${title} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Duration badge */}
        <span className="absolute left-3 top-3 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {durationDays}D / {durationNights}N
        </span>

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute right-12 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">
            SALE
          </span>
        )}

        {/* Wishlist button */}
        <button
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            onToggleSave?.(id);
          }}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
            isSaved
              ? "bg-red-500 text-white"
              : "bg-white/80 text-slate-500 hover:bg-red-50 hover:text-red-500"
          )}
        >
          <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </Link>

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Destination */}
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{destinationName}, {destinationCountry}</span>
        </div>

        {/* Title */}
        <Link href={`/packages/${slug}`}>
          <h3 className="line-clamp-2 font-display text-base font-semibold text-slate-800 transition-colors hover:text-brand-600">
            {title}
          </h3>
        </Link>

        {/* Inclusions chips */}
        {inclusions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {inclusions.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
            {inclusions.length > 4 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                +{inclusions.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ── Footer row ──────────────────────────────────────────────── */}
        <div className="mt-auto flex items-end justify-between pt-2">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
            <span className="text-sm font-semibold text-slate-700">{ratingAvg.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({reviewCount})</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{durationDays} days</span>
          </div>

          {/* Price */}
          <div className="text-right">
            {hasDiscount && (
              <p className="text-xs text-slate-400 line-through">${basePrice.toLocaleString()}</p>
            )}
            <p className="font-display text-lg font-bold text-accent-600">
              ${displayPrice.toLocaleString()}
              <span className="text-xs font-normal text-slate-400"> /person</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
