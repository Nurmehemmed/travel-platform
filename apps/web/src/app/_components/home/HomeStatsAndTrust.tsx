"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export const HomeStatsAndTrust: React.FC = () => {
  const { language } = useLanguage();

  const trustBadges = [
    {
      icon: "🏛️",
      text:
        language === "AZ"
          ? "Rəsmi ASAN e-Viza Tərəfdaşı"
          : language === "RU"
          ? "Официальный партнёр ASAN e-Visa"
          : language === "AR"
          ? "شريك رسمي لتأشيرة ASAN"
          : "Official ASAN e-Visa Partner",
    },
    {
      icon: "🔒",
      text:
        language === "AZ"
          ? "SSL Şifrəli & Təhlükəsiz Ödəniş"
          : language === "RU"
          ? "SSL защита и безопасная оплата"
          : language === "AR"
          ? "SSL آمن ومدفوعات مشفرة"
          : "SSL Secured & Safe Payments",
    },
    {
      icon: "💬",
      text:
        language === "AZ"
          ? "24/7 VIP WhatsApp Dəstəyi"
          : language === "RU"
          ? "Поддержка 24/7 в WhatsApp"
          : language === "AR"
          ? "دعم واتساب VIP على مدار الساعة"
          : "24/7 VIP WhatsApp Support",
    },
    {
      icon: "📋",
      text:
        language === "AZ"
          ? "Lisenziyalı Azərbaycan Turizm Agentliyi"
          : language === "RU"
          ? "Лицензированное туристическое агентство"
          : language === "AR"
          ? "وكالة سياحية معتمدة"
          : "Licensed Azerbaijan Tourism Agency",
    },
  ];

  return (
    <div style={{ backgroundColor: "#071d3b" }} className="overflow-hidden border-y border-white/5">
      <div className="container-section">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
          {trustBadges.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-white/60 whitespace-nowrap">
              <span className="text-sm">{item.icon}</span>
              <span>{item.text}</span>
              {i < trustBadges.length - 1 && <span className="hidden md:inline text-white/20 ml-4">|</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
