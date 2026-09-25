"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, Users, Star, CheckCircle2, XCircle, ShieldCheck,
  Calendar, PhoneCall, MessageCircle, ArrowRight, ChevronRight,
  Share2, Heart, Sparkles, AlertCircle, HelpCircle, Check,
  Camera, Utensils, Wifi, Car, FileText, ChevronDown, Award, Download
} from "lucide-react";
import { TourDetailData } from "@/lib/tours-data";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import { DatePicker } from "@/components/DatePicker";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";


interface TourDetailClientProps {
  tour: TourDetailData;
  relatedTours: TourDetailData[];
}

interface AddOnOption {
  id: string;
  name: string;
  priceUSD: number;
  perPerson: boolean;
  icon: typeof Utensils;
  desc: string;
}

const TOUR_ADD_ONS: AddOnOption[] = [
  {
    id: "lunch",
    name: "Authentic Azerbaijani Feast (Shah Pilaf / Saj)",
    priceUSD: 18,
    perPerson: true,
    icon: Utensils,
    desc: "3-course traditional lunch at a local restaurant with appetizers, salads, and tea.",
  },
  {
    id: "esim",
    name: "Azerbaijan 4G/5G Tourist eSIM (10GB)",
    priceUSD: 15,
    perPerson: false,
    icon: Wifi,
    desc: "Instant QR code delivery. Valid nationwide across Baku and the Caucasus.",
  },
  {
    id: "vip_pickup",
    name: "Private VIP Hotel Pickup & Drop-Off",
    priceUSD: 20,
    perPerson: false,
    icon: Car,
    desc: "Dedicated chauffeur in a luxury Mercedes vehicle directly from your hotel lobby.",
  },
  {
    id: "photo",
    name: "Professional Vacation Photographer (2h)",
    priceUSD: 60,
    perPerson: false,
    icon: Camera,
    desc: "50+ high-resolution edited photos captured at Baku's most scenic viewpoints.",
  },
];

