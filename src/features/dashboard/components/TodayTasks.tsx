"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Clock, Check, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateTaskStatus } from "@/features/tasks/tasks.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DashboardTask {
  id: number;
  title: string;
  description: string;
  entity_type: "LEAD" | "CUSTOMER" | "DEAL";
  entity_id: number;
  due_date: string;
  status: string;
  assigned_to_name: string;
}

interface TodayTasksProps {
  tasks: DashboardTask[];
}

type TaskFilter = "ALL" | "DUE_TODAY" | "HIGH_PRIORITY";

export default function TodayTasks({ tasks: initialTasks }: TodayTasksProps) {
  const [filter, setFilter] = useState<TaskFilter>("ALL");
  const [tasks, setTasks] = useState<DashboardTask[]>(initialTasks);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Sync state if initialTasks changes
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const isToday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "DUE_TODAY") {
      return isToday(task.due_date);
    }
    if (filter === "HIGH_PRIORITY") {
      // In case description or status mentions urgent/high
      return (
        task.title.toLowerCase().includes("urgent") ||
        task.title.toLowerCase().includes("high") ||
        task.description?.toLowerCase().includes("urgent")
      );
    }
    return true;
  });

  const handleToggleStatus = async (task: DashboardTask) => {
    const isCompleted = task.status === "COMPLETED";
    const nextStatus = isCompleted ? "PENDING" : "COMPLETED";
    const prevStatus = task.status;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
    setUpdatingId(task.id);

    try {
      await updateTaskStatus(
        task.entity_type.toLowerCase(),
        task.entity_id,
        task.id,
        nextStatus as "PENDING" | "COMPLETED"
      );
      toast.success(
        nextStatus === "COMPLETED" ? "Task completed! 🎉" : "Task marked as pending"
      );
    } catch {
      // Rollback
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: prevStatus } : t))
      );
      toast.error("Failed to update task status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Card className="h-full border border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base sm:text-lg font-semibold">Today's Tasks</CardTitle>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {tasks.filter((t) => t.status !== "COMPLETED").length} pending
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Filter chips */}
          <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`rounded-md px-2 py-1 transition-all ${
                filter === "ALL"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("DUE_TODAY")}
              className={`rounded-md px-2 py-1 transition-all ${
                filter === "DUE_TODAY"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Due Today
            </button>
          </div>

          <Link href="/dashboard/tasks">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            <p className="font-medium mb-1">No tasks in this view</p>
            <p className="text-xs">You're all caught up! Create a new task to stay organized.</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredTasks.map((task) => {
              const isCompleted = task.status === "COMPLETED";

              return (
                <div
                  key={task.id}
                  className={cn(
                    "group relative flex items-start gap-3 rounded-lg border border-border/60 p-3 transition-all duration-200 hover:border-primary/40 hover:bg-muted/40",
                    isCompleted && "opacity-60 bg-muted/20"
                  )}
                >
                  {/* Quick-completion checkbox toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(task)}
                    disabled={updatingId === task.id}
                    aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-muted-foreground/50 hover:border-primary hover:bg-primary/10"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 opacity-0 group-hover:opacity-40" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "font-medium text-sm text-foreground transition-all line-clamp-1",
                          isCompleted && "line-through text-muted-foreground"
                        )}
                      >
                        {task.title}
                      </p>

                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {task.entity_type}
                      </Badge>
                    </div>

                    {task.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="truncate font-medium text-foreground/80">
                        {task.assigned_to_name || "Unassigned"}
                      </span>

                      <span className="flex items-center gap-1 shrink-0">
                        <Clock className="h-3 w-3" />
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString()
                          : "No due date"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}