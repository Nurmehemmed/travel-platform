"use client";

import FloatingTravelServices from "@/components/FloatingTravelServices";
import FloatingCustomItinerary from "@/components/FloatingCustomItinerary";
import { CookieConsent } from "@/components/CookieConsent";

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

