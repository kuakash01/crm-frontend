"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getLeads, assignLeads } from "@/features/leads/leads.service";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

// hooks
import { usePermission } from "@/shared/hooks/usePermissions";
import { usePagination } from "@/shared/hooks/usePagination";

import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

import { Lead, LeadCounts } from "@/features/leads/leads.types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const leadStatuses = [
  "ALL",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "CONVERTED",
  "LOST",
] as const;

export default function LeadsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [bulkMode, setBulkMode] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const status = searchParams.get("status") ?? "ALL";
  const [counts, setCounts] = useState<LeadCounts>({
    ALL: 0,
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    PROPOSAL: 0,
    NEGOTIATION: 0,
    CONVERTED: 0,
    LOST: 0,
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

  const { can } = usePermission();

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads({
        status,
        search: debouncedSearch,
        page: currentPage,
        limit: pagination.limit,
      });
      setLeads(data.leads);
      setCounts(data.counts);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONVERTED":
        return "default";

      case "LOST":
        return "destructive";

      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>

          <p className="text-muted-foreground">Manage and track all leads</p>
        </div>

        <div className="flex gap-2">
          {can("leads:create") && (
            <Link href="/dashboard/leads/create">
              <Button>Create Lead</Button>
            </Link>
          )}
        </div>
      </div>

      {/* leads  */}
      <Card>
        <CardContent className="space-y-4">
          <Tabs value={status} onValueChange={handleStatusChange}>
            <TabsList className="flex w-full justify-start overflow-x-auto">
              {leadStatuses.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item.charAt(0) + item.slice(1).toLowerCase()} (
                  {counts[item] ?? 0})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex gap-3">
            <Input
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {can("leads:assign") && (
              <Button
                variant="outline"
                onClick={() => {
                  setBulkMode(!bulkMode);

                  if (bulkMode) {
                    setSelectedLeads([]);
                  }
                }}
              >
                {bulkMode ? "Cancel" : "Select Leads"}
              </Button>
            )}

            <Button variant="outline" onClick={fetchLeads}>
              Refresh
            </Button>
          </div>

          {bulkMode && selectedLeads.length > 0 && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
              <span className="text-sm font-medium">
                {selectedLeads.length === 1
                  ? "1 lead selected"
                  : `${selectedLeads.length} leads selected`}
              </span>

              <QuickAssignment
                entityName="Leads"
                canAssign={can("leads:assign") || false}
                onAssign={async (user) => {
                  try {
                    await assignLeads({
                      leadIds: selectedLeads,
                      assignedTo: user.id,
                    });

                    toast.success(
                      selectedLeads.length === 1
                        ? "Lead assigned successfully"
                        : "Leads assigned successfully",
                    );

                    setSelectedLeads([]);
                    setBulkMode(false);

                    await fetchLeads();
                  } catch {
                    toast.error("Failed to assign leads");
                  }
                }}
              />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-medium">
                {counts.ALL === 0 ? "No leads yet" : "No matching leads"}
              </h3>

              <p className="text-sm text-muted-foreground">
                {counts.ALL === 0
                  ? "Create your first lead to start managing potential customers."
                  : "Try adjusting your search or filters."}
              </p>

              {counts.ALL === 0 && can("leads:create") && (
                <Link href="/dashboard/leads/create">
                  <Button>Create Lead</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    {can("leads:assign") && bulkMode && (
                      <TableHead className="w-12 p-4">
                        <Checkbox
                          checked={
                            leads.length > 0 &&
                            selectedLeads.length === leads.length
                          }
                          onCheckedChange={(checked) => {
                            setSelectedLeads(
                              checked ? leads.map((lead) => lead.id) : [],
                            );
                          }}
                        />
                      </TableHead>
                    )}

                    <TableHead className="p-4 text-left font-medium">
                      #
                    </TableHead>
                    <TableHead className="p-4 text-left font-medium">
                      Lead
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

                    <TableHead className="p-4 text-left font-medium">
                      Source
                    </TableHead>

                    {/* <th className="p-4 text-left font-medium">Assigned To</th> */}

                    <TableHead className="p-4 text-right font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {leads.map((lead, index) => (
                    <TableRow
                      key={lead.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      {can("leads:assign") && bulkMode && (
                        <TableCell className="p-4">
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLeads((prev) => [...prev, lead.id]);
                              } else {
                                setSelectedLeads((prev) =>
                                  prev.filter((id) => id !== lead.id),
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
                            {lead.fname} {lead.lname}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {lead.email}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {lead.phone1}
                            {lead.phone2 ? ` • ${lead.phone2}` : ""}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="p-4">
                        {lead.company || "-"}
                      </TableCell>

                      <TableCell className="p-4">
                        <div className="flex gap-2">
                          <Badge variant={getStatusVariant(lead.status)}>
                            {lead.status}
                          </Badge>

                          {/* {lead.converted_at && (
                            <Badge variant="outline">Customer</Badge>
                          )} */}
                        </div>
                      </TableCell>

                      <TableCell className="p-4">
                        {lead.assigned_to_name ? (
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {lead.assigned_to_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <span>{lead.assigned_to_name}</span>
                          </div>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>

                      <TableCell className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild className="text-nowrap">
                              <Link href={`/dashboard/leads/${lead.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>

                            {can("leads:assign") && (
                              <DropdownMenuItem
                                className="text-nowrap"
                                onClick={() => {
                                  setBulkMode(true);
                                  setSelectedLeads([lead.id]);
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
        itemName="leads"
        onPageChange={handlePageChange}
        onJump={handleJump}
      />
    </div>
  );
}
