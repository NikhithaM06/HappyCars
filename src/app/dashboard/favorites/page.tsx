import type { Metadata } from "next";
import { DashboardShell, SavedCars } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "Saved cars" };

export default function FavoritesPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-3xl font-semibold text-navy">Saved cars</h1>
      <SavedCars />
    </DashboardShell>
  );
}
