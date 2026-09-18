/**
 * @file airports.ts
 * @description Airport registry and query helper functions.
 */

import { AirportCode, AirportInfo } from "./types";

export const AIRPORTS: AirportInfo[] = [
  {
    code: "GYD",
    name: "Heydar Aliyev International",
    city: "Baku",
    fullName: "Heydar Aliyev International Airport (GYD)",
    lat: 40.4675,
    lng: 50.0469,
  },
  {
    code: "GJA",
    name: "Ganja Airport",
    city: "Ganja",
    fullName: "Ganja Airport (GJA)",
    lat: 40.7419,
    lng: 46.3175,
  },
  {
    code: "NAJ",
    name: "Nakhchivan Airport",
    city: "Nakhchivan",
    fullName: "Nakhchivan Airport (NAJ)",
    lat: 39.1892,
    lng: 45.4594,
  },
];

/** Get airport info by code */
export function getAirportByCode(code: AirportCode): AirportInfo | undefined {
  return AIRPORTS.find((a) => a.code === code);
}
