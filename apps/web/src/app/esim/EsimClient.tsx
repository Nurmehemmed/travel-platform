"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wifi,
  Smartphone,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Globe2,
  MapPin,
  Check,
  Search,
  CreditCard,
  AlertCircle,
  Copy,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CurrencySelector } from "@/components/CurrencySelector";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";
import { ESIM_PLANS, EsimPlan, getLocalizedPlanName, getLocalizedPlanDesc } from "@/lib/esim-plans";
import { ESIM_PAGE_TRANSLATIONS } from "@/lib/i18n/pages/esim-i18n";

const COMPATIBLE_DEVICES = [
  { brand: "Apple", models: "iPhone 15, 14, 13, 12, 11 series, XS, XS Max, XR, SE (2nd & 3rd gen), iPad Pro (Cellular)" },
  { brand: "Samsung", models: "Galaxy S24, S23, S22, S21, S20 series, Z Fold (1–5), Z Flip (1–5), Note 20, Note 20 Ultra" },
  { brand: "Google", models: "Pixel 8, 8 Pro, 7, 7 Pro, 6, 6 Pro, 5, 4, 4 XL, 3, 3 XL" },
  { brand: "Huawei / Xiaomi / Other", models: "Huawei P40 Pro, Mate 40 Pro, Xiaomi 13 Pro, 12T Pro, Honor Magic 4 Pro, Motorola Razr" },
];

