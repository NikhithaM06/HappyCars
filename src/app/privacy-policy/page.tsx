import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Happy Cars",
  description: "Privacy policy for Happy Cars showroom.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <div className="container-page space-y-8 py-12 md:py-16 leading-7 text-ink">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">1. Information We Collect</h2>
          <p className="text-base sm:text-[17px] text-ink leading-relaxed">
            When you browse our inventory, enquire about a vehicle, schedule a test drive, or reach out to Happy Cars, we may collect personal details such as your name, contact phone number, email address, and vehicle preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">2. How We Use Your Information</h2>
          <p className="text-base sm:text-[17px] text-ink leading-relaxed">
            The information you provide is used strictly to deliver our services, including responding to vehicle inquiries, arranging test drives, assisting with vehicle financing and RC transfer documentation, and providing updates regarding requested vehicles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">3. Information Sharing and Disclosure</h2>
          <p className="text-base sm:text-[17px] text-ink leading-relaxed">
            Happy Cars does not sell, rent, or trade your personal information to third parties. We share information only with authorized financial and insurance partners when you explicitly request loan or insurance assistance for a vehicle purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">4. Data Security</h2>
          <p className="text-base sm:text-[17px] text-ink leading-relaxed">
            We implement appropriate physical, technical, and administrative measures to safeguard your personal information against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">5. Contact Us</h2>
          <p className="text-base sm:text-[17px] text-ink leading-relaxed">
            If you have any questions or concerns regarding our privacy practices or wish to update your information, please contact our showroom at NH 66, Thekkatte, Kundapura, or call us at +91 8904805777.
          </p>
        </section>
      </div>
    </>
  );
}
