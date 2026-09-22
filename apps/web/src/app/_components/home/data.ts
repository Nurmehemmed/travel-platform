export interface TourItem {
  id: string;
  slug: string;
  badge?: string | null;
  badgeColor?: string;
  image: string;
  tags: string[];
  rating: number;
  reviews: number;
  title: string;
  desc: string;
  duration: string;
  groupSize: string;
  originalPrice?: number | null;
  price: number;
  category: "City" | "Day Trip" | "Overnight" | "Adventure" | string;
}

export const TOUR_FILTERS = ["All", "City", "Day Trip", "Overnight", "Adventure"] as const;

export const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85&auto=format",
    alt: "Great Caucasus Mountains in Azerbaijan",
    badge: "TripAdvisor Travelers' Choice · Baku, Azerbaijan",
    title: "Into the Great Caucasus",
    subtitle: "Highland villages, Silk Road caravansaries, and mountain air — Azerbaijan beyond the city.",
    primaryCta: { text: "Explore Our Tours", href: "#tours" },
    secondaryCta: { text: "Airport Transfer", href: "/transfer" },
  },
  {
    image: "/images/baku-maiden-tower-wide.jpg",
    alt: "Baku Maiden Tower and Old City Icherisheher",
    badge: "UNESCO Heritage & Modern Marvels",
    title: "Enchanting Baku & Caspian Shores",
    subtitle: "Cobblestone alleys of ancient Icherisheher, dazzling Flame Towers, and seaside boulevard sunsets.",
    primaryCta: { text: "Discover Baku Tours", href: "#tours" },
    secondaryCta: { text: "Apply for e-Visa", href: "/visa" },
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=85&auto=format",
    alt: "Gobustan and Land of Sacred Fire Azerbaijan",
    badge: "Mystical Land of Fire · Ancient Wonders",
    title: "Gobustan & The Land of Sacred Fire",
    subtitle: "Active bubbling mud volcanoes, 40,000-year-old prehistoric rock art, and eternal burning flames.",
    primaryCta: { text: "Book Day Trips", href: "#tours" },
    secondaryCta: { text: "Fast e-Visa 3h", href: "/visa" },
  },
];

