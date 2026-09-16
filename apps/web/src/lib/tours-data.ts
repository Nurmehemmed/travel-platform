import type { LanguageCode } from "./i18n";

export interface TourItineraryStop {
  time: string;
  title: string;
  desc: string;
  highlight?: string;
  image?: string;
}

export interface TourDetailData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  duration: string;
  durationHours: number;
  groupSize: string;
  maxGuests: number;
  price: number; // USD base
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  badge?: string | null;
  badgeColor?: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: "City" | "Day Trip" | "Overnight" | "Adventure";
  heroImage: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: {
    name: string;
    address: string;
    instructions: string;
    lat: number;
    lng: number;
  };
  itinerary: TourItineraryStop[];
  faqs: { q: string; a: string }[];
  tags: string[];
}

export const TOURS_CATALOG: TourDetailData[] = [
  {
    id: "t1",
    slug: "baku-old-city-walking-tour",
    title: "Baku Old City Walking Tour (Icherisheher)",
    tagline: "Medieval Palaces, Secret Alleys & Caspian Sea Panoramas",
    desc: "Step back 1,000 years into the UNESCO-listed heart of Azerbaijan. Wander through narrow cobblestone alleys, visit the 12th-century Maiden Tower, explore the regal Palace of the Shirvanshahs, and discover ancient caravanserais where Silk Road merchants traded spices and silk.",
    duration: "3 hours",
    durationHours: 3,
    groupSize: "Small Group (Max 10)",
    maxGuests: 10,
    price: 25,
    originalPrice: 35,
    rating: 4.9,
    reviewCount: 318,
    badge: "Bestseller",
    badgeColor: "bg-amber-500 text-[#061225]",
    difficulty: "Easy",
    category: "City",
    heroImage: "/images/baku-maiden-tower-wide.jpg",
    gallery: [
      "/images/baku-maiden-tower-wide.jpg",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    ],
    highlights: [
      "Climb the 12th-century Maiden Tower for 360° views of Baku Bay",
      "Explore the 15th-century Shirvanshahs Palace royal chambers & hamam ruins",
      "Sip traditional black tea in a restored medieval Silk Road Caravanserai",
      "Discover the Miniature Books Museum with Guinness World Record exhibits",
      "Taste authentic Baku tandem-baked Kutab (savory herb & meat pastries)",
    ],
    inclusions: [
      "Licensed English / Arabic / Russian speaking expert historian guide",
      "Skip-the-line entrance tickets to Maiden Tower & Shirvanshahs Palace",
      "Traditional Azerbaijani tea tasting ceremony with local jams (Murabba)",
      "Bottled mineral water throughout the tour",
      "Personal audio whisper headsets for clear guide commentary",
    ],
    exclusions: [
      "Hotel pickup & drop-off (optional add-on)",
      "Gratuities / tips for your guide (discretionary)",
      "Personal souvenir purchases",
    ],
    meetingPoint: {
      name: "Icherisheher Metro Station Square (Near Maiden Tower Gate)",
      address: "Istiglaliyyat Street, Icherisheher, Baku 1005",
      instructions: "Your guide will be holding an orange AddmeTour sign next to the main ancient stone gate arches directly outside the Icherisheher metro exit.",
      lat: 40.3664,
      lng: 49.8315,
    },
    itinerary: [
      {
        time: "10:00 AM",
        title: "Meeting & Double Gates of Old Baku",
        desc: "Meet your guide at Gosha Gala Gapisi (Double Gates), the historic ceremonial entry point into the fortress walls.",
        highlight: "Ancient fortress architecture & intro history",
      },
      {
        time: "10:30 AM",
        title: "Palace of the Shirvanshahs Complex",
        desc: "Walk through the medieval throne room, royal mausoleum, Divankhana pavilion, and ancient keyhole bathhouses.",
        highlight: "UNESCO World Heritage Crown Jewel",
      },
      {
        time: "11:30 AM",
        title: "Miniature Books Museum & Artist Alleys",
        desc: "Stroll through blooming pomegranate courtyards and visit the world's only museum of micro-books.",
        highlight: "Guinness World Record collection",
      },
      {
        time: "12:15 PM",
        title: "Maiden Tower (Giz Galasi) & Rooftop Panorama",
        desc: "Ascend the iconic 8-story cylinder tower overlooking the Caspian boulevard and modern Flame Towers skyline.",
        highlight: "Legendary 360° Baku Bay viewpoint",
      },
      {
        time: "12:45 PM",
        title: "Caravanserai Tea & Local Kutab Tasting",
        desc: "Relax in a 14th-century merchant inn courtyard with piping hot mountain thyme tea, candied walnut jam, and fresh kutab pastries.",
        highlight: "Authentic Azerbaijani hospitality",
      },
    ],
    faqs: [
      {
        q: "Is this tour suitable for children and seniors?",
        a: "Yes! The walking pace is relaxed and gentle. The Old City streets are mostly pedestrianized cobblestone with plenty of shaded resting spots.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable flat walking shoes are strongly recommended for historical cobblestone streets. Casual comfortable attire is fine.",
      },
      {
        q: "What is your cancellation policy?",
        a: "100% full refund if cancelled up to 24 hours prior to tour departure time.",
      },
    ],
    tags: ["Bestseller", "History", "Culture", "UNESCO", "Walking Tour"],
  },
  {
    id: "t2",
    slug: "absheron-peninsula-day-trip",
    title: "Absheron Peninsula Fire & Castles Tour",
    tagline: "Ateshgah Fire Temple, Yanar Dag Burning Mountain & Mardakan Castle",
    desc: "Journey into the ancient Zoroastrian heartland of the Land of Fire. Witness flames leaping continuously from the hillsides of Yanar Dag, explore the 17th-century Ateshgah Fire Temple where Indian and Persian pilgrims worshiped eternal gas vents, and see medieval coastal defense fortresses.",
    duration: "6 hours",
    durationHours: 6,
    groupSize: "Small Group (Max 8)",
    maxGuests: 8,
    price: 65,
    originalPrice: 85,
    rating: 4.8,
    reviewCount: 142,
    badge: "Popular",
    badgeColor: "bg-brand-800 text-white",
    difficulty: "Easy",
    category: "Day Trip",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    highlights: [
      "Stand before the eternal natural gas flames of Yanar Dag (Burning Mountain)",
      "Explore the fortified stone chambers of Ateshgah Zoroastrian Temple",
      "Visit the 14th-century quadrilateral fortress of Mardakan",
      "Drive along the Absheron Caspian coastal highway with panoramic desert views",
      "Enjoy traditional Azerbaijani tea with saffron pastries",
    ],
    inclusions: [
      "Round-trip air-conditioned Mercedes transport with professional driver",
      "Licensed guide throughout the journey",
      "Entrance tickets to Ateshgah Fire Temple & Yanar Dag Nature Reserve",
      "Bottled spring water and traditional snacks",
    ],
    exclusions: [
      "Lunch at local restaurant (optional add-on available)",
      "Personal expenses and gratuities",
    ],
    meetingPoint: {
      name: "Complimentary Baku Hotel Pickup & Drop-off",
      address: "Your Baku Hotel / Accommodation",
      instructions: "Our driver and guide will meet you in your hotel lobby or apartment entrance in a branded vehicle.",
      lat: 40.4093,
      lng: 49.8671,
    },
    itinerary: [
      {
        time: "09:30 AM",
        title: "Hotel Pickup & Scenic Coastal Drive",
        desc: "Morning pickup from your Baku hotel in a comfortable Mercedes vehicle, heading east along the Caspian coastline.",
        highlight: "Scenic Absheron views",
      },
      {
        time: "10:30 AM",
        title: "Ateshgah Fire Worshippers Temple (Surakhani)",
        desc: "Tour the pentagonal walled temple complex, exploring prayer cells of ancient Hindu, Sikh, and Zoroastrian pilgrims.",
        highlight: "Sacred eternal flame hearth",
      },
      {
        time: "12:15 PM",
        title: "Medieval Mardakan Quadrangular Castle",
        desc: "Explore a 12th-century defensive stronghold built by the Shirvanshah ruler Akhsitan I.",
        highlight: "Medieval tower architecture",
      },
      {
        time: "01:15 PM",
        title: "Yanar Dag Burning Mountain",
        desc: "Marvel at natural gas seeping continuously from a 10-metre hillside pocket that has burned for over a millennium.",
        highlight: "The true Land of Fire spectacle",
      },
      {
        time: "03:00 PM",
        title: "Return Transfer to Baku",
        desc: "Relax on the return ride with hotel drop-off included.",
        highlight: "Door-to-door comfort",
      },
    ],
    faqs: [
      {
        q: "Does the tour operate year-round?",
        a: "Yes, Yanar Dag and Ateshgah are open 365 days a year, rain or shine.",
      },
      {
        q: "Can I bring luggage if I have an evening flight?",
        a: "Yes! Our vehicles have ample luggage capacity. We can drop you off directly at GYD Airport after the tour if requested.",
      },
    ],
    tags: ["Land of Fire", "Zoroastrian", "Day Trip", "Family Friendly"],
  },
  {
    id: "t3",
    slug: "sheki-cultural-journey",
    title: "Sheki & Caucasus Silk Road 2-Day Journey",
    tagline: "Khan Palace Stained Glass, Medieval Caravanserai & Mountain Highlands",
    desc: "A magical 2-day expedition through the Great Caucasus foothills to Sheki—Azerbaijan's ancient craft and Silk Road capital. Marvel at Sheki Khan's Palace with its mortar-free stained glass (Shebeke), spend time in authentic 18th-century caravanserais, and visit the oldest Caucasian Albanian Church in Kish.",
    duration: "2 Days / 1 Night",
    durationHours: 32,
    groupSize: "Small Group (Max 6)",
    maxGuests: 6,
    price: 149,
    originalPrice: 180,
    rating: 5.0,
    reviewCount: 87,
    badge: "Must Visit",
    badgeColor: "bg-emerald-600 text-white",
    difficulty: "Moderate",
    category: "Overnight",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
    ],
    highlights: [
      "Sheki Khan's Summer Palace with world-famous Shebeke stained-glass windows",
      "Overnight stay in Sheki with mountain views",
      "Explore the 1st-century Caucasian Albanian Church in alpine Kish village",
      "Visit traditional Sheki Halva (Piti) workshops and Silk Karvansaray",
      "Scenic mountain drive through Shamakhi and Ismayilli forests",
    ],
    inclusions: [
      "1 night accommodation in a 4-star boutique hotel in Sheki with breakfast",
      "Private Mercedes minivan transport for both days",
      "Licensed tour guide for the entire 2 days",
      "All entrance fees to Sheki Khan Palace, Caravanserai, and Kish Church",
      "Traditional Sheki Piti clay-pot lunch tasting",
    ],
    exclusions: [
      "Dinner on Day 1 (guide will recommend top local restaurants)",
      "Personal shopping (silk scarves, ceramics)",
    ],
    meetingPoint: {
      name: "Hotel Pickup across Baku",
      address: "Your Baku Hotel",
      instructions: "Complimentary pickup from any hotel or address in Baku between 07:30 and 08:00 AM.",
      lat: 41.1919,
      lng: 47.1706,
    },
    itinerary: [
      {
        time: "Day 1 · 08:00 AM",
        title: "Departure from Baku & Juma Mosque Shamakhi",
        desc: "Scenic morning drive west, stopping at the historic 8th-century Shamakhi Juma Mosque and lush Ismayilli forests.",
        highlight: "Silk Road heritage route",
      },
      {
        time: "Day 1 · 01:30 PM",
        title: "Arrival in Sheki & Traditional Piti Lunch",
        desc: "Taste the legendary Sheki Piti stew, slow-cooked in clay pots with lamb, chestnuts, and saffron.",
        highlight: "Culinary heritage experience",
      },
      {
        time: "Day 1 · 03:00 PM",
        title: "Sheki Khan's Palace & Upper Caravanserai",
        desc: "Admire 5,000 interlocking pieces of colored glass built without a single nail or drop of glue.",
        highlight: "UNESCO World Heritage wonder",
      },
      {
        time: "Day 2 · 09:30 AM",
        title: "Kish Alpine Village & Ancient Albanian Church",
        desc: "Ascend to Kish village in the Caucasus highlands and visit the oldest surviving Christian church in the Caucasus.",
        highlight: "1st-century architectural relic",
      },
      {
        time: "Day 2 · 02:00 PM",
        title: "Sheki Halva Masterclass & Return to Baku",
        desc: "Watch local confectioners make crispy hazelnut halva before a relaxing scenic drive back to Baku.",
        highlight: "Authentic souvenir shopping",
      },
    ],
    faqs: [
      {
        q: "Can I upgrade to a single room?",
        a: "Yes, single supplement upgrades are available during booking.",
      },
      {
        q: "What is the luggage allowance?",
        a: "One full-size suitcase plus a personal carry-on per passenger.",
      },
    ],
    tags: ["Overnight", "Silk Road", "Mountains", "UNESCO", "Food & Wine"],
  },
  {
    id: "t4",
    slug: "gobustan-petroglyphs-mud-volcanoes",
    title: "Gobustan Mud Volcanoes & 40,000-Year Petroglyphs",
    tagline: "Prehistoric Rock Art, Active Mud Craters & Caspian Bibi-Heybat",
    desc: "Witness two of the most extraordinary natural and archaeological wonders on Earth: nearly 50% of the world's mud volcanoes and UNESCO-protected 40,000-year-old petroglyphs carved by prehistoric hunter-gatherers.",
    duration: "5 hours",
    durationHours: 5,
    groupSize: "Small Group (Max 8)",
    maxGuests: 8,
    price: 55,
    originalPrice: 70,
    rating: 4.9,
    reviewCount: 167,
    badge: "Top Rated",
    badgeColor: "bg-brand-800 text-white",
    difficulty: "Easy",
    category: "Day Trip",
    heroImage: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    highlights: [
      "Off-road 4x4 Soviet Lada ride to active bubbling mud volcano craters",
      "UNESCO Gobustan National Park & Open-Air Rock Art Museum",
      "Touch the ancient musical rock 'Gaval Dash' used in shamanic rituals",
      "Visit the majestic Bibi-Heybat Mosque overlooking the Caspian oil fields",
      "World's first industrially drilled oil well site in Bibiheybat",
    ],
    inclusions: [
      "Hotel pickup and drop-off in Baku",
      "Dedicated licensed tour guide",
      "Admission ticket to Gobustan Museum & Rock Art Reserve",
      "4x4 off-road vehicle ride to mud volcano hills",
      "Bottled mineral water",
    ],
    exclusions: [
      "Lunch (stop at seaside fish restaurant available upon request)",
      "Personal expenses",
    ],
    meetingPoint: {
      name: "Hotel Pickup across Baku",
      address: "Your Baku Hotel",
      instructions: "Pickups start at 09:30 AM from your hotel lobby.",
      lat: 40.0967,
      lng: 49.3808,
    },
    itinerary: [
      {
        time: "09:30 AM",
        title: "Hotel Pickup & Drive South Along Caspian Sea",
        desc: "Scenic coastal drive past offshore oil platforms and coastal hills.",
        highlight: "Caspian Sea coastline",
      },
      {
        time: "10:30 AM",
        title: "Gobustan State Historical & Artistic Reserve",
        desc: "Interactive 3D museum visit followed by a guided walk among 6,000 prehistoric rock petroglyphs.",
        highlight: "40,000 years of human history",
      },
      {
        time: "12:00 PM",
        title: "Off-Road 4x4 to Bubbling Mud Volcanoes",
        desc: "Thrilling off-road transfer to the lunar volcanic plateau. Watch cold mineral mud bubbles erupt in real time.",
        highlight: "Extraterrestrial lunar landscape",
      },
      {
        time: "01:30 PM",
        title: "Bibi-Heybat Mosque & Historic Oil Well",
        desc: "Visit the stunning emerald-domed mosque and the location of the world's first oil well drilled in 1846.",
        highlight: "Islamic architecture & oil heritage",
      },
      {
        time: "02:30 PM",
        title: "Return Hotel Drop-Off in Baku",
        desc: "Return to your hotel with memories of a geological wonder.",
        highlight: "Comfortable return",
      },
    ],
    faqs: [
      {
        q: "Can we touch the mud in the volcanoes?",
        a: "Yes! The mud is cold, highly mineralized, and famous for skin healing properties.",
      },
      {
        q: "What shoes should I wear?",
        a: "Wear sneakers or shoes you don't mind getting dusty or slightly muddy around the volcano plateau.",
      },
    ],
    tags: ["Nature", "Archaeology", "Mud Volcanoes", "UNESCO", "Must See"],
  },
  {
    id: "t5",
    slug: "caucasus-mountain-highlands",
    title: "Great Caucasus Mountain Highlands (Gabala & Lahij)",
    tagline: "Mountain Cable Cars, Ancient Copper Artisans & Nohur Lake",
    desc: "Escape the city into the majestic Great Caucasus alpine ranges. Ascend the Tufandag Mountain cable cars to 1,920 meters, stroll around mirror-like Nohur Lake, and visit the remote 5th-century copper-smithing village of Lahij perched above deep mountain gorges.",
    duration: "Full Day (11 hours)",
    durationHours: 11,
    groupSize: "Small Group (Max 8)",
    maxGuests: 8,
    price: 85,
    originalPrice: 110,
    rating: 4.8,
    reviewCount: 94,
    badge: "Mountain Escape",
    badgeColor: "bg-sky-600 text-white",
    difficulty: "Moderate",
    category: "Adventure",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    ],
    highlights: [
      "Tufandag Mountain Resort panoramic cable car ride across 4 alpine stations",
      "Explore the ancient cobblestone artisan village of Lahij in the canyon",
      "Relax and pedal-boat on the tranquil waters of Nohur Mountain Lake",
      "Walk over the thrilling suspension bridge above Girdimanchay river canyon",
      "Taste fresh Caucasus forest honey and wild mountain herbal tea",
    ],
    inclusions: [
      "Hotel pickup and drop-off in Baku",
      "Premium Mercedes transport with WiFi and air-conditioning",
      "Professional licensed mountain guide",
      "Tufandag Mountain cable car ticket (all 4 ropeway lines)",
      "Traditional mountain tea and sweet snacks",
    ],
    exclusions: [
      "Lunch at forest lakeside restaurant",
      "Optional shooting club or quad bike rentals in Gabala",
    ],
    meetingPoint: {
      name: "Hotel Pickup in Baku",
      address: "Your Hotel",
      instructions: "Morning pickup at 08:00 AM.",
      lat: 40.9859,
      lng: 47.8488,
    },
    itinerary: [
      {
        time: "08:00 AM",
        title: "Departure from Baku towards Great Caucasus",
        desc: "Scenic morning drive passing through Muganly mountain pass with panoramic cloud photo stops.",
        highlight: "Muganly Pass viewpoints",
      },
      {
        time: "10:30 AM",
        title: "Lahij Medieval Artisan Village & Suspension Bridge",
        desc: "Cross the suspension bridge into Lahij, visiting 80th-generation coppersmith workshops and cobblestone lanes.",
        highlight: "Ancient craftsmanship & canyon scenery",
      },
      {
        time: "01:00 PM",
        title: "Nohur Mountain Lake & Lakeside Lunch",
        desc: "Enjoy lunch beside serene Nohur Lake surrounded by emerald pine mountains.",
        highlight: "Fresh river trout & kebabs",
      },
      {
        time: "02:30 PM",
        title: "Tufandag Mountain Cable Car Ascent",
        desc: "Ride the cable car to alpine peaks for breathtaking views of the Greater Caucasus summits.",
        highlight: "Panoramic 1,920m peak views",
      },
      {
        time: "05:00 PM",
        title: "Scenic Return Drive to Baku",
        desc: "Relaxing evening drive back to Baku with hotel drop-off around 08:00 PM.",
        highlight: "Sunset over Caucasus foothills",
      },
    ],
    faqs: [
      {
        q: "What is the temperature in the mountains?",
        a: "Mountain temperatures are usually 5°C to 10°C cooler than Baku. Bringing a light jacket or sweater is recommended.",
      },
    ],
    tags: ["Mountains", "Nature", "Cable Car", "Highlands", "Adventure"],
  },
  {
    id: "t6",
    slug: "modern-baku-architecture-tour",
    title: "Modern Baku & Futuristic Architecture Tour",
    tagline: "Zaha Hadid's Heydar Aliyev Center, Flame Towers & Caspian Night Lights",
    desc: "Discover Baku's dramatic 21st-century transformation from an oil capital to an architectural wonderland. Explore Zaha Hadid's fluid curves at the Heydar Aliyev Center, the towering glass Flame Towers, the iconic Carpet Museum, and the Caspian Waterfront promenade.",
    duration: "4 hours",
    durationHours: 4,
    groupSize: "Small Group (Max 12)",
    maxGuests: 12,
    price: 35,
    originalPrice: 45,
    rating: 4.7,
    reviewCount: 98,
    badge: "Architecture",
    badgeColor: "bg-brand-800 text-white",
    difficulty: "Easy",
    category: "City",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=80",
      "/images/baku-maiden-tower-wide.jpg",
    ],
    highlights: [
      "Zaha Hadid masterpiece — Heydar Aliyev Cultural Center photo stops & interior",
      "Highland Park (Dagustu Park) panoramic viewpoint overlooking the entire Baku Bay",
      "Iconic Baku Flame Towers up-close with modern glass facade",
      "Azerbaijan Carpet Museum built in the shape of a rolled carpet",
      "Little Venice water canals and Caspian seaside boulevard",
    ],
    inclusions: [
      "Private Mercedes transport with hotel pickup & drop-off",
      "Professional licensed architectural guide",
      "Admission ticket to Heydar Aliyev Center exhibitions",
      "Funicular / Highland Park tickets",
      "Bottled mineral water",
    ],
    exclusions: [
      "Food & drinks",
      "Personal shopping",
    ],
    meetingPoint: {
      name: "Baku Hotel Pickup or Heydar Aliyev Center Main Plaza",
      address: "Heydar Aliyev Center, 1 Heydar Aliyev Ave, Baku",
      instructions: "Pick up from your Baku hotel or meet directly at the center's main plaza beside the 'I Love Baku' sign.",
      lat: 40.3959,
      lng: 49.8678,
    },
    itinerary: [
      {
        time: "02:00 PM",
        title: "Heydar Aliyev Center & Zaha Hadid Park",
        desc: "Marvel at one of the world's most famous fluid curved buildings and explore vintage car and Azerbaijani cultural exhibits.",
        highlight: "World Architecture of the Year Winner",
      },
      {
        time: "03:30 PM",
        title: "Baku Boulevard & Rolled Carpet Museum",
        desc: "Walk along the Caspian seaside park, see Little Venice canals and the iconic Carpet Museum.",
        highlight: "Modern waterfront design",
      },
      {
        time: "04:30 PM",
        title: "Highland Park & Flame Towers",
        desc: "Ride the funicular to Baku's highest viewpoint for a panoramic look at the Caspian Bay and the Flame Towers.",
        highlight: "Breathtaking Baku skyline panorama",
      },
    ],
    faqs: [
      {
        q: "Is this tour great for photography?",
        a: "Absolutely! This tour is designed with the best lighting angles for architectural and landscape photography.",
      },
    ],
    tags: ["Architecture", "Modern", "Photography", "Flame Towers", "Zaha Hadid"],
  },
];

export function getTourBySlug(slug: string): TourDetailData | undefined {
  return TOURS_CATALOG.find((t) => t.slug === slug);
}

export function getAllTourSlugs(): string[] {
  return TOURS_CATALOG.map((t) => t.slug);
}
