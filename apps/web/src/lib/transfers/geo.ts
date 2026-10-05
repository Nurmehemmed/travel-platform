/**
 * @file geo.ts
 * @description Geolocation helpers, Haversine formula, and coordinates-to-zone resolver.
 */

import { AirportCode, DestinationLocation, TransferZone } from "./types";
import { AIRPORTS, getAirportByCode } from "./airports";
import { getDestinationsByAirport } from "./destinations";
import { getZoneById, getZonesByAirport } from "./zones";

/**
 * Haversine formula to compute distance between two geographical points in kilometers.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Resolves map coordinates (lat/lng) to the best matching DestinationLocation and TransferZone.
 */
export function resolveLocationByCoords(
  lat: number,
  lng: number,
  airport: AirportCode = "GYD"
): {
  location?: DestinationLocation;
  zone: TransferZone;
  distanceKm: number;
} {
  const airportObj = getAirportByCode(airport) || AIRPORTS[0]!;
  const directDistance = calculateHaversineDistanceKm(airportObj.lat, airportObj.lng, lat, lng);
  const estDrivingDistance = Math.round(directDistance * 1.25);

  // Check if near any known landmark (< 1.5 km)
  const airportDests = getDestinationsByAirport(airport);
  let closestDest: DestinationLocation | undefined;
  let minDestDist = Infinity;

  for (const dest of airportDests) {
    if (dest.lat !== undefined && dest.lng !== undefined) {
      const d = calculateHaversineDistanceKm(lat, lng, dest.lat, dest.lng);
      if (d < minDestDist) {
        minDestDist = d;
        closestDest = dest;
      }
    }
  }

  if (closestDest && minDestDist <= 1.5) {
    const zone = getZoneById(closestDest.zoneId) || getZonesByAirport(airport)[0]!;
    return {
      location: closestDest,
      zone,
      distanceKm: zone.distanceKm || estDrivingDistance,
    };
  }

  // Clustering and regional heuristics for Azerbaijan
  if (airport === "GYD") {
    // Shahdag / Gusar / Quba (North corridor)
    if (lat >= 41.15) {
      if (lng <= 48.3) {
        const zone = getZoneById("GYD-shahdag") || getZonesByAirport("GYD")[0]!;
        return { zone, distanceKm: 210 };
      }
      const zone = getZoneById("GYD-quba") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 170 };
    }

    // Sheki / Qakh / North-West mountain corridor (lat >= 41.05, lng <= 47.5)
    if (lat >= 41.05 && lng <= 47.5) {
      const zone = getZoneById("GYD-sheki") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 310 };
    }

    // Qabala / Tufandag (lat >= 40.85, lng between 47.5 and 48.15)
    if (lat >= 40.85 && lat < 41.15 && lng >= 47.5 && lng <= 48.15) {
      const zone = getZoneById("GYD-qabala") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 240 };
    }

    // Ismayilli / Lahij / Basgal
    if (lat >= 40.75 && lat <= 40.98 && lng > 48.0 && lng <= 48.45) {
      const zone = getZoneById("GYD-ismayilli") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 185 };
    }

    // Shamakhi / Sharadil
    if (lat >= 40.5 && lat <= 40.78 && lng >= 48.45 && lng <= 48.85) {
      const zone = getZoneById("GYD-shamakhi") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 135 };
    }

    // Ganja City (lat ~40.55-40.8, lng <= 46.55)
    if (lng <= 46.55 && lat >= 40.4) {
      const zone = getZoneById("GYD-ganja") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 360 };
    }

    // Naftalan Thermal Spa (lat ~40.45-40.6, lng 46.65-47.0)
    if (lat >= 40.42 && lat <= 40.62 && lng >= 46.65 && lng <= 47.0) {
      const zone = getZoneById("GYD-naftalan") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 340 };
    }

    // Mingachevir City & Hydro Reservoir (lat ~40.65-40.95, lng 46.85-47.25)
    if (lat >= 40.65 && lat <= 40.95 && lng >= 46.85 && lng <= 47.25) {
      const zone = getZoneById("GYD-mingachevir") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 285 };
    }

    // Yevlakh Junction (lat ~40.52-40.72, lng 47.05-47.38)
    if (lat >= 40.52 && lat <= 40.72 && lng >= 47.05 && lng <= 47.38) {
      const zone = getZoneById("GYD-yevlakh") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 275 };
    }

    // Goychay / Agdash Central Region (lat ~40.45-40.82, lng 47.45-48.0)
    if (lat >= 40.45 && lat <= 40.82 && lng >= 47.45 && lng <= 48.0) {
      const zone = getZoneById("GYD-goychay") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 220 };
    }

    // Lankaran / South Coast
    if (lat <= 39.5) {
      const zone = getZoneById("GYD-lankaran") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 260 };
    }

    // Sumqayit
    if (lat >= 40.55 && lng <= 49.75) {
      const zone = getZoneById("GYD-sumqayit") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 48 };
    }
    // Khirdalan
    if (lat >= 40.42 && lat <= 40.52 && lng <= 49.78) {
      const zone = getZoneById("GYD-khirdalan") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 38 };
    }
    // Absheron Peninsula (Mardakan, Bilgah, Novkhani, Pirallahi)
    if (lat >= 40.48 || lng >= 50.15) {
      const zone = getZoneById("GYD-absheron") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 32 };
    }
    // Sabail / Flame Towers
    if (lng <= 49.835 && lat <= 40.365) {
      const zone = getZoneById("GYD-sabail") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 33 };
    }
    // Baku Boulevard / Port Baku
    if (lng >= 49.85 && lat <= 40.38) {
      const zone = getZoneById("GYD-baku-bulvar") || getZonesByAirport("GYD")[0]!;
      return { zone, distanceKm: 28 };
    }
    // Default Baku Center
    const zone = getZoneById("GYD-baku-center") || getZonesByAirport("GYD")[0]!;
    return { zone, distanceKm: 30 };
  }

  if (airport === "GJA") {
    if (lat >= 40.65 && lat <= 40.95 && lng >= 46.85 && lng <= 47.25) {
      const zone = getZoneById("GJA-mingachevir") || getZonesByAirport("GJA")[0]!;
      return { zone, distanceKm: 60 };
    }
    if (lat <= 40.6) {
      const zone = getZoneById("GJA-goygol") || getZonesByAirport("GJA")[0]!;
      return { zone, distanceKm: 35 };
    }
    if (lng >= 46.7) {
      const zone = getZoneById("GJA-naftalan") || getZonesByAirport("GJA")[0]!;
      return { zone, distanceKm: 65 };
    }
    if (lat >= 41.1) {
      const zone = getZoneById("GJA-sheki") || getZonesByAirport("GJA")[0]!;
      return { zone, distanceKm: 145 };
    }
    const zone = getZoneById("GJA-ganja-center") || getZonesByAirport("GJA")[0]!;
    return { zone, distanceKm: 8 };
  }

  const fallback = getZonesByAirport(airport)[0]!;
  return { zone: fallback, distanceKm: fallback.distanceKm || estDrivingDistance };
}

