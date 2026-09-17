"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  FileText,
  Car,
  Users,
  MapPin,
  ScrollText,
  Sliders,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import type { TabType, AdminStats, TourItem, VisaItem, TransferItem, UserItem, DestinationItem, AuditLogItem } from "./types";

interface AdminSidebarProps {
  adminT: any;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  setSearchQuery: (query: string) => void;
  stats: AdminStats;
  tours: TourItem[];
  visasList: VisaItem[];
  transfersList: TransferItem[];
  usersList: UserItem[];
  destinationsList: DestinationItem[];
  auditLogs: AuditLogItem[];
  handleLogout: () => Promise<void>;
}

export function AdminSidebar({
  adminT,
  activeTab,
  setActiveTab,
  setSearchQuery,
  stats,
  tours,
  visasList,
  transfersList,
  usersList,
  destinationsList,
  auditLogs,
  handleLogout,
}: AdminSidebarProps) {
  const tabs = [
    { id: "overview", label: adminT.sidebar.overview, icon: LayoutDashboard },
    { id: "tours", label: adminT.sidebar.tours, icon: Compass, count: tours.length },
    {
      id: "bookings",
      label: adminT.sidebar.bookings,
      icon: CalendarCheck,
      badge: stats.pendingBookings > 0 ? `${stats.pendingBookings} ${adminT.sidebar.newBadge}` : undefined,
    },
    {
      id: "visas",
      label: adminT.sidebar.visas,
      icon: FileText,
      badge:
        visasList.filter((v) => v.status === "received").length > 0
          ? `${visasList.filter((v) => v.status === "received").length} ${adminT.sidebar.newBadge}`
          : undefined,
      count: visasList.length,
    },
    {
      id: "transfers",
      label: adminT.sidebar.transfers,
      icon: Car,
      badge:
        transfersList.filter((t) => t.status === "pending").length > 0
          ? `${transfersList.filter((t) => t.status === "pending").length} ${adminT.sidebar.newBadge}`
          : undefined,
      count: transfersList.length,
    },
    { id: "users", label: adminT.sidebar.users, icon: Users, count: usersList.length },
    { id: "destinations", label: adminT.sidebar.destinations, icon: MapPin, count: destinationsList.length },
    { id: "audit", label: adminT.sidebar.audit, icon: ScrollText, count: auditLogs.length > 0 ? auditLogs.length : undefined },
    { id: "settings", label: adminT.sidebar.settings, icon: Sliders },
  ];

  return (
    <aside
      className="w-full md:w-64 shrink-0 flex flex-col justify-between border-r shadow-sm md:min-h-screen"
      style={{ backgroundColor: "#0f3460", borderColor: "rgba(14, 165, 233, 0.2)" }}
    >
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full shadow-md shrink-0"
              style={{ backgroundColor: "#f59e0b" }}
            >
              <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="truncate">
              <span className="font-bold text-lg tracking-tight block text-[#f59e0b] leading-tight">
                addmetour
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                {adminT.sidebar.brandSubtitle}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links — Horizontal scrollable pill bar on mobile, vertical sidebar on desktop */}
        <nav className="p-2 sm:p-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 md:gap-0 md:space-y-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  setSearchQuery("");
                }}
                className={`flex items-center justify-between gap-2 px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 md:shrink md:w-full ${
                  isActive
                    ? "text-slate-900 shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={isActive ? { backgroundColor: "#f59e0b" } : {}}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-slate-900" : "text-[#f59e0b]"}`} />
                  <span>{tab.label}</span>
                </div>

                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-amber-500 text-slate-900">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && !tab.badge && (
                  <span className="text-[10px] md:text-[11px] text-white/40 font-normal">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Back to Site */}
      <div className="hidden md:block p-4 border-t border-white/10 space-y-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: "#f59e0b" }}
          >
            ADM
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">{adminT.sidebar.adminTeam}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              {adminT.sidebar.liveDb}
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {adminT.sidebar.backToSite}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-red-300 hover:text-white hover:bg-red-500/20 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          {adminT.sidebar.logout}
        </button>
      </div>
    </aside>
  );
}
