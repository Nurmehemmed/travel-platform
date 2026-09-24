"use client";

import React from "react";
import { MapPin, AlertCircle, ArrowRight, Users, Briefcase, Check } from "lucide-react";
import { AirportCode, AIRPORTS, VEHICLE_CLASSES, VehicleClass, calculateTransferPrice, calculateRoundTripPrice } from "@/lib/transfer-zones";
import { LOCALIZED_AIRPORTS } from "@/lib/pages-i18n";
import { LanguageCode } from "@/lib/i18n";
import { CustomSelect } from "@/components/CustomSelect";

interface RouteAndVehicleStepProps {
  direction: "arrival" | "departure" | "round_trip";
  setDirection: (d: "arrival" | "departure" | "round_trip") => void;
  airport: AirportCode;
  handleAirportChange: (code: AirportCode) => void;
  selectedDestinationId: string;
  handleDestinationChange: (val: string) => void;
  destinationOptions: any[];
  dropoffAddress: string;
  setDropoffAddress: (val: string) => void;
  vehicleClass: VehicleClass;
  setVehicleClass: (vc: VehicleClass) => void;
  femaleDriver?: boolean;
  setFemaleDriver?: (val: boolean) => void;
  additionalGuide?: boolean;
  setAdditionalGuide?: (val: boolean) => void;
  activeVehicles?: any[];
  currentZone: any;
  dynamicPricingConfig: any;
  isCustomZone: boolean;
  invalidField: string | null;
  setInvalidField: (f: string | null) => void;
  setIsMapModalOpen: (open: boolean) => void;
  destinationCategoryI18n: any;
  tb: any;
  t: any;
  language: string;
  getVehicleLabel: (id: VehicleClass) => string;
  getVehicleDesc: (id: VehicleClass) => string;
  getVehicleCapacity: (id: VehicleClass) => string;
  getVehicleLuggage: (id: VehicleClass) => string;
  handleNextFromStep1: () => void;
}

