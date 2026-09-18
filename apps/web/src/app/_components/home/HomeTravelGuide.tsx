"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export const HomeTravelGuide: React.FC = () => {
  const { language, t } = useLanguage();

  return (
<section id="guide" className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-section">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="section-label mb-3" style={{ color: "#0f3460" }}>
              {language === "AZ"
                ? "SƏYAHƏT BƏLƏDÇİSİ"
                : language === "RU"
                ? "ПУТЕВОДИТЕЛЬ ПО СТРАНЕ"
                : language === "FR"
                ? "GUIDE DE VOYAGE"
                : language === "AR"
                ? "دليل السفر السياحي"
                : language === "DE"
                ? "REISEFÜHRER"
                : "TRAVEL GUIDE & HIGHLIGHTS"}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              {language === "AZ"
                ? "Odlar Yurdu Azərbaycanın Əsas Məkanları"
                : language === "RU"
                ? "Откройте душу Азербайджана: Главные достопримечательности"
                : language === "FR"
                ? "Découvrez l'âme de l'Azerbaïdjan : Incontournables"
                : language === "AR"
                ? "اكتشف روح وسحر أذربيجان: أهم المعالم والتجارب"
                : language === "DE"
                ? "Entdecken Sie die Seele Aserbaidschans: Die Höhepunkte"
                : "Discover the Soul of Azerbaijan: Unmissable Highlights"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {language === "AZ"
                ? "Xəzər sahilindəki qədim İçərişəhərdən Böyük Qafqazın qarlı zirvələrinə qədər — zəngin İpək Yolu irsi, qədim palçıq vulkanları və əfsanəvi qonaqpərvərlik sizi gözləyir."
                : language === "RU"
                ? "От жемчужины Каспия Баку до величественных вершин Большого Кавказа — древнее наследие Шелкового пути, грязевые вулканы и легендарное кавказское гостеприимство."
                : language === "FR"
                ? "Des ruelles historiques de Bakou aux sommets du Grand Caucase : découvrez les trésors de la Route de la Soie, les volcans de boue et l'hospitalité légendaire."
                : language === "AR"
                ? "من أزقة باكو التاريخية إلى قمم جبال القوقاز الشاهقة: تراث طريق الحرير العريق، البراكين الطينية النادرة، وكرم الضيافة الأذربيجاني الأصيل."
                : language === "DE"
                ? "Von den historischen Gassen Bakus bis zu den Gipfeln des Großen Kaukasus: Erleben Sie das Erbe der Seidenstraße, Schlammvulkane und herzliche Gastfreundschaft."
                : "From the ancient stone streets of Baku to the majestic heights of the Great Caucasus — explore UNESCO Silk Road treasures, otherworldly mud volcanoes, and legendary Caucasian warmth."}
            </p>
          </div>

          {/* 4 Thematic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🏰",
                title: language === "AZ" ? "Qədim Bakı & Abşeron" : language === "RU" ? "Старый Баку и Апшерон" : language === "FR" ? "Bakou & Absheron" : language === "AR" ? "باكو القديمة وأبشيرون" : language === "DE" ? "Baku & Absheron" : "Baku & Absheron Heritage",
                desc: language === "AZ"
                  ? "YUNESKO mirası İçərişəhər, Qız Qalası, Şirvanşahlar Sarayı və əbədi yanan Atəşgah məbədi ilə Yanardağın alovları."
                  : language === "RU"
                  ? "ЮНЕСКО Ичеришехер, Девичья башня, Дворец Ширваншахов, огненный храм Атешгях и горящая гора Янардаг."
                  : language === "FR"
                  ? "La vieille ville d'Icherisheher (UNESCO), la tour de la Vierge, le temple du feu d'Ateshgah et le mont flamboyant Yanar Dag."
                  : language === "AR"
                  ? "المدينة القديمة إيشري شهر المدرجة في اليونسكو، برج العذراء، قصر الشروانشاهات، ومعبد النار التاريخي أتشكاه."
                  : language === "DE"
                  ? "UNESCO-Altstadt Icherisheher, Jungfrauenturm, Schirwanschah-Palast, Feuertempel Ateshgah und brennender Berg Yanar Dag."
                  : "Explore UNESCO Icherisheher, the iconic Maiden Tower, Shirvanshahs Palace, Zoroastrian Fire Temple Ateshgah, and Yanar Dag burning mountain.",
              },
              {
                icon: "🏔️",
                title: language === "AZ" ? "Böyük Qafqaz Zirvələri" : language === "RU" ? "Вершины Большого Кавказа" : language === "FR" ? "Montagnes du Caucase" : language === "AR" ? "قمم جبال القوقاز" : language === "DE" ? "Großer Kaukasus" : "Great Caucasus Wonders",
                desc: language === "AZ"
                  ? "Şahdağın qarlı yamacları, Qəbələnin zümrüd meşələri, Nohur gölü və Lahıc sənətkarlıq kəndinin daş cığırları."
                  : language === "RU"
                  ? "Горнолыжные курорты Шахдага, изумрудные леса Габалы, высокогорное озеро Нохур и ремесленный поселок Лагич."
                  : language === "FR"
                  ? "Les pistes alpines de Shahdag, les forêts émeraude de Gabala, le lac Nohur et le village artisanal de Lahidj."
                  : language === "AR"
                  ? "منتجعات شاهداغ الجبلية، غابات غابالا الساحرة، بحيرة نوهور الخلابة، وقرية الحرفيين التاريخية لاهيج."
                  : language === "DE"
                  ? "Schneebedeckte Hänge von Shahdag, smaragdgrüne Wälder in Gabala, Nohur-See und das historische Handwerkerdorf Lahij."
                  : "Ascend to alpine heights at Shahdag, cruise peaceful Lake Nohur in Gabala, and stroll cobblestone craft alleys of ancient Lahij.",
              },
              {
                icon: "🌋",
                title: language === "AZ" ? "Qobustan & Palçıq Vulkanları" : language === "RU" ? "Гобустан и Вулканы" : language === "FR" ? "Gobustan & Volcans" : language === "AR" ? "غوبوستان والبراكين الطينية" : language === "DE" ? "Gobustan & Vulkane" : "Gobustan & Mud Volcanoes",
                desc: language === "AZ"
                  ? "6000-dən çox qədim qayaüstü rəsm, qədim yaşayış məskənləri və dünyanın ən sıx palçıq vulkanı kompleksi."
                  : language === "RU"
                  ? "Более 6000 древних наскальных петроглифов ЮНЕСКО и уникальное скопление активных грязевых вулканов мира."
                  : language === "FR"
                  ? "Plus de 6000 pétroglyphes préhistoriques classés à l'UNESCO et le plus grand complexe de volcans de boue au monde."
                  : language === "AR"
                  ? "أكثر من 6000 نقش صخري أثري تعود للعصر الحجري ونصف براكين الطين النشطة في العالم بأسره."
                  : language === "DE"
                  ? "Über 6.000 prähistorische Felszeichnungen (UNESCO) und mehr als die Hälfte aller aktiven Schlammvulkane der Erde."
                  : "Discover 6,000+ prehistoric UNESCO petroglyphs and experience bubbling lunar mud volcanoes on the Caspian rim.",
              },
              {
                icon: "📜",
                title: language === "AZ" ? "İpək Yolu & Şəki Xirqəsi" : language === "RU" ? "Шелковый путь и Шеки" : language === "FR" ? "Route de la Soie & Sheki" : language === "AR" ? "طريق الحرير وقصر شاكي" : language === "DE" ? "Seidenstraße & Sheki" : "Silk Road Legacy & Sheki",
                desc: language === "AZ"
                  ? "Məşhur Şəki Xan Sarayının şəbəkə pəncərələri, tarixi karvansaralar, paxlava və ənənəvi ipəkçilik mərkəzləri."
                  : language === "RU"
                  ? "Дворец шекинских ханов с витражами шебеке, караван-сараи XVII века, местная пахлава и шелкоткачество."
                  : language === "FR"
                  ? "Le somptueux palais des Khans de Sheki avec ses vitraux shebeke, ses caravansérails médiévaux et sa soie raffinée."
                  : language === "AR"
                  ? "قصر خانات شاكي الشهير بزجاج الشبيكة الملون بدون مسامير، الخانات الأثرية، وصناعة الحرير والحلويات التقليدية."
                  : language === "DE"
                  ? "Der Palast der Khane von Sheki mit filigranen Shebeke-Fenstern, mittelalterliche Karawansereien und edle Seide."
                  : "Marvel at the 18th-century Palace of Sheki Khans with intricate stained-glass shebeke, medieval caravanserais, and sweet baklava.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white"
              >
                <div>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <p className="font-display text-lg font-bold text-slate-900 mb-2">{p.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visitor Tips Bar */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#0f3460] to-[#16213e] text-white shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">💵 {language === "AZ" ? "Valyuta & Ödəniş" : language === "RU" ? "Валюта и карты" : language === "FR" ? "Monnaie" : language === "AR" ? "العملة والبطاقات" : language === "DE" ? "Währung" : "Currency & Cards"}</span>
                <p className="text-xs text-white/80 mt-1">Azerbaijani Manat (AZN). Visa and Mastercard are accepted in hotels, restaurants, and malls across Baku.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">☀️ {language === "AZ" ? "Ən Yaxşı Mövsüm" : language === "RU" ? "Лучший сезон" : language === "FR" ? "Meilleure saison" : language === "AR" ? "أفضل أوقات الزيارة" : language === "DE" ? "Beste Reisezeit" : "Best Travel Season"}</span>
                <p className="text-xs text-white/80 mt-1">Spring (April–June) for pleasant blooming weather; Autumn (September–November) for wine harvest and golden foliage.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">⚡ {language === "AZ" ? "ASAN e-Viza" : language === "RU" ? "Электронная виза" : language === "FR" ? "e-Visa officiel" : language === "AR" ? "التأشيرة الإلكترونية" : language === "DE" ? "e-Visum" : "Official e-Visa"}</span>
                <p className="text-xs text-white/80 mt-1">Citizens from 95+ countries can obtain an official ASAN electronic visa online within 3 hours to 3 days.</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">🫖 {language === "AZ" ? "Qonaqpərvərlik & Təhlükəsizlik" : language === "RU" ? "Безопасность и чай" : language === "FR" ? "Hospitalité & Sécurité" : language === "AR" ? "الضيافة والأمان" : language === "DE" ? "Gastfreundschaft" : "Hospitality & Safety"}</span>
                <p className="text-xs text-white/80 mt-1">Azerbaijan is ranked among the world's safest travel destinations with world-famous traditional tea ceremonies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
