"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { usePermission } from "@/shared/hooks/usePermissions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

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

type AssignableUser = {
  id: number;
  fullname: string;
  role: string;
};

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lead, setLead] = useState<Lead | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateLeadFormData>({
    resolver: zodResolver(updateLeadSchema),
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
  let availableStatuses = statusTransitions[lead?.status || "NEW"];

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

      toast.success("Lead updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update lead");
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
    return <div className="p-6">Loading lead...</div>;
  }

  if (!lead) {
    return <div className="p-6">Lead not found</div>;
  }

  return (
    <div className="mx-auto ">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {lead.fname} {lead.lname}
          </h1>

          <p className="text-muted-foreground">Lead #{lead.id}</p>
        </div>
      </div>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>

            <TabsTrigger value="activities">Activities</TabsTrigger>

            <TabsTrigger value="notes">Notes</TabsTrigger>

            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="border-b border-border/60 pb-5 flex justify-between">
                  <div>
                    <CardTitle className="text-base">
                      Lead information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      View and update the core details of this lead.
                    </p>
                  </div>
                  {!editing && canEditLeadDetails && (
                    <Button onClick={() => setEditing(true)}>Edit Lead</Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <form
                    id="lead-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>First Name</Label>

                        <Input
                          readOnly={!editing}
                          className="h-10"
                          type="text"
                          {...register("fname")}
                        />
                        {errors.fname && (
                          <p className="text-sm text-destructive">
                            {errors.fname.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Last Name</Label>

                        <Input
                          readOnly={!editing}
                          className="h-10"
                          type="text"
                          {...register("lname")}
                        />
                        {errors.lname && (
                          <p className="text-sm text-destructive">
                            {errors.lname.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Email</Label>

                      <Input
                        readOnly={!editing}
                        className="h-10"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Primary Phone</Label>

                        <Input
                          readOnly={!editing}
                          className="h-10"
                          {...register("phone1")}
                        />
                        {errors.phone1 && (
                          <p className="text-sm text-destructive">
                            {errors.phone1.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Secondary Phone</Label>

                        <Input
                          readOnly={!editing}
                          className="h-10"
                          {...register("phone2")}
                        />
                        {errors.phone2 && (
                          <p className="text-sm text-destructive">
                            {errors.phone2.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* company */}
                    <div>
                      <Label>Company</Label>

                      <Input
                        readOnly={!editing}
                        className="h-10"
                        {...register("company")}
                      />
                      {errors.company && (
                        <p className="text-sm text-destructive">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                    {/* {canEditLeadDetails && (
                      <Button onClick={handleSaveDetails} disabled={saving}>
                        Save Details
                      </Button>
                    )} */}
                    {editing && (
                      <div className="flex justify-end gap-3 border-t pt-6">
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

                        <Button type="submit" disabled={!isDirty}>
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Status</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Select
                      disabled={editing || !canChangeStatus}
                      value={lead.status}
                      onValueChange={async (value) => {
                        try {
                          const updatedLead = await updateLeadStatus(
                            lead.id,
                            value,
                          );

                          setLead((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  status: updatedLead.status,
                                  converted_at: updatedLead.converted_at,
                                }
                              : prev,
                          );

                          toast.success("Status updated");
                        } catch (error: any) {
                          toast.error(
                            error?.response?.data?.message ??
                              "Failed to update status",
                          );
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {availableStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* {!lead.customer_created && lead.status === "CONVERTED" && (
                      <Button
                        className="mt-4 w-full"
                        onClick={handleCreateCustomer}
                      >
                        Create Customer
                      </Button>
                    )} */}
                  </CardContent>
                </Card>

                {/* assignment */}
                <AssignmentCard
                  entityName="Lead"
                  assignedUser={{
                    id: Number(lead.assigned_to),
                    name: lead.assigned_to_name?.toString() ?? null,
                  }}
                  canAssign={
                    !editing && !lead.converted_at && can("leads:assign")
                  }
                  onAssign={async (user) => {
                    await assignLeads({
                      leadIds: [lead.id],
                      assignedTo: user.id,
                    });

                    setLead((prev) =>
                      prev
                        ? {
                            ...prev,
                            assigned_to: user.id,
                            assigned_to_name: user.fullname,
                          }
                        : prev,
                    );

                    toast.success("Lead transferred");
                  }}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Lead Source</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p>{lead.source}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>ID:</strong> {lead.id}
                    </p>

                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(lead.created_at).toLocaleString()}
                    </p>

                    <p>
                      <strong>Updated:</strong>{" "}
                      {new Date(lead.updated_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {canDeleteLead && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            disabled={editing}
                            variant="destructive"
                            className="w-full"
                          >
                            Delete Lead
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Lead?</AlertDialogTitle>

                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction onClick={handleDelete}>
                              {deleting ? "Deleting..." : "Delete"}
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

          <TabsContent value="activities">
            <ActivitiesTab entityType="LEAD" entityId={lead.id} />
          </TabsContent>

          <TabsContent value="notes">
            <TabsContent value="notes">
              <NotesTab entityType="LEAD" entityId={lead.id} />
            </TabsContent>
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTab
              entityType="LEAD"
              entityId={lead.id}
              assignedTo={lead.assigned_to ?? null}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
