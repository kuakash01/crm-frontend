"use client";

import { useRouter } from "next/navigation";
import { Plus, UserRoundPlus, Briefcase, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermission } from "@/shared/hooks/usePermissions";

export default function QuickActionDock() {
  const router = useRouter();
  const { can } = usePermission();

  const canCreateAny =
    can("leads:create") || can("deals:create") || can("tasks:create");

  if (!canCreateAny) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="gap-1.5 font-medium shadow-xs transition-transform active:scale-95 sm:h-9"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 shadow-lg bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-xl">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Quick Create
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {can("leads:create") && (
          <DropdownMenuItem
            className="cursor-pointer gap-2 hover:bg-muted/50 transition-colors"
            onClick={() => router.push("/dashboard/leads/create")}
          >
            <UserRoundPlus className="h-4 w-4 text-blue-500" />
            <span>New Lead</span>
          </DropdownMenuItem>
        )}
        {can("deals:create") && (
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => router.push("/dashboard/deals/create")}
          >
            <Briefcase className="h-4 w-4 text-purple-500" />
            <span>New Deal</span>
          </DropdownMenuItem>
        )}
        {can("tasks:create") && (
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => router.push("/dashboard/tasks/create")}
          >
            <CheckSquare className="h-4 w-4 text-amber-500" />
            <span>New Task</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
