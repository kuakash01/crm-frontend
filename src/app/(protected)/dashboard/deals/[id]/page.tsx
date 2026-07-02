"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { usePermission } from "@/shared/hooks/usePermissions";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  deleteDeal,
  getDealById,
  updateDeal,
  updateDealStage,
  assignDeals,
} from "@/features/deals/deals.service";
import { getAssignableUsers } from "@/shared/services/user.service";

import { Deal } from "@/features/deals/deals.types";
import { User, AssignableUser } from "@/features/users/users.types";
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

  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);

  const [assignOpen, setAssignOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => {
    fetchDeal();
    if (can("deals:assign")) {
      loadAssignableUsers();
    }
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
        notes: data.notes ?? "",
        stage: data.stage,
      });
    } catch {
      toast.error("Failed to load deal");
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
        notes: updated.notes ?? "",
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
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!deal) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>

            <Badge>{deal.stage}</Badge>
          </div>

          <p className="text-muted-foreground mt-2">Manage sales opportunity</p>
        </div>

        <div className="flex gap-2">
          {!editing ? (
            <>
              {can("deals:update") && (
                <Button onClick={() => setEditing(true)}>Edit</Button>
              )}

              {can("deals:delete") && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Deal?</AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this deal, its activities, notes and tasks.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        disabled={deleting}
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
                        {deleting ? "Deleting..." : "Delete Deal"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </>
          ) : (
            <>
              <Button
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
                    notes: deal.notes ?? "",
                    stage: deal.stage,
                  });

                  setEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button type="submit" form="deal-form" disabled={!isDirty}>
                Save Changes
              </Button>
            </>
          )}
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

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left */}

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}

                    <div className="space-y-2">
                      <Label>Title</Label>

                      <Input disabled={!editing} {...register("title")} />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Customer */}

                      <div className="space-y-2">
                        <Label>Customer</Label>

                        <Input value={deal.customer_name} disabled />
                      </div>

                      {/* Service */}

                      <div className="space-y-2">
                        <Label>Service</Label>

                        <Input value={deal.service_name} disabled />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Price */}

                      <div className="space-y-2">
                        <Label>Deal Value</Label>

                        <Input
                          type="number"
                          disabled={!editing}
                          {...register("price", {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.price && (
                          <p className="text-sm text-red-500">
                            {errors.price.message}
                          </p>
                        )}
                      </div>

                      {/* Expected Close */}

                      <div className="space-y-2">
                        <Label>Expected Close</Label>

                        <Input
                          type="date"
                          disabled={!editing}
                          {...register("expected_close_date")}
                        />
                      </div>
                      {errors.expected_close_date && (
                        <p className="text-sm text-red-500">
                          {errors.expected_close_date.message}
                        </p>
                      )}
                    </div>

                    {/* Notes */}

                    <div className="space-y-2">
                      <Label>Notes</Label>

                      <Textarea disabled={!editing} {...register("notes")} />
                    </div>

                    {editing && (
                      <div className="flex justify-end gap-3 p-2">
                        <Button
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
                              notes: deal.notes ?? "",
                              stage: deal.stage,
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
            </div>

            {/* Right */}

            <div className="space-y-6">
              {/* Deal Summary */}
              <Card className="sticky top-6">
                <CardHeader className="pb-4">
                  <CardTitle>Deal Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold tracking-tight">
                      ₹{Number(price).toLocaleString()}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Current Deal Value
                    </p>
                  </div>

                  <div className="border-t pt-5">
                    <Label className="mb-2 block text-xs uppercase tracking-wide text-muted-foreground">
                      Deal Stage
                    </Label>

                    <Select
                      value={deal.stage}
                      disabled={updatingStage}
                      onValueChange={handleStageChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>

                        <SelectItem value="QUOTATION_SENT">
                          Quotation Sent
                        </SelectItem>

                        <SelectItem value="NEGOTIATION">Negotiation</SelectItem>

                        <SelectItem value="WON">Won</SelectItem>

                        <SelectItem value="LOST">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 border-t pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Customer
                      </span>

                      <span className="max-w-[170px] text-right font-medium">
                        {deal.customer_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Service
                      </span>

                      <span className="max-w-[170px] text-right font-medium">
                        {deal.service_name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Expected Close
                      </span>

                      <span className="font-medium">
                        {expectedClose
                          ? new Date(expectedClose).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Created
                      </span>

                      <span className="font-medium">
                        {new Date(deal.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Deal Assignment</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                        {deal.assigned_to_name?.charAt(0) ?? "U"}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">
                          {deal.assigned_to_name ?? "Unassigned"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Current deal owner
                        </p>
                      </div>
                    </div>
                  </div>

                  {can("deals:assign") && (
                    <Popover open={assignOpen} onOpenChange={setAssignOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          Transfer Deal
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[320px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search user..." />

                          <CommandEmpty>No user found.</CommandEmpty>

                          {Object.entries(groupedUsers).map(([role, users]) => (
                            <CommandGroup key={role} heading={role}>
                              {users.map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={`${user.fullname} ${user.role}`}
                                  onSelect={async () => {
                                    try {
                                      await assignDeals({
                                        dealIds: [deal.id],
                                        assignedTo: user.id,
                                      });

                                      setDeal({
                                        ...deal,
                                        assigned_to: user.id,
                                        assigned_to_name: user.fullname,
                                      });

                                      toast.success("Deal transferred");
                                    } catch {
                                      toast.error("Transfer failed");
                                    }

                                    setAssignOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      deal.assigned_to === user.id
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />

                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {user.fullname}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                      {user.role}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Activities */}

        <TabsContent value="activities">
          <ActivitiesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>

        {/* Tasks */}

        <TabsContent value="tasks">
          <TasksTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>

        {/* Notes */}
        <TabsContent value="notes">
          <NotesTab entityType="DEAL" entityId={deal.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
