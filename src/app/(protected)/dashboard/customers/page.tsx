"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

import { Card, CardContent } from "@/components/ui/card";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

// hooks
import { usePermission } from "@/shared/hooks/usePermissions";
import { usePagination } from "@/shared/hooks/usePagination";

import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

import {
  getCustomers,
  assignCustomers,
} from "@/features/customers/customers.service";

import { Customer, CustomerCounts } from "@/features/customers/customer.types";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, UserRoundPlus } from "lucide-react";

import QuickAssignment from "@/shared/components/user-assignment/QuickAssignment";

const statuses = ["ALL", "ACTIVE", "ON_HOLD", "INACTIVE", "CHURNED"] as const;

export default function CustomersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [counts, setCounts] = useState<CustomerCounts>({
    ALL: 0,
    ACTIVE: 0,
    ON_HOLD: 0,
    INACTIVE: 0,
    CHURNED: 0,
  });

  // pagination states
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  const start = (currentPage - 1) * pagination.limit + 1;

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const status = searchParams.get("status") ?? "ALL";

  const { can } = usePermission();

  const [bulkMode, setBulkMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";

      case "ON_HOLD":
        return "secondary";

      case "CHURNED":
        return "destructive";

      case "INACTIVE":
        return "outline";

      default:
        return "secondary";
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers({
        status: status === "ALL" ? undefined : status,
        search: debouncedSearch || undefined,
        page: currentPage,
        limit: pagination?.limit || 10,
      });
      setCustomers(data.customers);
      setCounts(data.counts);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [status, currentPage, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      handlePageChange(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams);

    if (newStatus === "ALL") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    // Reset to first page
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>

          <p className="text-muted-foreground">Manage customers</p>
        </div>

        <div className="flex gap-2">
          {can("customers:create") && (
            <Link href="/dashboard/customers/create">
              <Button>Create Customer</Button>
            </Link>
          )}
        </div>
      </div>

      <Card>
        {bulkMode && selectedCustomers.length > 0 && (
          <div className="flex items-center justify-between border-b px-6 py-3">
            <p className="text-sm font-medium">
              {selectedCustomers.length === 1
                ? "1 Customers selected"
                : `${selectedCustomers.length} Customers selected`}
            </p>

            <QuickAssignment
              entityName="Customers"
              canAssign={can("customers:assign") || false}
              onAssign={async (user) => {
                try {
                  await assignCustomers({
                    customerIds: selectedCustomers,
                    assignedTo: user.id,
                  });

                  toast.success(
                    selectedCustomers.length === 1
                      ? "Customer assigned successfully"
                      : "Customers assigned successfully",
                  );

                  setSelectedCustomers([]);
                  setBulkMode(false);

                  await fetchCustomers();
                } catch {
                  toast.error("Failed to assign customers.");
                }
              }}
            />
          </div>
        )}

        <CardContent className="space-y-4">
          {/* Tabs */}
          <Tabs value={status} onValueChange={handleStatusChange}>
            <TabsList className="flex w-full justify-start overflow-x-auto">
              {statuses.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item.charAt(0) + item.slice(1).toLowerCase()} (
                  {counts[item] ?? 0})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {/* Search */}
          <div className="flex gap-3">
            <Input
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {can("customers:assign") && (
              <Button
                variant="outline"
                onClick={() => {
                  setBulkMode(!bulkMode);

                  if (bulkMode) {
                    setSelectedCustomers([]);
                  }
                }}
              >
                {bulkMode ? "Cancel" : "Select Customers"}
              </Button>
            )}

            <Button variant="outline" onClick={fetchCustomers}>
              Refresh
            </Button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-12">Loading leads...</div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-medium">
                {counts.ALL === 0
                  ? "No customers yet"
                  : "No matching customers"}
              </h3>

              <p className="text-sm text-muted-foreground">
                {counts.ALL === 0
                  ? "Create your first customer to start managing customer relationships."
                  : "Try adjusting your search or filters."}
              </p>

              {counts.ALL === 0 && can("customers:create") && (
                <Link href="/dashboard/customers/create">
                  <Button>Create Customer</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {bulkMode && can("customers:assign") && (
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            customers.length > 0 &&
                            selectedCustomers.length === customers.length
                          }
                          onCheckedChange={(checked) => {
                            setSelectedCustomers(
                              checked
                                ? customers.map((customer) => customer.id)
                                : [],
                            );
                          }}
                        />
                      </TableHead>
                    )}

                    <TableHead className="p-4 text-left font-medium">
                      #
                    </TableHead>

                    <TableHead className="p-4 text-left font-medium">
                      Customer
                    </TableHead>

                    <TableHead className="p-4 text-left font-medium">
                      Company
                    </TableHead>

                    <TableHead className="p-4 text-left font-medium">
                      Status
                    </TableHead>
                    <TableHead className="p-4 text-left font-medium">
                      Assigned to
                    </TableHead>

                    {/* <th className="p-4 text-left font-medium">Assigned To</th> */}

                    <TableHead className="p-4 text-right font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow key={customer.id} className="border-b">
                      {bulkMode && can("customers:assign") && (
                        <TableCell>
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCustomers((prev) => [
                                  ...prev,
                                  customer.id,
                                ]);
                              } else {
                                setSelectedCustomers((prev) =>
                                  prev.filter((id) => id !== customer.id),
                                );
                              }
                            }}
                          />
                        </TableCell>
                      )}
                      <TableCell className="p-4">
                        <div className="font-medium">{start + index}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {customer.fname} {customer.lname}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {customer.phone1}
                            {customer.phone2 ? ` • ${customer.phone2}` : ""}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {customer.company || "-"}
                      </TableCell>

                      <TableCell>
                        <Badge variant={getStatusVariant(customer.status)}>
                          {customer.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {customer.assigned_to_name ? (
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {customer.assigned_to_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <span>{customer.assigned_to_name}</span>
                          </div>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                      </TableCell>

                      {/* <TableCell className="p-4 text-right">
                        <Link href={`/dashboard/customers/${customer.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </TableCell> */}
                      <TableCell className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild className="text-nowrap">
                              <Link
                                href={`/dashboard/customers/${customer.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>

                            {can("leads:assign") && (
                              <DropdownMenuItem
                                className="text-nowrap"
                                onClick={() => {
                                  setBulkMode(true);
                                  setSelectedCustomers([customer.id]);
                                }}
                              >
                                <UserRoundPlus className="mr-2 h-4 w-4" />
                                Assign
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* pagination */}

      <DataTablePagination
        total={pagination.total}
        limit={pagination.limit}
        totalPages={pagination.totalPages}
        currentPage={currentPage}
        visiblePages={visiblePages}
        itemName="customers"
        onPageChange={handlePageChange}
        onJump={handleJump}
      />
    </div>
  );
}
