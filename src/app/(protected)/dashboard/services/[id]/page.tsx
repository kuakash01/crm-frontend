"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Wrench,
  DollarSign,
  Package,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
} from "lucide-react";

import { Service, UpdateServiceDto } from "@/features/services/service.types";
import {
  updateServiceSchema,
  UpdateServiceFormData,
} from "@/features/services/service.schema";
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/features/services/services.service";
import { usePermission } from "@/shared/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DetailPageSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { can } = usePermission();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [service, setService] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateServiceFormData>({
    resolver: zodResolver(updateServiceSchema),
  });

  const basePriceWatch = watch("base_price");

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      setLoading(true);
      const data = await getServiceById(Number(id));
      setService(data);
      reset({
        name: data.name,
        description: data.description ?? "",
        base_price: data.base_price,
      });
      setValue("is_active", data.is_active);
    } catch {
      toast.error("Failed to load service");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UpdateServiceFormData) => {
    if (!service) return;
    try {
      setSaving(true);
      const updated = await updateService(service.id, data as UpdateServiceDto);
      setService(updated);
      reset({
        name: updated.name,
        description: updated.description ?? "",
        base_price: updated.base_price,
      });
      setValue("is_active", updated.is_active);
      setEditing(false);
      toast.success("Service updated successfully");
    } catch {
      toast.error("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteService(Number(id));
      toast.success("Service deleted successfully");
      router.push("/dashboard/services");
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!service) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Service not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/services")}>
          Back to Services
        </Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(service.base_price);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Services
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
            <Badge variant="outline" className="font-mono text-xs">
              SRV-{service.id.toString().padStart(4, "0")}
            </Badge>
            <Badge
              variant={service.is_active ? "outline" : "secondary"}
              className={
                service.is_active
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-muted text-muted-foreground"
              }
            >
              <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                  service.is_active ? "bg-emerald-500" : "bg-muted-foreground"
                }`}
              />
              {service.is_active ? "Active in Catalog" : "Archived"}
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
              {formattedPrice}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Manage catalog service definition, deliverables, and base quotation rate.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!editing && can("services:update") && (
            <Button
              onClick={() => setEditing(true)}
              size="sm"
              className="gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Service
            </Button>
          )}
          {editing && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  reset({
                    name: service.name,
                    description: service.description ?? "",
                    base_price: service.base_price,
                  });
                  setValue("is_active", service.is_active);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="service-details-form"
                size="sm"
                disabled={saving || !isDirty}
                className="min-w-[120px]"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Details & Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Service Specification</CardTitle>
                <CardDescription className="mt-0.5">
                  {editing
                    ? "Update service terms, scope, and base pricing."
                    : "Core parameters and client deliverables for this catalog offering."}
                </CardDescription>
              </div>
              {!editing && can("services:update") && (
                <Button
                  onClick={() => setEditing(true)}
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Terms
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <form
                id="service-details-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Service Name */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Service Name
                  </Label>
                  <Input
                    readOnly={!editing}
                    className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description & Scope of Work
                  </Label>
                  <Textarea
                    readOnly={!editing}
                    rows={5}
                    className={
                      !editing
                        ? "bg-muted/40 cursor-default border-border/40 resize-none"
                        : "resize-none"
                    }
                    {...register("description")}
                  />
                </div>

                {/* Base Price */}
                <div className="space-y-2 border-t border-border/40 pt-6">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Standard Base Price (INR)
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground flex items-center justify-center font-semibold text-sm">
                      ₹
                    </div>
                    <Input
                      type="number"
                      readOnly={!editing}
                      className={`pl-9 h-10 ${
                        !editing ? "bg-muted/40 cursor-default border-border/40" : ""
                      }`}
                      {...register("base_price", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.base_price && (
                    <p className="text-xs text-destructive">{errors.base_price.message}</p>
                  )}
                </div>

                {/* Status Switch (when editing) */}
                {editing && (
                  <div className="space-y-2 pt-4 border-t border-border/40">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Catalog Status
                    </Label>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="is_active"
                        checked={watch("is_active")}
                        onCheckedChange={(checked) =>
                          setValue("is_active", checked === true, { shouldDirty: true })
                        }
                      />
                      <label htmlFor="is_active" className="text-sm font-medium cursor-pointer">
                        {watch("is_active")
                          ? "Active (Available in Deal Picker)"
                          : "Inactive (Hidden from Deal Picker)"}
                      </label>
                    </div>
                  </div>
                )}

                {/* Bottom Action Buttons in Edit Mode */}
                {editing && (
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset({
                          name: service.name,
                          description: service.description ?? "",
                          base_price: service.base_price,
                        });
                        setValue("is_active", service.is_active);
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving || !isDirty}
                      className="min-w-[130px]"
                    >
                      {saving ? "Saving Changes..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Service Commercial Summary */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Commercial Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="rounded-lg bg-muted/40 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Base Rate
                </p>
                <p className="text-3xl font-bold tracking-tight text-foreground mt-1">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(Number(basePriceWatch ?? service.base_price))}
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Catalog Availability</span>
                  <Badge
                    variant="outline"
                    className={
                      service.is_active
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {service.is_active ? "Available in Deals" : "Archived"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Catalog Item Code</span>
                  <span className="font-mono text-foreground">SRV-{service.id.toString().padStart(4, "0")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Notice */}
          <div className="rounded-xl border border-muted bg-muted/30 p-4 text-xs space-y-2 text-muted-foreground">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>Deal Price Independence</span>
            </div>
            <p className="leading-relaxed">
              Updating this base rate applies to newly attached deals only. Existing deals retain their agreed contracted price.
            </p>
          </div>

          {/* Danger Zone */}
          {can("services:delete") && (
            <Card className="border-destructive/30 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={editing}
                      variant="destructive"
                      className="w-full text-xs"
                      size="sm"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Delete Service
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete &quot;{service.name}&quot;?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this service from your product catalog. Existing deals linked to this service will keep their historical record.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleDelete}
                      >
                        {deleting ? "Deleting..." : "Delete Permanently"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
