"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { usePermission } from "@/shared/hooks/usePermissions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

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

import { getAssignableUsers } from "@/shared/services/user.service";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { ChevronsUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ActivitiesTab from "@/features/activities/component/ActivitiesTab";
import NotesTab from "@/features/notes/component/NotesTab";
import TasksTab from "@/features/tasks/component/TasksTab";

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
  customer_id: number | null;
  customer_created: boolean;
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);

  const [assignOpen, setAssignOpen] = useState(false);

  const { can } = usePermission();


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

  const groupedUsers = assignableUsers.reduce(
    (acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = [];
      }

      acc[user.role].push(user);

      return acc;
    },
    {} as Record<string, AssignableUser[]>,
  );

  const fetchLead = async () => {
    try {
      const data = await getLeadById(Number(id));

      setLead(data);
    } catch {
      toast.error("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };


  const loadAssignableUsers = async () => {
    try {
      const data = await getAssignableUsers();

      setAssignableUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchLead();
    if (can("leads:assign")) loadAssignableUsers();
  }, [id]);

  const handleSaveDetails = async () => {
    if (!lead) return;

    try {
      setSaving(true);

      await updateLead(lead.id, {
        fname: lead.fname,
        lname: lead.lname,
        email: lead.email,
        phone1: lead.phone1,
        phone2: lead.phone2,
        company: lead.company,
      });

      toast.success("Details updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update");
    } finally {
      setSaving(false);
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
                <CardHeader>
                  <CardTitle>Lead Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>First Name</Label>

                      <Input
                        disabled={lead.customer_created}
                        value={lead.fname}
                        onChange={(e) =>
                          setLead({
                            ...lead,
                            fname: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Last Name</Label>

                      <Input
                        disabled={lead.customer_created}
                        value={lead.lname}
                        onChange={(e) =>
                          setLead({
                            ...lead,
                            lname: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>

                    <Input
                      disabled={lead.customer_created}
                      type="email"
                      value={lead.email}
                      onChange={(e) =>
                        setLead({
                          ...lead,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Primary Phone</Label>

                      <Input
                        disabled={lead.customer_created}
                        value={lead.phone1}
                        onChange={(e) =>
                          setLead({
                            ...lead,
                            phone1: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Secondary Phone</Label>

                      <Input
                        disabled={lead.customer_created}
                        value={lead.phone2 ?? ""}
                        onChange={(e) =>
                          setLead({
                            ...lead,
                            phone2: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Company</Label>

                    <Input
                      disabled={lead.customer_created}
                      value={lead.company ?? ""}
                      onChange={(e) =>
                        setLead({
                          ...lead,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  {!lead.customer_created && can("leads:update") && (
                    <Button onClick={handleSaveDetails} disabled={saving}>
                      Save Details
                    </Button>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Status</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Select
                      disabled={lead.customer_created}
                      value={lead.status}
                      onValueChange={async (value) => {
                        try {
                          await updateLeadStatus(lead.id, value);

                          setLead({
                            ...lead,
                            status: value as LeadStatus,
                            customer_created:
                              value === "CONVERTED" ? true : false,
                          });
                          toast.success("Status updated");
                        } catch {
                          toast.error("Failed to update status");
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

                <Card>
                  <CardHeader>
                    <CardTitle>Lead Assignment</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Current Owner
                    </div>

                    <div className="font-medium">
                      {lead.assigned_to_name ?? "Unassigned"}
                    </div>

                    {!lead.customer_created && can("leads:assign") && (
                      <Popover open={assignOpen} onOpenChange={setAssignOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {lead.assigned_to
                              ? assignableUsers.find(
                                  (user) => user.id === lead.assigned_to,
                                )?.fullname
                              : "Transfer Lead"}

                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search user..." />

                            <CommandEmpty>No user found.</CommandEmpty>

                            {Object.entries(groupedUsers).map(
                              ([role, users]) => (
                                <CommandGroup key={role} heading={role}>
                                  {users.map((user) => (
                                    <CommandItem
                                      key={user.id}
                                      value={`${user.fullname} ${user.role}`}
                                      onSelect={async () => {
                                        try {
                                          await assignLeads({
                                            leadIds: [lead.id],
                                            assignedTo: user.id,
                                          });

                                          setLead({
                                            ...lead,
                                            assigned_to: user.id,
                                            assigned_to_name: user.fullname,
                                          });

                                          toast.success("Lead transferred");
                                        } catch {
                                          toast.error("Transfer failed");
                                        }

                                        setAssignOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          lead.assigned_to === user.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />

                                      <div className="flex flex-col">
                                        <span>{user.fullname}</span>

                                        <span className="text-xs text-muted-foreground">
                                          {user.role}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              ),
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </CardContent>
                </Card>

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

                {!lead.customer_created && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
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
            <TasksTab entityType="LEAD" entityId={lead.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
