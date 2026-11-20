import type { Metadata } from "next";
import { DashboardShell, MessageDesk } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-3xl font-semibold text-navy">Messages</h1>
      <MessageDesk />
    </DashboardShell>
  );
}
