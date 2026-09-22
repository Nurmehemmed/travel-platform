import type { Metadata, Viewport } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "@travel/ui/styles";
import { LanguageProvider } from "@/lib/i18n";
import { SettingsProvider } from "@/lib/settings-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import FloatingWidgetsContainer from "@/components/FloatingWidgetsContainer";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ─── Font Optimization via Next.js Font Engine (Zero render-blocking requests) ───
const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f3460",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "https://addmetour.com";

export const metadata: Metadata = {
  title: {
    default: "AddmeTour | Azerbaijan Tours, Official ASAN e-Visa & VIP Transfers",
    template: "%s | AddmeTour Azerbaijan",
  },
  description:
    "Official Azerbaijan Inbound DMC & Tour Operator. Fast 3-hour ASAN Electronic Visa (e-Visa), 24/7 Baku Airport VIP transfers, and curated Caucasus private & group tour packages. 4.9★ Rated.",
  keywords: [
    "AddmeTour",
    "AddmeTravel",
    "Azerbaijan tours",
    "Baku tours",
    "Azerbaijan visa online",
    "ASAN visa application",
    "Baku airport transfer",
    "Baku Old City walking tour",
    "Great Caucasus tours",
    "Gobustan mud volcanoes",
    "Sheki tour Azerbaijan",
    "Absheron peninsula tour",
    "Azerbaijan travel agency",
    "Azerbaijan private tours",
    "Baku day trips",
    "Caucasus luxury travel",
  ],
  authors: [{ name: "AddmeTour", url: APP_URL }],
  creator: "AddmeTour",
  publisher: "AddmeTour",
  metadataBase: new URL(APP_URL),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      az: "/?lang=az",
      ru: "/?lang=ru",
      fr: "/?lang=fr",
      ar: "/?lang=ar",
      de: "/?lang=de",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "AddmeTour Azerbaijan DMC",
    title: "AddmeTour | Azerbaijan Tours, Official ASAN e-Visa & VIP Transfers",
    description:
      "Explore Baku, the Great Caucasus, and Silk Road heritage with authentic local guides. Fast ASAN e-Visa processing and 24/7 Airport VIP transfers.",
    images: [
      {
        url: "/images/og-main-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Great Caucasus Mountains in Azerbaijan — AddmeTour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AddmeTour | Azerbaijan Tours, Official ASAN e-Visa & VIP Transfers",
    description:
      "Boutique private & small-group tours, 3-hour urgent ASAN e-Visas, and Baku airport transfers. 4.9★ TripAdvisor rating.",
    images: ["/images/og-main-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "AZ-BA",
    "geo.placename": "Baku, Azerbaijan",
    "geo.position": "40.4093;49.8671",
    ICBM: "40.4093, 49.8671",
  },
  category: "travel",
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${APP_URL}/#organization`,
      name: "AddmeTour",
      legalName: "AddmeTour LLC",
      url: APP_URL,
      logo: `${APP_URL}/icon.svg`,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
      description:
        "Premier Destination Management Company (DMC) in Baku offering official ASAN e-Visas, 24/7 airport chauffeur transfers, small-group cultural journeys, and luxury Caucasus itineraries.",
      telephone: "+994 55 100 31 46",
      email: "bookings@addmetour.com",
      priceRange: "$$",
      currenciesAccepted: "USD, EUR, AZN, GBP, AED, SAR",
      paymentAccepted: "Credit Card, Debit Card, Visa, MasterCard, Cash on Arrival",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nizami Street 142, Sabail District",
        addressLocality: "Baku",
        postalCode: "AZ1000",
        addressCountry: "AZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.4093,
        longitude: 49.8671,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      sameAs: [
        "https://instagram.com/addmetour",
        "https://x.com/addmetour",
        "https://linkedin.com/company/addmetour",
        "https://facebook.com/addmetour",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Azerbaijan Inbound Travel Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Official Azerbaijan ASAN e-Visa Fast Processing",
              description: "Standard (3 working days) and Urgent (3 hours) electronic visas for citizens of 95+ eligible countries.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Baku Heydar Aliyev Airport (GYD) VIP Transfer",
              description: "Door-to-door flight-tracked transfers with Sedan, SUV, and VIP Mercedes Minivans.",
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "2400",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "AddmeTour",
      publisher: {
        "@id": `${APP_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${APP_URL}/packages?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a visa to travel to Azerbaijan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most international travelers can easily obtain an electronic visa (ASAN Visa) online within 3 hours to 3 days before travel. Citizens of over 95 countries (including USA, UK, EU, UAE, Canada, and Australia) are eligible for the eVisa, while several CIS and regional passport holders enter visa-free.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best time of year to visit Baku and the Great Caucasus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Spring (April to June) and Autumn (September to November) provide ideal pleasant temperatures (18°C–25°C) for walking tours in Baku and day trips to Gobustan. Summer (July–August) is perfect for cooler mountain highland escapes like Lahij and Sheki.",
          },
        },
        {
          "@type": "Question",
          name: "Are your tours private or small-group?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer both! Our signature tours are small-group experiences capped at a maximum of 12 travelers to ensure genuine connection, relaxed pacing, and personal interaction. We also craft fully customized private itineraries.",
          },
        },
        {
          "@type": "Question",
          name: "How does booking via WhatsApp work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply tap any Book Now button or the WhatsApp icon to chat directly with our local Baku team. We confirm tour availability, pickup time, and language preference within the hour.",
          },
        },
        {
          "@type": "Question",
          name: "What is your cancellation and refund policy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a 100% money-back guarantee. If your travel plans change, notify us at least 24 hours prior to the tour start time for a full refund or an immediate free reschedule to any available date.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Popular Azerbaijan Tours",
      itemListElement: [
        {
          "@type": "TouristTrip",
          name: "Baku Old City Walking Tour",
          description: "Wander through UNESCO-listed Icherisheher, ancient caravanserais, and hidden courtyards.",
          touristType: "Cultural Tourist",
          offers: {
            "@type": "Offer",
            price: "25",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "TouristTrip",
          name: "Absheron Peninsula Day Trip",
          description: "Explore the Ateshgah Fire Temple, Yanar Dag burning mountain, and coastal landscapes.",
          touristType: "Adventure Tourist",
          offers: {
            "@type": "Offer",
            price: "65",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "TouristTrip",
          name: "Sheki Cultural Journey",
          description: "Journey through the Caucasus foothills to Sheki's 18th-century Khan Palace and medieval caravanserai.",
          touristType: "Heritage Tourist",
          offers: {
            "@type": "Offer",
            price: "149",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      ],
    },
  ],
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} font-body`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
        {/* Preconnect to Unsplash CDN — saves ~300ms DNS+TCP+TLS on mobile */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload LCP hero image — matches raw Unsplash URL (unoptimized=true on first slide) */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fm=webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased w-full relative overflow-x-clip">
        <SettingsProvider>
          <AnnouncementBanner />
          <LanguageProvider>
            <CurrencyProvider>
              {children}
              <FloatingWidgetsContainer />
              <SpeedInsights />
            </CurrencyProvider>
          </LanguageProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
