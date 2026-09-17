"use client";

/**
 * AddmeTour — Full Landing Page
 * Sections: Navbar → Hero → Stats → Search → Popular Tours → Why Us → Destinations
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin, Search, Clock, Users, Star, ChevronDown, ChevronLeft, ChevronRight,
  Zap, Shield, MessageCircle, Award, ArrowRight, Globe,
  Eye, EyeOff, X, Menu, LogOut, User as UserIcon, Loader2, AlertCircle, Bookmark, Heart, FileText, Car, Check,
  Share2, Copy, Sparkles, CheckCheck, DollarSign, TrendingUp, Download, BadgeCheck, ThumbsUp
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/lib/currency-context";
import { LOCALIZED_SLIDES, LOCALIZED_TOURS, LOCALIZED_TESTIMONIALS, getLocalizedTour } from "@/lib/tours-i18n";
import { useSiteSettings } from "@/lib/settings-context";
import { TourCardsSkeleton } from "@/components/Skeletons";
import { CustomSelect } from "@/components/CustomSelect";
import type { AuthUser } from "@/components/AuthModal";

// ─── Dynamic Modal Imports (Zero Main Thread Blocking until Opened) ────────────
const AuthModal = dynamic(() => import("@/components/AuthModal"), {
  ssr: false,
});

const TourReservationModal = dynamic(
  () => import("@/components/TourReservationModal"),
  {
    ssr: false,
  }
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOUR_FILTERS = ["All", "City", "Day Trip", "Overnight", "Adventure"] as const;

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85",
    alt: "Great Caucasus Mountains in Azerbaijan",
    badge: "TripAdvisor Travelers' Choice · Baku, Azerbaijan",
    title: "Into the Great Caucasus",
    subtitle: "Highland villages, Silk Road caravansaries, and mountain air — Azerbaijan beyond the city.",
    primaryCta: { text: "Explore Our Tours", href: "#tours" },
    secondaryCta: { text: "Airport Transfer", href: "/transfer" },
  },
  {
    image: "/images/baku-maiden-tower-wide.jpg",
    alt: "Baku Maiden Tower and Old City Icherisheher",
    badge: "UNESCO Heritage & Modern Marvels",
    title: "Enchanting Baku & Caspian Shores",
    subtitle: "Cobblestone alleys of ancient Icherisheher, dazzling Flame Towers, and seaside boulevard sunsets.",
    primaryCta: { text: "Discover Baku Tours", href: "#tours" },
    secondaryCta: { text: "Apply for e-Visa", href: "/visa" },
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=85",
    alt: "Gobustan and Land of Sacred Fire Azerbaijan",
    badge: "Mystical Land of Fire · Ancient Wonders",
    title: "Gobustan & The Land of Sacred Fire",
    subtitle: "Active bubbling mud volcanoes, 40,000-year-old prehistoric rock art, and eternal burning flames.",
    primaryCta: { text: "Book Day Trips", href: "#tours" },
    secondaryCta: { text: "Fast e-Visa 3h", href: "/visa" },
  },
];

const TOURS = [
  {
    id: "t1",
    slug: "baku-old-city-walking-tour",
    badge: "Bestseller",
    badgeColor: "bg-[#f59e0b] text-[#061225] font-bold shadow-sm",
    image: "/images/baku-old-city.jpg",
    tags: ["Walking", "History", "Culture"],
    rating: 4.9,
    reviews: 214,
    title: "Baku Old City Walking Tour",
    desc: "Wander through the UNESCO-listed Icherisheher (Old City), discover ancient caravanserais and hidden courtyards.",
    duration: "3 hours",
    groupSize: "Up to 10",
    originalPrice: 35,
    price: 25,
    category: "City",
  },
  {
    id: "t2",
    slug: "absheron-peninsula-day-trip",
    badge: "Popular",
    badgeColor: "bg-brand-800 text-white",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    tags: ["History", "Nature", "Private"],
    rating: 4.8,
    reviews: 142,
    title: "Absheron Peninsula Day Trip",
    desc: "Explore the Ateshgah Fire Temple, the otherworldly Yanar Dag, and coastal landscapes unique to Azerbaijan.",
    duration: "8 hours",
    groupSize: "Up to 8",
    originalPrice: null,
    price: 65,
    category: "Day Trip",
  },
  {
    id: "t3",
    slug: "sheki-cultural-journey",
    badge: "Limited Deal",
    badgeColor: "bg-red-600 text-white",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    tags: ["Overnight", "Culture", "Scenery"],
    rating: 5.0,
    reviews: 87,
    title: "Sheki Cultural Journey",
    desc: "Drive north into the Caucasus foothills to Sheki's 18th-century Khan Palace and medieval caravanserai.",
    duration: "2 days",
    groupSize: "Up to 6",
    originalPrice: 180,
    price: 149,
    category: "Overnight",
  },
  {
    id: "t4",
    slug: "modern-baku-architecture-tour",
    badge: null,
    badgeColor: "",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    tags: ["Architecture", "Photography", "Walking"],
    rating: 4.7,
    reviews: 98,
    title: "Modern Baku Architecture Tour",
    desc: "Discover Baku's transformation from Soviet city to futuristic skyline — the Flame Towers and Heydar Aliyev Center.",
    duration: "4 hours",
    groupSize: "Up to 12",
    originalPrice: null,
    price: 35,
    category: "City",
  },
  {
    id: "t5",
    slug: "gobustan-petroglyphs-mud-volcanoes",
    badge: "Top Rated",
    badgeColor: "bg-brand-800 text-white",
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
    tags: ["Nature", "Archaeology", "Unique"],
    rating: 4.9,
    reviews: 167,
    title: "Gobustan Petroglyphs & Mud Volcanoes",
    desc: "Visit one of the world's oldest art galleries — 20,000-year-old rock carvings, then witness Azerbaijan's famous mud volcanoes.",
    duration: "6 hours",
    groupSize: "Up to 8",
    originalPrice: 70,
    price: 55,
    category: "Day Trip",
  },
  {
    id: "t6",
    slug: "caucasus-mountain-highlands",
    badge: "Adventure",
    badgeColor: "bg-white text-slate-900 shadow-sm font-semibold",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    tags: ["Adventure", "Mountains", "Villages"],
    rating: 4.8,
    reviews: 61,
    title: "Caucasus Mountain Highlands",
    desc: "Drive north into the Great Caucasus range to the medieval village of Lahij, the mountain town of Gabala, and dramatic highland scenery above 2,000 metres.",
    duration: "Full day",
    groupSize: "Up to 6",
    originalPrice: 95,
    price: 85,
    category: "Adventure",
  },
];



const DESTINATIONS = [
  {
    slug: "baku",
    name: "Baku",
    subtitle: "City of Winds",
    tours: 12,
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1000&q=80",
  },
  {
    slug: "absheron",
    name: "Absheron",
    subtitle: "Fire & Legend",
    tours: 5,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80",
  },
  {
    slug: "sheki",
    name: "Sheki",
    subtitle: "Silk Road Heritage",
    tours: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80",
  },
  {
    slug: "gobustan",
    name: "Gobustan",
    subtitle: "Ancient Rock Art",
    tours: 3,
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1000&q=80",
  },
];

const TESTIMONIALS = [
  {
    id: "rev-1",
    quote:
      "Our guide Elchin was extraordinary — deeply knowledgeable, funny, and genuinely passionate about Baku's history. The Old City tour felt like walking through living pages of a history book. Absolutely book this.",
    initials: "SM",
    name: "Sarah Mitchell",
    subtitle: "United Kingdom · Baku Old City Walking Tour",
    rating: 5,
  },
  {
    id: "rev-2",
    quote:
      "We did the Absheron Peninsula tour and couldn't believe how much was packed into one day. The fire temple at sunset was one of the most beautiful things I've ever seen. AddmeTour made it seamless.",
    initials: "MF",
    name: "Marco Ferretti",
    subtitle: "Italy · Absheron Peninsula Day Trip",
    rating: 5,
  },
  {
    id: "rev-3",
    quote:
      "The Gobustan mud volcanoes were unlike anything I've seen anywhere in the world. Our driver was punctual, the guide was excellent, and the whole experience was perfectly organized. Highly recommended.",
    initials: "YT",
    name: "Yuki Tanaka",
    subtitle: "Japan · Gobustan Petroglyphs & Mud Volcanoes",
    rating: 5,
  },
];

const DURATIONS = ["Any duration", "Half day (1–4h)", "Full day (5–8h)", "Multi-day"];



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { settings: siteConfig } = useSiteSettings();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeDuration, setActiveDuration] = useState(DURATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toursList, setToursList] = useState(TOURS);
  const [toursLoading, setToursLoading] = useState(false);
  const [savedTourIds, setSavedTourIds] = useState<string[]>([]);
  const [bookingModalTour, setBookingModalTour] = useState<{ id: string; title: string; price: number } | null>(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, currentLangInfo, isRtl, languages, showToast } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currency, setCurrency, activeCurrency, currencies, formatPrice, formatPriceWithSubtext } = useCurrency();

  // Scroll listener for sticky header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      setShareCopied(true);
      showToast(
        language === "AZ"
          ? "Keçid kopyalandı!"
          : language === "RU"
          ? "Ссылка скопирована!"
          : "Link copied to clipboard!",
        "success"
      );
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#user-dropdown-container")) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  // Auto-advance hero background slider & non-blocking background initialization
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    // Defer non-critical background data fetching to keep main thread completely idle during initial hydration
    const runDeferredTasks = () => {
      try {
        const saved = localStorage.getItem("travel_saved_tour_ids");
        if (saved) {
          setSavedTourIds(JSON.parse(saved));
        }
      } catch {}

      fetch("/api/auth/me", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            setCurrentUser(data.user);
          } else {
            setCurrentUser(null);
          }
        })
        .catch(() => {
          setCurrentUser(null);
        });

      fetch("/api/tours", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data?.tours && data.tours.length > 0) {
            setToursList(data.tours);
          }
        })
        .catch(() => {});

      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("auth") === "login") {
          setAuthMode("login");
          setIsAuthOpen(true);
        }
        if (urlParams.get("auth_provider")) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as any).requestIdleCallback(runDeferredTasks, { timeout: 1500 });
      return () => {
        clearInterval(timer);
        if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(idleId);
      };
    } else {
      const timeoutId = setTimeout(runDeferredTasks, 100);
      return () => {
        clearInterval(timer);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const toggleSaveTour = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const exists = savedTourIds.includes(id);
    const next = exists
      ? savedTourIds.filter((item) => item !== id)
      : [...savedTourIds, id];
    setSavedTourIds(next);
    try {
      localStorage.setItem("travel_saved_tour_ids", JSON.stringify(next));
    } catch {}
    showToast(exists ? t.tours.savedToastRemove : t.tours.savedToastAdd);
  };

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      setCurrentUser(null);
      setUserDropdownOpen(false);
      const logoutMsg =
        language === "AZ"
          ? "Uğurla çıxış edildi"
          : language === "RU"
          ? "Вы успешно вышли"
          : language === "FR"
          ? "Déconnexion réussie"
          : language === "AR"
          ? "تم تسجيل الخروج بنجاح"
          : language === "DE"
          ? "Erfolgreich abgemeldet"
          : "Logged out successfully";
      showToast(logoutMsg);
    } catch {}
  };

  const filteredTours = toursList.filter((t) => {
    // 1. Category / Saved filter
    let matchesCategory = true;
    if (activeFilter === "Saved") {
      matchesCategory = savedTourIds.includes(t.id);
    } else if (activeFilter !== "All") {
      matchesCategory = t.category === activeFilter;
    }

    // 2. Search query filter
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));

    // 3. Duration filter
    let matchesDuration = true;
    if (activeDuration === "Half day (1–4h)") {
      matchesDuration = t.duration.toLowerCase().includes("hour") || t.duration.toLowerCase().includes("half");
    } else if (activeDuration === "Full day (5–8h)") {
      matchesDuration = t.duration.toLowerCase().includes("1 day") || t.duration.toLowerCase().includes("full");
    } else if (activeDuration === "Multi-day") {
      matchesDuration = !t.duration.toLowerCase().includes("hour") && !t.duration.toLowerCase().includes("1 day");
    }

    return matchesCategory && matchesSearch && matchesDuration;
  });

  const activeHeroSlide = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0]!;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>

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
                className="text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* ── e-Visa CTA — icon+text at 2xl+, icon-only at xl ── */}
            <Link
              href="/visa"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white whitespace-nowrap shrink-0"
              title={t.nav.evisa}
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              <span className="hidden 2xl:inline">{t.nav.evisa}</span>
              <span className="hidden 2xl:inline ms-0.5 rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-slate-300 shrink-0">
                {t.nav.fastBadge}
              </span>
            </Link>

            {/* ── Airport Transfer CTA — icon+text at 2xl+, icon-only at xl ── */}
            <Link
              href="/transfer"
              className="flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200 backdrop-blur-sm transition-all duration-200 hover:border-sky-300 hover:bg-sky-500/25 hover:text-white whitespace-nowrap shrink-0"
              title={t.nav.transfer}
            >
              <Car className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span className="hidden 2xl:inline">{t.nav.transfer}</span>
            </Link>

            {/* ── Custom Itinerary CTA — icon+text at 2xl+, icon-only at xl ── */}
            <Link
              href="/custom-itinerary"
              className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-sm transition-all duration-200 hover:border-amber-300 hover:bg-amber-500/25 hover:text-white whitespace-nowrap shrink-0"
              title="Custom Tour Builder"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="hidden 2xl:inline">Custom Planner</span>
            </Link>
          </nav>

          {/* Right side — always shrink-0 so controls stay visible */}
          <div className="flex items-center gap-1.5 sm:gap-2 relative shrink-0">
            {/* Interactive Language & Currency Selectors (Desktop Navbar only; on mobile, cleanly accessible in drawer) */}
            <div className="hidden xl:flex items-center gap-1.5 sm:gap-2">
              <LanguageSelector variant="dark" />
              <CurrencySelector variant="dark" />
            </div>

            {/* Saved Tours quick button in Navbar */}
            <button
              onClick={() => {
                setActiveFilter("Saved");
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title={t.nav.saved}
            >
              <Heart
                className={`h-4 w-4 shrink-0 transition-colors ${
                  savedTourIds.length > 0 ? "fill-[#f59e0b] text-[#f59e0b]" : "text-white/80"
                }`}
              />
              <span className="hidden 2xl:inline">{t.nav.saved}</span>
              {savedTourIds.length > 0 && (
                <span
                  className="flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] font-bold px-1 shrink-0"
                  style={{ backgroundColor: "#f59e0b", color: "#061225" }}
                >
                  {savedTourIds.length}
                </span>
              )}
            </button>

            {currentUser ? (
              <div id="user-dropdown-container" className="relative shrink-0">
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
                        setActiveFilter("Saved");
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
            ) : (
              <>
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
              </>
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
          <div dir={isRtl ? "rtl" : "ltr"} className="xl:hidden border-t border-white/10 px-4 py-4 space-y-3 bg-[#0f3460] animate-fade-in shadow-xl">
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

              {/* e-Visa link in mobile menu */}
              <Link
                href="/visa"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm shadow-md mt-2 transition-transform active:scale-98"
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
                  <span>Custom Tour Planner</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#061225] text-amber-400">
                  Interactive
                </span>
              </Link>

              {/* Auth actions in mobile menu for non-logged in users */}
              {!currentUser && (
                <div className="pt-3 border-t border-white/10 mt-2 flex gap-2">
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
              )}

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

      {/* ═══════════════════════════════════════════════════════ HERO SLIDER */}
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
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className={`object-cover object-center transition-opacity duration-700 ${
                    index === currentSlide ? "animate-ken-burns" : "scale-100"
                  }`}
                  priority={index === 0}
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

      {/* ═══════════════════════════════════════════════════════ STATS */}
      <div style={{ backgroundColor: "#0c2d54" }}>
        <div className="container-section">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
            {[
              { value: "3,500+", label: language === "AZ" ? "Məmnun Səyahətçi" : language === "RU" ? "Довольных туристов" : language === "AR" ? "مسافر سعيد" : "Happy Travelers" },
              { value: "50+",    label: language === "AZ" ? "Özəl Tur" : language === "RU" ? "Авторских туров" : language === "AR" ? "برنامج سياحي" : "Unique Tours" },
              { value: "15+",    label: language === "AZ" ? "Yerli Bələdçi" : language === "RU" ? "Местных гидов" : language === "AR" ? "مرشد خبير" : "Expert Guides" },
              { value: "99.2%", label: language === "AZ" ? "Viza Təsdiqi" : language === "RU" ? "Одобрение виз" : language === "AR" ? "معدل الموافقة" : "Visa Approval" },
              { value: "⚡ 3h", label: language === "AZ" ? "Sürətli e-Viza" : language === "RU" ? "Экспресс e-Виза" : language === "AR" ? "تأشيرة سريعة" : "Express e-Visa" },
              { value: "4.9★",  label: language === "AZ" ? "TripAdvisor" : language === "RU" ? "TripAdvisor" : language === "AR" ? "تريب أدفايزر" : "TripAdvisor" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5 px-3 text-center">
                <span className="font-display text-xl font-bold" style={{ color: "#f59e0b" }}>
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] text-white/55 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ TRUST STRIP */}
      <div style={{ backgroundColor: "#071d3b" }} className="overflow-hidden border-t border-white/5">
        <div className="container-section">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
            {[
              { icon: "🏛️", text: language === "AZ" ? "Rəsmi ASAN e-Viza Tərəfdaşı" : language === "RU" ? "Официальный партнёр ASAN e-Visa" : language === "AR" ? "شريك رسمي لتأشيرة ASAN" : "Official ASAN e-Visa Partner" },
              { icon: "🔒", text: language === "AZ" ? "SSL Şifrəli & Təhlükəsiz Ödəniş" : language === "RU" ? "SSL защита и безопасная оплата" : language === "AR" ? "SSL آمن ومدفوعات مشفرة" : "SSL Secured & Safe Payments" },
              { icon: "⭐", text: language === "AZ" ? "4.9 TripAdvisor · 600+ Rəy" : language === "RU" ? "4.9 TripAdvisor · 600+ отзывов" : language === "AR" ? "4.9 تريب أدفايزر · +600 تقييم" : "4.9 TripAdvisor · 600+ Reviews" },
              { icon: "💬", text: language === "AZ" ? "24/7 VIP WhatsApp Dəstəyi" : language === "RU" ? "Поддержка 24/7 в WhatsApp" : language === "AR" ? "دعم واتساب VIP على مدار الساعة" : "24/7 VIP WhatsApp Support" },
              { icon: "📋", text: language === "AZ" ? "Lisenziyalı Azərbaycan Turizm Agentliyi" : language === "RU" ? "Лицензированное туристическое агентство" : language === "AR" ? "وكالة سياحية معتمدة" : "Licensed Azerbaijan Tourism Agency" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-white/60 whitespace-nowrap">
                <span className="text-sm">{item.icon}</span>
                <span>{item.text}</span>
                {i < 4 && <span className="hidden md:inline text-white/20 ml-4">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ SEARCH BAR */}
      <div style={{ backgroundColor: "#f0f9ff" }} className="py-10">
        <div className="container-section">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-card p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500/30 transition-all">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={t.search.placeholder}
                aria-label={t.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
              />
            </div>
            <div className="sm:w-auto sm:min-w-[180px]">
              <CustomSelect
                value={activeDuration}
                onChange={(val) => setActiveDuration(val)}
                ariaLabel={t.search.durationLabel}
                triggerClassName="bg-slate-50 border-none py-3"
                options={[
                  { val: "Any duration", label: t.search.durationAll },
                  { val: "Half day (1–4h)", label: t.search.durationHalf },
                  { val: "Full day (5–8h)", label: t.search.durationFull },
                  { val: "Multi-day", label: t.search.durationMulti },
                ]}
              />
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#0f3460" }}
            >
              <Search className="h-4 w-4" />
              <span>{t.nav.tours}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ POPULAR TOURS */}
      <section id="tours" className="py-16" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section">
          {/* Header + Filter tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-2">{t.tours.badge}</p>
              <h2 className="font-display text-4xl font-bold text-slate-900">
                {t.tours.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
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
                className="flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={
                  activeFilter === "Saved"
                    ? { backgroundColor: "#0f3460", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2d8cc" }
                }
              >
                <Heart
                  className={`h-3.5 w-3.5 transition-colors ${
                    activeFilter === "Saved"
                      ? "fill-[#f59e0b] text-[#f59e0b]"
                      : savedTourIds.length > 0
                      ? "fill-red-500 text-red-500"
                      : "text-slate-400"
                  }`}
                />
                <span>{t.nav.saved}</span>
                {savedTourIds.length > 0 && (
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      activeFilter === "Saved"
                        ? "bg-white/20 text-white"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {savedTourIds.length}
                  </span>
                )}
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
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2 min-h-[2.75rem]">
                      {tourDesc}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {tourDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {tourGroupSize}
                      </span>
                    </div>

                    {/* Price + Dual CTAs - Always pinned to bottom */}
                    <div className="flex flex-col gap-3 pt-4 mt-auto border-t border-slate-100">
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

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setBookingModalTour({ id: tour.id, title: tourTitle, price: tour.price });
                          }}
                          aria-label={`Reserve date for ${tourTitle} (${formatPrice(tour.price)})`}
                          className="w-full rounded-xl py-2.5 px-2 text-xs font-bold transition-all duration-200 border border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-98 text-center cursor-pointer shadow-sm"
                        >
                          📅 {t.bookingModal.reserveDateBtn}
                        </button>
                        <a
                          href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(
                            `Hello AddmeTour! I would like to book the "${tourTitle}" tour (${formatPrice(tour.price)} / $${tour.price} USD).`
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
                    setSearchQuery("");
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

      {/* ═══════════════════════════════════════════════════════ WHY TRAVEL WITH US */}
      <section id="about" className="py-20" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Features */}
            <div>
              <p className="section-label mb-4" style={{ color: "#f59e0b" }}>
                {t.whyUs.badge}
              </p>
              <h2 className="font-display text-4xl font-bold text-white leading-tight mb-6">
                {t.whyUs.title}
              </h2>
              <p className="text-white/80 leading-relaxed mb-10 text-base">
                {language === "AZ"
                  ? "AddmeTour ilə Azərbaycanın əsl ruhunu kəşf edin. Biz qədim İpək Yolu irsini, zəngin mətbəxi və Qafqazın əsrarəngiz təbiətini birləşdirən xüsusi fərdi və kiçik qruplar üçün unikal səyahətlər təşkil edirik."
                  : language === "RU"
                  ? "Откройте для себя истинную душу Азербайджана с AddmeTour. Мы создаем индивидуальные и авторские экскурсии, объединяя древнее наследие Шелкового пути и кавказское гостеприимство."
                  : language === "FR"
                  ? "Découvrez l'âme authentique de l'Azerbaïdjan avec AddmeTour. Nous concevons des circuits sur mesure alliant patrimoine historique et paysages grandioses du Caucase."
                  : language === "AR"
                  ? "اكتشف روح وسحر أذربيجان الحقيقية مع AddmeTour. نصمم رحلات سياحية خاصة تجمع بين عبق طريق الحرير وضيافة القوقاز الأصيلة."
                  : language === "DE"
                  ? "Entdecken Sie die Seele Aserbaidschans mit AddmeTour. Wir gestalten maßgeschneiderte Touren, die Seidenstraßen-Kultur mit herrlicher Kaukasus-Natur verbinden."
                  : "Discover the true soul of Azerbaijan with AddmeTour. We curate handcrafted private excursions and small-group journeys that blend centuries-old Silk Road heritage with authentic Caucasus hospitality."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Globe, title: t.whyUs.feature1Title, desc: t.whyUs.feature1Desc },
                  { icon: Shield, title: t.whyUs.feature2Title, desc: t.whyUs.feature2Desc },
                  { icon: Award, title: t.whyUs.feature3Title, desc: t.whyUs.feature3Desc },
                  { icon: MessageCircle, title: t.whyUs.feature4Title, desc: t.whyUs.feature4Desc },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl p-5 transition-all duration-200 hover:bg-white/10"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(245,158,11,0.20)" }}
                      >
                        <f.icon className="h-4 w-4" style={{ color: "#f59e0b" }} />
                      </div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo collage */}
            <div className="relative h-[480px]">
              {/* Main large photo */}
              <div className="absolute right-0 top-0 h-[300px] w-[75%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=85"
                  alt="Baku skyline"
                  fill
                  sizes="(max-width: 768px) 75vw, 600px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* Bottom-left photo */}
              <div className="absolute bottom-0 left-0 h-[200px] w-[55%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/baku-old-city.jpg"
                  alt="Old City Baku"
                  fill
                  sizes="(max-width: 768px) 55vw, 450px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* Bottom-right small photo */}
              <div className="absolute bottom-0 right-0 h-[160px] w-[35%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85"
                  alt="Azerbaijan landscape"
                  fill
                  sizes="(max-width: 768px) 35vw, 300px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* TripAdvisor badge */}
              <div
                className="absolute bottom-28 right-4 flex flex-col items-center justify-center rounded-2xl px-4 py-3 shadow-xl"
                style={{ backgroundColor: "#f59e0b" }}
              >
                <span className="text-2xl font-bold text-[#061225]">4.9</span>
                <span className="text-xs font-bold text-[#061225]/90">TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ WHERE WILL YOU GO */}
      <section id="destinations" className="py-20" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3">{t.destinations.badge}</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">
              {t.destinations.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              {t.destinations.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { slug: "baku", name: t.destinations.bakuName, subtitle: t.destinations.bakuDesc, tours: 12, image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1000&q=80" },
              { slug: "sheki", name: t.destinations.shekiName, subtitle: t.destinations.shekiDesc, tours: 4, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80" },
              { slug: "gabala", name: language === "AZ" ? "Qəbələ & Şahdağ" : language === "RU" ? "Габала и Шахдаг" : language === "AR" ? "غابالا و شاهداغ" : "Gabala & Shahdag", subtitle: language === "AZ" ? "Dağ kurortları və göllər" : language === "RU" ? "Горные курорты и озера" : language === "AR" ? "منتجعات جبلية وبحيرات" : "Alpine resorts, cable cars & emerald lakes", tours: 5, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80" },
              { slug: "gobustan", name: t.destinations.gobustanName, subtitle: t.destinations.gobustanDesc, tours: 3, image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1000&q=80" },
            ].map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                aria-label={`Explore ${dest.name} travel guide and tours`}
                className="group relative h-80 overflow-hidden rounded-2xl block shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                  style={{ objectFit: "cover" }}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm mb-2">
                    {language === "AZ" ? "Bələdçi & Turlar" : language === "RU" ? "Гид и туры" : language === "AR" ? "دليل وجولات" : "Guide & Tours"}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display leading-tight">{dest.name}</h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">{dest.subtitle}</p>
                  <span
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                    style={{ color: "#f59e0b" }}
                  >
                    {dest.tours} {t.nav.tours} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CAUCASUS COMBO TOURS */}
      <section className="py-20" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3" style={{ color: "#f59e0b" }}>
              {language === "AZ" ? "QAFQAZ MARŞRUTLARİ" : language === "RU" ? "КАВКАЗСКИЕ МАРШРУТЫ" : language === "AR" ? "رحلات القوقاز" : "CAUCASUS JOURNEYS"}
            </p>
            <h2 className="font-display text-4xl font-bold text-white mb-3">
              {language === "AZ" ? "Çox Ölkəli Kombinasiya Paketləri" : language === "RU" ? "Многострановые комбо-маршруты" : language === "AR" ? "باقات جولات متعددة الدول" : "Multi-Country Combo Packages"}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              {language === "AZ" ? "Azərbaycanı qonşu ölkələrlə birləşdirən unudulmaz səyahət paketləri" : language === "RU" ? "Незабываемые маршруты, объединяющие Азербайджан с соседними странами" : language === "AR" ? "باقات سياحية تجمع أذربيجان بدول الجوار" : "Unforgettable routes combining Azerbaijan with neighbouring countries"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: language === "AZ" ? "1 Səfərdə 3 Ölkə" : language === "RU" ? "3 страны за 1 поездку" : language === "AR" ? "3 دول في رحلة واحدة" : "3 Countries in 1 Trip",
                route: language === "AZ" ? "Bakı → Tbilisi → İstanbul" : language === "RU" ? "Баку → Тбилиси → Стамбул" : language === "AR" ? "باكو ← تبليسي ← إسطنبول" : "Baku → Tbilisi → Istanbul",
                days: "7",
                flags: "🇦🇿 🇬🇪 🇹🇷",
                price: 590,
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
                badge: language === "AZ" ? "Ən Populyar" : language === "RU" ? "Популярный" : language === "AR" ? "الأكثر شعبية" : "Most Popular",
              },
              {
                title: language === "AZ" ? "Qafqaz Dağ Marşrutu" : language === "RU" ? "Горный маршрут Кавказа" : language === "AR" ? "مسار جبال القوقاز" : "Caucasus Mountain Route",
                route: language === "AZ" ? "Bakı → Şəki → Lahıc → Gəncə" : language === "RU" ? "Баку → Шеки → Lahıc → Гянджа" : language === "AR" ? "باكو ← شيكي ← لاهيج ← غنجة" : "Baku → Sheki → Lahij → Ganja",
                days: "4",
                flags: "🇦🇿",
                price: 299,
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                badge: language === "AZ" ? "Macəra" : language === "RU" ? "Приключение" : language === "AR" ? "مغامرة" : "Adventure",
              },
              {
                title: language === "AZ" ? "Xəzər & İpək Yolu" : language === "RU" ? "Каспий и Шёлковый путь" : language === "AR" ? "بحر قزوين وطريق الحرير" : "Caspian & Silk Road",
                route: language === "AZ" ? "Bakı → Qobustan → Abşeron → Şəki" : language === "RU" ? "Баку → Гобустан → Апшерон → Шеки" : language === "AR" ? "باكو ← غوبوستان ← أبشيرون ← شيكي" : "Baku → Gobustan → Absheron → Sheki",
                days: "3",
                flags: "🇦🇿",
                price: 199,
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
                badge: language === "AZ" ? "Yeni" : language === "RU" ? "Новинка" : language === "AR" ? "جديد" : "New",
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-xs font-bold text-[#061225]" style={{ backgroundColor: "#f59e0b" }}>{pkg.badge}</span>
                    <span className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">{pkg.days} {language === "AZ" ? "Gün" : language === "RU" ? "дней" : language === "AR" ? "أيام" : "Days"}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-xl">{pkg.flags}</div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-1">{pkg.title}</h3>
                  <p className="text-xs text-white/50 mb-4">{pkg.route}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 block">{language === "AZ" ? "Qiymət" : language === "RU" ? "от" : language === "AR" ? "يبدأ من" : "from"}</span>
                      <span className="text-xl font-black text-white">{formatPrice(pkg.price)}</span>
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello AddmeTour! I'm interested in the "${pkg.title}" package (${pkg.route}, ${pkg.days} days).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#061225] transition-all duration-200 hover:opacity-90 hover:scale-105"
                      style={{ backgroundColor: "#f59e0b" }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {language === "AZ" ? "Sorğu göndər" : language === "RU" ? "Запросить" : language === "AR" ? "استفسر" : "Request Quote"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ TESTIMONIALS */}
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

      {/* ═══════════════════════════════════════════════════════ DISCOVER AZERBAIJAN TRAVEL GUIDE & HIGHLIGHTS */}
      <section id="guide" className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-section">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="section-label mb-3" style={{ color: "#0f3460" }}>
              {language === "AZ"
                ? "SƏYAHƏT BƏLƏDÇİSİ"
                : language === "RU"
                ? "ПУТЕВОДИТЕЛЬ ПО СТРАНЕ"
                : language === "FR"
                ? "GUIDE DE VOYAGE"
                : language === "AR"
                ? "دليل السفر السياحي"
                : language === "DE"
                ? "REISEFÜHRER"
                : "TRAVEL GUIDE & HIGHLIGHTS"}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              {language === "AZ"
                ? "Odlar Yurdu Azərbaycanın Əsas Məkanları"
                : language === "RU"
                ? "Откройте душу Азербайджана: Главные достопримечательности"
                : language === "FR"
                ? "Découvrez l'âme de l'Azerbaïdjan : Incontournables"
                : language === "AR"
                ? "اكتشف روح وسحر أذربيجان: أهم المعالم والتجارب"
                : language === "DE"
                ? "Entdecken Sie die Seele Aserbaidschans: Die Höhepunkte"
                : "Discover the Soul of Azerbaijan: Unmissable Highlights"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {language === "AZ"
                ? "Xəzər sahilindəki qədim İçərişəhərdən Böyük Qafqazın qarlı zirvələrinə qədər — zəngin İpək Yolu irsi, qədim palçıq vulkanları və əfsanəvi qonaqpərvərlik sizi gözləyir."
                : language === "RU"
                ? "От жемчужины Каспия Баку до величественных вершин Большого Кавказа — древнее наследие Шелкового пути, грязевые вулканы и легендарное кавказское гостеприимство."
                : language === "FR"
                ? "Des ruelles historiques de Bakou aux sommets du Grand Caucase : découvrez les trésors de la Route de la Soie, les volcans de boue et l'hospitalité légendaire."
                : language === "AR"
                ? "من أزقة باكو التاريخية إلى قمم جبال القوقاز الشاهقة: تراث طريق الحرير العريق، البراكين الطينية النادرة، وكرم الضيافة الأذربيجاني الأصيل."
                : language === "DE"
                ? "Von den historischen Gassen Bakus bis zu den Gipfeln des Großen Kaukasus: Erleben Sie das Erbe der Seidenstraße, Schlammvulkane und herzliche Gastfreundschaft."
                : "From the ancient stone streets of Baku to the majestic heights of the Great Caucasus — explore UNESCO Silk Road treasures, otherworldly mud volcanoes, and legendary Caucasian warmth."}
            </p>
          </div>

          {/* 4 Thematic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🏰",
                title: language === "AZ" ? "Qədim Bakı & Abşeron" : language === "RU" ? "Старый Баку и Апшерон" : language === "FR" ? "Bakou & Absheron" : language === "AR" ? "باكو القديمة وأبشيرون" : language === "DE" ? "Baku & Absheron" : "Baku & Absheron Heritage",
                desc: language === "AZ"
                  ? "YUNESKO mirası İçərişəhər, Qız Qalası, Şirvanşahlar Sarayı və əbədi yanan Atəşgah məbədi ilə Yanardağın alovları."
                  : language === "RU"
                  ? "ЮНЕСКО Ичеришехер, Девичья башня, Дворец Ширваншахов, огненный храм Атешгях и горящая гора Янардаг."
                  : language === "FR"
                  ? "La vieille ville d'Icherisheher (UNESCO), la tour de la Vierge, le temple du feu d'Ateshgah et le mont flamboyant Yanar Dag."
                  : language === "AR"
                  ? "المدينة القديمة إيشري شهر المدرجة في اليونسكو، برج العذراء، قصر الشروانشاهات، ومعبد النار التاريخي أتشكاه."
                  : language === "DE"
                  ? "UNESCO-Altstadt Icherisheher, Jungfrauenturm, Schirwanschah-Palast, Feuertempel Ateshgah und brennender Berg Yanar Dag."
                  : "Explore UNESCO Icherisheher, the iconic Maiden Tower, Shirvanshahs Palace, Zoroastrian Fire Temple Ateshgah, and Yanar Dag burning mountain.",
              },
              {
                icon: "🏔️",
                title: language === "AZ" ? "Böyük Qafqaz Zirvələri" : language === "RU" ? "Вершины Большого Кавказа" : language === "FR" ? "Montagnes du Caucase" : language === "AR" ? "قمم جبال القوقاز" : language === "DE" ? "Großer Kaukasus" : "Great Caucasus Wonders",
                desc: language === "AZ"
                  ? "Şahdağın qarlı yamacları, Qəbələnin zümrüd meşələri, Nohur gölü və Lahıc sənətkarlıq kəndinin daş cığırları."
                  : language === "RU"
                  ? "Горнолыжные курорты Шахдага, изумрудные леса Габалы, высокогорное озеро Нохур и ремесленный поселок Лагич."
                  : language === "FR"
                  ? "Les pistes alpines de Shahdag, les forêts émeraude de Gabala, le lac Nohur et le village artisanal de Lahidj."
                  : language === "AR"
                  ? "منتجعات شاهداغ الجبلية، غابات غابالا الساحرة، بحيرة نوهور الخلابة، وقرية الحرفيين التاريخية لاهيج."
                  : language === "DE"
                  ? "Schneebedeckte Hänge von Shahdag, smaragdgrüne Wälder in Gabala, Nohur-See und das historische Handwerkerdorf Lahij."
                  : "Ascend to alpine heights at Shahdag, cruise peaceful Lake Nohur in Gabala, and stroll cobblestone craft alleys of ancient Lahij.",
              },
              {
                icon: "🌋",
                title: language === "AZ" ? "Qobustan & Palçıq Vulkanları" : language === "RU" ? "Гобустан и Вулканы" : language === "FR" ? "Gobustan & Volcans" : language === "AR" ? "غوبوستان والبراكين الطينية" : language === "DE" ? "Gobustan & Vulkane" : "Gobustan & Mud Volcanoes",
                desc: language === "AZ"
                  ? "6000-dən çox qədim qayaüstü rəsm, qədim yaşayış məskənləri və dünyanın ən sıx palçıq vulkanı kompleksi."
                  : language === "RU"
                  ? "Более 6000 древних наскальных петроглифов ЮНЕСКО и уникальное скопление активных грязевых вулканов мира."
                  : language === "FR"
                  ? "Plus de 6000 pétroglyphes préhistoriques classés à l'UNESCO et le plus grand complexe de volcans de boue au monde."
                  : language === "AR"
                  ? "أكثر من 6000 نقش صخري أثري تعود للعصر الحجري ونصف براكين الطين النشطة في العالم بأسره."
                  : language === "DE"
                  ? "Über 6.000 prähistorische Felszeichnungen (UNESCO) und mehr als die Hälfte aller aktiven Schlammvulkane der Erde."
                  : "Discover 6,000+ prehistoric UNESCO petroglyphs and experience bubbling lunar mud volcanoes on the Caspian rim.",
              },
              {
                icon: "📜",
                title: language === "AZ" ? "İpək Yolu & Şəki Xirqəsi" : language === "RU" ? "Шелковый путь и Шеки" : language === "FR" ? "Route de la Soie & Sheki" : language === "AR" ? "طريق الحرير وقصر شاكي" : language === "DE" ? "Seidenstraße & Sheki" : "Silk Road Legacy & Sheki",
                desc: language === "AZ"
                  ? "Məşhur Şəki Xan Sarayının şəbəkə pəncərələri, tarixi karvansaralar, paxlava və ənənəvi ipəkçilik mərkəzləri."
                  : language === "RU"
                  ? "Дворец шекинских ханов с витражами шебеке, караван-сараи XVII века, местная пахлава и шелкоткачество."
                  : language === "FR"
                  ? "Le somptueux palais des Khans de Sheki avec ses vitraux shebeke, ses caravansérails médiévaux et sa soie raffinée."
                  : language === "AR"
                  ? "قصر خانات شاكي الشهير بزجاج الشبيكة الملون بدون مسامير، الخانات الأثرية، وصناعة الحرير والحلويات التقليدية."
                  : language === "DE"
                  ? "Der Palast der Khane von Sheki mit filigranen Shebeke-Fenstern, mittelalterliche Karawansereien und edle Seide."
                  : "Marvel at the 18th-century Palace of Sheki Khans with intricate stained-glass shebeke, medieval caravanserais, and sweet baklava.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white"
              >
                <div>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visitor Tips Bar */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#0f3460] to-[#16213e] text-white shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">💵 {language === "AZ" ? "Valyuta & Ödəniş" : language === "RU" ? "Валюта и карты" : language === "FR" ? "Monnaie" : language === "AR" ? "العملة والبطاقات" : language === "DE" ? "Währung" : "Currency & Cards"}</span>
                <p className="text-xs text-white/80 mt-1">Azerbaijani Manat (AZN). Visa and Mastercard are accepted in hotels, restaurants, and malls across Baku.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">☀️ {language === "AZ" ? "Ən Yaxşı Mövsüm" : language === "RU" ? "Лучший сезон" : language === "FR" ? "Meilleure saison" : language === "AR" ? "أفضل أوقات الزيارة" : language === "DE" ? "Beste Reisezeit" : "Best Travel Season"}</span>
                <p className="text-xs text-white/80 mt-1">Spring (April–June) for pleasant blooming weather; Autumn (September–November) for wine harvest and golden foliage.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">⚡ {language === "AZ" ? "ASAN e-Viza" : language === "RU" ? "Электронная виза" : language === "FR" ? "e-Visa officiel" : language === "AR" ? "التأشيرة الإلكترونية" : language === "DE" ? "e-Visum" : "Official e-Visa"}</span>
                <p className="text-xs text-white/80 mt-1">Citizens from 95+ countries can obtain an official ASAN electronic visa online within 3 hours to 3 days.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">🫖 {language === "AZ" ? "Qonaqpərvərlik & Təhlükəsizlik" : language === "RU" ? "Безопасность и чай" : language === "FR" ? "Hospitalité & Sécurité" : language === "AR" ? "الضيافة والأمان" : language === "DE" ? "Gastfreundschaft" : "Hospitality & Safety"}</span>
                <p className="text-xs text-white/80 mt-1">Azerbaijan is ranked among the world's safest travel destinations with world-famous traditional tea ceremonies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FAQ SECTION */}
      <section id="faq" className="py-24" style={{ backgroundColor: "#faf6f0" }}>
        <div className="container-section max-w-4xl">
          <div className="text-center mb-14">
            <p className="section-label mb-3">
              {t.faq.badge}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0f3460" }}>
              {t.faq.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {[
              { question: t.faq.q1, answer: t.faq.a1 },
              { question: t.faq.q2, answer: t.faq.a2 },
              { question: t.faq.q3, answer: t.faq.a3 },
              { question: t.faq.q4, answer: t.faq.a4 },
              { question: t.faq.q5, answer: t.faq.a5 },
              {
                question: language === "AZ"
                  ? "Azərbaycanda 15 gündən çox qaldıqda qeydiyyat tələb olunurmu?"
                  : language === "RU"
                  ? "Нужна ли регистрация при пребывании в Азербайджане более 15 дней?"
                  : language === "FR"
                  ? "L'enregistrement de séjour de 15 jours (DMX) est-il obligatoire ?"
                  : language === "AR"
                  ? "هل التسجيل لدى دائرة الهجرة إلزامي إذا زادت الإقامة عن 15 يوماً؟"
                  : language === "DE"
                  ? "Ist eine Registrierung bei mehr als 15 Tagen Aufenthalt erforderlich?"
                  : "Is the 15-day migration registration (DMX) mandatory?",
                answer: language === "AZ"
                  ? "Bəli. Azərbaycan qanunvericiliyinə görə, 15 təqvim günündən çox qalan xaricilər Dövlət Miqrasiya Xidmətində (DMX) qeydiyyatdan keçməlidir. Otellər bunu avtomatik edir. Əgər Airbnb və ya kirayə mənzildə qalırsınızsa, 15 gün ərzində qeydiyyat aparılmalıdır, əks halda hava limanında 300-400 AZN cərimə tətbiq olunur. Komandamız Airbnb qonaqlarına kömək edir."
                  : language === "RU"
                  ? "Да. Иностранцы, находящиеся в Азербайджане более 15 дней, обязаны зарегистрироваться по месту пребывания в Государственной миграционной службе (ГМС). Отели делают это автоматически. Если вы живете в Airbnb или квартире, регистрация обязательна, иначе при выезде взимается штраф 300–400 AZN. Наш консьерж помогает с регистрацией."
                  : language === "FR"
                  ? "Oui. Tout étranger séjournant plus de 15 jours doit s'enregistrer auprès du Service d'État des Migrations (DMX). Les hôtels le font automatiquement. Pour les séjours en Airbnb ou appartement, l'enregistrement doit être fait sous 15 jours sous peine d'une amende de 300 à 400 AZN à l'aéroport. Notre équipe conciergerie vous accompagne."
                  : language === "AR"
                  ? "نعم. يلزم القانون الأذربيجاني أي زائر يقيم أكثر من 15 يوماً بالتسجيل لدى دائرة الهجرة الحكومية (DMX). الفنادق تتولى ذلك تلقائياً، أما في شقق Airbnb فيجب التسجيل خلال 15 يوماً لتجنب غرامة 300-400 مانات عند المغادرة. يقدم فريقنا الدعم الكامل لضيوف الشقق."
                  : language === "DE"
                  ? "Ja. Bei einem Aufenthalt von mehr als 15 Tagen ist eine Registrierung bei der Migrationsbehörde (DMX) vorgeschrieben. Hotels erledigen dies automatisch. Bei Unterkünften wie Airbnb muss die Registrierung innerhalb von 15 Tagen erfolgen, um eine Geldstrafe von 300–400 AZN am Flughafen zu vermeiden. Unser Team unterstützt Sie gern."
                  : "Yes. Under Azerbaijani immigration law, foreigners staying over 15 calendar days must register with the State Migration Service (DMX). 4/5-star hotels handle this automatically at check-in. If you are staying in an Airbnb or private rental, registration must be filed within 15 days to avoid a 300–400 AZN fine at airport exit control. Our concierge team assists Airbnb guests with registration."
              },
              {
                question: language === "AZ"
                  ? "Quru sərhədləri açıqdırmı? Qonşu ölkələrdən qatar və ya maşınla gəlmək olar?"
                  : language === "RU"
                  ? "Открыты ли сухопутные границы? Можно ли приехать на поезде или авто?"
                  : language === "FR"
                  ? "Les frontières terrestres sont-elles ouvertes aux voyageurs ?"
                  : language === "AR"
                  ? "هل الحدود البرية مفتوحة للمسافرين القادمين بالسيارة أو القطار؟"
                  : language === "DE"
                  ? "Sind die Landgrenzen für Touristen geöffnet?"
                  : "Are Azerbaijan's land borders open for tourist crossings?",
                answer: language === "AZ"
                  ? "Xeyr. Azərbaycanın Gürcüstan, Rusiya, İran və Türkiyə ilə quru sərhədləri sərnişin daşımaları üçün bağlı qalır. Bütün xarici turistlər ölkəyə beynəlxalq aviareyslərlə (GYD Bakı, GJA Gəncə, NAJ Naxçıvan) daxil olmalıdır."
                  : language === "RU"
                  ? "Нет. Сухопутные границы Азербайджана с Грузией, Россией, Ираном и Турцией закрыты для пассажирского въезда. Въезд туристов возможен исключительно международными авиарейсами в аэропорты Баку (GYD), Гянджи (GJA) и Нахчывана (NAJ)."
                  : language === "FR"
                  ? "Non. Les frontières terrestres avec la Géorgie, la Russie, l'Iran et la Turquie restent fermées pour les passagers. L'entrée en Azerbaïdjan s'effectue exclusivement par voie aérienne via les aéroports de Bakou (GYD), Gandja (GJA) ou Nakhitchevan (NAJ)."
                  : language === "AR"
                  ? "لا. لا تزال الحدود البرية لأذربيجان مع جورجيا وروسيا وإيران وتركيا مغلقة أمام حركة المسافرين. الدخول متاح حصراً عبر الرحلات الجوية الدولية في مطار باكو (GYD) وغنجة (GJA) ونخجوان (NAJ)."
                  : language === "DE"
                  ? "Nein. Die Landgrenzen zu Georgien, Russland, Iran und der Türkei sind für den Personenverkehr weiterhin geschlossen. Die Einreise für Touristen ist derzeit ausschließlich auf dem Luftweg über die Flughäfen Baku (GYD), Ganja (GJA) und Nachitschewan (NAJ) möglich."
                  : "No. Azerbaijan's land borders with Georgia, Russia, Iran, and Turkey remain closed for international passenger transit. All tourists must arrive via international flights landing at Heydar Aliyev International Airport (GYD Baku), Ganja (GJA), or Nakhchivan (NAJ)."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border transition-all duration-200 overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: isOpen ? "#f59e0b" : "#e8dfd2",
                    boxShadow: isOpen
                      ? "0 10px 25px -5px rgba(19, 62, 53, 0.08)"
                      : "0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-semibold text-base md:text-lg transition-colors"
                      style={{ color: isOpen ? "#0f3460" : "#1e293b" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{
                        backgroundColor: isOpen ? "#0f3460" : "#f0f9ff",
                        color: isOpen ? "#ffffff" : "#0f3460",
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="mt-12 text-center p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: "#f0e7d8", border: "1px dashed #f59e0b" }}
          >
            <div className="text-left">
              <p className="font-bold text-slate-900 text-base">{t.footer.contact}</p>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                {t.footer.supportAvailable}
              </p>
            </div>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: "#0f3460" }}
            >
              <MessageCircle className="h-4 w-4 text-[#f59e0b]" />
              WhatsApp ({siteConfig.contact.whatsappPhone})
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CTA BANNER */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#0f3460" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(80px)" }} />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(80px)" }} />
        </div>
        <div className="container-section relative z-10 text-center">
          <p className="section-label mb-4" style={{ color: "#f59e0b" }}>
            {language === "AZ"
              ? "Boutique Fərdi & Qrup Turları"
              : language === "RU"
              ? "Авторские и индивидуальные туры"
              : language === "FR"
              ? "Circuits d'Exception sur Mesure"
              : language === "AR"
              ? "رحلات سياحية خاصة وتجارب فريدة"
              : language === "DE"
              ? "Individuelle & Geführte Rundreisen"
              : "Boutique Private & Small-Group Travel"}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "AZ"
              ? "Azərbaycanı Bizimlə Kəşf Edin"
              : language === "RU"
              ? "Откройте для себя Азербайджан с нами"
              : language === "FR"
              ? "Explorez l'Azerbaïdjan avec nous"
              : language === "AR"
              ? "استكشف أذربيجان معنا اليوم"
              : language === "DE"
              ? "Entdecken Sie Aserbaidschan mit uns"
              : "Ready to Explore Azerbaijan?"}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            {language === "AZ"
              ? "Bakı mütəxəssislərimizlə əlaqə saxlayın, unikal marşrutunuzu dərhal planlaşdırın və zəmanətli unudulmaz səyahət təcrübəsi yaşayın."
              : language === "RU"
              ? "Свяжитесь с нашими местными экспертами в Баку для составления индивидуальной программы, быстрого подтверждения и комфортного трансфера."
              : language === "FR"
              ? "Contactez nos spécialistes locaux à Bakou pour concevoir votre itinéraire personnalisé avec confirmation instantanée et assistance 24/7."
              : language === "AR"
              ? "تواصل مع خبرائنا المحليين في باكو لتنسيق برنامج سياحي مخصص، تأكيد فوري، وخدمة نقل مريحة على مدار الساعة."
              : language === "DE"
              ? "Kontaktieren Sie unsere lokalen Reiseexperten in Baku für eine individuelle Reiseroute, sofortige Bestätigung und perfekten Service."
              : "Connect with our local Baku travel specialists for handcrafted itineraries, instant confirmations, and seamless 24/7 travel support."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#tours"
              aria-label="View all handcrafted tour itineraries"
              className="rounded-full px-8 py-4 font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#f59e0b", color: "#061225" }}
            >
              {language === "AZ"
                ? "Bütün Turlara Baxın"
                : language === "RU"
                ? "Посмотреть все туры"
                : language === "FR"
                ? "Voir tous les circuits"
                : language === "AR"
                ? "استعرض جميع الجولات"
                : language === "DE"
                ? "Alle Touren ansehen"
                : "View All Tour Itineraries"}
            </Link>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp inquiry with travel expert"
              className="rounded-full border-2 border-white px-8 py-4 font-semibold text-sm text-white transition-all duration-200 hover:bg-white hover:text-brand-900 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FOOTER */}
      <footer style={{ backgroundColor: "#061225" }} className="pt-16 pb-12 text-white border-t border-white/10">
        <div className="container-section">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Bio */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#f59e0b" }}>
                  <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl tracking-tight" style={{ color: "#f59e0b" }}>addmetour</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Discover the soul of Azerbaijan with boutique private tours, 24/7 airport pickups, and expedited 3-hour official e-Visas. Handcrafted with local passion.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">4.9/5</span>
                <span className="text-[11px] text-white/60">TripAdvisor</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {language === "AZ" ? "Sürətli Keçidlər" : language === "RU" ? "Навигация" : "Quick Links"}
              </p>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>
                  <Link href="#tours" aria-label="Browse popular Azerbaijan tours" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Bütün Ekskursiyalar" : language === "RU" ? "Все экскурсии" : "Browse All Tours"}
                  </Link>
                </li>
                <li>
                  <Link href="#destinations" aria-label="View Azerbaijan destinations" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Populyar Məkanlar" : language === "RU" ? "Популярные направления" : "Top Destinations"}
                  </Link>
                </li>
                <li>
                  <Link href="/visa" aria-label="Official Azerbaijan e-Visa application" className="hover:text-amber-400 transition-colors">
                    {t.nav.evisa} (ASAN Visa)
                  </Link>
                </li>
                <li>
                  <Link href="/transfer" aria-label="Book airport transfer in Baku" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Hava Limanı Transferi" : language === "RU" ? "Трансфер из аэропорта" : "Airport Transfer (GYD)"}
                  </Link>
                </li>
                <li>
                  <Link href="#about" aria-label="Why travel with AddmeTour" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Niyə AddmeTour?" : language === "RU" ? "Почему AddmeTour" : "Why Choose Us"}
                  </Link>
                </li>
                <li>
                  <Link href="#reviews" aria-label="Read authentic traveler reviews" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Səyahətçi Rəyləri" : language === "RU" ? "Отзывы туристов" : "Traveler Reviews"}
                  </Link>
                </li>
                <li>
                  <Link href="#faq" aria-label="Frequently asked travel questions" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Suallar və Cavablar" : language === "RU" ? "Вопросы и ответы" : "Help & FAQ"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Support */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {t.footer.contact}
              </p>
              <div className="space-y-3 text-xs text-white/70">
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">📍</span> Nizami St, Baku, Azerbaijan
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">💬</span> WhatsApp: {siteConfig.contact.whatsappPhone}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">✉️</span> support@addmetour.com
                </p>
                <p className="text-[11px] text-white/50 pt-1">
                  {t.footer.supportAvailable}
                </p>
              </div>
            </div>

            {/* Col 4: Social Channels & Share Bar */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {language === "AZ" ? "Bizi İzləyin & Paylaşın" : language === "RU" ? "Соцсети и Поделиться" : "Follow & Share"}
              </p>
              
              {/* Social Channels */}
              <div className="flex items-center gap-2 mb-6">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with AddmeTour on WhatsApp"
                  title="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#25D366] hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="https://t.me/addmetour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Telegram"
                  title="Telegram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#0088cc] hover:text-white transition-all duration-200"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/addmetour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Instagram"
                  title="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#E1306C] hover:text-white transition-all duration-200"
                >
                  <Star className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/addmetour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Facebook"
                  title="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                >
                  <Award className="h-4 w-4" />
                </a>
              </div>

              {/* Social Share Toolbar */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                <span className="block text-[11px] font-semibold text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Share2 className="h-3.5 w-3.5 text-amber-400" />
                  {language === "AZ" ? "Səhifəni Paylaşın" : language === "RU" ? "Поделиться сайтом" : "Share this Page"}
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Discover Azerbaijan with AddmeTour: https://addmetour.vercel.app")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on WhatsApp"
                    className="flex-1 rounded-lg py-1.5 bg-[#25D366]/20 hover:bg-[#25D366] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    WA
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent("https://addmetour.vercel.app")}&text=${encodeURIComponent("Discover Azerbaijan Tours & Travel Experiences")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on Telegram"
                    className="flex-1 rounded-lg py-1.5 bg-[#0088cc]/20 hover:bg-[#0088cc] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    TG
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://addmetour.vercel.app")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on Facebook"
                    className="flex-1 rounded-lg py-1.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    FB
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy website link to clipboard"
                    className="flex-1 rounded-lg py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {shareCopied ? <CheckCheck className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{shareCopied ? "OK" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Brochure Download CTA */}
          <div className="my-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(245,158,11,0.2)" }}>
                <Download className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {language === "AZ" ? "Tur Kataloqlarını Yükləyin" : language === "RU" ? "Скачать каталог туров" : language === "AR" ? "تحميل كتالوج الجولات" : "Download Tour Catalogue"}
                </p>
                <p className="text-[11px] text-white/50 mt-0.5">
                  {language === "AZ" ? "PDF formatında bütün marşrutlar, qiymətlər və paket detalları" : language === "RU" ? "Все маршруты, цены и детали туров в PDF формате" : language === "AR" ? "جميع المسارات والأسعار وتفاصيل الباقات بصيغة PDF" : "All itineraries, prices & package details in PDF format"}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent("I'd like to receive the AddmeTour tour catalogue (PDF brochure).")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-[#061225] transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#f59e0b" }}
            >
              <Download className="h-3.5 w-3.5" />
              {language === "AZ" ? "PDF Yüklə" : language === "RU" ? "Скачать PDF" : language === "AR" ? "تحميل PDF" : "Download PDF"}
            </a>
          </div>

          {/* Bottom Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>{t.footer.rights}</p>
            <div className="flex items-center gap-6">
              <Link href="/medical" aria-label="Medical & Wellness Tourism" className="hover:text-white transition-colors">
                {language === "AZ" ? "Tibbi Turizm" : language === "RU" ? "Медицинский туризм" : language === "AR" ? "السياحة الطبية" : "Medical Tourism"}
              </Link>
              <Link href="/mice" aria-label="MICE & Corporate Events" className="hover:text-white transition-colors">
                {language === "AZ" ? "Korporativ Turlar" : language === "RU" ? "Корпоративные туры" : language === "AR" ? "سياحة الأعمال" : "Corporate & MICE"}
              </Link>
              <Link href="/admin" aria-label="Admin Management Portal" className="hover:text-white transition-colors">
                {t.nav.adminPortal}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════ AUTH MODAL */}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(user) => setCurrentUser(user)}
        />
      )}

      {/* ═══════════════════════════════════════════════════════ TOUR RESERVATION MODAL */}
      {bookingModalTour && (
        <TourReservationModal
          tour={bookingModalTour}
          onClose={() => setBookingModalTour(null)}
        />
      )}

    </div>
  );
}
