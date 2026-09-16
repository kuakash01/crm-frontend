"use client";

import { useEffect, useState, useRef, useCallback } from "react";

import { toast } from "sonner";

import { getDashboardStats } from "@/features/dashboard/dashboard.service";
import { socket } from "@/features/socket/socket";

import { DashboardResponse } from "@/features/dashboard/dashboard.types";

import StatsCards from "@/features/dashboard/components/StatsCards";
import PipelineSummary from "@/features/dashboard/components/PipelineSummary";
import TodayTasks from "@/features/dashboard/components/TodayTasks";
import RecentActivities from "@/features/dashboard/components/RecentActivities";
import RevenueChart from "@/features/dashboard/components/RevenueChart";
import ConversionMetrics from "@/features/dashboard/components/ConversionMetrics";
import TopPerformers from "@/features/dashboard/components/TopPerformers";
import { DashboardSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Zap, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const emptyPipeline = {
  OPEN: 0,
  QUOTATION_SENT: 0,
  NEGOTIATION: 0,
  WON: 0,
  LOST: 0,
};

interface LiveEventState {
  entityType?: string | null;
  action?: string | null;
  message?: string;
  time: Date;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const [secondsSinceRefresh, setSecondsSinceRefresh] = useState(0);
  const [refreshTime, setRefreshTime] = useState<string>("just now");

  // Real-time WebSocket connection and update states
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const [highlightedEntity, setHighlightedEntity] = useState<string | null>(null);
  const [lastLiveEvent, setLastLiveEvent] = useState<LiveEventState | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDashboard = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const data = await getDashboardStats();
      setStats(data);
      setSecondsSinceRefresh(0);

    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchDashboard(true);
  }, [fetchDashboard]);

  // Real-Time Socket.IO Listener for Live Card Updates
  useEffect(() => {
    const handleConnect = () => {
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      setIsSocketConnected(false);
    };

    const handleDashboardUpdate = (event: {
      entityType?: string;
      entityId?: number;
      action?: string;
      type?: string;
      timestamp?: string;
    }) => {
      const entity = event?.entityType?.toUpperCase() || "ALL";

      // Set live event status
      setLastLiveEvent({
        entityType: entity,
        action: event?.action || "updated",
        time: new Date(),
      });

      // Highlight the matching dashboard card
      setHighlightedEntity(entity);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = setTimeout(() => {
        setHighlightedEntity(null);
      }, 3000);

      // Debounced refetch (250ms) to bundle concurrent events
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        fetchDashboard(false);
      }, 250);
    };

    const handleNotificationNew = (notification: any) => {
      // Also trigger a debounced dashboard refresh when a notification arrives
      const entity = notification?.entity_type?.toUpperCase() || "ALL";
      setHighlightedEntity(entity);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = setTimeout(() => {
        setHighlightedEntity(null);
      }, 3000);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        fetchDashboard(false);
      }, 250);
    };

    // Sync initial connection state
    if (socket.connected) {
      setIsSocketConnected(true);
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("dashboard:update", handleDashboardUpdate);
    socket.on("notification:new", handleNotificationNew);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("dashboard:update", handleDashboardUpdate);
      socket.off("notification:new", handleNotificationNew);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [fetchDashboard]);

  const handleManualRefresh = () => {
    fetchDashboard(false);
  };

  const getTimeAgoText = useCallback(() => {
    if (secondsSinceRefresh < 5) return "just now";
    if (secondsSinceRefresh < 60) return `${secondsSinceRefresh}s ago`;
    const mins = Math.floor(secondsSinceRefresh / 60);
    return `${mins}m ago`;
  }, [secondsSinceRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceRefresh((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setRefreshTime(getTimeAgoText());
  }, [secondsSinceRefresh, getTimeAgoText]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's your real-time sales overview.
          </p>
        </div>

        {/* Refresh & Live indicator toolbar */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-all duration-300",
              isSocketConnected
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-xs"
                : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  isSocketConnected ? "animate-ping bg-emerald-400" : "bg-amber-400"
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  isSocketConnected ? "bg-emerald-500" : "bg-amber-500"
                )}
              />
            </span>

            <span className="font-semibold tracking-tight">
              {isSocketConnected
                ? lastLiveEvent && secondsSinceRefresh < 8
                  ? `Live: ${lastLiveEvent.entityType} ${lastLiveEvent.action}`
                  : "Live Sync Active"
                : "Connecting Live..."}
            </span>

            <span className="text-muted-foreground/50">•</span>

            <span className="text-muted-foreground">
              Synced {refreshTime}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="h-8 gap-1.5 rounded-lg text-xs font-medium shadow-xs transition-all hover:bg-muted active:scale-95"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 text-muted-foreground", isRefreshing && "animate-spin text-primary")} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
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
        highlightedEntity={highlightedEntity}
        lastUpdatedTime={refreshTime}
      />

      <ConversionMetrics data={stats?.conversionMetrics ?? []} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={stats?.revenueChart ?? []} />
        </div>
        <div>
          <PipelineSummary pipeline={stats?.pipeline ?? emptyPipeline} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TodayTasks tasks={stats?.todayTasks ?? []} />
        <RecentActivities activities={stats?.recentActivities ?? []} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TopPerformers
          title="Top Leads"
          data={stats?.topLeads ?? []}
          href="/dashboard/leads"
          icon={<Users className="h-5 w-5" />}
        />
        <TopPerformers
          title="Top Customers"
          data={stats?.topCustomers ?? []}
          href="/dashboard/customers"
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
