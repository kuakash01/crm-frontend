import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function TodayTasks({
  tasks,
}: TodayTasksProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Tasks</CardTitle>

        <Link href="/dashboard/tasks">
          <Button
            variant="ghost"
            size="sm"
          >
            View All
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No tasks due today.
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {task.title}
                  </p>

                  <Badge variant="outline">
                    {task.entity_type}
                  </Badge>
                </div>

                {task.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Assigned to {task.assigned_to_name}
                  </span>

                  <span>
                    {new Date(
                      task.due_date
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}