/**
 * Baku geographic coordinate bounds for Leaflet map camera containment.
 * Spans Greater Baku, Absheron Peninsula, Sumqayit, and Lokbatan.
 */
export const BAKU_MAP_BOUNDS: [[number, number], [number, number]] = [
  [40.05, 49.30], // South-West
  [40.75, 50.55], // North-East
];

/**
 * Ganja geographic coordinate bounds for Leaflet map camera containment.
 * Spans Greater Ganja, Goygol, Naftalan, and Mingachevir corridor.
 */
export const GANJA_MAP_BOUNDS: [[number, number], [number, number]] = [
  [40.25, 46.00], // South-West
  [40.95, 47.30], // North-East
];

/**
 * Combined bounds covering both Baku and Ganja service corridors.
 */
export const BAKU_AND_GANJA_MAP_BOUNDS: [[number, number], [number, number]] = [
  [40.05, 45.90],
  [40.95, 50.55],
];

/** Preserved for backward compatibility */
export const AZERBAIJAN_MAP_BOUNDS = BAKU_AND_GANJA_MAP_BOUNDS;

/** Checks if coordinates are within the Greater Baku & Absheron transfer service corridor */
export function isCoordInBaku(lat: number, lng: number): boolean {
  return lat >= 40.05 && lat <= 40.75 && lng >= 49.30 && lng <= 50.55;
}

