"use client";

/**
 * AddmeTour — Full Landing Page
 * Sections: Navbar → Hero → Stats → Search → Popular Tours → Why Us → Destinations
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Search, Clock, Users, Star, ChevronDown, ChevronLeft, ChevronRight,
  Zap, Shield, MessageCircle, Award, ArrowRight, Globe,
  Eye, EyeOff, X, Menu, LogOut, User as UserIcon, Loader2, AlertCircle, Bookmark, Heart, FileText
} from "lucide-react";

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
    secondaryCta: { text: "About AddmeTour", href: "#about" },
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
    badge: "Best Seller",
    badgeColor: "bg-[#c9a227] text-[#0f2e27] font-bold shadow-sm",
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

const FEATURES = [
  {
    icon: Globe,
    title: "Expert Local Guides",
    desc: "Born and raised in Azerbaijan, our guides speak your language and know every story behind every stone.",
  },
  {
    icon: Users,
    title: "Small Groups Only",
    desc: "Maximum 12 people per tour. You get personal attention, flexible pacing, and genuine connection.",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Booking",
    desc: "No lengthy forms. Message us and we confirm your tour within the hour, any day of the week.",
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    desc: "Not satisfied? We'll refund you fully or rebook you on a different tour at no extra charge.",
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

const FAQS = [
  {
    question: "Do I need a visa to travel to Azerbaijan?",
    answer:
      "Most international travelers can easily obtain an electronic visa (ASAN Visa) online within 3 hours to 3 days before travel. Citizens of over 95 countries (including USA, UK, EU, UAE, Canada, and Australia) are eligible for the eVisa, while several CIS and regional passport holders enter visa-free.",
  },
  {
    question: "What is the best time of year to visit Baku and the Great Caucasus?",
    answer:
      "Spring (April to June) and Autumn (September to November) provide ideal pleasant temperatures (18°C–25°C) for walking tours in Baku and day trips to Gobustan. Summer (July–August) is perfect for cooler mountain highland escapes like Lahij and Sheki.",
  },
  {
    question: "Are your tours private or small-group?",
    answer:
      "We offer both! Our signature tours are small-group experiences capped at a maximum of 12 travelers to ensure genuine connection, relaxed pacing, and personal interaction. We also craft fully customized private itineraries.",
  },
  {
    question: "How does booking via WhatsApp work?",
    answer:
      "Simply tap any Book Now button or the WhatsApp icon to chat directly with our local Baku team. We confirm tour availability, pickup time, and language preference within the hour.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "We offer a 100% money-back guarantee. If your travel plans change, notify us at least 24 hours prior to the tour start time for a full refund or an immediate free reschedule to any available date.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  role?: string | null;
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeDuration, setActiveDuration] = useState(DURATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toursList, setToursList] = useState(TOURS);
  const [savedTourIds, setSavedTourIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Auto-advance hero background slider every 6 seconds
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Check existing session on mount & load saved tours
  useEffect(() => {
    // Load saved tours from localStorage
    try {
      const saved = localStorage.getItem("travel_saved_tour_ids");
      if (saved) {
        setSavedTourIds(JSON.parse(saved));
      }
    } catch {}

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});

    // Fetch live active tours from Neon DB
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        if (data?.tours && data.tours.length > 0) {
          setToursList(data.tours);
        }
      })
      .catch(() => {});

    // Clean URL if redirected back from social auth or handle auth modal trigger
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
  }, []);

  const toggleSaveTour = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSavedTourIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("travel_saved_tour_ids", JSON.stringify(next));
      } catch {}
      setToastMessage(exists ? "Removed from saved tours" : "Saved to your favorite tours!");
      setTimeout(() => setToastMessage(null), 2500);
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      setUserDropdownOpen(false);
    } catch {}
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSocialNotice(null);
    setAuthLoading(true);

    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        authMode === "login"
          ? { email, password }
          : { name: fullName, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data?.error || "Authentication failed. Please try again.");
        setAuthLoading(false);
        return;
      }

      if (data?.user) {
        setCurrentUser(data.user);
        setIsAuthOpen(false);
        setEmail("");
        setPassword("");
        setFullName("");
        setAuthError(null);
      }
    } catch (err: any) {
      setAuthError(err?.message || "Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
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
    <div className="min-h-screen" style={{ backgroundColor: "#f5ede0" }}>

      {/* ═══════════════════════════════════════════════════════ NAVBAR */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: "#133e35" }}>
        <div className="container-section flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#c9a227" }}>
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#c9a227" }}>
              addmetour
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Tours", href: "#tours" },
              { label: "Destinations", href: "#destinations" },
              { label: "About Us", href: "#about" },
              { label: "Reviews", href: "#reviews" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* ── e-Visa highlighted CTA ── */}
            <Link
              href="/visa"
              className="relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/30 group"
              style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: "#c9a227" }}
              />
              <FileText className="h-3.5 w-3.5 relative z-10" />
              <span className="relative z-10">e-Visa</span>
              {/* "Fast" badge */}
              <span
                className="relative z-10 ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                style={{ backgroundColor: "#0f2e27", color: "#c9a227" }}
              >
                Fast
              </span>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 relative">
            <button className="hidden sm:flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors">
              🇬🇧 EN <ChevronDown className="h-3 w-3" />
            </button>

            {/* Saved Tours quick button in Navbar */}
            <button
              onClick={() => {
                setActiveFilter("Saved");
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Saved Tours"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  savedTourIds.length > 0 ? "fill-[#c9a227] text-[#c9a227]" : "text-white/80"
                }`}
              />
              <span className="hidden sm:inline">Saved</span>
              {savedTourIds.length > 0 && (
                <span
                  className="flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] font-bold px-1"
                  style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
                >
                  {savedTourIds.length}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full py-1.5 px-3 transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ border: "1px solid rgba(201, 162, 39, 0.4)" }}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: "#c9a227" }}
                  >
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[120px] truncate hidden md:inline">
                    {currentUser.name || currentUser.email.split("@")[0]}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-white/70" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl p-2 shadow-2xl z-50 animate-scale-up"
                    style={{
                      backgroundColor: "#faf7f2",
                      border: "1px solid #e8dfd5",
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
                        style={{ backgroundColor: "#133e35" }}
                      >
                        <Shield className="h-3.5 w-3.5 text-[#c9a227]" />
                        Admin Portal
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
                        <Bookmark className="h-3.5 w-3.5 text-[#c9a227]" />
                        Saved Tours
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
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError(null);
                    setSocialNotice(null);
                    setIsAuthOpen(true);
                  }}
                  className="text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthError(null);
                    setSocialNotice(null);
                    setIsAuthOpen(true);
                  }}
                  className="rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
                  style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center h-8 w-8 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-3 bg-[#133e35] animate-fade-in shadow-xl">
            <div className="flex flex-col space-y-1">
              {[
                { label: "Tours", href: "#tours" },
                { label: "Destinations", href: "#destinations" },
                { label: "About Us", href: "#about" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <Link
                  key={item.label}
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
                style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Azerbaijan e-Visa</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#0f2e27] text-[#c9a227]">
                  Fast 3h
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO SLIDER */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden group">
        {/* Background Images with smooth Cross-Fade Transition */}
        {HERO_SLIDES.map((slide, index) => {
          if (index !== 0 && !mounted) return null;
          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className={`object-cover object-center transition-transform duration-10000 ease-out ${
                  index === currentSlide ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
              />
              {/* Dark gradient overlays for premium contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
            </div>
          );
        })}

        {/* Content Container with key-based re-animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
          <div key={`badge-${currentSlide}`} className="animate-fade-in pointer-events-auto">
            <span
              className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm"
              style={{ borderColor: "#c9a227", color: "#c9a227", backgroundColor: "rgba(201,162,39,0.22)" }}
            >
              {activeHeroSlide.badge}
            </span>
          </div>

          <h1
            key={`title-${currentSlide}`}
            className="animate-slide-up font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight max-w-4xl pointer-events-auto drop-shadow-lg"
          >
            {activeHeroSlide.title}
          </h1>

          <p
            key={`desc-${currentSlide}`}
            className="animate-slide-up mt-6 max-w-xl text-base sm:text-lg text-white/90 pointer-events-auto leading-relaxed drop-shadow"
          >
            {activeHeroSlide.subtitle}
          </p>

          <div
            key={`cta-${currentSlide}`}
            className="animate-slide-up mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
          >
            <Link
              href={activeHeroSlide.primaryCta.href}
              className="rounded-full px-8 py-3.5 font-semibold text-sm transition-all duration-200 hover:opacity-95 hover:scale-105 hover:shadow-2xl shadow-lg"
              style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
            >
              {activeHeroSlide.primaryCta.text}
            </Link>
            <Link
              href={activeHeroSlide.secondaryCta.href}
              className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10 backdrop-blur-md shadow-sm"
              style={{ backgroundColor: "rgba(19,62,53,0.45)" }}
            >
              {activeHeroSlide.secondaryCta.text}
            </Link>
          </div>
        </div>

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
                  backgroundColor: i === currentSlide ? "#c9a227" : "rgba(255,255,255,0.45)",
                }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ STATS */}
      <div style={{ backgroundColor: "#133e35" }}>
        <div className="container-section">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "5+", label: "Years of Experience" },
              { value: "50+", label: "Tours Offered" },
              { value: "2,400+", label: "Happy Travelers" },
              { value: "4.9★", label: "TripAdvisor Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="font-display text-2xl font-bold" style={{ color: "#c9a227" }}>
                  {stat.value}
                </span>
                <span className="mt-1 text-xs text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ SEARCH BAR */}
      <div style={{ backgroundColor: "#f5ede0" }} className="py-10">
        <div className="container-section">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-card p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search tours, destinations..."
                aria-label="Search tours and destinations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 sm:w-44">
              <select
                value={activeDuration}
                onChange={(e) => setActiveDuration(e.target.value)}
                aria-label="Filter tours by duration"
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none cursor-pointer"
              >
                {DURATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("tours");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#133e35" }}
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ POPULAR TOURS */}
      <section id="tours" className="py-16" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-section">
          {/* Header + Filter tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-2">What We Offer</p>
              <h2 className="font-display text-4xl font-bold text-slate-900">
                Our Most Popular Tours
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOUR_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={
                    activeFilter === f
                      ? { backgroundColor: "#133e35", color: "#ffffff" }
                      : { backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2d8cc" }
                  }
                >
                  {f}
                </button>
              ))}

              <button
                onClick={() => setActiveFilter("Saved")}
                className="flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={
                  activeFilter === "Saved"
                    ? { backgroundColor: "#133e35", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #e2d8cc" }
                }
              >
                <Heart
                  className={`h-3.5 w-3.5 transition-colors ${
                    activeFilter === "Saved"
                      ? "fill-[#c9a227] text-[#c9a227]"
                      : savedTourIds.length > 0
                      ? "fill-red-500 text-red-500"
                      : "text-slate-400"
                  }`}
                />
                Saved
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="group rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px -4px rgba(15,23,42,0.10)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <Image
                      src={tour.image || "/images/baku-old-city.jpg"}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 420px"
                      style={{ objectFit: "cover" }}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge */}
                    {tour.badge && (
                      <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
                          tour.badgeColor?.includes("text-") ? "" : "text-white"
                        } ${tour.badgeColor}`}
                      >
                        {tour.badge}
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
                          ? { backgroundColor: "#ffffff", color: "#e11d48" }
                          : { backgroundColor: "rgba(0, 0, 0, 0.4)", color: "#ffffff" }
                      }
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          savedTourIds.includes(tour.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white hover:text-red-200"
                        }`}
                      />
                    </button>

                    {/* Tags */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {tour.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-black/50 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5"
                          fill={s <= Math.floor(tour.rating) ? "#c9a227" : "none"}
                          stroke="#c9a227"
                          strokeWidth={1.5}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-800">
                        {tour.rating}
                      </span>
                      <span className="text-xs text-slate-500">({tour.reviews})</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900 leading-snug mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {tour.desc}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {tour.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {tour.groupSize}
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        {tour.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            From ${tour.originalPrice}
                          </span>
                        )}
                        <p className="text-lg font-bold text-slate-900">
                          <span className="text-sm font-normal text-slate-500">From </span>
                          <span style={{ color: "#133e35" }}>${tour.price}</span>
                          <span className="text-xs font-normal text-slate-500"> / person</span>
                        </p>
                      </div>
                      <button
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
                        style={{ backgroundColor: "#133e35" }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 px-6 text-center bg-white rounded-2xl border border-[#e2d8cc] max-w-md mx-auto shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 mb-4">
                  <Bookmark className="h-7 w-7 text-[#c9a227]" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                  {activeFilter === "Saved" ? "No Saved Tours Yet" : "No Tours Found"}
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {activeFilter === "Saved"
                    ? "Click the heart icon on any tour card to save your favorite experiences for easy access and planning."
                    : "No tours match your current search or filter criteria."}
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                  className="rounded-full px-6 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: "#133e35" }}
                >
                  Explore All Tours
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ WHY TRAVEL WITH US */}
      <section id="about" className="py-20" style={{ backgroundColor: "#133e35" }}>
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Features */}
            <div>
              <p className="section-label mb-4" style={{ color: "#c9a227" }}>
                Why Travel With Us
              </p>
              <h2 className="font-display text-4xl font-bold text-white leading-tight mb-6">
                We Don&apos;t Just Show You Azerbaijan.{" "}
                <span style={{ color: "#c9a227" }}>We Make You Feel It.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-10">
                AddmeTour is a Baku-based boutique travel agency founded by passionate local
                guides who know every hidden alley, every legend, and every family that bakes
                the best pakhlava. We offer private and small-group tours crafted around
                authentic experience — not tourist checkboxes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl p-5 transition-all duration-200 hover:bg-white/10"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(201,162,39,0.20)" }}
                      >
                        <f.icon className="h-4 w-4" style={{ color: "#c9a227" }} />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{f.title}</h3>
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
                style={{ backgroundColor: "#c9a227" }}
              >
                <span className="text-2xl font-bold text-[#0f2e27]">4.9</span>
                <span className="text-xs font-bold text-[#0f2e27]/90">TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ WHERE WILL YOU GO */}
      <section id="destinations" className="py-20" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Explore Azerbaijan</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">
              Where Will You Go?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`#${dest.slug}`}
                className="group relative h-80 overflow-hidden rounded-2xl block"
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
                  <h3 className="text-xl font-bold text-white font-display">{dest.name}</h3>
                  <p className="text-sm text-white/70 mt-0.5">{dest.subtitle}</p>
                  <span
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                    style={{ color: "#c9a227" }}
                  >
                    {dest.tours} tours <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ TESTIMONIALS */}
      <section id="reviews" className="py-20" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-section">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label mb-2">
              What Travelers Say
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Stories From Our Guests
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4"
                    fill="#c9a227"
                    stroke="#c9a227"
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-800">4.9 / 5</span>
              <span className="text-slate-500">&middot;</span>
              <span>TripAdvisor</span>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-2xl bg-[#faf6ef]/90 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                style={{
                  border: "1px solid #e7dfd4",
                  boxShadow: "0 4px 20px -4px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div>
                  {/* Big decorative quotation mark */}
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
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#ede4d8] pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                      style={{ backgroundColor: "#133e35" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {t.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-tight">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0 ml-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3 w-3"
                        fill="#c9a227"
                        stroke="#c9a227"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FAQ SECTION */}
      <section id="faq" className="py-24" style={{ backgroundColor: "#faf6f0" }}>
        <div className="container-section max-w-4xl">
          <div className="text-center mb-14">
            <p className="section-label mb-3">
              Common Questions
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#133e35" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              Everything you need to know about booking tours, visas, group sizes, and visiting Baku & Azerbaijan.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border transition-all duration-200 overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: isOpen ? "#c9a227" : "#e8dfd2",
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
                      style={{ color: isOpen ? "#133e35" : "#1e293b" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{
                        backgroundColor: isOpen ? "#133e35" : "#f5ede0",
                        color: isOpen ? "#ffffff" : "#133e35",
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
            style={{ backgroundColor: "#f0e7d8", border: "1px dashed #c9a227" }}
          >
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-base">Have a question not answered here?</h3>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                Our local Baku concierge team is available 24/7 on WhatsApp.
              </p>
            </div>
            <a
              href="https://wa.me/994000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: "#133e35" }}
            >
              <MessageCircle className="h-4 w-4 text-[#c9a227]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CTA BANNER */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#133e35" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#c9a227", filter: "blur(80px)" }} />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#c9a227", filter: "blur(80px)" }} />
        </div>
        <div className="container-section relative z-10 text-center">
          <p className="section-label mb-4" style={{ color: "#c9a227" }}>Ready to Explore?</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Book Your Dream Tour Today
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10">
            Join 2,400+ happy travelers who discovered Azerbaijan with our expert local guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#tours"
              className="rounded-full px-8 py-4 font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#c9a227", color: "#0f2e27" }}
            >
              Browse All Tours
            </Link>
            <a
              href="https://wa.me/994000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-4 font-semibold text-sm text-white transition-all duration-200 hover:bg-white hover:text-brand-900 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FOOTER */}
      <footer style={{ backgroundColor: "#0f2e27" }} className="py-12">
        <div className="container-section">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#c9a227" }}>
                <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg" style={{ color: "#c9a227" }}>addmetour</span>
            </div>
            <p className="text-sm text-white/70">
              © 2025 AddmeTour. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Tours", href: "#tours" },
                { label: "Destinations", href: "#destinations" },
                { label: "About", href: "#about" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
                { label: "Admin Portal", href: "/admin" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-white/75 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════ FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/994000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex h-13 w-13 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        style={{
          width: "52px",
          height: "52px",
          backgroundColor: "#25D366",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)",
        }}
      >
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      {/* ═══════════════════════════════════════════════════════ AUTH MODAL */}
      {isAuthOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAuthOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[440px] rounded-3xl p-8 shadow-2xl animate-scale-up"
            style={{
              backgroundColor: "#faf7f2",
              border: "1px solid #e8dfd5",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ backgroundColor: "#c9a227" }}
              >
                <MapPin className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: "#c9a227" }}>
                addmetour
              </span>
            </div>

            {/* Tab Pill Switcher */}
            <div className="flex rounded-full border border-[#e5dcd0] p-1 bg-white mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                  setSocialNotice(null);
                }}
                className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all cursor-pointer ${
                  authMode === "login"
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={authMode === "login" ? { backgroundColor: "#133e35" } : {}}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError(null);
                  setSocialNotice(null);
                }}
                className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={authMode === "signup" ? { backgroundColor: "#133e35" } : {}}
              >
                Sign Up
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
                {authMode === "login" ? "Welcome back" : "Create an account"}
              </h3>
              <p className="text-xs text-slate-500">
                {authMode === "login"
                  ? "Sign in to manage your bookings and saved tours."
                  : "Sign up to track reservations, get member discounts & more."}
              </p>
            </div>

            {/* Social Notice / API Guidance */}
            {socialNotice && (
              <div className="mb-4 rounded-xl p-3 text-xs leading-relaxed bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>{socialNotice}</div>
              </div>
            )}

            {/* Auth Error Banner */}
            {authError && (
              <div className="mb-4 rounded-xl p-3 text-xs leading-relaxed bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>{authError}</div>
              </div>
            )}

            {/* Social Buttons */}
            <div className="space-y-2.5 mb-5">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/api/auth/oauth/google";
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e2d8cc] bg-white py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/api/auth/oauth/apple";
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white hover:bg-black transition-colors shadow-sm cursor-pointer"
              >
                <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.04-2.85 0-.14-.01-.29-.04-.42-.99.04-2.19.66-2.9 1.48-.56.65-1.05 1.7-1.05 2.76 0 .15.02.31.04.42 1.07.08 2.29-.54 2.91-1.39z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2d8cc]" />
              </div>
              <span className="relative bg-[#faf7f2] px-3 text-[11px] text-slate-400">
                or continue with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === "signup" && (
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#133e35] transition-colors"
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#133e35] transition-colors"
                />
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#e2d8cc] bg-white px-4 py-2.5 pr-10 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#133e35] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {authMode === "login" && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      className="text-[11px] font-semibold hover:underline cursor-pointer"
                      style={{ color: "#c9a227" }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold text-white transition-all duration-200 hover:opacity-95 shadow-md cursor-pointer mt-3 disabled:opacity-70"
                style={{ backgroundColor: "#133e35" }}
              >
                {authLoading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
                {authMode === "login"
                  ? authLoading
                    ? "Signing In..."
                    : "Log In"
                  : authLoading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>


            {/* Bottom Toggle */}
            <p className="mt-5 text-center text-xs text-slate-500">
              {authMode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthError(null);
                      setSocialNotice(null);
                    }}
                    className="font-semibold hover:underline cursor-pointer"
                    style={{ color: "#c9a227" }}
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError(null);
                      setSocialNotice(null);
                    }}
                    className="font-semibold hover:underline cursor-pointer"
                    style={{ color: "#c9a227" }}
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900/95 text-white px-4 py-3 shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in pointer-events-none">
          <Heart className="h-4 w-4 text-[#c9a227] fill-[#c9a227]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
