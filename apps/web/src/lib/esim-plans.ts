export interface EsimPlan {
  id: string;
  name: string;
  dataGb: number;
  durationDays: number;
  priceUsd: number;
  costPriceUsd: number;
  commissionUsd: number;
  popular?: boolean;
  bestValue?: boolean;
  nameI18n?: {
    en: string;
    az: string;
    ru: string;
    fr: string;
    ar: string;
    de: string;
  };
  description: {
    en: string;
    az: string;
    ru: string;
    fr: string;
    ar: string;
    de: string;
  };
}

export const ESIM_PLANS: EsimPlan[] = [
  {
    id: "esim-3gb-7d",
    name: "3 GB Tourist Essential",
    dataGb: 3,
    durationDays: 7,
    priceUsd: 9,
    costPriceUsd: 4,
    commissionUsd: 5,
    nameI18n: {
      en: "3 GB Tourist Essential",
      az: "3 GB Turist Əsas Paketi",
      ru: "3 ГБ Турист Экспресс",
      fr: "3 Go Essentiel Touriste",
      ar: "3 جيجابايت الباقة الأساسية",
      de: "3 GB Touristen-Basis",
    },
    description: {
      en: "Perfect for weekend getaways, maps, WhatsApp, and ride-hailing.",
      az: "Qısa səfərlər, xəritələr, WhatsApp və taksi tətbiqləri üçün ideal.",
      ru: "Идеально для коротких поездок, карт, WhatsApp и вызова такси.",
      fr: "Idéal pour les courts séjours, GPS, WhatsApp et applications de taxi.",
      ar: "مثالي للرحلات القصيرة، الخرائط، وتطبيقات المواصلات.",
      de: "Perfekt für Kurztrips, Navigation, WhatsApp und Taxi-Apps.",
    },
  },
  {
    id: "esim-5gb-15d",
    name: "5 GB Explorer Standard",
    dataGb: 5,
    durationDays: 15,
    priceUsd: 15,
    costPriceUsd: 7,
    commissionUsd: 8,
    popular: true,
    nameI18n: {
      en: "5 GB Explorer Standard",
      az: "5 GB Səyyah Standart",
      ru: "5 ГБ Путешественник",
      fr: "5 Go Explorateur Standard",
      ar: "5 جيجابايت المستكشف القياسي",
      de: "5 GB Entdecker-Standard",
    },
    description: {
      en: "Most popular for 1-2 week holidays, browsing, photos, and social media.",
      az: "1-2 həftəlik tətillər, şəkillər, sosial media və aktiv internet üçün ən populyar.",
      ru: "Самый популярный тариф для отпуска на 1–2 недели, фото и соцсетей.",
      fr: "Le plus populaire pour 1 à 2 semaines de vacances, photos et réseaux sociaux.",
      ar: "الأكثر طلباً للإجازات من أسبوع إلى أسبوعين واستخدام وسائل التواصل.",
      de: "Beliebteste Wahl für 1–2 Wochen Urlaub, Surfen, Fotos und Social Media.",
    },
  },
  {
    id: "esim-10gb-30d",
    name: "10 GB Caucasus Pro",
    dataGb: 10,
    durationDays: 30,
    priceUsd: 24,
    costPriceUsd: 11,
    commissionUsd: 13,
    bestValue: true,
    nameI18n: {
      en: "10 GB Caucasus Pro",
      az: "10 GB Qafqaz Peşəkar",
      ru: "10 ГБ Кавказ Про",
      fr: "10 Go Caucase Pro",
      ar: "10 جيجابايت القوقاز الاحترافي",
      de: "10 GB Kaukasus Pro",
    },
    description: {
      en: "Best value for extended trips, remote work, video calls, and hotspot sharing.",
      az: "Geniş səyahətlər, uzaqdan iş, video zənglər və hotspot paylaşımı üçün ən sərfəli.",
      ru: "Лучшая цена для длительных поездок, удалённой работы и раздачи интернета.",
      fr: "Meilleure valeur pour longs séjours, télétravail, appels vidéo et partage de connexion.",
      ar: "أفضل قيمة للرحلات الطويلة، العمل عن بعد، ومشاركة نقطة الاتصال.",
      de: "Bestes Preis-Leistungs-Verhältnis für längere Reisen, Remote-Arbeit und Hotspot.",
    },
  },
  {
    id: "esim-20gb-30d",
    name: "20 GB Ultra Freedom",
    dataGb: 20,
    durationDays: 30,
    priceUsd: 36,
    costPriceUsd: 16,
    commissionUsd: 20,
    nameI18n: {
      en: "20 GB Ultra Freedom",
      az: "20 GB Ultra Azadlıq",
      ru: "20 ГБ Ультра Свобода",
      fr: "20 Go Liberté Totale",
      ar: "20 جيجابايت ألترا بلا حدود",
      de: "20 GB Ultra Freiheit",
    },
    description: {
      en: "High-capacity data for heavy streaming, content creation, and multi-device use.",
      az: "Yüksək tutumlu limitsiz sürət: video izləmə, çəkilişlər və çoxsaylı cihazlar üçün.",
      ru: "Максимальный объём для стриминга видео, блогеров и нескольких устройств.",
      fr: "Capacité maximale pour streaming vidéo HD, créateurs de contenu et multi-appareils.",
      ar: "سعة ضخمة للبث المباشر، صانعي المحتوى، واستخدام أجهزة متعددة.",
      de: "Maximales Datenvolumen für Streaming, Content Creator und mehrere Geräte.",
    },
  },
];

export function getLocalizedPlanName(plan: EsimPlan, lang: string): string {
  const code = (lang || "en").toLowerCase() as "en" | "az" | "ru" | "fr" | "ar" | "de";
  return plan.nameI18n?.[code] || plan.name;
}

export function getLocalizedPlanDesc(plan: EsimPlan, lang: string): string {
  const code = (lang || "en").toLowerCase() as "en" | "az" | "ru" | "fr" | "ar" | "de";
  return plan.description?.[code] || plan.description.en;
}
