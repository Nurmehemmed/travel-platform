"use client";

import React from "react";
import { X, MessageCircle } from "lucide-react";
import { TourReservationItem, AdminLanguage } from "../types";

interface TourReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTourRes: TourReservationItem | null;
  language: AdminLanguage;
  adminT: any;
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
}

export const TourReservationModal: React.FC<TourReservationModalProps> = ({
  isOpen,
  onClose,
  selectedTourRes,
  language,
  adminT,
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
}) => {
  if (!isOpen || !selectedTourRes) return null;

  return (
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
                onClick={() => onClose()}
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
  );
};
