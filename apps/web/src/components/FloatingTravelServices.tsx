"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Car, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

export default function FloatingTravelServices() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  // Hide completely on admin portal, booking wizards, payment, and tracking funnels
  const isExcluded =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/tours/") ||
    pathname.startsWith("/transfer/book") ||
    pathname.startsWith("/transfer/track") ||
    pathname.startsWith("/visa/apply") ||
    pathname.startsWith("/visa/pay") ||
    pathname.startsWith("/visa/track");

  if (isExcluded) return null;

  const isVisaPage = pathname.startsWith("/visa");
  const isTransferPage = pathname.startsWith("/transfer");

  const showServices = settings?.operations?.floatingServices !== false;
  const showWhatsapp = settings?.operations?.floatingWhatsapp !== false && Boolean(settings?.contact?.whatsappUrl);

  // If all floating widgets on the right dock are disabled, hide the entire aside
  if (!showServices && !showWhatsapp) {
    return null;
  }

  return (
    <aside
      aria-label="Quick travel services and WhatsApp support dock"
      className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 print:hidden transition-all duration-300 flex items-center gap-2 sm:gap-2.5 max-w-[calc(100vw-1.5rem)] pointer-events-auto animate-fade-in"
    >
      {/* Quick Services Dock (e-Visa / Airport Transfer) */}
      {showServices && isVisaPage && !isTransferPage && (
        /* CASE 1: On Visa page -> Slim Airport Transfer Pill */
        <Link
          href="/transfer"
          aria-label="Book Baku Airport Transfer (GYD)"
          className="group flex items-center gap-1.5 sm:gap-2.5 rounded-full pl-2 sm:pl-3 pr-2.5 sm:pr-4 py-1.5 sm:py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 hover:border-sky-300/50 shrink-0"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.94)",
            boxShadow: "0 10px 30px -5px rgba(2, 132, 199, 0.4)",
          }}
        >
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
            <Car className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.3} />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-sky-300/80">
              {t.nav.transfer}
            </span>
            <span className="text-xs font-black text-white sm:mt-0.5 flex items-center gap-1">
              {t.floating.transfer} <ArrowRight className="h-3 w-3 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <span className="hidden sm:inline-block ml-1 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-sky-400/20 text-sky-300 border border-sky-400/30">
            {t.floating.transferSupport}
          </span>
        </Link>
      )}

      {showServices && isTransferPage && !isVisaPage && (
        /* CASE 2: On Transfer page -> Slim e-Visa Pill */
        <Link
          href="/visa"
          aria-label="Official Azerbaijan ASAN e-Visa Online Application"
          className="group flex items-center gap-1.5 sm:gap-2.5 rounded-full pl-2 sm:pl-3 pr-2.5 sm:pr-4 py-1.5 sm:py-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 hover:border-amber-300/50 shrink-0"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.94)",
            boxShadow: "0 10px 30px -5px rgba(245, 158, 11, 0.4)",
          }}
        >
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.3} />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-amber-300/80">
              Azerbaijan
            </span>
            <span className="text-xs font-black text-white sm:mt-0.5 flex items-center gap-1">
              {t.floating.evisa} <ArrowRight className="h-3 w-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <span className="hidden sm:inline-block ml-1 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
            {t.floating.evisaSpeed}
          </span>
        </Link>
      )}

      {showServices && !isVisaPage && !isTransferPage && (
        /* CASE 3: Everywhere else -> Unified 2-in-1 Segmented Capsule */
        <div
          className="flex items-center rounded-full p-1 shadow-2xl backdrop-blur-xl border border-white/20 transition-all duration-300 hover:border-white/30 shrink-0"
          style={{
            backgroundColor: "rgba(15, 52, 96, 0.92)",
            boxShadow: "0 12px 35px -5px rgba(15, 52, 96, 0.55), 0 0 20px -5px rgba(14, 165, 233, 0.25)",
          }}
        >
          {/* Left Segment: e-Visa */}
          <Link
            href="/visa"
            aria-label="Official Azerbaijan ASAN e-Visa Application (3h Fast Track)"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-200 hover:bg-white/12 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-transform group-hover:scale-110">
              <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-amber-300/85">
                ASAN · 3h
              </span>
              <span className="text-xs font-black text-white sm:mt-0.5 whitespace-nowrap">
                {t.floating.evisa}
              </span>
            </div>
            <span className="hidden sm:inline-block rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
              {t.floating.evisaSpeed}
            </span>
          </Link>

          {/* Vertical Divider */}
          <div className="h-5 sm:h-6 w-px bg-white/20 mx-0.5 shrink-0" />

          {/* Right Segment: Airport Transfer */}
          <Link
            href="/transfer"
            aria-label="Book Baku Airport (GYD) Private Transfer"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-200 hover:bg-white/12 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 transition-transform group-hover:scale-110">
              <Car className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.3} />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-sky-300/85">
                Airport · GYD
              </span>
              <span className="text-xs font-black text-white sm:mt-0.5 whitespace-nowrap">
                {t.floating.transfer}
              </span>
            </div>
            <span className="hidden sm:inline-block rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-sky-400/20 text-sky-300 border border-sky-400/30 shrink-0">
              {t.floating.transferSupport}
            </span>
          </Link>
        </div>
      )}

      {/* WHATSAPP INSTANT CHAT BUTTON */}
      {showWhatsapp && (
        <a
          href={settings.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with AddmeTour travel specialist on WhatsApp (${settings.contact.whatsappPhone})`}
          title={`Chat with us on WhatsApp (${settings.contact.whatsappPhone})`}
          className="relative group flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/25"
          style={{
            backgroundColor: "#25D366",
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)",
          }}
        >
          {/* Online Pulse Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-400 border-2 border-[#0f3460]" />
          </span>

          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 fill-current transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      )}
    </aside>
  );
}

