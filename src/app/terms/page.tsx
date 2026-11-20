import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Terms", description: "Terms for using the Happy Cars sample showroom website." };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and conditions" items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <article className="container-page max-w-3xl space-y-4 py-12 leading-7 text-ink">
        <p>This website is a frontend prototype for the Happy Cars showroom. Prices, availability, and finance figures are sample data stored in the project. They are not offers.</p>
        <p>A car is reserved only when an advisor confirms it and a holding amount is agreed. Sending an enquiry on this site does not reserve a car, because the form does not contact a server.</p>
        <p>Loan results are estimates from the numbers you enter. Interest, fees, and approval come from a lender after they review the car and your documents.</p>
        <p>Accessories in the shop can be added to a cart in this browser. Checkout records a sample reference and does not collect payment.</p>
        <p>Accounts, saved cars, and listings live in your browser storage. Clearing site data removes them. They are not a customer account on a server.</p>
      </article>
    </>
  );
}
