"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

type Step = "register" | "verify";

export default function RegisterOrganizationTypeForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("register");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterOrganizationType>({
    defaultValues: {
      organizationName: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterOrganizationType) => {
    try {
      setLoading(true);

      const response = await AuthService.registerOrganization(data);

      setVerificationEmail(response.email);
      console.log("register response", response);
      setOtp("");
      setStep("verify");

      toast.success(
        "Workspace created. Check your email for the verification code.",
      );
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

  const handleVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      await AuthService.verifyEmail({
        email: verificationEmail,
        otp,
      });

      toast.success("Email verified successfully.");

      router.replace("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid verification code";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Verification step
  // -------------------------------
  if (step === "verify") {
    return (
      <Card
        key="verify"
        className="border-0 shadow-none lg:rounded-3xl lg:shadow-xl"
      >
        <CardHeader className="space-y-3">
          <CardTitle className="text-4xl font-bold tracking-tight">
            Verify your email
          </CardTitle>

          <CardDescription className="text-base">
            We sent a 6-digit verification code to{" "}
            <span className="font-medium text-foreground">
              {verificationEmail}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification code</Label>

              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");

                  setOtp(value);
                }}
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              The code expires in 10 minutes.
            </p>

            <button
              type="button"
              className="w-full text-sm font-medium text-primary hover:underline"
              onClick={() => {
                setOtp("");
                setStep("register");
              }}
            >
              Back to registration
            </button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // -------------------------------
  // Registration step
  // -------------------------------
  return (
    <Card
      key="register"
      className="border-0 shadow-none lg:rounded-3xl lg:shadow-xl"
    >
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
          {/* Organization */}
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

          {/* Full name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
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
