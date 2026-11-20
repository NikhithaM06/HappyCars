import type { Metadata } from "next";
import { Suspense } from "react";
import { InventoryExplorer } from "@/components/cars/InventoryExplorer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Map of cars",
  description: "See Happy Cars stock by Bengaluru neighbourhood.",
};

export default function MapPage() {
  return (
    <>
      <PageHero title="Cars across Bengaluru" subtitle="Pins show how many cars we currently hold in each area. This map is drawn in the page, not loaded from a maps service." items={[{ label: "Home", href: "/" }, { label: "Inventory", href: "/inventory" }, { label: "Map" }]} />
      <div className="container-page py-10">
        <Suspense fallback={<p className="text-navy">Loading map…</p>}>
          <InventoryExplorer mapMode />
        </Suspense>
      </div>
    </>
  );
}
