import type { Metadata } from "next";
import { DashboardHome, DashboardShell } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "Dashboard", description: "Your Happy Cars saved cars, listings, and messages." };

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHome />
    </DashboardShell>
  );
}
