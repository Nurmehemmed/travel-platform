"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from "@/lib/settings-context";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  FileText,
  Menu,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  X,
  ArrowRight,
} from "lucide-react";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: string;
  image: string;
  blurDataUrl?: string;
  alt: string;
  badge: string;
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

// ─── Slide Data (Optimized with LCP Next/Image considerations) ────────────────

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "great-caucasus",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85&auto=format&fit=crop",
    // 1x1 base64 micro blur placeholder for instant LCP preview
    blurDataUrl:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoBAAEAAQAcJaQAA3AA/v39wAAAAA==",
    alt: "Great Caucasus Mountain Range in Azerbaijan with lush highland scenery",
    badge: "Official Tourism Partner · Azerbaijan",
    titlePart1: "Discover the Soul of",
    titleHighlight: "Azerbaijan",
    subtitle:
      "Journey through alpine valleys of the High Caucasus, ancient Silk Road caravanserais, and the timeless streets of Baku with top-rated private guides.",
    primaryCta: { text: "Book an Experience", href: "#tours" },
    secondaryCta: { text: "Airport Transfer", href: "/transfer" },
  },
  {
    id: "baku-caspian",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=85&auto=format&fit=crop",
    blurDataUrl:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoBAAEAAQAcJaQAA3AA/v39wAAAAA==",
    alt: "Baku Maiden Tower and historical Old City Icherisheher architecture",
    badge: "UNESCO Heritage & Modern Marvels",
    titlePart1: "Enchanting Baku &",
    titleHighlight: "Caspian Shores",
    subtitle:
      "Cobblestone passages of ancient Icherisheher, dazzling Flame Towers, and coastal boulevard sunsets across the Caspian shoreline.",
    primaryCta: { text: "Book an Experience", href: "#tours" },
    secondaryCta: { text: "Airport Transfer", href: "/transfer" },
  },
  {
    id: "gobustan-fire",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop",
    blurDataUrl:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoBAAEAAQAcJaQAA3AA/v39wAAAAA==",
    alt: "Gobustan Mud Volcanoes and sacred eternal flames of Yanar Dag",
    badge: "Land of Eternal Fire",
    titlePart1: "Gobustan & The Land of",
    titleHighlight: "Sacred Fire",
    subtitle:
      "Active bubbling mud volcanoes, 40,000-year-old rock petroglyphs, and mystical eternal fire temples just outside Baku.",
    primaryCta: { text: "Book an Experience", href: "#tours" },
    secondaryCta: { text: "Airport Transfer", href: "/transfer" },
  },
];

interface HeroSectionProps {
  slides?: HeroSlide[];
}

