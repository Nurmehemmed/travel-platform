"use client";

import React from "react";
import { Shield, RefreshCw, Search, X, Eye } from "lucide-react";
import { AuditLogItem, AdminLanguage } from "./types";

interface AuditLogsTabProps {
  language: AdminLanguage;
  adminT: any;
  auditLogs: AuditLogItem[];
  auditEntityFilter: string;
  setAuditEntityFilter: (f: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedLogId: string | null;
  setExpandedLogId: (id: string | null) => void;
  fetchAllData: () => void;
  refreshing: boolean;
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({
  language,
  adminT,
  auditLogs,
  auditEntityFilter,
  setAuditEntityFilter,
  searchQuery,
  setSearchQuery,
  expandedLogId,
  setExpandedLogId,
  fetchAllData,
  refreshing,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Context Banner */}
      <div
        className="rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ backgroundColor: "#0f3460" }}
      >
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            <Shield className="h-4 w-4" />
            {language === "AZ"
              ? "Təhlükəsizlik və Uyğunluq Audit Jurnalı"
              : "Security & Compliance Audit Trail"}
          </div>
          <h2 className="text-xl font-bold font-display text-white">
            {language === "AZ"
              ? "Dəyişdirilməz Sistem Fəaliyyəti və Hadisə Girişləri"
              : "Immutable System Activity & Event Logs"}
          </h2>
          <p className="text-xs text-white/80 leading-relaxed">
            {language === "AZ"
              ? "Kritik əməliyyatların daimi qeydi: viza müraciətləri, dövlət sinxronizasiyası yeniləmələri, ödəniş təsdiqləri və admin girişləri. Bütün fərdi məlumatlar avtomatik gizlədilir."
              : "Permanent record of critical operations: visa submissions, government sync updates, payment confirmations, and admin logins. All customer PII is automatically redacted."}
          </p>
        </div>
        <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
          <button
            onClick={fetchAllData}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-[#f59e0b] ${
                refreshing ? "animate-spin" : ""
              }`}
            />
            {language === "AZ" ? "Jurnalları Yenilə" : "Refresh Logs"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === "AZ" ? "Cəmi Qeydə Alınmış Hadisələr" : "Total Logged Events"}
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
            {auditLogs.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {language === "AZ" ? "Neon DB-də Saxlanılır" : "Stored in Neon DB"}
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === "AZ" ? "e-Viza Əməliyyatları" : "e-Visa Actions"}
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
            {auditLogs.filter((l) => l.entityType === "visa").length}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">
            {language === "AZ"
              ? "Müraciətlər və Status Dəyişiklikləri"
              : "Submissions & Status Changes"}
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === "AZ" ? "Ödənişlər" : "Payments"}
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
            {auditLogs.filter((l) => l.entityType === "payment").length}
          </div>
          <div className="mt-1 text-[11px] text-blue-600 font-medium">
            {language === "AZ"
              ? "Ödəniş Sistemi Təsdiqləri"
              : "Gateway Confirmations"}
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white border border-[#e5ded4] shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {language === "AZ" ? "Giriş və Təhlükəsizlik" : "Auth & Security"}
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-display">
            {
              auditLogs.filter(
                (l) => l.entityType === "user" || l.action.startsWith("auth")
              ).length
            }
          </div>
          <div className="mt-1 text-[11px] text-amber-600 font-medium">
            {language === "AZ"
              ? "Admin və İstifadəçi Girişləri"
              : "Admin & User Logins"}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="rounded-2xl bg-white border border-[#e5ded4] p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Entity Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              {
                id: "all",
                label: language === "AZ" ? "Bütün Hadisələr" : "All Events",
              },
              { id: "visa", label: "e-Visa" },
              {
                id: "payment",
                label: language === "AZ" ? "Ödənişlər" : "Payments",
              },
              {
                id: "user",
                label: language === "AZ" ? "Giriş və İstifadəçilər" : "Auth & Users",
              },
              { id: "tour", label: language === "AZ" ? "Turlar" : "Tours" },
            ].map((btn) => {
              const isSel = auditEntityFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setAuditEntityFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSel
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={adminT.auditTab.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0f3460]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="py-3 px-4">
                  {language === "AZ" ? "Tarix və Saat (UTC)" : "Timestamp (UTC)"}
                </th>
                <th className="py-3 px-4">{adminT.auditTab.colAction}</th>
                <th className="py-3 px-4">{adminT.auditTab.colEntity}</th>
                <th className="py-3 px-4">{adminT.auditTab.colActor}</th>
                <th className="py-3 px-4">{adminT.auditTab.colIp}</th>
                <th className="py-3 px-4 text-right">
                  {language === "AZ" ? "Detallar" : "Details"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {auditLogs
                .filter((log) => {
                  if (
                    auditEntityFilter !== "all" &&
                    log.entityType !== auditEntityFilter
                  ) {
                    return false;
                  }
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    log.action.toLowerCase().includes(q) ||
                    log.entityType.toLowerCase().includes(q) ||
                    (log.entityId && log.entityId.toLowerCase().includes(q)) ||
                    (log.actorEmail && log.actorEmail.toLowerCase().includes(q)) ||
                    (log.ipAddress && log.ipAddress.toLowerCase().includes(q))
                  );
                })
                .map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  const actionBadgeClass =
                    log.action.includes("failed") || log.action.includes("rejected")
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : log.action.includes("approved") ||
                        log.action.includes("confirmed") ||
                        log.action.includes("success")
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : log.action.includes("status_changed") ||
                        log.action.includes("updated")
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200";

                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50/75 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                          {new Date(log.createdAt).toLocaleString(
                            language === "AZ" ? "az-AZ" : "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${actionBadgeClass}`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 capitalize">
                            {log.entityType}
                          </div>
                          {log.entityId && (
                            <div className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">
                              {log.entityId}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-700 mr-1.5">
                            {log.actorRole || log.actorType || "system"}
                          </span>
                          <span className="text-slate-700 text-xs">
                            {log.actorEmail ||
                              (language === "AZ"
                                ? "Anonim / Sistem"
                                : "Anonymous / System")}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {log.ipAddress || log.metadata?.ipAddress || "—"}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() =>
                              setExpandedLogId(isExpanded ? null : log.id)
                            }
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Eye className="h-3 w-3 text-slate-400" />
                            {isExpanded
                              ? language === "AZ"
                                ? "Gizlə"
                                : "Hide"
                              : language === "AZ"
                              ? "Bax"
                              : "Inspect"}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-slate-900 text-slate-200">
                          <td colSpan={6} className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                                <span className="font-mono">Log ID: {log.id}</span>
                                <span className="text-amber-400 font-medium">
                                  {language === "AZ"
                                    ? "Gizlədilmiş Fərdi Məlumatlar"
                                    : "PII-Redacted Payload"}
                                </span>
                              </div>
                              <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-emerald-300">
                                {JSON.stringify(log.metadata || {}, null, 2)}
                              </pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>

          {auditLogs.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-500">
              {language === "AZ"
                ? "Hələ heç bir audit hadisəsi qeydə alınmayıb. Viza və ya digər əməliyyatları icra etdikdə audit qeydləri burada görünəcək."
                : "No audit events recorded yet. Perform actions like submitting or processing visas to see audit trails here."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
