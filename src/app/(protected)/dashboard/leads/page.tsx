"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  getLeads,
  assignLeads,
} from "@/features/leads/leads.service";
import { getAssignableUsers } from "@/shared/services/user.service";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

import { usePermission } from "@/shared/hooks/usePermissions";

type Lead = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone1: string;
  phone2: string;
  company: string;
  source: string;
  status: string;
  customer_created: boolean;
  assigned_to?: number;
};
type AssignableUser = {
  id: number;
  fullname: string;
  role: string;
};

const leadStatuses = [
  "ALL",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "CONVERTED",
  "LOST",
] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");
  const [counts, setCounts] = useState({
    ALL: 0,
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    PROPOSAL: 0,
    NEGOTIATION: 0,
    CONVERTED: 0,
    LOST: 0,
  });
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);

  const [assignUserId, setAssignUserId] = useState<string>("");

  const [assignOpen, setAssignOpen] = useState(false);

  const [assigning, setAssigning] = useState(false);

  const { can } = usePermission();

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads({
        status,
        search,
      });

      setLeads(data.leads);

      setCounts(data.counts);
    } catch {
      toast.error("Failed to fetch leads");
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

  const groupedUsers = useMemo(() => {
    return assignableUsers.reduce(
      (acc, user) => {
        if (!acc[user.role]) {
          acc[user.role] = [];
        }

        acc[user.role].push(user);

        return acc;
      },
      {} as Record<string, AssignableUser[]>,
    );
  }, [assignableUsers]);

  const handleAssign = async () => {
    if (!assignUserId || selectedLeads.length === 0) return;

    try {
      setAssigning(true);

      await assignLeads({
        leadIds: selectedLeads,
        assignedTo: Number(assignUserId),
      });

      toast.success("Leads assigned successfully");

      setSelectedLeads([]);

      setAssignUserId("");

      fetchLeads();
    } catch {
      toast.error("Failed to assign leads");
    } finally {
      setAssigning(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status]);

  useEffect(() => {
    if (can("leads:assign")) loadAssignableUsers();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLeads();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONVERTED":
        return "default";

      case "LOST":
        return "destructive";

      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>

          <p className="text-muted-foreground">Manage and track all leads</p>
        </div>

        <Link href="/dashboard/leads/create">
          <Button>Create Lead</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>

          <CardDescription>
            {leads.length} lead
            {leads.length !== 1 && "s"} found
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs value={status} onValueChange={setStatus}>
            <TabsList className="flex w-full justify-start overflow-x-auto">
              {leadStatuses.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item.charAt(0) + item.slice(1).toLowerCase()} (
                  {counts[item] ?? 0})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex gap-3">
            <Input
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button variant="outline" onClick={fetchLeads}>
              Refresh
            </Button>
          </div>

          {selectedLeads.length > 0 && (
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <span className="font-medium">
                    {selectedLeads.length} lead(s) selected
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Popover open={assignOpen} onOpenChange={setAssignOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[280px] justify-between"
                      >
                        {assignUserId
                          ? assignableUsers.find(
                              (user) => String(user.id) === assignUserId,
                            )?.fullname
                          : "Assign User"}

                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />

                        <CommandEmpty>No user found</CommandEmpty>

                        {Object.entries(groupedUsers).map(([role, users]) => (
                          <CommandGroup key={role} heading={role}>
                            {users.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={`${user.fullname} ${user.role}`}
                                onSelect={() => {
                                  setAssignUserId(String(user.id));

                                  setAssignOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    assignUserId === String(user.id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />

                                {user.fullname}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Button
                    disabled={!assignUserId || assigning}
                    onClick={handleAssign}
                  >
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="flex justify-center py-12">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-medium">No leads found</h3>

              <p className="text-sm text-muted-foreground">
                Create your first lead to get started.
              </p>

              <Link href="/dashboard/leads/create">
                <Button>Create Lead</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    {can("leads:assign") && (
                      <th className="w-12 p-4">
                        <Checkbox
                          checked={
                            leads.length > 0 &&
                            selectedLeads.length === leads.length
                          }
                          onCheckedChange={(checked) => {
                            setSelectedLeads(
                              checked ? leads.map((lead) => lead.id) : [],
                            );
                          }}
                        />
                      </th>
                    )}

                    <th className="p-4 text-left font-medium">Name</th>

                    <th className="p-4 text-left font-medium">Email</th>

                    <th className="p-4 text-left font-medium">Phone</th>

                    <th className="p-4 text-left font-medium">Company</th>

                    <th className="p-4 text-left font-medium">Status</th>

                    <th className="p-4 text-left font-medium">Source</th>

                    {/* <th className="p-4 text-left font-medium">Assigned To</th> */}

                    <th className="p-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t">
                      {can("leads:assign") && (
                        <td className="p-4">
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLeads((prev) => [...prev, lead.id]);
                              } else {
                                setSelectedLeads((prev) =>
                                  prev.filter((id) => id !== lead.id),
                                );
                              }
                            }}
                          />
                        </td>
                      )}
                      <td className="p-4">
                        <div className="font-medium">
                          {lead.fname} {lead.lname}
                        </div>
                      </td>

                      <td className="p-4">{lead.email}</td>

                      <td className="p-4">{lead.phone1}, {lead.phone2}</td>

                      <td className="p-4">{lead.company || "-"}</td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <Badge variant={getStatusVariant(lead.status)}>
                            {lead.status}
                          </Badge>

                          {lead.customer_created && (
                            <Badge variant="outline">Customer</Badge>
                          )}
                        </div>
                      </td>

                      <td className="p-4">{lead.source}</td>

                      {/* <td className="p-4">
                        {lead.assigned_to_name ?? (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                      </td> */}

                      <td className="p-4 text-right">
                        <Link href={`/dashboard/leads/${lead.id}`}>
                           <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
