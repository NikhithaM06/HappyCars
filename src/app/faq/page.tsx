import type { Metadata } from "next";
import { FaqList } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "FAQ", description: "Common questions about buying from Happy Cars." };

export default function FaqPage() {
  return (
    <>
      <PageHero title="Questions we hear on the floor" items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <div className="container-page py-12"><FaqList /></div>
    </>
  );
}
