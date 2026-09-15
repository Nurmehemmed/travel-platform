import type { LanguageCode } from "./i18n";

export interface LocalizedTourData {
  title: string;
  desc: string;
  duration: string;
  groupSize: string;
  badge?: string;
  tags: string[];
}

export interface LocalizedHeroSlide {
  badge: string;
  title: string;
  subtitle: string;
}

export interface LocalizedTestimonial {
  quote: string;
  subtitle: string;
}

export const LOCALIZED_SLIDES: Record<LanguageCode, LocalizedHeroSlide[]> = {
  EN: [
    {
      badge: "TripAdvisor Travelers' Choice · Baku, Azerbaijan",
      title: "Into the Great Caucasus",
      subtitle: "Highland villages, Silk Road caravansaries, and mountain air — Azerbaijan beyond the city.",
    },
    {
      badge: "UNESCO Heritage & Modern Marvels",
      title: "Enchanting Baku & Caspian Shores",
      subtitle: "Cobblestone alleys of ancient Icherisheher, dazzling Flame Towers, and seaside boulevard sunsets.",
    },
    {
      badge: "Mystical Land of Fire · Ancient Wonders",
      title: "Gobustan & The Land of Sacred Fire",
      subtitle: "Active bubbling mud volcanoes, 40,000-year-old prehistoric rock art, and eternal burning flames.",
    },
  ],
  AZ: [
    {
      badge: "TripAdvisor Travelers' Choice · Bakı, Azərbaycan",
      title: "Möhtəşəm Böyük Qafqaz Dağları",
      subtitle: "Yüksək dağ kəndləri, İpək Yolu karvansaraları və təmiz dağ havası — şəhərdən kənarda Azərbaycan.",
    },
    {
      badge: "YUNESKO İrsi və Müasir Möcüzələr",
      title: "Füsunkar Bakı və Xəzər Sahilləri",
      subtitle: "Qədim İçərişəhərin daş küçələri, parlaq Alov Qüllələri və dənizkənarı bulvar qürubları.",
    },
    {
      badge: "Mistik Odlar Yurdu · Qədim Sirlər",
      title: "Qobustan və Müqəddəs Odlar Diyarı",
      subtitle: "Qaynayan palçıq vulkanları, 40.000 illik qayaüstü rəsmlər və sönməz əbədi alovlar.",
    },
  ],
  RU: [
    {
      badge: "TripAdvisor Travelers' Choice · Баку, Азербайджан",
      title: "В сердце Большого Кавказа",
      subtitle: "Высокогорные села, караван-сараи Великого шелкового пути и чистый горный воздух.",
    },
    {
      badge: "Наследие ЮНЕСКО и современные чудеса",
      title: "Очаровательный Баку и побережье Каспия",
      subtitle: "Брусчатые улочки Ичери-шехер, сияющие Пламенные башни и романтические закаты на бульваре.",
    },
    {
      badge: "Страна огней · Древние тайны",
      title: "Гобустан и Земля Священного Огня",
      subtitle: "Бурлящие грязевые вулканы, петроглифы возрастом 40 000 лет и вечные языки пламени.",
    },
  ],
  FR: [
    {
      badge: "TripAdvisor Travelers' Choice · Bakou, Azerbaïdjan",
      title: "Au cœur du Grand Caucase",
      subtitle: "Villages d'altitude, caravansérails de la Route de la Soie et air pur des sommets.",
    },
    {
      badge: "Patrimoine UNESCO & Merveilles Modernes",
      title: "Bakou enchanteresse & Rives de la Caspienne",
      subtitle: "Ruelles pavées d'Icherisheher, Flame Towers scintillantes et couchers de soleil sur la mer.",
    },
    {
      badge: "Terre du Feu Sacré · Mystères Antiques",
      title: "Goboustan & Le Pays des Flammes Éternelles",
      subtitle: "Volcans de boue bouillonnants, gravures rupestres vieilles de 40 000 ans et feux sacrés.",
    },
  ],
  AR: [
    {
      badge: "اختيار المسافرين على تريب أدفايزر · باكو، أذربيجان",
      title: "في قلب جبال القوقاز الكبرى",
      subtitle: "قرى جبلية شاهقة، وخانات طريق الحرير التاريخية، ونقاء الطبيعة الأذربيجانية الساحرة.",
    },
    {
      badge: "تراث اليونسكو والعمارة العصرية",
      title: "سحر باكو وضفاف بحر قزوين",
      subtitle: "أزقة باكو القديمة المرصوفة، وأبراج اللهب المتلألئة، وغروب الشمس الأخّاذ على الكورنيش.",
    },
    {
      badge: "أرض النار الأسطورية · عجائب التاريخ",
      title: "قوبوستان وأرض النار المقدسة",
      subtitle: "براكين طينية نشطة، وفنون صخرية عمرها 40,000 عام، وشعلات نارية أبدية لا تنطفئ.",
    },
  ],
  DE: [
    {
      badge: "TripAdvisor Travelers' Choice · Baku, Aserbaidschan",
      title: "In das Herz des Großen Kaukasus",
      subtitle: "Hochgebirgsdörfer, Karawansereien der Seidenstraße und reine Bergluft abseits der Großstadt.",
    },
    {
      badge: "UNESCO-Welterbe & Moderne Wunder",
      title: "Zauberhaftes Baku & Kaspische Küste",
      subtitle: "Historische Gassen von Icherisheher, glänzende Flame Towers und Sonnenuntergänge am Boulevard.",
    },
    {
      badge: "Land des Ewigen Feuers · Uralte Mysterien",
      title: "Gobustan & Das Land des Heiligen Feuers",
      subtitle: "Aktive Schlammvulkane, 40.000 Jahre alte Felsbilder und ewige Flammen.",
    },
  ],
};

