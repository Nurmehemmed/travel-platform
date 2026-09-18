"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  Clock,
  Plane,
  DollarSign,
  Briefcase,
  Car,
  Headphones,
  Check,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";
import { LOCALIZED_TRANSFER_POLICY } from "@/lib/pages-i18n";

export interface TransferPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export function TransferPolicyModal({
  isOpen,
  onClose,
  onAccept,
}: TransferPolicyModalProps) {
  const { language } = useLanguage();
  const { settings } = useSiteSettings();
  const pol = LOCALIZED_TRANSFER_POLICY[language] || LOCALIZED_TRANSFER_POLICY.EN!;
  const cancelHours = settings.transferPolicy.cancellationHours || 24;
  const waitMins = settings.transferPolicy.waitTimeIntlMins || 60;
  const supportPhone = settings.transferPolicy.dispatchPhone || pol.supportPhone;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sectionIcons = [
    <Clock key="clock" className="h-4 w-4 text-emerald-600" />,
    <Plane key="plane" className="h-4 w-4 text-sky-600" />,
    <ShieldCheck key="vip" className="h-4 w-4 text-amber-600" />,
    <DollarSign key="price" className="h-4 w-4 text-emerald-600" />,
    <Briefcase key="bag" className="h-4 w-4 text-indigo-600" />,
    <Car key="car" className="h-4 w-4 text-blue-600" />,
    <Headphones key="support" className="h-4 w-4 text-rose-600" />,
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

  const handleAccept = () => {
    if (onAccept) onAccept();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex flex-col w-full max-w-3xl h-[90vh] max-h-[720px] rounded-2xl bg-white shadow-2xl border border-sky-100 overflow-hidden">
        {/* ═══════════════════════════════════════════════════════ MODAL HEADER */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0f3460] to-[#1a4478] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/25 border border-sky-300/30 text-sky-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {pol.modalTitle}
              </h3>
              <p className="text-[11px] text-sky-100/80 line-clamp-1">
                {pol.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Policy Modal"
            className="rounded-full p-1.5 text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════ HIGHLIGHT SUMMARY CHIPS */}
        <div className="bg-sky-50/70 px-5 py-2.5 border-b border-sky-100 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-700 shrink-0">
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100/80 px-2 py-0.5 text-emerald-800 font-bold">
            ✓ {cancelHours}h Free Cancellation
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-100/80 px-2 py-0.5 text-sky-800 font-bold">
            ✓ {waitMins}m Free Waiting
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/80 px-2 py-0.5 text-amber-800 font-bold">
            ✓ Flight Auto-Tracking
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-100/80 px-2 py-0.5 text-purple-800 font-bold">
            ✓ All-Inclusive Rate
          </span>
        </div>

        {/* ═══════════════════════════════════════════════════════ SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin">
          {sectionsList.map((sec, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all hover:border-sky-300 hover:bg-sky-50/20"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs border border-slate-200/60">
                    {sectionIcons[idx] || <ShieldCheck className="h-3.5 w-3.5" />}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {sec.title}
                  </h4>
                </div>
                {sec.badge && (
                  <span className="rounded-md bg-sky-100/80 px-2 py-0.5 text-[10px] font-bold text-sky-800 shrink-0">
                    {sec.badge}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 pl-8 text-xs text-slate-600 leading-relaxed list-disc marker:text-sky-500">
                {sec.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Dedicated Page Link */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">{pol.lastUpdated}</span>
            <Link
              href="/transfer/policy"
              target="_blank"
              className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
            >
              <span>{pol.viewFullTerms}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ FOOTER ACTIONS */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-700">{pol.supportHelp}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {pol.btnClose}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="w-full sm:w-auto rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Check className="h-4 w-4 stroke-[2.5]" />
              <span>{pol.btnAcceptAndClose}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferPolicyModal;
