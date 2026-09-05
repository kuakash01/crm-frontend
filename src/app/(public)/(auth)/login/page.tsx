import Link from "next/link";
import LoginForm from "@/features/auth/components/LoginForm";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Users,
  UserCheck,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CRM Platform",
  description: "Login to access your CRM workspace.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side (Desktop Hero) */}
        <div className="relative hidden lg:flex flex-col justify-between bg-slate-950 p-12 lg:p-16 overflow-hidden">
          {/* Subtle background glow & gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />

          {/* Top Brand Header & Back Link */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 font-bold shadow-md shadow-white/10 group-hover:scale-105 transition-transform">
                <span className="text-lg">C</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CRM Platform
              </span>
            </Link>

          
          </div>

          {/* Center Main Content */}
          <div className="relative z-10 my-auto py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              Enterprise Role-Based Access CRM
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] text-white">
              Welcome Back to Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
                CRM Workspace
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base xl:text-lg leading-relaxed text-slate-400">
              Track sales pipelines, manage deals & customers, delegate tasks,
              and collaborate with your team with real-time updates.
            </p>

            {/* Workspace-Consistent CRM Dashboard Showcase Card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md space-y-4">
              {/* Header Status Row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    CRM Dashboard
                  </span>
                </div>

                {/* <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Real-time Active
                </div> */}
              </div>

              {/* 4 Core Workspace KPI Cards (Matching StatsCards.tsx) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-medium">Total Leads</span>
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-lg font-bold text-white">124</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-medium">Customers</span>
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-lg font-bold text-white">48</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-medium">Deals</span>
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-lg font-bold text-white">36</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-medium">Revenue</span>
                    <IndianRupee className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-lg font-bold text-white">₹18,50,000</div>
                </div>
              </div>

              {/* Deal Pipeline (Matching PipelineSummary.tsx exactly) */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Deal Pipeline</span>
                  <span className="text-[10px] text-slate-400">36 Total Deals</span>
                </div>

                {/* Progress bar with exact workspace colors */}
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-800 gap-0.5">
                  <div className="h-full bg-slate-500 rounded-l-full" style={{ width: "33%" }} title="Open (33%)" />
                  <div className="h-full bg-violet-500" style={{ width: "22%" }} title="Quotation (22%)" />
                  <div className="h-full bg-amber-500" style={{ width: "17%" }} title="Negotiation (17%)" />
                  <div className="h-full bg-emerald-500" style={{ width: "19%" }} title="Won (19%)" />
                  <div className="h-full bg-red-500 rounded-r-full" style={{ width: "9%" }} title="Lost (9%)" />
                </div>

                {/* Legend matching stages list */}
                <div className="grid grid-cols-5 gap-1 text-[10px] text-slate-400 pt-0.5 text-center">
                  <span className="flex items-center justify-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span> Open</span>
                  <span className="flex items-center justify-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span> Quotation</span>
                  <span className="flex items-center justify-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Negot.</span>
                  <span className="flex items-center justify-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Won</span>
                  <span className="flex items-center justify-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500"></span> Lost</span>
                </div>
              </div>

              {/* Multi-Tenant Security Note */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Multi-Tenant Role Isolation & Permissions
                </span>
                <span className="text-slate-400">Org Scoped Data</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/5">
            <span>© {new Date().getFullYear()} CRM Platform</span>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-slate-300 transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Right Side (Form Container) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-12 overflow-y-auto">
          {/* Top Bar for Mobile & Back Link */}
          <div className="flex items-center justify-between w-full max-w-md mx-auto mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group py-1"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-xs">
                C
              </div>
              <span className="font-bold text-sm">CRM</span>
            </Link>
          </div>

          {/* Form */}
          <div className="my-auto w-full max-w-md mx-auto">
            <LoginForm />
          </div>

          {/* Mobile Footer */}
          <div className="text-center text-xs text-muted-foreground pt-6 lg:hidden">
            <Link href="/" className="hover:underline">
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
