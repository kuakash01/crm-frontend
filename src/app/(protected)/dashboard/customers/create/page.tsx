"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AssignmentCard from "@/shared/components/user-assignment/AssigmentCard";

import { createCustomer } from "@/features/customers/customers.service";
import {
  createCustomerSchema,
  CreateCustomerFormData,
} from "@/features/customers/customers.schema";

import { useAppSelector } from "@/store/hooks";
import { UserOption } from "@/shared/components/pickers/customer-picker.types";

export default function CreateCustomerPage() {
  const router = useRouter();

  const currentUser = useAppSelector((state) => state.auth.user);

  const [saving, setSaving] = useState(false);

  const [assignedUser, setAssignedUser] = useState<UserOption | null>(
    currentUser
      ? {
          id: currentUser.id,
          fullname: currentUser.fullname,
        }
      : null,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),

    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone1: "",
      phone2: "",
      company: "",
      assigned_to: currentUser?.id,
    },
  });

  const fname = useWatch({
    control,
    name: "fname",
  });

  const lname = useWatch({
    control,
    name: "lname",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  const phone1 = useWatch({
    control,
    name: "phone1",
  });

  const phone2 = useWatch({
    control,
    name: "phone2",
  });

  const company = useWatch({
    control,
    name: "company",
  });

  const onSubmit = async (data: CreateCustomerFormData) => {
    try {
      setSaving(true);

      const customer = await createCustomer({
        ...data,
        assigned_to: assignedUser?.id,
        created_from: "MANUAL",
      });

      toast.success("Customer created successfully");

      router.push(`/dashboard/customers/${customer.id}`);
    } catch {
      toast.error("Failed to create customer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Customer</h1>

        <p className="text-muted-foreground">Add a new customer manually.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>

                    <Input placeholder="John" {...register("fname")} />

                    {errors.fname && (
                      <p className="text-sm text-red-500">
                        {errors.fname.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Last Name</Label>

                    <Input placeholder="Doe" {...register("lname")} />

                    {errors.lname && (
                      <p className="text-sm text-red-500">
                        {errors.lname.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Primary Phone</Label>

                    <Input
                      placeholder="+91 9876543210"
                      {...register("phone1")}
                    />

                    {errors.phone1 && (
                      <p className="text-sm text-red-500">
                        {errors.phone1.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Phone</Label>

                    <Input
                      placeholder="+91 9876543210"
                      {...register("phone2")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Company</Label>

                  <Input placeholder="ABC Pvt Ltd" {...register("company")} />
                </div>

                {/* Assignment */}

                <AssignmentCard
                  entityName="Customer"
                  assignedUser={{
                    id: assignedUser?.id ?? null,
                    name: assignedUser?.fullname ?? null,
                  }}
                  canAssign={true}
                  onAssign={(user) => {
                    setAssignedUser({
                      id: user.id,
                      fullname: user.fullname,
                    });

                    setValue("assigned_to", user.id);
                  }}
                />

                <div className="flex justify-end gap-3">
                  <Link href="/dashboard/customers">
                    <Button variant="outline">Cancel</Button>
                  </Link>

                  <Button type="submit" disabled={saving}>
                    {saving ? "Creating..." : "Create Customer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right */}

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Customer Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>

                <p className="font-medium">
                  {fname || lname ? `${fname} ${lname}` : "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="font-medium">{email || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Primary Phone</p>

                <p className="font-medium">{phone1 || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Secondary Phone</p>

                <p className="font-medium">{phone2 || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Company</p>

                <p className="font-medium">{company || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>

                <p className="font-medium">
                  {assignedUser?.fullname ?? "Not assigned"}

                  {assignedUser?.id === currentUser?.id && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      (You)
                    </span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Created From</p>

                <p className="font-medium">MANUAL</p>
              </div>

              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-sm font-medium">Manual Customer</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  This customer is being created directly without converting a
                  lead.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
