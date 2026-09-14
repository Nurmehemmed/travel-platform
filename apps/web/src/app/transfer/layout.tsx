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
      {children}
    </>
  );
}
