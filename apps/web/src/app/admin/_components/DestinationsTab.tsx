"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Compass,
  Sparkles,
  Search,
  X,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { DestinationItem, AdminLanguage } from "./types";

interface DestinationsTabProps {
  language: AdminLanguage;
  adminT: any;
  destinationsList: DestinationItem[];
  destSearchQuery: string;
  setDestSearchQuery: (q: string) => void;
  filteredDestinations: DestinationItem[];
  handleOpenCreateDestination: () => void;
  handleOpenEditDestination: (dest: DestinationItem) => void;
  handleDeleteDestination: (id: string, name: string) => void;
}

export const DestinationsTab: React.FC<DestinationsTabProps> = ({
  language,
  adminT,
  destinationsList,
  destSearchQuery,
  setDestSearchQuery,
  filteredDestinations,
  handleOpenCreateDestination,
  handleOpenEditDestination,
  handleDeleteDestination,
}) => {
  return (
    <div className="space-y-6">
      {/* Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {adminT.stats.totalDestinations}
            </span>
            <p className="text-2xl font-bold font-display text-slate-900 mt-1">
              {destinationsList.length}
            </p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {adminT.stats.catalogedRegions}
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <MapPin className="h-5 w-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
              {adminT.stats.azerbaijanRegions}
            </span>
            <p className="text-2xl font-bold font-display text-amber-600 mt-1">
              {
                destinationsList.filter((d) =>
                  d.country?.toLowerCase().includes("azerbaijan")
                ).length
              }
            </p>
            <span className="text-[11px] text-amber-600/70 mt-0.5 block">
              Baku, Sheki, Gobustan & more
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
            <Globe className="h-5 w-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
              {adminT.stats.linkedTours}
            </span>
            <p className="text-2xl font-bold font-display text-emerald-600 mt-1">
              {destinationsList.reduce((acc, d) => acc + (d.tourCount || 0), 0)}
            </p>
            <span className="text-[11px] text-emerald-600/70 mt-0.5 block">
              {adminT.stats.activeTourPackages}
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Compass className="h-5 w-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              {adminT.stats.topDestination}
            </span>
            <p className="text-lg font-bold font-display text-indigo-900 mt-1 truncate max-w-[150px]">
              {destinationsList.length > 0
                ? [...destinationsList].sort(
                    (a, b) => (b.tourCount || 0) - (a.tourCount || 0)
                  )[0]?.name || "Baku"
                : "None"}
            </p>
            <span className="text-[11px] text-indigo-600/70 mt-0.5 block">
              {destinationsList.length > 0
                ? `${
                    [...destinationsList].sort(
                      (a, b) => (b.tourCount || 0) - (a.tourCount || 0)
                    )[0]?.tourCount || 0
                  } active packages`
                : "0 packages"}
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search & Actions Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e0f2fe] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={destSearchQuery}
            onChange={(e) => setDestSearchQuery(e.target.value)}
            placeholder={adminT.destinationsTab.searchPlaceholder}
            className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0f3460] bg-slate-50 focus:bg-white transition-all"
          />
          {destSearchQuery && (
            <button
              onClick={() => setDestSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            {language === "AZ"
              ? `${destinationsList.length} istiqamətdən ${filteredDestinations.length}-i göstərilir`
              : `Showing ${filteredDestinations.length} of ${destinationsList.length} destinations`}
          </span>
          <button
            type="button"
            onClick={handleOpenCreateDestination}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: "#0f3460" }}
          >
            <Plus className="h-4 w-4 text-[#f59e0b]" />
            <span>{adminT.destinationsTab.addBtn}</span>
          </button>
        </div>
      </div>

      {/* Destination Cards Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-[#e0f2fe] text-center space-y-3">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-slate-800">
            {language === "AZ" ? "İstiqamət Tapılmadı" : "No Destinations Found"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {destSearchQuery
              ? language === "AZ"
                ? `"${destSearchQuery}" sorğusuna uyğun istiqamət tapılmadı.`
                : `No destinations matched "${destSearchQuery}". Try a different keyword.`
              : language === "AZ"
              ? "Hələ heç bir istiqamət yaradılmayıb."
              : "No destinations have been created yet. Click below to add your first destination."}
          </p>
          {destSearchQuery ? (
            <button
              onClick={() => setDestSearchQuery("")}
              className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {language === "AZ" ? "Axtarışı Təmizlə" : "Clear Search"}
            </button>
          ) : (
            <button
              onClick={handleOpenCreateDestination}
              className="px-4 py-2 rounded-xl bg-[#0f3460] text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              {adminT.destinationsTab.addBtn}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((d) => (
            <div
              key={d.id}
              className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-[#e0f2fe] hover:border-sky-300"
            >
              {/* Image Header with Gradient Overlay */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                {d.heroImageUrl ? (
                  <img
                    src={d.heroImageUrl}
                    alt={d.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-slate-800 text-slate-500">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white/90 border border-white/15">
                    /{d.slug}
                  </span>
                  <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                    🇦🇿 {d.country}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl font-display leading-tight drop-shadow-md">
                    {d.name}
                  </h3>
                </div>
              </div>

              {/* Card Body & Action Controls */}
              <div className="p-4 bg-white space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200/80">
                    <Compass className="h-3.5 w-3.5 text-sky-600" />
                    {d.tourCount}{" "}
                    {language === "AZ"
                      ? "Aktiv Tur"
                      : d.tourCount === 1
                      ? "Active Tour"
                      : "Active Tours"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditDestination(d)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-sky-400 text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors shadow-xs cursor-pointer"
                      title={`${adminT.destinationsTab.editBtn} ${d.name}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDestination(d.id, d.name)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-red-400 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-xs cursor-pointer"
                      title={`${adminT.destinationsTab.deleteBtn} ${d.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      href={`/#destinations`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-amber-400 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors shadow-xs"
                      title={language === "AZ" ? "Saytda bax" : "View destination on live website"}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
