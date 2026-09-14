"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, Clock, CheckCircle2, AlertCircle, ArrowRight,
  Search, FileText, Sparkles, HelpCircle, MapPin, ChevronRight, Globe
} from "lucide-react";
import { COUNTRIES, getCountryEligibility } from "@/lib/visa-countries";

export default function VisaLandingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<ReturnType<typeof getCountryEligibility> | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

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
      <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#f59e0b" }}>
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#f59e0b" }}>
              addmetour
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-white/90">
              e-Visa Service
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/visa/track"
              className="text-xs font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-white/10"
            >
              <FileText className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span className="hidden sm:inline">Track Application</span>
              <span className="sm:hidden">Track</span>
            </Link>
            <Link
              href="/visa/apply"
              className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:opacity-95 shadow-md"
              style={{ backgroundColor: "#f59e0b", color: "#061225" }}
            >
              Apply Online
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO */}
      <section className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section relative z-10 text-center max-w-3xl mx-auto">
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ borderColor: "#f59e0b", color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.15)" }}
          >
            Official ASAN Visa Compatible &middot; Guaranteed Fast Processing
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Azerbaijan Electronic Visa <br />
            <span style={{ color: "#f59e0b" }}>Simplified & Error-Free</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Skip bureaucratic errors and confusing portals. Our certified travel specialists pre-screen your passport,
            handle government submission to <b>evisa.gov.az</b>, and deliver your approved visa directly to your email.
          </p>

          {/* Quick Eligibility Checker */}
          <div className="mt-10 rounded-2xl bg-white p-4 sm:p-6 shadow-2xl text-left max-w-2xl mx-auto border border-white/20">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-[#0f3460]" />
              Check Your Nationality Eligibility
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCheckEligibility(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460] cursor-pointer"
                >
                  <option value="">Select your passport country / citizenship...</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name} {c.category === "visa_free" ? "(Visa-Free)" : ""}
                    </option>
                  ))}
                </select>
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
                Apply Now <ArrowRight className="h-4 w-4" />
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
            <p className="section-label mb-2" style={{ color: "#f59e0b" }}>Transparent Pricing</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Choose Your Processing Speed
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every package includes official government fees, human pre-check of passport photo/scan,
              error prevention, and automatic delivery to your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Tier */}
            <div className="rounded-3xl bg-white p-8 border border-[#e2d8cc] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-slate-100 text-slate-700 font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                    Standard Processing
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" /> 3 Business Days
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Standard e-Visa</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Perfect for travelers planning their journey ahead. Valid for 90 days with a 30-day stay.
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">$59</span>
                    <span className="text-xs text-slate-500 font-medium">USD / applicant</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-200/60 pt-2">
                    <span>Govt Fee: $26.00</span>
                    <span>Concierge Fee: $33.00</span>
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
                Apply Standard &rarr;
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
                    Express Service
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#f59e0b]">
                    <Clock className="h-3.5 w-3.5" /> Within 3 Hours
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Urgent 3-Hour e-Visa</h3>
                <p className="text-xs text-white/70 mb-6">
                  For last-minute departures and tight travel schedules. Processed with highest government priority.
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#f59e0b]">$110</span>
                    <span className="text-xs text-white/70 font-medium">USD / applicant</span>
                  </div>
                  <div className="mt-2 text-[11px] text-white/60 flex justify-between border-t border-white/10 pt-2">
                    <span>Govt Fee: $61.00</span>
                    <span>Rush Concierge Fee: $49.00</span>
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
                Apply Urgent (3 Hours) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ HOW IT WORKS */}
      <section className="py-16 bg-white border-y border-[#e2d8cc]">
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

      {/* ═══════════════════════════════════════════════════════ FOOTER */}
      <footer className="py-10 text-center text-xs text-slate-500" style={{ backgroundColor: "#f0f9ff" }}>
        <p>&copy; {new Date().getFullYear()} AddmeTour &middot; Official Partner for Azerbaijan Travel & e-Visa Assistance.</p>
        <p className="mt-1">Compatible with the State Agency for Public Service and Social Innovations under the President of the Republic of Azerbaijan (ASAN Visa).</p>
      </footer>
    </div>
  );
}
