/**
 * @file index.ts
 * @description Public API for @travel/ui.
 *
 * Consumers: import { PackageCard, DestinationCard } from "@travel/ui"
 */

// Utilities
export { cn } from "./lib/cn";

// Components
export { PackageCard }        from "./components/PackageCard";
export { DestinationCard }    from "./components/DestinationCard";
export { HeroSearchFilter }   from "./components/HeroSearchFilter";

// Component prop types
export type { PackageCardProps }       from "./components/PackageCard";
export type { DestinationCardProps }   from "./components/DestinationCard";
export type { HeroSearchFilterProps, SearchFilters, DestinationOption } from "./components/HeroSearchFilter";
