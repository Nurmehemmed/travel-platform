"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles, Calendar, Users, MapPin, Hotel, Car, Check,
  MessageCircle, ArrowRight, ArrowLeft, ShieldCheck, Star,
  Compass, CheckCircle2, ChevronRight, PhoneCall, Heart, Award
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import { DatePicker } from "@/components/DatePicker";

interface DestinationTheme {
  id: string;
  name: string;
  region: string;
  image: string;
  tag: string;
  desc: string;
}

const DESTINATION_OPTIONS: DestinationTheme[] = [
  {
    id: "baku_city",
    name: "Baku Old City & Modern Marvels",
    region: "Absheron / Caspian Coast",
    image: "/images/baku-maiden-tower-wide.jpg",
    tag: "Cultural & UNESCO",
    desc: "12th-century Maiden Tower, Shirvanshahs Palace, Zaha Hadid Center & Flame Towers.",
  },
  {
    id: "gabala_highlands",
    name: "Gabala & Great Caucasus Peaks",
    region: "Northern Highlands",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    tag: "Alpine Nature",
    desc: "Tufandag Mountain cable cars, mirror-like Nohur Lake, and 5th-century Lahij artisan village.",
  },
  {
    id: "sheki_silk_road",
    name: "Sheki & Ancient Silk Road",
    region: "Northwestern Foothills",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "UNESCO Palace",
    desc: "18th-century Sheki Khan Palace with stained glass Shebeke and medieval caravanserais.",
  },
  {
    id: "gobustan_volcanoes",
    name: "Gobustan Mud Volcanoes & Land of Fire",
    region: "Southern Desert / Peninsula",
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80",
    tag: "Extraterrestrial Nature",
    desc: "Active bubbling cold mud volcano craters and 40,000-year-old prehistoric rock petroglyphs.",
  },
  {
    id: "shahdag_resort",
    name: "Shahdag Mountain Resort & Gusar",
    region: "High Caucasus (2,500m)",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    tag: "Luxury Alpine",
    desc: "Year-round ski, mountain roller-coaster, luxury wellness SPA, and canyon hiking.",
  },
  {
    id: "naftalan_spa",
    name: "Naftalan Healing Petroleum SPA",
    region: "Western Azerbaijan",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    tag: "Health & Wellness",
    desc: "World's only therapeutic crude petroleum baths for arthritis, dermatology, and revitalization.",
  },
  {
    id: "khinalug_village",
    name: "Guba & Khinalug Highland Village",
    region: "Europe's Highest Village (2,350m)",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    tag: "Living Ancient Culture",
    desc: "UNESCO remote eagle's nest stone settlement inhabited continuously for 5,000 years.",
  },
  {
    id: "caucasus_combo",
    name: "Trans-Caucasus (Azerbaijan + Georgia + Turkey)",
    region: "Multi-Country Route",
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&q=80",
    tag: "3 Countries in 1",
    desc: "Seamless Silk Road journey: Baku → Sheki → Tbilisi → Kazbegi → Istanbul.",
  },
];

interface HotelTierOption {
  id: string;
  name: string;
  stars: string;
  desc: string;
  multiplier: number;
  sampleHotels: string;
}

const HOTEL_TIERS: HotelTierOption[] = [
  {
    id: "boutique_3",
    name: "Heritage Boutique & 3-Star Comfort",
    stars: "★★★",
    desc: "Charming traditional hotels located inside historic Old City quarters.",
    multiplier: 1.0,
    sampleHotels: "Sultan Inn, Old Street Boutique, Sheki Caravanserai",
  },
  {
    id: "comfort_4",
    name: "4-Star Deluxe Comfort (Most Popular)",
    stars: "★★★★",
    desc: "Modern premium hotels with scenic city/mountain views and full buffet breakfast.",
    multiplier: 1.35,
    sampleHotels: "Courtyard by Marriott, Shahdag Hotel & Spa, Qafqaz Riverside",
  },
  {
    id: "luxury_5",
    name: "5-Star VIP Luxury & Presidential Suites",
    stars: "★★★★★",
    desc: "World-class luxury properties with private concierge and premier wellness facilities.",
    multiplier: 1.95,
    sampleHotels: "Four Seasons Baku, JW Marriott Absheron, Pik Palace Shahdag",
  },
];

interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  desc: string;
  extraPerDay: number;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "sedan",
    name: "Mercedes E-Class / Premium Sedan",
    capacity: "1–3 Passengers",
    desc: "Sleek executive comfort for couples or solo travelers.",
    extraPerDay: 0,
  },
  {
    id: "suv",
    name: "Toyota Prado 4x4 / Luxury SUV",
    capacity: "1–4 Passengers",
    desc: "High-clearance all-wheel drive for mountain passes and rugged highlands.",
    extraPerDay: 25,
  },
  {
    id: "vclass",
    name: "Mercedes V-Class VIP Van (Top Pick)",
    capacity: "4–7 Passengers",
    desc: "Executive leather captain seats, panoramic roof, WiFi, and large luggage hold.",
    extraPerDay: 45,
  },
  {
    id: "sprinter",
    name: "Mercedes VIP Sprinter Minibus",
    capacity: "8–16 Passengers",
    desc: "Spacious luxury coach for extended families and group delegations.",
    extraPerDay: 80,
  },
];

export default function CustomItineraryClient() {
  const { t, isRtl, language, showToast } = useLanguage();
  const { formatPrice, formatPriceWithSubtext, activeCurrency } = useCurrency();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isScrolled, setIsScrolled] = useState(false);

  // Form selections
  const [durationDays, setDurationDays] = useState(5);
  const [arrivalDate, setArrivalDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0]!;
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [selectedDestIds, setSelectedDestIds] = useState<string[]>([
    "baku_city",
    "gabala_highlands",
    "sheki_silk_road",
  ]);

  const [selectedHotelTier, setSelectedHotelTier] = useState("comfort_4");
  const [selectedVehicle, setSelectedVehicle] = useState("vclass");

  // Lead submission state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDestination = (id: string) => {
    setSelectedDestIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const hotelObj = HOTEL_TIERS.find((h) => h.id === selectedHotelTier) || HOTEL_TIERS[1]!;
  const vehicleObj = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle) || VEHICLE_OPTIONS[2]!;

  // Dynamic Price Estimation Algorithm
  const totalGuests = adults + children;
  const baseDayCostPerPerson = 95; // Base private guide + vehicle + logistics
  const hotelCostPerNightPerRoom = 80 * hotelObj.multiplier;
  const roomsNeeded = Math.ceil(totalGuests / 2);
  const totalHotelCost = hotelCostPerNightPerRoom * (durationDays - 1) * roomsNeeded;
  const totalTransportCost = (baseDayCostPerPerson * adults + baseDayCostPerPerson * 0.5 * children + vehicleObj.extraPerDay) * durationDays;
  const rawEstimatedUSD = Math.round(totalHotelCost + totalTransportCost);

  const buildWhatsAppMessage = () => {
    const destNames = selectedDestIds
      .map((id) => DESTINATION_OPTIONS.find((d) => d.id === id)?.name)
      .filter(Boolean)
      .join("\n • ");

    const text = `🌟 Hello AddmeTour Concierge! I just designed a custom private tour:

📅 Duration: ${durationDays} Days / ${durationDays - 1} Nights
🗓️ Arrival Date: ${arrivalDate}
👥 Party Size: ${adults} Adults${children > 0 ? `, ${children} Children` : ""}
🏨 Accommodation: ${hotelObj.name} (${hotelObj.stars})
🚗 Private Chauffeur: ${vehicleObj.name}

📍 Selected Destinations:
 • ${destNames}

💰 Estimated Budget: ~${formatPrice(rawEstimatedUSD)} (${rawEstimatedUSD} USD)

Please send me the detailed day-by-day itinerary proposal and official quote.`;

    return `https://wa.me/994551003146?text=${encodeURIComponent(text)}`;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/itinerary/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationDays,
          arrivalDate,
          adults,
          children,
          destinations: selectedDestIds.map(
            (id) => DESTINATION_OPTIONS.find((d) => d.id === id)?.name
          ),
          hotelTier: hotelObj.name,
          vehicleClass: vehicleObj.name,
          estimatedPriceUSD: rawEstimatedUSD,
          currency: activeCurrency.code,
          customer: { fullName, email, phone, notes },
        }),
      });

      const data = await res.json();
      if (data.success && data.referenceCode) {
        setSubmittedCode(data.referenceCode);
        setStep(4);
        showToast("Your bespoke itinerary was securely saved and submitted!", "success");
      } else {
        showToast(data.error || "Failed to submit itinerary. Please check your details.", "error");
      }
    } catch {
      showToast("Network error. Please try submitting again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-900 pb-20">
      {/* ═══════════════════════════════════════════════════════ NAVBAR */}
      <header
        dir={isRtl ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-amber-500">
              addmetour
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <a
              href="https://wa.me/994551003146"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold bg-amber-500 text-[#061225] hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>VIP Concierge</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Title ── */}
      <section className="bg-gradient-to-b from-[#0a203d] via-[#0f3460] to-[#0f3460] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-section text-center max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 mb-3.5 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>100% Tailored Private Journeys</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Design Your Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              Caucasus Itinerary
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3.5 max-w-xl mx-auto font-normal leading-relaxed">
            Choose your days, preferred destinations, luxury hotels, and private Mercedes chauffeur. Get an instant quote in 60 seconds.
          </p>
        </div>
      </section>

      {/* ── Progress Step Indicator ── */}
      <div className="container-section py-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          {[
            { num: 1, label: "Dates & Group", icon: Calendar },
            { num: 2, label: "Destinations", icon: MapPin },
            { num: 3, label: "Hotels & Transport", icon: Hotel },
            { num: 4, label: "Instant Proposal", icon: Award },
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                onClick={() => {
                  if (step > s.num) setStep(s.num as any);
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20"
                    : isDone
                    ? "bg-emerald-50 border-emerald-300 cursor-pointer hover:bg-emerald-100/60"
                    : "bg-white/60 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-amber-500 text-[#061225]"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isDone ? "✓" : s.num}
                  </span>
                  <Icon className={`h-4 w-4 hidden sm:inline ${isCurrent ? "text-amber-600" : isDone ? "text-emerald-600" : "text-slate-400"}`} />
                </div>
                <span className={`text-[11px] sm:text-xs font-bold block truncate ${isCurrent ? "text-slate-900" : "text-slate-600"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ BUILDER STEPS */}
      <main className="container-section max-w-4xl mx-auto">
        {/* ── STEP 1: DURATION & TRAVELERS ── */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md animate-scale-up space-y-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                1. How many days would you like to travel?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select your trip duration. We balance scenic drives with relaxing multi-night hotel stays.
              </p>
            </div>

            {/* Duration Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { days: 3, label: "3 Days", tag: "Weekend Getaway" },
                { days: 5, label: "5 Days", tag: "Signature Tour", popular: true },
                { days: 7, label: "7 Days", tag: "Full Caucasus", popular: true },
                { days: 10, label: "10 Days", tag: "Grand Expedition" },
                { days: 14, label: "14 Days", tag: "VIP In-Depth" },
              ].map((d) => (
                <button
                  key={d.days}
                  type="button"
                  onClick={() => setDurationDays(d.days)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative ${
                    durationDays === d.days
                      ? "bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/30 text-slate-900 font-bold"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {d.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-[#061225]">
                      Popular
                    </span>
                  )}
                  <span className="text-lg font-black block">{d.label}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{d.tag}</span>
                </button>
              ))}
            </div>

            {/* Arrival Date & Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Approximate Arrival Date
                </label>
                <DatePicker
                  value={arrivalDate}
                  onChange={(d: string) => setArrivalDate(d)}
                  minDate={new Date().toISOString().split("T")[0]}
                  placeholder="Choose arrival date"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Number of Travelers
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Children</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-2xl px-8 py-3.5 text-xs font-bold text-[#061225] bg-amber-500 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Destinations</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: DESTINATIONS & THEMES ── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md animate-scale-up space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  2. Select Destinations & Highlights
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose regions you wish to explore during your {durationDays}-day trip.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start">
                {selectedDestIds.length} Selected
              </span>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DESTINATION_OPTIONS.map((dest) => {
                const isSelected = selectedDestIds.includes(dest.id);
                return (
                  <div
                    key={dest.id}
                    onClick={() => toggleDestination(dest.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 relative overflow-hidden ${
                      isSelected
                        ? "bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-400/20"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                          <div className="h-6 w-6 rounded-full bg-amber-500 text-[#061225] flex items-center justify-center font-bold text-xs shadow-md">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold bg-sky-100 text-sky-800">
                            {dest.tag}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">{dest.region}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{dest.name}</h3>
                        <p className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">{dest.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-2xl px-6 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-2xl px-8 py-3.5 text-xs font-bold text-[#061225] bg-amber-500 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to Hotels & Vehicles</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: HOTELS & VEHICLES ── */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md animate-scale-up space-y-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                3. Choose Accommodation & Vehicle Standard
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Customize your stay comfort and private transport style.
              </p>
            </div>

            {/* Hotel Tier Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                🏨 Accommodation Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HOTEL_TIERS.map((tier) => {
                  const isSelected = selectedHotelTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedHotelTier(tier.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <span className="text-amber-500 font-bold text-sm block">{tier.stars}</span>
                        <h3 className="font-bold text-slate-900 text-sm mt-1">{tier.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{tier.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 italic">
                        {tier.sampleHotels}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                🚗 Private Chauffeur Vehicle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicle === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicle(veh.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{veh.name}</h3>
                          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold bg-sky-100 text-sky-800">
                            {veh.capacity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{veh.desc}</p>
                      </div>
                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-amber-500 text-[#061225] flex items-center justify-center text-xs font-bold shrink-0">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Real-time Price Estimation Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0f3460] to-[#1a4478] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 block">
                  Estimated Private Package Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{formatPrice(rawEstimatedUSD)}</span>
                  <span className="text-xs text-white/70">
                    ({formatPriceWithSubtext(rawEstimatedUSD).secondary})
                  </span>
                </div>
                <span className="text-[11px] text-white/60">
                  Includes {durationDays} days private guide, {hotelObj.name}, and private {vehicleObj.name}.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-xl px-5 py-3 text-xs font-bold text-[#061225] bg-amber-500 hover:opacity-90 flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Instant WhatsApp Proposal</span>
                </a>
              </div>
            </div>

            {/* Lead Capture Form for Official PDF Proposal */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Receive Full Day-by-Day Proposal & Hotel Vouchers
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Our Baku travel specialists will verify room availability and message you within 30 minutes.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Optional: Dietary preferences, children's ages, flight times, or specific sites you'd like to include..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-2xl px-6 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl px-8 py-3.5 text-xs font-bold text-white bg-[#0f3460] hover:opacity-95 shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    <span>{submitting ? "Sending Request..." : "Submit Bespoke Request"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── STEP 4: SUCCESS / CONFIRMATION ── */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sky-100 shadow-xl text-center max-w-xl mx-auto animate-scale-up">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold bg-amber-100 text-amber-800 mb-2">
              Reference: #{submittedCode}
            </span>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Bespoke Proposal Requested!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you, <strong>{fullName || "Valued Traveler"}</strong>! Our senior Azerbaijan itinerary planner has received your <strong>{durationDays}-day custom tour request</strong>. We will message you on WhatsApp (<strong>{phone}</strong>) within 30 minutes.
            </p>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-start space-y-1.5 text-slate-700 mb-6">
              <div className="flex justify-between font-bold">
                <span>Trip Duration:</span>
                <span>{durationDays} Days / {durationDays - 1} Nights</span>
              </div>
              <div className="flex justify-between">
                <span>Hotel Tier:</span>
                <span>{hotelObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Chauffeur:</span>
                <span>{vehicleObj.name}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 border-t border-sky-200/60 pt-1.5">
                <span>Estimated Budget:</span>
                <span>{formatPrice(rawEstimatedUSD)} ({rawEstimatedUSD} USD)</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={`/voucher?ref=${encodeURIComponent(submittedCode || "ITN-2026-CUSTOM")}&title=${encodeURIComponent(`${durationDays}-Day Bespoke Azerbaijan & Caucasus Tour`)}&name=${encodeURIComponent(fullName || "Valued Traveler")}&email=${encodeURIComponent(email || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(arrivalDate)}&guests=${adults + children}&total=${rawEstimatedUSD}&pickup=${encodeURIComponent(`Baku Hotel / ${vehicleObj.name} VIP Chauffeur`)}&addons=${encodeURIComponent(`${hotelObj.name}, ${vehicleObj.name}, ${selectedDestIds.join(" + ")}`)}&type=${encodeURIComponent("Bespoke Custom Itinerary")}`}
                className="w-full rounded-2xl py-3.5 px-4 text-xs font-bold text-white bg-[#0f3460] hover:bg-[#1a4a84] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>View & Print Itinerary Confirmation Voucher</span>
              </Link>

              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl py-3.5 px-4 text-xs font-bold text-[#061225] bg-amber-500 hover:opacity-90 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat Directly with Concierge on WhatsApp</span>
              </a>

              <Link
                href="/"
                className="block w-full rounded-2xl py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
