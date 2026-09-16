"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";
import type { TopPerformer } from "@/features/dashboard/dashboard.types";

interface TopPerformersProps {
  title: string;
  data: TopPerformer[];
  href: string;
  icon?: React.ReactNode;
}

function formatValue(value: number | string) {
  if (typeof value === "number") {
    return `₹${value.toLocaleString("en-IN")}`;
  }
  return value;
}

const medalConfig = [
  { medal: "🥇", bg: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { medal: "🥈", bg: "bg-slate-400/15 border-slate-400/30 text-slate-600 dark:text-slate-300" },
  { medal: "🥉", bg: "bg-amber-700/15 border-amber-700/30 text-amber-700 dark:text-amber-500" },
];

export default function TopPerformers({
  title,
  data,
  href,
  icon,
}: TopPerformersProps) {
  return (
    <Card className="h-full border border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold">
          {icon || <TrendingUp className="h-5 w-5 text-primary" />}
          {title}
        </CardTitle>
        <Link href={href}>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            <p className="font-medium">No performance data yet</p>
            <p className="text-xs mt-0.5">Top contributors and high-value records will appear here.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {data.map((performer, idx) => {
              const isTopThree = idx < 3;
              const medal = isTopThree ? medalConfig[idx] : null;

              return (
                <div
                  key={performer.id || idx}
                  className="group relative flex items-center justify-between p-2.5 rounded-lg border border-transparent transition-all duration-200 hover:border-border/60 hover:bg-muted/50 hover:shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge / Medal */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold border transition-transform duration-200 group-hover:scale-105 ${
                        medal
                          ? medal.bg
                          : "bg-muted/70 border-border/50 text-muted-foreground"
                      }`}
                    >
                      {medal ? medal.medal : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {performer.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {performer.metric}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <p className="font-bold text-sm text-foreground">
                      {formatValue(performer.value)}
                    </p>
                    {typeof performer.change === "number" && performer.change !== 0 && (
                      <p
                        className={`text-[11px] font-medium ${
                          performer.change > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {performer.change > 0 ? "+" : ""}
                        {performer.change}%
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
