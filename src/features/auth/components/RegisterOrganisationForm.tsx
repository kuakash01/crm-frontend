"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  User,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const password = watch("password") || "";

  const onSubmit = async (data: RegisterOrganizationType) => {
    try {
      setLoading(true);

      const response = await AuthService.registerOrganization(data);

      setVerificationEmail(response.email);
      setOtp("");
      setStep("verify");

      toast.success(
        "Workspace created! Check your email for the 6-digit verification code.",
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

      toast.success("Email verified successfully! Welcome to your CRM.");

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
      <Card className="shadow-xl">
        <CardHeader className="space-y-2 text-center pb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2">
            <KeyRound className="h-6 w-6" />
          </div>

          <CardTitle className="text-3xl font-bold tracking-tight">
            Verify Email
          </CardTitle>

          <CardDescription className="text-sm">
            We sent a 6-digit verification code to
            <span className="block mt-1 font-semibold text-foreground font-mono">
              {verificationEmail}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerifyEmail} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter 6-Digit Code</Label>

              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                className="h-12 text-center text-2xl tracking-[0.5em] font-mono font-bold"
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
              {loading ? "Verifying Account..." : "Verify & Launch Workspace"}
            </Button>

            <div className="rounded-lg border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-2.5 text-center text-xs text-muted-foreground">
              ⏱️ The verification code expires in 10 minutes.
            </div>

            <button
              type="button"
              className="w-full text-center text-sm font-medium text-primary hover:underline"
              onClick={() => {
                setOtp("");
                setStep("register");
              }}
            >
              ← Edit Registration Details
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
    <Card className="shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Create Workspace
        </CardTitle>

        <CardDescription>
          Set up your organization and admin credentials.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Demo Fast-Track Callout */}
        <div className="mb-5 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Fast Portfolio Evaluation
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300">
              Demo Ready
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Evaluating this project? Skip registration and test pre-seeded organizations, managers, and deals directly with 1-click accounts.
          </p>
          <div className="pt-0.5">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Explore 1-Click Demo Logins <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Organization Name */}
          <div>
            <Label htmlFor="organizationName" className="text-xs font-semibold">
              Organization / Company Name
            </Label>

            <div className="relative mt-1">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="organizationName"
                placeholder="Acme Corporation"
                className="pl-9"
                {...register("organizationName", {
                  required: "Organization name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message:
                      "Organization name can only contain letters, numbers, and spaces",
                  },
                })}
              />
            </div>

            {errors.organizationName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-xs font-semibold">
              Admin Full Name
            </Label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Your Name"
                className="pl-9"
                {...register("fullName", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Full name can only contain letters and spaces",
                  },
                })}
              />
            </div>

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-xs font-semibold">
              Work Email Address
            </Label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                className="pl-9"
                {...register("email", {
                  required: "Work email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-xs font-semibold">
              Password
            </Label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                className="pl-9 pr-10"
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
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password ? (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Requires 8+ chars, uppercase, number & symbol (@$!%*?&)
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-xs font-semibold">
              Confirm Password
            </Label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="pl-9 pr-10"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading ? "Provisioning Workspace..." : "Create Organization & Continue"}
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
