"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { usePermission } from "@/shared/hooks/usePermissions";

import { getServices } from "@/features/services/services.service";
import { Service } from "@/features/services/service.types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { can } = usePermission();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(true);
        setServices(data);
      } catch {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  const activeCount = services.filter((s) => s.is_active).length;
  const inactiveCount = services.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>

          <p className="text-muted-foreground">
            Manage organization services
          </p>
        </div>

        {can("services:create") && (
          <Link href="/dashboard/services/create">
            <Button>Create Service</Button>
          </Link>
        )}
      </div>

      {/* Summary */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Services</p>

            <p className="mt-2 text-3xl font-bold">
              {services.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active</p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Inactive</p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {inactiveCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}

      <Input
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Content */}

      {loading ? (
        <div className="flex justify-center py-12">
          Loading services...
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <h3 className="font-medium">
            No services found
          </h3>

          <p className="text-sm text-muted-foreground">
            Create your first service to get started.
          </p>

          {can("services:create") && (
            <Link href="/dashboard/services/create">
              <Button>Create Service</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left font-medium">
                  Name
                </th>

                <th className="p-4 text-left font-medium">
                  Base Price
                </th>

                <th className="p-4 text-left font-medium">
                  Status
                </th>

                <th className="p-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredServices.map((service) => (
                <tr
                  key={service.id}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <td className="p-4 font-medium">
                    {service.name}
                  </td>

                  <td className="p-4">
                    ₹
                    {Number(
                      service.base_price
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        service.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      href={`/dashboard/services/${service.id}`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                      >
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