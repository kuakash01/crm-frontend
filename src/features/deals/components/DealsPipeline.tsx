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

const stages = [
  {
    key: "OPEN",
    title: "Open",
  },
  {
    key: "QUOTATION_SENT",
    title: "Quotation Sent",
  },
  {
    key: "NEGOTIATION",
    title: "Negotiation",
  },
  {
    key: "WON",
    title: "Won",
  },
  {
    key: "LOST",
    title: "Lost",
  },
] as const;

export default function DealsPipeline() {
  const [loading, setLoading] = useState(true);

  const [pipelineDeals, setPipelineDeals] = useState<Deal[]>([]);

  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const fetchPipelineDeals = async () => {
    try {
      setLoading(true);

      const data = await getPipelineDeals();

      setPipelineDeals(data);
    } catch {
      toast.error("Failed to load pipeline");
    } finally {
      setLoading(false);
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

    /*
     * If dropped directly on a pipeline column,
     * get the stage from the column.
     */
    const overStage = over.data.current?.stage;

    if (overStage) {
      newStage = overStage;
    } else {
      /*
       * If dropped on another deal card,
       * use that deal's stage.
       */
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

    if (!deal) {
      setActiveDeal(null);
      return;
    }

    /*
     * Nothing changed.
     */
    if (deal.stage === newStage) {
      setActiveDeal(null);
      return;
    }

    /*
     * Keep previous state so we can rollback
     * if the API request fails.
     */
    const previousDeals = pipelineDeals;

    /*
     * Optimistic UI update.
     */
    setPipelineDeals((currentDeals) =>
      currentDeals.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              stage: newStage,
            }
          : deal,
      ),
    );

    try {
      await updateDealStage(dealId, newStage);

      toast.success("Deal stage updated");
    } catch {
      /*
       * Rollback if API fails.
       */
      setPipelineDeals(previousDeals);

      toast.error("Failed to update deal stage");
    } finally {
      setActiveDeal(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12">Loading pipeline...</div>;
  }

  if (pipelineDeals.length === 0) {
    return (
      <div className="flex justify-center py-12 text-sm text-muted-foreground">
        No deals found.
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 overflow-x-auto pb-4">
        {stages.map((stage) => (
          // <PipelineColumn
          //   key={stage.key}
          //   stage={stage.key}
          //   title={stage.title}
          //   deals={groupedDeals[stage.key]}
          // />
          <PipelineColumn
            key={stage.key}
            id={stage.key}
            title={stage.title}
            deals={groupedDeals[stage.key]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeDeal ? <DealCard deal={activeDeal} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
