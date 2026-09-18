"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

export const HomeCtaBanner: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();

  return (
<section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#0f3460" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(80px)" }} />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full" style={{ backgroundColor: "#f59e0b", filter: "blur(80px)" }} />
        </div>
        <div className="container-section relative z-10 text-center">
          <p className="section-label mb-4" style={{ color: "#f59e0b" }}>
            {language === "AZ"
              ? "Boutique Fərdi & Qrup Turları"
              : language === "RU"
              ? "Авторские и индивидуальные туры"
              : language === "FR"
              ? "Circuits d'Exception sur Mesure"
              : language === "AR"
              ? "رحلات سياحية خاصة وتجارب فريدة"
              : language === "DE"
              ? "Individuelle & Geführte Rundreisen"
              : "Boutique Private & Small-Group Travel"}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "AZ"
              ? "Azərbaycanı Bizimlə Kəşf Edin"
              : language === "RU"
              ? "Откройте для себя Азербайджан с нами"
              : language === "FR"
              ? "Explorez l'Azerbaïdjan avec nous"
              : language === "AR"
              ? "استكشف أذربيجان معنا اليوم"
              : language === "DE"
              ? "Entdecken Sie Aserbaidschan mit uns"
              : "Ready to Explore Azerbaijan?"}
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            {language === "AZ"
              ? "Bakı mütəxəssislərimizlə əlaqə saxlayın, unikal marşrutunuzu dərhal planlaşdırın və zəmanətli unudulmaz səyahət təcrübəsi yaşayın."
              : language === "RU"
              ? "Свяжитесь с нашими местными экспертами в Баку для составления индивидуальной программы, быстрого подтверждения и комфортного трансфера."
              : language === "FR"
              ? "Contactez nos spécialistes locaux à Bakou pour concevoir votre itinéraire personnalisé avec confirmation instantanée et assistance 24/7."
              : language === "AR"
              ? "تواصل مع خبرائنا المحليين في باكو لتنسيق برنامج سياحي مخصص، تأكيد فوري، وخدمة نقل مريحة على مدار الساعة."
              : language === "DE"
              ? "Kontaktieren Sie unsere lokalen Reiseexperten in Baku für eine individuelle Reiseroute, sofortige Bestätigung und perfekten Service."
              : "Connect with our local Baku travel specialists for handcrafted itineraries, instant confirmations, and seamless 24/7 travel support."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#tours"
              aria-label="View all handcrafted tour itineraries"
              className="rounded-full px-8 py-4 font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#f59e0b", color: "#061225" }}
            >
              {language === "AZ"
                ? "Bütün Turlara Baxın"
                : language === "RU"
                ? "Посмотреть все туры"
                : language === "FR"
                ? "Voir tous les circuits"
                : language === "AR"
                ? "استعرض جميع الجولات"
                : language === "DE"
                ? "Alle Touren ansehen"
                : "View All Tour Itineraries"}
            </Link>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp inquiry with travel expert"
              className="rounded-full border-2 border-white px-8 py-4 font-semibold text-sm text-white transition-all duration-200 hover:bg-white hover:text-brand-900 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
  );
};
