"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle,
  Loader2, Smartphone, Sparkles
} from "lucide-react";
import { useLanguage, LanguageCode } from "@/lib/i18n";
import { PAYMENT_SANDBOX_TRANSLATIONS } from "@/lib/i18n/pages/payment-sandbox";
import { CURRENT_BRAND } from "@/lib/brand";

function PayriffSandboxContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, isRtl } = useLanguage();
  const tPay = PAYMENT_SANDBOX_TRANSLATIONS[language as LanguageCode] || PAYMENT_SANDBOX_TRANSLATIONS.EN;

  const ref = searchParams.get("ref") || "";
  const orderId = searchParams.get("orderId") || "PR-TEST-001";
  const amount = searchParams.get("amount") || "59.00";
  const currency = searchParams.get("currency") || "USD";

  // Form states with official Payriff sandbox test card prefilled
  const [cardNumber, setCardNumber] = useState("4000 0075 4601 2078");
  const [cardExpiry, setCardExpiry] = useState("04/29");
  const [cardCvv, setCardCvv] = useState("893");
  const [cardHolder, setCardHolder] = useState("TEST TEST");

  // 3D-Secure OTP state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("123456");
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const serviceTitle = ref.startsWith("ESIM-")
    ? tPay.serviceEsim
    : ref.startsWith("ATR-")
    ? tPay.serviceTransfer
    : ref.startsWith("ITN-")
    ? tPay.serviceItinerary
    : tPay.serviceVisa;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      setErrorMsg(tPay.errorCardDetails);
      return;
    }
    setErrorMsg("");
    setProcessing(true);

    // Simulate 3D Secure 2.0 Challenge
    setTimeout(() => {
      setProcessing(false);
      setShowOtpModal(true);
    }, 700);
  };

  const handleConfirmOtp = async () => {
    if (otpCode !== "123456") {
      setErrorMsg(tPay.errorInvalidOtp);
      return;
    }

    setProcessing(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/payment/payriff-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: ref,
          orderId,
          simulated: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || tPay.errorPaymentFailed);
      }

      setSuccess(true);
      setTimeout(() => {
        if (data.redirectUrl) {
          router.push(data.redirectUrl);
        } else if (ref.startsWith("ESIM-")) {
          router.push(`/esim?payment=success&orderNumber=${encodeURIComponent(ref)}`);
        } else if (ref.startsWith("ATR-")) {
          router.push(`/transfer/book?ref=${encodeURIComponent(ref)}&status=confirmed`);
        } else {
          router.push(`/visa/track?ref=${encodeURIComponent(ref)}&paid=true`);
        }
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || tPay.errorPaymentFailed);
      setProcessing(false);
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6"
    >
      {/* ── Top Bar ── */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            P
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white">payriff</span>
            <span className="mx-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {tPay.gatewayTitle}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5 text-emerald-400" />
          <span>{tPay.tlsEncrypted}</span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="max-w-xl mx-auto w-full">
        {/* Environment Alert */}
        <div className="mb-6 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 p-4 text-xs text-cyan-200 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{tPay.sandboxNoticeTitle}</p>
            <p className="text-cyan-300/80 mt-0.5 leading-relaxed">
              {tPay.sandboxNoticeDesc}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-2xl bg-rose-950/60 border border-rose-800 p-4 text-xs text-rose-200 flex items-start gap-3 animate-shake">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* Order Header */}
          <div className="flex items-start justify-between border-b border-slate-700 pb-5 mb-6">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">{tPay.merchantLabel} • {serviceTitle}</p>
              <p className="font-bold text-white text-base">{CURRENT_BRAND.name} Azerbaijan</p>
              <p className="text-xs text-slate-400 mt-0.5">{tPay.orderRefLabel}: <span className="font-mono text-cyan-400">{ref || "TEST-DIRECT"}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">{tPay.totalAmountLabel}</p>
              <p className="text-2xl font-extrabold text-white">${amount} <span className="text-xs text-cyan-400 font-normal">{currency}</span></p>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleStartPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {tPay.cardNumberLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-3 text-sm font-mono text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pl-11"
                />
                <CreditCard className="h-5 w-5 text-slate-400 absolute left-3.5 top-3.5" />
                <span className="absolute right-3.5 top-3 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  VISA TEST
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {tPay.expiresLabel}
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-3 text-sm font-mono text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {tPay.cvvLabel}
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-3 text-sm font-mono text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {tPay.cardholderNameLabel}
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-xl py-3.5 mt-4 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-900/30 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  {tPay.payBtnConnecting}
                </>
              ) : (
                <>
                  {tPay.payBtnText}: ${amount} {currency} &rarr;
                </>
              )}
            </button>
          </form>

          {/* Supported Schemes */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {tPay.verifiedBy}
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 font-mono text-[10px]">VISA</span>
              <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 font-mono text-[10px]">Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 font-mono text-[10px]">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3D-Secure OTP Simulation Modal ── */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-cyan-400" />
                <span className="font-bold text-white text-sm">{tPay.otpTitle}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300">
                {tPay.otpSimulatorBadge}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {tPay.otpPrompt}
            </p>

            <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700 mb-5">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{tPay.otpTransactionLabel}</span>
                <span className="font-bold text-white">{serviceTitle} ({ref})</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{tPay.otpAmountLabel}</span>
                <span className="font-bold text-cyan-400">${amount} {currency}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {tPay.otpSmsLabel}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center text-2xl font-mono tracking-widest rounded-xl border border-cyan-500 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-[11px] text-slate-500 text-center">
                {tPay.otpTestHint} <span className="font-mono text-cyan-400 font-bold">123456</span>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                disabled={processing}
                className="rounded-xl px-4 py-3 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {tPay.btnCancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmOtp}
                disabled={processing || success}
                className="flex-1 rounded-xl py-3 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {tPay.btnAuthorizing}
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {tPay.btnPaidRedirecting}
                  </>
                ) : (
                  <>{tPay.btnAuthorizePayment} &rarr;</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="max-w-xl mx-auto w-full text-center text-[11px] text-slate-500 pt-6">
        <p>{tPay.footerLicense}</p>
      </div>
    </div>
  );
}

export default function PayriffSandboxPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">Loading checkout...</div>}>
      <PayriffSandboxContent />
    </Suspense>
  );
}
