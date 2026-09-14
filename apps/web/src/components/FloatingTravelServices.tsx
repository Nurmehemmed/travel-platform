"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Car, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function FloatingTravelServices() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide completely on admin portal
  if (pathname.startsWith("/admin")) return null;

  const isVisaPage = pathname.startsWith("/visa");
  const isTransferPage = pathname.startsWith("/transfer");

  return (
    <aside
      aria-label="Quick travel services"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 print:hidden transition-all duration-300"
    >
      {/* CASE 1: On Visa page -> Slim Airport Transfer Pill */}
      {isVisaPage && !isTransferPage && (
        <Link
          href="/transfer"
          className="group flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-sky-300/50"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.94)",
            boxShadow: "0 10px 30px -5px rgba(2, 132, 199, 0.4)",
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
            <Car className="h-3.5 w-3.5" strokeWidth={2.3} />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300/80">
              {t.nav.transfer}
            </span>
            <span className="text-xs font-black text-white mt-0.5 flex items-center gap-1">
              {t.floating.transfer} <ArrowRight className="h-3 w-3 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <span className="ml-1 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-sky-400/20 text-sky-300 border border-sky-400/30">
            {t.floating.transferSupport}
          </span>
        </Link>
      )}

      {/* CASE 2: On Transfer page -> Slim e-Visa Pill */}
      {isTransferPage && !isVisaPage && (
        <Link
          href="/visa"
          className="group flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-amber-300/50"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.94)",
            boxShadow: "0 10px 30px -5px rgba(245, 158, 11, 0.4)",
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <FileText className="h-3.5 w-3.5" strokeWidth={2.3} />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300/80">
              Azerbaijan
            </span>
            <span className="text-xs font-black text-white mt-0.5 flex items-center gap-1">
              {t.floating.evisa} <ArrowRight className="h-3 w-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <span className="ml-1 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
            {t.floating.evisaSpeed}
          </span>
        </Link>
      )}

      {/* CASE 3: Everywhere else -> Unified 2-in-1 Segmented Capsule */}
      {!isVisaPage && !isTransferPage && (
        <div
          className="flex items-center rounded-full p-1 shadow-2xl backdrop-blur-xl border border-white/20 transition-all duration-300 hover:border-white/30"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.92)",
            boxShadow: "0 12px 35px -5px rgba(15, 52, 96, 0.55), 0 0 20px -5px rgba(14, 165, 233, 0.25)",
          }}
        >
          {/* Left Segment: e-Visa */}
          <Link
            href="/visa"
            className="group flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-white/12 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-transform group-hover:scale-110">
              <FileText className="h-3.5 w-3.5" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300/85">
                ASAN · 3h
              </span>
              <span className="text-xs font-black text-white mt-0.5 whitespace-nowrap">
                {t.floating.evisa}
              </span>
            </div>
            <span className="rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
              {t.floating.evisaSpeed}
            </span>
          </Link>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-white/20 mx-0.5 shrink-0" />

          {/* Right Segment: Airport Transfer */}
          <Link
            href="/transfer"
            className="group flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-white/12 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 transition-transform group-hover:scale-110">
              <Car className="h-3.5 w-3.5" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300/85">
                Airport · GYD
              </span>
              <span className="text-xs font-black text-white mt-0.5 whitespace-nowrap">
                {t.floating.transfer}
              </span>
            </div>
            <span className="rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-sky-400/20 text-sky-300 border border-sky-400/30 shrink-0">
              {t.floating.transferSupport}
            </span>
          </Link>
        </div>
      )}
    </aside>
  );
}
