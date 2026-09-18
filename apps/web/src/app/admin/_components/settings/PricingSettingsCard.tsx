"use client";

import React from "react";
import { DollarSign, ShieldCheck, Car, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  const isAZ = language === "AZ";

  const vehicles = [
    {
      id: "sedan",
      keyActive: "operations_vehicle_sedan_active",
      keyBase: "pricing_transfer_sedan",
      keyPerKm: "pricing_transfer_per_km_sedan",
      name: isAZ ? "Sedan (Ekonom)" : "Sedan (Economy)",
      icon: "🚗",
      defaultActive: true,
      defaultBase: 25,
      defaultPerKm: 0.45,
      pax: "1–3",
      bags: "2",
      badgeColor: "sky",
    },
    {
      id: "suv",
      keyActive: "operations_vehicle_suv_active",
      keyBase: "pricing_transfer_suv",
      keyPerKm: "pricing_transfer_per_km_suv",
      name: isAZ ? "SUV / Krossover" : "SUV / Crossover",
      icon: "🚙",
      defaultActive: true,
      defaultBase: 40,
      defaultPerKm: 0.60,
      pax: "1–4",
      bags: "4",
      badgeColor: "indigo",
    },
    {
      id: "minivan",
      keyActive: "operations_vehicle_minivan_active",
      keyBase: "pricing_transfer_minivan",
      keyPerKm: "pricing_transfer_per_km_minivan",
      name: isAZ ? "Minivan (Mercedes Vito)" : "Minivan (Mercedes Vito)",
      icon: "🚐",
      defaultActive: true,
      defaultBase: 40,
      defaultPerKm: 0.75,
      pax: "4–7",
      bags: "6",
      badgeColor: "purple",
    },
    {
      id: "sprinter",
      keyActive: "operations_vehicle_sprinter_active",
      keyBase: "pricing_transfer_sprinter",
      keyPerKm: "pricing_transfer_per_km_sprinter",
      name: isAZ ? "Mikroavtobus (Sprinter VIP)" : "Minibus (Sprinter VIP)",
      icon: "🚌",
      defaultActive: false,
      defaultBase: 65,
      defaultPerKm: 1.10,
      pax: "8–16",
      bags: "15",
      badgeColor: "amber",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-7">
      {/* ─── Header ─── */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald-600" />
          <span>
            {isAZ
              ? "e-Viza və Aeroport Transfer Qiymət və Nəqliyyat İdarəetməsi"
              : "e-Visa & Airport Transfer Fleet & Pricing Management"}
          </span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {isAZ
            ? "Müştəri tariflərini tənzimləyin və maşınların mövcudluğunu (aktiv/məşğul) bir toxunuşla idarə edin."
            : "Adjust customer tariffs and toggle vehicle availability (active/busy) with instant live reflection."}
        </p>
      </div>

      {/* ─── SECTION 1: e-Visa Pricing ─── */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <span>🛂</span>
          <span>{isAZ ? "Elektron Viza Tarifləri" : "Electronic Visa Pricing"}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
              {isAZ ? "Standart e-Viza (3 gün)" : "Standard eVisa (3d)"}
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
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAZ ? "Dövlət rüsumu daxildir ($26)" : "Includes govt fee ($26)"}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
              {isAZ ? "Təcili e-Viza (3 saat)" : "Urgent eVisa (3h)"}
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
                className="w-full rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <span className="text-[10px] text-amber-700 mt-1 block">
              {isAZ ? "Təcili rüsum daxildir ($61)" : "Includes urgent fee ($61)"}
            </span>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: Transfer Vehicle Fleet & Availability Cards ─── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Car className="h-4 w-4 text-sky-600" />
              <span>{isAZ ? "Nəqliyyat Parkı və Mövcudluq Vəziyyəti" : "Vehicle Fleet Availability & Pricing"}</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isAZ
                ? "Avtomobil məşğul olduqda və ya təmirə getdikdə söndürün. Söndürülmüş maşınlar müştəri səhifəsində gizlədilir."
                : "Disable any vehicle when busy, booked up, or in maintenance. Inactive vehicles are automatically hidden from customer bookings."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((v) => {
            const rawActive = settingsDraft[v.keyActive];
            const isActive = rawActive !== undefined ? Boolean(rawActive) : v.defaultActive;
            const baseVal = settingsDraft[v.keyBase] ?? v.defaultBase;
            const perKmVal = settingsDraft[v.keyPerKm] ?? v.defaultPerKm;

            return (
              <div
                key={v.id}
                className={`rounded-2xl border transition-all duration-200 p-4 flex flex-col justify-between ${
                  isActive
                    ? "border-slate-200 bg-white shadow-xs hover:border-slate-300"
                    : "border-amber-200/80 bg-amber-50/30 opacity-90"
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Title, Status & Toggle */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{v.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900">{v.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {v.pax} {isAZ ? "sərnişin" : "pax"} • {v.bags} {isAZ ? "çanta" : "bags"}
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              [v.keyActive]: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-2.5 mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          {isAZ ? "Aktiv & Rezervasiyaya Açıq" : "Active & Available"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          <AlertTriangle className="h-3 w-3 text-amber-600" />
                          {isAZ ? "Məşğul / Müvəqqəti Dayandırılıb" : "Disabled / Busy"}
                        </span>
                      )}
                    </div>
                    {!isActive && (
                      <span className="text-[10px] font-medium text-amber-700">
                        {isAZ ? "Saytda görünmür" : "Hidden from booking"}
                      </span>
                    )}
                  </div>

                  {/* Pricing Inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {isAZ ? "Baza Haqqı ($)" : "Base Fee ($)"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-bold text-xs">$</span>
                        <input
                          type="number"
                          value={baseVal}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              [v.keyBase]: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/50">
                      <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                        {isAZ ? "KM Tarifi ($/km)" : "Per-KM ($/km)"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sky-600 font-bold text-xs">$</span>
                        <input
                          type="number"
                          step="0.05"
                          value={perKmVal}
                          onChange={(e) =>
                            setSettingsDraft((prev) => ({
                              ...prev,
                              [v.keyPerKm]: Number(e.target.value),
                            }))
                          }
                          className="w-full rounded-lg border border-sky-300 bg-white px-2 py-1 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION 3: Round-Trip Discount & SLA Rules ─── */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>{isAZ ? "Endirim və Zəmanət Qaydaları (SLA)" : "Discounts & SLA Guarantee Parameters"}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {isAZ ? "Gediş-Dönüş Endirimi (%)" : "Round-Trip Discount (%)"}
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
                className="w-full rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
            <span className="text-[10px] text-emerald-700 mt-1 block">
              {isAZ ? "Hər iki istiqamətə tətbiq olunur" : "Applied to both legs"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-600 block mb-1">
              {isAZ ? "Pulsuz Ləğv (Saat)" : "Free Cancellation (h)"}
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
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAZ ? "100% qaytarılma (24 saat)" : "Full refund (24h)"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-600 block mb-1">
              {isAZ ? "Beynəlxalq Gözləmə (Dəq)" : "Intl Wait Time (Mins)"}
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
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAZ ? "Enişdən sonra (60 dəq)" : "Post-landing wait (60m)"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-600 block mb-1">
              {isAZ ? "Daxili/Otel Gözləmə (Dəq)" : "Domestic Wait (Mins)"}
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
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isAZ ? "Qarşılanma üçün (30 dəq)" : "Hotel pickup (30m)"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-600 block mb-1">
              {isAZ ? "Dispetçer Nömrəsi" : "Dispatch Hotline"}
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
              {isAZ ? "24/7 əməliyyat dəstəyi" : "24/7 flight coordination"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
