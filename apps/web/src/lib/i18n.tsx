"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import {
  TRANSFER_PAGE_TRANSLATIONS,
  VISA_PAGE_TRANSLATIONS,
  NAV_EXTRA_TRANSLATIONS,
  TransferPageTranslations,
  VisaPageTranslations,
  NavExtraTranslations,
} from "./pages-i18n";

export type LanguageCode = "EN" | "AZ" | "RU" | "FR" | "AR" | "DE";

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "EN", label: "English", nativeLabel: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "AZ", label: "Azerbaijani", nativeLabel: "Azərbaycan", flag: "🇦🇿", dir: "ltr" },
  { code: "RU", label: "Russian", nativeLabel: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "FR", label: "French", nativeLabel: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "AR", label: "Arabic", nativeLabel: "العربية", flag: "🇦🇪", dir: "rtl" },
  { code: "DE", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", dir: "ltr" },
];

export interface BaseTranslations {
  nav: {
    tours: string;
    destinations: string;
    about: string;
    reviews: string;
    faq: string;
    evisa: string;
    fastBadge: string;
    transfer: string;
    saved: string;
    signIn: string;
    adminPortal: string;
    logout: string;
    language: string;
    selectLanguage: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    subtitle: string;
    ctaBook: string;
    ctaBrowse: string;
    statHappy: string;
    statTours: string;
    statGuides: string;
    statRating: string;
  };
  search: {
    placeholder: string;
    filterAll: string;
    filterCity: string;
    filterDayTrip: string;
    filterOvernight: string;
    filterAdventure: string;
    durationLabel: string;
    durationAll: string;
    durationHalf: string;
    durationFull: string;
    durationMulti: string;
    showing: string;
    toursCount: string;
    noToursFound: string;
    resetFilters: string;
  };
  tours: {
    badge: string;
    title: string;
    subtitle: string;
    duration: string;
    groupSize: string;
    fromPrice: string;
    viewDetails: string;
    bookNow: string;
    savedToastAdd: string;
    savedToastRemove: string;
  };
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  destinations: {
    badge: string;
    title: string;
    subtitle: string;
    bakuName: string;
    bakuDesc: string;
    gobustanName: string;
    gobustanDesc: string;
    caucasusName: string;
    caucasusDesc: string;
    shekiName: string;
    shekiDesc: string;
    absheronName: string;
    absheronDesc: string;
    viewTours: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    ratingText: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    contact: string;
    rights: string;
    supportAvailable: string;
  };
  floating: {
    evisa: string;
    evisaSpeed: string;
    transfer: string;
    transferSupport: string;
  };
  bookingModal: {
    badge: string;
    subtitle: string;
    dateLabel: string;
    guestsLabel: string;
    guest: string;
    guests: string;
    customGroup: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    ratePerGroup: string;
    approxLocal: string;
    submitBtn: string;
    submittingBtn: string;
    confirmedTitle: string;
    referenceLabel: string;
    thankYouPart1: string;
    thankYouPart2: string;
    thankYouPart3: string;
    doneBtn: string;
    reserveDateBtn: string;
    fillAllFields: string;
    reservationSuccess: string;
    networkError: string;
  };
}

export interface Translations extends BaseTranslations {
  nav: BaseTranslations["nav"] & NavExtraTranslations;
  transferPage: TransferPageTranslations;
  visaPage: VisaPageTranslations;
}

