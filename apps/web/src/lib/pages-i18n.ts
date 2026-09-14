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
  oneWay: string;
  roundTripLabel: string;
  selectVehicle: string;
  quoteOnRequest: string;
  allInclusiveTitle: string;
  allInclusiveDesc: string;
  customQuoteText: string;
  f5Title: string;
  f5Desc: string;
  f6Title: string;
  f6Desc: string;
  fleetBadge: string;
  startingFrom: string;
  baseFee: string;
  perKm: string;
  bookVehicle: string;
  airportsBadge: string;
  airportsTitle: string;
  airportsDesc: string;
  bookFrom: string;
  bottomTitle: string;
  bottomDesc: string;
  bottomBookBtn: string;
  bottomTrackBtn: string;
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
    oneWay: "One-Way",
    roundTripLabel: "Round-Trip",
    selectVehicle: "Select",
    quoteOnRequest: "Quote on Request",
    allInclusiveTitle: "All-Inclusive Fixed Rates:",
    allInclusiveDesc: "No surge pricing, highway tolls included, parking fees covered.",
    customQuoteText: "Custom Quote",
    f5Title: "60 Minutes Free Wait Time",
    f5Desc: "Take your time clearing immigration and luggage claim. 60 minutes complimentary wait time from touchdown.",
    f6Title: "24/7 Operations Support",
    f6Desc: "Our Baku-based dispatch team is on standby around the clock via WhatsApp and telephone.",
    fleetBadge: "Premium Vehicles & Chauffeurs",
    startingFrom: "Starting from",
    baseFee: "base",
    perKm: "km",
    bookVehicle: "Book",
    airportsBadge: "Nationwide Coverage",
    airportsTitle: "Azerbaijan Airports We Serve",
    airportsDesc: "Door-to-door transfers connecting all international airports with hotels, residences, and business centers.",
    bookFrom: "Book from",
    bottomTitle: "Ready to Land Stress-Free in Azerbaijan?",
    bottomDesc: "Reserve your airport transfer in under 2 minutes. Instant booking confirmation with driver assignment before takeoff.",
    bottomBookBtn: "Book Your Transfer Now",
    bottomTrackBtn: "Track Existing Booking",
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
    paxMax: "sərnişin",
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
    oneWay: "Tək istiqamət",
    roundTripLabel: "Gediş-dönüş",
    selectVehicle: "Seç",
    quoteOnRequest: "Sorğu ilə qiymət",
    allInclusiveTitle: "Hər Şey Daxil Sabit Qiymətlər:",
    allInclusiveDesc: "Artan tariflər yoxdur, yol ödənişləri və parkinq daxildir.",
    customQuoteText: "Fərdi Təklif",
    f5Title: "60 Dəqiqə Pulsuz Gözləmə",
    f5Desc: "Gömrük və baqaj təhvili zamanı narahat olmayın. Təyyarə enəndən sonra 60 dəqiqə pulsuz gözləmə daxildir.",
    f6Title: "24/7 Əməliyyat Dəstəyi",
    f6Desc: "Bakı mərkəzli dəstək komandamız WhatsApp və zəng vasitəsilə gecə-gündüz xidmətinizdədir.",
    fleetBadge: "Müasir Avtomobillər və Şoferlər",
    startingFrom: "Başlanğıc qiymət",
    baseFee: "baza",
    perKm: "km",
    bookVehicle: "Sifariş et",
    airportsBadge: "Bütün Ölkə Ərazisində",
    airportsTitle: "Xidmət Göstərdiyimiz Hava Limanları",
    airportsDesc: "Beynəlxalq hava limanlarından otellərə, mənzillərə və biznes mərkəzlərinə birbaşa transferlər.",
    bookFrom: "Buradan sifariş:",
    bottomTitle: "Azərbaycana Rahat və Problemsiz Çatmağa Hazırsınız?",
    bottomDesc: "2 dəqiqə ərzində transferinizi sifariş edin. Uçuşdan əvvəl dərhal təsdiq və sürücü məlumatı.",
    bottomBookBtn: "İndi Transfer Sifariş Et",
    bottomTrackBtn: "Mövcud Sifarişi İzlə",
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
    oneWay: "В одну сторону",
    roundTripLabel: "Туда и обратно",
    selectVehicle: "Выбрать",
    quoteOnRequest: "Цена по запросу",
    allInclusiveTitle: "Фиксированные тарифы «Всё включено»:",
    allInclusiveDesc: "Без наценок в час пик, дорожные сборы и парковка включены.",
    customQuoteText: "По запросу",
    f5Title: "60 минут бесплатного ожидания",
    f5Desc: "Не спешите при прохождении паспортного контроля и получении багажа. Включено 60 минут бесплатного ожидания с момента посадки.",
    f6Title: "Поддержка 24/7",
    f6Desc: "Наша служба координации в Баку круглосуточно на связи через WhatsApp и по телефону.",
    fleetBadge: "Премиальный автопарк и водители",
    startingFrom: "От",
    baseFee: "база",
    perKm: "км",
    bookVehicle: "Забронировать",
    airportsBadge: "По всей стране",
    airportsTitle: "Аэропорты Азербайджана, которые мы обслуживаем",
    airportsDesc: "Трансферы от двери до двери, соединяющие все международные аэропорты с отелями и резиденциями.",
    bookFrom: "Заказать из",
    bottomTitle: "Готовы к комфортному прибытию в Азербайджан?",
    bottomDesc: "Забронируйте трансфер за 2 минуты. Мгновенное подтверждение и назначение водителя до вылета.",
    bottomBookBtn: "Забронировать трансфер",
    bottomTrackBtn: "Отследить существующую бронь",
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
    paxMax: "passagers",
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
    oneWay: "Aller simple",
    roundTripLabel: "Aller-retour",
    selectVehicle: "Sélectionner",
    quoteOnRequest: "Sur devis",
    allInclusiveTitle: "Tarifs Fixes Tout Compris :",
    allInclusiveDesc: "Aucune majoration de pointe, péages autoroutiers et parking aéroport inclus.",
    customQuoteText: "Sur devis",
    f5Title: "60 minutes d'attente gratuite",
    f5Desc: "Prenez votre temps pour les formalités et la récupération des bagages. 60 minutes d'attente gratuites incluses dès l'atterrissage.",
    f6Title: "Assistance opérationnelle 24/7",
    f6Desc: "Notre équipe locale à Bakou est disponible 24h/24 par WhatsApp et téléphone.",
    fleetBadge: "Flotte haut de gamme & chauffeurs",
    startingFrom: "À partir de",
    baseFee: "base",
    perKm: "km",
    bookVehicle: "Réserver",
    airportsBadge: "Couverture nationale",
    airportsTitle: "Aéroports desservis en Azerbaïdjan",
    airportsDesc: "Transferts porte-à-porte reliant tous les aéroports internationaux aux hôtels et résidences.",
    bookFrom: "Réserver depuis",
    bottomTitle: "Prêt pour une arrivée sans stress en Azerbaïdjan ?",
    bottomDesc: "Réservez votre transfert en moins de 2 minutes. Confirmation immédiate et chauffeur attitré avant le décollage.",
    bottomBookBtn: "Réserver votre transfert",
    bottomTrackBtn: "Suivre une réservation existante",
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
    oneWay: "ذهاب فقط",
    roundTripLabel: "ذهاب وإياب",
    selectVehicle: "اختيار",
    quoteOnRequest: "السعر عند الطلب",
    allInclusiveTitle: "أسعار ثابتة شاملة لجميع الرسوم:",
    allInclusiveDesc: "لا توجد رسوم ذروة مفاجئة، وتشمل رسوم الطرق السريعة ومواقف المطار.",
    customQuoteText: "عرض مخصص",
    f5Title: "60 دقيقة انتظار مجاني",
    f5Desc: "خذ وقتك في إنهاء إجراءات الجوازات واستلام الأمتعة، 60 دقيقة انتظار مجانية بالكامل من وقت هبوط الطائرة.",
    f6Title: "دعم وتشغيل على مدار الساعة 24/7",
    f6Desc: "فريق الدعم في باكو متواجد دائماً لخدمتكم على مدار الساعة عبر واتساب والهاتف.",
    fleetBadge: "سيارات وسائقون محترفون",
    startingFrom: "يبدأ من",
    baseFee: "أساسي",
    perKm: "كم",
    bookVehicle: "حجز",
    airportsBadge: "تغطية شاملة لجميع المناطق",
    airportsTitle: "مطارات أذربيجان المشمولة بخدماتنا",
    airportsDesc: "توصيل من الباب إلى الباب يربط جميع المطارات الدولية بالفنادق والوحدات السكنية.",
    bookFrom: "حجز من",
    bottomTitle: "جاهز لوصول مريح وخالٍ من المتاعب إلى أذربيجان؟",
    bottomDesc: "احجز توصيلتك في أقل من دقيقتين. تأكيد فوري وتعيين مسبق للسائق قبل إقلاع رحلتك.",
    bottomBookBtn: "احجز توصيلتك الآن",
    bottomTrackBtn: "تتبع حجزك الحالي",
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
    oneWay: "Einfache Fahrt",
    roundTripLabel: "Hin- und Rückfahrt",
    selectVehicle: "Auswählen",
    quoteOnRequest: "Preis auf Anfrage",
    allInclusiveTitle: "Feste All-Inclusive-Preise:",
    allInclusiveDesc: "Keine Stoßzeitzuschläge, Autobahngebühren und Parkgebühren inklusive.",
    customQuoteText: "Individuelles Angebot",
    f5Title: "60 Minuten kostenfreie Wartezeit",
    f5Desc: "Nehmen Sie sich Zeit für Passkontrolle und Gepäckausgabe. Volle 60 Minuten kostenlose Wartezeit ab Landung.",
    f6Title: "24/7 Kundenservice & Disposition",
    f6Desc: "Unser Einsatzteam in Baku steht Ihnen rund um die Uhr per WhatsApp und Telefon zur Verfügung.",
    fleetBadge: "Premium-Fahrzeuge & Chauffeure",
    startingFrom: "Ab",
    baseFee: "Grundpreis",
    perKm: "km",
    bookVehicle: "Buchen",
    airportsBadge: "Landesweite Abdeckung",
    airportsTitle: "Bediente Flughäfen in Aserbaidschan",
    airportsDesc: "Tür-zu-Tür-Transfers von allen internationalen Flughäfen zu Hotels, Apartments und Geschäftszentren.",
    bookFrom: "Buchen ab",
    bottomTitle: "Bereit für eine stressfreie Ankunft in Aserbaidschan?",
    bottomDesc: "Buchen Sie Ihren Flughafentransfer in unter 2 Minuten. Sofortige Bestätigung und Chauffeur-Zuweisung vor Abflug.",
    bottomBookBtn: "Jetzt Transfer buchen",
    bottomTrackBtn: "Bestehende Buchung verfolgen",
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

