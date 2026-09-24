"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface HomeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeDuration?: string;
  setActiveDuration?: (d: string) => void;
  activeFilter?: string;
  setActiveFilter?: (f: string) => void;
  toursCount?: number;
}

export const HomeSearchBar: React.FC<HomeSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { t } = useLanguage();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById("tours");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#f0f9ff" }} className="py-10">
      <div className="container-section">
        <form
          onSubmit={handleSearchSubmit}
          className="mx-auto max-w-2xl rounded-2xl bg-white shadow-card p-2 sm:p-2.5 flex items-center gap-2 sm:gap-3"
        >
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
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer shrink-0 shadow-sm"
            style={{ backgroundColor: "#0f3460" }}
          >
            <Search className="h-4 w-4" />
            <span>{t.nav.tours}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
