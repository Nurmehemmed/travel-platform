import type { Metadata } from "next";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "https://addmetour.com";

export const metadata: Metadata = {
  title: "Track Your Azerbaijan e-Visa Application — Live Status Updates",
  description:
    "Track the real-time status of your Azerbaijan e-Visa application. Enter your reference number to check progress and download your approved PDF.",
  keywords: [
    "track Azerbaijan visa",
    "Azerbaijan visa status",
    "check Azerbaijan visa application",
    "ASAN visa status check",
    "Azerbaijan e-visa tracking",
    "Azerbaijan visa application status",
    "download Azerbaijan e-visa",
    "Azerbaijan visa PDF download",
  ],
  alternates: {
    canonical: "/visa/track",
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/visa/track`,
    siteName: "AddmeTour",
    title: "Track Your Azerbaijan e-Visa — Live Status | AddmeTour",
    description:
      "Real-time visa tracking. Enter your reference number to see live progress and download your approved e-Visa.",
    images: [
      {
        url: "/images/og-visa-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Track Azerbaijan e-Visa Status — AddmeTour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Your Azerbaijan e-Visa — AddmeTour",
    description: "Check live status of your Azerbaijan e-Visa application.",
    images: ["/images/og-visa-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Breadcrumb for tracking page
const trackJsonLd = {
  "@context": "https://schema.org",
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
      name: "Azerbaijan e-Visa",
      item: `${APP_URL}/visa`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Track Application",
      item: `${APP_URL}/visa/track`,
    },
  ],
};

export default function VisaTrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trackJsonLd) }}
      />
      {children}
    </>
  );
}
