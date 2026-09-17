"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link2,
  AlertTriangle,
  Pencil,
  CheckCircle2,
  FileText,
  Trash2,
  ExternalLink,
  Check,
  RotateCcw,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TaskForm from "@/features/tasks/component/TaskForm";
import { getTaskById, updateTaskStatus, deleteTask } from "@/features/tasks/tasks.service";
import { FormSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";
import type { TaskDetails, TaskPriority } from "@/features/tasks/tasks.types";

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  LOW: { label: "Low Priority", className: "bg-muted text-muted-foreground border-muted-foreground/30" },
  NORMAL: { label: "Normal Priority", className: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  HIGH: { label: "High Priority", className: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  URGENT: { label: "Urgent Priority", className: "bg-destructive/10 text-destructive border-destructive/30" },
};

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = Number(params.taskId);

  const [task, setTask] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(taskId);
      setTask(data);
    } catch {
      toast.error("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!taskId || Number.isNaN(taskId)) {
      toast.error("Invalid task ID");
      router.back();
      return;
    }

    loadTask();
  }, [taskId, router]);

  const handleToggleStatus = async () => {
    if (!task || !task.entity_type || !task.entity_id || updatingStatus) return;
    const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    try {
      setUpdatingStatus(true);
      await updateTaskStatus(task.entity_type, task.entity_id, task.id, newStatus);
      setTask((prev) => (prev ? { ...prev, status: newStatus } : prev));
      toast.success(
        newStatus === "COMPLETED" ? "Task marked as completed" : "Task reopened"
      );
    } catch {
      toast.error("Failed to update task status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !task.entity_type || !task.entity_id) return;

    try {
      setDeleting(true);
      await deleteTask(task.entity_type, task.entity_id, task.id);
      toast.success("Task deleted successfully");
      router.push("/dashboard/tasks");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <FormSkeleton />;
  }

  if (!task) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Task not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/tasks")}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  const priorityMeta = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.NORMAL;

  const entityRoute =
    task.entity_type === "LEAD"
      ? `/dashboard/leads/${task.entity_id}`
      : task.entity_type === "CUSTOMER"
      ? `/dashboard/customers/${task.entity_id}`
      : task.entity_type === "DEAL"
      ? `/dashboard/deals/${task.entity_id}`
      : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/tasks"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Tasks
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
            <Badge variant="outline" className="font-mono text-xs">
              Task #{task.id}
            </Badge>
            <Badge
              variant={task.status === "COMPLETED" ? "outline" : "secondary"}
              className={
                task.status === "COMPLETED"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-muted text-muted-foreground"
              }
            >
              <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                  task.status === "COMPLETED" ? "bg-emerald-500" : "bg-muted-foreground"
                }`}
              />
              {task.status}
            </Badge>
            <Badge variant="outline" className={priorityMeta.className}>
              {priorityMeta.label}
            </Badge>
          </div>

          {/* Quick Context Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {task.due_date && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Due: {new Date(task.due_date).toLocaleString()}</span>
              </span>
            )}
            {task.assigned_to_name && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                <span>Assigned: {task.assigned_to_name}</span>
              </span>
            )}
            {task.entity_type && task.entity_id && (
              <span className="inline-flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5 text-primary" />
                <span>Linked to {task.entity_type} #{task.entity_id}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!editing && task.entity_type && task.entity_id && (
            <Button
              variant={task.status === "COMPLETED" ? "outline" : "default"}
              size="sm"
              onClick={handleToggleStatus}
              disabled={updatingStatus}
              className="gap-1.5"
            >
              {task.status === "COMPLETED" ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reopen Task
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Mark Completed
                </>
              )}
            </Button>
          )}
          {!editing && (
            <Button
              onClick={() => setEditing(true)}
              size="sm"
              variant="outline"
              className="gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Task
            </Button>
          )}
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: View Mode / Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  {editing ? "Edit Task Parameters" : "Task Information"}
                </CardTitle>
                <CardDescription className="mt-0.5">
                  {editing
                    ? "Modify assignment, deadlines, or description."
                    : "Actionable details, timeline, and deliverables."}
                </CardDescription>
              </div>

              {!editing && (
                <Button
                  onClick={() => setEditing(true)}
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Task
                </Button>
              )}
            </CardHeader>

            <CardContent className="pt-6">
              {editing ? (
                <TaskForm
                  mode="edit"
                  initialData={{
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date,
                    priority: task.priority,
                    assigned_to: task.assigned_to,
                  }}
                  onSuccess={() => {
                    setEditing(false);
                    loadTask();
                  }}
                  onCancel={() => {
                    setEditing(false);
                  }}
                />
              ) : (
                <div className="space-y-6">
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Description & Deliverables
                    </span>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed bg-muted/30 p-4 rounded-lg border border-border/40 min-h-[100px]">
                      {task.description || "No specific instructions provided for this task."}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/40">
                    <div className="rounded-lg border border-border/40 bg-card p-4 space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        Due Date & Time
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        {task.due_date
                          ? new Date(task.due_date).toLocaleString()
                          : "No due date set"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/40 bg-card p-4 space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-primary" />
                        Assigned Member
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        {task.assigned_to_name || "Unassigned"}
                      </p>
                    </div>
                  </div>

                  {/* Linked CRM Record */}
                  {task.entity_type && task.entity_id && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Link2 className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Linked CRM Record</p>
                          <p className="text-sm font-semibold text-foreground">
                            {task.entity_name || `${task.entity_type} #${task.entity_id}`}
                          </p>
                        </div>
                      </div>
                      {entityRoute && (
                        <Link href={entityRoute}>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            View {task.entity_type}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Task Overview Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Task Status & Context
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={task.status === "COMPLETED" ? "outline" : "secondary"}
                  className={
                    task.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {task.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Priority Level</span>
                <Badge variant="outline" className={priorityMeta.className}>
                  {priorityMeta.label}
                </Badge>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Assigned Member</span>
                <span className="font-medium text-foreground">
                  {task.assigned_to_name || "Unassigned"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Created By</span>
                <span className="text-foreground">{task.created_by_name || "System"}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Creation Date</span>
                <span className="text-foreground">
                  {new Date(task.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          {task.entity_type && task.entity_id && (
            <Card className="border-destructive/30 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={editing}
                      variant="destructive"
                      className="w-full text-xs"
                      size="sm"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Delete Task
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task #{task.id}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove &quot;{task.title}&quot;. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleDelete}
                      >
                        {deleting ? "Deleting..." : "Delete Permanently"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
