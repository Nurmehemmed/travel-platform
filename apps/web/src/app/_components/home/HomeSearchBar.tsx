"use client";

import React from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CustomSelect } from "@/components/CustomSelect";
import { DURATIONS, TOUR_FILTERS } from "./data";

interface HomeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeDuration: string;
  setActiveDuration: (d: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  toursCount: number;
}

export const HomeSearchBar: React.FC<HomeSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  activeDuration,
  setActiveDuration,
  activeFilter,
  setActiveFilter,
  toursCount,
}) => {
  const { t } = useLanguage();

  return (
<div style={{ backgroundColor: "#f0f9ff" }} className="py-10">
        <div className="container-section">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-card p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500/30 transition-all">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={t.search.placeholder}
                aria-label={t.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
              />
            </div>
            <div className="sm:w-auto sm:min-w-[180px]">
              <CustomSelect
                value={activeDuration}
                onChange={(val) => setActiveDuration(val)}
                ariaLabel={t.search.durationLabel}
                triggerClassName="bg-slate-50 border-none py-3"
                options={[
                  { val: "Any duration", label: t.search.durationAll },
                  { val: "Half day (1–4h)", label: t.search.durationHalf },
                  { val: "Full day (5–8h)", label: t.search.durationFull },
                  { val: "Multi-day", label: t.search.durationMulti },
                ]}
              />
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#0f3460" }}
            >
              <Search className="h-4 w-4" />
              <span>{t.nav.tours}</span>
            </button>
          </div>
        </div>
      </div>
  );
};
