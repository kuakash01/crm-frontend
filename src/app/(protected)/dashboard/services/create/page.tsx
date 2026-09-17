"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Wrench,
  DollarSign,
  FileText,
  Sparkles,
  CheckCircle2,
  Package,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { serviceSchema, ServiceFormData } from "@/features/services/service.schema";
import { createService } from "@/features/services/services.service";

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      base_price: 0,
    },
  });

  const name = useWatch({ control, name: "name" });
  const description = useWatch({ control, name: "description" });
  const basePrice = useWatch({ control, name: "base_price" });

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setLoading(true);
      const service = await createService(data);
      toast.success("Service created successfully");
      router.push(`/dashboard/services/${service.id}`);
    } catch {
      toast.error("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  const formattedPrice =
    typeof basePrice === "number" && !Number.isNaN(basePrice)
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(basePrice)
      : "₹0";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Service</h1>
        <p className="text-muted-foreground mt-1">
          Define a new offering in your organization's service catalog.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Service Information</CardTitle>
                  <CardDescription className="mt-1">
                    Provide the title, scope, and standard pricing for this service.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Status: ACTIVE
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                {/* Section 1: Catalog Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span>Catalog Specifications</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Enterprise Cloud Migration"
                      className="h-10"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service Description
                    </Label>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="Detail deliverables, milestones, and scope of work included in this service..."
                      className="resize-none"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                {/* Section 2: Pricing & Commercials */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>Commercials & Pricing</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base_price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Standard Base Price (INR) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground flex items-center justify-center font-semibold text-sm">
                        ₹
                      </div>
                      <Input
                        id="base_price"
                        type="number"
                        placeholder="50000"
                        className="pl-9 h-10"
                        {...register("base_price", { valueAsNumber: true })}
                      />
                    </div>
                    {errors.base_price && (
                      <p className="text-sm text-destructive">{errors.base_price.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      This base price will automatically populate when this service is attached to a sales deal.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                  <Link href="/dashboard/services">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={loading} className="min-w-[130px]">
                    {loading ? "Creating..." : "Create Service"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Live Preview Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Catalog Preview
                </span>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                  <Package className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base truncate">
                    {name || "Service Title Preview"}
                  </h3>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {formattedPrice}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40">
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {description || "No description provided yet. Enter details on the left to see the preview here."}
                </p>
              </div>

              <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center justify-between font-medium text-foreground">
                  <span>Deal Attachment:</span>
                  <Badge variant="secondary" className="text-[10px]">Available</Badge>
                </div>
                <p className="text-[11px]">
                  Sales reps can attach this item to pipeline opportunities in one click.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Best Practice Card */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>Catalog Best Practice</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Standardized services improve forecasting accuracy and reduce sales cycle friction by up to 35%. You can always negotiate custom deal pricing on individual opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}