"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  Briefcase,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalLeads: number;
    totalCustomers: number;
    totalDeals: number;
    totalRevenue: number;
  };
  highlightedEntity?: string | null;
  lastUpdatedTime?: string;
}

export default function StatsCards({
  stats,
  highlightedEntity,
  lastUpdatedTime = "just now",
}: StatsCardsProps) {
  const router = useRouter();

  const cards = [
    {
      title: "Total Leads",
      entityKey: "LEAD",
      value: stats.totalLeads,
      href: "/dashboard/leads",
      icon: Users,
      gradient: "from-blue-500/15 via-cyan-500/10 to-transparent",
      iconColor: "text-blue-600 dark:text-blue-400",
      badgeColor: "bg-blue-100 dark:bg-blue-900/40",
      borderHover: "hover:border-blue-500/40",
      pulseColor: "ring-2 ring-blue-500/60 shadow-blue-500/15",
    },
    {
      title: "Customers",
      entityKey: "CUSTOMER",
      value: stats.totalCustomers,
      href: "/dashboard/customers",
      icon: UserCheck,
      gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      badgeColor: "bg-emerald-100 dark:bg-emerald-900/40",
      borderHover: "hover:border-emerald-500/40",
      pulseColor: "ring-2 ring-emerald-500/60 shadow-emerald-500/15",
    },
    {
      title: "Active Deals",
      entityKey: "DEAL",
      value: stats.totalDeals,
      href: "/dashboard/deals",
      icon: Briefcase,
      gradient: "from-purple-500/15 via-violet-500/10 to-transparent",
      iconColor: "text-purple-600 dark:text-purple-400",
      badgeColor: "bg-purple-100 dark:bg-purple-900/40",
      borderHover: "hover:border-purple-500/40",
      pulseColor: "ring-2 ring-purple-500/60 shadow-purple-500/15",
    },
    {
      title: "Total Revenue",
      entityKey: "DEAL",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      href: "/dashboard/deals",
      icon: IndianRupee,
      gradient: "from-orange-500/15 via-amber-500/10 to-transparent",
      iconColor: "text-orange-600 dark:text-orange-400",
      badgeColor: "bg-orange-100 dark:bg-orange-900/40",
      borderHover: "hover:border-orange-500/40",
      pulseColor: "ring-2 ring-amber-500/60 shadow-amber-500/15",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isHighlighted =
          highlightedEntity === "ALL" ||
          Boolean(highlightedEntity && card.entityKey === highlightedEntity);

        return (
          <Card
            key={card.title}
            onClick={() => router.push(card.href)}
            className={`group relative overflow-hidden border border-border/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
              isHighlighted
                ? `${card.pulseColor} scale-[1.02] -translate-y-0.5`
                : card.borderHover
            }`}
          >
            {/* Ambient gradient glow on hover or when highlighted */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-opacity duration-300 pointer-events-none ${
                isHighlighted
                  ? "opacity-70 animate-pulse"
                  : "opacity-40 group-hover:opacity-100"
              }`}
            />

            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {card.title}
              </CardTitle>

              <div className="flex items-center gap-1.5">
                <div
                  className={`p-2 rounded-lg ${card.badgeColor} transition-transform duration-300 group-hover:scale-110 ${
                    isHighlighted ? "scale-110" : ""
                  }`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${card.iconColor}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <p
                className={`text-2xl sm:text-3xl font-bold tracking-tight text-foreground transition-all duration-300 ${
                  isHighlighted ? "scale-105 text-primary" : ""
                }`}
              >
                {card.value}
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span
                  className={`transition-colors font-medium ${
                    isHighlighted
                      ? "text-emerald-500 font-bold"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {isHighlighted ? "Live • Just updated" : "Live active"}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}