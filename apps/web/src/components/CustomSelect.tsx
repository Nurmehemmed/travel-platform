"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode | undefined;
  description?: string | undefined;
  badge?: string | undefined;
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

  // Filter options if searchable
  const filteredOptions = searchable && searchTerm.trim() !== ""
    ? normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(opt.value).toLowerCase().includes(searchTerm.toLowerCase())
      )
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
          className={`absolute top-full z-50 mt-1.5 w-full min-w-[200px] max-w-full rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-slate-900/10 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
          style={{
            boxShadow:
              "0 20px 35px -10px rgba(15, 52, 96, 0.15), 0 8px 16px -4px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Search Box */}
          {searchable && (
            <div className="relative mb-1.5 px-1 pt-1">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-100 focus-within:border-sky-400 focus-within:bg-white transition-all">
                <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-base sm:text-xs text-slate-800 placeholder-slate-400 outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTerm("");
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div ref={listRef} className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-slate-400">
                No matching options
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    key={String(opt.value)}
                    data-value={String(opt.value)}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#0f3460] text-white font-semibold shadow-sm"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <span className="truncate">{opt.label}</span>
                      {opt.description && (
                        <span
                          className={`text-[11px] truncate ${
                            isSelected ? "text-sky-200" : "text-slate-400"
                          }`}
                        >
                          {opt.description}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {opt.badge && (
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[2.5]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
