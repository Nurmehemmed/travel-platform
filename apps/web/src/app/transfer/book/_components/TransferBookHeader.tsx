"use client";

import React from "react";
import Link from "next/link";
import { Car, ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";

interface TransferBookHeaderProps {
  isScrolled: boolean;
}

export const TransferBookHeader: React.FC<TransferBookHeaderProps> = ({ isScrolled }) => {
  const { t } = useLanguage();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-[#0f3460] border-b border-transparent shadow-none"
      }`}
    >
      <div className="container-section flex h-16 items-center justify-between">
        <Link href="/transfer" className="flex items-center gap-2">
          <BrandLogo variant="header" />
          <span className="hidden sm:inline-block ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-sky-400/20 text-sky-200 border border-sky-300/30 whitespace-nowrap">
            {t.transferPage.headerBadge}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSelector variant="dark" />
          <Link
            href="/transfer"
            className="text-xs font-semibold text-sky-200 hover:text-white flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.transferPage.headerBadge}</span>
            <span className="sm:hidden">{t.transferPage.back}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
