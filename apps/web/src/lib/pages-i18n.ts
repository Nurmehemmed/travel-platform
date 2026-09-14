import type { LanguageCode } from "./i18n";

export interface TransferPageTranslations {
  headerBadge: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  back: string;
  calcTitle: string;
  calcSubtitle: string;
  arrival: string;
  departure: string;
  roundTrip: string;
  airport: string;
  destinationZone: string;
  selectZone: string;
  flightNumber: string;
  estimatedCost: string;
  proceedBooking: string;
  fleetTitle: string;
  fleetSubtitle: string;
  sedan: string;
  sedanDesc: string;
  suv: string;
  suvDesc: string;
  minivan: string;
  minivanDesc: string;
  paxMax: string;
  bagsMax: string;
  whyTitle: string;
  whyDesc: string;
  f1Title: string;
  f1Desc: string;
  f2Title: string;
  f2Desc: string;
  f3Title: string;
  f3Desc: string;
  f4Title: string;
  f4Desc: string;
  faqTitle: string;
  faqSubtitle: string;
}

export interface VisaPageTranslations {
  headerBadge: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  checkEligibility: string;
  selectCountry: string;
  pricingTitle: string;
  pricingSubtitle: string;
  trackTitle: string;
  applyTitle: string;
  expressBadge: string;
  expressTitle: string;
  expressDesc: string;
  expressTime: string;
  expressHours: string;
  standardBadge: string;
  standardTitle: string;
  standardDesc: string;
  standardTime: string;
  standardDays: string;
  applyNow: string;
  applyStandard: string;
  applyExpress: string;
  trackNow: string;
  requirementsTitle: string;
  stepsTitle: string;
}

export interface NavExtraTranslations {
  trackTransfer: string;
  bookTransfer: string;
  trackVisa: string;
  applyVisa: string;
}

export const NAV_EXTRA_TRANSLATIONS: Record<LanguageCode, NavExtraTranslations> = {
  EN: {
    trackTransfer: "Track Transfer",
    bookTransfer: "Book Transfer",
    trackVisa: "Track Application",
    applyVisa: "Apply Online",
  },
  AZ: {
    trackTransfer: "Transferi İzlə",
    bookTransfer: "Transfer Sifariş Et",
    trackVisa: "Statusu Yoxla",
    applyVisa: "Onlayn Müraciət",
  },
  RU: {
    trackTransfer: "Отследить трансфер",
    bookTransfer: "Заказать трансфер",
    trackVisa: "Проверить визу",
    applyVisa: "Подать заявку",
  },
  FR: {
    trackTransfer: "Suivre le transfert",
    bookTransfer: "Réserver un transfert",
    trackVisa: "Suivi de visa",
    applyVisa: "Demande en ligne",
  },
  AR: {
    trackTransfer: "تتبع التوصيل",
    bookTransfer: "حجز التوصيل",
    trackVisa: "متابعة التأشيرة",
    applyVisa: "التقديم أونلاين",
  },
  DE: {
    trackTransfer: "Transfer verfolgen",
    bookTransfer: "Transfer buchen",
    trackVisa: "Visum-Status",
    applyVisa: "Online beantragen",
  },
};

