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
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
  assignCustomers,
} from "@/features/customers/customers.service";
import { getAssignableUsers } from "@/shared/services/user.service";


import CustomerDeals from "@/features/customers/components/CustomerDeals";

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

import { AssignableUser } from "@/features/users/users.types";
import { CustomerStatus, Customer } from "@/features/customers/customer.types";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);

  const [assignOpen, setAssignOpen] = useState(false);

  const { can } = usePermission();


  const customerStatuses: CustomerStatus[] = [
    "ACTIVE",
    "ON_HOLD",
    "INACTIVE",
    "CHURNED",
  ];

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

  const fetchCustomer = async () => {
    try {
      const data = await getCustomerById(Number(id));

      setCustomer(data);
    } catch {
      toast.error("Failed to load Customer");
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
    fetchCustomer();
    if (can("customers:assign")) loadAssignableUsers();
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

      toast.success("Details updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update");
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
    return <div className="p-6">Loading Customer...</div>;
  }

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
  }

  return (
    <div className="mx-auto ">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {customer.fname} {customer.lname}
          </h1>

          <p className="text-muted-foreground">Customer #{customer.id}</p>
        </div>
      </div>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>

            <TabsTrigger value="activities">Activities</TabsTrigger>

            <TabsTrigger value="notes">Notes</TabsTrigger>

            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>First Name</Label>

                      <Input
                        // disabled={customer.customer_created}
                        value={customer.fname}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            fname: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Last Name</Label>

                      <Input
                        // disabled={lead.customer_created}
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

                  <div>
                    <Label>Email</Label>

                    <Input
                      // disabled={lead.customer_created}
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Primary Phone</Label>

                      <Input
                        // disabled={lead.customer_created}
                        value={customer.phone1}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            phone1: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Secondary Phone</Label>

                      <Input
                        // disabled={lead.customer_created}
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

                  <div>
                    <Label>Company</Label>

                    <Input
                      // disabled={lead.customer_created}
                      value={customer.company ?? ""}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  {can("customers:update") && (
                    <Button onClick={handleSaveDetails} disabled={saving}>
                      Save Details
                    </Button>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Status</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Select
                      // disabled={lead.customer_created}
                      value={customer.status}
                      onValueChange={async (value) => {
                        try {
                          await updateCustomerStatus(customer.id, value);

                          setCustomer({
                            ...customer,
                            status: value as CustomerStatus,
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
                        {customerStatuses.map((status) => (
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
                    <CardTitle>Customer Assignment</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Current Owner
                    </div>

                    <div className="font-medium">
                      {customer.assigned_to_name ?? "Unassigned"}
                    </div>

                    {can("customers:assign") && (
                      <Popover open={assignOpen} onOpenChange={setAssignOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {customer.assigned_to
                              ? assignableUsers.find(
                                  (user) => user.id === customer.assigned_to,
                                )?.fullname
                              : "Transfer Customer"}

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
                                          await assignCustomers({
                                            customerIds: [customer.id],
                                            assignedTo: user.id,
                                          });

                                          setCustomer({
                                            ...customer,
                                            assigned_to: user.id,
                                            assigned_to_name: user.fullname,
                                          });

                                          toast.success("Customer transferred");
                                        } catch {
                                          toast.error("Transfer failed");
                                        }

                                        setAssignOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          customer.assigned_to === user.id
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

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Lead Source</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p>{customer.source}</p>
                  </CardContent>
                </Card> */}

                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>ID:</strong> {customer.id}
                    </p>

                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(customer.created_at).toLocaleString()}
                    </p>

                    <p>
                      <strong>Updated:</strong>{" "}
                      {new Date(customer.updated_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {true && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            Delete Customer
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Customer?
                            </AlertDialogTitle>

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
            <ActivitiesTab entityType="CUSTOMER" entityId={customer.id} />
          </TabsContent>

          <TabsContent value="notes">
            <TabsContent value="notes">
              <NotesTab entityType="CUSTOMER" entityId={customer.id} />
            </TabsContent>
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTab entityType="CUSTOMER" entityId={customer.id} />
          </TabsContent>

          <TabsContent value="deals">
            <CustomerDeals customerId={customer.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
