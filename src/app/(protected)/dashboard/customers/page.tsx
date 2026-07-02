"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { usePermission } from "@/shared/hooks/usePermissions";

import { getCustomers } from "@/features/customers/customers.service";

import { Customer } from "@/features/customers/customer.types";

const statuses = ["ALL", "ACTIVE", "ON_HOLD", "INACTIVE", "CHURNED"];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const { can } = usePermission();

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
      const data = await getCustomers();

      setCustomers(data);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        `${customer.fname} ${customer.lname}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        (customer.company ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ? true : customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  // if (loading) {
  //   return <div className="p-6">Loading customers...</div>;
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>

          <p className="text-muted-foreground">Manage customers</p>
        </div>

        {can("customers:create") && (
          <Link href="/dashboard/customers/create">
            <Button>Create Customer</Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>

          <CardDescription>
            {filteredCustomers.length} customer
            {filteredCustomers.length !== 1 && "s"} found
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tabs */}
          <Tabs value={status} onValueChange={setStatus}>
            <TabsList className="flex w-full justify-start overflow-x-auto">
              {statuses.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item.charAt(0) + item.slice(1).toLowerCase()}
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

            <Button variant="outline" onClick={fetchCustomers}>
              Refresh
            </Button>
          </div>
          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-12">Loading leads...</div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-medium">No Customers found</h3>

              <p className="text-sm text-muted-foreground">
                Create Customer directly to get started.
              </p>

              <Link href="/dashboard/leads/create">
                <Button>Create Customer</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 text-left font-medium">Name</th>

                    <th className="p-4 text-left font-medium">Email</th>

                    <th className="p-4 text-left font-medium">Phone</th>

                    <th className="p-4 text-left font-medium">Company</th>

                    <th className="p-4 text-left font-medium">Status</th>

                    {/* <th className="p-4 text-left font-medium">Assigned To</th> */}

                    <th className="p-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="p-4">
                        {customer.fname} {customer.lname}
                      </td>

                      <td className="p-4">{customer.email}</td>

                      <td className="p-4">{customer.phone1},{customer.phone2}</td>
                      <td className="p-4">{customer.company}</td>

                      <td className="p-4">
                        <Badge variant={getStatusVariant(customer.status)}>
                            {customer.status}
                          </Badge>
                          </td>

                      <td className="p-4 text-right">
                        <Link href={`/dashboard/customers/${customer.id}`}>
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
        </CardContent>
      </Card>

      {/* <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Company</th>

                <th className="p-4 text-left">Owner</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="p-4">
                    {customer.fname} {customer.lname}
                  </td>

                  <td className="p-4">{customer.email}</td>

                  <td className="p-4">{customer.company}</td>

                  <td className="p-4">
                    {customer.assigned_to_name ?? "Unassigned"}
                  </td>

                  <td className="p-4">{customer.status}</td>

                  <td className="p-4 text-right">
                    <Link href={`/dashboard/customers/${customer.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card> */}
    </div>
  );
}
