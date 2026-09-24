"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Shield, Star, Award, ChevronDown, User as UserIcon, LogOut, Bookmark, FileText, Car,
  Sparkles, Globe, Menu, X, Share2, Copy, CheckCheck, Loader2, Heart, Check, ArrowRight, Wifi
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import type { AuthUser } from "@/components/AuthModal";

interface HomeNavbarProps {
  currentUser: AuthUser | null;
  authChecking: boolean;
  setIsAuthOpen: (open: boolean) => void;
  setAuthMode: (mode: "login" | "signup") => void;
  handleLogout: () => void;
  savedCount?: number;
  savedTourIds?: string[];
  setActiveFilter?: (f: string) => void;
  isScrolled: boolean;
  shareCopied: boolean;
  handleCopyLink: () => void;
}

export const HomeNavbar: React.FC<HomeNavbarProps> = ({
  currentUser,
  authChecking,
  setIsAuthOpen,
  setAuthMode,
  handleLogout,
  savedCount = 0,
  savedTourIds = [],
  setActiveFilter,
  isScrolled,
  shareCopied,
  handleCopyLink,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted] = useState(true);

  // Hover grace period to eliminate hover jitter/flickering
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const closeServicesDropdown = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesDropdownOpen(false);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
    };
  }, []);
  const { language, setLanguage, t, isRtl, currentLangInfo, languages } = useLanguage();
  const { currency, setCurrency, currencies, activeCurrency } = useCurrency();

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
  };

  return (
<header
        dir={isRtl ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex h-16 items-center justify-between gap-3">
          {/* Logo — always shrink-0 so it never gets crushed */}
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#f59e0b" }}>
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#f59e0b" }}>
              addmetour
            </span>
          </Link>

          {/* Nav links — min-w-0 so it can shrink for long translations, no shrink-0 */}
          <nav className="hidden xl:flex items-center gap-3 min-w-0 flex-1 justify-center">
            {[
              { label: t.nav.tours, href: "#tours" },
              { label: t.nav.destinations, href: "#destinations" },
              { label: t.nav.about, href: "#about" },
              { label: t.nav.reviews, href: "#reviews" },
              { label: t.nav.faq, href: "#faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </Link>
            ))}

            {/* ── Services Dropdown (Zero mystery icons, zero overflow in any language) ── */}
            {/* ── Services Dropdown (Eye-catching pill, zero mystery icons, zero overflow) ── */}
            <div
              id="services-dropdown-container"
              className="relative shrink-0"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (servicesTimeoutRef.current) {
                    clearTimeout(servicesTimeoutRef.current);
                    servicesTimeoutRef.current = null;
                  }
                  setServicesDropdownOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold transition-colors duration-150 cursor-pointer py-1.5 px-3 rounded-full border whitespace-nowrap shadow-sm shrink-0 ${
                  servicesDropdownOpen
                    ? "bg-amber-400 text-[#061225] border-amber-300 ring-2 ring-amber-400/30"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-amber-400/60"
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <Sparkles className={`h-3.5 w-3.5 shrink-0 ${servicesDropdownOpen ? "text-[#061225]" : "text-amber-400"}`} />
                <span>
                  {language === "AZ"
                    ? "Xidmətlər"
                    : language === "RU"
                    ? "Услуги"
                    : language === "FR"
                    ? "Services"
                    : language === "AR"
                    ? "الخدمات"
                    : language === "DE"
                    ? "Services"
                    : "Services"}
                </span>
                <span className={`text-[9px] font-black rounded-full px-1.5 py-0.5 leading-none shrink-0 border ${
                  servicesDropdownOpen
                    ? "bg-[#061225] text-amber-300 border-transparent"
                    : "bg-amber-400/20 text-amber-300 border-amber-400/30"
                }`}>
                  6
                </span>
                <ChevronDown
                  className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#061225]" : "text-white/70"
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute start-0 top-full pt-2 w-80 z-50"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <div
                    className="rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl border border-white/10"
                    style={{ backgroundColor: "#061225" }}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>
                        {language === "AZ"
                          ? "Səyahət Xidmətləri"
                          : language === "RU"
                          ? "Туристические Услуги"
                          : language === "FR"
                          ? "Services Touristiques"
                          : language === "AR"
                          ? "خدمات السفر"
                          : language === "DE"
                          ? "Reise-Services"
                          : "Travel Services"}
                      </span>
                      <span className="text-[9px] text-amber-400 font-semibold">6 Services</span>
                    </div>

                    {/* eSIM Internet */}
                    <Link
                      href="/esim"
                      onClick={closeServicesDropdown}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Wifi className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                            {language === "AZ" ? "eSIM Mobil İnternet" : language === "RU" ? "eSIM Интернет" : language === "FR" ? "eSIM Internet" : language === "AR" ? "شريحة إنترنت eSIM" : language === "DE" ? "eSIM Internet" : "Tourist eSIM Internet"}
                          </span>
                          <span className="rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 text-[9px] font-semibold">
                            4G/5G
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {language === "AZ"
                            ? "Sürətli internet, ani QR kod aktivasiyası"
                            : language === "RU"
                            ? "Высокоскоростной интернет, мгновенный QR"
                            : language === "FR"
                            ? "Internet 4G/5G, activation QR immédiate"
                            : language === "AR"
                            ? "إنترنت 4G/5G فائق السرعة مع رمز QR فوري"
                            : language === "DE"
                            ? "Highspeed 4G/5G, sofortige QR-Aktivierung"
                            : "High-speed 4G/5G tourist data, instant QR"}
                        </p>
                      </div>
                    </Link>

                    {/* e-Visa */}
                    <Link
                      href="/visa"
                      onClick={closeServicesDropdown}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                            {t.nav.evisa}
                          </span>
                          <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-semibold">
                            {t.nav.fastBadge || "3h"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {language === "AZ"
                            ? "Rəsmi ASAN Elektron Viza"
                            : language === "RU"
                            ? "Официальная виза ASAN за 3 часа"
                            : language === "FR"
                            ? "e-Visa officiel ASAN en 3h"
                            : language === "AR"
                            ? "تأشيرة ASAN الرسمية خلال 3 ساعات"
                            : language === "DE"
                            ? "Offizielles ASAN e-Visum in 3 Std."
                            : "Official ASAN 3-hour electronic visa"}
                        </p>
                      </div>
                    </Link>

                    {/* Airport Transfer */}
                    <Link
                      href="/transfer"
                      onClick={closeServicesDropdown}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Car className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                            {t.nav.transfer}
                          </span>
                          <span className="rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 text-[9px] font-semibold">
                            24/7 VIP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {language === "AZ"
                            ? "GYD Hava Limanı transferi · Qadın sürücü seçimi"
                            : language === "RU"
                            ? "Трансфер из GYD · Женщина-водитель"
                            : language === "FR"
                            ? "Transfert aéroport GYD · Option chauffeuse"
                            : language === "AR"
                            ? "توصيل مطار باكو · خيار سائقة أنثى"
                            : language === "DE"
                            ? "Baku GYD Transfer · Chauffeurin"
                            : "Baku GYD Airport pickup · Female chauffeur"}
                        </p>
                      </div>
                    </Link>

                    {/* Custom Itinerary */}
                    <Link
                      href="/custom-itinerary"
                      onClick={closeServicesDropdown}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                          {language === "AZ"
                            ? "Fərdi Tur Planlayıcı"
                            : language === "RU"
                            ? "Конструктор Туров"
                            : language === "FR"
                            ? "Circuit Sur-Mesure"
                            : language === "AR"
                            ? "تصميم برنامج خاص"
                            : language === "DE"
                            ? "Individueller Reiseplaner"
                            : "Custom Tour Planner"}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {language === "AZ"
                            ? "Fərdi səyahət marşrutu qurun"
                            : language === "RU"
                            ? "Индивидуальный маршрут под ключ"
                            : language === "FR"
                            ? "Votre voyage personnalisé en Azerbaïdjan"
                            : language === "AR"
                            ? "صمم برنامجك السياحي الخاص"
                            : language === "DE"
                            ? "Maßgeschneiderte Reise durch Aserbaidschan"
                            : "Tailor-made Caucasus bespoke journeys"}
                        </p>
                      </div>
                    </Link>

                    {/* Medical & MICE */}
                    <div className="border-t border-white/10 my-1 pt-1">
                      <Link
                        href="/medical"
                        onClick={closeServicesDropdown}
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>
                          {language === "AZ"
                            ? "🩺 Müalicəvi Turizm & Naftalan"
                            : language === "RU"
                            ? "🩺 Медицинский Туризм и СПА"
                            : language === "FR"
                            ? "🩺 Tourisme Médical & Spa"
                            : language === "AR"
                            ? "🩺 السياحة العلاجية والاستشفاء"
                            : language === "DE"
                            ? "🩺 Medizintourismus & Kur"
                            : "🩺 Medical Tourism & SPA"}
                        </span>
                        <ArrowRight className="h-3 w-3 text-slate-500" />
                      </Link>
                      <Link
                        href="/mice"
                        onClick={closeServicesDropdown}
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>
                          {language === "AZ"
                            ? "🏢 MICE & Korporativ Tədbirlər"
                            : language === "RU"
                            ? "🏢 MICE и Корпоративы"
                            : language === "FR"
                            ? "🏢 MICE & Événements d'Entreprise"
                            : language === "AR"
                            ? "🏢 سياحة المؤتمرات والشركات"
                            : language === "DE"
                            ? "🏢 MICE & Firmenevents"
                            : "🏢 MICE & Corporate"}
                        </span>
                        <ArrowRight className="h-3 w-3 text-slate-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side — always shrink-0 so controls stay visible */}
          <div suppressHydrationWarning className="flex items-center gap-1.5 sm:gap-2 relative shrink-0">
            {/* Interactive Language & Currency Selectors (Desktop Navbar only; on mobile, cleanly accessible in drawer) */}
            <div className="hidden xl:flex items-center gap-1.5 sm:gap-2">
              <LanguageSelector variant="dark" />
              <CurrencySelector variant="dark" />
            </div>

            {/* Saved Tours quick button in Navbar */}
            <button
              onClick={() => {
                setActiveFilter?.("Saved");
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title={t.nav.saved}
            >
              <div className="relative flex items-center justify-center">
                <Heart
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    savedTourIds.length > 0 ? "fill-[#f59e0b] text-[#f59e0b]" : "text-white/80"
                  }`}
                />
                {savedTourIds.length > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full text-[9px] font-bold px-0.5 shadow-sm"
                    style={{ backgroundColor: "#f59e0b", color: "#061225" }}
                  >
                    {savedTourIds.length}
                  </span>
                )}
              </div>
              <span className="hidden 2xl:inline">{t.nav.saved}</span>
            </button>

            {!mounted ? (
              <div className="hidden sm:block h-8 w-24 rounded-full bg-white/5 shrink-0" />
            ) : currentUser ? (
              <div id="user-dropdown-container" className="relative shrink-0 animate-fade-in">
                <button
                  onClick={() => {
                    setUserDropdownOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-2 rounded-full py-1.5 px-3 transition-colors hover:bg-white/10 cursor-pointer shrink-0 whitespace-nowrap"
                  style={{ border: "1px solid rgba(245, 158, 11, 0.4)" }}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0"
                    style={{ backgroundColor: "#f59e0b" }}
                  >
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[120px] truncate hidden md:inline">
                    {currentUser.name || currentUser.email.split("@")[0]}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-white/70 shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute end-0 top-full mt-2 w-56 rounded-2xl p-2 shadow-2xl z-50 animate-scale-up"
                    style={{
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #e0f2fe",
                    }}
                  >
                    <div className="px-3 py-2 border-b border-slate-200/80 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.name || "Traveler"}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    {currentUser.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 mb-1 shadow-sm"
                        style={{ backgroundColor: "#0f3460" }}
                      >
                        <Shield className="h-3.5 w-3.5 text-[#f59e0b]" />
                        {t.nav.adminPortal}
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActiveFilter?.("Saved");
                        const el = document.getElementById("tours");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-black/5 transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="h-3.5 w-3.5 text-[#f59e0b]" />
                        {t.nav.saved}
                      </span>
                      {savedTourIds.length > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800">
                          {savedTourIds.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : authChecking ? (
              <div className="hidden sm:block h-8 w-24 rounded-full bg-white/5 animate-pulse shrink-0" />
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 animate-fade-in">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthOpen(true);
                  }}
                  className="hidden md:inline-block text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthOpen(true);
                  }}
                  className="hidden sm:inline-block rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer whitespace-nowrap shrink-0"
                  style={{ backgroundColor: "#f59e0b", color: "#061225" }}
                >
                  {language === "AZ"
                    ? "Qeydiyyat"
                    : language === "RU"
                    ? "Регистрация"
                    : language === "FR"
                    ? "S'inscrire"
                    : language === "AR"
                    ? "إنشاء حساب"
                    : language === "DE"
                    ? "Registrieren"
                    : "Sign Up"}
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex xl:hidden items-center justify-center h-8 w-8 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div suppressHydrationWarning dir={isRtl ? "rtl" : "ltr"} className="xl:hidden border-t border-white/10 px-4 py-4 space-y-3 bg-[#0f3460] animate-fade-in shadow-xl">
            <div className="flex flex-col space-y-1">
              {[
                { label: t.nav.tours, href: "#tours" },
                { label: t.nav.destinations, href: "#destinations" },
                { label: t.nav.about, href: "#about" },
                { label: t.nav.reviews, href: "#reviews" },
                { label: t.nav.faq, href: "#faq" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* eSIM link in mobile menu */}
              <Link
                href="/esim"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm shadow-md mt-2 transition-transform active:scale-98 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              >
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  <span>
                    {language === "AZ"
                      ? "eSIM Mobil İnternet"
                      : language === "RU"
                      ? "eSIM Интернет"
                      : "Tourist eSIM Internet"}
                  </span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                  4G/5G
                </span>
              </Link>

              {/* e-Visa link in mobile menu */}
              <Link
                href="/visa"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm shadow-md mt-1 transition-transform active:scale-98"
                style={{ backgroundColor: "#f59e0b", color: "#061225" }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{t.nav.evisa}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#061225] text-[#f59e0b]">
                  {t.nav.fastBadge}
                </span>
              </Link>

              {/* Transfer link in mobile menu */}
              <Link
                href="/transfer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm shadow-md mt-1 transition-transform active:scale-98 bg-sky-600 text-white"
              >
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>{t.nav.transfer}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white">
                  GYD · GJA · NAJ
                </span>
              </Link>

              {/* Custom Itinerary link in mobile menu */}
              <Link
                href="/custom-itinerary"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm shadow-md mt-1 transition-transform active:scale-98 bg-gradient-to-r from-amber-500 to-amber-600 text-[#061225]"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#061225]" />
                  <span>
                    {language === "AZ"
                      ? "Xüsusi Tur Planlayıcı"
                      : language === "RU"
                      ? "Индивидуальный Тур"
                      : "Custom Tour Planner"}
                  </span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#061225] text-amber-400">
                  Interactive
                </span>
              </Link>

              {/* Medical & MICE links in mobile menu */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Link
                  href="/medical"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white transition-colors text-center"
                >
                  <span>🩺</span>
                  <span>{language === "AZ" ? "Tibbi Turizm" : language === "RU" ? "Медтуризм" : "Medical"}</span>
                </Link>
                <Link
                  href="/mice"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white transition-colors text-center"
                >
                  <span>🏢</span>
                  <span>{language === "AZ" ? "MICE Korporativ" : language === "RU" ? "MICE Бизнес" : "MICE"}</span>
                </Link>
              </div>

              {/* Auth actions in mobile menu */}
              {currentUser ? (
                <div className="pt-3 border-t border-white/10 mt-2 flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0"
                      style={{ backgroundColor: "#f59e0b" }}
                    >
                      {currentUser.name
                        ? currentUser.name.charAt(0).toUpperCase()
                        : currentUser.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left leading-none max-w-[170px]">
                      <span className="text-xs font-bold text-white truncate">
                        {currentUser.name || "Traveler"}
                      </span>
                      <span className="text-[10px] text-white/60 truncate mt-0.5">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-red-300 hover:text-white bg-red-500/20 hover:bg-red-500/30 transition-colors cursor-pointer"
                  >
                    {t.nav.logout}
                  </button>
                </div>
              ) : !authChecking ? (
                <div className="pt-3 border-t border-white/10 mt-2 flex gap-2 animate-fade-in">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setIsAuthOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors text-center cursor-pointer"
                  >
                    {t.nav.signIn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setIsAuthOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-95 shadow-md text-center cursor-pointer"
                    style={{ backgroundColor: "#f59e0b", color: "#061225" }}
                  >
                    {language === "AZ"
                      ? "Qeydiyyat"
                      : language === "RU"
                      ? "Регистрация"
                      : language === "FR"
                      ? "S'inscrire"
                      : language === "AR"
                      ? "إنشاء حساب"
                      : language === "DE"
                      ? "Registrieren"
                      : "Sign Up"}
                  </button>
                </div>
              ) : null}

              {/* Language selection in mobile menu */}
              <div className="pt-3 border-t border-white/10 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-2 px-1">
                  {t.nav.selectLanguage}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          handleSelectLanguage(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-sky-500 text-white shadow-sm ring-1 ring-white/30"
                            : "bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeLabel}</span>
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currency selection in mobile menu */}
              <div className="pt-3 border-t border-white/10 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-2 px-1">
                  Select Currency
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {currencies.map((c) => {
                    const isSelected = currency === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCurrency(c.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500 text-[#061225] font-bold shadow-sm"
                            : "bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-bold">{c.symbol}</span>
                          <span>{c.code}</span>
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#061225]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
  );
};