export const TRANSFER_PAGE_TRANSLATIONS: Record<LanguageCode, TransferPageTranslations> = {
  EN: {
    headerBadge: "Airport Transfer",
    heroBadge: "24/7 Flight-Monitored Chauffeur Service",
    heroTitle: "Seamless Airport Transfers in Azerbaijan",
    heroDesc:
      "Fixed-rate, reliable airport pick-up and drop-off across Baku (GYD), Ganja (GJA), and Nakhchivan (NAJ). Free 60-minute wait time with real-time flight tracking.",
    back: "Back",
    calcTitle: "Instant Rate Calculator",
    calcSubtitle:
      "Select your airport, destination zone, and vehicle to see exact fixed pricing with no hidden fees.",
    arrival: "Arrival (Airport to City)",
    departure: "Departure (City to Airport)",
    roundTrip: "Round Trip (Save 10%)",
    airport: "Airport",
    destinationZone: "Destination Zone",
    selectZone: "Select destination zone",
    flightNumber: "Flight Number",
    estimatedCost: "Estimated Fare",
    proceedBooking: "Book This Transfer",
    fleetTitle: "Our Premium Fleet",
    fleetSubtitle:
      "Well-maintained, insured modern vehicles with air conditioning and professional chauffeurs.",
    sedan: "Economy Sedan",
    sedanDesc: "Ideal for solo travelers, couples, or light business trips.",
    suv: "Premium SUV",
    suvDesc: "Spacious comfort with extra legroom and mountain/off-road capability.",
    minivan: "Executive Minivan",
    minivanDesc: "Maximum room for families, travel groups, and heavy luggage.",
    paxMax: "Passengers",
    bagsMax: "Bags",
    whyTitle: "Why Choose AddmeTour Transfers?",
    whyDesc: "Punctual, transparent, and completely stress-free arrival in Azerbaijan.",
    f1Title: "Flight Delay Monitoring",
    f1Desc:
      "We track your flight in real time. Driver adjusts pickup automatically with 60 minutes free waiting.",
    f2Title: "Fixed All-Inclusive Rates",
    f2Desc: "No surge pricing, no metered surprises, and no airport parking surcharges.",
    f3Title: "Meet & Greet Service",
    f3Desc: "Your driver awaits inside the arrivals terminal holding a personalized name sign.",
    f4Title: "Cash or Online Card",
    f4Desc: "Secure online checkout via Payriff or pay cash directly to your chauffeur on arrival.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about our private airport transfers.",
  },
  AZ: {
    headerBadge: "Hava Limanı Transferi",
    heroBadge: "24/7 Uçuş Nəzarətli Şofer Xidməti",
    heroTitle: "Azərbaycanda Rahat Hava Limanı Transferləri",
    heroDesc:
      "Bakı (GYD), Gəncə (GJA) və Naxçıvan (NAJ) üzrə sabit qiymətli etibarlı transfer. Uçuşun izlənməsi və 60 dəqiqə pulsuz gözləmə.",
    back: "Geri",
    calcTitle: "Dərhal Qiymət Hesablama",
    calcSubtitle:
      "Hava limanını, marşrutu və nəqliyyat vasitəsini seçərək gizli xərclər olmadan dəqiq qiyməti öyrənin.",
    arrival: "Gəliş (Aeroportdan Şəhərə)",
    departure: "Gediş (Şəhərdən Aeroporta)",
    roundTrip: "Gediş-Dönüş (10% Endirim)",
    airport: "Hava Limanı",
    destinationZone: "Təyinat Zonası",
    selectZone: "Zonanı seçin",
    flightNumber: "Reys Nömrəsi",
    estimatedCost: "Təxmini Qiymət",
    proceedBooking: "Transferi Rəsmiləşdir",
    fleetTitle: "Nəqliyyat Parkımız",
    fleetSubtitle:
      "Müasir, təmiz, sığortalı və kondisionerli avtomobillər peşəkar sürücülərlə.",
    sedan: "Ekonom Sedan",
    sedanDesc: "Fərdi səyahətçilər və cütlüklər üçün ideal seçim.",
    suv: "Premium SUV",
    suvDesc: "Geniş salon, yüksək rahatlıq və dağ yolları üçün ideal.",
    minivan: "Biznes Minivan",
    minivanDesc: "Ailələr, qruplar və çoxsaylı baqaj üçün maksimum rahatlıq.",
    paxMax: "Sərnişin",
    bagsMax: "Baqaj",
    whyTitle: "Niyə AddmeTour Transferləri?",
    whyDesc: "Dəqiq, şəffaf və narahatlıqsız qarşılama xidməti.",
    f1Title: "Uçuşun İzlənməsi",
    f1Desc:
      "Uçuşunuzu real vaxtda izləyirik. Gecikmə olarsa, sürücü vaxtı avtomatik tənzimləyir və 60 dəqiqə pulsuz gözləyir.",
    f2Title: "Sabit və Şəffaf Qiymətlər",
    f2Desc: "Tıxac və ya gecikməyə görə əlavə ödəniş yoxdur.",
    f3Title: "Terminallarda Qarşılama",
    f3Desc: "Sürücünüz sizi gəliş zalında adınız yazılmış lövhə ilə qarşılayır.",
    f4Title: "Nağd və ya Kartla Ödəniş",
    f4Desc: "Payriff ilə onlayn təhlükəsiz ödəniş və ya çatanda sürücüyə nağd ödəmə imkanı.",
    faqTitle: "Tez-tez Verilən Suallar",
    faqSubtitle: "Hava limanı transferləri haqqında bütün vacib məlumatlar.",
  },
  RU: {
    headerBadge: "Трансфер из аэропорта",
    heroBadge: "Круглосуточный трансфер с отслеживанием рейса",
    heroTitle: "Комфортные трансферы из аэропортов Азербайджана",
    heroDesc:
      "Фиксированные тарифы в аэропортах Баку (GYD), Гянджи (GJA) и Нахчывана (NAJ). Бесплатное ожидание до 60 минут и онлайн-отслеживание рейсов.",
    back: "Назад",
    calcTitle: "Калькулятор стоимости трансфера",
    calcSubtitle:
      "Выберите аэропорт, направление и класс авто, чтобы узнать точную стоимость без скрытых платежей.",
    arrival: "Прилет (Аэропорт → Город)",
    departure: "Вылет (Город → Аэропорт)",
    roundTrip: "Туда и обратно (Скидка 10%)",
    airport: "Аэропорт",
    destinationZone: "Зона назначения",
    selectZone: "Выберите зону",
    flightNumber: "Номер рейса",
    estimatedCost: "Итоговая стоимость",
    proceedBooking: "Оформить бронирование",
    fleetTitle: "Наш автопарк",
    fleetSubtitle: "Современные автомобили с кондиционером и вежливыми опытными водителями.",
    sedan: "Эконом Седан",
    sedanDesc: "Отлично подходит для 1-3 пассажиров с багажом.",
    suv: "Премиум SUV",
    suvDesc: "Просторный кроссовер повышенной проходимости и комфорта.",
    minivan: "Бизнес Минивэн",
    minivanDesc: "Идеально для семей, компаний друзей и большого багажа.",
    paxMax: "Пассажиров",
    bagsMax: "Мест багажа",
    whyTitle: "Преимущества трансферов AddmeTour",
    whyDesc: "Пунктуальность, комфорт и безопасность с первых минут в стране.",
    f1Title: "Отслеживание рейсов",
    f1Desc: "Мы следим за статусом рейса. При задержке водитель приедет вовремя без доплат.",
    f2Title: "Фиксированная цена",
    f2Desc: "Никаких скрытых надбавок за пробки или ночные часы.",
    f3Title: "Встреча с табличкой",
    f3Desc: "Водитель встретит вас в зале прилета с персональной табличкой.",
    f4Title: "Оплата картой или наличными",
    f4Desc: "Безопасная онлайн-оплата Payriff или наличными водителю на месте.",
    faqTitle: "Часто задаваемые вопросы",
    faqSubtitle: "Все детали организации трансфера.",
  },
  FR: {
    headerBadge: "Transfert Aéroport",
    heroBadge: "Service Chauffeur Privé 24/7 avec Suivi de Vol",
    heroTitle: "Transferts d'Aéroport Sérénité en Azerbaïdjan",
    heroDesc:
      "Tarifs fixes et chauffeurs fiables aux aéroports de Bakou (GYD), Gandja (GJA) et Nakhitchevan (NAJ). 60 minutes d'attente gratuite.",
    back: "Retour",
    calcTitle: "Calculateur de Tarif Immédiat",
    calcSubtitle:
      "Choisissez l'aéroport, la zone et le véhicule pour afficher le prix net sans surprise.",
    arrival: "Arrivée (Aéroport → Ville)",
    departure: "Départ (Ville → Aéroport)",
    roundTrip: "Aller-Retour (-10%)",
    airport: "Aéroport",
    destinationZone: "Zone de destination",
    selectZone: "Sélectionner une zone",
    flightNumber: "Numéro de vol",
    estimatedCost: "Tarif estimé",
    proceedBooking: "Réserver ce transfert",
    fleetTitle: "Notre Flotte Premium",
    fleetSubtitle:
      "Véhicules récents, climatisés et entretenus conduits par des chauffeurs professionnels.",
    sedan: "Berline Économique",
    sedanDesc: "Idéal pour voyageurs solos et couples avec bagages légers.",
    suv: "SUV Premium",
    suvDesc: "Confort supérieur, grand coffre et tenue de route optimale.",
    minivan: "Minivan Exécutif",
    minivanDesc: "Espace maximal pour familles, groupes et bagages volumineux.",
    paxMax: "Passagers",
    bagsMax: "Bagages",
    whyTitle: "Pourquoi Choisir AddmeTour ?",
    whyDesc: "Ponctualité irréprochable et sérénité dès votre atterrissage.",
    f1Title: "Suivi des Vols en Direct",
    f1Desc: "Votre chauffeur surveille l'horaire réel du vol et s'adapte sans surcoût.",
    f2Title: "Prix Fixes Garantis",
    f2Desc: "Aucun supplément imprévu, ni frais d'embouteillage ou de parking.",
    f3Title: "Accueil Personnalisé",
    f3Desc: "Votre chauffeur vous attend dans le terminal d'arrivée avec une pancarte à votre nom.",
    f4Title: "Paiement en Ligne ou Espèces",
    f4Desc: "Paiement sécurisé par carte bancaire Payriff ou en espèces à l'arrivée.",
    faqTitle: "Questions Fréquentes",
    faqSubtitle: "Tout ce qu'il faut savoir sur vos transferts.",
  },
  AR: {
    headerBadge: "خدمات توصيل المطار",
    heroBadge: "خدمة سائق خاص 24/7 مع مراقبة الرحلات الجوية",
    heroTitle: "توصيل المطار براحة تامة في أذربيجان",
    heroDesc:
      "أسعار ثابتة وخدمة موثوقة في مطارات باكو (GYD) وغنجة (GJA) ونخجوان (NAJ). 60 دقيقة انتظار مجاني.",
    back: "رجوع",
    calcTitle: "حاسبة الأجرة الفورية",
    calcSubtitle: "حدد المطار والوجهة ونوع المركبة لمعرفة السعر النهائي دون أي رسوم مخفية.",
    arrival: "وصول (من المطار إلى المدينة)",
    departure: "مغادرة (من المدينة إلى المطار)",
    roundTrip: "ذهاب وإياب (خصم 10%)",
    airport: "المطار",
    destinationZone: "منطقة الوجهة",
    selectZone: "اختر الوجهة",
    flightNumber: "رقم الرحلة",
    estimatedCost: "السعر المتوقع",
    proceedBooking: "تأكيد وحجز التوصيل",
    fleetTitle: "أسطول سياراتنا الفاخر",
    fleetSubtitle: "مركبات حديثة ومكيفة ومؤمنة يقودها سائقون محترفون ومرخصون.",
    sedan: "سيدان اقتصادية",
    sedanDesc: "مثالية للمسافرين الأفراد والأزواج مع حقائب خفيفة.",
    suv: "سيارة دفع رباعي فاخرة",
    suvDesc: "مساحة رحبة ومثالية للطرق الجبلية والرحلات العائلية.",
    minivan: "ميني فان رجال الأعمال",
    minivanDesc: "مساحة واسعة جداً للعائلات والمجموعات وحقائب السفر الكبيرة.",
    paxMax: "ركاب",
    bagsMax: "حقائب",
    whyTitle: "لماذا تختار خدمات AddmeTour؟",
    whyDesc: "دقة بالمواعيد وراحة وأمان منذ لحظة وصولك إلى أذربيجان.",
    f1Title: "تتبع مواعيد الطيران",
    f1Desc: "نتابع رحلتك مباشرة، ويتواجد السائق بالموعد الدقيق مع 60 دقيقة انتظار مجانية.",
    f2Title: "أسعار ثابتة ومضمونة",
    f2Desc: "لا توجد أي رسوم إضافية للازدحام أو أوقات الليل أو مواقف المطار.",
    f3Title: "الاستقبال بلافتة الاسم",
    f3Desc: "سائقك الخاص ينتظرك داخل صالة الوصول حاملاً لافتة تحمل اسمك.",
    f4Title: "الدفع إلكترونياً أو نقداً",
    f4Desc: "دفع آمن بالبطاقة البنكية عبر Payriff أو نقداً للسائق عند الوصول.",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "كل ما تحتاج معرفته حول توصيلات المطار الخاصة.",
  },
  DE: {
    headerBadge: "Flughafentransfer",
    heroBadge: "24/7 Chauffeurdienst mit Flugüberwachung",
    heroTitle: "Bequeme Flughafentransfers in Aserbaidschan",
    heroDesc:
      "Feste Tarife an den Flughäfen Baku (GYD), Ganja (GJA) und Nachitschewan (NAJ). 60 Minuten kostenfreie Wartezeit bei Flugverspätung.",
    back: "Zurück",
    calcTitle: "Sofortiger Tarifrechner",
    calcSubtitle:
      "Wählen Sie Flughafen, Zielzone und Fahrzeugklasse für transparente Festpreise ohne versteckte Gebühren.",
    arrival: "Ankunft (Flughafen → Stadt)",
    departure: "Abflug (Stadt → Flughafen)",
    roundTrip: "Hin- & Rückfahrt (-10%)",
    airport: "Flughafen",
    destinationZone: "Zielzone",
    selectZone: "Zone auswählen",
    flightNumber: "Flugnummer",
    estimatedCost: "Geschätzter Preis",
    proceedBooking: "Transfer verbindlich buchen",
    fleetTitle: "Unsere Premium-Flotte",
    fleetSubtitle:
      "Gepflegte, klimatisierte und voll versicherte Fahrzeuge mit professionellen Chauffeuren.",
    sedan: "Economy Limousine",
    sedanDesc: "Ideal für Alleinreisende und Paare mit normalem Gepäck.",
    suv: "Premium SUV",
    suvDesc: "Höchster Reisekomfort mit viel Beinfreiheit und Bergtauglichkeit.",
    minivan: "Business Minivan",
    minivanDesc: "Maximaler Raum für Familien, Reisegruppen und umfangreiches Gepäck.",
    paxMax: "Passagiere",
    bagsMax: "Gepäckstücke",
    whyTitle: "Warum AddmeTour Transfers?",
    whyDesc: "Pünktliche, zuverlässige und stressfreie Ankunft in Aserbaidschan.",
    f1Title: "Echtzeit-Flugüberwachung",
    f1Desc:
      "Wir überwachen Ihren Flugstatus live. Bei Verspätung passt der Fahrer die Abholzeit automatisch an.",
    f2Title: "Garantierte Festpreise",
    f2Desc: "Keine Aufschläge bei Stau, Nachtfahrten oder Parkgebühren.",
    f3Title: "Persönlicher Abholservice",
    f3Desc: "Ihr Chauffeur erwartet Sie im Ankunftsterminal mit einem Namensschild.",
    f4Title: "Kartenzahlung oder Bar",
    f4Desc: "Sichere Online-Zahlung via Payriff oder Barzahlung direkt beim Fahrer.",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: "Alles Wissenswerte rund um Ihren Transfer.",
  },
};

