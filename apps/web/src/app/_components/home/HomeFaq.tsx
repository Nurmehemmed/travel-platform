"use client";

import React from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

interface HomeFaqProps {
  openFaq: number | null;
  setOpenFaq: React.Dispatch<React.SetStateAction<number | null>>;
}

export const HomeFaq: React.FC<HomeFaqProps> = ({
  openFaq,
  setOpenFaq,
}) => {
  const { t, language } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();

  return (
<section id="faq" className="py-24" style={{ backgroundColor: "#faf6f0" }}>
        <div className="container-section max-w-4xl">
          <div className="text-center mb-14">
            <p className="section-label mb-3">
              {t.faq.badge}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "#0f3460" }}>
              {t.faq.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {[
              { question: t.faq.q1, answer: t.faq.a1 },
              { question: t.faq.q2, answer: t.faq.a2 },
              { question: t.faq.q3, answer: t.faq.a3 },
              { question: t.faq.q4, answer: t.faq.a4 },
              { question: t.faq.q5, answer: t.faq.a5 },
              {
                question: language === "AZ"
                  ? "Azərbaycanda 15 gündən çox qaldıqda qeydiyyat tələb olunurmu?"
                  : language === "RU"
                  ? "Нужна ли регистрация при пребывании в Азербайджане более 15 дней?"
                  : language === "FR"
                  ? "L'enregistrement de séjour de 15 jours (DMX) est-il obligatoire ?"
                  : language === "AR"
                  ? "هل التسجيل لدى دائرة الهجرة إلزامي إذا زادت الإقامة عن 15 يوماً؟"
                  : language === "DE"
                  ? "Ist eine Registrierung bei mehr als 15 Tagen Aufenthalt erforderlich?"
                  : "Is the 15-day migration registration (DMX) mandatory?",
                answer: language === "AZ"
                  ? "Bəli. Azərbaycan qanunvericiliyinə görə, 15 təqvim günündən çox qalan xaricilər Dövlət Miqrasiya Xidmətində (DMX) qeydiyyatdan keçməlidir. Otellər bunu avtomatik edir. Əgər Airbnb və ya kirayə mənzildə qalırsınızsa, 15 gün ərzində qeydiyyat aparılmalıdır, əks halda hava limanında 300-400 AZN cərimə tətbiq olunur. Komandamız Airbnb qonaqlarına kömək edir."
                  : language === "RU"
                  ? "Да. Иностранцы, находящиеся в Азербайджане более 15 дней, обязаны зарегистрироваться по месту пребывания в Государственной миграционной службе (ГМС). Отели делают это автоматически. Если вы живете в Airbnb или квартире, регистрация обязательна, иначе при выезде взимается штраф 300–400 AZN. Наш консьерж помогает с регистрацией."
                  : language === "FR"
                  ? "Oui. Tout étranger séjournant plus de 15 jours doit s'enregistrer auprès du Service d'État des Migrations (DMX). Les hôtels le font automatiquement. Pour les séjours en Airbnb ou appartement, l'enregistrement doit être fait sous 15 jours sous peine d'une amende de 300 à 400 AZN à l'aéroport. Notre équipe conciergerie vous accompagne."
                  : language === "AR"
                  ? "نعم. يلزم القانون الأذربيجاني أي زائر يقيم أكثر من 15 يوماً بالتسجيل لدى دائرة الهجرة الحكومية (DMX). الفنادق تتولى ذلك تلقائياً، أما في شقق Airbnb فيجب التسجيل خلال 15 يوماً لتجنب غرامة 300-400 مانات عند المغادرة. يقدم فريقنا الدعم الكامل لضيوف الشقق."
                  : language === "DE"
                  ? "Ja. Bei einem Aufenthalt von mehr als 15 Tagen ist eine Registrierung bei der Migrationsbehörde (DMX) vorgeschrieben. Hotels erledigen dies automatisch. Bei Unterkünften wie Airbnb muss die Registrierung innerhalb von 15 Tagen erfolgen, um eine Geldstrafe von 300–400 AZN am Flughafen zu vermeiden. Unser Team unterstützt Sie gern."
                  : "Yes. Under Azerbaijani immigration law, foreigners staying over 15 calendar days must register with the State Migration Service (DMX). 4/5-star hotels handle this automatically at check-in. If you are staying in an Airbnb or private rental, registration must be filed within 15 days to avoid a 300–400 AZN fine at airport exit control. Our concierge team assists Airbnb guests with registration."
              },
              {
                question: language === "AZ"
                  ? "Quru sərhədləri açıqdırmı? Qonşu ölkələrdən qatar və ya maşınla gəlmək olar?"
                  : language === "RU"
                  ? "Открыты ли сухопутные границы? Можно ли приехать на поезде или авто?"
                  : language === "FR"
                  ? "Les frontières terrestres sont-elles ouvertes aux voyageurs ?"
                  : language === "AR"
                  ? "هل الحدود البرية مفتوحة للمسافرين القادمين بالسيارة أو القطار؟"
                  : language === "DE"
                  ? "Sind die Landgrenzen für Touristen geöffnet?"
                  : "Are Azerbaijan's land borders open for tourist crossings?",
                answer: language === "AZ"
                  ? "Xeyr. Azərbaycanın Gürcüstan, Rusiya, İran və Türkiyə ilə quru sərhədləri sərnişin daşımaları üçün bağlı qalır. Bütün xarici turistlər ölkəyə beynəlxalq aviareyslərlə (GYD Bakı, GJA Gəncə, NAJ Naxçıvan) daxil olmalıdır."
                  : language === "RU"
                  ? "Нет. Сухопутные границы Азербайджана с Грузией, Россией, Ираном и Турцией закрыты для пассажирского въезда. Въезд туристов возможен исключительно международными авиарейсами в аэропорты Баку (GYD), Гянджи (GJA) и Нахчывана (NAJ)."
                  : language === "FR"
                  ? "Non. Les frontières terrestres avec la Géorgie, la Russie, l'Iran et la Turquie restent fermées pour les passagers. L'entrée en Azerbaïdjan s'effectue exclusivement par voie aérienne via les aéroports de Bakou (GYD), Gandja (GJA) ou Nakhitchevan (NAJ)."
                  : language === "AR"
                  ? "لا. لا تزال الحدود البرية لأذربيجان مع جورجيا وروسيا وإيران وتركيا مغلقة أمام حركة المسافرين. الدخول متاح حصراً عبر الرحلات الجوية الدولية في مطار باكو (GYD) وغنجة (GJA) ونخجوان (NAJ)."
                  : language === "DE"
                  ? "Nein. Die Landgrenzen zu Georgien, Russland, Iran und der Türkei sind für den Personenverkehr weiterhin geschlossen. Die Einreise für Touristen ist derzeit ausschließlich auf dem Luftweg über die Flughäfen Baku (GYD), Ganja (GJA) und Nachitschewan (NAJ) möglich."
                  : "No. Azerbaijan's land borders with Georgia, Russia, Iran, and Turkey remain closed for international passenger transit. All tourists must arrive via international flights landing at Heydar Aliyev International Airport (GYD Baku), Ganja (GJA), or Nakhchivan (NAJ)."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border transition-all duration-200 overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: isOpen ? "#f59e0b" : "#e8dfd2",
                    boxShadow: isOpen
                      ? "0 10px 25px -5px rgba(19, 62, 53, 0.08)"
                      : "0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-semibold text-base md:text-lg transition-colors"
                      style={{ color: isOpen ? "#0f3460" : "#1e293b" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{
                        backgroundColor: isOpen ? "#0f3460" : "#f0f9ff",
                        color: isOpen ? "#ffffff" : "#0f3460",
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="mt-12 text-center p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: "#f0e7d8", border: "1px dashed #f59e0b" }}
          >
            <div className="text-left">
              <p className="font-bold text-slate-900 text-base">{t.footer.contact}</p>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                {t.footer.supportAvailable}
              </p>
            </div>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: "#0f3460" }}
            >
              <MessageCircle className="h-4 w-4 text-[#f59e0b]" />
              WhatsApp ({siteConfig.contact.whatsappPhone})
            </a>
          </div>
        </div>
      </section>
  );
};
