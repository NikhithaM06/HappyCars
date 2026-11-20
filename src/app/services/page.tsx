import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Inspection, certified assurance, finance, exchange, documentation, and delivery from Happy Cars.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="What we actually do" subtitle="The work around the car, not a menu of vague promises." items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <div className="container-page grid gap-5 py-14 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-3xl border border-line p-6">
            <h2 className="text-xl font-semibold text-navy">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink">{service.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
