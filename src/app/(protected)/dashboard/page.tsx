// src/app/dashboard/page.tsx

import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | CRM Platform",
  description: "CRM Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

        <p className="text-muted-foreground">Here's an overview of your CRM.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Leads</p>

            <h3 className="text-3xl font-bold">0</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Customers</p>

            <h3 className="text-3xl font-bold">0</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Open Tasks</p>

            <h3 className="text-3xl font-bold">0</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Team Members</p>

            <h3 className="text-3xl font-bold">0</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>

          <p className="text-muted-foreground">No activity available yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
