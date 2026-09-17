"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, Users, Star, Compass, CheckCircle2,
  ChevronRight, Sparkles, MessageCircle, ArrowRight, Utensils,
  Calendar, ShieldCheck, Heart
} from "lucide-react";
import { DestinationDetailData } from "@/lib/destinations-data";
import { TourDetailData } from "@/lib/tours-data";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";

interface DestinationDetailClientProps {
  destination: DestinationDetailData;
  tours: TourDetailData[];
}

export default function DestinationDetailClient({
  destination,
  tours,
}: DestinationDetailClientProps) {
  const { t, isRtl } = useLanguage();
  const { formatPrice, formatPriceWithSubtext } = useCurrency();
  const { settings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#destinations" className="text-white font-bold">Destinations</Link>
            <Link href="/custom-itinerary" className="text-amber-300 hover:text-white font-bold flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Custom Tour</span>
            </Link>
            <Link href="/visa" className="hover:text-white transition-colors">e-Visa</Link>
            <Link href="/transfer" className="hover:text-white transition-colors">Transfer</Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <a
              href={`https://wa.me/${settings?.contact?.whatsappClean || "994551003146"}?text=${encodeURIComponent(
                `Hello AddmeTour! I'd like information on visiting ${destination.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold bg-amber-500 text-[#061225] hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Ask a Local</span>
            </a>

          </div>
        </div>
      </header>

      {/* ── Hero Banner with Destination Image ── */}
      <section className="relative h-[380px] sm:h-[460px] bg-slate-950 overflow-hidden flex items-end">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460] via-[#0f3460]/50 to-transparent" />

        <div className="container-section relative z-10 pb-8 text-white">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-2">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#destinations" className="hover:text-amber-400">Destinations</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amber-300 font-bold">{destination.name}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {destination.name}
          </h1>
          <p className="text-sm sm:text-lg text-white/80 font-medium mt-1 max-w-2xl">
            {destination.subtitle}
          </p>
        </div>
      </section>

      {/* ── Quick Facts Strip ── */}
      <div className="container-section py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Distance</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">{destination.distanceFromBaku}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Elevation</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">{destination.elevation}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Best Season</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-700">{destination.bestSeason}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ideal Duration</span>
            <span className="text-xs sm:text-sm font-bold text-sky-700">{destination.idealStay}</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ DESTINATION CONTENT */}
      <main className="container-section max-w-6xl mx-auto space-y-12">
        {/* Overview & Culture */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
                About {destination.name}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {destination.overview}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-2">History & Cultural Significance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {destination.cultureAndHistory}
              </p>
            </div>
          </div>

          {/* Right sidebar: Bespoke CTA card */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0f3460] to-[#1a4478] text-white shadow-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="h-3 w-3" />
              <span>Tailor-Made Tour</span>
            </span>
            <h3 className="font-display text-xl font-bold">
              Want a Private VIP Journey to {destination.name}?
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Design a fully customized itinerary with dedicated Mercedes chauffeur, handpicked boutique hotels, and licensed historian guides.
            </p>
            <Link
              href="/custom-itinerary"
              className="block w-full text-center rounded-2xl py-3 px-4 text-xs font-bold bg-amber-500 text-[#061225] hover:opacity-90 transition-opacity shadow-md"
            >
              Open Interactive Tour Planner &rarr;
            </Link>
          </div>
        </section>

        {/* Top Highlights Grid */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Must-See Highlights in {destination.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.topHighlights.map((hl, i) => (
              <div
                key={i}
                className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hl.image}
                    alt={hl.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white">
                    Highlight #{i + 1}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{hl.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{hl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Culinary & Local Tips */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-4">
              <Utensils className="h-5 w-5 text-amber-500" />
              <span>What to Taste in {destination.name}</span>
            </h2>
            <div className="space-y-3.5">
              {destination.culinarySpecialties.map((dish, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{dish.name}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{dish.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 mb-4">
              <Compass className="h-5 w-5 text-sky-500" />
              <span>Insider Travel Tips</span>
            </h2>
            <ul className="space-y-3">
              {destination.localTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Available Tours visiting this destination */}
        <section className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Tours & Day Trips Visiting {destination.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Handcrafted small-group & private experiences with 100% guaranteed departures.
              </p>
            </div>
            <Link
              href="/#tours"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              <span>View All Tours</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {tour.badge && (
                    <span className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-900">
                      {tour.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 mb-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{tour.rating}</span>
                    <span className="text-slate-400 font-normal">({tour.reviewCount})</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors line-clamp-2">
                    {tour.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{tour.duration}</span>
                    <span className="text-lg font-black text-slate-900">{formatPrice(tour.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
