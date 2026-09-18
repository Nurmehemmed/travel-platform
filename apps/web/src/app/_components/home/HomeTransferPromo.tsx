"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Check, Shield, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency-context";
import { useSiteSettings } from "@/lib/settings-context";

export const HomeTransferPromo: React.FC = () => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { settings: siteConfig } = useSiteSettings();

  return (
<section className="py-20" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3" style={{ color: "#f59e0b" }}>
              {language === "AZ" ? "QAFQAZ MARŞRUTLARİ" : language === "RU" ? "КАВКАЗСКИЕ МАРШРУТЫ" : language === "AR" ? "رحلات القوقاز" : "CAUCASUS JOURNEYS"}
            </p>
            <h2 className="font-display text-4xl font-bold text-white mb-3">
              {language === "AZ" ? "Çox Ölkəli Kombinasiya Paketləri" : language === "RU" ? "Многострановые комбо-маршруты" : language === "AR" ? "باقات جولات متعددة الدول" : "Multi-Country Combo Packages"}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              {language === "AZ" ? "Azərbaycanı qonşu ölkələrlə birləşdirən unudulmaz səyahət paketləri" : language === "RU" ? "Незабываемые маршруты, объединяющие Азербайджан с соседними странами" : language === "AR" ? "باقات سياحية تجمع أذربيجان بدول الجوار" : "Unforgettable routes combining Azerbaijan with neighbouring countries"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: language === "AZ" ? "1 Səfərdə 3 Ölkə" : language === "RU" ? "3 страны за 1 поездку" : language === "AR" ? "3 دول في رحلة واحدة" : "3 Countries in 1 Trip",
                route: language === "AZ" ? "Bakı → Tbilisi → İstanbul" : language === "RU" ? "Баку → Тбилиси → Стамбул" : language === "AR" ? "باكو ← تبليسي ← إسطنبول" : "Baku → Tbilisi → Istanbul",
                days: "7",
                flags: "🇦🇿 🇬🇪 🇹🇷",
                price: 590,
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
                badge: language === "AZ" ? "Ən Populyar" : language === "RU" ? "Популярный" : language === "AR" ? "الأكثر شعبية" : "Most Popular",
              },
              {
                title: language === "AZ" ? "Qafqaz Dağ Marşrutu" : language === "RU" ? "Горный маршрут Кавказа" : language === "AR" ? "مسار جبال القوقاز" : "Caucasus Mountain Route",
                route: language === "AZ" ? "Bakı → Şəki → Lahıc → Gəncə" : language === "RU" ? "Баку → Шеки → Lahıc → Гянджа" : language === "AR" ? "باكو ← شيكي ← لاهيج ← غنجة" : "Baku → Sheki → Lahij → Ganja",
                days: "4",
                flags: "🇦🇿",
                price: 299,
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                badge: language === "AZ" ? "Macəra" : language === "RU" ? "Приключение" : language === "AR" ? "مغامرة" : "Adventure",
              },
              {
                title: language === "AZ" ? "Xəzər & İpək Yolu" : language === "RU" ? "Каспий и Шёлковый путь" : language === "AR" ? "بحر قزوين وطريق الحرير" : "Caspian & Silk Road",
                route: language === "AZ" ? "Bakı → Qobustan → Abşeron → Şəki" : language === "RU" ? "Баку → Гобустан → Апшерон → Шеки" : language === "AR" ? "باكو ← غوبوستان ← أبشيرون ← شيكي" : "Baku → Gobustan → Absheron → Sheki",
                days: "3",
                flags: "🇦🇿",
                price: 199,
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
                badge: language === "AZ" ? "Yeni" : language === "RU" ? "Новинка" : language === "AR" ? "جديد" : "New",
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-xs font-bold text-[#061225]" style={{ backgroundColor: "#f59e0b" }}>{pkg.badge}</span>
                    <span className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">{pkg.days} {language === "AZ" ? "Gün" : language === "RU" ? "дней" : language === "AR" ? "أيام" : "Days"}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-xl">{pkg.flags}</div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-display text-lg font-bold text-white mb-1">{pkg.title}</p>
                  <p className="text-xs text-white/50 mb-4">{pkg.route}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 block">{language === "AZ" ? "Qiymət" : language === "RU" ? "от" : language === "AR" ? "يبدأ من" : "from"}</span>
                      <span className="text-xl font-black text-white">{formatPrice(pkg.price)}</span>
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent(`Hello AddmeTour! I'm interested in the "${pkg.title}" package (${pkg.route}, ${pkg.days} days).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#061225] transition-all duration-200 hover:opacity-90 hover:scale-105"
                      style={{ backgroundColor: "#f59e0b" }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {language === "AZ" ? "Sorğu göndər" : language === "RU" ? "Запросить" : language === "AR" ? "استفسر" : "Request Quote"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};
