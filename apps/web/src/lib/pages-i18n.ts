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

