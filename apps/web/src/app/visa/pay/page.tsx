"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle,
  Loader2, ArrowRight, Smartphone, Sparkles, Building2
} from "lucide-react";

function PayriffCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      setErrorMsg("Please fill in all card details.");
      return;
    }
    setErrorMsg("");
    setProcessing(true);

    // Simulate 3D Secure 2.0 Challenge
    setTimeout(() => {
      setProcessing(false);
      setShowOtpModal(true);
    }, 800);
  };

  const handleConfirmOtp = async () => {
    if (otpCode !== "123456") {
      setErrorMsg("Invalid sandbox OTP code. Use 123456.");
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
        throw new Error(data.error || "Payment failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(data.redirectUrl || `/visa/track?ref=${encodeURIComponent(ref)}&paid=true`);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process payment");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* ── Top Bar ── */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            P
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white">payriff</span>
            <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Sandbox Gateway
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5 text-emerald-400" />
          <span>256-bit TLS Encrypted</span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="max-w-xl mx-auto w-full">
        {/* Environment Alert */}
        <div className="mb-6 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 p-4 text-xs text-cyan-200 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Payriff Developer Sandbox Environment</p>
            <p className="text-cyan-300/80 mt-0.5">
              Official test card credentials are pre-filled below. Complete payment using SMS OTP <span className="font-mono font-bold text-white">123456</span> to simulate a live transaction.
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
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Merchant</p>
              <p className="font-bold text-white text-base">addmetour Azerbaijan</p>
              <p className="text-xs text-slate-400 mt-0.5">Order Ref: <span className="font-mono text-cyan-400">{ref || "AZV-DIRECT"}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Amount</p>
              <p className="text-2xl font-extrabold text-white">${amount} <span className="text-xs text-cyan-400 font-normal">{currency}</span></p>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleStartPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Card Number
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
                  Expires
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
                  CVV / CVC
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
                Cardholder Name
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
                  Connecting to Payriff 3D Secure...
                </>
              ) : (
                <>
                  Pay ${amount} {currency} with Payriff &rarr;
                </>
              )}
            </button>
          </form>

          {/* Supported Schemes */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Verified by Visa & Mastercard Identity Check
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
                <span className="font-bold text-white text-sm">3D-Secure 2.0 Verification</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300">
                SANDBOX SIMULATOR
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              In live production, your customer receives an SMS OTP from their issuing bank. In this sandbox simulation, enter Payriff's official test OTP:
            </p>

            <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700 mb-5">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Transaction:</span>
                <span className="font-bold text-white">e-Visa {ref}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Amount:</span>
                <span className="font-bold text-cyan-400">${amount} {currency}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                SMS One-Time Passcode (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center text-2xl font-mono tracking-widest rounded-xl border border-cyan-500 bg-slate-950 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-[11px] text-slate-500 text-center">
                Sandbox code: <span className="font-mono text-cyan-400 font-bold">123456</span>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                disabled={processing}
                className="rounded-xl px-4 py-3 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors"
              >
                Cancel
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
                    Authorizing Payment...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    Paid! Redirecting...
                  </>
                ) : (
                  <>Authorize Payment &rarr;</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="max-w-xl mx-auto w-full text-center text-[11px] text-slate-500 pt-6">
        <p>Licensed by the Central Bank of the Republic of Azerbaijan &bull; PCI-DSS Level 1 Certified</p>
      </div>
    </div>
  );
}

export default function PayriffCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">Loading checkout...</div>}>
      <PayriffCheckoutContent />
    </Suspense>
  );
}
