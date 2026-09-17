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
    transferMinivan: number;
    transferSprinter: number;
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
    transferMinivan: 40,
    transferSprinter: 65,
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
  const [settings, setSettings] = useState<PublicSettings>(DEFAULT_PUBLIC_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.warn("Could not load dynamic settings, using fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
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
