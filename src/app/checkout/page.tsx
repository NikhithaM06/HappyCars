import type { Metadata } from "next";
import { CheckoutForm } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Checkout", description: "Sample checkout for Happy Cars accessories. No payment is collected." };

export default function CheckoutPage() {
  return (
    <>
      <PageHero title="Checkout" subtitle="This step records a sample order in your browser. It does not charge a card." items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
      <div className="container-page py-12"><CheckoutForm /></div>
    </>
  );
}
