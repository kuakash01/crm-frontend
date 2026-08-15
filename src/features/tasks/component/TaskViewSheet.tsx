"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CircleUserRound,
  Clock,
  Loader2,
  Pencil,
  UserRound,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";

import { getTaskById } from "@/features/tasks/tasks.service";
import { TaskDetails } from "@/features/tasks/tasks.types";

interface TaskViewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: number | null;
  onEdit?: (task: TaskDetails) => void;
}

const formatDate = (date?: string | null) => {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date?: string | null) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getInitials = (name?: string | null) => {
  if (!name) return "?";

  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const getEntityLabel = (entityType?: string | null) => {
  switch (entityType) {
    case "LEAD":
      return "Lead";

    case "CUSTOMER":
      return "Customer";

    case "DEAL":
      return "Deal";

    default:
      return null;
  }
};

export default function TaskViewSheet({
  open,
  onOpenChange,
  taskId,
  onEdit,
}: TaskViewSheetProps) {
  const [task, setTask] = useState<TaskDetails | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !taskId) {
      setTask(null);
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        setTask(null);

        const result = await getTaskById(taskId);

        setTask(result);
      } catch {
        toast.error("Failed to load task details.");

        onOpenChange(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [open, taskId, onOpenChange]);

  const isCompleted = task?.status === "COMPLETED";

 return (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="flex w-full flex-col p-0 sm:max-w-xl">
      {/* Header */}
      <SheetHeader className="border-b px-6 py-5">
        <div className="pr-8">
          <SheetTitle className="text-xl font-semibold tracking-tight">
            {task?.title ?? "Task Details"}
          </SheetTitle>

          <SheetDescription className="mt-1">
            View and manage task details
          </SheetDescription>
        </div>

        {task && !loading && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge
              variant={
                isCompleted ? "default" : "secondary"
              }
              className="rounded-full px-3"
            >
              <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                  isCompleted
                    ? "bg-background"
                    : "bg-amber-500"
                }`}
              />
              {isCompleted ? "Completed" : "Pending"}
            </Badge>

            <Badge
              variant="outline"
              className="rounded-full px-3"
            >
              {task.priority.charAt(0) +
                task.priority.slice(1).toLowerCase()}
            </Badge>

            {task.due_date && (
              <Badge
                variant="outline"
                className="rounded-full px-3"
              >
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                {formatDate(task.due_date)}
              </Badge>
            )}
          </div>
        )}
      </SheetHeader>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />

              <p className="text-sm text-muted-foreground">
                Loading task...
              </p>
            </div>
          </div>
        ) : !task ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Task not found.
            </p>
          </div>
        ) : (
          <div className="space-y-7 px-6 py-6">
            {/* Description */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Description
                </h3>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                {task.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/80">
                    {task.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No description added.
                  </p>
                )}
              </div>
            </section>

            {/* Task Information */}
            <section>
              <h3 className="mb-3 text-sm font-semibold">
                Task Information
              </h3>

              <div className="overflow-hidden rounded-xl border">
                {/* Assigned To */}
                <div className="flex items-center justify-between gap-4 border-b px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Assigned To
                      </p>

                      <p className="mt-0.5 text-sm font-medium">
                        {task.assigned_to_name ||
                          "Unassigned"}
                      </p>
                    </div>
                  </div>

                  {task.assigned_to_name && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {getInitials(
                        task.assigned_to_name
                      )}
                    </div>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Due Date
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      {formatDate(task.due_date)}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Priority
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      {task.priority.charAt(0) +
                        task.priority
                          .slice(1)
                          .toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Related To */}
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <CircleUserRound className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Related To
                    </p>

                    {task.entity_name ? (
                      <div className="mt-0.5">
                        <p className="truncate text-sm font-medium">
                          {task.entity_name}
                        </p>

                        {getEntityLabel(
                          task.entity_type
                        ) && (
                          <p className="text-xs text-muted-foreground">
                            {getEntityLabel(
                              task.entity_type
                            )}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Not linked
                      </p>
                    )}
                  </div>
                </div>

                {/* Created By */}
                <div className="flex items-center gap-3 px-4 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <CircleUserRound className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Created By
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      {task.created_by_name ||
                        "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Activity */}
            <section>
              <h3 className="mb-3 text-sm font-semibold">
                Activity
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">
                    Created
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDateTime(
                      task.created_at
                    )}
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDateTime(
                      task.updated_at
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && task && (
        <div className="border-t bg-background px-6 py-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>

            <Button onClick={() => onEdit?.(task)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Task
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  </Sheet>
);
}
