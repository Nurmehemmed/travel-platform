import type { LanguageCode } from "../../i18n";
import type { LocalizedTransferPolicy } from "./types";

export const LOCALIZED_TRANSFER_POLICY: Record<LanguageCode, LocalizedTransferPolicy> = {
  EN: {
    modalTitle: "Transfer Booking Policy & Guarantees",
    modalSubtitle: "Transparent terms, automated flight tracking, and 24-hour free cancellation.",
    pageTitle: "Airport Transfer Terms & Booking Policy",
    pageSubtitle: "Official service level agreement for private transfers across Azerbaijan airports.",
    lastUpdated: "Last updated: September 2026",
    supportHelp: "Need urgent assistance with your active booking? Our bilingual dispatch team is available 24/7.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "I Understand & Accept",
    btnClose: "Close",
    viewFullTerms: "View Complete Platform Terms of Service →",
    sections: {
      cancellation: {
        title: "1. 24-Hour Free Cancellation & 100% Refund",
        badge: "100% Refund",
        points: [
          "100% full refund for cancellations made at least 24 hours prior to the scheduled pickup time.",
          "50% refund or free date/time reschedule for cancellations requested 12 to 24 hours before pickup.",
          "Non-refundable for cancellations made less than 12 hours prior or in cases of passenger no-show without prior notice.",
          "Card refunds via Payriff are processed back to your issuing bank within 3–7 business days.",
        ],
      },
      flightTracking: {
        title: "2. Live Flight Monitoring & Flight Delays",
        badge: "Live Flight Radar",
        points: [
          "We track your inbound flight in real time using the flight number provided during booking.",
          "If your flight is delayed or lands early, your chauffeur pickup schedule automatically adjusts at zero additional charge.",
          "60 minutes of complimentary wait time is included for international arrivals from actual touchdown.",
          "30 minutes of complimentary wait time is included for domestic flights and hotel departures.",
        ],
      },
      meetAndGreet: {
        title: "3. Terminal Meet & Greet Chauffeur Service",
        badge: "VIP Arrival",
        points: [
          "Your private driver will wait inside the arrivals hall holding a personalized name board.",
          "Full driver details (name, direct mobile number, vehicle model, license plate) will be sent via WhatsApp and email prior to arrival.",
          "Complimentary luggage assistance from the terminal exit gate to the vehicle.",
        ],
      },
      pricingGuarantee: {
        title: "4. All-Inclusive Fixed Pricing Guarantee",
        badge: "No Hidden Fees",
        points: [
          "The price shown is 100% all-inclusive: airport parking fees, highway tolls, fuel, driver fee, and taxes.",
          "No surge pricing during peak hours, midnight arrivals, or adverse weather conditions.",
        ],
      },
      luggageSafety: {
        title: "5. Luggage Capacity & Child Safety",
        badge: "Comfort & Safety",
        points: [
          "Sedan (1–3 passengers): Up to 2 large suitcases (23kg each) + cabin bags.",
          "SUV (1–4 passengers): Up to 4 standard suitcases + cabin bags.",
          "Minivan (4–7 passengers): Up to 6 large suitcases + cabin bags.",
          "Complimentary child safety seats and booster seats available upon request during booking.",
        ],
      },
      vehicleStandards: {
        title: "6. Vehicle Quality & Professional Driver Standards",
        badge: "Licensed & Insured",
        points: [
          "All transfer vehicles are modern, sanitized, fully air-conditioned, commercially insured, and non-smoking.",
          "Chauffeurs are vetted, professionally licensed, and trained to provide hospitable, discreet hospitality.",
        ],
      },
      emergencyDispatch: {
        title: "7. 24/7 Operations Support & Dispatch",
        badge: "24/7 Support",
        points: [
          "Direct emergency hotline and WhatsApp dispatch available 24 hours a day, 7 days a week.",
          "Multilingual dispatch support in English, Azerbaijani, Russian, and Arabic.",
        ],
      },
    },
  },
  AZ: {
    modalTitle: "Transfer Qaydaları və Zəmanət Şərtləri",
    modalSubtitle: "Şəffaf qaydalar, avtomatlaşdırılmış uçuş izləmə və 24 saat öncədən pulsuz ləğv.",
    pageTitle: "Hava Limanı Transfer Şərtləri və Qaydaları",
    pageSubtitle: "Azərbaycan hava limanları üzrə fərdi transfer xidmətinin rəsmi xidmət səviyyəsi müqaviləsi (SLA).",
    lastUpdated: "Son yenilənmə: Sentyabr 2026",
    supportHelp: "Aktiv sifarişinizlə bağlı təcili kömək lazımdır? 24/7 dispetçer xidmətimiz xidmətinizdədir.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "Anladım və Qəbul Edirəm",
    btnClose: "Bağla",
    viewFullTerms: "Platformanın tam İstifadə Şərtlərini oxu →",
    sections: {
      cancellation: {
        title: "1. 24 Saat Əvvəl Pulsuz Ləğv və 100% Geri Qaytarılma",
        badge: "100% Geri Qaytarılma",
        points: [
          "Planlaşdırılan qarşılanma vaxtına ən azı 24 saat qalmış ləğv edildikdə ödəniş 100% tam geri qaytarılır.",
          "12–24 saat qalmış ləğv edildikdə 50% geri qaytarılma və ya ödənişsiz tarix dəyişdirmə təmin edilir.",
          "12 saatdan az müddət qaldıqda və ya xəbərdarlıq edilmədən gəlinmədikdə ödəniş geri qaytarılmır.",
          "Payriff vasitəsilə kart ödənişlərinin geri qaytarılması 3–7 bank iş günü ərzində icra olunur.",
        ],
      },
      flightTracking: {
        title: "2. Canlı Uçuş İzləmə və Reys Gecikmələri",
        badge: "Canlı Uçuş Radarı",
        points: [
          "Təqdim etdiyiniz reys nömrəsi üzrə təyyarənizin eniş vaxtını real rejimdə izləyirik.",
          "Uçuş gecikdikdə və ya tez endikdə sürücünün qarşılama vaxtı heç bir əlavə ödəniş olmadan avtomatik tənzimlənir.",
          "Beynəlxalq reyslərdə təyyarə endikdən sonra 60 dəqiqə pulsuz gözləmə daxildir.",
          "Daxili reyslərdə və hoteldən çıxışda 30 dəqiqə pulsuz gözləmə daxildir.",
        ],
      },
      meetAndGreet: {
        title: "3. Terminalda Adlı Lövhə ilə Qarşılama (Meet & Greet)",
        badge: "VIP Qarşılama",
        points: [
          "Sürücünüz gəliş zalının çıxışında adınız qeyd olunmuş lövhə ilə sizi qarşılayacaq.",
          "Gəlişdən əvvəl sürücünün adı, birbaşa əlaqə nömrəsi və avtomobilin dövlət nömrəsi WhatsApp və e-poçtla göndərilir.",
          "Terminal çıxışından avtomobilə qədər ödənişsiz baqaj daşınması köməyi göstərilir.",
        ],
      },
      pricingGuarantee: {
        title: "4. Hər Şey Daxil Sabit Qiymət Zəmanəti",
        badge: "Gizli Xərc Yoxdur",
        points: [
          "Göstərilən qiymət tam yekundur: terminal parkinq xərci, magistral ödənişləri, yanacaq, sürücü haqqı və vergilər daxildir.",
          "Pik saatlarda, gecə reyslərində və ya hava şəraitindən asılı olaraq heç bir qiymət artımı tətbiq edilmir.",
        ],
      },
      luggageSafety: {
        title: "5. Baqaj Tutumu və Uşaq Təhlükəsizliyi",
        badge: "Rahatlıq və Təhlükəsizlik",
        points: [
          "Sedan (1–3 nəfər): 2 böyük çamadan (hər biri 23 kq) + əl yükləri.",
          "SUV (1–4 nəfər): 4 standart çamadan + əl yükləri.",
          "Miniven (4–7 nəfər): 6 böyük çamadan + əl yükləri.",
          "Uşaq oturacaqları və busterlər rezervasiya zamanı tələb əsasında ödənişsiz təmin edilir.",
        ],
      },
      vehicleStandards: {
        title: "6. Nəqliyyat Keyfiyyəti və Peşəkar Sürücü Standartları",
        badge: "Lisenziyalı və Sığortalı",
        points: [
          "Bütün avtomobillər müasir, təmiz, kondisionerli, tam sığortalı və siqaret çəkilməyən nəqliyyat vasitələridir.",
          "Sürücülər peşəkar lisenziyaya malikdir və yüksək qonaqpərvərlik etikasına riayət edirlər.",
        ],
      },
      emergencyDispatch: {
        title: "7. 24/7 Əməliyyat Dəstəyi və Dispetçer",
        badge: "24/7 Dəstək",
        points: [
          "Təcili qaynar xətt və WhatsApp dispetçer xidməti həftənin 7 günü 24 saat fəaliyyət göstərir.",
          "Azərbaycan, ingilis, rus və ərəb dillərində operativ dispetçer xidməti.",
        ],
      },
    },
  },
  RU: {
    modalTitle: "Правила бронирования трансфера и гарантии",
    modalSubtitle: "Прозрачные условия, автоматическое отслеживание рейсов и бесплатная отмена за 24 часа.",
    pageTitle: "Условия и правила трансфера из аэропортов",
    pageSubtitle: "Официальный регламент качества (SLA) индивидуальных трансферов в аэропортах Азербайджана.",
    lastUpdated: "Последнее обновление: Сентябрь 2026",
    supportHelp: "Нужна срочная помощь по бронированию? Наша диспетчерская служба работает круглосуточно 24/7.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "Понятно и принимаю",
    btnClose: "Закрыть",
    viewFullTerms: "Смотреть полные условия сервиса →",
    sections: {
      cancellation: {
        title: "1. Бесплатная отмена за 24 часа и 100% возврат",
        badge: "100% Возврат",
        points: [
          "100% полный возврат средств при отмене не менее чем за 24 часа до времени подачи автомобиля.",
          "50% возврат или бесплатный перенос даты/времени при отмене за 12–24 часа до поездки.",
          "При отмене менее чем за 12 часов или неявке без предупреждения оплата не возвращается.",
          "Возврат средств на банковскую карту через Payriff осуществляется в течение 3–7 рабочих дней.",
        ],
      },
      flightTracking: {
        title: "2. Мониторинг рейса и задержки самолёта",
        badge: "Живой радар рейсов",
        points: [
          "Мы отслеживаем фактическое время прилёта вашего рейса по указанному номеру.",
          "При задержке или ранней посадке самолёта время подачи авто корректируется бесплатно.",
          "Бесплатное ожидание в течение 60 минут после посадки международных рейсов включено.",
          "Бесплатное ожидание в течение 30 минут для внутренних рейсов и при выезде из отеля.",
        ],
      },
      meetAndGreet: {
        title: "3. Встреча с именной табличкой в терминале (Meet & Greet)",
        badge: "VIP Встреча",
        points: [
          "Ваш персональный водитель встречает вас в зоне прилёта с именной табличкой.",
          "Контакты водителя (имя, телефон, марка и номер авто) отправляются заранее по WhatsApp и email.",
          "Бесплатная помощь с багажом от выхода из терминала до автомобиля.",
        ],
      },
      pricingGuarantee: {
        title: "4. Фиксированная цена «всё включено»",
        badge: "Без скрытых доплат",
        points: [
          "Указанная цена окончательная: парковка в аэропорту, платные дороги, бензин, работа водителя и налоги включены.",
          "Никаких наценок в часы пик, ночные часы или при плохих погодных условиях.",
        ],
      },
      luggageSafety: {
        title: "5. Вместимость багажа и детская безопасность",
        badge: "Комфорт и безопасность",
        points: [
          "Седан (1–3 пассажира): до 2 больших чемоданов (по 23 кг) + ручная кладь.",
          "Внедорожник SUV (1–4 пассажира): до 4 стандартных чемоданов + ручная кладь.",
          "Минивэн (4–7 пассажиров): до 6 больших чемоданов + ручная кладь.",
          "Детские кресла и бустеры предоставляются бесплатно по предварительному запросу.",
        ],
      },
      vehicleStandards: {
        title: "6. Стандарты автопарка и квалификация водителей",
        badge: "Лицензия и страховка",
        points: [
          "Все автомобили современные, чистые, с кондиционером, застрахованы и предназначены для некурящих.",
          "Водители имеют профессиональную лицензию и строго соблюдают этику сервиса.",
        ],
      },
      emergencyDispatch: {
        title: "7. Круглосуточная поддержка 24/7 и диспетчер",
        badge: "Поддержка 24/7",
        points: [
          "Прямая горячая линия и WhatsApp диспетчера доступны 24 часа в сутки, 7 дней в неделю.",
          "Многоязычная поддержка на русском, азербайджанском, английском и арабском языках.",
        ],
      },
    },
  },
  AR: {
    modalTitle: "سياسة حجز التوصيل والضمانات",
    modalSubtitle: "شروط شفافة، تتبع آلي للرحلات، وإلغاء مجاني حتى 24 ساعة.",
    pageTitle: "شروط وسياسة حجز النقل من وإلى المطار",
    pageSubtitle: "اتفاقية مستوى الخدمة الرسمية للتوصيل الخاص عبر مطارات أذربيجان.",
    lastUpdated: "آخر تحديث: سبتمبر 2026",
    supportHelp: "هل تحتاج إلى مساعدة عاجلة بشأن حجزك؟ فريق العمليات متاح على مدار الساعة 24/7.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "فهمت وأوافق",
    btnClose: "إغلاق",
    viewFullTerms: "عرض الشروط والأحكام الكاملة للمنصة ←",
    sections: {
      cancellation: {
        title: "1. إلغاء مجاني قبل 24 ساعة واسترداد 100%",
        badge: "استرداد كامل 100%",
        points: [
          "استرداد كامل بنسبة 100% عند الإلغاء قبل 24 ساعة على الأقل من موعد الاستقبال المحدد.",
          "استرداد 50% أو إعادة جدولة مجانية للتاريخ والوقت عند الإلغاء بين 12 و 24 ساعة قبل الرحلة.",
          "غير قابل للاسترداد عند الإلغاء قبل أقل من 12 ساعة أو في حالة عدم الحضور دون إشعار مسبق.",
          "تتم معالجة عمليات الاسترداد للبطاقات المصرفية عبر Payriff خلال 3 إلى 7 أيام عمل بنكية.",
        ],
      },
      flightTracking: {
        title: "2. المراقبة الحية للرحلات وتأخير الطائرات",
        badge: "رادار الطيران المباشر",
        points: [
          "نتتبع رحلتك القادمة بدقة وفي الوقت الفعلي باستخدام رقم الرحلة المقدم أثناء الحجز.",
          "في حالة تأخر الرحلة أو وصولها مبكراً، يتم تعديل موعد استقبال السائق تلقائياً دون أي تكلفة إضافية.",
          "يشمل الحجز 60 دقيقة انتظار مجاني للرحلات الدولية تبدأ من وقت هبوط الطائرة.",
          "يشمل الحجز 30 دقيقة انتظار مجاني للرحلات الداخلية وللمغادرة من الفنادق.",
        ],
      },
      meetAndGreet: {
        title: "3. خدمة الاستقبال والترحيب داخل صالة الوصول (Meet & Greet)",
        badge: "استقبال VIP",
        points: [
          "سيكون سائقك الخاص بانتظارك داخل صالة الوصول حاملاً لوحة تحمل اسمك بوضوح.",
          "يتم إرسال تفاصيل السائق (الاسم، رقم الهاتف المباشر، نوع السيارة ولوحتها) عبر واتساب والبريد مسبقاً.",
          "مساعدة مجانية في نقل وحمل الأمتعة من بوابة الخروج وحتى السيارة.",
        ],
      },
      pricingGuarantee: {
        title: "4. ضمان السعر الثابت والشامل لكل الرسوم",
        badge: "لا توجد رسوم خفية",
        points: [
          "السعر المعروض نهائي وشامل تماماً: رسوم مواقف المطار، رسوم الطرق السريعة، الوقود، أجر السائق والضرائب.",
          "لا توجد أي زيادة في الأسعار أثناء أوقات الذروة أو الرحلات الليلية أو سوء الأحوال الجوية.",
        ],
      },
      luggageSafety: {
        title: "5. سعة الأمتعة وسلامة الأطفال",
        badge: "راحة وأمان",
        points: [
          "سيدان (1–3 ركاب): حتى حقيبتين كبيرتين (23 كجم لكل منهما) + حقائب يد.",
          "دفع رباعي SUV (1–4 ركاب): حتى 4 حقائب قياسية + حقائب يد.",
          "ميني فان (4–7 ركاب): حتى 6 حقائب كبيرة + حقائب يد.",
          "تتوفر مقاعد أمان الأطفال والمقاعد المرتفعة مجاناً عند الطلب أثناء الحجز.",
        ],
      },
      vehicleStandards: {
        title: "6. معايير جودة المركبات والسائقين المحترفين",
        badge: "مرخصة ومؤمنة بالكامل",
        points: [
          "جميع السيارات حديثة، معقمة، مكيفة بالكامل، مؤمنة تجارياً ومخصصة لغير المدخنين.",
          "السائقون مرخصون مهنياً ومدربون على أعلى معايير الضيافة واللباقة.",
        ],
      },
      emergencyDispatch: {
        title: "7. دعم عملياتي وغرفة تحكم على مدار الساعة 24/7",
        badge: "دعم 24/7",
        points: [
          "خط ساخن للطوارئ وخدمة واتساب متاحة على مدار 24 ساعة في اليوم طوال أيام الأسبوع.",
          "دعم تشغيلي متعدد اللغات بالعربية، الإنجليزية، الأذربيجانية والروسية.",
        ],
      },
    },
  },
  DE: {
    modalTitle: "Transfer-Buchungsrichtlinien & Garantien",
    modalSubtitle: "Transparente Bedingungen, automatisierte Flugverfolgung und 24-Stunden-Stornierung.",
    pageTitle: "Bedingungen für Flughafentransfers & Buchungsrichtlinie",
    pageSubtitle: "Offizielles Service-Level-Agreement für private Transfers in Aserbaidschan.",
    lastUpdated: "Zuletzt aktualisiert: September 2026",
    supportHelp: "Benötigen Sie dringende Hilfe? Unser 24/7-Disponenten-Team steht bereit.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "Verstanden & Akzeptieren",
    btnClose: "Schließen",
    viewFullTerms: "Vollständige AGB anzeigen →",
    sections: {
      cancellation: {
        title: "1. 24h kostenlose Stornierung & 100% Rückerstattung",
        badge: "100% Rückerstattung",
        points: [
          "100% volle Rückerstattung bei Stornierung bis zu 24 Stunden vor der geplanten Abholzeit.",
          "50% Rückerstattung oder kostenfreie Umbuchung bei Stornierung zwischen 12 und 24 Stunden vor Abholung.",
          "Keine Rückerstattung bei Stornierungen unter 12 Stunden vor Abholung oder Nichterscheinen.",
          "Rückzahlungen via Payriff erfolgen innerhalb von 3–7 Bankarbeitstagen.",
        ],
      },
      flightTracking: {
        title: "2. Live-Flugüberwachung & Flugverspätungen",
        badge: "Live-Flugradar",
        points: [
          "Wir überwachen Ihren ankommenden Flug live anhand der angegebenen Flugnummer.",
          "Bei Flugverspätung oder früherer Landung passt sich die Abholzeit Ihres Chauffeurs automatisch ohne Aufpreis an.",
          "60 Minuten kostenlose Wartezeit ab Landung bei internationalen Flügen inklusive.",
          "30 Minuten kostenlose Wartezeit bei Inlandsflügen und Hotelabholungen inklusive.",
        ],
      },
      meetAndGreet: {
        title: "3. Meet & Greet Chauffeur-Service im Terminal",
        badge: "VIP-Empfang",
        points: [
          "Ihr Chauffeur erwartet Sie im Ankunftsterminal mit einem personalisierten Namensschild.",
          "Fahrerdaten (Name, Telefonnummer, Kennzeichen) erhalten Sie vorab per WhatsApp und E-Mail.",
          "Der Fahrer unterstützt Sie beim Gepäcktransport vom Terminal bis zum Fahrzeug.",
        ],
      },
      pricingGuarantee: {
        title: "4. All-Inclusive Festpreis-Garantie",
        badge: "Keine versteckten Gebühren",
        points: [
          "Der Endpreis beinhaltet Parkgebühren am Terminal, Mautgebühren, Kraftstoff, Fahrer und Steuern.",
          "Keine Preisaufschläge zu Stoßzeiten, bei Schlechtwetter oder bei Nachtfahrten.",
        ],
      },
      luggageSafety: {
        title: "5. Gepäckbestimmungen & Kindersicherheit",
        badge: "Komfort & Sicherheit",
        points: [
          "Limousine (1–3 Personen): Bis zu 2 große Koffer (je 23 kg) + Handgepäck.",
          "SUV (1–4 Personen): Bis zu 4 Koffer + Handgepäck.",
          "Minivan (4–7 Personen): Bis zu 6 große Koffer + Handgepäck.",
          "Kindersitze und Sitzerhöhungen sind auf Anfrage kostenlos verfügbar.",
        ],
      },
      vehicleStandards: {
        title: "6. Fahrzeugqualität & Fahrer-Standards",
        badge: "Lizenziert & Versichert",
        points: [
          "Alle Fahrzeuge sind gepflegt, klimatisiert, voll versichert und Nichtraucher-Fahrzeuge.",
          "Chauffeurs sind lizenziert und entsprechen hohen Gastfreundschafts-Standards.",
        ],
      },
      emergencyDispatch: {
        title: "7. 24/7 Disposition & Notfall-Support",
        badge: "24/7 Support",
        points: [
          "Direkte Notfall-Hotline und WhatsApp-Support rund um die Uhr erreichbar.",
          "Mehrsprachiges Team (Deutsch, Englisch, Aserbaidschanisch, Russisch, Arabisch).",
        ],
      },
    },
  },
  FR: {
    modalTitle: "Politique de réservation de transfert et garanties",
    modalSubtitle: "Conditions claires, suivi automatique des vols et annulation gratuite jusqu'à 24h.",
    pageTitle: "Conditions et politique de réservation de transfert",
    pageSubtitle: "Accord de niveau de service officiel pour les transferts privés dans les aéroports d'Azerbaïdjan.",
    lastUpdated: "Dernière mise à jour : Septembre 2026",
    supportHelp: "Besoin d'une assistance urgente ? Notre équipe de régulation est disponible 24h/24 et 7j/7.",
    supportPhone: "+994 12 404 78 88",
    btnAcceptAndClose: "J'ai compris et j'accepte",
    btnClose: "Fermer",
    viewFullTerms: "Voir les conditions générales de la plateforme →",
    sections: {
      cancellation: {
        title: "1. Annulation gratuite jusqu'à 24h & Remboursement 100%",
        badge: "Remboursement 100%",
        points: [
          "Remboursement intégral de 100 % pour toute annulation effectuée 24 heures ou plus avant l'heure prévue.",
          "Remboursement de 50 % ou report sans frais pour une annulation entre 12 et 24 heures avant la prise en charge.",
          "Non remboursable pour toute annulation à moins de 12 heures ou en cas de non-présentation sans préavis.",
          "Les remboursements par carte bancaire via Payriff sont traités en 3 à 7 jours ouvrés.",
        ],
      },
      flightTracking: {
        title: "2. Suivi de vol en direct & Retards d'avion",
        badge: "Radar de vol en direct",
        points: [
          "Nous suivons automatiquement l'heure d'atterrissage exacte de votre vol grâce au numéro fourni.",
          "En cas de retard ou d'avance de vol, l'horaire de prise en charge s'ajuste automatiquement sans frais.",
          "60 minutes d'attente gratuite incluses pour les vols internationaux à compter de l'atterrissage.",
          "30 minutes d'attente gratuite incluses pour les vols intérieurs et départs d'hôtels.",
        ],
      },
      meetAndGreet: {
        title: "3. Service d'accueil personnalisé (Meet & Greet)",
        badge: "Accueil VIP",
        points: [
          "Votre chauffeur vous attendra à la sortie de la zone des arrivées avec une pancarte à votre nom.",
          "Les coordonnées du chauffeur (nom, numéro direct, plaque du véhicule) vous sont transmises par WhatsApp et e-mail.",
          "Le chauffeur vous aide à porter vos bagages jusqu'au véhicule.",
        ],
      },
      pricingGuarantee: {
        title: "4. Garantie de tarif fixe tout compris",
        badge: "Aucun frais caché",
        points: [
          "Le tarif affiché est 100 % définitif : stationnement à l'aéroport, péages, carburant, chauffeur et taxes inclus.",
          "Aucune majoration aux heures de pointe, la nuit ou en cas d'intempéries.",
        ],
      },
      luggageSafety: {
        title: "5. Capacité des bagages & Sécurité des enfants",
        badge: "Confort & Sécurité",
        points: [
          "Berline (1–3 passagers) : 2 grandes valises (23 kg) + bagages à main.",
          "SUV (1–4 passagers) : 4 valises standard + bagages à main.",
          "Minivan (4–7 passagers) : 6 grandes valises + bagages à main.",
          "Sièges bébé et rehausseurs disponibles gratuitement sur simple demande lors de la réservation.",
        ],
      },
      vehicleStandards: {
        title: "6. Qualité des véhicules & Chauffeurs professionnels",
        badge: "Agréé et assuré",
        points: [
          "Véhicules récents, propres, climatisés, assurés et non-fumeurs.",
          "Chauffeurs professionnels et ponctuels respectant les plus hauts standards d'accueil.",
        ],
      },
      emergencyDispatch: {
        title: "7. Assistance 24/7 & Régulation",
        badge: "Assistance 24/7",
        points: [
          "Ligne d'urgence directe et assistance WhatsApp disponibles 24h/24.",
          "Équipe multilingue (français, anglais, russe, azerbaïdjanais, arabe).",
        ],
      },
    },
  },
};
