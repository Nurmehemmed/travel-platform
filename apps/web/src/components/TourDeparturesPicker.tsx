"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  ChevronRight,
  Info,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { GUARANTEED_TOURS_I18N } from "@/lib/tours-i18n";
import { TourWaitlistModal } from "@/components/TourWaitlistModal";
import type { TourDepartureSlot } from "@/services/tour.service";

interface TourDeparturesPickerProps {
  tourId: string;
  tourTitle: string;
  selectedDate: string;
  onSelectDate: (date: string, slotId?: string | null) => void;
  guestCount?: number;
}

export function TourDeparturesPicker({
  tourId,
  tourTitle,
  selectedDate,
  onSelectDate,
  guestCount = 2,
}: TourDeparturesPickerProps) {
  const { language } = useLanguage();
  const text = GUARANTEED_TOURS_I18N[language] || GUARANTEED_TOURS_I18N.EN;

  const [departures, setDepartures] = useState<TourDepartureSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [waitlistModalSlot, setWaitlistModalSlot] = useState<TourDepartureSlot | null>(null);
  const [showGuaranteeInfo, setShowGuaranteeInfo] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchDepartures() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tours/departures?tourId=${encodeURIComponent(tourId)}`);
        const data = await res.json();
        if (mounted && data.departures) {
          setDepartures(data.departures);
          // If current selectedDate matches one of the departures, highlight its slot
          const matched = data.departures.find((d: TourDepartureSlot) => d.departureDate === selectedDate);
          if (matched) {
            setSelectedSlotId(matched.id);
          } else if (data.departures.length > 0 && !selectedDate) {
            // Default to first open departure
            const firstOpen = data.departures.find((d: TourDepartureSlot) => d.canBook) || data.departures[0];
            setSelectedSlotId(firstOpen.id);
            onSelectDate(firstOpen.departureDate, firstOpen.id);
          }
        }
      } catch (err) {
        console.warn("Could not load departures:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchDepartures();
    return () => {
      mounted = false;
    };
  }, [tourId]);

  const handleSelectSlot = (slot: TourDepartureSlot) => {
    if (slot.isSoldOut) {
      setWaitlistModalSlot(slot);
      return;
    }
    setSelectedSlotId(slot.id);
    setShowCustomDate(false);
    onSelectDate(slot.departureDate, slot.id);
  };

  const handleCustomDateChange = (val: string) => {
    setSelectedSlotId(null);
    onSelectDate(val, null);
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString(language === "AZ" ? "az-AZ" : language === "RU" ? "ru-RU" : "en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-3">
      {/* Header bar with Guarantee explainer badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-[#0f3460]" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {text.selectDeparture}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowGuaranteeInfo(!showGuaranteeInfo)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>{text.guaranteedBadge}</span>
          <HelpCircle className="h-3 w-3 text-emerald-500 opacity-80" />
        </button>
      </div>

      {/* Info callout on guarantee */}
      {showGuaranteeInfo && (
        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 leading-relaxed animate-fade-in flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-emerald-950 mb-0.5">What is a Guaranteed Departure?</p>
            <p className="text-[11px] text-emerald-800">{text.guaranteedTooltip}</p>
          </div>
        </div>
      )}

      {/* Departures Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-100 animate-pulse border border-slate-200/60" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {departures.slice(0, 6).map((slot) => {
            const isSelected = selectedSlotId === slot.id && !showCustomDate;
            const isFewLeft = slot.isAlmostFull;
            const isSoldOut = slot.isSoldOut;

            return (
              <div
                key={slot.id}
                onClick={() => handleSelectSlot(slot)}
                className={`relative p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer select-none ${
                  isSelected
                    ? "border-[#0f3460] bg-blue-50/60 shadow-sm ring-1 ring-[#0f3460]"
                    : isSoldOut
                    ? "border-slate-200 bg-slate-50/80 opacity-75 hover:border-slate-300"
                    : "border-slate-200 bg-white hover:border-[#0f3460]/40 hover:bg-slate-50/50"
                }`}
              >
                {/* Top row: Date & Guaranteed badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {formatDateDisplay(slot.departureDate)}
                  </span>

                  {slot.isGuaranteed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300/40">
                      <ShieldCheck className="h-3 w-3" /> Guaranteed
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
                  )}
                </div>

                {/* Bottom row: Time & Live Seat Scarcity */}
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {slot.meetingTime}
                  </span>

                  {isSoldOut ? (
                    <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200/50">
                      Sold Out · Waitlist
                    </span>
                  ) : isFewLeft ? (
                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 flex items-center gap-1 animate-pulse">
                      <Zap className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {text.onlySpotsLeft(slot.availableSeats)}
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-400" />
                      {slot.availableSeats} spots left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alternative Date Request Toggle */}
      <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-100">
        <button
          type="button"
          onClick={() => {
            setShowCustomDate(!showCustomDate);
            if (!showCustomDate) {
              setSelectedSlotId(null);
            }
          }}
          className="text-xs text-[#0f3460] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{text.customDateRequest}</span>
          <ChevronRight className={`h-3 w-3 transition-transform ${showCustomDate ? "rotate-90" : ""}`} />
        </button>

        <span className="text-[11px] text-slate-400">
          Small group capped at 12
        </span>
      </div>

      {/* Custom Date Input (Accordion) */}
      {showCustomDate && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-fade-in">
          <p className="text-[11px] text-slate-500">
            {text.customDateHint}
          </p>
          <input
            type="date"
            value={selectedDate}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            onChange={(e) => handleCustomDateChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:border-[#0f3460]"
          />
        </div>
      )}

      {/* Waitlist Modal when traveler clicks a sold out slot */}
      {waitlistModalSlot && (
        <TourWaitlistModal
          isOpen={Boolean(waitlistModalSlot)}
          onClose={() => setWaitlistModalSlot(null)}
          tour={{ id: tourId, title: tourTitle }}
          departureDate={waitlistModalSlot.departureDate}
          slotId={waitlistModalSlot.id}
        />
      )}
    </div>
  );
}
