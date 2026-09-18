"use client";

import React from "react";
import { Shield } from "lucide-react";
import { AdminLanguage } from "../types";

interface OperationsSettingsCardProps {
  language: AdminLanguage;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const OperationsSettingsCard: React.FC<OperationsSettingsCardProps> = ({
  language,
  settingsDraft,
  setSettingsDraft,
}) => {
  return (
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
  );
};
