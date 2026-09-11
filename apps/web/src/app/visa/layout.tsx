import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://addmetour.com";

export const metadata: Metadata = {
  title: "Azerbaijan e-Visa Service — Fast Official ASAN Visa Processing",
  description:
    "Apply for your Azerbaijan electronic visa (ASAN e-Visa) online. Get your e-Visa in 3 hours (urgent) or 3 business days (standard). Over 95 eligible countries including USA, UK, EU, Canada, Australia, India, and UAE. Trusted by 2,400+ travelers.",
  keywords: [
    "Azerbaijan visa",
    "Azerbaijan e-visa",
    "ASAN visa",
    "Azerbaijan visa online",
    "Azerbaijan evisa",
    "Azerbaijan electronic visa",
    "Azerbaijan visa application",
    "Baku visa",
    "Azerbaijan tourist visa",
    "Azerbaijan visa for US citizens",
    "Azerbaijan visa for UK citizens",
    "Azerbaijan visa for EU citizens",
    "Azerbaijan visa for Indian citizens",
    "Azerbaijan visa requirements",
    "Azerbaijan visa fee",
    "Azerbaijan urgent visa",
    "Azerbaijan visa 3 hours",
    "do I need a visa for Azerbaijan",
    "Azerbaijan visa free countries",
    "ASAN visa application online",
  ],
  alternates: {
    canonical: `${APP_URL}/visa`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${APP_URL}/visa`,
    siteName: "AddmeTour",
    title: "Azerbaijan e-Visa Service — Get Your Visa in 3 Hours | AddmeTour",
    description:
      "Official ASAN e-Visa processing service. Apply online, receive your approved electronic visa by email. 95+ eligible countries. Urgent 3-hour processing available.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "Baku Old City — Azerbaijan e-Visa Service by AddmeTour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azerbaijan e-Visa — Fast Official ASAN Visa Processing | AddmeTour",
    description:
      "Get your Azerbaijan e-Visa in 3 hours. 95+ eligible countries. Trusted by 2,400+ travelers.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&q=85",
    ],
  },
};

// JSON-LD for the e-Visa Service
const visaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${APP_URL}/visa#service`,
      name: "Azerbaijan e-Visa Processing Service",
      description:
        "Official ASAN electronic visa processing for Azerbaijan. Standard 3-day or urgent 3-hour turnaround for 95+ eligible countries.",
      provider: {
        "@type": "TravelAgency",
        "@id": `${APP_URL}/#organization`,
        name: "AddmeTour",
      },
      serviceType: "Visa Processing",
      areaServed: {
        "@type": "Country",
        name: "Azerbaijan",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "e-Visa Processing Options",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Standard e-Visa Processing",
            description: "e-Visa delivered within 3 business days",
            price: "59",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Urgent e-Visa Processing",
            description: "e-Visa delivered within 3 hours",
            price: "110",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: APP_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Azerbaijan e-Visa Service",
          item: `${APP_URL}/visa`,
        },
      ],
    },
  ],
};

export default function VisaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visaJsonLd) }}
      />
      {children}
    </>
  );
}
