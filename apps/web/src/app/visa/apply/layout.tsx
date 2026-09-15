import type { Metadata } from "next";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "https://addmetour.com";

export const metadata: Metadata = {
  title: "Apply for Azerbaijan e-Visa — Online ASAN Visa Application Form",
  description:
    "Apply for your official Azerbaijan ASAN e-Visa online in minutes. Standard (3-day) and urgent (3-hour) processing. Safe, secure application.",
  keywords: [
    "apply Azerbaijan visa online",
    "Azerbaijan visa application form",
    "ASAN visa application",
    "Azerbaijan e-visa apply",
    "fill Azerbaijan visa form",
    "Azerbaijan visa form online",
    "Azerbaijan visa upload passport",
    "Azerbaijan visa photo requirements",
    "how to apply Azerbaijan visa",
  ],
  alternates: {
    canonical: "/visa/apply",
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/visa/apply`,
    siteName: "AddmeTour",
    title: "Apply for Azerbaijan e-Visa Online — 5 Minute Application | AddmeTour",
    description:
      "Simple 4-step application. Passport details → Travel info → Upload photo → Submit. Get your e-Visa in as fast as 3 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD for the application page
const applyJsonLd = {
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
      name: "Apply Now",
      item: `${APP_URL}/visa/apply`,
    },
  ],
};

export default function VisaApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applyJsonLd) }}
      />
      {children}
    </>
  );
}
