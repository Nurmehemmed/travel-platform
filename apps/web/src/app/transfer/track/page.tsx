"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Car,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Plane,
  Phone,
  MessageSquare,
  AlertCircle,
  Loader2,
  Calendar,
  Users,
  ShieldCheck,
  CreditCard,
  Banknote,
  Printer,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import { getVehicleConfig } from "@/lib/transfer-zones";
import { TRANSFER_TRACK_TRANSLATIONS, LOCALIZED_AIRPORTS, LOCALIZED_ZONES } from "@/lib/pages-i18n";

interface BookingData {
  bookingNumber: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  direction: "arrival" | "departure" | "round_trip";
  airport: string;
  pickupZone: string;
  dropoffAddress: string;
  vehicleClass: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  returnFlightNumber?: string;
  returnDate?: string;
  returnTime?: string;
  passengerName: string;
  passengerCount: number;
  totalAmount: string;
  paymentMethod: "online" | "on_arrival";
  paymentStatus: string;
  driverName?: string | null;
  driverPhone?: string | null;
  createdAt: string;
}

function TransferTrackContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const tt = (TRANSFER_TRACK_TRANSLATIONS[language] || TRANSFER_TRACK_TRANSLATIONS.EN)!;
  const initialRef = searchParams.get("ref") || "";
  const isPaid = searchParams.get("paid") === "true";
  const isConfirmed = searchParams.get("confirmed") === "true";

  const [query, setQuery] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);

  const fetchBooking = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const isEmail = searchTerm.includes("@");
      const param = isEmail
        ? `email=${encodeURIComponent(searchTerm.trim().toLowerCase())}`
        : `ref=${encodeURIComponent(searchTerm.trim().toUpperCase())}`;

      const res = await fetch(`/api/transfer/track?${param}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No booking found with that reference.");
      }

      setBooking(data);
    } catch (err: any) {
      setBooking(null);
      setError(err?.message || "Failed to find booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchBooking(initialRef);
    }
  }, [initialRef]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(query);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          label: tt.statusConfirmed,
          color: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
        };
      case "in_progress":
        return {
          label: tt.statusInProgress,
          color: "bg-sky-100 text-sky-800 border-sky-300",
          icon: <Car className="h-4 w-4 text-sky-600" />,
        };
      case "completed":
        return {
          label: tt.statusCompleted,
          color: "bg-slate-100 text-slate-800 border-slate-300",
          icon: <CheckCircle2 className="h-4 w-4 text-slate-600" />,
        };
      case "cancelled":
        return {
          label: tt.statusCancelled,
          color: "bg-red-100 text-red-800 border-red-300",
          icon: <AlertCircle className="h-4 w-4 text-red-600" />,
        };
      case "pending":
      default:
        return {
          label: tt.statusPending,
          color: "bg-amber-100 text-amber-800 border-amber-300",
          icon: <Clock className="h-4 w-4 text-amber-600" />,
        };
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#f0f9ff" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-md backdrop-blur-md" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section flex h-16 items-center justify-between">
          <Link href="/transfer" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#0ea5e9" }}>
              <Car className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              addmetour
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-sky-400/20 text-sky-200 border border-sky-300/30 whitespace-nowrap">
              {t.transferPage.headerBadge}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="dark" />
            <Link
              href="/transfer/book"
              className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-sky-600 shrink-0 whitespace-nowrap"
              style={{ backgroundColor: "#0284c7" }}
            >
              {t.nav.bookTransfer}
            </Link>
          </div>
        </div>
      </header>

      <div className="container-section max-w-3xl mx-auto pt-8">
        {/* Success Banner if newly booked/paid */}
        {(isPaid || isConfirmed) && (
          <div className="mb-6 rounded-2xl bg-emerald-500 text-white p-5 shadow-lg flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base">
                {isPaid ? tt.successPaidTitle : tt.successPendingTitle}
              </h2>
              <p className="text-xs text-white/90 mt-0.5">
                {isPaid ? tt.successPaidDesc : tt.successPendingDesc}
              </p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-sky-100 mb-6">
          <h1 className="text-lg font-bold text-slate-900 mb-1">{tt.trackTitle}</h1>
          <p className="text-xs text-slate-500 mb-4">
            {tt.trackSubtitle}
          </p>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={tt.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100 uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : tt.trackBtn}
            </button>
          </form>

          {error && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Booking Details Display */}
        {booking && (
          <div className="rounded-2xl bg-white shadow-md border border-sky-100 overflow-hidden space-y-6 p-6 sm:p-8">
            {/* Top Bar: Ref & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {tt.refLabel}
                </span>
                <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                  {booking.bookingNumber}
                </div>
              </div>

              {(() => {
                const badge = getStatusBadge(booking.status);
                return (
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-sm ${badge.color}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                );
              })()}
            </div>

            {/* Driver Assignment Card */}
            {booking.driverName ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{tt.chauffeurTitle}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{booking.driverName}</div>
                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                      <Phone className="h-3 w-3 text-emerald-600" />
                      <span>{booking.driverPhone || "—"}</span>
                    </div>
                  </div>
                  {booking.driverPhone && (
                    <div className="flex gap-2">
                      <a
                        href={`tel:${booking.driverPhone}`}
                        className="rounded-lg bg-white border border-emerald-300 text-emerald-700 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 shadow-sm"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{tt.callDriver}</span>
                      </a>
                      <a
                        href={`https://wa.me/${booking.driverPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>{tt.whatsApp}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-sky-600 flex-shrink-0" />
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{tt.driverPendingTitle}</span> {tt.driverPendingDesc}
                </div>
              </div>
            )}

            {/* Route & Flight Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-sky-600" /> {tt.routeTitle}
                </div>
                <div>
                  <span className="text-slate-400">{tt.directionLabel}</span>
                  <p className="font-semibold text-slate-800">
                    {booking.direction === "arrival" ? `🛬 ${t.transferPage.arrival}` : booking.direction === "departure" ? `🛫 ${t.transferPage.departure}` : `🔄 ${t.transferPage.roundTripLabel}`}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.airportLabel}</span>
                  <p className="font-semibold text-slate-800">{LOCALIZED_AIRPORTS[language]?.[booking.airport] || booking.airport}</p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.zoneLabel}</span>
                  <p className="font-semibold text-slate-800">{LOCALIZED_ZONES[language]?.[booking.pickupZone] || booking.pickupZone}</p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.addressLabel}</span>
                  <p className="font-semibold text-slate-800">{booking.dropoffAddress}</p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.vehicleLabel}</span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span>{getVehicleConfig(booking.vehicleClass)?.icon || "🚗"}</span>
                    <span>{booking.vehicleClass === "sedan" ? t.transferPage.sedan : booking.vehicleClass === "suv" ? t.transferPage.suv : t.transferPage.minivan}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Plane className="h-3.5 w-3.5 text-sky-600" /> {tt.flightTitle}
                </div>
                <div>
                  <span className="text-slate-400">{tt.flightNumLabel}</span>
                  <p className="font-semibold text-slate-800 font-mono">{booking.flightNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.dateTimeLabel}</span>
                  <p className="font-semibold text-slate-800">
                    {booking.flightDate} · {booking.flightTime}
                  </p>
                </div>
                {booking.returnFlightNumber && (
                  <div>
                    <span className="text-slate-400">{tt.returnFlightLabel}</span>
                    <p className="font-semibold text-slate-800 font-mono">
                      {booking.returnFlightNumber} · {booking.returnDate} {booking.returnTime}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-slate-400">{tt.passengerLabel}</span>
                  <p className="font-semibold text-slate-800">{booking.passengerName} ({booking.passengerCount} pax)</p>
                </div>
                <div>
                  <span className="text-slate-400">{tt.paymentLabel}</span>
                  <p className="font-semibold text-slate-800">
                    ${booking.totalAmount} · {booking.paymentMethod === "online" ? tt.paidOnline : tt.payCash}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>{tt.printVoucher}</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/994551003146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{tt.supportWhatsApp}</span>
                </a>

                <Link
                  href="/transfer/book"
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>{tt.bookAnother}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransferTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
          <div className="flex items-center gap-3 text-sky-700 font-semibold text-sm">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
            <span>Loading transfer details...</span>
          </div>
        </div>
      }
    >
      <TransferTrackContent />
    </Suspense>
  );
}
