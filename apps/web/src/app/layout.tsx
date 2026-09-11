import type { Metadata } from "next";
import "@travel/ui/styles";
import FloatingVisaButton from "@/components/FloatingVisaButton";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://addmetour.com";

export const metadata: Metadata = {
  title: {
    default: "AddmeTour — Handcrafted Azerbaijan Tours & Travel Experiences",
    template: "%s | AddmeTour",
  },
  description:
    "Discover Azerbaijan with AddmeTour. Boutique private & small-group tours across Baku, the Great Caucasus, Gobustan, Sheki, and Absheron. 4.9★ TripAdvisor rating. Instant WhatsApp booking.",
  keywords: [
    "Azerbaijan tours",
    "Baku tours",
    "Baku Old City walking tour",
    "Great Caucasus tours",
    "Gobustan mud volcanoes",
    "Sheki tour Azerbaijan",
    "Absheron peninsula tour",
    "Azerbaijan boutique travel agency",
    "AddmeTour",
    "Azerbaijan private tours",
    "Baku day trips",
    "Caucasus adventure travel",
  ],
  authors: [{ name: "AddmeTour", url: APP_URL }],
  creator: "AddmeTour",
  publisher: "AddmeTour",
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "AddmeTour",
    title: "AddmeTour — Handcrafted Azerbaijan Tours & Travel Experiences",
    description:
      "Explore Baku, the Great Caucasus, and Silk Road heritage with authentic local guides. 4.9★ on TripAdvisor.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "Great Caucasus Mountains in Azerbaijan — AddmeTour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AddmeTour — Handcrafted Azerbaijan Tours & Travel Experiences",
    description:
      "Boutique private & small-group tours across Azerbaijan. 4.9★ TripAdvisor rating.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
    ],
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
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-verification-code",
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
      url: APP_URL,
      logo: `${APP_URL}/icon.svg`,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=630&q=85",
      description:
        "Boutique travel agency in Baku offering authentic small-group and private tours across Azerbaijan.",
      telephone: "+994000000000",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Baku",
        addressCountry: "AZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.4093,
        longitude: 49.8671,
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
      className="font-body"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400..800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400..800&display=swap"
        />
        <link rel="alternate" hrefLang="en" href={APP_URL} />
        <link rel="alternate" hrefLang="x-default" href={APP_URL} />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <FloatingVisaButton />
      </body>
    </html>
  );
}
