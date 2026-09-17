"use client";

import dynamic from "next/dynamic";
import { useSiteSettings } from "@/lib/settings-context";

const FloatingTravelServices = dynamic(
  () => import("@/components/FloatingTravelServices"),
  { ssr: false }
);

const FloatingCustomItinerary = dynamic(
  () => import("@/components/FloatingCustomItinerary"),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((mod) => mod.CookieConsent),
  { ssr: false }
);

export function FloatingWidgetsContainer() {
  const { loading } = useSiteSettings();

  return (
    <>
      {!loading && (
        <>
          <FloatingCustomItinerary />
          <FloatingTravelServices />
        </>
      )}
      <CookieConsent />
    </>
  );
}

export default FloatingWidgetsContainer;

