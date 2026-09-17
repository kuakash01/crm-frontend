"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Wrench,
  CalendarClock,
  Sparkles,
  FileText,
  User as UserIcon,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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
import OwnerSelect from "@/shared/components/user-assignment/OwnerSelect";
import { AssignableUser } from "@/features/users/users.types";

export default function CreateDealPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const currentUser = useAppSelector((state) => state.auth.user);

  const [saving, setSaving] = useState(false);
  const [customerPickerOpen, setCustomerPickerOpen] = useState(false);
  const [servicePickerOpen, setServicePickerOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<RecordOption | null>(null);
  const [selectedService, setSelectedService] = useState<RecordOption | null>(null);
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);

  const [assignedUser, setAssignedUser] = useState<AssignableUser | null>(
    currentUser
      ? {
          id: currentUser.id,
          fullname: currentUser.fullname,
          role: currentUser.role,
        }
      : null
  );
  const [autoMatchedOwner, setAutoMatchedOwner] = useState(false);

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
      assigned_to: currentUser?.id,
    },
  });

  const dealTitle = useWatch({ control, name: "title" });
  const dealValue = useWatch({ control, name: "price" });
  const expectedCloseDate = useWatch({ control, name: "expected_close_date" });

  // Initial user setup
  useEffect(() => {
    if (currentUser?.id) {
      setValue("assigned_to", currentUser.id);
    }
  }, [currentUser?.id, setValue]);

  // Handle customer loaded and auto-select customer owner
  const handleCustomerLoaded = (customer: Customer) => {
    setCustomerDetails(customer);
    setValue("customer_id", customer.id);

    // Auto-select the owner of customer into deal creation
    if (customer.assigned_to) {
      const ownerObj: AssignableUser = {
        id: customer.assigned_to,
        fullname: customer.assigned_to_name || `User #${customer.assigned_to}`,
        role: "Account Owner",
      };
      setAssignedUser(ownerObj);
      setValue("assigned_to", customer.assigned_to);
      setAutoMatchedOwner(true);
    }
  };

  // Load customer when creating deal directly from customer profile
  useEffect(() => {
    if (!customerId) return;

    const loadCustomer = async () => {
      try {
        const customer = await getCustomerById(Number(customerId));
        setSelectedCustomer({
          id: customer.id,
          name:
            `${customer.fname} ${customer.lname ?? ""}`.trim() ||
            customer.company ||
            "Unnamed Customer",
          subtitle: customer.company || customer.phone1 || null,
        });
        handleCustomerLoaded(customer);
      } catch {
        toast.error("Failed to load customer profile");
      }
    };

    loadCustomer();
  }, [customerId]);

  const handleCustomerSelect = async (customer: RecordOption) => {
    setSelectedCustomer(customer);
    setValue("customer_id", customer.id);

    try {
      const fullCustomer = await getCustomerById(customer.id);
      handleCustomerLoaded(fullCustomer);
    } catch {
      toast.error("Failed to fetch customer owner details");
    }
  };

  const handleServiceSelect = (service: RecordOption) => {
    setSelectedService(service);
    setValue("service_id", service.id);

    const basePrice = service.meta?.base_price;
    if (typeof basePrice === "number") {
      setValue("price", basePrice);
    }
  };

  const handleOwnerChange = (user: AssignableUser | null) => {
    setAssignedUser(user);
    setValue("assigned_to", user ? user.id : undefined);
    setAutoMatchedOwner(false);
  };

  const onSubmit = async (data: CreateDealFormData) => {
    try {
      setSaving(true);
      const deal = await createDeal({
        ...data,
        assigned_to: assignedUser ? assignedUser.id : data.assigned_to,
      });

      toast.success("Deal created successfully");
      router.push(`/dashboard/deals/${deal.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to create deal");
    } finally {
      setSaving(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(dealValue || 0));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div>
        <Link
          href="/dashboard/deals"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Deals
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Deal</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Initiate a new sales opportunity, configure commercial terms, and assign ownership.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left 2 Columns: Structured Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Deal Scope & Parameters</CardTitle>
                  <CardDescription className="mt-1">
                    Connect an account, attach a catalog service, and set expectations.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                  Initial Stage: OPEN
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                {/* Section 1: Opportunity Identity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Opportunity Details</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Deal Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g. Enterprise Cloud Migration & Setup"
                      className="h-10"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>
                </div>

                {/* Section 2: Account & Service Linking */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>Associated Parties & Offering</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Customer Picker */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Customer Account <span className="text-destructive">*</span>
                      </Label>
                      <div
                        onClick={() => !customerId && setCustomerPickerOpen(true)}
                        className={`flex min-h-11 items-center justify-between rounded-md border border-border/60 bg-background p-2.5 transition-colors ${
                          !customerId
                            ? "cursor-pointer hover:bg-muted/40 hover:border-primary/40"
                            : "cursor-default opacity-90"
                        }`}
                      >
                        {selectedCustomer ? (
                          <div className="flex flex-col truncate">
                            <span className="font-medium text-sm text-foreground truncate">
                              {selectedCustomer.name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {selectedCustomer.subtitle ?? "Customer Account"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Search className="h-4 w-4 opacity-50" />
                            <span>Select customer...</span>
                          </div>
                        )}

                        {!customerId && (
                          <Button type="button" variant="ghost" size="sm" className="h-7 text-xs">
                            {selectedCustomer ? "Change" : "Browse"}
                          </Button>
                        )}
                      </div>
                      {errors.customer_id && (
                        <p className="text-sm text-destructive">{errors.customer_id.message}</p>
                      )}
                    </div>

                    {/* Service Picker */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Catalog Service <span className="text-destructive">*</span>
                      </Label>
                      <div
                        onClick={() => setServicePickerOpen(true)}
                        className="flex min-h-11 cursor-pointer items-center justify-between rounded-md border border-border/60 bg-background p-2.5 transition-colors hover:bg-muted/40 hover:border-primary/40"
                      >
                        {selectedService ? (
                          <div className="flex flex-col truncate">
                            <span className="font-medium text-sm text-foreground truncate">
                              {selectedService.name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {selectedService.subtitle ?? "Catalog Offering"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Wrench className="h-4 w-4 opacity-50" />
                            <span>Select service...</span>
                          </div>
                        )}

                        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs">
                          {selectedService ? "Change" : "Browse"}
                        </Button>
                      </div>
                      {errors.service_id && (
                        <p className="text-sm text-destructive">{errors.service_id.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Commercial Valuation & Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Commercial Terms</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Deal Value (INR) <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground flex items-center justify-center font-semibold text-sm">
                          ₹
                        </div>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0"
                          className="pl-9 h-10"
                          {...register("price", { valueAsNumber: true })}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-sm text-destructive">{errors.price.message}</p>
                      )}
                    </div>

                    {/* Expected Close Date */}
                    <div className="space-y-2">
                      <Label htmlFor="expected_close_date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Expected Close Date
                      </Label>
                      <Input
                        id="expected_close_date"
                        type="date"
                        className="h-10"
                        {...register("expected_close_date")}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Opportunity Ownership */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <UserIcon className="h-4 w-4 text-primary" />
                    <span>Deal Ownership</span>
                  </div>

                  <OwnerSelect
                    label="Deal Representative"
                    value={assignedUser?.id}
                    badge={
                      autoMatchedOwner ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-normal gap-1"
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          Auto-matched to Customer Owner
                        </Badge>
                      ) : undefined
                    }
                    helperText={
                      autoMatchedOwner
                        ? "Automatically assigned to the representative who manages this customer account. You may reassign if needed."
                        : "Select the sales executive responsible for guiding this opportunity to completion."
                    }
                    onChange={handleOwnerChange}
                  />
                </div>

                {/* Section 5: Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Initial Discovery Notes <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Key pain points, client objectives, and scope considerations discussed during initial contact..."
                    rows={3}
                    className="resize-none"
                    {...register("notes")}
                  />
                </div>

                {/* Submit Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                  <Link href="/dashboard/deals">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={saving} className="min-w-[140px]">
                    {saving ? "Creating Deal..." : "Create Deal"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Column: Sticky Live Deal Preview & Context */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Live Deal Preview
                </CardTitle>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Discovery
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              {/* Valuation Hero */}
              <div className="rounded-xl bg-muted/40 p-4 text-center border border-border/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Projected Value
                </p>
                <p className="text-3xl font-bold tracking-tight text-foreground mt-1">
                  {formattedPrice}
                </p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {dealTitle || "Untitled Deal Opportunity"}
                </p>
              </div>

              {/* Linked Coordinates */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                    Customer
                  </span>
                  <span className="font-medium text-foreground max-w-[60%] truncate text-right">
                    {selectedCustomer?.name ?? "None selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-primary" />
                    Service
                  </span>
                  <span className="font-medium text-foreground max-w-[60%] truncate text-right">
                    {selectedService?.name ?? "None selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <UserIcon className="h-3.5 w-3.5 text-primary" />
                    Deal Owner
                  </span>
                  <span className="font-medium text-foreground max-w-[60%] truncate text-right">
                    {assignedUser?.fullname ?? "Unassigned"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5 text-primary" />
                    Target Close
                  </span>
                  <span className="font-medium text-foreground">
                    {expectedCloseDate
                      ? new Date(expectedCloseDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not scheduled"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CRM Contextual Helper */}
          {autoMatchedOwner && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs space-y-1.5 text-emerald-900 dark:text-emerald-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Automated Representative Sync</span>
              </div>
              <p className="leading-relaxed opacity-90 text-[11px]">
                The deal owner was automatically matched to the assigned manager of this customer account ({assignedUser?.fullname}), maintaining continuity.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Picker Dialog */}
      <RecordPickerDialog
        open={customerPickerOpen && !customerId}
        onOpenChange={setCustomerPickerOpen}
        module="CUSTOMER"
        onSelect={handleCustomerSelect}
      />

      {/* Service Picker Dialog */}
      <RecordPickerDialog
        open={servicePickerOpen}
        onOpenChange={setServicePickerOpen}
        module="SERVICE"
        onSelect={handleServiceSelect}
      />
    </div>
  );
}