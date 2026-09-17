"use client";

import React from "react";
import { UserItem, AdminLanguage } from "./types";

interface UsersTabProps {
  language: AdminLanguage;
  adminT: any;
  usersList: UserItem[];
  handleUpdateUserRole: (id: string, role: string) => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  language,
  adminT,
  usersList,
  handleUpdateUserRole,
}) => {
  return (
    <div
      className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      style={{ borderColor: "#e0f2fe" }}
    >
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-base text-slate-900 font-display">
            {adminT.usersTab.title} ({usersList.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {adminT.usersTab.subtitle}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">{adminT.usersTab.colUser}</th>
              <th className="px-6 py-3.5">{adminT.common.email}</th>
              <th className="px-6 py-3.5">{adminT.usersTab.colRole}</th>
              <th className="px-6 py-3.5">
                {language === "AZ" ? "Sifariş Sayı" : "Bookings Placed"}
              </th>
              <th className="px-6 py-3.5">{adminT.usersTab.colCreated}</th>
              <th className="px-6 py-3.5 text-right">
                {language === "AZ" ? "Rol Təyin Et" : "Assign Role"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                      style={{
                        backgroundColor: u.role === "admin" ? "#0f3460" : "#f59e0b",
                      }}
                    >
                      {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-900">
                      {u.name || adminT.usersTab.userRole}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-mono text-[11px]">
                  {u.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-900"
                        : u.role === "agent"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {u.role === "admin"
                      ? adminT.usersTab.adminRole
                      : u.role === "agent"
                      ? adminT.usersTab.staffRole
                      : adminT.usersTab.userRole}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {u.bookingCount || 0}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <select
                    value={u.role}
                    onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 outline-none focus:border-[#0f3460] cursor-pointer"
                  >
                    <option value="customer">{adminT.usersTab.userRole}</option>
                    <option value="agent">{adminT.usersTab.staffRole}</option>
                    <option value="admin">{adminT.usersTab.adminRole}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usersList.length === 0 && (
          <div className="py-10 text-center text-xs text-slate-500">
            {language === "AZ" ? "İstifadəçi tapılmadı." : "No users found."}
          </div>
        )}
      </div>
    </div>
  );
};
