"use client";

import { Search, Compass, Trash2 } from "lucide-react";
import type { TourItem } from "./types";

interface ToursTabProps {
  adminT: any;
  tours: TourItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleToggleTourActive: (id: string, current: boolean) => Promise<void>;
  handleDeleteTour: (id: string) => Promise<void>;
}

export function ToursTab({
  adminT,
  tours,
  searchQuery,
  setSearchQuery,
  handleToggleTourActive,
  handleDeleteTour,
}: ToursTabProps) {
  const filteredTours = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.overview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      style={{ borderColor: "#e0f2fe" }}
    >
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-base text-slate-900 font-display">
            {adminT.toursTab.title} ({tours.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {adminT.toursTab.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={adminT.toursTab.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0f3460]"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">{adminT.toursTab.colDetails}</th>
              <th className="px-6 py-3.5">{adminT.toursTab.colDestination}</th>
              <th className="px-6 py-3.5">{adminT.toursTab.colDuration}</th>
              <th className="px-6 py-3.5">{adminT.toursTab.colPricing}</th>
              <th className="px-6 py-3.5">{adminT.toursTab.colRating}</th>
              <th className="px-6 py-3.5">{adminT.toursTab.colVisibility}</th>
              <th className="px-6 py-3.5 text-right">{adminT.toursTab.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTours.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      {t.coverImageUrl ? (
                        <img
                          src={t.coverImageUrl}
                          alt={t.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/baku-old-city.jpg";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-200 text-slate-400">
                          <Compass className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="max-w-xs">
                      <p className="font-bold text-slate-900 leading-tight">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {t.overview}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: "#f0f9ff", color: "#0f3460" }}
                  >
                    {t.destinationName || "Azerbaijan"}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-600">
                  {t.durationDays} {t.durationDays > 1 ? adminT.toursTab.days : adminT.toursTab.daySingular}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">
                    ${parseFloat(t.promoPrice || t.basePrice).toFixed(2)}
                  </p>
                  {t.promoPrice && (
                    <p className="text-[10px] text-slate-400 line-through">
                      ${parseFloat(t.basePrice).toFixed(2)}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">★ {t.ratingAvg}</span>
                  <span className="text-slate-400 text-[10px] ml-1">
                    ({t.reviewCount})
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleTourActive(t.id, t.isActive)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      t.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        t.isActive ? "bg-emerald-600" : "bg-slate-400"
                      }`}
                    />
                    {t.isActive ? adminT.toursTab.active : adminT.toursTab.inactive}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDeleteTour(t.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title={adminT.toursTab.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
