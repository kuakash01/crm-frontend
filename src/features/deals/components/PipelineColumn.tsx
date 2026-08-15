"use client";

import { useDroppable } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Deal } from "../deals.types";
import SortableDealCard from "./SortableDealCard";

interface PipelineColumnProps {
  id: string;
  title: string;
  deals: Deal[];
}

const stageColors: Record<string, string> = {
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  "Quotation Sent": "bg-purple-100 text-purple-700 border-purple-200",
  Negotiation: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Won: "bg-green-100 text-green-700 border-green-200",
  Lost: "bg-red-100 text-red-700 border-red-200",
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

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[700px] w-[340px] shrink-0 flex-col rounded-xl border bg-muted/20 transition-colors ${
        isOver ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`rounded-t-xl border-b p-4 ${
          stageColors[title] ?? "bg-muted"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>

          <span className="rounded-full bg-background px-2 py-1 text-xs font-semibold shadow-sm">
            {deals.length}
          </span>
        </div>

        <p className="mt-3 text-xs font-medium opacity-80">Total Value</p>

        <p className="text-lg font-bold">₹{totalValue.toLocaleString()}</p>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {deals.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            No deals
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
