import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESTINATIONS_CATALOG, getDestinationBySlug, getAllDestinationSlugs } from "@/lib/destinations-data";
import { TOURS_CATALOG } from "@/lib/tours-data";
import DestinationDetailClient from "./DestinationDetailClient";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return {
      title: "Destination Not Found | AddmeTour",
    };
  }

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addmetour.com";
  const pageUrl = `${APP_URL}/destinations/${dest.slug}`;

  return {
    title: `${dest.name} Travel Guide & Handcrafted Tours — AddmeTour`,
    description: dest.overview,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${dest.name} | Complete Travel Guide & Tours`,
      description: dest.subtitle,
      url: pageUrl,
      images: [
        {
          url: dest.heroImage.startsWith("http") ? dest.heroImage : `${APP_URL}${dest.heroImage}`,
          width: 1200,
          height: 630,
          alt: `${dest.name} Azerbaijan`,
        },
      ],
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const matchingTours = TOURS_CATALOG.filter((t) =>
    destination.tourSlugs.includes(t.slug)
  );

  const fallbackTours = matchingTours.length > 0 ? matchingTours : TOURS_CATALOG.slice(0, 3);

  return <DestinationDetailClient destination={destination} tours={fallbackTours} />;
}
