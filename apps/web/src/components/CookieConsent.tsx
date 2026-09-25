"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { ShieldCheck, Cookie, X } from "lucide-react";

interface CookieDictionary {
  title: string;
  description: string;
  acceptAll: string;
  essentialOnly: string;
  learnMore: string;
}

const COOKIE_TEXTS: Record<string, CookieDictionary> = {
  EN: {
    title: "Privacy & Cookie Preferences",
    description:
      "We use cookies to enhance your travel booking experience, deliver secure payment processing, and analyze website traffic in compliance with GDPR and international data standards.",
    acceptAll: "Accept All Cookies",
    essentialOnly: "Essential Only",
    learnMore: "Privacy Policy",
  },
  AZ: {
    title: "Məxfilik və Çərəz (Cookie) Tənzimləmələri",
    description:
      "Sizə təhlükəsiz ödəniş, rahat səyahət rezervasiyası və beynəlxalq GDPR standartlarına uyğun xidmət təqdim etmək üçün çərəzlərdən istifadə edirik.",
    acceptAll: "Hamısını Qəbul Et",
    essentialOnly: "Yalnız Vacib Olanlar",
    learnMore: "Məxfilik Siyasəti",
  },
  RU: {
    title: "Конфиденциальность и Cookies",
    description:
      "Мы используем файлы cookie для улучшения бронирования, безопасной оплаты и анализа трафика в соответствии с международными стандартами GDPR.",
    acceptAll: "Принять все",
    essentialOnly: "Только необходимые",
    learnMore: "Политика конфиденциальности",
  },
  FR: {
    title: "Préférences de Confidentialité et Cookies",
    description:
      "Nous utilisons des cookies pour améliorer votre expérience de réservation, sécuriser les paiements et analyser le trafic conformément au RGPD.",
    acceptAll: "Tout Accepter",
    essentialOnly: "Essentiels Uniquement",
    learnMore: "Politique de confidentialité",
  },
  AR: {
    title: "تفضيلات الخصوصية وملفات تعريف الارتباط",
    description:
      "نستخدم ملفات تعريف الارتباط لتحسين تجربة الحجز ومعالجة المدفوعات الآمنة بما يتوافق مع معايير اللائحة العامة لحماية البيانات (GDPR).",
    acceptAll: "قبول جميع الملفات",
    essentialOnly: "الأساسية فقط",
    learnMore: "سياسة الخصوصية",
  },
  DE: {
    title: "Datenschutz- und Cookie-Einstellungen",
    description:
      "Wir verwenden Cookies, um Ihr Buchungserlebnis zu verbessern, sichere Zahlungen zu ermöglichen und den Datenverkehr gemäß DSGVO zu analysieren.",
    acceptAll: "Alle Akzeptieren",
    essentialOnly: "Nur Notwendige",
    learnMore: "Datenschutzerklärung",
  },
};

const CONSENT_STORAGE_KEY = "bakuya_cookie_consent_v1";
const LEGACY_CONSENT_STORAGE_KEY = "addmetour_cookie_consent_v1";

export function CookieConsent() {
  const { language, isRtl } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY) || localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
      if (!stored) {
        // Small delay for smooth entry animation
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage read errors in private browsing
    }
    return undefined;
  }, []);

  const handleConsent = (level: "all" | "essential") => {
    try {
      const payload = JSON.stringify({
        level,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(CONSENT_STORAGE_KEY, payload);
      localStorage.setItem(LEGACY_CONSENT_STORAGE_KEY, payload);
    } catch {
      // Ignore write errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const t: CookieDictionary = COOKIE_TEXTS[language] ?? COOKIE_TEXTS.EN ?? {
    title: "Privacy & Cookie Preferences",
    description: "We use cookies to enhance your travel booking experience.",
    acceptAll: "Accept All",
    essentialOnly: "Essential Only",
    learnMore: "Privacy Policy",
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0b1329]/95 backdrop-blur-xl border border-white/15 p-5 shadow-2xl text-white">
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold tracking-wide text-white">{t.title}</h4>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
          </div>

          <button
            onClick={() => handleConsent("essential")}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer">
            {t.learnMore}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConsent("essential")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              {t.essentialOnly}
            </button>
            <button
              onClick={() => handleConsent("all")}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md transition-all active:scale-95"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
