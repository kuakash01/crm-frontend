
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createDealSchema,
  CreateDealFormData,
} from "@/features/deals/deals.schema";

import { createDeal } from "@/features/deals/deals.service";

import { getCustomers } from "@/features/customers/customers.service";

import { getServices } from "@/features/services/services.service";

import { getAssignableUsers } from "@/shared/services/user.service";

import { Customer } from "@/features/customers/customer.types";

import { Service } from "@/features/services/service.types";

import { User } from "@/features/users/users.types";

export default function CreateDealPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const customerId = searchParams.get("customerId");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [services, setServices] = useState<Service[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const {
    register,

    handleSubmit,

    control,

    setValue,

    formState: { errors },
  } = useForm<CreateDealFormData>({
    resolver: zodResolver(createDealSchema),

    defaultValues: {
      title: "",

      price: 0,

      notes: "",
    },
  });

  const selectedCustomer = useWatch({
    control,
    name: "customer_id",
  });

  const selectedService = useWatch({
    control,
    name: "service_id",
  });

  const selectedAssignee = useWatch({
    control,
    name: "assigned_to",
  });

  const dealValue = useWatch({
    control,
    name: "price",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersData, servicesData, usersData] = await Promise.all([
        getCustomers(),

        getServices(),

        getAssignableUsers(),
      ]);

      setCustomers(customersData);

      setServices(servicesData);

      setUsers(usersData);

      if (customerId) {
        setValue("customer_id", Number(customerId));
      }
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedService) return;

    const service = services.find((s) => s.id === selectedService);

    if (!service) return;

    setValue("price", Number(service.base_price));
  }, [selectedService, services, setValue]);

  const customer = customers.find((c) => c.id === selectedCustomer);

  const service = services.find((s) => s.id === selectedService);

  const assignee = users.find((u) => u.id === selectedAssignee);

  const onSubmit = async (data: CreateDealFormData) => {
    try {
      setSaving(true);

      const deal = await createDeal(data);

      toast.success("Deal created successfully");

      router.push(`/dashboard/deals/${deal.id}`);
    } catch {
      toast.error("Failed to create deal");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Create Deal</h1>

        <p className="text-muted-foreground">Create a new sales opportunity</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">Loading...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side */}

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>

              <CardContent>
                <form className="space-y-6">
                  {/* Title */}

                  <div className="space-y-2">
                    <Label>Deal Title</Label>

                    <Input
                      placeholder="Website Redesign"
                      {...register("title")}
                    />

                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Customer */}

                  <div className="space-y-2">
                    <Label>Customer</Label>

                    <Select
                      value={selectedCustomer?.toString()}
                      onValueChange={(value) =>
                        setValue("customer_id", Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>

                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={customer.id.toString()}
                          >
                            {customer.fname} {customer.lname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service */}

                  <div className="space-y-2">
                    <Label>Service</Label>

                    <Select
                      value={selectedService?.toString()}
                      onValueChange={(value) =>
                        setValue("service_id", Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>

                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id.toString()}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {service?.description && (
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Deal Value */}

                  <div className="space-y-2">
                    <Label>Deal Value</Label>

                    <Input
                      type="number"
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                    />

                    {errors.price && (
                      <p className="text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Expected Close Date */}

                  <div className="space-y-2">
                    <Label>Expected Close Date</Label>

                    <Input type="date" {...register("expected_close_date")} />
                  </div>

                  {/* Assigned To */}

                  <div className="space-y-2">
                    <Label>Assigned To</Label>

                    <Select
                      value={selectedAssignee?.toString()}
                      onValueChange={(value) =>
                        setValue("assigned_to", Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>

                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.fullname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}

                  <div className="space-y-2">
                    <Label>Notes</Label>

                    <Textarea
                      rows={5}
                      placeholder="Additional notes..."
                      {...register("notes")}
                    />
                  </div>

                  {/* part 2 */}
                  {/* Buttons */}

                  <div className="flex justify-end gap-3">
                    <Link href="/dashboard/deals">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      type="button"
                      disabled={saving}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {saving ? "Creating..." : "Create Deal"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side */}

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Deal Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>

                  <p className="font-medium">
                    {customer
                      ? `${customer.fname} ${customer.lname}`
                      : "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Service</p>

                  <p className="font-medium">
                    {service?.name ?? "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Deal Value</p>

                  <p className="text-2xl font-bold">
                    ₹{Number(dealValue ?? 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>

                  <p className="font-medium">
                    {assignee?.fullname ?? "Unassigned"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Initial Stage</p>

                  <p className="font-medium">OPEN</p>
                </div>

                {customerId && (
                  <div className="rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-medium">
                      Creating from Customer
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      This deal was started from the customer profile.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
