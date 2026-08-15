import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { DashboardActivity } from "../dashboard.types";

interface RecentActivitiesProps {
  activities: DashboardActivity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activities</CardTitle>

        <Link href="/dashboard/activities">
          <Button
            size="sm"
            variant="ghost"
          >
            View All
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No recent activities.
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-lg border p-3 transition-colors hover:bg-muted/40"
              >
                <p className="font-medium">
                  {activity.description}
                </p>

                <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {activity.created_by_name}
                  </span>

                  <span>
                    {new Date(
                      activity.created_at
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}