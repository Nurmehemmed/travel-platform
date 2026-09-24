import type { LanguageCode } from "../../i18n";

export interface ServiceItemTranslation {
  id: string;
  badge: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
}

export interface ServicesHubTranslations {
  badge: string;
  title: string;
  subtitle: string;
  services: {
    esim: ServiceItemTranslation;
    visa: ServiceItemTranslation;
    transfer: ServiceItemTranslation;
    custom: ServiceItemTranslation;
    medical: ServiceItemTranslation;
    mice: ServiceItemTranslation;
  };
  trust1: string;
  trust2: string;
  trust3: string;
  bottomBannerText: string;
  bottomBannerCta: string;
}

export const SERVICES_HUB_TRANSLATIONS: Record<LanguageCode, ServicesHubTranslations> = {
  EN: {
    badge: "AZERBAIJAN TRAVEL ESSENTIALS",
    title: "Everything You Need for Your Azerbaijan Journey",
    subtitle: "From official ASAN e-Visas and 4G/5G eSIMs to 24/7 Baku airport chauffeur transfers and bespoke tours — book seamlessly.",
    services: {
      esim: {
        id: "esim",
        badge: "NEW · 4G/5G",
        title: "Tourist eSIM Internet",
        desc: "High-speed 4G/5G mobile data ready the moment you land at Baku Airport. Zero kiosk queues, instant QR code.",
        features: ["1-min QR code setup", "3GB to 20GB data plans", "Keep original WhatsApp number"],
        cta: "View eSIM Plans",
      },
      visa: {
        id: "visa",
        badge: "OFFICIAL · 3-HOUR",
        title: "Official ASAN e-Visa",
        desc: "Urgent 3-hour fast-track or standard 3-day official ASAN visas for citizens of 95+ eligible countries.",
        features: ["3-hour urgent processing", "Eligible for 95+ countries", "Secure card payment"],
        cta: "Apply for e-Visa",
      },
      transfer: {
        id: "transfer",
        badge: "24/7 VIP PICKUP",
        title: "Baku Airport Chauffeur",
        desc: "Door-to-door Baku GYD flight-tracked transfers with name-sign greeting, female driver & licensed guide options.",
        features: ["Flight tracking & 60-min wait", "Sedan, SUV & VIP Minivans", "Female driver option"],
        cta: "Book Airport Transfer",
      },
      custom: {
        id: "custom",
        badge: "100% BESPOKE",
        title: "Custom Itinerary Planner",
        desc: "Design your personalized multi-day journey with transparent pricing, private vehicles, and boutique or 5-star hotels.",
        features: ["Bespoke day-by-day planner", "Private vehicle & driver", "30-min quote response"],
        cta: "Build My Itinerary",
      },
      medical: {
        id: "medical",
        badge: "WELLNESS & SPA",
        title: "Medical & Naftalan SPA",
        desc: "World-famous therapeutic crude oil bath sanitariums in Naftalan, thermal springs, and physiotherapy retreats.",
        features: ["Certified Naftalan clinics", "Doctor consultations included", "All-inclusive wellness stays"],
        cta: "Explore Medical Tours",
      },
      mice: {
        id: "mice",
        badge: "B2B DELEGATIONS",
        title: "MICE & Corporate Events",
        desc: "Turnkey congress management, corporate incentive trips, gala dinners, and executive transport across Azerbaijan.",
        features: ["Full event logistics", "VIP Sprinter fleet", "Bilingual project managers"],
        cta: "Request MICE Proposal",
      },
    },
    trust1: "Licensed Tour Operator by State Tourism Agency",
    trust2: "Automated Instant Delivery & QR Activation",
    trust3: "24/7 Dedicated Operations Concierge",
    bottomBannerText: "Need a custom combination or corporate group arrangement?",
    bottomBannerCta: "Chat with Baku Specialist",
  },
  AZ: {
    badge: "BÜTÜN SƏYAHƏT XİDMƏTLƏRİ",
    title: "Səyahətiniz Üçün Lazım Olan Hər Şey Bir Yerdə",
    subtitle: "Rəsmi ASAN vizasından 4G/5G eSIM internetə, hava limanı transferindən fərdi turlara qədər — 1 kliklə sifariş edin.",
    services: {
      esim: {
        id: "esim",
        badge: "YENİ · 4G/5G",
        title: "eSIM Mobil İnternet",
        desc: "Bakıya enən kimi dərhal aktivləşən 4G/5G limitsiz sürətli internet. Sıra gözləmədən, ani QR kod çatdırılması.",
        features: ["1 dəqiqəyə QR aktivasiya", "3GB-dan 20GB-dək paketlər", "Öz WhatsApp nömrənizi qoruyun"],
        cta: "Planları Seç",
      },
      visa: {
        id: "visa",
        badge: "RƏSMİ ASAN · 3 SAAT",
        title: "Rəsmi ASAN e-Viza",
        desc: "95+ ölkə vətəndaşları üçün təcili 3 saatlıq və ya standart 3 günlük rəsmi elektron viza müraciəti.",
        features: ["3 saatlıq təcili seçim", "95+ ölkə üçün uyğundur", "Təhlükəsiz onlayn ödəniş"],
        cta: "Vizaya Müraciət Et",
      },
      transfer: {
        id: "transfer",
        badge: "24/7 QARŞILAMA",
        title: "VIP Aeroport Transferi",
        desc: "Heydər Əliyev Hava Limanında (GYD) ad lövhəsi ilə qarşılama, uçuş izləmə və qadın sürücü və ya bələdçi seçimi.",
        features: ["Uçuş izləmə və 60 dəq gözləmə", "Sedan, SUV və VIP Minivenlər", "Qadın sürücü seçimi"],
        cta: "Transfer Sifariş Et",
      },
      custom: {
        id: "custom",
        badge: "100% FƏRDİ",
        title: "Fərdi Marşrut Qurucusu",
        desc: "Şəxsi istəklərinizə uyğun çoxgünlük səyahət: şəxsi avtomobil, otel seçimi və şəffaf qiymətləndirmə.",
        features: ["Addım-addım tur planı", "Şəxsi sürücülü avtomobil", "30 dəqiqəyə qiymət təklifi"],
        cta: "Marşrutumu Quraşdır",
      },
      medical: {
        id: "medical",
        badge: "SAĞLAMLIQ VƏ SPA",
        title: "Müalicəvi Naftalan Turları",
        desc: "Dünyaca məşhur təbii müalicəvi neft vannaları, termal bulaqlar və sanatoriya-istirahət paketləri.",
        features: ["Lisenziyalı Naftalan mərkəzləri", "Həkim müayinəsi daxildir", "Hər şey daxil istirahət"],
        cta: "Müalicə Turlarını İncələ",
      },
      mice: {
        id: "mice",
        badge: "B2B TƏDBİRLƏR",
        title: "MICE və Korporativ Tədbirlər",
        desc: "Beynəlxalq konfranslar, şirkət tədbirləri, qala şam yeməkləri və Azərbaycanda nümayəndə heyətlərinin logistikası.",
        features: ["Tam tədbir təşkili", "VIP Sprinter parkı", "İkidilli layihə rəhbərləri"],
        cta: "MICE Təklifi İstə",
      },
    },
    trust1: "Dövlət Turizm Agentliyi tərəfindən Lisenziyalaşdırılmışdır",
    trust2: "Avtomatlaşdırılmış Ani Çatdırılma və QR Aktivasiya",
    trust3: "24/7 Şəxsi Əməliyyat və Müştəri Xidməti",
    bottomBannerText: "Fərdi qrup və ya korporativ paket üçün xüsusi təklif istəyirsiniz?",
    bottomBannerCta: "Bakı Mütəxəssisi ilə Əlaqə",
  },
  RU: {
    badge: "ВСЕ ТУРИСТИЧЕСКИЕ УСЛУГИ",
    title: "Всё для идеального путешествия в Азербайджан",
    subtitle: "От официальной визы ASAN и 4G/5G eSIM до VIP трансфера из аэропорта и авторских туров — бронируйте в 1 клик.",
    services: {
      esim: {
        id: "esim",
        badge: "НОВИНКА · 4G/5G",
        title: "Туристическая eSIM",
        desc: "Высокоскоростной интернет 4G/5G сразу по прилёту в Баку. Без очередей в аэропорту, мгновенный QR-код на email.",
        features: ["QR активация за 1 мин", "Пакеты от 3 до 20 ГБ", "Сохраняйте свой WhatsApp"],
        cta: "Выбрать eSIM",
      },
      visa: {
        id: "visa",
        badge: "ОФИЦИАЛЬНО · 3 ЧАСА",
        title: "Электронная виза ASAN",
        desc: "Срочная виза за 3 часа или стандартная за 3 дня для граждан более 95 стран. 100% одобрение.",
        features: ["Срочное оформление 3ч", "Для 95+ стран мира", "Безопасная оплата картой"],
        cta: "Оформить визу",
      },
      transfer: {
        id: "transfer",
        badge: "24/7 ВСТРЕЧА В АЭРОПОРТУ",
        title: "Трансфер из Аэропорта",
        desc: "Встреча с табличкой в GYD, отслеживание рейсов, опция женщины-водителя и сопровождения гида.",
        features: ["Отслеживание рейса и 60 мин ожидания", "Седаны, внедорожники и VIP минивэны", "Опция женщины-водителя"],
        cta: "Заказать трансфер",
      },
      custom: {
        id: "custom",
        badge: "100% ИНДИВИДУАЛЬНО",
        title: "Конструктор Туров",
        desc: "Создайте персональный маршрут по Азербайджану: собственный автомобиль с водителем и лучшие отели.",
        features: ["Пошаговый план поездки", "Личный автомобиль с водителем", "Расчёт стоимости за 30 мин"],
        cta: "Создать маршрут",
      },
      medical: {
        id: "medical",
        badge: "ЛЕЧЕНИЕ И СПА",
        title: "Медицинский туризм и Нафталан",
        desc: "Знаменитые на весь мир ванны из целебной нефти в Нафталане, термальные источники и санатории высшего класса.",
        features: ["Лицензированные клиники", "Консультация врача включена", "Санаторное питание «Всё включено»"],
        cta: "Оздоровительные туры",
      },
      mice: {
        id: "mice",
        badge: "КОРПОРАТИВНЫМ КЛИЕНТАМ",
        title: "MICE и Мероприятия",
        desc: "Организация конференций, тимбилдингов, трансферов делегаций и банкетов в Баку и регионах.",
        features: ["Полный цикл логистики", "Собственный автопарк Sprinter", "Персональный координатор"],
        cta: "Запросить смету MICE",
      },
    },
    trust1: "Лицензированный туроператор Государственного агентства по туризму",
    trust2: "Автоматизированная моментальная выдача ваучеров и QR-кодов",
    trust3: "Круглосуточный консьерж-сервис 24/7 в Баку",
    bottomBannerText: "Требуется индивидуальный комбинированный тур или корпоративное обслуживание?",
    bottomBannerCta: "Связаться со специалистом",
  },
  FR: {
    badge: "LES INDISPENSABLES DU VOYAGE",
    title: "Tout pour Votre Séjour en Azerbaïdjan",
    subtitle: "Du visa officiel ASAN et de l'eSIM 4G/5G aux transferts VIP avec chauffeur et circuits sur-mesure — réservez en 1 clic.",
    services: {
      esim: {
        id: "esim",
        badge: "NOUVEAU · 4G/5G",
        title: "eSIM Touristique Internet",
        desc: "Données mobiles 4G/5G ultra-rapides prêtes dès votre atterrissage à Bakou. Aucune file d'attente, QR code immédiat.",
        features: ["Activation QR en 1 min", "Forfaits de 3 à 20 Go", "Conservez votre numéro WhatsApp"],
        cta: "Voir les Forfaits eSIM",
      },
      visa: {
        id: "visa",
        badge: "OFFICIEL · 3 HEURES",
        title: "e-Visa Officiel ASAN",
        desc: "Traitement urgent en 3 heures ou standard en 3 jours pour les ressortissants de plus de 95 pays éligibles.",
        features: ["Traitement express en 3h", "Éligible pour 95+ pays", "Paiement sécurisé par carte"],
        cta: "Demander un e-Visa",
      },
      transfer: {
        id: "transfer",
        badge: "ACCUEIL VIP 24/7",
        title: "Chauffeur Aéroport de Bakou",
        desc: "Transferts avec accueil pancarte à l'aéroport GYD, suivi des vols et option chauffeuse ou guide touristique agréé.",
        features: ["Suivi du vol et 60 min d'attente", "Berlines, SUV et Minivans VIP", "Option chauffeuse disponible"],
        cta: "Réserver un Chauffeur",
      },
      custom: {
        id: "custom",
        badge: "100% SUR-MESURE",
        title: "Planificateur de Circuit Privé",
        desc: "Créez votre voyage personnalisé avec véhicule privé, hôtels de charme ou 5 étoiles et devis transparent sous 30 min.",
        features: ["Itinéraire étape par étape", "Véhicule et chauffeur privé", "Réponse devis sous 30 min"],
        cta: "Créer Mon Circuit",
      },
      medical: {
        id: "medical",
        badge: "SANTÉ & BIEN-ÊTRE",
        title: "Séjours Thermaux & Naftalan",
        desc: "Bains de pétrole thérapeutique mondialement reconnus à Naftalan, cures thermales et hébergements tout confort.",
        features: ["Sanatoriums certifiés", "Examens médicaux inclus", "Formule pension complète"],
        cta: "Découvrir les Séjours",
      },
      mice: {
        id: "mice",
        badge: "VOYAGES D'AFFAIRES",
        title: "MICE & Événements d'Entreprise",
        desc: "Organisation de congrès, séminaires de direction, dîners de gala et transport exécutif à travers l'Azerbaïdjan.",
        features: ["Logistique complète clé en main", "Flotte Sprinter VIP", "Chefs de projet bilingues"],
        cta: "Devis Événementiel",
      },
    },
    trust1: "Agence Agréée par l'Agence Nationale du Tourisme",
    trust2: "Délivrance Instantanée Automatisée et QR Codes",
    trust3: "Conciergerie Opérationnelle Disponible 24/7",
    bottomBannerText: "Vous souhaitez un forfait d'entreprise ou une combinaison personnalisée ?",
    bottomBannerCta: "Contacter un Spécialiste à Bakou",
  },
  AR: {
    badge: "جميع خدمات السفر في أذربيجان",
    title: "كل ما تحتاجه لرحلتك إلى أذربيجان في مكان واحد",
    subtitle: "من تأشيرة ASAN الرسمية وشريحة eSIM إلى استقبال المطار والجولات الخاصة — احجز بنقرة واحدة بكل سهولة.",
    services: {
      esim: {
        id: "esim",
        badge: "جديد · 4G/5G",
        title: "شريحة إنترنت eSIM",
        desc: "إنترنت 4G/5G فائق السرعة فور وصولك إلى مطار باكو. بدون طوابير، تسليم فوري لرمز QR.",
        features: ["تفعيل برمز QR في دقيقة واحدة", "باقات من 3 إلى 20 جيجابايت", "الحفاظ على رقم واتساب الأصلي"],
        cta: "اختر باقة eSIM",
      },
      visa: {
        id: "visa",
        badge: "رسمي · 3 ساعات",
        title: "تأشيرة أذربيجان الإلكترونية",
        desc: "تأشيرة رسمية مستعجلة خلال 3 ساعات أو عادية خلال 3 أيام لمواطني أكثر من 95 دولة معتمدة.",
        features: ["إصدار مستعجل خلال 3 ساعات", "متاح لمواطني 95+ دولة", "دفع إلكتروني آمن"],
        cta: "قدم على التأشيرة",
      },
      transfer: {
        id: "transfer",
        badge: "استقبال 24/7",
        title: "توصيل مطار باكو VIP",
        desc: "استقبال بلوحة الاسم في مطار حيدر علييف وتتبع الرحلة، مع خيار سائقة أنثى أو مرشد سياحي مرافق.",
        features: ["تتبع الرحلة وانتظار 60 دقيقة مجاناً", "سيارات سيدان، دفع رباعي وميني فان VIP", "خيار سائقة أنثى متوفر"],
        cta: "احجز توصيل المطار",
      },
      custom: {
        id: "custom",
        badge: "100% حسب الطلب",
        title: "مخطط البرامج السياحية الخاصة",
        desc: "صمم رحلتك المتكاملة لعدة أيام مع سيارة خاصة وسائق، وفنادق فاخرة بأسعار شفافة وعرض سعر خلال 30 دقيقة.",
        features: ["جدول يومي مخصص بالكامل", "سيارة وسائق خاص مرافق", "عرض سعر مفصل خلال 30 دقيقة"],
        cta: "صمم رحلتك الآن",
      },
      medical: {
        id: "medical",
        badge: "صحة واستجمام",
        title: "السياحة العلاجية ونفطالان",
        desc: "حمامات النفط العلاجي الطبيعي الفريدة عالمياً في نفطالان، والينابيع الحارة ومصحات الاستشفاء المتكاملة.",
        features: ["مصحات معتمدة دولياً", "فحوصات طبية واستشارات متخصصة", "إقامة شاملة الوجبات والعلاج"],
        cta: "استكشف برامج الاستشفاء",
      },
      mice: {
        id: "mice",
        badge: "وفود وشركات",
        title: "سياحة المؤتمرات والشركات",
        desc: "إدارة المؤتمرات، رحلات الحوافز للشركات، العشاء الفاخر والنقل التنفيذي في جميع مدن أذربيجان.",
        features: ["إدارة لوجستية متكاملة للفعاليات", "أسطول مرسيدس سبرينتر VIP", "مدراء مشاريع متحدثون بالعربية"],
        cta: "طلب عرض أسعار للشركات",
      },
    },
    trust1: "مرخص رسمياً من هيئة السياحة الحكومية في أذربيجان",
    trust2: "إصدار آلي فوري لرموز التفعيل والقسائم الإلكترونية",
    trust3: "خدمة كونسيرج ومساندة مباشرة على مدار الساعة 24/7",
    bottomBannerText: "هل تبحث عن برنامج مخصص لمجموعة عائلية أو ترتيبات خاصة لشركة؟",
    bottomBannerCta: "تحدث مع خبير السفر في باكو",
  },
  DE: {
    badge: "ASERBAIDSCHAN REISE-ESSENTIALS",
    title: "Alles für Ihre perfekte Aserbaidschan-Reise",
    subtitle: "Vom offiziellen ASAN e-Visum und 4G/5G eSIMs bis hin zum VIP-Flughafentransfer und individuellen Rundreisen — alles mit 1 Klick.",
    services: {
      esim: {
        id: "esim",
        badge: "NEU · 4G/5G",
        title: "Touristen-eSIM Internet",
        desc: "Highspeed 4G/5G Mobilfunkdaten direkt nach der Landung in Baku. Keine Warteschlangen am Kiosk, sofortiger QR-Code per E-Mail.",
        features: ["1-Minuten QR-Code Setup", "3 GB bis 20 GB Datentarife", "Bestehende WhatsApp-Nummer behalten"],
        cta: "eSIM Tarife ansehen",
      },
      visa: {
        id: "visa",
        badge: "OFFIZIELL · 3 STUNDEN",
        title: "Offizielles ASAN e-Visum",
        desc: "Expressvisum in 3 Stunden oder Standardvisum in 3 Tagen für Staatsbürger von über 95 teilnahmeberechtigten Ländern.",
        features: ["3-Stunden Express-Bearbeitung", "Gültig für 95+ Länder", "Sichere Kartenzahlung"],
        cta: "e-Visum beantragen",
      },
      transfer: {
        id: "transfer",
        badge: "24/7 VIP ABHOLUNG",
        title: "Baku Flughafen Chauffeur",
        desc: "Direkttransfer vom Flughafen GYD mit Namensschild, Flugverfolgung und Option für Chauffeurin oder lizenzierten Guide.",
        features: ["Flugverfolgung & 60 Min. Wartezeit", "Limousinen, SUVs & VIP-Minivans", "Chauffeurin-Option verfügbar"],
        cta: "Flughafentransfer buchen",
      },
      custom: {
        id: "custom",
        badge: "100% INDIVIDUELL",
        title: "Individueller Reiseplaner",
        desc: "Gestalten Sie Ihre private Mehrtagestour durch Aserbaidschan mit eigenem Fahrer, Boutique- oder 5-Sterne-Hotels.",
        features: ["Detaillierter Tagesplan", "Privatfahrzeug mit Chauffeur", "Angebot innerhalb von 30 Minuten"],
        cta: "Reise zusammenstellen",
      },
      medical: {
        id: "medical",
        badge: "WELLNESS & KUR",
        title: "Heilöl-Therapie Naftalan",
        desc: "Weltberühmte therapeutische Rohölbäder in Naftalan, Thermalquellen und erstklassige Sanatorien zur Revitalisierung.",
        features: ["Zertifizierte Fachkliniken", "Ärztliche Betreuung inklusive", "Vollpension Kuraufenthalt"],
        cta: "Kur-Reisen entdecken",
      },
      mice: {
        id: "mice",
        badge: "B2B & FIRMENREISEN",
        title: "MICE & Firmenevents",
        desc: "Schlüsselfertiges Kongressmanagement, Incentive-Reisen, Galadinner und Delegationslogistik in ganz Aserbaidschan.",
        features: ["Komplette Event-Logistik", "Moderne VIP-Sprinter-Flotte", "Erfahrene Projektleiter vor Ort"],
        cta: "MICE-Angebot anfordern",
      },
    },
    trust1: "Zertifizierter Reiseveranstalter der Staatlichen Tourismusagentur",
    trust2: "Automatisierte Sofortausstellung von Vouchern und QR-Codes",
    trust3: "Persönlicher 24/7 Concierge-Service in Baku",
    bottomBannerText: "Benötigen Sie ein maßgeschneidertes Firmen- oder Familien-Paket?",
    bottomBannerCta: "Baku Reise-Experten kontaktieren",
  },
};
