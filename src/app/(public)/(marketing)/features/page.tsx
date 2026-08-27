// import type { Metadata } from "next";
// import {
//   Bell,
//   CheckCircle2,
//   ClipboardCheck,
//   ContactRound,
//   Database,
//   KanbanSquare,
//   LockKeyhole,
//   Radio,
//   ShieldCheck,
//   Users,
//   Workflow,
//   Zap,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const features = [
//   {
//     icon: Users,
//     title: "Lead Management",
//     description:
//       "Manage leads throughout the sales process, from creation and assignment to qualification, conversion, or loss.",
//     items: [
//       "Create and manage leads",
//       "Assign leads to team members",
//       "Track lead status",
//       "Search and filtering",
//       "Lead conversion",
//     ],
//   },
//   {
//     icon: ContactRound,
//     title: "Customer Management",
//     description:
//       "Keep customer information centralized and accessible while maintaining a clear view of customer relationships.",
//     items: [
//       "Customer records",
//       "Customer assignment",
//       "Search and filtering",
//       "Customer activity",
//       "Organized customer data",
//     ],
//   },
//   {
//     icon: KanbanSquare,
//     title: "Deal & Pipeline Management",
//     description:
//       "Track opportunities through your sales workflow and keep your team aligned on active deals.",
//     items: [
//       "Create and manage deals",
//       "Assign deals",
//       "Track pipeline stages",
//       "Monitor deal progress",
//       "Sales workflow management",
//     ],
//   },
//   {
//     icon: ClipboardCheck,
//     title: "Task Management",
//     description:
//       "Create, assign, and track work so every team member knows what needs to be done.",
//     items: [
//       "Create tasks",
//       "Assign tasks",
//       "Track task status",
//       "Complete tasks",
//       "Manage due dates",
//     ],
//   },
//   {
//     icon: ShieldCheck,
//     title: "Dynamic Users, Roles & Permissions",
//     description:
//       "The authorization system is dynamic rather than being limited to a fixed set of roles. Authorized users can create users, create roles, assign roles, and configure permissions.",
//     items: [
//       "Create users dynamically",
//       "Create custom roles",
//       "Assign users to roles",
//       "Manage role permissions",
//       "Module and action-level access",
//     ],
//   },
//   {
//     icon: LockKeyhole,
//     title: "Granular Access Control",
//     description:
//       "Control what users can do inside each CRM module using permission-based authorization enforced by the backend.",
//     items: [
//       "Module-level permissions",
//       "Action-level permissions",
//       "Create / read / update / delete controls",
//       "Organization-aware access",
//       "Backend authorization",
//     ],
//   },
//   {
//     icon: Bell,
//     title: "Real-time Notifications",
//     description:
//       "Important CRM activity can be delivered instantly so users don't have to refresh the application to see updates.",
//     items: [
//       "Real-time notification delivery",
//       "Unread notification count",
//       "Notification history",
//       "Mark as read",
//       "Mark all as read",
//     ],
//   },
//   {
//     icon: Radio,
//     title: "Real-time Communication",
//     description:
//       "Socket.IO provides authenticated real-time communication between the CRM backend and connected users.",
//     items: [
//       "Authenticated sockets",
//       "User-specific rooms",
//       "Real-time events",
//       "Multiple connections per user",
//       "Automatic client updates",
//     ],
//   },
//   {
//     icon: Database,
//     title: "Structured Data & API Architecture",
//     description:
//       "The application uses a dedicated backend and relational database to keep business logic and data access organized.",
//     items: [
//       "PostgreSQL",
//       "TypeScript backend",
//       "REST APIs",
//       "Pagination",
//       "Organization-aware queries",
//     ],
//   },
// ];

// export const metadata: Metadata = {
//   title: "CRM Features",
//   description:
//     "Explore CRM features for lead management, customers, deals, tasks, dynamic users and roles, permissions, and real-time notifications.",
//   alternates: {
//     canonical: "/features",
//   },
// };

// export default function FeaturesPage() {
//   return (
//     <div>
//       {/* Hero */}

//       <section className="border-b bg-muted/20">
//         <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:py-24">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
//             <Zap className="h-6 w-6" />
//           </div>

//           <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//             Features
//           </p>

//           <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
//             A CRM built around real workflows
//           </h1>

//           <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
//             Manage leads, customers, deals, tasks, users, roles, permissions,
//             and team activity in one connected workspace.
//           </p>
//         </div>
//       </section>

//       {/* Core features */}

