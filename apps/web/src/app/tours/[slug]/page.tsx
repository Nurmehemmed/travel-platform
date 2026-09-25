import { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { TOURS_CATALOG, getTourBySlug, getAllTourSlugs } from "@/lib/tours-data";
import { CURRENT_BRAND } from "@/lib/brand";
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
    return constructMetadata({
      title: "Tour Not Found",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${tour.title} — Handcrafted Azerbaijan Tours`,
    description: tour.desc,
    path: `/tours/${tour.slug}`,
    image: tour.heroImage,
  });
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
      url: `https://${CURRENT_BRAND.domain}/tours/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating.toString(),
      bestRating: "5",
      reviewCount: tour.reviewCount.toString(),
    },
    provider: {
      "@type": "TravelAgency",
      name: CURRENT_BRAND.name,
      url: `https://${CURRENT_BRAND.domain}`,
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
