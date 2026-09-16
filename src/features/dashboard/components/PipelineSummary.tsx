"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ArrowRight } from "lucide-react";

interface PipelineSummaryProps {
  pipeline: {
    OPEN: number;
    QUOTATION_SENT: number;
    NEGOTIATION: number;
    WON: number;
    LOST: number;
  };
}

const stages = [
  {
    key: "OPEN",
    label: "Open",
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    strokeColor: "#3b82f6",
  },
  {
    key: "QUOTATION_SENT",
    label: "Quotation",
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    strokeColor: "#a855f7",
  },
  {
    key: "NEGOTIATION",
    label: "Negotiation",
    color: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    strokeColor: "#f59e0b",
  },
  {
    key: "WON",
    label: "Won",
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    strokeColor: "#10b981",
  },
  {
    key: "LOST",
    label: "Lost",
    color: "bg-rose-500",
    textColor: "text-rose-600 dark:text-rose-400",
    strokeColor: "#f43f5e",
  },
] as const;

export default function PipelineSummary({ pipeline }: PipelineSummaryProps) {
  const router = useRouter();

  const total = Object.values(pipeline).reduce((sum, value) => sum + value, 0);
  const wonCount = pipeline.WON || 0;
  const winRate = total === 0 ? 0 : Math.round((wonCount / total) * 100);

  // SVG circle calculations for gauge
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (winRate / 100) * circumference;

  return (
    <Card className="h-full border border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold">Deal Pipeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {total} Total Deals in Active Cycle
            </p>
          </div>
          <Link
            href="/dashboard/deals"
            className="group flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <span>Pipeline</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Win Rate Ring Gauge Card */}
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-3.5">
          <div>
            <span className="text-xs font-medium text-muted-foreground">Win Conversion Rate</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-foreground">{winRate}%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {wonCount} deals won
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Based on closed deal volume
            </p>
          </div>

          {/* SVG Circular Gauge */}
          <div className="relative flex h-18 w-18 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-muted"
                strokeWidth="7"
                fill="none"
              />
              {/* Foreground progress circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#10b981"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Clickable Stage Progress Bars */}
        <div className="space-y-2">
          {stages.map((stage) => {
            const count = pipeline[stage.key] || 0;
            const percentage = total === 0 ? 0 : Math.round((count / total) * 100);

            return (
              <div
                key={stage.key}
                onClick={() => router.push(`/dashboard/deals?stage=${stage.key}`)}
                className="group rounded-lg p-2 transition-all hover:bg-muted/60 cursor-pointer"
                title={`Filter ${stage.label} deals`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${stage.color} group-hover:scale-125 transition-transform`} />
                    <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {stage.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">
                      {percentage}%
                    </span>
                    <span className="w-7 text-right text-xs sm:text-sm font-bold text-foreground group-hover:text-primary">
                      {count}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stage.color} transition-all duration-500 group-hover:brightness-110`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
