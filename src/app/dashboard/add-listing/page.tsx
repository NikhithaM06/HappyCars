import type { Metadata } from "next";
import { AddListingForm, DashboardShell } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "Add a listing" };

export default function AddListingPage() {
  return (
    <DashboardShell>
      <h1 className="mb-2 text-3xl font-semibold text-navy">Add a listing</h1>
      <p className="mb-6 text-ink">This listing is stored in your browser and appears in inventory immediately.</p>
      <AddListingForm />
    </DashboardShell>
  );
}
