"use client";

import React from "react";
import { Megaphone } from "lucide-react";
import { AdminLanguage } from "../types";

interface AnnouncementSettingsCardProps {
  language: AdminLanguage;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const AnnouncementSettingsCard: React.FC<AnnouncementSettingsCardProps> = ({
  language,
  settingsDraft,
  setSettingsDraft,
}) => {
  return (
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
  );
};
