
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Heart,
  LockKeyhole,
  Radio,
  Server,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const engineeringHighlights = [
  {
    icon: ShieldCheck,
    title: "Dynamic RBAC & Permissions",
    description:
      "Users and roles are created dynamically. Permissions are managed at the module and action level rather than being hard-coded to fixed roles.",
  },
  {
    icon: Database,
    title: "PostgreSQL Data Architecture",
    description:
      "Designed relational data models for organizations, users, roles, permissions, leads, customers, deals, tasks, and notifications.",
  },
  {
    icon: Radio,
    title: "Real-time Notifications",
    description:
      "Implemented Socket.IO authentication, user-specific rooms, real-time notification delivery, and Redux state updates.",
  },
  {
    icon: Server,
    title: "REST API Architecture",
    description:
      "Built a TypeScript and Express backend with service/controller separation, pagination, authorization, and organization-aware queries.",
  },
  {
    icon: GitBranch,
    title: "Shared Application State",
    description:
      "Used Redux Toolkit for global client state where appropriate, while keeping page-specific state such as pagination local to the page.",
  },
  {
    icon: Workflow,
    title: "Connected CRM Workflows",
    description:
      "Connected leads, customers, deals, tasks, permissions, and notifications into one application workflow instead of isolated CRUD screens.",
  },
];

const modules = [
  "Leads",
  "Customers",
  "Deals",
  "Tasks",
  "Users",
  "Roles",
  "Permissions",
  "Notifications",
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Redux Toolkit",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Socket.IO",
  "REST APIs",
];

const principles = [
  {
    icon: Target,
    title: "Real-world architecture",
    description:
      "I focused on patterns that matter in production-style applications rather than stopping at basic CRUD.",
  },
  {
    icon: Users,
    title: "Multi-user design",
    description:
      "The CRM is designed around organizations, users, dynamically created roles, and permission-based access.",
  },
  {
    icon: Zap,
    title: "Connected experiences",
    description:
      "Business actions can flow through the application and surface relevant updates through real-time notifications.",
  },
];



export const metadata: Metadata = {
  title: "About the CRM Project & Developer",
  description:
    "Learn about Akash Kumar and the full-stack CRM project, including dynamic RBAC, PostgreSQL, REST APIs, Redux Toolkit, Socket.IO, and application architecture.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}

      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Developer & Project
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Built by Akash Kumar
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              A full-stack CRM project built from the ground up
              to explore authentication, authorization, database
              architecture, real-time communication, and
              production-style application design.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href="https://akashkumar04.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit my portfolio
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/kuakash01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer story */}

      <section className="py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              About me
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              I wanted to build more than a CRUD project.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                I'm Akash Kumar, a developer interested in
                building full-stack applications and learning
                how real SaaS systems are structured.
              </p>

              <p>
                I built this CRM as a hands-on project to work
                through problems that appear beyond simple forms
                and database operations: access control, role
                management, API design, state management,
                real-time events, and connected business
                workflows.
              </p>

              <p>
                The goal was to build a system where the
                architecture matters just as much as the UI.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="outline" asChild>
                <a
                  href="https://akashkumar04.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                What I built
              </h3>

              <div className="mt-7 space-y-3">
                {modules.map((module) => (
                  <div
                    key={module}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                    <span className="text-sm font-medium">
                      {module}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Engineering highlights */}

      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Engineering highlights
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              The parts that go beyond basic CRUD
            </h2>

            <p className="mt-4 text-muted-foreground">
              The project was built to demonstrate real application
              concerns across frontend, backend, data, security,
              and real-time communication.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engineeringHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="h-full transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic authorization */}

      <section className="py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Authorization architecture
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Roles are dynamic, not hard-coded.
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Authorized users can create roles, assign permissions
              to those roles, create users, and assign users to
              those roles. Permissions are managed around CRM
              modules and actions.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <ArchitectureRow
                  label="Organization"
                  value="Users"
                />

                <ArchitectureRow
                  label="Users"
                  value="Roles"
                />

                <ArchitectureRow
                  label="Roles"
                  value="Permissions"
                />

                <ArchitectureRow
                  label="Permissions"
                  value="Module + Action"
                />
              </div>

              <div className="mt-7 rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Example
                </p>

                <p className="mt-2 font-mono text-sm">
                  leads:read
                </p>

                <p className="mt-1 font-mono text-sm">
                  leads:update
                </p>

                <p className="mt-1 font-mono text-sm">
                  leads:assign
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology */}

      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Technology
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Full-stack technologies used in the project
            </h2>
          </div>

          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
            {technologies.map((technology) => (
              <div
                key={technology}
                className="rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-sm"
              >
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What this project demonstrates
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              More than a collection of screens
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <Card key={principle.title}>
                  <CardContent className="p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      {principle.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="border-t py-24">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </div>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Want to see more of my work?
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Explore my portfolio or dive into the CRM project.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <a
                href="https://akashkumar04.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit portfolio
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://github.com/kuakash01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArchitectureRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="text-sm font-medium">
        {label}
      </span>

      <span className="text-sm text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

function GithubIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.11.78-.25.78-.55 0-.27-.01-1-.01-1.95-3.19.69-3.86-1.54-3.86-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}