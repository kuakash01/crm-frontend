"use client";

import Link from "next/link";

import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";

import { Deal } from "../deals.types";

interface DealCardProps {
  deal: Deal;
  clickable?: boolean;
}
export default function DealCard({ deal, clickable = true }: DealCardProps) {
  const card = (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="font-semibold">{deal.title}</h3>

          <p className="text-sm text-muted-foreground">{deal.customer_name}</p>
        </div>

        <p className="text-lg font-bold">
          ₹{Number(deal.price).toLocaleString()}
        </p>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {deal.assigned_to_name ?? "Unassigned"}
          </div>

          {deal.expected_close_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(deal.expected_close_date), "dd MMM yyyy")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!clickable) {
    return card;
  }

  return <Link href={`/dashboard/deals/${deal.id}`}>{card}</Link>;
}
