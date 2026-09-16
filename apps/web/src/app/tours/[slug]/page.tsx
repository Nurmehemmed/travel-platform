import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOURS_CATALOG, getTourBySlug, getAllTourSlugs } from "@/lib/tours-data";
import TourDetailClient from "./TourDetailClient";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | AddmeTour",
    };
  }

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addmetour.com";
  const pageUrl = `${APP_URL}/tours/${tour.slug}`;

  return {
    title: `${tour.title} — AddmeTour Azerbaijan`,
    description: tour.desc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${tour.title} | Handcrafted Azerbaijan Tours`,
      description: tour.tagline,
      url: pageUrl,
      images: [
        {
          url: tour.heroImage.startsWith("http") ? tour.heroImage : `${APP_URL}${tour.heroImage}`,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.tagline,
      images: [tour.heroImage],
    },
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = TOURS_CATALOG.filter((t) => t.id !== tour.id).slice(0, 3);

  // Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.desc,
    touristType: tour.category,
    offers: {
      "@type": "Offer",
      price: tour.price.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      url: `https://addmetour.com/tours/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating.toString(),
      bestRating: "5",
      reviewCount: tour.reviewCount.toString(),
    },
    provider: {
      "@type": "TravelAgency",
      name: "AddmeTour",
      url: "https://addmetour.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={tour} relatedTours={relatedTours} />
    </>
  );
}
