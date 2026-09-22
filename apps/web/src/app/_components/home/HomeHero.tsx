"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LOCALIZED_SLIDES } from "@/lib/tours-i18n";
import { HERO_SLIDES } from "./data";

interface HomeHeroProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  currentSlide,
  setCurrentSlide,
}) => {
  const [mounted] = React.useState(true);
  const { language, isRtl, t } = useLanguage();
  const activeHeroSlide = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0]!;

  return (
<section className="relative h-[88vh] min-h-[560px] overflow-hidden group bg-slate-950">
        {/* Background Images with smooth Cross-Fade Transition */}
        <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
          {HERO_SLIDES.map((slide, index) => {
            if (index !== 0 && !mounted) return null;
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  quality={75}
                  style={{ objectFit: "cover" }}
                  className={`object-cover object-center transition-opacity duration-700 ${
                    index === currentSlide ? "animate-ken-burns" : "scale-100"
                  }`}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 ? { fetchPriority: "high" as const, unoptimized: true } : {})}
                />
              </div>
            );
          })}
        </div>

        {/* ── Stable Permanent Overlays (Outside fading slides to eliminate crossfade flash) ── */}
        {/* 1. Deep Top Vignette directly below navbar: Eliminates bright/lighty flash */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-950 via-slate-950/75 to-transparent z-10"
          aria-hidden="true"
        />

        {/* 2. Global Ambient Scrim */}
        <div
          className="pointer-events-none absolute inset-0 bg-slate-950/45 z-10"
          aria-hidden="true"
        />

        {/* 3. Bottom Grounding Gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* 4. Targeted Central Radial Scrim for Text Contrast */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[460px] w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,transparent_80%)] blur-md" />
        </div>

        {/* Content Container with key-based re-animation */}
        {(() => {
          const localizedSlides = LOCALIZED_SLIDES[language] || LOCALIZED_SLIDES.EN;
          const currentSlideData = localizedSlides[currentSlide] || localizedSlides[0]!;
          return (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
              <div key={`badge-${currentSlide}-${language}`} className="animate-fade-in pointer-events-auto">
                <span
                  className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6 backdrop-blur-md shadow-sm"
                  style={{ borderColor: "#f59e0b", color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.22)" }}
                >
                  {currentSlide === 0 ? t.hero.badge : currentSlideData.badge}
                </span>
              </div>

              <h1
                key={`title-${currentSlide}-${language}`}
                className="animate-slide-up font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl pointer-events-auto drop-shadow-lg break-words hyphens-auto"
              >
                {currentSlide === 0 ? (
                  <>
                    {t.hero.titlePart1} <span style={{ color: "#f59e0b" }}>{t.hero.titlePart2}</span>
                  </>
                ) : (
                  currentSlideData.title
                )}
              </h1>

              <p
                key={`desc-${currentSlide}-${language}`}
                className="animate-slide-up mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-white/90 pointer-events-auto leading-relaxed drop-shadow"
              >
                {currentSlide === 0 ? t.hero.subtitle : currentSlideData.subtitle}
              </p>

              <div
                key={`cta-${currentSlide}-${language}`}
                className="animate-slide-up mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
              >
                <Link
                  href="#tours"
                  className="rounded-full px-8 py-3.5 font-semibold text-sm transition-all duration-200 hover:opacity-95 hover:scale-105 hover:shadow-2xl shadow-lg whitespace-nowrap"
                  style={{ backgroundColor: "#f59e0b", color: "#061225" }}
                >
                  {t.hero.ctaBook}
                </Link>
                <Link
                  href="/transfer"
                  className="rounded-full border border-white/25 bg-slate-900/80 px-8 py-3.5 font-semibold text-sm text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/15 active:scale-98 whitespace-nowrap"
                >
                  {t.nav.transfer}
                </Link>
              </div>
            </div>
          );
        })()}

        {/* Previous / Next Arrow Controls */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110 cursor-pointer shadow-xl"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          aria-label="Next slide"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110 cursor-pointer shadow-xl"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Interactive Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex items-center justify-center p-2.5 cursor-pointer rounded-full"
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === currentSlide ? "2.25rem" : "0.5rem",
                  height: "0.5rem",
                  backgroundColor: i === currentSlide ? "#f59e0b" : "rgba(255,255,255,0.45)",
                }}
              />
            </button>
          ))}
        </div>
      </section>
  );
};
