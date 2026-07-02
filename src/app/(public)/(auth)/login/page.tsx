import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CRM Platform",
  description: "Login to access your CRM workspace.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-center bg-slate-950 px-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          <div className="relative z-10 max-w-2xl">
            {/* Logo */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <span className="text-lg font-bold text-slate-900">C</span>
              </div>

              <span className="text-xl font-semibold text-white">
                CRM Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] text-white">
              Welcome Back to Your{" "}
              <span className="text-blue-500">CRM Workspace</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Track leads, manage customers, collaborate with your team, and
              grow your business from one platform.
            </p>

            {/* Preview */}
            <div className="mt-8 w-fit overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/images/login.jpg"
                alt="CRM Dashboard"
                width={1200}
                height={800}
                className="max-h-[380px] w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
