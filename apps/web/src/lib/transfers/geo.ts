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

  if (airport === "NAJ") {
    if (lat >= 39.25) {
      const zone = getZoneById("NAJ-duzdag") || getZonesByAirport("NAJ")[0]!;
      return { zone, distanceKm: 18 };
    }
    if (lng >= 45.8) {
      const zone = getZoneById("NAJ-ordubad") || getZonesByAirport("NAJ")[0]!;
      return { zone, distanceKm: 75 };
    }
    const zone = getZoneById("NAJ-nakhchivan-center") || getZonesByAirport("NAJ")[0]!;
    return { zone, distanceKm: 7 };
  }

  const fallback = getZonesByAirport(airport)[0]!;
  return { zone: fallback, distanceKm: fallback.distanceKm || estDrivingDistance };
}

/**
 * Azerbaijan geographic coordinate bounds for Leaflet map camera containment.
 */
export const AZERBAIJAN_MAP_BOUNDS: [[number, number], [number, number]] = [
  [38.35, 44.75], // South-West (Astara / Sadarak)
  [41.95, 50.95], // North-East (Balakan / Chilov tip)
];

export interface ServiceabilityCheckResult {
  isServiceable: boolean;
  status: "ok" | "water" | "out_of_bounds";
  message: string;
}

/**
 * Evaluates whether geographical coordinates fall on valid serviceable land in Azerbaijan,
 * rejecting Caspian Sea water, international borders, and off-grid zones.
 */
export function checkLocationServiceability(lat: number, lng: number): ServiceabilityCheckResult {
  // 1. Boundary bounding box check
  if (lat < 38.35 || lat > 41.95 || lng < 44.75 || lng > 50.95) {
    return {
      isServiceable: false,
      status: "out_of_bounds",
      message: "Location is outside Azerbaijan's borders. We only service destinations within Azerbaijan.",
    };
  }

  // 2. Caspian Sea (Water) detection:
  // North Coast (lat >= 41.25): Yalama/Nabran/Khudat coast is around lng 48.70. East of 48.72 is water.
  if (lat >= 41.25 && lng > 48.72) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in the Caspian Sea. Please place the pin on land or near a coastal resort.",
    };
  }

  // Shabran / Khachmaz / Siyazan coast (40.85 <= lat < 41.25): coast is around lng 49.1 - 49.30
  if (lat >= 40.85 && lat < 41.25 && lng > 49.30) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in the Caspian Sea. Please place the pin on land.",
    };
  }

  // North of Absheron peninsula (40.62 <= lat < 40.85): Sumqayit to Pirallahi
  if (lat >= 40.62 && lng > 49.80) {
    if (lng > 50.48) {
      return {
        isServiceable: false,
        status: "water",
        message: "Selected point is in the Caspian Sea. Please place the pin on land.",
      };
    }
    if (lat > 40.63 && lng > 50.15) {
      return {
        isServiceable: false,
        status: "water",
        message: "Selected point is in the Caspian Sea. Please place the pin on land.",
      };
    }
  }

  // Absheron Peninsula east tip: Pirallahi island is up to lng ~50.45. East of 50.48 is open sea.
  if (lat >= 40.35 && lat < 40.62 && lng > 50.48) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in the Caspian Sea. Please place the pin on land.",
    };
  }

  // Baku Bay water area (lat between 40.32 and 40.365, east of the amphitheater coast ~49.87)
  if (lat >= 40.32 && lat <= 40.365 && lng > 49.87 && lng < 50.05) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in Baku Bay (water). Please place the pin along the Boulevard or street address.",
    };
  }

  // Gobustan / Shirvan / Neftchala coast (39.50 <= lat < 40.32): coast is around lng 49.3 - 49.48
  if (lat >= 39.50 && lat < 40.32 && lng > 49.48) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in the Caspian Sea. Please place the pin on land.",
    };
  }

  // South coast (Lankaran / Astara, lat < 39.50): coast is around lng 48.90
  if (lat < 39.50 && lng > 48.95) {
    return {
      isServiceable: false,
      status: "water",
      message: "Selected point is in the Caspian Sea. Please place the pin on land.",
    };
  }

  return {
    isServiceable: true,
    status: "ok",
    message: "Valid destination in Azerbaijan.",
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
 * Curated registry of verified popular hotels, resorts, and cultural landmarks across Azerbaijan.
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
  // Key Landmarks
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
  // Top Regional Resorts
  {
    id: "loc-reg-shahdag",
    name: "Shahdag Mountain Resort",
    category: "resort",
    lat: 41.3214,
    lng: 48.1464,
    address: "Shahdag Ski Resort, Gusar Region",
    badge: "Alpine Ski Resort",
    icon: "🏔️",
  },
  {
    id: "loc-reg-qabala",
    name: "Tufandag Mountain Resort (Qabala)",
    category: "resort",
    lat: 40.9825,
    lng: 47.8492,
    address: "Tufandag Complex, Qabala",
    badge: "Mountain Resort",
    icon: "🚠",
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
  {
    id: "loc-reg-sheki",
    name: "Sheki Historic Center (Khan's Palace)",
    category: "landmark",
    lat: 41.2045,
    lng: 47.1975,
    address: "Mirza Fatali Akhundov Street, Sheki",
    badge: "UNESCO Silk Road",
    icon: "🏰",
  },
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
];

