import type { LanguageCode } from "../../i18n";

export interface LocalizedVehicleItem {
  name: string;
  capacity: string;
  desc: string;
}

export interface LocalizedHotelTier {
  name: string;
  desc: string;
}

export interface LocalizedDestinationItem {
  name: string;
  tag: string;
  desc: string;
}

export interface ItineraryTranslations {
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  stepLabels: [string, string, string, string];
  step1Title: string;
  step1Subtitle: string;
  durationLabel: string;
  startDateLabel: string;
  adultsLabel: string;
  childrenLabel: string;
  btnContinueDestinations: string;
  step2Title: string;
  step2Subtitle: string;
  selectedBadge: string;
  btnContinueHotels: string;
  btnBack: string;
  step3Title: string;
  step3Subtitle: string;
  hotelCategoryLabel: string;
  vehicleCategoryLabel: string;
  bespokeBannerBadge: string;
  bespokeBannerTitle: string;
  bespokeBannerDesc: string;
  btnWhatsAppProposal: string;
  btnContinueReview: string;
  step4Title: string;
  step4Subtitle: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  specialRequestsLabel: string;
  notesPlaceholder: string;
  btnSubmitInquiry: string;
  submittingText: string;
  summaryDuration: string;
  summaryHotel: string;
  summaryVehicle: string;
  successRef: string;
  successTitle: string;
  successDescTemplate: string;
  successDurationLabel: string;
  successHotelLabel: string;
  successChauffeurLabel: string;
  successQuotationLabel: string;
  successQuotationValue: string;
  btnViewVoucher: string;
  btnChatWhatsApp: string;
  btnReturnHome: string;
  vehicles: {
    sedan: LocalizedVehicleItem;
    suv: LocalizedVehicleItem;
    vclass: LocalizedVehicleItem;
    sprinter: LocalizedVehicleItem;
  };
  hotelTiers: {
    boutique_3: LocalizedHotelTier;
    comfort_4: LocalizedHotelTier;
    luxury_5: LocalizedHotelTier;
  };
  destinations: Record<string, LocalizedDestinationItem>;
}

