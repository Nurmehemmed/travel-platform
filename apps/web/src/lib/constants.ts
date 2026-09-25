import { CURRENT_BRAND } from "./brand";

/**
 * Centralized Contact & Company Information
 */
export const COMPANY_CONTACT = {
  name: CURRENT_BRAND.name,
  whatsappPhone: "+994 55 100 31 46",
  whatsappNumberClean: "994551003146",
  whatsappUrl: "https://wa.me/994551003146",
  city: "Baku",
  country: "Azerbaijan",
} as const;

export const WHATSAPP_PHONE = COMPANY_CONTACT.whatsappPhone;
export const WHATSAPP_NUMBER_CLEAN = COMPANY_CONTACT.whatsappNumberClean;
export const WHATSAPP_URL = COMPANY_CONTACT.whatsappUrl;
