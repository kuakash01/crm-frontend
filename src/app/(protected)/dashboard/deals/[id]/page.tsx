"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Pencil,
  Building2,
  Wrench,
  CalendarClock,
  CalendarPlus,
  Trash2,
  IndianRupee,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { usePermission } from "@/shared/hooks/usePermissions";

import {
  deleteDeal,
  getDealById,
  updateDeal,
  updateDealStage,
  assignDeals,
} from "@/features/deals/deals.service";

import { Deal } from "@/features/deals/deals.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateDealSchema,
  UpdateDealFormData,
} from "@/features/deals/deals.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ActivitiesTab from "@/features/activities/component/ActivitiesTab";
import TasksTab from "@/features/tasks/component/TasksTab";
import NotesTab from "@/features/notes/component/NotesTab";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AssignmentCard from "@/shared/components/user-assignment/AssigmentCard";

// Stage visual language — each stage gets a consistent dot + badge color
// so the pipeline status reads at a glance across the whole app.
const STAGE_META: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  OPEN: {
    label: "Open",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  QUOTATION_SENT: {
    label: "Quotation Sent",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  NEGOTIATION: {
    label: "Negotiation",
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  WON: {
    label: "Won",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  LOST: {
    label: "Lost",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

function StageBadge({ stage }: { stage: string }) {
  const meta = STAGE_META[stage] ?? {
    label: stage,
    dot: "bg-gray-400",
    badge: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

export default function DealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { can } = usePermission();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateDealFormData>({
    resolver: zodResolver(updateDealSchema),
  });
  const price = watch("price");
  const title = watch("title");
  const expectedClose = watch("expected_close_date");

  const [updatingStage, setUpdatingStage] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDeal();
  }, []);

  const fetchDeal = async () => {
    try {
      const data = await getDealById(Number(id));

      setDeal(data);
      reset({
        title: data.title,
        customer_id: data.customer_id,
        service_id: data.service_id,
        price: data.price,
        expected_close_date: data.expected_close_date?.split("T")[0] ?? "",
        assigned_to: data.assigned_to,
        stage: data.stage,
      });
    } catch {
      toast.error("Failed to load deal");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UpdateDealFormData) => {
    if (!deal) return;

    try {
      const updated = await updateDeal(deal.id, data);

      setDeal(updated);

      reset({
        title: updated.title,
        customer_id: updated.customer_id,
        service_id: updated.service_id,
        price: updated.price,
        expected_close_date: updated.expected_close_date?.split("T")[0] ?? "",
        assigned_to: updated.assigned_to,
        stage: updated.stage,
      });

      setEditing(false);

      toast.success("Deal updated");
    } catch {
      toast.error("Failed to update deal");
    }
  };

  const handleDelete = async () => {
    if (!deal) return;

    try {
      await deleteDeal(deal.id);

      toast.success("Deal deleted successfully");

      router.push("/dashboard/deals");
    } catch {
      toast.error("Failed to delete deal");

      throw new Error();
    }
  };

  const handleStageChange = async (stage: string) => {
    if (!deal) return;

    try {
      setUpdatingStage(true);

      const updated = await updateDealStage(deal.id, stage);

      setDeal((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          stage: updated.stage,
        };
      });

      toast.success("Stage updated");
    } catch {
      toast.error("Failed to update stage");
    } finally {
      setUpdatingStage(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-96 animate-pulse rounded-xl bg-muted lg:col-span-2" />
          <div className="h-96 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!deal) return null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <StageBadge stage={deal.stage} />
          </div>
          <p className="text-muted-foreground mt-2">Manage sales opportunity</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left */}
            <div className="lg:col-span-2">
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/60 pb-5 flex justify-between">
                  <div>
                    <CardTitle className="text-base">
                      Deal information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      View and update the core details of this deal.
                    </p>
                  </div>
                  {!editing && can("deals:update") && (
                    <Button onClick={() => setEditing(true)} className="gap-2">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit deal
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="pt-6">
                  <form
                    id="deal-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Title */}
                    <div className="space-y-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        className="h-10"
                        readOnly={!editing}
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-sm text-destructive">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Customer / Service */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="flex items-center gap-1.5 text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5" />
                          Customer
                        </Label>
                        <Input
                          className="h-10 bg-muted/40"
                          value={deal.customer_name}
                          readOnly
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="flex items-center gap-1.5 text-muted-foreground">
                          <Wrench className="h-3.5 w-3.5" />
                          Service
                        </Label>
                        <Input
                          className="h-10 bg-muted/40"
                          value={deal.service_name}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Price / Expected Close */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>Deal Value</Label>

                        <div className="flex">
                          <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-muted text-sm font-medium text-muted-foreground">
                            ₹
                          </div>

                          <Input
                            type="number"
                            className="h-10 rounded-l-none"
                            readOnly={!editing}
                            {...register("price", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>

                        {errors.price && (
                          <p className="text-sm text-destructive">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label>Expected close</Label>
                        <Input
                             className="h-10"
                          type="date"
                          readOnly={!editing}
                          {...register("expected_close_date")}
                        />
                        {errors.expected_close_date && (
                          <p className="text-sm text-destructive">
                            {errors.expected_close_date.message}
                          </p>
                        )}
                      </div>
                    </div>

                  

                    {editing && (
                      <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            reset({
                              title: deal.title,
                              customer_id: deal.customer_id,
                              service_id: deal.service_id,
                              price: deal.price,
                              expected_close_date:
                                deal.expected_close_date?.split("T")[0] ?? "",
                              assigned_to: deal.assigned_to,
                              stage: deal.stage,
                            });

                            setEditing(false);
                          }}
                        >
                          Cancel
                        </Button>

                        <Button type="submit" disabled={!isDirty}>
                          Save changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Deal Summary */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-muted/40 p-5 text-center">
                    <p className="text-3xl font-semibold tracking-tight text-foreground">
                      ₹{Number(price || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      Current deal value
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Deal stage
                    </Label>

                    <Select
                      value={deal.stage}
                      disabled={editing || updatingStage}
                      onValueChange={handleStageChange}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.entries(STAGE_META).map(([value, meta]) => (
                          <SelectItem key={value} value={value}>
                            <span className="flex items-center gap-2">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                              />
                              {meta.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <dl className="space-y-3 border-t border-border/60 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        Customer
                      </dt>
                      <dd className="max-w-[60%] truncate text-right font-medium text-foreground">
                        {deal.customer_name}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <Wrench className="h-3.5 w-3.5" />
                        Service
                      </dt>
                      <dd className="max-w-[60%] truncate text-right font-medium text-foreground">
                        {deal.service_name}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarClock className="h-3.5 w-3.5" />
                        Expected close
                      </dt>
                      <dd className="font-medium text-foreground">
                        {expectedClose
                          ? new Date(expectedClose).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarPlus className="h-3.5 w-3.5" />
                        Created
                      </dt>
                      <dd className="font-medium text-foreground">
                        {new Date(deal.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Assignment */}
              <AssignmentCard
                entityName="Deal"
                assignedUser={{
                  id: Number(deal.assigned_to),
                  name: deal.assigned_to_name?.toString() ?? null,
                }}
                canAssign={!editing && (can("deals:assign") ?? false)}
                onAssign={async (user) => {
                  try {
                    await assignDeals({
                      dealIds: [deal.id],
                      assignedTo: user.id,
                    });

                    setDeal((prev) =>
                      prev
                        ? {
                            ...prev,
                            assigned_to: user.id,
                            assigned_to_name: user.fullname,
                          }
                        : prev,
                    );

                    toast.success("Deal transferred");
                  } catch {
                    toast.error("Transfer failed");
                  }
                }}
              />

              {can("deals:delete") && (
                <Card className="border-destructive/30 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-destructive">
                      Danger zone
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={editing}
                          variant="destructive"
                          className="w-full gap-2"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete deal
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this deal?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this deal, along with its activities, notes
                            and tasks.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={async (e) => {
                              e.preventDefault();

                              try {
                                setDeleting(true);
                                await handleDelete();
                              } finally {
                                setDeleting(false);
                              }
                            }}
                          >
                            {deleting ? "Deleting…" : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Activities */}
        <TabsContent value="activities" className="mt-6">
          <ActivitiesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks" className="mt-6">
          <TasksTab entityType="DEAL" entityId={deal.id}  assignedTo={deal.assigned_to ?? null}/>
        </TabsContent>

        {/* Notes */}
        <TabsContent value="notes" className="mt-6">
          <NotesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
