"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

/**
 * Global floating e-Visa CTA button.
 * Appears on every page except /visa/* and /admin.
 * On visa pages the button would be redundant; on admin it'd be distracting.
 */
export default function FloatingVisaButton() {
  const pathname = usePathname();

  // Hide on visa sub-pages and admin
  const isHidden =
    pathname.startsWith("/visa") || pathname.startsWith("/admin");

  if (isHidden) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 print:hidden">
      <Link
        href="/visa"
        className="group relative flex items-center gap-2 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-2xl transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
      >
        {/* Continuous pulse ring */}
        <span
          className="absolute inset-0 rounded-xl sm:rounded-2xl animate-ping opacity-20 pointer-events-none"
          style={{ backgroundColor: "#c9a227" }}
        />

        {/* Icon container */}
        <div
          className="relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl shadow-sm"
          style={{ backgroundColor: "#0f2e27" }}
        >
          <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: "#c9a227" }} />
        </div>

        {/* Label */}
        <div className="relative z-10 flex flex-col leading-tight">
          <span
            className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider"
            style={{ color: "#0f2e27" }}
          >
            Azerbaijan
          </span>
          <span className="text-xs sm:text-sm font-black" style={{ color: "#0f2e27" }}>
            e-Visa ↗
          </span>
        </div>

        {/* Speed badge */}
        <span
          className="relative z-10 self-start rounded-full px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider whitespace-nowrap"
          style={{ backgroundColor: "#0f2e27", color: "#c9a227" }}
        >
          3 hrs
        </span>
      </Link>
    </div>
  );
}