//       <section className="py-24">
//         <div className="mx-auto w-full max-w-7xl px-6">
//           <div className="mx-auto max-w-3xl text-center">
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//               CRM capabilities
//             </p>

//             <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//               Everything your team needs to manage the workflow
//             </h2>

//             <p className="mt-4 text-muted-foreground">
//               The CRM combines business modules with authorization, real-time
//               communication, and a structured backend architecture.
//             </p>
//           </div>

//           <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {features.map((feature) => {
//               const Icon = feature.icon;

//               return (
//                 <Card
//                   key={feature.title}
//                   className="h-full transition-shadow hover:shadow-md"
//                 >
//                   <CardContent className="p-7">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                       <Icon className="h-5 w-5" />
//                     </div>

//                     <h2 className="mt-5 text-xl font-semibold">
//                       {feature.title}
//                     </h2>

//                     <p className="mt-3 text-sm leading-6 text-muted-foreground">
//                       {feature.description}
//                     </p>

//                     <div className="mt-6 space-y-3">
//                       {feature.items.map((item) => (
//                         <div key={item} className="flex items-start gap-2.5">
//                           <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

//                           <span className="text-sm">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Dynamic authorization */}

//       <section className="border-y bg-muted/20 py-24">
//         <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//               Authorization system
//             </p>

//             <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//               Flexible roles instead of hard-coded access
//             </h2>

//             <p className="mt-5 text-sm leading-7 text-muted-foreground">
//               Users and roles are not restricted to a fixed set of predefined
//               combinations. Authorized users can create users, create roles,
//               assign users to roles, and configure which actions each role can
//               perform.
//             </p>

//             <p className="mt-4 text-sm leading-7 text-muted-foreground">
//               This allows organizations to shape the CRM around their own team
//               structure and responsibilities.
//             </p>
//           </div>

//           <Card>
//             <CardContent className="p-7">
//               <div className="space-y-3">
//                 <ArchitectureStep label="Organization" value="Users" />

//                 <ArchitectureStep label="Users" value="Roles" />

//                 <ArchitectureStep label="Roles" value="Permissions" />

//                 <ArchitectureStep label="Permissions" value="Module + Action" />
//               </div>

//               <div className="mt-6 rounded-xl border bg-muted/30 p-4">
//                 <p className="text-xs font-medium text-muted-foreground">
//                   Example permissions
//                 </p>

//                 <div className="mt-3 space-y-2 font-mono text-xs">
//                   <p>leads:create</p>
//                   <p>leads:read</p>
//                   <p>leads:update</p>
//                   <p>leads:assign</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Connected workflow */}

//       <section className="py-24">
//         <div className="mx-auto w-full max-w-7xl px-6">
//           <div className="mx-auto max-w-3xl text-center">
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//               Connected workflow
//             </p>

//             <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//               Your CRM modules work together
//             </h2>

//             <p className="mt-4 text-muted-foreground">
//               Business activity can move through the system while the team stays
//               informed about important changes.
//             </p>
//           </div>

//           <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             <WorkflowCard
//               title="Lead"
//               description="Capture and qualify opportunities"
//             />

//             <WorkflowCard
//               title="Customer"
//               description="Maintain customer relationships"
//             />

//             <WorkflowCard
//               title="Deal"
//               description="Track sales opportunities"
//             />

//             <WorkflowCard
//               title="Task"
//               description="Manage work and follow-ups"
//             />
//           </div>

//           <div className="mx-auto mt-6 max-w-3xl rounded-xl border bg-muted/20 p-6 text-center">
//             <p className="text-sm font-medium">
//               Activity across the CRM can trigger real-time notifications to the
//               relevant users.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Technology */}

//       <section className="border-y bg-muted/20 py-20">
//         <div className="mx-auto w-full max-w-7xl px-6 text-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//             Under the hood
//           </p>

//           <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//             Built as a full-stack application
//           </h2>

//           <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
//             {[
//               "Next.js",
//               "React",
//               "TypeScript",
//               "Tailwind CSS",
//               "Redux Toolkit",
//               "Node.js",
//               "Express.js",
//               "PostgreSQL",
//               "Socket.IO",
//               "REST APIs",
//             ].map((technology) => (
//               <div
//                 key={technology}
//                 className="rounded-lg border bg-background px-4 py-2.5 text-sm font-medium"
//               >
//                 {technology}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}

//       <section className="py-24">
//         <div className="mx-auto w-full max-w-4xl px-6 text-center">
//           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//             See the CRM in action
//           </h2>

