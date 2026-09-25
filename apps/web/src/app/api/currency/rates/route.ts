import { NextResponse } from "next/server";
import https from "node:https";

// Cache for 6 hours on Edge/CDN (21600 seconds)
export const revalidate = 21600;

export interface RatesResponse {
  base: "USD";
  rates: {
    USD: number;
    AZN: number;
    AED: number;
    EUR: number;
    GBP: number;
  };
  lastUpdated: string;
  source: "ecb_frankfurter" | "er_api" | "fallback_defaults";
  pegNote: string;
}

// Guaranteed baseline fallbacks (Official government pegs + robust defaults)
const FALLBACK_RATES: RatesResponse["rates"] = {
  USD: 1.0,
  AZN: 1.70,     // Officially pegged to USD by Central Bank of Azerbaijan (fixed since 2017)
  AED: 3.6725,   // Officially pegged to USD by UAE Central Bank (fixed since 1997)
  EUR: 0.88,
  GBP: 0.76,
};

// Resilient JSON fetcher supporting local dev certificates & production environments
async function safeFetchJson<T>(url: string): Promise<T | null> {
  // 1. Try standard native fetch first
  try {
    const res = await fetch(url, {
      next: { revalidate: 21600 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch {
    // 2. Fallback for local development environments with local proxy/self-signed root CAs
    try {
      return await new Promise<T | null>((resolve) => {
        const req = https.get(
          url,
          {
            headers: { Accept: "application/json", "User-Agent": "HiBaku/1.0" },
            timeout: 5000,
            rejectUnauthorized: process.env.NODE_ENV === "production",
          },
          (res) => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              let body = "";
              res.on("data", (chunk) => (body += chunk));
              res.on("end", () => {
                try {
                  resolve(JSON.parse(body) as T);
                } catch {
                  resolve(null);
                }
              });
            } else {
              resolve(null);
            }
          }
        );
        req.on("error", () => resolve(null));
        req.on("timeout", () => {
          req.destroy();
          resolve(null);
        });
      });
    } catch {
      return null;
    }
  }
  return null;
}

export async function GET() {
  let rates = { ...FALLBACK_RATES };
  let source: RatesResponse["source"] = "fallback_defaults";
  let lastUpdated = new Date().toISOString();

  // 1. Primary Source: European Central Bank (ECB) official data via Frankfurter
  const ecbData = await safeFetchJson<{ date?: string; rates?: Record<string, number> }>(
    "https://api.frankfurter.dev/v1/latest?base=USD"
  );

  if (ecbData?.rates) {
    rates = {
      USD: 1.0,
      AZN: 1.70,   // Strict government fixed peg
      AED: 3.6725, // Strict government fixed peg
      EUR: Number((ecbData.rates.EUR || FALLBACK_RATES.EUR).toFixed(4)),
      GBP: Number((ecbData.rates.GBP || FALLBACK_RATES.GBP).toFixed(4)),
    };
    source = "ecb_frankfurter";
    if (ecbData.date) {
      lastUpdated = `${ecbData.date}T00:00:00.000Z`;
    }
  } else {
    // 2. Secondary Backup: ExchangeRate-API open daily feed
    const erData = await safeFetchJson<{
      time_last_update_utc?: string;
      rates?: Record<string, number>;
    }>("https://open.er-api.com/v6/latest/USD");

    if (erData?.rates) {
      rates = {
        USD: 1.0,
        AZN: 1.70,
        AED: 3.6725,
        EUR: Number((erData.rates.EUR || FALLBACK_RATES.EUR).toFixed(4)),
        GBP: Number((erData.rates.GBP || FALLBACK_RATES.GBP).toFixed(4)),
      };
      source = "er_api";
      if (erData.time_last_update_utc) {
        lastUpdated = new Date(erData.time_last_update_utc).toISOString();
      }
    }
  }

  const payload: RatesResponse = {
    base: "USD",
    rates,
    lastUpdated,
    source,
    pegNote: "AZN and AED are officially pegged to USD (1 USD = 1.70 AZN / 3.6725 AED). EUR & GBP are live market rates.",
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      "CDN-Cache-Control": "public, s-maxage=21600",
    },
  });
}
