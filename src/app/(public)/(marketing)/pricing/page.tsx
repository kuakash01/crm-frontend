"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  Users,
  ShieldCheck,
  Radio,
  Zap,
  HelpCircle,
  ArrowRight,
  Database,
  Search,
  Lock,
  ChevronDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";
import { cn } from "@/lib/utils";

const freePlanFeatures = [
  "Unlimited Leads & Contact Ingestion",
  "Full Customer Directory & History",
  "5-Stage Visual Deals Pipeline",
  "Connected Task Queue & Due Date Alerts",
  "Dynamic Roles & Action-Level Permissions",
  "Real-Time Socket.IO Notifications & Live Sync",
  "Universal Workspace Search (Ctrl+K)",
  "PostgreSQL Relational ACID Storage",
  "Dark & Light Theme Mode Support",
  "Restricted Unassigned Record Privacy Controls",
];

const comparisonCategories = [
  {
    category: "Core CRM Capabilities",
    features: [
      { name: "Lead Capture & 1-Click Conversion", free: true, pro: true, ent: true },
      { name: "Visual Deals Pipeline & INR Currency Formatting", free: true, pro: true, ent: true },
      { name: "Customer Profiles & Interaction Timelines", free: true, pro: true, ent: true },
      { name: "Connected Task Queue with Status Toggling", free: true, pro: true, ent: true },
      { name: "Universal Workspace Search (Ctrl+K)", free: true, pro: true, ent: true },
    ],
  },
  {
    category: "Security & Access Control",
    features: [
      { name: "Dynamic Custom Roles (Without Code Deploys)", free: true, pro: true, ent: true },
      { name: "Granular Module:Action Permission Matrix", free: true, pro: true, ent: true },
      { name: "Multi-Tenant Organization Room Isolation", free: true, pro: true, ent: true },
      { name: "Unassigned Record Access Protection", free: true, pro: true, ent: true },
      { name: "Enterprise SSO / SAML Authentication", free: false, pro: false, ent: true },
    ],
  },
  {
    category: "Real-Time & Intelligence",
    features: [
      { name: "Socket.IO Multi-Tenant Live Updates", free: true, pro: true, ent: true },
      { name: "Live Dashboard Card Synchronization", free: true, pro: true, ent: true },
      { name: "Automated Email Cadences & Sequences", free: false, pro: true, ent: true },
      { name: "Custom Webhook Integrations", free: false, pro: true, ent: true },
      { name: "Dedicated PostgreSQL Instance", free: false, pro: false, ent: true },
    ],
  },
];

