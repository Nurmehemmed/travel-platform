"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  ArrowLeft,
  Car,
  Plane,
  Compass,
  CreditCard,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Mail,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import CurrencySelector from "@/components/CurrencySelector";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";
import { useLanguage } from "@/lib/i18n";

export default function TermsOfServicePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#f0f9ff" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f3460] shadow-md border-b border-white/10">
        <div className="container-section flex h-16 items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo variant="light" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <Link
              href="/"
              className="text-xs font-semibold text-sky-200 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 sm:py-14 bg-[#0f3460] text-white">
        <div className="container-section max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-3">
            <FileText className="h-3.5 w-3.5 text-sky-300" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Terms of Service & Booking Conditions
          </h1>
          <p className="mt-2 text-sm sm:text-base text-sky-100/85 max-w-2xl">
            Please read these terms carefully before booking airport transfers, tours, custom itineraries, or e-Visa services through {CURRENT_BRAND.name}.
          </p>
          <div className="mt-4 text-xs text-sky-300/75">
            Effective Date: September 1, 2026 · Baku, Republic of Azerbaijan
          </div>
        </div>
      </section>

      {/* Main Terms Body */}
      <div className="container-section max-w-4xl mx-auto pt-8 space-y-6">
        {/* Section 1 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">1</span>
            <span>Acceptance of Terms & Company Information</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;Traveler&rdquo;) and <strong>{CURRENT_BRAND.legalName}</strong> (&ldquo;{CURRENT_BRAND.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), registered in the Republic of Azerbaijan. By accessing our website (<a href={`https://${CURRENT_BRAND.domain}`} className="text-sky-600 underline">{CURRENT_BRAND.domain}</a>) or booking any travel service, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
          </p>
        </div>

        {/* Section 2 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">2</span>
            <span>Services Provided</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
            <p>{CURRENT_BRAND.name} provides premium travel technology and destination management services across Azerbaijan, including:</p>
            <ul className="list-disc pl-6 space-y-1.5 marker:text-sky-500">
              <li><strong>Private Airport Transfers:</strong> Door-to-door meet & greet transfers across GYD (Baku), GJA (Ganja), and NAJ (Nakhchivan) airports.</li>
              <li><strong>Guided Tours & Excursions:</strong> Day tours, mountain excursions (Shahdag, Qabala), historical tours, and private cultural journeys.</li>
              <li><strong>Azerbaijan e-Visa Processing:</strong> ASAN Visa application validation, quality inspection, and official government submission.</li>
              <li><strong>Custom Itinerary Planner:</strong> Tailored day-by-day travel programs, accommodation curation, and MICE corporate logistics.</li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">3</span>
            <span>Pricing, Payment & Currency Conversion</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
            <p>
              All prices displayed on {CURRENT_BRAND.name} are transparent and all-inclusive of taxes, tolls, and booking fees. 
              Online card payments are securely processed in real-time through our licensed banking partner <strong>Payriff</strong> (supporting Visa, Mastercard, and 3D-Secure 2.0).
            </p>
            <p>
              When viewing prices in secondary currencies (EUR, GBP, RUB, AED, SAR, AZN), conversion rates are calculated using live official Central Bank rates. The exact charge on your card statement will be billed in USD or AZN as indicated at checkout.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">4</span>
            <span>Cancellation & Refund Policies by Service</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Car className="h-4 w-4 text-sky-600" />
                <span>Airport Transfers</span>
              </h4>
              <p>
                100% full refund if cancelled at least 24 hours prior to scheduled pickup. 50% refund if cancelled 12–24 hours prior. For complete details, see our <Link href="/transfer/policy" className="text-sky-600 underline font-semibold">Transfer Booking Policy</Link>.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-emerald-600" />
                <span>Guided Tours & Day Trips</span>
              </h4>
              <p>
                100% full refund if cancelled 48 hours or more before tour departure. 50% refund if cancelled 24–48 hours before tour. Non-refundable within 24 hours.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Plane className="h-4 w-4 text-amber-600" />
                <span>Azerbaijan e-Visa Assistance</span>
              </h4>
              <p>
                Once an e-Visa application is validated and submitted to the State Migration Service of Azerbaijan via ASAN Visa, government consular fees are non-refundable according to state regulations. If an application is cancelled prior to governmental transmission, service fees are refunded in full.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">5</span>
            <span>User Responsibilities & Passports</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Travelers are responsible for ensuring that their passports are valid for at least 3 to 6 months beyond their planned stay in Azerbaijan, complying with local customs and immigration laws, and providing accurate flight numbers and contact details (active WhatsApp or phone number) for coordination.
          </p>
        </div>

        {/* Section 6 */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold">6</span>
            <span>Governing Law & Dispute Resolution</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            These Terms and any contractual relationship shall be governed by and construed in accordance with the laws of the <strong>Republic of Azerbaijan</strong>. Any disputes arising in connection with our services shall be subject to the jurisdiction of the competent courts of Baku, Azerbaijan.
          </p>
        </div>

        {/* Contact Block */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Have questions regarding our terms?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Contact our legal and customer service team.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CURRENT_BRAND.supportEmail}`}
              className="rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 px-4 py-2 text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{CURRENT_BRAND.supportEmail}</span>
            </a>
            <a
              href="tel:+994124047888"
              className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>+994 12 404 78 88</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
