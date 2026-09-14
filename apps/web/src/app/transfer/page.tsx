"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  Plane,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Users,
  Briefcase,
  HelpCircle,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Search,
  Calendar,
  Compass,
  DollarSign,
  FileText
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import {
  AIRPORTS,
  VEHICLE_CLASSES,
  TRANSFER_ZONES,
  AirportCode,
  VehicleClass,
  getZonesByAirport,
  calculateTransferPrice,
  calculateRoundTripPrice,
} from "@/lib/transfer-zones";

export default function TransferLandingPage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Estimator state
  const [selectedAirport, setSelectedAirport] = useState<AirportCode>("GYD");
  const [direction, setDirection] = useState<"arrival" | "departure" | "round_trip">("arrival");
  const zones = getZonesByAirport(selectedAirport);
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || "GYD-baku-center");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // When airport changes, reset zone
  const handleAirportChange = (code: AirportCode) => {
    setSelectedAirport(code);
    const newZones = getZonesByAirport(code);
    setSelectedZoneId(newZones[0]?.id || "");
  };

  const currentZone = TRANSFER_ZONES.find((z) => z.id === selectedZoneId) || zones[0];

  const handleBookNow = (vehicleClass?: VehicleClass) => {
    const params = new URLSearchParams({
      airport: selectedAirport,
      direction,
      zone: selectedZoneId,
    });
    if (vehicleClass) {
      params.set("vehicle", vehicleClass);
    }
    router.push(`/transfer/book?${params.toString()}`);
  };

  const faqs = [
    {
      q: "Where will I meet my driver at the airport?",
      a: "Your driver will be waiting inside the arrival hall directly after luggage claim and customs exit, holding a personalized signboard with your name. You will also receive the driver's contact number before your flight.",
    },
    {
      q: "What if my flight is delayed?",
      a: "We track your flight number in real-time. Whether your flight is early or delayed by several hours, your driver will adjust their schedule automatically at no extra charge. We also include 60 minutes of complimentary waiting time after your flight lands.",
    },
    {
      q: "Can I pay in cash to the driver upon arrival?",
      a: "Yes! You can choose to pay securely online by credit card via Payriff, or choose 'Pay on Arrival' in cash (USD, EUR, or AZN) directly to the driver.",
    },
    {
      q: "What is your cancellation policy?",
      a: "You can cancel or modify your transfer reservation free of charge up to 24 hours prior to the scheduled pickup time. Instant full refunds are issued for online card payments.",
    },
    {
      q: "Do you provide child safety seats?",
      a: "Yes, infant and child safety seats can be arranged upon request at no additional fee. Simply mention it in the luggage or special requests note when booking.",
    },
    {
      q: "How many pieces of luggage can I bring?",
      a: "Our standard economy sedans comfortably carry 2 large suitcases plus carry-on bags. If you are traveling with more luggage or sporting equipment, our Minivan or Executive Minibus are ideal choices.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header className="sticky top-0 z-50 shadow-md backdrop-blur-md" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full shadow-inner" style={{ backgroundColor: "#0ea5e9" }}>
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
              href="/transfer/track"
              className="text-xs font-semibold text-sky-100 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 shrink-0 whitespace-nowrap"
            >
              <Search className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span>{t.nav.trackTransfer}</span>
            </Link>
            <Link
              href="/transfer/book"
              className="rounded-full px-4 sm:px-5 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-1.5 text-white shrink-0 whitespace-nowrap"
              style={{ backgroundColor: "#0284c7" }}
            >
              <span>{t.nav.bookTransfer}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO */}
      <section className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: "#0f3460" }}>
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-section relative z-10 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-1.5 text-xs font-semibold text-sky-300 mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span>{t.transferPage.heroBadge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight break-words">
              {t.transferPage.heroTitle}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-sky-100/85 max-w-2xl mx-auto leading-relaxed">
              {t.transferPage.heroDesc}
            </p>
          </div>

          {/* ══════════════ ROUTE & LIVE PRICE CALCULATOR WIDGET ══════════════ */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-sky-100 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0" />
                <span>{t.transferPage.calcTitle}</span>
              </h2>
              {/* Direction toggle */}
              <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setDirection("arrival")}
                  className={`rounded-md px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    direction === "arrival"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  🛬 {t.transferPage.arrival}
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("departure")}
                  className={`rounded-md px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    direction === "departure"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  🛫 {t.transferPage.departure}
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("round_trip")}
                  className={`rounded-md px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    direction === "round_trip"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  🔄 {t.transferPage.roundTrip}
                </button>
              </div>
            </div>

            {/* Selectors Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Airport Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Airport
                </label>
                <select
                  value={selectedAirport}
                  onChange={(e) => handleAirportChange(e.target.value as AirportCode)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Zone Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Destination / Pickup Zone
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name} {z.distanceKm > 0 ? `(~${z.distanceKm} km)` : "— Custom Quote"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Options Grid with Live Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {VEHICLE_CLASSES.map((vc) => {
                let priceObj = currentZone
                  ? direction === "round_trip"
                    ? calculateRoundTripPrice(currentZone, vc.id)
                    : calculateTransferPrice(currentZone, vc.id)
                  : null;

                const isCustom = currentZone?.isCustom;

                return (
                  <div
                    key={vc.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-4 transition-all hover:border-sky-400 hover:shadow-md group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{vc.icon}</span>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Users className="h-3 w-3" /> {vc.capacity}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">{vc.label}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {vc.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {direction === "round_trip" ? "Round Trip" : "One-Way"}
                        </div>
                        <div className="text-lg font-extrabold text-sky-700">
                          {isCustom ? (
                            <span className="text-xs font-semibold text-slate-600">Quote on Request</span>
                          ) : priceObj ? (
                            `$${priceObj.totalAmount}`
                          ) : (
                            "—"
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBookNow(vc.id)}
                        className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-sm group-hover:scale-105"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick CTA banner inside widget */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl bg-sky-50 p-4 border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-200/70 text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">All-Inclusive Fixed Rates:</span> No surge pricing, highway tolls included, parking fees covered.
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleBookNow()}
                className="w-full sm:w-auto rounded-xl bg-[#0f3460] hover:bg-[#1a4478] text-white px-5 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
              >
                <span>{t.transferPage.proceedBooking}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ TRUST FEATURES */}
      <section className="py-16 bg-white border-b border-sky-100">
        <div className="container-section max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.transferPage.whyTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {t.transferPage.whyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">Real-Time Flight Monitoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We monitor incoming flights for delays or early arrivals. Your driver is guaranteed to be there whenever your wheels touch down, at no additional fee.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">60 Minutes Free Wait Time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take your time clearing immigration, passport control, and baggage claim. We include a full 60 minutes of complimentary wait time starting from flight touchdown.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">Meet & Greet Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No searching through airport taxi ranks. Your driver greets you directly in the arrival hall holding a clear name board and assists with your heavy luggage.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">Fixed Upfront Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                What you see is what you pay. Zero hidden fees, no surge tariffs in rush hour or bad weather, and all highway tolls and parking charges are included.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">Flexible Payment Options</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay in advance via secure online card checkout (Payriff), or simply pay in cash directly to your driver upon arrival in USD, EUR, or Azerbaijani Manat (AZN).
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">24/7 Operations Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Baku-based dispatch and support team is on standby around the clock via WhatsApp and telephone to ensure your transfer is seamless from booking to drop-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FLEET OVERVIEW */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-section max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Premium Vehicles & Chauffeurs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {t.transferPage.fleetTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {t.transferPage.fleetSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_CLASSES.map((vc) => (
              <div
                key={vc.id}
                className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{vc.icon}</div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{vc.label}</h3>
                        <p className="text-xs text-slate-500">{vc.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-sky-600" />
                      <span className="font-semibold">{vc.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-sky-600" />
                      <span className="font-semibold">{vc.luggage}</span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {vc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Starting from</span>
                    <div className="text-xl font-extrabold text-slate-900">
                      ${vc.baseRate}{" "}
                      <span className="text-xs font-normal text-slate-500">base + ${vc.perKmRate.toFixed(2)}/km</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBookNow(vc.id)}
                    className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Book {vc.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ AIRPORTS COVERED */}
      <section className="py-16 bg-white border-b border-sky-100">
        <div className="container-section max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Nationwide Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Azerbaijan Airports We Serve
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Door-to-door transfers connecting all international airports with hotels, residences, and business centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AIRPORTS.map((airport) => (
              <div
                key={airport.code}
                className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/30 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-sky-600 text-white font-extrabold text-xs px-2.5 py-1">
                      {airport.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{airport.city}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{airport.name}</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    {airport.code === "GYD" && "Baku's main hub. 30 km from city center. Dedicated pickup zone at Terminal 1 & 2."}
                    {airport.code === "GJA" && "Western Azerbaijan gateway. 8 km from Ganja center with transfers to Goygol and Naftalan."}
                    {airport.code === "NAJ" && "Nakhchivan Autonomous Republic. 7 km from city center with prompt airport greeting."}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAirport(airport.code);
                      handleBookNow();
                    }}
                    className="w-full rounded-xl bg-slate-100 hover:bg-sky-100 text-sky-700 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book from {airport.code}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FAQ ACCORDION */}
      <section className="py-16" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Have Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-sky-100 bg-white shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-800 hover:text-sky-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-sky-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ BOTTOM CTA */}
      <section className="py-16" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Land Stress-Free in Azerbaijan?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-sky-100/80 max-w-xl mx-auto leading-relaxed">
            Reserve your airport transfer in under 2 minutes. Instant booking confirmation with driver assignment before takeoff.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/transfer/book"
              className="w-full sm:w-auto rounded-full px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0284c7" }}
            >
              <span>Book Your Transfer Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/transfer/track"
              className="w-full sm:w-auto rounded-full border border-sky-300/40 px-6 py-3 text-sm font-semibold text-sky-200 hover:bg-white/10 transition-all text-center"
            >
              Track Existing Booking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
