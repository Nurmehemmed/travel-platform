"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, FileText, CheckCircle2, Clock, AlertCircle,
  Download, ArrowLeft, Shield, ExternalLink, HelpCircle
} from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import { VISA_TRACK_TRANSLATIONS } from "@/lib/pages-i18n";
import { VisaTrackingSkeleton } from "@/components/Skeletons";
import VoucherShareActions from "@/components/VoucherShareActions";
import { CURRENT_BRAND } from "@/lib/brand";
import { BrandLogo } from "@/components/BrandLogo";

interface TrackedApplication {
  id: string;
  applicationNumber: string;
  visaType: "standard" | "urgent";
  status: "received" | "submitted_to_govt" | "approved" | "rejected";
  nationality: string;
  arrivalDate: string;
  surname: string;
  givenNames: string;
  email: string;
  totalAmount: string;
  paymentStatus?: string | null;
  asanApplicationId?: string | null;
  evisaPdfUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function VisaTrackPage() {
  const { t, language } = useLanguage();
  const vt = (VISA_TRACK_TRANSLATIONS[language] || VISA_TRACK_TRANSLATIONS.EN)!;
  const [refInput, setRefInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<TrackedApplication | null>(null);
  const [justPaid, setJustPaid] = useState(false);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qRef = params.get("ref");
      const qEmail = params.get("email");
      const qPaid = params.get("paid") === "true";
      if (qPaid) setJustPaid(true);

      if (qRef) {
        setRefInput(qRef);
        if (qEmail) {
          setEmailInput(qEmail);
          fetchTracking(qRef, qEmail);
        } else {
          fetchTracking(qRef, "");
        }
      }
    }
  }, []);

  const fetchTracking = async (ref: string, email: string) => {
    setError(null);
    setLoading(true);

    try {
      const url = email
        ? `/api/visa/track?ref=${encodeURIComponent(ref)}&email=${encodeURIComponent(email)}`
        : `/api/visa/track?ref=${encodeURIComponent(ref)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || vt.errNotFound);
        setApplication(null);
      } else {
        setApplication(data.application);
      }
    } catch (err: any) {
      setError(vt.errNetwork);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim() || !emailInput.trim()) {
      setError(vt.errProvideBoth);
      return;
    }
    fetchTracking(refInput.trim(), emailInput.trim());
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header
        className={`sticky top-0 z-50 py-4 transition-all duration-300 print:hidden ${
          isScrolled
            ? "bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-[#0f3460] border-b border-transparent shadow-none"
        }`}
      >
        <div className="container-section flex items-center justify-between">
          <Link href="/visa" className="flex items-center gap-1.5 text-white text-xs font-semibold hover:opacity-90 shrink-0">
            <ArrowLeft className="h-4 w-4 text-[#f59e0b]" />
            <span className="hidden sm:inline">{t.visaPage.headerBadge}</span>
            <span className="sm:hidden">{t.transferPage.back}</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <BrandLogo variant="header" showTagline={false} />
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSelector variant="dark" />
            <Link href="/visa/apply" className="text-xs text-[#f59e0b] hover:underline font-semibold shrink-0 whitespace-nowrap">
              <span className="hidden sm:inline">{t.nav.applyVisa}</span>
              <span className="sm:hidden">{t.nav.applyVisa}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-section py-12 max-w-2xl mx-auto print:py-0 print:max-w-full print:p-0">
        {/* Lookup Box */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200 mb-8 print:hidden">
          <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">
            {vt.lookupTitle}
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            {vt.lookupDesc}
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {vt.refLabel}
              </label>
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder={vt.refPlaceholder}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {vt.emailLabel}
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={vt.emailPlaceholder}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: "#0f3460" }}
            >
              <Search className="h-4 w-4" />
              {loading ? vt.btnSearching : vt.btnSearch}
            </button>
          </form>
        </div>

        {/* Just Paid Confirmation Alert */}
        {justPaid && (
          <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-950 shadow-sm animate-fade-in flex items-start gap-4 print:hidden">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-900">{vt.justPaidTitle}</h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                {vt.justPaidDesc}
              </p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <VisaTrackingSkeleton />}

        {/* Application Status Card */}
        {!loading && application && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200 animate-fade-in space-y-6 print:p-0 print:border-none print:shadow-none print:space-y-4 print-avoid-break">
            {/* Official Print Header for e-Visa */}
            <div className="hidden print:flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-3">
              <div>
                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">{CURRENT_BRAND.name} Azerbaijan DMC</h1>
                <p className="text-[10px] text-slate-500 font-medium">Official ASAN Electronic Visa (e-Visa) Status & Application Certificate</p>
              </div>
              <div className="text-right text-[10px] text-slate-600 space-y-0.5">
                <p className="font-bold text-slate-900">ASAN Visa Facilitator #AZ-DMC-889</p>
                <p>Date: {new Date().toLocaleDateString("en-GB")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 print:pb-2">
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">{vt.refHeader}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="font-mono text-xl font-bold text-[#0f3460]">{application.applicationNumber}</p>
                  {application.paymentStatus === "paid" ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {vt.statusPaid} (${application.totalAmount} USD)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {vt.statusPaymentPending}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {application.status === "received" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    <Clock className="h-3.5 w-3.5" /> {vt.statusQualityReview}
                  </span>
                )}
                {application.status === "submitted_to_govt" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                    <Clock className="h-3.5 w-3.5" /> {vt.statusAsanProcessing}
                  </span>
                )}
                {application.status === "approved" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> {vt.statusApproved}
                  </span>
                )}
                {application.status === "rejected" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900">
                    <AlertCircle className="h-3.5 w-3.5 text-red-600" /> {vt.statusActionRequired}
                  </span>
                )}
              </div>
            </div>

            {/* Approved PDF Download Banner */}
            {application.status === "approved" && (
              <div className="rounded-2xl p-5 border border-emerald-300 bg-emerald-50 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-emerald-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {vt.approvedBannerTitle}
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {vt.approvedBannerDesc}
                  </p>
                </div>
                {application.evisaPdfUrl ? (
                  <a
                    href={application.evisaPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shrink-0 flex items-center gap-2 hover:opacity-95"
                    style={{ backgroundColor: "#0f3460" }}
                  >
                    <Download className="h-4 w-4" />
                    {vt.btnDownloadPdf}
                  </a>
                ) : (
                  <span className="text-xs font-medium text-emerald-800 italic">
                    {vt.pdfSentTo} {application.email}
                  </span>
                )}
              </div>
            )}

            {/* Progress Timeline */}
            <div className="py-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-4">
                {vt.progressTitle}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: vt.step1Title,
                    desc: vt.step1Desc,
                    done: true,
                  },
                  {
                    title: vt.step2Title,
                    desc: vt.step2Desc,
                    done: application.status !== "received",
                  },
                  {
                    title: vt.step3Title,
                    desc: application.asanApplicationId
                      ? `${vt.step3DescPrefix} ${application.asanApplicationId}`
                      : vt.step3DescGovt,
                    done: application.status === "submitted_to_govt" || application.status === "approved",
                  },
                  {
                    title: vt.step4Title,
                    desc: vt.step4Desc,
                    done: application.status === "approved",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0 mt-0.5 ${
                        step.done
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step.done ? "✓" : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${step.done ? "text-slate-900" : "text-slate-500"}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicant Summary */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">{vt.summaryApplicant}</span>
                <span className="font-bold text-slate-800">{application.surname} {application.givenNames}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{vt.summaryCitizenship}</span>
                <span className="font-bold text-slate-800">{application.nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{vt.summarySpeed}</span>
                <span className="font-bold text-slate-800 uppercase">{application.visaType} ({application.visaType === "urgent" ? vt.timeHours : vt.timeDays})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{vt.summaryArrivalDate}</span>
                <span className="font-bold text-slate-800">{application.arrivalDate}</span>
              </div>
            </div>

            {/* Multi-Channel Customer Sharing Hub */}
            <VoucherShareActions
              bookingRef={application.applicationNumber}
              serviceType="visa"
              serviceTitle={`${language === "AZ" ? "Azərbaycan ASAN e-Viza" : language === "RU" ? "Электронная виза ASAN Азербайджан" : language === "AR" ? "تأشيرة أذربيجان الإلكترونية ASAN" : "Azerbaijan ASAN e-Visa"} (${application.visaType === "urgent" ? vt.timeHours : vt.timeDays})`}
              customerName={`${application.surname} ${application.givenNames}`}
              customerEmail={application.email}
              summaryDetails={{
                "Status": application.status === "approved" ? vt.statusApproved : application.status === "submitted_to_govt" ? vt.statusAsanProcessing : vt.statusQualityReview,
                "Citizenship": application.nationality,
                "Arrival Date": application.arrivalDate,
                "Processing": `${application.visaType.toUpperCase()} (${application.visaType === "urgent" ? vt.timeHours : vt.timeDays})`,
                "Total Amount": `$${application.totalAmount} USD`,
              }}
              pdfFilename={`${CURRENT_BRAND.name}-Visa-Certificate-${application.applicationNumber}`}
              className="mt-6"
            />
          </div>
        )}
      </main>
    </div>
  );
}
