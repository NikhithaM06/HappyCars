import type { Metadata } from "next";
import { Suspense } from "react";
import { BrowseCarsView } from "@/components/cars/BrowseCarsView";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Browse Cars",
  description: "Browse inspected and certified cars for sale at Happy Cars showroom.",
};

export default function BrowseCarsPage() {
  return (
    <>
      <PageHero
        eyebrow="BROWSE CARS"
        title="Find Your"
        titleHighlight="Perfect Drive"
        subtitle="Explore our Cars collection."
        backgroundImage="/images/contact-hero-pure.jpg"
      />
      <div className="container-page py-10">
        <Suspense fallback={<div className="py-16 text-center text-navy font-semibold">Loading vehicles…</div>}>
          <BrowseCarsView />
        </Suspense>
      </div>
    </>
  );
}
