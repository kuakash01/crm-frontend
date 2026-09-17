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
  ExternalLink,
  Calendar,
  Clock,
  Sparkles,
  Shield,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

import { usePermission } from "@/shared/hooks/usePermissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
  assignCustomers,
} from "@/features/customers/customers.service";

import CustomerDeals from "@/features/customers/components/CustomerDeals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "@/features/activities/component/ActivitiesTab";
import NotesTab from "@/features/notes/component/NotesTab";
import TasksTab from "@/features/tasks/component/TasksTab";

import { CustomerStatus, Customer } from "@/features/customers/customer.types";
import AssignmentCard from "@/shared/components/user-assignment/AssigmentCard";
import { DetailPageSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

const STATUS_CONFIG: Record<
  CustomerStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  ACTIVE: {
    label: "Active Account",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
  ON_HOLD: {
    label: "On Hold",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    dotClass: "bg-amber-500",
  },
  INACTIVE: {
    label: "Inactive",
    badgeClass: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    dotClass: "bg-slate-500",
  },
  CHURNED: {
    label: "Churned",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    dotClass: "bg-rose-500",
  },
};

const customerStatuses: CustomerStatus[] = [
  "ACTIVE",
  "ON_HOLD",
  "INACTIVE",
  "CHURNED",
];

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [originalCustomer, setOriginalCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const { can } = usePermission();

  const fetchCustomer = async () => {
    try {
      const data = await getCustomerById(Number(id));
      setCustomer(data);
      setOriginalCustomer(data);
    } catch {
      toast.error("Failed to load Customer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleSaveDetails = async () => {
    if (!customer) return;

    try {
      setSaving(true);
      await updateCustomer(customer.id, {
        fname: customer.fname,
        lname: customer.lname,
        email: customer.email,
        phone1: customer.phone1,
        phone2: customer.phone2 || null,
        company: customer.company,
      });

      setOriginalCustomer(customer);
      setEditing(false);
      toast.success("Customer details updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!customer) return;

    try {
      setDeleting(true);
      await deleteCustomer(customer.id);
      toast.success("Customer deleted successfully");
      router.push("/dashboard/customers");
    } catch {
      toast.error("Failed to delete customer");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!customer) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Customer not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/customers")}>
          Back to Customers
        </Button>
      </div>
    );
  }

  const currentStatusMeta =
    STATUS_CONFIG[customer.status as CustomerStatus] || STATUS_CONFIG.ACTIVE;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/customers"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Customers
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {customer.fname} {customer.lname}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              Customer #{customer.id}
            </Badge>
            <Badge variant="outline" className={currentStatusMeta.badgeClass}>
              <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${currentStatusMeta.dotClass}`} />
              {currentStatusMeta.label}
            </Badge>
            {customer.created_from === "LEAD" && customer.lead_id ? (
              <Link href={`/dashboard/leads/${customer.lead_id}`}>
                <Badge
                  variant="secondary"
                  className="hover:bg-muted transition-colors gap-1 text-xs"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  Origin: Lead #{customer.lead_id}
                  <ExternalLink className="h-3 w-3 ml-0.5" />
                </Badge>
              </Link>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Direct Customer
              </Badge>
            )}
          </div>

          {/* Quick Contact Chips Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {customer.email && (
              <a
                href={`mailto:${customer.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>{customer.email}</span>
              </a>
            )}
            {customer.phone1 && (
              <a
                href={`tel:${customer.phone1}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>{customer.phone1}</span>
              </a>
            )}
            {customer.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>{customer.company}</span>
              </span>
            )}
            {customer.assigned_to_name && (
              <span className="inline-flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-primary" />
                <span>Manager: {customer.assigned_to_name}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {!editing && can("customers:update") && (
            <Button
              onClick={() => setEditing(true)}
              size="sm"
              className="gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Customer
            </Button>
          )}
          {editing && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (originalCustomer) {
                    setCustomer(originalCustomer);
                  }
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSaveDetails}
                disabled={saving}
                className="min-w-[120px]"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 border border-border/40">
          <TabsTrigger value="details">Overview & Details</TabsTrigger>
          <TabsTrigger value="deals">Deals & Opportunities</TabsTrigger>
          <TabsTrigger value="activities">Activities Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview & Details */}
        <TabsContent value="details" className="space-y-6 mt-0">
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {/* Left 2 Columns: Information Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Customer Profile</CardTitle>
                    <CardDescription className="mt-0.5">
                      {editing
                        ? "Modify customer identity and communications data."
                        : "Account information and contact parameters."}
                    </CardDescription>
                  </div>
                  {!editing && can("customers:update") && (
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
                  {/* Section 1: Personal Info */}
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
                          value={customer.fname}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              fname: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Last Name</Label>
                        <Input
                          readOnly={!editing}
                          className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                          value={customer.lname}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              lname: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact Details */}
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
                          value={customer.email}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Primary Phone</Label>
                          <Input
                            readOnly={!editing}
                            className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                            value={customer.phone1}
                            onChange={(e) =>
                              setCustomer({
                                ...customer,
                                phone1: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Secondary Phone (Optional)</Label>
                          <Input
                            readOnly={!editing}
                            className={!editing ? "h-10 bg-muted/40 cursor-default border-border/40" : "h-10"}
                            value={customer.phone2 ?? ""}
                            onChange={(e) =>
                              setCustomer({
                                ...customer,
                                phone2: e.target.value,
                              })
                            }
                          />
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
                        value={customer.company ?? ""}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Bottom Edit Action Controls */}
                  {editing && (
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (originalCustomer) {
                            setCustomer(originalCustomer);
                          }
                          setEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSaveDetails}
                        disabled={saving}
                        className="min-w-[130px]"
                      >
                        {saving ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right 1 Column: Intelligence Sidebar */}
            <div className="space-y-6">
              {/* Account Status Card */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold flex items-center justify-between">
                    <span>Account Status</span>
                    <Badge variant="outline" className={currentStatusMeta.badgeClass}>
                      {currentStatusMeta.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Lifecycle State</Label>
                    <Select
                      disabled={editing}
                      value={customer.status}
                      onValueChange={async (value) => {
                        try {
                          await updateCustomerStatus(customer.id, value);
                          setCustomer({
                            ...customer,
                            status: value as CustomerStatus,
                          });
                          toast.success("Account status updated successfully");
                        } catch {
                          toast.error("Failed to update status");
                        }
                      }}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {customerStatuses.map((status) => (
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
                </CardContent>
              </Card>

              {/* Assignment Card */}
              <AssignmentCard
                entityName="Customer"
                assignedUser={{
                  id: Number(customer.assigned_to),
                  name: customer.assigned_to_name ?? null,
                }}
                canAssign={can("customers:assign") ?? false}
                onAssign={async (user) => {
                  try {
                    await assignCustomers({
                      customerIds: [customer.id],
                      assignedTo: user.id,
                    });

                    setCustomer((prev) =>
                      prev
                        ? {
                            ...prev,
                            assigned_to: user.id,
                            assigned_to_name: user.fullname,
                          }
                        : prev
                    );

                    toast.success("Account transferred successfully");
                  } catch {
                    toast.error("Transfer failed");
                  }
                }}
              />

              {/* Origin & Lineage Card */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-sm font-semibold">Origin & Attribution</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Source Type</span>
                    <Badge variant="secondary" className="text-xs">
                      {customer.created_from === "LEAD" ? "Converted Lead" : "Direct Intake"}
                    </Badge>
                  </div>
                  {customer.created_from === "LEAD" && customer.lead_id && (
                    <div className="flex items-center justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Converted From</span>
                      <Link
                        href={`/dashboard/leads/${customer.lead_id}`}
                        className="font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Lead #{customer.lead_id}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Customer ID</span>
                    <span className="font-mono text-foreground">CUST-{customer.id.toString().padStart(5, "0")}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Client Since</span>
                    <span className="text-foreground">
                      {new Date(customer.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">Last Record Activity</span>
                    <span className="text-foreground">
                      {new Date(customer.updated_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              {can("customers:delete") && (
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
                          Delete Customer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Customer #{customer.id}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {customer.fname} {customer.lname} and all associated deal histories, activities, and tasks. This action cannot be undone.
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

        {/* Tab 2: Deals & Opportunities */}
        <TabsContent value="deals" className="mt-0">
          <CustomerDeals customerId={customer.id} />
        </TabsContent>

        {/* Tab 3: Activities Timeline */}
        <TabsContent value="activities" className="mt-0">
          <ActivitiesTab entityType="CUSTOMER" entityId={customer.id} />
        </TabsContent>

        {/* Tab 4: Notes */}
        <TabsContent value="notes" className="mt-0">
          <NotesTab entityType="CUSTOMER" entityId={customer.id} />
        </TabsContent>

        {/* Tab 5: Tasks */}
        <TabsContent value="tasks" className="mt-0">
          <TasksTab
            entityType="CUSTOMER"
            entityId={customer.id}
            assignedTo={customer.assigned_to ?? null}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
