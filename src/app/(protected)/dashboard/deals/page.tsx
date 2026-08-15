"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { usePermission } from "@/shared/hooks/usePermissions";

import DealsTable from "@/features/deals/components/DealsTable";
import DealsPipeline from "@/features/deals/components/DealsPipeline";

export default function DealsPage() {
  const [view, setView] =
    useState<"table" | "pipeline">("table");

  const { can } = usePermission();

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Deals
          </h1>

          <p className="text-muted-foreground">
            Manage sales opportunities
          </p>
        </div>

        {can("deals:create") && (
          <Link href="/dashboard/deals/create">
            <Button>
              Create Deal
            </Button>
          </Link>
        )}
      </div>

      {/* View switch */}

      <div className="flex items-center gap-2">
        <Button
          variant={
            view === "table"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setView("table")
          }
        >
          Table
        </Button>

        <Button
          variant={
            view === "pipeline"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setView("pipeline")
          }
        >
          Pipeline
        </Button>
      </div>

      {/* Content */}

      <Card>
        <CardContent className="space-y-4">
          {view === "table" ? (
            <DealsTable />
          ) : (
            <DealsPipeline />
          )}
        </CardContent>
      </Card>
    </div>
  );
}