"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { CURRENT_BRAND } from "@/lib/brand";

export interface BrandLogoProps {
  variant?: "header" | "footer" | "full" | "emblem" | "compact";
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "header",
  className = "",
  showTagline = true,
}) => {
  const isModern = CURRENT_BRAND.brandKey === "bakuya" || CURRENT_BRAND.brandKey === "hibaku";

  // Helper for styled wordmark
  const renderWordmark = (extraClass: string = "") => {
    if (CURRENT_BRAND.brandKey === "hibaku") {
      return (
        <span className={`font-display font-extrabold ${extraClass}`}>
          <span className="text-amber-400 font-black">HI</span>
          <span className="text-white">BAKU</span>
        </span>
      );
    }
    return (
      <span className={`font-display font-extrabold ${extraClass}`}>
        {CURRENT_BRAND.brandMark}
      </span>
    );
  };

  // Full Graphic Image Variant (as uploaded)
  if (variant === "full") {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        <Image
          src={CURRENT_BRAND.logo.full}
          alt={CURRENT_BRAND.logo.alt}
          width={280}
          height={280}
          className="h-auto w-48 sm:w-56 object-contain rounded-2xl shadow-lg border border-slate-100 bg-white p-2"
          priority
        />
      </div>
    );
  }

  // Emblem Only Variant (e.g. for small icons, avatar badges, modals)
  if (variant === "emblem") {
    if (isModern) {
      return (
        <div
          className={`relative h-9 w-9 rounded-xl overflow-hidden bg-white shadow-sm border border-white/20 p-0.5 flex items-center justify-center shrink-0 ${className}`}
        >
          <Image
            src={CURRENT_BRAND.logo.emblem}
            alt={CURRENT_BRAND.logo.alt}
            width={72}
            height={72}
            className="h-full w-full object-contain"
            priority
          />
        </div>
      );
    }

    return (
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 shadow-sm shrink-0 ${className}`}
      >
        <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
    );
  }

  // Footer Variant (styled for dark footer backgrounds)
  if (variant === "footer") {
    if (isModern) {
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <div className="relative h-11 w-11 rounded-2xl overflow-hidden bg-white shadow-md border border-white/20 p-0.5 flex items-center justify-center shrink-0">
            <Image
              src={CURRENT_BRAND.logo.emblem}
              alt={CURRENT_BRAND.logo.alt}
              width={88}
              height={88}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            {renderWordmark("text-2xl tracking-[0.08em] leading-none text-white")}
            {showTagline && (
              <span className="text-[9px] font-bold tracking-[0.24em] uppercase text-amber-400 leading-tight mt-1">
                {CURRENT_BRAND.subMark}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500">
          <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-xl tracking-tight text-amber-500">
          addmetour
        </span>
      </div>
    );
  }

  // Header / Default Variant (used in HomeNavbar sticky nav & other headers)
  if (isModern) {
    return (
      <div className={`flex shrink-0 items-center gap-2.5 group ${className}`}>
        {/* Emblem with Flame Towers & Sea Wave */}
        <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white shadow-sm border border-white/20 p-0.5 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
          <Image
            src={CURRENT_BRAND.logo.emblem}
            alt={CURRENT_BRAND.logo.alt}
            width={72}
            height={72}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        {/* Wordmark & Sub-brand */}
        <div className="flex flex-col text-left">
          {renderWordmark("text-xl tracking-[0.07em] leading-none text-white group-hover:text-amber-300 transition-colors")}
          {showTagline && (
            <span className="text-[8px] sm:text-[8.5px] font-bold tracking-[0.22em] uppercase text-amber-400 leading-tight mt-0.5 whitespace-nowrap">
              {CURRENT_BRAND.subMark}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Fallback to classic AddmeTour
  return (
    <div className={`flex shrink-0 items-center gap-2 group ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
        <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-bold text-lg tracking-tight text-amber-500">
        addmetour
      </span>
    </div>
  );
};

export default BrandLogo;
