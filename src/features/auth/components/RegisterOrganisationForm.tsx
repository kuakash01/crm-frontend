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
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create Workspace
        </CardTitle>

        <CardDescription className="text-xs">
          Set up your organization and admin credentials.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Compact Demo Fast-Track Banner */}
        <div className="mb-3.5 flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 px-3 py-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium">Evaluating? Skip setup & test demo roles</span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>Demo Logins</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Continue with Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-10 border-border/80 hover:bg-accent/60 font-medium flex items-center justify-center gap-2.5 transition-all shadow-2xs mb-3"
          onClick={() => {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
            window.location.href = `${backendUrl}/api/auth/google`;
          }}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="text-xs font-semibold text-foreground">Continue with Google</span>
        </Button>

        {/* Divider */}
        <div className="relative mb-3.5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/70" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
            <span className="bg-card px-2.5 text-muted-foreground font-semibold">
              Or create workspace manually
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
