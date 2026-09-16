"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CurrencyCode = "USD" | "AZN" | "AED" | "EUR" | "GBP";

export interface CurrencyItem {
  code: CurrencyCode;
  symbol: string;
  label: string;
  name: string;
  rate: number; // multiplier relative to USD base
}

export const CURRENCIES: CurrencyItem[] = [
  { code: "USD", symbol: "$",   label: "USD ($)",   name: "US Dollar",         rate: 1.000 },
  { code: "AZN", symbol: "₼",   label: "AZN (₼)",   name: "Azerbaijani Manat", rate: 1.700 },
  { code: "AED", symbol: "د.إ", label: "AED (د.إ)", name: "UAE Dirham",        rate: 3.673 },
  { code: "EUR", symbol: "€",   label: "EUR (€)",   name: "Euro",              rate: 0.920 },
  { code: "GBP", symbol: "£",   label: "GBP (£)",   name: "British Pound",     rate: 0.790 },
];

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  activeCurrency: CurrencyItem;
  currencies: CurrencyItem[];
  formatPrice: (usdAmount: number) => string;
  convertPrice: (usdAmount: number) => number;
  formatPriceWithSubtext: (usdAmount: number) => { formatted: string; secondary: string | null };
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "addmetour_preferred_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const activeCurrency = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0]!;

  const convertPrice = useCallback(
    (usdAmount: number) => {
      return Math.round(usdAmount * activeCurrency.rate);
    },
    [activeCurrency.rate]
  );

  const formatPrice = useCallback(
    (usdAmount: number) => {
      const converted = Math.round(usdAmount * activeCurrency.rate);
      if (activeCurrency.code === "AED") {
        return `${converted.toLocaleString()} ${activeCurrency.symbol}`;
      }
      return `${activeCurrency.symbol}${converted.toLocaleString()}`;
    },
    [activeCurrency]
  );

  const formatPriceWithSubtext = useCallback(
    (usdAmount: number) => {
      const formatted = formatPrice(usdAmount);
      let secondary: string | null = null;
      if (activeCurrency.code !== "USD") {
        secondary = `~$${usdAmount} USD`;
      } else {
        const aznAmount = Math.round(usdAmount * 1.7);
        secondary = `~₼${aznAmount} AZN`;
      }
      return { formatted, secondary };
    },
    [formatPrice, activeCurrency.code]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        activeCurrency,
        currencies: CURRENCIES,
        formatPrice,
        convertPrice,
        formatPriceWithSubtext,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Fallback if rendered outside provider
    const fallbackCurrency = CURRENCIES[0]!;
    return {
      currency: "USD",
      setCurrency: () => {},
      activeCurrency: fallbackCurrency,
      currencies: CURRENCIES,
      formatPrice: (usd: number) => `$${Math.round(usd)}`,
      convertPrice: (usd: number) => usd,
      formatPriceWithSubtext: (usd: number) => ({
        formatted: `$${Math.round(usd)}`,
        secondary: `~₼${Math.round(usd * 1.7)} AZN`,
      }),
    };
  }
  return ctx;
}
