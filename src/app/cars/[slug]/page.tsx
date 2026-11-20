import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetail, UserCarDetail } from "@/components/cars/CarDetail";
import { getCarBySlug, getCars } from "@/services/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getCars().map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: "Car" };
  return {
    title: car.title,
    description: `${car.title} · ${car.year} · ${car.fuel} · ${car.transmission}. Inspected at Happy Cars, Indiranagar.`,
  };
}

export default async function CarPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) {
    if (!slug) notFound();
    return <UserCarDetail slug={slug} />;
  }
  return <CarDetail car={car} />;
}
