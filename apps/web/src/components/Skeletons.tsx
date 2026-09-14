import React from "react";

/**
 * Reusable, responsive shimmer skeleton components for waiting services & async queries
 */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-700/50 ${className}`}
    />
  );
}

/**
 * Skeleton for Stats / KPI Cards in Admin Portal
 */
export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs animate-pulse"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-24 bg-slate-200 rounded-md" />
            <div className="h-7 w-7 rounded-xl bg-slate-100" />
          </div>
          <div className="h-8 w-20 bg-slate-200 rounded-lg mb-2" />
          <div className="h-2.5 w-32 bg-slate-100 rounded-md" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for Admin Data Tables (Transfers, Visas, Tours, Bookings, Users)
 */
export function TableSkeleton({
  rows = 5,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
      {/* Table Header Placeholder */}
      <div className="bg-slate-50/90 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4 animate-pulse">
        <div className="h-3 w-32 bg-slate-200 rounded-md" />
        <div className="h-3 w-24 bg-slate-200 rounded-md hidden sm:block" />
        <div className="h-3 w-28 bg-slate-200 rounded-md hidden md:block" />
        <div className="h-3 w-20 bg-slate-200 rounded-md" />
      </div>

      {/* Table Rows Placeholder */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="px-5 py-4 flex items-center justify-between gap-4 animate-pulse"
          >
            <div className="space-y-2 flex-1">
              <div
                className="h-3.5 bg-slate-200 rounded-md"
                style={{ width: `${60 + (idx % 3) * 15}%` }}
              />
              <div
                className="h-2.5 bg-slate-100 rounded-md"
                style={{ width: `${40 + (idx % 2) * 20}%` }}
              />
            </div>
            <div className="h-6 w-20 rounded-full bg-slate-100 hidden sm:block shrink-0" />
            <div className="h-7 w-24 rounded-xl bg-slate-200 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Airport Transfer Tracking Card (/transfer/track)
 */
export function TransferBookingSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-md border border-sky-100 overflow-hidden p-6 sm:p-8 space-y-6 animate-pulse">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="space-y-2">
          <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
          <div className="h-7 w-36 bg-slate-300 rounded-lg font-mono" />
        </div>
        <div className="h-8 w-28 rounded-full bg-slate-200" />
      </div>

      {/* Chauffeur Card Placeholder */}
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded-md" />
        <div className="h-4 w-48 bg-slate-300 rounded-md" />
      </div>

      {/* Flight & Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-3.5 rounded-xl border border-slate-100 space-y-2">
            <div className="h-2.5 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-36 bg-slate-300 rounded-md" />
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <div className="h-3 w-28 bg-slate-200 rounded-md" />
        <div className="h-6 w-24 bg-slate-300 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Visa Application Tracking Card (/visa/track)
 */
export function VisaTrackingSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-slate-200 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-2">
          <div className="h-2.5 w-32 bg-slate-200 rounded-md" />
          <div className="h-6 w-40 bg-slate-300 rounded-md" />
        </div>
        <div className="h-8 w-36 rounded-full bg-slate-200" />
      </div>

      {/* Step Tracker Placeholder */}
      <div className="grid grid-cols-3 gap-2 py-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 text-center">
            <div className="h-8 w-8 mx-auto rounded-full bg-slate-200" />
            <div className="h-2.5 w-16 mx-auto bg-slate-100 rounded-md" />
          </div>
        ))}
      </div>

      {/* Applicant Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-32 bg-slate-300 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Landing Page Tour Cards
 */
export function TourCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl bg-white border border-slate-100 shadow-md overflow-hidden animate-pulse flex flex-col"
        >
          {/* Cover Image Placeholder */}
          <div className="h-56 w-full bg-slate-200 relative">
            <div className="absolute top-4 left-4 h-6 w-24 rounded-full bg-slate-300" />
            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-300" />
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 rounded-full bg-slate-100" />
                <div className="h-4 w-16 rounded-full bg-slate-100" />
              </div>
              <div className="h-5 w-4/5 bg-slate-300 rounded-md" />
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-slate-100 rounded-md" />
                <div className="h-3 w-3/4 bg-slate-100 rounded-md" />
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-2.5 w-12 bg-slate-200 rounded-md" />
                <div className="h-6 w-16 bg-slate-300 rounded-md" />
              </div>
              <div className="h-10 w-28 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
