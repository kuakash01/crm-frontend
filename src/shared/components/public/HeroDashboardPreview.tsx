"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  ShieldCheck,
  Activity,
  Users,
  UserCheck,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles,
  Shield,
  Clock,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PreviewTab = "overview" | "pipeline" | "rbac" | "activity";

export function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("overview");

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Ambient glowing backdrops */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none -z-10" />

      {/* Main Glassmorphic Showcase Window */}
      <div className="rounded-2xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Window Chrome Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-border/70 bg-muted/40 px-4 py-3 gap-2">
          {/* Traffic Lights & Org Badge */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/90 shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-amber-400/90 shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-2xs" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground pl-1.5 border-l border-border/60">
              CRM Pro <span className="text-[10px] text-primary font-medium px-1.5 py-0.5 rounded-full bg-primary/10">v2.0</span>
            </span>
          </div>

          {/* Live indicator */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>Live Workspace Sync</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 border-b border-border/60 bg-muted/20 px-3 py-2 overflow-x-auto scrollbar-none">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={LayoutDashboard}
            label="Overview KPIs"
          />
          <TabButton
            active={activeTab === "pipeline"}
            onClick={() => setActiveTab("pipeline")}
            icon={Briefcase}
            label="Deals Pipeline"
          />
          <TabButton
            active={activeTab === "rbac"}
            onClick={() => setActiveTab("rbac")}
            icon={ShieldCheck}
            label="Dynamic RBAC"
          />
          <TabButton
            active={activeTab === "activity"}
            onClick={() => setActiveTab("activity")}
            icon={Activity}
            label="Live Stream"
          />
        </div>

        {/* Tab Body Showcase */}
        <div className="p-5 sm:p-6 min-h-[380px] flex flex-col justify-between">
          {activeTab === "overview" && <OverviewTabContent />}
          {activeTab === "pipeline" && <PipelineTabContent />}
          {activeTab === "rbac" && <RbacTabContent />}
          {activeTab === "activity" && <ActivityTabContent />}

          {/* Interactive footer hint */}
          <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Click any tab above to explore connected CRM modules
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px]">
              PostgreSQL • Socket.IO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
        active
          ? "bg-background text-foreground shadow-xs border border-border"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${active ? "text-primary" : ""}`} />
      <span>{label}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* TAB 1: OVERVIEW KPIS                                                       */
/* -------------------------------------------------------------------------- */

function OverviewTabContent() {
  return (
    <div className="space-y-4">
      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Leads */}
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Total Leads</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Users className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-foreground">1,284</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <span>+14.2%</span>
          </div>
        </div>

        {/* Customers */}
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Customers</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-foreground">642</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <span>+8.5%</span>
          </div>
        </div>

        {/* Active Deals */}
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Active Deals</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-foreground">89</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
            <span>₹48.2L value</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Revenue</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <IndianRupee className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-foreground">₹28.4L</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <span>+22.4%</span>
          </div>
        </div>
      </div>

      {/* Monthly Pipeline Summary Bar Card */}
      <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Pipeline Velocity & Deal Health
          </span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            82% Win Rate Target
          </span>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex shadow-inner">
          <div className="bg-blue-500 h-full" style={{ width: "32%" }} title="Open (32%)" />
          <div className="bg-purple-500 h-full" style={{ width: "24%" }} title="Quotation (24%)" />
          <div className="bg-amber-500 h-full" style={{ width: "18%" }} title="Negotiation (18%)" />
          <div className="bg-emerald-500 h-full" style={{ width: "20%" }} title="Won (20%)" />
          <div className="bg-rose-500 h-full" style={{ width: "6%" }} title="Lost (6%)" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground font-medium">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Open: 34</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> Quote: 22</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Negotiate: 16</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500 text-emerald-600" /> Won: 18</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TAB 2: DEALS PIPELINE                                                      */
/* -------------------------------------------------------------------------- */

function PipelineTabContent() {
  const stages = [
    { name: "Open Prospecting", count: 34, value: "₹14,20,000", color: "bg-blue-500", text: "text-blue-500", pct: 75 },
    { name: "Quotation Sent", count: 22, value: "₹18,60,000", color: "bg-purple-500", text: "text-purple-500", pct: 58 },
    { name: "Negotiation Review", count: 16, value: "₹12,80,000", color: "bg-amber-500", text: "text-amber-500", pct: 42 },
    { name: "Deals Won", count: 18, value: "₹16,40,000", color: "bg-emerald-500", text: "text-emerald-500", pct: 48 },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Sales Pipeline Stages</h4>
          <p className="text-xs text-muted-foreground">Active funnel opportunities and expected revenue conversion</p>
        </div>
        <span className="text-xs font-bold text-foreground bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20">
          ₹62.0L Active Value
        </span>
      </div>

      <div className="space-y-2.5">
        {stages.map((stage) => (
          <div key={stage.name} className="rounded-lg border border-border/70 bg-muted/20 p-2.5 text-xs">
            <div className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2 text-foreground font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                {stage.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{stage.count} deals</span>
                <span className="font-bold text-foreground">{stage.value}</span>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TAB 3: DYNAMIC RBAC & ROLES                                                */
/* -------------------------------------------------------------------------- */

function RbacTabContent() {
  const roles = [
    {
      role: "Admin (Owner)",
      badge: "Full Privilege",
      color: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
      permissions: ["leads:*", "deals:*", "customers:*", "roles:manage", "users:invite"],
    },
    {
      role: "Sales Manager",
      badge: "Team Oversight",
      color: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      permissions: ["leads:assign", "deals:read/write", "customers:export", "analytics:read"],
    },
    {
      role: "Sales Representative",
      badge: "Execution Level",
      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      permissions: ["leads:read/convert", "deals:create/update", "tasks:complete", "notes:create"],
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Dynamic Role-Based Access Control</h4>
          <p className="text-xs text-muted-foreground">Modular, action-level permissions enforced across API and frontend</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
          <Shield className="h-3.5 w-3.5" />
          <span>PostgreSQL RLS</span>
        </div>
      </div>

      <div className="space-y-2">
        {roles.map((r) => (
          <div key={r.role} className="rounded-lg border border-border/70 bg-muted/20 p-3 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">{r.role}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${r.color}`}>
                {r.badge}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {r.permissions.map((perm) => (
                <span
                  key={perm}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-background border border-border/80 text-muted-foreground"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TAB 4: REAL-TIME ACTIVITY STREAM                                           */
/* -------------------------------------------------------------------------- */

function ActivityTabContent() {
  const events = [
    {
      type: "lead",
      title: "Lead Converted to Customer",
      desc: "Rahul Sharma was qualified & onboarded by Sales Rep 1",
      time: "Just now",
      color: "bg-emerald-500",
      icon: UserCheck,
    },
    {
      type: "deal",
      title: "Deal Closed • Won",
      desc: "Enterprise Cloud Contract (₹6,50,000) reached Won stage",
      time: "4 min ago",
      color: "bg-purple-500",
      icon: Briefcase,
    },
    {
      type: "task",
      title: "Task Completed",
      desc: "Prepare technical architecture diagram for Acme Corp",
      time: "18 min ago",
      color: "bg-blue-500",
      icon: CheckCircle2,
    },
    {
      type: "assign",
      title: "New Lead Assigned",
      desc: "Inbound inquiry assigned to Sales Rep 2 with high priority",
      time: "32 min ago",
      color: "bg-amber-500",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Real-Time Event Broadcast</h4>
          <p className="text-xs text-muted-foreground">Socket.IO instant room delivery without page reloads</p>
        </div>
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          WebSocket Connected
        </span>
      </div>

      <div className="space-y-2">
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div
              key={ev.title}
              className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/20 p-2.5 text-xs transition-colors hover:bg-muted/40"
            >
              <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white ${ev.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-foreground truncate">{ev.title}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{ev.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{ev.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
