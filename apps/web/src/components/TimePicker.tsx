"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { Clock, X, Check } from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";

export interface TimePickerProps {
  id?: string | undefined;
  name?: string | undefined;
  value?: string | undefined; // Format: HH:MM (24h)
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  hasError?: boolean | undefined;
  className?: string | undefined;
  align?: ("left" | "right") | undefined;
  ariaLabel?: string | undefined;
}

const TIME_I18N: Record<
  LanguageCode,
  {
    hours: string;
    minutes: string;
    now: string;
    clear: string;
    selectTime: string;
    morning: string;
    afternoon: string;
    evening: string;
  }
> = {
  EN: {
    hours: "Hours",
    minutes: "Minutes",
    now: "Now",
    clear: "Clear",
    selectTime: "Select time",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
  AZ: {
    hours: "Saat",
    minutes: "Dəqiqə",
    now: "İndi",
    clear: "Təmizlə",
    selectTime: "Saat seçin",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
  RU: {
    hours: "Часы",
    minutes: "Минуты",
    now: "Сейчас",
    clear: "Очистить",
    selectTime: "Выберите время",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
  FR: {
    hours: "Heures",
    minutes: "Minutes",
    now: "Maintenant",
    clear: "Effacer",
    selectTime: "Sélectionner l'heure",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
  AR: {
    hours: "الساعات",
    minutes: "الدقائق",
    now: "الآن",
    clear: "مسح",
    selectTime: "اختر الوقت",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
  DE: {
    hours: "Stunden",
    minutes: "Minuten",
    now: "Jetzt",
    clear: "Löschen",
    selectTime: "Uhrzeit wählen",
    morning: "09:00",
    afternoon: "14:00",
    evening: "19:00",
  },
};

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

const HOURS = Array.from({ length: 24 }, (_, i) => padZero(i));
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

export function TimePicker({
  id,
  name,
  value = "",
  onChange,
  placeholder,
  disabled = false,
  required = false,
  hasError = false,
  className = "",
  align = "left",
  ariaLabel,
}: TimePickerProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const { language } = useLanguage();
  const lang: LanguageCode = language in TIME_I18N ? language : "EN";
  const t = TIME_I18N[lang];

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoursListRef = useRef<HTMLDivElement>(null);
  const minutesListRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const [selectedHour, selectedMinute] = value && value.includes(":") ? value.split(":") : ["", ""];

  // Outside click & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Scroll active elements into view when opening
  useEffect(() => {
    if (isOpen) {
      if (hoursListRef.current && selectedHour) {
        const activeHourEl = hoursListRef.current.querySelector(`[data-hour="${selectedHour}"]`) as HTMLElement | null;
        if (activeHourEl) {
          activeHourEl.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
      if (minutesListRef.current && selectedMinute) {
        const activeMinuteEl = minutesListRef.current.querySelector(`[data-minute="${selectedMinute}"]`) as HTMLElement | null;
        if (activeMinuteEl) {
          activeMinuteEl.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    }
  }, [isOpen]);

  const handleSelectHour = (h: string) => {
    const min = selectedMinute || "00";
    onChange(`${h}:${min}`);
  };

  const handleSelectMinute = (m: string) => {
    const hr = selectedHour || "12";
    onChange(`${hr}:${m}`);
    setIsOpen(false);
  };

  const handleNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = new Date();
    const hr = padZero(now.getHours());
    const roundedMin = padZero(Math.round(now.getMinutes() / 5) * 5 % 60);
    onChange(`${hr}:${roundedMin}`);
    setIsOpen(false);
  };

  const handlePreset = (timeStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(timeStr);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Trigger Button / Input ── */}
      <button
        type="button"
        id={inputId}
        aria-label={ariaLabel || placeholder || t.selectTime}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        className={`group flex w-full items-center justify-between rounded-xl border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
          disabled
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : hasError
            ? "border-red-400 bg-red-50/30 text-slate-800 ring-2 ring-red-200 animate-shake"
            : isOpen
            ? "border-sky-500 ring-2 ring-sky-100 text-slate-800"
            : "border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
        } ${className}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Clock
            className={`h-4 w-4 shrink-0 transition-colors ${
              isOpen ? "text-sky-500" : value ? "text-slate-700" : "text-slate-400"
            }`}
          />
          <span className={`truncate ${value ? "text-slate-900 font-semibold font-mono" : "text-slate-400 font-normal"}`}>
            {value || placeholder || t.selectTime}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              title={t.clear}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClear(e as any);
              }}
              className="rounded-md p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </button>

      {/* Hidden real form input for form serialization / required check */}
      <input
        type="hidden"
        name={name || inputId}
        value={value || ""}
        required={required}
      />

      {/* ── Popover Time Picker ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute top-full z-50 mt-2 w-[260px] rounded-2xl bg-white p-3.5 shadow-2xl ring-1 ring-slate-900/10 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{
            boxShadow:
              "0 20px 35px -10px rgba(15, 52, 96, 0.15), 0 8px 16px -4px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Quick presets chips */}
          <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-slate-100 overflow-x-auto">
            <button
              type="button"
              onClick={handleNow}
              className="px-2 py-1 text-[11px] font-bold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer shrink-0"
            >
              {t.now}
            </button>
            <button
              type="button"
              onClick={(e) => handlePreset(t.morning, e)}
              className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              {t.morning}
            </button>
            <button
              type="button"
              onClick={(e) => handlePreset(t.afternoon, e)}
              className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              {t.afternoon}
            </button>
            <button
              type="button"
              onClick={(e) => handlePreset(t.evening, e)}
              className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              {t.evening}
            </button>
          </div>

          {/* Time Picker Columns */}
          <div className="grid grid-cols-2 gap-2">
            {/* Hours Column */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1.5">
                {t.hours}
              </div>
              <div
                ref={hoursListRef}
                className="h-44 overflow-y-auto space-y-1 rounded-xl bg-slate-50 p-1 border border-slate-100 pr-1 scrollbar-thin"
              >
                {HOURS.map((h) => {
                  const isSelected = selectedHour === h;
                  return (
                    <button
                      key={h}
                      data-hour={h}
                      type="button"
                      onClick={() => handleSelectHour(h)}
                      className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-[#0f3460] text-white shadow-sm"
                          : "text-slate-700 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1.5">
                {t.minutes}
              </div>
              <div
                ref={minutesListRef}
                className="h-44 overflow-y-auto space-y-1 rounded-xl bg-slate-50 p-1 border border-slate-100 pr-1 scrollbar-thin"
              >
                {MINUTES.map((m) => {
                  const isSelected = selectedMinute === m;
                  return (
                    <button
                      key={m}
                      data-minute={m}
                      type="button"
                      onClick={() => handleSelectMinute(m)}
                      className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-sky-500 text-white shadow-sm"
                          : "text-slate-700 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="text-[11px] font-mono font-bold text-slate-500">
              {value ? `${selectedHour || "12"}:${selectedMinute || "00"}` : "--:--"}
            </div>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg px-2 py-0.5 font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-[11px]"
              >
                {t.clear}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePicker;
