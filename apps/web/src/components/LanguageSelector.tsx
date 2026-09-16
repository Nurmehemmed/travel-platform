"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";

interface LanguageSelectorProps {
  variant?: "dark" | "light";
  className?: string;
}

export function LanguageSelector({
  variant = "dark",
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage, currentLangInfo, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap border ${
          isDark
            ? "text-white/90 hover:text-white hover:bg-white/10 border-white/15"
            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t.nav.language}
      >
        <span className="text-sm leading-none">{currentLangInfo.flag}</span>
        <span className="tracking-wider">{currentLangInfo.code}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 opacity-70 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute end-0 top-full mt-2 w-48 max-w-[calc(100vw-2rem)] rounded-2xl p-1.5 shadow-2xl z-50 animate-scale-up border bg-[#f0f9ff] border-sky-100"
          style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #e0f2fe",
            boxShadow: "0 10px 25px -5px rgba(15, 52, 96, 0.25)",
          }}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {t.nav.selectLanguage}
          </div>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-start ${
                  isSelected
                    ? "bg-sky-100/80 text-sky-900 font-bold"
                    : "text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[10px] text-slate-400">
                    ({lang.code})
                  </span>
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