export const TRANSLATIONS: Record<LanguageCode, BaseTranslations> = {
  EN: {
    nav: {
      tours: "Tours",
      destinations: "Destinations",
      about: "About Us",
      reviews: "Reviews",
      faq: "FAQ",
      evisa: "e-Visa",
      fastBadge: "Fast 3h",
      transfer: "Transfer",
      saved: "Saved",
      signIn: "Sign In",
      adminPortal: "Admin Portal",
      logout: "Log Out",
      language: "Language",
      selectLanguage: "Select Language",
    },
    hero: {
      badge: "TripAdvisor Travelers' Choice · Baku, Azerbaijan",
      titlePart1: "Discover the Soul of",
      titlePart2: "Azerbaijan",
      subtitle:
        "Boutique private & small-group excursions guided by certified local storytellers. From the historic cobblestones of Baku to the majestic peaks of the Great Caucasus.",
      ctaBook: "Book an Experience",
      ctaBrowse: "Browse Itineraries",
      statHappy: "Happy Travelers",
      statTours: "Curated Tours",
      statGuides: "Local Experts",
      statRating: "TripAdvisor Rating",
    },
    search: {
      placeholder: "Search tours by title, region or keyword...",
      filterAll: "All Experiences",
      filterCity: "City Walks",
      filterDayTrip: "Day Trips",
      filterOvernight: "Overnight Escapes",
      filterAdventure: "Adventure & Nature",
      durationLabel: "Duration",
      durationAll: "Any Duration",
      durationHalf: "Half day (1–4h)",
      durationFull: "Full day (5–8h)",
      durationMulti: "Multi-day",
      showing: "Showing",
      toursCount: "handcrafted tours",
      noToursFound: "No tours match your criteria.",
      resetFilters: "Reset filters",
    },
    tours: {
      badge: "Handcrafted Experiences",
      title: "Popular Guided Tours",
      subtitle: "Each itinerary is meticulously crafted for cultural depth, comfort, and memorable local hospitality.",
      duration: "Duration",
      groupSize: "Small Group",
      fromPrice: "from",
      viewDetails: "View Itinerary",
      bookNow: "Book via WhatsApp",
      savedToastAdd: "Saved to your favorite tours!",
      savedToastRemove: "Removed from saved tours",
    },
    whyUs: {
      badge: "The AddmeTour Standard",
      title: "Why Travelers Choose Us",
      subtitle: "We believe true travel is measured in authentic human connections, not just checkboxes on a map.",
      feature1Title: "Certified Local Storytellers",
      feature1Desc: "Born and raised in Azerbaijan, our guides speak your language and know every story behind every stone.",
      feature2Title: "Zero Hidden Fees",
      feature2Desc: "All entry tickets, comfortable transport, and agreed inclusions are crystal-clear upfront.",
      feature3Title: "Guaranteed Departures",
      feature3Desc: "Once confirmed, your private tour runs on schedule with VIP flight and weather monitoring.",
      feature4Title: "24/7 Concierge Support",
      feature4Desc: "Direct assistance via WhatsApp before, during, and after your trip for effortless peace of mind.",
    },
    destinations: {
      badge: "Regions of Wonder",
      title: "Explore Azerbaijan",
      subtitle: "Ancient Silk Road caravanserai, bubbling mud volcanoes, and snow-crowned mountain peaks.",
      bakuName: "Baku & Old City",
      bakuDesc: "UNESCO Icherisheher fortress, Flame Towers, and Caspian seaside boulevard.",
      gobustanName: "Gobustan & Mud Volcanoes",
      gobustanDesc: "Ancient 40,000-year-old petroglyphs and over half the world's mud volcanoes.",
      caucasusName: "Great Caucasus (Quba & Shahdag)",
      caucasusDesc: "Alpine meadows, ancient mountain villages, and dramatic gorges.",
      shekiName: "Sheki & Silk Road",
      shekiDesc: "The stained-glass Khan's Palace, historic caravanserai, and mountain halva.",
      absheronName: "Absheron & Fire Temples",
      absheronDesc: "Ateshgah Zoroastrian Fire Temple and the eternal burning hillside of Yanar Dag.",
      viewTours: "View Regional Tours",
    },
    reviews: {
      badge: "Traveler Endorsements",
      title: "What Our Guests Say",
      subtitle: "Over 500+ five-star reviews across TripAdvisor, Google, and independent travel blogs.",
      ratingText: "4.9 / 5.0 Average Traveler Rating",
    },
    faq: {
      badge: "Help & Clarifications",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before booking your Azerbaijan journey.",
      q1: "How do I book and confirm a tour?",
      a1: "Simply tap any Book Now button or the WhatsApp icon to chat directly with our local Baku team. We confirm tour availability, pickup time, and language preference within the hour.",
      q2: "Can tours be customized for families or dietary needs?",
      a2: "Absolutely. All our private tours can be tailored for kids, seniors, mobility preferences, and dietary requirements including Halal, Vegetarian, and Vegan.",
      q3: "What happens if the weather is bad?",
      a3: "For mountain tours (Shahdag, Khinaliq), we constantly monitor regional forecasts. If severe weather occurs, we offer a free reschedule or full refund.",
      q4: "Do you offer airport transfers?",
      a4: "Yes! We operate 24/7 airport transfer service across Heydar Aliyev (GYD), Ganja (GJA), and Nakhchivan (NAJ) airports with Sedan, SUV, and Minivan options.",
      q5: "How fast can you issue an official Azerbaijan e-Visa?",
      a5: "Our certified e-Visa team handles expedited government filing within 3 hours, as well as standard 3-business-day processing.",
    },
    footer: {
      desc: "Boutique private tours, verified airport transfers, and 3-hour expedited e-Visas across Azerbaijan.",
      quickLinks: "Quick Navigation",
      contact: "Contact Operations",
      rights: "All rights reserved. AddmeTour Travel Services LLC.",
      supportAvailable: "24/7 Operations Support via WhatsApp & Phone",
    },
    floating: {
      evisa: "e-Visa",
      evisaSpeed: "Fast 3h",
      transfer: "Transfer",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "Direct Booking",
      subtitle: "Reserve your private guide and departure date. Pay securely online or upon arrival in Baku.",
      dateLabel: "Select Tour Date *",
      guestsLabel: "Number of Guests (Pax)",
      guest: "Guest",
      guests: "Guests",
      customGroup: "9+ (Custom Group)",
      nameLabel: "Lead Traveler Name *",
      namePlaceholder: "e.g. Sarah Jenkins",
      phoneLabel: "WhatsApp or Phone *",
      phonePlaceholder: "e.g. +44 7123 456789",
      ratePerGroup: "Rate per group:",
      approxLocal: "Approx. local rate:",
      submitBtn: "Confirm Tour Reservation →",
      submittingBtn: "Submitting Reservation...",
      confirmedTitle: "Reservation Confirmed!",
      referenceLabel: "Booking Reference:",
      thankYouPart1: "Thank you,",
      thankYouPart2: "Our local Baku tour concierge has received your booking for",
      thankYouPart3: "We will confirm your pickup schedule and guide details via WhatsApp shortly.",
      doneBtn: "Done",
      reserveDateBtn: "Reserve Date",
      fillAllFields: "Please fill in all fields",
      reservationSuccess: "Tour reservation submitted successfully!",
      networkError: "Error connecting to server. Please try again or book via WhatsApp.",
    },
  },

  AZ: {
    nav: {
      tours: "Turlar",
      destinations: "İstiqamətlər",
      about: "Haqqımızda",
      reviews: "Rəylər",
      faq: "Sual-Cavab",
      evisa: "e-Viza",
      fastBadge: "Sürətli 3s",
      transfer: "Transfer",
      saved: "Saxlananlar",
      signIn: "Daxil ol",
      adminPortal: "Admin Panel",
      logout: "Çıxış",
      language: "Dil",
      selectLanguage: "Dili seçin",
    },
    hero: {
      badge: "TripAdvisor Seçimi · Bakı, Azərbaycan",
      titlePart1: "Gözəl Azərbaycanı",
      titlePart2: "Kəşf Edin",
      subtitle:
        "Peşəkar yerli bələdçilərlə fərdi və qrup ekskursiyaları. Bakının qədim küçələrindən Böyük Qafqazın zirvələrinə qədər unudulmaz səyahət.",
      ctaBook: "Tura Başla",
      ctaBrowse: "Marşrutlara Bax",
      statHappy: "Məmnun Səyahətçi",
      statTours: "Özəl Tur",
      statGuides: "Yerli Bələdçi",
      statRating: "TripAdvisor Reytinqi",
    },
    search: {
      placeholder: "Turları ad, bölgə və ya açar sözlə axtarın...",
      filterAll: "Bütün Turlar",
      filterCity: "Şəhər Gəzintisi",
      filterDayTrip: "Birgünlük",
      filterOvernight: "Gecələmə ilə",
      filterAdventure: "Təbiət və Macəra",
      durationLabel: "Müddət",
      durationAll: "İstənilən müddət",
      durationHalf: "Yarım gün (1–4s)",
      durationFull: "Tam gün (5–8s)",
      durationMulti: "Çoxgünlük",
      showing: "Göstərilir",
      toursCount: "özəl tur",
      noToursFound: "Axtarışa uyğun tur tapılmadı.",
      resetFilters: "Filtrləri sıfırla",
    },
    tours: {
      badge: "Seçilmiş Turlar",
      title: "Məşhur Bələdçili Turlar",
      subtitle: "Hər bir marşrut zəngin mədəniyyət, rahat nəqliyyat və səmimi qonaqpərvərliklə təşkil olunub.",
      duration: "Müddət",
      groupSize: "Kiçik Qrup",
      fromPrice: "başlayan qiymət",
      viewDetails: "Marşruta Bax",
      bookNow: "WhatsApp ilə Sifariş",
      savedToastAdd: "Seçilmiş turlara əlavə edildi!",
      savedToastRemove: "Seçilmişlərdən silindi",
    },
    whyUs: {
      badge: "AddmeTour Üstünlükləri",
      title: "Niyə Bizi Seçirlər?",
      subtitle: "Biz səyahəti sadəcə xəritədə nöqtələr deyil, unudulmaz xatirələr və səmimi münasibət hesab edirik.",
      feature1Title: "Sertifikatlı Yerli Bələdçilər",
      feature1Desc: "Azərbaycanın tarixini və mədəniyyətini dərindən bilən peşəkar bələdçilər.",
      feature2Title: "Şəffaf Qiymət Siyasəti",
      feature2Desc: "Bütün giriş biletləri və nəqliyyat əvvəlcədən dəqiq bildirilir, heç bir gizli xərc yoxdur.",
      feature3Title: "Zəmanətli Səfərlər",
      feature3Desc: "Təsdiqlənmiş turlar hava və reys nəzarəti ilə vaxtında və etibarlı həyata keçirilir.",
      feature4Title: "24/7 Dəstək Xidməti",
      feature4Desc: "Səfərdən əvvəl, səfər zamanı və sonra WhatsApp ilə operativ xidmət.",
    },
    destinations: {
      badge: "Azərbaycan Bölgələri",
      title: "İstiqamətlər",
      subtitle: "Qədim İpək Yolu karvansaraları, palçıq vulkanları və qarlı dağ zirvələri.",
      bakuName: "Bakı və İçərişəhər",
      bakuDesc: "YUNESKO İrsinə daxil olan İçərişəhər, Alov Qüllələri və Dənizkənarı Bulvar.",
      gobustanName: "Qobustan və Palçıq Vulkanları",
      gobustanDesc: "40,000 illik qayaüstü rəsmlər və dünyanın ən aktiv palçıq vulkanları.",
      caucasusName: "Böyük Qafqaz (Quba və Şahdağ)",
      caucasusDesc: "Alp çəmənlikləri, qədim dağ kəndləri və möhtəşəm kanyonlar.",
      shekiName: "Şəki və İpək Yolu",
      shekiDesc: "Şəki Xan Sarayı, şəbəkə sənəti, tarixi karvansaralar və məşhur Şəki halvası.",
      absheronName: "Abşeron və Od Məbədləri",
      absheronDesc: "Atəşgah Zərdüştilik məbədi və əbədi yanan Yanardağ abidəsi.",
      viewTours: "Bölgə Turlarına Bax",
    },
    reviews: {
      badge: "Müştəri Rəyləri",
      title: "Qonaqlarımızın Fikirləri",
      subtitle: "TripAdvisor və Google platformalarında 500-dən çox 5 ulduzlu müştəri rəyi.",
      ratingText: "4.9 / 5.0 Orta Müştəri Reytinqi",
    },
    faq: {
      badge: "Kömək və Məlumat",
      title: "Tez-tez Verilən Suallar",
      subtitle: "Azərbaycana səfərinizi planlaşdırmaq üçün lazım olan əsas məlumatlar.",
      q1: "Turu necə sifariş və təsdiq edə bilərəm?",
      a1: "İstənilən turda 'Sifariş et' düyməsinə və ya WhatsApp ikonuna toxunaraq birbaşa əlaqə saxlaya bilərsiniz. Komandamız 1 saat ərzində təsdiqləyir.",
      q2: "Turlar ailə və xüsusi tələblərə uyğunlaşdırıla bilərmi?",
      a2: "Bəli, bütün fərdi turlarımız uşaqlar, yaşlılar və qidalanma tələblərinə (Halal, Vegetarian) uyğun fərdiləşdirilir.",
      q3: "Hava şəraiti əlverişsiz olarsa nə baş verir?",
      a3: "Dağ turlarında hava proqnozunu daim izləyirik. Əlverişsiz şəraitdə ödənişsiz tarix dəyişimi və ya tam geri qaytarılma təmin edilir.",
      q4: "Hava limanı transfer xidmətiniz varmı?",
      a4: "Bəli! Heydər Əliyev (GYD), Gəncə (GJA) və Naxçıvan (NAJ) hava limanlarından Sedan, SUV və Minivan ilə 24/7 xidmət göstəririk.",
      q5: "e-Viza nə qədər müddətə təsdiqlənir?",
      a5: "Təcili müraciətlər 3 saat ərzində, standart müraciətlər isə 3 iş günü ərzində rəsmi dövlət portalı ilə təsdiq olunur.",
    },
    footer: {
      desc: "Azərbaycan üzrə butik fərdi turlar, hava limanı transferləri və 3 saatlıq təcili e-Viza xidməti.",
      quickLinks: "Keçidlər",
      contact: "Əlaqə Mərkəzi",
      rights: "Bütün hüquqlar qorunur. AddmeTour MMC.",
      supportAvailable: "WhatsApp və zənglə 24/7 operativ dəstək",
    },
    floating: {
      evisa: "e-Viza",
      evisaSpeed: "3 saata",
      transfer: "Transfer",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "Birbaşa Rezervasiya",
      subtitle: "Fərdi bələdçinizi və turun tarixini bron edin. Onlayn və ya Bakıya çatanda ödəyin.",
      dateLabel: "Tur Tarixini Seçin *",
      guestsLabel: "Qonaq Sayı (Nəfər)",
      guest: "Qonaq",
      guests: "Qonaq",
      customGroup: "9+ (Xüsusi Qrup)",
      nameLabel: "Əsas Səyahətçinin Adı *",
      namePlaceholder: "məs. Murad Əliyev",
      phoneLabel: "WhatsApp və ya Telefon *",
      phonePlaceholder: "məs. +994 50 123 45 67",
      ratePerGroup: "Qrup üçün qiymət:",
      approxLocal: "Təxmini yerli məzənnə:",
      submitBtn: "Tur Rezervasiyasını Təsdiqlə →",
      submittingBtn: "Rezervasiya Göndərilir...",
      confirmedTitle: "Rezervasiya Təsdiqləndi!",
      referenceLabel: "Rezervasiya Nömrəsi:",
      thankYouPart1: "Təşəkkür edirik,",
      thankYouPart2: "Bakı tur menecerimiz aşağıdakı tur üçün müraciətinizi qəbul etdi:",
      thankYouPart3: "Qarşılanma cədvəli və bələdçi detallarını tezliklə WhatsApp vasitəsilə təsdiqləyəcəyik.",
      doneBtn: "Tamam",
      reserveDateBtn: "Tarixi Bron Et",
      fillAllFields: "Zəhmət olmasa bütün xanaları doldurun",
      reservationSuccess: "Tur rezervasiyası uğurla qeydə alındı!",
      networkError: "Serverlə əlaqə xətası. Zəhmət olmasa yenidən cəhd edin və ya WhatsApp ilə əlaqə saxlayın.",
    },
  },

  RU: {
    nav: {
      tours: "Туры",
      destinations: "Направления",
      about: "О нас",
      reviews: "Отзывы",
      faq: "Вопросы",
      evisa: "e-Виза",
      fastBadge: "Срочно 3ч",
      transfer: "Трансфер",
      saved: "Избранное",
      signIn: "Войти",
      adminPortal: "Панель",
      logout: "Выйти",
      language: "Язык",
      selectLanguage: "Выберите язык",
    },
    hero: {
      badge: "Выбор путешественников TripAdvisor · Баку",
      titlePart1: "Откройте для себя",
      titlePart2: "Азербайджан",
      subtitle:
        "Индивидуальные и мини-групповые авторские туры с лицензированными гидами. От старинных улочек Баку до заснеженных вершин Большого Кавказа.",
      ctaBook: "Забронировать тур",
      ctaBrowse: "Смотреть маршруты",
      statHappy: "Довольных туристов",
      statTours: "Авторских туров",
      statGuides: "Местных экспертов",
      statRating: "Рейтинг TripAdvisor",
    },
    search: {
      placeholder: "Поиск туров по названию, региону или теме...",
      filterAll: "Все программы",
      filterCity: "Городские",
      filterDayTrip: "Однодневные",
      filterOvernight: "С ночевкой",
      filterAdventure: "Природа и горы",
      durationLabel: "Длительность",
      durationAll: "Любая длительность",
      durationHalf: "Полдня (1–4ч)",
      durationFull: "Полный день (5–8ч)",
      durationMulti: "Многодневные",
      showing: "Найдено",
      toursCount: "авторских туров",
      noToursFound: "Туров по заданным параметрам не найдено.",
      resetFilters: "Сбросить фильтры",
    },
    tours: {
      badge: "Авторские программы",
      title: "Популярные экскурсии",
      subtitle: "Каждый маршрут продуман до мелочей: глубокая история, комфортабельный транспорт и теплое гостеприимство.",
      duration: "Длительность",
      groupSize: "Мини-группа",
      fromPrice: "от",
      viewDetails: "Маршрут тура",
      bookNow: "Заказ через WhatsApp",
      savedToastAdd: "Добавлено в избранные туры!",
      savedToastRemove: "Удалено из избранного",
    },
    whyUs: {
      badge: "Стандарты AddmeTour",
      title: "Почему выбирают нас",
      subtitle: "Для нас путешествие — это искренние эмоции и душевные встречи, а не формальные галочки на карте.",
      feature1Title: "Лицензированные гиды-историки",
      feature1Desc: "Коренные бакинцы, знающие каждый тайный дворик и говорящие на вашем родном языке.",
      feature2Title: "Прозрачные фиксированные цены",
      feature2Desc: "Все билеты, трансфер и дегустации оговорены заранее — никаких скрытых доплат на месте.",
      feature3Title: "Гарантированный выезд",
      feature3Desc: "Подтвержденный тур состоится точно по расписанию с мониторингом авиарейсов и погоды.",
      feature4Title: "Поддержка 24/7 в WhatsApp",
      feature4Desc: "Всегда на связи до, во время и после вашей поездки для полного спокойствия.",
    },
    destinations: {
      badge: "Регионы Азербайджана",
      title: "Куда поехать",
      subtitle: "Караван-сараи Шелкового пути, грязевые вулканы и альпийские горные деревушки.",
      bakuName: "Баку и Ичери-шехер",
      bakuDesc: "Крепость ЮНЕСКО, Пламенные башни и современная набережная Каспия.",
      gobustanName: "Гобустан и вулканы",
      gobustanDesc: "Наскальные рисунки возрастом 40 000 лет и более половины грязевых вулканов мира.",
      caucasusName: "Большой Кавказ (Губа и Шахдаг)",
      caucasusDesc: "Альпийские луга, высокогорные аулы и захватывающие каньоны.",
      shekiName: "Шеки и Шелковый путь",
      shekiDesc: "Дворец шекинских ханов, старинные витражи шебеке и легендарная шекинская халва.",
      absheronName: "Апшерон и Огни",
      absheronDesc: "Храм огнепоклонников Атешгях и вечно пылающий холм Янардаг.",
      viewTours: "Смотреть туры по региону",
    },
    reviews: {
      badge: "Отзывы путешественников",
      title: "Что говорят гости",
      subtitle: "Более 500+ восторженных отзывов на TripAdvisor, Google и в соцсетях.",
      ratingText: "4.9 из 5.0 средняя оценка туристов",
    },
    faq: {
      badge: "Вопросы и ответы",
      title: "Часто задаваемые вопросы",
      subtitle: "Вся необходимая информация для идеального отдыха в Азербайджане.",
      q1: "Как забронировать и подтвердить тур?",
      a1: "Нажмите кнопку 'Забронировать' или напишите нам в WhatsApp. Наша команда в Баку согласует все детали в течение часа.",
      q2: "Можно ли адаптировать тур для детей или с диетой?",
      a2: "Конечно. Все индивидуальные туры легко настраиваются под детей, пожилых гостей и диетические предпочтения (Халяль, Вегетарианство).",
      q3: "Что если испортится погода?",
      a3: "Для горных туров мы внимательно следим за прогнозами. В случае непогоды предложим перенос даты без доплат или полный возврат средств.",
      q4: "Предоставляете ли вы трансфер из аэропорта?",
      a4: "Да! Мы организуем круглосуточные трансферы из аэропорта Гейдар Алиев (GYD), Гянджа (GJA) и Нахчыван (NAJ) на Седанах, SUV и Минивэнах.",
      q5: "Как быстро оформляется электронная виза в Азербайджан?",
      a5: "Срочная виза оформляется за 3 часа, стандартная — за 3 рабочих дня через официальную государственную систему.",
    },
    footer: {
      desc: "Авторские туры по Азербайджану, надежные трансферы и срочные e-Визы за 3 часа.",
      quickLinks: "Навигация",
      contact: "Служба заботы",
      rights: "Все права защищены. AddmeTour Travel LLC.",
      supportAvailable: "Круглосуточная поддержка в WhatsApp и по телефону",
    },
    floating: {
      evisa: "e-Виза",
      evisaSpeed: "Срочно 3ч",
      transfer: "Трансфер",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "Прямое бронирование",
      subtitle: "Забронируйте индивидуального гида и дату тура. Оплата онлайн или при встрече в Баку.",
      dateLabel: "Выберите дату тура *",
      guestsLabel: "Количество гостей",
      guest: "Гость",
      guests: "Гостей",
      customGroup: "9+ (Индивидуальная группа)",
      nameLabel: "Имя основного путешественника *",
      namePlaceholder: "например, Алексей Смирнов",
      phoneLabel: "WhatsApp или телефон *",
      phonePlaceholder: "например, +7 912 345 67 89",
      ratePerGroup: "Стоимость за группу:",
      approxLocal: "Примерно в местной валюте:",
      submitBtn: "Подтвердить бронирование тура →",
      submittingBtn: "Отправка заявки...",
      confirmedTitle: "Бронирование подтверждено!",
      referenceLabel: "Номер бронирования:",
      thankYouPart1: "Спасибо,",
      thankYouPart2: "Наш консьерж в Баку получил вашу заявку на тур",
      thankYouPart3: "Мы свяжемся с вами в WhatsApp в ближайшее время для подтверждения трансфера и деталей гида.",
      doneBtn: "Готово",
      reserveDateBtn: "Забронировать дату",
      fillAllFields: "Пожалуйста, заполните все поля",
      reservationSuccess: "Бронирование тура успешно отправлено!",
      networkError: "Ошибка подключения к серверу. Попробуйте еще раз или напишите нам в WhatsApp.",
    },
  },

  FR: {
    nav: {
      tours: "Circuits",
      destinations: "Destinations",
      about: "À propos",
      reviews: "Avis",
      faq: "FAQ",
      evisa: "e-Visa",
      fastBadge: "Express 3h",
      transfer: "Transfert",
      saved: "Favoris",
      signIn: "Connexion",
      adminPortal: "Portail Admin",
      logout: "Déconnexion",
      language: "Langue",
      selectLanguage: "Choisir la langue",
    },
    hero: {
      badge: "Choix des voyageurs TripAdvisor · Bakou, Azerbaïdjan",
      titlePart1: "Découvrez l'Âme de",
      titlePart2: "l'Azerbaïdjan",
      subtitle:
        "Excursions privées et en petits groupes guidées par des conteurs locaux certifiés. Des ruelles pavées de Bakou aux sommets majestueux du Grand Caucase.",
      ctaBook: "Réserver une Expérience",
      ctaBrowse: "Voir les Itinéraires",
      statHappy: "Voyageurs Heureux",
      statTours: "Circuits Uniques",
      statGuides: "Experts Locaux",
      statRating: "Note TripAdvisor",
    },
    search: {
      placeholder: "Rechercher par titre, région ou mot-clé...",
      filterAll: "Toutes les expériences",
      filterCity: "Visites de ville",
      filterDayTrip: "Excursions d'un jour",
      filterOvernight: "Avec nuitée",
      filterAdventure: "Nature & Aventure",
      durationLabel: "Durée",
      durationAll: "Toutes durées",
      durationHalf: "Demi-journée (1–4h)",
      durationFull: "Journée entière (5–8h)",
      durationMulti: "Plusieurs jours",
      showing: "Affichage de",
      toursCount: "circuits sur mesure",
      noToursFound: "Aucun circuit ne correspond à vos critères.",
      resetFilters: "Réinitialiser les filtres",
    },
    tours: {
      badge: "Expériences Authentiques",
      title: "Circuits Guidés Populaires",
      subtitle: "Chaque itinéraire est soigneusement conçu pour allier richesse culturelle, confort et hospitalité locale.",
      duration: "Durée",
      groupSize: "Petit Groupe",
      fromPrice: "à partir de",
      viewDetails: "Voir l'Itinéraire",
      bookNow: "Réserver via WhatsApp",
      savedToastAdd: "Ajouté à vos circuits favoris !",
      savedToastRemove: "Retiré des favoris",
    },
    whyUs: {
      badge: "L'Excellence AddmeTour",
      title: "Pourquoi Voyager Avec Nous",
      subtitle: "Nous croyons que le vrai voyage repose sur des connexions humaines authentiques, pas sur de simples cases cochées.",
      feature1Title: "Guides Locaux Certifiés",
      feature1Desc: "Nés et élevés en Azerbaïdjan, nos guides parlent votre langue et connaissent chaque secret historique.",
      feature2Title: "Zéro Frais Cachés",
      feature2Desc: "Tous les billets d'entrée, transports confortables et inclusions convenues sont transparents dès le départ.",
      feature3Title: "Départs 100% Garantis",
      feature3Desc: "Une fois confirmé, votre circuit privé est assuré avec suivi météo et des vols en temps réel.",
      feature4Title: "Assistance Concierge 24/7",
      feature4Desc: "Une aide directe via WhatsApp avant, pendant et après votre voyage pour une sérénité absolue.",
    },
    destinations: {
      badge: "Régions Féeriques",
      title: "Explorez l'Azerbaïdjan",
      subtitle: "Caravansérails de la Route de la Soie, volcans de boue bouillonnants et pics enneigés.",
      bakuName: "Bakou & Vieille Ville",
      bakuDesc: "Forteresse Icherisheher classée UNESCO, Flame Towers et promenade en bordure de mer Caspienne.",
      gobustanName: "Gobustan & Volcans de Boue",
      gobustanDesc: "Pétroglyphes vieux de 40 000 ans et plus de la moitié des volcans de boue de la planète.",
      caucasusName: "Grand Caucase (Quba & Shahdag)",
      caucasusDesc: "Pâturages alpins, villages perchés millénaires et gorges spectaculaires.",
      shekiName: "Shéki & Route de la Soie",
      shekiDesc: "Le Palais des Khans aux vitraux Shebeke, caravansérail historique et fameux halva de montagne.",
      absheronName: "Abchéron & Temples du Feu",
      absheronDesc: "Temple zoroastrien d'Ateshgah et flammes éternelles de Yanar Dag.",
      viewTours: "Voir les Circuits Régionaux",
    },
    reviews: {
      badge: "Témoignages Voyageurs",
      title: "L'Avis de Nos Visiteurs",
      subtitle: "Plus de 500 avis 5 étoiles sur TripAdvisor, Google et blogs de voyage indépendants.",
      ratingText: "4.9 / 5.0 Note Moyenne des Voyageurs",
    },
    faq: {
      badge: "Aide & Informations",
      title: "Questions Fréquemment Posées",
      subtitle: "Tout ce que vous devez savoir pour préparer votre voyage en Azerbaïdjan.",
      q1: "Comment réserver et confirmer un circuit ?",
      a1: "Appuyez sur n'importe quel bouton 'Réserver' ou l'icône WhatsApp pour échanger avec notre équipe à Bakou. Nous confirmons sous une heure.",
      q2: "Les circuits sont-ils adaptés aux familles et régimes alimentaires ?",
      a2: "Absolument. Nos circuits privés s'adaptent aux enfants, seniors, et régimes spécifiques (Halal, Végétarien, Vegan).",
      q3: "Que se passe-t-il en cas de mauvaise météo ?",
      a3: "Pour les montagnes, nous surveillons la météo de près. En cas d'intempéries, nous proposons un report gratuit ou un remboursement intégral.",
      q4: "Proposez-vous des transferts aéroport ?",
      a4: "Oui ! Nous opérons 24/7 vers les aéroports Heydar Aliyev (GYD), Gandja (GJA) et Nakhitchevan (NAJ) en Berline, SUV et Minivan.",
      q5: "En combien de temps l'e-Visa azerbaïdjanais est-il délivré ?",
      a5: "Notre service agréé délivre le visa officiel en 3 heures en urgence, ou en 3 jours ouvrés selon la procédure standard.",
    },
    footer: {
      desc: "Circuits privés sur mesure, transferts aéroport fiables et e-Visas officiels express en 3h en Azerbaïdjan.",
      quickLinks: "Navigation Rapide",
      contact: "Contact Opérations",
      rights: "Tous droits réservés. AddmeTour Voyages SARL.",
      supportAvailable: "Assistance opérationnelle 24/7 via WhatsApp & Téléphone",
    },
    floating: {
      evisa: "e-Visa",
      evisaSpeed: "Rapide 3h",
      transfer: "Transfert",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "Réservation Directe",
      subtitle: "Réservez votre guide privé et la date de départ. Paiement en ligne ou à l'arrivée à Bakou.",
      dateLabel: "Date de la visite *",
      guestsLabel: "Nombre de personnes",
      guest: "Personne",
      guests: "Personnes",
      customGroup: "9+ (Groupe sur mesure)",
      nameLabel: "Nom du voyageur principal *",
      namePlaceholder: "ex. Thomas Laurent",
      phoneLabel: "WhatsApp ou Téléphone *",
      phonePlaceholder: "ex. +33 6 12 34 56 78",
      ratePerGroup: "Tarif par groupe :",
      approxLocal: "Tarif local approximatif :",
      submitBtn: "Confirmer la réservation du tour →",
      submittingBtn: "Envoi de la demande...",
      confirmedTitle: "Réservation confirmée !",
      referenceLabel: "Référence de réservation :",
      thankYouPart1: "Merci,",
      thankYouPart2: "Notre concierge local à Bakou a bien reçu votre demande pour",
      thankYouPart3: "Nous confirmerons rapidement l'heure de prise en charge et le contact de votre guide via WhatsApp.",
      doneBtn: "Terminé",
      reserveDateBtn: "Réserver la date",
      fillAllFields: "Veuillez renseigner tous les champs obligatoires",
      reservationSuccess: "Réservation enregistrée avec succès !",
      networkError: "Erreur de connexion au serveur. Réessayez ou contactez-nous par WhatsApp.",
    },
  },

  AR: {
    nav: {
      tours: "الجولات السياحية",
      destinations: "الوجهات",
      about: "من نحن",
      reviews: "التقييمات",
      faq: "الأسئلة الشائعة",
      evisa: "التأشيرة الإلكترونية",
      fastBadge: "سريعة 3 ساعات",
      transfer: "التوصيل والنقل",
      saved: "المفضلة",
      signIn: "تسجيل الدخول",
      adminPortal: "لوحة الإدارة",
      logout: "تسجيل الخروج",
      language: "اللغة",
      selectLanguage: "اختر اللغة",
    },
    hero: {
      badge: "اختيار المسافرين على تريب أدفايزر · باكو، أذربيجان",
      titlePart1: "اكتشف سحر وجمال",
      titlePart2: "أذربيجان",
      subtitle:
        "رحلات سياحية خاصة وفاخرة مع مرشدين محليين معتمدين وناطقين بالعربية. من أزقة باكو التاريخية إلى قمم جبال القوقاز الشاهقة.",
      ctaBook: "احجز رحلتك الآن",
      ctaBrowse: "استعرض البرامج",
      statHappy: "مسافر سعيد",
      statTours: "برنامج سياحي",
      statGuides: "مرشد خبير",
      statRating: "تقييم تريب أدفايزر",
    },
    search: {
      placeholder: "ابحث عن الرحلات بالاسم أو المنطقة أو النشاط...",
      filterAll: "جميع التجارب",
      filterCity: "جولات المدينة",
      filterDayTrip: "رحلات يومية",
      filterOvernight: "مع مبيت",
      filterAdventure: "طبيعة ومغامرة",
      durationLabel: "المدة",
      durationAll: "أي مدة",
      durationHalf: "نصف يوم (1–4 ساعات)",
      durationFull: "يوم كامل (5–8 ساعات)",
      durationMulti: "عدة أيام",
      showing: "عرض",
      toursCount: "جولة متميزة",
      noToursFound: "لم يتم العثور على جولات تطابق بحثك.",
      resetFilters: "إعادة ضبط الفلاتر",
    },
    tours: {
      badge: "تجارب استثنائية",
      title: "أشهر الجولات السياحية",
      subtitle: "تم تصميم كل جولة بعناية لتجمع بين التاريخ العريق، الراحة التامة، وكرم الضيافة الأذربيجاني الأصيل.",
      duration: "المدة",
      groupSize: "مجموعة خاصة",
      fromPrice: "ابتداءً من",
      viewDetails: "تفاصيل الرحلة",
      bookNow: "حجز عبر واتساب",
      savedToastAdd: "تمت الإضافة إلى رحلاتك المفضلة!",
      savedToastRemove: "تم الحذف من المفضلة",
    },
    whyUs: {
      badge: "معايير AddmeTour",
      title: "لماذا يختارنا المسافرون؟",
      subtitle: "نحن نؤمن بأن السفر الحقيقي هو تجارب إنسانية وذكريات لا تُنسى، وليس مجرد نقاط على الخريطة.",
      feature1Title: "مرشدون محليون معتمدون",
      feature1Desc: "خبرة واسعة في تاريخ أذربيجان، مع إتقان كامل للغة العربية واحتياجات العائلات الخليجية والعربية.",
      feature2Title: "أسعار واضحة وبدون تكاليف مخفية",
      feature2Desc: "تشمل تذاكر الدخول والمواصلات الفاخرة المريحة وكل ما يتم الاتفاق عليه مسبقاً بشفافية تامة.",
      feature3Title: "مواعيد وجولات مضمونة",
      feature3Desc: "تنطلق جولتك الخاصة في موعدها مع متابعة لحظية لرحلات الطيران وحالة الطقس.",
      feature4Title: "خدمة عملاء على مدار الساعة",
      feature4Desc: "دعم متواصل ومباشر عبر واتساب قبل الرحلة وأثناءها وبعد العودة لضمان راحتكم التامة.",
    },
    destinations: {
      badge: "مناطق ساحرة",
      title: "استكشف أذربيجان",
      subtitle: "قوافل طريق الحرير التاريخية، براكين الطين النادرة، والقمم الجبلية الخضراء الساحرة.",
      bakuName: "باكو والمدينة القديمة",
      bakuDesc: "قلعة إيشيري شهر المدرجة في اليونسكو، أبراج الشعلة، وكورنيش بحر قزوين الشهير.",
      gobustanName: "قوبوستان وبراكين الطين",
      gobustanDesc: "نقوش صخرية يعود تاريخها إلى 40,000 عام وأكثر من نصف براكين الطين في العالم.",
      caucasusName: "جبال القوقاز (قوبا وشاهداغ)",
      caucasusDesc: "مروج خضراء بديعة، قرى جبلية أثرية، ومنتجعات شتوية وصيفية عالمية.",
      shekiName: "شاكي وطريق الحرير",
      shekiDesc: "قصر خانات شاكي ذو الزجاج الملون، الخانات التاريخية، وحلوى شاكي الشهية.",
      absheronName: "شبه جزيرة أبشيران ومعابد النار",
      absheronDesc: "معبد النار الأثري أتيشغاه وجبل النار المشتعل دائماً يانار داغ.",
      viewTours: "عرض جولات المنطقة",
    },
    reviews: {
      badge: "آراء عملائنا",
      title: "ماذا يقول ضيوفنا؟",
      subtitle: "أكثر من 500 تقييم ممتاز 5 نجوم على منصات TripAdvisor وجوجل من مسافرين عرب ودوليين.",
      ratingText: "4.9 من 5.0 متوسط تقييم المسافرين",
    },
    faq: {
      badge: "المساعدة والإجابات",
      title: "الأسئلة الأكثر تداولاً",
      subtitle: "كل ما تود معرفته لتنظيم عطلتك المثالية في أذربيجان.",
      q1: "كيف أقوم بحجز وتأكيد الجولة؟",
      a1: "ما عليك سوى الضغط على زر الحجز أو أيقونة واتساب للتواصل المباشر مع فريقنا في باكو، وسنؤكد الحجز والتفاصيل خلال ساعة واحدة.",
      q2: "هل تناسب الجولات العائلات والخيارات الغذائية الخاصة؟",
      a2: "بكل تأكيد. جميع جولاتنا الخاصة ملائمة جداً للعائلات والأطفال، مع مراعاة الطعام الحلال والخيارات النباتية.",
      q3: "ماذا يحدث في حال سوء الأحوال الجوية؟",
      a3: "نتابع توقعات الطقس في المناطق الجبلية باستمرار. وفي حال تعذر الرحلة نوفر تعديلاً مجانياً للموعد أو استرداداً كاملاً للمبلغ.",
      q4: "هل توفرون خدمة التوصيل من وإلى المطار؟",
      a4: "نعم! نوفر خدمة نقل المطار على مدار 24 ساعة لجميع مطارات أذربيجان بسيارات سيدان، دفع رباعي عائلي، وميني فان VIP.",
      q5: "كم تستغرق معالجة التأشيرة الإلكترونية لأذربيجان؟",
      a5: "تستغرق التأشيرة العاجلة 3 ساعات فقط عبر النظام الحكومي الرسمي، والتأشيرة العادية 3 أيام عمل.",
    },
    footer: {
      desc: "برامج سياحية خاصة وراقية، خدمات نقل المطار المعتمدة، وتأشيرة أذربيجان السريعة خلال 3 ساعات.",
      quickLinks: "روابط سريعة",
      contact: "مركز العمليات",
      rights: "جميع الحقوق محفوظة. شركة AddmeTour للسياحة والخدمات.",
      supportAvailable: "دعم فوري متواصل 24/7 عبر واتساب والمكالمات",
    },
    floating: {
      evisa: "تأشيرة أذربيجان",
      evisaSpeed: "سريعة 3 ساعات",
      transfer: "نقل المطار",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "حجز مباشر",
      subtitle: "احجز مرشدك السياحي الخاص وموعد الجولة. ادفع بأمان عبر الإنترنت أو عند وصولك إلى باكو.",
      dateLabel: "اختر تاريخ الجولة *",
      guestsLabel: "عدد الضيوف (الأفراد)",
      guest: "ضيف",
      guests: "ضيوف",
      customGroup: "9+ (مجموعة مخصصة)",
      nameLabel: "اسم المسافر الرئيسي *",
      namePlaceholder: "مثال: أحمد عبد الله",
      phoneLabel: "واتساب أو رقم الهاتف *",
      phonePlaceholder: "مثال: +966 50 123 4567",
      ratePerGroup: "السعر الإجمالي للمجموعة:",
      approxLocal: "السعر التقريبي بالعملة المحلية:",
      submitBtn: "تأكيد حجز الجولة السياحية ←",
      submittingBtn: "جاري إرسال الحجز...",
      confirmedTitle: "تم تأكيد طلب الحجز!",
      referenceLabel: "رقم الحجز المرجعي:",
      thankYouPart1: "شكراً لك،",
      thankYouPart2: "تلقى فريق تنظيم الرحلات لدينا في باكو طلب حجز جولة",
      thankYouPart3: "سنقوم بتأكيد موعد الاستقبال وتفاصيل المرشد السياحي عبر واتساب في أقرب وقت.",
      doneBtn: "تم",
      reserveDateBtn: "حجز الموعد",
      fillAllFields: "يرجى تعبئة جميع الحقول المطلوبة",
      reservationSuccess: "تم إرسال حجز الجولة بنجاح!",
      networkError: "خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.",
    },
  },

  DE: {
    nav: {
      tours: "Touren",
      destinations: "Reiseziele",
      about: "Über uns",
      reviews: "Bewertungen",
      faq: "FAQ",
      evisa: "e-Visum",
      fastBadge: "Express 3h",
      transfer: "Transfer",
      saved: "Gemerkt",
      signIn: "Anmelden",
      adminPortal: "Admin-Portal",
      logout: "Abmelden",
      language: "Sprache",
      selectLanguage: "Sprache wählen",
    },
    hero: {
      badge: "TripAdvisor Travelers' Choice · Baku, Aserbaidschan",
      titlePart1: "Entdecken Sie die Seele von",
      titlePart2: "Aserbaidschan",
      subtitle:
        "Boutique-Privat- und Kleingruppentouren mit zertifizierten lokalen Guides. Von den kopfsteingepflasterten Gassen Bakus bis zu den Gipfeln des Großen Kaukasus.",
      ctaBook: "Erlebnis buchen",
      ctaBrowse: "Routen ansehen",
      statHappy: "Zufriedene Gäste",
      statTours: "Kuratierte Touren",
      statGuides: "Lokale Experten",
      statRating: "TripAdvisor-Note",
    },
    search: {
      placeholder: "Touren nach Titel, Region oder Thema suchen...",
      filterAll: "Alle Erlebnisse",
      filterCity: "Stadtrundgänge",
      filterDayTrip: "Tagesausflüge",
      filterOvernight: "Mit Übernachtung",
      filterAdventure: "Natur & Abenteuer",
      durationLabel: "Dauer",
      durationAll: "Beliebige Dauer",
      durationHalf: "Halbtags (1–4h)",
      durationFull: "Ganztags (5–8h)",
      durationMulti: "Mehrtägig",
      showing: "Angezeigt werden",
      toursCount: "handverlesene Touren",
      noToursFound: "Keine Touren für Ihre Kriterien gefunden.",
      resetFilters: "Filter zurücksetzen",
    },
    tours: {
      badge: "Authentische Erlebnisse",
      title: "Beliebte geführte Touren",
      subtitle: "Jede Route ist sorgfältig für maximale Kulturtiefe, Komfort und herzliche Gastfreundschaft gestaltet.",
      duration: "Dauer",
      groupSize: "Kleingruppe",
      fromPrice: "ab",
      viewDetails: "Route ansehen",
      bookNow: "Über WhatsApp buchen",
      savedToastAdd: "Zu Ihren Favoriten hinzugefügt!",
      savedToastRemove: "Aus Favoriten entfernt",
    },
    whyUs: {
      badge: "Der AddmeTour-Standard",
      title: "Warum Reisende uns wählen",
      subtitle: "Wir glauben, dass echtes Reisen durch authentische Begegnungen entsteht, nicht durch bloßes Abhaken von Sehenswürdigkeiten.",
      feature1Title: "Zertifizierte lokale Guides",
      feature1Desc: "In Aserbaidschan aufgewachsen, sprechen unsere Guides Ihre Sprache und kennen jede verborgene Geschichte.",
      feature2Title: "Keine versteckten Kosten",
      feature2Desc: "Alle Eintrittskarten, komfortabler Transport und vereinbarte Leistungen sind von Anfang an transparent.",
      feature3Title: "Garantierte Durchführung",
      feature3Desc: "Einmal bestätigt, findet Ihre private Tour garantiert statt – mit Flug- und Wettermonitoring.",
      feature4Title: "24/7 Concierge-Service",
      feature4Desc: "Direkte Unterstützung über WhatsApp vor, während und nach Ihrer Reise für ein rundum sicheres Gefühl.",
    },
    destinations: {
      badge: "Faszinierende Regionen",
      title: "Aserbaidschan erkunden",
      subtitle: "Karawansereien der Seidenstraße, blubbernde Schlammvulkane und schneebedeckte Kaukasus-Gipfel.",
      bakuName: "Baku & Altstadt",
      bakuDesc: "UNESCO-Festung Icherisheher, Flame Towers und die Uferpromenade am Kaspischen Meer.",
      gobustanName: "Gobustan & Schlammvulkane",
      gobustanDesc: "40.000 Jahre alte Felszeichnungen und mehr als die Hälfte aller Schlammvulkane weltweit.",
      caucasusName: "Großer Kaukasus (Quba & Shahdag)",
      caucasusDesc: "Alpine Bergwiesen, uralte Bergdörfer und atemberaubende Schluchten.",
      shekiName: "Sheki & Seidenstraße",
      shekiDesc: "Der Palast der Khane von Sheki mit Shebeke-Buntglasfenstern und legendärer Sheki-Halva.",
      absheronName: "Absheron & Feuertempel",
      absheronDesc: "Der zoroastrische Feuertempel Ateshgah und die ewig brennenden Hänge von Yanar Dag.",
      viewTours: "Regionale Touren ansehen",
    },
    reviews: {
      badge: "Gästestimmen",
      title: "Was unsere Reisenden sagen",
      subtitle: "Über 500 5-Sterne-Bewertungen auf TripAdvisor, Google und unabhängigen Reiseportalen.",
      ratingText: "4.9 von 5.0 Durchschnittliche Bewertung",
    },
    faq: {
      badge: "Hilfe & Information",
      title: "Häufig gestellte Fragen",
      subtitle: "Alles Wissenswerte für die Vorbereitung Ihrer Traumreise nach Aserbaidschan.",
      q1: "Wie buche und bestätige ich eine Tour?",
      a1: "Klicken Sie einfach auf 'Buchen' oder das WhatsApp-Symbol, um direkt mit unserem Team in Baku zu sprechen. Wir bestätigen innerhalb einer Stunde.",
      q2: "Können Touren für Familien oder spezielle Diäten angepasst werden?",
      a2: "Selbstverständlich. Alle privaten Touren lassen sich flexibel auf Kinder, Senioren und Ernährungsweisen (Halal, Vegetarisch, Vegan) anpassen.",
      q3: "Was geschieht bei schlechtem Wetter?",
      a3: "Für Bergtouren überwachen wir die Wetterlage fortlaufend. Bei Unwetter bieten wir eine kostenlose Umbuchung oder vollständige Rückerstattung an.",
      q4: "Bieten Sie Flughafentransfers an?",
      a4: "Ja! Wir bieten 24/7 Flughafentransfers an den Flughäfen Heydar Aliyev (GYD), Ganja (GJA) und Nakhchivan (NAJ) mit Limousinen, SUVs und Minivans an.",
      q5: "Wie schnell wird das offizielle e-Visum ausgestellt?",
      a5: "Unser lizenziertes Team wickelt Express-Visumanträge innerhalb von 3 Stunden und Standardanträge innerhalb von 3 Werktagen ab.",
    },
    footer: {
      desc: "Individuelle Boutique-Touren, zuverlässige Flughafentransfers und 3-Stunden-Express-Visas in Aserbaidschan.",
      quickLinks: "Navigation",
      contact: "Betriebszentrale",
      rights: "Alle Rechte vorbehalten. AddmeTour Travel Services LLC.",
      supportAvailable: "24/7 Kundenservice via WhatsApp & Telefon",
    },
    floating: {
      evisa: "e-Visum",
      evisaSpeed: "Express 3h",
      transfer: "Transfer",
      transferSupport: "24/7",
    },
    bookingModal: {
      badge: "Direktbuchung",
      subtitle: "Sichern Sie sich Ihren privaten Guide und Wunschtermin. Sichere Online-Zahlung oder Barzahlung vor Ort in Baku.",
      dateLabel: "Tour-Datum auswählen *",
      guestsLabel: "Anzahl Personen",
      guest: "Gast",
      guests: "Gäste",
      customGroup: "9+ (Individuelle Gruppe)",
      nameLabel: "Name des Hauptreisenden *",
      namePlaceholder: "z.B. Michael Schmidt",
      phoneLabel: "WhatsApp oder Telefonnummer *",
      phonePlaceholder: "z.B. +49 170 1234567",
      ratePerGroup: "Preis pro Gruppe:",
      approxLocal: "Ungefährer lokaler Preis:",
      submitBtn: "Tour-Reservierung bestätigen →",
      submittingBtn: "Reservierung wird gesendet...",
      confirmedTitle: "Reservierung bestätigt!",
      referenceLabel: "Buchungsreferenz:",
      thankYouPart1: "Vielen Dank,",
      thankYouPart2: "Unser Concierge in Baku hat Ihre Reservierung für folgende Tour erhalten:",
      thankYouPart3: "Wir bestätigen Abholzeit und Kontaktdaten Ihres Guides in Kürze per WhatsApp.",
      doneBtn: "Fertig",
      reserveDateBtn: "Termin sichern",
      fillAllFields: "Bitte füllen Sie alle Pflichtfelder aus",
      reservationSuccess: "Tour-Reservierung erfolgreich übermittelt!",
      networkError: "Verbindungsfehler. Bitte erneut versuchen oder direkt per WhatsApp buchen.",
    },
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode, suppressToast?: boolean) => void;
  t: Translations;
  currentLangInfo: LanguageInfo;
  isRtl: boolean;
  languages: LanguageInfo[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("EN");
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    // Defer to next tick so it never interrupts or collides with render phase
    setTimeout(() => {
      setToastMessage(msg);
      toastTimeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2800);
    }, 0);
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("travel_language") as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = useCallback((lang: LanguageCode, suppressToast = false) => {
    if (!TRANSLATIONS[lang]) return;
    setLanguageState(lang);
    try {
      localStorage.setItem("travel_language", lang);
      document.cookie = `travel_language=${lang}; path=/; max-age=31536000`;
    } catch {}

    if (typeof document !== "undefined") {
      document.documentElement.lang = lang.toLowerCase();
    }

    if (!suppressToast) {
      const langObj = LANGUAGES.find((l) => l.code === lang);
      const label = langObj?.nativeLabel || lang;
      const msg =
        lang === "AZ"
          ? `Dil dəyişdirildi: ${label}`
          : lang === "RU"
          ? `Язык изменен: ${label}`
          : lang === "FR"
          ? `Langue sélectionnée : ${label}`
          : lang === "AR"
          ? `تم تغيير اللغة إلى: ${label}`
          : lang === "DE"
          ? `Sprache geändert: ${label}`
          : `Language set to ${label}`;
      showToast(msg);
    }
  }, [showToast]);

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language, mounted]);

  const defaultLangInfo = LANGUAGES[0]!;
  const currentLangInfo: LanguageInfo = LANGUAGES.find((l) => l.code === language) || defaultLangInfo;
  const baseT = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const navExtra = NAV_EXTRA_TRANSLATIONS[language] || NAV_EXTRA_TRANSLATIONS.EN;
  const transferPage = TRANSFER_PAGE_TRANSLATIONS[language] || TRANSFER_PAGE_TRANSLATIONS.EN;
  const visaPage = VISA_PAGE_TRANSLATIONS[language] || VISA_PAGE_TRANSLATIONS.EN;

  const t: Translations = {
    ...baseT,
    nav: {
      ...baseT.nav,
      ...navExtra,
    },
    transferPage,
    visaPage,
  };

  const isRtl = language === "AR";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLangInfo,
        isRtl,
        languages: LANGUAGES,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Global Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce-in pointer-events-none print:hidden"
        >
          <div className="flex items-center gap-2.5 rounded-full bg-[#0f3460] px-5 py-2.5 text-white shadow-2xl backdrop-blur-md border border-white/20">
            <svg
              className="h-4 w-4 text-[#f59e0b] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "EN" as LanguageCode,
      setLanguage: () => {},
      t: {
        ...TRANSLATIONS.EN,
        nav: {
          ...TRANSLATIONS.EN.nav,
          ...NAV_EXTRA_TRANSLATIONS.EN,
        },
        transferPage: TRANSFER_PAGE_TRANSLATIONS.EN,
        visaPage: VISA_PAGE_TRANSLATIONS.EN,
      },
      currentLangInfo: LANGUAGES[0]!,
      isRtl: false,
      languages: LANGUAGES,
      toastMessage: null,
      showToast: () => {},
    };
  }
  return context;
}
