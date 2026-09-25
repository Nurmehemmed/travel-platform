import { NextRequest, NextResponse } from "next/server";
import {
  POPULAR_DESTINATIONS,
  resolveLocationByCoords,
  AirportCode,
  getAirportByCode,
  calculateHaversineDistanceKm,
  checkLocationServiceability,
} from "@/lib/transfer-zones";

// Cache for geocoding to keep requests lightning-fast and avoid duplicate upstream calls
const GEO_CACHE = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const airport = (searchParams.get("airport") as AirportCode) || "GYD";
  const lang = searchParams.get("lang") || "en";

  // ── 1. Reverse Geocode by Coordinates ──
  if (latStr && lngStr) {
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    // Geographic boundary and water check
    const serviceCheck = checkLocationServiceability(lat, lng);
    if (!serviceCheck.isServiceable) {
      return NextResponse.json({
        isServiceable: false,
        status: serviceCheck.status,
        error: serviceCheck.message,
        address: serviceCheck.message,
        lat,
        lng,
      });
    }

    const cacheKey = `rev:${lat.toFixed(4)},${lng.toFixed(4)}:${lang}`;
    const cached = GEO_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(cached.data);
    }

    // Check if close to any known destination landmark (< 1.2 km)
    const { location: nearbyLoc, zone, distanceKm } = resolveLocationByCoords(lat, lng, airport);
    if (nearbyLoc) {
      const result = {
        address: nearbyLoc.address || nearbyLoc.name,
        name: nearbyLoc.name,
        locationId: nearbyLoc.id,
        zoneId: zone.id,
        zoneName: zone.name,
        distanceKm,
        lat,
        lng,
      };
      GEO_CACHE.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json(result);
    }

    // Server-side Nominatim Reverse Geocoding with valid User-Agent
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "AddmeTour-Platform/1.0 (dispatch@addmetour.com; https://addmetour.com)",
          "Accept-Language": `${lang},az,en`,
        },
        signal: AbortSignal.timeout(4500),
      });

      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        
        // Build clean readable address
        const road = addr.road || addr.pedestrian || addr.street || addr.neighbourhood || "";
        const houseNumber = addr.house_number ? ` ${addr.house_number}` : "";
        const suburb = addr.suburb || addr.city_district || addr.district || "";
        const city = addr.city || addr.town || addr.village || addr.county || "Baku";

        let formatted = "";
        if (road) {
          formatted = `${road}${houseNumber}`;
          if (suburb && suburb !== road) formatted += `, ${suburb}`;
          if (city) formatted += `, ${city}`;
        } else if (suburb) {
          formatted = `${suburb}, ${city}`;
        } else if (data.display_name) {
          formatted = data.display_name.split(", ").slice(0, 3).join(", ");
        } else {
          formatted = `${zone.name}, ${city}`;
        }

        const result = {
          address: formatted,
          name: road ? `${road}${houseNumber}` : undefined,
          zoneId: zone.id,
          zoneName: zone.name,
          distanceKm,
          lat,
          lng,
        };

        GEO_CACHE.set(cacheKey, { data: result, timestamp: Date.now() });
        return NextResponse.json(result);
      }
    } catch (err) {
      console.warn("[Reverse Geocode Server Error]:", err);
    }

    // Fallback if upstream fails
    const fallbackResult = {
      address: `${zone.name} (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
      zoneId: zone.id,
      zoneName: zone.name,
      distanceKm,
      lat,
      lng,
    };
    return NextResponse.json(fallbackResult);
  }

  // ── 2. Autocomplete Search Query ──
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const searchCacheKey = `search:${q.toLowerCase()}:${airport}:${lang}`;
  const cachedSearch = GEO_CACHE.get(searchCacheKey);
  if (cachedSearch && Date.now() - cachedSearch.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cachedSearch.data);
  }

  const queryNorm = q.toLowerCase();

  // 1. Search local high-quality curated destinations in Azerbaijan
  const localResults = POPULAR_DESTINATIONS.filter((d) => {
    if (d.name.toLowerCase().includes(queryNorm)) return true;
    if (d.address && d.address.toLowerCase().includes(queryNorm)) return true;
    if (d.badge && d.badge.toLowerCase().includes(queryNorm)) return true;
    if (d.aliases && d.aliases.some((a) => a.toLowerCase().includes(queryNorm))) return true;
    return false;
  }).map((d) => {
    const lat = d.lat || (d.zoneId.includes("shahdag") ? 41.3214 : d.zoneId.includes("qabala") ? 40.9825 : 40.3756);
    const lng = d.lng || (d.zoneId.includes("shahdag") ? 48.1464 : d.zoneId.includes("qabala") ? 47.8492 : 49.8450);
    const { zone, distanceKm } = resolveLocationByCoords(lat, lng, airport);

    return {
      title: d.name,
      subtitle: d.address || `${d.category.toUpperCase()} · ~${distanceKm} km from ${airport}`,
      address: d.address || d.name,
      lat,
      lng,
      locationId: d.id,
      zoneId: zone.id,
      zoneName: zone.name,
      distanceKm,
    };
  });

  // 2. Query Nominatim for street/building/address autocomplete in Azerbaijan
  let remoteResults: any[] = [];
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&countrycodes=az&limit=6&addressdetails=1`;

    const res = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "AddmeTour-Platform/1.0 (dispatch@addmetour.com; https://addmetour.com)",
        "Accept-Language": `${lang},az,en`,
      },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      remoteResults = (data || []).map((item: any) => {
        const itemLat = parseFloat(item.lat);
        const itemLng = parseFloat(item.lon);
        const { zone, distanceKm } = resolveLocationByCoords(itemLat, itemLng, airport);

        const parts = (item.display_name || "").split(", ");
        const title = parts[0] || item.display_name;
        const subtitle = parts.slice(1, 3).join(", ") || `${zone.name} (~${distanceKm} km)`;

        return {
          title,
          subtitle,
          address: parts.slice(0, 3).join(", ") || title,
          lat: itemLat,
          lng: itemLng,
          zoneId: zone.id,
          zoneName: zone.name,
          distanceKm,
        };
      });
    }
  } catch (err) {
    console.warn("[Nominatim Autocomplete Error]:", err);
  }

  // Merge and deduplicate by coordinates
  const merged = [...localResults];
  for (const rem of remoteResults) {
    const isDup = merged.some(
      (m) =>
        Math.abs(m.lat - rem.lat) < 0.0015 && Math.abs(m.lng - rem.lng) < 0.0015
    );
    if (!isDup) {
      merged.push(rem);
    }
  }

  const finalResponse = { results: merged.slice(0, 8) };
  GEO_CACHE.set(searchCacheKey, { data: finalResponse, timestamp: Date.now() });

  return NextResponse.json(finalResponse);
}
