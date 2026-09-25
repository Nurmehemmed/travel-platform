"use client";

import { useState } from "react";
import { X, Check, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { getLocalizedTour } from "@/lib/tours-i18n";
import { DatePicker } from "@/components/DatePicker";
import { CustomSelect } from "@/components/CustomSelect";

interface TourReservationModalProps {
  tour: { id: string; title: string; price: number } | null;
  onClose: () => void;
}

export function TourReservationModal({
  tour,
  onClose,
}: TourReservationModalProps) {
  const { t, language, showToast } = useLanguage();
  const { formatPrice, formatPriceWithSubtext } = useCurrency();

  const [bookingDate, setBookingDate] = useState("");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedResNumber, setConfirmedResNumber] = useState<string | null>(null);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"on_arrival" | "online">("on_arrival");

  if (!tour) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingName.trim() || !bookingPhone.trim()) {
      showToast(t.bookingModal.fillAllFields, "warning");
      return;
    }
    setBookingSubmitting(true);
    try {
      const res = await fetch("/api/tours/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          tourDate: bookingDate,
          guests: bookingGuests,
          travelerName: bookingName,
          phoneNumber: bookingPhone,
          price: tour.price,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedResNumber(data.reservationNumber);
        setBookingSuccess(true);
        showToast(t.bookingModal.reservationSuccess, "success");
      } else {
        showToast(data.error || "Failed to submit reservation", "error");
      }
    } catch {
      showToast(t.bookingModal.networkError, "error");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleDone = () => {
    onClose();
    setBookingSuccess(false);
    setConfirmedResNumber(null);
    setBookingDate("");
    setBookingName("");
    setBookingPhone("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl bg-white border border-slate-200 animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {bookingSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{t.bookingModal.confirmedTitle}</h3>
            {confirmedResNumber && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold mb-3">
                <span>{t.bookingModal.referenceLabel}</span>
                <span>{confirmedResNumber}</span>
              </div>
            )}
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {t.bookingModal.thankYouPart1} <strong>{bookingName}</strong>. {t.bookingModal.thankYouPart2} <strong>{tour.title}</strong> ({bookingDate}). {t.bookingModal.thankYouPart3}
            </p>
            <button
              type="button"
              onClick={handleDone}
              className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
              style={{ backgroundColor: "#0f3460" }}
            >
              {t.bookingModal.doneBtn}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                {t.bookingModal.badge}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
              {getLocalizedTour(tour, language).title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t.bookingModal.subtitle}
            </p>

            {/* Zero-Risk Reassurance Banner (Tripadvisor/GetYourGuide standard) */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200/80 p-3 mb-4 flex items-start gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950">
                <span className="font-extrabold block text-emerald-900">Zero Prepayment Required</span>
                <p className="text-[11px] text-emerald-800 leading-tight mt-0.5">
                  Hold your date with zero deposit. Free cancellation up to 24 hours prior to tour start.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.bookingModal.dateLabel}
                </label>
                <DatePicker
                  required
                  minDate={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  placeholder={t.bookingModal.dateLabel}
                  onChange={(val) => setBookingDate(val)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.bookingModal.guestsLabel}
                </label>
                <CustomSelect
                  value={bookingGuests}
                  onChange={(val) => setBookingGuests(Number(val))}
                  options={[1, 2, 3, 4, 5, 6, 7, 8, t.bookingModal.customGroup].map((n) => ({
                    value: typeof n === "number" ? n : 9,
                    label: typeof n === "number" ? `${n} ${n === 1 ? t.bookingModal.guest : t.bookingModal.guests}` : String(n),
                  }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.bookingModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.bookingModal.namePlaceholder}
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.bookingModal.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t.bookingModal.phonePlaceholder}
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Payment Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    onClick={() => setPaymentMethod("on_arrival")}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === "on_arrival"
                        ? "bg-amber-50/80 border-amber-500 ring-1 ring-amber-400/40"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">💵 Pay on Tour Day</span>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                        Popular
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Cash or card to your guide upon pickup.</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === "online"
                        ? "bg-sky-50/80 border-sky-500 ring-1 ring-sky-400/40"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">💳 Pay Online</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Card link sent after confirmation.</p>
                  </div>
                </div>
              </div>

              {/* Trust Checklist */}
              <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Instant WhatsApp & Email voucher with guide details</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Hotel lobby pickup & drop-off included</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>{t.bookingModal.ratePerGroup}</span>
                  <span className="font-bold text-slate-900">{formatPrice(tour.price)}</span>
                </div>
                {formatPriceWithSubtext(tour.price).secondary && (
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{t.bookingModal.approxLocal}</span>
                    <span>{formatPriceWithSubtext(tour.price).secondary}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={bookingSubmitting}
                className="w-full rounded-xl py-3 text-xs font-bold text-white shadow-lg transition-all duration-200 hover:opacity-95 cursor-pointer mt-2 disabled:opacity-50"
                style={{ backgroundColor: "#0f3460" }}
              >
                {bookingSubmitting ? t.bookingModal.submittingBtn : "Confirm Reservation (Pay Later)"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourReservationModal;
