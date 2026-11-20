import type { Metadata } from "next";
import { DashboardShell, ProfileForm } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return <DashboardShell><h1 className="sr-only">Profile</h1><ProfileForm /></DashboardShell>;
}