export const ITINERARY_PAGE_TRANSLATIONS: Record<LanguageCode, ItineraryTranslations> = {
  EN: {
    badge: "100% TAILORED PRIVATE JOURNEYS",
    heroTitle: "Design Your Dream",
    heroHighlight: "Caucasus Itinerary",
    heroSubtitle: "Choose your days, preferred destinations, luxury hotels, and private chauffeur. Get a handcrafted bespoke proposal within 30 minutes.",
    stepLabels: ["Dates & Group", "Destinations", "Hotels & Transport", "Instant Proposal"],
    step1Title: "1. Trip Duration & Travelers",
    step1Subtitle: "Select your planned travel dates and group size.",
    durationLabel: "Trip Duration (Days)",
    startDateLabel: "Arrival / Start Date",
    adultsLabel: "Adults (12+ yrs)",
    childrenLabel: "Children (0-11 yrs)",
    btnContinueDestinations: "Continue to Destinations",
    step2Title: "2. Select Destinations & Highlights",
    step2Subtitle: "Choose regions you wish to explore during your trip.",
    selectedBadge: "Selected",
    btnContinueHotels: "Continue to Hotels & Vehicles",
    btnBack: "Back",
    step3Title: "3. Choose Accommodation & Vehicle Standard",
    step3Subtitle: "Customize your stay comfort and private transport style.",
    hotelCategoryLabel: "🏨 Accommodation Category",
    vehicleCategoryLabel: "🚗 Private Chauffeur Vehicle",
    bespokeBannerBadge: "100% Bespoke Pricing on Request",
    bespokeBannerTitle: "Handcrafted Tour Proposal",
    bespokeBannerDesc: "Every Azerbaijan itinerary is tailored to your preferences. Our local travel specialists verify real-time hotel rates and room availability to provide an exact transparent proposal within 30 minutes.",
    btnWhatsAppProposal: "Instant WhatsApp Proposal",
    btnContinueReview: "Continue to Review & Submit",
    step4Title: "4. Review & Request Proposal",
    step4Subtitle: "Our Baku travel concierge will send a personalized itemized quotation within 30 minutes.",
    contactNameLabel: "Full Name *",
    contactEmailLabel: "Email Address *",
    contactPhoneLabel: "WhatsApp Phone Number *",
    specialRequestsLabel: "Receive Full Day-by-Day Proposal & Hotel Vouchers",
    notesPlaceholder: "Optional: Dietary preferences, children's ages, flight times, or specific sites you'd like to include...",
    btnSubmitInquiry: "Submit Bespoke Request",
    submittingText: "Sending Request...",
    summaryDuration: "Days",
    summaryHotel: "Hotel Standard",
    summaryVehicle: "Private Vehicle",
    successRef: "Reference",
    successTitle: "Bespoke Proposal Requested!",
    successDescTemplate: "Thank you, {name}! Our senior Azerbaijan itinerary planner has received your {days}-day custom tour request. We will message you on WhatsApp ({phone}) within 30 minutes.",
    successDurationLabel: "Trip Duration:",
    successHotelLabel: "Hotel Tier:",
    successChauffeurLabel: "Chauffeur:",
    successQuotationLabel: "Quotation:",
    successQuotationValue: "Custom Quote on Request (In Review)",
    btnViewVoucher: "View & Print Itinerary Confirmation Voucher",
    btnChatWhatsApp: "Chat Directly with Concierge on WhatsApp",
    btnReturnHome: "Return to Homepage",
    vehicles: {
      sedan: {
        name: "Comfort Sedan",
        capacity: "1–3 Passengers",
        desc: "Sleek executive comfort with climate control and luggage hold for couples or solo travelers.",
      },
      suv: {
        name: "4x4 SUV",
        capacity: "1–4 Passengers",
        desc: "High-clearance all-wheel drive vehicle designed for mountain passes and rugged highlands.",
      },
      vclass: {
        name: "VIP Minivan",
        capacity: "4–7 Passengers",
        desc: "Spacious executive captain seats, dual AC, and generous luggage hold for families and small groups.",
      },
      sprinter: {
        name: "Executive Minibus",
        capacity: "8–16 Passengers",
        desc: "Spacious luxury coach with panoramic windows for extended families and group delegations.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "Heritage Boutique & 3-Star Comfort",
        desc: "Charming traditional hotels located inside historic Old City quarters.",
      },
      comfort_4: {
        name: "4-Star Deluxe Comfort (Most Popular)",
        desc: "Modern premium hotels with scenic city/mountain views and full buffet breakfast.",
      },
      luxury_5: {
        name: "5-Star VIP Luxury & Presidential Suites",
        desc: "World-class luxury properties with private concierge and premier wellness facilities.",
      },
    },
    destinations: {
      baku_city: {
        name: "Baku Old City & Modern Marvels",
        tag: "Cultural & UNESCO",
        desc: "12th-century Maiden Tower, Shirvanshahs Palace, Zaha Hadid Center & Flame Towers.",
      },
      gabala_highlands: {
        name: "Gabala & Great Caucasus Peaks",
        tag: "Alpine Nature",
        desc: "Tufandag Mountain cable cars, mirror-like Nohur Lake, and 5th-century Lahij artisan village.",
      },
      sheki_silk_road: {
        name: "Sheki & Ancient Silk Road",
        tag: "UNESCO Palace",
        desc: "18th-century Sheki Khan Palace with stained glass Shebeke and medieval caravanserais.",
      },
      gobustan_volcanoes: {
        name: "Gobustan Mud Volcanoes & Land of Fire",
        tag: "Extraterrestrial Nature",
        desc: "Active bubbling cold mud volcano craters and 40,000-year-old prehistoric rock petroglyphs.",
      },
      shahdag_resort: {
        name: "Shahdag Mountain Resort & Gusar",
        tag: "Luxury Alpine",
        desc: "Year-round ski, mountain roller-coaster, luxury wellness SPA, and canyon hiking.",
      },
      naftalan_spa: {
        name: "Naftalan Healing Petroleum SPA",
        tag: "Health & Wellness",
        desc: "World's only therapeutic crude petroleum baths for arthritis, dermatology, and revitalization.",
      },
      khinalug_village: {
        name: "Guba & Khinalug Highland Village",
        tag: "Living Ancient Culture",
        desc: "UNESCO remote eagle's nest stone settlement inhabited continuously for 5,000 years.",
      },
      georgia_combo: {
        name: "Azerbaijan & Georgia: Great Caucasus",
        tag: "2 Countries · 6 Days",
        desc: "Baku, Sheki Khan Palace, Kakheti wine valleys, Old Tbilisi, and Kazbegi Gergeti Trinity Church.",
      },
      uzbekistan_combo: {
        name: "Silk Road Caravan: Azerbaijan & Uzbekistan",
        tag: "2 Countries · 7 Days",
        desc: "Baku Caspian shores, Tashkent, high-speed train, Registan Square in Samarkand, and ancient Bukhara.",
      },
      turkey_combo: {
        name: "Baku to Bosphorus: Azerbaijan & Turkey",
        tag: "2 Countries · 8 Days",
        desc: "Baku modern architecture, private Bosphorus yacht in Istanbul, and sunrise Cappadocia hot air balloons.",
      },
      caucasus_combo: {
        name: "Grand Silk Road (AZ + GE + TR + UZ)",
        tag: "4 Countries in 1",
        desc: "Ultimate cross-continental expedition across Azerbaijan, Georgia, Turkey, and Uzbekistan.",
      },
    },
  },
  AZ: {
    badge: "100% FƏRDİ QAFQAZ SƏYAHƏTLƏRİ",
    heroTitle: "Xəyallarınızdakı",
    heroHighlight: "Qafqaz Marşrutunu Qurun",
    heroSubtitle: "Səyahət günlərini, görmək istədiyiniz yerləri, otelləri və şəxsi sürücünüzü seçin. 30 dəqiqə ərzində fərdi təklif əldə edin.",
    stepLabels: ["Tarixlər və Qrup", "İstiqamətlər", "Otellər və Nəqliyyat", "Fərdi Təklif"],
    step1Title: "1. Səyahət Müddəti və İştirakçılar",
    step1Subtitle: "Planlaşdırılan səfər tarixlərini və qrup tərkibini seçin.",
    durationLabel: "Səyahət Müddəti (Gün)",
    startDateLabel: "Gəliş / Başlama Tarixi",
    adultsLabel: "Böyüklər (12+ yaş)",
    childrenLabel: "Uşaqlar (0-11 yaş)",
    btnContinueDestinations: "İstiqamətlərə Keçid",
    step2Title: "2. Görməli Yerləri və Şəhərləri Seçin",
    step2Subtitle: "Səfəriniz zamanı kəşf etmək istədiyiniz bölgələri seçin.",
    selectedBadge: "Seçildi",
    btnContinueHotels: "Otel və Avtomobil Seçiminə Keç",
    btnBack: "Geri",
    step3Title: "3. Otel və Nəqliyyat Standartını Seçin",
    step3Subtitle: "Qalma rahatlığınızı və şəxsi nəqliyyat növünü fərdiləşdirin.",
    hotelCategoryLabel: "🏨 Yerləşmə Kateqoriyası",
    vehicleCategoryLabel: "🚗 Şəxsi Sürücülü Nəqliyyat",
    bespokeBannerBadge: "100% Fərdi Qiymətləndirmə",
    bespokeBannerTitle: "Xüsusi Tur Təklifi",
    bespokeBannerDesc: "Hər bir Azərbaycan marşrutu sizin istəklərinizə uyğun tərtib olunur. Mütəxəssislərimiz real otel qiymətlərini və yerləri yoxlayaraq 30 dəqiqə ərzində şəffaf təklif təqdim edirlər.",
    btnWhatsAppProposal: "WhatsApp ilə Təklif Al",
    btnContinueReview: "Baxış və Təsdiqə Keç",
    step4Title: "4. Yoxlayın və Təklif İstəyin",
    step4Subtitle: "Bakı turizm menecerimiz 30 dəqiqə ərzində detallı smetanı sizə göndərəcək.",
    contactNameLabel: "Ad və Soyad *",
    contactEmailLabel: "E-poçt Ünvanı *",
    contactPhoneLabel: "WhatsApp Nömrəsi *",
    specialRequestsLabel: "Detallı Günbəgün Təklif və Otel Voucherləri Əldə Edin",
    notesPlaceholder: "Əlavə qeydlər: qida seçimləri, uşaqların yaşı, uçuş saatları və ya xüsusi görmək istədiyiniz məkanlar...",
    btnSubmitInquiry: "Fərdi Tur Təklifi İstə",
    submittingText: "Göndərilir...",
    summaryDuration: "Gün",
    summaryHotel: "Otel Standartı",
    summaryVehicle: "Şəxsi Nəqliyyat",
    successRef: "Referans",
    successTitle: "Fərdi Təklif Sorğusu Qəbul Edildi!",
    successDescTemplate: "Təşəkkür edirik, {name}! Baş turizm mütəxəssisimiz {days} günlük xüsusi tur sorğunuzu qəbul etdi. 30 dəqiqə ərzində WhatsApp ({phone}) vasitəsilə sizinlə əlaqə saxlayacağıq.",
    successDurationLabel: "Səfər Müddəti:",
    successHotelLabel: "Otel Kateqoriyası:",
    successChauffeurLabel: "Sürücülü Avtomobil:",
    successQuotationLabel: "Qiymətləndirmə:",
    successQuotationValue: "Sorğuya Əsasən Fərdi Qiymət (Baxılır)",
    btnViewVoucher: "Tur Təsdiq Voucherinə Baxın və Çap Edin",
    btnChatWhatsApp: "WhatsApp ilə Turizm Meneceri ilə Danışın",
    btnReturnHome: "Əsas Səhifəyə Qayıt",
    vehicles: {
      sedan: {
        name: "Komfort Sedan",
        capacity: "1–3 Sərnişin",
        desc: "İkili və ya tək səyahət edənlər üçün səliqəli, kondisionerli və baqaj yerli komfortlu sedan.",
      },
      suv: {
        name: "4x4 SUV",
        capacity: "1–4 Sərnişin",
        desc: "Dağ keçidləri və təbii relyef üçün ideal, yüksək klirensli tam ötürücülü yolsuzluq avtomobili.",
      },
      vclass: {
        name: "VIP Miniven",
        capacity: "4–7 Sərnişin",
        desc: "Geniş kapitan oturacaqları, ikili kondisioner və böyük baqaj tutumu ilə ailələr üçün ideal.",
      },
      sprinter: {
        name: "Premium Mikroavtobus",
        capacity: "8–16 Sərnişin",
        desc: "Böyük ailələr və nümayəndə heyətləri üçün panoramik şüşəli geniş lüks mikroavtobus.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "Tarixi Butik & 3 Ulduz Komfort",
        desc: "Qədim İçərişəhərdə və mərkəzdə yerləşən ənənəvi və rahat butik otellər.",
      },
      comfort_4: {
        name: "4 Ulduz Deluxe Komfort (Ən Populyar)",
        desc: "Mənzərəli, səhər yeməyi daxil olan müasir premium otellər.",
      },
      luxury_5: {
        name: "5 Ulduz VIP Lüks & Prezident Nömrələri",
        desc: "Şəxsi xidmət və lüks spa imkanları olan dünya səviyyəli 5 ulduzlu brend otellər.",
      },
    },
    destinations: {
      baku_city: {
        name: "Bakı Qədim Şəhər və Müasir Memarlıq",
        tag: "Mədəniyyət & UNESCO",
        desc: "Qız Qalası, Şirvanşahlar Sarayı, Heydər Əliyev Mərkəzi və Alov Qüllələri.",
      },
      gabala_highlands: {
        name: "Qəbələ və Böyük Qafqaz Zirvələri",
        tag: "Dağ Təbiəti",
        desc: "Tufandağ kanat xətti, Nohurgöl gölü və qədim Lahıc sənətkarlıq kəndi.",
      },
      sheki_silk_road: {
        name: "Şəki və Qədim İpək Yolu",
        tag: "UNESCO Sarayı",
        desc: "18-ci əsr Şəki Xan Sarayı, şəbəkə sənəti və tarixi karvansaralar.",
      },
      gobustan_volcanoes: {
        name: "Qobustan Palçıq Vulkanları və Odlar Yurdu",
        tag: "Təbii Möcüzə",
        desc: "Aktiv qaynayan palçıq vulkanları və 40.000 illik qədim qayaüstü rəsmlər.",
      },
      shahdag_resort: {
        name: "Şahdağ Dağ Kurortu və Qusar",
        tag: "Lüks Dağ İstirahəti",
        desc: "Bütün fəsillər üçün xizək, dağ rodelbanı, lüks spa və kanyon gəzintiləri.",
      },
      naftalan_spa: {
        name: "Naftalan Müalicəvi Neft SPA Mərkəzi",
        tag: "Sağlamlıq & Terapiya",
        desc: "Oynaq, dəri və bədən bərpası üçün dünyada yeganə müalicəvi naftalan vannaları.",
      },
      khinalug_village: {
        name: "Quba və Xınalıq Dağ Kəndi",
        tag: "Qədim Yaşayış Məskəni",
        desc: "UNESCO siyahısında 5000 illik fasiləsiz tarixi olan ən yüksək dağ kəndi.",
      },
      georgia_combo: {
        name: "Azərbaycan və Gürcüstan: Böyük Qafqaz",
        tag: "2 Ölkə · 6 Gün",
        desc: "Bakı, Şəki Xan Sarayı, Kaxeti şərab vadiləri, Köhnə Tbilisi və Qazbəgi Gergeti Zirvəsi.",
      },
      uzbekistan_combo: {
        name: "İpək Yolu Karvanı: Azərbaycan və Özbəkistan",
        tag: "2 Ölkə · 7 Gün",
        desc: "Bakı Xəzər sahili, Daşkənd, sürətli qatar, Səmərqənd Rəqistan meydanı və qədim Buxara.",
      },
      turkey_combo: {
        name: "Bakıdan Boğaza: Azərbaycan və Türkiyə",
        tag: "2 Ölkə · 8 Gün",
        desc: "Bakı müasir memarlığı, İstanbulda şəxsi Boğaz yaxtası və Kapadokyada hava şarları.",
      },
      caucasus_combo: {
        name: "Böyük İpək Yolu: AZ + GE + TR + UZ",
        tag: "4 Ölkə 1 Səfərdə",
        desc: "Azərbaycan, Gürcüstan, Türkiyə və Özbəkistanı əhatə edən möhtəşəm transkontinental ekspedisiya.",
      },
    },
  },
  RU: {
    badge: "100% ИНДИВИДУАЛЬНЫЕ ТУРЫ",
    heroTitle: "Создайте Свой Идеальный",
    heroHighlight: "Тур по Кавказу",
    heroSubtitle: "Выберите длительность, регионы, категорию отеля и личный автомобиль. Получите индивидуальный расчёт за 30 минут.",
    stepLabels: ["Даты и Гости", "Направления", "Отели и Авто", "Смета"],
    step1Title: "1. Длительность и Количество Гостей",
    step1Subtitle: "Укажите даты поездки и состав участников.",
    durationLabel: "Длительность (дней)",
    startDateLabel: "Дата Прибытия / Начала",
    adultsLabel: "Взрослые (12+ лет)",
    childrenLabel: "Дети (0-11 лет)",
    btnContinueDestinations: "Перейти к Направлениям",
    step2Title: "2. Выберите Регионы и Достопримечательности",
    step2Subtitle: "Отметьте места, которые хотите посетить во время тура.",
    selectedBadge: "Выбрано",
    btnContinueHotels: "Перейти к Отелям и Авто",
    btnBack: "Назад",
    step3Title: "3. Выберите Класс Отеля и Автомобиль",
    step3Subtitle: "Настройте комфорт проживания и уровень индивидуального транспорта.",
    hotelCategoryLabel: "🏨 Категория Проживания",
    vehicleCategoryLabel: "🚗 Автомобиль с Личным Водителем",
    bespokeBannerBadge: "100% Индивидуальный Расчёт",
    bespokeBannerTitle: "Персональное Предложение за 30 Минут",
    bespokeBannerDesc: "Каждый маршрут составляется с учётом ваших пожеланий. Наши специалисты в Баку проверяют доступность номеров в режиме реального времени и предоставляют точный прозрачный расчёт.",
    btnWhatsAppProposal: "Получить Расчёт в WhatsApp",
    btnContinueReview: "Проверить и Отправить",
    step4Title: "4. Проверка и Запрос Сметы",
    step4Subtitle: "Наш специалист свяжется с вами в течение 30 минут с подробным расчетом.",
    contactNameLabel: "Имя и Фамилия *",
    contactEmailLabel: "Email *",
    contactPhoneLabel: "WhatsApp / Номер телефона *",
    specialRequestsLabel: "Получите Посуточную Программу и Гостиничные Ваучеры",
    notesPlaceholder: "Дополнительные пожелания: предпочтения в питании, возраст детей, время рейсов или особые локации...",
    btnSubmitInquiry: "Запросить Индивидуальную Программу",
    submittingText: "Отправка запроса...",
    summaryDuration: "Дней",
    summaryHotel: "Класс Отеля",
    summaryVehicle: "Личный Автомобиль",
    successRef: "Номер заявки",
    successTitle: "Запрос на Индивидуальный Тур Принят!",
    successDescTemplate: "Благодарим вас, {name}! Наш ведущий специалист по Азербайджану получил ваш запрос на {days}-дневный тур. Мы свяжемся с вами в WhatsApp ({phone}) в течение 30 минут.",
    successDurationLabel: "Длительность тура:",
    successHotelLabel: "Класс отеля:",
    successChauffeurLabel: "Автомобиль:",
    successQuotationLabel: "Смета:",
    successQuotationValue: "Индивидуальный расчёт по запросу (на проверке)",
    btnViewVoucher: "Посмотреть и Распечатать Ваучер Тура",
    btnChatWhatsApp: "Написать Консьержу в WhatsApp",
    btnReturnHome: "Вернуться на Главную",
    vehicles: {
      sedan: {
        name: "Комфортный Седан",
        capacity: "1–3 Пассажира",
        desc: "Стильный и комфортный седан с климат-контролем и вместительным багажником для соло-путешественников и пар.",
      },
      suv: {
        name: "4x4 SUV",
        capacity: "1–4 Пассажира",
        desc: "Полноприводный внедорожник с высоким клиренсом для горных перевалов и живописных высокогорий.",
      },
      vclass: {
        name: "VIP Минивэн",
        capacity: "4–7 Пассажиров",
        desc: "Просторные капитанские кресла, раздельный климат-контроль и огромный багажник для семей.",
      },
      sprinter: {
        name: "Представительский Микроавтобус",
        capacity: "8–16 Пассажиров",
        desc: "Роскошный просторный микроавтобус с панорамными окнами для больших групп и семейных поездок.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "Исторические Бутик-Отели 3★",
        desc: "Атмосферные аутентичные отели в старинных кварталах Ичери Шехер и центре города.",
      },
      comfort_4: {
        name: "4★ Делюкс Комфорт (Самый Популярный)",
        desc: "Современные отели с красивыми видами, бассейнами и завтраками «шведский стол».",
      },
      luxury_5: {
        name: "5★ VIP Люкс и Президентские Отели",
        desc: "Премиальные отели мировых брендов с личным консьержем и элитными спа-комплексами.",
      },
    },
    destinations: {
      baku_city: {
        name: "Баку: Старый Город и Архитектурные Шедевры",
        tag: "Культура & ЮНЕСКО",
        desc: "Девичья башня XII века, Дворец Ширваншахов, Центр Гейдара Алиева и Пламенные башни.",
      },
      gabala_highlands: {
        name: "Габала и Вершины Большого Кавказа",
        tag: "Горная Природа",
        desc: "Канатная дорога Туфандаг, зеркальное озеро Нохур и древнее ремесленное село Лагич.",
      },
      sheki_silk_road: {
        name: "Шеки и Древний Шёлковый Путь",
        tag: "Дворец ЮНЕСКО",
        desc: "Дворец Шекинских ханов XVIII века с витражами Шебеке и средневековые караван-сараи.",
      },
      gobustan_volcanoes: {
        name: "Грязевые Вулканы Гобустана и Страна Огней",
        tag: "Природное Чудо",
        desc: "Бурлящие кратеры грязевых вулканов и наскальные петроглифы возрастом 40 000 лет.",
      },
      shahdag_resort: {
        name: "Горный Курорт Шахдаг и Гусар",
        tag: "Премиум Горы",
        desc: "Круглогодичный горнолыжный комплекс, родельбан, премиальные спа-отели и каньоны.",
      },
      naftalan_spa: {
        name: "Нафталан: Целебная Нефть и СПА",
        tag: "Здоровье & Оздоровление",
        desc: "Единственные в мире ванны с лечебной нафталановой нефтью для суставов и кожи.",
      },
      khinalug_village: {
        name: "Губа и Высокогорное Село Хыналыг",
        tag: "Древнейшая Культура",
        desc: "Высокогорное орлиное гнездо на высоте 2350м с непрерывной 5000-летней историей.",
      },
      georgia_combo: {
        name: "Азербайджан и Грузия: Большой Кавказ",
        tag: "2 страны · 6 дней",
        desc: "Баку, Дворец Шекинских ханов, винодельни Кахетии, Старый Тбилиси и вершина Казбек.",
      },
      uzbekistan_combo: {
        name: "Шёлковый путь: Азербайджан и Узбекистан",
        tag: "2 страны · 7 дней",
        desc: "Баку на Каспии, Ташкент, скоростной поезд «Афросиаб», бирюзовый Регистан Самарканда и Бухара.",
      },
      turkey_combo: {
        name: "От Баку до Босфора: Азербайджан и Турция",
        tag: "2 страны · 8 дней",
        desc: "Современный Баку, частная яхта на Босфоре в Стамбуле и рассвет на шарах в Каппадокии.",
      },
      caucasus_combo: {
        name: "Гранд Шёлковый путь: AZ + GE + TR + UZ",
        tag: "4 страны в 1",
        desc: "Уникальная межконтинентальная экспедиция: Азербайджан, Грузия, Турция и Узбекистан.",
      },
    },
  },
  FR: {
    badge: "VOYAGES PRIVÉS 100% SUR MESURE",
    heroTitle: "Créez Votre Voyage Privé",
    heroHighlight: "Dans le Caucase",
    heroSubtitle: "Choisissez votre durée, vos étapes, vos hôtels de luxe et votre chauffeur privé. Recevez une proposition personnalisée en 30 minutes.",
    stepLabels: ["Dates & Voyageurs", "Destinations", "Hôtels & Véhicules", "Devis Sur Mesure"],
    step1Title: "1. Durée du Voyage & Voyageurs",
    step1Subtitle: "Indiquez vos dates de voyage prévues et la composition de votre groupe.",
    durationLabel: "Durée du Voyage (Jours)",
    startDateLabel: "Date d'arrivée / Début",
    adultsLabel: "Adultes (12+ ans)",
    childrenLabel: "Enfants (0-11 ans)",
    btnContinueDestinations: "Continuer vers les Destinations",
    step2Title: "2. Choisissez vos Destinations & Étapes",
    step2Subtitle: "Sélectionnez les régions que vous souhaitez explorer durant votre séjour.",
    selectedBadge: "Sélectionné",
    btnContinueHotels: "Continuer vers Hôtels & Véhicules",
    btnBack: "Retour",
    step3Title: "3. Choisissez l'Hôtel et le Véhicule",
    step3Subtitle: "Personnalisez votre niveau de confort et votre chauffeur privé.",
    hotelCategoryLabel: "🏨 Catégorie d'Hébergement",
    vehicleCategoryLabel: "🚗 Véhicule Privé avec Chauffeur",
    bespokeBannerBadge: "Tarification 100% Sur Mesure",
    bespokeBannerTitle: "Proposition de Circuit Personnalisée",
    bespokeBannerDesc: "Chaque itinéraire en Azerbaïdjan est adapté à vos envies. Nos experts à Bakou vérifient la disponibilité hôtelière en direct et établissent une proposition transparente sous 30 minutes.",
    btnWhatsAppProposal: "Proposition Immédiate sur WhatsApp",
    btnContinueReview: "Continuer vers le Récapitulatif",
    step4Title: "4. Récapitulatif & Demande de Devis",
    step4Subtitle: "Notre concierge de voyage à Bakou vous enverra un devis détaillé sous 30 minutes.",
    contactNameLabel: "Nom Complet *",
    contactEmailLabel: "Adresse E-mail *",
    contactPhoneLabel: "Numéro WhatsApp *",
    specialRequestsLabel: "Recevez le Programme Détaillé Jour par Jour & les Vouchers",
    notesPlaceholder: "Notes optionnelles : préférences alimentaires, âges des enfants, horaires de vol ou sites spécifiques...",
    btnSubmitInquiry: "Envoyer la Demande Sur Mesure",
    submittingText: "Envoi en cours...",
    summaryDuration: "Jours",
    summaryHotel: "Standard Hôtelier",
    summaryVehicle: "Véhicule Privé",
    successRef: "Référence",
    successTitle: "Demande de Circuit Sur Mesure Reçue !",
    successDescTemplate: "Merci, {name} ! Notre spécialiste en Azerbaïdjan a bien reçu votre demande de circuit de {days} jours. Nous vous contacterons sur WhatsApp ({phone}) sous 30 minutes.",
    successDurationLabel: "Durée du voyage :",
    successHotelLabel: "Catégorie d'hôtel :",
    successChauffeurLabel: "Chauffeur privé :",
    successQuotationLabel: "Tarification :",
    successQuotationValue: "Devis sur mesure sur demande (en cours)",
    btnViewVoucher: "Consulter & Imprimer le Bon de Réservation",
    btnChatWhatsApp: "Échanger avec notre Concierge sur WhatsApp",
    btnReturnHome: "Retour à l'accueil",
    vehicles: {
      sedan: {
        name: "Berline Confort",
        capacity: "1–3 Passagers",
        desc: "Berline exécutive avec climatisation et grand coffre pour couples ou voyageurs solos.",
      },
      suv: {
        name: "SUV 4x4",
        capacity: "1–4 Passagers",
        desc: "Véhicule tout-terrain tout confort, idéal pour les routes de montagne et le Grand Caucase.",
      },
      vclass: {
        name: "Minivan VIP",
        capacity: "4–7 Passagers",
        desc: "Sièges capitaines spacieux, climatisation bizone et grand volume pour les familles.",
      },
      sprinter: {
        name: "Minibus Exécutif",
        capacity: "8–16 Passagers",
        desc: "Minibus de luxe spacieux avec baies panoramiques pour grandes familles et groupes.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "Boutique-Hôtels Historiques 3★",
        desc: "Hôtels de charme traditionnels situés dans la vieille ville fortifiée et le centre.",
      },
      comfort_4: {
        name: "4★ Deluxe Confort (Choix le Plus Populaire)",
        desc: "Hôtels modernes haut de gamme avec vue panoramique et petit-déjeuner buffet complet.",
      },
      luxury_5: {
        name: "5★ VIP Luxe & Suites Présidentielles",
        desc: "Propriétés hôtelières d'exception avec concierge dédié et spas de bien-être haut de gamme.",
      },
    },
    destinations: {
      baku_city: {
        name: "Bakou : Vieille Ville & Merveilles Modernes",
        tag: "Culture & UNESCO",
        desc: "Tour de la Vierge du XIIe s., Palais des Shirvanshahs, Centre Heydar Aliyev et Flame Towers.",
      },
      gabala_highlands: {
        name: "Gabala & Sommets du Grand Caucase",
        tag: "Nature Alpine",
        desc: "Téléphérique de Tufandag, lac miroir de Nohur et village d'artisans de Lahidj du Ve s.",
      },
      sheki_silk_road: {
        name: "Shaki & l'Ancienne Route de la Soie",
        tag: "Palais UNESCO",
        desc: "Palais des Khans de Shaki du XVIIIe s., vitraux Shebeke et caravansérails médiévaux.",
      },
      gobustan_volcanoes: {
        name: "Volcans de Boue de Gobustan & Terre de Feu",
        tag: "Merveille Naturelle",
        desc: "Cratères de boue froide bouillonnante et pétroglyphes préhistoriques vieux de 40 000 ans.",
      },
      shahdag_resort: {
        name: "Station de Montagne de Shahdag & Qusar",
        tag: "Montagne Luxe",
        desc: "Ski 4 saisons, luge alpine sur rail, spas bien-être d'exception et randonnées en canyon.",
      },
      naftalan_spa: {
        name: "Bains d'Huile Thérapeutique de Naftalan",
        tag: "Santé & Bien-être",
        desc: "Les uniques bains de pétrole brut médical au monde pour les articulations et la peau.",
      },
      khinalug_village: {
        name: "Quba & Village Perché de Khinalug",
        tag: "Culture Millénaire",
        desc: "Village en nid d'aigle classé UNESCO à 2 350 m d'altitude, habité depuis 5 000 ans.",
      },
      georgia_combo: {
        name: "Azerbaïdjan & Géorgie: Grand Caucase",
        tag: "2 pays · 6 jours",
        desc: "Bakou, Palais des Khans de Chéki, vignobles de Kakhétie, Vieux Tbilissi et mont Kazbek.",
      },
      uzbekistan_combo: {
        name: "Caravane de la Route de la Soie: Azerbaïdjan & Ouzbékistan",
        tag: "2 pays · 7 jours",
        desc: "Bakou sur la Caspienne, Tachkent, train à grande vitesse, Place du Régistan à Samarcande et Boukhara.",
      },
      turkey_combo: {
        name: "De Bakou au Bosphore: Azerbaïdjan & Turquie",
        tag: "2 pays · 8 jours",
        desc: "Tours de Flamme de Bakou, yacht privé sur le Bosphore à Istanbul et montgolfières en Cappadoce.",
      },
      caucasus_combo: {
        name: "Grande Route de la Soie: AZ + GE + TR + UZ",
        tag: "4 pays en 1",
        desc: "L'expédition ultime reliant l'Azerbaïdjan, la Géorgie, la Turquie et l'Ouzbékistan.",
      },
    },
  },
  AR: {
    badge: "رحلات خاصة 100% مخصصة لك",
    heroTitle: "صمم رحلتك الخاصة في",
    heroHighlight: "أذربيجان والقوقاز",
    heroSubtitle: "اختر مدة الرحلة، الوجهات المفضلة، مستوى الفنادق والسيارة الخاصة مع سائق. استلم عرض سعر مفصل ودقيق خلال 30 دقيقة.",
    stepLabels: ["التواريخ والضيوف", "الوجهات والمعالم", "الفنادق والنقل", "عرض السعر"],
    step1Title: "1. مدة الرحلة وعدد الضيوف",
    step1Subtitle: "حدد التواريخ المخططة لرحلتك وعدد أفراد عائلتك أو مجموعتك.",
    durationLabel: "مدة الرحلة (بالأيام)",
    startDateLabel: "تاريخ الوصول / البداية",
    adultsLabel: "البالغون (+12 سنة)",
    childrenLabel: "الأطفال (0-11 سنة)",
    btnContinueDestinations: "المتابعة لاختيار الوجهات",
    step2Title: "2. اختر الوجهات والمعالم المفضلة",
    step2Subtitle: "حدد المدن والمناطق الطبيعية التي تود زيارتها خلال برنامجك السياحي.",
    selectedBadge: "تم الاختيار",
    btnContinueHotels: "المتابعة لاختيار الفنادق والسيارة",
    btnBack: "رجوع",
    step3Title: "3. اختر مستوى الفنادق والسيارة الخاصة",
    step3Subtitle: "خصص مستوى الإقامة المناسب لعائلتك ونوع وسيلة النقل الفاخرة.",
    hotelCategoryLabel: "🏨 مستوى الإقامة الفندقية",
    vehicleCategoryLabel: "🚗 سيارة خاصة مع سائق",
    bespokeBannerBadge: "تسعير مخصص 100% حسب الطلب",
    bespokeBannerTitle: "عرض برنامج سياحي مخصص",
    bespokeBannerDesc: "يتم تصميم كل برنامج سياحي حسب رغباتكم تماماً. يتحقق خبراؤنا في باكو من أسعار وتوافر الغرف في الوقت الفعلي لتقديم عرض سعر دقيق وشفاف خلال 30 دقيقة.",
    btnWhatsAppProposal: "طلب العرض فوراً عبر واتساب",
    btnContinueReview: "المتابعة للمراجعة والطلب",
    step4Title: "4. مراجعة البرنامج وطلب التسعير",
    step4Subtitle: "سيتواصل معكم مستشارنا السياحي في باكو بعرض تفصيلي شامل خلال 30 دقيقة.",
    contactNameLabel: "الاسم الكامل *",
    contactEmailLabel: "البريد الإلكتروني *",
    contactPhoneLabel: "رقم الواتساب *",
    specialRequestsLabel: "استلم جدول الرحلة اليومي التفصيلي وقسائم الحجز الفندقية",
    notesPlaceholder: "ملاحظات اختيارية: طلبات خاصة، أعمار الأطفال، أوقات الوصول ومواعيد الرحلات الجوية...",
    btnSubmitInquiry: "إرسال طلب البرنامج المخصص",
    submittingText: "جاري الإرسال...",
    summaryDuration: "أيام",
    summaryHotel: "مستوى الفندق",
    summaryVehicle: "السيارة الخاصة",
    successRef: "رقم المرجع",
    successTitle: "تم استلام طلب برنامجكم السياحي الخاص!",
    successDescTemplate: "شكراً لكم، {name}! استلم خبيرنا السياحي في باكو طلب رحلتكم الخاصة لمدة {days} أيام. سنتواصل معكم عبر واتساب ({phone}) خلال 30 دقيقة.",
    successDurationLabel: "مدة الرحلة:",
    successHotelLabel: "مستوى الإقامة:",
    successChauffeurLabel: "السيارة والسائق:",
    successQuotationLabel: "عرض السعر:",
    successQuotationValue: "عرض سعر مخصص حسب الطلب (قيد المراجعة)",
    btnViewVoucher: "عرض وطباعة قسيمة تأكيد البرنامج",
    btnChatWhatsApp: "تواصل مباشرة مع المستشار عبر واتساب",
    btnReturnHome: "العودة إلى الصفحة الرئيسية",
    vehicles: {
      sedan: {
        name: "سيدان مريحة",
        capacity: "1–3 ركاب",
        desc: "راحة وأناقة مع تكييف كامل ومساحة حقائب ممتازة للأزواج والمسافرين الفرديين.",
      },
      suv: {
        name: "جيب 4x4 دفع رباعي",
        capacity: "1–4 ركاب",
        desc: "سيارة جيب مرتفعة بنظام دفع كلي مصممة للطرق الجبلية والطبيعة الساحرة في غابالا وقوبا.",
      },
      vclass: {
        name: "ميني فان VIP",
        capacity: "4–7 ركاب",
        desc: "مقاعد كابتن فاخرة ورحبة مع تكييف مزدوج ومساحة حقائب كبيرة، مثالية للعائلات.",
      },
      sprinter: {
        name: "ميني باص تنفيذي",
        capacity: "8–16 راكب",
        desc: "حافلة صغيرة فاخرة ومريحة مع نوافذ بانورامية للمجموعات الكبيرة والعائلات الممتدة.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "فنادق بوتيك تراثية 3★",
        desc: "فنادق ساحرة بطابع تراثي مميز تقع داخل المدينة القديمة ووسط باكو.",
      },
      comfort_4: {
        name: "ديلوكس راقي 4★ (الأكثر طلباً)",
        desc: "فنادق حديثة بإطلالات رائعة على المدينة أو الجبال مع بوفيه إفطار مفتوح.",
      },
      luxury_5: {
        name: "فنادق ومنتجعات VIP فاخرة 5★",
        desc: "فنادق عالمية فاخرة بأعلى معايير الضيافة والخدمة الخاصة وأفضل المراكز الصحية والسبا.",
      },
    },
    destinations: {
      baku_city: {
        name: "باكو: المدينة القديمة والروائع المعمارية",
        tag: "ثقافة وتراث يونسكو",
        desc: "برج العذراء من القرن 12، قصر شيرفانشاه، مركز حيدر علييف وأبراج الشعلة.",
      },
      gabala_highlands: {
        name: "غابالا وقمم القوقاز الشاهقة",
        tag: "طبيعة جبلية خلابة",
        desc: "تلفريك جبل توفانداغ، بحيرة نوهور الهادئة وقرية لاهيج الحرفية القديمة.",
      },
      sheki_silk_road: {
        name: "شاكي وطريق الحرير التاريخي",
        tag: "قصر يونسكو التراثي",
        desc: "قصر خانات شاكي وزجاج الشبكة الملون وخانات القوافل التاريخية.",
      },
      gobustan_volcanoes: {
        name: "براكين الطين في قوبوستان وأرض النار",
        tag: "ظاهرة طبيعية نادرة",
        desc: "فوهات براكين الطين البارد الفوار والنقوش الصخرية التي تعود لـ 40,000 عام.",
      },
      shahdag_resort: {
        name: "منتجع شاهداغ الجبلي الفاخر وقوسار",
        tag: "قمم شتوية وسبا",
        desc: "تزلج على مدار العام، قطار التزحلق الجبلي، فنادق سبا عالمية ومسارات المشي.",
      },
      naftalan_spa: {
        name: "منتجعات نفط النفطلان العلاجية",
        tag: "صحة واستشفاء طبيعي",
        desc: "الحمامات الوحيدة في العالم بالنفط العلاجي النادر لتخفيف آلام المفاصل واستعادة الحيوية.",
      },
      khinalug_village: {
        name: "قوبا وقرية خينالوق الجبلية الأثرية",
        tag: "تراث إنساني عريق",
        desc: "أعلى قرية مأهولة في أوروبا على ارتفاع 2,350م تسكنها شعوبها منذ أكثر من 5,000 عام.",
      },
      georgia_combo: {
        name: "أذربيجان وجورجيا: روائع القوقاز",
        tag: "دولتان · 6 أيام",
        desc: "باكو، قصر شيكي خان، مزارع كاخيتي، تبليسي القديمة، وقمة كازبيجي كنيسة جيرجيتي.",
      },
      uzbekistan_combo: {
        name: "قافلة طريق الحرير: أذربيجان وأوزبكستان",
        tag: "دولتان · 7 أيام",
        desc: "كورنيش باكو، طشقند، القطار فائق السرعة، ساحة ريجستان في سمرقند وبخارى التاريخية.",
      },
      turkey_combo: {
        name: "من باكو إلى البوسفور: أذربيجان وتركيا",
        tag: "دولتان · 8 أيام",
        desc: "معالم باكو الحديثة، يخت خاص في البوسفور بإسطنبول، ومناطيد كابادوكيا عند الشروق.",
      },
      caucasus_combo: {
        name: "طريق الحرير الكبير: AZ + GE + TR + UZ",
        tag: "4 دول في رحلة واحدة",
        desc: "الرحلة الكبرى الشاملة التي تجمع أذربيجان وجورجيا وتركيا وأوزبكستان.",
      },
    },
  },
  DE: {
    badge: "100% MASSGESCHNEIDERTE REISEN",
    heroTitle: "Gestalten Sie Ihre Private",
    heroHighlight: "Kaukasus-Reise",
    heroSubtitle: "Wählen Sie Reisedauer, Highlights, erstklassige Hotels und ein Privatfahrzeug mit Fahrer. Erhalten Sie ein individuelles Angebot innerhalb von 30 Minuten.",
    stepLabels: ["Termine & Gruppe", "Reiseziele", "Hotels & Transport", "Sofort-Angebot"],
    step1Title: "1. Reisedauer & Teilnehmer",
    step1Subtitle: "Wählen Sie Ihren Reisezeitraum und die Gruppengröße.",
    durationLabel: "Reisedauer (Tage)",
    startDateLabel: "Anreise- / Startdatum",
    adultsLabel: "Erwachsene (12+ Jahre)",
    childrenLabel: "Kinder (0-11 Jahre)",
    btnContinueDestinations: "Weiter zu den Reisezielen",
    step2Title: "2. Reiseziele & Highlights Wählen",
    step2Subtitle: "Wählen Sie die Regionen, die Sie während Ihrer Tour erkunden möchten.",
    selectedBadge: "Ausgewählt",
    btnContinueHotels: "Weiter zu Hotels & Fahrzeugen",
    btnBack: "Zurück",
    step3Title: "3. Hotelkategorie & Fahrzeug Wählen",
    step3Subtitle: "Passen Sie Ihren Komfort und Ihren privaten Transportstil an.",
    hotelCategoryLabel: "🏨 Unterkunfts-Kategorie",
    vehicleCategoryLabel: "🚗 Privatfahrzeug mit Chauffeur",
    bespokeBannerBadge: "100% Individuelle Kalkulation",
    bespokeBannerTitle: "Maßgeschneidertes Reiseangebot",
    bespokeBannerDesc: "Jede Reiseroute wird nach Ihren persönlichen Wünschen zusammengestellt. Unsere Experten in Baku prüfen Zimmerverfügbarkeiten in Echtzeit und erstellen innerhalb von 30 Minuten ein transparentes Angebot.",
    btnWhatsAppProposal: "Sofort-Angebot per WhatsApp",
    btnContinueReview: "Weiter zur Übersicht",
    step4Title: "4. Übersicht & Angebot Anfordern",
    step4Subtitle: "Unser Reiseberater in Baku sendet Ihnen innerhalb von 30 Minuten ein detailliertes Angebot.",
    contactNameLabel: "Vollständiger Name *",
    contactEmailLabel: "E-Mail-Adresse *",
    contactPhoneLabel: "WhatsApp-Nummer *",
    specialRequestsLabel: "Tagesaktuelles Programm & Hotelgutscheine Erhalten",
    notesPlaceholder: "Optionale Wünsche: Verpflegungspräferenzen, Alter der Kinder, Flugzeiten oder bestimmte Sehenswürdigkeiten...",
    btnSubmitInquiry: "Individuelle Anfrage Absenden",
    submittingText: "Wird gesendet...",
    summaryDuration: "Tage",
    summaryHotel: "Hotel-Standard",
    summaryVehicle: "Privatfahrzeug",
    successRef: "Referenznummer",
    successTitle: "Individuelles Reiseangebot Angefordert!",
    successDescTemplate: "Vielen Dank, {name}! Unser Reisespezialist in Baku hat Ihre Anfrage für eine {days}-tägige Privattour erhalten. Wir melden uns innerhalb von 30 Minuten per WhatsApp ({phone}).",
    successDurationLabel: "Reisedauer:",
    successHotelLabel: "Hotelkategorie:",
    successChauffeurLabel: "Chauffeur:",
    successQuotationLabel: "Preiskalkulation:",
    successQuotationValue: "Individuelles Angebot auf Anfrage (In Bearbeitung)",
    btnViewVoucher: "Reisebestätigungs-Voucher Anzeigen & Drucken",
    btnChatWhatsApp: "Direkt per WhatsApp mit dem Concierge Chatten",
    btnReturnHome: "Zurück zur Startseite",
    vehicles: {
      sedan: {
        name: "Komfort-Limousine",
        capacity: "1–3 Passagiere",
        desc: "Elegante Business-Limousine mit Klimaanlage und Kofferraum für Paare oder Alleinreisende.",
      },
      suv: {
        name: "4x4 SUV",
        capacity: "1–4 Passagiere",
        desc: "Allradfahrzeug mit hoher Bodenfreiheit, perfekt für Bergpässe und raue Hochländer.",
      },
      vclass: {
        name: "VIP-Minivan",
        capacity: "4–7 Passagiere",
        desc: "Großzügige Komfortsitze, Doppel-Klimaanlage und reichlich Gepäckraum für Familien.",
      },
      sprinter: {
        name: "Executive-Minibus",
        capacity: "8–16 Passagiere",
        desc: "Luxuriöser Reisebus mit Panoramafenstern für Großfamilien und Delegationen.",
      },
    },
    hotelTiers: {
      boutique_3: {
        name: "Historische Boutique-Hotels 3★",
        desc: "Traditionelle, charmante Hotels im Herzen der historischen Altstadt.",
      },
      comfort_4: {
        name: "4★ Deluxe Komfort (Beliebteste Wahl)",
        desc: "Moderne Premium-Hotels mit Panoramablick und reichhaltigem Frühstücksbuffet.",
      },
      luxury_5: {
        name: "5★ VIP Luxus & Präsidenten-Suiten",
        desc: "Erstklassige Luxushotels weltbekannter Marken mit persönlichem Service und Spa.",
      },
    },
    destinations: {
      baku_city: {
        name: "Baku Altstadt & Moderne Architektur",
        tag: "Kultur & UNESCO",
        desc: "Jungfrauenturm aus dem 12. Jh., Schirwanschah-Palast, Heydar-Aliyev-Zentrum und Flammentürme.",
      },
      gabala_highlands: {
        name: "Gabala & Gipfel des Großen Kaukasus",
        tag: "Alpine Bergwelt",
        desc: "Tufandag-Seilbahn, spiegelglatter Nohur-See und das historische Handwerkerdorf Lahitsch.",
      },
      sheki_silk_road: {
        name: "Scheki & die Antike Seidenstraße",
        tag: "UNESCO-Welterbe",
        desc: "Scheki-Chan-Palast aus dem 18. Jh. mit farbenprächtigen Schebeke-Glasfenstern und Karawansereien.",
      },
      gobustan_volcanoes: {
        name: "Schlammvulkane von Gobustan & Land des Feuers",
        tag: "Naturwunder",
        desc: "Aktive kalte Schlammvulkane und prähistorische Felsmalereien aus über 40.000 Jahren.",
      },
      shahdag_resort: {
        name: "Shahdag Mountain Resort & Gusar",
        tag: "Luxus-Bergresort",
        desc: "Ganzjähriges Skigebiet, Alpen-Achterbahn, erstklassige Wellness-Spas und Canyon-Touren.",
      },
      naftalan_spa: {
        name: "Naftalan Heilendes Erdöl & Wellness",
        tag: "Gesundheit & Kur",
        desc: "Weltweit einzigartige medizinische Rohölbäder zur Linderung von Gelenk- und Hautbeschwerden.",
      },
      khinalug_village: {
        name: "Guba & Bergdorf Chinalug",
        tag: "Lebendige Urkultur",
        desc: "UNESCO-geschütztes Adlerhorstdorf auf 2.350 m Höhe, seit 5.000 Jahren ununterbrochen bewohnt.",
      },
      georgia_combo: {
        name: "Aserbaidschan & Georgien: Großer Kaukasus",
        tag: "2 Länder · 6 Tage",
        desc: "Baku, Schäki-Khanpalast, Kacheti-Weinregion, Altstadt von Tiflis und Kasbegi Gergeti.",
      },
      uzbekistan_combo: {
        name: "Seidenstraßen-Karawane: Aserbaidschan & Usbekistan",
        tag: "2 Länder · 7 Tage",
        desc: "Baku Kaspisches Meer, Taschkent, Schnellzug Afrosiyob, Registan in Samarkand und Buchara.",
      },
      turkey_combo: {
        name: "Von Baku zum Bosporus: Aserbaidschan & Türkei",
        tag: "2 Länder · 8 Tage",
        desc: "Baku Flammentürme, private Bosporus-Yacht in Istanbul und Heißluftballons in Kappadokien.",
      },
      caucasus_combo: {
        name: "Große Seidenstraße: AZ + GE + TR + UZ",
        tag: "4 Länder in 1",
        desc: "Die ultimative Kontinentalreise durch Aserbaidschan, Georgien, die Türkei und Usbekistan.",
      },
    },
  },
};
