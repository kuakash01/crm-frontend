"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Pencil,
  Building2,
  Mail,
  Phone,
  User as UserIcon,
  Globe,
  ExternalLink,
  Check,
  XCircle,
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { usePermission } from "@/shared/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateLeadSchema,
  UpdateLeadFormData,
} from "@/features/leads/leads.schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import {
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  assignLeads,
} from "@/features/leads/leads.service";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "@/features/activities/component/ActivitiesTab";
import NotesTab from "@/features/notes/component/NotesTab";
import TasksTab from "@/features/tasks/component/TasksTab";

import { useAppSelector } from "@/store/hooks";
import AssignmentCard from "@/shared/components/user-assignment/AssigmentCard";
import { DetailPageSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CONVERTED"
  | "LOST";

type LeadSource = "WEBSITE" | "FACEBOOK" | "GOOGLE" | "REFERRAL" | "MANUAL";

type Lead = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone1: string;
  phone2?: string | null;
  company?: string | null;
  status: LeadStatus;
  source: LeadSource;
  assigned_to?: number | null;
  assigned_to_name?: string | null;
  converted_at: Date;
  customer_id: number | null;
  created_at: string;
  updated_at: string;
};

const PIPELINE_ORDER: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "CONVERTED",
];

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  NEW: {
    label: "New Lead",
    badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    dotClass: "bg-blue-500",
  },
  CONTACTED: {
    label: "Contacted",
    badgeClass: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    dotClass: "bg-slate-500",
  },
  QUALIFIED: {
    label: "Qualified",
    badgeClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    dotClass: "bg-indigo-500",
  },
  PROPOSAL: {
    label: "Proposal Sent",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    dotClass: "bg-amber-500",
  },
  NEGOTIATION: {
    label: "In Negotiation",
    badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    dotClass: "bg-purple-500",
  },
  CONVERTED: {
    label: "Converted",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
  LOST: {
    label: "Closed Lost",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    dotClass: "bg-rose-500",
  },
};

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingStage, setUpdatingStage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateLeadFormData>({
    resolver: zodResolver(updateLeadSchema),
  });

  const { can } = usePermission();
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const canEditLeadDetails =
    can("leads:update") && (!lead?.converted_at || isAdmin);
  const canChangeStatus = can("leads:update") && !lead?.converted_at;
  const canDeleteLead = can("leads:delete") && !lead?.converted_at;

  const statusTransitions: Record<LeadStatus, LeadStatus[]> = {
    NEW: ["NEW", "CONTACTED", "LOST"],
    CONTACTED: ["CONTACTED", "QUALIFIED", "LOST"],
    QUALIFIED: ["QUALIFIED", "PROPOSAL", "LOST"],
    PROPOSAL: ["PROPOSAL", "NEGOTIATION", "LOST"],
    NEGOTIATION: ["NEGOTIATION", "CONVERTED", "LOST"],
    CONVERTED: ["CONVERTED"],
    LOST: ["LOST", "NEW"],
  };
  const availableStatuses = statusTransitions[lead?.status || "NEW"] || [];

  const fetchLead = async () => {
    try {
      const data = await getLeadById(Number(id));
      setLead(data);
      reset({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        phone1: data.phone1,
        phone2: data.phone2 ?? "",
        company: data.company ?? "",
      });
    } catch {
      toast.error("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const onSubmit = async (data: UpdateLeadFormData) => {
    if (!lead) return;

    try {
      setSaving(true);
      const updated = await updateLead(lead.id, data);
      setLead(updated);
      reset({
        fname: updated.fname,
        lname: updated.lname,
        email: updated.email,
        phone1: updated.phone1,
        phone2: updated.phone2 ?? "",
        company: updated.company ?? "",
      });
      setEditing(false);
      toast.success("Lead details updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || updatingStage || newStatus === lead.status) return;

    try {
      setUpdatingStage(true);
      const updatedLead = await updateLeadStatus(lead.id, newStatus);
      setLead((prev) =>
        prev
          ? {
              ...prev,
              status: updatedLead.status,
              converted_at: updatedLead.converted_at,
              customer_id: updatedLead.customer_id ?? prev.customer_id,
            }
          : prev
      );
      toast.success(`Status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to update status");
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleDelete = async () => {
    if (!lead) return;

    try {
      setDeleting(true);
      await deleteLead(lead.id);
      toast.success("Lead deleted successfully");
      router.push("/dashboard/leads");
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!lead) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Lead not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/leads")}>
          Back to Leads
        </Button>
      </div>
    );
  }

  const initials = `${lead.fname?.[0] || ""}${lead.lname?.[0] || ""}`.toUpperCase() || "LD";
  const currentStatusMeta = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
  const currentStageIndex = PIPELINE_ORDER.indexOf(lead.status);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Leads
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {lead.fname} {lead.lname}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              Lead #{lead.id}
            </Badge>
            <Badge variant="outline" className={currentStatusMeta.badgeClass}>
              <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${currentStatusMeta.dotClass}`} />
              {currentStatusMeta.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Globe className="mr-1 h-3 w-3" />
              {lead.source}
            </Badge>
            {lead.customer_id && (
              <Link href={`/dashboard/customers/${lead.customer_id}`}>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  Converted to Customer #{lead.customer_id}
                  <ExternalLink className="h-3 w-3 ml-0.5" />
                </Badge>
              </Link>
            )}
          </div>

          {/* Quick Contact Chips Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>{lead.email}</span>
              </a>
            )}
            {lead.phone1 && (
              <a
                href={`tel:${lead.phone1}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>{lead.phone1}</span>
              </a>
            )}
            {lead.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>{lead.company}</span>
              </span>
            )}
            {lead.assigned_to_name && (
              <span className="inline-flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-primary" />
                <span>Owner: {lead.assigned_to_name}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!editing && canEditLeadDetails && (
            <Button
              onClick={() => setEditing(true)}
              size="sm"
              className="gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Lead
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
                    fname: lead.fname,
                    lname: lead.lname,
                    email: lead.email,
                    phone1: lead.phone1,
                    phone2: lead.phone2 ?? "",
                    company: lead.company ?? "",
                  });
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="lead-details-form"
                size="sm"
                disabled={saving || !isDirty}
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
              Pipeline Progression
            </span>
            {lead.status === "LOST" ? (
              <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs">
                <XCircle className="h-3 w-3 mr-1" />
                Lead is Marked as Lost
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">
                Stage {currentStageIndex >= 0 ? currentStageIndex + 1 : 1} of {PIPELINE_ORDER.length}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 min-w-[620px]">
            {PIPELINE_ORDER.map((stageKey, idx) => {
              const isCurrent = lead.status === stageKey;
              const isPassed = currentStageIndex >= 0 && idx < currentStageIndex;
              const isFuture = currentStageIndex >= 0 && idx > currentStageIndex;
              const isAvailable = availableStatuses.includes(stageKey);
              const canClick =
                canChangeStatus &&
                !editing &&
                !updatingStage &&
                isAvailable &&
                !isCurrent;

              return (
                <button
                  key={stageKey}
                  type="button"
                  disabled={!canClick}
                  onClick={() => handleStatusChange(stageKey)}
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
                      Step 0{idx + 1}
                    </span>
                    {isPassed ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    ) : null}
                  </div>
                  <span className="text-xs font-semibold truncate w-full">
                    {STATUS_CONFIG[stageKey]?.label || stageKey}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 border border-border/40">
          <TabsTrigger value="details">Overview & Details</TabsTrigger>
          <TabsTrigger value="activities">Activities Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview & Details */}
        <TabsContent value="details" className="space-y-6 mt-0">
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {/* Left 2 Columns: Core Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Lead Information</CardTitle>
                    <CardDescription className="mt-0.5">
                      {editing
                        ? "Update lead credentials and contact details."
                        : "Verified contact profile and lead attributes."}
                    </CardDescription>
                  </div>
                  {!editing && canEditLeadDetails && (
                    <Button
                      onClick={() => setEditing(true)}
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit Details
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <form
                    id="lead-details-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Section 1: Personal Name */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Personal Information
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">First Name</Label>
                          <Input
                            readOnly={!editing}
                            className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                            type="text"
                            {...register("fname")}
                          />
                          {errors.fname && (
                            <p className="text-xs text-destructive">
                              {errors.fname.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Last Name</Label>
                          <Input
                            readOnly={!editing}
                            className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                            type="text"
                            {...register("lname")}
                          />
                          {errors.lname && (
                            <p className="text-xs text-destructive">
                              {errors.lname.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Contact Information */}
                    <div className="border-t border-border/40 pt-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Contact Details
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Email Address</Label>
                          <Input
                            readOnly={!editing}
                            className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                            type="email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Primary Phone</Label>
                            <Input
                              readOnly={!editing}
                              className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                              {...register("phone1")}
                            />
                            {errors.phone1 && (
                              <p className="text-xs text-destructive">
                                {errors.phone1.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Secondary Phone (Optional)</Label>
                            <Input
                              readOnly={!editing}
                              className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                              {...register("phone2")}
                            />
                            {errors.phone2 && (
                              <p className="text-xs text-destructive">
                                {errors.phone2.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Company / Organization */}
                    <div className="border-t border-border/40 pt-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Organization
                      </h4>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Company Name</Label>
                        <Input
                          readOnly={!editing}
                          className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                          {...register("company")}
                        />
                        {errors.company && (
                          <p className="text-xs text-destructive">
                            {errors.company.message}
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
                              fname: lead.fname,
                              lname: lead.lname,
                              email: lead.email,
                              phone1: lead.phone1,
                              phone2: lead.phone2 ?? "",
                              company: lead.company ?? "",
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
              {/* Status Quick Changer Card */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold flex items-center justify-between">
                    <span>Lead Status</span>
                    <Badge variant="outline" className={currentStatusMeta.badgeClass}>
                      {currentStatusMeta.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Transition Status</Label>
                    <Select
                      disabled={editing || !canChangeStatus || updatingStage}
                      value={lead.status}
                      onValueChange={(val) => handleStatusChange(val as LeadStatus)}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            <span className="flex items-center gap-2">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  STATUS_CONFIG[status]?.dotClass || "bg-muted-foreground"
                                }`}
                              />
                              {STATUS_CONFIG[status]?.label || status}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {lead.converted_at && (
                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-700 dark:text-emerald-400 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Lead Converted</p>
                        <p className="text-[11px] opacity-90 mt-0.5">
                          Converted on {new Date(lead.converted_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assignment Card */}
              <AssignmentCard
                entityName="Lead"
                assignedUser={{
                  id: Number(lead.assigned_to),
                  name: lead.assigned_to_name?.toString() ?? null,
                }}
                canAssign={!editing && !lead.converted_at && can("leads:assign")}
                onAssign={async (assignedUser) => {
                  await assignLeads({
                    leadIds: [lead.id],
                    assignedTo: assignedUser.id,
                  });

                  setLead((prev) =>
                    prev
                      ? {
                          ...prev,
                          assigned_to: assignedUser.id,
                          assigned_to_name: assignedUser.fullname,
                        }
                      : prev
                  );

                  toast.success("Lead transferred successfully");
                }}
              />

              {/* Attribution & Record Details Card */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold">Attribution & System</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Lead Source</span>
                    <Badge variant="secondary" className="text-xs">
                      {lead.source}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Lead ID</span>
                    <span className="font-mono text-foreground">LD-{lead.id.toString().padStart(5, "0")}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Date Created</span>
                    <span className="text-foreground">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="text-foreground">
                      {new Date(lead.updated_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              {canDeleteLead && (
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
                          Delete Lead
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Lead #{lead.id}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {lead.fname} {lead.lname} from your CRM along with all associated activities and notes. This action cannot be undone.
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
          <ActivitiesTab entityType="LEAD" entityId={lead.id} />
        </TabsContent>

        {/* Tab 3: Notes */}
        <TabsContent value="notes" className="mt-0">
          <NotesTab entityType="LEAD" entityId={lead.id} />
        </TabsContent>

        {/* Tab 4: Tasks */}
        <TabsContent value="tasks" className="mt-0">
          <TasksTab
            entityType="LEAD"
            entityId={lead.id}
            assignedTo={lead.assigned_to ?? null}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
