"use client";

import React, { useState, useEffect } from "react";
import {
  Printer,
  Share2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  FileDown,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface VoucherShareActionsProps {
  bookingRef: string;
  serviceType: "transfer" | "tour" | "visa" | "itinerary";
  serviceTitle: string;
  customerName?: string;
  customerEmail?: string;
  summaryDetails?: Record<string, string | undefined | null>;
  pdfFilename?: string;
  directUrl?: string;
  className?: string;
  variant?: "light" | "dark" | "compact";
}

const LABELS = {
  EN: {
    savePdf: "Save as PDF",
    shareWhatsApp: "Send via WhatsApp",
    shareDevice: "Share Voucher",
    emailVoucher: "Email Voucher",
    copyLink: "Copy Link",
    copied: "Link Copied!",
    toastCopied: "Voucher link copied to clipboard!",
    voucherTitle: "AddmeTour Official Confirmation Voucher",
  },
  AZ: {
    savePdf: "PDF Yadda Saxla",
    shareWhatsApp: "WhatsApp ilə Göndər",
    shareDevice: "Vauçeri Paylaş",
    emailVoucher: "Email ilə Göndər",
    copyLink: "Linki Kopyala",
    copied: "Kopyalandı!",
    toastCopied: "Vauçer linki buferə kopyalandı!",
    voucherTitle: "AddmeTour Rəsmi Təsdiq Vauçeri",
  },
  RU: {
    savePdf: "Сохранить как PDF",
    shareWhatsApp: "Отправить в WhatsApp",
    shareDevice: "Поделиться ваучером",
    emailVoucher: "Отправить на Email",
    copyLink: "Копировать ссылку",
    copied: "Скопировано!",
    toastCopied: "Ссылка на ваучер скопирована в буфер!",
    voucherTitle: "Официальный ваучер бронирования AddmeTour",
  },
  AR: {
    savePdf: "حفظ كـ PDF",
    shareWhatsApp: "إرسال عبر واتساب",
    shareDevice: "مشاركة القسيمة",
    emailVoucher: "إرسال بالبريد",
    copyLink: "نسخ الرابط",
    copied: "تم النسخ!",
    toastCopied: "تم نسخ رابط القسيمة بنجاح!",
    voucherTitle: "قسيمة حجز AddmeTour الرسمية",
  },
  FR: {
    savePdf: "Enregistrer en PDF",
    shareWhatsApp: "Envoyer via WhatsApp",
    shareDevice: "Partager le bon",
    emailVoucher: "Envoyer par email",
    copyLink: "Copier le lien",
    copied: "Lien copié !",
    toastCopied: "Lien du bon copié dans le presse-papiers !",
    voucherTitle: "Bon de confirmation officiel AddmeTour",
  },
  DE: {
    savePdf: "Als PDF speichern",
    shareWhatsApp: "Per WhatsApp senden",
    shareDevice: "Gutschein teilen",
    emailVoucher: "Per E-Mail senden",
    copyLink: "Link kopieren",
    copied: "Kopiert!",
    toastCopied: "Gutschein-Link in die Zwischenablage kopiert!",
    voucherTitle: "Offizieller AddmeTour Buchungsbeleg",
  },
};

const SHARE_DICTIONARY = {
  EN: {
    header: "🎟️ *AddmeTour Booking Confirmation*",
    ref: "Ref",
    service: "Service",
    passenger: "Passenger",
    viewVoucher: "📄 View / Download Official Voucher PDF:",
    Airport: "Airport",
    Route: "Route",
    Flight: "Flight",
    Vehicle: "Vehicle",
    Payment: "Payment",
    Total: "Total",
    "Total Amount": "Total Amount",
    Date: "Date",
    "Arrival Date": "Arrival Date",
    Travelers: "Travelers",
    Pickup: "Pickup Location",
    Status: "Status",
    Citizenship: "Citizenship",
    Processing: "Processing Speed",
    "Government ASAN ID": "Government ASAN ID",
  },
  AZ: {
    header: "🎟️ *AddmeTour Rezervasiya Təsdiqi*",
    ref: "Kod",
    service: "Xidmət",
    passenger: "Sərnişin",
    viewVoucher: "📄 Rəsmi Vauçerə Bax / Yüklə (PDF):",
    Airport: "Hava limanı",
    Route: "Marşrut",
    Flight: "Uçuş",
    Vehicle: "Nəqliyyat",
    Payment: "Ödəniş",
    Total: "Məbləğ",
    "Total Amount": "Ümumi Məbləğ",
    Date: "Tarix",
    "Arrival Date": "Gəliş Tarixi",
    Travelers: "Səyahətçilər",
    Pickup: "Qarşılama ünvanı",
    Status: "Status",
    Citizenship: "Vətəndaşlıq",
    Processing: "İcra müddəti",
    "Government ASAN ID": "Dövlət ASAN Kodu",
  },
  RU: {
    header: "🎟️ *Подтверждение бронирования AddmeTour*",
    ref: "Номер брони",
    service: "Услуга",
    passenger: "Пассажир",
    viewVoucher: "📄 Просмотреть / Скачать официальный ваучер (PDF):",
    Airport: "Аэропорт",
    Route: "Маршрут",
    Flight: "Рейс",
    Vehicle: "Автомобиль",
    Payment: "Оплата",
    Total: "Итого",
    "Total Amount": "Общая сумма",
    Date: "Дата",
    "Arrival Date": "Дата прибытия",
    Travelers: "Путешественники",
    Pickup: "Место встречи",
    Status: "Статус",
    Citizenship: "Гражданство",
    Processing: "Срок оформления",
    "Government ASAN ID": "Государственный ID ASAN",
  },
  AR: {
    header: "🎟️ *تأكيد حجز AddmeTour*",
    ref: "رقم الحجز",
    service: "الخدمة",
    passenger: "المسافر",
    viewVoucher: "📄 عرض / تحميل قسيمة الحجز الرسمية (PDF):",
    Airport: "المطار",
    Route: "المسار",
    Flight: "رقم الرحلة",
    Vehicle: "نوع السيارة",
    Payment: "طريقة الدفع",
    Total: "المبلغ الإجمالي",
    "Total Amount": "المبلغ الإجمالي",
    Date: "التاريخ",
    "Arrival Date": "تاريخ الوصول",
    Travelers: "عدد المسافرين",
    Pickup: "موقع الاستقبال",
    Status: "الحالة",
    Citizenship: "الجنسية",
    Processing: "مدة المعالجة",
    "Government ASAN ID": "رقم طلب أسان الحكومي",
  },
  FR: {
    header: "🎟️ *Confirmation de réservation AddmeTour*",
    ref: "Réf",
    service: "Service",
    passenger: "Passager",
    viewVoucher: "📄 Voir / Télécharger le bon officiel (PDF) :",
    Airport: "Aéroport",
    Route: "Itinéraire",
    Flight: "Vol",
    Vehicle: "Véhicule",
    Payment: "Paiement",
    Total: "Total",
    "Total Amount": "Montant total",
    Date: "Date",
    "Arrival Date": "Date d'arrivée",
    Travelers: "Voyageurs",
    Pickup: "Lieu de prise en charge",
    Status: "Statut",
    Citizenship: "Nationalité",
    Processing: "Traitement",
    "Government ASAN ID": "ID officiel ASAN",
  },
  DE: {
    header: "🎟️ *AddmeTour Buchungsbestätigung*",
    ref: "Ref-Nr.",
    service: "Leistung",
    passenger: "Passagier",
    viewVoucher: "📄 Offiziellen Gutschein ansehen / PDF herunterladen:",
    Airport: "Flughafen",
    Route: "Route",
    Flight: "Flug",
    Vehicle: "Fahrzeug",
    Payment: "Zahlungsart",
    Total: "Gesamtbetrag",
    "Total Amount": "Gesamtbetrag",
    Date: "Datum",
    "Arrival Date": "Ankunftsdatum",
    Travelers: "Reisende",
    Pickup: "Abholort",
    Status: "Status",
    Citizenship: "Staatsangehörigkeit",
    Processing: "Bearbeitungszeit",
    "Government ASAN ID": "Staatliche ASAN-ID",
  },
};

export default function VoucherShareActions({
  bookingRef,
  serviceType,
  serviceTitle,
  customerName,
  customerEmail,
  summaryDetails,
  pdfFilename,
  directUrl,
  className = "",
  variant = "light",
}: VoucherShareActionsProps) {
  const { language, showToast } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  const l = LABELS[language as keyof typeof LABELS] || LABELS.EN;
  const dict = SHARE_DICTIONARY[language as keyof typeof SHARE_DICTIONARY] || SHARE_DICTIONARY.EN;

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true);
    }
  }, []);

  const getEffectiveUrl = () => {
    const target = directUrl || (typeof window !== "undefined" ? window.location.href : "https://addmetour.vercel.app");
    try {
      const url = new URL(target);
      if (language && language !== "EN") {
        url.searchParams.set("lang", language.toLowerCase());
      }
      return url.toString();
    } catch {
      return target;
    }
  };

  const getShareText = () => {
    const lines: string[] = [
      dict.header,
      `${dict.ref}: *${bookingRef}*`,
      `${dict.service}: *${serviceTitle}*`,
    ];

    if (customerName) lines.push(`${dict.passenger}: *${customerName}*`);

    if (summaryDetails) {
      Object.entries(summaryDetails).forEach(([key, val]) => {
        if (val) {
          const dictRecord = dict as Record<string, string>;
          const localizedKey = dictRecord[key] || key;
          lines.push(`${localizedKey}: *${val}*`);
        }
      });
    }

    lines.push(``);
    lines.push(dict.viewVoucher);
    lines.push(getEffectiveUrl());

    return lines.join("\n");
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;

    const originalTitle = document.title;
    const cleanFilename =
      pdfFilename ||
      `AddmeTour-${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}-Voucher-${bookingRef}`;

    document.title = cleanFilename;

    const cleanup = () => {
      document.title = originalTitle;
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();

    // Fallback restoration in case afterprint isn't fired
    setTimeout(() => {
      document.title = originalTitle;
    }, 2000);
  };

  const handleWhatsAppShare = () => {
    const text = getShareText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    const text = getShareText();
    const url = getEffectiveUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${l.voucherTitle} (${bookingRef})`,
          text,
          url,
        });
      } catch (err: any) {
        // User aborted share sheet or unsupported format; fallback silently
        if (err?.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleEmailShare = () => {
    const subject = `${l.voucherTitle} - ${bookingRef}`;
    const body = `${getShareText()}\n\nAddmeTour Azerbaijan DMC\n24/7 Operations: +994 55 100 3146`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyLink = async () => {
    try {
      const url = getEffectiveUrl();
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older environments
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      showToast(l.toastCopied, "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast(l.toastCopied, "info");
    }
  };

  return (
    <div
      data-screen-only="true"
      className={`print:hidden flex flex-wrap items-center justify-between gap-2.5 p-3 sm:p-4 rounded-2xl transition-all ${
        variant === "dark"
          ? "bg-slate-900/90 text-white border border-white/10 shadow-lg"
          : "bg-white border border-slate-200/80 shadow-sm"
      } ${className}`}
    >
      {/* Primary Actions: Print/Save PDF & WhatsApp */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f3460] hover:bg-[#1a4a84] text-white px-4 py-2 text-xs font-bold transition-all shadow-sm hover:shadow active:scale-[0.98]"
        >
          <FileDown className="h-3.5 w-3.5 text-sky-300" />
          <span>{l.savePdf}</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-sm hover:shadow active:scale-[0.98]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{l.shareWhatsApp}</span>
        </button>
      </div>

      {/* Secondary Sharing Actions: Native Device Share, Email, Copy Link */}
      <div className="flex items-center gap-1.5 text-xs">
        {hasNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            title={l.shareDevice}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">{l.shareDevice}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleEmailShare}
          title={l.emailVoucher}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          <Mail className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">{l.emailVoucher}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          title={l.copyLink}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-bold">{l.copied}</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">{l.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