export const LOCALIZED_AIRPORTS: Record<LanguageCode, Record<string, string>> = {
  EN: {
    GYD: "Heydar Aliyev International Airport (GYD)",
    GJA: "Ganja Airport (GJA)",
    NAJ: "Nakhchivan Airport (NAJ)",
  },
  AZ: {
    GYD: "Heydər Əliyev Beynəlxalq Aeroportu (GYD)",
    GJA: "Gəncə Beynəlxalq Hava Limanı (GJA)",
    NAJ: "Naxçıvan Beynəlxalq Hava Limanı (NAJ)",
  },
  RU: {
    GYD: "Международный аэропорт Гейдар Алиев (GYD)",
    GJA: "Международный аэропорт Гянджа (GJA)",
    NAJ: "Международный аэропорт Нахчыван (NAJ)",
  },
  AR: {
    GYD: "مطار حيدر علييف الدولي (GYD)",
    GJA: "مطار غنجة الدولي (GJA)",
    NAJ: "مطار نخجوان الدولي (NAJ)",
  },
  FR: {
    GYD: "Aéroport international Heydar Aliyev (GYD)",
    GJA: "Aéroport de Gandja (GJA)",
    NAJ: "Aéroport de Nakhitchevan (NAJ)",
  },
  DE: {
    GYD: "Internationaler Flughafen Heydar Aliyev (GYD)",
    GJA: "Flughafen Gändschä (GJA)",
    NAJ: "Flughafen Nachitschewan (NAJ)",
  },
};

export const LOCALIZED_ZONES: Record<LanguageCode, Record<string, string>> = {
  EN: {
    "GYD-baku-center": "Baku City Center",
    "GYD-baku-bulvar": "Baku Boulevard / Caspian Waterfront",
    "GYD-sabail": "Sabail / Flame Towers Area",
    "GYD-absheron": "Absheron (Novkhani, Pirallahi)",
    "GYD-sumqayit": "Sumqayit",
    "GYD-khirdalan": "Khirdalan / Absheron Highway",
    "GYD-custom": "Custom Destination",
    "GJA-ganja-center": "Ganja City Center",
    "GJA-custom": "Custom Destination",
    "NAJ-nakhchivan-center": "Nakhchivan City Center",
    "NAJ-custom": "Custom Destination",
  },
  AZ: {
    "GYD-baku-center": "Bakı Şəhər Mərkəzi",
    "GYD-baku-bulvar": "Bakı Bulvarı / Xəzər Sahili",
    "GYD-sabail": "Səbail / Alov Qüllələri Ərazisi",
    "GYD-absheron": "Abşeron (Novxanı, Pirallahı)",
    "GYD-sumqayit": "Sumqayıt",
    "GYD-khirdalan": "Xırdalan / Abşeron Magistralı",
    "GYD-custom": "Fərdi Ünvan / Xüsusi Təyinat",
    "GJA-ganja-center": "Gəncə Şəhər Mərkəzi",
    "GJA-custom": "Fərdi Ünvan / Xüsusi Təyinat",
    "NAJ-nakhchivan-center": "Naxçıvan Şəhər Mərkəzi",
    "NAJ-custom": "Fərdi Ünvan / Xüsusi Təyinat",
  },
  RU: {
    "GYD-baku-center": "Центр Баку",
    "GYD-baku-bulvar": "Бакинский бульвар / Набережная",
    "GYD-sabail": "Сабаил / Район Flame Towers",
    "GYD-absheron": "Апшерон (Новханы, Пираллахи)",
    "GYD-sumqayit": "Сумгаит",
    "GYD-khirdalan": "Хырдалан / Апшеронское шоссе",
    "GYD-custom": "Индивидуальный адрес",
    "GJA-ganja-center": "Центр Гянджи",
    "GJA-custom": "Индивидуальный адрес",
    "NAJ-nakhchivan-center": "Центр Нахчывана",
    "NAJ-custom": "Индивидуальный адрес",
  },
  AR: {
    "GYD-baku-center": "وسط مدينة باكو",
    "GYD-baku-bulvar": "بوليفارد باكو / كورنيش بحر قزوين",
    "GYD-sabail": "منطقة سبائل / أبراج الشعلة",
    "GYD-absheron": "أبشيرون (نوخاني، بيرالاهي)",
    "GYD-sumqayit": "مدينة سومقاييت",
    "GYD-khirdalan": "خردلان / طريق أبشيرون السريع",
    "GYD-custom": "وجهة أو فندق مخصص",
    "GJA-ganja-center": "وسط مدينة غنجة",
    "GJA-custom": "وجهة مخصصة في غنجة",
    "NAJ-nakhchivan-center": "وسط مدينة نخجوان",
    "NAJ-custom": "وجهة مخصصة في نخجوان",
  },
  FR: {
    "GYD-baku-center": "Centre-ville de Bakou",
    "GYD-baku-bulvar": "Boulevard de Bakou / Front de mer",
    "GYD-sabail": "Quartier Sabail / Tours Flammes",
    "GYD-absheron": "Absheron (Novkhani, Pirallahi)",
    "GYD-sumqayit": "Soumgaït",
    "GYD-khirdalan": "Khirdalan / Autoroute d'Absheron",
    "GYD-custom": "Destination personnalisée",
    "GJA-ganja-center": "Centre-ville de Gandja",
    "GJA-custom": "Destination personnalisée",
    "NAJ-nakhchivan-center": "Centre-ville de Nakhitchevan",
    "NAJ-custom": "Destination personnalisée",
  },
  DE: {
    "GYD-baku-center": "Stadtzentrum Baku",
    "GYD-baku-bulvar": "Baku Boulevard / Kaspische Uferpromenade",
    "GYD-sabail": "Sabail / Flame Towers Viertel",
    "GYD-absheron": "Abscheron (Nowchany, Pirallahi)",
    "GYD-sumqayit": "Sumqayıt",
    "GYD-khirdalan": "Xırdalan / Abscheron Autobahn",
    "GYD-custom": "Individuelle Zieladresse",
    "GJA-ganja-center": "Stadtzentrum Gändschä",
    "GJA-custom": "Individuelle Zieladresse",
    "NAJ-nakhchivan-center": "Stadtzentrum Nachitschewan",
    "NAJ-custom": "Individuelle Zieladresse",
  },
};

export const LOCALIZED_AIRPORT_DESCRIPTIONS: Record<LanguageCode, Record<string, string>> = {
  EN: {
    GYD: "Baku's main hub. 30 km from city center. Dedicated pickup zone at Terminal 1 & 2.",
    GJA: "Western Azerbaijan gateway. 8 km from Ganja center with transfers to Goygol and Naftalan.",
    NAJ: "Nakhchivan Autonomous Republic. 7 km from city center with prompt airport greeting.",
  },
  AZ: {
    GYD: "Bakının əsas hava qapısı. Mərkəzdən 30 km məsafədə. Terminal 1 və 2-də xüsusi qarşılama zonası.",
    GJA: "Qərbi Azərbaycanın hava qapısı. Gəncə mərkəzindən 8 km. Göygöl və Naftalana rahat transferlər.",
    NAJ: "Naxçıvan Muxtar Respublikası. Mərkəzdən 7 km məsafədə, operativ hava limanı qarşılaması.",
  },
  RU: {
    GYD: "Главный хаб Баку. 30 км от центра города. Встреча у Терминалов 1 и 2.",
    GJA: "Ворота западного Азербайджана. 8 км от центра Гянджи, трансферы в Гёйгёль и Нафталан.",
    NAJ: "Нахчыванская Автономная Республика. 7 км от центра города с пунктуальной встречей.",
  },
  AR: {
    GYD: "بوابة باكو الرئيسية. يبعد 30 كم عن مركز المدينة مع نقطة استقبال مخصصة في المبنى 1 و 2.",
    GJA: "بوابة غرب أذربيجان. يبعد 8 كم عن وسط غنجة مع خدمات توصيل إلى غويغول ونفتالان.",
    NAJ: "جمهورية نخجوان ذاتية الحكم. يبعد 7 كم عن مركز المدينة مع استقبال فوري ومباشر.",
  },
  FR: {
    GYD: "Hub principal de Bakou. À 30 km du centre. Zone de prise en charge dédiée aux terminaux 1 et 2.",
    GJA: "Porte d'entrée de l'ouest. À 8 km du centre de Gandja avec liaisons vers Goygol et Naftalan.",
    NAJ: "République autonome du Nakhitchevan. À 7 km du centre-ville avec accueil ponctuel.",
  },
  DE: {
    GYD: "Hauptdrehkreuz von Baku. 30 km vom Zentrum entfernt. Abholzone an Terminal 1 & 2.",
    GJA: "Tor zum Westen Aserbaidschans. 8 km vom Zentrum Gändschäs mit Transfers nach Goygol und Naftalan.",
    NAJ: "Autonome Republik Nachitschewan. 7 km vom Stadtzentrum mit persönlicher Abholung.",
  },
};

