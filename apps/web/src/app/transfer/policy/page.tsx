"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  ShieldCheck,
  Clock,
  Plane,
  DollarSign,
  Briefcase,
  Headphones,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  FileText,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import CurrencySelector from "@/components/CurrencySelector";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";
import { LOCALIZED_TRANSFER_POLICY } from "@/lib/pages-i18n";

export default function TransferPolicyPage() {
  const { language, t } = useLanguage();
  const { settings } = useSiteSettings();
  const pol = LOCALIZED_TRANSFER_POLICY[language] || LOCALIZED_TRANSFER_POLICY.EN!;
  const cancelHours = settings.transferPolicy.cancellationHours || 24;
  const waitMins = settings.transferPolicy.waitTimeIntlMins || 60;
  const dispatchPhone = settings.transferPolicy.dispatchPhone || "+994 12 404 78 88";
  const dispatchWhatsappClean = (settings.transferPolicy.dispatchWhatsapp || "+994 12 404 78 88").replace(/\D/g, "");

  const sectionIcons = [
    <Clock key="clock" className="h-5 w-5 text-emerald-600" />,
    <Plane key="plane" className="h-5 w-5 text-sky-600" />,
    <ShieldCheck key="vip" className="h-5 w-5 text-amber-600" />,
    <DollarSign key="price" className="h-5 w-5 text-emerald-600" />,
    <Briefcase key="bag" className="h-5 w-5 text-indigo-600" />,
    <Car key="car" className="h-5 w-5 text-blue-600" />,
    <Headphones key="support" className="h-5 w-5 text-rose-600" />,
  ];

  const sectionsList = [
    pol.sections.cancellation,
    pol.sections.flightTracking,
    pol.sections.meetAndGreet,
    pol.sections.pricingGuarantee,
    pol.sections.luggageSafety,
    pol.sections.vehicleStandards,
    pol.sections.emergencyDispatch,
  ];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header className="sticky top-0 z-50 bg-[#0f3460] shadow-md border-b border-white/10">
        <div className="container-section flex h-16 items-center justify-between gap-2">
          <Link href="/transfer" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#0ea5e9" }}>
              <Car className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
              addmetour
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-sky-400/20 text-sky-200 border border-sky-300/30 whitespace-nowrap">
              {t.transferPage.headerBadge}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <Link
              href="/transfer/book"
              className="rounded-full px-3 sm:px-4 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-1.5 text-white"
              style={{ backgroundColor: "#0284c7" }}
            >
              <span>{t.nav.bookTransfer}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ HERO BANNER */}
      <section className="py-10 sm:py-14 bg-[#0f3460] text-white">
        <div className="container-section max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-sky-200 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/transfer" className="hover:underline">Transfers</Link>
            <span>/</span>
            <span className="text-white font-semibold">Policy</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-300" />
            <span>Service Level Agreement</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {pol.pageTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-sky-100/85 max-w-2xl">
            {pol.pageSubtitle}
          </p>
          <div className="mt-4 text-xs text-sky-300/75">
            {pol.lastUpdated}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ HIGHLIGHT CARDS */}
      <div className="container-section max-w-4xl mx-auto -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-md border border-emerald-100 text-center">
            <div className="text-2xl mb-1">🛡️</div>
            <div className="text-xs font-bold text-slate-800">{cancelHours}h Free Cancel</div>
            <div className="text-[10px] text-slate-500 mt-0.5">100% full refund</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md border border-sky-100 text-center">
            <div className="text-2xl mb-1">📡</div>
            <div className="text-xs font-bold text-slate-800">Flight Radar</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Live delay adjustment</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md border border-amber-100 text-center">
            <div className="text-2xl mb-1">⏳</div>
            <div className="text-xs font-bold text-slate-800">{waitMins} Min Free Wait</div>
            <div className="text-[10px] text-slate-500 mt-0.5">After landing</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md border border-purple-100 text-center">
            <div className="text-2xl mb-1">💎</div>
            <div className="text-xs font-bold text-slate-800">All-Inclusive</div>
            <div className="text-[10px] text-slate-500 mt-0.5">No hidden fees</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ DETAILED POLICY SECTIONS */}
      <div className="container-section max-w-4xl mx-auto pt-8 space-y-5">
        {sectionsList.map((sec, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white p-6 sm:p-7 shadow-sm border border-sky-100 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 border border-sky-200/60 shadow-2xs">
                  {sectionIcons[idx]}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {sec.title}
                </h2>
              </div>
              {sec.badge && (
                <span className="self-start sm:self-auto rounded-md bg-sky-100/90 px-2.5 py-1 text-xs font-bold text-sky-800">
                  {sec.badge}
                </span>
              )}
            </div>

            <ul className="space-y-2 pt-1 pl-6 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc marker:text-sky-500">
              {sec.points.map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* 24/7 Dispatch Contact Card */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-[#0f3460] text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold">24/7 Bilingual Operations Dispatch</h3>
            <p className="text-xs text-sky-100 max-w-lg">
              Have a last-minute flight change, customs delay, or special baggage requirement? Contact our live operations team directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${dispatchWhatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Dispatch</span>
            </a>
            <a
              href={`tel:${dispatchPhone.replace(/\s+/g, "")}`}
              className="rounded-xl bg-white text-slate-800 hover:bg-slate-100 px-4 py-2.5 text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-sky-600" />
              <span>{dispatchPhone}</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
          <Link
            href="/transfer"
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Airport Transfers</span>
          </Link>
          <Link
            href="/terms"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>General Platform Terms of Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
