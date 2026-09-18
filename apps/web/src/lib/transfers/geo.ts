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
