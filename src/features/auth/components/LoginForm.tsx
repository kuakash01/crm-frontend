"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Building2,
  CornerDownRight,
  ChevronDown,
  Mail,
  KeyRound,
  AlertCircle,
  Loader2,
  RefreshCw,
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

import {
  login,
  forgotPassword,
  resetPassword,
  sendLoginOtp,
  verifyLoginOtp,
} from "@/features/auth/services/auth.service";

import { LoginUser } from "@/features/auth/types/auth.types";
import { toast } from "sonner";

type AuthStep = "login" | "forgot" | "reset";

type AuthFormValues = {
  email: string;
  password: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams ? searchParams.get("error") : null;

  const [step, setStep] =
    useState<AuthStep>("login");

  const [loginMode, setLoginMode] =
    useState<"password" | "otp">("password");

  const [otpStep, setOtpStep] =
    useState<"send" | "verify">("send");

  const [otpEmail, setOtpEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [showDemoAccounts, setShowDemoAccounts] =
    useState(false);

  useEffect(() => {
    let interval: any;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpCountdown]);

  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const handleSendLoginOtp = async (targetEmail?: string) => {
    const emailToSend = (targetEmail || watch("email") || otpEmail || "").trim().toLowerCase();
    if (!emailToSend) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const res = await sendLoginOtp(emailToSend);
      setOtpEmail(emailToSend);
      setOtpStep("verify");
      setOtpCountdown(60);
      toast.success(res.message || "Login code sent to your email!");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to send login code";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput || otpInput.trim().length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    try {
      setLoading(true);
      await verifyLoginOtp({
        email: otpEmail,
        otp: otpInput.trim(),
      });

      try {
        localStorage.setItem("crm_session_active", "true");
      } catch {}

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Invalid or expired verification code";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword =
    watch("newPassword");

  // -----------------------------------------
  // Login
  // -----------------------------------------

  const onLogin = async (
    values: AuthFormValues,
  ) => {
    try {
      setLoading(true);

      const loginData: LoginUser = {
        email: values.email,
        password: values.password,
      };

      await login(loginData);

      try {
        localStorage.setItem("crm_session_active", "true");
      } catch {}

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Forgot password
  // -----------------------------------------

  const onForgotPassword = async (
    values: AuthFormValues,
  ) => {
    try {
      setLoading(true);

      await forgotPassword(values.email);

      setValue("otp", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");

      setStep("reset");

      toast.success(
        "If an account exists for this email, a verification code has been sent.",
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Reset password
  // -----------------------------------------

  const onResetPassword = async (
    values: AuthFormValues,
  ) => {
    try {
      setLoading(true);

      await resetPassword({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      toast.success(
        "Password reset successfully. You can now sign in.",
      );

      reset({
        email: values.email,
        password: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });

      setStep("login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to reset password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Back to login
  // -----------------------------------------

  const goToLogin = () => {
    reset({
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });

    setStep("login");
  };

  const fillDemoCredentials = (email: string, pass: string, roleLabel: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
    toast.info(`Demo credentials loaded for ${roleLabel}`);
  };

  // -----------------------------------------
  // Login
  // -----------------------------------------

  if (step === "login") {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Sign in to continue to your CRM
            workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* OAuth Error Alert Banner */}
          {oauthError && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-start gap-2 animate-in fade-in-50 duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Authentication Notice: </span>
                <span>{oauthError}</span>
              </div>
            </div>
          )}

          {/* Continue with Google Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 border-border/80 hover:bg-accent/60 font-medium flex items-center justify-center gap-2.5 transition-all shadow-2xs mb-4"
            onClick={handleGoogleLogin}
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
            <span className="text-sm font-semibold text-foreground">Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/70" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-card px-2.5 text-muted-foreground font-semibold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-muted/60 border border-border/60 mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLoginMode("password")}
              className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                loginMode === "password"
                  ? "bg-background text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              <span>Password</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMode("otp")}
              className={`py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                loginMode === "otp"
                  ? "bg-background text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Email Code (OTP)</span>
            </button>
          </div>

          {/* TAB 1: Password Mode */}
          {loginMode === "password" && (
            <div>
              {/* Quick Demo Access Bar - Collapsible (Initially Closed) */}
              <div className="mb-4 rounded-xl border border-blue-500/25 bg-blue-50/40 dark:bg-blue-950/20 transition-all duration-200 overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setShowDemoAccounts((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-blue-100/40 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Demo Accounts (1-Click Fill)
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Org 1, Org 2 & Team Hierarchy
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 ">
                      {showDemoAccounts ? "Hide" : "Show Roles"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-blue-600 transition-transform duration-200 ${
                        showDemoAccounts ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {showDemoAccounts && (
                  <div className="p-3 pt-0 space-y-2.5 animate-in fade-in-50 duration-200 max-h-52 overflow-y-auto pr-1">
                    {/* Organization 1 & Hierarchy */}
                    <div className="space-y-2 rounded-lg border border-border/80 bg-background/80 p-2.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-blue-600" />
                          Organization 1 (Primary Workspace)
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          Admin & 2 Teams
                        </span>
                      </div>

                      {/* Org 1 Admin button */}
                      <button
                        type="button"
                        onClick={() =>
                          fillDemoCredentials(
                            "org1@xyz.com",
                            "@Test123",
                            "Org 1 Admin / Owner"
                          )
                        }
                        className="w-full flex items-center justify-between rounded-md border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 px-2.5 py-1.5 text-left hover:border-blue-500 hover:bg-blue-100/50 dark:hover:bg-blue-900/40 transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                          <span className="text-xs font-semibold text-foreground">Org 1 Admin (Owner)</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-mono">org1@xyz.com</span>
                      </button>

                      {/* Teams Grid under Org 1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                        {/* Team 1: Manager 1 & Sales 1 */}
                        <div className="rounded-md border border-border/70 bg-muted/30 p-1.5 space-y-1">
                          <div className="text-[10px] font-semibold text-muted-foreground px-1 uppercase tracking-wider">
                            Team 1 (Manager 1)
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              fillDemoCredentials(
                                "manager1@xyz.com",
                                "@Manager123",
                                "Manager 1"
                              )
                            }
                            className="w-full flex items-center justify-between rounded border border-border bg-background px-2 py-1 text-left hover:border-amber-500/60 hover:bg-accent transition-colors shadow-2xs"
                          >
                            <span className="text-[11px] font-medium flex items-center gap-1 text-foreground">
                              <UserCheck className="h-3 w-3 text-amber-600 shrink-0" /> Manager 1
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">manager1@xyz.com</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              fillDemoCredentials(
                                "sales1@xyz.com",
                                "@Sales123",
                                "Sales Rep 1"
                              )
                            }
                            className="w-full flex items-center justify-between rounded border border-border bg-background px-2 py-1 text-left hover:border-emerald-500/60 hover:bg-accent transition-colors shadow-2xs pl-3.5"
                          >
                            <span className="text-[11px] font-medium flex items-center gap-1 text-foreground">
                              <CornerDownRight className="h-3 w-3 text-emerald-600 shrink-0" /> Sales Rep 1
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">sales1@xyz.com</span>
                          </button>
                        </div>

                        {/* Team 2: Manager 2 & Sales 2 */}
                        <div className="rounded-md border border-border/70 bg-muted/30 p-1.5 space-y-1">
                          <div className="text-[10px] font-semibold text-muted-foreground px-1 uppercase tracking-wider">
                            Team 2 (Manager 2)
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              fillDemoCredentials(
                                "manager2@xyz.com",
                                "@Manager123",
                                "Manager 2"
                              )
                            }
                            className="w-full flex items-center justify-between rounded border border-border bg-background px-2 py-1 text-left hover:border-amber-500/60 hover:bg-accent transition-colors shadow-2xs"
                          >
                            <span className="text-[11px] font-medium flex items-center gap-1 text-foreground">
                              <UserCheck className="h-3 w-3 text-amber-600 shrink-0" /> Manager 2
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">manager2@xyz.com</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              fillDemoCredentials(
                                "sales2@xyz.com",
                                "@Sales123",
                                "Sales Rep 2"
                              )
                            }
                            className="w-full flex items-center justify-between rounded border border-border bg-background px-2 py-1 text-left hover:border-emerald-500/60 hover:bg-accent transition-colors shadow-2xs pl-3.5"
                          >
                            <span className="text-[11px] font-medium flex items-center gap-1 text-foreground">
                              <CornerDownRight className="h-3 w-3 text-emerald-600 shrink-0" /> Sales Rep 2
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">sales2@xyz.com</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Organization 2 (Tenant Isolation) */}
                    <div className="rounded-lg border border-purple-500/30 bg-purple-50/40 dark:bg-purple-950/20 p-2.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-purple-600" />
                          Organization 2 (Tenant Isolation Demo)
                        </span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                          Separate Partition
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          fillDemoCredentials(
                            "org2@abc.com",
                            "@Test123",
                            "Org 2 Admin"
                          )
                        }
                        className="w-full flex items-center justify-between rounded-md border border-purple-200 dark:border-purple-900/50 bg-background/90 px-2.5 py-1.5 text-left hover:border-purple-500 hover:bg-accent transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                          <span className="text-xs font-semibold text-foreground">Org 2 Admin (Owner)</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-mono">org2@abc.com</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit(onLogin)}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <Label htmlFor="login-email">
                    Email
                  </Label>

                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required:
                        "Email is required",
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
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="login-password">
                      Password
                    </Label>

                    <button
                      type="button"
                      onClick={() =>
                        setStep("forgot")
                      }
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      id="login-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      className="pr-10"
                      {...register("password", {
                        required:
                          "Password is required",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors.password
                          .message
                      }
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={loading}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </Button>
              </form>
            </div>
          )}

          {/* TAB 2: Email OTP Mode (Passwordless) */}
          {loginMode === "otp" && (
            <div className="space-y-4">
              {otpStep === "send" ? (
                <div className="space-y-4 animate-in fade-in-50 duration-200">
                  <div className="space-y-1.5">
                    <Label htmlFor="otp-email-input" className="text-xs font-semibold">
                      Work Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="otp-email-input"
                        type="email"
                        placeholder="admin@example.com"
                        className="pl-9 h-11"
                        value={watch("email")}
                        onChange={(e) => setValue("email", e.target.value)}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      We'll send a 6-digit one-time login code to this email. No password needed.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleSendLoginOtp()}
                    className="h-11 w-full"
                    disabled={loading || !watch("email")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Login Code...
                      </>
                    ) : (
                      "Send Login Code"
                    )}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleVerifyLoginOtp} className="space-y-4 animate-in fade-in-50 duration-200">
                  <div className="rounded-lg border border-border/80 bg-muted/40 p-3 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                      <Mail className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">
                        Code sent to <strong className="text-foreground font-mono">{otpEmail}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep("send");
                        setOtpInput("");
                      }}
                      className="text-xs font-semibold text-primary hover:underline shrink-0 ml-2"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="login-otp-code" className="text-xs font-semibold">
                      Enter 6-Digit Verification Code
                    </Label>
                    <Input
                      id="login-otp-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="000000"
                      className="h-12 text-center text-2xl tracking-[0.5em] font-mono font-bold"
                      value={otpInput}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setOtpInput(val);
                      }}
                      autoFocus
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={loading || otpInput.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying Code...
                      </>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </Button>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Didn't receive code?</span>
                    {otpCountdown > 0 ? (
                      <span className="font-mono text-muted-foreground">
                        Resend in {otpCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendLoginOtp(otpEmail)}
                        disabled={loading}
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Resend Code
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-5">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  // -----------------------------------------
  // Forgot password
  // -----------------------------------------

  if (step === "forgot") {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">
            Forgot Password?
          </CardTitle>

          <CardDescription>
            Enter your email and we'll send you
            a verification code to reset your
            password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(
              onForgotPassword,
            )}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="forgot-email">
                Email
              </Label>

              <Input
                id="forgot-email"
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required:
                    "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-11 w-full"
              disabled={loading}
            >
              {loading
                ? "Sending Code..."
                : "Send Verification Code"}
            </Button>

            <button
              type="button"
              onClick={goToLogin}
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // -----------------------------------------
  // Reset password
  // -----------------------------------------

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl">
          Reset Password
        </CardTitle>

        <CardDescription>
          Enter the verification code sent to{" "}
          <span className="font-medium text-foreground">
            {watch("email")}
          </span>
          .
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(
            onResetPassword,
          )}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <Label htmlFor="reset-email">
              Email
            </Label>

            <Input
              id="reset-email"
              type="email"
              readOnly
              {...register("email")}
            />
          </div>

          {/* OTP */}
          <div>
            <Label htmlFor="reset-otp">
              Verification Code
            </Label>

            <Input
              id="reset-otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="Enter 6-digit code"
              {...register("otp", {
                required:
                  "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message:
                    "Enter a valid 6-digit code",
                },
              })}
            />

            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <Label htmlFor="reset-new-password">
              New Password
            </Label>

            <div className="relative">
              <Input
                id="reset-new-password"
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a new password"
                className="pr-10"
                {...register("newPassword", {
                  required:
                    "New password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={
                  showNewPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showNewPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.newPassword.message
                }
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="reset-confirm-password">
              Confirm Password
            </Label>

            <div className="relative">
              <Input
                id="reset-confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your new password"
                className="pr-10"
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Please confirm your password",
                    validate: (value) =>
                      value === newPassword ||
                      "Passwords do not match",
                  },
                )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loading}
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </Button>

          <button
            type="button"
            onClick={goToLogin}
            className="flex w-full items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>
        </form>
      </CardContent>
    </Card>
  );
}