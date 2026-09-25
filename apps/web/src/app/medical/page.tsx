"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle, ArrowLeft, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";
import { BrandLogo } from "@/components/BrandLogo";
import { CURRENT_BRAND } from "@/lib/brand";

const PACKAGES = [
  {
    id: "naftalan",
    icon: "🛁",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    days: 5,
    includes: ["Hotel (Naftalan Resort)", "Daily crude oil bath therapy", "Doctor consultations", "Baku ↔ Naftalan transfer", "Breakfast & dinner"],
    priceFrom: 650,
  },
  {
    id: "shahdag",
    icon: "🏔️",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    days: 4,
    includes: ["Mountain lodge accommodation", "Guided alpine hikes", "Hydrotherapy & sauna access", "Baku → Shahdag transfer", "Half-board meals"],
    priceFrom: 480,
  },
  {
    id: "thermal",
    icon: "♨️",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    days: 3,
    includes: ["Nakhchivan thermal springs", "Hot spring pool sessions", "Traditional Azerbaijani spa", "Transfer from Baku (flight)", "Hotel accommodation"],
    priceFrom: 320,
  },
];

export default function MedicalTourismPage() {
  const { language } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();

  const badge    = language === "AZ" ? "TİBBİ TURİZM" : language === "RU" ? "МЕДИЦИНСКИЙ ТУРИЗМ" : language === "AR" ? "السياحة الطبية" : "MEDICAL TOURISM";
  const title    = language === "AZ" ? "Sağlık & Wellness Paketləri" : language === "RU" ? "Оздоровление в Азербайджане" : language === "AR" ? "السياحة الصحية والعلاجية" : "Health & Wellness in Azerbaijan";
  const subtitle = language === "AZ" ? "Naftalanın neft terapiyasından Şahdağ sağlamlıq retreatına qədər — unikal Azərbaycan wellness paketləri." : language === "RU" ? "От уникальных нефтяных ванн Нафталана до горного велнеса Шахдага." : language === "AR" ? "من حمامات النفط الفريدة في نفطلان إلى الهواء الجبلي في شهداغ." : "From Naftalan crude oil baths to Shahdag mountain wellness — unique Azerbaijan health packages.";
  const daysLabel = language === "AZ" ? "gün" : language === "RU" ? "дней" : language === "AR" ? "أيام" : "Days";
  const bookBtn  = language === "AZ" ? "WhatsApp ilə Sifariş" : language === "RU" ? "Забронировать" : language === "AR" ? "احجز الآن" : "Book via WhatsApp";
  const backHome = language === "AZ" ? "Əsas Səhifə" : language === "RU" ? "Главная" : language === "AR" ? "الرئيسية" : "Back to Home";

  const pkgNames = [
    language === "AZ" ? "Naftalan Neft Terapiyası" : language === "RU" ? "Нефтяная ванна Нафталан" : language === "AR" ? "علاج نفطلان" : "Naftalan Crude Oil Therapy",
    language === "AZ" ? "Şahdağ Dağ Wellness" : language === "RU" ? "Горный велнес Шахдаг" : language === "AR" ? "ويلنس جبال شهداغ" : "Shahdag Mountain Wellness",
    language === "AZ" ? "Naxçıvan Termal Bulaqları" : language === "RU" ? "Термальные источники Нахчывана" : language === "AR" ? "ينابيع نخيجوان الحرارية" : "Nakhchivan Thermal Springs",
  ];

  const pkgDescs = [
    language === "AZ" ? "Dünyanın 2 neft kurortundan birinin müalicəvi terapiyası. Artrit, dəri problemləri üçün effektiv." : language === "RU" ? "Лечение в одном из двух нефтяных курортов мира. Эффективно при артрите и кожных болезнях." : language === "AR" ? "علاج في أحد منتجعين نفطيين فريدين في العالم. فعّال ضد التهاب المفاصل وأمراض الجلد." : "Treatment at one of only two crude oil resorts in the world. Effective for arthritis and skin conditions.",
    language === "AZ" ? "4,243 metr yüksəklikdə dağ havası terapiyası, hidroterapiya və alpın trekkinq." : language === "RU" ? "Горный воздух, гидротерапия и треккинг на высоте 4243 м на Шахдаге." : language === "AR" ? "علاج بهواء الجبال والعلاج المائي على ارتفاع 4243 متراً في شهداغ." : "Mountain air therapy, hydrotherapy and alpine trekking at 4,243m on Shahdag.",
    language === "AZ" ? "Naxçıvanın mineral termal sularında müalicə, stres azaltma və bədən yenilənməsi." : language === "RU" ? "Минеральные термальные воды Нахчывана: снятие стресса и полное омоложение." : language === "AR" ? "علاج بمياه نخيجوان المعدنية الحرارية وتجديد الجسم." : "Mineral thermal waters of Nakhchivan: stress relief and full body rejuvenation.",
  ];

  const whyPoints = [
    { icon: "🏥", text: language === "AZ" ? "JCI sertifikatlı tibb müəssisələri" : language === "RU" ? "Клиники с сертификатом JCI" : language === "AR" ? "مرافق طبية معتمدة من JCI" : "JCI-accredited medical facilities" },
    { icon: "💰", text: language === "AZ" ? "Avropadan 60-80% ucuz" : language === "RU" ? "На 60–80% дешевле, чем в Европе" : language === "AR" ? "أرخص بنسبة 60-80% من أوروبا" : "60–80% lower cost than European clinics" },
    { icon: "🛫", text: language === "AZ" ? "Birbaşa reyslərlə əlçatımlı" : language === "RU" ? "Прямые рейсы из многих стран" : language === "AR" ? "رحلات مباشرة من دول عديدة" : "Direct flights from many countries" },
    { icon: "🌐", text: language === "AZ" ? "Ərəbcə & rusca danışan heyət" : language === "RU" ? "Русскоязычный персонал" : language === "AR" ? "طاقم طبي ناطق بالعربية" : "Arabic & Russian-speaking staff" },
    { icon: "🏨", text: language === "AZ" ? "Premium hamısı daxil paketlər" : language === "RU" ? "Пакеты «всё включено»" : language === "AR" ? "باقات شاملة فاخرة" : "All-inclusive premium packages" },
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
            <ArrowLeft className="h-4 w-4" />
            <span>{backHome}</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden text-center" style={{ backgroundColor: "#0f3460" }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(100px)" }} />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full" style={{ backgroundColor: "#22c55e", filter: "blur(80px)" }} />
        </div>
        <div className="container-section relative z-10 max-w-3xl mx-auto">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest mb-6" style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
            {badge}
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-6">{title}</h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10">{subtitle}</p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I'm interested in a Medical / Wellness tourism package in Azerbaijan.`)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg"
            style={{ backgroundColor: "#f59e0b", color: "#061225" }}
          >
            <MessageCircle className="h-4 w-4" />
            {bookBtn}
          </a>
        </div>
      </section>

      {/* Why points strip */}
      <section className="py-10" style={{ backgroundColor: "#071d3b" }}>
        <div className="container-section">
          <div className="flex flex-wrap justify-center gap-3">
            {whyPoints.map((pt, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white/70">
                <span>{pt.icon}</span><span>{pt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container-section">
          <div className="text-center mb-14">
            <p className="section-label mb-3">{language === "AZ" ? "PAKET SEÇİMLƏRİ" : language === "RU" ? "ВЫБОР ПАКЕТА" : language === "AR" ? "اختيار الباقة" : "PACKAGE OPTIONS"}</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">{title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, i) => (
              <div key={pkg.id} className="rounded-2xl overflow-hidden bg-white shadow-card border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.image} alt={pkgNames[i] ?? ""} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 text-3xl">{pkg.icon}</div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">{pkg.days} {daysLabel}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{pkgNames[i]}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{pkgDescs[i]}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{language === "AZ" ? "Başlanğıc qiymət" : language === "RU" ? "От" : language === "AR" ? "يبدأ من" : "From"}</span>
                      <span className="text-2xl font-black text-slate-900">${pkg.priceFrom}</span>
                      <span className="text-xs text-slate-400"> /person</span>
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello ${CURRENT_BRAND.name}! I'm interested in the "${pkgNames[i]}" wellness package (${pkg.days} days, from $${pkg.priceFrom}).`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-all"
                      style={{ backgroundColor: "#0f3460" }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />{bookBtn}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            {language === "AZ" ? "Fərdi Proqram İstəyirsiniz?" : language === "RU" ? "Нужна индивидуальная программа?" : language === "AR" ? "هل تريد برنامجاً مخصصاً؟" : "Need a Custom Programme?"}
          </h2>
          <p className="text-white/60 mb-8 text-sm">
            {language === "AZ" ? "Komandamız sağlamlıq hədəflərinizə uyğun paket hazırlayacaq." : language === "RU" ? "Наша команда составит программу под ваши цели." : language === "AR" ? "سيقوم فريقنا بإعداد برنامج يناسب أهدافك." : "Our team will craft a package tailored to your health goals."}
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent("Hello! I'd like a custom Medical Tourism programme in Azerbaijan.")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg"
            style={{ backgroundColor: "#f59e0b", color: "#061225" }}
          >
            <MessageCircle className="h-4 w-4" />
            {language === "AZ" ? "WhatsApp ilə Əlaqə" : language === "RU" ? "Написать в WhatsApp" : language === "AR" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
          </a>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-white/40" style={{ backgroundColor: "#061225" }}>
        <Link href="/" className="hover:text-white/80 transition-colors">© {CURRENT_BRAND.name} · {new Date().getFullYear()} · All rights reserved</Link>
      </footer>
    </div>
  );
}
