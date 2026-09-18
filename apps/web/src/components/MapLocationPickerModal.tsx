"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Search,
  MapPin,
  Check,
  Navigation,
  Loader2,
  Map as MapIcon,
} from "lucide-react";
import {
  AirportCode,
  getAirportByCode,
  POPULAR_DESTINATIONS,
  resolveLocationByCoords,
  resolveLocationOrZone,
} from "@/lib/transfer-zones";
import { useLanguage } from "@/lib/i18n";
import { LOCALIZED_MAP_PICKER, LOCALIZED_ZONES } from "@/lib/pages-i18n";

export interface MapLocationPickerResult {
  address: string;
  lat: number;
  lng: number;
  zoneId: string;
  zoneName: string;
  distanceKm: number;
  locationId?: string | undefined;
  locationName?: string | undefined;
}

export interface MapLocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (result: MapLocationPickerResult) => void;
  airportCode?: AirportCode | undefined;
  initialLocationId?: string | undefined;
  initialAddress?: string | undefined;
}

export function MapLocationPickerModal({
  isOpen,
  onClose,
  onSelectLocation,
  airportCode = "GYD",
  initialLocationId,
  initialAddress,
}: MapLocationPickerModalProps) {
  const { language } = useLanguage();
  const mp = LOCALIZED_MAP_PICKER[language] || LOCALIZED_MAP_PICKER.EN;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // State for selected coords & resolved details
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: 40.3756,
    lng: 49.8450, // Baku City Center default
  });
  const [resolvedAddress, setResolvedAddress] = useState<string>(
    initialAddress || "JW Marriott Absheron Baku, 674 Azadliq Square"
  );
  const [resolvedLocationName, setResolvedLocationName] = useState<string | undefined>();
  const [resolvedLocationId, setResolvedLocationId] = useState<string | undefined>(
    initialLocationId
  );
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      title: string;
      subtitle?: string;
      lat: number;
      lng: number;
      locationId?: string;
    }>
  >([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Compute zone and distance
  const { zone: resolvedZone, distanceKm: resolvedDistanceKm } = resolveLocationByCoords(
    currentCoords.lat,
    currentCoords.lng,
    airportCode
  );

  // Quick chips for popular destinations in Azerbaijan
  const quickShortcuts = [
    { name: "JW Marriott", query: "JW Marriott Absheron Baku", lat: 40.3725, lng: 49.8530, id: "loc-jw-marriott" },
    { name: "Flame Towers", query: "Flame Towers, Baku", lat: 40.3598, lng: 49.8258, id: "loc-fairmont-flame" },
    { name: "Old City (Icherisheher)", query: "Icherisheher Baku", lat: 40.3660, lng: 49.8335, id: "loc-dst-old-city" },
    { name: "Shahdag Ski Resort", query: "Shahdag Mountain Resort", lat: 41.3214, lng: 48.1464, id: "loc-reg-shahdag" },
    { name: "Qabala Tufandag", query: "Tufandag Qabala", lat: 40.9825, lng: 47.8492, id: "loc-reg-qabala" },
    { name: "Bilgah Beach", query: "Bilgah Beach Hotel", lat: 40.5847, lng: 49.9824, id: "loc-bilgah-beach" },
  ];

  // Initialize coordinates from initialLocationId if available
  useEffect(() => {
    if (initialLocationId) {
      const { location } = resolveLocationOrZone(initialLocationId, airportCode);
      if (location && location.lat && location.lng) {
        setCurrentCoords({ lat: location.lat, lng: location.lng });
        setResolvedAddress(location.address || location.name);
        setResolvedLocationName(location.name);
        setResolvedLocationId(location.id);
      }
    }
  }, [initialLocationId, airportCode]);

  // Reverse geocoding lookup
  const performReverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      setIsGeocoding(true);
      try {
        // First check if matching any known luxury hotel/district directly
        const { location } = resolveLocationByCoords(lat, lng, airportCode);
        if (location) {
          setResolvedAddress(location.address || location.name);
          setResolvedLocationName(location.name);
          setResolvedLocationId(location.id);
          setIsGeocoding(false);
          return;
        }

        // Otherwise reverse geocode with OpenStreetMap Nominatim
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              "Accept-Language": language.toLowerCase(),
            },
            signal: AbortSignal.timeout(4000),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const displayName = data.display_name;
          if (displayName) {
            // Format nice compact address: Road / Building / District / City
            const parts = displayName.split(", ");
            const compact = parts.slice(0, 3).join(", ");
            setResolvedAddress(compact || displayName);
            setResolvedLocationName(undefined);
            setResolvedLocationId(undefined);
          }
        }
      } catch (err) {
        // Fallback to coordinates label if offline
        setResolvedAddress(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (Azerbaijan)`);
      } finally {
        setIsGeocoding(false);
      }
    },
    [airportCode, language]
  );

  // Initialize Leaflet Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;

      // Clean existing instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (!mapContainerRef.current) return;

      // Custom high-contrast SVG pin icon
      const pinIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="
              width: 38px;
              height: 38px;
              background: linear-gradient(135deg, #0284c7, #0369a1);
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.6), 0 0 0 3px #ffffff;
              border: 2px solid #ffffff;
            ">
              <span style="transform: rotate(45deg); font-size: 18px; line-height: 1;">📍</span>
            </div>
            <div style="
              width: 14px;
              height: 4px;
              background: rgba(0, 0, 0, 0.25);
              border-radius: 50%;
              margin-top: 2px;
              filter: blur(1px);
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const map = L.map(mapContainerRef.current, {
        center: [currentCoords.lat, currentCoords.lng],
        zoom: 14,
        zoomControl: true,
      });

      // CartoDB Voyager raster tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Add draggable marker
      const marker = L.marker([currentCoords.lat, currentCoords.lng], {
        icon: pinIcon,
        draggable: true,
      }).addTo(map);

      // Marker drag event
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        setCurrentCoords({ lat: position.lat, lng: position.lng });
        performReverseGeocode(position.lat, position.lng);
      });

      // Map click event to move pin
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCurrentCoords({ lat, lng });
        performReverseGeocode(lat, lng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Invalidate size after modal animation
      setTimeout(() => {
        if (isMounted && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  // Fly to location helper
  const flyToCoords = (lat: number, lng: number, addressStr?: string, locId?: string) => {
    setCurrentCoords({ lat, lng });
    if (addressStr) setResolvedAddress(addressStr);
    if (locId) setResolvedLocationId(locId);

    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.flyTo([lat, lng], 15, {
        duration: 1.2,
      });
    }
    performReverseGeocode(lat, lng);
  };

  // Search places in Azerbaijan
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim() || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // First find local popular destination matches
      const localMatches = POPULAR_DESTINATIONS.filter((d) => {
        const q = query.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          (d.address && d.address.toLowerCase().includes(q)) ||
          (d.aliases && d.aliases.some((a) => a.toLowerCase().includes(q)))
        );
      }).map((d) => ({
        title: d.name,
        subtitle: d.address || d.badge || `${d.category.toUpperCase()}`,
        lat: d.lat || (d.zoneId.includes("shahdag") ? 41.3214 : d.zoneId.includes("qabala") ? 40.9825 : 40.3756),
        lng: d.lng || (d.zoneId.includes("shahdag") ? 48.1464 : d.zoneId.includes("qabala") ? 47.8492 : 49.8450),
        locationId: d.id,
      }));

      // Then fetch from Nominatim with countrycodes=az
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&countrycodes=az&limit=5&addressdetails=1`,
        {
          headers: { "Accept-Language": language.toLowerCase() },
          signal: AbortSignal.timeout(4000),
        }
      );

      let remoteMatches: any[] = [];
      if (res.ok) {
        const data = await res.json();
        remoteMatches = data.map((item: any) => ({
          title: item.display_name.split(",")[0] || item.display_name,
          subtitle: item.display_name.split(",").slice(1, 3).join(", "),
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        }));
      }

      // Merge results avoiding exact coordinate duplicates
      const merged = [...localMatches];
      for (const rm of remoteMatches) {
        if (!merged.some((m) => Math.abs(m.lat - rm.lat) < 0.001 && Math.abs(m.lng - rm.lng) < 0.001)) {
          merged.push(rm);
        }
      }

      setSearchResults(merged.slice(0, 6));
    } catch (err) {
      console.warn("Location search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelectLocation({
      address: resolvedAddress,
      lat: currentCoords.lat,
      lng: currentCoords.lng,
      zoneId: resolvedZone.id,
      zoneName: LOCALIZED_ZONES[language]?.[resolvedZone.id] || resolvedZone.name,
      distanceKm: resolvedDistanceKm,
      locationId: resolvedLocationId,
      locationName: resolvedLocationName,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Leaflet CSS Inject */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div className="relative flex flex-col w-full max-w-4xl h-[92vh] max-h-[760px] rounded-2xl bg-white shadow-2xl border border-sky-100 overflow-hidden">
        {/* ═══════════════════════════════════════════════════════ MODAL HEADER */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#0f3460] to-[#1a4478] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/25 border border-sky-300/30 text-sky-200">
              <MapIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                {mp.modalTitle}
              </h3>
              <p className="text-[11px] text-sky-100/80 line-clamp-1">
                {mp.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Map Picker"
            className="rounded-full p-1.5 text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════ SEARCH & SHORTCUTS BAR */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 shrink-0 space-y-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={mp.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm"
            />
            {isSearching ? (
              <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-sky-600" />
            ) : searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}

            {/* Live Autocomplete Results Floating Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-[1000] max-h-56 overflow-y-auto">
                {searchResults.map((item, idx) => (
                  <button
                    key={`${item.title}-${idx}`}
                    type="button"
                    onClick={() => {
                      flyToCoords(item.lat, item.lng, item.title, item.locationId);
                      setSearchResults([]);
                      setSearchQuery("");
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-sky-50 flex items-center gap-2.5 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <MapPin className="h-4 w-4 text-sky-600 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Location Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              {mp.quickShortcuts}
            </span>
            {quickShortcuts.map((sc) => (
              <button
                key={sc.name}
                type="button"
                onClick={() => flyToCoords(sc.lat, sc.lng, sc.query, sc.id)}
                className="rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-sky-700 whitespace-nowrap transition-all shadow-2xs shrink-0"
              >
                {sc.name}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ INTERACTIVE MAP AREA */}
        <div className="relative flex-1 w-full bg-slate-100 overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Drag Hint */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] pointer-events-none">
            <div className="rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white shadow-lg flex items-center gap-1.5 border border-white/10">
              <Navigation className="h-3 w-3 text-sky-400 animate-pulse" />
              <span>{mp.dragHint}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ BOTTOM DETAILS & ACTIONS BAR */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Resolved Location Text */}
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 mt-0.5">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {mp.customPinAddress}
                  </span>
                  {isGeocoding && (
                    <span className="text-[10px] text-sky-600 font-medium flex items-center gap-1">
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      {mp.findingAddress}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {resolvedAddress}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                    <span>{mp.zoneBadge}</span>
                    <span className="text-slate-900">
                      {LOCALIZED_ZONES[language]?.[resolvedZone.id] || resolvedZone.name}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    <span>{mp.distanceBadge}</span>
                    <span className="font-bold text-slate-800">
                      ~{resolvedDistanceKm} km
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 justify-end shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {mp.cancelButton}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>{mp.confirmButton}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