/** Checks if coordinates are within the Greater Ganja transfer service corridor */
export function isCoordInGanja(lat: number, lng: number): boolean {
  return lat >= 40.25 && lat <= 40.95 && lng >= 46.00 && lng <= 47.30;
}

export interface ServiceabilityCheckResult {
  isServiceable: boolean;
  status: "ok" | "water" | "out_of_bounds";
  message: string;
}

/**
 * Evaluates whether geographical coordinates fall on valid serviceable land in Baku or Ganja,
 * rejecting Caspian Sea water, international borders, and off-grid zones.
 */
export function checkLocationServiceability(
  lat: number,
  lng: number,
  airport?: AirportCode
): ServiceabilityCheckResult {
  const inBaku = isCoordInBaku(lat, lng);
  const inGanja = isCoordInGanja(lat, lng);

  // If specific airport requested, limit strictly to that airport's designated zone
  if (airport === "GYD") {
    if (!inBaku) {
      return {
        isServiceable: false,
        status: "out_of_bounds",
        message: "Location is outside the Baku service area. Heydar Aliyev Airport (GYD) transfers are strictly limited to Greater Baku and Absheron.",
      };
    }
  } else if (airport === "GJA") {
    if (!inGanja) {
      return {
        isServiceable: false,
        status: "out_of_bounds",
        message: "Location is outside the Ganja service area. Ganja Airport (GJA) transfers are strictly limited to the Ganja region.",
      };
    }
  } else {
    // If no airport context provided, must belong to either Baku or Ganja
    if (!inBaku && !inGanja) {
      return {
        isServiceable: false,
        status: "out_of_bounds",
        message: "Transfer service is strictly limited to Baku and Ganja regions only.",
      };
    }
  }

  // Caspian Sea water detection (for Baku coastal points)
  if (inBaku) {
    // Absheron Peninsula east tip: Pirallahi island is up to lng ~50.45. East of 50.48 is open sea.
    if (lat >= 40.35 && lat < 40.62 && lng > 50.48) {
      return {
        isServiceable: false,
        status: "water",
        message: "Selected point is in the Caspian Sea. Please place the pin on land.",
      };
    }

    // North of Absheron sea
    if (lat >= 40.62 && lng > 49.80) {
      if (lng > 50.48 || (lat > 40.63 && lng > 50.15)) {
        return {
          isServiceable: false,
          status: "water",
          message: "Selected point is in the Caspian Sea. Please place the pin on land.",
        };
      }
    }

    // Baku Bay water area (lat between 40.32 and 40.365, east of the amphitheater coast ~49.87)
    if (lat >= 40.32 && lat <= 40.365 && lng > 49.87 && lng < 50.05) {
      return {
        isServiceable: false,
        status: "water",
        message: "Selected point is in Baku Bay (water). Please place the pin along the Boulevard or street address.",
      };
    }
  }

  return {
    isServiceable: true,
    status: "ok",
    message: "Valid destination in service area.",
  };
}

export interface MapHotspot {
  id: string;
  name: string;
  category: "hotel" | "landmark" | "resort";
  lat: number;
  lng: number;
  address: string;
  badge: string;
  icon: string;
}

/**
 * Curated registry of verified popular hotels, resorts, and cultural landmarks across Baku and Ganja.
 * Rendered on the interactive map as clickable visual hotspots.
 */
