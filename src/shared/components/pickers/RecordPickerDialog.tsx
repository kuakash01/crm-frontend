"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import DataTablePagination from "../pagination/DataTablePagination";

import { usePagination } from "@/shared/hooks/usePagination";

import { getCustomerOptions } from "@/features/customers/customers.service";
import { getLeadOptions } from "@/features/leads/leads.service";
import { getDealOptions } from "@/features/deals/deals.service";
import { getServiceOptions } from "@/features/services/services.service";

import { CustomerOption } from "@/features/customers/customer.types";

export type RecordPickerModule = "CUSTOMER" | "LEAD" | "DEAL" | "SERVICE";

export interface RecordOption {
  id: number;
  name: string;
  subtitle?: string | null;

  meta?: {
    assigned_to?: number | null;
    assigned_to_name?: string | null;
    base_price?: number;
  };
}

interface RecordPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module: RecordPickerModule;
  onSelect: (record: RecordOption) => void;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PickerResult {
  records: RecordOption[];
  pagination: Pagination;
}

interface PickerConfig {
  title: string;
  searchPlaceholder: string;
  itemName: string;

  primaryColumn: string;
  secondaryColumn: string;

  fetch: (params: {
    search: string;
    page: number;
    limit: number;
  }) => Promise<PickerResult>;
}

interface LeadOption {
  id: number;
  fname: string;
  lname: string | null;
  company: string | null;
  email: string | null;
  phone1: string | null;

  assigned_to: number | null;
  assigned_to_name: string | null;
}

interface DealOption {
  id: number;
  title: string;
  customer_id: number;
  customer_name: string;
  customer_company: string | null;
  service_id: number;
  service_name: string;
  price: number | string;
  stage: string;

  assigned_to: number | null;
  assigned_to_name: string | null;
}

const pickerConfig: Record<RecordPickerModule, PickerConfig> = {
  CUSTOMER: {
    title: "Select Customer",

    searchPlaceholder: "Search customer by name, company or phone...",

    itemName: "customers",

    primaryColumn: "Name",
    secondaryColumn: "Company",

    fetch: async ({ search, page, limit }) => {
      const data = await getCustomerOptions({
        search,
        page,
        limit,
      });

      return {
        records: data.customers.map((customer: CustomerOption) => ({
          id: customer.id,

          name:
            `${customer.fname} ${customer.lname ?? ""}`.trim() ||
            customer.company ||
            "Unnamed",

          subtitle: customer.company || customer.phone1,

          meta: {
            assigned_to: customer.assigned_to,
            assigned_to_name: customer.assigned_to_name,
          },
        })),

        pagination: data.pagination,
      };
    },
  },
  LEAD: {
    title: "Select Lead",

    searchPlaceholder: "Search lead by name, company or phone...",

    itemName: "leads",

    primaryColumn: "Name",
    secondaryColumn: "Company",

    fetch: async ({ search, page, limit }) => {
      const data = await getLeadOptions({
        search,
        page,
        limit,
      });

      return {
        records: data.leads.map((lead: LeadOption) => ({
          id: lead.id,

          name:
            `${lead.fname} ${lead.lname ?? ""}`.trim() ||
            lead.company ||
            "Unnamed",

          subtitle: lead.company || lead.email || lead.phone1,

          meta: {
            assigned_to: lead.assigned_to,
            assigned_to_name: lead.assigned_to_name,
          },
        })),

        pagination: data.pagination,
      };
    },
  },

  DEAL: {
    title: "Select Deal",

    searchPlaceholder: "Search deal by title, customer or service...",

    itemName: "deals",

    primaryColumn: "Deal",
    secondaryColumn: "Customer",

    fetch: async ({ search, page, limit }) => {
      const data = await getDealOptions({
        search,
        page,
        limit,
      });

      return {
        records: data.deals.map((deal: DealOption) => ({
          id: deal.id,

          name: deal.title,

          subtitle: deal.customer_company || deal.customer_name,

          meta: {
            assigned_to: deal.assigned_to,
            assigned_to_name: deal.assigned_to_name,
          },
        })),

        pagination: data.pagination,
      };
    },
  },

  SERVICE: {
    title: "Select Service",

    searchPlaceholder: "Search service by name...",

    itemName: "services",

    primaryColumn: "Service",
    secondaryColumn: "Base Price",

    fetch: async ({ search, page, limit }) => {
      const data = await getServiceOptions({
        search,
        page,
        limit,
      });

      return {
        records: data.services.map((service) => ({
          id: service.id,
          name: service.name,
          subtitle: `₹${Number(service.base_price).toLocaleString()}`,

          meta: {
            base_price: Number(service.base_price),
          },
        })),

        pagination: data.pagination,
      };
    },
  },
};

export default function RecordPickerDialog({
  open,
  onOpenChange,
  module,
  onSelect,
}: RecordPickerDialogProps) {
  const config = pickerConfig[module];

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState<RecordOption[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  const fetchRecords = async () => {
    try {
      setLoading(true);

      const data = await config.fetch({
        search,
        page: currentPage,
        limit: 10,
      });

      setRecords(data.records);

      setPagination(data.pagination);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    fetchRecords();
  }, [open, currentPage, search, module]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setRecords([]);
      handlePageChange(1);
    }
  }, [open]);

  useEffect(() => {
    setSearch("");
    setRecords([]);

    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });

    handlePageChange(1);
  }, [module]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);

        if (!value) {
          setSearch("");
          setRecords([]);
          handlePageChange(1);
        }
      }}
    >
      <DialogContent
        className="
    flex
    max-h-[90vh]
    w-[calc(100vw-2rem)]
    max-w-6xl
    flex-col
    gap-4
    overflow-hidden
    p-4
    sm:p-6
    lg:w-[90vw]
    xl:max-w-7xl
  "
      >
        {/* Header */}

        <DialogHeader>
          <DialogTitle className="text-xl">{config.title}</DialogTitle>
        </DialogHeader>

        {/* Search */}

        <div className="relative">
          <Input
            placeholder={config.searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              if (currentPage !== 1) {
                handlePageChange(1);
              }
            }}
            className="h-10"
          />
        </div>

        {/* Table */}

        <div className="h-[420px] max-h-[55vh] min-h-0 overflow-hidden rounded-lg border">
          <div className="h-full overflow-y-auto">
            {loading ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <div className="text-sm text-muted-foreground">
                  Loading {config.itemName}...
                </div>
              </div>
            ) : records.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center gap-1 px-6 text-center">
                <p className="font-medium">
                  No {config.itemName.slice(0, -1)} found
                </p>

                {search && (
                  <p className="text-sm text-muted-foreground">
                    Try a different search.
                  </p>
                )}
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 z-10 border-b bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {config.primaryColumn}
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {config.secondaryColumn}
                    </th>

                    <th className="w-[120px] px-4 py-3 text-right text-sm font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b transition-colors last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{record.name}</div>
                      </td>

                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {record.subtitle || "-"}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onSelect(record);

                            onOpenChange(false);
                          }}
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination */}

        {pagination.total > 0 && (
          <div className="min-w-0 border-t pt-4">
            <div className="overflow-x-auto pb-1">
              <div className="flex min-w-max justify-center">
                <DataTablePagination
                  total={pagination.total}
                  limit={pagination.limit}
                  totalPages={pagination.totalPages}
                  currentPage={currentPage}
                  visiblePages={visiblePages}
                  itemName={config.itemName}
                  onPageChange={handlePageChange}
                  onJump={handleJump}
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
