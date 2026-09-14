import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://addmetour.com";

export const metadata: Metadata = {
  title: "Airport Transfer — Baku, Ganja & Nakhchivan | AddmeTour",
  description:
    "Book your airport transfer in Azerbaijan with a professional driver. Fixed prices, meet & greet, flight tracking. All airports: Heydar Aliyev (GYD), Ganja (GJA), Nakhchivan (NAJ). Economy to Executive vehicles.",
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
    "AddmeTour transfer",
  ],
  alternates: {
    canonical: `${APP_URL}/transfer`,
    languages: {
      "en-US": `${APP_URL}/transfer?lang=en`,
      "az-AZ": `${APP_URL}/transfer?lang=az`,
      "ru-RU": `${APP_URL}/transfer?lang=ru`,
      "fr-FR": `${APP_URL}/transfer?lang=fr`,
      "ar-SA": `${APP_URL}/transfer?lang=ar`,
      "de-DE": `${APP_URL}/transfer?lang=de`,
      "x-default": `${APP_URL}/transfer`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${APP_URL}/transfer`,
    siteName: "AddmeTour",
    title: "Airport Transfer in Azerbaijan — Fixed Prices, Professional Drivers",
    description:
      "Book a private airport transfer across Azerbaijan. Fixed prices, meet & greet, flight monitoring. Available at GYD, GJA, and NAJ airports.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&q=85",
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
  name: "AddmeTour Airport Transfer",
  description:
    "Professional private airport transfer service in Azerbaijan. Fixed prices, meet & greet, flight tracking at Heydar Aliyev International (GYD), Ganja (GJA), and Nakhchivan (NAJ) airports.",
  provider: {
    "@type": "TravelAgency",
    "@id": `${APP_URL}/#organization`,
    name: "AddmeTour",
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