export function HeroSection({ slides = DEFAULT_SLIDES }: HeroSectionProps) {
  const { settings } = useSiteSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-advance slider
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeSlide = slides[currentSlide] ?? slides[0]!;

  return (
    <div className="relative min-h-[92vh] w-full bg-slate-950 font-sans text-white overflow-x-hidden">
      {/* ══════════════════════════════════════════════════════
          1. SEMANTIC HEADER & ACCESSIBLE NAVBAR
      ══════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className="absolute top-0 left-0 right-0 z-40 border-b border-white/10 bg-slate-950/40 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            aria-label="AddmeTour Homepage"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-white/20 shadow-md">
              <span className="text-base font-black tracking-tight text-amber-500">A</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold tracking-tight text-white leading-none">
                Addme<span className="text-amber-500">Tour</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-300 uppercase font-medium">
                Azerbaijan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
            <Link
              href="#tours"
              prefetch={false}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              Tours & Experiences
            </Link>
            <Link
              href="#destinations"
              prefetch={false}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              Destinations
            </Link>
            <Link
              href="#about"
              prefetch={false}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              About Us
            </Link>
            <Link
              href="#reviews"
              prefetch={false}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              Reviews
            </Link>

            {/* Subdued e-Visa Tag (Subtle outlined pill to prevent competing with primary CTAs) */}
            <Link
              href="/visa"
              prefetch={true}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
              title="Official ASAN e-Visa Service"
            >
              <FileText className="h-3.5 w-3.5 text-slate-300" />
              <span>e-Visa</span>
              <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-slate-300">
                Official
              </span>
            </Link>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              prefetch={true}
              className="hidden sm:inline-block text-sm font-medium text-slate-200 transition-colors hover:text-white px-2 py-1"
            >
              Sign In
            </Link>

            {/* Primary High-Conversion Action (Reserved Amber #F5A524 / amber-500) */}
            <Link
              href="/register"
              prefetch={true}
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-4.5 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all duration-200 hover:bg-amber-400 hover:shadow-amber-500/25 active:scale-95"
            >
              Sign Up
            </Link>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex lg:hidden items-center justify-center rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
              <Link
                href="#tours"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                Tours & Experiences
              </Link>
              <Link
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                Destinations
              </Link>
              <Link
                href="/visa"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-300" />
                  Azerbaijan e-Visa
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Fast Track</span>
              </Link>
              <Link
                href="/transfer"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-slate-300" />
                  Airport Transfers
                </span>
                <span className="text-[10px] text-slate-400 uppercase">GYD Airport</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════
          2. HERO SECTION & OPTIMIZED LCP BACKGROUND SLIDER
      ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-main-heading"
        className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Next.js Image Backgrounds Container */}
        <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  quality={85}
                  sizes="100vw"
                  {...(slide.blurDataUrl
                    ? { placeholder: "blur" as const, blurDataURL: slide.blurDataUrl }
                    : {})}
                  className="object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        {/* ── Stable Permanent Overlays (Outside fading slides to eliminate cross-fade flash) ── */}
        {/* 1. Deep Top Vignette: Eliminates bright/lighty flash directly below navbar */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-950 via-slate-950/75 to-transparent z-10"
          aria-hidden="true"
        />

        {/* 2. Global Ambient Darkening: Keeps scenery atmospheric while subduing bright skies */}
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

        {/* ══════════════════════════════════════════════════════
            3. HERO CONTENT: SEO H1 & PRIMARY / SECONDARY CTAS
        ══════════════════════════════════════════════════════ */}
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-4 pt-28 pb-20 text-center sm:px-6 lg:px-8">
          {/* Trust Badge / Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 px-3.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{activeSlide.badge}</span>
          </div>

          {/* Primary Semantic H1 Heading */}
          <h1
            id="hero-main-heading"
            className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]"
          >
            {activeSlide.titlePart1}{" "}
            <span className="text-amber-500 underline decoration-amber-500/30 decoration-wavy underline-offset-8">
              {activeSlide.titleHighlight}
            </span>
          </h1>

          {/* Subheading / Descriptive Context */}
          <p className="mt-5 max-w-2xl text-base text-slate-200 drop-shadow sm:text-lg md:text-xl font-normal leading-relaxed">
            {activeSlide.subtitle}
          </p>

          {/* CTA Action Pair */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:flex-row sm:w-auto">
            {/* Primary High-Conversion Action: Book an Experience (Reserved Amber) */}
            <Link
              href={activeSlide.primaryCta.href}
              prefetch={true}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm sm:text-base font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 hover:scale-[1.02] active:scale-98 sm:w-auto"
            >
              <span>{activeSlide.primaryCta.text}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: Solid / Glassmorphism Airport Transfer Button */}
            <Link
              href={activeSlide.secondaryCta.href}
              prefetch={true}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-slate-900/80 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/15 active:scale-98 sm:w-auto"
            >
              <Car className="h-4 w-4 text-slate-300" />
              <span>{activeSlide.secondaryCta.text}</span>
            </Link>
          </div>

          {/* Social Proof & Trust Strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-white">4.9/5</span>
              <span>(2,400+ verified reviews)</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Licensed Tourism Operator</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-400" />
              <span>English, Arabic & Russian Guides</span>
            </div>
          </div>
        </div>

        {/* Arrow Navigation Controls */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:bg-slate-950/80 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 text-white backdrop-blur-md transition-all hover:bg-slate-950/80 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 backdrop-blur-md">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-6 bg-amber-500" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
