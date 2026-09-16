import { TourDetailData, TOURS_CATALOG } from "./tours-data";

export interface DestinationHighlight {
  title: string;
  desc: string;
  image: string;
}

export interface DestinationDetailData {
  slug: string;
  name: string;
  subtitle: string;
  heroImage: string;
  gallery: string[];
  distanceFromBaku: string;
  elevation: string;
  bestSeason: string;
  idealStay: string;
  overview: string;
  cultureAndHistory: string;
  topHighlights: DestinationHighlight[];
  culinarySpecialties: { name: string; desc: string }[];
  localTips: string[];
  tourSlugs: string[];
}

export const DESTINATIONS_CATALOG: DestinationDetailData[] = [
  {
    slug: "baku",
    name: "Baku",
    subtitle: "The Paris of the East & Caspian City of Winds",
    heroImage: "/images/baku-maiden-tower-wide.jpg",
    gallery: [
      "/images/baku-maiden-tower-wide.jpg",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1200&q=80",
    ],
    distanceFromBaku: "Capital City (0 km)",
    elevation: "-28m (Below Sea Level)",
    bestSeason: "April – June, September – November",
    idealStay: "2–4 Days",
    overview:
      "Baku is a breathtaking fusion of ancient UNESCO-protected medieval fortresses and daring 21st-century architectural masterpieces. From the cobblestone labyrinth of Icherisheher to the fluid curves of Zaha Hadid's Heydar Aliyev Center and the glowing Flame Towers, Baku is the dynamic epicenter of the Caspian basin.",
    cultureAndHistory:
      "Inhabited since the Bronze Age, Baku grew into the wealthy capital of the medieval Shirvanshah dynasty. The late 19th-century oil boom transformed it into an opulent European-style metropolis with French and Italian Baroque mansions, known as the 'Paris of the East'.",
    topHighlights: [
      {
        title: "Icherisheher (Old Fortress City)",
        desc: "Medieval walled town featuring the 12th-century Maiden Tower and Palace of the Shirvanshahs.",
        image: "/images/baku-old-city.jpg",
      },
      {
        title: "Heydar Aliyev Cultural Center",
        desc: "Pritzker-prize winning futuristic masterpiece designed by legendary architect Zaha Hadid.",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      },
      {
        title: "Flame Towers & Highland Park",
        desc: "Trio of illuminated glass skyscrapers with 360° panoramic views overlooking the entire Baku Bay.",
        image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&q=80",
      },
      {
        title: "Caspian Seafront Boulevard & Little Venice",
        desc: "Miles of coastal parks, palm trees, shopping malls, and Venetian-style water gondola canals.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Shah Pilaf (Crown Pilaf)", desc: "Fragrant saffron rice with dried fruits and lamb baked inside a golden lavash pastry crust." },
      { name: "Baku Tandem Kutab", desc: "Thin griddled pastry folded with wild herbs, cheese, or minced meat dusted with sumac." },
      { name: "Caspian Sturgeon & Kebab", desc: "Fresh char-grilled Caspian sturgeon fish served with tangy narsharab (pomegranate molasses)." },
    ],
    localTips: [
      "Visit Highland Park around sunset to watch the Flame Towers transition into LED fire animations.",
      "The metro system is ultra-modern, clean, and costs only 0.40 AZN (~$0.24 USD) per ride.",
      "Dress is modern and cosmopolitan throughout Baku; comfortable walking shoes are essential for Old City cobblestones.",
    ],
    tourSlugs: ["baku-old-city-walking-tour", "modern-baku-architecture-tour"],
  },
  {
    slug: "sheki",
    name: "Sheki",
    subtitle: "Silk Road Crafts, Khan Palace & Mountain Hospitality",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    distanceFromBaku: "300 km (approx. 4.5 hours drive)",
    elevation: "650m (Mountain Foothills)",
    bestSeason: "May – October",
    idealStay: "1–2 Days",
    overview:
      "Tucked into the densely forested slopes of the Greater Caucasus, Sheki is Azerbaijan's premier Silk Road heritage city. Famous for its 18th-century Khan Palace with stained-glass Shebeke windows, medieval caravanserais, aromatic clay-pot Piti stew, and nutty Sheki Halva.",
    cultureAndHistory:
      "For centuries, Sheki was a vital trading hub on the Great Silk Road where merchants from China, Persia, and Venice met. The Sheki Khans ruled an independent Khanate, constructing summer and winter palaces renowned for intricate wooden craftsmanship without nails.",
    topHighlights: [
      {
        title: "Sheki Khan's Summer Palace",
        desc: "UNESCO World Heritage palace featuring 5,000 hand-carved colored glass pieces assembled without nails or glue.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      },
      {
        title: "Upper Caravanserai (Yuxari Karvansaray)",
        desc: "Massive 18th-century stone inn with vaulted archways and an authentic stone courtyard.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
      {
        title: "Kish Caucasian Albanian Church",
        desc: "Ancient 1st-century stone church standing in an idyllic alpine village above Sheki.",
        image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Sheki Piti", desc: "Slow-simmered rich stew of lamb, chickpeas, chestnuts, and saffron served in traditional clay pots." },
      { name: "Sheki Halva (Pakhlava)", desc: "Layered crispy rice-flour pastry filled with chopped hazelnuts and soaked in honey-saffron syrup." },
    ],
    localTips: [
      "Buy authentic Kelaghayi (traditional Azerbaijani silk scarves with paisley buta prints) directly from Sheki silk masters.",
      "Stay overnight in Sheki to enjoy the mountain breeze and traditional tea houses in the evening.",
    ],
    tourSlugs: ["sheki-cultural-journey"],
  },
  {
    slug: "gabala",
    name: "Gabala",
    subtitle: "Highland Alpine Cable Cars, Lakes & Ancient Craft Villages",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    distanceFromBaku: "220 km (approx. 3.5 hours drive)",
    elevation: "800m – 1,920m (Alpine Peaks)",
    bestSeason: "Year-Round (Summer Nature & Winter Ski)",
    idealStay: "1–2 Days",
    overview:
      "Gabala is the outdoor adventure and mountain resort capital of Azerbaijan. Home to Tufandag Mountain Resort cable cars, peaceful Nohur Lake surrounded by pine forests, 7 Beauties Waterfalls, and the nearby 5th-century copper-smithing village of Lahij.",
    cultureAndHistory:
      "Gabala was the ancient capital of Caucasian Albania for over 900 years. Today, it combines rich archaeological ruins with 5-star mountain luxury resorts and high-altitude cable ropeways.",
    topHighlights: [
      {
        title: "Tufandag Mountain Resort Cable Cars",
        desc: "Ride 4 interconnected ropeway lines ascending to alpine peaks with 360° views of the Greater Caucasus.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      },
      {
        title: "Nohur Mountain Lake",
        desc: "Scenic emerald lake offering boat rentals, lakeside cafes, and pine forest hiking trails.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      },
      {
        title: "Lahij Medieval Artisan Village",
        desc: "Canyon-perched village famous for centuries-old cobblestones, suspension bridge, and coppersmith masters.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Forest Trout (Qizilbaliq)", desc: "Fresh mountain stream trout pan-seared with wild herb butter and pomegranate." },
      { name: "Mountain Honey & Chestnut Jam", desc: "Raw wildflower Caucasus mountain honey served with freshly baked bread." },
    ],
    localTips: [
      "Bring a light jacket even in mid-summer; temperatures atop Tufandag cable car peak are noticeably cooler.",
      "Pair your visit with a stop in Lahij to purchase handmade copper teapots and plates.",
    ],
    tourSlugs: ["caucasus-mountain-highlands"],
  },
  {
    slug: "gobustan",
    name: "Gobustan",
    subtitle: "Active Mud Volcanoes & 40,000-Year Prehistoric Art",
    heroImage: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    ],
    distanceFromBaku: "65 km (approx. 1 hour drive)",
    elevation: "100m – 300m",
    bestSeason: "March – June, September – November",
    idealStay: "Half-Day / Full-Day Trip",
    overview:
      "Gobustan is an otherworldly archaeological and geological wonderland. It hosts nearly half of all mud volcanoes on Earth and a UNESCO National Reserve with over 6,000 ancient petroglyphs carved during the Ice Age.",
    cultureAndHistory:
      "Stone Age hunter-gatherers lived in the caves of Gobustan when the Caspian Sea was much higher. Their carvings depict shamans, dancing warriors (Yalli dance), reed boats, and long-extinct wild bulls and lions.",
    topHighlights: [
      {
        title: "Bubbling Mud Volcano Plateau",
        desc: "Thrill ride in Soviet 4x4s to watch cold, mineral-rich mud erupt in lunar cones.",
        image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80",
      },
      {
        title: "Gobustan UNESCO Petroglyph Museum",
        desc: "State-of-the-art interactive 3D museum followed by open-air canyon rock art walks.",
        image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Bibiheybat Fresh Caspian Fish", desc: "Seaside roasted kutum and beluga sturgeon served with lavash and fresh lemons." },
    ],
    localTips: [
      "Wear sturdy walking shoes; the volcanic hills are dry and dusty with occasional mud splash areas.",
      "Combine this trip with the Bibi-Heybat Mosque on the coastal road south of Baku.",
    ],
    tourSlugs: ["gobustan-petroglyphs-mud-volcanoes"],
  },
  {
    slug: "absheron",
    name: "Absheron Peninsula",
    subtitle: "Land of Eternal Fire, Zoroastrian Temples & Coastal Castles",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    ],
    distanceFromBaku: "25 km (approx. 35 mins drive)",
    elevation: "Sea Level",
    bestSeason: "Year-Round",
    idealStay: "Half-Day Trip",
    overview:
      "The Absheron Peninsula is where Azerbaijan earned its legendary moniker 'The Land of Fire'. Natural underground gas pockets have fueled perpetual surface flames for millennia, giving rise to ancient Zoroastrian fire temples and medieval defensive castles.",
    cultureAndHistory:
      "Zoroastrian and Hindu pilgrims traveled along the Silk Road to Ateshgah to pray before eternal flames. In the 12th century, the Shirvanshah rulers built a chain of coastal defense towers in Mardakan, Ramana, and Nardaran.",
    topHighlights: [
      {
        title: "Yanar Dag (Burning Mountain)",
        desc: "Natural gas hillside that has burned continuously day and night without extinguishing.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
      {
        title: "Ateshgah Fire Temple",
        desc: "17th-century castle-like pilgrimage shrine built over natural gas vents in Surakhani.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Absheron Saffron Tea", desc: "Rare Bilgah saffron brewed with mountain black tea and rock sugar." },
    ],
    localTips: [
      "Yanar Dag is most dramatic in the late afternoon and dusk when the flames glow brightly against the twilight sky.",
    ],
    tourSlugs: ["absheron-peninsula-day-trip"],
  },
  {
    slug: "shahdag",
    name: "Shahdag Mountain Resort",
    subtitle: "Premier Alpine Skiing, Luxury Spa & Greater Caucasus Summits",
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    distanceFromBaku: "215 km (approx. 3 hours drive via modern highway)",
    elevation: "1,435m – 2,525m",
    bestSeason: "December – March (Skiing), June – September (Alpine Wellness)",
    idealStay: "2–3 Days",
    overview:
      "Shahdag is Azerbaijan's premier world-class mountain resort nestled beneath Mount Shahdag (4,243m). It features 32+ km of ski slopes, high-speed gondolas, the Shahdag Mountain Coaster, and 5-star ski-in/ski-out luxury wellness hotels.",
    cultureAndHistory:
      "Located in the Gusar region near the Russian border, Shahdag is home to the indigenous Lezgin culture, famous for woven carpets, mountain folklore, and wholesome highland cuisine.",
    topHighlights: [
      {
        title: "Shahdag Ski & Snowboard Slopes",
        desc: "Modern Austrian-designed ski lifts, snowmaking systems, and runs ranging from beginner to FIS Black.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      },
      {
        title: "Shahdag Mountain Coaster",
        desc: "Alpine gravity coaster winding down the mountain slopes with thrilling curves and panoramic views.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Lezgin Tskan Pie", desc: "Crispy baked layered pastry filled with seasoned lamb, potatoes, and mountain herbs." },
    ],
    localTips: [
      "Book hotel stays at Pik Palace or Park Chalet for direct ski-in/ski-out access and heated outdoor alpine infinity pools.",
    ],
    tourSlugs: ["caucasus-mountain-highlands"],
  },
  {
    slug: "naftalan",
    name: "Naftalan",
    subtitle: "World's Only Therapeutic Petroleum Thermal Spa",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    ],
    distanceFromBaku: "330 km (approx. 4.5 hours drive or high-speed rail to Ganja)",
    elevation: "225m",
    bestSeason: "Year-Round (Best: April – November)",
    idealStay: "7–14 Days for full medical courses (or 1–2 days wellness preview)",
    overview:
      "Naftalan is world-famous for its unique grade of heavy, non-flammable crude petroleum with powerful biological healing properties. For over 100 years, patients worldwide have traveled here for crude oil baths treating musculoskeletal, joint, and dermatological conditions.",
    cultureAndHistory:
      "Mentioned by Marco Polo in the 13th century as a curative oil that cures human and animal ailments, modern Naftalan boasts luxury 5-star medical sanatoriums with cutting-edge diagnostics.",
    topHighlights: [
      {
        title: "Therapeutic Naftalan Oil Bath Experience",
        desc: "Warm crude petroleum immersion that stimulates circulation and relieves joint pain.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      },
    ],
    culinarySpecialties: [
      { name: "Ganja Shah Pilaf & Dovga", desc: "Herb-rich yogurt soup (Dovga) followed by saffron lamb pilaf." },
    ],
    localTips: [
      "A complete medical course is typically 7 to 14 days under doctor supervision, with medical package packages available via AddmeTour.",
    ],
    tourSlugs: ["sheki-cultural-journey"],
  },
];

export function getDestinationBySlug(slug: string): DestinationDetailData | undefined {
  return DESTINATIONS_CATALOG.find((d) => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATIONS_CATALOG.map((d) => d.slug);
}
