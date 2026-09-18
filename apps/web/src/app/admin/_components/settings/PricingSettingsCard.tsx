"use client";

import React from "react";
import { DollarSign } from "lucide-react";
import { AdminLanguage } from "../types";

interface PricingSettingsCardProps {
  language: AdminLanguage;
  settingsDraft: Record<string, any>;
  setSettingsDraft: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const PricingSettingsCard: React.FC<PricingSettingsCardProps> = ({
  language,
  settingsDraft,
  setSettingsDraft,
}) => {
  return (
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
  );
};
