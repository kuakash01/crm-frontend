"use client";

import Link from "next/link";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Deal } from "../deals.types";
import SortableDealCard from "./SortableDealCard";

interface PipelineColumnProps {
  id: string;
  title: string;
  deals: Deal[];
}

const stageTheme: Record<
  string,
  {
    headerBg: string;
    badgeBg: string;
    accentBorder: string;
    dotColor: string;
  }
> = {
  OPEN: {
    headerBg: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeBg: "bg-blue-500/20 text-blue-800 dark:text-blue-200",
    accentBorder: "border-blue-500/30",
    dotColor: "bg-blue-500",
  },
  QUOTATION_SENT: {
    headerBg: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300",
    badgeBg: "bg-purple-500/20 text-purple-800 dark:text-purple-200",
    accentBorder: "border-purple-500/30",
    dotColor: "bg-purple-500",
  },
  NEGOTIATION: {
    headerBg: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-500/20 text-amber-800 dark:text-amber-200",
    accentBorder: "border-amber-500/30",
    dotColor: "bg-amber-500",
  },
  WON: {
    headerBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-200",
    accentBorder: "border-emerald-500/30",
    dotColor: "bg-emerald-500",
  },
  LOST: {
    headerBg: "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300",
    badgeBg: "bg-rose-500/20 text-rose-800 dark:text-rose-200",
    accentBorder: "border-rose-500/30",
    dotColor: "bg-rose-500",
  },
};

export default function PipelineColumn({
  id,
  title,
  deals,
}: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      stage: id,
    },
  });

  const totalValue = deals.reduce((sum, deal) => sum + Number(deal.price), 0);
  const theme = stageTheme[id] || {
    headerBg: "bg-muted border-border text-foreground",
    badgeBg: "bg-muted text-muted-foreground",
    accentBorder: "border-border",
    dotColor: "bg-primary",
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 340px auto 700px",
      }}
      className={`flex h-[720px] w-[310px] sm:w-[340px] shrink-0 snap-center flex-col rounded-xl border border-border/80 bg-muted/25 shadow-xs transition-all ${
        isOver
          ? "ring-2 ring-primary ring-offset-2 bg-muted/50"
          : "hover:border-border"
      }`}
    >
      {/* Column Header */}
      <div className={`rounded-t-xl border-b p-3.5 ${theme.headerBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${theme.dotColor}`} />
            <h2 className="font-semibold text-sm sm:text-base tracking-tight">{title}</h2>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-xs font-bold shadow-xs ${theme.badgeBg}`}>
              {deals.length}
            </span>

            {/* Quick Add Deal button for this stage */}
            <Link href={`/dashboard/deals/create?stage=${id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-md hover:bg-background/80"
                title={`Add deal to ${title}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stage value pill */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-background/60 px-2.5 py-1 backdrop-blur-xs">
          <span className="text-[11px] font-medium opacity-75">Stage Value</span>
          <span className="text-xs sm:text-sm font-bold tracking-tight">
            ₹{totalValue.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 space-y-2.5 overflow-y-auto p-3">
        {deals.length === 0 ? (
          <div className="flex h-36 flex-col items-center justify-center rounded-lg border border-dashed border-border/70 text-center p-3 text-xs text-muted-foreground">
            <p className="font-medium">No deals in {title}</p>
            <p className="text-[11px] mt-0.5 opacity-80">Drag deals here to advance pipeline</p>
          </div>
        ) : (
          <SortableContext
            items={deals.map((d) => d.id)}
            strategy={verticalListSortingStrategy}
          >
            {deals.map((deal) => (
              <SortableDealCard key={deal.id} deal={deal} />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
