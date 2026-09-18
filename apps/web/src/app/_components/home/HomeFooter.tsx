"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, MessageCircle, Globe, Shield, Star, Award, Heart, Check, Phone, Share2, Copy, CheckCheck, Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/settings-context";

export const HomeFooter: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings: siteConfig } = useSiteSettings();
  const [shareCopied, setShareCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  return (
<footer style={{ backgroundColor: "#061225" }} className="pt-16 pb-12 text-white border-t border-white/10">
        <div className="container-section">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Bio */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#f59e0b" }}>
                  <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl tracking-tight" style={{ color: "#f59e0b" }}>addmetour</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Discover the soul of Azerbaijan with boutique private tours, 24/7 airport pickups, and expedited 3-hour official e-Visas. Handcrafted with local passion.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">{siteConfig.marketing.tripadvisorRating || "4.9"}/5</span>
                <span className="text-[11px] text-white/60">TripAdvisor</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {language === "AZ" ? "Sürətli Keçidlər" : language === "RU" ? "Навигация" : "Quick Links"}
              </p>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>
                  <Link href="#tours" aria-label="Browse popular Azerbaijan tours" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Bütün Ekskursiyalar" : language === "RU" ? "Все экскурсии" : "Browse All Tours"}
                  </Link>
                </li>
                <li>
                  <Link href="#destinations" aria-label="View Azerbaijan destinations" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Populyar Məkanlar" : language === "RU" ? "Популярные направления" : "Top Destinations"}
                  </Link>
                </li>
                <li>
                  <Link href="/visa" aria-label="Official Azerbaijan e-Visa application" className="hover:text-amber-400 transition-colors">
                    {t.nav.evisa} (ASAN Visa)
                  </Link>
                </li>
                <li>
                  <Link href="/transfer" aria-label="Book airport transfer in Baku" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Hava Limanı Transferi" : language === "RU" ? "Трансфер из аэропорта" : "Airport Transfer (GYD)"}
                  </Link>
                </li>
                <li>
                  <Link href="#about" aria-label="Why travel with AddmeTour" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Niyə AddmeTour?" : language === "RU" ? "Почему AddmeTour" : "Why Choose Us"}
                  </Link>
                </li>
                <li>
                  <Link href="#reviews" aria-label="Read authentic traveler reviews" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Səyahətçi Rəyləri" : language === "RU" ? "Отзывы туристов" : "Traveler Reviews"}
                  </Link>
                </li>
                <li>
                  <Link href="#faq" aria-label="Frequently asked travel questions" className="hover:text-amber-400 transition-colors">
                    {language === "AZ" ? "Suallar və Cavablar" : language === "RU" ? "Вопросы и ответы" : "Help & FAQ"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Support */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {t.footer.contact}
              </p>
              <div className="space-y-3 text-xs text-white/70">
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">📍</span> {siteConfig.contact.officeAddress || "Nizami Street 48, Baku, Azerbaijan"}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">💬</span> WhatsApp: {siteConfig.contact.whatsappPhone}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber-400">✉️</span> {siteConfig.contact.supportEmail || "info@addmetour.com"}
                </p>
                <p className="text-[11px] text-white/50 pt-1">
                  {t.footer.supportAvailable}
                </p>
              </div>
            </div>

            {/* Col 4: Social Channels & Share Bar */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {language === "AZ" ? "Bizi İzləyin & Paylaşın" : language === "RU" ? "Соцсети и Поделиться" : "Follow & Share"}
              </p>
              
              {/* Social Channels */}
              <div className="flex items-center gap-2 mb-6">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with AddmeTour on WhatsApp"
                  title="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#25D366] hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`https://t.me/${(siteConfig.contact.telegramHandle || "addmetour").replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Telegram"
                  title="Telegram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#0088cc] hover:text-white transition-all duration-200"
                >
                  <Globe className="h-4 w-4" />
                </a>

                <a
                  href="https://instagram.com/addmetour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Instagram"
                  title="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#E1306C] hover:text-white transition-all duration-200"
                >
                  <Star className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/addmetour"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow AddmeTour on Facebook"
                  title="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                >
                  <Award className="h-4 w-4" />
                </a>
              </div>

              {/* Social Share Toolbar */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                <span className="block text-[11px] font-semibold text-white/80 mb-2.5 flex items-center gap-1.5">
                  <Share2 className="h-3.5 w-3.5 text-amber-400" />
                  {language === "AZ" ? "Səhifəni Paylaşın" : language === "RU" ? "Поделиться сайтом" : "Share this Page"}
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Discover Azerbaijan with AddmeTour: https://addmetour.vercel.app")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on WhatsApp"
                    className="flex-1 rounded-lg py-1.5 bg-[#25D366]/20 hover:bg-[#25D366] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    WA
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent("https://addmetour.vercel.app")}&text=${encodeURIComponent("Discover Azerbaijan Tours & Travel Experiences")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on Telegram"
                    className="flex-1 rounded-lg py-1.5 bg-[#0088cc]/20 hover:bg-[#0088cc] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    TG
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://addmetour.vercel.app")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share AddmeTour on Facebook"
                    className="flex-1 rounded-lg py-1.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1"
                  >
                    FB
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy website link to clipboard"
                    className="flex-1 rounded-lg py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {shareCopied ? <CheckCheck className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{shareCopied ? "OK" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Brochure Download CTA */}
          <div className="my-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(245,158,11,0.2)" }}>
                <Download className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {language === "AZ" ? "Tur Kataloqlarını Yükləyin" : language === "RU" ? "Скачать каталог туров" : language === "AR" ? "تحميل كتالوج الجولات" : "Download Tour Catalogue"}
                </p>
                <p className="text-[11px] text-white/50 mt-0.5">
                  {language === "AZ" ? "PDF formatında bütün marşrutlar, qiymətlər və paket detalları" : language === "RU" ? "Все маршруты, цены и детали туров в PDF формате" : language === "AR" ? "جميع المسارات والأسعار وتفاصيل الباقات بصيغة PDF" : "All itineraries, prices & package details in PDF format"}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=${encodeURIComponent("I'd like to receive the AddmeTour tour catalogue (PDF brochure).")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-[#061225] transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#f59e0b" }}
            >
              <Download className="h-3.5 w-3.5" />
              {language === "AZ" ? "PDF Yüklə" : language === "RU" ? "Скачать PDF" : language === "AR" ? "تحميل PDF" : "Download PDF"}
            </a>
          </div>

          {/* Bottom Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>{t.footer.rights}</p>
            <div className="flex items-center gap-6">
              <Link href="/medical" aria-label="Medical & Wellness Tourism" className="hover:text-white transition-colors">
                {language === "AZ" ? "Tibbi Turizm" : language === "RU" ? "Медицинский туризм" : language === "AR" ? "السياحة الطبية" : "Medical Tourism"}
              </Link>
              <Link href="/mice" aria-label="MICE & Corporate Events" className="hover:text-white transition-colors">
                {language === "AZ" ? "Korporativ Turlar" : language === "RU" ? "Корпоративные туры" : language === "AR" ? "سياحة الأعمال" : "Corporate & MICE"}
              </Link>
              <Link href="/admin" aria-label="Admin Management Portal" className="hover:text-white transition-colors">
                {t.nav.adminPortal}
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
};