export const MAP_HOTSPOTS: MapHotspot[] = [
  // Top Baku Hotels
  {
    id: "loc-jw-marriott",
    name: "JW Marriott Absheron Baku",
    category: "hotel",
    lat: 40.3725,
    lng: 49.8530,
    address: "674 Azadliq Square, Baku",
    badge: "5★ Luxury",
    icon: "🏨",
  },
  {
    id: "loc-fairmont-flame",
    name: "Fairmont Baku (Flame Towers)",
    category: "hotel",
    lat: 40.3598,
    lng: 49.8258,
    address: "1A Mehdi Huseyn Street, Flame Towers Complex",
    badge: "5★ Icon",
    icon: "🏨",
  },
  {
    id: "loc-four-seasons",
    name: "Four Seasons Hotel Baku",
    category: "hotel",
    lat: 40.3655,
    lng: 49.8355,
    address: "1 Neftchilar Avenue, Seaside Boulevard",
    badge: "5★ Ultra-Luxury",
    icon: "🏨",
  },
  {
    id: "loc-hilton-baku",
    name: "Hilton Baku",
    category: "hotel",
    lat: 40.3712,
    lng: 49.8512,
    address: "1B Azadliq Avenue, City Center",
    badge: "5★ Waterfront",
    icon: "🏨",
  },
  {
    id: "loc-ritz-carlton",
    name: "The Ritz-Carlton, Baku",
    category: "hotel",
    lat: 40.3842,
    lng: 49.8710,
    address: "3 Babek Avenue, Nasimi District",
    badge: "5★ Luxury",
    icon: "🏨",
  },
  {
    id: "loc-intercontinental",
    name: "InterContinental Baku",
    category: "hotel",
    lat: 40.3718,
    lng: 49.8480,
    address: "25 Zarifa Aliyeva Street, City Center",
    badge: "5★ Hotel",
    icon: "🏨",
  },
  {
    id: "loc-marriott-boulevard",
    name: "Baku Marriott Hotel Boulevard",
    category: "hotel",
    lat: 40.3785,
    lng: 49.8820,
    address: "Khagani Rustamov Street 4C, White City",
    badge: "5★ Waterfront",
    icon: "🏨",
  },
  {
    id: "loc-intourist",
    name: "Intourist Hotel Baku",
    category: "hotel",
    lat: 40.3540,
    lng: 49.8370,
    address: "Mikayil Useynov Avenue 51, Bayil",
    badge: "5★ Boutique",
    icon: "🏨",
  },
  {
    id: "loc-bilgah-beach",
    name: "Bilgah Beach Hotel",
    category: "resort",
    lat: 40.5847,
    lng: 49.9824,
    address: "Gelebe Street 94, Bilgah Coast",
    badge: "5★ Seaside Resort",
    icon: "🏖️",
  },
  // Key Baku Landmarks
  {
    id: "loc-dst-old-city",
    name: "Old City (Icherisheher & Maiden Tower)",
    category: "landmark",
    lat: 40.3660,
    lng: 49.8335,
    address: "Icherisheher Historic Quarter, Baku",
    badge: "UNESCO Heritage",
    icon: "🏰",
  },
  {
    id: "loc-dst-fountain-sq",
    name: "Fountain Square (Nizami Street)",
    category: "landmark",
    lat: 40.3703,
    lng: 49.8375,
    address: "Nizami Street & Fountain Square, Baku",
    badge: "City Heart",
    icon: "🛍️",
  },
  {
    id: "loc-dst-heydar-aliyev",
    name: "Heydar Aliyev Center",
    category: "landmark",
    lat: 40.3959,
    lng: 49.8678,
    address: "1 Heydar Aliyev Avenue, Baku",
    badge: "Zaha Hadid Icon",
    icon: "🏛️",
  },
  // Key Ganja Hotspots
  {
    id: "loc-reg-ganja",
    name: "Ganja City Center (Javad Khan St)",
    category: "landmark",
    lat: 40.6828,
    lng: 46.3606,
    address: "Heydar Aliyev Square, Ganja",
    badge: "Historic Capital",
    icon: "🏙️",
  },
  {
    id: "loc-gja-ramada",
    name: "Ramada Plaza by Wyndham Ganja",
    category: "hotel",
    lat: 40.6950,
    lng: 46.3650,
    address: "Heydar Aliyev Avenue, Ganja",
    badge: "5★ Hotel",
    icon: "🏨",
  },
  {
    id: "loc-gja-goygol",
    name: "Goygol National Park & Lake",
    category: "resort",
    lat: 40.4080,
    lng: 46.3240,
    address: "Goygol National Park, Ganja Region",
    badge: "Alpine Lake",
    icon: "🌲",
  },
  {
    id: "loc-reg-naftalan",
    name: "Naftalan Health Sanatoriums",
    category: "resort",
    lat: 40.5067,
    lng: 46.8250,
    address: "Chinar / Gashalti Sanatorium, Naftalan",
    badge: "Thermal Healing",
    icon: "🛁",
  },
];

