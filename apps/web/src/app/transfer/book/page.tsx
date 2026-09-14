"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Car,
  Plane,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Users,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Banknote,
  Loader2,
  Info,
  Sparkles
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
  getZoneById,
  calculateTransferPrice,
  calculateRoundTripPrice,
  getAirportByCode,
  getVehicleConfig,
} from "@/lib/transfer-zones";

function TransferBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  // Query param defaults
  const paramAirport = (searchParams.get("airport") as AirportCode) || "GYD";
  const paramDirection = (searchParams.get("direction") as "arrival" | "departure" | "round_trip") || "arrival";
  const paramZone = searchParams.get("zone") || "GYD-baku-center";
  const paramVehicle = (searchParams.get("vehicle") as VehicleClass) || "sedan";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Route & Vehicle
  const [airport, setAirport] = useState<AirportCode>(paramAirport);
  const [direction, setDirection] = useState<"arrival" | "departure" | "round_trip">(paramDirection);
  const [zoneId, setZoneId] = useState<string>(paramZone);
  const [dropoffAddress, setDropoffAddress] = useState<string>("");
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>(paramVehicle);

  // Step 2: Flight Details
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [flightDate, setFlightDate] = useState<string>("");
  const [flightTime, setFlightTime] = useState<string>("");
  const [returnFlightNumber, setReturnFlightNumber] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  // Step 3: Passenger Information
  const [passengerName, setPassengerName] = useState<string>("");
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [luggageNotes, setLuggageNotes] = useState<string>("");

  // Step 4: Payment & Submission
  const [paymentMethod, setPaymentMethod] = useState<"online" | "on_arrival">("online");
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync available zones when airport changes
  const airportZones = getZonesByAirport(airport);
  useEffect(() => {
    if (!airportZones.some((z) => z.id === zoneId)) {
      setZoneId(airportZones[0]?.id || "");
    }
  }, [airport]);

  const currentZone = getZoneById(zoneId) || airportZones[0];
  const currentVehicle = getVehicleConfig(vehicleClass) || VEHICLE_CLASSES[0];
  const airportInfo = getAirportByCode(airport) || AIRPORTS[0];

  // Pricing calculation
  const isCustomZone = currentZone?.isCustom;
  const pricing = currentZone
    ? direction === "round_trip"
      ? calculateRoundTripPrice(currentZone, vehicleClass)
      : calculateTransferPrice(currentZone, vehicleClass)
    : null;

  const totalAmount = isCustomZone ? 0 : pricing?.totalAmount || 0;

  // Validation per step
  const handleNextFromStep1 = () => {
    setErrorMessage(null);
    if (!dropoffAddress.trim()) {
      setErrorMessage(
        direction === "departure"
          ? "Please provide your pickup hotel or residential address."
          : "Please provide your destination hotel or address."
      );
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep2 = () => {
    setErrorMessage(null);
    if (!flightNumber.trim()) {
      setErrorMessage("Flight number is required for airport transfer coordination.");
      return;
    }
    if (!flightDate) {
      setErrorMessage("Please select the flight date.");
      return;
    }
    if (!flightTime) {
      setErrorMessage("Please select the estimated flight time.");
      return;
    }
    if (direction === "round_trip") {
      if (!returnFlightNumber.trim() || !returnDate || !returnTime) {
        setErrorMessage("Please provide return flight details for your round-trip transfer.");
        return;
      }
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep3 = () => {
    setErrorMessage(null);
    if (!passengerName.trim()) {
      setErrorMessage("Please enter the lead passenger full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address for booking confirmation.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      setErrorMessage("Please enter a valid telephone or WhatsApp number with country code.");
      return;
    }
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrorMessage("Please accept the terms and conditions to complete your reservation.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        direction,
        airport,
        zoneId,
        dropoffAddress: dropoffAddress.trim(),
        vehicleClass,
        flightNumber: flightNumber.trim().toUpperCase(),
        flightDate,
        flightTime,
        returnFlightNumber: direction === "round_trip" ? returnFlightNumber.trim().toUpperCase() : undefined,
        returnDate: direction === "round_trip" ? returnDate : undefined,
        returnTime: direction === "round_trip" ? returnTime : undefined,
        passengerName: passengerName.trim(),
        passengerCount,
        phoneNumber: phoneNumber.trim(),
        email: email.trim().toLowerCase(),
        luggageNotes: luggageNotes.trim() || undefined,
        paymentMethod: isCustomZone ? "on_arrival" : paymentMethod,
      };

      const res = await fetch("/api/transfer/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create transfer booking.");
      }

      // If online payment, redirect to Payriff checkout URL
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      // If on-arrival or custom quote, redirect to tracking confirmation page
      router.push(`/transfer/track?ref=${encodeURIComponent(data.bookingNumber)}&confirmed=true`);

    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
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
              href="/transfer"
              className="text-xs font-semibold text-sky-200 hover:text-white flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t.transferPage.headerBadge}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="container-section max-w-4xl mx-auto pt-8">
        {/* Progress Stepper */}
        <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block" />
            {[
              { num: 1, title: "Route & Vehicle" },
              { num: 2, title: "Flight Details" },
              { num: 3, title: "Passenger Info" },
              { num: 4, title: "Review & Pay" },
            ].map((s) => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-sky-600 text-white ring-4 ring-sky-100"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`mt-1.5 text-[11px] font-semibold text-center hidden sm:block ${
                      isCurrent ? "text-sky-700" : isDone ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 flex items-start gap-2.5 animate-shake">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-sky-100">
          {/* ═══════════════════════════════════════════════════════ STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 1: Select Route & Vehicle</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose your airport, direction, and preferred vehicle class.
                </p>
              </div>

              {/* Direction selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Transfer Direction
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "arrival", label: "Arrival", desc: "Airport → Hotel / Destination", icon: "🛬" },
                    { id: "departure", label: "Departure", desc: "Hotel / Address → Airport", icon: "🛫" },
                    { id: "round_trip", label: "Round Trip", desc: "Both Ways (Save 10%)", icon: "🔄" },
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Airport
                  </label>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value as AirportCode)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  >
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>
                        {a.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Destination Zone
                  </label>
                  <select
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  >
                    {airportZones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name} {z.distanceKm > 0 ? `(~${z.distanceKm} km)` : "— Custom Quote"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exact hotel / dropoff address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {direction === "departure" ? "Pickup Hotel / Address" : "Destination Hotel / Address"} *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Four Seasons Hotel Baku, Neftchilar Ave 1 / apartment address"
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Our driver will deliver you directly to the entrance or hotel lobby.
                </p>
              </div>

              {/* Vehicle Selection Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Vehicle Class
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VEHICLE_CLASSES.map((vc) => {
                    const price = currentZone
                      ? direction === "round_trip"
                        ? calculateRoundTripPrice(currentZone, vc.id)
                        : calculateTransferPrice(currentZone, vc.id)
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
                                {isCustomZone ? "Custom Quote" : price ? `$${price.totalAmount}` : "—"}
                              </span>
                              <div className="text-[9px] uppercase font-bold text-slate-400">
                                {direction === "round_trip" ? "Total Round Trip" : "One-Way Total"}
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm">{vc.label}</h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">{vc.description}</p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-600">
                          <span className="flex items-center gap-1 font-medium">
                            <Users className="h-3 w-3 text-sky-600" /> {vc.capacity}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Briefcase className="h-3 w-3 text-sky-600" /> {vc.luggage}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Continue to Flight Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 2: Flight Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We track your flight number in real-time so your driver is always on time even if your flight is delayed.
                </p>
              </div>

              {/* Primary Flight */}
              <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Plane className="h-4 w-4" />
                  <span>
                    {direction === "departure" ? "Departure Flight Information" : "Arrival Flight Information"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Flight Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. J2 076 or TK 338"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 uppercase placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={flightTime}
                      onChange={(e) => setFlightTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              {/* Return Flight (Only if round trip) */}
              {direction === "round_trip" && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Plane className="h-4 w-4 rotate-180" />
                    <span>Return Flight Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Return Flight Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. J2 075"
                        value={returnFlightNumber}
                        onChange={(e) => setReturnFlightNumber(e.target.value.toUpperCase())}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 uppercase placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Return Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Return Flight Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Free Wait Time Notice */}
              <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 border border-blue-100">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <span className="font-bold">Complimentary Wait Time:</span> 60 minutes free waiting time from the actual touchdown time for international arrivals. For hotel pickups, 15 minutes complimentary waiting time is included.
                </div>
              </div>

              {/* Step 2 Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Continue to Passenger Info</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 3: Passenger Information</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Please provide the lead passenger contact details for driver communication and booking voucher.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Lead Passenger Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="As shown on passport / ID"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    The driver will hold a greeting sign with this name.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Number of Passengers *
                  </label>
                  <select
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                  {currentVehicle && passengerCount > currentVehicle.maxPax && (
                    <div className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        You selected <strong>{passengerCount} passengers</strong>, but <strong>{currentVehicle.label}</strong> comfortably accommodates up to <strong>{currentVehicle.maxPax} passengers</strong>.
                        {passengerCount <= 4 ? " We recommend selecting an SUV or Minivan." : " We recommend selecting our Minivan (up to 7 passengers)."}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="For booking confirmation & receipt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+994 50 123 4567 (with country code)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Driver will message or call upon landing.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Luggage & Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 1 baby child seat needed, 3 large golf bags, wheelchair assistance, etc."
                  value={luggageNotes}
                  onChange={(e) => setLuggageNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Step 3 Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromStep3}
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Review & Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 4 */}
          {step === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 4: Review Booking & Payment</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Verify your transfer details and choose your preferred payment method.
                </p>
              </div>

              {/* Summary Card */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentVehicle?.icon}</span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{currentVehicle?.label}</div>
                      <div className="text-[11px] text-slate-500">
                        {airportInfo?.fullName ?? airport}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1">
                      {direction === "arrival" ? "🛬 Arrival" : direction === "departure" ? "🛫 Departure" : "🔄 Round Trip"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Destination Zone:</span>
                    <p className="font-semibold text-slate-800">{currentZone?.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Specific Address:</span>
                    <p className="font-semibold text-slate-800">{dropoffAddress}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Flight:</span>
                    <p className="font-semibold text-slate-800">
                      {flightNumber} on {flightDate} at {flightTime}
                    </p>
                  </div>
                  {direction === "round_trip" && (
                    <div>
                      <span className="text-slate-400 font-medium">Return Flight:</span>
                      <p className="font-semibold text-slate-800">
                        {returnFlightNumber} on {returnDate} at {returnTime}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 font-medium">Lead Passenger:</span>
                    <p className="font-semibold text-slate-800">{passengerName} ({passengerCount} pax)</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Contact:</span>
                    <p className="font-semibold text-slate-800">{phoneNumber} · {email}</p>
                  </div>
                </div>

                {luggageNotes && (
                  <div className="pt-2 border-t border-sky-100 text-xs">
                    <span className="text-slate-400 font-medium">Special Notes:</span>
                    <p className="text-slate-700 italic mt-0.5">{luggageNotes}</p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>Transfer Rate ({currentVehicle?.label} — {currentZone?.name})</span>
                  <span>{isCustomZone ? "To be quoted" : `$${totalAmount.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>Airport meet & greet + 60 min wait time</span>
                  <span className="text-emerald-600 font-semibold">Included ($0.00)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>Highway tolls, fuel & parking</span>
                  <span className="text-emerald-600 font-semibold">Included ($0.00)</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Total Due:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-sky-700">
                      {isCustomZone ? "Custom Quote" : `$${totalAmount.toFixed(2)}`}
                    </span>
                    <div className="text-[10px] text-slate-400">All taxes & fees included</div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              {!isCustomZone && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Select Payment Method
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
                        <span className="font-bold text-sm text-slate-900">Pay Online via Card</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Instant card checkout with Payriff (Visa / Mastercard). Full refund if cancelled 24h before.
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
                        <span className="font-bold text-sm text-slate-900">Pay on Arrival (Cash)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Pay your driver in cash upon arrival. Accepted: USD, EUR, or Azerbaijani Manat (AZN).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="transferTerms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="transferTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree to the transfer booking policy, including 24-hour free cancellation and flight monitoring terms.
                </label>
              </div>

              {/* Step 4 Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setStep(3)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !agreedTerms}
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Booking...</span>
                    </>
                  ) : paymentMethod === "online" && !isCustomZone ? (
                    <>
                      <span>Proceed to Card Payment (${totalAmount})</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Confirm Reservation (Pay on Arrival)</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TransferBookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
          <div className="flex items-center gap-3 text-sky-700 font-semibold text-sm">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
            <span>Loading transfer booking system...</span>
          </div>
        </div>
      }
    >
      <TransferBookForm />
    </Suspense>
  );
}