export const LOCALIZED_TRANSFER_FAQS: Record<LanguageCode, Array<{ q: string; a: string }>> = {
  EN: [
    {
      q: "Where will I meet my driver at the airport?",
      a: "Your driver will be waiting inside the arrival hall directly after luggage claim and customs exit, holding a personalized signboard with your name. You will also receive the driver's contact number before your flight.",
    },
    {
      q: "What if my flight is delayed?",
      a: "We track your flight number in real-time. Whether your flight is early or delayed by several hours, your driver will adjust their schedule automatically at no extra charge. We also include 60 minutes of complimentary waiting time after your flight lands.",
    },
    {
      q: "Can I pay in cash to the driver upon arrival?",
      a: "Yes! You can choose to pay securely online by credit card via Payriff, or choose 'Pay on Arrival' in cash (USD, EUR, or AZN) directly to the driver.",
    },
    {
      q: "What is your cancellation policy?",
      a: "You can cancel or modify your transfer reservation free of charge up to 24 hours prior to the scheduled pickup time. Instant full refunds are issued for online card payments.",
    },
    {
      q: "Do you provide child safety seats?",
      a: "Yes, infant and child safety seats can be arranged upon request at no additional fee. Simply mention it in the luggage or special requests note when booking.",
    },
    {
      q: "How many pieces of luggage can I bring?",
      a: "Our standard economy sedans comfortably carry 2 large suitcases plus carry-on bags. If you are traveling with more luggage or sporting equipment, our Minivan or Executive Minibus are ideal choices.",
    },
  ],
  AZ: [
    {
      q: "Sürücünü hava limanında harada qarşılayacağam?",
      a: "Sürücünüz baqaj təhvili və gömrük çıxışından dərhal sonra, əlində adınız yazılmış lövhə ilə sizi gözləyəcək. Həmçinin uçuşdan əvvəl sürücünün əlaqə nömrəsi sizə göndərilir.",
    },
    {
      q: "Uçuşum gecikərsə nə baş verir?",
      a: "Reysinizi real vaxt rejimində izləyirik. Uçuş tez gəlsə və ya geciksə, sürücümüz cədvəli əlavə ödənişsiz avtomatik uyğunlaşdırır və təyyarə enəndən sonra 60 dəqiqə pulsuz gözləyir.",
    },
    {
      q: "Çatanda sürücüyə nağd ödəniş edə bilərəmmi?",
      a: "Bəli! Payriff vasitəsilə təhlükəsiz onlayn kartla ödəyə və ya çatanda birbaşa sürücüyə nağd (USD, EUR və ya AZN) ödəniş edə bilərsiniz.",
    },
    {
      q: "Ləğvetmə qaydası necədir?",
      a: "Qarşılanma vaxtına 24 saat qalmışadək sifarişi ödənişsiz ləğv edə və ya dəyişdirə bilərsiniz. Onlayn ödənişlər tam məbləğdə geri qaytarılır.",
    },
    {
      q: "Uşaq oturacağı təmin edilirmi?",
      a: "Bəli, körpə və uşaq oturacağı əlavə ödənişsiz təmin edilir. Sadəcə sifariş zamanı qeyd xanasında bunu bildirin.",
    },
    {
      q: "Özümlə nə qədər baqaj götürə bilərəm?",
      a: "Standart sedanlar 2 böyük çamadan və əl yükü tutur. Əgər daha çox baqajınız varsa, Minivan ən ideal seçimdir.",
    },
  ],
  RU: [
    {
      q: "Где меня встретит водитель в аэропорту?",
      a: "Водитель будет ожидать вас в зале прилета сразу после зоны получения багажа с именной табличкой. Контакты водителя вы получите заранее.",
    },
    {
      q: "Что если мой рейс задерживается?",
      a: "Мы отслеживаем статус рейса в реальном времени. Водитель приедет точно к моменту посадки без доплат. Также включено 60 минут бесплатного ожидания.",
    },
    {
      q: "Можно ли оплатить наличными водителю?",
      a: "Да! Вы можете оплатить онлайн картой через Payriff или выбрать оплату наличными водителю на месте (USD, EUR, AZN).",
    },
    {
      q: "Каковы условия отмены бронирования?",
      a: "Бесплатная отмена или изменение доступны за 24 часа до поездки. При онлайн-оплате средства возвращаются в полном объеме.",
    },
    {
      q: "Предоставляется ли детское кресло?",
      a: "Да, детские кресла предоставляются бесплатно по запросу. Укажите это в комментарии к бронированию.",
    },
    {
      q: "Сколько багажа можно взять с собой?",
      a: "В седан помещается 2 больших чемодана и ручная кладь. Для большего объема багажа или компаний рекомендуем минивэн.",
    },
  ],
  AR: [
    {
      q: "أين سأقابل السائق في المطار؟",
      a: "سيكون السائق بانتظارك داخل صالة الوصول بعد استلام الأمتعة ومخرج الجمارك مباشرة، حاملاً لافتة باسمك. كما سنزودك برقم هاتفه قبل موعد الرحلة.",
    },
    {
      q: "ماذا لو تأخرت رحلتي الجوية؟",
      a: "نقوم بتتبع الرحلة مباشرة عبر رقم الطيران. سواء وصلت مبكراً أو تأخرت لساعات، سيتواجد السائق بالموعد دون أي تكلفة إضافية، مع 60 دقيقة انتظار مجاني.",
    },
    {
      q: "هل يمكنني الدفع نقداً للسائق عند الوصول؟",
      a: "نعم بكل تأكيد! يمكنك الدفع بالبطاقة عبر Payriff أو اختيار الدفع نقداً عند الوصول مباشرة للسائق بعملات (الدولار أو اليورو أو المانات الأذربيجاني).",
    },
    {
      q: "ما هي سياسة إلغاء الحجز؟",
      a: "يمكنك إلغاء أو تعديل الحجز مجاناً بالكامل حتى 24 ساعة قبل موعد التوصيل، مع استرداد فوري وكامل للأموال عند الدفع الإلكتروني.",
    },
    {
      q: "هل توفرون مقاعد سلامة للأطفال؟",
      a: "نعم، نوفر مقاعد للأطفال والرضع مجاناً عند الطلب. فقط اذكر ذلك في ملاحظات الحجز.",
    },
    {
      q: "كم عدد حقائب السفر المسموح بها؟",
      a: "تتسع سيارة السيدان الاقتصادية لحقيبتي سفر كبيرتين بالإضافة لحقائب اليد. للعائلات والحقائب الأكثر، ننصح باختيار سيارة الميني فان.",
    },
  ],
  FR: [
    {
      q: "Où vais-je rencontrer mon chauffeur à l'aéroport ?",
      a: "Votre chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom juste après la sortie des douanes et bagages.",
    },
    {
      q: "Que se passe-t-il si mon vol a du retard ?",
      a: "Nous suivons votre vol en temps réel. Le chauffeur s'adapte sans frais supplémentaires avec 60 minutes d'attente gratuite incluses.",
    },
    {
      q: "Puis-je payer en espèces au chauffeur à l'arrivée ?",
      a: "Oui ! Vous pouvez payer en ligne par carte via Payriff ou choisir le paiement en espèces (USD, EUR, AZN) directement auprès du chauffeur.",
    },
    {
      q: "Quelle est votre politique d'annulation ?",
      a: "Annulation ou modification gratuite jusqu'à 24h avant la prise en charge. Remboursement intégral immédiat en cas de paiement en ligne.",
    },
    {
      q: "Fournissez-vous des sièges auto pour enfants ?",
      a: "Oui, des sièges enfants sont fournis gratuitement sur simple demande lors de votre réservation.",
    },
    {
      q: "Combien de bagages puis-je emporter ?",
      a: "Une berline transporte confortablement 2 grandes valises et des bagages à main. Pour plus d'espace, privilégiez le minivan.",
    },
  ],
  DE: [
    {
      q: "Wo treffe ich meinen Fahrer am Flughafen?",
      a: "Ihr Chauffeur erwartet Sie direkt in der Ankunftshalle nach der Gepäckausgabe mit einem personalisierten Namensschild.",
    },
    {
      q: "Was passiert bei Flugverspätungen?",
      a: "Wir überwachen Ihren Flug live. Ihr Fahrer passt die Abholung kostenfrei an und wartet bis zu 60 Minuten kostenlos nach der Landung.",
    },
    {
      q: "Kann ich bei Ankunft bar beim Fahrer bezahlen?",
      a: "Ja! Sie können sicher online per Karte über Payriff zahlen oder bequem vor Ort beim Fahrer in bar (USD, EUR oder AZN).",
    },
    {
      q: "Wie sind die Stornierungsbedingungen?",
      a: "Kostenlose Stornierung und Umbuchung bis zu 24 Stunden vor Abholung mit sofortiger Rückerstattung bei Online-Zahlung.",
    },
    {
      q: "Gibt es Kindersitze?",
      a: "Ja, Kindersitze stellen wir auf Anfrage gerne kostenlos bereit. Bitte bei der Buchung angeben.",
    },
    {
      q: "Wie viel Gepäck kann mitgenommen werden?",
      a: "In eine Limousine passen 2 große Koffer plus Handgepäck. Für mehr Gepäck oder Gruppen empfehlen wir den Minivan.",
    },
  ],
};

export const LOCALIZED_VEHICLE_FEATURES: Record<string, Record<string, string[]>> = {
  EN: {
    sedan: ["Air conditioning", "Door-to-door service", "Flight monitoring", "Bottled water"],
    suv: ["High clearance & AWD", "Extra luggage room", "Meet & Greet service", "Flight monitoring"],
    minivan: ["Extra legroom & 7 seats", "Huge luggage capacity", "Great for families & groups", "Flight monitoring"],
  },
  AZ: {
    sedan: ["Kondisioner", "Qapıdan qapıya xidmət", "Uçuşun canlı izlənməsi", "Qablaşdırılmış su"],
    suv: ["Yüksək klirens və 4x4", "Geniş baqaj yeri", "Ad lövhəsi ilə qarşılama", "Uçuşun canlı izlənməsi"],
    minivan: ["Geniş ayaq yeri və 7 oturacaq", "Böyük baqaj tutumu", "Ailələr və qruplar üçün ideal", "Uçuşun canlı izlənməsi"],
  },
  RU: {
    sedan: ["Кондиционер", "Доставка от двери до двери", "Отслеживание рейса", "Бутилированная вода"],
    suv: ["Полный привод и высокий клиренс", "Увеличенный багажник", "Встреча с табличкой", "Отслеживание рейса"],
    minivan: ["Просторный салон (7 мест)", "Огромная вместимость багажа", "Идеально для семей и групп", "Отслеживание рейса"],
  },
  FR: {
    sedan: ["Climatisation", "Service porte-à-porte", "Suivi de vol en direct", "Bouteilles d'eau offertes"],
    suv: ["Garde au sol élevée & 4x4", "Grand coffre à bagages", "Accueil personnalisé avec pancarte", "Suivi de vol en direct"],
    minivan: ["Espace jambes généreux & 7 places", "Capacité bagages maximale", "Idéal pour familles et groupes", "Suivi de vol en direct"],
  },
  AR: {
    sedan: ["تكييف هوائي كامل", "توصيل من الباب إلى الباب", "تتبع مباشر لموعد هبوط الرحلة", "مياه معدنية معبأة مجاناً"],
    suv: ["دفع رباعي وارتفاع عالٍ", "مساحة إضافية واسعة للحقائب", "استقبال بلافتة الاسم بالصالة", "تتبع مباشر لموعد هبوط الرحلة"],
    minivan: ["مساحة واسعة للأقدام و7 مقاعد", "سعة أمتعة ضخمة للحقائب الكبيرة", "مثالي للعائلات والمجموعات", "تتبع مباشر لموعد هبوط الرحلة"],
  },
  DE: {
    sedan: ["Klimaanlage", "Tür-zu-Tür-Service", "Flugüberwachung in Echtzeit", "Mineralwasser inklusive"],
    suv: ["Hohe Bodenfreiheit & Allrad", "Extra viel Gepäckraum", "Persönlicher Abholservice mit Schild", "Flugüberwachung in Echtzeit"],
    minivan: ["Viel Beinfreiheit & 7 Sitze", "Riesige Gepäckkapazität", "Perfekt für Familien & Gruppen", "Flugüberwachung in Echtzeit"],
  },
};

