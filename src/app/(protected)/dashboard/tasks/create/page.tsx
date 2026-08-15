"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TaskForm from "@/features/tasks/component/TaskForm";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Task
        </h1>

        <p className="text-muted-foreground">
          Create a task and optionally relate it
          to a CRM record.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Task Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TaskForm
            mode="create"
            onSuccess={() =>
              router.push(
                "/dashboard/tasks"
              )
            }
            onCancel={() =>
              router.back()
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}