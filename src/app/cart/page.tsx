import type { Metadata } from "next";
import { CartView } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Cart", description: "Accessories saved in your Happy Cars cart." };

export default function CartPage() {
  return (
    <>
      <PageHero title="Cart" items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Cart" }]} />
      <div className="container-page py-12"><CartView /></div>
    </>
  );
}
