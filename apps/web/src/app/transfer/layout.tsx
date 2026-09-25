import type { Metadata } from "next";
import { CURRENT_BRAND } from "@/lib/brand";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  `https://${CURRENT_BRAND.domain}`;

export const metadata: Metadata = {
  title: `Airport Transfer — Baku, Ganja & Nakhchivan | ${CURRENT_BRAND.name}`,
  description:
    "Book private airport transfers in Baku (GYD), Ganja & Nakhchivan. Fixed prices, flight monitoring, meet & greet, and 24/7 support in Azerbaijan.",
  keywords: [
    "Azerbaijan airport transfer",
    "Baku airport taxi",
    "Heydar Aliyev Airport transfer",
    "GYD taxi",
    "Baku private transfer",
    "airport to hotel Baku",
    "airport pickup Baku",
    "meet and greet Baku airport",
    "Ganja airport transfer",
    "Nakhchivan airport transfer",
    `${CURRENT_BRAND.name} transfer`,
  ],
  alternates: {
    canonical: "/transfer",
    languages: {
      en: "/transfer?lang=en",
      az: "/transfer?lang=az",
      ru: "/transfer?lang=ru",
      fr: "/transfer?lang=fr",
      ar: "/transfer?lang=ar",
      de: "/transfer?lang=de",
      "x-default": "/transfer",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${APP_URL}/transfer`,
    siteName: CURRENT_BRAND.name,
    title: "Airport Transfer in Azerbaijan — Fixed Prices, Professional Drivers",
    description:
      "Book a private airport transfer across Azerbaijan. Fixed prices, meet & greet, flight monitoring. Available at GYD, GJA, and NAJ airports.",
    images: [
      {
        url: "/images/og-transfer-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Airport transfer service — professional driver",
      },
    ],
  },
};

const transferJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${APP_URL}/transfer#service`,
  name: `${CURRENT_BRAND.name} Airport Transfer`,
  description:
    "Professional private airport transfer service in Azerbaijan. Fixed prices, meet & greet, flight tracking at Heydar Aliyev International (GYD), Ganja (GJA), and Nakhchivan (NAJ) airports.",
  provider: {
    "@type": "TravelAgency",
    "@id": `${APP_URL}/#organization`,
    name: CURRENT_BRAND.name,
  },
  areaServed: {
    "@type": "Country",
    name: "Azerbaijan",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${APP_URL}/transfer/book`,
  },
};

const transferFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the airport meet and greet service work in Baku?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your professional driver monitors your flight in real time and waits inside the arrival terminal holding a personalized name sign. 60 minutes of complimentary wait time is included after flight touchdown.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my flight to Baku (GYD) is delayed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flight monitoring is fully automated and complimentary. Your pickup schedule automatically adjusts to your actual landing time at no additional surcharge.",
      },
    },
    {
      "@type": "Question",
      name: "What vehicles are available for Azerbaijan airport transfers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer Executive Sedans (Mercedes E-Class/Toyota Camry for up to 3 passengers), Premium SUVs (Toyota Prado/Land Cruiser for up to 4 passengers), and VIP Minivans (Mercedes V-Class/Vito for up to 7 passengers).",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay upon arrival to the driver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we support both instant secure online payment and Pay on Arrival directly to your chauffeur in cash.",
      },
    },
  ],
};

export default function TransferLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transferJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transferFaqJsonLd) }}
      />
      {children}
    </>
  );
}
