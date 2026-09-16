import React, { Suspense } from "react";
import { Metadata } from "next";
import VoucherClient from "./VoucherClient";

export const metadata: Metadata = {
  title: "VIP Travel Voucher & Booking Confirmation | AddmeTour",
  description: "Official travel confirmation voucher, itinerary breakdown, emergency concierge contacts, and QR validation for AddmeTour guests.",
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
