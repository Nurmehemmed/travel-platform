"use client";

import {
  DollarSign,
  TrendingUp,
  CalendarCheck,
  Clock,
  Compass,
} from "lucide-react";
import type { AdminStats, BookingItem, TourItem, TabType } from "./types";

interface OverviewTabProps {
  adminT: any;
  stats: AdminStats;
  tours: TourItem[];
  recentBookings: BookingItem[];
  setActiveTab: (tab: TabType) => void;
  handleUpdateBookingStatus: (bookingId: string, status: string) => Promise<void>;
}

export function OverviewTab({
  adminT,
  stats,
  tours,
  recentBookings,
  setActiveTab,
  handleUpdateBookingStatus,
}: OverviewTabProps) {
  return (
    <>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
          style={{ borderColor: "#e0f2fe" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {adminT.stats.totalRevenue}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              ${stats.totalRevenue.toFixed(2)}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {adminT.stats.allTimeGross}
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
          style={{ borderColor: "#e0f2fe" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {adminT.stats.totalBookings}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {stats.totalBookings}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">{adminT.stats.confirmedPending}</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
          style={{ borderColor: stats.pendingBookings > 0 ? "#f59e0b" : "#e0f2fe" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {adminT.stats.pendingBookings}
            </span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: stats.pendingBookings > 0 ? "#fef3c7" : "#f1f5f9" }}
            >
              <Clock
                className={`h-4 w-4 ${
                  stats.pendingBookings > 0 ? "text-amber-600" : "text-slate-400"
                }`}
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {stats.pendingBookings}
            </h3>
            <p
              className={`text-[11px] font-semibold mt-1 ${
                stats.pendingBookings > 0 ? "text-amber-600" : "text-slate-500"
              }`}
            >
              {stats.pendingBookings > 0 ? adminT.stats.needsReview : adminT.status.completed}
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
          style={{ borderColor: "#e0f2fe" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {adminT.stats.activeTours}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <Compass className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {stats.activeTours} / {tours.length}
            </h3>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">
              {adminT.stats.liveInCatalog}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Stream */}
      <div
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
        style={{ borderColor: "#e0f2fe" }}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-900 font-display">
              {adminT.overviewTab.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {adminT.overviewTab.subtitle}
            </p>
          </div>
          <button
            onClick={() => setActiveTab("bookings")}
            className="text-xs font-semibold text-[#f59e0b] hover:underline cursor-pointer"
          >
            {adminT.overviewTab.viewAll}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">{adminT.overviewTab.colCustomer}</th>
                <th className="px-6 py-3.5">{adminT.overviewTab.colTour}</th>
                <th className="px-6 py-3.5">{adminT.overviewTab.colGuests}</th>
                <th className="px-6 py-3.5">{adminT.overviewTab.colTotal}</th>
                <th className="px-6 py-3.5">{adminT.overviewTab.colStatus}</th>
                <th className="px-6 py-3.5 text-right">{adminT.overviewTab.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    {adminT.overviewTab.noBookings}
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{b.userName || adminT.overviewTab.guest}</p>
                      <p className="text-[11px] text-slate-500">{b.userEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-[220px] truncate">
                      {b.tourTitle || adminT.overviewTab.customTour}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {b.travelerCount} {b.travelerCount > 1 ? adminT.overviewTab.travelerPlural : adminT.overviewTab.travelerSingular}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ${parseFloat(b.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {adminT.status[b.status as keyof typeof adminT.status] || b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {b.status === "pending" ? (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          {adminT.overviewTab.confirm}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
