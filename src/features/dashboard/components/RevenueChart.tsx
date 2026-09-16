"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RevenueChartItem,
  RevenueChartProps,
} from "@/features/dashboard/dashboard.types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, BarChart2, AreaChart as AreaIcon } from "lucide-react";

type TimeRange = "6M" | "1Y" | "ALL";
type ChartType = "area" | "bar";

export default function RevenueChart({ data }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");
  const [chartType, setChartType] = useState<ChartType>("area");

  // Filter data according to selected time range
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (timeRange === "6M") {
      return data.slice(-6);
    }
    if (timeRange === "1Y") {
      return data.slice(-12);
    }
    return data;
  }, [data, timeRange]);

  // Calculate total and growth
  const totalRevenue = useMemo(() => {
    return filteredData.reduce((acc, item) => acc + (item.revenue || 0), 0);
  }, [filteredData]);

  const momGrowth = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const last = filteredData[filteredData.length - 1].revenue;
    const prev = filteredData[filteredData.length - 2].revenue;
    if (prev === 0) return last > 0 ? 100 : 0;
    return Math.round(((last - prev) / prev) * 100);
  }, [filteredData]);

  // Custom rich tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentVal = payload[0].value;
      return (
        <div className="rounded-lg border border-border/70 bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur-md">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-base font-bold text-foreground">
            ₹{Number(currentVal).toLocaleString("en-IN")}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-500 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <span>Monthly Revenue</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold">Revenue Trend</CardTitle>
            {momGrowth !== 0 && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  momGrowth >= 0
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                }`}
              >
                {momGrowth >= 0 ? `+${momGrowth}%` : `${momGrowth}%`} MoM
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total: <span className="font-semibold text-foreground">₹{totalRevenue.toLocaleString("en-IN")}</span> across selected period
          </p>
        </div>

        {/* Controls: Time Range & Chart Type */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Chart Type Toggle */}
          <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5">
            <button
              type="button"
              onClick={() => setChartType("area")}
              aria-label="Area chart"
              className={`rounded-md p-1.5 transition-colors ${
                chartType === "area"
                  ? "bg-background text-foreground shadow-xs font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <AreaIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              aria-label="Bar chart"
              className={`rounded-md p-1.5 transition-colors ${
                chartType === "bar"
                  ? "bg-background text-foreground shadow-xs font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5 text-xs font-medium">
            {(["6M", "1Y", "ALL"] as TimeRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6 pt-0">
        <div className="h-[260px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  {/* Fixed linearGradient: directly use var(--primary) without invalid hsl() wrapper */}
                  <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                  opacity={0.6}
                />

                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) =>
                    val >= 1000000
                      ? `₹${(val / 1000000).toFixed(1)}M`
                      : val >= 1000
                      ? `₹${(val / 1000).toFixed(0)}k`
                      : `₹${val}`
                  }
                />

                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--primary)", strokeWidth: 1.5, strokeDasharray: "4 4" }} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  fill="url(#revenueAreaGradient)"
                  strokeWidth={2.5}
                  activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                  opacity={0.6}
                />

                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) =>
                    val >= 1000000
                      ? `₹${(val / 1000000).toFixed(1)}M`
                      : val >= 1000
                      ? `₹${(val / 1000).toFixed(0)}k`
                      : `₹${val}`
                  }
                />

                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />

                <Bar
                  dataKey="revenue"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
