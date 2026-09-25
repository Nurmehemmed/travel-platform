"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
  Globe,
  Plane,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";
import { CURRENT_BRAND } from "@/lib/brand";

type CountryFilter = "all" | "georgia" | "uzbekistan" | "turkey";

interface ComboDayStop {
  day: string;
  title: string;
  desc: string;
}

interface ComboPackage {
  id: "georgia" | "uzbekistan" | "turkey";
  countryKey: "georgia" | "uzbekistan" | "turkey";
  flags: string;
  countryName: string;
  title: string;
  route: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  badge: string;
  highlights: string[];
  itinerary: ComboDayStop[];
}

export const HomeTransferPromo: React.FC = () => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { settings: siteConfig } = useSiteSettings();

  const [activeCountry, setActiveCountry] = useState<CountryFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const brandName = CURRENT_BRAND.name;

  const packages: ComboPackage[] = [
    {
      id: "georgia",
      countryKey: "georgia",
      flags: "🇦🇿 🇬🇪",
      countryName:
        language === "AZ"
          ? "Azərbaycan + Gürcüstan"
          : language === "RU"
          ? "Азербайджан + Грузия"
          : language === "AR"
          ? "أذربيجان + جورجيا"
          : "Azerbaijan + Georgia",
      title:
        language === "AZ"
          ? "Böyük Qafqaz: Azərbaycan və Gürcüstan"
          : language === "RU"
          ? "Большой Кавказ: Азербайджан и Грузия"
          : language === "AR"
          ? "القوقاز الكبرى: أذربيجان وجورجيا"
          : "Great Caucasus: Azerbaijan & Georgia",
      route:
        language === "AZ"
          ? "Bakı → Şəki → Siqnaxi → Tbilisi → Qazbəgi"
          : language === "RU"
          ? "Баку → Шеки → Сигнахи → Тбилиси → Казбеги"
          : language === "AR"
          ? "باكو ← شيكي ← سغناغي ← تبليسي ← كازبيجي"
          : "Baku → Sheki → Sighnaghi → Tbilisi → Kazbegi",
      days: 6,
      nights: 5,
      price: 490,
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80",
      badge:
        language === "AZ"
          ? "Ən Çox Seçilən"
          : language === "RU"
          ? "Хит продаж"
          : language === "AR"
          ? "الأكثر طلباً"
          : "Bestseller Combo",
      highlights:
        language === "AZ"
          ? [
              "Köhnə Bakı və Şəki Xan Sarayı",
              "Kaxeti şərab dequstasiyası və Siqnaxi",
              "Köhnə Tbilisi və Kükürd hamamları",
              "Qazbəgi Gergeti Zirvəsi və Dağ Panoraması",
            ]
          : language === "RU"
          ? [
              "Старый Баку и Дворец Шекинских ханов",
              "Винные дегустации в Кахетии и Сигнахи",
              "Старый Тбилиси и знаменитые серные бани",
              "Гора Казбек и Троицкая церковь в Гергети",
            ]
          : language === "AR"
          ? [
              "باكو القديمة وقصر شيكي خان",
              "تذوق أشهر نكهات كاخيتي وسغناغي",
              "حمامات الكبريت وقلعة ناريكالا في تبليسي",
              "جبل كازبيك وكنيسة جيرجيتي ترينيتي",
            ]
          : [
              "Old Baku & Sheki Khan Palace",
              "Kakheti Wine Tasting & Sighnaghi",
              "Old Tbilisi Sulphur Baths & Narikala",
              "Mount Kazbek & Gergeti Trinity Peak",
            ],
      itinerary: [
        {
          day: language === "AZ" ? "1-2-ci Günlər" : language === "RU" ? "Дни 1-2" : language === "AR" ? "اليوم 1-2" : "Days 1-2",
          title: language === "AZ" ? "Bakı və Şəki İpək Yolu" : language === "RU" ? "Баку и Шеки" : language === "AR" ? "باكو وشيكي" : "Baku & Sheki Silk Road",
          desc: language === "AZ" ? "İçərişəhər, Alov Qüllələri və Şəki Xan Sarayı ziyarəti." : language === "RU" ? "Ичери Шехер, Пламенные башни и Дворец Шекинских ханов." : language === "AR" ? "مدينة باكو القديمة وقصر شيكي التاريخي." : "UNESCO Icherisheher, Flame Towers, and 18th-century Sheki Palace.",
        },
        {
          day: language === "AZ" ? "3-4-cü Günlər" : language === "RU" ? "Дни 3-4" : language === "AR" ? "اليوم 3-4" : "Days 3-4",
          title: language === "AZ" ? "Kaxeti Şərab Vadisi və Tbilisi" : language === "RU" ? "Кахетия и Тбилиси" : language === "AR" ? "كاخيتي وتبليسي" : "Kakheti Wine Valleys & Old Tbilisi",
          desc: language === "AZ" ? "Siqnaxi məhəbbət şəhəri, ənənəvi qvevri şərab dequstasiyası və Tbilisi kükürd hamamları." : language === "RU" ? "Город любви Сигнахи, дегустация вин в квеври и серные бани Тбилиси." : language === "AR" ? "بلدة سغناغي ومزارع العنب والحمامات الكبريتية في تبليسي." : "Sighnaghi fortified city, traditional Qvevri wine tasting, and Old Tbilisi.",
        },
        {
          day: language === "AZ" ? "5-6-cı Günlər" : language === "RU" ? "Дни 5-6" : language === "AR" ? "اليوم 5-6" : "Days 5-6",
          title: language === "AZ" ? "Hərbi Yol və Qazbəgi Gergeti" : language === "RU" ? "Военно-Грузинская дорога и Казбеги" : language === "AR" ? "طريق جورجيا العسكري وكازبيجي" : "Military Highway & Mount Kazbek",
          desc: language === "AZ" ? "Ananuri qalası, Qudauri mənzərələri və Gergeti Müqəddəs Üçlük kilsəsi." : language === "RU" ? "Крепость Ананури, арка Дружбы в Гудаури и храм в Гергети у подножия Казбека." : language === "AR" ? "قلعة أنانوري ومطل جوداوري وكنيسة جيرجيتي تحت جبل كازبيك." : "Ananuri fortress, Gudauri panoramas, and iconic Gergeti Trinity Church.",
        },
      ],
    },
    {
      id: "uzbekistan",
      countryKey: "uzbekistan",
      flags: "🇦🇿 🇺🇿",
      countryName:
        language === "AZ"
          ? "Azərbaycan + Özbəkistan"
          : language === "RU"
          ? "Азербайджан + Узбекистан"
          : language === "AR"
          ? "أذربيجان + أوزبكستان"
          : "Azerbaijan + Uzbekistan",
      title:
        language === "AZ"
          ? "İpək Yolu Karvanı: Azərbaycan və Özbəkistan"
          : language === "RU"
          ? "Шёлковый путь: Азербайджан и Узбекистан"
          : language === "AR"
          ? "قافلة طريق الحرير: أذربيجان وأوزبكستان"
          : "Silk Road Caravan: Azerbaijan & Uzbekistan",
      route:
        language === "AZ"
          ? "Bakı → Daşkənd → Səmərqənd Rəqistan → Buxara"
          : language === "RU"
          ? "Баку → Ташкент → Самарканд Регистан → Бухара"
          : language === "AR"
          ? "باكو ← طشقند ← سمرقند ريجستان ← بخارى"
          : "Baku → Tashkent → Samarkand Registan → Bukhara",
      days: 7,
      nights: 6,
      price: 690,
      image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=900&q=80",
      badge:
        language === "AZ"
          ? "UNESCO İrsi"
          : language === "RU"
          ? "Наследие ЮНЕСКО"
          : language === "AR"
          ? "تراث اليونسكو"
          : "Silk Road UNESCO",
      highlights:
        language === "AZ"
          ? [
              "Bakı Xəzər Bulvarı və Qız Qalası",
              "Afrosiyob sürət qatarı ilə səyahət",
              "Səmərqənd Rəqistan firuzəyi mozaikaları",
              "Buxara Qalası və tarixi ipək bazarları",
            ]
          : language === "RU"
          ? [
              "Бакинский бульвар на Каспии и Девичья башня",
              "Поездка на скоростном поезде «Афросиаб»",
              "Бирюзовые купола и медресе площади Регистан",
              "Цитадель Арк в Бухаре и восточные базары",
            ]
          : language === "AR"
          ? [
              "كورنيش باكو وبحر قزوين وبرج العذراء",
              "رحلة على قطار أفروسياب فائق السرعة",
              "فسيفساء وقباب ساحة ريجستان الفيروزية",
              "قلعة أرك التاريخية وأسواق بخارى العتيقة",
            ]
          : [
              "Baku Caspian Promenade & Maiden Tower",
              "Afrosiyob High-Speed Bullet Train",
              "Turquoise Domes of Samarkand Registan",
              "Ark of Bukhara & Ancient Silk Road Bazaars",
            ],
      itinerary: [
        {
          day: language === "AZ" ? "1-2-ci Günlər" : language === "RU" ? "Дни 1-2" : language === "AR" ? "اليوم 1-2" : "Days 1-2",
          title: language === "AZ" ? "Bakı Xəzər Sahili və Daşkənd" : language === "RU" ? "Баку на Каспии и Ташкент" : language === "AR" ? "ساحل باكو وطشقند" : "Caspian Baku & Tashkent Gateway",
          desc: language === "AZ" ? "Bakı İçərişəhər, Atəşgah, Qobustan və Daşkəndə birbaşa uçuş." : language === "RU" ? "Баку, Атешгях, Гобустан и прямой рейс в солнечный Ташкент." : language === "AR" ? "جولة باكو التاريخية ثم رحلة طيران مريحة إلى طشقند." : "Baku Old City, Gobustan petroglyphs, and flight to Tashkent.",
        },
        {
          day: language === "AZ" ? "3-4-cü Günlər" : language === "RU" ? "Дни 3-4" : language === "AR" ? "اليوم 3-4" : "Days 3-4",
          title: language === "AZ" ? "Səmərqənd və Əfsanəvi Rəqistan" : language === "RU" ? "Самарканд и площадь Регистан" : language === "AR" ? "سمرقند وساحة ريجستان" : "Samarkand & Legendary Registan",
          desc: language === "AZ" ? "Afrosiyob sürətli qatarı ilə gəliş, Rəqistan meydanının 3 möhtəşəm mədrəsəsi və Quri-Əmir." : language === "RU" ? "Скоростной поезд «Афросиаб», площадь Регистан, мавзолей Гур-Эмир и мечеть Биби-Ханым." : language === "AR" ? "قطار أفروسياب السريع، وزيارة مدارس ريجستان الثلاث وضريح الأمير تيمور." : "Afrosiyob bullet train, Registan Square 3 grand madrasahs, and Gur-e-Amir.",
        },
        {
          day: language === "AZ" ? "5-7-ci Günlər" : language === "RU" ? "Дни 5-7" : language === "AR" ? "اليوم 5-7" : "Days 5-7",
          title: language === "AZ" ? "Qədim Buxara Qalası və Bazarlar" : language === "RU" ? "Древняя Бухара и торговые купола" : language === "AR" ? "بخارى القديمة وقبتها التجارية" : "Holy Bukhara Ark & Silk Trading Domes",
          desc: language === "AZ" ? "Ark qalası, Poyi Kalyan minarəsi, ədviyyat və ipək bazarları." : language === "RU" ? "Цитадель Арк, ансамбль Пои-Калян, древние купола торговцев и чайные дома." : language === "AR" ? "قلعة أرك الشهيرة ومنارة كاليان وأسواق التوابل والسجاد التاريخية." : "Ark Citadel, Po-i-Kalyan complex, Lyabi-Hauz and ancient spice trading domes.",
        },
      ],
    },
    {
      id: "turkey",
      countryKey: "turkey",
      flags: "🇦🇿 🇹🇷",
      countryName:
        language === "AZ"
          ? "Azərbaycan + Türkiyə"
          : language === "RU"
          ? "Азербайджан + Турция"
          : language === "AR"
          ? "أذربيجان + تركيا"
          : "Azerbaijan + Turkey",
      title:
        language === "AZ"
          ? "Bakıdan Boğaza: Azərbaycan və Türkiyə"
          : language === "RU"
          ? "От Баку до Босфора: Азербайджан и Турция"
          : language === "AR"
          ? "من باكو إلى البوسفور: أذربيجان وتركيا"
          : "Baku to Bosphorus: Azerbaijan & Turkey",
      route:
        language === "AZ"
          ? "Bakı → Xəzər Sahili → İstanbul Boğazı → Kapadokya"
          : language === "RU"
          ? "Баку → Каспий → Стамбул Босфор → Каппадокия"
          : language === "AR"
          ? "باكو ← ساحل قزوين ← مضيق البوسفور إسطنبول ← كابادوكيا"
          : "Baku → Caspian Shore → Istanbul Bosphorus → Cappadocia",
      days: 8,
      nights: 7,
      price: 790,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80",
      badge:
        language === "AZ"
          ? "Böyük Səyahət"
          : language === "RU"
          ? "Гранд-тур"
          : language === "AR"
          ? "رحلة كبرى"
          : "Grand Voyage",
      highlights:
        language === "AZ"
          ? [
              "Alov Qüllələri və Qobustan palçıq vulkanları",
              "İstanbul Boğazında şəxsi günbatımı yaxtası",
              "Ayasofya və tarixi Qapalı Çarşı",
              "Kapadokyada səhər hava şarı uçuşu",
            ]
          : language === "RU"
          ? [
              "Пламенные башни и вулканы Гобустана",
              "Частная яхта на закате по проливу Босфор",
              "Собор Святой Софии и Гранд-Базар в Стамбуле",
              "Полёт на воздушном шаре на рассвете в Каппадокии",
            ]
          : language === "AR"
          ? [
              "أبراج اللهب وبراكين غوبوستان في باكو",
              "رحلة يخت خاصة عند الغروب في مضيق البوسفور",
              "آيا صوفيا والبازار الكبير في إسطنبول",
              "رحلة منطاد الهواء الساخن عند الشروق في كابادوكيا",
            ]
          : [
              "Flame Towers & Gobustan Mud Volcanoes",
              "Private Sunset Yacht Cruise on Bosphorus",
              "Hagia Sophia & Historic Grand Bazaar",
              "Sunrise Hot Air Balloon Flight over Cappadocia",
            ],
      itinerary: [
        {
          day: language === "AZ" ? "1-3-cü Günlər" : language === "RU" ? "Дни 1-3" : language === "AR" ? "اليوم 1-3" : "Days 1-3",
          title: language === "AZ" ? "Bakı Modern və Qədim İnciləri" : language === "RU" ? "Баку: древний и футуристичный" : language === "AR" ? "باكو الحديثة والعتيقة" : "Modern & Ancient Baku Heritage",
          desc: language === "AZ" ? "Zaha Hadid Mərkəzi, Qız Qalası, Şirvanşahlar Sarayı və İstanbula uçuş." : language === "RU" ? "Центр Гейдара Алиева, Девичья башня, Дворец Ширваншахов и перелёт в Стамбул." : language === "AR" ? "مركز حيدر علييف وأبراج اللهب وبحر قزوين ثم الطيران إلى إسطنبول." : "Heydar Aliyev Center, Maiden Tower, Shirvanshahs Palace, and flight to Istanbul.",
        },
        {
          day: language === "AZ" ? "4-5-ci Günlər" : language === "RU" ? "Дни 4-5" : language === "AR" ? "اليوم 4-5" : "Days 4-5",
          title: language === "AZ" ? "İstanbul Boğazı və Sultanəhməd" : language === "RU" ? "Босфор и сердце Стамбула" : language === "AR" ? "مضيق البوسفور والسلطان أحمد" : "Istanbul Bosphorus & Old City",
          desc: language === "AZ" ? "Ayasofya, Sultanəhməd məscidi, Qapalı Çarşı və Boğazda şəxsi günbatımı yaxtası." : language === "RU" ? "Айя-София, Голубая мечеть, Гранд-Базар и вечерний круиз на яхте по Босфору." : language === "AR" ? "جامع آيا صوفيا والمسجد الأزرق والبازار الكبير مع رحلة يخت خاص بالبوسفور." : "Hagia Sophia, Blue Mosque, Grand Bazaar, and private Bosphorus yacht sunset cruise.",
        },
        {
          day: language === "AZ" ? "6-8-ci Günlər" : language === "RU" ? "Дни 6-8" : language === "AR" ? "اليوم 6-8" : "Days 6-8",
          title: language === "AZ" ? "Kapadokya Nağıllar Diyarı" : language === "RU" ? "Волшебная Каппадокия" : language === "AR" ? "سحر كابادوكيا والمناطيد" : "Magical Cappadocia Valleys",
          desc: language === "AZ" ? "Qayalıq butik otel, Göreme vadisi, yeraltı şəhərlər və sübh çağı hava şarı uçuşu." : language === "RU" ? "Проживание в пещерном бутик-отеле, долина Гёреме и полёт на воздушных шарах." : language === "AR" ? "الإقامة في فنادق الكهوف الفاخرة، وادي غوريم، وتحليق المناطيد عند شروق الشمس." : "Cave boutique hotel, Göreme open-air museum, and sunrise hot air balloon flight.",
        },
      ],
    },
  ];

  const filteredPackages =
    activeCountry === "all"
      ? packages
      : packages.filter((p) => p.countryKey === activeCountry);

  return (
    <section id="combo-tours" className="py-20" style={{ backgroundColor: "#0b2246" }}>
      <div className="container-section">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-3 backdrop-blur-md" style={{ backgroundColor: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
            <Globe className="h-3.5 w-3.5 text-[#f59e0b]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
              {language === "AZ"
                ? "REGİONAL KOMBİNASİYA TURLARI"
                : language === "RU"
                ? "РЕГИОНАЛЬНЫЕ КОМБО-ТУРЫ"
                : language === "AR"
                ? "جولات كومبو الإقليمية"
                : "REGIONAL COMBO JOURNEYS"}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {language === "AZ"
              ? "Çox Ölkəli Kombinasiya Paketləri"
              : language === "RU"
              ? "Многострановые комбо-туры"
              : language === "AR"
              ? "باقات جولات متعددة الدول"
              : "Multi-Country Combo Packages"}
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {language === "AZ"
              ? "Azərbaycanı Gürcüstan, Özbəkistan və Türkiyə ilə birləşdirən eksklüziv səyahət paketləri — şəxsi sürücü, uçuş koordinasiyası və butik otellər daxil olmaqla."
              : language === "RU"
              ? "Эксклюзивные маршруты, объединяющие Азербайджан с Грузией, Узбекистаном и Турцией — персональные трансферы, авиабилеты и проверенные отели «под ключ»."
              : language === "AR"
              ? "رحلات سياحية خاصة تجمع أذربيجان مع جورجيا وأوزبكستان وتركيا بكل سلاسة وراحة، مع سائق خاص وأفضل الفنادق وتنسيق الرحلات كاملاً."
              : "Seamless cross-border journeys uniting Azerbaijan with Georgia, Uzbekistan, and Turkey — complete with VIP private chauffeur, flights, and handpicked boutique hotels."}
          </p>

          {/* Country Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: language === "AZ" ? "Bütün Ölkələr (3)" : language === "RU" ? "Все направления (3)" : language === "AR" ? "جميع الدول (3)" : "All Destinations (3)", icon: "🌐" },
              { id: "georgia", label: language === "AZ" ? "🇬🇪 Gürcüstan" : language === "RU" ? "🇬🇪 Грузия" : language === "AR" ? "🇬🇪 جورجيا" : "🇬🇪 Georgia", icon: "🇬🇪" },
              { id: "uzbekistan", label: language === "AZ" ? "🇺🇿 Özbəkistan" : language === "RU" ? "🇺🇿 Узбекистан" : language === "AR" ? "🇺🇿 أوزبكستان" : "🇺🇿 Uzbekistan", icon: "🇺🇿" },
              { id: "turkey", label: language === "AZ" ? "🇹🇷 Türkiyə" : language === "RU" ? "🇹🇷 Турция" : language === "AR" ? "🇹🇷 تركيا" : "🇹🇷 Turkey", icon: "🇹🇷" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCountry(tab.id as CountryFilter)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={
                  activeCountry === tab.id
                    ? { backgroundColor: "#f59e0b", color: "#061225", boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)" }
                    : { backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedId === pkg.id;

            const waText = `Hello ${brandName}! I am interested in the "${pkg.title}" combo tour (${pkg.route}, ${pkg.days} days / ${pkg.nights} nights). Please provide a quotation and departure details.`;

            return (
              <div
                key={pkg.id}
                className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(15, 34, 64, 0.85)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hero Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2246] via-[#0b2246]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold text-[#061225] shadow-md"
                      style={{ backgroundColor: "#f59e0b" }}
                    >
                      {pkg.badge}
                    </span>
                    <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-semibold text-white flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-[#f59e0b]" />
                      {pkg.days} {language === "AZ" ? "Gün" : language === "RU" ? "дней" : language === "AR" ? "أيام" : "Days"} / {pkg.nights} {language === "AZ" ? "Gecə" : language === "RU" ? "ночей" : language === "AR" ? "ليال" : "Nights"}
                    </span>
                  </div>

                  {/* Bottom Country Pair Strip */}
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
                    <span className="text-xl drop-shadow-md">{pkg.flags}</span>
                    <span className="text-xs font-bold text-white tracking-wide uppercase px-2.5 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/20">
                      {pkg.countryName}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-[#f59e0b] transition-colors leading-snug">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
                    <MapPin className="h-3.5 w-3.5 text-[#f59e0b] shrink-0" />
                    <span className="line-clamp-1">{pkg.route}</span>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-5">
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                        <Check className="h-3.5 w-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Daily Itinerary Accordion */}
                  <div className="mb-5">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                      className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 text-[#f59e0b]" />
                        {language === "AZ"
                          ? isExpanded ? "Marşrut detallarını gizlət" : "Gündəlik proqramı göstər"
                          : language === "RU"
                          ? isExpanded ? "Скрыть посуточный план" : "Посмотреть план по дням"
                          : language === "AR"
                          ? isExpanded ? "إخفاء خطة الأيام" : "عرض جدول الأيام بالتفصيل"
                          : isExpanded ? "Hide Day-by-Day Plan" : "View Day-by-Day Plan"}
                      </span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isExpanded && (
                      <div
                        className="mt-3 space-y-2.5 p-3 rounded-xl border text-xs"
                        style={{ backgroundColor: "rgba(0,0,0,0.3)", borderColor: "rgba(255,255,255,0.1)" }}
                      >
                        {pkg.itinerary.map((stop, sIdx) => (
                          <div key={sIdx} className="border-l-2 border-[#f59e0b] pl-3 py-0.5">
                            <p className="font-bold text-[#f59e0b] text-[11px] uppercase tracking-wide">
                              {stop.day}: {stop.title}
                            </p>
                            <p className="text-white/70 text-[11px] mt-0.5 leading-relaxed">{stop.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Trust Micro-Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 pb-4 mb-4 border-t border-white/10 text-[11px] text-white/50">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      {language === "AZ" ? "Sürücü daxil" : language === "RU" ? "Водитель вкл." : language === "AR" ? "سائق خاص" : "Chauffeur incl."}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Plane className="h-3.5 w-3.5 text-sky-400" />
                      {language === "AZ" ? "Sərhəd transferi" : language === "RU" ? "Стыковка границ" : language === "AR" ? "تنسيق الحدود" : "Border transit"}
                    </span>
                    <span>•</span>
                    <span>{language === "AZ" ? "Butik otellər" : language === "RU" ? "Отели 4-5★" : language === "AR" ? "فنادق مختارة" : "Curated hotels"}</span>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider">
                        {language === "AZ" ? "Adambaşına" : language === "RU" ? "За человека от" : language === "AR" ? "للشخص يبدأ من" : "From / Person"}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{formatPrice(pkg.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Customize link to itinerary builder */}
                      <Link
                        href={`/custom-itinerary?combo=${pkg.countryKey}`}
                        className="rounded-full px-3 py-2 text-xs font-semibold text-white/80 hover:text-white transition-colors border border-white/20 hover:border-white/40"
                        title={language === "AZ" ? "Fərdiləşdir" : language === "RU" ? "Настроить" : language === "AR" ? "تخصيص" : "Customize"}
                      >
                        {language === "AZ" ? "Fərdiləşdir" : language === "RU" ? "Настроить" : language === "AR" ? "تعديل" : "Customize"}
                      </Link>

                      {/* WhatsApp quote request */}
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(waText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#061225] transition-all duration-200 hover:opacity-95 hover:scale-105 shadow-md"
                        style={{ backgroundColor: "#f59e0b" }}
                      >
                        <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                        {language === "AZ" ? "Sorğu ver" : language === "RU" ? "Запросить" : language === "AR" ? "استفسر" : "Inquire"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grand 4-Country / Bespoke Silk Road Odyssey Banner */}
        <div
          className="mt-12 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 34, 64, 0.95) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-[#f59e0b] mb-3 bg-black/40 border border-[#f59e0b]/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {language === "AZ"
                  ? "🇦🇿 🇬🇪 🇺🇿 🇹🇷 Hər 3 Ölkəni Birləşdirin"
                  : language === "RU"
                  ? "🇦🇿 🇬🇪 🇺🇿 🇹🇷 Объедините все 3 страны"
                  : language === "AR"
                  ? "🇦🇿 🇬🇪 🇺🇿 🇹🇷 اجمع الدول الثلاث معاً"
                  : "🇦🇿 🇬🇪 🇺🇿 🇹🇷 Combine All 3 Countries"}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
              {language === "AZ"
                ? "Fərdi Çoxölkəli İpək Yolu Səyahəti İstəyirsiniz?"
                : language === "RU"
                ? "Хотите индивидуальный маршрут по Шёлковому пути?"
                : language === "AR"
                ? "هل ترغب في جولة خاصة تجمع هذه الدول حسب رغبتك؟"
                : "Looking for a Custom Multi-Country Silk Road Expedition?"}
            </h3>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
              {language === "AZ"
                ? "Azərbaycan, Gürcüstan, Özbəkistan və Türkiyə üzrə istədiyiniz gün sayını, görmək istədiyiniz şəhərləri və nəqliyyat növünü seçin. Səyahət mütəxəssislərimiz 30 dəqiqə ərzində şəxsi təklifinizi hazırlayacaq."
                : language === "RU"
                ? "Скомбинируйте Азербайджан, Грузию, Узбекистан и Турцию в один грандиозный тур. Выберите даты, уровень отелей и личный автомобиль — наши консьержи рассчитают индивидуальную программу за 30 минут."
                : language === "AR"
                ? "اجمع بين أذربيجان وجورجيا وأوزبكستان وتركيا في رحلة واحدة متكاملة. حدد عدد الأيام والفنادق المفضلة، وسيقوم فريقنا بتصميم خطة الرحلة المخصصة لك في غضون 30 دقيقة."
                : "Combine Azerbaijan, Georgia, Uzbekistan, and Turkey into an epic cross-continental voyage. Pick your exact duration, boutique stays, and VIP chauffeurs — our Silk Road travel designers prepare a bespoke quotation in 30 minutes."}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#f59e0b]" />
                {language === "AZ" ? "Şəxsi VIP Sürücü və Nəqliyyat" : language === "RU" ? "Индивидуальный VIP-транспорт" : language === "AR" ? "سيارة خاصة مع سائق محترف" : "Private VIP Chauffeur & Transfers"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#f59e0b]" />
                {language === "AZ" ? "Sərhəd və Uçuş Koordinasiyası" : language === "RU" ? "Координация перелетов и границ" : language === "AR" ? "تنسيق كامل للحدود والطيران" : "Cross-Border & Flight Coordination"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#f59e0b]" />
                {language === "AZ" ? "24/7 Şəxsi WhatsApp Bələdçisi" : language === "RU" ? "Поддержка 24/7 в WhatsApp" : language === "AR" ? "خدمة كونسيرج 24/7 عبر واتساب" : "24/7 Dedicated Travel Concierge"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/custom-itinerary?combo=grand"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#061225] transition-all duration-200 hover:scale-105 shadow-xl"
              style={{ backgroundColor: "#f59e0b" }}
            >
              <span>
                {language === "AZ"
                  ? "Fərdi Marşrutu Qurun"
                  : language === "RU"
                  ? "Создать свой маршрут"
                  : language === "AR"
                  ? "صمم خطة رحلتك المخصصة"
                  : "Build Custom Itinerary"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${brandName}! I want to create a bespoke multi-country tour combining Azerbaijan with Georgia, Uzbekistan, and Turkey. Please assist me with options.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/20 border border-white/20"
            >
              <MessageCircle className="h-4 w-4 text-[#f59e0b]" />
              <span>
                {language === "AZ"
                  ? "Mütəxəssislə Əlaqə"
                  : language === "RU"
                  ? "Чат с экспертом"
                  : language === "AR"
                  ? "تحدث مع خبير الرحلات"
                  : "Chat with Silk Road Specialist"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
