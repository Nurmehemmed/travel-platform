"use client";

import { useState } from "react";
import { X, BellRing, CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { GUARANTEED_TOURS_I18N } from "@/lib/tours-i18n";

interface TourWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: { id: string; title: string };
  departureDate: string;
  slotId?: string | null;
}

export function TourWaitlistModal({
  isOpen,
  onClose,
  tour,
  departureDate,
  slotId,
}: TourWaitlistModalProps) {
  const { language, showToast } = useLanguage();
  const text = GUARANTEED_TOURS_I18N[language] || GUARANTEED_TOURS_I18N.EN;

  const [travelerName, setTravelerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName.trim() || !phoneNumber.trim() || !email.trim()) {
      showToast("Please fill in all contact fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/tours/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          desiredDate: departureDate,
          guests,
          travelerName: travelerName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          notes: notes.trim() || undefined,
          slotId: slotId || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        showToast(text.waitlistSuccess, "success");
      } else {
        showToast(data.error || "Failed to join waitlist", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#061225] to-[#0f3460] p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {text.waitlistModalTitle}
              </h3>
              <p className="text-xs text-blue-100/80 mt-0.5">
                {text.waitlistModalSubtitle}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
            <span className="font-semibold text-white truncate max-w-[260px]">
              {tour.title}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/15 text-white font-mono">
              {departureDate}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">
                You're on the Priority List!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We've registered your request for <strong>{guests} {guests === 1 ? "seat" : "seats"}</strong> on{" "}
                <strong>{departureDate}</strong>. If a spot opens up, our reservation team will notify you via WhatsApp and email.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#0f3460] text-white text-xs font-semibold hover:bg-[#1a4a80] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0f3460]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Guests *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0f3460]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+994 50 123 45 67"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0f3460]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0f3460]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Notes / Flexibility
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Also available the next day if seats open"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0f3460]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-[#0f3460] hover:bg-[#1a4a80] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <BellRing className="h-4 w-4" />
                  {submitting ? "Joining Waitlist..." : text.joinWaitlist}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
