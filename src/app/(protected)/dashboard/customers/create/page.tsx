"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import OwnerSelect from "@/shared/components/user-assignment/OwnerSelect";
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

  const fname = useWatch({ control, name: "fname" });
  const lname = useWatch({ control, name: "lname" });
  const email = useWatch({ control, name: "email" });
  const phone1 = useWatch({ control, name: "phone1" });
  const phone2 = useWatch({ control, name: "phone2" });
  const company = useWatch({ control, name: "company" });

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

  const fullName = `${fname || ""} ${lname || ""}`.trim();
  const initials = (fname?.[0] || "") + (lname?.[0] || "") || "NC";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Customers
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Customer</h1>
        <p className="text-muted-foreground mt-1">
          Add and configure a new customer account for relationship and deal tracking.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Customer Information</CardTitle>
                  <CardDescription className="mt-1">
                    Enter personal, company, and contact coordinates for this customer.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Status: ACTIVE
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>Personal Details</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fname"
                        placeholder="John"
                        className="h-10"
                        {...register("fname")}
                      />
                      {errors.fname && (
                        <p className="text-sm text-destructive">{errors.fname.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lname"
                        placeholder="Doe"
                        className="h-10"
                        {...register("lname")}
                      />
                      {errors.lname && (
                        <p className="text-sm text-destructive">{errors.lname.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@enterprise.com"
                        className="pl-9 h-10"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Numbers */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Communication Channels</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone1" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Primary Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone1"
                        placeholder="+1 (555) 012-3456"
                        className="h-10"
                        {...register("phone1")}
                      />
                      {errors.phone1 && (
                        <p className="text-sm text-destructive">{errors.phone1.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone2" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Secondary Phone <span className="text-muted-foreground font-normal">(Optional)</span>
                      </Label>
                      <Input
                        id="phone2"
                        placeholder="+1 (555) 012-7890"
                        className="h-10"
                        {...register("phone2")}
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>Company & Organization</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Company Name
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        placeholder="Nexus Technologies Ltd."
                        className="pl-9 h-10"
                        {...register("company")}
                      />
                    </div>
                  </div>
                </div>

                {/* Account Ownership Assignment */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Account Ownership</span>
                  </div>

                  <OwnerSelect
                    label="Account Owner"
                    required
                    value={assignedUser?.id}
                    helperText="This team member will be designated as the primary relationship manager for this customer."
                    onChange={(user) => {
                      if (user) {
                        setAssignedUser({
                          id: user.id,
                          fullname: user.fullname,
                        });
                        setValue("assigned_to", user.id, { shouldValidate: true });
                      }
                    }}
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                  <Link href="/dashboard/customers">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={saving} className="min-w-[140px]">
                    {saving ? "Creating Customer..." : "Create Customer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sticky Live Preview */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer Card Preview
                </span>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Active
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center border border-primary/20 shrink-0">
                  {initials.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg truncate">
                    {fullName || "Customer Name Preview"}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {company || "No Company Specified"}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-border/40 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate text-foreground/90">
                    {email || "customer@domain.com"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="text-foreground/90">
                    {phone1 || "+1 (555) 000-0000"}
                  </span>
                </div>
                {phone2 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0 opacity-60" />
                    <span className="text-foreground/70">{phone2}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span>Account Executive:</span>
                <span className="font-medium text-foreground">
                  {assignedUser?.fullname ?? "Unassigned"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Guide Card */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Customer Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Assign a primary account representative</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Attach active deals & service agreements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Log meetings & calls on customer activity timeline</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
