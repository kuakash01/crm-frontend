// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { LoginUser } from "@/features/auth/types/auth.types";
// import { login } from "@/features/auth/services/auth.service";
// import { toast } from "sonner";

// export default function LoginForm() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginUser>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: LoginUser) => {
//     try {
//       setLoading(true);

//       await login(data);

//       toast.success("Login successful");
//       router.push("/dashboard");
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message || "Login failed";

//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="shadow-xl">
//       <CardHeader>
//         <CardTitle className="text-3xl">
//           Welcome Back
//         </CardTitle>

//         <CardDescription>
//           Sign in to continue to your CRM workspace.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-4"
//         >
//           <div>
//             <Label htmlFor="email">Email</Label>

//             <Input
//               id="email"
//               type="email"
//               placeholder="name@example.com"
//               {...register("email", {
//                 required: "Email is required",
//               })}
//             />

//             {errors.email && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>

//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="pr-10"
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword((current) => !current)
//                 }
//                 className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
//                 aria-label={
//                   showPassword
//                     ? "Hide password"
//                     : "Show password"
//                 }
//               >
//                 {showPassword ? (
//                   <Eye className="h-4 w-4" />
//                 ) : (
//                   <EyeOff className="h-4 w-4" />
//                 )}
//               </button>
//             </div>

//             {errors.password && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             className="h-11 w-full"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </Button>

//           <p className="text-center text-sm text-muted-foreground">
//             Do not have an account?{" "}
//             <a
//               href="/register"
//               className="font-medium text-primary hover:underline"
//             >
//               Sign Up
//             </a>
//           </p>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
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

  const [step, setStep] =
    useState<AuthStep>("login");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

            <p className="text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
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