export const TOURS: TourItem[] = [
  {
    id: "t1",
    slug: "baku-old-city-walking-tour",
    badge: "Bestseller",
    badgeColor: "bg-[#f59e0b] text-[#061225] font-bold shadow-sm",
    image: "/images/baku-old-city.jpg",
    tags: ["Walking", "History", "Culture"],
    rating: 4.9,
    reviews: 214,
    title: "Baku Old City Walking Tour",
    desc: "Wander through the UNESCO-listed Icherisheher (Old City), discover ancient caravanserais and hidden courtyards.",
    duration: "3 hours",
    groupSize: "Up to 10",
    originalPrice: 35,
    price: 25,
    category: "City",
  },
  {
    id: "t2",
    slug: "absheron-peninsula-day-trip",
    badge: "Popular",
    badgeColor: "bg-brand-800 text-white",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    tags: ["History", "Nature", "Private"],
    rating: 4.8,
    reviews: 142,
    title: "Absheron Peninsula Day Trip",
    desc: "Explore the Ateshgah Fire Temple, the otherworldly Yanar Dag, and coastal landscapes unique to Azerbaijan.",
    duration: "8 hours",
    groupSize: "Up to 8",
    originalPrice: null,
    price: 65,
    category: "Day Trip",
  },
  {
    id: "t3",
    slug: "sheki-cultural-journey",
    badge: "Limited Deal",
    badgeColor: "bg-red-600 text-white",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    tags: ["Overnight", "Culture", "Scenery"],
    rating: 5.0,
    reviews: 87,
    title: "Sheki Cultural Journey",
    desc: "Drive north into the Caucasus foothills to Sheki's 18th-century Khan Palace and medieval caravanserai.",
    duration: "2 days",
    groupSize: "Up to 6",
    originalPrice: 180,
    price: 149,
    category: "Overnight",
  },
  {
    id: "t4",
    slug: "modern-baku-architecture-tour",
    badge: null,
    badgeColor: "",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    tags: ["Architecture", "Photography", "Walking"],
    rating: 4.7,
    reviews: 98,
    title: "Modern Baku Architecture Tour",
    desc: "Discover Baku's transformation from Soviet city to futuristic skyline — the Flame Towers and Heydar Aliyev Center.",
    duration: "4 hours",
    groupSize: "Up to 12",
    originalPrice: null,
    price: 35,
    category: "City",
  },
  {
    id: "t5",
    slug: "gobustan-petroglyphs-mud-volcanoes",
    badge: "Top Rated",
    badgeColor: "bg-brand-800 text-white",
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
    tags: ["Nature", "Archaeology", "Unique"],
    rating: 4.9,
    reviews: 167,
    title: "Gobustan Petroglyphs & Mud Volcanoes",
    desc: "Visit one of the world's oldest art galleries — 20,000-year-old rock carvings, then witness Azerbaijan's famous mud volcanoes.",
    duration: "6 hours",
    groupSize: "Up to 8",
    originalPrice: 70,
    price: 55,
    category: "Day Trip",
  },
  {
    id: "t6",
    slug: "caucasus-mountain-highlands",
    badge: "Adventure",
    badgeColor: "bg-white text-slate-900 shadow-sm font-semibold",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    tags: ["Adventure", "Mountains", "Villages"],
    rating: 4.8,
    reviews: 61,
    title: "Caucasus Mountain Highlands",
    desc: "Drive north into the Great Caucasus range to the medieval village of Lahij, the mountain town of Gabala, and dramatic highland scenery above 2,000 metres.",
    duration: "Full day",
    groupSize: "Up to 6",
    originalPrice: 95,
    price: 85,
    category: "Adventure",
  },
];

export const DESTINATIONS = [
  {
    slug: "baku",
    name: "Baku",
    subtitle: "City of Winds",
    tours: 12,
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1000&q=80",
  },
  {
    slug: "absheron",
    name: "Absheron",
    subtitle: "Fire & Legend",
    tours: 5,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80",
  },
  {
    slug: "sheki",
    name: "Sheki",
    subtitle: "Silk Road Heritage",
    tours: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80",
  },
  {
    slug: "gobustan",
    name: "Gobustan",
    subtitle: "Ancient Rock Art",
    tours: 3,
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1000&q=80",
  },
];

export const TESTIMONIALS = [
  {
    id: "rev-1",
    quote:
      "Our guide Elchin was extraordinary — deeply knowledgeable, funny, and genuinely passionate about Baku's history. The Old City tour felt like walking through living pages of a history book. Absolutely book this.",
    initials: "SM",
    name: "Sarah Mitchell",
    subtitle: "United Kingdom · Baku Old City Walking Tour",
    rating: 5,
  },
  {
    id: "rev-2",
    quote:
      "We did the Absheron Peninsula tour and couldn't believe how much was packed into one day. The fire temple at sunset was one of the most beautiful things I've ever seen. AddmeTour made it seamless.",
    initials: "MF",
    name: "Marco Ferretti",
    subtitle: "Italy · Absheron Peninsula Day Trip",
    rating: 5,
  },
  {
    id: "rev-3",
    quote:
      "The Gobustan mud volcanoes were unlike anything I've seen anywhere in the world. Our driver was punctual, the guide was excellent, and the whole experience was perfectly organized. Highly recommended.",
    initials: "YT",
    name: "Yuki Tanaka",
    subtitle: "Japan · Gobustan Petroglyphs & Mud Volcanoes",
    rating: 5,
  },
];

export const DURATIONS = ["Any duration", "Half day (1–4h)", "Full day (5–8h)", "Multi-day"] as const;
