"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckSquare,
  Clock,
  AlertTriangle,
  Link2,
  Sparkles,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskForm from "@/features/tasks/component/TaskForm";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Tasks
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Task</h1>
        <p className="text-muted-foreground mt-1">
          Create an actionable task and optionally link it to a pipeline record.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Task Details</CardTitle>
                  <CardDescription className="mt-1">
                    Set task objectives, timeline, priority, and assignees.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                  Status: PENDING
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <TaskForm
                mode="create"
                onSuccess={() => router.push("/dashboard/tasks")}
                onCancel={() => router.push("/dashboard/tasks")}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Guidance Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* Priority Levels Card */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Priority Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Badge variant="destructive" className="text-[10px] uppercase font-bold shrink-0">
                  Urgent
                </Badge>
                <p className="text-muted-foreground">Deal blockers, critical customer SLA escalation, or closing deadlines.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-amber-500 border-amber-500/30 bg-amber-500/10 shrink-0">
                  High
                </Badge>
                <p className="text-muted-foreground">Scheduled discovery calls, proposal deliveries, or key milestones.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Badge variant="secondary" className="text-[10px] uppercase font-bold shrink-0">
                  Normal
                </Badge>
                <p className="text-muted-foreground">Routine follow-ups, general updates, and standard outreach tasks.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground shrink-0">
                  Low
                </Badge>
                <p className="text-muted-foreground">Backlog ideas, optional review items, or internal notes.</p>
              </div>
            </CardContent>
          </Card>

          {/* CRM Linking Card */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Contextual CRM Linking
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                Linking a task to a <strong>Lead</strong>, <strong>Customer</strong>, or <strong>Deal</strong> displays the task directly in that record's activity timeline.
              </p>
              <p>
                Team members assigned to this task will automatically receive notification alerts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}