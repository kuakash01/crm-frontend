import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ContactRound,
  Database,
  KanbanSquare,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
  Code2,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  Shield,
  Server,
  Cpu,
  UserCheck,
  IndianRupee,
  Briefcase,
  GitBranch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";
import { HeroDashboardPreview } from "@/shared/components/public/HeroDashboardPreview";
import { ServerWarmup } from "@/shared/components/public/ServerWarmup";

export const metadata: Metadata = {
  title: "CRM Pro | Modern Sales & Customer Management Platform",
  description:
    "Manage leads, customers, deals, dynamic RBAC permissions, and real-time notifications with a modern full-stack CRM platform.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <ServerWarmup />
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 border-b border-border/50">
        {/* Background Gradients & Glows */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-primary/10 via-background/60 to-background pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-[380px] w-[800px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column: Headlines & CTAs */}
            <div className="max-w-2xl">
              {/* Live System Badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-foreground font-semibold">Enterprise CRM Platform</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="text-primary font-medium">Socket.IO Real-Time</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
                Accelerate customer relationships{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  without the complexity.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                A unified sales command center that connects leads, customer accounts, multi-stage deal pipelines, custom RBAC roles, and real-time team notifications into one fluid workspace.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <PublicCtaButton
                  guestText="Explore the CRM"
                  authText="Go to Dashboard"
                  size="lg"
                  className="h-12 px-7 text-base font-semibold shadow-md shadow-primary/20 cursor-pointer"
                />

                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-12 px-7 text-base font-medium w-full sm:w-auto">
                    View features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Highlights Checklist */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Dynamic RBAC Roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>5-Stage Deal Funnel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Live WebSockets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>PostgreSQL Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>1-Click Conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Light / Dark Ready</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Dashboard Preview Showcase */}
            <div className="w-full">
              <HeroDashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. PERFORMANCE & PLATFORM STATS STRIP                                */}
      {/* -------------------------------------------------------------------- */}
      <section className="border-b border-border/60 bg-muted/25 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-extrabold tracking-tight text-foreground font-mono">&lt;30ms</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Query Response Latency</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold tracking-tight text-primary font-mono">100%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Modular Action-Level RBAC</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold tracking-tight text-foreground font-mono">Instant</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Socket.IO Broadcast Rooms</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">Type-Safe</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">PostgreSQL & TypeScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. BENTO GRID MODULE SHOWCASE                                        */}
      {/* -------------------------------------------------------------------- */}
      <section id="features" className="py-24 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core CRM Architecture
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Engineered for High-Performance Sales Teams
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every capability is integrated into a unified relational database schema with strict multi-tenant data boundaries.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Deals Pipeline (Span 2) */}
            <Card className="lg:col-span-2 overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Sales Funnel
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">Visual Deals Pipeline & Forecasting</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Track sales opportunities through 5 distinct workflow stages (Open, Quotation Sent, Negotiation, Won, Lost) with real-time value aggregation and win probability metrics.
                  </p>
                </div>

                {/* Mini Pipeline Visual Demo */}
                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Open Stage
                      </div>
                      <p className="mt-1 font-bold text-foreground text-sm">₹14.2L</p>
                      <span className="text-[10px] text-muted-foreground">34 opportunities</span>
                    </div>

                    <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        Quotation Sent
                      </div>
                      <p className="mt-1 font-bold text-foreground text-sm">₹18.6L</p>
                      <span className="text-[10px] text-muted-foreground">22 opportunities</span>
                    </div>

                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Negotiation
                      </div>
                      <p className="mt-1 font-bold text-foreground text-sm">₹12.8L</p>
                      <span className="text-[10px] text-muted-foreground">16 opportunities</span>
                    </div>

                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Closed Won
                      </div>
                      <p className="mt-1 font-bold text-foreground text-sm">₹16.4L</p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">82% Win Target</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Dynamic RBAC */}
            <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      Security
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">Dynamic RBAC & Roles</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Create custom roles on the fly with module and action-level permissions (<code className="text-xs bg-muted px-1 py-0.5 rounded">leads:convert</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">deals:assign</code>) without code modifications.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-mono bg-muted/60 px-2 py-0.5 rounded border">Admin (Owner)</span>
                  <span className="text-[11px] font-mono bg-muted/60 px-2 py-0.5 rounded border">Sales Manager</span>
                  <span className="text-[11px] font-mono bg-muted/60 px-2 py-0.5 rounded border">Sales Representative</span>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Real-Time Notifications */}
            <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Bell className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Socket.IO
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">Real-Time Team Sync</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Stay synchronized with authenticated WebSocket rooms. Deals converted, leads assigned, or tasks finished broadcast instantly to team members.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sub-second event propagation</span>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Lead Management & 1-Click Conversion (Span 2) */}
            <Card className="lg:col-span-2 overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Lead Lifecycle
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">Lead Ingestion & 1-Click Customer Conversion</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Capture leads, assign ownership to team reps, log notes, schedule follow-ups, and convert qualified prospects directly into full customer accounts while preserving activity logs.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                    <p className="font-semibold text-foreground">1. Lead Qualification</p>
                    <p className="text-muted-foreground text-[11px]">Track lead source, phone, email, status & rep notes.</p>
                  </div>
                  <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                    <p className="font-semibold text-foreground">2. Pipeline Association</p>
                    <p className="text-muted-foreground text-[11px]">Attach quotes and value estimations to the prospect.</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-1">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400">3. Customer Account</p>
                    <p className="text-muted-foreground text-[11px]">Auto-provision customer record with historical data intact.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. SALES WORKFLOW PIPELINE                                           */}
      {/* -------------------------------------------------------------------- */}
      <section className="border-b border-border/50 bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              One Connected Workflow
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              From Inbound Lead to Revenue Realization
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Eliminate isolated tools. The CRM unifies every step of customer engagement into a single relational pipeline.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <WorkflowStep
              step="01"
              title="Lead Ingestion"
              desc="Prospects are logged, automatically checked against duplicates, and assigned to team representatives."
              icon={Users}
            />
            <WorkflowStep
              step="02"
              title="Deal Creation"
              desc="Opportunities enter the visual sales pipeline with estimated closing dates and revenue values."
              icon={Briefcase}
            />
            <WorkflowStep
              step="03"
              title="Customer Conversion"
              desc="Won opportunities seamlessly transition into long-term customer records with historical notes."
              icon={UserCheck}
            />
            <WorkflowStep
              step="04"
              title="Task & Audit Log"
              desc="Follow-up tasks, contract renewals, and team activities are monitored via real-time audit logs."
              icon={ClipboardCheck}
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. FULL-STACK ARCHITECTURE & TECH STACK                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/40 p-8 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Modern Software Architecture
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                  Built From the Ground Up with Industry Standards
                </h2>

                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Engineered by <strong>Akash Kumar</strong> as a production-caliber project exploring multi-tenant relational design, JWT token security with HTTP-only cookies, connection pooling, and optimistic UI updates.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <TechBadge label="Next.js 16 (App Router)" />
                  <TechBadge label="React 19" />
                  <TechBadge label="TypeScript" />
                  <TechBadge label="Tailwind CSS v4" />
                  <TechBadge label="Redux Toolkit" />
                  <TechBadge label="Node.js & Express" />
                  <TechBadge label="PostgreSQL" />
                  <TechBadge label="Socket.IO" />
                  <TechBadge label="JWT Auth Cookies" />
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline">
                    <a
                      href="https://akashkumar04.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Developer Portfolio
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button asChild variant="ghost">
                    <a
                      href="https://github.com/kuakash01"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Profile
                    </a>
                  </Button>
                </div>
              </div>

              {/* Architecture Blueprint Card */}
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/70 text-xs font-semibold">
                  <span className="text-foreground flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    Relational Schema & Layer Topology
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">Postgres 16</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/20">
                    <span className="font-medium text-foreground">Frontend Presentation</span>
                    <span className="text-muted-foreground font-mono">Next.js + Redux</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/20">
                    <span className="font-medium text-foreground">API Layer & Middleware</span>
                    <span className="text-muted-foreground font-mono">Express REST + RBAC</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/20">
                    <span className="font-medium text-foreground">Real-Time Event Gateway</span>
                    <span className="text-muted-foreground font-mono">Socket.IO WebSockets</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/20">
                    <span className="font-medium text-foreground">Persistence & Isolation</span>
                    <span className="text-muted-foreground font-mono">PostgreSQL Pool (pg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. CALL TO ACTION FINALE                                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-primary/5 p-10 sm:p-14 shadow-lg">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Ready to Experience the Connected Workspace?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Test out the live CRM using our pre-seeded 1-click demo accounts or explore the entire workspace freely.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <PublicCtaButton
                guestText="Get started"
                authText="Go to Dashboard"
                size="lg"
                className="h-12 px-8 text-base font-semibold shadow-md shadow-primary/20"
              />

              <Link href="/about">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium">
                  About the Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorkflowStep({
  step,
  title,
  desc,
  icon: Icon,
}: {
  step: string;
  title: string;
  desc: string;
  icon: any;
}) {
  return (
    <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
          {step}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <h3 className="mt-5 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-mono text-foreground shadow-2xs">
      {label}
    </span>
  );
}
