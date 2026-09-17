"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

const LABELS: Record<
  LanguageCode,
  { title: string; subtitle: string; badge: string }
> = {
  EN: {
    title: "Custom Itinerary",
    subtitle: "Bespoke Private Tour",
    badge: "3-Step Builder",
  },
  AZ: {
    title: "Özəl Marşrut",
    subtitle: "Fərdi VIP Tur",
    badge: "3-Addımlı",
  },
  RU: {
    title: "Свой Маршрут",
    subtitle: "Индивидуальный тур",
    badge: "3 шага",
  },
  AR: {
    title: "برنامج سياحي مخصص",
    subtitle: "جولة VIP خاصة",
    badge: "3 خطوات",
  },
  FR: {
    title: "Itinéraire Sur Mesure",
    subtitle: "Circuit Privé VIP",
    badge: "3 étapes",
  },
  DE: {
    title: "Individuelle Reise",
    subtitle: "Maßgeschneiderte Tour",
    badge: "3 Schritte",
  },
};

export default function FloatingCustomItinerary() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { settings } = useSiteSettings();

  // Hide if disabled in operational settings
  if (settings?.operations?.floatingItinerary === false) {
    return null;
  }

  // Hide on custom-itinerary builder itself, admin dashboard, checkout, or voucher
  const isExcluded =
    pathname.startsWith("/custom-itinerary") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/voucher") ||
    pathname.startsWith("/tours/") ||
    pathname.startsWith("/transfer/book") ||
    pathname.startsWith("/transfer/track") ||
    pathname.startsWith("/visa/apply") ||
    pathname.startsWith("/visa/pay") ||
    pathname.startsWith("/visa/track");

  if (isExcluded) return null;

  const t = LABELS[language] || LABELS.EN;


  return (
    <aside
      aria-label="Interactive Custom Itinerary Planner"
      className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-40 print:hidden transition-all duration-300 pointer-events-auto"
    >
      <Link
        href="/custom-itinerary"
        aria-label="Build your custom private Azerbaijan and Caucasus itinerary"
        className="group relative flex items-center rounded-full p-1.5 sm:pl-2.5 sm:pr-4 sm:py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-400/40 hover:border-amber-300 bg-[#0f3460]/95 hover:bg-[#133e73] text-white"
        style={{
          boxShadow:
            "0 12px 35px -5px rgba(15, 52, 96, 0.6), 0 0 20px -5px rgba(245, 158, 11, 0.35)",
        }}
      >
        {/* Glowing Icon Container */}
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          <Sparkles className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
        </div>

        {/* Text Details - Visible on sm screens and up */}
        <div className="hidden sm:flex flex-col text-left leading-none sm:ml-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300/90">
            {t.subtitle}
          </span>
          <span className="text-xs sm:text-sm font-black text-white sm:mt-0.5 flex items-center gap-1">
            {t.title}
            <ArrowRight className="h-3 w-3 text-amber-400 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>

        {/* Builder Badge (hidden on smallest screens) */}
        <span className="hidden sm:inline-block ml-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
          {t.badge}
        </span>
      </Link>
    </aside>
  );
}
