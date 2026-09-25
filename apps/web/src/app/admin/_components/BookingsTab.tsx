"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { BookingItem, TourReservationItem, AdminLanguage } from "./types";
import { CURRENT_BRAND } from "@/lib/brand";

interface BookingsTabProps {
  language: AdminLanguage;
  adminT: any;
  tourReservationsList: TourReservationItem[];
  bookingsList: BookingItem[];
  tourResStatusFilter: string;
  setTourResStatusFilter: (status: string) => void;
  bookingStatusFilter: string;
  setBookingStatusFilter: (status: string) => void;
  handleOpenTourResModal: (res: TourReservationItem) => void;
  handleUpdateBookingStatus: (id: string, status: string) => void;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({
  language,
  adminT,
  tourReservationsList,
  bookingsList,
  tourResStatusFilter,
  setTourResStatusFilter,
  bookingStatusFilter,
  setBookingStatusFilter,
  handleOpenTourResModal,
  handleUpdateBookingStatus,
}) => {
  return (
    <div className="space-y-6">
      {/* ── Direct Tour Reservations & Date Requests ── */}
      <div
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        style={{ borderColor: "#e0f2fe" }}
      >
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-slate-900 font-display">
                {language === "AZ"
                  ? `Birbaşa Tur Rezervasiyaları (${tourReservationsList.length})`
                  : `Direct Tour Date Reservations (${tourReservationsList.length})`}
              </h2>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
                {language === "AZ" ? "Əsas Səhifə Sorğuları" : "Homepage Inquiries"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "AZ"
                ? "Əsas səhifədən daxil olan birbaşa rezervasiya sorğuları — lisenziyalı bələdçi və sürücü təyin edin"
                : "Direct inquiries submitted from landing page — assign licensed guides and chauffeurs"}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setTourResStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  tourResStatusFilter === st
                    ? "bg-[#0f3460] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "all"
                  ? adminT.actions.filterAll
                  : adminT.status[st as keyof typeof adminT.status] || st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">
                  {language === "AZ" ? "Kod və Tarix" : "Ref & Date"}
                </th>
                <th className="px-5 py-3.5">{adminT.overviewTab.colTour}</th>
                <th className="px-5 py-3.5">
                  {language === "AZ" ? "Əsas Səyahətçi" : "Lead Traveler"}
                </th>
                <th className="px-5 py-3.5">
                  {language === "AZ" ? "Qiymət (~AZN)" : "Price (~AZN)"}
                </th>
                <th className="px-5 py-3.5">
                  {language === "AZ" ? "Təyin Edilmiş Bələdçi" : "Assigned Guide"}
                </th>
                <th className="px-5 py-3.5">{adminT.overviewTab.colStatus}</th>
                <th className="px-5 py-3.5 text-right">{adminT.overviewTab.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tourReservationsList
                .filter(
                  (r) =>
                    tourResStatusFilter === "all" || r.status === tourResStatusFilter
                )
                .map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-slate-900 block text-xs">
                        {r.reservationNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                        📅 {r.tourDate}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800 max-w-[200px] truncate">
                      {r.tourTitle}
                      <span className="text-[11px] text-slate-400 block font-normal">
                        {r.guests}{" "}
                        {r.guests === 1
                          ? adminT.overviewTab.travelerSingular
                          : adminT.overviewTab.travelerPlural}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{r.travelerName}</p>
                      <a
                        href={`https://wa.me/${r.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello ${r.travelerName}! This is ${CURRENT_BRAND.name} regarding your reservation for "${r.tourTitle}" on ${r.tourDate} (Ref: ${r.reservationNumber}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-mono font-semibold hover:underline"
                      >
                        <MessageCircle className="h-3 w-3" />
                        {r.phoneNumber}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-900 block">${r.price}</span>
                      <span className="text-[10px] text-slate-400 block">
                        ~{(Number(r.price) * 1.7).toFixed(0)} AZN
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {r.guideName ? (
                        <div>
                          <span className="font-semibold text-slate-800 block text-xs">
                            {r.guideName}
                          </span>
                          {r.guidePhone && (
                            <span className="text-[11px] text-slate-500 block font-mono">
                              {r.guidePhone}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          {language === "AZ"
                            ? "Bələdçi Təyin Edilməyib"
                            : "No Guide Assigned"}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          r.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "completed"
                            ? "bg-slate-100 text-slate-800"
                            : r.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {adminT.status[r.status as keyof typeof adminT.status] || r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleOpenTourResModal(r)}
                        className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                        style={{ backgroundColor: "#0f3460" }}
                      >
                        {language === "AZ" ? "Bələdçi Təyin Et" : "Assign Guide / Manage"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {tourReservationsList.length === 0 && (
            <div className="py-10 text-center text-xs text-slate-500">
              {language === "AZ"
                ? "Hələ birbaşa rezervasiya daxil olmayıb."
                : "No direct tour reservations received yet."}
            </div>
          )}
        </div>
      </div>

      {/* ── Registered Portal Account Bookings ── */}
      <div
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        style={{ borderColor: "#e0f2fe" }}
      >
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-base text-slate-900 font-display">
              {language === "AZ"
                ? `Qeydiyyatlı İstifadəçi Sifarişləri (${bookingsList.length})`
                : `Registered Account Bookings (${bookingsList.length})`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "AZ"
                ? "Qeydiyyatlı istifadəçilər tərəfindən yaradılan sifarişlər"
                : "Bookings created by registered users through checkout slots"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["all", "pending", "confirmed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setBookingStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  bookingStatusFilter === st
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "all"
                  ? adminT.actions.filterAll
                  : adminT.status[st as keyof typeof adminT.status] || st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">
                  {language === "AZ" ? "Sifariş ID" : "Booking ID"}
                </th>
                <th className="px-6 py-3.5">{adminT.bookingsTab.colCustomer}</th>
                <th className="px-6 py-3.5">{adminT.bookingsTab.colTour}</th>
                <th className="px-6 py-3.5">{adminT.bookingsTab.colTravelers}</th>
                <th className="px-6 py-3.5">{adminT.bookingsTab.colTotal}</th>
                <th className="px-6 py-3.5">{adminT.bookingsTab.colStatus}</th>
                <th className="px-6 py-3.5 text-right">
                  {language === "AZ" ? "Statusu Dəyiş" : "Change Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookingsList
                .filter(
                  (b) =>
                    bookingStatusFilter === "all" || b.status === bookingStatusFilter
                )
                .map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400 text-[11px]">
                      #{b.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">
                        {b.userName || adminT.overviewTab.guest}
                      </p>
                      <p className="text-[11px] text-slate-500">{b.userEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-[200px] truncate">
                      {b.tourTitle || adminT.overviewTab.customTour}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {b.travelerCount}{" "}
                      {b.travelerCount > 1
                        ? adminT.overviewTab.travelerPlural
                        : adminT.overviewTab.travelerSingular}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ${parseFloat(b.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {adminT.status[b.status as keyof typeof adminT.status] || b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#0f3460] cursor-pointer"
                      >
                        <option value="pending">{adminT.status.pending}</option>
                        <option value="confirmed">{adminT.status.confirmed}</option>
                        <option value="cancelled">{adminT.status.cancelled}</option>
                        <option value="refunded">{adminT.status.refunded}</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {bookingsList.length === 0 && (
            <div className="py-10 text-center text-xs text-slate-500">
              {adminT.bookingsTab.noBookings}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
