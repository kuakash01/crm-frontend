"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { ConversionMetric } from "@/features/dashboard/dashboard.types";

function formatMetricValue(metric: ConversionMetric) {
  if (metric.isPercentage || metric.unit === "%") {
    return `${metric.current}${metric.unit ?? "%"}`;
  }

  if (metric.unit === "₹") {
    return `₹${metric.current.toLocaleString("en-IN")}`;
  }

  return (
    <>
      {metric.current.toLocaleString("en-IN")}
      {metric.unit ? (
        <span className="text-sm ml-1 font-medium text-muted-foreground">
          {metric.unit}
        </span>
      ) : null}
    </>
  );
}

export default function ConversionMetrics({
  data,
}: {
  data: ConversionMetric[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((metric) => {
        const isPositive = metric.current >= metric.previous;
        const change = Math.abs(metric.current - metric.previous);
        const changePercent =
          metric.previous === 0
            ? metric.current === 0
              ? "0.0"
              : "100.0"
            : ((change / metric.previous) * 100).toFixed(1);

        return (
          <Card key={metric.label} className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">{formatMetricValue(metric)}</p>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{changePercent}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">vs previous 30 days</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
