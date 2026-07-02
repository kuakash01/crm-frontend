"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

export default function ServiceDetailsPage() {
  const { id } = useParams();

  const router = useRouter();

  const { can } = usePermission();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);

  const [service, setService] = useState<Service | null>(null);

  const {
    register,

    handleSubmit,

    reset,

    setValue,

    watch,

    formState: { errors },
  } = useForm<UpdateServiceFormData>({
    resolver: zodResolver(updateServiceSchema),
  });

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
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

      const updated = await updateService(
        service.id,

        data as UpdateServiceDto,
      );

      setService(updated);

      reset({
        name: updated.name,

        description: updated.description ?? "",

        base_price: updated.base_price,
      });

      setValue("is_active", updated.is_active);

      setEditing(false);

      toast.success("Service updated");
    } catch {
      toast.error("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this service?")) return;

    try {
      await deleteService(Number(id));

      toast.success("Service deleted");

      router.push("/dashboard/services");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!service) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{service.name}</h1>

          <p className="text-muted-foreground">Manage service information</p>
        </div>

        <div className="flex gap-2">
          {!editing ? (
            <>
              {can("services:update") && (
                <Button onClick={() => setEditing(true)}>Edit</Button>
              )}

              {can("services:delete") && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
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

              <Button disabled={saving} onClick={handleSubmit(onSubmit)}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Card */}

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Name */}

          <div className="space-y-2">
            <Label>Name</Label>

            <Input disabled={!editing} {...register("name")} />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              disabled={!editing}
              rows={5}
              {...register("description")}
            />
          </div>

          {/* Price */}

          <div className="space-y-2">
            <Label>Base Price</Label>

            <Input
              type="number"
              disabled={!editing}
              {...register("base_price", {
                valueAsNumber: true,
              })}
            />

            {errors.base_price && (
              <p className="text-sm text-red-500">
                {errors.base_price.message}
              </p>
            )}
          </div>

          {/* Status */}

          <div className="space-y-2">
            <Label>Status</Label>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch("is_active")}
                disabled={!editing}
                onCheckedChange={(checked) =>
                  setValue("is_active", checked === true)
                }
              />

              <span>{watch("is_active") ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
