"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";

export interface DatePickerProps {
  id?: string | undefined;
  name?: string | undefined;
  value?: string | undefined; // Format: YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: string | undefined; // Format: YYYY-MM-DD
  maxDate?: string | undefined; // Format: YYYY-MM-DD
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  hasError?: boolean | undefined;
  className?: string | undefined;
  align?: ("left" | "right") | undefined;
  ariaLabel?: string | undefined;
}

const MONTHS_I18N: Record<LanguageCode, string[]> = {
  EN: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  AZ: [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
  ],
  RU: [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ],
  FR: [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ],
  AR: [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
  DE: [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ],
};

const WEEKDAYS_I18N: Record<LanguageCode, string[]> = {
  EN: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  AZ: ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"],
  RU: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  FR: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  AR: ["اث", "ثل", "ار", "خم", "جم", "سب", "اح"],
  DE: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
};

const SHORTCUTS_I18N: Record<LanguageCode, { today: string; tomorrow: string; clear: string; selectDate: string }> = {
  EN: { today: "Today", tomorrow: "Tomorrow", clear: "Clear", selectDate: "Select date" },
  AZ: { today: "Bu gün", tomorrow: "Sabah", clear: "Təmizlə", selectDate: "Tarix seçin" },
  RU: { today: "Сегодня", tomorrow: "Завтра", clear: "Очистить", selectDate: "Выберите дату" },
  FR: { today: "Aujourd'hui", tomorrow: "Demain", clear: "Effacer", selectDate: "Sélectionner la date" },
  AR: { today: "اليوم", tomorrow: "غداً", clear: "مسح", selectDate: "اختر التاريخ" },
  DE: { today: "Heute", tomorrow: "Morgen", clear: "Löschen", selectDate: "Datum wählen" },
};

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
}

function parseDateString(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0]!, 10);
  const month = parseInt(parts[1]!, 10) - 1;
  const day = parseInt(parts[2]!, 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return { year, month, day };
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  disabled = false,
  required = false,
  hasError = false,
  className = "",
  align = "left",
  ariaLabel,
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const { language } = useLanguage();
  const lang: LanguageCode = language in MONTHS_I18N ? language : "EN";

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value or fallback to today
  const parsedVal = value ? parseDateString(value) : null;
  const today = new Date();
  const todayStr = formatDateString(today.getFullYear(), today.getMonth(), today.getDate());

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = formatDateString(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  // View state (Month & Year currently browsed in calendar)
  const [viewYear, setViewYear] = useState<number>(parsedVal ? parsedVal.year : today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(parsedVal ? parsedVal.month : today.getMonth());
  const [yearSelectorOpen, setYearSelectorOpen] = useState(false);

  // Sync view when value changes externally
  useEffect(() => {
    if (parsedVal) {
      setViewYear(parsedVal.year);
      setViewMonth(parsedVal.month);
    }
  }, [value]);

  // Outside click & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setYearSelectorOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setYearSelectorOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const selectedDateStr = formatDateString(viewYear, viewMonth, day);
    onChange(selectedDateStr);
    setIsOpen(false);
    setYearSelectorOpen(false);
  };

  const handleQuickSelect = (dateStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const parsed = parseDateString(dateStr);
    if (parsed) {
      setViewYear(parsed.year);
      setViewMonth(parsed.month);
    }
    onChange(dateStr);
    setIsOpen(false);
    setYearSelectorOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
    setYearSelectorOpen(false);
  };

  // Calendar Math: Days in current month & start day offset (Monday = 0, Sunday = 6)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday-first

  // Formatted display text for the input trigger
  const formatDisplay = (dateStr: string): string => {
    const p = parseDateString(dateStr);
    if (!p) return "";
    const mName = MONTHS_I18N[lang][p.month];
    return `${p.day} ${mName} ${p.year}`;
  };

  const isDateDisabled = (day: number) => {
    const dStr = formatDateString(viewYear, viewMonth, day);
    if (minDate && dStr < minDate) return true;
    if (maxDate && dStr > maxDate) return true;
    return false;
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isSelected = (day: number) => {
    if (!parsedVal) return false;
    return (
      parsedVal.year === viewYear &&
      parsedVal.month === viewMonth &&
      parsedVal.day === day
    );
  };

  const shortcuts = SHORTCUTS_I18N[lang];
  const currentMonthName = MONTHS_I18N[lang][viewMonth];

  // Year range generation for quick selector
  const startYear = today.getFullYear() - 80;
  const endYear = today.getFullYear() + 10;
  const yearsList = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? "z-40" : "z-10"}`}>
      {/* ── Trigger Button / Input ── */}
      <button
        type="button"
        id={inputId}
        aria-label={ariaLabel || placeholder || shortcuts.selectDate}
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
          <CalendarIcon
            className={`h-4 w-4 shrink-0 transition-colors ${
              isOpen ? "text-sky-500" : value ? "text-slate-700" : "text-slate-400"
            }`}
          />
          <span className={`truncate ${value ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"}`}>
            {value ? formatDisplay(value) : placeholder || shortcuts.selectDate}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              title={shortcuts.clear}
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

      {/* ── Popover Calendar ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute top-full z-50 mt-2 w-[310px] rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-900/10 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{
            boxShadow:
              "0 20px 35px -10px rgba(15, 52, 96, 0.15), 0 8px 16px -4px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Header (Month / Year Navigation) */}
          <div className="flex items-center justify-between gap-1 pb-3 mb-3 border-b border-slate-100">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              title="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setYearSelectorOpen(!yearSelectorOpen)}
              className="px-2.5 py-1 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-sky-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentMonthName}</span>
              <span className="text-sky-600">{viewYear}</span>
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              title="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Year Selector Dropdown */}
          {yearSelectorOpen ? (
            <div className="h-48 overflow-y-auto grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-50 border border-slate-100">
              {yearsList.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    setViewYear(y);
                    setYearSelectorOpen(false);
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    y === viewYear
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          ) : (
            <>
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-1">
                {WEEKDAYS_I18N[lang].map((wd, i) => (
                  <div key={i} className="py-1">
                    {wd}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before month starts */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8 w-8" />
                ))}

                {/* Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabledDay = isDateDisabled(day);
                  const selected = isSelected(day);
                  const todayDay = isToday(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleSelectDay(day)}
                      className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
                        selected
                          ? "bg-[#0f3460] text-white shadow-md shadow-[#0f3460]/20 scale-105"
                          : disabledDay
                          ? "text-slate-300 bg-transparent cursor-not-allowed"
                          : todayDay
                          ? "bg-sky-50 text-sky-600 font-bold border border-sky-300 hover:bg-sky-100"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Quick Shortcuts Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {(!minDate || todayStr >= minDate) && (!maxDate || todayStr <= maxDate) && (
                <button
                  type="button"
                  onClick={(e) => handleQuickSelect(todayStr, e)}
                  className="rounded-lg px-2 py-1 font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {shortcuts.today}
                </button>
              )}
              {(!minDate || tomorrowStr >= minDate) && (!maxDate || tomorrowStr <= maxDate) && (
                <button
                  type="button"
                  onClick={(e) => handleQuickSelect(tomorrowStr, e)}
                  className="rounded-lg px-2 py-1 font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {shortcuts.tomorrow}
                </button>
              )}
            </div>

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg px-2 py-1 font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                {shortcuts.clear}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
