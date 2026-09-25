"use client";

import React from "react";
import { X, MapPin, MessageCircle } from "lucide-react";
import { TransferItem, AdminLanguage } from "../types";
import { CURRENT_BRAND } from "@/lib/brand";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTransfer: TransferItem | null;
  language: AdminLanguage;
  adminT: any;
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
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  selectedTransfer,
  language,
  adminT,
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
}) => {
  if (!isOpen || !selectedTransfer) return null;

  return (
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
                onClick={() => onClose()}
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

                {/* Driver & Guide Preferences */}
                {(selectedTransfer.femaleDriver || selectedTransfer.additionalGuide) && (
                  <div className="border-t border-slate-200/60 pt-2 space-y-1.5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      {language === "AZ"
                        ? "Xüsusi Sürücü / Bələdçi Tələbləri"
                        : "Driver & Guide Preferences"}
                    </span>
                    {selectedTransfer.femaleDriver && (
                      <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-2.5 text-pink-900 shadow-2xs">
                        <div className="flex items-start gap-2">
                          <span className="text-base leading-none">👩‍🦰</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-pink-950">
                                {language === "AZ"
                                  ? "Xanım Sürücü Seçimi"
                                  : "Female Chauffeur Preference"}
                              </span>
                              <span className="rounded-full bg-pink-200/90 px-1.5 py-0.2 text-[9px] font-extrabold text-pink-800 uppercase tracking-wider">
                                {language === "AZ"
                                  ? "Prioritetli Sorğu"
                                  : "Priority Request"}
                              </span>
                            </div>
                            <p className="text-[10px] text-pink-700 mt-0.5 leading-snug">
                              {language === "AZ"
                                ? "Müştəri qadın sürücü təyin olunmasını xahiş edib. Xanım sürücü təyin edin."
                                : "Passenger requested a female chauffeur for privacy/comfort. Please assign a certified female driver."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedTransfer.additionalGuide && (
                      <div className="rounded-xl border border-sky-200 bg-sky-50 p-2.5 text-sky-900 shadow-2xs">
                        <div className="flex items-start gap-2">
                          <span className="text-base leading-none">🧭</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-sky-950">
                                {language === "AZ"
                                  ? "Lisenziyalı Bələdçi Müşayiəti"
                                  : "Driver + Licensed Tour Guide"}
                              </span>
                              <span className="rounded-full bg-sky-200 px-1.5 py-0.2 text-[9px] font-extrabold text-sky-800 uppercase tracking-wider">
                                {language === "AZ" ? "Əlavə Xidmət" : "Service Add-on"}
                              </span>
                            </div>
                            <p className="text-[10px] text-sky-700 mt-0.5 leading-snug">
                              {language === "AZ"
                                ? "Sərnişin transfer boyu bələdçi istəyib."
                                : "Passenger requested an accompanying licensed guide during the transfer."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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
                      `🚖 *${CURRENT_BRAND.name.toUpperCase()} — CHAUFFEUR DISPATCH*\n• Ref: ${
                        selectedTransfer.bookingNumber
                      }\n• Flight: ${selectedTransfer.flightNumber} (${
                        selectedTransfer.airport
                      } at ${selectedTransfer.flightTime})\n• Route: ${
                        selectedTransfer.pickupZone
                      } ➔ ${selectedTransfer.dropoffAddress}\n• Passenger: ${
                        selectedTransfer.passengerName
                      } (${selectedTransfer.passengerCount} pax)\n• Phone: ${
                        selectedTransfer.phoneNumber
                      }\n• Vehicle: ${selectedTransfer.vehicleClass}${
                        selectedTransfer.femaleDriver
                          ? "\n• ⚠️ *DRIVER PREFERENCE:* 👩‍🦰 Female Chauffeur Requested (Priority Request)"
                          : ""
                      }${
                        selectedTransfer.additionalGuide
                          ? "\n• ⚠️ *SERVICE ADD-ON:* 🧭 Licensed Tour Guide Requested"
                          : ""
                      }\n• Payment: ${
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
                      }! Your ${CURRENT_BRAND.name} airport transfer is confirmed for flight ${
                        selectedTransfer.flightNumber
                      }:\n• Chauffeur: ${
                        editDriverName ||
                        selectedTransfer.driverName ||
                        "Assigned Driver"
                      } (${
                        editDriverPhone ||
                        selectedTransfer.driverPhone ||
                        "On standby"
                      })${
                        selectedTransfer.femaleDriver
                          ? "\n• Preference: 👩‍🦰 Female Chauffeur requested (prioritized on schedule)"
                          : ""
                      }\n• Airport: ${
                        selectedTransfer.airport
                      }\n• Meeting Point: Arrival Hall exit after baggage reclaim (Chauffeur will hold ${CURRENT_BRAND.name} sign with your name).\n• Free Waiting: 60 minutes after actual landing.\nWishing you a safe flight to Baku!`
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
  );
};
