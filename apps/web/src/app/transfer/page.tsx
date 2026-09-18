"use client";

import { useState, useEffect } from "react";
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
import CurrencySelector from "@/components/CurrencySelector";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { CustomSelect } from "@/components/CustomSelect";
import { MapLocationPickerModal, MapLocationPickerResult } from "@/components/MapLocationPickerModal";
import {
  AIRPORTS,
  VEHICLE_CLASSES,
  getActiveVehicleClasses,
  TRANSFER_ZONES,
  AirportCode,
  VehicleClass,
  getZonesByAirport,
  getDestinationsByAirport,
  resolveLocationOrZone,
  calculateTransferPrice,
  calculateRoundTripPrice,
} from "@/lib/transfer-zones";
import {
  LOCALIZED_AIRPORTS,
  LOCALIZED_ZONES,
  LOCALIZED_DESTINATION_CATEGORIES,
  LOCALIZED_MAP_PICKER,
  LOCALIZED_AIRPORT_DESCRIPTIONS,
  LOCALIZED_TRANSFER_FAQS,
  LOCALIZED_VEHICLE_FEATURES,
  LOCALIZED_AIRPORT_CITIES,
} from "@/lib/pages-i18n";

export default function TransferLandingPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { settings } = useSiteSettings();

  const activeVehicles = getActiveVehicleClasses(settings.operations);

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

  // Estimator state
  const [selectedAirport, setSelectedAirport] = useState<AirportCode>("GYD");
  const [direction, setDirection] = useState<"arrival" | "departure" | "round_trip">("arrival");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("loc-jw-marriott");
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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

  // Dynamic vehicle translation helpers
  const getVehicleLabel = (id: VehicleClass) => {
    if (id === "sedan") return t.transferPage.sedan;
    if (id === "suv") return t.transferPage.suv;
    if (id === "sprinter") {
      return language === "AZ"
        ? "Mikroavtobus (Sprinter)"
        : language === "RU"
        ? "Микроавтобус (Sprinter)"
        : language === "AR"
        ? "حافلة صغيرة (Sprinter)"
        : "Minibus (Sprinter)";
    }
    return t.transferPage.minivan;
  };

  const getVehicleDesc = (id: VehicleClass) => {
    if (id === "sedan") return t.transferPage.sedanDesc;
    if (id === "suv") return t.transferPage.suvDesc;
    if (id === "sprinter") {
      return language === "AZ"
        ? "Böyük qruplar və turlar üçün 16 nəfərlik Mercedes-Benz Sprinter və ya analoqu."
        : language === "RU"
        ? "Mercedes-Benz Sprinter или аналог на 16 мест для больших групп и делегаций."
        : language === "AR"
        ? "مرسيدس سبرينتر أو ما يعادلها تتسع حتى 16 راكباً وحقائب كبيرة."
        : "Mercedes-Benz Sprinter or equivalent for up to 16 passengers and large luggage.";
    }
    return t.transferPage.minivanDesc;
  };

  const getVehicleCapacity = (id: VehicleClass) => {
    if (id === "sedan") return `1–3 ${t.transferPage.paxMax}`;
    if (id === "suv") return `1–4 ${t.transferPage.paxMax}`;
    if (id === "sprinter") return `8–16 ${t.transferPage.paxMax}`;
    return `4–7 ${t.transferPage.paxMax}`;
  };

  const getVehicleLuggage = (id: VehicleClass) => {
    if (id === "sedan") return `2 ${t.transferPage.bagsMax}`;
    if (id === "suv") return `4 ${t.transferPage.bagsMax}`;
    if (id === "sprinter") return `15 ${t.transferPage.bagsMax}`;
    return `6 ${t.transferPage.bagsMax}`;
  };

  // When airport changes, reset destination
  const handleAirportChange = (code: AirportCode) => {
    setSelectedAirport(code);
    const airportDests = getDestinationsByAirport(code);
    setSelectedLocationId(airportDests[0]?.id || "");
  };

  const { location: selectedLocation, zone: currentZone } = resolveLocationOrZone(
    selectedLocationId,
    selectedAirport
  );

  const destinationCategoryI18n =
    LOCALIZED_DESTINATION_CATEGORIES[language] || LOCALIZED_DESTINATION_CATEGORIES.EN;

  const destinationOptions = getDestinationsByAirport(selectedAirport).map((dest) => {
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

  const handleMapSelect = (result: MapLocationPickerResult) => {
    if (result.locationId) {
      setSelectedLocationId(result.locationId);
    } else {
      setSelectedLocationId(`custom:${result.address}`);
    }
  };

  const handleBookNow = (vehicleClass?: VehicleClass) => {
    const params = new URLSearchParams({
      airport: selectedAirport,
      direction,
      zone: currentZone.id,
    });
    if (selectedLocation) {
      params.set("location", selectedLocation.id);
      params.set("hotel", selectedLocation.name);
    } else if (selectedLocationId.startsWith("custom:")) {
      params.set("hotel", selectedLocationId.replace(/^custom:/, ""));
    }
    if (vehicleClass) {
      params.set("vehicle", vehicleClass);
    }
    router.push(`/transfer/book?${params.toString()}`);
  };

  const faqs = LOCALIZED_TRANSFER_FAQS[language] || LOCALIZED_TRANSFER_FAQS.EN;

  const directionShortLabels = {
    arrival: language === "AZ" ? "Gəliş" : language === "RU" ? "Прилет" : language === "FR" ? "Arrivée" : language === "AR" ? "وصول" : language === "DE" ? "Ankunft" : "Arrival",
    departure: language === "AZ" ? "Gediş" : language === "RU" ? "Вылет" : language === "FR" ? "Départ" : language === "AR" ? "مغادرة" : language === "DE" ? "Abflug" : "Departure",
    roundTrip: language === "AZ" ? "İkitərəfli" : language === "RU" ? "Туда-обратно" : language === "FR" ? "Aller-retour" : language === "AR" ? "ذهاب وإياب" : language === "DE" ? "Hin & Zurück" : "Round Trip",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex h-16 items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full shadow-inner" style={{ backgroundColor: "#0ea5e9" }}>
              <Car className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base sm:text-xl tracking-tight text-white">
              addmetour
            </span>
            <span className="hidden md:inline-block ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-sky-400/20 text-sky-200 border border-sky-300/30 whitespace-nowrap">
              {t.transferPage.headerBadge}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <Link
              href="/visa"
              className="hidden md:flex text-xs font-semibold text-amber-200 hover:text-white transition-colors items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 hover:bg-amber-500/20 shrink-0 whitespace-nowrap"
            >
              <FileText className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>{t.nav.evisa}</span>
            </Link>
            <Link
              href="/transfer/track"
              className="text-xs font-semibold text-sky-100 hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 shrink-0"
              title={t.nav.trackTransfer}
              aria-label={t.nav.trackTransfer}
            >
              <Search className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t.nav.trackTransfer}</span>
            </Link>
            <Link
              href="/transfer/book"
              aria-label="Book Airport Transfer"
              className="rounded-full px-2.5 sm:px-5 py-1.5 sm:py-2 text-xs font-bold transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-1 sm:gap-1.5 text-white shrink-0 whitespace-nowrap"
              style={{ backgroundColor: "#0284c7" }}
            >
              <span className="hidden sm:inline">{t.nav.bookTransfer}</span>
              <span className="sm:hidden">{t.tours.bookNow || "Book"}</span>
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO */}
      <section className="relative z-10 py-12 sm:py-16 md:py-24" style={{ backgroundColor: "#0f3460" }}>
        {/* Background glow effects container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="container-section relative z-10 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-1.5 text-xs font-semibold text-sky-300 mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span>{t.transferPage.heroBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight break-words">
              {t.transferPage.heroTitle}
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-sky-100/85 max-w-2xl mx-auto leading-relaxed">
              {t.transferPage.heroDesc}
            </p>
          </div>

          {/* ══════════════ ROUTE & LIVE PRICE CALCULATOR WIDGET ══════════════ */}
          <div className="rounded-2xl bg-white p-4 sm:p-8 shadow-2xl border border-sky-100 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0" />
                <span>{t.transferPage.calcTitle}</span>
              </h2>
              {/* Direction toggle */}
              <div className="w-full sm:w-auto grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setDirection("arrival")}
                  className={`rounded-lg px-2 sm:px-3 py-2 sm:py-1.5 transition-all cursor-pointer text-center truncate ${
                    direction === "arrival"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  <span className="sm:hidden text-[11px] font-bold">🛬 {directionShortLabels.arrival}</span>
                  <span className="hidden sm:inline">🛬 {t.transferPage.arrival}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("departure")}
                  className={`rounded-lg px-2 sm:px-3 py-2 sm:py-1.5 transition-all cursor-pointer text-center truncate ${
                    direction === "departure"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  <span className="sm:hidden text-[11px] font-bold">🛫 {directionShortLabels.departure}</span>
                  <span className="hidden sm:inline">🛫 {t.transferPage.departure}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("round_trip")}
                  className={`rounded-lg px-2 sm:px-3 py-2 sm:py-1.5 transition-all cursor-pointer text-center truncate ${
                    direction === "round_trip"
                      ? "bg-sky-600 text-white shadow-sm"
                      : "hover:text-slate-900"
                  }`}
                >
                  <span className="sm:hidden text-[11px] font-bold">🔄 {directionShortLabels.roundTrip}</span>
                  <span className="hidden sm:inline">🔄 {t.transferPage.roundTrip}</span>
                </button>
              </div>
            </div>

            {/* Selectors Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Airport Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5 min-h-[24px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 leading-none">
                    {t.transferPage.airport}
                  </label>
                </div>
                <CustomSelect
                  value={selectedAirport}
                  onChange={(val) => handleAirportChange(val as AirportCode)}
                  options={AIRPORTS.map((a) => ({
                    value: a.code,
                    label: LOCALIZED_AIRPORTS[language]?.[a.code] || a.fullName,
                  }))}
                />
              </div>

              {/* Destination Zone Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5 min-h-[24px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 leading-none">
                    {t.transferPage.destinationZone}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-lg border border-sky-200 transition-colors shadow-2xs cursor-pointer leading-none"
                  >
                    <span>🗺️</span>
                    <span>{destinationCategoryI18n.pickOnMap}</span>
                  </button>
                </div>
                <CustomSelect
                  value={selectedLocationId}
                  onChange={(val) => setSelectedLocationId(String(val))}
                  options={destinationOptions}
                  searchable={true}
                  searchPlaceholder={destinationCategoryI18n.searchPlaceholder}
                  allowCustomValue={true}
                  customValueLabelPrefix={destinationCategoryI18n.useCustomPrefix}
                  onOpenMapPicker={() => setIsMapModalOpen(true)}
                  mapPickerLabel={destinationCategoryI18n.pickOnMap}
                />
              </div>
            </div>

            {/* Vehicle Options Grid with Live Pricing */}
            <div className={`grid gap-4 pt-2 ${
              activeVehicles.length === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : activeVehicles.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : activeVehicles.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-3"
            }`}>
              {activeVehicles.map((vc) => {
                let priceObj = currentZone
                  ? direction === "round_trip"
                    ? calculateRoundTripPrice(currentZone, vc.id, dynamicPricingConfig)
                    : calculateTransferPrice(currentZone, vc.id, dynamicPricingConfig)
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
                          <Users className="h-3 w-3" /> {getVehicleCapacity(vc.id)}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">{getVehicleLabel(vc.id)}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {getVehicleDesc(vc.id)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {direction === "round_trip" ? t.transferPage.roundTripLabel : t.transferPage.oneWay}
                        </div>
                        <div className="text-lg font-extrabold text-sky-700">
                          {isCustom ? (
                            <span className="text-xs font-semibold text-slate-600">{t.transferPage.quoteOnRequest}</span>
                          ) : priceObj ? (
                            formatPrice(priceObj.totalAmount)
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
                        {t.transferPage.selectVehicle}
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
                  <span className="font-bold text-slate-800">{t.transferPage.allInclusiveTitle}</span> {t.transferPage.allInclusiveDesc}
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
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f1Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f5Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f5Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f3Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f2Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f4Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f4Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white mb-4 shadow-sm">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1.5">{t.transferPage.f6Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.transferPage.f6Desc}
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
              {t.transferPage.fleetBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {t.transferPage.fleetTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {t.transferPage.fleetSubtitle}
            </p>
          </div>

          <div className={`grid gap-6 ${
            activeVehicles.length === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : activeVehicles.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : activeVehicles.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-3"
          }`}>
            {activeVehicles.map((vc) => {
              const baseMap = dynamicPricingConfig.baseRates as Record<string, number>;
              const perKmMap = dynamicPricingConfig.perKmRates as Record<string, number>;
              const currentBaseRate = baseMap[vc.id] ?? vc.baseRate;
              const currentPerKmRate = perKmMap[vc.id] ?? vc.perKmRate;

              return (
                <div
                  key={vc.id}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{vc.icon}</div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{getVehicleLabel(vc.id)}</h3>
                          <p className="text-xs text-slate-500">{getVehicleDesc(vc.id)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 border-y border-slate-100 py-3">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-sky-600" />
                        <span className="font-semibold">{getVehicleCapacity(vc.id)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-sky-600" />
                        <span className="font-semibold">{getVehicleLuggage(vc.id)}</span>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {(LOCALIZED_VEHICLE_FEATURES[language]?.[vc.id] || vc.features).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">{t.transferPage.startingFrom}</span>
                      <div className="text-xl font-extrabold text-slate-900">
                        ${currentBaseRate}{" "}
                        <span className="text-xs font-normal text-slate-500">{t.transferPage.baseFee} + ${currentPerKmRate.toFixed(2)}/{t.transferPage.perKm}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBookNow(vc.id)}
                      className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span>{t.transferPage.bookVehicle} {getVehicleLabel(vc.id)}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ AIRPORTS COVERED */}
      <section className="py-16 bg-white border-b border-sky-100">
        <div className="container-section max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              {t.transferPage.airportsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {t.transferPage.airportsTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {t.transferPage.airportsDesc}
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
                    <span className="text-xs font-semibold text-slate-500">
                      {LOCALIZED_AIRPORT_CITIES[language]?.[airport.code] || airport.city}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {LOCALIZED_AIRPORTS[language]?.[airport.code] || airport.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">
                    {LOCALIZED_AIRPORT_DESCRIPTIONS[language]?.[airport.code] || ""}
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
                    <span>{t.transferPage.bookFrom} {airport.code}</span>
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
              {t.transferPage.faqSubtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              {t.transferPage.faqTitle}
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
            {t.transferPage.bottomTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-sky-100/80 max-w-xl mx-auto leading-relaxed">
            {t.transferPage.bottomDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/transfer/book"
              className="w-full sm:w-auto rounded-full px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0284c7" }}
            >
              <span>{t.transferPage.bottomBookBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/transfer/track"
              className="w-full sm:w-auto rounded-full border border-sky-300/40 px-6 py-3 text-sm font-semibold text-sky-200 hover:bg-white/10 transition-all text-center"
            >
              {t.transferPage.bottomTrackBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Map Location Picker Modal */}
      <MapLocationPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSelectLocation={handleMapSelect}
        airportCode={selectedAirport}
        initialLocationId={selectedLocationId}
      />
    </div>
  );
}
