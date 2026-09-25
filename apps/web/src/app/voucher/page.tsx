import React, { Suspense } from "react";
import { Metadata } from "next";
import { CURRENT_BRAND } from "@/lib/brand";
import VoucherClient from "./VoucherClient";

export const metadata: Metadata = {
  title: `VIP Travel Voucher & Booking Confirmation | ${CURRENT_BRAND.name}`,
  description: `Official travel confirmation voucher, itinerary breakdown, emergency concierge contacts, and QR validation for ${CURRENT_BRAND.name} guests.`,
};

export default function VoucherPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900/5">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    }>
      <VoucherClient />
    </Suspense>
  );
}
