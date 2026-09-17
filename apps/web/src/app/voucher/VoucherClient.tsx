"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Printer, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Phone, 
  ArrowLeft,
  Compass,
  Sparkles,
  QrCode
} from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import VoucherShareActions from "@/components/VoucherShareActions";

export default function VoucherClient() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const [loadingDb, setLoadingDb] = useState(false);

  // Extract query parameters or use fallback
  const bookingRef = searchParams.get("ref") || "AT-2026-8942";
  const rawTitle = searchParams.get("title") || "Baku Old City & Modern Architecture VIP Tour";
  const rawGuestName = searchParams.get("name") || "Valued Traveler";
  const rawEmail = searchParams.get("email") || "traveler@addmetour.com";
  const rawPhone = searchParams.get("phone") || "+994 50 000 00 00";
  const rawDate = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const rawGuests = searchParams.get("guests") || "2";
  const totalRaw = searchParams.get("total") || "120";
  const rawTotalAmount = parseFloat(totalRaw) || 120;
  const rawPickup = searchParams.get("pickup") || "Baku City Center Hotel (Lobby Meet & Greet)";
  const rawAddonsParam = searchParams.get("addons");
  const rawAddonsList: string[] = rawAddonsParam ? rawAddonsParam.split(",").filter(Boolean) : ["Traditional Azerbaijani Feast", "4G Tourist eSIM 10GB"];
  const rawType = searchParams.get("type") || "Private Signature Tour";

  // If we have verified DB data, prioritize the DB truth
  const guestName = dbData?.travelerName || rawGuestName;
  const email = dbData?.email || rawEmail;
  const phone = dbData?.phoneNumber || rawPhone;
  const date = dbData?.arrivalDate ? String(dbData.arrivalDate).split("T")[0] : rawDate;
  const guests = dbData ? `${dbData.adults + (dbData.children || 0)}` : rawGuests;
  const totalAmount = dbData?.estimatedPriceUsd ? parseFloat(dbData.estimatedPriceUsd) : rawTotalAmount;
  const title = dbData ? `${dbData.durationDays}-Day Bespoke Caucasus & Azerbaijan Private Journey` : rawTitle;
  const type = dbData ? "Verified Bespoke Custom Itinerary" : rawType;
  const pickup = dbData ? `Baku Hotel / ${dbData.vehicleClass || "Mercedes VIP Van"} Chauffeur` : rawPickup;
  const addons: string[] = dbData
    ? [
        `Accommodation: ${dbData.hotelTier}`,
        `Chauffeur: ${dbData.vehicleClass}`,
        ...(Array.isArray(dbData.destinations) ? dbData.destinations : []),
      ]
    : rawAddonsList;

  const isDbVerified = !!dbData;

  useEffect(() => {
    setMounted(true);

    if (bookingRef && (bookingRef.startsWith("ITN-") || bookingRef.startsWith("itn-"))) {
      setLoadingDb(true);
      fetch(`/api/itinerary/lookup?ref=${encodeURIComponent(bookingRef)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.itinerary) {
            setDbData(data.itinerary);
          }
        })
        .catch(() => {
          // Graceful fallback to query params
        })
        .finally(() => {
          setLoadingDb(false);
        });
    }
  }, [bookingRef]);

  return (
    <div className="min-h-screen bg-slate-900/5 py-8 px-4 sm:px-6 lg:px-8 font-sans print:p-0 print:bg-white">
      {/* Screen-only top action bar */}
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors bg-white px-3.5 py-2 rounded-xl shadow-sm border border-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to AddmeTour
        </Link>
        <div className="text-xs text-slate-500 font-medium">
          Official Digital Confirmation
        </div>
      </div>

      {/* Multi-Channel Customer Sharing Hub */}
      <VoucherShareActions
        bookingRef={bookingRef}
        serviceType="tour"
        serviceTitle={title}
        customerName={guestName}
        customerEmail={email}
        summaryDetails={{
          "Date": date,
          "Travelers": `${guests} Person(s)`,
          "Pickup": pickup,
          "Total": mounted ? formatPrice(totalAmount) : `$${totalAmount}`,
        }}
        pdfFilename={`AddmeTour-Voucher-${bookingRef}`}
        className="max-w-4xl mx-auto mb-6"
      />

      {/* Main Luxury Voucher Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 print:shadow-none print:border-none print:rounded-none print:max-w-full print-avoid-break">
        {/* Voucher Header Banner */}
        <div className="bg-[#0f3460] text-white p-8 sm:p-10 relative overflow-hidden border-b-4 border-amber-500 print:p-5 print:border-b-2">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Official Confirmation Voucher
                </span>
                <span className="text-xs text-amber-300/90 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> State Tourism Agency License #AZ-DMC-889
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                AddmeTour Incoming DMC
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Premier Caucasus & Azerbaijan Incoming Tour Operator
              </p>
            </div>

            {/* Reference Badge & QR Code */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 print:border-white/30">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">Booking Reference</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-wider">{bookingRef}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> {isDbVerified ? "DB Verified & Active" : "Confirmed"}
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Body Content */}
        <div className="p-8 sm:p-10 space-y-8 print:p-5 print:space-y-4">
          
          {/* Section: Service Summary */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-md">
                {type}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Voucher Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{title}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-200/80 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Service Date</div>
                  <div className="font-bold text-slate-900">{date}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Departure Time</div>
                  <div className="font-bold text-slate-900">09:30 AM (Local Baku Time)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Travelers</div>
                  <div className="font-bold text-slate-900">{guests} Person(s) Private</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium">Pickup Location</div>
                  <div className="font-bold text-slate-900 truncate max-w-[180px]" title={pickup}>{pickup}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Guest & Primary Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0f3460]" /> Lead Traveler Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500 font-medium">Full Name:</dt>
                  <dd className="font-bold text-slate-900">{guestName}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500 font-medium">Phone / WhatsApp:</dt>
                  <dd className="font-bold text-slate-900">{phone}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500 font-medium">Email Address:</dt>
                  <dd className="font-bold text-slate-900">{email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 font-medium">Language Preference:</dt>
                  <dd className="font-bold text-slate-900">English / Arabic / Russian (Licensed)</dd>
                </div>
              </dl>
            </div>

            {/* Financial Summary */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-900/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" /> Payment & Guarantee Status
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <dt className="text-slate-500 font-medium">Payment Terms:</dt>
                  <dd className="font-bold text-emerald-700">Guaranteed on Arrival</dd>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <dt className="text-slate-500 font-medium">Payment Options:</dt>
                  <dd className="font-bold text-slate-900">Cash (USD, AZN, EUR) or Visa/MasterCard</dd>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <dt className="text-slate-500 font-medium">Cancellation Policy:</dt>
                  <dd className="font-bold text-slate-900">Free cancellation up to 24h prior</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-base font-bold text-slate-900">Total Guaranteed:</dt>
                  <dd className="text-xl font-extrabold text-[#0f3460]">
                    {mounted ? formatPrice(totalAmount) : `$${totalAmount}`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Section: Inclusions & Verified Add-ons */}
          <div className="border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Inclusions & Requested Add-ons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Private Mercedes VIP Chauffeur & Fuel</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official Licensed Ministry Tour Guide</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All Highway Tolls, Parking & City Permits</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary Chilled Bottled Water & WiFi</span>
              </div>
              {addons.map((addon, idx) => (
                <div key={idx} className="flex items-center gap-2 text-amber-900 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{addon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Instructions & Emergency Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-200">
            <div className="space-y-1 md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Important Instructions for Travelers</h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Your dedicated chauffeur will meet you in your hotel lobby holding an official <strong>AddmeTour</strong> name board.</li>
                <li>Please bring your original passports for regional highway checkpoints (e.g. Sheki/Shahdag routes).</li>
                <li>Modest clothing is recommended when entering historical mosques in the Old City.</li>
              </ul>
            </div>

            <div className="bg-[#0f3460]/5 rounded-xl p-4 border border-[#0f3460]/10 text-xs">
              <h4 className="font-bold text-[#0f3460] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" /> 24/7 Operations Hub
              </h4>
              <p className="text-slate-700 font-medium">Baku HQ Hotline: <span className="font-bold text-slate-900">+994 12 500 0000</span></p>
              <p className="text-slate-700 font-medium">WhatsApp Dispatch: <span className="font-bold text-slate-900">+994 50 123 4567</span></p>
              <p className="text-slate-500 mt-2 text-[11px]">Nizami Street 128, Baku, Azerbaijan</p>
            </div>
          </div>

          {/* QR Code Validation Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-slate-950 shrink-0">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400">Digital Dispatch Code: {bookingRef}-VLD</div>
                <div className="text-[11px] text-slate-300">Scan at pickup by chauffeur to initiate VIP service protocol.</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 text-right">
              Powered by <strong className="text-white">AddmeTour Incoming DMC</strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