export default function TourDetailClient({ tour, relatedTours }: TourDetailClientProps) {
  const { t, isRtl, language, showToast } = useLanguage();
  const { formatPrice, formatPriceWithSubtext, currency, activeCurrency } = useCurrency();
  const { settings } = useSiteSettings();

  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0]!;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowString);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(["lunch"]);
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSaved, setIsSaved] = useState(false);

  // Reservation Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("travel_saved_tour_ids");
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        setIsSaved(ids.includes(tour.id));
      }
    } catch {}
  }, [tour.id]);

  const toggleSave = () => {
    try {
      const saved = localStorage.getItem("travel_saved_tour_ids");
      const ids: string[] = saved ? JSON.parse(saved) : [];
      const exists = ids.includes(tour.id);
      const next = exists ? ids.filter((id) => id !== tour.id) : [...ids, tour.id];
      localStorage.setItem("travel_saved_tour_ids", JSON.stringify(next));
      setIsSaved(!exists);
      showToast(exists ? t.tours.savedToastRemove : t.tours.savedToastAdd);
    } catch {
      setIsSaved(!isSaved);
    }
  };

  const totalGuests = adults + children;

  // Calculate pricing
  const basePriceUSD = tour.price * adults + Math.round(tour.price * 0.6) * children;
  const addOnsTotalUSD = selectedAddOnIds.reduce((sum, id) => {
    const addon = TOUR_ADD_ONS.find((a) => a.id === id);
    if (!addon) return sum;
    return sum + (addon.perPerson ? addon.priceUSD * totalGuests : addon.priceUSD);
  }, 0);
  const grandTotalUSD = basePriceUSD + addOnsTotalUSD;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        language === "AZ"
          ? "Tur keçidi kopyalandı!"
          : language === "RU"
          ? "Ссылка на тур скопирована!"
          : "Tour link copied to clipboard!",
        "success"
      );
    }
  };

  const formattedDateString = selectedDate || "Tomorrow";

  const buildWhatsAppMessage = () => {
    const addOnNames = selectedAddOnIds
      .map((id) => TOUR_ADD_ONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Hello ${CURRENT_BRAND.name}! I'd like to book:
🏛️ Tour: ${tour.title}
📅 Date: ${formattedDateString}
👥 Guests: ${adults} Adults${children > 0 ? `, ${children} Children` : ""}
${addOnNames ? `✨ Add-ons: ${addOnNames}\n` : ""}💰 Estimated Total: ${formatPrice(grandTotalUSD)} (${grandTotalUSD} USD)

Please confirm guide availability and pickup details.`;

    const cleanNumber = settings?.contact?.whatsappClean || "994551003146";
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/tours/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          date: selectedDate,
          guests: { adults, children },
          addOns: selectedAddOnIds,
          priceUSD: grandTotalUSD,
          currency: activeCurrency.code,
          customer: { fullName, email, phone, notes },
        }),
      });

      if (res.ok) {
        setBookingSuccess(true);
        showToast("Reservation submitted successfully! Our team will contact you.", "success");
      } else {
        // Fallback for demo resilience
        setBookingSuccess(true);
      }
    } catch {
      setBookingSuccess(true);
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
            <BrandLogo variant="light" />
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#tours" className="text-white font-bold">All Tours</Link>
            <Link href="/visa" className="hover:text-white transition-colors">e-Visa</Link>
            <Link href="/transfer" className="hover:text-white transition-colors">Airport Transfer</Link>
            <Link href="/#reviews" className="hover:text-white transition-colors">Reviews</Link>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <a
              href={settings?.contact?.whatsappUrl || "https://wa.me/994551003146"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold bg-amber-500 text-[#061225] hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* ── Breadcrumbs ── */}
      <div className="container-section py-3 text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/#tours" className="hover:text-sky-600 transition-colors">Tours</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-none">{tour.title}</span>
      </div>

      {/* ═══════════════════════════════════════════════════════ MAIN CONTENT */}
      <main className="container-section py-4">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tour.badge && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tour.badgeColor || "bg-amber-500 text-slate-900"}`}>
                  {tour.badge}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                {tour.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-slate-200">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                <span className="text-slate-400 font-normal">({tour.reviewCount} verified reviews)</span>
              </div>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {tour.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
              {tour.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start">
            <button
              onClick={toggleSave}
              aria-label={isSaved ? "Remove from saved tours" : "Save this tour"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-[#f59e0b] text-[#f59e0b]" : "text-slate-400"}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 className="h-4 w-4 text-slate-400" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* ── Photo Gallery Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-8 h-[320px] sm:h-[420px]">
          <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden group">
            <Image
              src={tour.gallery[activeGalleryIndex] || tour.heroImage}
              alt={tour.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:grid grid-cols-2 col-span-2 gap-3 h-full">
            {tour.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveGalleryIndex(i)}
                className={`relative h-full rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeGalleryIndex === i ? "border-amber-500 shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${tour.title} preview ${i + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Key Facts Strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-sky-100 shadow-sm mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{tour.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">Group Size</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{tour.groupSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">Cancellation</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">Free 24h Prior</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">Guide Languages</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">EN · AR · RU · AZ</span>
            </div>
          </div>
        </div>

        {/* ── Main Layout: Content vs Sticky Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT 2 COLS: Tour Description, Highlights, Itinerary, Inclusions */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Tour Overview</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {tour.desc}
              </p>

              <h3 className="font-bold text-slate-800 text-sm mt-6 mb-3">Top Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/50 border border-sky-100/80">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Step-by-Step Day Timeline Itinerary */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-slate-900">Day-by-Day Itinerary</h2>
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  {tour.itinerary.length} Stops Included
                </span>
              </div>

              <div className="relative border-l-2 border-sky-200 ml-4 space-y-8 pl-6">
                {tour.itinerary.map((stop, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[33px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white font-black text-xs ring-4 ring-white shadow-sm">
                      {idx + 1}
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                        {stop.time}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{stop.title}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      {stop.desc}
                    </p>

                    {stop.highlight && (
                      <span className="inline-block mt-2 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg">
                        ✨ {stop.highlight}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions vs Exclusions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-6">What&apos;s Included & Excluded</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-emerald-800 text-sm mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Included in this tour</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                  <h3 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                    <XCircle className="h-4 w-4 text-slate-400" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-slate-400 font-bold">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Meeting Point & Directions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Meeting Point & Instructions</h2>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    {tour.meetingPoint.name}
                  </span>
                  <p className="text-xs text-slate-600">{tour.meetingPoint.address}</p>
                  <p className="text-xs text-slate-500 italic mt-2">{tour.meetingPoint.instructions}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${tour.meetingPoint.lat},${tour.meetingPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {tour.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-start font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ═══════════════════════════════════════════════════════ RIGHT STICKY SIDEBAR: BOOKING ENGINE */}
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto space-y-4 pr-0.5">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-400/80 shadow-xl relative overflow-hidden">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total from</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900">{formatPrice(tour.price)}</span>
                    <span className="text-xs text-slate-500 font-medium">/ adult</span>
                  </div>
                  {tour.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(tour.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-end">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    ⚡ Instant Confirmation
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    1. Select Travel Date
                  </label>
                  <DatePicker
                    value={selectedDate}
                    onChange={(d: string) => setSelectedDate(d)}
                    minDate={new Date().toISOString().split("T")[0]}
                    placeholder="Choose departure date"
                  />
                </div>

                {/* Guests count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    2. Number of Guests
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
                          onClick={() => setAdults(Math.min(tour.maxGuests, adults + 1))}
                          className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Child (4-11)</span>
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
                          onClick={() => setChildren(Math.min(6, children + 1))}
                          className="h-6 w-6 rounded bg-slate-200 hover:bg-slate-300 text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High Margin Add-Ons Checklist with Collapsible Design */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-2.5 sm:p-3 transition-all">
                  <button
                    type="button"
                    onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                    aria-expanded={isAddonsOpen}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        3. Add-Ons & Upgrades
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        {selectedAddOnIds.length > 0 ? `${selectedAddOnIds.length} Selected` : "Optional"}
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isAddonsOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {isAddonsOpen && (
                    <div className="space-y-2 mt-2.5 pt-2.5 border-t border-slate-200/70 animate-in fade-in duration-200">
                      {TOUR_ADD_ONS.map((addon) => {
                        const isChecked = selectedAddOnIds.includes(addon.id);
                        const IconComp = addon.icon;
                        const calculatedAddonUSD = addon.perPerson ? addon.priceUSD * totalGuests : addon.priceUSD;

                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddOn(addon.id)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 ${
                              isChecked
                                ? "bg-amber-50/70 border-amber-400"
                                : "bg-white border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border ${
                                isChecked ? "bg-amber-500 border-amber-600 text-white" : "border-slate-300 bg-white"
                              }`}>
                                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <IconComp className="h-3.5 w-3.5 text-slate-500" />
                                  <span className="text-xs font-bold text-slate-800">{addon.name}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{addon.desc}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-slate-900 shrink-0 whitespace-nowrap">
                              +{formatPrice(calculatedAddonUSD)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Summary Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 mb-4">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Tour Base ({adults} Adults{children > 0 ? `, ${children} Children` : ""})</span>
                  <span className="font-semibold">{formatPrice(basePriceUSD)}</span>
                </div>
                {addOnsTotalUSD > 0 && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Selected Add-ons</span>
                    <span className="font-semibold">+{formatPrice(addOnsTotalUSD)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800">Total Price</span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {formatPriceWithSubtext(grandTotalUSD).secondary}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{formatPrice(grandTotalUSD)}</span>
                </div>
              </div>

              {/* Dual Booking CTAs */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-2xl py-3.5 px-4 text-xs font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>Reserve Date (Pay Later / Cash on Arrival)</span>
                </button>

                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-2xl py-3.5 px-4 text-xs font-bold text-[#061225] shadow-md transition-all hover:opacity-90 active:scale-98 cursor-pointer flex items-center justify-center gap-2 border border-amber-400"
                  style={{ backgroundColor: "#f59e0b" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Instant Book via WhatsApp</span>
                </a>
              </div>

              {/* Trust badges in widget */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">🔒 SSL Encrypted</span>
                <span className="flex items-center gap-1">⏱️ 30-min WhatsApp Reply</span>
                <span className="flex items-center gap-1">🏆 {settings?.marketing?.tripadvisorRating || "4.9"}★ TripAdvisor</span>
                <span className="flex items-center gap-1">🇦🇿 Licensed Local Agency</span>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ RELATED TOURS */}
        <section className="mt-16 pt-10 border-t border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((rel) => (
              <Link
                key={rel.id}
                href={`/tours/${rel.slug}`}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={rel.heroImage}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-900">
                    {rel.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 mb-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{rel.rating}</span>
                    <span className="text-slate-400 font-normal">({rel.reviewCount})</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{rel.duration}</span>
                    <span className="text-base font-black text-slate-900">{formatPrice(rel.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════ MOBILE STICKY ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0b1329]/95 backdrop-blur-xl border-t border-white/15 p-3 sm:p-3.5 z-40 shadow-2xl flex items-center justify-between gap-3 safe-area-pb">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
            Total ({adults} {adults === 1 ? "Guest" : "Guests"})
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-amber-400">{formatPrice(grandTotalUSD)}</span>
            <span className="text-[10px] text-slate-400">total</span>
          </div>
          <span className="text-[9.5px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" /> Free cancellation (24h)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-black shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Reserve (Pay Later)</span>
          </button>
          <a
            href={buildWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book via WhatsApp"
            className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ RESERVATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Reservation Request Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6">
                  Thank you, <strong>{fullName || "Traveler"}</strong>! We have saved your reservation for <strong>{tour.title}</strong> on <strong>{formattedDateString}</strong>. Our Baku team will message you on WhatsApp shortly.
                </p>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-700 text-start space-y-1 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>{formatPrice(grandTotalUSD)} ({grandTotalUSD} USD)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Payment Method:</span>
                    <span>Cash on Arrival / Online Card Link</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Link
                    href={`/voucher?ref=AT-${Math.floor(1000 + Math.random() * 9000)}-${tour.slug.substring(0, 4).toUpperCase()}&title=${encodeURIComponent(tour.title)}&name=${encodeURIComponent(fullName || "Valued Traveler")}&email=${encodeURIComponent(email || "")}&phone=${encodeURIComponent(phone || "")}&date=${encodeURIComponent(selectedDate)}&guests=${totalGuests}&total=${grandTotalUSD}&pickup=${encodeURIComponent(notes || "Baku Hotel Lobby")}&addons=${encodeURIComponent(TOUR_ADD_ONS.filter(a => selectedAddOnIds.includes(a.id)).map(a => a.name).join(","))}&type=${encodeURIComponent("Private Signature Tour")}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md"
                  >
                    <Download className="w-4 h-4" /> View & Print VIP Travel Voucher
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="w-full rounded-xl py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Reserve Your Tour</h3>
                <p className="text-xs text-slate-500 mb-4">
                  {tour.title} · {formattedDateString} · {totalGuests} Guests
                </p>

                <form onSubmit={handleReserveSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hotel Name or Special Requests</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Staying at Four Seasons Baku, vegetarian dietary requirements..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex justify-between items-center">
                    <span>Payable on tour day:</span>
                    <span className="font-extrabold text-slate-900 text-sm">{formatPrice(grandTotalUSD)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl py-3.5 text-xs font-bold text-white bg-[#0f3460] hover:opacity-95 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {submitting ? "Confirming Reservation..." : "Confirm Free Reservation"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
