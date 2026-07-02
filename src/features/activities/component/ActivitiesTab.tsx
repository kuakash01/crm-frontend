"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "../activities.types";
import { getActivities } from "@/features/activities/activities.service";
import { toast } from "sonner";

interface ActivitiesTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
}

export default function ActivitiesTab({
  entityType,
  entityId,
}: ActivitiesTabProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [entityType, entityId]);

  const fetchActivities = async () => {
    try {
      const data = await getActivities(entityType, entityId);

      setActivities(data);
    } catch {
      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="border-l-2 pl-4 pb-4">
              <p className="font-medium">{activity.created_by_name}</p>

              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>

              <p className="text-xs text-muted-foreground">
                {new Date(activity.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
