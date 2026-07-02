"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
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

import { Textarea } from "@/components/ui/textarea";

import {
  serviceSchema,
  ServiceFormData,
} from "@/features/services/service.schema";

import { createService } from "@/features/services/services.service";

export default function CreateServicePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      base_price: 0,
    },
  });

  const onSubmit = async (
    data: ServiceFormData
  ) => {
    try {
      setLoading(true);

      const service =
        await createService(data);

      toast.success(
        "Service created successfully"
      );

      router.push(
        `/dashboard/services/${service.id}`
      );
    } catch {
      toast.error(
        "Failed to create service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Service
        </h1>

        <p className="text-muted-foreground">
          Add a new service offered by your
          organization.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Service Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}

            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                placeholder="Website Development"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}

            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                rows={5}
                placeholder="Describe the service..."
                {...register(
                  "description"
                )}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {
                    errors.description
                      .message
                  }
                </p>
              )}
            </div>

            {/* Base Price */}

            <div className="space-y-2">
              <Label>Base Price</Label>

              <Input
                type="number"
                placeholder="50000"
                {...register(
                  "base_price",
                  {
                    valueAsNumber: true,
                  }
                )}
              />

              {errors.base_price && (
                <p className="text-sm text-red-500">
                  {
                    errors.base_price
                      .message
                  }
                </p>
              )}
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">
              <Link
                href="/dashboard/services"
              >
                <Button
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}