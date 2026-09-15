"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight,
  Clock, Shield, ShieldCheck, Upload, FileText, Sparkles, Loader2, Info
} from "lucide-react";
import { COUNTRIES, getCountryEligibility, validatePassportValidity } from "@/lib/visa-countries";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n";
import { VISA_APPLY_TRANSLATIONS } from "@/lib/pages-i18n";
import { DatePicker } from "@/components/DatePicker";
import { CustomSelect } from "@/components/CustomSelect";

export default function VisaApplyPage() {
  const { t, showToast, language } = useLanguage();
  const va = (VISA_APPLY_TRANSLATIONS[language] || VISA_APPLY_TRANSLATIONS.EN)!;
  const router = useRouter();

  // Wizard Step: 1 = Nationality & Tier, 2 = Travel, 3 = Personal & Passport, 4 = Review & Pay, 5 = Success
  const [step, setStep] = useState(1);
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

  const triggerValidationError = (msg: string) => {
    showToast(msg, "error");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Validate Step Transitions
  const handleNext = () => {


    if (step === 1) {
      if (!nationality) {
        triggerValidationError(t.visaPage.errSelectCitizenship);
        return;
      }
      if (isVisaFree) {
        triggerValidationError(t.visaPage.errVisaFree);
        return;
      }
      if (isEmbassyRequired) {
        triggerValidationError(t.visaPage.errEmbassyRequired);
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2) {
      if (!arrivalDate || !stayAddress.trim()) {
        triggerValidationError(t.visaPage.errTravelInfo);
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        triggerValidationError(t.visaPage.errFillAllFields);
        return;
      }

      // Passport validity check
      const check = validatePassportValidity(arrivalDate, passportExpiryDate);
      if (!check.valid) {
        triggerValidationError(t.visaPage.errPassportMinValidity);
        return;
      }

      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit Application
  const handleSubmitApplication = async () => {

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
        const msg = data?.error || t.visaPage.errSubmitFailed;
        triggerValidationError(msg);
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
      const msg = err?.message || t.visaPage.errNetworkError;
      triggerValidationError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* ═══════════════════════════════════════════════════════ HEADER */}
      <header
        className={`sticky top-0 z-50 py-4 transition-all duration-300 ${
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
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-white truncate max-w-[120px] sm:max-w-none">
              Azerbaijan e-Visa
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSelector variant="dark" />
            <Link href="/visa/track" className="text-xs text-white/80 hover:text-white hidden sm:inline whitespace-nowrap">
              {t.nav.trackVisa}
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════ WIZARD PROGRESS */}
      {step < 5 && (
        <div className="bg-white border-b border-slate-200 py-3 sm:py-4">
          <div className="container-section max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-[14px] sm:top-[16px] left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-[14px] sm:top-[16px] left-[12.5%] h-0.5 bg-[#0f3460] -translate-y-1/2 z-0 transition-all duration-300"
                style={{
                  width: `${((Math.min(step, 4) - 1) / 3) * 75}%`,
                }}
              />
              {[
                { num: 1, label: va.step1Nav },
                { num: 2, label: va.step2Nav },
                { num: 3, label: va.step3Nav },
                { num: 4, label: va.step4Nav },
              ].map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center flex-1 bg-transparent px-1 sm:px-2">
                  <div
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold transition-colors shadow-sm"
                    style={
                      step >= s.num
                        ? { backgroundColor: "#0f3460", color: "#ffffff" }
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


        {/* ── STEP 1: Nationality & Tier ─────────────────────────── */}
        {step === 1 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {va.step1Title}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {va.step1Desc}
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.nationalityLabel}
                </label>
                <CustomSelect
                  value={nationality}
                  onChange={(val) => {
                    setNationality(val);
                    setBirthCountry(val);
                  }}
                  searchable={true}
                  placeholder={va.nationalityPlaceholder}
                  options={COUNTRIES.map((c) => ({
                    value: c.name,
                    label: `${c.name} ${c.category === "visa_free" ? va.visaFreeTag : c.category === "embassy_required" ? va.consularTag : ""}`.trim(),
                  }))}
                />
              </div>

              {/* Visa-Free Warning */}
              {isVisaFree && (
                <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{va.noVisaRequiredTitle.replace("{nationality}", nationality)}</p>
                    <p className="mt-1">
                      {selectedCountryInfo?.notes || va.noVisaRequiredDescFallback}
                    </p>
                  </div>
                </div>
              )}

              {/* Embassy-Required Warning */}
              {isEmbassyRequired && (
                <div className="rounded-2xl p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{va.consularVisaTitle.replace("{nationality}", nationality)}</p>
                    <p className="mt-1">
                      {va.consularVisaDesc.replace(/\{nationality\}/g, nationality)}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.travelDocLabel}
                </label>
                <CustomSelect
                  value={passportType}
                  onChange={(val) => setPassportType(val)}
                  options={[
                    { value: "Ordinary passport", label: va.docOrdinary },
                    { value: "Service passport", label: va.docService },
                    { value: "Diplomatic passport", label: va.docDiplomatic },
                  ]}
                />
              </div>

              {/* Processing Speed Radio Group */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  {va.speedLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setVisaType("standard")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      visaType === "standard"
                        ? "border-[#0f3460] bg-slate-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">{va.standardTitle}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {va.standardTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{va.standardDesc}</p>
                    <p className="font-bold text-lg text-[#0f3460]">$59 <span className="text-xs font-normal text-slate-500">USD</span></p>
                  </div>

                  <div
                    onClick={() => setVisaType("urgent")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                      visaType === "urgent"
                        ? "border-[#f59e0b] bg-amber-50/40 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="absolute top-0 right-0 bg-[#f59e0b] text-[#061225] text-[9px] font-extrabold px-2 py-0.5 rounded-bl-lg">
                      {va.fastestBadge}
                    </span>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">{va.urgentTitle}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                        {va.urgentTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{va.urgentDesc}</p>
                    <p className="font-bold text-lg text-[#0f3460]">$110 <span className="text-xs font-normal text-slate-500">USD</span></p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={isVisaFree || isEmbassyRequired || !nationality}
                className="w-full rounded-2xl py-4 text-sm font-semibold text-white transition-all hover:opacity-95 shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-6"
                style={{ backgroundColor: "#0f3460" }}
              >
                {va.btnContinueTravel} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Travel Details ─────────────────────────────── */}
        {step === 2 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {va.step2Title}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {va.step2Desc}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.arrivalDateLabel}
                </label>
                <DatePicker
                  required
                  minDate={new Date().toISOString().split("T")[0]}
                  value={arrivalDate}
                  placeholder={va.arrivalDateLabel}
                  onChange={(val) => setArrivalDate(val)}
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {va.arrivalDateHint}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.purposeLabel}
                </label>
                <CustomSelect
                  value={purposeOfVisit}
                  onChange={(val) => setPurposeOfVisit(val)}
                  options={[
                    { value: "Tourism", label: va.purposeTourism },
                    { value: "Business", label: va.purposeBusiness },
                    { value: "Culture", label: va.purposeCulture },
                    { value: "Sports", label: va.purposeSports },
                    { value: "Personal", label: va.purposePersonal },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.addressLabel}
                </label>
                <textarea
                  rows={3}
                  value={stayAddress}
                  onChange={(e) => setStayAddress(e.target.value)}
                  placeholder={va.addressPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0f3460]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {va.addressHint}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {va.btnBack}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-xl py-3 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {va.btnContinuePersonal} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Personal & Passport Information ────────────── */}
        {step === 3 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {va.step3Title}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {va.step3Desc}
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.surnameLabel}
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder={va.surnamePlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.givenNamesLabel}
                  </label>
                  <input
                    type="text"
                    value={givenNames}
                    onChange={(e) => setGivenNames(e.target.value)}
                    placeholder={va.givenNamesPlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.genderLabel}
                  </label>
                  <CustomSelect
                    value={gender}
                    onChange={(val) => setGender(val)}
                    options={[
                      { value: "Male", label: va.genderMale },
                      { value: "Female", label: va.genderFemale },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.birthDateLabel}
                  </label>
                  <DatePicker
                    required
                    maxDate={new Date().toISOString().split("T")[0]}
                    value={birthDate}
                    placeholder={va.birthDateLabel}
                    onChange={(val) => setBirthDate(val)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.birthPlaceLabel}
                  </label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder={va.birthPlacePlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.occupationLabel}
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder={va.occupationPlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {va.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={va.phonePlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={va.emailPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.resAddressLabel}
                </label>
                <input
                  type="text"
                  value={residentialAddress}
                  onChange={(e) => setResidentialAddress(e.target.value)}
                  placeholder={va.resAddressPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              {/* Passport Section */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-[#f59e0b]" />
                  {va.passportSectionTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {va.passportNumLabel}
                    </label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder={va.passportNumPlaceholder}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {va.issueDateLabel}
                    </label>
                    <DatePicker
                      required
                      maxDate={new Date().toISOString().split("T")[0]}
                      value={passportIssueDate}
                      placeholder={va.issueDateLabel}
                      onChange={(val) => setPassportIssueDate(val)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {va.expiryDateLabel}
                    </label>
                    <DatePicker
                      required
                      minDate={new Date().toISOString().split("T")[0]}
                      value={passportExpiryDate}
                      placeholder={va.expiryDateLabel}
                      onChange={(val) => setPassportExpiryDate(val)}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {va.passportValidityWarning}
                </p>
              </div>

              {/* Passport Photo Upload */}
              <div className="pt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {va.uploadLabel}
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
                      <p className="text-xs text-emerald-600 font-semibold">{va.uploadAttached}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <Upload className="h-7 w-7 text-slate-400 mb-2" />
                      <p className="text-xs font-semibold text-slate-700">{va.uploadDropzoneTitle}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{va.uploadDropzoneDesc}</p>
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
                  {va.btnBack}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-xl py-3 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {va.btnContinueReview} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review & Payment ───────────────────────────── */}
        {step === 4 && (
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              {va.step4Title}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {va.step4Desc}
            </p>

            <div className="space-y-6">
              {/* Summary Box */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">{va.summaryApplicant}</span>
                  <span className="font-bold text-slate-900">{surname.toUpperCase()} {givenNames.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">{va.summaryNationality}</span>
                  <span className="font-bold text-slate-900">{nationality}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">{va.summaryPassportNum}</span>
                  <span className="font-mono font-bold text-slate-900">{passportNumber.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">{va.summaryArrivalDate}</span>
                  <span className="font-bold text-slate-900">{arrivalDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">{va.summarySpeed}</span>
                  <span className="font-bold text-[#0f3460] uppercase">{visaType} ({visaType === "urgent" ? va.timeHours : va.timeDays})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{va.summaryEmail}</span>
                  <span className="font-bold text-slate-900">{email}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="rounded-2xl p-4 border border-[#f59e0b]/40 bg-amber-50/40">
                <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                  <span>{va.asanFeeLabel}</span>
                  <span>${govFee}.00 USD</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>{va.conciergeFeeLabel}</span>
                  <span>${serviceFee}.00 USD</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 border-t border-amber-200 pt-2">
                  <span>{va.totalAmountLabel}</span>
                  <div className="text-right">
                    <span style={{ color: "#0f3460" }}>${totalAmount}.00 USD</span>
                    <span className="block text-[11px] font-normal text-slate-500">
                      (~{(totalAmount * 1.7).toFixed(2)} AZN)
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 border-t border-amber-100 pt-1.5 leading-relaxed">
                  {va.payriffNote}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={submitting}
                  className="rounded-xl px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {va.btnEditDetails}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-95 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      {va.btnConnectingPayriff}
                    </>
                  ) : (
                    <>{va.btnPayPayriff} (${totalAmount}.00 USD) &rarr;</>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>{va.securedBy}</span>
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
              {va.step5ConfirmedBadge}
            </span>

            <h2 className="font-display text-3xl font-bold text-slate-900 mt-2 mb-2">
              {va.step5Title}
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              {va.step5Desc}
            </p>

            <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 max-w-sm mx-auto mb-8 text-left">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">{va.refLabel}</p>
              <p className="font-mono text-2xl font-bold text-[#0f3460] my-1">{completedRef}</p>
              <p className="text-xs text-slate-500">
                {va.refNoticePre} <b>{email}</b>. {va.refNoticePost}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/visa/track?ref=${encodeURIComponent(completedRef || "")}&email=${encodeURIComponent(email)}`}
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-95"
                style={{ backgroundColor: "#0f3460" }}
              >
                {va.btnTrackLive}
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                {va.btnHome}
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
