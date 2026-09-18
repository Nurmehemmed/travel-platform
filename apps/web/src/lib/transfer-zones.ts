/**
 * @file transfer-zones.ts
 * @description Airport transfer zone definitions, pricing engine, and booking reference generator.
 *
 * Pricing model: base_rate + (per_km_rate × distance)
 * Zones are preset per airport to avoid ambiguity for drivers and operations.
 */

// ─── Vehicle Class Config ─────────────────────────────────────────────────────

export type VehicleClass = "sedan" | "suv" | "minivan" | "economy" | "business" | "executive";

export interface VehicleConfig {
  id: VehicleClass;
  label: string;
  description: string;
  capacity: string;      // e.g. "1–3 passengers"
  maxPax: number;        // Maximum passenger count
  luggage: string;       // e.g. "2 large bags"
  maxLuggage: number;    // Maximum luggage pieces
  baseRate: number;      // USD — flat base regardless of distance
  perKmRate: number;     // USD per km
  icon: string;          // Emoji icon for UI
  features: string[];
}

export const VEHICLE_CLASSES: VehicleConfig[] = [
  {
    id: "sedan",
    label: "Sedan",
    description: "Comfortable, air-conditioned sedan. Perfect for solo travelers, couples, or small groups.",
    capacity: "1–3 passengers",
    maxPax: 3,
    luggage: "2 large bags",
    maxLuggage: 2,
    baseRate: 25,
    perKmRate: 0.45,
    icon: "🚗",
    features: ["Air conditioning", "Door-to-door service", "Flight monitoring", "Bottled water"],
  },
  {
    id: "suv",
    label: "SUV",
    description: "Spacious crossover / SUV with high comfort, all-wheel drive, and extra luggage space.",
    capacity: "1–4 passengers",
    maxPax: 4,
    luggage: "4 large bags",
    maxLuggage: 4,
    baseRate: 40,
    perKmRate: 0.60,
    icon: "🚙",
    features: ["High clearance & AWD", "Extra luggage room", "Meet & Greet service", "Flight monitoring"],
  },
  {
    id: "minivan",
    label: "Minivan",
    description: "Spacious passenger van (e.g. Mercedes Vito, VW Transporter). Ideal for families and groups.",
    capacity: "4–7 passengers",
    maxPax: 7,
    luggage: "6 large bags",
    maxLuggage: 6,
    baseRate: 55,
    perKmRate: 0.75,
    icon: "🚐",
    features: ["Spacious 7-seater cabin", "Large luggage capacity", "Child seat on request", "Flight monitoring"],
  },
];

// ─── Airport Definitions ───────────────────────────────────────────────────────

export type AirportCode = "GYD" | "GJA" | "NAJ";

export interface AirportInfo {
  code: AirportCode;
  name: string;
  city: string;
  fullName: string;
}

export const AIRPORTS: AirportInfo[] = [
  {
    code: "GYD",
    name: "Heydar Aliyev International",
    city: "Baku",
    fullName: "Heydar Aliyev International Airport (GYD)",
  },
  {
    code: "GJA",
    name: "Ganja Airport",
    city: "Ganja",
    fullName: "Ganja Airport (GJA)",
  },
  {
    code: "NAJ",
    name: "Nakhchivan Airport",
    city: "Nakhchivan",
    fullName: "Nakhchivan Airport (NAJ)",
  },
];

// ─── Zone Definitions ─────────────────────────────────────────────────────────

export interface TransferZone {
  id: string;
  airport: AirportCode;
  name: string;           // Display name
  description: string;    // Address / area description
  distanceKm: number;     // One-way distance from airport
  isCustom?: boolean;     // true = admin quotes manually
}

