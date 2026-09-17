"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Check,
  XCircle,
  Clock,
  User as UserIcon,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { DetailPageSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

const STAGE_CONFIG: Record<
  string,
  {
    label: string;
    dot: string;
    dotClass: string;
    badge: string;
    badgeClass: string;
    step: number;
  }
> = {
  OPEN: {
    label: "Open Discovery",
    dot: "bg-blue-500",
    dotClass: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    step: 1,
  },
  QUOTATION_SENT: {
    label: "Quotation Sent",
    dot: "bg-amber-500",
    dotClass: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    step: 2,
  },
  NEGOTIATION: {
    label: "Negotiation",
    dot: "bg-violet-500",
    dotClass: "bg-violet-500",
    badge: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    badgeClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    step: 3,
  },
  WON: {
    label: "Closed Won",
    dot: "bg-emerald-500",
    dotClass: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    step: 4,
  },
  LOST: {
    label: "Closed Lost",
    dot: "bg-rose-500",
    dotClass: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    step: 0,
  },
};

const DEAL_PIPELINE_ORDER = ["OPEN", "QUOTATION_SENT", "NEGOTIATION", "WON"];

export default function DealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { can } = usePermission();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
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
      setLoading(true);
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
      setSaving(true);
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
      toast.success("Deal updated successfully");
    } catch {
      toast.error("Failed to update deal");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deal) return;

    try {
      setDeleting(true);
      await deleteDeal(deal.id);
      toast.success("Deal deleted successfully");
      router.push("/dashboard/deals");
    } catch {
      toast.error("Failed to delete deal");
    } finally {
      setDeleting(false);
    }
  };

  const handleStageChange = async (stage: string) => {
    if (!deal || updatingStage || stage === deal.stage) return;

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
      toast.success(`Stage progressed to ${STAGE_CONFIG[stage]?.label || stage}`);
    } catch {
      toast.error("Failed to update stage");
    } finally {
      setUpdatingStage(false);
    }
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!deal) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Deal not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/deals")}>
          Back to Deals
        </Button>
      </div>
    );
  }

  const currentStageMeta = STAGE_CONFIG[deal.stage] || STAGE_CONFIG.OPEN;
  const currentStageIndex = DEAL_PIPELINE_ORDER.indexOf(deal.stage);
  const formattedDealValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(deal.price || 0));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/deals"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Deals
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title || deal.title}</h1>
            <Badge variant="outline" className="font-mono text-xs">
              Deal #{deal.id}
            </Badge>
            <Badge variant="outline" className={currentStageMeta.badgeClass}>
              <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${currentStageMeta.dotClass}`} />
              {currentStageMeta.label}
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
              {formattedDealValue}
            </Badge>
          </div>

          {/* Quick Association Chips Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {deal.customer_name && (
              <Link
                href={`/dashboard/customers/${deal.customer_id}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span className="underline-offset-2 hover:underline">{deal.customer_name}</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-60" />
              </Link>
            )}
            {deal.service_name && (
              <Link
                href={`/dashboard/services/${deal.service_id}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Wrench className="h-3.5 w-3.5 text-primary" />
                <span className="underline-offset-2 hover:underline">{deal.service_name}</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-60" />
              </Link>
            )}
            {expectedClose && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-primary" />
                <span>
                  Target Close:{" "}
                  {new Date(expectedClose).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </span>
            )}
            {deal.assigned_to_name && (
              <span className="inline-flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-primary" />
                <span>Owner: {deal.assigned_to_name}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!editing && can("deals:update") && (
            <Button
              onClick={() => setEditing(true)}
              size="sm"
              className="gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Deal
            </Button>
          )}
          {editing && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
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
              <Button
                type="submit"
                form="deal-details-form"
                size="sm"
                disabled={saving || !isDirty}
                className="min-w-[120px]"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Pipeline Stage Progress Bar */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="p-4 bg-muted/20 border-b border-border/40">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              Deal Pipeline Progression
            </span>
            {deal.stage === "LOST" ? (
              <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs">
                <XCircle className="h-3 w-3 mr-1" />
                Deal Closed Lost
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">
                Phase {currentStageIndex >= 0 ? currentStageIndex + 1 : 1} of {DEAL_PIPELINE_ORDER.length}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-[500px]">
            {DEAL_PIPELINE_ORDER.map((stageKey, idx) => {
              const isCurrent = deal.stage === stageKey;
              const isPassed = currentStageIndex >= 0 && idx < currentStageIndex;
              const canClick = !editing && !updatingStage && !isCurrent;

              return (
                <button
                  key={stageKey}
                  type="button"
                  disabled={!canClick}
                  onClick={() => handleStageChange(stageKey)}
                  className={`relative flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                    isCurrent
                      ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/20"
                      : isPassed
                      ? "bg-muted/40 text-foreground border-border hover:bg-muted/60 cursor-default"
                      : canClick
                      ? "bg-card text-muted-foreground border-dashed border-border hover:border-primary/50 hover:text-foreground cursor-pointer"
                      : "bg-muted/20 text-muted-foreground/60 border-border/40 cursor-not-allowed opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCurrent ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      Stage 0{idx + 1}
                    </span>
                    {isPassed ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    ) : null}
                  </div>
                  <span className="text-xs font-semibold truncate w-full">
                    {STAGE_CONFIG[stageKey]?.label || stageKey}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 border border-border/40">
          <TabsTrigger value="overview">Overview & Terms</TabsTrigger>
          <TabsTrigger value="activities">Activities Timeline</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {/* Left 2 Columns: Deal Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Opportunity Scope</CardTitle>
                    <CardDescription className="mt-0.5">
                      {editing
                        ? "Revise commercial terms and projected closing timeline."
                        : "Key parameters and contractual valuation of this deal."}
                    </CardDescription>
                  </div>
                  {!editing && can("deals:update") && (
                    <Button
                      onClick={() => setEditing(true)}
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit Terms
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <form
                    id="deal-details-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Deal Title */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Deal Title
                      </Label>
                      <Input
                        readOnly={!editing}
                        className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-xs text-destructive">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Customer & Service Linked Badges */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-primary" />
                          Account Client
                        </Label>
                        <div className="flex h-10 items-center justify-between rounded-md border border-border/40 bg-muted/30 px-3 text-sm">
                          <span className="truncate font-medium">{deal.customer_name}</span>
                          <Link
                            href={`/dashboard/customers/${deal.customer_id}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0 ml-2"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Wrench className="h-3.5 w-3.5 text-primary" />
                          Attached Service
                        </Label>
                        <div className="flex h-10 items-center justify-between rounded-md border border-border/40 bg-muted/30 px-3 text-sm">
                          <span className="truncate font-medium">{deal.service_name}</span>
                          <Link
                            href={`/dashboard/services/${deal.service_id}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0 ml-2"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Deal Value & Expected Close Date */}
                    <div className="grid gap-4 sm:grid-cols-2 border-t border-border/40 pt-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Deal Value (INR)
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground flex items-center justify-center font-semibold text-sm">
                            ₹
                          </div>
                          <Input
                            type="number"
                            readOnly={!editing}
                            className={`pl-9 h-10 ${
                              !editing ? "bg-muted/40 cursor-default border-border/40" : ""
                            }`}
                            {...register("price", {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-xs text-destructive">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Target Close Date
                        </Label>
                        <Input
                          type="date"
                          readOnly={!editing}
                          className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                          {...register("expected_close_date")}
                        />
                        {errors.expected_close_date && (
                          <p className="text-xs text-destructive">
                            {errors.expected_close_date.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Edit Action Controls */}
                    {editing && (
                      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
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
                        <Button type="submit" disabled={saving || !isDirty} className="min-w-[130px]">
                          {saving ? "Saving Changes..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right 1 Column: Intelligence Sidebar */}
            <div className="space-y-6">
              {/* Commercial Summary Card */}
              <Card className="border-border/60 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold flex items-center justify-between">
                    <span>Commercial Summary</span>
                    <Badge variant="outline" className={currentStageMeta.badgeClass}>
                      {currentStageMeta.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="rounded-lg bg-muted/40 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Opportunity Value
                    </p>
                    <p className="text-3xl font-bold tracking-tight text-foreground mt-1">
                      {formattedDealValue}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Active Deal Stage</Label>
                    <Select
                      value={deal.stage}
                      disabled={editing || updatingStage}
                      onValueChange={handleStageChange}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STAGE_CONFIG).map(([value, meta]) => (
                          <SelectItem key={value} value={value}>
                            <span className="flex items-center gap-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                              {meta.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Deal Assignment Card */}
              <AssignmentCard
                entityName="Deal"
                assignedUser={{
                  id: Number(deal.assigned_to),
                  name: deal.assigned_to_name?.toString() ?? null,
                }}
                canAssign={!editing && (can("deals:assign") ?? false)}
                onAssign={async (assignedUser) => {
                  try {
                    await assignDeals({
                      dealIds: [deal.id],
                      assignedTo: assignedUser.id,
                    });

                    setDeal((prev) =>
                      prev
                        ? {
                            ...prev,
                            assigned_to: assignedUser.id,
                            assigned_to_name: assignedUser.fullname,
                          }
                        : prev
                    );

                    toast.success("Deal transferred successfully");
                  } catch {
                    toast.error("Transfer failed");
                  }
                }}
              />

              {/* Deal Metadata & Record Details */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold">Deal Timeline</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Expected Close</span>
                    <span className="font-medium text-foreground">
                      {expectedClose
                        ? new Date(expectedClose).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Deal Inception</span>
                    <span className="text-foreground">
                      {new Date(deal.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Deal Code</span>
                    <span className="font-mono text-foreground">DL-{deal.id.toString().padStart(5, "0")}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">Last Stage Transition</span>
                    <span className="text-foreground">
                      {new Date(deal.updated_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              {can("deals:delete") && (
                <Card className="border-destructive/30 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={editing}
                          variant="destructive"
                          className="w-full text-xs"
                          size="sm"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                          Delete Deal
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Deal #{deal.id}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove &quot;{deal.title}&quot; from your pipeline and delete all connected tasks, notes, and activity records. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleDelete}
                          >
                            {deleting ? "Deleting..." : "Delete Permanently"}
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

        {/* Tab 2: Activities Timeline */}
        <TabsContent value="activities" className="mt-0">
          <ActivitiesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>

        {/* Tab 3: Tasks */}
        <TabsContent value="tasks" className="mt-0">
          <TasksTab entityType="DEAL" entityId={deal.id} assignedTo={deal.assigned_to ?? null} />
        </TabsContent>

        {/* Tab 4: Notes */}
        <TabsContent value="notes" className="mt-0">
          <NotesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
