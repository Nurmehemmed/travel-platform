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
} from "lucide-react";
import { AdminLanguage } from "./types";
import {
  ContactSettingsCard,
  AnnouncementSettingsCard,
  PricingSettingsCard,
  OperationsSettingsCard,
  MarketingSettingsCard,
} from "./settings";

export interface SettingsTabProps {
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
  const isAZ = language === "AZ";

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#f59e0b]" />
            <span>
              {isAZ
                ? "Dinamik Platform Konfiqurasiyası"
                : "Dynamic Platform Configuration"}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAZ
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
            {isAZ ? "Qaralamanı Sıfırla" : "Reset Draft"}
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
                ? isAZ
                  ? "Yadda saxlanılır..."
                  : "Saving..."
                : isAZ
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
            label: isAZ ? "Bütün Bölmələr" : "All Sections",
            icon: Sliders,
          },
          {
            id: "contact",
            label: isAZ ? "Əlaqə & Qaynar Xətt" : "Contact & Helpline",
            icon: Phone,
          },
          {
            id: "announcement",
            label: isAZ ? "Elan Başlığı" : "Announcement Banner",
            icon: Megaphone,
          },
          {
            id: "pricing",
            label: isAZ ? "Viza & Transfer Qiymətləri" : "Visa & Transfer Pricing",
            icon: DollarSign,
          },
          {
            id: "operations",
            label: isAZ ? "Xidmət Keçidləri" : "Service Toggles",
            icon: Shield,
          },
          {
            id: "marketing",
            label: isAZ ? "Sosial Sübutlar" : "Social Proof",
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
        <ContactSettingsCard
          language={language}
          settingsDraft={settingsDraft}
          setSettingsDraft={setSettingsDraft}
        />
      )}

      {/* 2. Site-wide Announcement Banner */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "announcement") && (
        <AnnouncementSettingsCard
          language={language}
          settingsDraft={settingsDraft}
          setSettingsDraft={setSettingsDraft}
        />
      )}

      {/* 3. Pricing & Rates Configuration */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "pricing") && (
        <PricingSettingsCard
          language={language}
          settingsDraft={settingsDraft}
          setSettingsDraft={setSettingsDraft}
          handleSaveSettings={handleSaveSettings}
          settingsSaving={settingsSaving}
        />
      )}

      {/* 4. Operational Kill-Switches & Toggles */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "operations") && (
        <OperationsSettingsCard
          language={language}
          settingsDraft={settingsDraft}
          setSettingsDraft={setSettingsDraft}
        />
      )}

      {/* 5. Marketing & Social Proof */}
      {(settingsCategoryFilter === "all" || settingsCategoryFilter === "marketing") && (
        <MarketingSettingsCard
          language={language}
          settingsDraft={settingsDraft}
          setSettingsDraft={setSettingsDraft}
        />
      )}

      {/* Sticky Bottom Save Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 transition-all">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            {isAZ ? "Platform Tənzimləmələri İdarəsi" : "Platform Configuration Center"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetSettings}
            disabled={settingsSaving}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {isAZ ? "Sıfırla" : "Reset"}
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm transition-all"
          >
            <Save className={`h-3.5 w-3.5 ${settingsSaving ? "animate-spin" : ""}`} />
            <span>{settingsSaving ? (isAZ ? "Yadda saxlanılır..." : "Saving...") : (isAZ ? "Yadda Saxla" : "Save All Changes")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
