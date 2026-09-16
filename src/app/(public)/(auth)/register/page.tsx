import Link from "next/link";
import RegisterOrganizationForm from "@/features/auth/components/RegisterOrganisationForm";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
  UserCheck,
  Zap,
  Briefcase,
  IndianRupee,
  Layers,
  Lock,
  Activity,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your CRM Workspace | CRM Pro Platform",
  description: "Create an organization workspace and launch your sales dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <main className="h-screen max-h-screen w-full overflow-hidden bg-muted/30">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* Left Side (Desktop Hero Showcase - Exactly 1:1, 50% width) */}
        <section className="relative hidden lg:flex flex-col justify-between bg-slate-950 p-6 xl:p-10 overflow-hidden border-r border-slate-800/80">
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
              <span>Partition Ready</span>
            </div>
          </div>

          {/* Center Main Content & Organization Architecture Blueprint */}
          <div className="relative z-10 my-auto py-2 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 mb-2.5">
                <Sparkles className="h-3.5 w-3.5" />
                Instant Organization Provisioning
              </div>

              <h1 className="text-2xl xl:text-3xl font-extrabold leading-tight text-white">
                Launch Your Dedicated{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  CRM Organization
                </span>
              </h1>

              <p className="mt-1.5 max-w-lg text-xs xl:text-sm leading-relaxed text-slate-400">
                Provision a multi-tenant sales workspace with team hierarchies, pipelines, and role permissions.
              </p>
            </div>

            {/* Organization Blueprint Showcase Card (Compact to prevent scrollbar) */}
            <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Workspace Blueprint
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-medium text-emerald-400">Ready to Deploy</span>
                </div>
              </div>

              {/* 4 Starter Workspace Modules */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-0.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-medium text-slate-300">Leads CRM</span>
                    <Users className="h-3 w-3 text-blue-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Full Capture</div>
                  <div className="text-[9px] text-slate-400">Lead routing</div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-0.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-medium text-slate-300">Accounts</span>
                    <UserCheck className="h-3 w-3 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Customer 360</div>
                  <div className="text-[9px] text-slate-400">Profile sync</div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-0.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-medium text-slate-300">Pipeline</span>
                    <Briefcase className="h-3 w-3 text-purple-400" />
                  </div>
                  <div className="text-xs font-bold text-white">5 Stages</div>
                  <div className="text-[9px] text-slate-400">Quotes & deals</div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-0.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-medium text-slate-300">Analytics</span>
                    <IndianRupee className="h-3 w-3 text-orange-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Live Metrics</div>
                  <div className="text-[9px] text-slate-400">Forecasting</div>
                </div>
              </div>

              {/* 3-Tier Hierarchy Tiers */}
              <div className="space-y-1.5">
                {/* Org Owner / Admin */}
                <div className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-blue-500/40">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-white">Organization Owner (Admin)</span>
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Full Admin
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      Global dashboard analytics, user invitations, roles, forecasting & settings.
                    </div>
                  </div>
                </div>

                {/* Managers & Team Leads */}
                <div className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-amber-500/40">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-white">Managers & Team Leads</span>
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Oversight
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      Lead delegation, quotation reviews, deal approvals, and subordinate team oversight.
                    </div>
                  </div>
                </div>

                {/* Sales Representatives */}
                <div className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-2 transition-all hover:border-emerald-500/40">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-white">Sales Representatives</span>
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Execution
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      Lead nurturing, quotation generation, pipeline progress, and daily task management.
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Architecture Pillars */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/5 text-center">
                <div className="rounded-lg bg-slate-950/60 p-1.5 border border-white/5">
                  <div className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                    <Layers className="h-2.5 w-2.5 text-blue-400" /> Multi-Tenancy
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Isolated Partitions</div>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-1.5 border border-white/5">
                  <div className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                    <Lock className="h-2.5 w-2.5 text-indigo-400" /> Access Control
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Dynamic RBAC</div>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-1.5 border border-white/5">
                  <div className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
                    <Activity className="h-2.5 w-2.5 text-emerald-400" /> Notifications
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Socket.IO Live</div>
                </div>
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
        </section>

        {/* Right Side (Form Container - Exactly 1:1, 50% width) */}
        <section className="flex flex-col justify-between p-6 sm:p-8 xl:p-10 h-full overflow-y-auto lg:overflow-hidden">
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
            <RegisterOrganizationForm />
          </div>

          {/* Mobile Footer */}
          <div className="text-center text-xs text-muted-foreground pt-2 lg:hidden">
            <Link href="/" className="hover:underline">
              ← Return to Landing Page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}