export const TRANSFER_ZONES: TransferZone[] = [
  // ── GYD (Baku) ──────────────────────────────────────────────────────────────
  {
    id: "GYD-baku-center",
    airport: "GYD",
    name: "Baku City Center",
    description: "Old City, Fountain Square, Nizami Street, Boulevard",
    distanceKm: 30,
  },
  {
    id: "GYD-baku-bulvar",
    airport: "GYD",
    name: "Baku Boulevard / Caspian Waterfront",
    description: "Seaside National Park, Park Bulvar Mall, Marriott, Fairmont",
    distanceKm: 32,
  },
  {
    id: "GYD-sabail",
    airport: "GYD",
    name: "Sabail / Flame Towers Area",
    description: "Flame Towers, Sahil, Icheri Sheher, Highland Park",
    distanceKm: 28,
  },
  {
    id: "GYD-white-city",
    airport: "GYD",
    name: "Baku White City / Khatai",
    description: "Baku White City, Nobel Avenue, Port Baku",
    distanceKm: 22,
  },
  {
    id: "GYD-absheron",
    airport: "GYD",
    name: "Absheron (Novkhani, Pirallahi, Bilgah, Nardaran)",
    description: "Absheron district coastal and residential areas",
    distanceKm: 25,
  },
  {
    id: "GYD-sumqayit",
    airport: "GYD",
    name: "Sumqayit City",
    description: "Sumqayit city center and residential districts",
    distanceKm: 45,
  },
  {
    id: "GYD-khirdalan",
    airport: "GYD",
    name: "Khirdalan / Absheron Highway",
    description: "Khirdalan, Binagadi, Masazir",
    distanceKm: 20,
  },
  {
    id: "GYD-shahdag",
    airport: "GYD",
    name: "Shahdag Mountain Resort / Gusar",
    description: "Shahdag Ski Resort, Pik Palace, Park Chalet, Gusar",
    distanceKm: 215,
  },
  {
    id: "GYD-qabala",
    airport: "GYD",
    name: "Qabala (Gabala / Tufandag Resort)",
    description: "Qabala city, Tufandag Ski Resort, Nohur Lake, Chenot Palace",
    distanceKm: 240,
  },
  {
    id: "GYD-quba",
    airport: "GYD",
    name: "Quba / Shahdag Gateway",
    description: "Quba city, Quba Palace Hotel, Krasnaya Sloboda, Macara Lake",
    distanceKm: 180,
  },
  {
    id: "GYD-shamakhi",
    airport: "GYD",
    name: "Shamakhi / Sharadil Resort",
    description: "Shamakhi city, Shamakhi Palace Hotel, Juma Mosque, Lahij turn",
    distanceKm: 135,
  },
  {
    id: "GYD-sheki",
    airport: "GYD",
    name: "Sheki (Ancient Silk Road)",
    description: "Sheki Khan's Palace, Caravanserai, Marxal Resort & Spa",
    distanceKm: 310,
  },
  {
    id: "GYD-naftalan",
    airport: "GYD",
    name: "Naftalan Thermal Spa Resorts",
    description: "Chinar Hotel, Gashalti Health Hotel, Garabag Resort & Spa",
    distanceKm: 340,
  },
  {
    id: "GYD-lankaran",
    airport: "GYD",
    name: "Lankaran / Caspian South Coast",
    description: "Lankaran city, Lankaran Springs Wellness Resort, Lerik",
    distanceKm: 270,
  },
  {
    id: "GYD-custom",
    airport: "GYD",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },

  // ── GJA (Ganja) ─────────────────────────────────────────────────────────────
  {
    id: "GJA-ganja-center",
    airport: "GJA",
    name: "Ganja City Center",
    description: "Ganja downtown, hotels, and city center",
    distanceKm: 8,
  },
  {
    id: "GJA-goygol",
    airport: "GJA",
    name: "Goygol National Park & Lake",
    description: "Goygol Lake, Maralgol, and surrounding alpine lodges",
    distanceKm: 45,
  },
  {
    id: "GJA-naftalan",
    airport: "GJA",
    name: "Naftalan Sanatoriums (from Ganja)",
    description: "Chinar Hotel, Gashalti Health Hotel",
    distanceKm: 55,
  },
  {
    id: "GJA-custom",
    airport: "GJA",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },

  // ── NAJ (Nakhchivan) ────────────────────────────────────────────────────────
  {
    id: "NAJ-nakhchivan-center",
    airport: "NAJ",
    name: "Nakhchivan City Center",
    description: "Nakhchivan city, Tabriz Hotel, and central districts",
    distanceKm: 7,
  },
  {
    id: "NAJ-duzdag",
    airport: "NAJ",
    name: "Duzdag Physiotherapy & Salt Caves",
    description: "Duzdag Hotel and underground speleotherapy sanatorium",
    distanceKm: 18,
  },
  {
    id: "NAJ-custom",
    airport: "NAJ",
    name: "Custom Destination",
    description: "Enter your specific address — price will be confirmed by our team",
    distanceKm: 0,
    isCustom: true,
  },
];

// ─── Destination Location Categorized Registry ────────────────────────────────

export type DestinationCategory = "hotel" | "district" | "region" | "custom";

export interface DestinationLocation {
  id: string;
  name: string;
  category: DestinationCategory;
  zoneId: string;
  airport: AirportCode;
  distanceKm: number;
  address?: string;
  aliases?: string[];
  badge?: string;
}

