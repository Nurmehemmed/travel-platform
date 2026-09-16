import { constructMetadata } from "@/lib/seo";
import CustomItineraryClient from "./CustomItineraryClient";

export const metadata = constructMetadata({
  title: "Custom Azerbaijan & Caucasus Tour Planner | Bespoke Private Itineraries",
  description:
    "Design your dream private journey across Azerbaijan, Georgia, and the Caucasus. Interactive 3-step itinerary builder with instant price estimates and 24/7 VIP concierge.",
  path: "/custom-itinerary",
  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
});

export default function CustomItineraryPage() {
  return <CustomItineraryClient />;
}
