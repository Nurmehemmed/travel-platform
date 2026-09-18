"use client";

import React from "react";
import { MapPin, AlertCircle, ArrowRight, Users, Briefcase } from "lucide-react";
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VEHICLE_CLASSES.map((vc) => {
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
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0"
                >
                  <span>{tb.btnContinueFlight}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
  );
};