export const LOCALIZED_AIRPORT_CITIES: Record<string, Record<string, string>> = {
  EN: { GYD: "Baku", GJA: "Ganja", NAJ: "Nakhchivan" },
  AZ: { GYD: "Bakı", GJA: "Gəncə", NAJ: "Naxçıvan" },
  RU: { GYD: "Баку", GJA: "Гянджа", NAJ: "Нахчыван" },
  FR: { GYD: "Bakou", GJA: "Gandja", NAJ: "Nakhitchevan" },
  AR: { GYD: "باكو", GJA: "غنجة", NAJ: "نخجوان" },
  DE: { GYD: "Baku", GJA: "Gändschä", NAJ: "Nachitschewan" },
};

export interface TransferBookTranslations {
  step1Nav: string;
  step2Nav: string;
  step3Nav: string;
  step4Nav: string;
  step1Title: string;
  step1Desc: string;
  transferDirection: string;
  pickupAddressLabel: string;
  dropoffAddressLabel: string;
  addressPlaceholder: string;
  addressHelp: string;
  step2Title: string;
  step2Desc: string;
  arrFlightInfo: string;
  depFlightInfo: string;
  flightNumLabel: string;
  flightNumPlaceholder: string;
  flightTrackHint: string;
  flightDateLabel: string;
  flightTimeLabel: string;
  retFlightInfo: string;
  retFlightNumLabel: string;
  retFlightDateLabel: string;
  retFlightTimeLabel: string;
  waitNoticeTitle: string;
  waitNoticeDesc: string;
  step3Title: string;
  step3Desc: string;
  leadPassengerLabel: string;
  leadPassengerPlaceholder: string;
  nameSignHint: string;
  paxCountLabel: string;
  paxUnitSingle: string;
  paxUnitPlural: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHint: string;
  notesLabel: string;
  notesPlaceholder: string;
  step4Title: string;
  step4Desc: string;
  summaryTitle: string;
  destZoneLabel: string;
  addressLabel: string;
  flightLabel: string;
  returnFlightLabel: string;
  leadPaxLabel: string;
  contactLabel: string;
  notesLabelReview: string;
  rateLabel: string;
  toBeQuoted: string;
  meetGreetFree: string;
  tollsFuelFree: string;
  includedFree: string;
  totalDue: string;
  allTaxesInc: string;
  payriffDesc: string;
  payMethodLabel: string;
  payOnlineTitle: string;
  payOnlineDesc: string;
  payCashTitle: string;
  payCashDesc: string;
  termsCheckbox: string;
  btnBack: string;
  btnContinueFlight: string;
  btnContinuePax: string;
  btnContinueReview: string;
  btnSubmitting: string;
  btnPayCard: string;
  btnConfirmCash: string;
  btnRequestQuote: string;
  errEnterName: string;
  errValidEmail: string;
  errValidPhone: string;
  errAcceptTerms: string;
}

