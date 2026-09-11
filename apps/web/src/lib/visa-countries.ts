/**
 * Official Azerbaijan Visa Eligibility Dataset (ASAN Visa - evisa.gov.az)
 *
 * Categorizes world nations into:
 *  - "visa_free": Citizens can enter without a visa for 30-90 days.
 *  - "evisa_eligible": Eligible for ASAN electronic visa (Standard 3-day or Urgent 3-hour).
 *  - "embassy_required": Must apply in person at an Azerbaijani embassy/consulate.
 */

export interface CountryVisaInfo {
  code: string;
  name: string;
  category: "visa_free" | "evisa_eligible" | "embassy_required";
  stayDuration?: string;
  notes?: string;
}

export const COUNTRIES: CountryVisaInfo[] = [
  // ── Visa-Free Nations (Bilateral & Unilateral Treaties) ──────────────────────
  { code: "TR", name: "Turkey", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days. Turkish citizens can travel using either a valid passport or a biometric National ID card." },
  { code: "GE", name: "Georgia", category: "visa_free", stayDuration: "Up to 90 days", notes: "Bilateral visa-free entry for up to 90 days." },
  { code: "RU", name: "Russia", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days with Russian international passport." },
  { code: "KZ", name: "Kazakhstan", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "UZ", name: "Uzbekistan", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "BY", name: "Belarus", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "UA", name: "Ukraine", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "MD", name: "Moldova", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "TJ", name: "Tajikistan", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "KG", name: "Kyrgyzstan", category: "visa_free", stayDuration: "Up to 90 days", notes: "Visa-free entry for up to 90 days." },
  { code: "RS", name: "Serbia", category: "visa_free", stayDuration: "Up to 90 days", notes: "Bilateral mutual visa exemption agreement: up to 90 days within any 180-day period." },
  { code: "MA", name: "Morocco", category: "visa_free", stayDuration: "Up to 90 days", notes: "Bilateral visa-free agreement in force (as of August 28, 2024): up to 90 days within 180 days." },
  { code: "CN", name: "China", category: "visa_free", stayDuration: "Up to 30 days", notes: "Unilateral visa-free regime for citizens of PR China (ordinary passports): up to 30 days per entry, up to 3 times per calendar year." },
  { code: "AE", name: "United Arab Emirates", category: "visa_free", stayDuration: "Up to 30 days", notes: "Bilateral agreement: UAE citizens can enter visa-free for up to 30 days." },
  { code: "QA", name: "Qatar", category: "visa_free", stayDuration: "Up to 30 days", notes: "Bilateral agreement: Qatari citizens can enter visa-free for up to 30 days." },

  // ── Official ASAN Visa (e-Visa Eligible Nations - evisa.gov.az) ─────────────
  // North America & Caribbean
  { code: "US", name: "United States", category: "evisa_eligible" },
  { code: "CA", name: "Canada", category: "evisa_eligible" },
  { code: "MX", name: "Mexico", category: "evisa_eligible" },
  { code: "CR", name: "Costa Rica", category: "evisa_eligible" },
  { code: "CU", name: "Cuba", category: "evisa_eligible" },
  { code: "PA", name: "Panama", category: "evisa_eligible" },
  { code: "BS", name: "Bahamas", category: "evisa_eligible" },
  { code: "BB", name: "Barbados", category: "evisa_eligible" },
  { code: "JM", name: "Jamaica", category: "evisa_eligible" },
  { code: "TT", name: "Trinidad and Tobago", category: "evisa_eligible" },

  // South America
  { code: "BR", name: "Brazil", category: "evisa_eligible" },
  { code: "AR", name: "Argentina", category: "evisa_eligible" },
  { code: "CL", name: "Chile", category: "evisa_eligible" },
  { code: "CO", name: "Colombia", category: "evisa_eligible" },
  { code: "PE", name: "Peru", category: "evisa_eligible" },
  { code: "EC", name: "Ecuador", category: "evisa_eligible" },
  { code: "BO", name: "Bolivia", category: "evisa_eligible" },
  { code: "PY", name: "Paraguay", category: "evisa_eligible" },

  // European Union & Western Europe
  { code: "GB", name: "United Kingdom", category: "evisa_eligible" },
  { code: "DE", name: "Germany", category: "evisa_eligible" },
  { code: "FR", name: "France", category: "evisa_eligible" },
  { code: "IT", name: "Italy", category: "evisa_eligible" },
  { code: "ES", name: "Spain", category: "evisa_eligible" },
  { code: "NL", name: "Netherlands", category: "evisa_eligible" },
  { code: "CH", name: "Switzerland", category: "evisa_eligible" },
  { code: "SE", name: "Sweden", category: "evisa_eligible" },
  { code: "NO", name: "Norway", category: "evisa_eligible" },
  { code: "PL", name: "Poland", category: "evisa_eligible" },
  { code: "BE", name: "Belgium", category: "evisa_eligible" },
  { code: "AT", name: "Austria", category: "evisa_eligible" },
  { code: "DK", name: "Denmark", category: "evisa_eligible" },
  { code: "FI", name: "Finland", category: "evisa_eligible" },
  { code: "IE", name: "Ireland", category: "evisa_eligible" },
  { code: "PT", name: "Portugal", category: "evisa_eligible" },
  { code: "GR", name: "Greece", category: "evisa_eligible" },
  { code: "CZ", name: "Czech Republic", category: "evisa_eligible" },
  { code: "HU", name: "Hungary", category: "evisa_eligible" },
  { code: "RO", name: "Romania", category: "evisa_eligible" },
  { code: "BG", name: "Bulgaria", category: "evisa_eligible" },
  { code: "HR", name: "Croatia", category: "evisa_eligible" },
  { code: "SK", name: "Slovakia", category: "evisa_eligible" },
  { code: "SI", name: "Slovenia", category: "evisa_eligible" },
  { code: "LT", name: "Lithuania", category: "evisa_eligible" },
  { code: "LV", name: "Latvia", category: "evisa_eligible" },
  { code: "EE", name: "Estonia", category: "evisa_eligible" },
  { code: "CY", name: "Cyprus", category: "evisa_eligible" },
  { code: "MT", name: "Malta", category: "evisa_eligible" },
  { code: "LU", name: "Luxembourg", category: "evisa_eligible" },
  { code: "IS", name: "Iceland", category: "evisa_eligible" },
  { code: "MC", name: "Monaco", category: "evisa_eligible" },
  { code: "LI", name: "Liechtenstein", category: "evisa_eligible" },
  { code: "AD", name: "Andorra", category: "evisa_eligible" },
  { code: "SM", name: "San Marino", category: "evisa_eligible" },
  { code: "VA", name: "Vatican City", category: "evisa_eligible" },
  { code: "AL", name: "Albania", category: "evisa_eligible" },
  { code: "BA", name: "Bosnia and Herzegovina", category: "evisa_eligible" },
  { code: "ME", name: "Montenegro", category: "evisa_eligible" },
  { code: "MK", name: "North Macedonia", category: "evisa_eligible" },

  // Middle East & GCC
  { code: "SA", name: "Saudi Arabia", category: "evisa_eligible" },
  { code: "KW", name: "Kuwait", category: "evisa_eligible" },
  { code: "BH", name: "Bahrain", category: "evisa_eligible" },
  { code: "OM", name: "Oman", category: "evisa_eligible" },
  { code: "IL", name: "Israel", category: "evisa_eligible" },
  { code: "JO", name: "Jordan", category: "evisa_eligible" },
  { code: "LB", name: "Lebanon", category: "evisa_eligible" },
  { code: "IR", name: "Iran", category: "evisa_eligible" },

  // Asia & Oceania
  { code: "IN", name: "India", category: "evisa_eligible" },
  { code: "PK", name: "Pakistan", category: "evisa_eligible" },
  { code: "JP", name: "Japan", category: "evisa_eligible" },
  { code: "KR", name: "South Korea", category: "evisa_eligible" },
  { code: "SG", name: "Singapore", category: "evisa_eligible" },
  { code: "MY", name: "Malaysia", category: "evisa_eligible" },
  { code: "TH", name: "Thailand", category: "evisa_eligible" },
  { code: "ID", name: "Indonesia", category: "evisa_eligible" },
  { code: "VN", name: "Vietnam", category: "evisa_eligible" },
  { code: "PH", name: "Philippines", category: "evisa_eligible" },
  { code: "LK", name: "Sri Lanka", category: "evisa_eligible" },
  { code: "NP", name: "Nepal", category: "evisa_eligible" },
  { code: "MV", name: "Maldives", category: "evisa_eligible" },
  { code: "MN", name: "Mongolia", category: "evisa_eligible" },
  { code: "BN", name: "Brunei", category: "evisa_eligible" },
  { code: "AU", name: "Australia", category: "evisa_eligible" },
  { code: "NZ", name: "New Zealand", category: "evisa_eligible" },

  // Africa
  { code: "ZA", name: "South Africa", category: "evisa_eligible" },
  { code: "EG", name: "Egypt", category: "evisa_eligible" },
  { code: "DZ", name: "Algeria", category: "evisa_eligible" },
  { code: "TN", name: "Tunisia", category: "evisa_eligible" },
  { code: "MU", name: "Mauritius", category: "evisa_eligible" },
  { code: "SC", name: "Seychelles", category: "evisa_eligible" },
  { code: "DJ", name: "Djibouti", category: "evisa_eligible" },

  // ── Consular / Embassy Required Nations (Not eligible for ASAN e-Visa) ───────
  { code: "AF", name: "Afghanistan", category: "embassy_required" },
  { code: "BD", name: "Bangladesh", category: "embassy_required" },
  { code: "IQ", name: "Iraq", category: "embassy_required" },
  { code: "SY", name: "Syria", category: "embassy_required" },
  { code: "YE", name: "Yemen", category: "embassy_required" },
  { code: "NG", name: "Nigeria", category: "embassy_required" },
  { code: "GH", name: "Ghana", category: "embassy_required" },
  { code: "KE", name: "Kenya", category: "embassy_required" },
  { code: "ET", name: "Ethiopia", category: "embassy_required" },
  { code: "SO", name: "Somalia", category: "embassy_required" },
  { code: "SD", name: "Sudan", category: "embassy_required" },
  { code: "SS", name: "South Sudan", category: "embassy_required" },
  { code: "LY", name: "Libya", category: "embassy_required" },
  { code: "CM", name: "Cameroon", category: "embassy_required" },
  { code: "CD", name: "Congo (DRC)", category: "embassy_required" },
  { code: "CG", name: "Congo (Republic)", category: "embassy_required" },
  { code: "ZW", name: "Zimbabwe", category: "embassy_required" },
  { code: "UG", name: "Uganda", category: "embassy_required" },
  { code: "TZ", name: "Tanzania", category: "embassy_required" },
  { code: "MM", name: "Myanmar", category: "embassy_required" },
  { code: "KP", name: "North Korea", category: "embassy_required" },
];

/**
 * Find country by name or code.
 * Fail-safe architecture: If a country is not explicitly matched to visa_free or evisa_eligible,
 * it safely defaults to embassy_required. Under immigration law, nobody can ever be mistakenly
 * issued an e-Visa or told they are visa-free.
 */
export function getCountryEligibility(search: string): CountryVisaInfo {
  const q = search.trim().toLowerCase();
  const match = COUNTRIES.find(
    (c) => c.name.toLowerCase() === q || c.code.toLowerCase() === q
  );
  if (match) return match;

  // Strict fail-safe fallback: If unknown, embassy consular visa is legally required.
  return {
    code: "OTHER",
    name: search,
    category: "embassy_required",
    notes: "Citizens of this country must apply for a visa in person at an Embassy or Consulate of the Republic of Azerbaijan.",
  };
}

/**
 * Check if passport expiration date is valid for Azerbaijan entry:
 * The passport must be valid for at least 3 months (90 days) beyond the planned arrival date.
 */
export function validatePassportValidity(arrivalDateStr: string, expiryDateStr: string): { valid: boolean; message?: string } {
  if (!arrivalDateStr || !expiryDateStr) {
    return { valid: false, message: "Arrival date and passport expiry date are required." };
  }

  const arrival = new Date(arrivalDateStr);
  const expiry = new Date(expiryDateStr);

  if (isNaN(arrival.getTime()) || isNaN(expiry.getTime())) {
    return { valid: false, message: "Invalid date format." };
  }

  // Minimum required validity is 90 days after arrival
  const minRequiredExpiry = new Date(arrival);
  minRequiredExpiry.setDate(minRequiredExpiry.getDate() + 90);

  if (expiry < minRequiredExpiry) {
    return {
      valid: false,
      message: `Azerbaijan immigration requires your passport to be valid for at least 3 months (90 days) after your arrival date (${arrival.toLocaleDateString()}). Your passport expires on ${expiry.toLocaleDateString()}.`,
    };
  }

  return { valid: true };
}
