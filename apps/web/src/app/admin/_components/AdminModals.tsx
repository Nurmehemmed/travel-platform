"use client";

import React from "react";
import {
  X,
  Copy,
  Eye,
  MessageCircle,
  MapPin,
  Sparkles,
  RefreshCw,
  Check,
  Download,
} from "lucide-react";
import {
  VisaItem,
  TransferItem,
  TourReservationItem,
  DestinationItem,
  LightboxImage,
  AdminLanguage,
  DestinationPreset,
  AZERBAIJAN_DESTINATION_PRESETS,
} from "./types";

interface AdminModalsProps {
  language: AdminLanguage;
  adminT: any;
  // Create Tour
  isNewTourOpen: boolean;
  setIsNewTourOpen: (open: boolean) => void;
  destinationsList: DestinationItem[];
  newTourTitle: string;
  setNewTourTitle: (val: string) => void;
  newTourDestId: string;
  setNewTourDestId: (val: string) => void;
  newTourOverview: string;
  setNewTourOverview: (val: string) => void;
  newTourBasePrice: string;
  setNewTourBasePrice: (val: string) => void;
  newTourPromoPrice: string;
  setNewTourPromoPrice: (val: string) => void;
  newTourDays: string;
  setNewTourDays: (val: string) => void;
  newTourImage: string;
  setNewTourImage: (val: string) => void;
  createLoading: boolean;
  handleCreateTour: (e: React.FormEvent) => void;

  // Visa Process
  isVisaModalOpen: boolean;
  setIsVisaModalOpen: (open: boolean) => void;
  selectedVisa: VisaItem | null;
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

  // Transfer Dispatch
  isTransferModalOpen: boolean;
  setIsTransferModalOpen: (open: boolean) => void;
  selectedTransfer: TransferItem | null;
  editTransferStatus: string;
  setEditTransferStatus: (status: any) => void;
  editTransferPaymentStatus: string;
  setEditTransferPaymentStatus: (status: string) => void;
  editDriverName: string;
  setEditDriverName: (val: string) => void;
  editDriverPhone: string;
  setEditDriverPhone: (val: string) => void;
  editTransferNotes: string;
  setEditTransferNotes: (val: string) => void;
  transferUpdateLoading: boolean;
  handleUpdateTransfer: (e: React.FormEvent) => void;

  // Tour Reservation
  isTourResModalOpen: boolean;
  setIsTourResModalOpen: (open: boolean) => void;
  selectedTourRes: TourReservationItem | null;
  editTourResStatus: string;
  setEditTourResStatus: (status: any) => void;
  editGuideName: string;
  setEditGuideName: (val: string) => void;
  editGuidePhone: string;
  setEditGuidePhone: (val: string) => void;
  editTourResNotes: string;
  setEditTourResNotes: (val: string) => void;
  tourResUpdateLoading: boolean;
  handleUpdateTourRes: (e: React.FormEvent) => void;

  // Destination Create / Edit
  isDestinationModalOpen: boolean;
  setIsDestinationModalOpen: (open: boolean) => void;
  destinationModalMode: "create" | "edit";
  destFormName: string;
  setDestFormName: (val: string) => void;
  destFormCountry: string;
  setDestFormCountry: (val: string) => void;
  destFormSlug: string;
  setDestFormSlug: (val: string) => void;
  destFormHeroImage: string;
  setDestFormHeroImage: (val: string) => void;
  destSaving: boolean;
  handleSaveDestination: (e: React.FormEvent) => void;
  handleSelectPresetDestination: (preset: DestinationPreset) => void;

