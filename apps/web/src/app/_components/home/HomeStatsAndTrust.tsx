"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

export const HomeStatsAndTrust: React.FC = () => {
  const { language } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();

  return (
    <>
      <div style={{ backgroundColor: "#0c2d54" }}>
        <div className="container-section">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
            {[
              { value: "3,500+", label: language === "AZ" ? "Məmnun Səyahətçi" : language === "RU" ? "Довольных туристов" : language === "AR" ? "مسافر سعيد" : "Happy Travelers" },
              { value: "50+",    label: language === "AZ" ? "Özəl Tur" : language === "RU" ? "Авторских туров" : language === "AR" ? "برنامج سياحي" : "Unique Tours" },
              { value: "15+",    label: language === "AZ" ? "Yerli Bələdçi" : language === "RU" ? "Местных гидов" : language === "AR" ? "مرشد خبير" : "Expert Guides" },
              { value: "99.2%", label: language === "AZ" ? "Viza Təsdiqi" : language === "RU" ? "Одобрение виз" : language === "AR" ? "معدل الموافقة" : "Visa Approval" },
              { value: "⚡ 3h", label: language === "AZ" ? "Sürətli e-Viza" : language === "RU" ? "Экспресс e-Виза" : language === "AR" ? "تأشيرة سريعة" : "Express e-Visa" },
              { value: `${siteConfig.marketing.tripadvisorRating || "4.9"}★`,  label: language === "AZ" ? "TripAdvisor" : language === "RU" ? "TripAdvisor" : language === "AR" ? "تريب أدفايزر" : "TripAdvisor" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5 px-3 text-center">
                <span className="font-display text-xl font-bold" style={{ color: "#f59e0b" }}>
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] text-white/55 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ TRUST STRIP */}
      <div style={{ backgroundColor: "#071d3b" }} className="overflow-hidden border-t border-white/5">
        <div className="container-section">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
            {[
              { icon: "🏛️", text: language === "AZ" ? "Rəsmi ASAN e-Viza Tərəfdaşı" : language === "RU" ? "Официальный партнёр ASAN e-Visa" : language === "AR" ? "شريك رسمي لتأشيرة ASAN" : "Official ASAN e-Visa Partner" },
              { icon: "🔒", text: language === "AZ" ? "SSL Şifrəli & Təhlükəsiz Ödəniş" : language === "RU" ? "SSL защита и безопасная оплата" : language === "AR" ? "SSL آمن ومدفوعات مشفرة" : "SSL Secured & Safe Payments" },
              { icon: "⭐", text: `${siteConfig.marketing.tripadvisorRating || "4.9"} TripAdvisor · ${siteConfig.marketing.tripadvisorReviews || "2,400+"} ${language === "AZ" ? "Rəy" : language === "RU" ? "отзывов" : language === "AR" ? "تقييم" : "Reviews"}` },
              { icon: "💬", text: language === "AZ" ? "24/7 VIP WhatsApp Dəstəyi" : language === "RU" ? "Поддержка 24/7 в WhatsApp" : language === "AR" ? "دعم واتساب VIP على مدار الساعة" : "24/7 VIP WhatsApp Support" },
              { icon: "📋", text: language === "AZ" ? "Lisenziyalı Azərbaycan Turizm Agentliyi" : language === "RU" ? "Лицензированное туристическое агентство" : language === "AR" ? "وكالة سياحية معتمدة" : "Licensed Azerbaijan Tourism Agency" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-white/60 whitespace-nowrap">
                <span className="text-sm">{item.icon}</span>
                <span>{item.text}</span>
                {i < 4 && <span className="hidden md:inline text-white/20 ml-4">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
