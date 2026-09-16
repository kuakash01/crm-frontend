"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  getPipelineDeals,
  updateDealStage,
} from "@/features/deals/deals.service";
import { Deal } from "../deals.types";
import PipelineColumn from "./PipelineColumn";
import DealCard from "./DealCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, LayoutGrid, Columns } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { key: "OPEN", title: "Open" },
  { key: "QUOTATION_SENT", title: "Quotation Sent" },
  { key: "NEGOTIATION", title: "Negotiation" },
  { key: "WON", title: "Won" },
  { key: "LOST", title: "Lost" },
] as const;

export default function DealsPipeline() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pipelineDeals, setPipelineDeals] = useState<Deal[]>([]);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [mobileStage, setMobileStage] = useState<string>("ALL");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const fetchPipelineDeals = async (showSpinner = true) => {
    try {
      if (showSpinner) setLoading(true);
      else setRefreshing(true);

      const data = await getPipelineDeals();
      setPipelineDeals(data);
    } catch {
      toast.error("Failed to load pipeline");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPipelineDeals();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const deal = pipelineDeals.find(
      (deal) => deal.id === Number(event.active.id),
    );
    setActiveDeal(deal ?? null);
  };

  const handleDragCancel = () => {
    setActiveDeal(null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveDeal(null);
      return;
    }

    const dealId = Number(active.id);
    let newStage: Deal["stage"];

    const overStage = over.data.current?.stage;

    if (overStage) {
      newStage = overStage;
    } else {
      const targetDeal = pipelineDeals.find(
        (deal) => deal.id === Number(over.id),
      );

      if (!targetDeal) {
        setActiveDeal(null);
        return;
      }

      newStage = targetDeal.stage;
    }

    const deal = pipelineDeals.find((deal) => deal.id === dealId);

    if (!deal || deal.stage === newStage) {
      setActiveDeal(null);
      return;
    }

    const previousDeals = pipelineDeals;

    // Optimistic UI update
    setPipelineDeals((currentDeals) =>
      currentDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal,
      ),
    );

    try {
      await updateDealStage(dealId, newStage);
      toast.success(`Deal moved to ${newStage.replace("_", " ")}`);
    } catch {
      // Rollback if API fails
      setPipelineDeals(previousDeals);
      toast.error("Failed to update deal stage");
    } finally {
      setActiveDeal(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
        <span>Loading pipeline deals...</span>
      </div>
    );
  }

  const groupedDeals = {
    OPEN: [] as Deal[],
    QUOTATION_SENT: [] as Deal[],
    NEGOTIATION: [] as Deal[],
    WON: [] as Deal[],
    LOST: [] as Deal[],
  };

  pipelineDeals.forEach((deal) => {
    groupedDeals[deal.stage]?.push(deal);
  });

  const displayedStages =
    mobileStage === "ALL"
      ? stages
      : stages.filter((stage) => stage.key === mobileStage);

  return (
    <div className="space-y-4">
      {/* Mobile Stage Switcher & Board Controls */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Mobile Tabs (<md) */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto rounded-xl border border-border/70 bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setMobileStage("ALL")}
            className={cn(
              "shrink-0 rounded-lg px-2.5 py-1.5 font-medium transition-all",
              mobileStage === "ALL"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All Stages
          </button>
          {stages.map((stage) => (
            <button
              key={stage.key}
              type="button"
              onClick={() => setMobileStage(stage.key)}
              className={cn(
                "shrink-0 rounded-lg px-2.5 py-1.5 font-medium transition-all flex items-center gap-1",
                mobileStage === stage.key
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{stage.title}</span>
              <span className="opacity-70">({groupedDeals[stage.key].length})</span>
            </button>
          ))}
        </div>

        {/* Board Meta & Refresh Button */}
        <div className="flex items-center justify-between w-full md:w-auto md:ml-auto gap-2">
          <span className="text-xs text-muted-foreground">
            {pipelineDeals.length} deals total
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPipelineDeals(false)}
            disabled={refreshing}
            className="h-8 gap-1.5 text-xs shadow-xs"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin text-primary")} />
            <span>Sync Board</span>
          </Button>
        </div>
      </div>

      {/* Kanban Board Container with horizontal scroll snap */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <div
          tabIndex={0}
          aria-label="Deals Kanban pipeline board"
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none focus:ring-1 focus:ring-primary/30 rounded-xl"
        >
          {displayedStages.map((stage) => (
            <PipelineColumn
              key={stage.key}
              id={stage.key}
              title={stage.title}
              deals={groupedDeals[stage.key]}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? <DealCard deal={activeDeal} clickable={false} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
