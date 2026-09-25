"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight, Heart, MapPin, Sparkles, Zap, Shield, Bookmark, MessageCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { getLocalizedTour } from "@/lib/tours-i18n";
import { TourCardsSkeleton } from "@/components/Skeletons";
import { CURRENT_BRAND } from "@/lib/brand";
import { TOUR_FILTERS } from "./data";

interface HomePopularToursProps {
  toursList: any[];
  toursLoading: boolean;
  savedTourIds: string[];
  toggleSaveTour: (id: string, e?: React.MouseEvent) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  onBookTour: (tour: { id: string; title: string; price: number }) => void;
  setSearchQuery?: (q: string) => void;
}

export const HomePopularTours: React.FC<HomePopularToursProps> = ({
  toursList,
  toursLoading,
  savedTourIds,
  toggleSaveTour,
  activeFilter,
  setActiveFilter,
  onBookTour,
  setSearchQuery,
}) => {
  const { language, t } = useLanguage();
  const { formatPrice, formatPriceWithSubtext } = useCurrency();
  const { settings: siteConfig } = useSiteSettings();
  const filteredTours = toursList;
  const setBookingModalTour = onBookTour;

  return (
<section id="tours" className="py-16" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section">
          {/* Header + Filter tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-2">{t.tours.badge}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                {t.tours.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "All", label: t.search.filterAll },
                { id: "City", label: t.search.filterCity },
                { id: "Day Trip", label: t.search.filterDayTrip },
                { id: "Overnight", label: t.search.filterOvernight },
                { id: "Adventure", label: t.search.filterAdventure },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={
                    activeFilter === f.id
                      ? { backgroundColor: "#0f3460", color: "#ffffff" }
                      : { backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2d8cc" }
                  }
                >
                  {f.label}
                </button>
              ))}

              <button
                onClick={() => setActiveFilter("Saved")}
                className="flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer select-none"
                style={
                  activeFilter === "Saved"
                    ? { backgroundColor: "#0f3460", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2d8cc" }
                }
              >
                <Heart
                  className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                    activeFilter === "Saved"
                      ? "fill-[#f59e0b] text-[#f59e0b]"
                      : savedTourIds.length > 0
                      ? "fill-red-500 text-red-500"
                      : "text-slate-400"
                  }`}
                />
                <span>{t.nav.saved}</span>
                <span
                  className={`ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors duration-200 ${
                    activeFilter === "Saved"
                      ? "bg-white/20 text-white"
                      : savedTourIds.length > 0
                      ? "bg-amber-100 text-amber-900"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {savedTourIds.length}
                </span>
              </button>
            </div>
          </div>

          {/* Tour cards grid */}
          {toursLoading ? (
            <TourCardsSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => {
                const localizedTour = getLocalizedTour(tour, language);
                const tourTitle = localizedTour.title;
                const tourDesc = localizedTour.desc;
                const tourDuration = localizedTour.duration;
                const tourGroupSize = localizedTour.groupSize;
                const tourBadge = localizedTour.badge;
                const tourTags = localizedTour.tags;

                return (
                <div
                  key={tour.id}
                  className="group rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                  style={{ boxShadow: "0 4px 24px -4px rgba(15,23,42,0.10)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={tour.image || "/images/baku-old-city.jpg"}
                      alt={tourTitle}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 420px"
                      style={{ objectFit: "cover" }}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge */}
                    {tourBadge && (
                      <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
                          tour.badgeColor?.includes("text-") ? "" : "text-white"
                        } ${tour.badgeColor}`}
                      >
                        {tourBadge}
                      </span>
                    )}

                    {/* TripAdvisor-style "Top Rated Experience" badge */}
                    {tour.rating >= 4.8 && (
                      <span className="absolute bottom-2.5 left-2.5 rounded-lg px-2.5 py-1 text-[10px] font-extrabold bg-slate-900/90 text-amber-300 backdrop-blur-md border border-amber-400/40 shadow-sm flex items-center gap-1">
                        <Sparkles className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>Top Rated in Baku</span>
                      </span>
                    )}

                    {/* Save to Favorites Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleSaveTour(tour.id, e)}
                      aria-label={savedTourIds.includes(tour.id) ? "Remove from saved tours" : "Save this tour"}
                      title={savedTourIds.includes(tour.id) ? "Remove from saved tours" : "Save this tour"}
                      className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                      style={
                        savedTourIds.includes(tour.id)
                          ? { backgroundColor: "#ffffff", color: "#f59e0b" }
                          : { backgroundColor: "rgba(15, 52, 96, 0.75)", color: "#ffffff" }
                      }
                    >
                      <Heart
                        className={`h-4 w-4 transition-transform duration-200 ${
                          savedTourIds.includes(tour.id) ? "fill-[#f59e0b] scale-110" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags + Rating */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap gap-1">
                        {tourTags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        <span>{tour.rating}</span>
                        <span className="text-slate-400">({tour.reviews})</span>
                      </div>
                    </div>

                    <Link href={`/tours/${tour.slug || "baku-old-city-walking-tour"}`}>
                      <h3 className="font-display text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors hover:underline">
                        {tourTitle}
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem]">
                      {tourDesc}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" /> {tourDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-slate-400" /> {tourGroupSize}
                      </span>
                    </div>

                    {/* TripAdvisor & GetYourGuide Trust Triggers */}
                    <div className="flex flex-col gap-1.5 py-2.5 my-1.5 border-y border-slate-100 text-[11px] bg-slate-50/70 -mx-6 px-6">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Free cancellation (up to 24h prior)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sky-800 font-semibold text-[10.5px]">
                        <Shield className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                        <span>Reserve now & pay on tour day</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium text-[10.5px]">
                        <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>Hotel pickup & drop-off included</span>
                      </div>
                    </div>

                    {/* Price + Dual CTAs - Always pinned to bottom */}
                    <div className="flex flex-col gap-2.5 pt-3 mt-auto">
                      <div className="flex items-baseline justify-between">
                        <div>
                          {tour.originalPrice && (
                            <span className="text-xs text-slate-400 line-through mr-1.5">
                              {formatPrice(tour.originalPrice)}
                            </span>
                          )}
                          <span className="text-lg font-black text-slate-900">
                            {formatPrice(tour.price)}
                          </span>
                          <span className="text-[11px] text-slate-500"> / {t.tours.groupSize}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {formatPriceWithSubtext(tour.price).secondary}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setBookingModalTour({ id: tour.id, title: tourTitle, price: tour.price });
                          }}
                          aria-label={`Reserve date for ${tourTitle} (${formatPrice(tour.price)})`}
                          className="w-full rounded-xl py-2.5 px-2 text-xs font-black transition-all duration-200 border-2 border-amber-400/60 bg-amber-50 text-amber-950 hover:bg-amber-100 active:scale-98 text-center cursor-pointer shadow-xs"
                        >
                          📅 Reserve (Pay Later)
                        </button>
                        <a
                          href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
                            `Hello ${CURRENT_BRAND.name}! I would like to book the "${tourTitle}" tour (${formatPrice(tour.price)} / $${tour.price} USD).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Book ${tourTitle} tour on WhatsApp (${formatPrice(tour.price)})`}
                          className="w-full rounded-xl py-2.5 px-2 text-xs font-bold text-white transition-all duration-200 hover:opacity-95 active:scale-98 text-center cursor-pointer shadow-sm flex items-center justify-center gap-1"
                          style={{ backgroundColor: "#0f3460" }}
                        >
                          <span>{t.tours.bookNow}</span>
                        </a>
                      </div>
                      <p className="text-[10px] text-center text-slate-400 font-medium">
                        🛡️ Zero prepayment • Lock in your date risk-free
                      </p>
                    </div>
                  </div>
                </div>
                );
              })
            ) : (
              <div className="col-span-full py-16 px-6 text-center bg-white rounded-2xl border border-[#e2d8cc] max-w-md mx-auto shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 mb-4">
                  <Bookmark className="h-7 w-7 text-[#f59e0b]" />
                </div>
                <p className="font-display text-xl font-bold text-slate-900 mb-2">
                  {activeFilter === "Saved" ? t.nav.saved : t.search.noToursFound}
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  {activeFilter === "Saved"
                    ? "You haven't bookmarked any tours yet. Click the bookmark icon on any tour to save it."
                    : t.search.noToursFound}
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery?.("");
                  }}
                  className="rounded-full px-6 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {t.search.resetFilters}
                </button>
              </div>
            )}
          </div>
          )}
        </div>
      </section>
  );
};
