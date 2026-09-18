import React, { useState } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  Car,
  AlertCircle,
  MessageCircle,
  MapPin,
  X,
  Sliders,
  DollarSign,
  Compass,
} from "lucide-react";
import { TransferItem, AdminLanguage } from "./types";
import { LanguageCode } from "@/lib/i18n";
import {
  TRANSFER_ZONES,
  calculateTransferPrice,
  calculateRoundTripPrice,
  AirportCode,
} from "@/lib/transfer-zones";
import { LOCALIZED_ZONES } from "@/lib/pages-i18n";
import { useSiteSettings } from "@/lib/settings-context";

interface TransfersTabProps {
  language: AdminLanguage;
  adminT: any;
  transfersList: TransferItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  transferStatusFilter: string;
  setTransferStatusFilter: (st: string) => void;
  handleOpenTransferModal: (t: TransferItem) => void;
}

export const TransfersTab: React.FC<TransfersTabProps> = ({
  language,
  adminT,
  transfersList,
  searchQuery,
  setSearchQuery,
  transferStatusFilter,
  setTransferStatusFilter,
  handleOpenTransferModal,
}) => {
  const [isZonesModalOpen, setIsZonesModalOpen] = useState(false);
  const [zoneAirportFilter, setZoneAirportFilter] = useState<string>("ALL");
  const [zoneSearchQuery, setZoneSearchQuery] = useState("");
  const { settings } = useSiteSettings();

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
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">
            {language === "AZ" ? "Cəmi Transferlər" : "Total Transfers"}
          </span>
          <p className="text-2xl font-bold font-display text-slate-900 mt-1">
            {transfersList.length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-amber-600 uppercase">
            {language === "AZ" ? "Sürücü Gözləyən / Yeni" : "Awaiting Driver / New"}
          </span>
          <p className="text-2xl font-bold font-display text-amber-600 mt-1">
            {transfersList.filter((t) => t.status === "pending").length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-sky-600 uppercase">
            {language === "AZ" ? "Təsdiqlənmiş / Yolda" : "Confirmed / En Route"}
          </span>
          <p className="text-2xl font-bold font-display text-sky-600 mt-1">
            {
              transfersList.filter(
                (t) => t.status === "confirmed" || t.status === "in_progress"
              ).length
            }
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase">
            {language === "AZ" ? "Tamamlanmış" : "Completed"}
          </span>
          <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
            {transfersList.filter((t) => t.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar + Tariff Matrix Button */}
      <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-80 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder={adminT.transfersTab.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsZonesModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Compass className="h-4 w-4 text-sky-600" />
            <span>
              {language === "AZ" ? "Zonalar və Canlı Qiymət Matrisi" : "Zones & Live Tariff Matrix"}
            </span>
            <span className="ml-1 rounded-full bg-sky-200/80 px-1.5 py-0.2 text-[10px] text-sky-900 font-bold">
              {TRANSFER_ZONES.length}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["all", "pending", "confirmed", "in_progress", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setTransferStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                transferStatusFilter === st
                  ? "bg-[#0f3460] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "all"
                ? adminT.actions.filterAll
                : st === "in_progress"
                ? language === "AZ"
                  ? "Yolda"
                  : "En Route"
                : adminT.status[st as keyof typeof adminT.status] || st}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ ZONES & TARIFF MATRIX MODAL */}
      {isZonesModalOpen && (
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
                onClick={() => setIsZonesModalOpen(false)}
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
                onClick={() => setIsZonesModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#0f3460] text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                {language === "AZ" ? "Bağla" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfers Table */}
      <div className="rounded-2xl bg-white border border-[#e0f2fe] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">{adminT.transfersTab.colRoute}</th>
                <th className="py-3 px-4">{adminT.transfersTab.colFlight}</th>
                <th className="py-3 px-4">{adminT.transfersTab.colPassenger}</th>
                <th className="py-3 px-4">{adminT.transfersTab.colVehicle}</th>
                <th className="py-3 px-4">{language === "AZ" ? "Sürücü" : "Chauffeur"}</th>
                <th className="py-3 px-4">{adminT.transfersTab.colStatus}</th>
                <th className="py-3 px-4 text-right">{adminT.transfersTab.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transfersList
                .filter((t) => {
                  const matchesFilter =
                    transferStatusFilter === "all" || t.status === transferStatusFilter;
                  const q = searchQuery.toLowerCase().trim();
                  const matchesQuery =
                    !q ||
                    t.bookingNumber.toLowerCase().includes(q) ||
                    t.passengerName.toLowerCase().includes(q) ||
                    t.flightNumber.toLowerCase().includes(q) ||
                    t.phoneNumber.toLowerCase().includes(q) ||
                    t.dropoffAddress.toLowerCase().includes(q);
                  return matchesFilter && matchesQuery;
                })
                .map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block text-xs">
                        {item.bookingNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {item.airport} &middot;{" "}
                        {item.direction === "arrival"
                          ? language === "AZ"
                            ? "🛬 Qarşılama"
                            : "🛬 Arrival"
                          : item.direction === "departure"
                          ? language === "AZ"
                            ? "🛫 Yola salma"
                            : "🛫 Departure"
                          : language === "AZ"
                          ? "🔄 İkitərəfli"
                          : "🔄 Round Trip"}
                      </span>
                      <span className="text-[10px] text-slate-400 block line-clamp-1">
                        {item.pickupZone}: {item.dropoffAddress}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono font-semibold text-slate-800">
                          ✈️ {item.flightNumber}
                        </span>
                        <a
                          href={`https://www.flightradar24.com/data/flights/${item.flightNumber.replace(/\s+/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={
                            language === "AZ"
                              ? "FlightRadar24-də Canlı İzlə"
                              : "Track Live Flight on FlightRadar24"
                          }
                          className="inline-flex items-center gap-0.5 text-[9px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded hover:bg-sky-100"
                        >
                          Live ↗
                        </a>
                      </div>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        {item.flightDate} at {item.flightTime}
                      </span>
                      {item.returnFlightNumber && (
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                          ↩️ {item.returnFlightNumber} on {item.returnDate}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">
                        {item.passengerName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {item.passengerCount} {language === "AZ" ? "nəfər" : "pax"} &middot;{" "}
                        {item.phoneNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{item.email}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">
                        ${item.totalAmount}
                      </span>
                      <span className="text-[11px] text-slate-600 font-medium block">
                        {item.vehicleClass === "sedan"
                          ? "🚗 Sedan"
                          : item.vehicleClass === "suv"
                          ? "🚙 SUV"
                          : item.vehicleClass === "minivan"
                          ? "🚐 Minivan"
                          : item.vehicleClass}
                      </span>
                      {item.paymentStatus === "paid" ? (
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-0.5">
                          {language === "AZ" ? "✓ Onlayn Ödənilib" : "✓ Paid Online"}
                        </span>
                      ) : item.paymentStatus === "cash_collected" ? (
                        <span className="inline-block text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded mt-0.5">
                          {language === "AZ" ? "💵 Nağd Təhvil Alınıb" : "💵 Cash Remitted"}
                        </span>
                      ) : (
                        <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-0.5">
                          {language === "AZ"
                            ? `⚠️ ${item.totalAmount}$ Tələb olunur`
                            : `⚠️ Collect $${item.totalAmount}`}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.driverName ? (
                        <div>
                          <span className="font-semibold text-slate-800 block text-xs">
                            {item.driverName}
                          </span>
                          {item.driverPhone && (
                            <span className="text-[11px] text-slate-500 block font-mono">
                              {item.driverPhone}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          {language === "AZ" ? "Təyin Edilməyib" : "Unassigned"}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.status === "pending" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                          <Clock className="h-3 w-3" /> {adminT.status.pending}
                        </span>
                      )}
                      {item.status === "confirmed" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" /> {adminT.status.confirmed}
                        </span>
                      )}
                      {item.status === "in_progress" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-1 text-[11px] font-bold text-sky-800">
                          <Car className="h-3 w-3" />{" "}
                          {language === "AZ" ? "Yolda" : "En Route"}
                        </span>
                      )}
                      {item.status === "completed" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-800">
                          <CheckCircle2 className="h-3 w-3" /> {adminT.status.completed}
                        </span>
                      )}
                      {item.status === "cancelled" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-800">
                          <AlertCircle className="h-3 w-3" /> {adminT.status.cancelled}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${item.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${item.passengerName}! Your AddmeTour airport transfer is confirmed for flight ${item.flightNumber} (${item.flightDate} at ${item.flightTime}). Chauffeur: ${item.driverName || 'Assigned Driver'} (${item.driverPhone || 'On standby'}). Meetup: Arrival Hall exit after baggage reclaim.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={
                            language === "AZ"
                              ? "Sərnişinə WhatsApp ilə Yaz"
                              : "Message Passenger on WhatsApp"
                          }
                          className="p-1.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => handleOpenTransferModal(item)}
                          className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                          style={{ backgroundColor: "#0f3460" }}
                        >
                          {item.driverName
                            ? language === "AZ"
                              ? "İdarə Et"
                              : "Manage"
                            : language === "AZ"
                            ? "Sürücü Təyin Et"
                            : "Assign Driver"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {transfersList.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-500">
              {adminT.transfersTab.noTransfers}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
