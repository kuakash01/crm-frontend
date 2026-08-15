"use client";

import {
  Users,
  UserCheck,
  Briefcase,
  IndianRupee,
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
}

export default function StatsCards({
  stats,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: UserCheck,
    },
    {
      title: "Deals",
      value: stats.totalDeals,
      icon: Briefcase,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {card.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}