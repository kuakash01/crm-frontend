"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createDealSchema,
  CreateDealFormData,
} from "@/features/deals/deals.schema";

import { createDeal } from "@/features/deals/deals.service";

import RecordPickerDialog, {
  RecordOption,
} from "@/shared/components/pickers/RecordPickerDialog";

import { getCustomerById } from "@/features/customers/customers.service";
import { Customer } from "@/features/customers/customer.types";

import { useAppSelector } from "@/store/hooks";

export default function CreateDealPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const customerId = searchParams.get("customerId");

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [customerPickerOpen, setCustomerPickerOpen] =
    useState(false);

  const [servicePickerOpen, setServicePickerOpen] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<RecordOption | null>(null);

  const [selectedService, setSelectedService] =
    useState<RecordOption | null>(null);

  const [customerDetails, setCustomerDetails] =
    useState<Customer | null>(null);

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

  const serviceId = useWatch({
    control,
    name: "service_id",
  });

  const dealValue = useWatch({
    control,
    name: "price",
  });

  /*
   * Initial form setup
   */
  useEffect(() => {
    if (currentUser?.id) {
      setValue(
        "assigned_to",
        currentUser.id
      );
    }

    if (customerId) {
      setValue(
        "customer_id",
        Number(customerId)
      );
    }

    setLoading(false);
  }, [
    currentUser?.id,
    customerId,
    setValue,
  ]);

  /*
   * Load customer when creating
   * a deal from customer page.
   */
  useEffect(() => {
    if (!customerId) return;

    const loadCustomer = async () => {
      try {
        const customer =
          await getCustomerById(
            Number(customerId)
          );

        setSelectedCustomer({
          id: customer.id,

          name:
            `${customer.fname} ${
              customer.lname ?? ""
            }`.trim() ||
            customer.company ||
            "Unnamed",

          subtitle:
            customer.company ||
            customer.phone1 ||
            null,
        });

        setCustomerDetails(customer);

        setValue(
          "customer_id",
          customer.id
        );
      } catch {
        toast.error(
          "Failed to load customer"
        );
      }
    };

    loadCustomer();
  }, [customerId, setValue]);

  /*
   * Load full customer details
   * after selecting from picker.
   */
  useEffect(() => {
    if (!selectedCustomer) return;

    const loadCustomer = async () => {
      try {
        const customer =
          await getCustomerById(
            selectedCustomer.id
          );

        setCustomerDetails(customer);
      } catch {
        toast.error(
          "Failed to load customer"
        );
      }
    };

    loadCustomer();
  }, [selectedCustomer]);

  /*
   * When a service is selected,
   * automatically use its base price.
   */
  useEffect(() => {
    if (!selectedService) return;

    const basePrice =
      selectedService.meta?.base_price;

    if (
      typeof basePrice === "number"
    ) {
      setValue(
        "price",
        basePrice
      );
    }
  }, [
    selectedService,
    setValue,
  ]);

  const onSubmit = async (
    data: CreateDealFormData
  ) => {
    try {
      setSaving(true);

      const deal =
        await createDeal(data);

      toast.success(
        "Deal created successfully"
      );

      router.push(
        `/dashboard/deals/${deal.id}`
      );
    } catch {
      toast.error(
        "Failed to create deal"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Create Deal
        </h1>

        <p className="text-muted-foreground">
          Create a new sales opportunity
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          Loading...
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side */}

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Deal Information
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit(
                    onSubmit
                  )}
                  className="space-y-6"
                >
                  {/* Title */}

                  <div className="space-y-2">
                    <Label>
                      Deal Title
                    </Label>

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
                    <Label>
                      Customer
                    </Label>

                    <div
                      onClick={() =>
                        !customerId &&
                        setCustomerPickerOpen(
                          true
                        )
                      }
                      className={`flex min-h-10 items-center justify-between rounded-md border bg-background p-2 transition-colors ${
                        !customerId
                          ? "cursor-pointer hover:bg-muted/40"
                          : "cursor-default"
                      }`}
                    >
                      {selectedCustomer ? (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {
                              selectedCustomer.name
                            }
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {selectedCustomer.subtitle ??
                              "No additional information"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Select customer
                        </span>
                      )}

                      {!customerId && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                        >
                          {selectedCustomer
                            ? "Change"
                            : "Browse"}
                        </Button>
                      )}
                    </div>

                    {errors.customer_id && (
                      <p className="text-sm text-red-500">
                        {
                          errors.customer_id
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* Service */}

                  <div className="space-y-2">
                    <Label>
                      Service
                    </Label>

                    <div
                      onClick={() =>
                        setServicePickerOpen(
                          true
                        )
                      }
                      className="flex min-h-10 cursor-pointer items-center justify-between rounded-md border bg-background p-2 transition-colors hover:bg-muted/40"
                    >
                      {selectedService ? (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {
                              selectedService.name
                            }
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {selectedService.subtitle ??
                              "No additional information"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Select service
                        </span>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                      >
                        {selectedService
                          ? "Change"
                          : "Browse"}
                      </Button>
                    </div>

                    {errors.service_id && (
                      <p className="text-sm text-red-500">
                        {
                          errors.service_id
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* Deal Value */}

                  <div className="space-y-2">
                    <Label>
                      Deal Value (₹)
                    </Label>

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
                    <Label>
                      Expected Close Date
                    </Label>

                    <Input
                      type="date"
                      {...register(
                        "expected_close_date"
                      )}
                    />
                  </div>

                  {/* Buttons */}

                  <div className="flex justify-end gap-3">
                    <Link href="/dashboard/deals">
                      <Button
                        variant="outline"
                        type="button"
                      >
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      type="submit"
                      disabled={saving}
                    >
                      {saving
                        ? "Creating..."
                        : "Create Deal"}
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
                <CardTitle>
                  Deal Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Customer */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Customer
                  </p>

                  <p className="font-medium">
                    {selectedCustomer?.name ??
                      "Not selected"}
                  </p>
                </div>

                {/* Service */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Service
                  </p>

                  <p className="font-medium">
                    {selectedService?.name ??
                      "Not selected"}
                  </p>
                </div>

                {/* Deal Value */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Deal Value
                  </p>

                  {Number(dealValue) > 0 ? (
                    <p className="text-2xl font-bold">
                      ₹
                      {Number(
                        dealValue
                      ).toLocaleString()}
                    </p>
                  ) : (
                    <p>Not specified</p>
                  )}
                </div>

                {/* Deal Owner */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Deal Owner
                  </p>

                  {selectedCustomer ? (
                    <p className="font-medium">
                      {customerDetails?.assigned_to_name ??
                        "Not assigned"}{" "}
                      {customerDetails?.assigned_to ===
                        currentUser?.id && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (You)
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="font-medium">
                      Not available
                    </p>
                  )}
                </div>

                {/* Initial Stage */}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Initial Stage
                  </p>

                  <p className="font-medium">
                    OPEN
                  </p>
                </div>

                {/* Customer Context */}

                {customerId && (
                  <div className="rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-medium">
                      Creating from Customer
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      This deal was started from
                      the customer profile.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Customer Picker */}

      <RecordPickerDialog
        open={
          customerPickerOpen &&
          !customerId
        }
        onOpenChange={
          setCustomerPickerOpen
        }
        module="CUSTOMER"
        onSelect={(customer) => {
          setSelectedCustomer(
            customer
          );

          setValue(
            "customer_id",
            customer.id
          );
        }}
      />

      {/* Service Picker */}

      <RecordPickerDialog
        open={servicePickerOpen}
        onOpenChange={
          setServicePickerOpen
        }
        module="SERVICE"
        onSelect={(service) => {
          setSelectedService(
            service
          );

          setValue(
            "service_id",
            service.id
          );
        }}
      />
    </div>
  );
}