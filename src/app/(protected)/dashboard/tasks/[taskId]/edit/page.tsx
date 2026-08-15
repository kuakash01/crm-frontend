"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import TaskForm from "@/features/tasks/component/TaskForm";
import { getTaskById } from "@/features/tasks/tasks.service";

import type { TaskDetails } from "@/features/tasks/tasks.types";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();

  const taskId = Number(params.taskId);

  const [task, setTask] = useState<TaskDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId || Number.isNaN(taskId)) {
      toast.error("Invalid task");
      router.back();
      return;
    }

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

    loadTask();
  }, [taskId, router]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />

          <p className="text-sm text-muted-foreground">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Task not found.</p>

        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Edit Task</h1>

        <p className="text-muted-foreground">Update the task details.</p>
      </div>

      {/* Form */}

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>

        <CardContent>
          <TaskForm
            mode="edit"
            initialData={{
              id: task.id,
              title: task.title,
              description: task.description,
              due_date: task.due_date,
              priority: task.priority,
              assigned_to: task.assigned_to
            }}
            onSuccess={() => {
              router.back();
            }}
            onCancel={() => {
              router.back();
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
