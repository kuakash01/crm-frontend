"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Search,
  Lock,
  ChevronDown,
  Download,
  Users,
  Briefcase,
  CheckSquare,
  Radio,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";
import { cn } from "@/lib/utils";

const platformFeatures = [
  {
    title: "Lead Capture & 1-Click Conversion",
    desc: "Collect prospective clients, track stages, and automatically convert qualified leads into customers.",
    icon: Users,
  },
  {
    title: "Interactive Deals Pipeline",
    desc: "Drag-and-drop Kanban deal pipeline with real-time deal stage tracking and INR currency formatting.",
    icon: Briefcase,
  },
  {
    title: "Connected Task Queue & Due Dates",
    desc: "Assign tasks with priorities, filter by due date, and link directly to deals, customers, or leads.",
    icon: CheckSquare,
  },
  {
    title: "Universal CSV Data Export",
    desc: "One-click export for leads, customers, deals, and tasks compatible with Excel and Google Sheets.",
    icon: Download,
  },
  {
    title: "Dynamic Roles & Action-Level RBAC",
    desc: "Configure granular permissions per module (create, read, update, delete, assign) without code changes.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time WebSocket Sync",
    desc: "Live dashboard updates and desktop notifications powered by multi-tenant Socket.IO rooms.",
    icon: Radio,
  },
  {
    title: "Universal Command Palette (Ctrl+K)",
    desc: "Instant fuzzy search across all CRM entities with permission-aware query filtering.",
    icon: Search,
  },
  {
    title: "PostgreSQL ACID Security",
    desc: "Relational data store with strict foreign keys, parameterized queries, and complete organization isolation.",
    icon: Database,
  },
];

const faqs = [
  {
    question: "Is this CRM completely free to use?",
    answer:
      "Yes. The entire platform and all current CRM modules—including leads, customers, deals, tasks, dynamic RBAC, real-time WebSockets, and universal search—are 100% free with no credit card required.",
  },
  {
    question: "Are there any artificial limits on contacts or deals?",
    answer:
      "No. There are no artificial limits or paywalls on contacts, leads, deals, or team members. You can create as many records as your business requires.",
  },
  {
    question: "How does multi-tenant data isolation work?",
    answer:
      "Every database query is strictly parameterized and constrained by organization_id. Furthermore, Socket.IO channels are segregated by org rooms, ensuring that workspace data is completely isolated from other tenants.",
  },
  {
    question: "Can I export my data if I need it elsewhere?",
    answer:
      "Yes. The built-in Universal CSV Export engine allows you to export your filtered leads, customers, deals, and tasks anytime in standard UTF-8 CSV format.",
  },
  {
    question: "How do I invite my team members?",
    answer:
      "Organization owners and administrators can invite team members via email through the Users & Roles settings. Teammates receive an invitation link to set their password and immediately join your workspace.",
  },
];

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-3xl">
        <div className="h-full w-full bg-gradient-to-br from-primary/15 via-emerald-500/10 to-transparent opacity-60 dark:opacity-80" />
      </div>

      {/* Hero */}
      <section className="relative border-b border-border/60 bg-muted/20 pb-16 pt-20 sm:pb-24 sm:pt-28 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open Access • All Features Unlocked</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Modern Sales Infrastructure.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 bg-clip-text text-transparent">
              100% Free.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Gain unrestricted access to all CRM capabilities. Run your sales pipeline with real-time
            synchronization, dynamic RBAC permissions, and relational PostgreSQL data models with zero paywalls.
          </p>
        </div>
      </section>

      {/* Main Single Plan Showcase */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-2 border-primary/60 shadow-2xl bg-card/90 rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/70">
              <div>
                <div className="flex items-center gap-2.5">
                  <Badge variant="default" className="text-xs font-semibold">
                    Community Edition
                  </Badge>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> All Features Active
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-black text-foreground">
                  Free Forever
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete access for sales teams, startups, and growing organizations.
                </p>
              </div>

              <div className="sm:text-right">
                <div className="flex items-baseline gap-1 sm:justify-end">
                  <span className="text-5xl font-black tracking-tight text-foreground">₹0</span>
                  <span className="text-sm font-medium text-muted-foreground">/ workspace</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
                Everything Included In Your Workspace:
              </h3>

              <div className="grid gap-6 sm:grid-cols-2">
                {platformFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">{feat.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-foreground">Ready to streamline your sales pipeline?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Instant activation • Free forever</p>
              </div>

              <PublicCtaButton
                size="lg"
                guestText="Launch Free Workspace"
                authText="Go to Dashboard"
                className="w-full sm:w-auto px-8 py-6 rounded-xl font-bold shadow-md"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-border/60 bg-muted/10 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Got Questions?
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border/70 bg-card/60 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-semibold text-foreground hover:bg-muted/40 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0 ml-4",
                        isOpen && "rotate-180 text-primary"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-background to-primary/10 p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Start Managing Your Sales Today
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Experience the full power of our free Community CRM platform with zero restrictions, real-time WebSockets, and custom dynamic RBAC.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PublicCtaButton
                size="lg"
                guestText="Launch Your Workspace"
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