/**
 * @file zones.ts
 * @description Zone registry across Azerbaijan airports (GYD, GJA, NAJ) and query helpers.
 */

import { AirportCode, TransferZone } from "./types";

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
    id: "GYD-mingachevir",
    airport: "GYD",
    name: "Mingachevir City / Hydro City",
    description: "Mingachevir downtown, Kura Riverside, Ag Saray Deluxe, Olympic Center",
    distanceKm: 285,
  },
  {
    id: "GYD-ganja",
    airport: "GYD",
    name: "Ganja City (from Baku)",
    description: "Ganja downtown, Nizami Mausoleum, Ramada Plaza",
    distanceKm: 360,
  },
  {
    id: "GYD-ismayilli",
    airport: "GYD",
    name: "Ismayilli / Lahij Ancient Village",
    description: "Ismayilli city, Lahij craft village, Basgal silk center",
    distanceKm: 185,
  },
  {
    id: "GYD-goychay",
    airport: "GYD",
    name: "Goychay / Central Region",
    description: "Goychay pomegranate capital, Agdash, Ujar",
    distanceKm: 220,
  },
  {
    id: "GYD-yevlakh",
    airport: "GYD",
    name: "Yevlakh Junction",
    description: "Yevlakh city and transit railway hub",
    distanceKm: 275,
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
    id: "GJA-mingachevir",
    airport: "GJA",
    name: "Mingachevir (from Ganja)",
    description: "Mingachevir city, Kura River resorts",
    distanceKm: 60,
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
