"use client";

import React from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  Car,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { TransferItem, AdminLanguage } from "./types";

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

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
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

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
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
