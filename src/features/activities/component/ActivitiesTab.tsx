// "use client";

// import { useEffect, useState } from "react";
// import {
//   CirclePlus,
//   Pencil,
//   UserRound,
//   ArrowRightLeft,
//   BadgeCheck,
//   CircleX,
//   NotebookPen,
//   ClipboardList,
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { toast } from "sonner";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { getActivities } from "@/features/activities/activities.service";
// import { Activity } from "../activities.types";

// interface ActivitiesTabProps {
//   entityType: "LEAD" | "CUSTOMER" | "DEAL";
//   entityId: number;
// }

// const activityIcons = {
//   CREATED: CirclePlus,
//   UPDATED: Pencil,
//   ASSIGNED: ArrowRightLeft,
//   STATUS_CHANGED: BadgeCheck,
//   CONVERTED: UserRound,
//   WON: BadgeCheck,
//   LOST: CircleX,
//   NOTE_ADDED: NotebookPen,
//   TASK_CREATED: ClipboardList,
// };

// export default function ActivitiesTab({
//   entityType,
//   entityId,
// }: ActivitiesTabProps) {
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchActivities();
//   }, [entityType, entityId]);

//   const fetchActivities = async () => {
//     try {
//       const data = await getActivities(entityType, entityId);
//       setActivities(data);
//     } catch {
//       toast.error("Failed to load activities");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading activities...</p>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Activity Timeline</CardTitle>
//       </CardHeader>

//       <CardContent>
//         {activities.length === 0 ? (
//           <div className="py-12 text-center text-muted-foreground">
//             No activities yet.
//           </div>
//         ) : (
//           <div className="relative ml-3 border-l">
//             {activities.map((activity) => {
//               const Icon =
//                 activityIcons[
//                   activity.activity_type as keyof typeof activityIcons
//                 ] ?? CirclePlus;

//               return (
//                 <div
//                   key={activity.id}
//                   className="relative ml-6 pb-8 last:pb-0"
//                 >
//                   <div className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full border bg-background">
//                     <Icon className="h-4 w-4" />
//                   </div>

//                   <div className="rounded-xl border p-4 shadow-sm">
//                     <div className="flex items-start justify-between gap-4">
//                       <div>
//                         <p className="font-medium">
//                           {activity.created_by_name}
//                         </p>

//                         <p className="mt-1 text-sm text-muted-foreground">
//                           {activity.description}
//                         </p>
//                       </div>

//                       <span className="shrink-0 text-xs text-muted-foreground">
//                         {formatDistanceToNow(
//                           new Date(activity.created_at),
//                           {
//                             addSuffix: true,
//                           },
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  CirclePlus,
  Pencil,
  ArrowRightLeft,
  BadgeCheck,
  CircleX,
  NotebookPen,
  ClipboardList,
  UserRound,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getActivities } from "@/features/activities/activities.service";
import { Activity } from "../activities.types";

import { usePagination } from "@/shared/hooks/usePagination";
import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

interface ActivitiesTabProps {
  entityType: "LEAD" | "CUSTOMER" | "DEAL";
  entityId: number;
}

const activityIcons = {
  CREATED: CirclePlus,
  UPDATED: Pencil,
  ASSIGNED: ArrowRightLeft,
  STATUS_CHANGED: BadgeCheck,
  CONVERTED: UserRound,
  WON: BadgeCheck,
  LOST: CircleX,
  NOTE_ADDED: NotebookPen,
  TASK_CREATED: ClipboardList,
};

export default function ActivitiesTab({
  entityType,
  entityId,
}: ActivitiesTabProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  useEffect(() => {
    fetchActivities();
  }, [entityType, entityId, currentPage]);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const response = await getActivities(entityType, entityId, {
        page: currentPage,
        limit: pagination.limit,
      });

      setActivities(response.data);
      setPagination(response.pagination);
    } catch {
      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          Loading activities...
        </CardContent>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity Timeline</CardTitle>

        <Badge variant="secondary">{pagination.total}</Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {activities.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No activities found.
          </div>
        ) : (
          <>
            <div className="relative ml-3 border-l">
              {activities.map((activity) => {
                const Icon =
                  activityIcons[
                    activity.activity_type as keyof typeof activityIcons
                  ] ?? CirclePlus;

                return (
                  <div
                    key={activity.id}
                    className="relative ml-6 pb-8 last:pb-0"
                  >
                    <div className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {activity.created_by_name}
                            </p>

                            <Badge variant="outline" className="text-[10px]">
                              {activity.activity_type.replaceAll("_", " ")}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>

                        {/* <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.created_at), {
                            addSuffix: true,
                          })}
                        </span> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <DataTablePagination
              total={pagination.total}
              limit={pagination.limit}
              totalPages={pagination.totalPages}
              currentPage={currentPage}
              visiblePages={visiblePages}
              itemName="activities"
              onPageChange={handlePageChange}
              onJump={handleJump}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
