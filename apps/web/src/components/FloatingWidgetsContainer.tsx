"use client";

import dynamic from "next/dynamic";

const FloatingTravelServices = dynamic(() => import("@/components/FloatingTravelServices"), { ssr: false });
const FloatingCustomItinerary = dynamic(() => import("@/components/FloatingCustomItinerary"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent").then(m => ({ default: m.CookieConsent })), { ssr: false });

export function FloatingWidgetsContainer() {
  return (
    <>
      <FloatingCustomItinerary />
      <FloatingTravelServices />
      <CookieConsent />
    </>
  );
}

export default FloatingWidgetsContainer;

