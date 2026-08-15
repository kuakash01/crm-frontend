"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import DealCard from "./DealCard";
import { Deal } from "../deals.types";

interface Props {
  deal: Deal;
}

export default function SortableDealCard({ deal }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: deal.id,
      data: {
        stage: deal.stage,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <DealCard deal={deal} />
    </div>
  );
}
