import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  TrendingUp,
  Users,
  UserCheck,
  Briefcase,
  IndianRupee,
  LayoutDashboard,
  BadgeCheck,
  Activity,
  UserRound,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CRM Pro Platform",
  description: "Login to access your CRM workspace and sales dashboard.",
};

export default function LoginPage() {
  return (
    <main className="h-screen max-h-screen w-full overflow-hidden bg-muted/30">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* Left Side (Desktop Hero Showcase - Exactly 1:1, 50% width) */}
        <div className="relative hidden lg:flex flex-col justify-between bg-slate-950 p-6 xl:p-10 overflow-hidden border-r border-slate-800/80">
          {/* Subtle background glow & gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Zap className="h-4.5 w-4.5 fill-white/20 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  CRM Pro
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Cloud
                  </span>
                </span>
                <span className="text-[10px] text-slate-400">
                  Sales Management System
                </span>
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Live System Online</span>
            </div>
          </div>

          {/* Center Main Content & Dashboard Showcase */}
          <div className="relative z-10 my-auto py-2 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 mb-2.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise Role-Based Access CRM
              </div>

              <h1 className="text-2xl xl:text-3xl font-extrabold leading-tight text-white">
                Welcome Back to Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  Sales Command Center
                </span>
              </h1>

              <p className="mt-1.5 max-w-lg text-xs xl:text-sm leading-relaxed text-slate-400">
                Track sales pipelines, manage deals & customers, and collaborate with your team with real-time updates.
              </p>
            </div>

            {/* Dashboard Mirror Showcase Card (Compact to prevent scrollbars) */}
            <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md space-y-3">
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    CRM Dashboard
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span>Refreshed just now</span>
                </div>
              </div>

              {/* 4 Core Workspace KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-blue-500/40">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="text-[10px] font-medium text-slate-300">Leads</span>
                    <Users className="h-3 w-3 text-blue-400" />
                  </div>
                  <div className="text-base font-bold text-white">124</div>
                  <div className="text-[9px] text-emerald-400 font-medium">+14% MoM</div>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-emerald-500/40">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="text-[10px] font-medium text-slate-300">Customers</span>
                    <UserCheck className="h-3 w-3 text-emerald-400" />
                  </div>
                  <div className="text-base font-bold text-white">48</div>
                  <div className="text-[9px] text-emerald-400 font-medium">+8% MoM</div>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-purple-500/40">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="text-[10px] font-medium text-slate-300">Deals</span>
                    <Briefcase className="h-3 w-3 text-purple-400" />
                  </div>
                  <div className="text-base font-bold text-white">36</div>
                  <div className="text-[9px] text-purple-300 font-medium">₹42.5L Pipe</div>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-orange-500/40">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="text-[10px] font-medium text-slate-300">Revenue</span>
                    <IndianRupee className="h-3 w-3 text-orange-400" />
                  </div>
                  <div className="text-base font-bold text-white">₹18.5L</div>
                  <div className="text-[9px] text-emerald-400 font-medium">+24% MoM</div>
                </div>
              </div>

              {/* Deal Pipeline Bar */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white text-[11px] flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-blue-400" />
                    Deal Pipeline (36 Deals)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    <BadgeCheck className="h-3 w-3" /> 82% Win Rate
                  </span>
                </div>

                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800 gap-0.5">
                  <div className="h-full bg-blue-500 rounded-l-full" style={{ width: "33%" }} title="Open (12)" />
                  <div className="h-full bg-purple-500" style={{ width: "22%" }} title="Quotation (8)" />
                  <div className="h-full bg-amber-500" style={{ width: "17%" }} title="Negotiation (6)" />
                  <div className="h-full bg-emerald-500" style={{ width: "19%" }} title="Won (7)" />
                  <div className="h-full bg-rose-500 rounded-r-full" style={{ width: "9%" }} title="Lost (3)" />
                </div>

                <div className="grid grid-cols-5 gap-1 text-[9px] text-slate-400 text-center pt-0.5">
                  <span>Open 12</span>
                  <span>Quote 8</span>
                  <span>Negot 6</span>
                  <span className="text-emerald-400 font-semibold">Won 7</span>
                  <span className="text-rose-400 font-semibold">Lost 3</span>
                </div>
              </div>

              {/* Live Activities Stream (2 concise items) */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Activity className="h-3 w-3 text-primary" /> Live Team Activity
                  </span>
                  <span>Socket.IO Sync</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 border border-white/5 px-2 py-1.5 text-[10px]">
                    <UserRound className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="text-slate-300 truncate">Acme Corp lead qualified</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 border border-white/5 px-2 py-1.5 text-[10px]">
                    <Briefcase className="h-3 w-3 text-purple-400 shrink-0" />
                    <span className="text-slate-300 truncate">₹4.2L Quotation approved</span>
                  </div>
                </div>
              </div>

              {/* Multi-Tenant Security Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-white/5">
                <span className="flex items-center gap-1 text-slate-300">
                  <ShieldCheck className="h-3 w-3 text-blue-400" />
                  Multi-Tenant Partitioning • Granular RBAC
                </span>
                <span className="text-slate-400">Org Scoped Data</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
            <span>© {new Date().getFullYear()} CRM Pro Platform</span>
            <div className="flex items-center gap-3">
              <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
              <Link href="/pricing" className="hover:text-slate-300 transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Right Side (Form Container - Exactly 1:1, 50% width) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 xl:p-10 h-full overflow-y-auto lg:overflow-hidden">
          {/* Top Bar for Mobile & Back Link */}
          <div className="flex items-center justify-between w-full max-w-md mx-auto mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group py-1"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xs">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CRM Pro
              </span>
            </Link>
          </div>

          {/* Form */}
          <div className="my-auto w-full max-w-md mx-auto py-2">
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-xs text-muted-foreground">Loading workspace login...</div>}>
              <LoginForm />
            </Suspense>
          </div>

          {/* Mobile Footer */}
          <div className="text-center text-xs text-muted-foreground pt-2 lg:hidden">
            <Link href="/" className="hover:underline">
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
