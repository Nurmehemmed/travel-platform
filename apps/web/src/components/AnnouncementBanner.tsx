"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/settings-context";
import { useLanguage } from "@/lib/i18n";
import { Sparkles, ArrowRight, X } from "lucide-react";

export function AnnouncementBanner() {
  const { settings } = useSiteSettings();
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  const learnMoreText =
    language === "AR"
      ? "اعرف المزيد"
      : language === "RU"
      ? "Подробнее"
      : language === "AZ"
      ? "Ətraflı"
      : language === "FR"
      ? "En savoir plus"
      : language === "DE"
      ? "Mehr erfahren"
      : "Learn More";

  const announcementBadge =
    settings.announcement.badge ||
    (language === "AR"
      ? "إعلان"
      : language === "RU"
      ? "Объявление"
      : language === "AZ"
      ? "Elan"
      : language === "FR"
      ? "Annonce"
      : language === "DE"
      ? "Ankündigung"
      : "Announcement");

  useEffect(() => {
    // Check if dismissed in this session
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("announcement_dismissed");
      if (isDismissed === settings.announcement.text) {
        setDismissed(true);
      }
    }
  }, [settings.announcement.text]);

  if (!settings.announcement.active || !settings.announcement.text || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("announcement_dismissed", settings.announcement.text);
    }
  };

  return (
    <div
      className="relative z-50 py-2.5 px-4 text-xs sm:text-sm font-medium text-slate-900 border-b border-amber-400/30 flex items-center justify-between shadow-sm transition-all"
      style={{
        background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
      }}
    >
      <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center pr-6 sm:pr-0">
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-amber-300 shadow-sm uppercase tracking-wider">
          <Sparkles className="h-3 w-3" />
          {announcementBadge}
        </span>

        <span className="font-semibold text-slate-950 truncate max-w-xl sm:max-w-2xl">
          {settings.announcement.text}
        </span>

        {settings.announcement.link && (
          <Link
            href={settings.announcement.link}
            className="inline-flex items-center gap-1 font-bold text-slate-950 hover:underline shrink-0 ml-1 text-xs"
          >
            <span>{learnMoreText}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      <button
        onClick={handleDismiss}
        type="button"
        aria-label="Dismiss Announcement"
        className="text-slate-950/70 hover:text-slate-950 p-1 rounded-md hover:bg-black/5 transition-colors absolute right-2 sm:right-4 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
