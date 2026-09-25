"use client";

import React from "react";
import Link from "next/link";
import {
  Wifi,
  FileText,
  Car,
  Sparkles,
  HeartPulse,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { SERVICES_HUB_TRANSLATIONS } from "@/lib/i18n/pages/services-hub";

export const HomeServicesHub: React.FC = () => {
  const { language } = useLanguage();
  const tHub = SERVICES_HUB_TRANSLATIONS[language as LanguageCode] || SERVICES_HUB_TRANSLATIONS.EN;

  const servicesConfig = [
    {
      ...tHub.services.esim,
      href: "/esim",
      badgeColor: "bg-purple-500/15 text-purple-700 border-purple-200",
      icon: Wifi,
      iconBg: "bg-purple-600",
      iconColor: "text-white",
      highlight: true,
    },
    {
      ...tHub.services.visa,
      href: "/visa",
      badgeColor: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
      icon: FileText,
      iconBg: "bg-emerald-600",
      iconColor: "text-white",
      highlight: false,
    },
    {
      ...tHub.services.transfer,
      href: "/transfer",
      badgeColor: "bg-sky-500/15 text-sky-700 border-sky-200",
      icon: Car,
      iconBg: "bg-sky-600",
      iconColor: "text-white",
      highlight: false,
    },
    {
      ...tHub.services.custom,
      href: "/custom-itinerary",
      badgeColor: "bg-amber-500/15 text-amber-700 border-amber-200",
      icon: Sparkles,
      iconBg: "bg-amber-500",
      iconColor: "text-[#061225]",
      highlight: false,
    },
    {
      ...tHub.services.medical,
      href: "/medical",
      badgeColor: "bg-rose-500/15 text-rose-700 border-rose-200",
      icon: HeartPulse,
      iconBg: "bg-rose-600",
      iconColor: "text-white",
      highlight: false,
    },
    {
      ...tHub.services.mice,
      href: "/mice",
      badgeColor: "bg-blue-500/15 text-blue-700 border-blue-200",
      icon: Briefcase,
      iconBg: "bg-blue-600",
      iconColor: "text-white",
      highlight: false,
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-[#f0f9ff] via-[#e6f4fe] to-[#f0f9ff] border-y border-sky-100/80">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-section relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200/80 mb-3 shadow-xs">
            <Zap className="h-3.5 w-3.5 text-sky-600" />
            <span>{tHub.badge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {tHub.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-3 font-normal leading-relaxed">
            {tHub.subtitle}
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {servicesConfig.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  srv.highlight
                    ? "ring-2 ring-purple-500/30 border-purple-200 hover:border-purple-400"
                    : "border-slate-200/80 hover:border-sky-300"
                }`}
              >
                {srv.highlight && (
                  <div className="absolute -top-3 right-6 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                    Top Recommended
                  </div>
                )}

                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${srv.iconBg} ${srv.iconColor}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border ${srv.badgeColor}`}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {srv.desc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={srv.href}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                      srv.highlight
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        : "bg-slate-100 hover:bg-[#0f3460] text-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Row */}
        <div className="mt-12 pt-8 border-t border-sky-200/60 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>{tHub.trust1}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>{tHub.trust2}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span>{tHub.trust3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
