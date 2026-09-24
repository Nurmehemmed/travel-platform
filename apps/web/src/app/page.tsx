"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/i18n";
import { TOURS } from "./_components/home/data";
import {
  HomeNavbar,
  HomeHero,
  HomeStatsAndTrust,
  HomeSearchBar,
  HomePopularTours,
  HomeWhyUs,
  HomeDestinations,
  HomeTransferPromo,
  HomeServicesHub,
  HomeTestimonials,
  HomeTravelGuide,
  HomeFaq,
  HomeCtaBanner,
  HomeFooter,
} from "./_components/home";
import type { AuthUser } from "@/components/AuthModal";

// Dynamic Modal Imports
const AuthModal = dynamic(() => import("@/components/AuthModal"), { ssr: false });
const TourReservationModal = dynamic(() => import("@/components/TourReservationModal"), { ssr: false });

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toursList, setToursList] = useState(TOURS);
  const [toursLoading, setToursLoading] = useState(false);
  const [savedTourIds, setSavedTourIds] = useState<string[]>([]);
  const [bookingModalTour, setBookingModalTour] = useState<{ id: string; title: string; price: number } | null>(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { language, showToast, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hydrate local cache on mount and validate session immediately
  useEffect(() => {
    try {
      const cached = localStorage.getItem("addmetour_user_session");
      if (cached) {
        setCurrentUser(JSON.parse(cached));
        setAuthChecking(false);
      }
    } catch {}

    let isSubscribed = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!isSubscribed) return;
        if (data?.user) {
          setCurrentUser(data.user);
          try {
            localStorage.setItem("addmetour_user_session", JSON.stringify(data.user));
          } catch {}
        } else {
          setCurrentUser(null);
          try {
            localStorage.removeItem("addmetour_user_session");
          } catch {}
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isSubscribed) setAuthChecking(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    const rafId = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
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

  // Auto-advance hero background slider & fetch tours
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);

    const runDeferredTasks = () => {
      try {
        const saved = localStorage.getItem("travel_saved_tour_ids");
        if (saved) {
          setSavedTourIds(JSON.parse(saved));
        }
      } catch {}

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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      setCurrentUser(null);
      localStorage.removeItem("addmetour_user_session");
      showToast(language === "AZ" ? "Hesabdan çıxıldı" : "Logged out successfully");
    } catch {
      setCurrentUser(null);
    }
  };

  // Filter tours
  const filteredTours = useMemo(() => {
    return toursList.filter((tour) => {
      const matchesCategory =
        activeFilter === "All"
          ? true
          : activeFilter === "Saved"
          ? savedTourIds.includes(tour.id)
          : tour.category?.toLowerCase() === activeFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tour.title.toLowerCase().includes(q) ||
        tour.desc.toLowerCase().includes(q) ||
        tour.tags?.some((tag: string) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [toursList, activeFilter, searchQuery, savedTourIds]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      <HomeNavbar
        currentUser={currentUser}
        authChecking={authChecking}
        setIsAuthOpen={setIsAuthOpen}
        setAuthMode={setAuthMode}
        handleLogout={handleLogout}
        savedCount={savedTourIds.length}
        savedTourIds={savedTourIds}
        setActiveFilter={setActiveFilter}
        isScrolled={isScrolled}
        shareCopied={shareCopied}
        handleCopyLink={handleCopyLink}
      />

      <HomeHero
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <HomeStatsAndTrust />

      <HomeServicesHub />

      <HomeSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        toursCount={filteredTours.length}
      />

      <HomePopularTours
        toursList={filteredTours}
        toursLoading={toursLoading}
        savedTourIds={savedTourIds}
        toggleSaveTour={toggleSaveTour}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onBookTour={(tour) => setBookingModalTour(tour)}
      />

      <HomeWhyUs />

      <HomeDestinations />

      <HomeTransferPromo />

      <HomeTestimonials />

      <HomeTravelGuide />

      <HomeFaq
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />

      <HomeCtaBanner />

      <HomeFooter />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setCurrentUser(user);
          try {
            localStorage.setItem("addmetour_user_session", JSON.stringify(user));
          } catch {}
          setIsAuthOpen(false);
          showToast(`${language === "AZ" ? "Xoş gəldiniz," : "Welcome,"} ${user.name}!`);
        }}
      />

      {bookingModalTour && (
        <TourReservationModal
          tour={bookingModalTour}
          onClose={() => setBookingModalTour(null)}
        />
      )}
    </div>
  );
}