export const TRANSFER_BOOK_TRANSLATIONS: Record<string, TransferBookTranslations> = {
  EN: {
    step1Nav: "Route & Vehicle",
    step2Nav: "Flight Details",
    step3Nav: "Passenger Info",
    step4Nav: "Review & Pay",
    step1Title: "Step 1: Select Route & Vehicle",
    step1Desc: "Choose your airport, direction, and preferred vehicle class.",
    transferDirection: "Transfer Direction",
    pickupAddressLabel: "Pickup Hotel / Address",
    dropoffAddressLabel: "Destination Hotel / Address",
    addressPlaceholder: "e.g., Four Seasons Hotel Baku, Neftchilar Ave 1 / apartment address",
    addressHelp: "Our driver will deliver you directly to the entrance or hotel lobby.",
    step2Title: "Step 2: Flight Schedule",
    step2Desc: "We track your flight number in real-time so your driver is always on time even if your flight is delayed.",
    arrFlightInfo: "Arrival Flight Information",
    depFlightInfo: "Departure Flight Information",
    flightNumLabel: "Flight Number *",
    flightNumPlaceholder: "e.g. J2 076, TK 338, FZ 707, QR 353",
    flightTrackHint: "🛫 We auto-track your airline and meet you at the correct terminal (Terminal 1 or 2 at GYD).",
    flightDateLabel: "Date *",
    flightTimeLabel: "Estimated Time *",
    retFlightInfo: "Return Flight Information",
    retFlightNumLabel: "Return Flight Number *",
    retFlightDateLabel: "Return Date *",
    retFlightTimeLabel: "Return Flight Time *",
    waitNoticeTitle: "Complimentary Wait Time:",
    waitNoticeDesc: "60 minutes free waiting time from touchdown for international arrivals. 15 minutes included for hotel pickups.",
    step3Title: "Step 3: Passenger Information",
    step3Desc: "Please provide the lead passenger contact details for driver communication and booking voucher.",
    leadPassengerLabel: "Lead Passenger Full Name *",
    leadPassengerPlaceholder: "As shown on passport / ID",
    nameSignHint: "The driver will hold a greeting sign with this name.",
    paxCountLabel: "Number of Passengers *",
    paxUnitSingle: "Passenger",
    paxUnitPlural: "Passengers",
    emailLabel: "Email Address *",
    emailPlaceholder: "For booking confirmation & receipt",
    phoneLabel: "Phone / WhatsApp Number *",
    phonePlaceholder: "+994 55 100 31 46 (with country code)",
    phoneHint: "Driver will message or call upon landing.",
    notesLabel: "Luggage & Special Requests (Optional)",
    notesPlaceholder: "e.g. 1 baby child seat needed, 3 large golf bags, wheelchair assistance, etc.",
    step4Title: "Step 4: Review Booking & Payment",
    step4Desc: "Verify your transfer details and choose your preferred payment method.",
    summaryTitle: "Transfer Route & Details",
    destZoneLabel: "Destination Zone:",
    addressLabel: "Specific Address:",
    flightLabel: "Flight:",
    returnFlightLabel: "Return Flight:",
    leadPaxLabel: "Lead Passenger:",
    contactLabel: "Contact:",
    notesLabelReview: "Special Notes:",
    rateLabel: "Transfer Rate",
    toBeQuoted: "To be quoted",
    meetGreetFree: "Airport meet & greet + 60 min wait time",
    tollsFuelFree: "Highway tolls, fuel & parking",
    includedFree: "Included ($0.00)",
    totalDue: "Total Due:",
    allTaxesInc: "All highway tolls, parking & taxes included",
    payriffDesc: "💳 Card transactions processed securely via Payriff at the official Central Bank of Azerbaijan peg (1 USD = 1.70 AZN). Cash on arrival accepted in AZN, USD, or EUR.",
    payMethodLabel: "Select Payment Method",
    payOnlineTitle: "Pay Online via Card",
    payOnlineDesc: "Instant card checkout with Payriff (Visa / Mastercard). Full refund if cancelled 24h before.",
    payCashTitle: "Pay on Arrival (Cash)",
    payCashDesc: "Pay your driver in cash upon arrival. Accepted: USD, EUR, or Azerbaijani Manat (AZN).",
    termsCheckbox: "I agree to the transfer booking policy, including 24-hour free cancellation and flight monitoring terms.",
    btnBack: "Back",
    btnContinueFlight: "Continue to Flight Details",
    btnContinuePax: "Continue to Passenger Info",
    btnContinueReview: "Review & Payment",
    btnSubmitting: "Processing Booking...",
    btnPayCard: "Proceed to Card Payment",
    btnConfirmCash: "Confirm Booking (Cash on Arrival)",
    btnRequestQuote: "Submit Transfer Request",
    errEnterName: "Please enter the lead passenger full name.",
    errValidEmail: "Please enter a valid email address for booking confirmation.",
    errValidPhone: "Please enter a valid telephone or WhatsApp number with country code.",
    errAcceptTerms: "Please accept the terms and conditions to complete your reservation.",
  },
  AZ: {
    step1Nav: "Marşrut və Nəqliyyat",
    step2Nav: "Uçuş Məlumatları",
    step3Nav: "Sərnişin Məlumatı",
    step4Nav: "Yoxlama və Ödəniş",
    step1Title: "Addım 1: Marşrut və Nəqliyyat Seçimi",
    step1Desc: "Hava limanını, hərəkət istiqamətini və avtomobil sinfini seçin.",
    transferDirection: "Transfer İstiqaməti",
    pickupAddressLabel: "Götürülmə Ünvanı / Otel",
    dropoffAddressLabel: "Təyinat Ünvanı / Otel",
    addressPlaceholder: "məs., Four Seasons Hotel Baku, Neftçilər pr. 1 / mənzil ünvanı",
    addressHelp: "Sürücümüz sizi birbaşa binanın girişinə və ya otel foyesinə çatdıracaq.",
    step2Title: "Addım 2: Uçuş Qrafiki",
    step2Desc: "Uçuşunuz geciksə belə sürücünün vaxtında qarşılaması üçün reys nömrənizi canlı izləyirik.",
    arrFlightInfo: "Gəliş Uçuş Məlumatı",
    depFlightInfo: "Gediş Uçuş Məlumatı",
    flightNumLabel: "Reys Nömrəsi *",
    flightNumPlaceholder: "məs. J2 076, TK 338, FZ 707, QR 353",
    flightTrackHint: "🛫 Hava yolu şirkətini avtomatik izləyir və sizi doğru terminalda (GYD Terminal 1 və ya 2) qarşılayırıq.",
    flightDateLabel: "Tarix *",
    flightTimeLabel: "Təxmini Vaxt *",
    retFlightInfo: "Qayıdış Uçuş Məlumatı",
    retFlightNumLabel: "Qayıdış Reys Nömrəsi *",
    retFlightDateLabel: "Qayıdış Tarixi *",
    retFlightTimeLabel: "Qayıdış Reys Vaxtı *",
    waitNoticeTitle: "Pulsuz Gözləmə Müddəti:",
    waitNoticeDesc: "Beynəlxalq reyslərdə təyyarə endiyi andan 60 dəqiqə, oteldən götürülmədə isə 15 dəqiqə pulsuz gözləmə daxildir.",
    step3Title: "Addım 3: Sərnişin Məlumatı",
    step3Desc: "Sürücü ilə əlaqə və rezervasiya qəbzi üçün əsas sərnişinin əlaqə məlumatlarını daxil edin.",
    leadPassengerLabel: "Əsas Sərnişinin Adı və Soyadı *",
    leadPassengerPlaceholder: "Xarici pasportda qeyd olunduğu kimi",
    nameSignHint: "Sürücü sizi bu ad yazılmış qarşılama lövhəsi ilə gözləyəcək.",
    paxCountLabel: "Sərnişin Sayı *",
    paxUnitSingle: "Sərnişin",
    paxUnitPlural: "Sərnişin",
    emailLabel: "E-poçt Ünvanı *",
    emailPlaceholder: "Rezervasiya təsdiqi və qəbz üçün",
    phoneLabel: "Telefon / WhatsApp Nömrəsi *",
    phonePlaceholder: "+994 55 100 31 46 (ölkə kodu ilə)",
    phoneHint: "Sürücü təyyarə enəndə zəng edəcək və ya WhatsApp-da yazacaq.",
    notesLabel: "Baqaj və Xüsusi İstəklər (İstəyə görə)",
    notesPlaceholder: "məs. 1 uşaq oturacağı lazımdır, böyük qolf çantası, əlil arabası və s.",
    step4Title: "Addım 4: Yoxlama və Ödəniş",
    step4Desc: "Transfer detallarınızı yoxlayın və uyğun ödəniş üsulunu seçin.",
    summaryTitle: "Transfer Marşrutu və Təfərrüatları",
    destZoneLabel: "Təyinat Zonası:",
    addressLabel: "Dəqiq Ünvan:",
    flightLabel: "Reys:",
    returnFlightLabel: "Qayıdış Reysi:",
    leadPaxLabel: "Əsas Sərnişin:",
    contactLabel: "Əlaqə:",
    notesLabelReview: "Xüsusi Qeydlər:",
    rateLabel: "Transfer Qiyməti",
    toBeQuoted: "Fərdi hesablanacaq",
    meetGreetFree: "Hava limanında qarşılama + 60 dəqiqə gözləmə",
    tollsFuelFree: "Yol ödənişləri, yanacaq və parkinq",
    includedFree: "Daxildir (0.00 $)",
    totalDue: "Cəmi Ödəniləcək:",
    allTaxesInc: "Bütün magistral və parkinq xərcləri daxildir",
    payriffDesc: "💳 Kartla ödənişlər Payriff vasitəsilə AR Mərkəzi Bankının rəsmi məzənnəsi ilə (1 USD = 1.70 AZN) təhlükəsiz həyata keçirilir. Çatanda nağd ödəniş AZN, USD və ya EUR ilə qəbul olunur.",
    payMethodLabel: "Ödəniş Üsulunu Seçin",
    payOnlineTitle: "Kartla Onlayn Ödəniş",
    payOnlineDesc: "Payriff (Visa / Mastercard) ilə dərhal təhlükəsiz ödəniş. 24 saat qalmışa qədər 100% pulsuz ləğvetmə.",
    payCashTitle: "Çatanda Nağd Ödəniş",
    payCashDesc: "Çatanda sürücüyə birbaşa nağd ödəyin. Qəbul olunur: AZN, USD və ya EUR.",
    termsCheckbox: "24 saatlıq pulsuz ləğvetmə və uçuş izləmə şərtləri daxil olmaqla transfer qaydaları ilə razıyam.",
    btnBack: "Geri",
    btnContinueFlight: "Uçuş Məlumatlarına Keç",
    btnContinuePax: "Sərnişin Məlumatlarına Keç",
    btnContinueReview: "Yoxlama və Ödənişə Keç",
    btnSubmitting: "Rezervasiya Rəsmiləşdirilir...",
    btnPayCard: "Kartla Ödənişə Keç",
    btnConfirmCash: "Rezervasiyanı Təsdiqlə (Nağd)",
    btnRequestQuote: "Sorğunu Göndər",
    errEnterName: "Zəhmət olmasa əsas sərnişinin ad və soyadını daxil edin.",
    errValidEmail: "Rezervasiya təsdiqi üçün düzgün e-poçt ünvanı daxil edin.",
    errValidPhone: "Ölkə kodu ilə birlikdə düzgün əlaqə və ya WhatsApp nömrəsi daxil edin.",
    errAcceptTerms: "Rezervasiyanı tamamlamaq üçün qaydalarla razılaşmalısınız.",
  },
  RU: {
    step1Nav: "Маршрут и Авто",
    step2Nav: "Детали рейса",
    step3Nav: "Пассажир",
    step4Nav: "Проверка и Оплата",
    step1Title: "Шаг 1: Выберите маршрут и автомобиль",
    step1Desc: "Укажите аэропорт, направление и желаемый класс автомобиля.",
    transferDirection: "Направление поездки",
    pickupAddressLabel: "Адрес посадки / Отель",
    dropoffAddressLabel: "Адрес высадки / Отель",
    addressPlaceholder: "например, Four Seasons Hotel Baku, пр. Нефтяников 1 / адрес апартаментов",
    addressHelp: "Водитель доставит вас прямо ко входу в здание или лобби отеля.",
    step2Title: "Шаг 2: Расписание рейса",
    step2Desc: "Мы отслеживаем рейс онлайн, чтобы водитель вовремя встретил вас даже при задержке самолета.",
    arrFlightInfo: "Информация о рейсе прилета",
    depFlightInfo: "Информация о рейсе вылета",
    flightNumLabel: "Номер рейса *",
    flightNumPlaceholder: "напр. J2 076, TK 338, FZ 707, SU 1854",
    flightTrackHint: "🛫 Мы отслеживаем авиакомпанию и встречаем вас в нужном терминале (Терминал 1 или 2 в GYD).",
    flightDateLabel: "Дата *",
    flightTimeLabel: "Расчетное время *",
    retFlightInfo: "Информация об обратном рейсе",
    retFlightNumLabel: "Номер обратного рейса *",
    retFlightDateLabel: "Дата вылета обратно *",
    retFlightTimeLabel: "Время вылета обратно *",
    waitNoticeTitle: "Бесплатное ожидание:",
    waitNoticeDesc: "60 минут бесплатного ожидания с момента посадки для международных рейсов. 15 минут при подаче к отелю.",
    step3Title: "Шаг 3: Контактные данные пассажира",
    step3Desc: "Укажите контакты основного пассажира для связи с водителем и получения ваучера бронирования.",
    leadPassengerLabel: "Имя и фамилия пассажира *",
    leadPassengerPlaceholder: "Как в загранпаспорте",
    nameSignHint: "С этой табличкой водитель будет встречать вас в зале прилета.",
    paxCountLabel: "Количество пассажиров *",
    paxUnitSingle: "Пассажир",
    paxUnitPlural: "Пассажиров",
    emailLabel: "Электронная почта *",
    emailPlaceholder: "Для квитанции и подтверждения брони",
    phoneLabel: "Телефон / WhatsApp *",
    phonePlaceholder: "+994 55 100 31 46 (с кодом страны)",
    phoneHint: "Водитель свяжется с вами в WhatsApp или позвонит после посадки.",
    notesLabel: "Багаж и особые пожелания (по желанию)",
    notesPlaceholder: "напр. детское автокресло, габаритный багаж, помощь с коляской и т.д.",
    step4Title: "Шаг 4: Проверка данных и оплата",
    step4Desc: "Проверьте детали поездки и выберите удобный способ оплаты.",
    summaryTitle: "Детали маршрута трансфера",
    destZoneLabel: "Зона назначения:",
    addressLabel: "Точный адрес:",
    flightLabel: "Рейс:",
    returnFlightLabel: "Обратный рейс:",
    leadPaxLabel: "Пассажир:",
    contactLabel: "Контакты:",
    notesLabelReview: "Пожелания:",
    rateLabel: "Стоимость трансфера",
    toBeQuoted: "По запросу",
    meetGreetFree: "Встреча с табличкой + 60 мин ожидания",
    tollsFuelFree: "Платные дороги, топливо и парковка",
    includedFree: "Включено (0.00 $)",
    totalDue: "Итого к оплате:",
    allTaxesInc: "Все дорожные сборы и парковка включены",
    payriffDesc: "💳 Оплата картой обрабатывается через сервис Payriff по официальному курсу ЦБ Азербайджана (1 USD = 1.70 AZN). Наличные при посадке принимаются в AZN, USD или EUR.",
    payMethodLabel: "Способ оплаты",
    payOnlineTitle: "Онлайн-оплата картой",
    payOnlineDesc: "Моментальная оплата Payriff (Visa / Mastercard). Полный возврат при отмене более чем за 24 часа.",
    payCashTitle: "Оплата наличными водителю",
    payCashDesc: "Оплата наличными водителю по прибытии. Принимаются: AZN, USD или EUR.",
    termsCheckbox: "Я согласен с правилами бронирования трансфера, включая бесплатную отмену за 24 часа и отслеживание рейса.",
    btnBack: "Назад",
    btnContinueFlight: "Далее к данным рейса",
    btnContinuePax: "Далее к данным пассажира",
    btnContinueReview: "Проверить и оплатить",
    btnSubmitting: "Оформление заказа...",
    btnPayCard: "Перейти к оплате картой",
    btnConfirmCash: "Подтвердить бронь (Оплата на месте)",
    btnRequestQuote: "Отправить запрос на трансфер",
    errEnterName: "Пожалуйста, укажите имя и фамилию основного пассажира.",
    errValidEmail: "Пожалуйста, введите корректный адрес электронной почты.",
    errValidPhone: "Пожалуйста, укажите номер телефона или WhatsApp с кодом страны.",
    errAcceptTerms: "Для оформления брони необходимо принять условия предоставления услуг.",
  },
  FR: {
    step1Nav: "Trajet & Véhicule",
    step2Nav: "Détails du Vol",
    step3Nav: "Passager",
    step4Nav: "Vérification & Paiement",
    step1Title: "Étape 1 : Choisissez le trajet et le véhicule",
    step1Desc: "Sélectionnez l'aéroport, la direction et la catégorie de véhicule souhaitée.",
    transferDirection: "Sens du transfert",
    pickupAddressLabel: "Hôtel / Adresse de prise en charge",
    dropoffAddressLabel: "Hôtel / Adresse de destination",
    addressPlaceholder: "ex. Four Seasons Hotel Baku, Neftchilar Ave 1 / adresse appartement",
    addressHelp: "Notre chauffeur vous déposera directement à l'entrée ou dans le hall de l'hôtel.",
    step2Title: "Étape 2 : Horaires de vol",
    step2Desc: "Nous suivons votre vol en temps réel pour garantir la présence du chauffeur même en cas de retard.",
    arrFlightInfo: "Informations du vol d'arrivée",
    depFlightInfo: "Informations du vol de départ",
    flightNumLabel: "Numéro de vol *",
    flightNumPlaceholder: "ex. J2 076, TK 338, FZ 707, AF 1234",
    flightTrackHint: "🛫 Suivi automatique de la compagnie et accueil au bon terminal (Terminal 1 ou 2 à GYD).",
    flightDateLabel: "Date *",
    flightTimeLabel: "Heure estimée *",
    retFlightInfo: "Informations du vol retour",
    retFlightNumLabel: "Numéro du vol retour *",
    retFlightDateLabel: "Date du retour *",
    retFlightTimeLabel: "Heure du vol retour *",
    waitNoticeTitle: "Attente gratuite incluse :",
    waitNoticeDesc: "60 minutes d'attente gratuite dès l'atterrissage pour les vols internationaux. 15 minutes pour les départs hôtel.",
    step3Title: "Étape 3 : Coordonnées du passager",
    step3Desc: "Coordonnées du passager principal pour la communication chauffeur et l'envoi du bon de transfert.",
    leadPassengerLabel: "Nom et prénom du passager principal *",
    leadPassengerPlaceholder: "Tel qu'indiqué sur le passeport",
    nameSignHint: "Le chauffeur tiendra une pancarte nominative avec ce nom.",
    paxCountLabel: "Nombre de passagers *",
    paxUnitSingle: "Passager",
    paxUnitPlural: "Passagers",
    emailLabel: "Adresse e-mail *",
    emailPlaceholder: "Pour la confirmation et le reçu",
    phoneLabel: "Numéro de téléphone / WhatsApp *",
    phonePlaceholder: "+994 55 100 31 46 (avec indicatif pays)",
    phoneHint: "Le chauffeur vous contactera dès votre atterrissage.",
    notesLabel: "Bagages & Demandes particulières (Facultatif)",
    notesPlaceholder: "ex. siège bébé nécessaire, sacs de golf, assistance fauteuil roulant, etc.",
    step4Title: "Étape 4 : Récapitulatif et Paiement",
    step4Desc: "Vérifiez les informations de votre trajet et sélectionnez votre mode de règlement.",
    summaryTitle: "Récapitulatif du transfert",
    destZoneLabel: "Zone de destination :",
    addressLabel: "Adresse exacte :",
    flightLabel: "Vol :",
    returnFlightLabel: "Vol retour :",
    leadPaxLabel: "Passager principal :",
    contactLabel: "Contact :",
    notesLabelReview: "Notes particulières :",
    rateLabel: "Tarif du transfert",
    toBeQuoted: "Sur devis",
    meetGreetFree: "Accueil nominatif + 60 min d'attente",
    tollsFuelFree: "Péages, carburant et stationnement",
    includedFree: "Inclus (0,00 $)",
    totalDue: "Total à régler :",
    allTaxesInc: "Péages d'autoroute et parkings inclus",
    payriffDesc: "💳 Paiements par carte sécurisés via Payriff au cours officiel de la Banque Centrale d'Azerbaïdjan (1 USD = 1,70 AZN). Espèces acceptées à l'arrivée en AZN, USD ou EUR.",
    payMethodLabel: "Mode de paiement",
    payOnlineTitle: "Paiement en ligne par carte",
    payOnlineDesc: "Paiement instantané par carte bancaire Payriff (Visa / Mastercard). Annulation gratuite jusqu'à 24h avant.",
    payCashTitle: "Paiement en espèces à l'arrivée",
    payCashDesc: "Réglez directement votre chauffeur en espèces à l'arrivée. Devises acceptées : AZN, USD ou EUR.",
    termsCheckbox: "J'accepte les conditions de réservation, incluant l'annulation gratuite jusqu'à 24h et le suivi de vol.",
    btnBack: "Retour",
    btnContinueFlight: "Continuer vers les infos de vol",
    btnContinuePax: "Continuer vers les coordonnées",
    btnContinueReview: "Vérification & Paiement",
    btnSubmitting: "Enregistrement en cours...",
    btnPayCard: "Procéder au paiement par carte",
    btnConfirmCash: "Confirmer la réservation (Espèces)",
    btnRequestQuote: "Envoyer la demande de transfert",
    errEnterName: "Veuillez renseigner le nom complet du passager principal.",
    errValidEmail: "Veuillez indiquer une adresse e-mail valide.",
    errValidPhone: "Veuillez indiquer un numéro de téléphone ou WhatsApp valide avec l'indicatif pays.",
    errAcceptTerms: "Veuillez accepter les conditions générales pour finaliser votre réservation.",
  },
  AR: {
    step1Nav: "المسار والسيارة",
    step2Nav: "بيانات الرحلة",
    step3Nav: "بيانات المسافر",
    step4Nav: "المراجعة والدفع",
    step1Title: "الخطوة 1: اختر المسار ونوع السيارة",
    step1Desc: "حدد المطار، واتجاه الرحلة، وفئة السيارة المفضلة لديك.",
    transferDirection: "اتجاه التوصيل",
    pickupAddressLabel: "عنوان أو فندق المغادرة / التوصيل",
    dropoffAddressLabel: "عنوان أو فندق الوصول / الوجهة",
    addressPlaceholder: "مثال: فندق فور سيزونز باكو، شارع نفتشيلار 1 / عنوان الشقة",
    addressHelp: "سيوصلك سائقنا مباشرة إلى بوابة المبنى أو بهو الفندق.",
    step2Title: "الخطوة 2: جدول الرحلة الجوية",
    step2Desc: "نتتبع رحلتك مباشرة حتى يكون السائق بانتظارك في الوقت الدقيق حتى لو تأخرت الطائرة.",
    arrFlightInfo: "معلومات رحلة الوصول (الهبوط)",
    depFlightInfo: "معلومات رحلة المغادرة (الإقلاع)",
    flightNumLabel: "رقم الرحلة الجوية *",
    flightNumPlaceholder: "مثال: J2 076, TK 338, FZ 707, QR 353",
    flightTrackHint: "🛫 نتابع موعد الطيران تلقائياً ونستقبلك بالصالة الصحيحة (صالة 1 أو 2 بمطار حيدر علييف).",
    flightDateLabel: "التاريخ *",
    flightTimeLabel: "الوقت المتوقع *",
    retFlightInfo: "معلومات رحلة العودة",
    retFlightNumLabel: "رقم رحلة العودة *",
    retFlightDateLabel: "تاريخ العودة *",
    retFlightTimeLabel: "وقت رحلة العودة *",
    waitNoticeTitle: "فترة انتظار مجانية:",
    waitNoticeDesc: "60 دقيقة انتظار مجانية بالكامل من موعد هبوط الرحلات الدولية. 15 دقيقة للتوصيل من الفنادق.",
    step3Title: "الخطوة 3: بيانات المسافر",
    step3Desc: "يرجى تزويدنا ببيانات المسافر الرئيسي للتواصل مع السائق وإصدار إيصال الحجز.",
    leadPassengerLabel: "الاسم الكامل للمسافر الرئيسي *",
    leadPassengerPlaceholder: "كما هو مكتوب في جواز السفر",
    nameSignHint: "سيحمل السائق لافتة ترحيبية مكتوب عليها هذا الاسم.",
    paxCountLabel: "عدد المسافرين *",
    paxUnitSingle: "مسافر",
    paxUnitPlural: "مسافرين",
    emailLabel: "البريد الإلكتروني *",
    emailPlaceholder: "لإرسال تأكيد الحجز والفاتورة",
    phoneLabel: "رقم الهاتف / واتساب *",
    phonePlaceholder: "+994 55 100 31 46 (مع الرمز الدولي)",
    phoneHint: "سيتواصل معك السائق عبر واتساب أو الاتصال فور هبوط الطائرة.",
    notesLabel: "الأمتعة وملاحظات إضافية (اختياري)",
    notesPlaceholder: "مثال: مقعد أطفال، حقائب جولف كبيرة، كرسي متحرك، إلخ.",
    step4Title: "الخطوة 4: مراجعة الحجز والدفع",
    step4Desc: "تأكد من صحة تفاصيل رحلتك واختر وسيلة الدفع المفضلة لديك.",
    summaryTitle: "ملخص مسار التوصيل",
    destZoneLabel: "منطقة الوجهة:",
    addressLabel: "العنوان المحدد:",
    flightLabel: "الرحلة الجوية:",
    returnFlightLabel: "رحلة العودة:",
    leadPaxLabel: "المسافر الرئيسي:",
    contactLabel: "بيانات الاتصال:",
    notesLabelReview: "ملاحظات إضافية:",
    rateLabel: "سعر التوصيل",
    toBeQuoted: "حسب الطلب",
    meetGreetFree: "الاستقبال بلافتة الاسم + 60 دقيقة انتظار",
    tollsFuelFree: "رسوم الطرق والوقود ومواقف المطار",
    includedFree: "مشمول (0.00 $)",
    totalDue: "المبلغ الإجمالي المستحق:",
    allTaxesInc: "جميع رسوم الطرق والمواقف والضرائب مشمولة",
    payriffDesc: "💳 يتم الدفع الإلكتروني بأمان عبر Payriff وفق السعر الرسمي للبنك المركزي الأذربيجاني (1 دولار = 1.70 مانات). الدفع نقداً عند الوصول متاح بالمانات أو الدولار أو اليورو.",
    payMethodLabel: "اختر وسيلة الدفع",
    payOnlineTitle: "دفع إلكتروني بالبطاقة البنكية",
    payOnlineDesc: "دفع آمن وفوري عبر Payriff (فيزا / ماستركارد). استرداد كامل عند الإلغاء قبل 24 ساعة.",
    payCashTitle: "دفع نقداً للسائق عند الوصول",
    payCashDesc: "ادفع مباشرة للسائق عند الوصول بالمانات الأذربيجاني أو الدولار الأمريكي أو اليورو.",
    termsCheckbox: "أوافق على سياسة حجز التوصيل، بما في ذلك الإلغاء المجاني قبل 24 ساعة وشروط تتبع الرحلة.",
    btnBack: "رجوع",
    btnContinueFlight: "المتابعة إلى بيانات الرحلة",
    btnContinuePax: "المتابعة إلى بيانات المسافر",
    btnContinueReview: "المتابعة إلى المراجعة والدفع",
    btnSubmitting: "جارٍ تأكيد وحفظ الحجز...",
    btnPayCard: "المتابعة إلى الدفع بالبطاقة",
    btnConfirmCash: "تأكيد الحجز (الدفع نقداً عند الوصول)",
    btnRequestQuote: "إرسال طلب التوصيل",
    errEnterName: "يرجى إدخال الاسم الكامل للمسافر الرئيسي.",
    errValidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح لتأكيد الحجز.",
    errValidPhone: "يرجى إدخال رقم هاتف أو واتساب صحيح مع الرمز الدولي.",
    errAcceptTerms: "يرجى الموافقة على الشروط والأحكام لإتمام حجز التوصيل.",
  },
  DE: {
    step1Nav: "Route & Fahrzeug",
    step2Nav: "Flugdaten",
    step3Nav: "Passagier",
    step4Nav: "Prüfung & Zahlung",
    step1Title: "Schritt 1: Route & Fahrzeugklasse wählen",
    step1Desc: "Wählen Sie Flughafen, Fahrtrichtung und die gewünschte Fahrzeugklasse.",
    transferDirection: "Fahrtrichtung",
    pickupAddressLabel: "Abholadresse / Hotel",
    dropoffAddressLabel: "Zieladresse / Hotel",
    addressPlaceholder: "z.B. Four Seasons Hotel Baku, Neftchilar Ave 1 / Apartment-Adresse",
    addressHelp: "Unser Chauffeur bringt Sie direkt vor den Haupteingang oder in die Hotellobby.",
    step2Title: "Schritt 2: Flugdaten & Zeiten",
    step2Desc: "Wir überwachen Ihren Flug live, damit Ihr Fahrer auch bei Flugverspätungen pünktlich bereitsteht.",
    arrFlightInfo: "Angaben zum Ankunftsflug",
    depFlightInfo: "Angaben zum Abflug",
    flightNumLabel: "Flugnummer *",
    flightNumPlaceholder: "z.B. J2 076, TK 338, LH 1234, QR 353",
    flightTrackHint: "🛫 Automatische Flugüberwachung und Empfang im richtigen Terminal (Terminal 1 oder 2 am GYD).",
    flightDateLabel: "Datum *",
    flightTimeLabel: "Voraussichtliche Zeit *",
    retFlightInfo: "Angaben zum Rückflug",
    retFlightNumLabel: "Rückflugnummer *",
    retFlightDateLabel: "Rückflugdatum *",
    retFlightTimeLabel: "Rückflugzeit *",
    waitNoticeTitle: "Kostenlose Wartezeit:",
    waitNoticeDesc: "60 Minuten kostenlose Wartezeit ab Touchdown für internationale Flüge. 15 Minuten bei Hotelabholung.",
    step3Title: "Schritt 3: Passagierdaten",
    step3Desc: "Kontaktdaten des Hauptreisenden für Fahrerkommunikation und Buchungsbeleg.",
    leadPassengerLabel: "Vollständiger Name des Hauptreisenden *",
    leadPassengerPlaceholder: "Wie im Reisepass angegeben",
    nameSignHint: "Ihr Chauffeur erwartet Sie mit diesem Namen auf dem Abhol-Schild.",
    paxCountLabel: "Anzahl Passagiere *",
    paxUnitSingle: "Passagier",
    paxUnitPlural: "Passagiere",
    emailLabel: "E-Mail-Adresse *",
    emailPlaceholder: "Für Buchungsbestätigung und Beleg",
    phoneLabel: "Telefon / WhatsApp-Nummer *",
    phonePlaceholder: "+994 55 100 31 46 (mit Ländervorwahl)",
    phoneHint: "Ihr Fahrer kontaktiert Sie per WhatsApp oder Anruf nach der Landung.",
    notesLabel: "Gepäck & Sonderwünsche (Optional)",
    notesPlaceholder: "z.B. Kindersitz benötigt, Golfgepäck, Rollstuhlunterstützung usw.",
    step4Title: "Schritt 4: Buchungsübersicht & Bezahlung",
    step4Desc: "Überprüfen Sie Ihre Transferdaten und wählen Sie Ihre bevorzugte Zahlungsart.",
    summaryTitle: "Transferroute & Details",
    destZoneLabel: "Zielzone:",
    addressLabel: "Genaue Adresse:",
    flightLabel: "Flug:",
    returnFlightLabel: "Rückflug:",
    leadPaxLabel: "Hauptreisender:",
    contactLabel: "Kontakt:",
    notesLabelReview: "Besondere Hinweise:",
    rateLabel: "Transferpreis",
    toBeQuoted: "Auf Anfrage",
    meetGreetFree: "Persönlicher Empfang mit Schild + 60 Min Wartezeit",
    tollsFuelFree: "Mautgebühren, Treibstoff und Parkplatz",
    includedFree: "Inklusive (0,00 $)",
    totalDue: "Gesamtbetrag:",
    allTaxesInc: "Alle Mautgebühren, Steuern und Parkkosten inklusive",
    payriffDesc: "💳 Kartenzahlungen werden sicher über Payriff zum offiziellen Kurs der Zentralbank Aserbaidschans (1 USD = 1,70 AZN) abgewickelt. Barzahlung bei Ankunft in AZN, USD oder EUR möglich.",
    payMethodLabel: "Zahlungsart wählen",
    payOnlineTitle: "Online per Karte zahlen",
    payOnlineDesc: "Sofortige Kartenzahlung via Payriff (Visa / Mastercard). Volle Rückerstattung bei Stornierung bis 24 Std. vorher.",
    payCashTitle: "Barzahlung bei Ankunft",
    payCashDesc: "Zahlen Sie bei Ankunft direkt bar beim Chauffeur. Akzeptiert: AZN, USD oder EUR.",
    termsCheckbox: "Ich akzeptiere die Buchungsbedingungen, einschließlich der 24-stündigen kostenfreien Stornierung und Flugüberwachung.",
    btnBack: "Zurück",
    btnContinueFlight: "Weiter zu den Flugdaten",
    btnContinuePax: "Weiter zu den Passagierdaten",
    btnContinueReview: "Weiter zur Buchungsprüfung",
    btnSubmitting: "Buchung wird verarbeitet...",
    btnPayCard: "Weiter zur Kartenzahlung",
    btnConfirmCash: "Transfer verbindlich buchen (Barzahlung)",
    btnRequestQuote: "Transferanfrage absenden",
    errEnterName: "Bitte geben Sie den vollständigen Namen des Hauptreisenden ein.",
    errValidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    errValidPhone: "Bitte geben Sie eine gültige Telefon- oder WhatsApp-Nummer mit Ländervorwahl ein.",
    errAcceptTerms: "Bitte akzeptieren Sie die Geschäftsbedingungen, um die Buchung abzuschließen.",
  },
};