export const LOCALIZED_TOURS: Record<LanguageCode, Record<string, LocalizedTourData>> = {
  EN: {
    t1: {
      title: "Baku Old City Walking Tour",
      desc: "Wander through the UNESCO-listed Icherisheher (Old City), discover ancient caravanserais and hidden courtyards.",
      duration: "3 hours",
      groupSize: "Up to 10",
      badge: "Best Seller",
      tags: ["Walking", "History", "Culture"],
    },
    t2: {
      title: "Absheron Peninsula Day Trip",
      desc: "Explore the Ateshgah Fire Temple, the otherworldly Yanar Dag, and coastal landscapes unique to Azerbaijan.",
      duration: "8 hours",
      groupSize: "Up to 8",
      badge: "Popular",
      tags: ["History", "Nature", "Private"],
    },
    t3: {
      title: "Sheki Cultural Journey",
      desc: "Drive north into the Caucasus foothills to Sheki's 18th-century Khan Palace and medieval caravanserai.",
      duration: "2 days",
      groupSize: "Up to 6",
      badge: "Limited Deal",
      tags: ["Overnight", "Culture", "Scenery"],
    },
    t4: {
      title: "Modern Baku Architecture Tour",
      desc: "Discover Baku's transformation from Soviet city to futuristic skyline — Flame Towers and Heydar Aliyev Center.",
      duration: "4 hours",
      groupSize: "Up to 12",
      tags: ["Architecture", "Photography", "Walking"],
    },
    t5: {
      title: "Gobustan Petroglyphs & Mud Volcanoes",
      desc: "Visit one of the world's oldest art galleries — 20,000-year-old rock carvings, then witness mud volcanoes.",
      duration: "6 hours",
      groupSize: "Up to 8",
      badge: "Top Rated",
      tags: ["Nature", "Archaeology", "Unique"],
    },
    t6: {
      title: "Caucasus Mountain Highlands",
      desc: "Drive north into the Great Caucasus range to the medieval village of Lahij, Gabala, and alpine scenery above 2,000m.",
      duration: "Full day",
      groupSize: "Up to 6",
      badge: "Adventure",
      tags: ["Adventure", "Mountains", "Villages"],
    },
  },
  AZ: {
    t1: {
      title: "İçərişəhər Piyada Qədim Bakı Turu",
      desc: "YUNESKO irsi İçərişəhər, Qız Qalası, qədim karvansaralar və tarixi həyətlər boyu bələdçili gəzinti.",
      duration: "3 saat",
      groupSize: "10 nəfərə qədər",
      badge: "Ən Çox Satılan",
      tags: ["Piyada", "Tarix", "Mədəniyyət"],
    },
    t2: {
      title: "Abşeron Yarımadası Günübirlik Turu",
      desc: "Atəşgah Atəş Məbədi, əbədi yanan Yanardağ və Xəzər dənizinin unikal sahilləri.",
      duration: "8 saat",
      groupSize: "8 nəfərə qədər",
      badge: "Məşhur",
      tags: ["Tarix", "Təbiət", "Fərdi"],
    },
    t3: {
      title: "Şəki Mədəni Səyahəti",
      desc: "Böyük Qafqaz dağlarının ətəklərinə, 18-ci əsr Şəki Xan Sarayı və orta əsr karvansarasına səfər.",
      duration: "2 gün",
      groupSize: "6 nəfərə qədər",
      badge: "Xüsusi Təklif",
      tags: ["Gecələməli", "Mədəniyyət", "Mənzərə"],
    },
    t4: {
      title: "Müasir Bakı Memarlıq Turu",
      desc: "Bakının futuristik siması: Alov Qüllələri və dünya şöhrətli Heydər Əliyev Mərkəzi.",
      duration: "4 saat",
      groupSize: "12 nəfərə qədər",
      tags: ["Memarlıq", "Fotoqrafiya", "Piyada"],
    },
    t5: {
      title: "Qobustan Qayaüstü Rəsmləri və Palçıq Vulkanları",
      desc: "20 min illik qayaüstü rəsmlər və dünyanın ən aktiv palçıq vulkanlarına möhtəşəm səfər.",
      duration: "6 saat",
      groupSize: "8 nəfərə qədər",
      badge: "Ən Yüksək Reytinq",
      tags: ["Təbiət", "Arxeologiya", "Unikal"],
    },
    t6: {
      title: "Böyük Qafqaz Dağlıq Turu",
      desc: "Lahıc qədim misgərlik kəndi, Qəbələ və 2000 metrdən yüksək dağ mənzərələrinə unudulmaz səyahət.",
      duration: "Tam gün",
      groupSize: "6 nəfərə qədər",
      badge: "Macəra",
      tags: ["Macəra", "Dağlar", "Kəndlər"],
    },
  },
  RU: {
    t1: {
      title: "Пешеходная экскурсия по Старому городу Баку",
      desc: "Прогулка по Ичери-шехер (ЮНЕСКО), Девичьей башне, древним караван-сараям и уютным улочкам.",
      duration: "3 часа",
      groupSize: "До 10 чел.",
      badge: "Хит продаж",
      tags: ["Пешеходный", "История", "Культура"],
    },
    t2: {
      title: "Однодневный тур по Апшеронскому полуострову",
      desc: "Храм огнепоклонников Атешгях, вечно горящая гора Янардаг и побережье Каспия.",
      duration: "8 часов",
      groupSize: "До 8 чел.",
      badge: "Популярный",
      tags: ["История", "Природа", "Индивидуальный"],
    },
    t3: {
      title: "Культурное путешествие в Шеки",
      desc: "Путешествие к подножию Кавказа: Дворец шекинских ханов XVIII века и средневековый караван-сарай.",
      duration: "2 дня",
      groupSize: "До 6 чел.",
      badge: "Спецпредложение",
      tags: ["С ночевкой", "Культура", "Пейзажи"],
    },
    t4: {
      title: "Тур по современной архитектуре Баку",
      desc: "От колорита советской эпохи до космического футуризма: Пламенные башни и Центр Гейдара Алиева.",
      duration: "4 часа",
      groupSize: "До 12 чел.",
      tags: ["Архитектура", "Фотография", "Пешеходный"],
    },
    t5: {
      title: "Гобустанские петроглифы и грязевые вулканы",
      desc: "Наскальные рисунки возрастом 20 000 лет и знаменитые грязевые вулканы Азербайджана.",
      duration: "6 часов",
      groupSize: "До 8 чел.",
      badge: "Высокий рейтинг",
      tags: ["Природа", "Археология", "Уникальный"],
    },
    t6: {
      title: "Высокогорья Большого Кавказа",
      desc: "Поездка в высокогорное ремесленное село Лагич, курортную Габалу и горы на высоте более 2000 м.",
      duration: "Полный день",
      groupSize: "До 6 чел.",
      badge: "Приключения",
      tags: ["Приключения", "Горы", "Деревни"],
    },
  },
  FR: {
    t1: {
      title: "Visite à pied de la vieille ville de Bakou",
      desc: "Promenez-vous dans Icherisheher classée à l'UNESCO, découvrez les anciens caravansérails et ruelles secrètes.",
      duration: "3 heures",
      groupSize: "Jusqu'à 10 pers.",
      badge: "Meilleure vente",
      tags: ["Pédestre", "Histoire", "Culture"],
    },
    t2: {
      title: "Excursion d'une journée en péninsule d'Abchéron",
      desc: "Visitez le temple du feu d'Atechgah, le mont éternel Yanar Dag et le littoral sauvage de la mer Caspienne.",
      duration: "8 heures",
      groupSize: "Jusqu'à 8 pers.",
      badge: "Populaire",
      tags: ["Histoire", "Nature", "Privé"],
    },
    t3: {
      title: "Voyage culturel à Sheki",
      desc: "Route vers le Grand Caucase jusqu'au palais des Khans de Sheki et ses caravansérails médiévaux.",
      duration: "2 jours",
      groupSize: "Jusqu'à 6 pers.",
      badge: "Offre spéciale",
      tags: ["Circuit 2 jours", "Culture", "Panoramique"],
    },
    t4: {
      title: "Architecture moderne de Bakou",
      desc: "Découvrez la métamorphose de Bakou : Flame Towers et le chef-d'œuvre de Zaha Hadid.",
      duration: "4 heures",
      groupSize: "Jusqu'à 12 pers.",
      tags: ["Architecture", "Photo", "Pédestre"],
    },
    t5: {
      title: "Pétroglyphes de Goboustan & Volcans de boue",
      desc: "Explorez des gravures rupestres vieilles de 20 000 ans, puis observez les volcans de boue spectaculaires.",
      duration: "6 heures",
      groupSize: "Jusqu'à 8 pers.",
      badge: "Mieux noté",
      tags: ["Nature", "Archéologie", "Unique"],
    },
    t6: {
      title: "Hauts plateaux du Grand Caucase",
      desc: "Voyage vers le village médiéval d'artisans de Lahij, Gabala et les panoramas alpins à plus de 2 000 m.",
      duration: "Journée entière",
      groupSize: "Jusqu'à 6 pers.",
      badge: "Aventure",
      tags: ["Aventure", "Montagne", "Villages"],
    },
  },
  AR: {
    t1: {
      title: "جولة مشي في باكو القديمة (إيشري شهر)",
      desc: "تجول في مدينة إيشري شهر القديمة المسجلة باليونسكو، واكتشف الخانات التاريخية والأزقة العتيقة.",
      duration: "3 ساعات",
      groupSize: "حتى 10 أشخاص",
      badge: "الأكثر طلباً",
      tags: ["مشي", "تاريخ", "ثقافة"],
    },
    t2: {
      title: "رحلة يوم كامل إلى شبه جزيرة أبشوران",
      desc: "معبد النار أتشغاه، وجبل النار الخالد يانار داغ، والمناظر الساحلية الفريدة لبحر قزوين.",
      duration: "8 ساعات",
      groupSize: "حتى 8 أشخاص",
      badge: "شائع جداً",
      tags: ["تاريخ", "طبيعة", "خاص"],
    },
    t3: {
      title: "رحلة شيكي الثقافية التراثية",
      desc: "السفر نحو سفوح جبال القوقاز لزيارة قصر خانات شيكي العريق وخان القوافل التاريخي.",
      duration: "يومان",
      groupSize: "حتى 6 أشخاص",
      badge: "عرض خاص",
      tags: ["مبيت", "ثقافة", "مناظر"],
    },
    t4: {
      title: "جولة العمارة الحديثة في باكو",
      desc: "استكشف النهضة المعمارية لباكو: أبراج اللهب المتلألئة ومركز حيدر علييف الأيقوني.",
      duration: "4 ساعات",
      groupSize: "حتى 12 شخص",
      tags: ["عمارة", "تصوير", "مشي"],
    },
    t5: {
      title: "نقوش قوبوستان والبراكين الطينية",
      desc: "نقوش صخرية نادرة عمرها 20,000 عام، تليها زيارة أروع البراكين الطينية النشطة في العالم.",
      duration: "6 ساعات",
      groupSize: "حتى 8 أشخاص",
      badge: "الأعلى تقييماً",
      tags: ["طبيعة", "آثار", "فريد"],
    },
    t6: {
      title: "مرتفعات جبال القوقاز الكبرى",
      desc: "رحلة نحو قرية لاهيج الحرفية التاريخية، ومنتجع غابالا الجبلي، ومناظر الألب بارتفاع يفوق 2000 متر.",
      duration: "يوم كامل",
      groupSize: "حتى 6 أشخاص",
      badge: "مغامرة",
      tags: ["مغامرة", "جبال", "قرى"],
    },
  },
  DE: {
    t1: {
      title: "Baku Altstadt-Rundgang",
      desc: "Spazieren Sie durch das UNESCO-Weltkulturerbe Icherisheher, historische Karawansereien und geheime Innenhöfe.",
      duration: "3 Stunden",
      groupSize: "Bis zu 10",
      badge: "Bestseller",
      tags: ["Spaziergang", "Geschichte", "Kultur"],
    },
    t2: {
      title: "Tagestour Absheron-Halbinsel",
      desc: "Erkunden Sie den Feuertempel Ateshgah, den brennenden Berg Yanar Dag und Kaspische Küsten.",
      duration: "8 Stunden",
      groupSize: "Bis zu 8",
      badge: "Beliebt",
      tags: ["Geschichte", "Natur", "Privat"],
    },
    t3: {
      title: "Kulturreise nach Sheki",
      desc: "Fahrt in die Ausläufer des Kaukasus zum Khan-Palast von Sheki und mittelalterlichen Karawansereien.",
      duration: "2 Tage",
      groupSize: "Bis zu 6",
      badge: "Top-Angebot",
      tags: ["Mehrtägig", "Kultur", "Landschaft"],
    },
    t4: {
      title: "Moderne Architektur in Baku",
      desc: "Vom sowjetischen Erbe zur futuristischen Skyline: Flame Towers und Heydar-Aliyev-Zentrum.",
      duration: "4 Stunden",
      groupSize: "Bis zu 12",
      tags: ["Architektur", "Fotografie", "Rundgang"],
    },
    t5: {
      title: "Gobustan Felsbilder & Schlammvulkane",
      desc: "Besuchen Sie 20.000 Jahre alte Felsgravuren und die berühmten blubbernden Schlammvulkane.",
      duration: "6 Stunden",
      groupSize: "Bis zu 8",
      badge: "Top bewertet",
      tags: ["Natur", "Archäologie", "Einzigartig"],
    },
    t6: {
      title: "Hochgebirge des Großen Kaukasus",
      desc: "Nordwärts ins Kaukasus-Gebirge: Kupferschmiede-Dorf Lahij, Gabala und alpine Landschaften über 2.000 m.",
      duration: "Ganztagstour",
      groupSize: "Bis zu 6",
      badge: "Abenteuer",
      tags: ["Abenteuer", "Berge", "Dörfer"],
    },
  },
};

