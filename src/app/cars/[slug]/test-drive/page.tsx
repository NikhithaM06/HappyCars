import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarEnquiryPageView } from "@/components/cars/CarEnquiryPageView";
import { getCarBySlug, getCars } from "@/services/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getCars().map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: "Request Test Drive | Happy Cars" };
  return {
    title: `Request Test Drive – ${car.title} | Happy Cars`,
    description: `Schedule a test drive for the ${car.title} at Happy Cars Kundapura showroom.`,
  };
}

export default async function CarTestDrivePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return <CarEnquiryPageView car={car} mode="test-drive" />;
}
