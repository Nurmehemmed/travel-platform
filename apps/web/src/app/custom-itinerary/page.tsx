import { Metadata } from "next";
import CustomItineraryClient from "./CustomItineraryClient";

export const metadata: Metadata = {
  title: "Custom Azerbaijan & Caucasus Tour Planner | Bespoke Private Itineraries",
  description:
    "Design your dream private journey across Azerbaijan, Georgia, and the Caucasus. Interactive 3-step itinerary builder with instant price estimates and 24/7 VIP concierge.",
  openGraph: {
    title: "Bespoke Caucasus & Azerbaijan Private Tour Planner | AddmeTour",
    description:
      "Craft a tailored private VIP itinerary in 60 seconds. Choose your days, Caucasus destinations, luxury hotels, and private Mercedes chauffeur.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "Great Caucasus Mountains Azerbaijan",
      },
    ],
  },
};

export default function CustomItineraryPage() {
  return <CustomItineraryClient />;
}