  // Lightbox
  lightboxImage: LightboxImage | null;
  setLightboxImage: (img: LightboxImage | null) => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  language,
  adminT,
  isNewTourOpen,
  setIsNewTourOpen,
  destinationsList,
  newTourTitle,
  setNewTourTitle,
  newTourDestId,
  setNewTourDestId,
  newTourOverview,
  setNewTourOverview,
  newTourBasePrice,
  setNewTourBasePrice,
  newTourPromoPrice,
  setNewTourPromoPrice,
  newTourDays,
  setNewTourDays,
  newTourImage,
  setNewTourImage,
  createLoading,
  handleCreateTour,
  isVisaModalOpen,
  setIsVisaModalOpen,
  selectedVisa,
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
  isTransferModalOpen,
  setIsTransferModalOpen,
  selectedTransfer,
  editTransferStatus,
  setEditTransferStatus,
  editTransferPaymentStatus,
  setEditTransferPaymentStatus,
  editDriverName,
  setEditDriverName,
  editDriverPhone,
  setEditDriverPhone,
  editTransferNotes,
  setEditTransferNotes,
  transferUpdateLoading,
  handleUpdateTransfer,
  isTourResModalOpen,
  setIsTourResModalOpen,
  selectedTourRes,
  editTourResStatus,
  setEditTourResStatus,
  editGuideName,
  setEditGuideName,
  editGuidePhone,
  setEditGuidePhone,
  editTourResNotes,
  setEditTourResNotes,
  tourResUpdateLoading,
  handleUpdateTourRes,
  isDestinationModalOpen,
  setIsDestinationModalOpen,
  destinationModalMode,
  destFormName,
  setDestFormName,
  destFormCountry,
  setDestFormCountry,
  destFormSlug,
  setDestFormSlug,
  destFormHeroImage,
  setDestFormHeroImage,
  destSaving,
  handleSaveDestination,
  handleSelectPresetDestination,
  lightboxImage,
  setLightboxImage,
}) => {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════ MODAL: CREATE TOUR */}
      {isNewTourOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsNewTourOpen(false);
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-[520px] rounded-3xl p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
          >
            <button
              onClick={() => setIsNewTourOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {language === "AZ" ? "Yeni Tur Paketi Əlavə Et" : "Add New Tour Package"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {language === "AZ"
                ? "Yeni səyahət təcrübəsini birbaşa canlı sayt kataloqunda dərc edin"
                : "Publish a new travel experience directly to the live website catalog"}
            </p>

            <form onSubmit={handleCreateTour} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ" ? "Turun Adı" : "Tour Title"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khinalug High Mountain Expedition"
                  value={newTourTitle}
                  onChange={(e) => setNewTourTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "İstiqamət" : "Destination"}
                  </label>
                  <select
                    value={newTourDestId}
                    onChange={(e) => setNewTourDestId(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  >
                    {destinationsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}, {d.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Müddət (Gün)" : "Duration (Days)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTourDays}
                    onChange={(e) => setNewTourDays(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Baza Qiyməti ($)" : "Base Price ($)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.00"
                    value={newTourBasePrice}
                    onChange={(e) => setNewTourBasePrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Endirimli Qiymət ($, könüllü)"
                      : "Promo Price ($, optional)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="79.00"
                    value={newTourPromoPrice}
                    onChange={(e) => setNewTourPromoPrice(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ"
                    ? "Örtük Şəkli URL (könüllü)"
                    : "Cover Image URL (optional)"}
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newTourImage}
                  onChange={(e) => setNewTourImage(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === "AZ" ? "Ümumi Təsvir" : "Overview Description"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    language === "AZ"
                      ? "Əsas məqamları və marşrutu təsvir edin..."
                      : "Describe the highlights and itinerary..."
                  }
                  value={newTourOverview}
                  onChange={(e) => setNewTourOverview(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-3.5 py-2 text-slate-800 outline-none focus:border-[#0f3460]"
                />
              </div>

              <button
                type="submit"
                disabled={createLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity mt-2 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
              >
                {createLoading
                  ? language === "AZ"
                    ? "Tur Yaradılır..."
                    : "Creating Tour..."
                  : language === "AZ"
                  ? "Tur Təcrübəsini Dərc Et"
                  : "Publish Tour Experience"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ MODAL: PROCESS VISA */}
      {isVisaModalOpen && selectedVisa && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVisaModalOpen(false);
          }}
          role="dialog"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-up"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe" }}
          >
            <button
              onClick={() => setIsVisaModalOpen(false)}
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
                      `Hello ${selectedVisa.givenNames}! This is AddmeTour regarding your Azerbaijan eVisa application (${selectedVisa.applicationNumber}).`
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
      )}

      {/* ═══════════════════════════════════════════════════════ TRANSFER DISPATCH MODAL */}
      {isTransferModalOpen && selectedTransfer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-sky-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {language === "AZ"
                    ? "Transfer Təyinatı və Sürücü İdarəetməsi"
                    : "Transfer Dispatch & Chauffeur Management"}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-mono">
                  {selectedTransfer.bookingNumber}
                </h3>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Booking Details */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">
                  {language === "AZ" ? "Səfər Məlumatları" : "Trip Information"}
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Marşrut" : "Route"}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedTransfer.airport} &middot;{" "}
                    {selectedTransfer.direction === "arrival"
                      ? language === "AZ"
                        ? "🛬 Qarşılama (Aeroport → Hotel)"
                        : "🛬 Arrival (Airport → Hotel)"
                      : selectedTransfer.direction === "departure"
                      ? language === "AZ"
                        ? "🛫 Yola salma (Hotel → Aeroport)"
                        : "🛫 Departure (Hotel → Airport)"
                      : language === "AZ"
                      ? "🔄 İkitərəfli"
                      : "🔄 Round Trip"}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Zona və Dəqiq Ünvan" : "Zone & Specific Address"}
                  </span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedTransfer.pickupZone}
                  </span>
                  <span className="text-slate-600 block text-[11px]">
                    {selectedTransfer.dropoffAddress}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Uçuş Məlumatları" : "Flight Details"}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono font-semibold text-slate-800">
                      ✈️ {selectedTransfer.flightNumber} &middot;{" "}
                      {selectedTransfer.flightDate} at {selectedTransfer.flightTime}
                    </span>
                    <a
                      href={`https://www.flightradar24.com/data/flights/${selectedTransfer.flightNumber.replace(
                        /\s+/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-[10px] font-bold text-sky-600 hover:underline"
                    >
                      {language === "AZ" ? "İzlə ↗" : "Track ↗"}
                    </a>
                  </div>
                  {selectedTransfer.returnFlightNumber && (
                    <span className="font-mono text-slate-600 block text-[11px] mt-0.5">
                      {language === "AZ" ? "↩️ Qayıdış:" : "↩️ Return:"}{" "}
                      {selectedTransfer.returnFlightNumber} on{" "}
                      {selectedTransfer.returnDate} at {selectedTransfer.returnTime}
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-200/60 pt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Sərnişin" : "Passenger"}
                  </span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedTransfer.passengerName} ({selectedTransfer.passengerCount}{" "}
                    {language === "AZ" ? "nəfər" : "pax"})
                  </span>
                  <span className="text-slate-600 block">
                    {selectedTransfer.phoneNumber}
                  </span>
                  <span className="text-slate-600 block">{selectedTransfer.email}</span>
                </div>

                {selectedTransfer.luggageNotes && (
                  <div className="border-t border-slate-200/60 pt-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ"
                        ? "Baqaj və Xüsusi Qeydlər"
                        : "Luggage & Special Notes"}
                    </span>
                    <span className="text-slate-700 italic block">
                      {selectedTransfer.luggageNotes}
                    </span>
                  </div>
                )}

                <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Nəqliyyat Növü" : "Vehicle Class"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedTransfer.vehicleClass === "sedan"
                        ? "🚗 Sedan"
                        : selectedTransfer.vehicleClass === "suv"
                        ? "🚙 SUV"
                        : selectedTransfer.vehicleClass === "minivan"
                        ? "🚐 Minivan"
                        : selectedTransfer.vehicleClass}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Ümumi Məbləğ" : "Total Rate"}
                    </span>
                    <span className="text-base font-extrabold text-sky-700">
                      ${selectedTransfer.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Quick WhatsApp Triggers */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <a
                    href={`https://wa.me/${
                      editDriverPhone.replace(/\D/g, "") || ""
                    }?text=${encodeURIComponent(
                      `🚖 *ADDMETOUR — CHAUFFEUR DISPATCH*\n• Ref: ${
                        selectedTransfer.bookingNumber
                      }\n• Flight: ${selectedTransfer.flightNumber} (${
                        selectedTransfer.airport
                      } at ${selectedTransfer.flightTime})\n• Route: ${
                        selectedTransfer.pickupZone
                      } ➔ ${selectedTransfer.dropoffAddress}\n• Passenger: ${
                        selectedTransfer.passengerName
                      } (${selectedTransfer.passengerCount} pax)\n• Phone: ${
                        selectedTransfer.phoneNumber
                      }\n• Vehicle: ${selectedTransfer.vehicleClass}\n• Payment: ${
                        selectedTransfer.paymentStatus === "paid"
                          ? "✅ Paid Online"
                          : `💵 Collect $${
                              selectedTransfer.totalAmount
                            } (~${Math.round(
                              Number(selectedTransfer.totalAmount) * 1.7
                            )} AZN) cash on arrival`
                      }\n• Notes: ${selectedTransfer.luggageNotes || "None"}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {language === "AZ"
                      ? "Sürücüyə WhatsApp ilə Göndər"
                      : "Dispatch Chauffeur via WhatsApp"}
                  </a>

                  <a
                    href={`https://wa.me/${selectedTransfer.phoneNumber.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `👋 Hello ${
                        selectedTransfer.passengerName
                      }! Your AddmeTour airport transfer is confirmed for flight ${
                        selectedTransfer.flightNumber
                      }:\n• Chauffeur: ${
                        editDriverName ||
                        selectedTransfer.driverName ||
                        "Assigned Driver"
                      } (${
                        editDriverPhone ||
                        selectedTransfer.driverPhone ||
                        "On standby"
                      })\n• Airport: ${
                        selectedTransfer.airport
                      }\n• Meeting Point: Arrival Hall exit after baggage reclaim (Chauffeur will hold AddmeTour sign with your name).\n• Free Waiting: 60 minutes after actual landing.\nWishing you a safe flight to Baku!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-sky-600 text-white font-bold text-[11px] hover:bg-sky-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {language === "AZ"
                      ? "Sərnişinə WhatsApp ilə Xəbər Ver"
                      : "Notify Passenger via WhatsApp"}
                  </a>
                </div>
              </div>

              {/* Right Column: Dispatch Form */}
              <form onSubmit={handleUpdateTransfer} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Transfer Statusu" : "Transfer Status"}
                  </label>
                  <select
                    value={editTransferStatus}
                    onChange={(e) => setEditTransferStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">
                      {language === "AZ"
                        ? "Gözləmədə (Sürücü təyin edilməyib)"
                        : "Pending (Awaiting Driver)"}
                    </option>
                    <option value="confirmed">
                      {language === "AZ"
                        ? "Təsdiqləndi (Sürücü təyin edildi)"
                        : "Confirmed (Driver Assigned)"}
                    </option>
                    <option value="in_progress">
                      {language === "AZ"
                        ? "İcrada (Sürücü yoldadır)"
                        : "In Progress (Driver En Route)"}
                    </option>
                    <option value="completed">
                      {language === "AZ" ? "Tamamlandı" : "Completed"}
                    </option>
                    <option value="cancelled">
                      {language === "AZ" ? "Ləğv edildi" : "Cancelled"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Ödəniş və Nağd Hesablaşma"
                      : "Payment & Cash Settlement"}
                  </label>
                  <select
                    value={editTransferPaymentStatus}
                    onChange={(e) => setEditTransferPaymentStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">
                      {language === "AZ" ? "Gözləmədə" : "Pending"}
                    </option>
                    <option value="paid">
                      {language === "AZ" ? "Onlayn Ödənilib" : "Paid Online"}
                    </option>
                    <option value="cash_collected">
                      {language === "AZ"
                        ? "💵 Nağd Pul Sürücü Tərəfindən Alındı"
                        : "💵 Cash Collected by Chauffeur & Remitted"}
                    </option>
                    <option value="on_arrival">
                      {language === "AZ"
                        ? "Çatanda Ödəniş (Nağd Gözlənilir)"
                        : "Pay on Arrival (Cash Pending)"}
                    </option>
                    <option value="refunded">
                      {language === "AZ" ? "Geri qaytarıldı" : "Refunded"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Təyin Olunmuş Sürücünün Adı"
                      : "Assigned Driver Name"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eldar Mammadov"
                    value={editDriverName}
                    onChange={(e) => setEditDriverName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-medium"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {language === "AZ"
                      ? "İzləmə səhifəsində sərnişinə görünür"
                      : "Visible to passenger on tracking page"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Sürücünün Telefonu / WhatsApp Nömrəsi"
                      : "Driver Phone / WhatsApp Number"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +994 50 123 4567"
                    value={editDriverPhone}
                    onChange={(e) => setEditDriverPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {language === "AZ"
                      ? "Sürücüyə WhatsApp bildirişi üçün istifadə olunur"
                      : "Used for chauffeur WhatsApp dispatch"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Dispetçer və Əməliyyat Qeydləri"
                      : "Dispatch & Ops Notes"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Flight monitored, Terminal 1 greeting sign ready."
                    value={editTransferNotes}
                    onChange={(e) => setEditTransferNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={transferUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {transferUpdateLoading
                      ? language === "AZ"
                        ? "Yenilənir..."
                        : "Updating Dispatch..."
                      : language === "AZ"
                      ? "Yadda Saxla və Yenilə"
                      : "Save & Update Dispatch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ TOUR RESERVATION MODAL */}
      {isTourResModalOpen && selectedTourRes && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-amber-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  {language === "AZ"
                    ? "Tur Bələdçisi və Tarix Təyinatı"
                    : "Tour Guide & Date Assignment"}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-mono mt-1">
                  {selectedTourRes.reservationNumber}
                </h3>
              </div>
              <button
                onClick={() => setIsTourResModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Reservation Summary */}
              <div className="space-y-3 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60 text-xs">
                <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1">
                  {language === "AZ"
                    ? "Tur Rezervasiya Təfərrüatları"
                    : "Tour Request Details"}
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Tur Təcrübəsi" : "Tour Experience"}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedTourRes.tourTitle}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Seçilmiş Tarix" : "Preferred Date"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      📅 {selectedTourRes.tourDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Qrup Ölçüsü" : "Party Size"}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedTourRes.guests} {language === "AZ" ? "Qonaq" : "Guests"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-amber-200/60 pt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-medium">
                    {language === "AZ" ? "Əsas Səyahətçi" : "Lead Traveler"}
                  </span>
                  <span className="font-semibold text-slate-900 block">
                    {selectedTourRes.travelerName}
                  </span>
                  <span className="text-slate-600 font-mono block">
                    {selectedTourRes.phoneNumber}
                  </span>
                </div>

                <div className="border-t border-amber-200/60 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Qrup Qiyməti" : "Group Rate"}
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      ${selectedTourRes.price} USD
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">
                      {language === "AZ" ? "Təxmini AZN" : "Approx. AZN"}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      ~{(Number(selectedTourRes.price) * 1.7).toFixed(0)} AZN
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60">
                  <a
                    href={`https://wa.me/${selectedTourRes.phoneNumber.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `Hello ${selectedTourRes.travelerName}! This is AddmeTour regarding your tour reservation for "${selectedTourRes.tourTitle}" on ${selectedTourRes.tourDate} (Ref: ${selectedTourRes.reservationNumber}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {language === "AZ"
                      ? "Səyahətçi ilə WhatsApp-da Əlaqə Saxla"
                      : "Chat with Traveler on WhatsApp"}
                  </a>
                </div>
              </div>

              {/* Right: Guide Assignment Form */}
              <form onSubmit={handleUpdateTourRes} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Rezervasiya Statusu" : "Reservation Status"}
                  </label>
                  <select
                    value={editTourResStatus}
                    onChange={(e) => setEditTourResStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-semibold cursor-pointer"
                  >
                    <option value="pending">
                      {language === "AZ" ? "Baxış Gözlənilir" : "Pending Review"}
                    </option>
                    <option value="confirmed">
                      {language === "AZ"
                        ? "Təsdiqləndi (Bələdçi Təyin Edildi)"
                        : "Confirmed (Guide Assigned)"}
                    </option>
                    <option value="completed">
                      {language === "AZ" ? "Tamamlandı" : "Completed"}
                    </option>
                    <option value="cancelled">
                      {language === "AZ" ? "Ləğv edildi" : "Cancelled"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Təyin Edilən Bələdçinin Adı"
                      : "Assigned Guide Name"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leyla Aliyeva (English Guide)"
                    value={editGuideName}
                    onChange={(e) => setEditGuideName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ" ? "Bələdçi Əlaqə / WhatsApp" : "Guide Contact / WhatsApp"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +994 55 987 6543"
                    value={editGuidePhone}
                    onChange={(e) => setEditGuidePhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === "AZ"
                      ? "Əməliyyat Qeydləri / Hoteldən Götürmə"
                      : "Operational Notes / Hotel Pickup"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Pickup from Four Seasons at 09:30 AM. Mercedes Sprinter arranged."
                    value={editTourResNotes}
                    onChange={(e) => setEditTourResNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={tourResUpdateLoading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    {tourResUpdateLoading
                      ? language === "AZ"
                        ? "Yadda saxlanılır..."
                        : "Saving..."
                      : language === "AZ"
                      ? "Rezervasiya və Bələdçini Saxla"
                      : "Save Reservation & Guide"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ DESTINATION CREATE / EDIT MODAL */}
      {isDestinationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-sky-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                    {destinationModalMode === "create"
                      ? language === "AZ"
                        ? "Yeni Region"
                        : "New Region"
                      : language === "AZ"
                      ? "Regionu Yenilə"
                      : "Update Region"}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
                    {destinationModalMode === "create"
                      ? language === "AZ"
                        ? "Yeni İstiqamət Əlavə Et"
                        : "Add New Destination"
                      : language === "AZ"
                      ? `İstiqamətə Düzəliş Et: ${destFormName}`
                      : `Edit Destination: ${destFormName}`}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDestinationModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Presets Picker */}
            <div className="space-y-2 bg-sky-50/50 p-3.5 rounded-2xl border border-sky-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  {language === "AZ"
                    ? "Azərbaycan Şablonları (1 Kliklə Doldur)"
                    : "Quick Azerbaijan Presets (1-Click Fill)"}
                </span>
                <span className="text-[10px] text-sky-600 font-medium">
                  {language === "AZ" ? "Avtomatik doldurmaq üçün klikləyin" : "Click to auto-fill"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {AZERBAIJAN_DESTINATION_PRESETS.map((p) => {
                  const isSelected = destFormName.toLowerCase() === p.name.toLowerCase();
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => handleSelectPresetDestination(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                          : "bg-white text-slate-700 border-sky-200 hover:border-sky-400 hover:bg-sky-100/50"
                      }`}
                    >
                      <span>🇦🇿</span>
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveDestination} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Destination Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "İstiqamət / Şəhər Adı *" : "Destination / City Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={destFormName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDestFormName(val);
                      if (
                        destinationModalMode === "create" &&
                        (!destFormSlug ||
                          destFormSlug ===
                            destFormName.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
                      ) {
                        setDestFormSlug(
                          val
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. Gobustan, Gabala, Sheki"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "Ölkə" : "Country"}
                  </label>
                  <input
                    type="text"
                    value={destFormCountry}
                    onChange={(e) => setDestFormCountry(e.target.value)}
                    placeholder="e.g. Azerbaijan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "URL Slug (Qısa yol)" : "URL Slug"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      /
                    </span>
                    <input
                      type="text"
                      value={destFormSlug}
                      onChange={(e) =>
                        setDestFormSlug(
                          e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "")
                        )
                      }
                      placeholder="e.g. gobustan"
                      className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {language === "AZ"
                      ? "Marşrut və tur filtr etiketləri üçün istifadə olunur."
                      : "Used for routing and tour filtering tags."}
                  </span>
                </div>

                {/* Hero Image URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "Əsas Qapaq Şəkli URL" : "Featured Hero Image URL"}
                  </label>
                  <input
                    type="url"
                    value={destFormHeroImage}
                    onChange={(e) => setDestFormHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {language === "AZ"
                      ? "Yüksək keyfiyyətli üfüqi foto (16:9 və ya 4:3)."
                      : "High quality landscape orientation photo (16:9 or 4:3)."}
                  </span>
                </div>
              </div>

              {/* Live Preview Card */}
              {destFormHeroImage && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    {language === "AZ" ? "Şəkil Ön Baxışı" : "Live Image Preview"}
                  </span>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <img
                      src={destFormHeroImage}
                      alt="Destination Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white">
                        /{destFormSlug || "slug"}
                      </span>
                      <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                        🇦🇿 {destFormCountry || (language === "AZ" ? "Azərbaycan" : "Azerbaijan")}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 text-white">
                      <p className="font-bold text-lg font-display drop-shadow-md">
                        {destFormName ||
                          (language === "AZ" ? "İstiqamət Ön Baxışı" : "Destination Preview")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDestinationModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {adminT.actions.cancel}
                </button>
                <button
                  type="submit"
                  disabled={destSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {destSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-amber-400" />
                      <span>
                        {language === "AZ"
                          ? "İstiqamət Saxlanılır..."
                          : "Saving Destination..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-amber-400" />
                      <span>
                        {destinationModalMode === "create"
                          ? language === "AZ"
                            ? "İstiqamət Yarat"
                            : "Create Destination"
                          : language === "AZ"
                          ? "Dəyişiklikləri Saxla"
                          : "Save Changes"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ LIGHTBOX PREVIEW MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
              <span className="font-semibold text-xs tracking-wide truncate max-w-md">
                {lightboxImage.title}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />{" "}
                  {language === "AZ" ? "Tam Ölçüdə ↗" : "Full Resolution ↗"}
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative w-full h-[70vh] bg-black/50 flex items-center justify-center p-4">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
