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
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Building2,
} from "lucide-react";
import {
  AirportCode,
  resolveLocationByCoords,
  resolveLocationOrZone,
  AZERBAIJAN_MAP_BOUNDS,
  checkLocationServiceability,
  MAP_HOTSPOTS,
  MapHotspot,
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
  const leafletModuleRef = useRef<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      address?: string;
      lat: number;
      lng: number;
      locationId?: string;
      zoneId?: string;
      zoneName?: string;
      distanceKm?: number;
    }>
  >([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Instantaneous geographic validation (blocks water and Caspian Sea, out-of-bounds)
  const serviceability = checkLocationServiceability(currentCoords.lat, currentCoords.lng);

  // Compute zone and distance
  const { zone: resolvedZone, distanceKm: resolvedDistanceKm } = resolveLocationByCoords(
    currentCoords.lat,
    currentCoords.lng,
    airportCode
  );

  // Helper to create high-contrast custom SVG pin icons reflecting serviceability state
  const createPinIcon = useCallback((L: any, isServiceable: boolean) => {
    const gradient = isServiceable
      ? "linear-gradient(135deg, #0284c7, #0369a1)"
      : "linear-gradient(135deg, #ef4444, #b91c1c)";
    const shadow = isServiceable
      ? "0 10px 25px -5px rgba(2, 132, 199, 0.6), 0 0 0 3px #ffffff"
      : "0 10px 25px -5px rgba(239, 68, 68, 0.7), 0 0 0 3px #ffffff";
    const iconEmoji = isServiceable ? "📍" : "⚠️";

    return L.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="
            width: 38px;
            height: 38px;
            background: ${gradient};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: ${shadow};
            border: 2px solid #ffffff;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          ">
            <span style="transform: rotate(45deg); font-size: 18px; line-height: 1;">${iconEmoji}</span>
          </div>
          <div style="
            width: 14px;
            height: 4px;
            background: rgba(0, 0, 0, 0.28);
            border-radius: 50%;
            margin-top: 2px;
            filter: blur(1px);
          "></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, []);

  // Quick chips for popular destinations in Azerbaijan
  const quickShortcuts = [
    { name: "JW Marriott", query: "JW Marriott Absheron Baku", lat: 40.3725, lng: 49.8530, id: "loc-jw-marriott" },
    { name: "Flame Towers", query: "Fairmont Baku (Flame Towers)", lat: 40.3598, lng: 49.8258, id: "loc-fairmont-flame" },
    { name: "Old City", query: "Old City (Icherisheher Historic Quarter)", lat: 40.3660, lng: 49.8335, id: "loc-dst-old-city" },
    { name: "Shahdag Resort", query: "Shahdag Mountain Resort", lat: 41.3214, lng: 48.1464, id: "loc-reg-shahdag" },
    { name: "Qabala Tufandag", query: "Tufandag Mountain Resort", lat: 40.9825, lng: 47.8492, id: "loc-reg-qabala" },
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

  // Reverse geocoding lookup via internal API route (bypasses browser CORS & User-Agent blocks)
  const performReverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      const check = checkLocationServiceability(lat, lng);
      if (!check.isServiceable) {
        setResolvedAddress(check.message);
        setResolvedLocationName(undefined);
        setResolvedLocationId(undefined);
        return;
      }

      setIsGeocoding(true);
      try {
        const res = await fetch(
          `/api/transfer/places?lat=${lat}&lng=${lng}&airport=${airportCode}&lang=${language.toLowerCase()}`,
          { signal: AbortSignal.timeout(6000) }
        );

        if (res.ok) {
          const data = await res.json();
          if (!data.isServiceable && data.error) {
            setResolvedAddress(data.error);
            setResolvedLocationName(undefined);
            setResolvedLocationId(undefined);
            return;
          }
          if (data.address) {
            setResolvedAddress(data.address);
            setResolvedLocationName(data.name || undefined);
            setResolvedLocationId(data.locationId || undefined);
            return;
          }
        }
        setResolvedAddress(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (Azerbaijan)`);
      } catch (err) {
        console.warn("Reverse geocode error:", err);
        setResolvedAddress(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (Azerbaijan)`);
      } finally {
        setIsGeocoding(false);
      }
    },
    [airportCode, language]
  );

  // Fast reset action to Baku City Center
  const handleResetToBaku = useCallback(() => {
    const bakuLat = 40.3725;
    const bakuLng = 49.8530;
    setCurrentCoords({ lat: bakuLat, lng: bakuLng });
    setResolvedAddress("JW Marriott Absheron Baku, 674 Azadliq Square");
    setResolvedLocationName("JW Marriott Absheron Baku");
    setResolvedLocationId("loc-jw-marriott");

    if (markerRef.current && leafletModuleRef.current) {
      markerRef.current.setLatLng([bakuLat, bakuLng]);
      markerRef.current.setIcon(createPinIcon(leafletModuleRef.current, true));
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([bakuLat, bakuLng], 15, { duration: 1.0 });
    }
  }, [createPinIcon]);

  // Select a curated hotspot directly
  const handleSelectHotspot = useCallback(
    (spot: MapHotspot) => {
      setCurrentCoords({ lat: spot.lat, lng: spot.lng });
      setResolvedAddress(spot.address);
      setResolvedLocationName(spot.name);
      setResolvedLocationId(spot.id);

      if (markerRef.current && leafletModuleRef.current) {
        markerRef.current.setLatLng([spot.lat, spot.lng]);
        markerRef.current.setIcon(createPinIcon(leafletModuleRef.current, true));
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([spot.lat, spot.lng], 16, { duration: 1.0 });
      }
    },
    [createPinIcon]
  );

  // Initialize Leaflet Map with boundary constraints and curated hotspots
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;
      leafletModuleRef.current = L;

      // Clean existing instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (!mapContainerRef.current) return;

      const initialCheck = checkLocationServiceability(currentCoords.lat, currentCoords.lng);
      const pinIcon = createPinIcon(L, initialCheck.isServiceable);

      // Initialize map locked strictly to Azerbaijan bounds
      const map = L.map(mapContainerRef.current, {
        center: [currentCoords.lat, currentCoords.lng],
        zoom: 14,
        minZoom: 7,
        maxZoom: 18,
        maxBounds: AZERBAIJAN_MAP_BOUNDS,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
      });

      // CartoDB Voyager clean raster tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Render Curated Hotspot POIs on the map
      const hotspotLayer = L.layerGroup().addTo(map);
      MAP_HOTSPOTS.forEach((spot) => {
        const borderColor =
          spot.category === "resort"
            ? "#10b981"
            : spot.category === "landmark"
            ? "#8b5cf6"
            : "#0284c7";

        const spotMarkerIcon = L.divIcon({
          className: "custom-hotspot-pin",
          html: `
            <div style="
              width: 28px;
              height: 28px;
              border-radius: 9999px;
              background: #ffffff;
              border: 2px solid ${borderColor};
              box-shadow: 0 4px 12px rgba(0,0,0,0.18);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              cursor: pointer;
              transform: translate(-50%, -50%);
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            ">
              ${spot.icon}
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const spotMarker = L.marker([spot.lat, spot.lng], { icon: spotMarkerIcon }).addTo(hotspotLayer);
        spotMarker.bindTooltip(
          `
            <div style="font-family: inherit; font-size: 11px; padding: 2px 4px;">
              <div style="font-weight: 700; color: #0f172a;">${spot.name}</div>
              <div style="font-size: 10px; color: #64748b; margin-top: 1px;">${spot.badge} • ${spot.address}</div>
            </div>
          `,
          { direction: "top", offset: [0, -16], opacity: 0.95 }
        );

        spotMarker.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          handleSelectHotspot(spot);
        });
      });

      // Add draggable main destination pin
      const marker = L.marker([currentCoords.lat, currentCoords.lng], {
        icon: pinIcon,
        draggable: true,
      }).addTo(map);

      // Marker drag live feedback (changes to warning pin dynamically if over water/border)
      marker.on("drag", () => {
        const position = marker.getLatLng();
        const check = checkLocationServiceability(position.lat, position.lng);
        marker.setIcon(createPinIcon(L, check.isServiceable));
      });

      // Marker dragend event (resolves coords and updates state)
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        const check = checkLocationServiceability(position.lat, position.lng);
        marker.setIcon(createPinIcon(L, check.isServiceable));
        setCurrentCoords({ lat: position.lat, lng: position.lng });
        performReverseGeocode(position.lat, position.lng);
      });

      // Map click event to move pin
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        const check = checkLocationServiceability(lat, lng);
        marker.setLatLng([lat, lng]);
        marker.setIcon(createPinIcon(L, check.isServiceable));
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

  // Debounced search places via internal API route
  const fetchSearchResults = useCallback(
    async (query: string) => {
      if (!query.trim() || query.trim().length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(
          `/api/transfer/places?q=${encodeURIComponent(
            query.trim()
          )}&airport=${airportCode}&lang=${language.toLowerCase()}`,
          { signal: AbortSignal.timeout(6000) }
        );

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.warn("Location search error:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [airportCode, language]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (!query.trim() || query.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(query);
    }, 250);
  };

  // Select a search result
  const selectSearchResult = (item: {
    title: string;
    subtitle?: string;
    address?: string;
    lat: number;
    lng: number;
    locationId?: string;
  }) => {
    setCurrentCoords({ lat: item.lat, lng: item.lng });
    setResolvedAddress(item.address || item.title);
    setResolvedLocationName(item.title);
    setResolvedLocationId(item.locationId);
    setSearchResults([]);
    setSearchQuery("");

    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([item.lat, item.lng]);
      if (leafletModuleRef.current) {
        markerRef.current.setIcon(createPinIcon(leafletModuleRef.current, true));
      }
      mapInstanceRef.current.flyTo([item.lat, item.lng], 15, {
        duration: 1.2,
      });
    }
  };

  // Clean up search timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
    if (!serviceability.isServiceable) return;

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
            className="rounded-full p-1.5 text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
              onChange={(e) => handleSearchChange(e.target.value)}
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
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                    onClick={() => selectSearchResult(item)}
                    className="w-full px-3.5 py-2 text-left hover:bg-sky-50 flex items-center gap-2.5 transition-colors border-b border-slate-50 last:border-0 cursor-pointer"
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-sky-500" />
              <span>{mp.quickShortcuts}</span>
            </span>
            {quickShortcuts.map((sc) => (
              <button
                key={sc.name}
                type="button"
                onClick={() =>
                  selectSearchResult({
                    title: sc.name,
                    address: sc.query,
                    lat: sc.lat,
                    lng: sc.lng,
                    locationId: sc.id,
                  })
                }
                className="rounded-lg bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-sky-700 whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer"
              >
                {sc.name}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ INTERACTIVE MAP AREA */}
        <div className="relative flex-1 w-full bg-slate-100 overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Top Overlays */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-[400] pointer-events-none">
            {/* Curated Hotspots Badge */}
            <div className="pointer-events-auto rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white shadow-lg flex items-center gap-1.5 border border-white/10">
              <Building2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{mp.curatedPlaces || "Hotspots Active"}</span>
              <span className="ml-0.5 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300 border border-emerald-400/30">
                {MAP_HOTSPOTS.length}
              </span>
            </div>

            {/* Floating Drag Hint */}
            <div className="hidden sm:flex rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white shadow-lg items-center gap-1.5 border border-white/10">
              <Navigation className="h-3 w-3 text-sky-400 animate-pulse" />
              <span>{mp.dragHint}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ BOTTOM DETAILS & ACTIONS BAR */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0 space-y-3 shadow-lg">
          {/* Unserviceable Warning Banner (if Caspian Sea or border clicked) */}
          {!serviceability.isServiceable && (
            <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900 text-xs animate-fadeIn">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[11px] sm:text-xs text-rose-900 flex items-center gap-1.5">
                    <span>
                      {serviceability.status === "water"
                        ? "🌊 Caspian Sea Water Location"
                        : mp.unserviceableWarning}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-rose-700 truncate sm:whitespace-normal">
                    {serviceability.message}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetToBaku}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{mp.resetToCenter}</span>
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Resolved Location Text */}
            <div className="flex items-start gap-2.5 min-w-0">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl mt-0.5 transition-colors ${
                  serviceability.isServiceable
                    ? "bg-sky-100 text-sky-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
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
                <h4
                  className={`font-bold text-xs sm:text-sm truncate ${
                    serviceability.isServiceable ? "text-slate-900" : "text-rose-700"
                  }`}
                >
                  {resolvedAddress}
                </h4>

                {serviceability.isServiceable ? (
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
                ) : (
                  <p className="text-[10px] text-rose-500 mt-0.5 font-medium">
                    ⚠️ Drag the pin to any valid street or hotel in Azerbaijan to confirm.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 justify-end shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {mp.cancelButton}
              </button>
              <button
                type="button"
                disabled={!serviceability.isServiceable || isGeocoding}
                onClick={handleConfirm}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                  serviceability.isServiceable && !isGeocoding
                    ? "bg-sky-600 hover:bg-sky-700 text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
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

export default MapLocationPickerModal;
