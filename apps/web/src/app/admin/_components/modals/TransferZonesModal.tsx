"use client";

import React, { useState } from "react";
import { Compass, Search, X } from "lucide-react";
import { LanguageCode } from "@/lib/i18n";
import { AdminLanguage } from "../types";
import {
  TRANSFER_ZONES,
  calculateTransferPrice,
  calculateRoundTripPrice,
} from "@/lib/transfer-zones";
import { LOCALIZED_ZONES } from "@/lib/pages-i18n";
import { useSiteSettings } from "@/lib/settings-context";

interface TransferZonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AdminLanguage;
}

export const TransferZonesModal: React.FC<TransferZonesModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [zoneAirportFilter, setZoneAirportFilter] = useState<string>("ALL");
  const [zoneSearchQuery, setZoneSearchQuery] = useState("");
  const { settings } = useSiteSettings();

  if (!isOpen) return null;

  const pricingConfig = {
    baseRates: {
      sedan: settings.pricing.transferSedan,
      suv: settings.pricing.transferSuv,
      minivan: settings.pricing.transferMinivan,
      sprinter: settings.pricing.transferSprinter,
    },
    perKmRates: {
      sedan: settings.pricing.transferPerKmSedan,
      suv: settings.pricing.transferPerKmSuv,
      minivan: settings.pricing.transferPerKmMinivan,
      sprinter: settings.pricing.transferPerKmSprinter,
    },
    roundTripDiscountPercent: settings.pricing.transferRoundTripDiscountPercent,
  };

  const filteredZones = TRANSFER_ZONES.filter((z) => {
    if (zoneAirportFilter !== "ALL" && z.airport !== zoneAirportFilter) return false;
    const q = zoneSearchQuery.toLowerCase().trim();
    if (!q) return true;
    const localizedName = (LOCALIZED_ZONES[language as LanguageCode]?.[z.id] || z.name).toLowerCase();
    return (
      z.id.toLowerCase().includes(q) ||
      z.name.toLowerCase().includes(q) ||
      localizedName.includes(q) ||
      z.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex flex-col w-full max-w-5xl h-[88vh] max-h-[780px] rounded-2xl bg-white shadow-2xl border border-sky-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0f3460] to-[#1a4478] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/25 border border-sky-300/30 text-sky-200">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {language === "AZ" ? "Transfer Zonaları və Canlı Tarif Matrisi" : "Transfer Zones & Live Tariff Matrix"}
              </h3>
              <p className="text-[11px] text-sky-100/80">
                {language === "AZ"
                  ? "Bütün 28 zona üzrə məsafələr, aktiv qiymət tənzimləmələri ilə hesablanmış tariflər"
                  : "All 28 regional zones, distances, and live calculated fares with active admin settings"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Sub-bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              {language === "AZ" ? "Hava Limanı:" : "Airport:"}
            </span>
            {["ALL", "GYD", "GJA", "NAJ"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setZoneAirportFilter(code)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  zoneAirportFilter === code
                    ? "bg-[#0f3460] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-64 rounded-xl bg-white border border-slate-200 px-3 py-1.5 shadow-2xs">
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder={language === "AZ" ? "Zona və ya şəhər axtar..." : "Search zone or city..."}
              value={zoneSearchQuery}
              onChange={(e) => setZoneSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 outline-none"
            />
          </div>
        </div>

        {/* Active Pricing Multipliers Summary Bar */}
        <div className="bg-sky-50/70 px-5 py-2 border-b border-sky-100 flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-700 shrink-0 gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              Sedan: <strong className="text-slate-900">${settings.pricing.transferSedan} + ${settings.pricing.transferPerKmSedan}/km</strong>
            </span>
            <span>•</span>
            <span>
              SUV: <strong className="text-slate-900">${settings.pricing.transferSuv} + ${settings.pricing.transferPerKmSuv}/km</strong>
            </span>
            <span>•</span>
            <span>
              Minivan: <strong className="text-slate-900">${settings.pricing.transferMinivan} + ${settings.pricing.transferPerKmMinivan}/km</strong>
            </span>
            <span>•</span>
            <span>
              Sprinter: <strong className="text-slate-900">${settings.pricing.transferSprinter} + ${settings.pricing.transferPerKmSprinter}/km</strong>
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">
              Round-Trip: -{settings.pricing.transferRoundTripDiscountPercent}%
            </span>
          </div>
        </div>

        {/* Zones Table Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold text-slate-600 uppercase tracking-wider sticky top-0 z-10 shadow-2xs">
                <th className="py-2.5 px-3">Zone Code & Name</th>
                <th className="py-2.5 px-3">Airport</th>
                <th className="py-2.5 px-3 text-center">Distance</th>
                <th className="py-2.5 px-3 text-right">Sedan (1-3p)</th>
                <th className="py-2.5 px-3 text-right">SUV (1-4p)</th>
                <th className="py-2.5 px-3 text-right">Minivan (4-7p)</th>
                <th className="py-2.5 px-3 text-right">Sprinter (8-16p)</th>
                <th className="py-2.5 px-3 text-right">Round-Trip (Sedan)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredZones.map((z) => {
                const sedanRate = calculateTransferPrice(z, "sedan", pricingConfig);
                const suvRate = calculateTransferPrice(z, "suv", pricingConfig);
                const minivanRate = calculateTransferPrice(z, "minivan", pricingConfig);
                const sprinterRate = calculateTransferPrice(z, "sprinter", pricingConfig);
                const roundTripSedan = calculateRoundTripPrice(z, "sedan", pricingConfig);

                const localizedTitle =
                  LOCALIZED_ZONES[language as LanguageCode]?.[z.id] || z.name;

                return (
                  <tr key={z.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{localizedTitle}</span>
                      <span className="font-mono text-[10px] text-slate-400 block">{z.id}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {z.airport}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-700">
                      {z.distanceKm > 0 ? `${z.distanceKm} km` : "Custom"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                      {sedanRate ? `$${sedanRate.totalAmount}` : "Quote"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                      {suvRate ? `$${suvRate.totalAmount}` : "Quote"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                      {minivanRate ? `$${minivanRate.totalAmount}` : "Quote"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                      {sprinterRate ? `$${sprinterRate.totalAmount}` : "Quote"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      {roundTripSedan ? `$${roundTripSedan.totalAmount}` : "Quote"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {language === "AZ"
              ? "Tarifləri dəyişmək üçün Tənzimləmələr → Qiymətlər bölməsinə keçin"
              : "To modify pricing formulas, open Settings → Pricing & Margins"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0f3460] text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            {language === "AZ" ? "Bağla" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
