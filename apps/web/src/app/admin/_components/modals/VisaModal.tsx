"use client";

import React from "react";
import { X, Copy, Eye, MessageCircle } from "lucide-react";
import { VisaItem, LightboxImage, AdminLanguage } from "../types";
import { CURRENT_BRAND } from "@/lib/brand";

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVisa: VisaItem | null;
  language: AdminLanguage;
  adminT: any;
  editStatus: string;
  setEditStatus: (status: any) => void;
  editAsanId: string;
  setEditAsanId: (val: string) => void;
  editPdfUrl: string;
  setEditPdfUrl: (val: string) => void;
  editNotes: string;
  setEditNotes: (val: string) => void;
  visaUpdateLoading: boolean;
  handleUpdateVisa: (e: React.FormEvent) => void;
  getVisaSla: (visa: VisaItem) => React.ReactNode;
  checkPassportExpiry: (
    expiryDate: string,
    arrivalDate: string
  ) => { isWarning: boolean; days: number; message: string } | null;
  handleCopyAsanFormat: (visa: VisaItem) => void;
  setLightboxImage: (img: LightboxImage | null) => void;
}

export const VisaModal: React.FC<VisaModalProps> = ({
  isOpen,
  onClose,
  selectedVisa,
  language,
  adminT,
  editStatus,
  setEditStatus,
  editAsanId,
  setEditAsanId,
  editPdfUrl,
  setEditPdfUrl,
  editNotes,
  setEditNotes,
  visaUpdateLoading,
  handleUpdateVisa,
  getVisaSla,
  checkPassportExpiry,
  handleCopyAsanFormat,
  setLightboxImage,
}) => {
  if (!isOpen || !selectedVisa) return null;

  return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
          >
            <button
              onClick={() => onClose()}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-sm text-[#0f3460]">
                {selectedVisa.applicationNumber}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                  selectedVisa.visaType === "urgent"
                    ? "bg-red-100 text-red-800"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {selectedVisa.visaType === "urgent"
                  ? language === "AZ"
                    ? "⚡ Təcili (3 saat)"
                    : "⚡ Urgent (3h)"
                  : language === "AZ"
                  ? "Standart (3 gün)"
                  : "Standard (3d)"}
              </span>
            </div>

            {/* SLA and Expiry Warning Banners */}
            <div className="flex flex-wrap items-center gap-2 my-2">
              {selectedVisa.visaType === "urgent" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  {getVisaSla(selectedVisa)}
                </div>
              )}
              {(() => {
                const warning = checkPassportExpiry(
                  selectedVisa.passportExpiryDate,
                  selectedVisa.arrivalDate
                );
                if (warning) {
                  return (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800">
                      ⚠️ {warning.message}
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {language === "AZ"
                ? "e-Viza Müraciətini İcra Et"
                : "Process e-Visa Application"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {language === "AZ"
                ? "Müraciətçinin pasport məlumatlarını yoxlayın, evisa.gov.az portalına daxil etmək üçün kopyalayın və təsdiqlənmiş e-Viza PDF-ni əlavə edin."
                : "Review applicant passport data, copy information for submission to evisa.gov.az, and attach approved e-Visa PDF."}
            </p>

            {/* Side-by-Side Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column: Applicant Bio Data */}
              <div className="p-4 rounded-2xl bg-white border border-[#e2d8cc] text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">
                    {language === "AZ"
                      ? "Müraciətçinin Bioqrafik Məlumatları"
                      : "Applicant Bio Data"}
                  </span>
                  <button
                    onClick={() => handleCopyAsanFormat(selectedVisa)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#0f3460] hover:underline cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    {language === "AZ" ? "ASAN üçün kopyala" : "Copy for ASAN"}
                  </button>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Tam Adı" : "Full Name"}
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedVisa.surname} {selectedVisa.givenNames}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Vətəndaşlıq" : "Nationality"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedVisa.nationality}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Cins" : "Gender"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedVisa.gender}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Doğum Tarixi" : "Birth Date"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedVisa.birthDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Doğum Yeri" : "Birth Place"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedVisa.birthPlace}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Pasport Nömrəsi" : "Passport No"}
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedVisa.passportNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Bitmə Tarixi" : "Expiry Date"}
                    </span>
                    <span className="font-mono text-slate-800">
                      {selectedVisa.passportExpiryDate}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Əlaqə" : "Contact"}
                  </span>
                  <span className="text-slate-800 block">{selectedVisa.email}</span>
                  <span className="text-slate-800 block">{selectedVisa.phoneNumber}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ"
                      ? "Azərbaycanda Qalma Ünvanı"
                      : "Stay Address in Azerbaijan"}
                  </span>
                  <span className="text-slate-800 block">{selectedVisa.stayAddress}</span>
                </div>

                {selectedVisa.passportScanUrl && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Pasport Sənədi" : "Passport Document"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          url: selectedVisa.passportScanUrl!,
                          title: `Passport Scan: ${selectedVisa.surname} ${selectedVisa.givenNames} (${selectedVisa.passportNumber})`,
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {language === "AZ" ? "Tam Skan Baxışı ↗" : "Inspect Full Scan ↗"}
                    </button>
                  </div>
                )}

                {/* Direct WhatsApp Contact Button */}
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${selectedVisa.phoneNumber.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `Hello ${selectedVisa.givenNames}! This is ${CURRENT_BRAND.name} regarding your Azerbaijan eVisa application (${selectedVisa.applicationNumber}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {language === "AZ"
                      ? "Müraciətçiyə WhatsApp-da Yaz"
                      : "Message Applicant on WhatsApp"}
                  </a>
                </div>
              </div>

              {/* Right Column: Update Status Form */}
              <form onSubmit={handleUpdateVisa} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Müraciət Statusu" : "Application Status"}
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="received">
                      {language === "AZ"
                        ? "Qəbul edildi / Yeni Yoxlama"
                        : "Received / New Verification"}
                    </option>
                    <option value="submitted_to_govt">
                      {language === "AZ"
                        ? "evisa.gov.az portalına göndərildi (Baxışda)"
                        : "Submitted to evisa.gov.az (In Review)"}
                    </option>
                    <option value="approved">
                      {language === "AZ"
                        ? "Təsdiqləndi & Viza Verildi"
                        : "Approved & Visa Issued"}
                    </option>
                    <option value="rejected">
                      {language === "AZ"
                        ? "İmtina edildi / Düzəliş lazımdır"
                        : "Rejected / Action Needed"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "ASAN Dövlət Referans Kodu (könüllü)"
                      : "ASAN Government Reference ID (optional)"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ASAN-984128"
                    value={editAsanId}
                    onChange={(e) => setEditAsanId(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {language === "AZ"
                      ? "evisa.gov.az portalında yaradılan qeydiyyat nömrəsi"
                      : "Reference number generated on evisa.gov.az"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Təsdiqlənmiş e-Viza PDF Yükləmə URL"
                      : "Approved e-Visa PDF Download URL"}
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../approved-visa.pdf"
                    value={editPdfUrl}
                    onChange={(e) => setEditPdfUrl(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {language === "AZ"
                      ? "URL izləmə səhifəsində səyahətçiyə təqdim ediləcək"
                      : "URL will be provided to traveler on tracking page"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Mütəxəssis Qeydləri (Səyahətçiyə Görünür)"
                      : "Officer Notes (Visible to Traveler)"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Application submitted to ASAN Visa portal at 14:30."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={visaUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {visaUpdateLoading
                      ? language === "AZ"
                        ? "Yenilənir..."
                        : "Updating Application..."
                      : language === "AZ"
                      ? "Yadda Saxla və Statusu Yenilə"
                      : "Save & Update Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};
