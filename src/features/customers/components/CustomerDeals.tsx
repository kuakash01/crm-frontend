"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Deal } from "@/features/deals/deals.types";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getCustomerDeals } from "@/features/customers/customers.service";

export default function CustomerDeals({ customerId }: { customerId: number }) {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getCustomerDeals(customerId);
        setDeals(data);
      } catch {
        toast.error("Failed to load deals");
      }
    };

    fetchDeals();
  }, [customerId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deals</h3>

        <Link href={`/dashboard/deals/create?customerId=${customerId}`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Deal
          </Button>
        </Link>
      </div>

      {deals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No deals found.
          </CardContent>
        </Card>
      ) : (
        deals.map((deal: any) => (
          <Card key={deal.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <h4 className="font-medium">{deal.title}</h4>

                <p className="text-sm text-muted-foreground">
                  {deal.service_name}
                </p>

                <p className="text-sm">
                  ₹{Number(deal.price).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-muted px-3 py-1 text-xs">
                  {deal.stage}
                </span>

                <Link href={`/dashboard/deals/${deal.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
