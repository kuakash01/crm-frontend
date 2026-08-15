"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { usePermission } from "@/shared/hooks/usePermissions";
import { usePagination } from "@/shared/hooks/usePagination";

import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

import { getServices } from "@/features/services/services.service";
import { Service } from "@/features/services/service.types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { can } = usePermission();

  const {
    currentPage,
    handlePageChange,
    handleJump,
    visiblePages,
  } = usePagination({
    totalPages: pagination.totalPages,
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);

      // Reset to first page
      handlePageChange(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);

      const data = await getServices({
        search: debouncedSearch || undefined,
        page: currentPage,
        limit: pagination.limit,
        includeInactive: true,
      });

      setServices(data.services);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [debouncedSearch, currentPage]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Services
          </h1>

          <p className="text-muted-foreground">
            Manage organization services
          </p>
        </div>

        {can("services:create") && (
          <Link href="/dashboard/services/create">
            <Button>
              Create Service
            </Button>
          </Link>
        )}
      </div>

      {/* Search */}

      <div className="flex gap-3">
        <div className="relative flex-1">

          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            
          />
        </div>

        <Button
          variant="outline"
          onClick={fetchServices}
        >
          Refresh
        </Button>
      </div>

      {/* Content */}

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="text-sm text-muted-foreground">
            Loading services...
          </span>
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <h3 className="font-medium">
            {pagination.total === 0
              ? "No services yet"
              : "No matching services"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {pagination.total === 0
              ? "Create your first service to get started."
              : "Try adjusting your search."}
          </p>

          {pagination.total === 0 &&
            can("services:create") && (
              <Link href="/dashboard/services/create">
                <Button>
                  Create Service
                </Button>
              </Link>
            )}
        </div>
      ) : (
        <>
          {/* Table */}

          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>
                    Name
                  </TableHead>

                  <TableHead>
                    Base Price
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {services.map((service) => (
                  <TableRow
                    key={service.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>

                    <TableCell>
                      ₹
                      {Number(
                        service.base_price
                      ).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          service.is_active
                            ? "default"
                            : "destructive"
                        }
                      >
                        {service.is_active
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}

          <DataTablePagination
            total={pagination.total}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            currentPage={currentPage}
            visiblePages={visiblePages}
            itemName="services"
            onPageChange={handlePageChange}
            onJump={handleJump}
          />
        </>
      )}
    </div>
  );
}