export const LOCALIZED_TESTIMONIALS: Record<LanguageCode, LocalizedTestimonial[]> = {
  EN: [
    {
      quote:
        "Our guide Elchin was extraordinary — deeply knowledgeable, funny, and genuinely passionate about Baku's history. The Old City tour felt like walking through living pages of a history book. Absolutely book this.",
      subtitle: "United Kingdom · Baku Old City Walking Tour",
    },
    {
      quote:
        "We did the Absheron Peninsula tour and couldn't believe how much was packed into one day. The fire temple at sunset was one of the most beautiful things I've ever seen. AddmeTour made it seamless.",
      subtitle: "Italy · Absheron Peninsula Day Trip",
    },
    {
      quote:
        "The Gobustan mud volcanoes were unlike anything I've seen anywhere in the world. Our driver was punctual, the guide was excellent, and the whole experience was perfectly organized. Highly recommended.",
      subtitle: "Japan · Gobustan Petroglyphs & Mud Volcanoes",
    },
  ],
  AZ: [
    {
      quote:
        "Bələdçimiz Elçin fövqəladə idi — çox bilikli, şən və Bakının tarixinə həqiqətən aşiq. İçərişəhər turu sanki canlı tarix kitabının vərəqləri arasında gəzmək kimi idi. Mütləq tövsiyə edirəm.",
      subtitle: "Böyük Britaniya · İçərişəhər Piyada Turu",
    },
    {
      quote:
        "Abşeron turunda bir günə bu qədər çox maraqlı yerin sığmasına inana bilmədik. Qürub vaxtı Atəşgah məbədi gördüyüm ən gözəl mənzərələrdən biri idi. AddmeTour hər şeyi qüsursuz təşkil etdi.",
      subtitle: "İtaliya · Abşeron Yarımadası Turu",
    },
    {
      quote:
        "Qobustan palçıq vulkanları dünyada gördüyüm heç bir şeyə bənzəmirdi. Sürücümüz vaxtında gəldi, bələdçimiz əla idi və bütün təşkilatçılıq çox yüksək səviyyədə idi. Çox tövsiyə edirəm.",
      subtitle: "Yaponiya · Qobustan və Palçıq Vulkanları Turu",
    },
  ],
  RU: [
    {
      quote:
        "Наш гид Эльчин был великолепен — глубокие знания, отличное чувство юмора и искренняя любовь к Баку. Экскурсия по Старому городу ощущалась как ожившая книга истории. Очень рекомендуем!",
      subtitle: "Великобритания · Экскурсия по Старому Баку",
    },
    {
      quote:
        "Мы взяли тур по Апшерону и были поражены насыщенностью программы! Храм огнепоклонников на закате — одно из красивейших зрелищ в моей жизни. AddmeTour сделали все на высшем уровне.",
      subtitle: "Италия · Однодневный тур по Апшерону",
    },
    {
      quote:
        "Грязевые вулканы Гобустана не похожи ни на что в мире! Водитель пунктуальный, гид потрясающий, организация безупречна от первой до последней минуты. Обязательно к посещению!",
      subtitle: "Япония · Гобустан и Грязевые вулканы",
    },
  ],
  FR: [
    {
      quote:
        "Notre guide Elchin a été extraordinaire : passionné, drôle et érudit. La visite de la vieille ville de Bakou nous a plongés dans les pages vivantes de l'histoire. Une expérience à ne pas manquer !",
      subtitle: "Royaume-Uni · Visite guidée de la vieille ville",
    },
    {
      quote:
        "Nous avons fait l'excursion de la péninsule d'Abchéron : un programme d'une richesse incroyable en une journée. Le temple du feu au crépuscule était magique. Merci AddmeTour pour cette organisation impeccable.",
      subtitle: "Italie · Excursion péninsule d'Abchéron",
    },
    {
      quote:
        "Les volcans de boue de Goboustan sont un spectacle naturel unique au monde. Chauffeur ponctuel, guide exceptionnel, logistique parfaite. Nous recommandons vivement leurs services.",
      subtitle: "Japon · Goboustan & Volcans de boue",
    },
  ],
  AR: [
    {
      quote:
        "مرشدنا إلتشين كان رائعاً للغاية — ثقافة واسعة، وروح مرحة، وشغف حقيقي بتاريخ باكو العريق. الجولة في المدينة القديمة كانت بمثابة السير في صفحات التاريخ الحي. نوصي بها بشدة!",
      subtitle: "المملكة المتحدة · جولة باكو القديمة سيراً",
    },
    {
      quote:
        "قمنا بجولة شبه جزيرة أبشوران وكانت تجربة تفوق الوصف في يوم واحد. معبد النار عند الغروب من أجمل المشاهد التي رأيتها في حياتي. تنظيم AddmeTour كان في غاية السلاسة والاحتراف.",
      subtitle: "إيطاليا · رحلة شبه جزيرة أبشوران",
    },
    {
      quote:
        "براكين قوبوستان الطينية لا مثيل لها في العالم. السائق كان دقيقاً في الموعد، والمرشد ممتازاً، والرحلة بأكملها نُظمت بأعلى درجات الجودة والراحة. أنصح بهذه الشركة بكل تأكيد.",
      subtitle: "اليابان · نقوش قوبوستان والبراكين الطينية",
    },
  ],
  DE: [
    {
      quote:
        "Unser Guide Elchin war herausragend — hochkompetent, humorvoll und mit echter Leidenschaft für Bakus Geschichte. Der Altstadt-Rundgang fühlte sich an wie ein Spaziergang durch lebendige Geschichtsbücher.",
      subtitle: "Großbritannien · Baku Altstadt-Rundgang",
    },
    {
      quote:
        "Die Absheron-Tagestour hat unsere Erwartungen weit übertroffen. Der Feuertempel bei Sonnenuntergang war magisch schön. AddmeTour hat den gesamten Tag absolut reibungslos gestaltet.",
      subtitle: "Italien · Absheron-Halbinsel Tagestour",
    },
    {
      quote:
        "Die Schlammvulkane von Gobustan sind einzigartig auf der Welt. Pünktlicher Fahrer, hervorragender Guide und erstklassige Betreuung. Uneingeschränkte Reiseempfehlung!",
      subtitle: "Japan · Gobustan & Schlammvulkane",
    },
  ],
};