export interface TransferTrackTranslations {
  trackTitle: string;
  trackSubtitle: string;
  searchPlaceholder: string;
  emailPlaceholder: string;
  enterEmailPrompt: string;
  trackBtn: string;
  successPaidTitle: string;
  successPaidDesc: string;
  successPendingTitle: string;
  successPendingDesc: string;
  refLabel: string;
  statusConfirmed: string;
  statusInProgress: string;
  statusCompleted: string;
  statusCancelled: string;
  statusPending: string;
  chauffeurTitle: string;
  driverPendingTitle: string;
  driverPendingDesc: string;
  callDriver: string;
  whatsApp: string;
  routeTitle: string;
  flightTitle: string;
  directionLabel: string;
  airportLabel: string;
  zoneLabel: string;
  addressLabel: string;
  vehicleLabel: string;
  flightNumLabel: string;
  dateTimeLabel: string;
  returnFlightLabel: string;
  passengerLabel: string;
  paymentLabel: string;
  paidOnline: string;
  payCash: string;
  printVoucher: string;
  supportWhatsApp: string;
  bookAnother: string;
  loading: string;
  notFound: string;
}

export const TRANSFER_TRACK_TRANSLATIONS: Record<string, TransferTrackTranslations> = {
  EN: {
    trackTitle: "Track Your Airport Transfer",
    trackSubtitle: "Enter your booking reference number and customer email address to view real-time transfer details.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "passenger@email.com",
    enterEmailPrompt: "Please enter your booking email address to verify your identity.",
    trackBtn: "Track",
    successPaidTitle: "Payment Successful & Transfer Confirmed!",
    successPaidDesc: "Your transaction was approved via Payriff. Our dispatch team has received your transfer.",
    successPendingTitle: "Transfer Reservation Received!",
    successPendingDesc: "We have received your reservation. Driver contact details will be shared prior to your flight.",
    refLabel: "Booking Reference",
    statusConfirmed: "Confirmed — Driver Assigned",
    statusInProgress: "In Progress — En Route",
    statusCompleted: "Completed",
    statusCancelled: "Cancelled",
    statusPending: "Booking Received — Assigning Driver",
    chauffeurTitle: "Assigned Chauffeur & Vehicle",
    driverPendingTitle: "Driver Assignment:",
    driverPendingDesc: "Your driver and vehicle license plate details will be assigned and texted/messaged to your WhatsApp before pickup.",
    callDriver: "Call Driver",
    whatsApp: "WhatsApp",
    routeTitle: "Route & Vehicle",
    flightTitle: "Flight & Passenger",
    directionLabel: "Direction:",
    airportLabel: "Airport:",
    zoneLabel: "Zone / Destination:",
    addressLabel: "Address:",
    vehicleLabel: "Vehicle Class:",
    flightNumLabel: "Flight Number:",
    dateTimeLabel: "Date & Time:",
    returnFlightLabel: "Return Flight:",
    passengerLabel: "Lead Passenger:",
    paymentLabel: "Payment:",
    paidOnline: "Paid Online",
    payCash: "Pay on Arrival (Cash)",
    printVoucher: "Print Booking Voucher",
    supportWhatsApp: "Ops WhatsApp Support",
    bookAnother: "Book Another",
    loading: "Loading tracking details...",
    notFound: "No booking found matching that reference and email address.",
  },
  AZ: {
    trackTitle: "Hava Limanı Transferinizi İzləyin",
    trackSubtitle: "Canlı transfer statusunu görmək üçün rezervasiya nömrənizi və e-poçt ünvanınızı daxil edin.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "email@unvaniniz.com",
    enterEmailPrompt: "Təhlükəsizlik üçün rezervasiya zamanı istifadə edilən e-poçt ünvanını daxil edin.",
    trackBtn: "Axtar",
    successPaidTitle: "Ödəniş Uğurlu Oldu və Transfer Təsdiqləndi!",
    successPaidDesc: "Əməliyyat Payriff vasitəsilə təsdiqləndi. Dispetçer komandamız sifarişinizi qəbul etdi.",
    successPendingTitle: "Transfer Rezervasiyası Qəbul Edildi!",
    successPendingDesc: "Rezervasiyanız qeydə alındı. Sürücünün əlaqə məlumatları uçuşdan öncə göndəriləcək.",
    refLabel: "Rezervasiya Kodu",
    statusConfirmed: "Təsdiqləndi — Sürücü Təyin Edildi",
    statusInProgress: "İcrada — Yoldadır",
    statusCompleted: "Tamamlandı",
    statusCancelled: "Ləğv edildi",
    statusPending: "Qəbul edildi — Sürücü Təyin Olunur",
    chauffeurTitle: "Təyin Edilmiş Sürücü və Avtomobil",
    driverPendingTitle: "Sürücü Təyinatı:",
    driverPendingDesc: "Sürücü adı və avtomobilin dövlət nömrə nişanı qarşılamadan əvvəl WhatsApp-a göndəriləcək.",
    callDriver: "Sürücüyə Zəng Et",
    whatsApp: "WhatsApp",
    routeTitle: "Marşrut və Nəqliyyat",
    flightTitle: "Uçuş və Sərnişin",
    directionLabel: "İstiqamət:",
    airportLabel: "Hava Limanı:",
    zoneLabel: "Zona / Təyinat:",
    addressLabel: "Ünvan:",
    vehicleLabel: "Avtomobil Sinfi:",
    flightNumLabel: "Reys Nömrəsi:",
    dateTimeLabel: "Tarix və Saat:",
    returnFlightLabel: "Qayıdış Reysi:",
    passengerLabel: "Əsas Sərnişin:",
    paymentLabel: "Ödəniş:",
    paidOnline: "Onlayn Ödənilib",
    payCash: "Çatanda Nağd Ödəniş",
    printVoucher: "Vauçeri Çap Et",
    supportWhatsApp: "Dispetçer Dəstəyi (WhatsApp)",
    bookAnother: "Yeni Transfer Sifariş Et",
    loading: "Məlumatlar yüklənir...",
    notFound: "Bu nömrə və e-poçt ilə rezervasiya tapılmadı.",
  },
  RU: {
    trackTitle: "Отслеживание трансфера",
    trackSubtitle: "Введите номер бронирования и вашу электронную почту для просмотра деталей трансфера.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "email@domain.com",
    enterEmailPrompt: "Пожалуйста, введите ваш email для проверки доступа.",
    trackBtn: "Найти",
    successPaidTitle: "Оплата прошла успешно! Трансфер подтвержден",
    successPaidDesc: "Транзакция одобрена Payriff. Наша диспетчерская служба приняла ваш заказ в работу.",
    successPendingTitle: "Заявка на трансфер принята!",
    successPendingDesc: "Мы получили ваше бронирование. Контакты водителя будут отправлены до вашего вылета.",
    refLabel: "Номер бронирования",
    statusConfirmed: "Подтверждено — Водитель назначен",
    statusInProgress: "В пути",
    statusCompleted: "Завершено",
    statusCancelled: "Отменено",
    statusPending: "Принято — Назначение водителя",
    chauffeurTitle: "Назначенный водитель и автомобиль",
    driverPendingTitle: "Назначение водителя:",
    driverPendingDesc: "Контакты водителя и госномер автомобиля будут отправлены вам в WhatsApp перед вылетом.",
    callDriver: "Позвонить водителю",
    whatsApp: "WhatsApp",
    routeTitle: "Маршрут и автомобиль",
    flightTitle: "Рейс и пассажир",
    directionLabel: "Направление:",
    airportLabel: "Аэропорт:",
    zoneLabel: "Зона назначения:",
    addressLabel: "Адрес:",
    vehicleLabel: "Класс авто:",
    flightNumLabel: "Номер рейса:",
    dateTimeLabel: "Дата и время:",
    returnFlightLabel: "Обратный рейс:",
    passengerLabel: "Пассажир:",
    paymentLabel: "Оплата:",
    paidOnline: "Оплачено онлайн",
    payCash: "Оплата наличными на месте",
    printVoucher: "Распечатать ваучер",
    supportWhatsApp: "Диспетчер в WhatsApp",
    bookAnother: "Забронировать еще",
    loading: "Загрузка информации...",
    notFound: "Бронирование с таким номером и email не найдено.",
  },
  FR: {
    trackTitle: "Suivre votre transfert aéroport",
    trackSubtitle: "Entrez votre référence de réservation et votre adresse e-mail pour accéder aux détails.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "votre@email.com",
    enterEmailPrompt: "Veuillez saisir votre adresse e-mail pour confirmer votre identité.",
    trackBtn: "Rechercher",
    successPaidTitle: "Paiement réussi & Transfert confirmé !",
    successPaidDesc: "Votre transaction a été validée via Payriff. Notre équipe régulation a pris en charge votre transfert.",
    successPendingTitle: "Réservation de transfert enregistrée !",
    successPendingDesc: "Nous avons bien reçu votre demande. Les coordonnées du chauffeur vous seront envoyées avant le vol.",
    refLabel: "Référence de réservation",
    statusConfirmed: "Confirmé — Chauffeur assigné",
    statusInProgress: "En cours — Chauffeur en route",
    statusCompleted: "Terminé",
    statusCancelled: "Annulé",
    statusPending: "Reçu — Attribution du chauffeur",
    chauffeurTitle: "Chauffeur & Véhicule assignés",
    driverPendingTitle: "Attribution du chauffeur :",
    driverPendingDesc: "Le nom du chauffeur et l'immatriculation du véhicule vous seront envoyés par WhatsApp avant la prise en charge.",
    callDriver: "Appeler le chauffeur",
    whatsApp: "WhatsApp",
    routeTitle: "Trajet & Véhicule",
    flightTitle: "Vol & Passager",
    directionLabel: "Direction :",
    airportLabel: "Aéroport :",
    zoneLabel: "Zone / Destination :",
    addressLabel: "Adresse :",
    vehicleLabel: "Catégorie :",
    flightNumLabel: "Numéro de vol :",
    dateTimeLabel: "Date et heure :",
    returnFlightLabel: "Vol retour :",
    passengerLabel: "Passager principal :",
    paymentLabel: "Paiement :",
    paidOnline: "Payé en ligne",
    payCash: "Espèces à l'arrivée",
    printVoucher: "Imprimer le bon de transfert",
    supportWhatsApp: "Support WhatsApp 24/7",
    bookAnother: "Réserver un autre transfert",
    loading: "Chargement des détails...",
    notFound: "Aucune réservation trouvée avec cette référence et cette adresse e-mail.",
  },
  AR: {
    trackTitle: "تتبع حجز توصيل المطار",
    trackSubtitle: "أدخل رقم الحجز المرجعي وعنوان بريدك الإلكتروني لعرض تفاصيل حجزك بأمان.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "name@domain.com",
    enterEmailPrompt: "يرجى إدخال عنوان البريد الإلكتروني للتحقق من هويتك.",
    trackBtn: "تتبع",
    successPaidTitle: "تم الدفع بنجاح وتأكيد التوصيل!",
    successPaidDesc: "تم اعتماد المعاملة عبر Payriff بنجاح. استلم فريق التشغيل لدينا بيانات توصيلك.",
    successPendingTitle: "تم استلام حجز التوصيل بنجاح!",
    successPendingDesc: "تم تسجيل حجزك بنجاح. سنزودك ببيانات السائق كاملة قبل موعد إقلاع رحلتك.",
    refLabel: "رقم الحجز المرجعي",
    statusConfirmed: "مؤكد — تم تعيين السائق",
    statusInProgress: "قيد التنفيذ — السائق في الطريق",
    statusCompleted: "مكتمل",
    statusCancelled: "ملغي",
    statusPending: "تم الاستلام — جاري تعيين السائق",
    chauffeurTitle: "بيانات السائق والسيارة المخصصة",
    driverPendingTitle: "تعيين السائق:",
    driverPendingDesc: "سيتم تعيين السائق ورقم لوحة السيارة وإرسالها لك مباشرة عبر واتساب قبل موعد الوصول.",
    callDriver: "اتصال بالسائق",
    whatsApp: "واتساب",
    routeTitle: "المسار ونوع السيارة",
    flightTitle: "بيانات الطيران والمسافر",
    directionLabel: "اتجاه الرحلة:",
    airportLabel: "المطار:",
    zoneLabel: "المنطقة / الوجهة:",
    addressLabel: "العنوان:",
    vehicleLabel: "فئة السيارة:",
    flightNumLabel: "رقم الرحلة:",
    dateTimeLabel: "التاريخ والوقت:",
    returnFlightLabel: "رحلة العودة:",
    passengerLabel: "المسافر الرئيسي:",
    paymentLabel: "طريقة الدفع:",
    paidOnline: "تم الدفع إلكترونياً",
    payCash: "دفع نقداً عند الوصول",
    printVoucher: "طباعة إيصال الحجز",
    supportWhatsApp: "دعم العمليات عبر واتساب",
    bookAnother: "حجز توصيل آخر",
    loading: "جارٍ تحميل بيانات الحجز...",
    notFound: "لم يتم العثور على أي حجز بهذا الرقم المرجعي والبريد الإلكتروني.",
  },
  DE: {
    trackTitle: "Flughafentransfer verfolgen",
    trackSubtitle: "Geben Sie Ihre Buchungsnummer und Ihre E-Mail-Adresse ein, um Transferdetails sicher abzurufen.",
    searchPlaceholder: "ATR-XXXXXX",
    emailPlaceholder: "name@domain.de",
    enterEmailPrompt: "Bitte geben Sie Ihre Buchungs-E-Mail-Adresse ein, um Ihre Identität zu bestätigen.",
    trackBtn: "Suchen",
    successPaidTitle: "Zahlung erfolgreich & Transfer bestätigt!",
    successPaidDesc: "Ihre Zahlung via Payriff wurde bestätigt. Unsere Disposition hat Ihren Auftrag übernommen.",
    successPendingTitle: "Transferbuchung erfolgreich eingegangen!",
    successPendingDesc: "Wir haben Ihre Reservierung erhalten. Fahrerdaten werden Ihnen vor Ihrem Flug mitgeteilt.",
    refLabel: "Buchungsnummer",
    statusConfirmed: "Bestätigt — Chauffeur zugewiesen",
    statusInProgress: "In Ausführung — Chauffeur unterwegs",
    statusCompleted: "Abgeschlossen",
    statusCancelled: "Storniert",
    statusPending: "Eingegangen — Zuweisung in Bearbeitung",
    chauffeurTitle: "Zugewiesener Chauffeur & Fahrzeug",
    driverPendingTitle: "Fahrerzuteilung:",
    driverPendingDesc: "Fahrername und Kennzeichen werden Ihnen vor der Abholung per WhatsApp und SMS übermittelt.",
    callDriver: "Fahrer anrufen",
    whatsApp: "WhatsApp",
    routeTitle: "Route & Fahrzeug",
    flightTitle: "Flug & Passagier",
    directionLabel: "Fahrtrichtung:",
    airportLabel: "Flughafen:",
    zoneLabel: "Zone / Zielort:",
    addressLabel: "Adresse:",
    vehicleLabel: "Fahrzeugklasse:",
    flightNumLabel: "Flugnummer:",
    dateTimeLabel: "Datum & Uhrzeit:",
    returnFlightLabel: "Rückflug:",
    passengerLabel: "Hauptreisender:",
    paymentLabel: "Zahlung:",
    paidOnline: "Online bezahlt",
    payCash: "Barzahlung bei Ankunft",
    printVoucher: "Buchungsbeleg drucken",
    supportWhatsApp: "WhatsApp-Disposition 24/7",
    bookAnother: "Weiteren Transfer buchen",
    loading: "Trackingdaten werden geladen...",
    notFound: "Keine Buchung mit dieser Buchungsnummer und E-Mail-Adresse gefunden.",
  },
};


