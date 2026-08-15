"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AssignableUser } from "@/features/users/users.types";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

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

interface QuickAssignProps {
  entityName: string;

  canAssign: boolean;

  onAssign: (
    user: AssignableUser
  ) => void | Promise<void>;
}

export default function QuickAssign({
  entityName,
  canAssign,
  onAssign,
}: QuickAssignProps) {
  const [open, setOpen] = useState(false);

  const [assignableUsers, setAssignableUsers] =
    useState<AssignableUser[]>([]);

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  const [assigning, setAssigning] =
    useState(false);

  const groupedUsers = useMemo(() => {
    return assignableUsers.reduce(
      (acc, user) => {
        if (!acc[user.role]) {
          acc[user.role] = [];
        }

        acc[user.role].push(user);

        return acc;
      },
      {} as Record<string, AssignableUser[]>
    );
  }, [assignableUsers]);

  const loadAssignableUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await getAssignableUsers();

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

  if (!canAssign) {
    return null;
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={assigning}
          className="gap-2"
        >
          {assigning && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          Assign {entityName}
          
          {!assigning && (
            <ChevronsUpDown className="h-4 w-4 opacity-70" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[320px] p-0"
        align="end"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${entityName.toLowerCase()} owner...`}
          />

          <CommandEmpty>
            No user found.
          </CommandEmpty>

          {loadingUsers ? (
            <div className="p-4 text-sm text-muted-foreground">
              Loading users...
            </div>
          ) : (
            Object.entries(groupedUsers).map(
              ([role, users]) => (
                <CommandGroup
                  key={role}
                  heading={role}
                >
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={`${user.fullname} ${user.role}`}
                      disabled={assigning}
                      onSelect={async () => {
                        try {
                          setAssigning(true);

                          await Promise.resolve(
                            onAssign(user)
                          );

                          setOpen(false);
                        } catch {
                          // Parent handles the actual error
                        } finally {
                          setAssigning(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 opacity-0"
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
              )
            )
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}