export const BADGE_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  EN: {
    "Best Seller": "Best Seller",
    "New Experience": "New Experience",
    "Popular": "Popular",
    "Limited Deal": "Limited Deal",
    "Top Rated": "Top Rated",
  },
  AZ: {
    "Best Seller": "Ən Çox Satılan",
    "New Experience": "Yeni Təcrübə",
    "Popular": "Məşhur",
    "Limited Deal": "Xüsusi Təklif",
    "Top Rated": "Ən Yüksək Reytinq",
  },
  RU: {
    "Best Seller": "Хит продаж",
    "New Experience": "Новый опыт",
    "Popular": "Популярный",
    "Limited Deal": "Спецпредложение",
    "Top Rated": "Высокий рейтинг",
  },
  FR: {
    "Best Seller": "Meilleure Vente",
    "New Experience": "Nouvelle Expérience",
    "Popular": "Populaire",
    "Limited Deal": "Offre Limitée",
    "Top Rated": "Mieux Noté",
  },
  AR: {
    "Best Seller": "الأكثر مبيعاً",
    "New Experience": "تجربة جديدة",
    "Popular": "شائع",
    "Limited Deal": "عرض محدود",
    "Top Rated": "الأعلى تقييماً",
  },
  DE: {
    "Best Seller": "Bestseller",
    "New Experience": "Neue Erfahrung",
    "Popular": "Beliebt",
    "Limited Deal": "Limitiertes Angebot",
    "Top Rated": "Bestbewertet",
  },
};

