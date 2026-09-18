"use client";

import React from "react";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Check,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2,
} from "lucide-react";
import { AirportCode, VehicleClass } from "@/lib/transfer-zones";
import { LOCALIZED_AIRPORTS, LOCALIZED_ZONES } from "@/lib/pages-i18n";
import { LanguageCode } from "@/lib/i18n";

interface TransferSummaryStepProps {
  direction: "arrival" | "departure" | "round_trip";
  airport: AirportCode;
  airportInfo: any;
  currentZone: any;
  selectedLocation: any;
  dropoffAddress: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  returnFlightNumber: string;
  returnDate: string;
  returnTime: string;
  passengerName: string;
  passengerCount: number;
  email: string;
  phoneNumber: string;
  luggageNotes: string;
  currentVehicle: any;
  vehicleClass: VehicleClass;
  pricing: any;
  isCustomZone: boolean;
  paymentMethod: "online" | "on_arrival";
  setPaymentMethod: (m: "online" | "on_arrival") => void;
  agreedTerms: boolean;
  setAgreedTerms: (val: boolean | ((prev: boolean) => boolean)) => void;
  isSubmitting: boolean;
  invalidField: string | null;
  setInvalidField: (f: string | null) => void;
  setIsPolicyModalOpen: (open: boolean) => void;
  handleSubmitBooking: (e: React.FormEvent) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  tb: any;
  t: any;
  language: string;
  getVehicleLabel: (id: VehicleClass) => string;
}

