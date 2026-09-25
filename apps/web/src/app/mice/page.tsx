"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle, ArrowLeft, Users, Check, Building2, Award, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";

const SERVICES = [
  {
    id: "meetings",
    icon: "🏢",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    includes: ["Venue sourcing & setup", "Audio-visual equipment", "Catering & F&B management", "Accommodation block booking", "Team transfers & logistics"],
  },
  {
    id: "incentive",
    icon: "🏆",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    includes: ["Custom group tour programme", "Private gala dinner in Baku", "Helicopter transfers", "Team-building activities", "Silk Road cultural experiences"],
  },
  {
    id: "conferences",
    icon: "🎤",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    includes: ["Conference hall booking (up to 500 pax)", "Simultaneous interpretation", "Exhibition space coordination", "Press & media support", "Post-event city tour"],
  },
];

export default function MicePage() {
  const { language } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();

  const badge    = language === "AZ" ? "KORPORATİV TURİZM" : language === "RU" ? "КОРПОРАТИВНЫЙ ТУРИЗМ" : language === "AR" ? "سياحة الأعمال MICE" : "MICE & CORPORATE";
  const title    = language === "AZ" ? "Korporativ Tədbirlər & MICE" : language === "RU" ? "Корпоративные туры и MICE" : language === "AR" ? "الفعاليات المؤسسية وسياحة الأعمال" : "Corporate Events & MICE in Azerbaijan";
  const subtitle = language === "AZ" ? "Beynəlxalq konfranslar, incentive turlar, korporativ toplantılar — Bakının möhtəşəm yerləri ilə tam xidmət." : language === "RU" ? "Международные конференции, инсентив-туры, корпоративные встречи — полный сервис в великолепных местах Баку." : language === "AR" ? "مؤتمرات دولية ورحلات تحفيزية واجتماعات مؤسسية — خدمات كاملة في أماكن باكو الرائعة." : "International conferences, incentive tours, corporate meetings — full-service at Baku's stunning venues.";
  const ctaBtn   = language === "AZ" ? "Bizimlə Əlaqə" : language === "RU" ? "Связаться с нами" : language === "AR" ? "تواصل معنا" : "Get in Touch";
  const backHome = language === "AZ" ? "Əsas Səhifə" : language === "RU" ? "Главная" : language === "AR" ? "الرئيسية" : "Back to Home";

  const svcNames = [
    language === "AZ" ? "Toplantılar & Konfranslar" : language === "RU" ? "Встречи и конференции" : language === "AR" ? "الاجتماعات والمؤتمرات" : "Meetings & Conferences",
    language === "AZ" ? "İnsentiv Turlar" : language === "RU" ? "Инсентив-туры" : language === "AR" ? "الرحلات التحفيزية" : "Incentive Tours",
    language === "AZ" ? "Böyük Tədbirlər" : language === "RU" ? "Масштабные мероприятия" : language === "AR" ? "الفعاليات الكبرى" : "Large-Scale Events",
  ];

  const svcDescs = [
    language === "AZ" ? "Bakının 5 ulduzlu otellərindəki tam avadanlıqlı konfrans salonlarından kiçik iclas otaqlarına qədər tam logistika dəstəyi." : language === "RU" ? "Полная логистическая поддержка — от оснащённых конференц-залов в 5-звёздочных отелях Баку до небольших переговорных комнат." : language === "AR" ? "دعم لوجستي كامل من قاعات مؤتمرات مجهزة في فنادق باكو 5 نجوم إلى غرف اجتماعات صغيرة." : "Full logistics support from equipped conference halls in Baku's 5-star hotels to smaller meeting rooms.",
    language === "AZ" ? "Komandanızı Azərbaycanın ecazkar landşaftları, Silk Road mədəniyyəti və eksklüziv daldalı tapşırıq proqramları ilə motive edin." : language === "RU" ? "Мотивируйте команду захватывающими пейзажами, культурой Шёлкового пути и эксклюзивными программами командообразования." : language === "AR" ? "حفّز فريقك بمناظر أذربيجان الخلابة وثقافة طريق الحرير وبرامج بناء الفريق الحصرية." : "Motivate your team with Azerbaijan's breathtaking landscapes, Silk Road culture, and exclusive team-building programmes.",
    language === "AZ" ? "500+ nəfərlik konfrans salonları, sinxron tərcüməçilik, sərgi koordinasiyası və mükəmməl media dəstəyi." : language === "RU" ? "Конференц-залы на 500+ человек, синхронный перевод, координация выставок и профессиональная медиаподдержка." : language === "AR" ? "قاعات مؤتمرات لـ500+ شخص وترجمة فورية وتنسيق المعارض ودعم إعلامي متخصص." : "Conference halls for 500+ pax, simultaneous interpretation, exhibition coordination and professional media support.",
  ];

  const stats = [
    { value: "50+", label: language === "AZ" ? "Uğurlu Korporativ Tədbir" : language === "RU" ? "Успешных мероприятий" : language === "AR" ? "فعالية ناجحة" : "Successful Events" },
    { value: "500", label: language === "AZ" ? "Maks. Qatılımçı Sayı" : language === "RU" ? "Максимум участников" : language === "AR" ? "حد أقصى للمشاركين" : "Max Attendees" },
    { value: "24/7", label: language === "AZ" ? "Tədbirinizin Nəzarəti" : language === "RU" ? "Мониторинг мероприятий" : language === "AR" ? "مراقبة الفعالية" : "Event Monitoring" },
    { value: "12+", label: language === "AZ" ? "Dil Dəstəyi" : language === "RU" ? "Языков поддержки" : language === "AR" ? "لغة دعم" : "Languages Supported" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0f3460]/95 backdrop-blur-xl shadow-lg border-b border-white/10">
        <div className="container-section flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo variant="light" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /><span>{backHome}</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden text-center" style={{ backgroundColor: "#0f3460" }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(120px)" }} />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full" style={{ backgroundColor: "#3b82f6", filter: "blur(80px)" }} />
        </div>
        <div className="container-section relative z-10 max-w-3xl mx-auto">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest mb-6" style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>{badge}</span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-6">{title}</h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10">{subtitle}</p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I'm interested in a MICE / Corporate event package in Azerbaijan.`)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg"
            style={{ backgroundColor: "#f59e0b", color: "#061225" }}
          >
            <MessageCircle className="h-4 w-4" />{ctaBtn}
          </a>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ backgroundColor: "#0c2d54" }}>
        <div className="container-section">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="font-display text-2xl font-bold" style={{ color: "#f59e0b" }}>{s.value}</span>
                <span className="mt-1 text-xs text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-20">
        <div className="container-section">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{language === "AZ" ? "XİDMƏTLƏRİMİZ" : language === "RU" ? "НАШИ УСЛУГИ" : language === "AR" ? "خدماتنا" : "OUR SERVICES"}</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">{title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((svc, i) => (
              <div key={svc.id} className="rounded-2xl overflow-hidden bg-white shadow-card border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image src={svc.image} alt={svcNames[i] ?? ""} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3 text-3xl">{svc.icon}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{svcNames[i]}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{svcDescs[i]}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I'm interested in the "${svcNames[i]}" MICE/Corporate service.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white hover:opacity-90 transition-all"
                      style={{ backgroundColor: "#0f3460" }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {language === "AZ" ? "Sorğu Göndər" : language === "RU" ? "Запросить предложение" : language === "AR" ? "طلب عرض سعر" : "Request Proposal"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form CTA */}
      <section className="py-20" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            {language === "AZ" ? "Tədbirinizi Planlaşdıraq" : language === "RU" ? "Спланируем ваше мероприятие" : language === "AR" ? "دعنا نخطط لفعاليتك" : "Let's Plan Your Event"}
          </h2>
          <p className="text-white/60 mb-8 text-sm">
            {language === "AZ" ? "Komandamız sizin tədbiriniz üçün xüsusi təklif hazırlayacaq." : language === "RU" ? "Наша команда подготовит индивидуальное предложение для вашего мероприятия." : language === "AR" ? "سيقوم فريقنا بإعداد عرض مخصص لفعاليتك." : "Our dedicated team will prepare a customised proposal for your event."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I'd like to discuss a MICE/Corporate event in Azerbaijan.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg"
              style={{ backgroundColor: "#f59e0b", color: "#061225" }}
            >
              <MessageCircle className="h-4 w-4" />WhatsApp
            </a>
            <a
              href={`mailto:mice@${CURRENT_BRAND.domain}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
            >
              mice@{CURRENT_BRAND.domain}
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-white/40" style={{ backgroundColor: "#061225" }}>
        <Link href="/" className="hover:text-white/80 transition-colors">© {CURRENT_BRAND.name} · {new Date().getFullYear()} · All rights reserved</Link>
      </footer>
    </div>
  );
}
