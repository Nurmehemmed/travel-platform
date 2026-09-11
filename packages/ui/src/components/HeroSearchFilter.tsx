/**
 * HeroSearchFilter
 *
 * The primary search/filter bar rendered inside the homepage hero section.
 * Allows filtering by: Destination, Departure Date, and Traveler Count.
 *
 * This is a controlled component — all state lives in the parent and is
 * passed down via props/callbacks. This keeps the component compatible with
 * both client-side filtering and server-side URL-based search (Next.js App Router).
 *
 * Usage:
 *   <HeroSearchFilter
 *     destinations={destinations}
 *     value={filters}
 *     onChange={setFilters}
 *     onSearch={handleSearch}
 *   />
 */

"use client";

import { useState } from "react";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { cn } from "../lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DestinationOption {
  value: string; // destination slug
  label: string; // "Bali, Indonesia"
}

export interface SearchFilters {
  destinationSlug: string;
  /** ISO date string YYYY-MM-DD or empty string */
  departureDate: string;
  travelerCount: number;
}

export interface HeroSearchFilterProps {
  destinations: DestinationOption[];
  value?: Partial<SearchFilters>;
  onChange?: (filters: SearchFilters) => void;
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULT_FILTERS: SearchFilters = {
  destinationSlug: "",
  departureDate: "",
  travelerCount: 1,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HeroSearchFilter({
  destinations,
  value,
  onChange,
  onSearch,
  className,
}: HeroSearchFilterProps) {
  const [internal, setInternal] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    ...value,
  });

  /** Merge a partial update and propagate to parent */
  const update = (patch: Partial<SearchFilters>) => {
    const next = { ...internal, ...patch };
    setInternal(next);
    onChange?.(next);
  };

  const handleSearch = () => {
    onSearch?.(internal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      role="search"
      aria-label="Search for tour packages"
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-xl",
        "border border-white/20 shadow-glass",
        "md:flex-row md:items-center md:gap-0 md:rounded-full md:p-2",
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {/* ── Destination selector ─────────────────────────────────────────── */}
      <div className="flex flex-1 items-center gap-3 px-4 py-2 md:border-r md:border-white/20">
        <MapPin className="h-5 w-5 shrink-0 text-brand-300" aria-hidden />
        <div className="flex-1">
          <label htmlFor="search-destination" className="block text-xs font-semibold uppercase tracking-wider text-white/70">
            Destination
          </label>
          <select
            id="search-destination"
            value={internal.destinationSlug}
            onChange={(e) => update({ destinationSlug: e.target.value })}
            className={cn(
              "w-full bg-transparent text-sm font-medium text-white",
              "focus:outline-none",
              "[&>option]:text-slate-800 [&>option]:bg-white"
            )}
          >
            <option value="">Any destination</option>
            {destinations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Departure date ───────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center gap-3 px-4 py-2 md:border-r md:border-white/20">
        <CalendarDays className="h-5 w-5 shrink-0 text-brand-300" aria-hidden />
        <div className="flex-1">
          <label htmlFor="search-date" className="block text-xs font-semibold uppercase tracking-wider text-white/70">
            Departure Date
          </label>
          <input
            id="search-date"
            type="date"
            value={internal.departureDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => update({ departureDate: e.target.value })}
            className={cn(
              "w-full bg-transparent text-sm font-medium text-white",
              "focus:outline-none",
              // Style the native date picker chrome
              "[color-scheme:dark]"
            )}
          />
        </div>
      </div>

      {/* ── Traveler count ───────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center gap-3 px-4 py-2">
        <Users className="h-5 w-5 shrink-0 text-brand-300" aria-hidden />
        <div className="flex-1">
          <label htmlFor="search-travelers" className="block text-xs font-semibold uppercase tracking-wider text-white/70">
            Travelers
          </label>
          <div className="flex items-center gap-3">
            <button
              aria-label="Decrease traveler count"
              onClick={() => update({ travelerCount: Math.max(1, internal.travelerCount - 1) })}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-40"
              disabled={internal.travelerCount <= 1}
            >
              −
            </button>
            <span
              id="search-travelers"
              aria-live="polite"
              className="min-w-[2ch] text-center text-sm font-semibold text-white"
            >
              {internal.travelerCount}
            </span>
            <button
              aria-label="Increase traveler count"
              onClick={() => update({ travelerCount: Math.min(20, internal.travelerCount + 1) })}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 disabled:opacity-40"
              disabled={internal.travelerCount >= 20}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ── Search CTA ───────────────────────────────────────────────────── */}
      <button
        onClick={handleSearch}
        aria-label="Search packages"
        className={cn(
          "flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3",
          "font-semibold text-white shadow-lg transition-all",
          "hover:bg-brand-600 hover:shadow-brand-500/30 hover:shadow-xl",
          "active:scale-95",
          "md:rounded-full"
        )}
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
      </button>
    </div>
  );
}
