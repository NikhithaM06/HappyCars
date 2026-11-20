import type { Metadata } from "next";
import { AuthForm } from "@/components/interactive/Interactive";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Login", description: "Sign in to the Happy Cars browser account." };

export default function LoginPage() {
  return (
    <>
      <PageHero title="Login" items={[{ label: "Home", href: "/" }, { label: "Login" }]} />
      <div className="container-page py-12"><AuthForm mode="login" /></div>
    </>
  );
}
