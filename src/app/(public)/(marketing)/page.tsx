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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Lead Management",
    description:
      "Capture, organize, assign, and track leads throughout your sales pipeline.",
  },
  {
    icon: ContactRound,
    title: "Customer Management",
    description:
      "Keep customer information organized and accessible to your team.",
  },
  {
    icon: KanbanSquare,
    title: "Deals & Pipeline",
    description:
      "Track opportunities through your sales workflow from initial opportunity to conversion.",
  },
  {
    icon: ClipboardCheck,
    title: "Task Management",
    description:
      "Create, assign, and manage tasks so everyone knows what needs to happen next.",
  },
  {
    icon: ShieldCheck,
    title: "Dynamic Users & Permissions",
    description:
      "Create users and custom roles dynamically, assign roles, and control access with module and action-level permissions.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Stay informed instantly when important CRM activity happens across your team.",
  },
];

const benefits = [
  "Centralize leads, customers, deals, and tasks",
  "Create users and custom roles dynamically",
  "Control access with granular permissions",
  "Get real-time updates through Socket.IO",
  "Keep your team's workflow connected",
];

export const metadata: Metadata = {
  title: "CRM Software for Leads, Customers, Deals & Teams",
  description:
    "Manage leads, customers, deals, tasks, users, roles, permissions, and real-time notifications with a modern CRM platform.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Built as a full-stack CRM project
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Manage your customer relationships
              <span className="text-primary"> without the chaos.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Bring leads, customers, deals, tasks, users, permissions, and
              real-time activity into one organized workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="h-12 px-6">
                  Explore the CRM
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/features">
                <Button size="lg" variant="outline" className="h-12 px-6">
                  View features
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Lead management
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Dynamic permissions
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Real-time updates
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />

            <Card className="overflow-hidden rounded-2xl border shadow-2xl">
              <div className="flex h-12 items-center justify-between border-b bg-muted/30 px-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <div className="h-2 w-24 rounded-full bg-muted" />
              </div>

              <CardContent className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <PreviewCard
                    title="Total Leads"
                    value="1,248"
                    change="+12.4%"
                  />

                  <PreviewCard title="Active Deals" value="84" change="+8.2%" />

                  <PreviewCard title="Customers" value="624" change="+5.7%" />

                  <PreviewCard title="Open Tasks" value="37" change="-3.1%" />
                </div>

                <div className="mt-4 rounded-xl border bg-muted/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Sales Pipeline</p>

                      <p className="text-xs text-muted-foreground">
                        Current opportunities
                      </p>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      This month
                    </span>
                  </div>

                  <div className="space-y-3">
                    <PipelineRow
                      label="Open"
                      value="32"
                      width="88%"
                      color="bg-slate-500"
                    />

                    <PipelineRow
                      label="Quotation"
                      value="21"
                      width="68%"
                      color="bg-violet-500"
                    />

                    <PipelineRow
                      label="Negotiation"
                      value="14"
                      width="46%"
                      color="bg-amber-500"
                    />

                    <PipelineRow
                      label="Won"
                      value="9"
                      width="32%"
                      color="bg-emerald-500"
                    />

                    <PipelineRow
                      label="Lost"
                      value="3"
                      width="18%"
                      color="bg-red-500"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Real-time activity</p>

                      <p className="text-xs text-muted-foreground">
                        New lead assigned to your team
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Just now
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}

      <section id="features" className="border-t py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              More than a collection of CRUD screens
            </h2>

            <p className="mt-4 text-muted-foreground">
              The CRM combines business workflows with access control, real-time
              communication, and a structured backend.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>

                    <Link
                      href="/features"
                      className="mt-5 inline-flex items-center text-sm font-medium text-primary"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}

      <section id="workflow" className="bg-muted/30 py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              One connected workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From first lead to completed task
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              The CRM keeps business records, team responsibilities, access
              control, and activity connected instead of treating each feature
              as a separate system.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <Link href="/features" className="mt-8 inline-flex">
              <Button variant="outline">
                Explore the architecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Activity</p>

                    <p className="text-xs text-muted-foreground">
                      Recent team updates
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    Live
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <ActivityItem
                    title="Lead assigned"
                    description="A new lead was assigned to your team."
                    time="Just now"
                  />

                  <ActivityItem
                    title="Task completed"
                    description="Follow-up task was marked completed."
                    time="12 min ago"
                  />

                  <ActivityItem
                    title="Deal updated"
                    description="Deal moved to negotiation."
                    time="28 min ago"
                  />

                  <ActivityItem
                    title="Customer added"
                    description="A new customer record was created."
                    time="1 hr ago"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic access control */}

      <section id="security" className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LockKeyhole className="h-5 w-5" />
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary">
                  Dynamic access control
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Create the team structure you actually need
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                  Users and roles are created dynamically. Authorized users can
                  create custom roles, assign users to those roles, and control
                  module and action-level permissions.
                </p>

                <Link href="/features" className="mt-6 inline-flex">
                  <Button variant="outline">
                    See how permissions work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <SecurityCard text="Dynamic users" />
                <SecurityCard text="Custom roles" />
                <SecurityCard text="Granular permissions" />
                <SecurityCard text="Backend authorization" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer / Project */}

      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Built by Akash Kumar
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A full-stack project built from the ground up
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              This CRM was built as a hands-on project to explore real-world
              application architecture: authentication, dynamic RBAC,
              PostgreSQL, REST APIs, Redux Toolkit, and Socket.IO.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a
                  href="https://akashkumar04.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit my portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a href="/about">About the project</a>
              </Button>
            </div>
          </div>

          <Card className="md:w-[300px]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code2Icon />
                </div>

                <div>
                  <p className="font-semibold">Full-stack</p>

                  <p className="text-xs text-muted-foreground">
                    Frontend + Backend + Database
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "Express",
                  "PostgreSQL",
                  "Socket.IO",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border bg-background px-2.5 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}

      <section className="border-t py-24">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore the CRM
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Create an account and explore the application yourself, or learn
            more about the architecture behind the project.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-12 px-7">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/about">
              <Button size="lg" variant="outline" className="h-12 px-7">
                About the project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-xs text-muted-foreground">{title}</p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-2xl font-bold tracking-tight">{value}</p>

        <span className="text-xs font-medium text-emerald-600">{change}</span>
      </div>
    </div>
  );
}

function PipelineRow({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: string;
  width: string;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[90px_1fr_28px] items-center gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>

      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border p-4">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />

      <div className="min-w-0">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm font-medium">{title}</p>

          <span className="text-xs text-muted-foreground">{time}</span>
        </div>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function SecurityCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3 text-sm font-medium">
      {text}
    </div>
  );
}

function Code2Icon() {
  return <Code2 className="h-5 w-5" />;
}