export const RouteAndVehicleStep: React.FC<RouteAndVehicleStepProps> = ({
  direction,
  setDirection,
  airport,
  handleAirportChange,
  selectedDestinationId,
  handleDestinationChange,
  destinationOptions,
  dropoffAddress,
  setDropoffAddress,
  vehicleClass,
  setVehicleClass,
  femaleDriver = false,
  setFemaleDriver,
  additionalGuide = false,
  setAdditionalGuide,
  activeVehicles,
  currentZone,
  dynamicPricingConfig,
  isCustomZone,
  invalidField,
  setInvalidField,
  setIsMapModalOpen,
  destinationCategoryI18n,
  tb,
  t,
  language,
  getVehicleLabel,
  getVehicleDesc,
  getVehicleCapacity,
  getVehicleLuggage,
  handleNextFromStep1,
}) => {
  return (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{tb.step1Title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tb.step1Desc}
                </p>
              </div>

              {/* Direction selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {tb.transferDirection}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "arrival", label: t.transferPage.arrival.split(" ")[0], desc: t.transferPage.arrival, icon: "🛬" },
                    { id: "departure", label: t.transferPage.departure.split(" ")[0], desc: t.transferPage.departure, icon: "🛫" },
                    { id: "round_trip", label: t.transferPage.roundTripLabel, desc: t.transferPage.roundTrip, icon: "🔄" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDirection(d.id as any)}
                      className={`rounded-xl border p-3.5 text-left transition-all ${
                        direction === d.id
                          ? "border-sky-600 bg-sky-50/70 ring-2 ring-sky-200 text-sky-950"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="text-xl mb-1">{d.icon}</div>
                      <div className="font-bold text-sm">{d.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Airport & Zone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5 min-h-[24px]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 leading-none">
                      {t.transferPage.airport}
                    </label>
                  </div>
                  <CustomSelect
                    value={airport}
                    onChange={(val) => handleAirportChange(val as AirportCode)}
                    options={AIRPORTS.map((a) => ({
                      value: a.code,
                      label: LOCALIZED_AIRPORTS[language as LanguageCode]?.[a.code] || a.fullName,
                      badge: a.code,
                    }))}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 min-h-[24px]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 leading-none">
                      {t.transferPage.destinationZone}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsMapModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-lg border border-sky-200 transition-colors shadow-2xs cursor-pointer leading-none"
                    >
                      <span>🗺️</span>
                      <span>{destinationCategoryI18n.pickOnMap}</span>
                    </button>
                  </div>
                  <CustomSelect
                    value={selectedDestinationId}
                    onChange={(val) => handleDestinationChange(String(val))}
                    options={destinationOptions}
                    searchable={true}
                    searchPlaceholder={destinationCategoryI18n.searchPlaceholder}
                    allowCustomValue={true}
                    customValueLabelPrefix={destinationCategoryI18n.useCustomPrefix}
                    onOpenMapPicker={() => setIsMapModalOpen(true)}
                    mapPickerLabel={destinationCategoryI18n.pickOnMap}
                  />
                </div>
              </div>

              {/* Exact hotel / dropoff address */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {direction === "departure" ? tb.pickupAddressLabel : tb.dropoffAddressLabel} *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
                  >
                    <span>📍</span>
                    <span>{destinationCategoryI18n.pickOnMap}</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    id="dropoffAddress"
                    type="text"
                    required
                    placeholder={tb.addressPlaceholder}
                    value={dropoffAddress}
                    onChange={(e) => {
                      setDropoffAddress(e.target.value);
                      if (invalidField === "dropoffAddress") setInvalidField(null);
                    }}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      invalidField === "dropoffAddress"
                        ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                        : "border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white focus:ring-sky-100"
                    }`}
                  />
                </div>
                {invalidField === "dropoffAddress" ? (
                  <p className="text-[11px] font-semibold text-red-600 mt-1.5 flex items-center gap-1 animate-shake">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{tb.errAddressRequired}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    {tb.addressHelp}
                  </p>
                )}
              </div>

              {/* Vehicle Selection Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {t.transferPage.selectVehicle}
                </label>
                {(!activeVehicles || activeVehicles.length === 0) ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {language === "AZ"
                          ? "Bütün Nəqliyyat Vasitələri Hazırda Məşğuldur"
                          : "All Vehicles Are Currently Fully Booked"}
                      </h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                        {language === "AZ"
                          ? "Hal-hazırda onlayn rezervasiya üçün heç bir nəqliyyat vasitəsi əlçatan deyil. Təcili sifarişlər üçün 24/7 dispetçerimizlə WhatsApp vasitəsilə əlaqə saxlayın."
                          : "No vehicles are currently available for online booking. Please contact our 24/7 operations team directly on WhatsApp for urgent arrangements."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`grid gap-3 ${
                    activeVehicles.length === 4
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : activeVehicles.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : activeVehicles.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-1 sm:grid-cols-3"
                  }`}>
                    {activeVehicles.map((vc) => {
                      const price = currentZone
                        ? direction === "round_trip"
                          ? calculateRoundTripPrice(currentZone, vc.id, dynamicPricingConfig)
                          : calculateTransferPrice(currentZone, vc.id, dynamicPricingConfig)
                        : null;

                      const isSelected = vehicleClass === vc.id;

                      return (
                        <div
                          key={vc.id}
                          onClick={() => setVehicleClass(vc.id)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-sky-600 bg-sky-50/60 ring-2 ring-sky-200"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl">{vc.icon}</span>
                              <div className="text-right">
                                <span className="text-sm font-extrabold text-sky-700">
                                  {isCustomZone ? t.transferPage.quoteOnRequest : price ? `$${price.totalAmount}` : "—"}
                                </span>
                                <div className="text-[9px] uppercase font-bold text-slate-400">
                                  {direction === "round_trip" ? t.transferPage.roundTripLabel : t.transferPage.oneWay}
                                </div>
                              </div>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm">{getVehicleLabel(vc.id)}</h3>
                            <p className="text-[11px] text-slate-500 mt-0.5">{getVehicleDesc(vc.id)}</p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-600">
                            <span className="flex items-center gap-1 font-medium">
                              <Users className="h-3 w-3 text-sky-600" /> {getVehicleCapacity(vc.id)}
                            </span>
                            <span className="flex items-center gap-1 font-medium">
                              <Briefcase className="h-3 w-3 text-sky-600" /> {getVehicleLuggage(vc.id)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ── Driver & Service Preferences (Female Driver & Licensed Tour Guide) ── */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {tb.driverGuidePrefTitle}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Choice 1: Female Driver */}
                  <div
                    onClick={() => setFemaleDriver?.(!femaleDriver)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start gap-3.5 select-none ${
                      femaleDriver
                        ? "border-pink-500 bg-pink-50/70 ring-2 ring-pink-200 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 mt-0.5 items-center justify-center rounded-md border shrink-0 transition-colors ${
                        femaleDriver
                          ? "bg-pink-600 border-pink-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {femaleDriver && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {tb.femaleDriverLabel}
                        </span>
                        <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold bg-pink-100 text-pink-700 border border-pink-200">
                          {tb.femaleDriverTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {tb.femaleDriverDesc}
                      </p>
                    </div>
                  </div>

                  {/* Choice 2: Driver + Tour Guide Accompaniment */}
                  <div
                    onClick={() => setAdditionalGuide?.(!additionalGuide)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start gap-3.5 select-none ${
                      additionalGuide
                        ? "border-sky-600 bg-sky-50/70 ring-2 ring-sky-200 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 mt-0.5 items-center justify-center rounded-md border shrink-0 transition-colors ${
                        additionalGuide
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {additionalGuide && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {tb.additionalGuideLabel}
                        </span>
                        <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold bg-sky-100 text-sky-700 border border-sky-200">
                          {tb.subjectToAvailabilityBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {tb.additionalGuideDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subject to availability informational notice */}
                <div className="mt-3 rounded-xl bg-amber-50/90 border border-amber-200/80 p-3 text-[11px] text-amber-900 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold">{tb.subjectToAvailabilityBadge}:</span>{" "}
                    {tb.subjectToAvailabilityNote}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-end gap-3 border-t border-slate-100">
                {(!activeVehicles || activeVehicles.length === 0) ? (
                  <button
                    type="button"
                    disabled={true}
                    className="w-full sm:w-auto justify-center rounded-xl bg-slate-300 text-slate-500 px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-none cursor-not-allowed shrink-0"
                  >
                    <span>{language === "AZ" ? "Rezervasiya Dayandırılıb" : "Booking Unavailable"}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
                  >
                    <span>{tb.btnContinueFlight}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
  );
};
