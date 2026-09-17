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
  PhoneCall,
  Calendar,
  Mail,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { getActivities, logActivity } from "@/features/activities/activities.service";
import { Activity } from "../activities.types";

import { usePagination } from "@/shared/hooks/usePagination";
import DataTablePagination from "@/shared/components/pagination/DataTablePagination";
import { TimelineSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

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
  CALL_LOGGED: PhoneCall,
  MEETING_LOGGED: Calendar,
  EMAIL_SENT: Mail,
};

type QuickLogType = "CALL_LOGGED" | "MEETING_LOGGED" | "EMAIL_SENT" | null;

const QUICK_PRESETS: Record<
  "CALL_LOGGED" | "MEETING_LOGGED" | "EMAIL_SENT",
  string[]
> = {
  CALL_LOGGED: [
    "Connected — discussed proposal details and next steps.",
    "Left voicemail requesting a return call.",
    "Follow-up call completed — client requested pricing updates.",
    "Call rescheduled per customer request.",
  ],
  MEETING_LOGGED: [
    "Introductory discovery meeting completed.",
    "Product demonstration presented to key stakeholders.",
    "Scope and pricing review meeting concluded.",
    "Contract review and final alignment session.",
  ],
  EMAIL_SENT: [
    "Follow-up email sent regarding open quotation.",
    "Sent detailed service overview and specifications.",
    "Dispatched revised proposal with agreed adjustments.",
    "Sent meeting summary and next milestone timeline.",
  ],
};

export default function ActivitiesTab({
  entityType,
  entityId,
}: ActivitiesTabProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick logging state
  const [activeLogType, setActiveLogType] = useState<QuickLogType>(null);
  const [customDescription, setCustomDescription] = useState("");
  const [submittingLog, setSubmittingLog] = useState(false);

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

  const handleSaveActivity = async () => {
    if (!activeLogType) return;
    const desc = customDescription.trim();
    if (!desc) {
      toast.error("Please provide an activity description");
      return;
    }

    try {
      setSubmittingLog(true);
      await logActivity(entityType, entityId, {
        activityType: activeLogType,
        description: desc,
      });

      toast.success("Activity logged successfully");
      setActiveLogType(null);
      setCustomDescription("");
      await fetchActivities();
    } catch {
      toast.error("Failed to log activity");
    } finally {
      setSubmittingLog(false);
    }
  };

  if (loading && activities.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <TimelineSkeleton items={4} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle>Activity Timeline</CardTitle>
          <Badge variant="secondary">{pagination.total}</Badge>
        </div>

        {/* Quick Log Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={activeLogType === "CALL_LOGGED" ? "default" : "outline"}
            onClick={() => {
              setActiveLogType(activeLogType === "CALL_LOGGED" ? null : "CALL_LOGGED");
              setCustomDescription("");
            }}
            className="gap-1.5 text-xs h-8 rounded-lg"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Log Call</span>
          </Button>

          <Button
            size="sm"
            variant={activeLogType === "MEETING_LOGGED" ? "default" : "outline"}
            onClick={() => {
              setActiveLogType(activeLogType === "MEETING_LOGGED" ? null : "MEETING_LOGGED");
              setCustomDescription("");
            }}
            className="gap-1.5 text-xs h-8 rounded-lg"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Log Meeting</span>
          </Button>

          <Button
            size="sm"
            variant={activeLogType === "EMAIL_SENT" ? "default" : "outline"}
            onClick={() => {
              setActiveLogType(activeLogType === "EMAIL_SENT" ? null : "EMAIL_SENT");
              setCustomDescription("");
            }}
            className="gap-1.5 text-xs h-8 rounded-lg"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Log Email</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Log Form */}
        {activeLogType && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {activeLogType === "CALL_LOGGED"
                  ? "Record Phone Call Outcome"
                  : activeLogType === "MEETING_LOGGED"
                  ? "Record Meeting Notes"
                  : "Log Direct Email"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveLogType(null)}
                className="h-6 w-6"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PRESETS[activeLogType]?.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomDescription(preset)}
                  className="rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
                >
                  {preset}
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Add detailed notes or customize description..."
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              rows={3}
              className="rounded-lg bg-background text-sm resize-none"
            />

            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveLogType(null)}
                disabled={submittingLog}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveActivity}
                disabled={submittingLog || !customDescription.trim()}
                className="gap-1.5"
              >
                {submittingLog ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                <span>Save Activity</span>
              </Button>
            </div>
          </div>
        )}

        {activities.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No activities recorded yet. Use the quick log buttons above to log client interactions.
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
                    <div className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-xs">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <div className="rounded-xl border p-4 shadow-xs transition-shadow hover:shadow-md bg-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">
                              {activity.created_by_name}
                            </p>

                            <Badge variant="outline" className="text-[10px]">
                              {activity.activity_type.replaceAll("_", " ")}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {activity.description}
                          </p>
                        </div>

                        {activity.created_at && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(activity.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
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