export const TAG_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  EN: {
    Walking: "Walking",
    History: "History",
    Culture: "Culture",
    Nature: "Nature",
    Private: "Private",
    Overnight: "Overnight",
    Scenery: "Scenery",
    Architecture: "Architecture",
    Photography: "Photography",
    Guided: "Guided",
    Adventure: "Adventure",
    Sheki: "Sheki",
    Gobustan: "Gobustan",
    Baku: "Baku",
    City: "City",
    "Day Trip": "Day Trip",
  },
  AZ: {
    Walking: "Piyada",
    History: "Tarix",
    Culture: "Mədəniyyət",
    Nature: "Təbiət",
    Private: "Fərdi",
    Overnight: "Gecələməli",
    Scenery: "Mənzərə",
    Architecture: "Memarlıq",
    Photography: "Fotoqrafiya",
    Guided: "Bələdçili",
    Adventure: "Macəra",
    Sheki: "Şəki",
    Gobustan: "Qobustan",
    Baku: "Bakı",
    City: "Şəhər",
    "Day Trip": "Birgünlük",
  },
  RU: {
    Walking: "Пешеходный",
    History: "История",
    Culture: "Культура",
    Nature: "Природа",
    Private: "Индивидуальный",
    Overnight: "С ночевкой",
    Scenery: "Пейзажи",
    Architecture: "Архитектура",
    Photography: "Фотография",
    Guided: "С гидом",
    Adventure: "Приключения",
    Sheki: "Шеки",
    Gobustan: "Гобустан",
    Baku: "Баку",
    City: "Город",
    "Day Trip": "Однодневный",
  },
  FR: {
    Walking: "À pied",
    History: "Histoire",
    Culture: "Culture",
    Nature: "Nature",
    Private: "Privé",
    Overnight: "Avec nuitée",
    Scenery: "Paysages",
    Architecture: "Architecture",
    Photography: "Photographie",
    Guided: "Avec guide",
    Adventure: "Aventure",
    Sheki: "Chéki",
    Gobustan: "Goboustan",
    Baku: "Bakou",
    City: "Ville",
    "Day Trip": "Excursion d'un jour",
  },
  AR: {
    Walking: "مشي",
    History: "تاريخ",
    Culture: "ثقافة",
    Nature: "طبيعة",
    Private: "خاص",
    Overnight: "مع مبيت",
    Scenery: "مناظر",
    Architecture: "عمارة",
    Photography: "تصوير",
    Guided: "مع مرشد",
    Adventure: "مغامرة",
    Sheki: "شاكي",
    Gobustan: "قوبوستان",
    Baku: "باكو",
    City: "مدينة",
    "Day Trip": "رحلة يومية",
  },
  DE: {
    Walking: "Zu Fuß",
    History: "Geschichte",
    Culture: "Kultur",
    Nature: "Natur",
    Private: "Privat",
    Overnight: "Mit Übernachtung",
    Scenery: "Landschaft",
    Architecture: "Architektur",
    Photography: "Fotografie",
    Guided: "Geführt",
    Adventure: "Abenteuer",
    Sheki: "Schäki",
    Gobustan: "Gobustan",
    Baku: "Baku",
    City: "Stadt",
    "Day Trip": "Tagesausflug",
  },
};

