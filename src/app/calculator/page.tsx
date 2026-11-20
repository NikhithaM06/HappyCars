import type { Metadata } from "next";
import { CalculatorPage } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Loan calculator", description: "Estimate a monthly payment for a used car. This is not a loan offer." };

export default function CalculatorRoute() {
  return (
    <>
      <PageHero title="Loan calculator" subtitle="Move the sliders to plan. A lender still has to sanction the loan." items={[{ label: "Home", href: "/" }, { label: "Calculator" }]} />
      <div className="container-page py-12"><CalculatorPage /></div>
    </>
  );
}
