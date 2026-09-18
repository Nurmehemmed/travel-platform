"use client";

import React from "react";
import { Users, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";
import { VehicleClass } from "@/lib/transfer-zones";

interface PassengerDetailsStepProps {
  passengerName: string;
  setPassengerName: (val: string) => void;
  passengerCount: number;
  setPassengerCount: (val: number) => void;
  email: string;
  setEmail: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  luggageNotes: string;
  setLuggageNotes: (val: string) => void;
  invalidField: string | null;
  setInvalidField: (f: string | null) => void;
  currentVehicle: any;
  tb: any;
  t: any;
  getVehicleLabel: (id: VehicleClass) => string;
  setStep: (s: 1 | 2 | 3 | 4) => void;
  handleNextFromStep3: () => void;
}

export const PassengerDetailsStep: React.FC<PassengerDetailsStepProps> = ({
  passengerName,
  setPassengerName,
  passengerCount,
  setPassengerCount,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  luggageNotes,
  setLuggageNotes,
  invalidField,
  setInvalidField,
  currentVehicle,
  tb,
  t,
  getVehicleLabel,
  setStep,
  handleNextFromStep3,
}) => {
  return (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{tb.step3Title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tb.step3Desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {tb.leadPassengerLabel}
                  </label>
                  <input
                    id="passengerName"
                    type="text"
                    required
                    placeholder={tb.leadPassengerPlaceholder}
                    value={passengerName}
                    onChange={(e) => {
                      setPassengerName(e.target.value);
                      if (invalidField === "passengerName") setInvalidField(null);

                    }}
                    className={`w-full rounded-xl border px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      invalidField === "passengerName"
                        ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                        : "border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white focus:ring-sky-100"
                    }`}
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    {tb.nameSignHint}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {tb.paxCountLabel}
                  </label>
                  <CustomSelect
                    value={passengerCount}
                    onChange={(val) => setPassengerCount(Number(val))}
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => ({
                      value: num,
                      label: `${num} ${num === 1 ? tb.paxUnitSingle : tb.paxUnitPlural}`,
                    }))}
                  />
                  {currentVehicle && passengerCount > currentVehicle.maxPax && (
                    <div className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        {passengerCount} {tb.paxUnitPlural} — {currentVehicle.maxPax} {tb.paxUnitPlural} max ({getVehicleLabel(currentVehicle.id)})
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {tb.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder={tb.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (invalidField === "email") setInvalidField(null);

                    }}
                    className={`w-full rounded-xl border px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      invalidField === "email"
                        ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                        : "border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white focus:ring-sky-100"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {tb.phoneLabel}
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    required
                    placeholder={tb.phonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (invalidField === "phoneNumber") setInvalidField(null);

                    }}
                    className={`w-full rounded-xl border px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      invalidField === "phoneNumber"
                        ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                        : "border-slate-200 bg-slate-50 focus:border-sky-500 focus:bg-white focus:ring-sky-100"
                    }`}
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    {tb.phoneHint}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {tb.notesLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={tb.notesPlaceholder}
                  value={luggageNotes}
                  onChange={(e) => setLuggageNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Step 3 Buttons & Bottom Inline Feedback */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {

                    setInvalidField(null);
                    setStep(2);
                  }}
                  className="w-full sm:w-auto justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{tb.btnBack}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromStep3}
                  className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0"
                >
                  <span>{tb.btnContinueReview}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
  );
};
