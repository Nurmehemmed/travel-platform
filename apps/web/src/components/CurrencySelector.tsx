"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useCurrency, CurrencyCode } from "@/lib/currency-context";

interface CurrencySelectorProps {
  variant?: "dark" | "light";
  className?: string;
}

export function CurrencySelector({
  variant = "dark",
  className = "",
}: CurrencySelectorProps) {
  const { currency, setCurrency, activeCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isDark = variant === "dark";

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-all cursor-pointer shrink-0 whitespace-nowrap border ${
          isDark
            ? "text-white/90 hover:text-white hover:bg-white/10 border-white/15"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Switch currency"
      >
        <span className="font-bold">{activeCurrency.symbol}</span>
        <span className="hidden sm:inline font-mono text-[11px]">{activeCurrency.code}</span>
        <ChevronDown
          className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute end-0 top-full mt-2 w-44 max-w-[calc(100vw-2rem)] rounded-2xl p-1.5 shadow-2xl z-50 animate-scale-up border"
          style={{
            backgroundColor: isDark ? "#0f3460" : "#ffffff",
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "#e2e8f0",
            boxShadow: "0 10px 25px -5px rgba(15, 52, 96, 0.3)",
          }}
        >
          <div
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
              isDark ? "text-white/50" : "text-slate-400"
            }`}
          >
            Select Currency
          </div>
          {currencies.map((c) => {
            const isSelected = currency === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-start ${
                  isSelected
                    ? "bg-amber-500 text-[#061225] font-bold shadow-sm"
                    : isDark
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-center font-bold text-sm">
                    {c.symbol}
                  </span>
                  <span>{c.name}</span>
                  <span className={`text-[10px] ${isSelected ? "text-[#061225]/70" : isDark ? "text-white/50" : "text-slate-400"}`}>
                    ({c.code})
                  </span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[#061225]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CurrencySelector;
