"use client";

import React from "react";
import { Plane, AlertCircle, ArrowRight, ArrowLeft, Clock, MessageSquare } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";
import {
  getMinTransferBookingDate,
  validateTransferLeadTime,
  validateReturnFlightTime,
} from "@/lib/transfers";

interface FlightDetailsStepProps {
  direction: "arrival" | "departure" | "round_trip";
  flightNumber: string;
  setFlightNumber: (val: string) => void;
  flightDate: string;
  setFlightDate: (val: string) => void;
  flightTime: string;
  setFlightTime: (val: string) => void;
  returnFlightNumber: string;
  setReturnFlightNumber: (val: string) => void;
  returnDate: string;
  setReturnDate: (val: string) => void;
  returnTime: string;
  setReturnTime: (val: string) => void;
  invalidField: string | null;
  setInvalidField: (f: string | null) => void;
  tb: any;
  t: any;
  setStep: (s: 1 | 2 | 3 | 4) => void;
  handleNextFromStep2: () => void;
}

export const FlightDetailsStep: React.FC<FlightDetailsStepProps> = ({
  direction,
  flightNumber,
  setFlightNumber,
  flightDate,
  setFlightDate,
  flightTime,
  setFlightTime,
  returnFlightNumber,
  setReturnFlightNumber,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
  invalidField,
  setInvalidField,
  tb,
  t,
  setStep,
  handleNextFromStep2,
}) => {
  const minBookingDate = getMinTransferBookingDate();
  const primaryLeadCheck =
    flightDate && flightTime ? validateTransferLeadTime(flightDate, flightTime) : null;
  const returnLeadCheck =
    direction === "round_trip" && returnDate && returnTime
      ? validateReturnFlightTime(flightDate, flightTime, returnDate, returnTime)
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{tb.step2Title}</h2>
        <p className="text-xs text-slate-500 mt-1">{tb.step2Desc}</p>
      </div>

      {/* 8-Hour Lead Time Policy Notice */}
      <div className="flex items-start gap-3 rounded-xl bg-amber-50/90 p-4 border border-amber-200/90 shadow-xs">
        <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 leading-relaxed">
          <span className="font-bold text-amber-900">
            {tb.policyLeadTimeTitle || "8-Hour Advance Booking Policy"}:
          </span>{" "}
          {tb.policyLeadTimeDesc ||
            "Transfer requests are accepted up to a maximum of 8 hours prior to arrival. Need an urgent last-minute transfer? Contact our 24/7 dispatch."}
        </div>
      </div>

      {/* Primary Flight */}
      <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
        <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Plane className="h-4 w-4" />
          <span>{direction === "departure" ? tb.depFlightInfo : tb.arrFlightInfo}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {tb.flightNumLabel}
            </label>
            <input
              id="flightNumber"
              type="text"
              required
              placeholder={tb.flightNumPlaceholder}
              value={flightNumber}
              onChange={(e) => {
                setFlightNumber(e.target.value.toUpperCase());
                if (invalidField === "flightNumber") setInvalidField(null);
              }}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-semibold text-slate-800 uppercase placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                invalidField === "flightNumber"
                  ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                  : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-100"
              }`}
            />
            <span className="block text-[11px] text-slate-400 mt-1">
              {tb.flightTrackHint}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {tb.flightDateLabel}
            </label>
            <DatePicker
              id="flightDate"
              required
              value={flightDate}
              minDate={minBookingDate}
              placeholder={tb.flightDateLabel}
              hasError={invalidField === "flightDate"}
              onChange={(val) => {
                setFlightDate(val);
                if (invalidField === "flightDate") setInvalidField(null);
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {tb.flightTimeLabel}
            </label>
            <TimePicker
              id="flightTime"
              required
              value={flightTime}
              placeholder={tb.flightTimeLabel}
              hasError={invalidField === "flightTime" || (primaryLeadCheck ? !primaryLeadCheck.valid : false)}
              onChange={(val) => {
                setFlightTime(val);
                if (invalidField === "flightTime") setInvalidField(null);
              }}
            />
          </div>
        </div>

        {/* Real-time Lead Time Warning for Primary Flight */}
        {primaryLeadCheck && !primaryLeadCheck.valid && (
          <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-900 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <p className="font-bold text-rose-800">{primaryLeadCheck.error}</p>
              <p className="text-[11px] text-rose-700 leading-normal">
                {tb.urgentDispatchHint ||
                  "Need an urgent transfer within the next 8 hours? Please contact our 24/7 dispatch team directly on WhatsApp."}
              </p>
              <a
                href={`https://wa.me/994124047888?text=${encodeURIComponent(
                  `Hello, I need an urgent last-minute transfer for flight ${flightNumber || "inbound"} on ${flightDate} at ${flightTime}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors mt-0.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp 24/7 Operations (+994 12 404 78 88)</span>
              </a>
            </div>
          </div>
        )}
      </div>

              {/* Return Flight (Only if round trip) */}
              {direction === "round_trip" && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Plane className="h-4 w-4 rotate-180" />
                    <span>{tb.retFlightInfo}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {tb.retFlightNumLabel}
                      </label>
                      <input
                        id="returnFlightNumber"
                        type="text"
                        required
                        placeholder="e.g. J2 075"
                        value={returnFlightNumber}
                        onChange={(e) => {
                          setReturnFlightNumber(e.target.value.toUpperCase());
                          if (invalidField === "returnFlightNumber") setInvalidField(null);

                        }}
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-semibold text-slate-800 uppercase placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          invalidField === "returnFlightNumber"
                            ? "border-red-400 ring-2 ring-red-200 bg-red-50/40 animate-shake"
                            : "border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {tb.retFlightDateLabel}
                      </label>
                      <DatePicker
                        id="returnDate"
                        required
                        value={returnDate}
                        minDate={flightDate || minBookingDate}
                        placeholder={tb.retFlightDateLabel}
                        hasError={invalidField === "returnDate"}
                        onChange={(val) => {
                          setReturnDate(val);
                          if (invalidField === "returnDate") setInvalidField(null);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {tb.retFlightTimeLabel}
                      </label>
                      <TimePicker
                        id="returnTime"
                        required
                        value={returnTime}
                        placeholder={tb.retFlightTimeLabel}
                        hasError={invalidField === "returnTime" || (returnLeadCheck ? !returnLeadCheck.valid : false)}
                        onChange={(val) => {
                          setReturnTime(val);
                          if (invalidField === "returnTime") setInvalidField(null);
                        }}
                      />
                    </div>
                  </div>

                  {/* Return Flight Lead Time or Ordering Warning */}
                  {returnLeadCheck && !returnLeadCheck.valid && (
                    <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-900 flex items-start gap-2.5 animate-fadeIn">
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <p className="font-bold text-rose-800">{returnLeadCheck.error}</p>
                        <p className="text-[11px] text-rose-700">
                          {tb.errReturnMustBeAfterPrimary ||
                            "Return flight date and time must be after the arrival flight and at least 8 hours in advance."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Free Wait Time Notice */}
              <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 border border-blue-100">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <span className="font-bold">{tb.waitNoticeTitle}</span> {tb.waitNoticeDesc}
                </div>
              </div>

              {/* Step 2 Buttons & Bottom Inline Feedback */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {

                    setInvalidField(null);
                    setStep(1);
                  }}
                  className="w-full sm:w-auto justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{tb.btnBack}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0"
                >
                  <span>{tb.btnContinuePax}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
  );
};