const faqs = [
  {
    question: "Is the Community tier really free forever?",
    answer:
      "Yes. Every feature currently built into the platform—including unlimited leads, deals, customers, dynamic RBAC, real-time WebSockets, and universal search—is 100% free with no credit card required.",
  },
  {
    question: "How does multi-tenant data isolation work?",
    answer:
      "Every query in the database is automatically parameterized and constrained by organization_id. Furthermore, Socket.IO channels are segregated by org:${organization_id} and user:${user_id}, guaranteeing that your workspace data is never accessible by other tenants.",
  },
  {
    question: "Can I create custom roles without writing code?",
    answer:
      "Absolutely. Through the Users & Permissions module, authorized administrators can create new roles (such as Junior Sales Rep or Regional Manager) and assign exact granular permissions for creating, reading, updating, or deleting specific modules.",
  },
  {
    question: "Where is the data stored and hosted?",
    answer:
      "The CRM runs on a high-performance PostgreSQL relational database with transactional integrity and ACID guarantees. Data is backed by strict foreign key relationships rather than fragile document collections.",
  },
];

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);
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
            <span>100% Free Forever • No Credit Card Required</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Enterprise Sales Infrastructure.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 bg-clip-text text-transparent">
              Zero Upfront Cost.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Gain full access to all 7 CRM engines. Run your sales pipeline with real-time
            synchronization, dynamic permissions, and relational data models.
          </p>

          {/* Billing Switcher */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !annualBilling ? "text-foreground font-semibold" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out",
                  annualBilling ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium flex items-center gap-1.5", annualBilling ? "text-foreground font-semibold" : "text-muted-foreground")}>
              <span>Annual</span>
              <Badge variant="secondary" className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border-emerald-500/30">
                SAVE 20%
              </Badge>
            </span>
          </div>
        </div>
      </section>

      {/* 3 Tier Cards Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {/* Tier 1: Community (Active Tier) */}
            <Card className="relative flex flex-col justify-between overflow-hidden border-2 border-primary shadow-2xl bg-card/90 rounded-3xl p-8 sm:p-10">
              {/* Highlight ribbon */}
              <div className="absolute -right-12 top-7 rotate-45 bg-primary px-12 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                Active Tier
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs font-semibold">
                    Community Edition
                  </Badge>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" /> Live
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-foreground">
                  Free Forever
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Full access to all CRM capabilities for high-velocity teams and growing businesses.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight text-foreground">₹0</span>
                  <span className="text-sm font-medium text-muted-foreground">/ workspace</span>
                </div>

                <div className="mt-8 border-t border-border/70 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    What's Included:
                  </p>
                  <div className="space-y-3">
                    {freePlanFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/70">
                <PublicCtaButton
                  size="lg"
                  guestText="Get Started in Seconds"
                  authText="Go to Dashboard"
                  className="w-full text-base py-6 rounded-xl font-bold shadow-md"
                />
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Zero setup fees • Instant account creation
                </p>
              </div>
            </Card>

            {/* Tier 2: Pro / Growth (Roadmap) */}
            <Card className="flex flex-col justify-between overflow-hidden border border-border/70 bg-card/50 rounded-3xl p-8 sm:p-10 opacity-90 transition-all hover:opacity-100 hover:border-purple-500/40">
              <div>
                <Badge variant="outline" className="text-xs font-semibold border-purple-500/30 text-purple-600 dark:text-purple-400">
                  Roadmap Ahead
                </Badge>

                <h3 className="mt-4 text-2xl font-extrabold text-foreground">
                  Growth Pro
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Automated sales cadences, custom webhooks, and advanced deal probability modeling.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight text-foreground">
                    {annualBilling ? "₹1,199" : "₹1,499"}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">/ user / mo</span>
                </div>

                <div className="mt-8 border-t border-border/70 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    Everything in Free, plus:
                  </p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-purple-500 mt-0.5" />
                      <span>Automated Multi-Stage Email Cadences</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-purple-500 mt-0.5" />
                      <span>Custom Inbound & Outbound Webhooks</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-purple-500 mt-0.5" />
                      <span>Advanced Win/Loss AI Opportunity Scoring</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-purple-500 mt-0.5" />
                      <span>Priority Support & SLA Escalations</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/70">
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full py-6 rounded-xl font-semibold">
                    Join Pro Waitlist
                  </Button>
                </Link>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Planned for upcoming release cycle
                </p>
              </div>
            </Card>

            {/* Tier 3: Enterprise */}
            <Card className="flex flex-col justify-between overflow-hidden border border-border/70 bg-card/50 rounded-3xl p-8 sm:p-10 opacity-90 transition-all hover:opacity-100 hover:border-primary/40">
              <div>
                <Badge variant="outline" className="text-xs font-semibold">
                  Dedicated Scale
                </Badge>

                <h3 className="mt-4 text-2xl font-extrabold text-foreground">
                  Enterprise
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dedicated PostgreSQL clusters, custom SSO/SAML, and compliance audit log archives.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">Custom</span>
                  <span className="text-sm font-medium text-muted-foreground">/ annual agreement</span>
                </div>

                <div className="mt-8 border-t border-border/70 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    Enterprise Guarantees:
                  </p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>Dedicated PostgreSQL Cloud Instance</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>Enterprise SSO / SAML & Okta Integration</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>Compliance Data Retention & Archival</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>Dedicated Solutions Architect & 24/7 SLA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/70">
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full py-6 rounded-xl font-semibold">
                    Contact Enterprise Sales
                  </Button>
                </Link>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Custom deployment and migration options
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="border-t border-border/60 bg-muted/10 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Feature Matrix
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Compare Platform Tiers
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              See how our free community tier stacks up against future enterprise capabilities.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40">
                  <th className="p-4 sm:p-5 font-semibold text-foreground">Features</th>
                  <th className="p-4 sm:p-5 font-bold text-primary w-1/4">Community (Active)</th>
                  <th className="p-4 sm:p-5 font-semibold text-muted-foreground w-1/5">Growth Pro</th>
                  <th className="p-4 sm:p-5 font-semibold text-muted-foreground w-1/5">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="contents">
                    <tr className="bg-muted/20">
                      <td colSpan={4} className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 sm:px-5 font-medium text-foreground">{item.name}</td>
                        <td className="p-4 sm:px-5">
                          {item.free ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                              <Check className="h-4 w-4 stroke-[2.5]" /> Included
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40 text-xs">—</span>
                          )}
                        </td>
                        <td className="p-4 sm:px-5">
                          {item.pro ? (
                            <span className="inline-flex items-center gap-1 text-foreground/80 text-xs">
                              <Check className="h-4 w-4" /> Included
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40 text-xs">—</span>
                          )}
                        </td>
                        <td className="p-4 sm:px-5">
                          {item.ent ? (
                            <span className="inline-flex items-center gap-1 text-foreground/80 text-xs">
                              <Check className="h-4 w-4" /> Included
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-20 sm:py-28">
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

      {/* Bottom Conversion Finale */}
      <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-background to-primary/10 p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Start Managing Your Sales Today
            </h2>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Experience the full power of our free Community CRM tier with zero restrictions, real-time WebSockets, and custom dynamic RBAC.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PublicCtaButton
                size="lg"
                guestText="Launch Your Workspace"
                authText="Go to Dashboard"
              />
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}