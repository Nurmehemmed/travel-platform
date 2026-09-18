"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { AdminLanguage } from "../types";

interface MarketingSettingsCardProps {
  language: AdminLanguage;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const MarketingSettingsCard: React.FC<MarketingSettingsCardProps> = ({
  language,
  settingsDraft,
  setSettingsDraft,
}) => {
  return (
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
  );
};
