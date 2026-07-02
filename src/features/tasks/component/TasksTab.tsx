"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAppSelector } from "@/store/hooks";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../tasks.service";

import { Task } from "../tasks.types";

interface TasksTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
}

export default function TasksTab({
  entityType,
  entityId,
}: TasksTabProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [creatingTask, setCreatingTask] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const userId = useAppSelector(
    (state) => state.auth.user?.id
  );

  useEffect(() => {
    fetchTasks();
  }, [entityId, entityType]);

  const fetchTasks = async () => {

    try {

      const data =
        await getTasks(
          entityType,
          entityId
        );

      setTasks(data);

    } catch {

      toast.error(
        "Failed to load tasks"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCreateTask =
    async () => {

      if (!title.trim() || !userId) {

        toast.error(
          "Task title is required"
        );

        return;

      }

      try {

        setCreatingTask(true);

        const task =
          await createTask(
            entityType,
            entityId,
            {
              title,
              description,
              due_date:
                dueDate || undefined,
              assigned_to:
                userId,
            }
          );

        setTasks(prev => [
          task,
          ...prev,
        ]);

        setTitle("");
        setDescription("");
        setDueDate("");

        toast.success(
          "Task created"
        );

      } catch {

        toast.error(
          "Failed to create task"
        );

      } finally {

        setCreatingTask(false);

      }

    };

  const handleCompleteTask =
    async (
      taskId: number
    ) => {

      try {

        await updateTaskStatus(
          entityType,
          entityId,
          taskId,
          "COMPLETED"
        );

        setTasks(prev =>
          prev.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  status:
                    "COMPLETED",
                }
              : task
          )
        );

        toast.success(
          "Task completed"
        );

      } catch {

        toast.error(
          "Failed to update task"
        );

      }

    };

  if (loading) {

    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading tasks...
        </CardContent>
      </Card>
    );

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Tasks
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-3">

          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

          <Button
            onClick={
              handleCreateTask
            }
            disabled={
              creatingTask
            }
          >
            {creatingTask
              ? "Creating..."
              : "Create Task"}
          </Button>

        </div>

        <div className="space-y-4">

          {tasks.length ===
          0 ? (

            <p className="text-sm text-muted-foreground">
              No tasks found.
            </p>

          ) : (

            tasks.map(task => (

              <Card
                key={task.id}
              >
                <CardContent className="flex items-start justify-between pt-4">

                  <div>

                    <h4 className="font-medium">
                      {task.title}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Assigned to{" "}
                      {
                        task.assigned_to_name
                      }
                    </p>

                  </div>

                  <Button
                    variant={
                      task.status ===
                      "COMPLETED"
                        ? "default"
                        : "outline"
                    }
                    disabled={
                      task.status ===
                      "COMPLETED"
                    }
                    onClick={() =>
                      handleCompleteTask(
                        task.id
                      )
                    }
                  >
                    {task.status ===
                    "COMPLETED"
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>

                </CardContent>
              </Card>

            ))

          )}

        </div>

      </CardContent>
    </Card>
  );
}