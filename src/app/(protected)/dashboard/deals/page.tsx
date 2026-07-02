"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { usePermission } from "@/shared/hooks/usePermissions";

import { getDeals } from "@/features/deals/deals.service";

import { Deal } from "@/features/deals/deals.types";

const stages = ["ALL", "OPEN", "QUOTATION_SENT", "NEGOTIATION", "WON", "LOST"];

export default function DealsPage() {
  const [loading, setLoading] = useState(true);

  const [deals, setDeals] = useState<Deal[]>([]);

  const [search, setSearch] = useState("");

  const [stage, setStage] = useState("ALL");

  const { can } = usePermission();

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const data = await getDeals({
        stage,
        search,
      });

      setDeals(data);
    } catch {
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.title.toLowerCase().includes(search.toLowerCase()) ||
        deal.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        deal.service_name?.toLowerCase().includes(search.toLowerCase());

      const matchesStage = stage === "ALL" ? true : deal.stage === stage;

      return matchesSearch && matchesStage;
    });
  }, [deals, search, stage]);

  const counts = {
    ALL: deals.length,

    OPEN: deals.filter((d) => d.stage === "OPEN").length,

    QUOTATION_SENT: deals.filter((d) => d.stage === "QUOTATION_SENT").length,

    NEGOTIATION: deals.filter((d) => d.stage === "NEGOTIATION").length,

    WON: deals.filter((d) => d.stage === "WON").length,

    LOST: deals.filter((d) => d.stage === "LOST").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deals</h1>

          <p className="text-muted-foreground">Manage sales opportunities</p>
        </div>

        {can("deals:create") && (
          <Link href="/dashboard/deals/create">
            <Button>Create Deal</Button>
          </Link>
        )}
      </div>

      <Tabs value={stage} onValueChange={setStage}>
        <TabsList className="flex w-full justify-start overflow-x-auto">
          {stages.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item === "ALL"
                ? `All (${counts.ALL})`
                : `${item.replaceAll("_", " ")} (${counts[item as keyof typeof counts]})`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Input
        placeholder="Search deals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center py-12">Loading deals...</div>
      ) : filteredDeals.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <h3 className="font-medium">No deals found</h3>

          <p className="text-sm text-muted-foreground">
            Create your first deal to get started.
          </p>

          {can("deals:create") && (
            <Link href="/dashboard/deals/create">
              <Button>Create Deal</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left font-medium">Title</th>

                <th className="p-4 text-left font-medium">Customer</th>

                <th className="p-4 text-left font-medium">Service</th>

                <th className="p-4 text-left font-medium">Deal Value</th>

                <th className="p-4 text-left font-medium">Stage</th>

                <th className="p-4 text-left font-medium">Assigned To</th>

                <th className="p-4 text-left font-medium">Expected Close</th>

                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-medium">{deal.title}</td>

                  <td className="p-4">{deal.customer_name}</td>

                  <td className="p-4">{deal.service_name}</td>

                  <td className="p-4">
                    ₹{Number(deal.price).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium
                  ${
                    deal.stage === "OPEN"
                      ? "bg-blue-100 text-blue-700"
                      : deal.stage === "QUOTATION_SENT"
                        ? "bg-purple-100 text-purple-700"
                        : deal.stage === "NEGOTIATION"
                          ? "bg-yellow-100 text-yellow-700"
                          : deal.stage === "WON"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                  }`}
                    >
                      {deal.stage.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="p-4">
                    {deal.assigned_to_name ?? "Unassigned"}
                  </td>

                  <td className="p-4">
                    {deal.expected_close_date
                      ? new Date(deal.expected_close_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 text-right">
                    <Link href={`/dashboard/deals/${deal.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
