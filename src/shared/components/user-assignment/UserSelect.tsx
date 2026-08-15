"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { AssignableUser } from "@/features/users/users.types";
import { getAssignableUsers } from "@/shared/services/user.service";

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

interface UserSelectProps {
  value?: number;
  onChange: (user: AssignableUser) => void;
  canAssign: boolean;
}

export default function UserSelect({
  value,
  onChange,
  canAssign,
}: UserSelectProps) {
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState<AssignableUser[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  const groupedUsers = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        if (!acc[user.role]) {
          acc[user.role] = [];
        }

        acc[user.role].push(user);

        return acc;
      },
      {} as Record<string, AssignableUser[]>
    );
  }, [users]);

  const selectedUser = users.find(
    (user) => user.id === value
  );

  /*
   * Load assignable users
   */
  useEffect(() => {
    if (!canAssign) return;

    const loadUsers = async () => {
      try {
        setLoading(true);

        const data = await getAssignableUsers();

        setUsers(data);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [canAssign]);

  /*
   * Automatically select the only available user
   */
  useEffect(() => {
    if (
      !loading &&
      users.length === 1 &&
      value !== users[0].id
    ) {
      onChange(users[0]);
    }
  }, [users, loading, value, onChange]);

  if (!canAssign) {
    return null;
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex h-10 items-center rounded-md border bg-muted/30 px-3">
        <span className="text-sm text-muted-foreground">
          Loading users...
        </span>
      </div>
    );
  }

  /*
   * No users available
   */
  if (users.length === 0) {
    return (
      <div className="rounded-md border border-dashed px-3 py-2">
        <span className="text-sm text-muted-foreground">
          No users available
        </span>
      </div>
    );
  }

  /*
   * Only one user
   */
  if (users.length === 1) {
    const user = users[0];

    return (
      <div className="flex h-10 items-center justify-between rounded-md border bg-muted/30 px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {user.fullname
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {user.fullname}
            </span>

            <span className="text-xs text-muted-foreground">
              (Self)
            </span>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Multiple users
   */
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedUser
            ? selectedUser.fullname
            : "Select user"}

          <ChevronsUpDown className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[320px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search user..." />

          <CommandEmpty>
            No user found.
          </CommandEmpty>

          {Object.entries(groupedUsers).map(
            ([role, roleUsers]) => (
              <CommandGroup
                key={role}
                heading={role}
              >
                {roleUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={`${user.fullname} ${user.role}`}
                    onSelect={() => {
                      onChange(user);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id
                          ? "opacity-100"
                          : "opacity-0"
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
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}