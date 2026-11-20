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
  if (!car) return { title: "Vehicle Enquiry | Happy Cars" };
  return {
    title: `Enquiry – ${car.title} | Happy Cars`,
    description: `Send an enquiry for the ${car.title} at Happy Cars Kundapura showroom.`,
  };
}

export default async function CarEnquiryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return <CarEnquiryPageView car={car} mode="enquiry" />;
}
