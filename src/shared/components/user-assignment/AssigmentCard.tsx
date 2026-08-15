"use client";

import { useMemo, useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { AssignableUser } from "@/features/users/users.types";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { getAssignableUsers } from "@/shared/services/user.service";
import { toast } from "sonner";

interface AssignmentCardProps {
  entityName: string;
  assignedUser: {
    id: number | null;
    name: string | null;
  };

  canAssign: boolean;

  onAssign: (user: AssignableUser) => void | Promise<void>;
}

export default function AssignmentCard({
  entityName,
  assignedUser,
  canAssign,
  onAssign,
}: AssignmentCardProps) {
  const [open, setOpen] = useState(false);

  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [assigning, setAssigning] = useState(false);

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

  const loadAssignableUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await getAssignableUsers();
      console.log("assignable users details", data);

      setAssignableUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };
  useEffect(() => {
    if (canAssign) {
      loadAssignableUsers();
    }
  }, [canAssign]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{entityName} Assignment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl  text-primary-foreground">
              {assignedUser.name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div className="min-w-0 flex-1">
              <div>
                <p className="truncate font-semibold">
                  {assignedUser.name ?? "Unassigned"}
                </p>
                {/* <p>{assignedUser.role}</p> */}
              </div>

              <p className="text-sm text-muted-foreground">
                Current {entityName.toLowerCase()} owner
              </p>
            </div>
          </div>
        </div>

        {canAssign && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Transfer {entityName}
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[320px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search user..." />

                <CommandEmpty>No user found.</CommandEmpty>

                {loadingUsers ? (
                  <div className="p-4 text-sm text-muted-foreground">
                    Loading users...
                  </div>
                ) : (
                  Object.entries(groupedUsers).map(([role, users]) => (
                    <CommandGroup key={role} heading={role}>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={`${user.fullname} ${user.role}`}
                          onSelect={async () => {
                            try {
                              setAssigning(true);

                              await Promise.resolve(onAssign(user));

                              setOpen(false);
                            } finally {
                              setAssigning(false);
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              assignedUser.id === user.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />

                          <div className="flex flex-col">
                            <span className="font-medium">{user.fullname}</span>

                            <span className="text-xs text-muted-foreground">
                              {user.role}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))
                )}
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
}
