"use client";

import React from "react";
import { Star, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LOCALIZED_TESTIMONIALS } from "@/lib/tours-i18n";
import { TESTIMONIALS } from "./data";

export const HomeTestimonials: React.FC = () => {
  const { language, t } = useLanguage();

  return (
<section id="reviews" className="py-20" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="section-label mb-2">
              {t.reviews.badge}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {t.reviews.title}
            </h2>
          </div>

          {/* Rating Summary Box */}
          <div className="mx-auto max-w-3xl mb-12 rounded-2xl bg-white shadow-lg border border-slate-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Big score */}
              <div className="text-center shrink-0">
                <div className="text-7xl font-black text-slate-900 leading-none">4.9</div>
                <div className="flex items-center justify-center gap-0.5 mt-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />)}
                </div>
                <div className="text-xs text-slate-500 mt-1">{language === "AZ" ? "600+ rəy əsasında" : language === "RU" ? "на основе 600+ отзывов" : language === "AR" ? "بناءً على +600 تقييم" : "Based on 600+ reviews"}</div>
              </div>

              {/* Breakdown bars */}
              <div className="flex-1 w-full space-y-2">
                {[
                  { stars: 5, pct: 96 },
                  { stars: 4, pct: 3 },
                  { stars: 3, pct: 1 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 },
                ].map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-4 shrink-0">{stars}</span>
                    <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b] shrink-0" />
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct > 50 ? "#f59e0b" : "#cbd5e1" }} />
                    </div>
                    <span className="text-xs text-slate-500 w-8 text-right shrink-0">{pct}%</span>
                  </div>
                ))}
              </div>

              {/* Source badges */}
              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-2 rounded-xl bg-[#00AF87]/10 border border-[#00AF87]/25 px-4 py-2.5">
                  <span className="text-lg">🦉</span>
                  <div>
                    <div className="text-xs font-bold text-[#00AF87]">TripAdvisor</div>
                    <div className="text-[10px] text-slate-500">Travelers' Choice</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-4 py-2.5">
                  <span className="text-lg">🔵</span>
                  <div>
                    <div className="text-xs font-bold text-blue-600">Google Reviews</div>
                    <div className="text-[10px] text-slate-500">4.8 / 5.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => {
              const localizedReview = LOCALIZED_TESTIMONIALS[language]?.[idx] || item;
              const quote = localizedReview.quote || item.quote;
              const subtitle = localizedReview.subtitle || item.subtitle;
              const countryFlags = ["🇬🇧", "🇮🇹", "🇯🇵"];

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl bg-[#faf6ef]/90 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  style={{
                    border: "1px solid #e7dfd4",
                    boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.05)",
                  }}
                >
                  <div>
                    {/* Decorative quotation mark */}
                    <div className="mb-4">
                      <svg
                        className="h-8 w-8 text-[#d8c8b4]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#ede4d8] pt-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                        style={{ backgroundColor: "#0f3460" }}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                          <span>{countryFlags[idx]}</span>
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-tight">
                          {subtitle}
                        </p>
                      </div>
                    </div>

                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-3 w-3"
                          fill="#f59e0b"
                          stroke="#f59e0b"
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-[#00AF87] font-semibold flex items-center gap-0.5">
                      <BadgeCheck className="h-3 w-3" /> {language === "AR" ? "مراجع" : "Verified"}
                    </span>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};
