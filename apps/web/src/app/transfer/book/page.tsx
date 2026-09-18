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
  getDestinationsByAirport,
  getLocationById,
  resolveLocationOrZone,
  calculateTransferPrice,
  calculateRoundTripPrice,
  getAirportByCode,
  getVehicleConfig,
} from "@/lib/transfer-zones";
import {
  LOCALIZED_AIRPORTS,
  LOCALIZED_ZONES,
  LOCALIZED_DESTINATION_CATEGORIES,
  TRANSFER_BOOK_TRANSLATIONS,
} from "@/lib/pages-i18n";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";
import { CustomSelect } from "@/components/CustomSelect";

function TransferBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language, showToast } = useLanguage();
  const tb = (TRANSFER_BOOK_TRANSLATIONS[language] || TRANSFER_BOOK_TRANSLATIONS.EN)!;

  // Dynamic vehicle translation helpers
  const getVehicleLabel = (id: VehicleClass) => {
    if (id === "sedan") return t.transferPage.sedan;
    if (id === "suv") return t.transferPage.suv;
    return t.transferPage.minivan;
  };

  const getVehicleDesc = (id: VehicleClass) => {
    if (id === "sedan") return t.transferPage.sedanDesc;
    if (id === "suv") return t.transferPage.suvDesc;
    return t.transferPage.minivanDesc;
  };

  const getVehicleCapacity = (id: VehicleClass) => {
    if (id === "sedan") return `1–3 ${t.transferPage.paxMax}`;
    if (id === "suv") return `1–4 ${t.transferPage.paxMax}`;
    return `4–7 ${t.transferPage.paxMax}`;
  };

  const getVehicleLuggage = (id: VehicleClass) => {
    if (id === "sedan") return `2 ${t.transferPage.bagsMax}`;
    if (id === "suv") return `4 ${t.transferPage.bagsMax}`;
    return `6 ${t.transferPage.bagsMax}`;
  };

  // Query param defaults
  const paramAirport = (searchParams.get("airport") as AirportCode) || "GYD";
  const paramDirection = (searchParams.get("direction") as "arrival" | "departure" | "round_trip") || "arrival";
  const paramZone = searchParams.get("zone") || "";
  const paramLocation = searchParams.get("location") || "";
  const paramHotel = searchParams.get("hotel") || "";
  const paramVehicle = (searchParams.get("vehicle") as VehicleClass) || "sedan";

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Step 1: Route & Vehicle
  const initialLocationObj = paramLocation ? getLocationById(paramLocation) : undefined;
  const initialLocationId = paramLocation || paramZone || "loc-jw-marriott";
  const initialAddress = paramHotel || (initialLocationObj ? (initialLocationObj.address || initialLocationObj.name) : "");

  const [airport, setAirport] = useState<AirportCode>(paramAirport);
  const [direction, setDirection] = useState<"arrival" | "departure" | "round_trip">(paramDirection);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(initialLocationId);
  const [dropoffAddress, setDropoffAddress] = useState<string>(initialAddress);
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

  const [invalidField, setInvalidField] = useState<string | null>(null);

  const triggerValidationError = (msg: string, fieldId?: string) => {
    showToast(msg, "error");
    if (fieldId) {
      setInvalidField(fieldId);
      setTimeout(() => {
        const el = document.getElementById(fieldId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        }
      }, 80);
    }
  };

  const { location: selectedLocation, zone: currentZone } = resolveLocationOrZone(
    selectedDestinationId,
    airport
  );
  const zoneId = currentZone.id;

  const handleAirportChange = (code: AirportCode) => {
    setAirport(code);
    const dests = getDestinationsByAirport(code);
    if (dests.length > 0 && dests[0]) {
      setSelectedDestinationId(dests[0].id);
      setDropoffAddress(dests[0].address || dests[0].name);
    }
  };

  const handleDestinationChange = (val: string) => {
    setSelectedDestinationId(val);
    if (val.startsWith("custom:")) {
      const customName = val.replace(/^custom:/, "");
      setDropoffAddress(customName);
    } else {
      const loc = getLocationById(val);
      if (loc) {
        setDropoffAddress(loc.address || loc.name);
      }
    }
  };

  const destinationCategoryI18n =
    LOCALIZED_DESTINATION_CATEGORIES[language] || LOCALIZED_DESTINATION_CATEGORIES.EN;

  const destinationOptions = getDestinationsByAirport(airport).map((dest) => {
    const groupLabel = destinationCategoryI18n[dest.category] || dest.category;
    const destZone = TRANSFER_ZONES.find((z) => z.id === dest.zoneId);
    const distanceStr =
      destZone && destZone.distanceKm > 0 ? `~${destZone.distanceKm} km` : undefined;

    return {
      value: dest.id,
      label: dest.name,
      description: dest.address,
      badge: dest.badge || distanceStr,
      group: groupLabel,
      aliases: dest.aliases,
    };
  });

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

    setInvalidField(null);
    if (!dropoffAddress.trim()) {
      triggerValidationError(tb.errAddressRequired, "dropoffAddress");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep2 = () => {

    setInvalidField(null);
    if (!flightNumber.trim()) {
      triggerValidationError(tb.errFlightNumRequired, "flightNumber");
      return;
    }
    if (!flightDate) {
      triggerValidationError(tb.errFlightDateRequired, "flightDate");
      return;
    }
    if (!flightTime) {
      triggerValidationError(tb.errFlightTimeRequired, "flightTime");
      return;
    }
    if (direction === "round_trip") {
      if (!returnFlightNumber.trim()) {
        triggerValidationError(tb.errReturnFlightRequired, "returnFlightNumber");
        return;
      }
      if (!returnDate) {
        triggerValidationError(tb.errReturnFlightRequired, "returnDate");
        return;
      }
      if (!returnTime) {
        triggerValidationError(tb.errReturnFlightRequired, "returnTime");
        return;
      }
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep3 = () => {

    setInvalidField(null);
    if (!passengerName.trim()) {
      triggerValidationError(tb.errEnterName, "passengerName");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      triggerValidationError(tb.errValidEmail, "email");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      triggerValidationError(tb.errValidPhone, "phoneNumber");
      return;
    }
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!agreedTerms) {
      triggerValidationError(tb.errAcceptTerms, "agreedTerms");
      return;
    }

    setIsSubmitting(true);

    setInvalidField(null);

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
        signal: AbortSignal.timeout(15000),
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
      const trackTarget =
        data.trackUrl ||
        `/transfer/track?ref=${encodeURIComponent(data.bookingNumber)}&email=${encodeURIComponent(payload.email)}&confirmed=true`;
      window.location.href = trackTarget;
      return;
    } catch (err: any) {
      console.error("Booking error:", err);
      const msg = err?.message || "An unexpected error occurred. Please try again.";
      showToast(msg, "error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#f0f9ff" }}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex h-16 items-center justify-between">
          <Link href="/transfer" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#0ea5e9" }}>
              <Car className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
              addmetour
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-sky-400/20 text-sky-200 border border-sky-300/30 whitespace-nowrap">
              {t.transferPage.headerBadge}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSelector variant="dark" />
            <Link
              href="/transfer"
              className="text-xs font-semibold text-sky-200 hover:text-white flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.transferPage.headerBadge}</span>
              <span className="sm:hidden">{t.transferPage.back}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="container-section max-w-4xl mx-auto pt-8">
        {/* Progress Stepper */}
        <div className="mb-8 rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-sky-100">
          <div className="flex items-center justify-between relative">
            {/* Background connecting track */}
            <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block" />
            {/* Active completed progress fill */}
            <div
              className="absolute top-[18px] left-[12.5%] h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
              style={{
                width: `${((Math.min(step, 4) - 1) / 3) * 75}%`,
              }}
            />
            {[
              { num: 1, title: tb.step1Nav },
              { num: 2, title: tb.step2Nav },
              { num: 3, title: tb.step3Nav },
              { num: 4, title: tb.step4Nav },
            ].map((s) => {
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm ${
                      isDone
                        ? "bg-emerald-500 text-white shadow-emerald-200"
                        : isCurrent
                        ? "bg-sky-600 text-white ring-4 ring-sky-100 shadow-sky-200"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-semibold text-center hidden sm:block ${
                      isCurrent ? "text-sky-700 font-bold" : isDone ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>



        {/* Form Body */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-sky-100">
          {/* ═══════════════════════════════════════════════════════ STEP 1 */}
          {step === 1 && (
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.transferPage.airport}
                  </label>
                  <CustomSelect
                    value={airport}
                    onChange={(val) => handleAirportChange(val as AirportCode)}
                    options={AIRPORTS.map((a) => ({
                      value: a.code,
                      label: LOCALIZED_AIRPORTS[language]?.[a.code] || a.fullName,
                      badge: a.code,
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.transferPage.destinationZone}
                  </label>
                  <CustomSelect
                    value={selectedDestinationId}
                    onChange={(val) => handleDestinationChange(String(val))}
                    options={destinationOptions}
                    searchable={true}
                    searchPlaceholder={destinationCategoryI18n.searchPlaceholder}
                    allowCustomValue={true}
                    customValueLabelPrefix={destinationCategoryI18n.useCustomPrefix}
                  />
                </div>
              </div>

              {/* Exact hotel / dropoff address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {direction === "departure" ? tb.pickupAddressLabel : tb.dropoffAddressLabel} *
                </label>
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
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{tb.step2Title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tb.step2Desc}
                </p>
              </div>

              {/* Primary Flight */}
              <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Plane className="h-4 w-4" />
                  <span>
                    {direction === "departure" ? tb.depFlightInfo : tb.arrFlightInfo}
                  </span>
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
                      minDate={new Date().toISOString().split("T")[0]}
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
                      hasError={invalidField === "flightTime"}
                      onChange={(val) => {
                        setFlightTime(val);
                        if (invalidField === "flightTime") setInvalidField(null);
                      }}
                    />
                  </div>
                </div>
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
                        minDate={flightDate || new Date().toISOString().split("T")[0]}
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
                        hasError={invalidField === "returnTime"}
                        onChange={(val) => {
                          setReturnTime(val);
                          if (invalidField === "returnTime") setInvalidField(null);
                        }}
                      />
                    </div>
                  </div>
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
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 3 */}
          {step === 3 && (
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
          )}

          {/* ═══════════════════════════════════════════════════════ STEP 4 */}
          {step === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{tb.step4Title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tb.step4Desc}
                </p>
              </div>

              {/* Summary Card */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentVehicle?.icon}</span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{getVehicleLabel(vehicleClass)}</div>
                      <div className="text-[11px] text-slate-500">
                        {LOCALIZED_AIRPORTS[language]?.[airport] || airportInfo?.fullName || airport}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1">
                      {direction === "arrival" ? `🛬 ${t.transferPage.arrival}` : direction === "departure" ? `🛫 ${t.transferPage.departure}` : `🔄 ${t.transferPage.roundTripLabel}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">{tb.destZoneLabel}</span>
                    <p className="font-semibold text-slate-800">{LOCALIZED_ZONES[language]?.[currentZone?.id || ""] || currentZone?.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.addressLabel}</span>
                    <p className="font-semibold text-slate-800">{dropoffAddress}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.flightLabel}</span>
                    <p className="font-semibold text-slate-800">
                      {flightNumber} · {flightDate} {flightTime}
                    </p>
                  </div>
                  {direction === "round_trip" && (
                    <div>
                      <span className="text-slate-400 font-medium">{tb.returnFlightLabel}</span>
                      <p className="font-semibold text-slate-800">
                        {returnFlightNumber} · {returnDate} {returnTime}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 font-medium">{tb.leadPaxLabel}</span>
                    <p className="font-semibold text-slate-800">{passengerName} ({passengerCount} {passengerCount === 1 ? tb.paxUnitSingle : tb.paxUnitPlural})</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{tb.contactLabel}</span>
                    <p className="font-semibold text-slate-800">{phoneNumber} · {email}</p>
                  </div>
                </div>

                {luggageNotes && (
                  <div className="pt-2 border-t border-sky-100 text-xs">
                    <span className="text-slate-400 font-medium">{tb.notesLabelReview}</span>
                    <p className="text-slate-700 italic mt-0.5">{luggageNotes}</p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.rateLabel} ({getVehicleLabel(vehicleClass)} — {LOCALIZED_ZONES[language]?.[currentZone?.id || ""] || currentZone?.name})</span>
                  <span>{isCustomZone ? tb.toBeQuoted : `$${totalAmount.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.meetGreetFree}</span>
                  <span className="text-emerald-600 font-semibold">{tb.includedFree}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{tb.tollsFuelFree}</span>
                  <span className="text-emerald-600 font-semibold">{tb.includedFree}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{tb.totalDue}</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-sky-700">
                      {isCustomZone ? t.transferPage.customQuoteText : `$${totalAmount.toFixed(2)}`}
                    </span>
                    {!isCustomZone && (
                      <span className="block text-xs font-semibold text-slate-600">
                        (~{(totalAmount * 1.7).toFixed(2)} AZN)
                      </span>
                    )}
                    <div className="text-[10px] text-slate-400">{tb.allTaxesInc}</div>
                  </div>
                </div>
                {!isCustomZone && (
                  <p className="text-[10px] text-slate-400 mt-2 border-t border-slate-100 pt-1.5 leading-relaxed">
                    {tb.payriffDesc}
                  </p>
                )}
              </div>

              {/* Payment Method Selector */}
              {!isCustomZone && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {tb.payMethodLabel}
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
                        <span className="font-bold text-sm text-slate-900">{tb.payOnlineTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {tb.payOnlineDesc}
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
                        <span className="font-bold text-sm text-slate-900">{tb.payCashTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {tb.payCashDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms checkbox */}
              <div
                id="agreedTerms"
                className={`flex items-start gap-2.5 p-3.5 rounded-xl border transition-all ${
                  invalidField === "agreedTerms"
                    ? "border-red-400 bg-red-50/60 ring-2 ring-red-200 animate-shake"
                    : "border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  id="transferTerms"
                  checked={agreedTerms}
                  onChange={(e) => {
                    setAgreedTerms(e.target.checked);
                    if (invalidField === "agreedTerms") setInvalidField(null);

                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="transferTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  {tb.termsCheckbox}
                </label>
              </div>

              {/* Step 4 Buttons & Bottom Inline Feedback */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {

                    setInvalidField(null);
                    setStep(3);
                  }}
                  className="w-full sm:w-auto justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{tb.btnBack}</span>
                </button>



                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto justify-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-xs font-bold transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{tb.btnSubmitting}</span>
                    </>
                  ) : paymentMethod === "online" && !isCustomZone ? (
                    <>
                      <span>{tb.btnPayCard} (${totalAmount})</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : isCustomZone ? (
                    <>
                      <span>{tb.btnRequestQuote}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>{tb.btnConfirmCash} (${totalAmount})</span>
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
