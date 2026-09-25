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

export interface RatesInfo {
  lastUpdated: string | null;
  source: string;
  isLive: boolean;
}

export const DEFAULT_CURRENCIES: CurrencyItem[] = [
  { code: "USD", symbol: "$",   label: "USD ($)",   name: "US Dollar",         rate: 1.000 },
  { code: "AZN", symbol: "₼",   label: "AZN (₼)",   name: "Azerbaijani Manat", rate: 1.700 }, // Officially pegged (1 USD = 1.70 AZN)
  { code: "AED", symbol: "د.إ", label: "AED (د.إ)", name: "UAE Dirham",        rate: 3.673 }, // Officially pegged (1 USD = 3.6725 AED)
  { code: "EUR", symbol: "€",   label: "EUR (€)",   name: "Euro",              rate: 0.880 }, // Live ECB market rate
  { code: "GBP", symbol: "£",   label: "GBP (£)",   name: "British Pound",     rate: 0.760 }, // Live ECB market rate
];

export const CURRENCIES = DEFAULT_CURRENCIES;

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  activeCurrency: CurrencyItem;
  currencies: CurrencyItem[];
  ratesInfo: RatesInfo;
  formatPrice: (usdAmount: number) => string;
  convertPrice: (usdAmount: number) => number;
  formatPriceWithSubtext: (usdAmount: number) => { formatted: string; secondary: string | null };
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "hibaku_preferred_currency";
const LEGACY_STORAGE_KEY = "addmetour_preferred_currency";
const RATES_CACHE_KEY = "hibaku_exchange_rates_cache_v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours (Enterprise standard)

interface StoredRatesCache {
  rates: Record<CurrencyCode, number>;
  lastUpdated: string;
  source: string;
  cachedAt: number;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [currencyList, setCurrencyList] = useState<CurrencyItem[]>(DEFAULT_CURRENCIES);
  const [ratesInfo, setRatesInfo] = useState<RatesInfo>({
    lastUpdated: null,
    source: "defaults",
    isLive: false,
  });

  // 1. Restore Preferred Currency from LocalStorage
  useEffect(() => {
    try {
      const saved =
        (localStorage.getItem(STORAGE_KEY) as CurrencyCode | null) ||
        (localStorage.getItem(LEGACY_STORAGE_KEY) as CurrencyCode | null);

      if (saved && DEFAULT_CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyState(saved);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  // 2. Load & Sync Exchange Rates (6-Hour Edge Cache + Background SWR)
  useEffect(() => {
    const applyRates = (
      rates: Record<string, number>,
      lastUpdated: string,
      source: string,
      isLive: boolean
    ) => {
      setCurrencyList((prev) =>
        prev.map((c) => {
          if (c.code === "AZN") return { ...c, rate: 1.70 }; // Strictly pegged
          if (c.code === "AED") return { ...c, rate: 3.673 }; // Strictly pegged
          if (rates[c.code]) {
            return { ...c, rate: rates[c.code]! };
          }
          return c;
        })
      );
      setRatesInfo({ lastUpdated, source, isLive });
    };

    let cacheHit = false;

    // Check LocalStorage cache first (Immediate zero-latency hydrate)
    try {
      const cached = localStorage.getItem(RATES_CACHE_KEY);
      if (cached) {
        const parsed: StoredRatesCache = JSON.parse(cached);
        const isFresh = Date.now() - parsed.cachedAt < CACHE_TTL_MS;
        if (parsed.rates) {
          applyRates(parsed.rates, parsed.lastUpdated, parsed.source, true);
          if (isFresh) {
            cacheHit = true;
          }
        }
      }
    } catch {
      // Ignore cache parse error
    }

    // If cache is expired or missing, fetch latest 6-hour revalidated rates from our Edge API
    if (!cacheHit) {
      fetch("/api/currency/rates")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch rates");
          return res.json();
        })
        .then((data) => {
          if (data?.rates) {
            applyRates(data.rates, data.lastUpdated, data.source, true);
            try {
              const toCache: StoredRatesCache = {
                rates: data.rates,
                lastUpdated: data.lastUpdated,
                source: data.source,
                cachedAt: Date.now(),
              };
              localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(toCache));
            } catch {
              // Ignore storage quotas
            }
          }
        })
        .catch(() => {
          // Graceful fallback to guaranteed baseline defaults
        });
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore
    }
  }, []);

  const activeCurrency = currencyList.find((c) => c.code === currency) ?? currencyList[0]!;

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

  // Industry Standard: Display estimated local price with transparent Base Currency settlement subtext
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
        currencies: currencyList,
        ratesInfo,
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
    const fallbackCurrency = DEFAULT_CURRENCIES[0]!;
    return {
      currency: "USD",
      setCurrency: () => {},
      activeCurrency: fallbackCurrency,
      currencies: DEFAULT_CURRENCIES,
      ratesInfo: { lastUpdated: null, source: "fallback", isLive: false },
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
