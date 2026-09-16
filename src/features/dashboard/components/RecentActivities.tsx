"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ArrowUpRight, UserRound, Briefcase, CheckSquare, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardActivity } from "../dashboard.types";
import { cn } from "@/lib/utils";

interface RecentActivitiesProps {
  activities: DashboardActivity[];
}

type ActivityFilter = "ALL" | "LEAD" | "DEAL" | "TASK";

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  const [filter, setFilter] = useState<ActivityFilter>("ALL");

  const filteredActivities = activities.filter((activity) => {
    if (filter === "ALL") return true;
    return activity.entity_type?.toUpperCase() === filter;
  });

  const getEntityIcon = (entityType: string) => {
    switch (entityType?.toUpperCase()) {
      case "LEAD":
        return <UserRound className="h-3.5 w-3.5 text-blue-500" />;
      case "DEAL":
        return <Briefcase className="h-3.5 w-3.5 text-purple-500" />;
      case "TASK":
        return <CheckSquare className="h-3.5 w-3.5 text-amber-500" />;
      case "CUSTOMER":
        return <Users className="h-3.5 w-3.5 text-emerald-500" />;
      default:
        return <Activity className="h-3.5 w-3.5 text-primary" />;
    }
  };

  const getEntityHref = (activity: DashboardActivity) => {
    if (!activity.entity_id) return "/dashboard/activities";
    switch (activity.entity_type?.toUpperCase()) {
      case "LEAD":
        return `/dashboard/leads/${activity.entity_id}`;
      case "DEAL":
        return `/dashboard/deals/${activity.entity_id}`;
      case "CUSTOMER":
        return `/dashboard/customers/${activity.entity_id}`;
      case "TASK":
        return `/dashboard/tasks`;
      default:
        return "/dashboard/activities";
    }
  };

  return (
    <Card className="h-full border border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-base sm:text-lg font-semibold">Recent Activities</CardTitle>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Filter Chips */}
          <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5 text-xs font-medium">
            {(["ALL", "LEAD", "DEAL", "TASK"] as ActivityFilter[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-md px-2 py-1 transition-all ${
                  filter === tab
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase() + "s"}
              </button>
            ))}
          </div>

          <Link href="/dashboard/activities">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        {filteredActivities.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            <p className="font-medium mb-1">No activities found</p>
            <p className="text-xs">Team actions and event logs will appear here.</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredActivities.map((activity) => {
              const href = getEntityHref(activity);

              return (
                <Link
                  key={activity.id}
                  href={href}
                  className="group flex items-start gap-3 rounded-lg border border-border/60 p-3 transition-all duration-200 hover:border-primary/40 hover:bg-muted/40 hover:shadow-xs"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/70 group-hover:bg-primary/10 transition-colors">
                    {getEntityIcon(activity.entity_type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {activity.description}
                      </p>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="truncate font-medium text-foreground/80">
                        {activity.created_by_name || "System"}
                      </span>

                      <span className="shrink-0">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}