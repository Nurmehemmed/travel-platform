"use client";

import React from "react";
import { X, MapPin, Sparkles, RefreshCw, Check } from "lucide-react";
import { DestinationPreset, AZERBAIJAN_DESTINATION_PRESETS, AdminLanguage } from "../types";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationModalMode: "create" | "edit";
  language: AdminLanguage;
  adminT: any;
  destFormName: string;
  setDestFormName: (val: string) => void;
  destFormCountry: string;
  setDestFormCountry: (val: string) => void;
  destFormSlug: string;
  setDestFormSlug: (val: string) => void;
  destFormHeroImage: string;
  setDestFormHeroImage: (val: string) => void;
  destSaving: boolean;
  handleSaveDestination: (e: React.FormEvent) => void;
  handleSelectPresetDestination: (preset: DestinationPreset) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  destinationModalMode,
  language,
  adminT,
  destFormName,
  setDestFormName,
  destFormCountry,
  setDestFormCountry,
  destFormSlug,
  setDestFormSlug,
  destFormHeroImage,
  setDestFormHeroImage,
  destSaving,
  handleSaveDestination,
  handleSelectPresetDestination,
}) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-sky-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                    {destinationModalMode === "create"
                      ? language === "AZ"
                        ? "Yeni Region"
                        : "New Region"
                      : language === "AZ"
                      ? "Regionu Yenilə"
                      : "Update Region"}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
                    {destinationModalMode === "create"
                      ? language === "AZ"
                        ? "Yeni İstiqamət Əlavə Et"
                        : "Add New Destination"
                      : language === "AZ"
                      ? `İstiqamətə Düzəliş Et: ${destFormName}`
                      : `Edit Destination: ${destFormName}`}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Presets Picker */}
            <div className="space-y-2 bg-sky-50/50 p-3.5 rounded-2xl border border-sky-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  {language === "AZ"
                    ? "Azərbaycan Şablonları (1 Kliklə Doldur)"
                    : "Quick Azerbaijan Presets (1-Click Fill)"}
                </span>
                <span className="text-[10px] text-sky-600 font-medium">
                  {language === "AZ" ? "Avtomatik doldurmaq üçün klikləyin" : "Click to auto-fill"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {AZERBAIJAN_DESTINATION_PRESETS.map((p) => {
                  const isSelected = destFormName.toLowerCase() === p.name.toLowerCase();
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => handleSelectPresetDestination(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                          : "bg-white text-slate-700 border-sky-200 hover:border-sky-400 hover:bg-sky-100/50"
                      }`}
                    >
                      <span>🇦🇿</span>
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveDestination} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Destination Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "İstiqamət / Şəhər Adı *" : "Destination / City Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={destFormName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDestFormName(val);
                      if (
                        destinationModalMode === "create" &&
                        (!destFormSlug ||
                          destFormSlug ===
                            destFormName.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
                      ) {
                        setDestFormSlug(
                          val
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. Gobustan, Gabala, Sheki"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "Ölkə" : "Country"}
                  </label>
                  <input
                    type="text"
                    value={destFormCountry}
                    onChange={(e) => setDestFormCountry(e.target.value)}
                    placeholder="e.g. Azerbaijan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "URL Slug (Qısa yol)" : "URL Slug"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      /
                    </span>
                    <input
                      type="text"
                      value={destFormSlug}
                      onChange={(e) =>
                        setDestFormSlug(
                          e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "")
                        )
                      }
                      placeholder="e.g. gobustan"
                      className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {language === "AZ"
                      ? "Marşrut və tur filtr etiketləri üçün istifadə olunur."
                      : "Used for routing and tour filtering tags."}
                  </span>
                </div>

                {/* Hero Image URL */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === "AZ" ? "Əsas Qapaq Şəkli URL" : "Featured Hero Image URL"}
                  </label>
                  <input
                    type="url"
                    value={destFormHeroImage}
                    onChange={(e) => setDestFormHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0f3460] focus:ring-1 focus:ring-[#0f3460]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {language === "AZ"
                      ? "Yüksək keyfiyyətli üfüqi foto (16:9 və ya 4:3)."
                      : "High quality landscape orientation photo (16:9 or 4:3)."}
                  </span>
                </div>
              </div>

              {/* Live Preview Card */}
              {destFormHeroImage && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    {language === "AZ" ? "Şəkil Ön Baxışı" : "Live Image Preview"}
                  </span>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <img
                      src={destFormHeroImage}
                      alt="Destination Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white">
                        /{destFormSlug || "slug"}
                      </span>
                      <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                        🇦🇿 {destFormCountry || (language === "AZ" ? "Azərbaycan" : "Azerbaijan")}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 text-white">
                      <p className="font-bold text-lg font-display drop-shadow-md">
                        {destFormName ||
                          (language === "AZ" ? "İstiqamət Ön Baxışı" : "Destination Preview")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {adminT.actions.cancel}
                </button>
                <button
                  type="submit"
                  disabled={destSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: "#0f3460" }}
                >
                  {destSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-amber-400" />
                      <span>
                        {language === "AZ"
                          ? "İstiqamət Saxlanılır..."
                          : "Saving Destination..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-amber-400" />
                      <span>
                        {destinationModalMode === "create"
                          ? language === "AZ"
                            ? "İstiqamət Yarat"
                            : "Create Destination"
                          : language === "AZ"
                          ? "Dəyişiklikləri Saxla"
                          : "Save Changes"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};