export const VISA_PAGE_TRANSLATIONS: Record<LanguageCode, VisaPageTranslations> = {
  EN: {
    headerBadge: "e-Visa Service",
    heroBadge: "Official Republic of Azerbaijan ASAN Visa",
    heroTitle: "Azerbaijan Electronic Visa",
    heroSubtitle: "Simplified & Error-Free",
    heroDesc:
      "Skip bureaucratic errors and confusing portals. Our certified travel specialists pre-screen your passport, handle government submission to evisa.gov.az, and deliver your approved visa directly to your email.",
    checkEligibility: "Check Your Nationality Eligibility",
    selectCountry: "Select your passport country / citizenship...",
    pricingTitle: "Transparent Pricing",
    pricingSubtitle: "Choose Your Processing Speed",
    trackTitle: "Track Application",
    applyTitle: "Apply Online",
    expressBadge: "Urgent Travel · 3 Hours",
    expressTitle: "Urgent 3-Hour e-Visa",
    expressDesc:
      "For last-minute departures and tight travel schedules. Processed with highest government priority.",
    expressTime: "3 Hours Guarantee",
    expressHours: "Within 3 Hours",
    standardBadge: "Standard · 3 Days",
    standardTitle: "Standard e-Visa",
    standardDesc:
      "Perfect for travelers planning their journey ahead. Valid for 90 days with a 30-day stay.",
    standardTime: "3 Business Days",
    standardDays: "3 Business Days",
    applyNow: "Apply Now",
    applyStandard: "Apply Standard",
    applyExpress: "Apply Urgent (3 Hours)",
    trackNow: "Track Status",
    requirementsTitle: "Application Requirements",
    stepsTitle: "How It Works",
  },
  AZ: {
    headerBadge: "e-Viza Xidməti",
    heroBadge: "Azərbaycan Respublikasının Rəsmi ASAN Vizası",
    heroTitle: "Azərbaycan Elektron Vizası",
    heroSubtitle: "Sadə və Xətasız",
    heroDesc:
      "Bürokratik xətalardan və mürəkkəb portallardan azad olun. Sertifikatlı səyahət mütəxəssislərimiz pasportunuzu yoxlayır, evisa.gov.az-a təqdim edir və təsdiqlənmiş vizanızı birbaşa e-poçtunuza çatdırır.",
    checkEligibility: "Vətəndaşlığınızın Uyğunluğunu Yoxlayın",
    selectCountry: "Pasport ölkənizi / vətəndaşlığınızı seçin...",
    pricingTitle: "Şəffaf Qiymətlər",
    pricingSubtitle: "Müraciət Müddətini Seçin",
    trackTitle: "Statusu Yoxla",
    applyTitle: "Onlayn Müraciət",
    expressBadge: "Təcili Səyahət · 3 Saat",
    expressTitle: "Təcili 3 Saatlıq e-Viza",
    expressDesc:
      "Təcili səfərlər və sıx qrafiklər üçün. Dövlət tərəfindən ən yüksək prioritetlə emal olunur.",
    expressTime: "3 Saata Zəmanət",
    expressHours: "3 Saat Ərzində",
    standardBadge: "Standart · 3 İş Günü",
    standardTitle: "Standart e-Viza",
    standardDesc:
      "Səfərini qabaqcadan planlaşdıranlar üçün ideal. 90 gün etibarlılıq və 30 gün qalma hüququ.",
    standardTime: "3 İş Günü",
    standardDays: "3 İş Günü",
    applyNow: "İndi Müraciət Et",
    applyStandard: "Standart Müraciət",
    applyExpress: "Təcili Müraciət (3 Saat)",
    trackNow: "Statusu Yoxla",
    requirementsTitle: "Tələb Olunan Sənədlər",
    stepsTitle: "Necə İşləyir?",
  },
  RU: {
    headerBadge: "Сервис e-Визы",
    heroBadge: "Официальная электронная виза ASAN Visa",
    heroTitle: "Электронная виза в Азербайджан",
    heroSubtitle: "Быстро и без ошибок",
    heroDesc:
      "Забудьте о бюрократии и сложных порталах. Наши сертифицированные специалисты проверят ваш паспорт, передадут документы на evisa.gov.az и отправят готовую визу прямо на почту.",
    checkEligibility: "Проверьте требования для вашего гражданства",
    selectCountry: "Выберите страну паспорта / гражданство...",
    pricingTitle: "Прозрачные тарифы",
    pricingSubtitle: "Выберите скорость оформления",
    trackTitle: "Проверить визу",
    applyTitle: "Подать заявку",
    expressBadge: "Срочно · 3 Часа",
    expressTitle: "Срочная e-Виза за 3 часа",
    expressDesc:
      "Для срочных вылетов и поездок в последнюю минуту. Максимальный приоритет обработки.",
    expressTime: "Гарантия 3 часа",
    expressHours: "В течение 3 часов",
    standardBadge: "Стандарт · 3 Дня",
    standardTitle: "Стандартная e-Виза",
    standardDesc:
      "Идеально для заранее спланированных путешествий. Действует 90 дней со сроком пребывания 30 дней.",
    standardTime: "3 рабочих дня",
    standardDays: "3 рабочих дня",
    applyNow: "Оформить сейчас",
    applyStandard: "Оформить стандарт",
    applyExpress: "Оформить срочно (3 часа)",
    trackNow: "Проверить статус",
    requirementsTitle: "Требования к документам",
    stepsTitle: "Как это работает",
  },
  FR: {
    headerBadge: "Service e-Visa",
    heroBadge: "Visa Électronique Officiel ASAN Visa",
    heroTitle: "Visa Électronique pour l'Azerbaïdjan",
    heroSubtitle: "Simplifié et sans erreur",
    heroDesc:
      "Évitez les erreurs administratives et les démarches complexes. Nos experts vérifient vos documents et soumettent votre demande sur evisa.gov.az avec envoi direct par e-mail.",
    checkEligibility: "Vérifiez l'éligibilité de votre nationalité",
    selectCountry: "Sélectionnez le pays de votre passeport...",
    pricingTitle: "Tarifs transparents",
    pricingSubtitle: "Choisissez le délai de traitement",
    trackTitle: "Suivi de visa",
    applyTitle: "Demande en ligne",
    expressBadge: "Urgence · 3 Heures",
    expressTitle: "e-Visa Urgent 3 Heures",
    expressDesc:
      "Pour les départs de dernière minute et imprévus. Traitement officiel prioritaire.",
    expressTime: "Délivré en 3h",
    expressHours: "En moins de 3 heures",
    standardBadge: "Standard · 3 Jours",
    standardTitle: "e-Visa Standard",
    standardDesc:
      "Idéal pour préparer sereinement son voyage. Valable 90 jours avec séjour de 30 jours.",
    standardTime: "3 jours ouvrés",
    standardDays: "3 jours ouvrés",
    applyNow: "Faire la demande",
    applyStandard: "Demande Standard",
    applyExpress: "Demande Urgente (3h)",
    trackNow: "Vérifier le statut",
    requirementsTitle: "Documents requis",
    stepsTitle: "Comment ça marche",
  },
  AR: {
    headerBadge: "خدمة التأشيرة الإلكترونية",
    heroBadge: "التأشيرة الإلكترونية الرسمية لجمهورية أذربيجان (ASAN Visa)",
    heroTitle: "تأشيرة أذربيجان الإلكترونية",
    heroSubtitle: "بكل سهولة وبدون أخطاء",
    heroDesc:
      "تجنب التعقيدات والأخطاء في البيانات. يقوم خبراؤنا بالتدقيق في جواز سفرك وتقديمه رسمياً عبر evisa.gov.az وتسليم التأشيرة المعتمدة إلى بريدك الإلكتروني.",
    checkEligibility: "تحقق من أهلية جنسيتك للحصول على التأشيرة",
    selectCountry: "اختر دولة إصدار جواز سفرك / جنسيتك...",
    pricingTitle: "أسعار واضحة وشفافة",
    pricingSubtitle: "اختر سرعة معالجة الطلب",
    trackTitle: "متابعة الطلب",
    applyTitle: "تقديم الطلب",
    expressBadge: "سفر عاجل · 3 ساعات",
    expressTitle: "تأشيرة مستعجلة خلال 3 ساعات",
    expressDesc:
      "للرحلات الطارئة والسفر المفاجئ. معالجة بأعلى أولوية حكومية رسمية.",
    expressTime: "مضمونة خلال 3 ساعات",
    expressHours: "خلال 3 ساعات",
    standardBadge: "عادية · 3 أيام",
    standardTitle: "تأشيرة سياحية عادية",
    standardDesc:
      "مثالية للتخطيط المسبق للرحلات. صالحة لمدة 90 يوماً وتسمح بإقامة 30 يوماً.",
    standardTime: "3 أيام عمل",
    standardDays: "3 أيام عمل",
    applyNow: "قدّم طلبك الآن",
    applyStandard: "تقديم طلب عادي",
    applyExpress: "تقديم طلب مستعجل (3 ساعات)",
    trackNow: "تحقق من الحالة",
    requirementsTitle: "متطلبات التقديم",
    stepsTitle: "خطوات الحصول على التأشيرة",
  },
  DE: {
    headerBadge: "e-Visum Service",
    heroBadge: "Offizielles ASAN e-Visum der Republik Aserbaidschan",
    heroTitle: "Elektronisches Visum für Aserbaidschan",
    heroSubtitle: "Einfach & fehlerfrei",
    heroDesc:
      "Vermeiden Sie bürokratische Fehler und komplizierte Formulare. Unsere Reisespezialisten prüfen Ihre Dokumente, übermitteln sie an evisa.gov.az und senden Ihr genehmigtes Visum direkt per E-Mail.",
    checkEligibility: "Visumberechtigung für Ihre Staatsangehörigkeit prüfen",
    selectCountry: "Wählen Sie Ihr Passland / Ihre Staatsangehörigkeit...",
    pricingTitle: "Transparente Preise",
    pricingSubtitle: "Wählen Sie Ihre Bearbeitungszeit",
    trackTitle: "Visum-Status",
    applyTitle: "Online beantragen",
    expressBadge: "Dringend · 3 Stunden",
    expressTitle: "Express 3-Stunden e-Visum",
    expressDesc:
      "Für kurzfristige Abreisen und dringende Reisen. Höchste behördliche Bearbeitungspriorität.",
    expressTime: "3 Stunden Garantie",
    expressHours: "Innerhalb von 3 Stunden",
    standardBadge: "Standard · 3 Tage",
    standardTitle: "Standard e-Visum",
    standardDesc:
      "Perfekt für geplante Urlaubsreisen. 90 Tage gültig mit einem Aufenthalt von bis zu 30 Tagen.",
    standardTime: "3 Werktage",
    standardDays: "3 Werktage",
    applyNow: "Jetzt beantragen",
    applyStandard: "Standard beantragen",
    applyExpress: "Express beantragen (3 Stunden)",
    trackNow: "Status prüfen",
    requirementsTitle: "Erforderliche Unterlagen",
    stepsTitle: "So funktioniert es",
  },
};