//           <p className="mt-4 text-muted-foreground">
//             Explore the workspace or learn more about the architecture behind
//             the project.
//           </p>

//           <div className="mt-8 flex justify-center">
//             <Button asChild size="lg">
//               <a href="/register">
//                 Get started
//                 <Zap className="ml-2 h-4 w-4" />
//               </a>
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function ArchitectureStep({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border px-4 py-3">
//       <span className="text-sm font-medium">{label}</span>

//       <span className="text-sm text-muted-foreground">{value}</span>
//     </div>
//   );
// }

// function WorkflowCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <Card>
//       <CardContent className="p-6 text-center">
//         <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
//           <Workflow className="h-5 w-5" />
//         </div>

//         <h3 className="mt-4 font-semibold">{title}</h3>

//         <p className="mt-2 text-xs leading-5 text-muted-foreground">
//           {description}
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

import type { Metadata } from "next";

import {
  Activity,
  Bell,
  CheckCircle2,
  ClipboardCheck,
  ContactRound,
  Database,
  FileText,
  KanbanSquare,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
  Package,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "Lead Management",
    description:
      "Manage leads throughout the sales process, from creation and assignment to qualification, conversion, or loss.",
    items: [
      "Create and manage leads",
      "Assign leads to team members",
      "Track lead lifecycle",
      "Add notes and follow-up tasks",
      "View lead activity history",
      "Search and filtering",
    ],
  },
  {
    icon: ContactRound,
    title: "Customer Management",
    description:
      "Keep customer information centralized while maintaining the full context of customer relationships and activity.",
    items: [
      "Customer records",
      "Customer assignment",
      "Customer activity history",
      "Add customer notes",
      "Create customer tasks",
      "Search and filtering",
    ],
  },
  {
    icon: KanbanSquare,
    title: "Deal & Pipeline Management",
    description:
      "Track opportunities through your sales workflow while keeping deal activity, notes, and follow-up work connected.",
    items: [
      "Create and manage deals",
      "Assign deals",
      "Track pipeline stages",
      "Add deal notes",
      "Create deal tasks",
      "Monitor deal activity",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Task Management",
    description:
      "Manage follow-up work across your CRM while also providing a dedicated workspace for all tasks.",
    items: [
      "Tasks linked to leads",
      "Tasks linked to customers",
      "Tasks linked to deals",
      "Standalone general tasks",
      "Task assignment and status",
      "Due-date management",
    ],
  },
  {
    icon: FileText,
    title: "Notes",
    description:
      "Keep important context attached to the CRM records where your team needs it.",
    items: [
      "Lead notes",
      "Customer notes",
      "Deal notes",
      "Contextual record information",
      "Centralized customer context",
    ],
  },
  {
    icon: Activity,
    title: "Activity History",
    description:
      "Keep a timeline of important CRM events so your team can understand what happened and when.",
    items: [
      "Record activity history",
      "Track important changes",
      "Assignment activity",
      "Status and stage changes",
      "Connected CRM timeline",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Dynamic Users, Roles & Permissions",
    description:
      "The authorization system is dynamic rather than being limited to a fixed set of roles. Authorized users can create users, create roles, assign roles, and configure permissions.",
    items: [
      "Create users dynamically",
      "Create custom roles",
      "Assign users to roles",
      "Manage role permissions",
      "Module and action-level access",
    ],
  },
  {
    icon: LockKeyhole,
    title: "Granular Access Control",
    description:
      "Control what users can do inside each CRM module using permission-based authorization enforced by the backend.",
    items: [
      "Module-level permissions",
      "Action-level permissions",
      "Create / read / update / delete controls",
      "Organization-aware access",
      "Backend authorization",
    ],
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Important CRM activity can be delivered instantly so users do not have to refresh the application to see updates.",
    items: [
      "Real-time notification delivery",
      "Unread notification count",
      "Notification history",
      "Mark as read",
      "Mark all as read",
    ],
  },
  {
    icon: Radio,
    title: "Real-time Communication",
    description:
      "Socket.IO provides authenticated real-time communication between the CRM backend and connected users.",
    items: [
      "Authenticated sockets",
      "User-specific rooms",
      "Real-time events",
      "Multiple connections per user",
      "Automatic client updates",
    ],
  },
  {
    icon: Database,
    title: "Structured Data & API Architecture",
    description:
      "The application uses a dedicated backend and relational database to keep business logic and data access organized.",
    items: [
      "PostgreSQL",
      "TypeScript backend",
      "REST APIs",
      "Pagination",
      "Organization-aware queries",
    ],
  },
  {
    icon: Package,
    title: "Dynamic Service Management",
    description:
      "Manage the services your organization offers without hard-coding the service catalog into the application.",
    items: [
      "Create and manage services",
      "Update service details",
      "Control service availability",
      "Use services across CRM workflows",
      "Dynamic service catalog",
    ],
  },
];

export const metadata: Metadata = {
  title: "CRM Features",
  description:
    "Explore CRM features for leads, customers, deals, contextual notes, activities, tasks, dynamic users and roles, permissions, and real-time notifications.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}

      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-6 w-6" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Features
          </p>

          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            A CRM built around connected workflows
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Manage leads, customers, deals, tasks, notes, activities, users,
            roles, permissions, and team communication in one connected
            workspace.
          </p>
        </div>
      </section>

      {/* Core features */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              CRM capabilities
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your team needs to manage the workflow
            </h2>

            <p className="mt-4 text-muted-foreground">
              Business modules are connected with notes, activities, tasks,
              permissions, and real-time updates rather than operating as
              isolated pages.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="h-full transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold">
                      {feature.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {feature.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contextual CRM workspace */}

      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Contextual workspace
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Keep every interaction connected to the record
            </h2>

            <p className="mt-4 text-muted-foreground">
              Leads, customers, and deals each keep their own notes, activity
              history, and related tasks, giving your team the complete context
              of the relationship.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            <ContextCard
              title="Lead"
              items={["Notes", "Activities", "Follow-up tasks"]}
            />

            <ContextCard
              title="Customer"
              items={["Notes", "Activities", "Customer tasks"]}
            />

            <ContextCard
              title="Deal"
              items={["Notes", "Activities", "Deal tasks"]}
            />
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <Card>
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ClipboardCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Dedicated task workspace</h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Related tasks remain connected to their records, while the
                    dedicated Tasks page gives the team one place to manage all
                    assigned and general work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dynamic authorization */}

      <section className="py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Authorization system
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Flexible roles instead of hard-coded access
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Users and roles are not restricted to a fixed set of predefined
              combinations. Authorized users can create users, create roles,
              assign users to roles, and configure which actions each role can
              perform.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This allows organizations to shape the CRM around their own team
              structure and responsibilities.
            </p>
          </div>

          <Card>
            <CardContent className="p-7">
              <div className="space-y-3">
                <ArchitectureStep label="Organization" value="Users" />

                <ArchitectureStep label="Users" value="Roles" />

                <ArchitectureStep label="Roles" value="Permissions" />

                <ArchitectureStep label="Permissions" value="Module + Action" />
              </div>

              <div className="mt-6 rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Example permissions
                </p>

                <div className="mt-3 space-y-2 font-mono text-xs">
                  <p>leads:create</p>
                  <p>leads:read</p>
                  <p>leads:update</p>
                  <p>leads:assign</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connected workflow */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Connected workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From lead to customer to deal
            </h2>

            <p className="mt-4 text-muted-foreground">
              Core CRM entities connect with tasks, notes, activities,
              permissions, and notifications so the team can work from a shared
              context.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <WorkflowCard
              title="Lead"
              description="Capture, qualify, assign, and track"
            />

            <WorkflowCard
              title="Customer"
              description="Maintain relationship context"
            />

            <WorkflowCard
              title="Deal"
              description="Track opportunities and stages"
            />

            <WorkflowCard
              title="Service"
              description="Manage services dynamically"
            />
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-4 rounded-xl border bg-muted/20 p-6 text-center">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              <FileText className="h-5 w-5 text-primary" />
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <Bell className="h-5 w-5 text-primary" />
            </div>

            <p className="text-sm font-medium">
              Activities, notes, tasks, and notifications keep the workflow
              connected.
            </p>
          </div>
        </div>
      </section>

      {/* Technology */}

      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Under the hood
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built as a full-stack application
          </h2>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
            {[
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
            ].map((technology) => (
              <div
                key={technology}
                className="rounded-lg border bg-background px-4 py-2.5 text-sm font-medium"
              >
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See the CRM in action
          </h2>

          <p className="mt-4 text-muted-foreground">
            Explore the workspace and see how the connected CRM workflow works
            in practice.
          </p>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <a href="/register">
                Get started
                <Zap className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContextCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardContent className="p-7">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />

              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ArchitectureStep({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="text-sm font-medium">{label}</span>

      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  );
}

function WorkflowCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Workflow className="h-5 w-5" />
        </div>

        <h3 className="mt-4 font-semibold">{title}</h3>

        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
