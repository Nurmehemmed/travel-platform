"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { AdminLanguage } from "../types";

interface ContactSettingsCardProps {
  language: AdminLanguage;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const ContactSettingsCard: React.FC<ContactSettingsCardProps> = ({
  language,
  settingsDraft,
  setSettingsDraft,
}) => {
  return (
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
                placeholder="info@bakuya.com"
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
                placeholder="bakuya"
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
  );
};
