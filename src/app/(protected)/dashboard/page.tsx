  "use client";

  import { useEffect, useState } from "react";

  import { toast } from "sonner";

  import { getDashboardStats } from "@/features/dashboard/dashboard.service";

  import { DashboardResponse } from "@/features/dashboard/dashboard.types";

  // components
  import StatsCards from "@/features/dashboard/components/StatsCards";
  import PipelineSummary from "@/features/dashboard/components/PipelineSummary";
  import TodayTasks from "@/features/dashboard/components/TodayTasks";
  import RecentActivities from "@/features/dashboard/components/RecentActivities";
  import RevenueChart from "@/features/dashboard/components/RevenueChart";

  export default function DashboardPage() {
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState<DashboardResponse | null>(null);

    useEffect(() => {
      fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="flex h-[300px] items-center justify-center">
          Loading dashboard...
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground">Welcome back!</p>
        </div>

        <StatsCards
          stats={
            stats?.stats ?? {
              totalLeads: 0,
              totalCustomers: 0,
              totalDeals: 0,
              totalRevenue: 0,
            }
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {stats?.pipeline && <PipelineSummary pipeline={stats.pipeline} />}
          <RevenueChart data={stats?.revenueChart ?? []} />
        </div>
        {stats?.recentActivities && (
          <div className="grid gap-6 lg:grid-cols-2">
            <TodayTasks tasks={stats.todayTasks} />

            <RecentActivities activities={stats.recentActivities} />
          </div>
        )}
      </div>
    );
  }
