"use client";

import React from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageCircle,
  Copy,
} from "lucide-react";
import { VisaItem, LightboxImage, AdminLanguage } from "./types";
import { CURRENT_BRAND } from "@/lib/brand";

interface VisasTabProps {
  language: AdminLanguage;
  adminT: any;
  visasList: VisaItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  visaStatusFilter: string;
  setVisaStatusFilter: (st: string) => void;
  getVisaSla: (visa: VisaItem) => React.ReactNode;
  checkPassportExpiry: (
    expiryDate: string,
    arrivalDate: string
  ) => { isWarning: boolean; days: number; message: string } | null;
  handleCopyAsanFormat: (visa: VisaItem) => void;
  handleOpenVisaModal: (visa: VisaItem) => void;
  setLightboxImage: (img: LightboxImage) => void;
}

export const VisasTab: React.FC<VisasTabProps> = ({
  language,
  adminT,
  visasList,
  searchQuery,
  setSearchQuery,
  visaStatusFilter,
  setVisaStatusFilter,
  getVisaSla,
  checkPassportExpiry,
  handleCopyAsanFormat,
  handleOpenVisaModal,
  setLightboxImage,
}) => {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">
            {language === "AZ" ? "Ümumi Viza Müraciətləri" : "Total Visa Orders"}
          </span>
          <p className="text-2xl font-bold font-display text-slate-900 mt-1">
            {visasList.length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-amber-600 uppercase">
            {language === "AZ" ? "Yeni / Baxış Tələb Edən" : "New / Need Review"}
          </span>
          <p className="text-2xl font-bold font-display text-amber-600 mt-1">
            {visasList.filter((v) => v.status === "received").length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-red-600 uppercase">
            {language === "AZ" ? "⚡ Təcili 3 Saatlıq Vizalar" : "⚡ Urgent 3-Hour Visas"}
          </span>
          <p className="text-2xl font-bold font-display text-red-600 mt-1">
            {visasList.filter((v) => v.visaType === "urgent").length}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase">
            {language === "AZ" ? "Təsdiqlənmiş və Çatdırılmış" : "Approved & Delivered"}
          </span>
          <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
            {visasList.filter((v) => v.status === "approved").length}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-80 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder={adminT.visasTab.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["all", "received", "submitted_to_govt", "approved", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setVisaStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                visaStatusFilter === st
                  ? "bg-[#0f3460] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "all"
                ? adminT.actions.filterAll
                : st === "submitted_to_govt"
                ? language === "AZ"
                  ? "Dövlət İcrasında"
                  : "In Gov Review"
                : adminT.status[st as keyof typeof adminT.status] || st}
            </button>
          ))}
        </div>
      </div>

      {/* Visas Table */}
      <div
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        style={{ borderColor: "#e0f2fe" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">{adminT.visasTab.colRefCode}</th>
                <th className="py-3.5 px-4">{adminT.visasTab.colApplicant}</th>
                <th className="py-3.5 px-4">{adminT.visasTab.colPassport}</th>
                <th className="py-3.5 px-4">
                  {language === "AZ" ? "Gəliş Tarixi" : "Arrival Date"}
                </th>
                <th className="py-3.5 px-4">{adminT.overviewTab.colTotal}</th>
                <th className="py-3.5 px-4">{adminT.visasTab.colStatus}</th>
                <th className="py-3.5 px-4 text-right">{adminT.visasTab.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visasList
                .filter((v) => {
                  const matchesFilter =
                    visaStatusFilter === "all" || v.status === visaStatusFilter;
                  const q = searchQuery.toLowerCase().trim();
                  const matchesSearch =
                    q === "" ||
                    v.applicationNumber.toLowerCase().includes(q) ||
                    v.surname.toLowerCase().includes(q) ||
                    v.givenNames.toLowerCase().includes(q) ||
                    v.passportNumber.toLowerCase().includes(q) ||
                    v.nationality.toLowerCase().includes(q) ||
                    v.email.toLowerCase().includes(q);
                  return matchesFilter && matchesSearch;
                })
                .map((visa) => (
                  <tr key={visa.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block">
                        {visa.applicationNumber}
                      </span>
                      <div className="mt-1 flex flex-col gap-0.5">
                        {getVisaSla(visa)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">
                        {visa.surname} {visa.givenNames}
                      </span>
                      <span className="text-slate-500 block text-[11px]">
                        {visa.nationality} &middot; {visa.email}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-slate-800 block">
                        {visa.passportNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Exp: {visa.passportExpiryDate}
                      </span>
                      {(() => {
                        const expWarning = checkPassportExpiry(
                          visa.passportExpiryDate,
                          visa.arrivalDate
                        );
                        if (expWarning) {
                          return (
                            <span
                              title={expWarning.message}
                              className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded mt-0.5"
                            >
                              ⚠️ Exp &lt; 90d
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {visa.arrivalDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">
                        ${visa.totalAmount}
                      </span>
                      {visa.paymentStatus === "paid" ? (
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-0.5">
                          {language === "AZ" ? "✓ Ödənilib" : "✓ Paid"}
                        </span>
                      ) : (
                        <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-0.5">
                          {adminT.status.pending}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {visa.status === "received" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                          <Clock className="h-3 w-3" /> {adminT.sidebar.newBadge}
                        </span>
                      )}
                      {visa.status === "submitted_to_govt" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                          <Clock className="h-3 w-3" />{" "}
                          {language === "AZ" ? "Dövlət İcrasında" : "In Gov Review"}
                        </span>
                      )}
                      {visa.status === "approved" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" /> {adminT.status.confirmed}
                        </span>
                      )}
                      {visa.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-red-800">
                          <AlertCircle className="h-3 w-3" /> {adminT.status.rejected}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {visa.passportScanUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                url: visa.passportScanUrl!,
                                title: `Passport: ${visa.surname} ${visa.givenNames} (${visa.passportNumber})`,
                              })
                            }
                            title={
                              language === "AZ"
                                ? "Pasporta Bax"
                                : "Preview Passport Document"
                            }
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-sky-700 transition-colors cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <a
                          href={`https://wa.me/${visa.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${visa.givenNames}! This is ${CURRENT_BRAND.name} regarding your Azerbaijan eVisa order (${visa.applicationNumber}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={
                            language === "AZ"
                              ? "WhatsApp ilə Əlaqə"
                              : "Contact Applicant on WhatsApp"
                          }
                          className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => handleCopyAsanFormat(visa)}
                          title={
                            language === "AZ"
                              ? "evisa.gov.az üçün Kopyala"
                              : "Copy Formatted Data for evisa.gov.az"
                          }
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenVisaModal(visa)}
                          className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                          style={{ backgroundColor: "#0f3460" }}
                        >
                          {adminT.visasTab.markProcessing}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {visasList.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-500">
              {adminT.visasTab.noVisas}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
