"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";
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
  LOCALIZED_MAP_PICKER,
  TRANSFER_BOOK_TRANSLATIONS,
} from "@/lib/pages-i18n";
import { MapLocationPickerModal, MapLocationPickerResult } from "@/components/MapLocationPickerModal";
import { TransferPolicyModal } from "@/components/TransferPolicyModal";
import {
  TransferBookHeader,
  TransferBookProgress,
  RouteAndVehicleStep,
  FlightDetailsStep,
  PassengerDetailsStep,
  TransferSummaryStep,
} from "./_components";

function TransferBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language, showToast } = useLanguage();
  const tb = (TRANSFER_BOOK_TRANSLATIONS[language] || TRANSFER_BOOK_TRANSLATIONS.EN)!;

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);

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
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

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
      const rest = val.replace(/^custom:/, "").trim();
      const firstColonIdx = rest.indexOf(":");
      if (firstColonIdx > 0 && rest.substring(0, firstColonIdx).includes("-")) {
        setDropoffAddress(rest.substring(firstColonIdx + 1).trim());
      } else {
        setDropoffAddress(rest);
      }
    } else {
      const loc = getLocationById(val);
      if (loc) {
        setDropoffAddress(loc.address || loc.name);
      }
    }
  };

  const handleMapSelect = (result: MapLocationPickerResult) => {
    setDropoffAddress(result.address);
    if (result.locationId) {
      setSelectedDestinationId(result.locationId);
    } else if (result.zoneId) {
      setSelectedDestinationId(`custom:${result.zoneId}:${result.address}`);
    } else {
      setSelectedDestinationId(`custom:${result.address}`);
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

  const { settings } = useSiteSettings();

  const dynamicPricingConfig = {
    baseRates: {
      sedan: settings.pricing.transferSedan,
      suv: settings.pricing.transferSuv,
      minivan: settings.pricing.transferMinivan,
      sprinter: settings.pricing.transferSprinter,
    },
    perKmRates: {
      sedan: settings.pricing.transferPerKmSedan,
      suv: settings.pricing.transferPerKmSuv,
      minivan: settings.pricing.transferPerKmMinivan,
      sprinter: settings.pricing.transferPerKmSprinter,
    },
    roundTripDiscountPercent: settings.pricing.transferRoundTripDiscountPercent,
  };

  const currentVehicle = getVehicleConfig(vehicleClass) || VEHICLE_CLASSES[0];
  const airportInfo = getAirportByCode(airport) || AIRPORTS[0];

  // Pricing calculation
  const isCustomZone = currentZone?.isCustom;
  const pricing = currentZone
    ? direction === "round_trip"
      ? calculateRoundTripPrice(currentZone, vehicleClass, dynamicPricingConfig)
      : calculateTransferPrice(currentZone, vehicleClass, dynamicPricingConfig)
    : null;

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
      <TransferBookHeader isScrolled={isScrolled} />

      {/* Main Form Container */}
      <div className="container-section max-w-4xl mx-auto pt-8">
        {/* Progress Stepper */}
        <TransferBookProgress step={step} tb={tb} />

        {/* Form Body */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-sky-100">
          {step === 1 && (
            <RouteAndVehicleStep
              direction={direction}
              setDirection={setDirection}
              airport={airport}
              handleAirportChange={handleAirportChange}
              selectedDestinationId={selectedDestinationId}
              handleDestinationChange={handleDestinationChange}
              destinationOptions={destinationOptions}
              dropoffAddress={dropoffAddress}
              setDropoffAddress={setDropoffAddress}
              vehicleClass={vehicleClass}
              setVehicleClass={setVehicleClass}
              currentZone={currentZone}
              dynamicPricingConfig={dynamicPricingConfig}
              isCustomZone={Boolean(isCustomZone)}
              invalidField={invalidField}
              setInvalidField={setInvalidField}
              setIsMapModalOpen={setIsMapModalOpen}
              destinationCategoryI18n={destinationCategoryI18n}
              tb={tb}
              t={t}
              language={language}
              getVehicleLabel={getVehicleLabel}
              getVehicleDesc={getVehicleDesc}
              getVehicleCapacity={getVehicleCapacity}
              getVehicleLuggage={getVehicleLuggage}
              handleNextFromStep1={handleNextFromStep1}
            />
          )}

          {step === 2 && (
            <FlightDetailsStep
              direction={direction}
              flightNumber={flightNumber}
              setFlightNumber={setFlightNumber}
              flightDate={flightDate}
              setFlightDate={setFlightDate}
              flightTime={flightTime}
              setFlightTime={setFlightTime}
              returnFlightNumber={returnFlightNumber}
              setReturnFlightNumber={setReturnFlightNumber}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              returnTime={returnTime}
              setReturnTime={setReturnTime}
              invalidField={invalidField}
              setInvalidField={setInvalidField}
              tb={tb}
              t={t}
              setStep={setStep}
              handleNextFromStep2={handleNextFromStep2}
            />
          )}

          {step === 3 && (
            <PassengerDetailsStep
              passengerName={passengerName}
              setPassengerName={setPassengerName}
              passengerCount={passengerCount}
              setPassengerCount={setPassengerCount}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              luggageNotes={luggageNotes}
              setLuggageNotes={setLuggageNotes}
              invalidField={invalidField}
              setInvalidField={setInvalidField}
              currentVehicle={currentVehicle}
              tb={tb}
              t={t}
              getVehicleLabel={getVehicleLabel}
              setStep={setStep}
              handleNextFromStep3={handleNextFromStep3}
            />
          )}

          {step === 4 && (
            <TransferSummaryStep
              direction={direction}
              airport={airport}
              airportInfo={airportInfo}
              currentZone={currentZone}
              selectedLocation={selectedLocation}
              dropoffAddress={dropoffAddress}
              flightNumber={flightNumber}
              flightDate={flightDate}
              flightTime={flightTime}
              returnFlightNumber={returnFlightNumber}
              returnDate={returnDate}
              returnTime={returnTime}
              passengerName={passengerName}
              passengerCount={passengerCount}
              email={email}
              phoneNumber={phoneNumber}
              luggageNotes={luggageNotes}
              currentVehicle={currentVehicle}
              vehicleClass={vehicleClass}
              pricing={pricing}
              isCustomZone={Boolean(isCustomZone)}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              agreedTerms={agreedTerms}
              setAgreedTerms={setAgreedTerms}
              isSubmitting={isSubmitting}
              invalidField={invalidField}
              setInvalidField={setInvalidField}
              setIsPolicyModalOpen={setIsPolicyModalOpen}
              handleSubmitBooking={handleSubmitBooking}
              setStep={setStep}
              tb={tb}
              t={t}
              language={language}
              getVehicleLabel={getVehicleLabel}
            />
          )}
        </div>
      </div>

      {/* Interactive Map Location Picker Modal */}
      <MapLocationPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSelectLocation={handleMapSelect}
        airportCode={airport}
        initialLocationId={selectedDestinationId}
        initialAddress={dropoffAddress}
      />

      {/* Transfer Policy & Guarantee Modal */}
      <TransferPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onAccept={() => setAgreedTerms(true)}
      />
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
