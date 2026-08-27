"use client";

import { useEffect, useState } from "react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  Building2,
  Briefcase,
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
  acceptInvitation,
  getInvitationDetails,
} from "@/features/auth/services/auth.service";

type InvitationFormValues = {
  password: string;
  confirmPassword: string;
};

type InvitationDetails = {
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  reportsTo: string | null;
  organization: string;
  expiresAt: string;
};

export default function InvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] =
    useState(true);

  const [invitation, setInvitation] =
    useState<InvitationDetails | null>(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvitationFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // -----------------------------------------
  // Load invitation details
  // -----------------------------------------
  useEffect(() => {
    if (!token) {
      setDetailsLoading(false);
      return;
    }

    const loadInvitation = async () => {
      try {
        setDetailsLoading(true);

        const data =
          await getInvitationDetails(token);

        setInvitation(data);
        console.log("invitations details:", data);
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Invalid or expired invitation";

        toast.error(message);
      } finally {
        setDetailsLoading(false);
      }
    };

    loadInvitation();
  }, [token]);

  // -----------------------------------------
  // Accept invitation
  // -----------------------------------------
  const onSubmit = async (
    data: InvitationFormValues,
  ) => {
    if (!token) {
      toast.error("Invalid invitation link.");
      return;
    }

    try {
      setLoading(true);

      await acceptInvitation({
        token,
        password: data.password,
      });

      toast.success(
        "Account setup completed successfully.",
      );

      router.replace("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to accept invitation";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Missing token
  // -----------------------------------------
  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">
              Invalid Invitation
            </CardTitle>

            <CardDescription>
              This invitation link is missing its
              invitation token.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  // -----------------------------------------
  // Loading invitation
  // -----------------------------------------
  if (detailsLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Loading invitation...
          </CardContent>
        </Card>
      </main>
    );
  }

  // -----------------------------------------
  // Invalid / expired invitation
  // -----------------------------------------
  if (!invitation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">
              Invitation Unavailable
            </CardTitle>

            <CardDescription>
              This invitation is invalid, expired,
              or has already been used.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="w-full"
              onClick={() =>
                router.push("/login")
              }
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // -----------------------------------------
  // Invitation page
  // -----------------------------------------
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl">
            Complete Your Account
          </CardTitle>

          <CardDescription>
            You've been invited to join{" "}
            <span className="font-medium text-foreground">
              {invitation.organization}
            </span>
            .
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Invitation details */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Full Name
                  </p>

                  <p className="text-sm font-medium">
                    {invitation.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="text-sm font-medium">
                    {invitation.email}
                  </p>
                </div>
              </div>

              {invitation.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone
                    </p>

                    <p className="text-sm font-medium">
                      {invitation.phone}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Role
                  </p>

                  <p className="text-sm font-medium">
                    {invitation.role}
                  </p>
                </div>
              </div>

              {invitation.reportsTo && (
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Reports To
                    </p>

                    <p className="text-sm font-medium">
                      {invitation.reportsTo}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Organization
                  </p>

                  <p className="text-sm font-medium">
                    {invitation.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Password */}
            <div>
              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  className="pr-10"
                  {...register("password", {
                    required:
                      "Password is required",
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
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  className="pr-10"
                  {...register(
                    "confirmPassword",
                    {
                      required:
                        "Please confirm your password",
                      validate: (value) =>
                        value === password ||
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
                ? "Setting up account..."
                : "Complete Account Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}