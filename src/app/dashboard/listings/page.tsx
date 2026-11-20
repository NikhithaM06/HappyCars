import type { Metadata } from "next";
import { DashboardShell, MyListings } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "My listings" };

export default function ListingsPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-3xl font-semibold text-navy">My listings</h1>
      <MyListings />
    </DashboardShell>
  );
}
