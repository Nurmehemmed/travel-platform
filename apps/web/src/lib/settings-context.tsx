"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { COMPANY_CONTACT } from "./constants";

export interface PublicSettings {
  contact: {
    whatsappPhone: string;
    whatsappClean: string;
    whatsappUrl: string;
    emergencyPhone: string;
    supportEmail: string;
    officeAddress: string;
    telegramHandle: string;
  };
  announcement: {
    active: boolean;
    text: string;
    link: string;
    badge: string;
  };
  pricing: {
    visaStandard: number;
    visaUrgent: number;
    transferSedan: number;
    transferSuv: number;
    transferMinivan: number;
    transferSprinter: number;
    transferPerKmSedan: number;
    transferPerKmSuv: number;
    transferPerKmMinivan: number;
    transferPerKmSprinter: number;
    transferRoundTripDiscountPercent: number;
  };
  transferPolicy: {
    cancellationHours: number;
    waitTimeIntlMins: number;
    waitTimeDomMins: number;
    dispatchPhone: string;
    dispatchWhatsapp: string;
  };
  marketing: {
    tripadvisorRating: string;
    tripadvisorReviews: string;
  };
  operations: {
    floatingWhatsapp: boolean;
    floatingServices: boolean;
    floatingItinerary: boolean;
    visaServiceActive: boolean;
    transferServiceActive: boolean;
  };
}

export const DEFAULT_PUBLIC_SETTINGS: PublicSettings = {
  contact: {
    whatsappPhone: COMPANY_CONTACT.whatsappPhone,
    whatsappClean: COMPANY_CONTACT.whatsappNumberClean,
    whatsappUrl: COMPANY_CONTACT.whatsappUrl,
    emergencyPhone: COMPANY_CONTACT.whatsappPhone,
    supportEmail: "info@addmetour.com",
    officeAddress: "Nizami Street 48, Baku, Azerbaijan",
    telegramHandle: "addmetour",
  },
  announcement: {
    active: false,
    text: "",
    link: "/#tours",
    badge: "Special Offer",
  },
  pricing: {
    visaStandard: 45,
    visaUrgent: 85,
    transferSedan: 25,
    transferSuv: 40,
    transferMinivan: 40,
    transferSprinter: 65,
    transferPerKmSedan: 0.45,
    transferPerKmSuv: 0.60,
    transferPerKmMinivan: 0.75,
    transferPerKmSprinter: 1.10,
    transferRoundTripDiscountPercent: 10,
  },
  transferPolicy: {
    cancellationHours: 24,
    waitTimeIntlMins: 60,
    waitTimeDomMins: 30,
    dispatchPhone: "+994 12 404 78 88",
    dispatchWhatsapp: "+994 12 404 78 88",
  },
  marketing: {
    tripadvisorRating: "4.9",
    tripadvisorReviews: "2,400+",
  },
  operations: {
    floatingWhatsapp: true,
    floatingServices: true,
    floatingItinerary: true,
    visaServiceActive: true,
    transferServiceActive: true,
  },
};

export const DEFAULT_SETTINGS_MAP: Record<string, any> = {
  contact_whatsapp: COMPANY_CONTACT.whatsappPhone,
  contact_phone: COMPANY_CONTACT.whatsappPhone,
  contact_email: "info@addmetour.com",
  contact_telegram: "addmetour",
  contact_address: "Nizami Street 48, Baku, Azerbaijan",
  announcement_active: false,
  announcement_text: "",
  announcement_badge: "Limited Offer",
  announcement_link: "/#tours",
  pricing_visa_standard: 45,
  pricing_visa_urgent: 85,
  pricing_transfer_sedan: 25,
  pricing_transfer_suv: 40,
  pricing_transfer_minivan: 40,
  pricing_transfer_sprinter: 65,
  pricing_transfer_per_km_sedan: 0.45,
  pricing_transfer_per_km_suv: 0.60,
  pricing_transfer_per_km_minivan: 0.75,
  pricing_transfer_per_km_sprinter: 1.10,
  pricing_transfer_roundtrip_discount: 10,
  transfer_cancellation_hours: 24,
  transfer_wait_time_intl_mins: 60,
  transfer_wait_time_dom_mins: 30,
  transfer_dispatch_phone: "+994 12 404 78 88",
  transfer_dispatch_whatsapp: "+994 12 404 78 88",
  marketing_tripadvisor_rating: "4.9",
  marketing_tripadvisor_reviews: "2,400+",
  operations_floating_whatsapp: true,
  operations_floating_services: true,
  operations_floating_itinerary: true,
  operations_visa_service: true,
  operations_transfer_service: true,
};

const SETTINGS_CACHE_KEY = "addmetour_site_settings_cache";
const SETTINGS_BROADCAST_CHANNEL = "addmetour_settings_channel";

export function broadcastSettingsUpdate(newSettings: PublicSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(newSettings));
    window.dispatchEvent(new CustomEvent("addmetour:settings_updated", { detail: newSettings }));
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(SETTINGS_BROADCAST_CHANNEL);
      channel.postMessage(newSettings);
      channel.close();
    }
  } catch {}
}

interface SettingsContextType {
  settings: PublicSettings;
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_PUBLIC_SETTINGS,
  refreshSettings: async () => {},
  loading: false,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {}
    }
    return DEFAULT_PUBLIC_SETTINGS;
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(data));
          } catch {}
        }
      }
    } catch (err) {
      console.warn("Could not load dynamic settings, using fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Listen for cross-tab or in-app settings updates
    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PublicSettings>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
        setLoading(false);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SETTINGS_CACHE_KEY && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
          setLoading(false);
        } catch {}
      }
    };

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      bc = new BroadcastChannel(SETTINGS_BROADCAST_CHANNEL);
      bc.onmessage = (event) => {
        if (event.data) {
          setSettings(event.data);
          setLoading(false);
        }
      };
    }

    window.addEventListener("addmetour:settings_updated", handleCustomUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("addmetour:settings_updated", handleCustomUpdate);
      window.removeEventListener("storage", handleStorageChange);
      if (bc) {
        bc.close();
      }
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings: fetchSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SettingsContext);
  return context;
}
