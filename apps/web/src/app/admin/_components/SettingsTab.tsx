"use client";

import React from "react";
import {
  Sliders,
  Save,
  Phone,
  Megaphone,
  DollarSign,
  Shield,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { AdminLanguage } from "./types";

interface SettingsTabProps {
  language: AdminLanguage;
  adminT: any;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  settingsCategoryFilter: string;
  setSettingsCategoryFilter: (cat: string) => void;
  settingsSaving: boolean;
  handleResetSettings: () => void;
  handleSaveSettings: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  language,
  adminT,
  settingsDraft,
  setSettingsDraft,
  settingsCategoryFilter,
  setSettingsCategoryFilter,
  settingsSaving,
  handleResetSettings,
  handleSaveSettings,
}) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#f59e0b]" />
            <span>
              {language === "AZ"
                ? "Dinamik Platform Konfiqurasiyası"
                : "Dynamic Platform Configuration"}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "AZ"
              ? "Biznes əlaqə kanallarını, qiymət marjalarını, elan başlıqlarını və xidmət əlçatanlığını kodu yenidən yerləşdirmədən idarə edin."
              : "Modify business contact channels, pricing margins, announcement banners, and service availability without redeploying code."}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetSettings}
            disabled={settingsSaving}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {language === "AZ" ? "Qaralamanı Sıfırla" : "Reset Draft"}
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#0f3460" }}
          >
            <Save
              className={`h-4 w-4 text-[#f59e0b] ${
                settingsSaving ? "animate-spin" : ""
              }`}
            />
            <span>
              {settingsSaving
                ? language === "AZ"
                  ? "Yadda saxlanılır..."
                  : "Saving..."
                : language === "AZ"
                ? "Bütün Tənzimləmələri Yadda Saxla"
                : "Save All Settings"}
            </span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          {
            id: "all",
            label: language === "AZ" ? "Bütün Tənzimləmələr" : "All Settings",
            icon: Sliders,
          },
          {
            id: "contact",
            label: language === "AZ" ? "Əlaqə və Konsyerj" : "Contact & Concierge",
            icon: Phone,
          },
          {
            id: "announcement",
            label: language === "AZ" ? "Elan Zolağı" : "Announcement Bar",
            icon: Megaphone,
          },
          {
            id: "pricing",
            label: language === "AZ" ? "Qiymətlər və Marjalar" : "Pricing & Margins",
            icon: DollarSign,
          },
          {
            id: "operations",
            label: language === "AZ" ? "Xidmət Keçidləri" : "Service Toggles",
            icon: Shield,
          },
          {
            id: "marketing",
            label: language === "AZ" ? "Sosial Sübutlar" : "Social Proof",
            icon: Sparkles,
          },
        ].map((cat) => {
          const Icon = cat.icon;
          const isSelected = settingsCategoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSettingsCategoryFilter(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 ${
                  isSelected ? "text-[#f59e0b]" : "text-slate-400"
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Contact & Concierge Settings */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "contact") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>
                  {language === "AZ"
                    ? "Əlaqə və Konsyerj Kanalları"
                    : "Contact & Concierge Channels"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "AZ"
                  ? "WhatsApp sifarişləri, təcili yardım və qonaq sorğuları üçün nömrə və ünvanları idarə edir."
                  : "Controls numbers and handles used for WhatsApp booking, emergency assistance, and guest inquiries."}
              </p>
            </div>
            {settingsDraft["contact_whatsapp"] && (
              <a
                href={`https://wa.me/${String(settingsDraft["contact_whatsapp"]).replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>
                  {language === "AZ" ? "WhatsApp Linkini Yoxla" : "Test WhatsApp Link"}
                </span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "Əsas WhatsApp Nömrəsi *" : "Primary WhatsApp Number *"}
              </label>
              <input
                type="text"
                value={settingsDraft["contact_whatsapp"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    contact_whatsapp: e.target.value,
                  }))
                }
                placeholder="+994 55 100 31 46"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {language === "AZ"
                  ? 'Bütün "WhatsApp ilə sifariş", tur kartı düymələri və konsyerj keçidlərinə dinamik bağlanır.'
                  : 'Linked dynamically to all "Book via WhatsApp", tour card buttons, and concierge triggers.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ"
                  ? "Əməliyyat və Təcili Əlaqə Qaynar Xətti"
                  : "Operations & Emergency Hotline"}
              </label>
              <input
                type="text"
                value={settingsDraft["contact_phone"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    contact_phone: e.target.value,
                  }))
                }
                placeholder="+994 55 100 31 46"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {language === "AZ"
                  ? "Zəng sorğuları üçün saytın aşağı hissəsində və dəstək sənədlərində göstərilir."
                  : "Displayed in footer and support documents for voice inquiries."}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "Dəstək E-poçt Ünvanı" : "Support Email Address"}
              </label>
              <input
                type="email"
                value={settingsDraft["contact_email"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    contact_email: e.target.value,
                  }))
                }
                placeholder="info@addmetour.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ"
                  ? "Telegram İstifadəçi Adı / Dəstək Kanalı"
                  : "Telegram Username / Support Channel"}
              </label>
              <input
                type="text"
                value={settingsDraft["contact_telegram"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    contact_telegram: e.target.value,
                  }))
                }
                placeholder="addmetour"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ"
                  ? "Bakı Ofisi / Əməliyyat Mərkəzi Ünvanı"
                  : "Baku Office / Operational Base Address"}
              </label>
              <input
                type="text"
                value={settingsDraft["contact_address"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    contact_address: e.target.value,
                  }))
                }
                placeholder="Nizami Street 48, Baku, Azerbaijan"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Site-wide Announcement Banner */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "announcement") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-[#f59e0b]" />
                <span>
                  {language === "AZ"
                    ? "Sayt Üzrə Canlı Elan Zolağı"
                    : "Live Site Announcement Banner"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === "AZ"
                  ? "Aksiyalar, sərhəd yeniləmələri və ya mövsümi təkliflər üçün hər səhifənin yuxarısında interaktiv zolaq göstərir."
                  : "Renders an interactive ribbon at the top of every page for promotions, border updates, or seasonal specials."}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(settingsDraft["announcement_active"])}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    announcement_active: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              <span className="ml-2 text-xs font-bold text-slate-700">
                {settingsDraft["announcement_active"]
                  ? language === "AZ"
                    ? "Aktiv (Görünən)"
                    : "Active (Visible)"
                  : language === "AZ"
                  ? "Deaktiv"
                  : "Disabled"}
              </span>
            </label>
          </div>

          {/* Banner Preview */}
          {settingsDraft["announcement_active"] && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 flex items-center justify-between text-xs font-semibold shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] uppercase font-bold">
                  {settingsDraft["announcement_badge"] ||
                    (language === "AZ" ? "Təklif" : "Offer")}
                </span>
                <span>
                  {settingsDraft["announcement_text"] ||
                    (language === "AZ"
                      ? "Elan mətni burada göstəriləcək..."
                      : "Preview announcement text goes here...")}
                </span>
              </div>
              <span className="text-[11px] underline font-bold cursor-pointer">
                {settingsDraft["announcement_link"] ||
                  (language === "AZ" ? "Ətraflı" : "Learn More")}{" "}
                ↗
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "Nişan Mətni" : "Badge Pill Text"}
              </label>
              <input
                type="text"
                value={settingsDraft["announcement_badge"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    announcement_badge: e.target.value,
                  }))
                }
                placeholder={language === "AZ" ? "Məhdud Təklif" : "Limited Offer"}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ"
                  ? "Elan Mesaj Mətni"
                  : "Announcement Message Text"}
              </label>
              <input
                type="text"
                value={settingsDraft["announcement_text"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    announcement_text: e.target.value,
                  }))
                }
                placeholder="🌸 Autumn in Azerbaijan: Book custom tours early and get complimentary airport pickup!"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "Keçid Linki URL" : "Call-to-Action Link URL"}
              </label>
              <input
                type="text"
                value={settingsDraft["announcement_link"] ?? ""}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    announcement_link: e.target.value,
                  }))
                }
                placeholder="/#tours"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 font-mono focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Pricing & Rates Configuration */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "pricing") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <span>
                {language === "AZ"
                  ? "e-Viza və Aeroport Transfer Qiymətləri (USD)"
                  : "e-Visa & Airport Transfer Pricing (USD)"}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "AZ"
                ? "Səyahətçilərdən tutulan xidmət haqlarını tənzimləyin. Dəyişikliklər dərhal ödəniş və sifariş kartlarında əks olunur."
                : "Adjust service fees charged to travelers. Changes reflect immediately on checkout and booking cards."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Standart e-Viza (3 gün)" : "Standard eVisa (3d)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_visa_standard"] ?? 45}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_visa_standard: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === "AZ" ? "Dövlət rüsumu daxildir ($26)" : "Includes govt fee ($26)"}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Təcili e-Viza (3 saat)" : "Urgent eVisa (3h)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-amber-700 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_visa_urgent"] ?? 85}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_visa_urgent: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-amber-700 mt-1 block">
                {language === "AZ"
                  ? "Təcili rüsum daxildir ($61)"
                  : "Includes urgent fee ($61)"}
              </span>
            </div>

            {/* Transfer Sedan Base */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Transfer Sedan Baza" : "Transfer Sedan Base"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_transfer_sedan"] ?? 25}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_sedan: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === "AZ" ? "1–3 Sərnişin (Baza haqqı)" : "1–3 Pax (Base fee)"}
              </span>
            </div>

            {/* Transfer SUV Base */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Transfer SUV Baza" : "Transfer SUV Base"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_transfer_suv"] ?? 40}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_suv: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === "AZ" ? "1–4 Sərnişin (Baza haqqı)" : "1–4 Pax (Base fee)"}
              </span>
            </div>

            {/* Transfer Minivan Base */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Transfer Minivan (Vito)" : "Transfer Minivan (Vito)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_transfer_minivan"] ?? 40}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_minivan: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === "AZ" ? "4–7 Sərnişin (Baza haqqı)" : "4–7 Pax (Base fee)"}
              </span>
            </div>

            {/* Transfer Sprinter Base */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Transfer Sprinter VIP" : "Transfer Sprinter VIP"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_transfer_sprinter"] ?? 65}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_sprinter: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {language === "AZ" ? "8–16 Sərnişin (Baza haqqı)" : "8–16 Pax (Base fee)"}
              </span>
            </div>

            {/* Sedan KM Rate */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Sedan KM Qiyməti ($/km)" : "Sedan KM Rate ($/km)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sky-600 font-bold">$</span>
                <input
                  type="number"
                  step="0.05"
                  value={settingsDraft["pricing_transfer_per_km_sedan"] ?? 0.45}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_per_km_sedan: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-sky-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-sky-700 mt-1 block">
                {language === "AZ" ? "Məsafə tarifi (Standart: $0.45/km)" : "Distance tariff (Default: $0.45/km)"}
              </span>
            </div>

            {/* SUV KM Rate */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "SUV KM Qiyməti ($/km)" : "SUV KM Rate ($/km)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sky-600 font-bold">$</span>
                <input
                  type="number"
                  step="0.05"
                  value={settingsDraft["pricing_transfer_per_km_suv"] ?? 0.60}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_per_km_suv: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-sky-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-sky-700 mt-1 block">
                {language === "AZ" ? "Məsafə tarifi (Standart: $0.60/km)" : "Distance tariff (Default: $0.60/km)"}
              </span>
            </div>

            {/* Minivan KM Rate */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Minivan KM Qiyməti ($/km)" : "Minivan KM Rate ($/km)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sky-600 font-bold">$</span>
                <input
                  type="number"
                  step="0.05"
                  value={settingsDraft["pricing_transfer_per_km_minivan"] ?? 0.75}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_per_km_minivan: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-sky-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-sky-700 mt-1 block">
                {language === "AZ" ? "Məsafə tarifi (Standart: $0.75/km)" : "Distance tariff (Default: $0.75/km)"}
              </span>
            </div>

            {/* Round-trip discount */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                {language === "AZ" ? "Gediş-Dönüş Endirimi (%)" : "Round-Trip Discount (%)"}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">%</span>
                <input
                  type="number"
                  value={settingsDraft["pricing_transfer_roundtrip_discount"] ?? 10}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      pricing_transfer_roundtrip_discount: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
              </div>
              <span className="text-[10px] text-emerald-700 mt-1 block">
                {language === "AZ" ? "Hər iki istiqamətə tətbiq olunur (Standart: 10%)" : "Applied to both legs (Default: 10%)"}
              </span>
            </div>
          </div>

          {/* Transfer Policy & SLA SLA Rules Sub-Section */}
          <div className="border-t border-slate-100 pt-5 mt-4">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>{language === "AZ" ? "Transfer Qaydaları və Zəmanət Parametrləri" : "Transfer Policy & SLA Guarantee Rules"}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">
                  {language === "AZ" ? "Pulsuz Ləğv Müddəti (Saat)" : "Free Cancellation Window (Hours)"}
                </span>
                <input
                  type="number"
                  value={settingsDraft["transfer_cancellation_hours"] ?? 24}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      transfer_cancellation_hours: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {language === "AZ" ? "100% geri qaytarılma üçün (24 saat)" : "For 100% refund (24h)"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">
                  {language === "AZ" ? "Beynəlxalq Reys Gözləmə (Dəq)" : "Intl Flight Wait Time (Mins)"}
                </span>
                <input
                  type="number"
                  value={settingsDraft["transfer_wait_time_intl_mins"] ?? 60}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      transfer_wait_time_intl_mins: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {language === "AZ" ? "Enişdən sonra pulsuz gözləmə (60 dəq)" : "Free wait after landing (60 mins)"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">
                  {language === "AZ" ? "Daxili / Otel Gözləmə (Dəq)" : "Domestic/Hotel Wait Time (Mins)"}
                </span>
                <input
                  type="number"
                  value={settingsDraft["transfer_wait_time_dom_mins"] ?? 30}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      transfer_wait_time_dom_mins: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {language === "AZ" ? "Qarşılanma üçün pulsuz gözləmə (30 dəq)" : "Free wait for pickup (30 mins)"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">
                  {language === "AZ" ? "Dispetçer Əlaqə Nömrəsi" : "Dispatch Hotline"}
                </span>
                <input
                  type="text"
                  value={settingsDraft["transfer_dispatch_phone"] ?? "+994 12 404 78 88"}
                  onChange={(e) =>
                    setSettingsDraft((prev) => ({
                      ...prev,
                      transfer_dispatch_phone: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {language === "AZ" ? "24/7 Çıxış dəstəyi telefonu" : "24/7 Operations hotline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Operational Kill-Switches & Toggles */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "operations") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span>
                {language === "AZ"
                  ? "Əməliyyat Keçidləri və Funksiya Açarları"
                  : "Operational Kill-Switches & Feature Toggles"}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "AZ"
                ? "Pik mövsüm tutumu və ya planlaşdırılan texniki qulluq zamanı müştəri modullarını aktiv edin və ya dayandırın."
                : "Enable or suspend customer-facing modules during peak season capacity or scheduled maintenance."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {language === "AZ" ? "Üzən WhatsApp Vidceti" : "Floating WhatsApp Widget"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "AZ"
                    ? "Aşağı sağ küncdə WhatsApp söhbət düyməsini göstər"
                    : "Show bottom-right WhatsApp chat bubble"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settingsDraft["operations_floating_whatsapp"] !== false}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    operations_floating_whatsapp: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {language === "AZ" ? "Üzən Xidmət Düymələri (e-Viza / Transfer)" : "Floating Quick Services Dock"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "AZ"
                    ? "Aşağı sağ küncdə Viza və Transfer sürətli keçid kapsulunu göstər"
                    : "Show bottom-right e-Visa & Airport Transfer pill dock"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settingsDraft["operations_floating_services"] !== false}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    operations_floating_services: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {language === "AZ" ? "Üzən Fərdi Marşrut Vidceti" : "Floating Custom Itinerary Pill"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "AZ"
                    ? "Aşağı sol küncdə 'Özəl Marşrut / VIP Tur' planlayıcı düyməsini göstər"
                    : "Show bottom-left custom tour builder pill"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settingsDraft["operations_floating_itinerary"] !== false}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    operations_floating_itinerary: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {language === "AZ" ? "e-Viza Müraciət Xidməti" : "e-Visa Application Service"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "AZ"
                    ? "Yeni onlayn viza müraciətlərini qəbul et"
                    : "Accept new online visa submissions"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settingsDraft["operations_visa_service"] !== false}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    operations_visa_service: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {language === "AZ"
                    ? "Aeroport Transfer Sifarişləri"
                    : "Airport Transfer Bookings"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "AZ"
                    ? "Birbaşa gediş rezervasiyalarını qəbul et"
                    : "Accept direct ride reservations"}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settingsDraft["operations_transfer_service"] !== false}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    operations_transfer_service: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Marketing & Social Proof */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "marketing") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>
                {language === "AZ"
                  ? "Sosial Sübutlar və Etibar Nişanları"
                  : "Social Proof & Trust Badges"}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "AZ"
                ? "Əsas səhifədə nişanlar kimi göstərilən reytinq və rəy sayğacları."
                : "Ratings and review counters displayed in badges across the homepage."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "TripAdvisor Reytinq Göstəricisi" : "TripAdvisor Rating Display"}
              </label>
              <input
                type="text"
                value={settingsDraft["marketing_tripadvisor_rating"] ?? "4.9"}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    marketing_tripadvisor_rating: e.target.value,
                  }))
                }
                placeholder="4.9"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {language === "AZ" ? "Təsdiqlənmiş Rəy Sayı" : "Verified Reviews Count"}
              </label>
              <input
                type="text"
                value={settingsDraft["marketing_tripadvisor_reviews"] ?? "2,400+"}
                onChange={(e) =>
                  setSettingsDraft((prev) => ({
                    ...prev,
                    marketing_tripadvisor_reviews: e.target.value,
                  }))
                }
                placeholder="2,400+"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
