"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { DESTINATIONS } from "./data";

export const HomeDestinations: React.FC = () => {
  const { t, language } = useLanguage();

  return (
<section id="destinations" className="py-20" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="container-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3">{t.destinations.badge}</p>
            <h2 className="font-display text-4xl font-bold text-slate-900">
              {t.destinations.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              {t.destinations.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { slug: "baku", name: t.destinations.bakuName, subtitle: t.destinations.bakuDesc, tours: 12, image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1000&q=80" },
              { slug: "sheki", name: t.destinations.shekiName, subtitle: t.destinations.shekiDesc, tours: 4, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80" },
              { slug: "gabala", name: language === "AZ" ? "Qəbələ & Şahdağ" : language === "RU" ? "Габала и Шахдаг" : language === "AR" ? "غابالا و شاهداغ" : "Gabala & Shahdag", subtitle: language === "AZ" ? "Dağ kurortları və göllər" : language === "RU" ? "Горные курорты и озера" : language === "AR" ? "منتجعات جبلية وبحيرات" : "Alpine resorts, cable cars & emerald lakes", tours: 5, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80" },
              { slug: "gobustan", name: t.destinations.gobustanName, subtitle: t.destinations.gobustanDesc, tours: 3, image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1000&q=80" },
            ].map((dest) => (
              <div
                key={dest.slug}
                className="group relative h-80 overflow-hidden rounded-2xl block shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                  style={{ objectFit: "cover" }}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-3.5 sm:p-5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm mb-2 pointer-events-none">
                    {language === "AZ" ? "Bələdçi & Turlar" : language === "RU" ? "Гид и туры" : language === "AR" ? "دليل وجولات" : "Guide & Tours"}
                  </span>
                  <p className="text-lg font-bold text-white font-display leading-tight">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      aria-label={`Explore ${dest.name} travel guide`}
                      className="hover:underline focus:outline-none after:absolute after:inset-0"
                    >
                      {dest.name}
                    </Link>
                  </p>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2 pointer-events-none">{dest.subtitle}</p>
                  <span
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 pointer-events-none"
                    style={{ color: "#f59e0b" }}
                  >
                    {dest.tours} {t.nav.tours} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};
