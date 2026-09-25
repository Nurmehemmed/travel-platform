"use client";

import React from "react";
import Image from "next/image";
import { Users, Shield, Zap, Award, Globe, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CURRENT_BRAND } from "@/lib/brand";

export const HomeWhyUs: React.FC = () => {
  const { t, language } = useLanguage();

  return (
<section id="about" className="py-20" style={{ backgroundColor: "#0f3460" }}>
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Features */}
            <div>
              <p className="section-label mb-4" style={{ color: "#f59e0b" }}>
                {t.whyUs.badge}
              </p>
              <h2 className="font-display text-4xl font-bold text-white leading-tight mb-6">
                {t.whyUs.title}
              </h2>
              <p className="text-white/80 leading-relaxed mb-10 text-base">
                {language === "AZ"
                  ? `${CURRENT_BRAND.name} ilə Azərbaycanın əsl ruhunu kəşf edin. Biz qədim İpək Yolu irsini, zəngin mətbəxi və Qafqazın əsrarəngiz təbiətini birləşdirən xüsusi fərdi və kiçik qruplar üçün unikal səyahətlər təşkil edirik.`
                  : language === "RU"
                  ? `Откройте для себя истинную душу Азербайджана с ${CURRENT_BRAND.name}. Мы создаем индивидуальные и авторские экскурсии, объединяя древнее наследие Шелкового пути и кавказское гостеприимство.`
                  : language === "FR"
                  ? `Découvrez l'âme authentique de l'Azerbaïdjan avec ${CURRENT_BRAND.name}. Nous concevons des circuits sur mesure alliant patrimoine historique et paysages grandioses du Caucase.`
                  : language === "AR"
                  ? `اكتشف روح وسحر أذربيجان الحقيقية مع ${CURRENT_BRAND.name}. نصمم رحلات سياحية خاصة تجمع بين عبق طريق الحرير وضيافة القوقاز الأصيلة.`
                  : language === "DE"
                  ? `Entdecken Sie die Seele Aserbaidschans mit ${CURRENT_BRAND.name}. Wir gestalten maßgeschneiderte Touren, die Seidenstraßen-Kultur mit herrlicher Kaukasus-Natur verbinden.`
                  : `Discover the true soul of Azerbaijan with ${CURRENT_BRAND.name}. We curate handcrafted private excursions and small-group journeys that blend centuries-old Silk Road heritage with authentic Caucasus hospitality.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Globe, title: t.whyUs.feature1Title, desc: t.whyUs.feature1Desc },
                  { icon: Shield, title: t.whyUs.feature2Title, desc: t.whyUs.feature2Desc },
                  { icon: Award, title: t.whyUs.feature3Title, desc: t.whyUs.feature3Desc },
                  { icon: MessageCircle, title: t.whyUs.feature4Title, desc: t.whyUs.feature4Desc },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl p-5 transition-all duration-200 hover:bg-white/10"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(245,158,11,0.20)" }}
                      >
                        <f.icon className="h-4 w-4" style={{ color: "#f59e0b" }} />
                      </div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo collage */}
            <div className="relative h-[380px] sm:h-[440px] md:h-[480px]">
              {/* Main large photo */}
              <div className="absolute right-0 top-0 h-[300px] w-[75%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=85"
                  alt="Baku skyline"
                  fill
                  sizes="(max-width: 768px) 75vw, 600px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* Bottom-left photo */}
              <div className="absolute bottom-0 left-0 h-[200px] w-[55%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/baku-old-city.jpg"
                  alt="Old City Baku"
                  fill
                  sizes="(max-width: 768px) 55vw, 450px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* Bottom-right small photo */}
              <div className="absolute bottom-0 right-0 h-[160px] w-[35%] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85"
                  alt="Azerbaijan landscape"
                  fill
                  sizes="(max-width: 768px) 35vw, 300px"
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
              {/* TripAdvisor badge */}
              <div
                className="absolute bottom-28 right-4 flex flex-col items-center justify-center rounded-2xl px-4 py-3 shadow-xl"
                style={{ backgroundColor: "#f59e0b" }}
              >
                <span className="text-2xl font-bold text-[#061225]">4.9</span>
                <span className="text-xs font-bold text-[#061225]/90">TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