export const TransferSummaryStep: React.FC<TransferSummaryStepProps> = ({
  direction,
  airport,
  airportInfo,
  currentZone,
  selectedLocation,
  dropoffAddress,
  flightNumber,
  flightDate,
  flightTime,
  returnFlightNumber,
  returnDate,
  returnTime,
  passengerName,
  passengerCount,
  email,
  phoneNumber,
  luggageNotes,
  currentVehicle,
  vehicleClass,
  pricing,
  isCustomZone,
  paymentMethod,
  setPaymentMethod,
  agreedTerms,
  setAgreedTerms,
  isSubmitting,
  invalidField,
  setInvalidField,
  setIsPolicyModalOpen,
  handleSubmitBooking,
  setStep,
  tb,
  t,
  language,
  getVehicleLabel,
}) => {
  const totalAmount = isCustomZone ? 0 : pricing?.totalAmount || 0;
  return (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{tb.step4Title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tb.step4Desc}
                </p>
              </div>

              {/* Summary Card */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentVehicle?.icon}</span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{getVehicleLabel(vehicleClass)}</div>
                      <div className="text-[11px] text-slate-500">
                        {LOCALIZED_AIRPORTS[language as LanguageCode]?.[airport] || airportInfo?.fullName || airport}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1">
                      {direction === "arrival" ? `🛬 ${t.transferPage.arrival}` : direction === "departure" ? `🛫 ${t.transferPage.departure}` : `🔄 ${t.transferPage.roundTripLabel}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">{tb.destZoneLabel}</span>
                    <p className="font-semibold text-slate-800">{LOCALIZED_ZONES[language as LanguageCode]?.[currentZone?.id || ""] || currentZone?.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.addressLabel}</span>
                    <p className="font-semibold text-slate-800">{dropoffAddress}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.flightLabel}</span>
                    <p className="font-semibold text-slate-800">
                      {flightNumber} · {flightDate} {flightTime}
                    </p>
                  </div>
                  {direction === "round_trip" && (
                    <div>
                      <span className="text-slate-400 font-medium">{tb.returnFlightLabel}</span>
                      <p className="font-semibold text-slate-800">
                        {returnFlightNumber} · {returnDate} {returnTime}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 font-medium">{tb.leadPaxLabel}</span>
                    <p className="font-semibold text-slate-800">{passengerName} ({passengerCount} {passengerCount === 1 ? tb.paxUnitSingle : tb.paxUnitPlural})</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.contactLabel}</span>
                    <p className="font-semibold text-slate-800">{phoneNumber} · {email}</p>
                  </div>
                </div>

                {luggageNotes && (
                  <div className="pt-2 border-t border-sky-100 text-xs">
                    <span className="text-slate-400 font-medium">{tb.notesLabelReview}</span>
                    <p className="text-slate-700 italic mt-0.5">{luggageNotes}</p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.rateLabel} ({getVehicleLabel(vehicleClass)} — {LOCALIZED_ZONES[language as LanguageCode]?.[currentZone?.id || ""] || currentZone?.name})</span>
                  <span>{isCustomZone ? tb.toBeQuoted : `$${totalAmount.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.meetGreetFree}</span>
                  <span className="text-emerald-600 font-semibold">{tb.includedFree}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.tollsFuelFree}</span>
                  <span className="text-emerald-600 font-semibold">{tb.includedFree}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{tb.totalDue}</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-sky-700">
                      {isCustomZone ? t.transferPage.customQuoteText : `$${totalAmount.toFixed(2)}`}
                    </span>
                    {!isCustomZone && (
                      <span className="block text-xs font-semibold text-slate-600">
                        (~{(totalAmount * 1.7).toFixed(2)} AZN)
                      </span>
                    )}
                    <div className="text-[10px] text-slate-400">{tb.allTaxesInc}</div>
                  </div>
                </div>
                {!isCustomZone && (
                  <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-100 pt-1.5 leading-relaxed">
                    {tb.payriffDesc}
                  </p>
                )}
              </div>

              {/* Payment Method Selector */}
              {!isCustomZone && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {tb.payMethodLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod("online")}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        paymentMethod === "online"
                          ? "border-sky-600 bg-sky-50/60 ring-2 ring-sky-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CreditCard className="h-5 w-5 text-sky-600" />
                        <span className="font-bold text-sm text-slate-900">{tb.payOnlineTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {tb.payOnlineDesc}
                      </p>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("on_arrival")}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        paymentMethod === "on_arrival"
                          ? "border-sky-600 bg-sky-50/60 ring-2 ring-sky-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Banknote className="h-5 w-5 text-emerald-600" />
                        <span className="font-bold text-sm text-slate-900">{tb.payCashTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {tb.payCashDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms checkbox */}
              <div
                id="agreedTerms"
                className={`flex items-start gap-2.5 p-3.5 rounded-xl border transition-all ${
                  invalidField === "agreedTerms"
                    ? "border-red-400 bg-red-50/60 ring-2 ring-red-200 animate-shake"
                    : "border-slate-100 bg-slate-50/70"
                }`}
              >
                <input
                  type="checkbox"
                  id="transferTerms"
                  checked={agreedTerms}
                  onChange={(e) => {
                    setAgreedTerms(e.target.checked);
                    if (invalidField === "agreedTerms") setInvalidField(null);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <label htmlFor="transferTerms" className="cursor-pointer">
                    {language === "AZ" ? (
                      <>
                        24 saatlıq pulsuz ləğvetmə və uçuş izləmə şərtləri daxil olmaqla{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          transfer qaydaları
                        </button>{" "}
                        ilə razıyam.
                      </>
                    ) : language === "RU" ? (
                      <>
                        Я согласен с{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          правилами бронирования трансфера
                        </button>
                        , включая бесплатную отмену за 24 часа и{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          условия отслеживания рейса
                        </button>
                        .
                      </>
                    ) : language === "AR" ? (
                      <>
                        أوافق على{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          سياسة حجز التوصيل
                        </button>
                        ، بما في ذلك الإلغاء المجاني قبل 24 ساعة وشروط تتبع الرحلة.
                      </>
                    ) : language === "DE" ? (
                      <>
                        Ich akzeptiere die{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          Transfer-Buchungsrichtlinien
                        </button>
                        , einschließlich der 24-stündigen kostenlosen Stornierung und{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          Flugüberwachungsbedingungen
                        </button>
                        .
                      </>
                    ) : language === "FR" ? (
                      <>
                        J&apos;accepte les{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          conditions de réservation
                        </button>
                        , incluant l&apos;annulation gratuite jusqu&apos;à 24h et les{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          conditions de suivi de vol
                        </button>
                        .
                      </>
                    ) : (
                      <>
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          transfer booking policy
                        </button>
                        , including 24-hour free cancellation and{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPolicyModalOpen(true);
                          }}
                          className="font-bold text-sky-600 underline hover:text-sky-800 transition-colors inline-block cursor-pointer"
                        >
                          flight monitoring terms
                        </button>
                        .
                      </>
                    )}
                  </label>
                  <div className="mt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPolicyModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                    >
                      <span>🛡️ {language === "AZ" ? "Şərtləri oxu" : language === "RU" ? "Читать правила" : language === "AR" ? "قراءة الشروط" : language === "DE" ? "Bedingungen lesen" : language === "FR" ? "Lire les conditions" : "Read Policy & Guarantees"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 4 Buttons & Bottom Inline Feedback */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setInvalidField(null);
                    setStep(3);
                  }}
                  className="w-full sm:w-auto justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{tb.btnBack}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{tb.btnSubmitting}</span>
                    </>
                  ) : paymentMethod === "online" && !isCustomZone ? (
                    <>
                      <span>{tb.btnPayCard} (${totalAmount})</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : isCustomZone ? (
                    <>
                      <span>{tb.btnRequestQuote}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>{tb.btnConfirmCash} (${totalAmount})</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
  );
};
