"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, FileText, CheckCircle2, Clock, AlertCircle,
  Download, ArrowLeft, Shield, ExternalLink, HelpCircle
} from "lucide-react";

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
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function VisaTrackPage() {
  const [refInput, setRefInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<TrackedApplication | null>(null);
  const [justPaid, setJustPaid] = useState(false);

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
        setError(data?.error || "Could not locate application.");
        setApplication(null);
      } else {
        setApplication(data.application);
      }
    } catch (err: any) {
      setError("Network error while searching for application.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim() || !emailInput.trim()) {
      setError("Please provide both your Application Reference (e.g. AZV-123456) and Email.");
      return;
    }
    fetchTracking(refInput.trim(), emailInput.trim());
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5ede0" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header className="border-b border-black/10 py-4" style={{ backgroundColor: "#133e35" }}>
        <div className="container-section flex items-center justify-between">
          <Link href="/visa" className="flex items-center gap-1.5 text-white text-xs font-semibold hover:opacity-90">
            <ArrowLeft className="h-4 w-4 text-[#c9a227]" />
            <span className="hidden sm:inline">Back to Visa Service</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-white">
            Track Visa Application
          </span>
          <Link href="/visa/apply" className="text-xs text-[#c9a227] hover:underline font-semibold">
            <span className="hidden sm:inline">New Application</span>
            <span className="sm:hidden">New</span>
          </Link>
        </div>
      </header>

      <main className="container-section py-12 max-w-2xl mx-auto">
        {/* Lookup Box */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc] mb-8">
          <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">
            Check Your e-Visa Status
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            Enter your 9-character application reference number and the email address used during submission.
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Application Reference *
              </label>
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. AZV-784219"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. traveler@example.com"
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
              style={{ backgroundColor: "#133e35" }}
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching Records..." : "Check Status"}
            </button>
          </form>
        </div>

        {/* Just Paid Confirmation Alert */}
        {justPaid && (
          <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-950 shadow-sm animate-fade-in flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-900">Payment Confirmed via Payriff</h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Thank you! Your transaction has been authorized and securely cleared through Payriff 3D-Secure. Your application is now in our priority immigration review queue.
              </p>
            </div>
          </div>
        )}

        {/* Application Status Card */}
        {application && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc] animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Application Reference</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="font-mono text-xl font-bold text-[#133e35]">{application.applicationNumber}</p>
                  {application.paymentStatus === "paid" ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ✓ Paid (${application.totalAmount} USD)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      Payment Pending
                    </span>
                  )}
                </div>
              </div>

              <div>
                {application.status === "received" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    <Clock className="h-3.5 w-3.5" /> Under Quality Review
                  </span>
                )}
                {application.status === "submitted_to_govt" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                    <Clock className="h-3.5 w-3.5" /> Processing at ASAN Visa
                  </span>
                )}
                {application.status === "approved" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Approved & Issued
                  </span>
                )}
                {application.status === "rejected" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900">
                    <AlertCircle className="h-3.5 w-3.5 text-red-600" /> Action Required
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
                    Official Electronic Visa Ready
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your single-entry e-Visa has been verified and issued by the State Migration Service of Azerbaijan.
                  </p>
                </div>
                {application.evisaPdfUrl ? (
                  <a
                    href={application.evisaPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shrink-0 flex items-center gap-2 hover:opacity-95"
                    style={{ backgroundColor: "#133e35" }}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF e-Visa
                  </a>
                ) : (
                  <span className="text-xs font-medium text-emerald-800 italic">
                    PDF file sent to {application.email}
                  </span>
                )}
              </div>
            )}

            {/* Progress Timeline */}
            <div className="py-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-4">
                Application Progress
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Application & Payment Received",
                    desc: "Order confirmed in AddmeTour visa system.",
                    done: true,
                  },
                  {
                    title: "Document & Passport Verification",
                    desc: "Passport details and photo validated against ASAN immigration criteria.",
                    done: application.status !== "received",
                  },
                  {
                    title: "Submitted to Government (evisa.gov.az)",
                    desc: application.asanApplicationId
                      ? `Government Application Ref: ${application.asanApplicationId}`
                      : "Transmitted to the State Migration Service of Azerbaijan.",
                    done: application.status === "submitted_to_govt" || application.status === "approved",
                  },
                  {
                    title: "e-Visa Approved & Issued",
                    desc: "Electronic visa PDF generated and delivered.",
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
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-800">{application.surname} {application.givenNames}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Citizenship:</span>
                <span className="font-bold text-slate-800">{application.nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Speed:</span>
                <span className="font-bold text-slate-800 uppercase">{application.visaType} ({application.visaType === "urgent" ? "3 Hours" : "3 Days"})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Arrival Date:</span>
                <span className="font-bold text-slate-800">{application.arrivalDate}</span>
              </div>
            </div>

            {application.adminNotes && (
              <div className="rounded-xl p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <p className="font-bold mb-0.5">Note from Visa Officer:</p>
                <p>{application.adminNotes}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
