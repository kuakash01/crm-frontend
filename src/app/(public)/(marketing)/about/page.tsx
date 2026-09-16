import Link from "next/link";
import {
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Layers,
  LockKeyhole,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Users,
  Workflow,
  Zap,
  ArrowRight,
  Globe,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";

export const metadata = {
  title: "About the CRM & Technical Architecture",
  description:
    "Discover the engineering philosophy, full-stack architecture, and production design behind this modern multi-tenant CRM built by Akash Kumar.",
  alternates: {
    canonical: "/about",
  },
};

const technicalPillars = [
  {
    icon: ShieldCheck,
    title: "Dynamic RBAC & Roles Engine",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10 border-rose-500/20",
    description:
      "Unlike conventional CRM platforms with static hardcoded roles, this system supports runtime creation of custom roles with granular module:action permission tags.",
  },
  {
    icon: Database,
    title: "PostgreSQL Relational Integrity",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    description:
      "Relational schema with foreign keys, transactional COMMIT/ROLLBACK guarantees across mutations, and parameterized queries ensuring complete multi-tenant isolation.",
  },
  {
    icon: Radio,
    title: "Real-Time WebSocket Event Rooms",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    description:
      "Socket.IO connection layer with organization and user room isolation, broadcasting CRM changes to dashboard cards and notification bells in real time.",
  },
  {
    icon: Server,
    title: "Layered Express REST API",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    description:
      "Enterprise TypeScript architecture decoupling HTTP Controllers from domain Business Services, SQL query builders, and centralized AppError handlers.",
  },
  {
    icon: LockKeyhole,
    title: "JWT & HttpOnly Cookie Security",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    description:
      "Protected auth cookies, bcrypt salted password hashing, cross-domain Next.js proxy token bridges, and zero vulnerable tokens in browser localStorage.",
  },
  {
    icon: Terminal,
    title: "Universal Workspace Search (Ctrl+K)",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    description:
      "Parallel multi-table query engine searching deals, leads, customers, tasks, and services in sub-100ms with deep direct linking to detail records.",
  },
];

const architectureLayers = [
  {
    title: "1. Presentation & Client Layer",
    tech: "Next.js 16 (App Router) • React 19 • Tailwind CSS • Redux Toolkit",
    summary:
      "Server-rendered layouts with client-hydrated interactive views. Features zero-hydration mismatch session guards, dynamic dark/light mode parity, and responsive ergonomics across desktop and mobile.",
  },
  {
    title: "2. Application & API Layer",
    tech: "Node.js • Express.js • TypeScript • Custom Middleware",
    summary:
      "Layered REST API architecture with strict authentication, dynamic permission enforcement, unified error filters, and cursor/page pagination helpers.",
  },
  {
    title: "3. Relational Persistence Layer",
    tech: "PostgreSQL Database • Raw Parameterized SQL • Connection Pooling",
    summary:
      "ACID relational model guaranteeing data consistency across leads, customers, deals, and audit activities. Multi-tenant partitioning enforced on every query.",
  },
  {
    title: "4. Real-Time Event-Driven Layer",
    tech: "Socket.IO • Org & User Rooms • Debounced Client Refresh",
    summary:
      "Bidirectional WebSocket transport streaming CRM mutations to connected team members without manual polling or database contention.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-3xl">
        <div className="h-full w-full bg-gradient-to-br from-primary/15 via-purple-500/10 to-transparent opacity-60 dark:opacity-80" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-border/60 bg-muted/20 pb-16 pt-20 sm:pb-24 sm:pt-28 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
            <Code2 className="h-3.5 w-3.5" />
            <span>Full-Stack Architecture & Engineering Philosophy</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Engineered for Velocity.{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary/70 bg-clip-text text-transparent">
              Built with Relational Integrity.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            A production-style CRM designed around real-world software architecture:
            multi-tenant isolation, dynamic RBAC, real-time WebSocket push updates, and ACID
            relational databases.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PublicCtaButton
              size="lg"
              guestText="Explore the CRM"
              authText="Go to Dashboard"
            />
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-xl">
                Discuss Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Developer & Project Architect Spotlight */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <Card className="overflow-hidden border border-border/80 shadow-xl bg-card/80 backdrop-blur-md rounded-3xl p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="space-y-5">
                <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/30">
                  Architect & Developer
                </Badge>
                <h2 className="text-3xl font-extrabold text-foreground">
                  Akash Kumar
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Full-stack software engineer focused on building robust, high-performance web systems.
                  This CRM was built from the ground up to solve the real architectural challenges
                  often omitted in simplified tutorials—such as multi-tenant room scoping, dynamic permission
                  matrices without code deploys, and database-level transactional safety.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://akashkumar04.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Personal Portfolio</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="https://github.com/kuakash01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href="mailto:ku.akash.04@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <span>ku.akash.04@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Engineering Stats Grid */}
              <div className="rounded-2xl border border-border/70 bg-muted/20 p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Architecture Benchmarks
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border/60 bg-card p-3.5">
                    <span className="text-2xl font-black text-foreground">7</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Core CRM Engines</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-3.5">
                    <span className="text-2xl font-black text-emerald-500">&lt;30ms</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Query Latency</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-3.5">
                    <span className="text-2xl font-black text-primary">100%</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Dynamic RBAC</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-3.5">
                    <span className="text-2xl font-black text-purple-500">Live</span>
                    <p className="text-xs text-muted-foreground mt-0.5">WebSocket Sync</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 4-Quadrant Architecture Blueprint */}
      <section className="border-t border-border/60 bg-muted/10 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Full-Stack Blueprint
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Production Architecture Stack
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              How the CRM separates presentation, business logic, persistence, and real-time broadcasting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {architectureLayers.map((layer, index) => (
              <Card key={index} className="border border-border/70 bg-card/60 p-6 sm:p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {layer.tech}
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2">
                  {layer.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {layer.summary}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Core Technical Pillars */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Engineering Disciplines
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Core Technical Capabilities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {technicalPillars.map((pillar, idx) => {
              const Icon = pillar.icon;

              return (
                <Card key={idx} className="border border-border/70 bg-card/60 p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border mb-4 ${pillar.bgColor}`}>
                    <Icon className={`h-5 w-5 ${pillar.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Finale */}
      <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-purple-500/10 p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Explore the Implementation
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Experience the application firsthand or review the codebase on GitHub.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PublicCtaButton
                size="lg"
                guestText="Launch CRM Workspace"
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