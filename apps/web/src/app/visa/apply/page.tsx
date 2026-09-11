"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight,
  Clock, Shield, ShieldCheck, Upload, FileText, Sparkles, Loader2, Info
} from "lucide-react";
import { COUNTRIES, getCountryEligibility, validatePassportValidity } from "@/lib/visa-countries";

export default function VisaApplyPage() {
  const router = useRouter();

  // Wizard Step: 1 = Nationality & Tier, 2 = Travel, 3 = Personal & Passport, 4 = Review & Pay, 5 = Success
  const [step, setStep] = useState(1);

  // Form State
  const [nationality, setNationality] = useState("");
  const [passportType, setPassportType] = useState("Ordinary passport");
  const [visaType, setVisaType] = useState<"standard" | "urgent">("standard");

  const [arrivalDate, setArrivalDate] = useState("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("Tourism");
  const [stayAddress, setStayAddress] = useState("");

  const [surname, setSurname] = useState("");
  const [givenNames, setGivenNames] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");

  const [passportNumber, setPassportNumber] = useState("");
  const [passportIssueDate, setPassportIssueDate] = useState("");
  const [passportExpiryDate, setPassportExpiryDate] = useState("");
  const [passportScanUrl, setPassportScanUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Loading & Submission
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedRef, setCompletedRef] = useState<string | null>(null);

  // Check URL query parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qCountry = params.get("country");
      const qType = params.get("type");
      if (qCountry) {
        setNationality(qCountry);
        setBirthCountry(qCountry);
      }
      if (qType === "urgent" || qType === "standard") {
        setVisaType(qType);
      }
    }
  }, []);

  const selectedCountryInfo = nationality ? getCountryEligibility(nationality) : null;
  const isVisaFree = selectedCountryInfo?.category === "visa_free";
  const isEmbassyRequired = selectedCountryInfo?.category === "embassy_required";

  // Calculate pricing
  const govFee = visaType === "urgent" ? 61 : 26;
  const serviceFee = visaType === "urgent" ? 49 : 33;
  const totalAmount = govFee + serviceFee;

  // Handle Photo / Document Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotoPreview(dataUrl);
      setPassportScanUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Validate Step Transitions
  const handleNext = () => {
    setErrorMessage(null);

    if (step === 1) {
      if (!nationality) {
        setErrorMessage("Please select your country of citizenship.");
        return;
      }
      if (isVisaFree) {
        setErrorMessage("Citizens of this country enter Azerbaijan visa-free. You do not need to apply!");
        return;
      }
      if (isEmbassyRequired) {
        setErrorMessage("Citizens of this country are not eligible for an ASAN e-Visa under Azerbaijani immigration regulations. You must apply directly at an Embassy or Consulate of the Republic of Azerbaijan.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!arrivalDate || !stayAddress.trim()) {
        setErrorMessage("Please enter your expected arrival date and accommodation address in Azerbaijan.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (
        !surname.trim() ||
        !givenNames.trim() ||
        !birthDate ||
        !birthCountry ||
        !birthPlace.trim() ||
        !occupation.trim() ||
        !phoneNumber.trim() ||
        !email.trim() ||
        !residentialAddress.trim() ||
        !passportNumber.trim() ||
        !passportIssueDate ||
        !passportExpiryDate
      ) {
        setErrorMessage("Please fill in all personal and passport fields as shown on your official document.");
        return;
      }

      // Passport validity check
      const check = validatePassportValidity(arrivalDate, passportExpiryDate);
      if (!check.valid) {
        setErrorMessage(check.message || "Passport expiration date is invalid.");
        return;
      }

      setStep(4);
    }
  };

  // Submit Application
  const handleSubmitApplication = async () => {
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/visa/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nationality,
          passportType,
          visaType,
          arrivalDate,
          purposeOfVisit,
          stayAddress,
          surname,
          givenNames,
          gender,
          birthDate,
          birthCountry,
          birthPlace,
          occupation,
          phoneNumber,
          email,
          residentialAddress,
          passportNumber,
          passportIssueDate,
          passportExpiryDate,
          passportScanUrl: passportScanUrl || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Failed to submit application.");
        setSubmitting(false);
        return;
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      setCompletedRef(data.applicationNumber);
      setStep(5);
    } catch (err: any) {
      setErrorMessage(err?.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5ede0" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header className="border-b border-black/10 py-4" style={{ backgroundColor: "#133e35" }}>
        <div className="container-section flex items-center justify-between">
          <Link href="/visa" className="flex items-center gap-1.5 text-white text-xs font-semibold hover:opacity-90">
            <ArrowLeft className="h-4 w-4 text-[#c9a227]" />
            <span className="hidden sm:inline">Back to Visa Overview</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-white truncate max-w-[140px] sm:max-w-none">
              Azerbaijan e-Visa
            </span>
          </div>
          <Link href="/visa/track" className="text-xs text-white/80 hover:text-white">
            Track Status
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ WIZARD PROGRESS */}
      {step < 5 && (
        <div className="bg-white border-b border-[#e2d8cc] py-3 sm:py-4">
          <div className="container-section max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />
              {[
                { num: 1, label: "Citizenship" },
                { num: 2, label: "Travel Info" },
                { num: 3, label: "Passport" },
                { num: 4, label: "Review & Pay" },
              ].map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center bg-white px-1 sm:px-2">
                  <div
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold transition-colors"
                    style={
                      step >= s.num
                        ? { backgroundColor: "#133e35", color: "#ffffff" }
                        : { backgroundColor: "#e2e8f0", color: "#64748b" }
                    }
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-medium text-slate-600 mt-1 whitespace-nowrap">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ MAIN FORM CONTAINER */}
      <main className="container-section py-10 max-w-2xl mx-auto">
        {/* SEO: Single h1 per page for heading hierarchy */}
        <h1 className="sr-only">Apply for Azerbaijan e-Visa Online — Official ASAN Visa Application</h1>
        {errorMessage && (
          <div className="mb-6 rounded-2xl p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-shake">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* ── STEP 1: Nationality & Tier ─────────────────────────── */}
        {step === 1 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc]">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Select Your Nationality
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Select the country that issued the passport you will use to travel to Azerbaijan.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nationality / Citizenship *
                </label>
                <select
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
                    setBirthCountry(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#133e35]"
                >
                  <option value="">Select your passport country...</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name} {c.category === "visa_free" ? "(Visa-Free)" : c.category === "embassy_required" ? "(Consular / Embassy Visa)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visa-Free Warning */}
              {isVisaFree && (
                <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">No Visa Required for {nationality}!</p>
                    <p className="mt-1">
                      {selectedCountryInfo?.notes || "You can travel directly to Azerbaijan with your valid passport."}
                    </p>
                  </div>
                </div>
              )}

              {/* Embassy-Required Warning */}
              {isEmbassyRequired && (
                <div className="rounded-2xl p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Consular Visa Required for {nationality}</p>
                    <p className="mt-1">
                      Citizens of {nationality} are not eligible for the online ASAN electronic visa (e-Visa) under Republic of Azerbaijan immigration regulations. You must apply for a visa directly at an Embassy or Consulate of the Republic of Azerbaijan.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Travel Document Type
                </label>
                <select
                  value={passportType}
                  onChange={(e) => setPassportType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none"
                >
                  <option value="Ordinary passport">Ordinary passport (Standard tourist)</option>
                  <option value="Service passport">Service passport</option>
                  <option value="Diplomatic passport">Diplomatic passport</option>
                </select>
              </div>

              {/* Processing Speed Radio Group */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Select Processing Speed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setVisaType("standard")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      visaType === "standard"
                        ? "border-[#133e35] bg-slate-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">Standard</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        3 Business Days
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Regular tourist processing.</p>
                    <p className="font-bold text-lg text-[#133e35]">$59 <span className="text-xs font-normal text-slate-500">USD</span></p>
                  </div>

                  <div
                    onClick={() => setVisaType("urgent")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                      visaType === "urgent"
                        ? "border-[#c9a227] bg-amber-50/40 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="absolute top-0 right-0 bg-[#c9a227] text-[#0f2e27] text-[9px] font-extrabold px-2 py-0.5 rounded-bl-lg">
                      ⚡ FASTEST
                    </span>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">Urgent</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                        Within 3 Hours
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Express emergency turnaround.</p>
                    <p className="font-bold text-lg text-[#133e35]">$110 <span className="text-xs font-normal text-slate-500">USD</span></p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={isVisaFree || isEmbassyRequired || !nationality}
                className="w-full rounded-2xl py-4 text-sm font-semibold text-white transition-all hover:opacity-95 shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-6"
                style={{ backgroundColor: "#133e35" }}
              >
                Continue to Travel Information <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Travel Details ─────────────────────────────── */}
        {step === 2 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc]">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Travel Information
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Enter your anticipated entry date and where you will stay in Azerbaijan.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Expected Arrival Date *
                </label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#133e35]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Your e-Visa will be valid for 90 days starting from this arrival date.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Purpose of Visit *
                </label>
                <select
                  value={purposeOfVisit}
                  onChange={(e) => setPurposeOfVisit(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none"
                >
                  <option value="Tourism">Tourism / Sightseeing</option>
                  <option value="Business">Business / Conference</option>
                  <option value="Culture">Cultural & Historical</option>
                  <option value="Sports">Sports / Events</option>
                  <option value="Personal">Personal Visit / Friends</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Accommodation / Stay Address in Azerbaijan *
                </label>
                <textarea
                  rows={3}
                  value={stayAddress}
                  onChange={(e) => setStayAddress(e.target.value)}
                  placeholder="e.g. Four Seasons Hotel Baku, 1 Neftchilar Avenue, Baku or private address"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#133e35]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Required by Azerbaijan Immigration. Hotel booking address is acceptable.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-xl py-3 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#133e35" }}
                >
                  Continue to Personal & Passport Info <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Personal & Passport Information ────────────── */}
        {step === 3 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc]">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Personal & Passport Details
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Must match the machine-readable zone (MRZ) of your passport exactly.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Surname (Last Name) *
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="e.g. SMITH"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Given Names (First & Middle) *
                  </label>
                  <input
                    type="text"
                    value={givenNames}
                    onChange={(e) => setGivenNames(e.target.value)}
                    placeholder="e.g. JOHN MICHAEL"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Place of Birth (City) *
                  </label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="e.g. London"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Occupation / Profession *
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Software Engineer / Accountant"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +1 555 123 4567"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address * (For e-Visa PDF Delivery)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. traveler@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Permanent Residential Address *
                </label>
                <input
                  type="text"
                  value={residentialAddress}
                  onChange={(e) => setResidentialAddress(e.target.value)}
                  placeholder="e.g. 123 Baker Street, London, United Kingdom"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              {/* Passport Section */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-[#c9a227]" />
                  Passport Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Passport Number *
                    </label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="e.g. A12345678"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      value={passportIssueDate}
                      onChange={(e) => setPassportIssueDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      value={passportExpiryDate}
                      onChange={(e) => setPassportExpiryDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  ⚠️ Must be valid for at least 3 months (90 days) beyond your arrival date in Azerbaijan.
                </p>
              </div>

              {/* Passport Photo Upload */}
              <div className="pt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Upload Passport Bio-Page Photo / Scan
                </label>
                <div className="rounded-2xl border-2 border-dashed border-slate-300 p-4 text-center bg-slate-50 hover:bg-slate-100/50 transition-colors relative">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {photoPreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={photoPreview}
                        alt="Passport Preview"
                        className="h-32 object-contain rounded-lg border border-slate-200 mb-2 shadow-sm"
                      />
                      <p className="text-xs text-emerald-600 font-semibold">✓ Document attached. Click to change.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <Upload className="h-7 w-7 text-slate-400 mb-2" />
                      <p className="text-xs font-semibold text-slate-700">Click to upload or drag & drop</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, or PDF of the main photo page (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-xl px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-xl py-3 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#133e35" }}
                >
                  Review Order & Complete <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review & Payment ───────────────────────────── */}
        {step === 4 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#e2d8cc]">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Review & Submit Application
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Please double check all information. Typos will delay official government issuance.
            </p>

            <div className="space-y-6">
              {/* Summary Box */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{surname.toUpperCase()} {givenNames.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Nationality:</span>
                  <span className="font-bold text-slate-900">{nationality}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Passport Number:</span>
                  <span className="font-mono font-bold text-slate-900">{passportNumber.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Arrival Date:</span>
                  <span className="font-bold text-slate-900">{arrivalDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Service Speed:</span>
                  <span className="font-bold text-[#133e35] uppercase">{visaType} ({visaType === "urgent" ? "3 Hours" : "3 Days"})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Email:</span>
                  <span className="font-bold text-slate-900">{email}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="rounded-2xl p-4 border border-[#c9a227]/40 bg-amber-50/40">
                <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                  <span>Official Government ASAN Fee:</span>
                  <span>${govFee}.00 USD</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Concierge Pre-Screen & Submission:</span>
                  <span>${serviceFee}.00 USD</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 border-t border-amber-200 pt-2">
                  <span>Total Amount Due:</span>
                  <span style={{ color: "#133e35" }}>${totalAmount}.00 USD</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={submitting}
                  className="rounded-xl px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#133e35" }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      Connecting to Payriff Gateway...
                    </>
                  ) : (
                    <>Pay with Payriff (${totalAmount}.00 USD) &rarr;</>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Secured by <b>payriff</b> 3D-Secure &bull; Visa &bull; Mastercard &bull; Apple Pay</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: Success Screen ─────────────────────────────── */}
        {step === 5 && (
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-emerald-200 text-center animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2 inline-block">
              Payment & Application Confirmed
            </span>

            <h2 className="font-display text-3xl font-bold text-slate-900 mt-2 mb-2">
              Application Received!
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              Our visa operations officers have been alerted via Telegram and are reviewing your passport information against official ASAN immigration criteria.
            </p>

            <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 max-w-sm mx-auto mb-8 text-left">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Your Tracking Reference</p>
              <p className="font-mono text-2xl font-bold text-[#133e35] my-1">{completedRef}</p>
              <p className="text-xs text-slate-500">
                A confirmation has been sent to <b>{email}</b>. Keep this reference to track your live status.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/visa/track?ref=${encodeURIComponent(completedRef || "")}&email=${encodeURIComponent(email)}`}
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-95"
                style={{ backgroundColor: "#133e35" }}
              >
                Track Live Status
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
