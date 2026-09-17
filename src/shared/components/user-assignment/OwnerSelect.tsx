"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, User as UserIcon, Shield, Search } from "lucide-react";
import { AssignableUser } from "@/features/users/users.types";
import { getAssignableUsers } from "@/shared/services/user.service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  CommandList,
} from "@/components/ui/command";

export interface OwnerSelectProps {
  value: number | null | undefined;
  onChange: (user: AssignableUser | null) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  allowClear?: boolean;
}

export default function OwnerSelect({
  value,
  onChange,
  label = "Assigned Owner",
  placeholder = "Select team member...",
  helperText,
  badge,
  disabled = false,
  required = false,
  className,
  allowClear = false,
}: OwnerSelectProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<AssignableUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await getAssignableUsers();
        if (isMounted) {
          setUsers(data || []);
        }
      } catch (err) {
        console.error("Failed to load assignable users:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedUser = useMemo(() => {
    if (!value) return null;
    return users.find((u) => u.id === value) || null;
  }, [users, value]);

  const groupedUsers = useMemo(() => {
    return users.reduce((acc, user) => {
      const roleKey = user.role || "Team Members";
      if (!acc[roleKey]) {
        acc[roleKey] = [];
      }
      acc[roleKey].push(user);
      return acc;
    }, {} as Record<string, AssignableUser[]>);
  }, [users]);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between gap-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <UserIcon className="h-3.5 w-3.5 text-primary" />
            <span>{label}</span>
            {required && <span className="text-destructive">*</span>}
          </Label>
          {badge}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full h-11 justify-between px-3 font-normal border-border/60 bg-background hover:bg-muted/40 transition-colors",
              !selectedUser && "text-muted-foreground"
            )}
          >
            {selectedUser ? (
              <div className="flex items-center gap-2.5 truncate">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
                  {getInitials(selectedUser.fullname)}
                </div>
                <span className="font-medium text-foreground truncate">
                  {selectedUser.fullname}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] font-normal py-0 px-1.5 h-4 ml-1 bg-muted/80 text-muted-foreground"
                >
                  {selectedUser.role}
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="h-4 w-4 opacity-50" />
                <span>{placeholder}</span>
              </div>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] p-0 shadow-lg border-border/60" align="start">
          <Command>
            <CommandInput placeholder="Search member by name or role..." />
            <CommandList>
              <CommandEmpty className="p-4 text-center text-xs text-muted-foreground">
                {loading ? "Loading team members..." : "No team members found."}
              </CommandEmpty>

              {allowClear && selectedUser && (
                <CommandGroup>
                  <CommandItem
                    value="unassigned clear"
                    onSelect={() => {
                      onChange(null);
                      setOpen(false);
                    }}
                    className="cursor-pointer text-xs text-muted-foreground"
                  >
                    Unassign / Clear owner
                  </CommandItem>
                </CommandGroup>
              )}

              {Object.entries(groupedUsers).map(([role, roleUsers]) => (
                <CommandGroup key={role} heading={role}>
                  {roleUsers.map((user) => {
                    const isSelected = selectedUser?.id === user.id;
                    return (
                      <CommandItem
                        key={user.id}
                        value={`${user.fullname} ${user.role}`}
                        onSelect={() => {
                          onChange(user);
                          setOpen(false);
                        }}
                        className="cursor-pointer flex items-center justify-between py-2 px-2.5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground border border-border/60"
                            )}
                          >
                            {getInitials(user.fullname)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-foreground truncate">
                              {user.fullname}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {user.role}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {helperText && (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
