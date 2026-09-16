"use client";

import Link from "next/link";
import { Calendar, User, GripVertical, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Deal } from "../deals.types";

interface DealCardProps {
  deal: Deal;
  clickable?: boolean;
}

export default function DealCard({ deal, clickable = true }: DealCardProps) {
  const initials = (deal.customer_name || "Customer")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const card = (
    <Card className="group relative border border-border/70 bg-card shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <CardContent className="space-y-3 p-3.5">
        {/* Top row: Handle + Customer Initials + Title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            {/* Customer Avatar Initials */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {deal.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {deal.customer_name || "Unknown Customer"}
              </p>
            </div>
          </div>

          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
        </div>

        {/* Price & Service tag */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/50">
          <p className="text-base font-bold text-foreground">
            ₹{Number(deal.price).toLocaleString("en-IN")}
          </p>

          {deal.service_name && (
            <Badge variant="secondary" className="text-[10px] font-medium max-w-[130px] truncate">
              {deal.service_name}
            </Badge>
          )}
        </div>

        {/* Footer meta: Rep & Expected close */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{deal.assigned_to_name ?? "Unassigned"}</span>
          </div>

          {deal.expected_close_date && (
            <div className="flex items-center gap-1 shrink-0">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(deal.expected_close_date), "dd MMM")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!clickable) {
    return card;
  }

  return (
    <Link href={`/dashboard/deals/${deal.id}`} className="block focus:outline-hidden">
      {card}
    </Link>
  );
}
