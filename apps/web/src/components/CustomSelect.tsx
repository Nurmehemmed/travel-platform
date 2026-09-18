"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { ChevronDown, Check, Search, X, Plus } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode | undefined;
  description?: string | undefined;
  badge?: string | undefined;
  group?: string | undefined;
  aliases?: string[] | undefined;
}

export interface CustomSelectProps {
  id?: string | undefined;
  name?: string | undefined;
  value?: string | number | undefined;
  onChange: (value: any) => void;
  options: (SelectOption | string | { val: string | number; label: string })[];
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  hasError?: boolean | undefined;
  className?: string | undefined;
  triggerClassName?: string | undefined;
  menuClassName?: string | undefined;
  searchable?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  align?: ("left" | "right") | undefined;
  icon?: React.ReactNode | undefined;
  ariaLabel?: string | undefined;
  allowCustomValue?: boolean | undefined;
  customValueLabelPrefix?: string | undefined;
  onOpenMapPicker?: (() => void) | undefined;
  mapPickerLabel?: string | undefined;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  required = false,
  hasError = false,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  searchable = false,
  searchPlaceholder = "Search...",
  align = "left",
  icon,
  ariaLabel,
  allowCustomValue = false,
  customValueLabelPrefix = "Use custom destination",
  onOpenMapPicker,
  mapPickerLabel,
}: CustomSelectProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Normalize options into SelectOption objects
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    if ("val" in opt) {
      return { value: (opt as any).val, label: opt.label };
    }
    return opt as SelectOption;
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  // Multi-keyword and alias search filtering
  const filteredOptions = searchable && searchTerm.trim() !== ""
    ? normalizedOptions.filter((opt) => {
        const q = searchTerm.toLowerCase().trim();
        if (opt.label.toLowerCase().includes(q)) return true;
        if (String(opt.value).toLowerCase().includes(q)) return true;
        if (opt.description && opt.description.toLowerCase().includes(q)) return true;
        if (opt.badge && opt.badge.toLowerCase().includes(q)) return true;
        if (opt.group && opt.group.toLowerCase().includes(q)) return true;
        if (opt.aliases && opt.aliases.some((a) => a.toLowerCase().includes(q))) return true;
        return false;
      })
    : normalizedOptions;

  // Outside click & Escape listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (isOpen && listRef.current && selectedOption) {
      const activeEl = listRef.current.querySelector(
        `[data-value="${selectedOption.value}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, searchable, selectedOption]);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Group options if group property is present
  const hasGroups = normalizedOptions.some((opt) => Boolean(opt.group));

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? "z-40" : "z-10"} ${className}`}>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        id={inputId}
        aria-label={ariaLabel || placeholder}
        aria-haspopup="listbox"
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
        } ${triggerClassName}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {icon && (
            <span className={`shrink-0 transition-colors ${isOpen ? "text-sky-500" : "text-slate-400"}`}>
              {icon}
            </span>
          )}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span
            className={`truncate ${
              selectedOption ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ml-2 ${
            isOpen ? "rotate-180 text-sky-600" : "group-hover:text-slate-600"
          }`}
        />
      </button>

      {/* Hidden real form input for form validation */}
      <input
        type="hidden"
        name={name || inputId}
        value={value !== undefined ? String(value) : ""}
        required={required}
      />

      {/* ── Popover Menu ── */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute top-full z-50 mt-1.5 w-full min-w-[260px] max-w-full rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-slate-900/10 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
          style={{
            boxShadow:
              "0 20px 35px -10px rgba(15, 52, 96, 0.18), 0 8px 16px -4px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Search Box */}
          {searchable && (
            <div className="relative mb-1.5 px-1 pt-1">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-sm sm:text-xs text-slate-800 placeholder-slate-400 outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTerm("");
                    }}
                    className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/50"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Pick on Map quick action */}
          {onOpenMapPicker && (
            <div className="px-1 pb-1.5 mb-1 border-b border-slate-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  onOpenMapPicker();
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100/80 border border-sky-200/70 transition-all cursor-pointer group/map"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base group-hover/map:scale-110 transition-transform">🗺️</span>
                  <span>{mapPickerLabel || "Select location on interactive map"}</span>
                </div>
                <span className="text-[10px] uppercase font-extrabold text-sky-600 bg-sky-200/60 px-1.5 py-0.5 rounded-md">
                  Map Pin
                </span>
              </button>
            </div>
          )}

          {/* Options List */}
          <div ref={listRef} className="max-h-72 overflow-y-auto space-y-0.5 scrollbar-thin p-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 px-3 text-center space-y-2">
                <p className="text-xs text-slate-500 font-medium">No direct matches found</p>
                {onOpenMapPicker && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      onOpenMapPicker();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>🗺️</span>
                    <span>{mapPickerLabel || "Pick exact location on map"}</span>
                  </button>
                )}
                {allowCustomValue && searchTerm.trim() && (
                  <button
                    type="button"
                    onClick={() => handleSelect(`custom:${searchTerm.trim()}`)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{customValueLabelPrefix}: &ldquo;{searchTerm.trim()}&rdquo;</span>
                  </button>
                )}
              </div>
            ) : (
              (() => {
                let lastGroup: string | null = null;
                return filteredOptions.map((opt) => {
                  const isSelected = String(opt.value) === String(value);
                  const showGroupHeader = hasGroups && opt.group && opt.group !== lastGroup;
                  if (showGroupHeader && opt.group) {
                    lastGroup = opt.group;
                  }

                  return (
                    <React.Fragment key={String(opt.value)}>
                      {showGroupHeader && (
                        <div className="sticky top-0 z-10 px-2.5 py-1.5 mt-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100/95 backdrop-blur-sm rounded-lg border border-slate-200/60 shadow-2xs">
                          {opt.group}
                        </div>
                      )}
                      <button
                        data-value={String(opt.value)}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(opt.value)}
                        className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-[#0f3460] text-white font-semibold shadow-sm"
                            : "text-slate-700 hover:bg-sky-50/70 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden truncate">
                          {opt.icon && <span className="shrink-0 text-base">{opt.icon}</span>}
                          <div className="flex flex-col text-left leading-tight truncate">
                            <span className="truncate">{opt.label}</span>
                            {opt.description && (
                              <span
                                className={`text-[11px] truncate mt-0.5 ${
                                  isSelected ? "text-sky-200/90" : "text-slate-500"
                                }`}
                              >
                                {opt.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {opt.badge && (
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 text-slate-600 border border-slate-200/60"
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && <Check className="h-4 w-4 text-amber-400 stroke-[2.5]" />}
                        </div>
                      </button>
                    </React.Fragment>
                  );
                });
              })()
            )}
          </div>

          {/* Custom value quick action at bottom if user typed something */}
          {allowCustomValue && searchTerm.trim() && filteredOptions.length > 0 && (
            <div className="border-t border-slate-100 mt-1 pt-1 px-1">
              <button
                type="button"
                onClick={() => handleSelect(`custom:${searchTerm.trim()}`)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                <Plus className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                <span className="truncate">{customValueLabelPrefix}: &ldquo;{searchTerm.trim()}&rdquo;</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;

