import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { plans } from "@/data/content";

export const metadata: Metadata = { title: "Pricing", description: "How Happy Cars packages a purchase: browse, certified, and concierge." };

export default function PricingPage() {
  return (
    <>
      <PageHero title="How a purchase is packaged" items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
      <div className="container-page grid gap-6 py-12 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={`rounded-3xl border p-6 ${plan.featured ? "border-gold bg-navy text-white" : "border-line bg-white"}`}>
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className={`mt-2 text-3xl font-semibold ${plan.featured ? "text-gold" : "text-navy"}`}>{plan.price}</p>
            <p className={`mt-1 text-sm ${plan.featured ? "text-white/70" : "text-ink"}`}>{plan.note}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {plan.points.map((point) => <li key={point}>• {point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
