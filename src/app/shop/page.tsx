import type { Metadata } from "next";
import { ProductGrid } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Accessories", description: "Care products and accessories from the Happy Cars shop." };

export default function ShopPage() {
  return (
    <>
      <PageHero title="Showroom shop" subtitle="Accessories we fit or pack with a handover." items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <div className="container-page py-12"><ProductGrid /></div>
    </>
  );
}