export interface LocalizedTourResult {
  title: string;
  desc: string;
  duration: string;
  groupSize: string;
  badge?: string | undefined;
  tags: string[];
}

export function getLocalizedTour(tour: any, lang: LanguageCode): LocalizedTourResult {
  if (!tour) {
    return {
      title: "",
      desc: "",
      duration: "",
      groupSize: "",
      badge: undefined,
      tags: [],
    };
  }

  // 1. Direct ID match
  let matched: LocalizedTourData | undefined = LOCALIZED_TOURS[lang]?.[tour.id];

  // 2. Slug / Title fuzzy match if tour is from database
  if (!matched) {
    const titleLower = (tour.title || "").toLowerCase();
    const slugLower = (tour.slug || "").toLowerCase();
    let key: string | null = null;
    if (titleLower.includes("old city") || slugLower.includes("old-city") || slugLower.includes("baku-old")) key = "t1";
    else if (titleLower.includes("absheron") || slugLower.includes("absheron")) key = "t2";
    else if (titleLower.includes("sheki") || slugLower.includes("sheki")) key = "t3";
    else if (titleLower.includes("modern baku") || titleLower.includes("architecture") || slugLower.includes("modern-baku")) key = "t4";
    else if (titleLower.includes("gobustan") || slugLower.includes("gobustan")) key = "t5";
    else if (titleLower.includes("caucasus") || titleLower.includes("mountain") || slugLower.includes("caucasus") || titleLower.includes("highlands")) key = "t6";

    if (key && LOCALIZED_TOURS[lang]?.[key]) {
      matched = LOCALIZED_TOURS[lang][key];
    }
  }

  const rawBadge = matched?.badge || tour.badge;
  const translatedBadge = rawBadge ? (BADGE_TRANSLATIONS[lang]?.[rawBadge] || rawBadge) : undefined;

  const rawTags: string[] = matched?.tags || tour.tags || [];
  const translatedTags: string[] = rawTags.map((tag: string) => TAG_TRANSLATIONS[lang]?.[tag] || tag);

  return {
    title: matched?.title || tour.title || "",
    desc: matched?.desc || tour.desc || tour.overview || "",
    duration: matched?.duration || tour.duration || (tour.durationDays ? `${tour.durationDays} ${lang === "RU" ? "дн." : lang === "AZ" ? "gün" : "days"}` : ""),
    groupSize: matched?.groupSize || tour.groupSize || (tour.maxGroupSize ? `${lang === "RU" ? "До" : lang === "AZ" ? "qədər" : "Up to"} ${tour.maxGroupSize}` : ""),
    badge: translatedBadge,
    tags: translatedTags,
  };
}
