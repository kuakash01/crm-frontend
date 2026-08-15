"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePermission } from "@/shared/hooks/usePermissions";

import TaskForm from "@/features/tasks/component/TaskForm";
import TaskList from "@/features/tasks/component/TaskList";

interface TasksTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
  assignedTo: number | null;
}

export default function TasksTab({
  entityType,
  entityId,
  assignedTo,
}: TasksTabProps) {
  const { can } = usePermission();

  const [taskListKey, setTaskListKey] = useState(0);

  const handleTaskCreated = () => {
    setTaskListKey((current) => current + 1);
  };

  return (
    <Card>

      <CardContent className="space-y-6">
        {/* Create Task */}

        {can("tasks:create") && (
          <div className="rounded-lg border p-4">
            <div className="mb-5">
              <h3 className="font-medium">Create Task</h3>

              <p className="text-sm text-muted-foreground">
                Create a task related to this {entityType.toLowerCase()}.
              </p>
            </div>

            <TaskForm
              mode="create"
              fixedEntityType={entityType}
              fixedEntityId={entityId}
              defaultAssignedTo={assignedTo}
              onSuccess={handleTaskCreated}
            />
          </div>
        )}

        {/* Task List */}

        <TaskList
          key={taskListKey}
          entityType={entityType}
          entityId={entityId}
        />
      </CardContent>
    </Card>
  );
}
