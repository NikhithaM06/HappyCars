import type { Metadata } from "next";
import { CompareTable } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Compare cars", description: "Compare up to three Happy Cars listings side by side." };

export default function ComparePage() {
  return (
    <>
      <PageHero title="Compare cars" subtitle="Choose up to three cars from the inventory." items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <div className="container-page py-12"><CompareTable /></div>
    </>
  );
}