export const POPULAR_DESTINATIONS: DestinationLocation[] = [
  // ── 🏨 HOTELS & RESORTS (Baku & Environs) ───────────────────────────────────
  {
    id: "loc-jw-marriott",
    name: "JW Marriott Absheron Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 30,
    address: "674 Azadliq Square, Baku",
    aliases: ["marriott", "absheron", "azadliq square", "port baku hotel"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-fairmont-flame",
    name: "Fairmont Baku (Flame Towers)",
    category: "hotel",
    zoneId: "GYD-sabail",
    airport: "GYD",
    distanceKm: 28,
    address: "1A Mehdi Huseyn Street, Flame Towers Complex",
    aliases: ["fairmont", "flame towers", "flame tower hotel", "sabail hotel", "highland park hotel"],
    badge: "5★ Luxury",
  },
  {
    id: "loc-four-seasons",
    name: "Four Seasons Hotel Baku",
    category: "hotel",
    zoneId: "GYD-baku-bulvar",
    airport: "GYD",
    distanceKm: 31,
    address: "1 Neftchilar Avenue, Seaside Boulevard",
    aliases: ["four seasons", "neftchilar", "boulevard hotel", "azneft"],
    badge: "5★ Ultra-Luxury",
  },
  {
    id: "loc-hilton-baku",
    name: "Hilton Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 30,
    address: "1B Azadliq Avenue, City Center",
    aliases: ["hilton", "360 bar", "park bulvar hilton", "azadliq ave"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-ritz-carlton",
    name: "The Ritz-Carlton, Baku",
    category: "hotel",
    zoneId: "GYD-white-city",
    airport: "GYD",
    distanceKm: 24,
    address: "3 Babek Avenue, Nasimi District",
    aliases: ["ritz carlton", "ritz", "babek avenue"],
    badge: "5★ Luxury",
  },
  {
    id: "loc-intercontinental",
    name: "InterContinental Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 30,
    address: "25 Zarifa Aliyeva Street, City Center",
    aliases: ["intercontinental", "ihg", "zarifa aliyeva"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-marriott-boulevard",
    name: "Baku Marriott Hotel Boulevard",
    category: "hotel",
    zoneId: "GYD-white-city",
    airport: "GYD",
    distanceKm: 23,
    address: "Khagani Rustamov Street 4C, White City",
    aliases: ["boulevard hotel", "marriott boulevard", "white city hotel", "autograph"],
    badge: "5★ Waterfront",
  },
  {
    id: "loc-intourist",
    name: "Intourist Hotel Baku (Autograph Collection)",
    category: "hotel",
    zoneId: "GYD-sabail",
    airport: "GYD",
    distanceKm: 31,
    address: "Mikayil Useynov Avenue 51, Bayil",
    aliases: ["intourist", "autograph", "bayil hotel", "flag square hotel"],
    badge: "5★ Boutique",
  },
  {
    id: "loc-dinamo",
    name: "Dinamo Hotel Baku (Small Luxury Hotels)",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 29,
    address: "32 Zarifa Aliyeva Street, F1 Paddock Area",
    aliases: ["dinamo", "slh", "formula 1 hotel", "f1 track hotel"],
    badge: "5★ Boutique",
  },
  {
    id: "loc-hyatt-regency",
    name: "Hyatt Regency Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 32,
    address: "1033 Izmir Street, Yasamal",
    aliases: ["hyatt", "hyatt regency", "izmir street", "yasamal"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-radisson",
    name: "Radisson Hotel Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 29,
    address: "34 Azadliq Avenue, City Center",
    aliases: ["radisson", "radisson blu", "park inn baku"],
    badge: "4★ Hotel",
  },
  {
    id: "loc-courtyard-marriott",
    name: "Courtyard by Marriott Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 28,
    address: "300-303 Fuzuli Street, Winter Park",
    aliases: ["courtyard", "fuzuli", "winter park courtyard", "marriott courtyard"],
    badge: "4★ Hotel",
  },
  {
    id: "loc-holiday-inn",
    name: "Holiday Inn Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 27,
    address: "Keykab Khanim Safaraliyeva Street 5, Port Baku Area",
    aliases: ["holiday inn", "port baku holiday inn", "ihg"],
    badge: "4★ Hotel",
  },
  {
    id: "loc-winter-park-hotel",
    name: "Winter Park Hotel Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 28,
    address: "29-30 Mirzagha Aliyev Street, Winter Park",
    aliases: ["winter park hotel", "winter park", "qish parki"],
    badge: "4★ Hotel",
  },
  {
    id: "loc-landmark-hotel",
    name: "The Landmark Hotel Baku",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 28,
    address: "90A Nizami Street, Landmark Complex",
    aliases: ["landmark", "nizami landmark", "landmark business center"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-shirvanshah-hotel",
    name: "Shirvanshah Hotel & Spa (Old City)",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 29,
    address: "Gesr Lane 26, Icherisheher",
    aliases: ["shirvanshah", "icherisheher hotel", "old city hotel"],
    badge: "Old City Boutique",
  },
  {
    id: "loc-shah-palace",
    name: "Shah Palace Luxury Museum Hotel",
    category: "hotel",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 29,
    address: "Gosha Gala Gapisi, Icherisheher",
    aliases: ["shah palace", "gosha gala", "double gates old city"],
    badge: "Historic 5★",
  },
  {
    id: "loc-flyinn-airport",
    name: "Fly-Inn Baku Airport Hotel",
    category: "hotel",
    zoneId: "GYD-absheron",
    airport: "GYD",
    distanceKm: 1,
    address: "Heydar Aliyev International Airport Complex",
    aliases: ["fly inn", "flyinn", "airport hotel", "sheraton airport"],
    badge: "Airport Hotel",
  },
  {
    id: "loc-sea-breeze",
    name: "Sea Breeze Resort & Residences (Nardaran)",
    category: "hotel",
    zoneId: "GYD-absheron",
    airport: "GYD",
    distanceKm: 25,
    address: "Nardaran Coast, Caspian Sea",
    aliases: ["sea breeze", "seabreeze", "nardaran", "eminaras", "shore house"],
    badge: "Coastal Resort",
  },
  {
    id: "loc-bilgah-beach-hotel",
    name: "Bilgah Beach Hotel (Caspian Resort)",
    category: "hotel",
    zoneId: "GYD-absheron",
    airport: "GYD",
    distanceKm: 22,
    address: "Gelebe Street 94, Bilgah",
    aliases: ["bilgah", "bilgah beach", "jumeirah bilgah", "bilgah resort"],
    badge: "5★ Beach Resort",
  },

  // ── 🏨 REGIONAL LUXURY RESORTS (Shahdag, Qabala, Quba, etc.) ──────────────────
  {
    id: "loc-pik-palace-shahdag",
    name: "Pik Palace, Autograph Collection (Shahdag)",
    category: "hotel",
    zoneId: "GYD-shahdag",
    airport: "GYD",
    distanceKm: 215,
    address: "Shahdag Mountain Resort Complex, Gusar",
    aliases: ["pik palace", "shahdag hotel", "shahdag resort", "autograph shahdag"],
    badge: "Ski Resort 5★",
  },
  {
    id: "loc-park-chalet-shahdag",
    name: "Park Chalet, Autograph Collection (Shahdag)",
    category: "hotel",
    zoneId: "GYD-shahdag",
    airport: "GYD",
    distanceKm: 215,
    address: "Shahdag Mountain Resort Complex, Gusar",
    aliases: ["park chalet", "chalet shahdag", "shahdag chalet"],
    badge: "Alpine 5★",
  },
  {
    id: "loc-zirve-shahdag",
    name: "Zirve Hotel Shahdag",
    category: "hotel",
    zoneId: "GYD-shahdag",
    airport: "GYD",
    distanceKm: 214,
    address: "Shahdag Ski Lift Base, Gusar",
    aliases: ["zirve hotel", "zirve shahdag", "ski base hotel"],
    badge: "Ski-in/Ski-out",
  },
  {
    id: "loc-qafqaz-tufandag",
    name: "Qafqaz Tufandag Mountain Resort Hotel (Qabala)",
    category: "hotel",
    zoneId: "GYD-qabala",
    airport: "GYD",
    distanceKm: 240,
    address: "Tufandag Ropeway Complex, Gabala",
    aliases: ["tufandag", "qafqaz tufandag", "tufandag hotel", "gabala ski resort"],
    badge: "Mountain Resort 5★",
  },
  {
    id: "loc-qafqaz-riverside",
    name: "Qafqaz Riverside Resort Hotel (Qabala)",
    category: "hotel",
    zoneId: "GYD-qabala",
    airport: "GYD",
    distanceKm: 238,
    address: "Demiraparan River Bank, Gabala",
    aliases: ["qafqaz riverside", "riverside gabala", "gabala hotel"],
    badge: "5★ Riverside Resort",
  },
  {
    id: "loc-chenot-palace",
    name: "Chenot Palace Health Wellness Hotel (Qabala)",
    category: "hotel",
    zoneId: "GYD-qabala",
    airport: "GYD",
    distanceKm: 242,
    address: "Nohur Lake Coast, Gabala",
    aliases: ["chenot palace", "chenot", "nohur lake chenot", "wellness gabala"],
    badge: "Medical Luxury",
  },
  {
    id: "loc-quba-palace",
    name: "Quba Palace Hotel & Golf Club",
    category: "hotel",
    zoneId: "GYD-quba",
    airport: "GYD",
    distanceKm: 180,
    address: "Eskikik Village, Quba",
    aliases: ["quba palace", "rixos quba", "quba golf", "guba palace"],
    badge: "5★ Golf Resort",
  },
  {
    id: "loc-shamakhi-palace",
    name: "Shamakhi Palace Sharadil",
    category: "hotel",
    zoneId: "GYD-shamakhi",
    airport: "GYD",
    distanceKm: 135,
    address: "Sharadil Village, Shamakhi Forest",
    aliases: ["shamakhi palace", "sharadil", "rixos shamakhi"],
    badge: "5★ Forest Resort",
  },
  {
    id: "loc-marxal-sheki",
    name: "Marxal Resort & Spa (Sheki)",
    category: "hotel",
    zoneId: "GYD-sheki",
    airport: "GYD",
    distanceKm: 310,
    address: "Kish Village Road, Sheki",
    aliases: ["marxal", "markhal", "sheki resort", "sheki spa"],
    badge: "5★ Resort",
  },
  {
    id: "loc-chinar-naftalan",
    name: "Chinar Hotel & Spa Naftalan",
    category: "hotel",
    zoneId: "GYD-naftalan",
    airport: "GYD",
    distanceKm: 340,
    address: "Heydar Aliyev Avenue, Naftalan",
    aliases: ["chinar", "naftalan chinar", "naftalan oil spa", "sanatorium naftalan"],
    badge: "Oil Spa Resort",
  },
  {
    id: "loc-lankaran-springs",
    name: "Lankaran Springs Wellness Resort",
    category: "hotel",
    zoneId: "GYD-lankaran",
    airport: "GYD",
    distanceKm: 270,
    address: "Haftoni Village, Lankaran",
    aliases: ["lankaran springs", "haftoni", "thermal springs lankaran"],
    badge: "Thermal Resort",
  },

  // ── 📍 DISTRICTS & ICONIC LANDMARKS (Baku) ──────────────────────────────────
  {
    id: "loc-fountain-square",
    name: "Fountain Square & Nizami Street",
    category: "district",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 30,
    address: "Nizami Pedestrian Street / Torgovaya",
    aliases: ["fountain square", "nizami", "torgovaya", "fountains", "center"],
    badge: "Downtown",
  },
  {
    id: "loc-old-city",
    name: "Old City (Icherisheher) & Maiden Tower",
    category: "district",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 29,
    address: "UNESCO World Heritage Fortress, Baku",
    aliases: ["old city", "icherisheher", "maiden tower", "qiz qalasi", "shirvanshahs palace"],
    badge: "UNESCO Heritage",
  },
  {
    id: "loc-baku-boulevard",
    name: "Baku Seaside Boulevard & Park Bulvar Mall",
    category: "district",
    zoneId: "GYD-baku-bulvar",
    airport: "GYD",
    distanceKm: 31,
    address: "Neftchilar Avenue / Caspian Promenade",
    aliases: ["boulevard", "bulvar", "park bulvar", "little venice", "deniz mall"],
    badge: "Waterfront",
  },
  {
    id: "loc-flame-towers-sabail",
    name: "Flame Towers & Highland Park Area",
    category: "district",
    zoneId: "GYD-sabail",
    airport: "GYD",
    distanceKm: 28,
    address: "Sabail District, Baku Viewpoint",
    aliases: ["flame towers", "highland park", "dagustu park", "funicular", "martyrs lane"],
    badge: "Landmark View",
  },
  {
    id: "loc-white-city-district",
    name: "Baku White City (Ag Sheher)",
    category: "district",
    zoneId: "GYD-white-city",
    airport: "GYD",
    distanceKm: 22,
    address: "Nobel Avenue / White City Boulevard",
    aliases: ["white city", "ag sheher", "aq seher", "paris houses baku", "fountain square white city"],
    badge: "Modern District",
  },
  {
    id: "loc-port-baku",
    name: "Port Baku Mall & Towers",
    category: "district",
    zoneId: "GYD-white-city",
    airport: "GYD",
    distanceKm: 25,
    address: "151 Neftchilar Avenue",
    aliases: ["port baku", "port baku mall", "port baku residences", "crescent mall"],
    badge: "Luxury Shopping",
  },
  {
    id: "loc-heydar-aliyev-center",
    name: "Heydar Aliyev Center (Zaha Hadid Landmark)",
    category: "district",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 24,
    address: "1 Heydar Aliyev Avenue, Narimanov",
    aliases: ["heydar aliyev center", "zaha hadid", "narimanov", "convention center"],
    badge: "Architectural Icon",
  },
  {
    id: "loc-olympic-stadium",
    name: "Baku Olympic Stadium & Boyukshor",
    category: "district",
    zoneId: "GYD-khirdalan",
    airport: "GYD",
    distanceKm: 16,
    address: "Heydar Aliyev Highway",
    aliases: ["olympic stadium", "olimpiya stadionu", "cop29 venue", "boyukshor"],
    badge: "Arena / Events",
  },
  {
    id: "loc-crystal-hall",
    name: "Baku Crystal Hall & National Flag Square",
    category: "district",
    zoneId: "GYD-sabail",
    airport: "GYD",
    distanceKm: 32,
    address: "Bayil Peninsula, Caspian Shore",
    aliases: ["crystal hall", "flag square", "bayraq meydani", "eurovision arena"],
    badge: "Concert Arena",
  },
  {
    id: "loc-mardakan-shuvalan",
    name: "Mardakan & Shuvalan Coastal District",
    category: "district",
    zoneId: "GYD-absheron",
    airport: "GYD",
    distanceKm: 14,
    address: "Absheron Peninsula East Coast",
    aliases: ["mardakan", "shuvalan", "quadrangular castle", "mardakan castle"],
    badge: "Caspian Coast",
  },
  {
    id: "loc-bilgah-beach-area",
    name: "Bilgah & Zagulba Beach Coast",
    category: "district",
    zoneId: "GYD-absheron",
    airport: "GYD",
    distanceKm: 22,
    address: "Bilgah / Zagulba Seaside",
    aliases: ["bilgah", "zagulba", "amburan", "bilgah coast"],
    badge: "Beach District",
  },

  // ── 🏔️ REGIONS & MOUNTAIN RESORTS (Caucasus Intercity) ───────────────────────
  {
    id: "loc-reg-shahdag",
    name: "Shahdag Mountain Resort & Gusar",
    category: "region",
    zoneId: "GYD-shahdag",
    airport: "GYD",
    distanceKm: 215,
    address: "Greater Caucasus Range, Gusar Region",
    aliases: ["shahdag", "gusar", "ski azerbaijan", "mount shahdag", "laza waterfall"],
    badge: "Ski & Alpine",
  },
  {
    id: "loc-reg-qabala",
    name: "Qabala (Gabala City & Tufandag Ski Resort)",
    category: "region",
    zoneId: "GYD-qabala",
    airport: "GYD",
    distanceKm: 240,
    address: "Gabala District, Caucasus Foothills",
    aliases: ["qabala", "gabala", "tufandag", "nohur lake", "yeddi gozel", "gabaland"],
    badge: "Nature & Adventure",
  },
  {
    id: "loc-reg-quba",
    name: "Quba & Khinalug Mountain Gateway",
    category: "region",
    zoneId: "GYD-quba",
    airport: "GYD",
    distanceKm: 180,
    address: "Quba District, Northern Azerbaijan",
    aliases: ["quba", "guba", "khinalug", "red village", "krasnaya sloboda", "gechrash"],
    badge: "Apples & Mountains",
  },
  {
    id: "loc-reg-shamakhi",
    name: "Shamakhi & Lahij Foothills",
    category: "region",
    zoneId: "GYD-shamakhi",
    airport: "GYD",
    distanceKm: 135,
    address: "Shamakhi District, Historic Wine Region",
    aliases: ["shamakhi", "samaxi", "lahij", "shamakhi observatory", "alpaca azerbaijan"],
    badge: "History & Wine",
  },
  {
    id: "loc-reg-sheki",
    name: "Sheki (UNESCO Silk Road Ancient City)",
    category: "region",
    zoneId: "GYD-sheki",
    airport: "GYD",
    distanceKm: 310,
    address: "Sheki Region, UNESCO World Heritage",
    aliases: ["sheki", "saki", "khans palace", "caravanserai", "kish albanian church"],
    badge: "Silk Road Heritage",
  },
  {
    id: "loc-reg-naftalan",
    name: "Naftalan Thermal Crude Oil Spa Sanatoriums",
    category: "region",
    zoneId: "GYD-naftalan",
    airport: "GYD",
    distanceKm: 340,
    address: "Naftalan City, Therapeutic Center",
    aliases: ["naftalan", "oil bath", "crude oil spa", "healing naftalan"],
    badge: "Health & Wellness",
  },
  {
    id: "loc-reg-lankaran",
    name: "Lankaran & Lerik Subtropical South",
    category: "region",
    zoneId: "GYD-lankaran",
    airport: "GYD",
    distanceKm: 270,
    address: "Lankaran Region, Talysh Mountains",
    aliases: ["lankaran", "lerik", "hirkan national park", "tea plantations"],
    badge: "Subtropical Coast",
  },
  {
    id: "loc-reg-sumqayit",
    name: "Sumqayit City",
    category: "region",
    zoneId: "GYD-sumqayit",
    airport: "GYD",
    distanceKm: 45,
    address: "Sumqayit City Center & Industrial Boulevard",
    aliases: ["sumqayit", "sumgayit", "sumqayit bulvar"],
    badge: "City",
  },
  {
    id: "loc-reg-gobustan",
    name: "Gobustan Rock Art & Mud Volcanoes",
    category: "region",
    zoneId: "GYD-baku-center",
    airport: "GYD",
    distanceKm: 70,
    address: "Gobustan National Historical-Artistic Reserve",
    aliases: ["gobustan", "qobustan", "mud volcanoes", "petroglyphs", "bibi heybat"],
    badge: "UNESCO World Heritage",
  },

  // ── ✍️ CUSTOM LOCATION FALLBACK ─────────────────────────────────────────────
  {
    id: "loc-custom-gyd",
    name: "Custom Private Address / Airbnb / Villa",
    category: "custom",
    zoneId: "GYD-custom",
    airport: "GYD",
    distanceKm: 0,
    address: "Enter your private hotel, apartment, or address during checkout",
    aliases: ["custom", "other", "address", "airbnb", "villa", "apartment"],
    badge: "Custom Quote",
  },

  // ── ✈️ GJA (Ganja Airport Locations) ────────────────────────────────────────
  {
    id: "loc-gja-ramada",
    name: "Ramada Plaza by Wyndham Ganja",
    category: "hotel",
    zoneId: "GJA-ganja-center",
    airport: "GJA",
    distanceKm: 8,
    address: "Nizami Ganjavi Avenue, Ganja",
    aliases: ["ramada ganja", "ramada plaza", "ganja hotel"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-gja-center",
    name: "Ganja City Center / Javad Khan Street",
    category: "district",
    zoneId: "GJA-ganja-center",
    airport: "GJA",
    distanceKm: 8,
    address: "Ganja Downtown",
    aliases: ["ganja center", "javad khan", "ganja mall", "shah abbas mosque"],
    badge: "Downtown",
  },
  {
    id: "loc-gja-goygol",
    name: "Goygol National Park & Lake Resort",
    category: "region",
    zoneId: "GJA-goygol",
    airport: "GJA",
    distanceKm: 45,
    address: "Goygol District, Lesser Caucasus",
    aliases: ["goygol", "maralgol", "goygol lake"],
    badge: "Alpine Lake",
  },
  {
    id: "loc-gja-naftalan",
    name: "Naftalan Thermal Spa (from GJA Airport)",
    category: "region",
    zoneId: "GJA-naftalan",
    airport: "GJA",
    distanceKm: 55,
    address: "Naftalan Sanatorium District",
    aliases: ["naftalan ganja", "chinar ganja", "gashalti"],
    badge: "Thermal Resort",
  },
  {
    id: "loc-custom-gja",
    name: "Custom Ganja / Western Address",
    category: "custom",
    zoneId: "GJA-custom",
    airport: "GJA",
    distanceKm: 0,
    aliases: ["custom", "other", "address"],
    badge: "Custom Quote",
  },

  // ── ✈️ NAJ (Nakhchivan Airport Locations) ───────────────────────────────────
  {
    id: "loc-naj-tabriz",
    name: "Tabriz Hotel Nakhchivan",
    category: "hotel",
    zoneId: "NAJ-nakhchivan-center",
    airport: "NAJ",
    distanceKm: 7,
    address: "Heydar Aliyev Avenue, Nakhchivan",
    aliases: ["tabriz hotel", "nakhchivan hotel", "tabriz"],
    badge: "5★ Hotel",
  },
  {
    id: "loc-naj-duzdag",
    name: "Duzdag Physiotherapy & Salt Caves Resort",
    category: "hotel",
    zoneId: "NAJ-duzdag",
    airport: "NAJ",
    distanceKm: 18,
    address: "Duzdag Mountain, Nakhchivan",
    aliases: ["duzdag", "duzdaq", "salt caves", "speleotherapy", "duzdag hotel"],
    badge: "Salt Therapy Resort",
  },
  {
    id: "loc-naj-center",
    name: "Nakhchivan City Center & Momine Khatun",
    category: "district",
    zoneId: "NAJ-nakhchivan-center",
    airport: "NAJ",
    distanceKm: 7,
    address: "Atabeylar Complex, Nakhchivan",
    aliases: ["nakhchivan center", "momine khatun", "nohur tomb"],
    badge: "Downtown",
  },
  {
    id: "loc-custom-naj",
    name: "Custom Nakhchivan Address",
    category: "custom",
    zoneId: "NAJ-custom",
    airport: "NAJ",
    distanceKm: 0,
    aliases: ["custom", "other", "address"],
    badge: "Custom Quote",
  },
];

// ─── Location & Destination Helper Functions ──────────────────────────────────

/** Get all destinations for a given airport */
export function getDestinationsByAirport(airport: AirportCode): DestinationLocation[] {
  return POPULAR_DESTINATIONS.filter((d) => d.airport === airport);
}

/** Find a destination location by ID */
export function getLocationById(id: string): DestinationLocation | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().replace(/_/g, "-");
  return POPULAR_DESTINATIONS.find((d) => d.id.toLowerCase().replace(/_/g, "-") === normalized);
}

/**
 * Multi-keyword search across hotel names, addresses, aliases, and categories.
 */
export function searchDestinations(query: string, airport: AirportCode): DestinationLocation[] {
  const airportDests = getDestinationsByAirport(airport);
  if (!query || query.trim() === "") return airportDests;

  const q = query.toLowerCase().trim();
  return airportDests.filter((d) => {
    if (d.name.toLowerCase().includes(q)) return true;
    if (d.address && d.address.toLowerCase().includes(q)) return true;
    if (d.badge && d.badge.toLowerCase().includes(q)) return true;
    if (d.aliases && d.aliases.some((alias) => alias.toLowerCase().includes(q))) return true;
    return false;
  });
}

/**
 * Resolves either a location ID (e.g. "loc-jw-marriott") or a raw zone ID (e.g. "GYD-baku-center")
 * to its matching DestinationLocation and TransferZone.
 */
export function resolveLocationOrZone(idOrZoneId: string, airport: AirportCode = "GYD"): {
  location?: DestinationLocation;
  zone: TransferZone;
} {
  const location = getLocationById(idOrZoneId);
  if (location) {
    const zone = getZoneById(location.zoneId) || getZonesByAirport(airport)[0]!;
    return { location, zone };
  }

  const directZone = getZoneById(idOrZoneId);
  if (directZone) {
    return { zone: directZone };
  }

  const defaultZone = getZonesByAirport(airport)[0]!;
  return { zone: defaultZone };
}

// ─── Pricing Engine ───────────────────────────────────────────────────────────

/**
 * Calculates the one-way transfer price for a given zone + vehicle class.
 * Returns null for custom zones (requires manual admin quote).
 */
export function calculateTransferPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass
): { basePrice: number; totalAmount: number } | null {
  if (zone.isCustom) return null;

  const vehicle = VEHICLE_CLASSES.find((v) => v.id === vehicleClass);
  if (!vehicle) return null;

  const basePrice = vehicle.baseRate + vehicle.perKmRate * zone.distanceKm;
  const totalAmount = Math.ceil(basePrice); // round up to nearest dollar

  return { basePrice, totalAmount };
}

/**
 * Calculates the round-trip price (2× one-way with a 10% discount).
 */
export function calculateRoundTripPrice(
  zone: TransferZone,
  vehicleClass: VehicleClass
): { basePrice: number; totalAmount: number } | null {
  const oneWay = calculateTransferPrice(zone, vehicleClass);
  if (!oneWay) return null;

  const basePrice = oneWay.basePrice * 2 * 0.9;  // 10% round-trip discount
  const totalAmount = Math.ceil(basePrice);

  return { basePrice, totalAmount };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get all zones for a given airport */
export function getZonesByAirport(airport: AirportCode): TransferZone[] {
  return TRANSFER_ZONES.filter((z) => z.airport === airport);
}

/** Find a zone by its ID (flexible to case and underscore/hyphen) */
export function getZoneById(id: string): TransferZone | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().replace(/_/g, "-");
  return TRANSFER_ZONES.find((z) => z.id.toLowerCase().replace(/_/g, "-") === normalized);
}

/** Get airport info by code */
export function getAirportByCode(code: AirportCode): AirportInfo | undefined {
  return AIRPORTS.find((a) => a.code === code);
}

/** Get vehicle config by class */
export function getVehicleConfig(vehicleClass: string): VehicleConfig | undefined {
  return VEHICLE_CLASSES.find((v) => v.id.toLowerCase() === vehicleClass.toLowerCase());
}

/**
 * Generates a unique booking reference in the format ATR-XXXXXX
 */
export function generateTransferRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Unambiguous chars
  let ref = "";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ATR-${ref}`;
}
