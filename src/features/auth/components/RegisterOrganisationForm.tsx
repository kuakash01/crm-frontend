"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterOrganizationType } from "@/features/auth/types/auth.types";
import * as AuthService from "@/features/auth/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterOrganizationTypeForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterOrganizationType>();

  const password = watch("password");

  const onSubmit = async (data: RegisterOrganizationType) => {
    try {
      setLoading(true); 
      await AuthService.registerOrganization(data);

      toast.success("Workspace created successfully. Please sign in.");

      router.push("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none lg:shadow-xl lg:rounded-3xl">
      <CardHeader className="space-y-3">
        <CardTitle className="text-4xl font-bold tracking-tight">
          Create Workspace
        </CardTitle>

        <CardDescription className="text-base">
          Create your CRM organization and admin account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="organizationName">Organization Name</Label>

            <Input
              id="organizationName"
              placeholder="Acme Inc."
              {...register("organizationName", {
                required: "Organization name is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message:
                    "Organization name can only contain letters, numbers, and spaces",
                },
              })}
            />

            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="fullName">Full Name</Label>

            <Input
              id="fullName"
              placeholder="Akash Kumar"
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name can only contain letters and spaces",
                },
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Work Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number, and special character",
                },
              })}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading ? "Creating Workspace..." : "Create Workspace"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
