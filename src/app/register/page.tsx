import type { Metadata } from "next";
import { AuthForm } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Create an account", description: "Register a Happy Cars account stored in this browser." };

export default function RegisterPage() {
  return (
    <>
      <PageHero title="Create an account" items={[{ label: "Home", href: "/" }, { label: "Register" }]} />
      <div className="container-page py-12"><AuthForm mode="register" /></div>
    </>
  );
}