export default function EsimClient() {
  const { language, showToast } = useLanguage();
  const { settings } = useSiteSettings();

  const tEsim = ESIM_PAGE_TRANSLATIONS[language as LanguageCode] || ESIM_PAGE_TRANSLATIONS.EN;

  const [selectedPlanId, setSelectedPlanId] = useState<string>("esim-5gb-15d");
  const [deviceSearch, setDeviceSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Traveler Details Form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Payment Status (from Payriff Callback)
  const [paymentParamStatus, setPaymentParamStatus] = useState<string | null>(null);
  const [paymentParamOrder, setPaymentParamOrder] = useState<string | null>(null);
  const [copiedLpa, setCopiedLpa] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pay = params.get("payment");
      const orderNum = params.get("orderNumber");
      if (pay) {
        setPaymentParamStatus(pay);
        setPaymentParamOrder(orderNum);
      }
    }
  }, []);

  const selectedPlan = ESIM_PLANS.find((p) => p.id === selectedPlanId) || ESIM_PLANS[1]!;
  const planDisplayName = getLocalizedPlanName(selectedPlan, language);

  // Handle Order & Redirect to Payriff Demo Sandbox / Live Gateway
  const handleProceedToPayriff = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(language === "AZ" ? "Zəhmət olmasa bütün əlaqə məlumatlarını doldurun." : language === "RU" ? "Пожалуйста, заполните все контактные данные." : "Please complete all traveler contact information.");
      return;
    }

    setSubmittingOrder(true);

    try {
      const res = await fetch("/api/esim/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName,
          email,
          phone,
          planId: selectedPlan.id,
          deviceModel,
          arrivalDate,
          paymentMethod: "online",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      if (data.paymentUrl) {
        // Direct redirect to Payriff Demo Sandbox / Live Checkout Gateway
        window.location.href = data.paymentUrl;
        return;
      }

      showToast("Order initiated. Redirecting to payment...", "info");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate payment gateway.");
      setSubmittingOrder(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLpa(true);
    setTimeout(() => setCopiedLpa(false), 2500);
  };

  const buildWhatsAppOrderLink = (plan: EsimPlan) => {
    const text = `📱 Hello ${CURRENT_BRAND.name}! I'd like to get an Azerbaijan Tourist eSIM:
• Plan: ${plan.name} (${plan.dataGb}GB / ${plan.durationDays} Days)
• Price: $${plan.priceUsd} USD (~${Math.round(plan.priceUsd * 1.7)} AZN)
• My Device: ${deviceModel || "iPhone / Android"}
Please send me the QR code activation details.`;

    const cleanNum = settings?.contact?.whatsappClean || "994551003146";
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const filteredDevices = COMPATIBLE_DEVICES.filter((d) =>
    deviceSearch
      ? d.brand.toLowerCase().includes(deviceSearch.toLowerCase()) ||
        d.models.toLowerCase().includes(deviceSearch.toLowerCase())
      : true
  );

  const lpaCode = paymentParamOrder
    ? `LPA:1$smdp.io$AZ-TOURIST-${paymentParamOrder.replace(/[^A-Z0-9]/g, "")}`
    : `LPA:1$smdp.io$AZ-TOURIST-BAKU`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(lpaCode)}`;

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-900 pb-20">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10">
        <div className="container-section flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Bakuya — Home">
            <BrandLogo variant="header" />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSelector variant="dark" />
            <CurrencySelector variant="dark" />
            <a
              href={`https://wa.me/${settings?.contact?.whatsappClean || "994551003146"}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I need assistance with an Azerbaijan Tourist eSIM.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold bg-amber-500 text-[#061225] hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{tEsim.navHelp}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-b from-[#0a203d] via-[#0f3460] to-[#0f3460] text-white py-14 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-section text-center max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold bg-purple-400/20 text-purple-300 border border-purple-400/30 mb-4 shadow-sm backdrop-blur-md">
            <Wifi className="h-3.5 w-3.5 text-purple-300 animate-pulse" />
            <span>{tEsim.heroBadge}</span>
          </span>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {tEsim.heroTitle1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300">
              {tEsim.heroTitle2}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 mt-4 max-w-xl mx-auto leading-relaxed font-normal">
            {tEsim.heroSubtitle}
          </p>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/90 font-medium">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3.5 py-1.5 border border-white/15 backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>{tEsim.feature1Title}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3.5 py-1.5 border border-white/15 backdrop-blur-md">
              <Globe2 className="h-3.5 w-3.5 text-sky-400" />
              <span>{tEsim.feature3Title}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3.5 py-1.5 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{tEsim.feature2Title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="container-section max-w-5xl mx-auto -mt-6 sm:-mt-8 relative z-20 space-y-12">
        {/* ── Payment Success Notification & Instant QR Delivery Voucher ── */}
        {paymentParamStatus === "success" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-emerald-500 animate-scale-up text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{tEsim.paySuccessBadge}</span>
            </div>

            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-900">
                {tEsim.paySuccessTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                {tEsim.paySuccessDesc}
              </p>
            </div>

            {/* QR Code Graphic Box */}
            <div className="max-w-sm mx-auto bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-inner space-y-4">
              <div className="relative mx-auto w-56 h-56 bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="eSIM QR Activation Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  {tEsim.qrInstructionsHeading}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {tEsim.qrStep1}
                </p>
              </div>

              {/* LPA Code Box */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-2.5 text-left">
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">{tEsim.lpaCodeLabel}</span>
                    <span className="text-xs font-mono text-slate-800 truncate block">
                      {lpaCode}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(lpaCode)}
                    className="shrink-0 p-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedLpa ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedLpa ? tEsim.lpaCopied : tEsim.btnCopyLpa}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${settings?.contact?.whatsappClean || "994551003146"}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I just completed Payriff payment for eSIM Order #${paymentParamOrder}. Please confirm activation.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-3 text-xs font-bold text-[#061225] bg-amber-500 hover:bg-amber-400 flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{tEsim.btnWhatsAppOps}</span>
              </a>

              <button
                onClick={() => setPaymentParamStatus(null)}
                className="rounded-xl px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>{language === "AZ" ? "Başqa Paket Seç" : language === "RU" ? "Выбрать другой тариф" : "Choose Another Plan"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Payment Cancelled / Failed Notification ── */}
        {paymentParamStatus && paymentParamStatus !== "success" && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-rose-800 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              <span>
                {language === "AZ"
                  ? "Payriff ödənişi ləğv edildi və ya rədd edildi. Aşağıdan yenidən cəhd edə və ya birbaşa WhatsApp ilə sifariş edə bilərsiniz."
                  : language === "RU"
                  ? "Оплата Payriff была отменена или отклонена. Вы можете повторить попытку ниже или оформить заказ в WhatsApp."
                  : "Payriff payment was cancelled or declined. You can try again below or order directly via WhatsApp."}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPaymentParamStatus(null)}
              className="text-xs font-bold text-rose-600 hover:underline shrink-0"
            >
              {language === "AZ" ? "Bağla" : language === "RU" ? "Закрыть" : "Dismiss"}
            </button>
          </div>
        )}

        {/* ── Plan Selection Grid ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              1. {tEsim.selectPlanHeading}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {tEsim.selectPlanSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {tEsim.feature3Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ESIM_PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const desc = getLocalizedPlanDesc(plan, language);
              const name = getLocalizedPlanName(plan, language);

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-purple-50/70 border-purple-500 shadow-md ring-2 ring-purple-400/30"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                      {tEsim.mostPopular}
                    </span>
                  )}
                  {plan.bestValue && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-[#061225] shadow-sm">
                      {tEsim.bestValue}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                        {plan.durationDays} {tEsim.planDuration}
                      </span>
                      {isSelected ? (
                        <div className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-slate-300" />
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-black text-slate-900">{plan.dataGb} GB</span>
                      <span className="text-xs text-slate-500 font-semibold">{tEsim.planSpeed}</span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-xs mb-1">{name}</h4>
                    <p className="text-[11px] text-slate-600 leading-tight mb-4">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-purple-900">
                        ${plan.priceUsd}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ~{Math.round(plan.priceUsd * 1.7)} AZN
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                      {tEsim.planDelivery}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Order Form With Payriff Gateway Link ── */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <form onSubmit={handleProceedToPayriff} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                  2. {tEsim.orderFormTitle}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 mt-2">
                  {planDisplayName} <span className="text-purple-700 font-extrabold">(${selectedPlan.priceUsd} USD)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {tEsim.orderFormSubtitle}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Traveler Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 mb-1 block">{tEsim.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={tEsim.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 mb-1 block">{tEsim.emailLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder={tEsim.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{tEsim.emailHelp}</span>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 mb-1 block">{tEsim.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    placeholder={tEsim.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{tEsim.phoneHelp}</span>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 mb-1 block">{tEsim.deviceLabel}</label>
                  <input
                    type="text"
                    placeholder={tEsim.devicePlaceholder}
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{tEsim.guaranteeSecure}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <a
                    href={buildWhatsAppOrderLink(selectedPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto rounded-xl px-4 py-3 text-xs font-bold text-[#061225] bg-amber-500 hover:bg-amber-400 flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{tEsim.btnWhatsApp}</span>
                  </a>

                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full sm:w-auto rounded-xl px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap transition-all"
                  >
                    {submittingOrder ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>{tEsim.connectingPayriff}</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 text-cyan-200" />
                        <span>{tEsim.btnPayriff} (${selectedPlan.priceUsd} USD) &rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ── 3-Step Simple Setup Guide ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-100">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
              {tEsim.qrInstructionsHeading}
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-2">
              {tEsim.heroTitle1} {tEsim.heroTitle2}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-sky-50/60 p-5 border border-sky-100 text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-sky-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{tEsim.feature1Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tEsim.qrStep1}
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50/60 p-5 border border-purple-100 text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{tEsim.feature3Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tEsim.qrStep2}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50/60 p-5 border border-emerald-100 text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{tEsim.feature2Title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tEsim.qrStep3}
              </p>
            </div>
          </div>
        </div>

        {/* ── Device Compatibility Checker ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                {tEsim.compatibleTitle}
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-2">
                {tEsim.compatibleSubtitle}
              </h2>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={tEsim.searchDevicePlaceholder}
                value={deviceSearch}
                onChange={(e) => setDeviceSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDevices.map((device, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-purple-600" />
                  <span>{device.brand}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {device.models}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-4 italic">
            {tEsim.dialCodeCheck}
          </p>
        </div>

        {/* ── FAQ Section ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {tEsim.faqTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {tEsim.faqSubtitle}
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {tEsim.faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/40 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-purple-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
