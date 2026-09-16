"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  ContactRound,
  Briefcase,
  ClipboardCheck,
  ShieldCheck,
  Radio,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  LockKeyhole,
  Database,
  Layers,
  BarChart3,
  Flame,
  Clock,
  Terminal,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";
import { cn } from "@/lib/utils";

const crmEngines = [
  {
    id: "leads",
    name: "Lead Intelligence",
    badge: "Ingestion & Conversion",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    headline: "Capture, Qualify, and Convert High-Value Leads",
    description:
      "A complete lifecycle engine that routes leads, tracks status transitions, logs follow-up notes, and converts qualified opportunities into paying customers in a single click.",
    capabilities: [
      "Dynamic lead assignment across sales representatives",
      "Lifecycle progression (New, Contacted, Qualified, Converted, Lost)",
      "Instant 1-click conversion generating linked customer records",
      "Full chronological audit log and team activity timeline",
      "Fast multi-field search and status filtering",
    ],
    technicalSpec: {
      dbTable: "leads",
      relation: "1:1 with Customers on conversion, 1:N with Tasks/Notes",
      accessControl: "leads:create, leads:read, leads:update, leads:delete",
    },
  },
  {
    id: "deals",
    name: "Deals & Pipeline",
    badge: "Revenue Forecasting",
    icon: Briefcase,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    headline: "Visual Sales Pipeline with Precise Value Tracking",
    description:
      "Monitor active deal cycles through customized stages, calculate win rates automatically, and forecast quarterly revenue with relational customer integrity.",
    capabilities: [
      "5-stage visual pipeline: Open, Quotation Sent, Negotiation, Won, Lost",
      "Real-time revenue aggregation formatted in INR (₹)",
      "Win-conversion gauge calculation based on closed volume",
      "Multi-deal batch assignments and stage transfers",
      "Automatic project kickoff triggers upon marking deals Won",
    ],
    technicalSpec: {
      dbTable: "deals",
      relation: "N:1 with Customers and Services, N:1 with Organizations",
      accessControl: "deals:create, deals:read, deals:update, deals:delete",
    },
  },
  {
    id: "customers",
    name: "Customer Directory",
    badge: "360° Relationship",
    icon: ContactRound,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    headline: "Centralized Customer History and Account Metrics",
    description:
      "Maintain complete institutional memory for every account. Connect closed deals, historical communications, and upcoming milestones in a single clean view.",
    capabilities: [
      "Centralized profile with dual phone contacts and corporate metadata",
      "Origin traceability showing whether converted from lead or manual",
      "Historical deal ledger linked directly to customer balance",
      "Dedicated notes timeline for customer success handoffs",
      "Organization-scoped access rules preventing cross-tenant leaks",
    ],
    technicalSpec: {
      dbTable: "customers",
      relation: "1:N with Deals, 1:N with Tasks, 1:N with Activities",
      accessControl: "customers:create, customers:read, customers:update",
    },
  },
  {
    id: "tasks",
    name: "Connected Tasks",
    badge: "Execution & Queue",
    icon: ClipboardCheck,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    headline: "Actionable Follow-Up Queue Connected to CRM Records",
    description:
      "Never miss a contract renewal or follow-up call. Tasks are bound directly to leads, customers, or deals, ensuring every action has direct commercial context.",
    capabilities: [
      "Polymorphic task associations (Lead, Customer, Deal, or General)",
      "One-click status toggling with optimistic UI updates",
      "Urgency filters and Due Today automatic grouping",
      "Socket.IO instant alerts when assigned a follow-up by a colleague",
      "Full priority matrix (Low, Normal, High, Urgent)",
    ],
    technicalSpec: {
      dbTable: "tasks",
      relation: "Polymorphic entity_type + entity_id foreign mappings",
      accessControl: "tasks:create, tasks:read, tasks:update, tasks:delete",
    },
  },
  {
    id: "rbac",
    name: "Dynamic RBAC",
    badge: "Granular Security",
    icon: ShieldCheck,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10 border-rose-500/20",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    headline: "Custom Roles & Module:Action Permissions Without Code",
    description:
      "Unlike rigid SaaS tools with fixed roles, this CRM allows workspace owners to create custom roles (e.g. Sales Intern, Regional Manager) and toggle exact module-action permissions dynamically.",
    capabilities: [
      "Module-level toggles (Leads, Deals, Customers, Tasks, Services, Users)",
      "Action-level precision (Create, Read, Update, Delete, Export)",
      "Unassigned record visibility controls (protecting sensitive pipelines)",
      "Multi-tenant isolation guaranteeing zero cross-org data leakage",
      "Backend API middleware enforcing database-level verification",
    ],
    technicalSpec: {
      dbTable: "roles, permissions, role_permissions",
      relation: "Many-to-Many dynamic matrix evaluated per request",
      accessControl: "users:create, roles:manage, permissions:assign",
    },
  },
  {
    id: "realtime",
    name: "Real-Time Sync",
    badge: "Socket.IO Engine",
    icon: Radio,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    headline: "Live Workspace Broadcasting & Instant Notification Push",
    description:
      "Keep distributed sales teams aligned in real time. Deal updates, assignment changes, and new activities broadcast instantly to all connected users within the workspace room.",
    capabilities: [
      "Multi-tenant rooms: `org:${id}` and `user:${id}` channel isolation",
      "Automatic dashboard card refetching with 250ms debounce buffering",
      "Live visual pulse indicators highlighting which metric updated",
      "Unread notification counter badge synchronized with Redux store",
      "Cross-domain JWT token proxy bridging client and backend socket",
    ],
    technicalSpec: {
      dbTable: "notifications, activities",
      relation: "Socket.IO authenticated via HttpOnly cookie & JWT proxy",
      accessControl: "Automatic organization room subscription",
    },
  },
  {
    id: "search",
    name: "Universal Search",
    badge: "Instant Ctrl+K",
    icon: Search,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    headline: "Keyboard-Driven Search Across Every Workspace Entity",
    description:
      "Jump anywhere in under 100 milliseconds. Press Ctrl+K to query leads, deals, customers, tasks, and services simultaneously with deep links directly to detail pages.",
    capabilities: [
      "Parallel PostgreSQL search indexing 5 CRM tables at once",
      "Fuzzy substring matching across names, emails, companies, and titles",
      "Categorized results with live status badges and currency amounts",
      "Direct keyboard navigation (Arrow keys + Enter) to detail screens",
      "Quick module filter shortcuts to view comprehensive list results",
    ],
    technicalSpec: {
      dbTable: "Parallel query across leads, customers, deals, tasks, services",
      relation: "Scoped to user visible IDs and organization ID",
      accessControl: "Respects granular module:read permissions",
    },
  },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const currentEngine = crmEngines.find((e) => e.id === activeTab) || crmEngines[0];
  const EngineIcon = currentEngine.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-3xl">
        <div className="h-full w-full bg-gradient-to-br from-primary/15 via-purple-500/10 to-transparent opacity-60 dark:opacity-80" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-border/60 bg-muted/20 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Platform Capabilities • 7 Core CRM Engines</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Everything Your Sales Engine Demands.{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary/70 bg-clip-text text-transparent">
              Zero Generic Compromises.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            From multi-source lead qualification to visual deal pipelines, dynamic RBAC,
            and real-time Socket.IO synchronization—engineered with relational PostgreSQL
            integrity for high-velocity teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PublicCtaButton
              size="lg"
              guestText="Start Free Today"
              authText="Go to Dashboard"
            />
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="rounded-xl">
                Explore Free Plan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Engine Explorer */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Interactive Architecture
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Deep-Dive into the Core Modules
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Select an engine below to inspect its operational workflow, capabilities, and backend data model.
            </p>
          </div>

          {/* Module Selector Pill Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {crmEngines.map((engine) => {
              const Icon = engine.icon;
              const isActive = activeTab === engine.id;

              return (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => setActiveTab(engine.id)}
                  className={cn(
                    "group flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                      : "border-border/70 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : engine.color)} />
                  <span>{engine.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Engine Card Presentation */}
          <div className="mt-8">
            <Card className="relative overflow-hidden border border-border/80 shadow-xl bg-card/70 backdrop-blur-md">
              {/* Subtle ambient gradient */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 transition-all duration-500",
                  currentEngine.gradient
                )}
              />

              <CardContent className="relative p-6 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
                  {/* Left Column: Capabilities & Description */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl border", currentEngine.bgColor)}>
                        <EngineIcon className={cn("h-6 w-6", currentEngine.color)} />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-wider">
                          {currentEngine.badge}
                        </Badge>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-0.5">
                          {currentEngine.headline}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                      {currentEngine.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Key Capabilities
                      </h4>
                      <div className="grid gap-2.5 sm:grid-cols-1">
                        {currentEngine.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Technical Architecture Card */}
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm space-y-5">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold tracking-wider uppercase text-foreground">
                          Engine Blueprint
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        POSTGRESQL + REST
                      </Badge>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground block text-[11px] font-sans font-semibold uppercase">
                          Target DB Table
                        </span>
                        <p className="mt-1 rounded-md bg-muted/60 px-2.5 py-1.5 text-foreground font-medium">
                          {currentEngine.technicalSpec.dbTable}
                        </p>
                      </div>

                      <div>
                        <span className="text-muted-foreground block text-[11px] font-sans font-semibold uppercase">
                          Relational Topology
                        </span>
                        <p className="mt-1 rounded-md bg-muted/60 px-2.5 py-1.5 text-foreground font-medium">
                          {currentEngine.technicalSpec.relation}
                        </p>
                      </div>

                      <div>
                        <span className="text-muted-foreground block text-[11px] font-sans font-semibold uppercase">
                          Granular Permission Keys
                        </span>
                        <p className="mt-1 rounded-md bg-muted/60 px-2.5 py-1.5 text-primary font-medium">
                          {currentEngine.technicalSpec.accessControl}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/60">
                      <PublicCtaButton
                        guestText={`Explore ${currentEngine.name}`}
                        authText="View in Dashboard"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Platform Features Bento Grid */}
      <section className="border-t border-border/60 bg-muted/10 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Enterprise Resilience
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Built for Scale, Speed, and Compliance
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Strict Relational Integrity
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Raw PostgreSQL tables with foreign key cascades, unique indexes, and ACID transactions. No messy document sprawl or orphan records.
              </p>
            </Card>

            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Secure JWT & HttpOnly Cookies
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                State-of-the-art authentication with cross-domain proxy token translation, bcrypt password hashing, and zero token storage in localStorage.
              </p>
            </Card>

            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Ultra-Low Query Latency
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Optimized SQL queries with pagination, visibility filtering, and connection pooling executing in &lt;30ms on production instances.
              </p>
            </Card>

            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Layered Modular Clean Code
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Clean architectural separation between Controllers, Services, SQL Helpers, and Express routes for maintainable extensibility.
              </p>
            </Card>

            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-4">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Dynamic RBAC Without Deploys
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Create new roles and reconfigure permissions on the fly directly through the dashboard without writing code or redeploying servers.
              </p>
            </Card>

            <Card className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-4">
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Bidirectional WebSocket Rooms
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Live organization broadcasting guarantees every rep sees stage movements, task completions, and assignment changes immediately.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Finale */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-purple-500/10 p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to Upgrade Your Sales Command Center?
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Join teams organizing leads, accelerating pipelines, and enforcing dynamic access control with our 100% free community tier.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PublicCtaButton
                size="lg"
                guestText="Get Started in Seconds"
                authText="Go to Dashboard"
              />
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Contact Developer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
