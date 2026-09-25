"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck, Clock, CheckCircle2, AlertCircle, ArrowRight,
  Search, FileText, Sparkles, HelpCircle, MapPin, ChevronRight, ChevronDown, Globe, AlertTriangle, Car
} from "lucide-react";
import { COUNTRIES, getCountryEligibility } from "@/lib/visa-countries";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { CustomSelect } from "@/components/CustomSelect";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";

export default function VisaLandingPage() {
  const { t } = useLanguage();
  const { formatPrice, currency, activeCurrency } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<ReturnType<typeof getCountryEligibility> | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckEligibility = (countryName: string) => {
    setSelectedCountry(countryName);
    if (!countryName) {
      setEligibilityResult(null);
      setHasChecked(false);
      return;
    }
    const result = getCountryEligibility(countryName);
    setEligibilityResult(result);
    setHasChecked(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex h-16 items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <BrandLogo variant="light" />
            <span className="hidden md:inline-block ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-white/90 whitespace-nowrap">
              {t.visaPage.headerBadge}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <Link
              href="/transfer"
              className="hidden md:flex text-xs font-semibold text-sky-200 hover:text-white transition-colors items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500/20 shrink-0 whitespace-nowrap"
            >
              <Car className="h-3.5 w-3.5 text-sky-300 shrink-0" />
              <span>{t.nav.transfer}</span>
            </Link>
            <Link
              href="/visa/track"
              className="text-xs font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 shrink-0"
              title={t.nav.trackVisa}
              aria-label={t.nav.trackVisa}
            >
              <FileText className="h-3.5 w-3.5 text-[#f59e0b] shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t.nav.trackVisa}</span>
            </Link>
            <Link
              href="/visa/apply"
              aria-label="Apply for Azerbaijan ASAN e-Visa"
              className="rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all hover:opacity-95 shadow-md shrink-0 whitespace-nowrap"
              style={{ backgroundColor: "#f59e0b", color: "#061225" }}
            >
              <span className="hidden sm:inline">{t.nav.applyVisa}</span>
              <span className="sm:hidden">{t.visaPage.applyNow || "Apply"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO */}
      <section className="relative z-10 py-12 sm:py-16 md:py-24" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section relative z-10 text-center max-w-3xl mx-auto">
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ borderColor: "#f59e0b", color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.15)" }}
          >
            {t.visaPage.heroBadge}
          </span>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight break-words">
            {t.visaPage.heroTitle} <br />
            <span style={{ color: "#f59e0b" }}>{t.visaPage.heroSubtitle}</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t.visaPage.heroDesc}
          </p>

          {/* Quick Eligibility Checker */}
          <div className="mt-10 rounded-2xl bg-white p-4 sm:p-6 shadow-2xl text-left max-w-2xl mx-auto border border-white/20">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-[#0f3460]" />
              {t.visaPage.checkEligibility}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <CustomSelect
                  value={selectedCountry}
                  onChange={(val) => handleCheckEligibility(val)}
                  searchable={true}
                  placeholder={t.visaPage.selectCountry}
                  options={COUNTRIES.map((c) => ({
                    value: c.name,
                    label: `${c.name} ${c.category === "visa_free" ? "(Visa-Free)" : ""}`.trim(),
                  }))}
                />
              </div>
              <Link
                href={
                  eligibilityResult?.category === "visa_free"
                    ? "#"
                    : selectedCountry
                    ? `/visa/apply?country=${encodeURIComponent(selectedCountry)}`
                    : "/visa/apply"
                }
                className={`rounded-xl px-6 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all shrink-0 ${
                  eligibilityResult?.category === "visa_free"
                    ? "opacity-50 cursor-not-allowed bg-slate-500"
                    : "hover:opacity-90 cursor-pointer shadow-md"
                }`}
                style={eligibilityResult?.category !== "visa_free" ? { backgroundColor: "#0f3460" } : {}}
              >
                {t.visaPage.applyNow} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Live Result Feedback */}
            {hasChecked && eligibilityResult && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                {eligibilityResult.category === "visa_free" && (
                  <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">🎉 You Do Not Need a Visa!</p>
                      <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                        Citizens of <b>{eligibilityResult.name}</b> are exempt from visa requirements ({eligibilityResult.stayDuration}).
                        You can enter Azerbaijan directly with your valid national passport or ID card!
                      </p>
                    </div>
                  </div>
                )}

                {eligibilityResult.category === "evisa_eligible" && (
                  <div className="rounded-xl p-4 bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">✓ 100% Eligible for Official e-Visa</p>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        Citizens of <b>{eligibilityResult.name}</b> can obtain a single-entry electronic visa online.
                        Choose between <b>Standard (3 Days)</b> or <b>Urgent (3 Hours)</b> processing below.
                      </p>
                    </div>
                  </div>
                )}

                {eligibilityResult.category === "embassy_required" && (
                  <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">Consular Visa Required</p>
                      <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                        Citizens of <b>{eligibilityResult.name}</b> currently require an in-person sticker visa issued by an Embassy or Consulate of the Republic of Azerbaijan.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ PRICING & TIERS */}
      <section className="py-20">
        <div className="container-section">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label mb-2" style={{ color: "#f59e0b" }}>{t.visaPage.pricingTitle}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              {t.visaPage.pricingSubtitle}
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every package includes official government fees, human pre-check of passport photo/scan,
              error prevention, and automatic delivery to your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Tier */}
            <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-slate-100 text-slate-700 font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                    {t.visaPage.standardTitle}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" /> {t.visaPage.standardDays}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">{t.visaPage.standardTitle}</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Perfect for travelers planning their journey ahead. Valid for 90 days with a 30-day stay.
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{formatPrice(59)}</span>
                    <span className="text-xs text-slate-500 font-medium">{activeCurrency.code} / applicant</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
                    <span>Govt Fee: {formatPrice(26)}</span>
                    <span>Concierge: {formatPrice(33)}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Official Single-Entry e-Visa
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Full Document & Photo Pre-Check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Zero Risk of Format Typos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> PDF Delivery via Email & WhatsApp
                  </li>
                </ul>
              </div>

              <Link
                href="/visa/apply?type=standard"
                className="w-full rounded-2xl py-3.5 text-center text-xs font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {t.visaPage.applyStandard} &rarr;
              </Link>
            </div>

            {/* Urgent Tier */}
            <div
              className="rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between text-white"
              style={{ backgroundColor: "#0f3460", border: "2px solid #f59e0b" }}
            >
              <div className="absolute top-0 right-0 bg-[#f59e0b] text-[#061225] text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                ⚡ Most Popular for Quick Trips
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-white/10 text-[#f59e0b] font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                    {t.visaPage.expressTitle}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
                    <Clock className="h-3.5 w-3.5" /> {t.visaPage.expressHours}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{t.visaPage.expressTitle}</h3>
                <p className="text-xs text-white/70 mb-6">
                  For last-minute departures and tight travel schedules. Processed with highest government priority.
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#f59e0b]">{formatPrice(110)}</span>
                    <span className="text-xs text-white/70 font-medium">{activeCurrency.code} / applicant</span>
                  </div>
                  <div className="mt-2 text-[11px] text-white/60 flex justify-between border-t border-white/10 pt-2">
                    <span>Govt Fee: {formatPrice(61)}</span>
                    <span>Rush Concierge: {formatPrice(49)}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-white/80 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f59e0b] shrink-0" /> Priority 3-Hour Government Dispatch
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f59e0b] shrink-0" /> Dedicated 24/7 Visa Officer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f59e0b] shrink-0" /> Instant Telegram / WhatsApp Confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f59e0b] shrink-0" /> Direct Airport Check-In Ready PDF
                  </li>
                </ul>
              </div>

              <Link
                href="/visa/apply?type=urgent"
                className="w-full rounded-2xl py-3.5 text-center text-xs font-semibold text-[#061225] transition-all hover:opacity-95 shadow-lg cursor-pointer"
                style={{ backgroundColor: "#f59e0b" }}
              >
                {t.visaPage.applyExpress} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ HOW IT WORKS */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container-section">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">4 Simple Steps to Your Visa</h2>
            <p className="mt-2 text-xs text-slate-500">No embassy visits, no postal mail, 100% online.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Fill Details Online", desc: "Enter your passport and trip details in our 2-minute secure form." },
              { num: "02", title: "Upload Passport", desc: "Snap a photo of your passport page. Our specialists verify it instantly." },
              { num: "03", title: "Quality Pre-Screen", desc: "We check every detail against evisa.gov.az rules to guarantee zero rejection." },
              { num: "04", title: "Receive e-Visa PDF", desc: "Download your official electronic visa sent directly to your email." },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 relative">
                <span className="font-display text-3xl font-bold text-[#f59e0b]/40 block mb-2">{step.num}</span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ ESSENTIAL VISA & BORDER FAQS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="container-section max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-amber-100 text-amber-900 font-bold px-3.5 py-1 text-xs uppercase tracking-wider mb-2">
              Essential Immigration Guidance
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              Crucial Azerbaijan Border & Visa Regulations
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-500">
              Key immigration rules every international traveler must know before flying to Baku.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "⚠️ Mandatory 15-Day Migration Registration (DMX Rule)",
                a: "Under Republic of Azerbaijan immigration law, any foreigner staying longer than 15 calendar days MUST register at their place of residence with the State Migration Service (DMX). While 4-star and 5-star hotels handle this automatically at check-in, travelers staying in Airbnbs, rental apartments, or private homes must file registration within 15 days of arrival. Failure to do so results in a 300–400 AZN (~$175–$235 USD) fine at airport passport control upon departure. If you are staying in an Airbnb, contact our concierge team and we will guide or submit your registration for you.",
              },
              {
                q: "✈️ Land Borders Closed (Arrivals by Air Only)",
                a: "Azerbaijan's land borders with Georgia, Russia, Iran, and Turkey remain closed for international passenger transit. All foreign tourists must enter Azerbaijan by international flights arriving at Heydar Aliyev International Airport (GYD Baku), Ganja (GJA), or Nakhchivan (NAJ). Crossing by land (e.g. train or taxi from Tbilisi) is not currently permitted.",
              },
              {
                q: "🛂 Armenian Stamps in Passport: Can I Still Enter?",
                a: "Yes! Having visited Armenia or having Armenian stamps/visas in your passport does NOT legally prevent you from entering Azerbaijan. However, foreign nationals who entered the Nagorno-Karabakh region without official permission from the Azerbaijani government during the previous conflict are considered to have violated state border laws and are denied entry.",
              },
              {
                q: "🔄 Is the ASAN e-Visa Single-Entry or Multi-Entry?",
                a: "The official ASAN electronic visa is strictly a SINGLE-ENTRY visa. It is valid for travel within a 90-day window and permits a stay of up to 30 days. If you exit Azerbaijan (e.g. taking a side trip to Georgia or Dubai) and wish to return, you must obtain a new e-Visa before your re-entry.",
              },
              {
                q: "⏳ Passport Validity Requirement",
                a: "Your passport must have at least 3 months (90 days) of remaining validity beyond the expiration date of your e-Visa (which is approximately 6 months from your initial arrival date in Azerbaijan). Passports expiring sooner will be rejected by immigration authorities.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-amber-400"
              >
                <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2 flex items-start gap-2">
                  {item.q}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed pl-1">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ FOOTER */}
      <footer className="py-10 text-center text-xs text-slate-500" style={{ backgroundColor: "#f0f9ff" }}>
        <p>&copy; {new Date().getFullYear()} {CURRENT_BRAND.name} &middot; Official Partner for Azerbaijan Travel & e-Visa Assistance.</p>
        <p className="mt-1">Compatible with the State Agency for Public Service and Social Innovations under the President of the Republic of Azerbaijan (ASAN Visa).</p>
      </footer>
    </div>
  );
}
