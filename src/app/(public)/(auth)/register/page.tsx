import Link from "next/link";
import RegisterOrganizationForm from "@/features/auth/components/RegisterOrganisationForm";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
  UserCheck,
  Layers,
  Zap,
  Lock,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your CRM Workspace | CRM Platform",
  description: "Create an organization workspace and start using the CRM platform.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side (Desktop Hero) */}
        <section className="relative hidden lg:flex flex-col justify-between bg-slate-950 p-12 lg:p-16 overflow-hidden">
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
              <Sparkles className="h-3.5 w-3.5" />
              Instant Workspace Provisioning
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] text-white">
              Launch Your Dedicated{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
                CRM Organization
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base xl:text-lg leading-relaxed text-slate-400">
              Create an organization workspace with team hierarchy, dynamic role-based permissions, and sales pipelines.
            </p>

            {/* Architecture & Role Blueprint Card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md space-y-3.5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Organization Team Structure
                  </span>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Ready to Deploy
                </span>
              </div>

              {/* Hierarchy Tiers Included */}
              <div className="space-y-2">
                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Organization Owner (Admin)</div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Full workspace administration, role management, user invitations & settings.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Managers & Team Leads</div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Lead delegation, deal quotation reviews, and subordinate team oversight.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Sales Representatives & Agents</div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Lead conversions, quotation generation, stage progress, and task management.
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Pillars */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5 text-center">
                <div className="rounded-lg bg-slate-950/60 p-2">
                  <div className="text-[10px] text-slate-400">Multi-Tenancy</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">Org Scoped Data</div>
                </div>
                <div className="rounded-lg bg-slate-950/60 p-2">
                  <div className="text-[10px] text-slate-400">Access Control</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">Custom Roles & RBAC</div>
                </div>
                <div className="rounded-lg bg-slate-950/60 p-2">
                  <div className="text-[10px] text-slate-400">Notifications</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">Socket.IO Live Alerts</div>
                </div>
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
        </section>

        {/* Right Side (Form Container) */}
        <section className="flex flex-col justify-between p-6 sm:p-8 md:p-12 overflow-y-auto">
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
            <RegisterOrganizationForm />
          </div>

          {/* Mobile Footer */}
          <div className="text-center text-xs text-muted-foreground pt-6 lg:hidden">
            <Link href="/" className="hover:underline">
              ← Return to Landing Page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}