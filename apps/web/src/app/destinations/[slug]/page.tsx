import { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
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
    return constructMetadata({
      title: "Destination Not Found",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${dest.name} Travel Guide & Handcrafted Tours`,
    description: dest.overview,
    path: `/destinations/${dest.slug}`,
    image: dest.heroImage,
  });
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
