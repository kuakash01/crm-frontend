"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  UserRound,
  Users,
  Briefcase,
  Package,
  CheckSquare,
  Shield,
  Settings,
  PlusCircle,
  Sun,
  Moon,
  Globe,
  Search,
  Loader2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { usePermission } from "@/shared/hooks/usePermissions";
import { searchWorkspace } from "@/features/search/search.service";
import { UniversalSearchResults, SearchItem } from "@/features/search/search.types";

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandPalette({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UniversalSearchResults | null>(null);

  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { can } = usePermission();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? setControlledOpen! : setInternalOpen;

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  // Debounced search query
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchWorkspace(trimmed);
        setSearchResults(data);
      } catch (err) {
        console.error("Universal search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults(null);
      setIsSearching(false);
    }
  }, [isOpen]);

  const handleSelect = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  const hasLiveResults = Boolean(
    searchResults && searchResults.total > 0
  );

  const isQueryActive = searchQuery.trim().length > 0;

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Universal Workspace Search"
      description="Search leads, deals, customers, tasks, services, or run quick actions"
      shouldFilter={!isQueryActive}
    >
      <div className="relative">
        <CommandInput
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search leads, deals, customers, tasks, or jump to page... (Ctrl+K)"
        />
        {isSearching && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}
      </div>

      <CommandList className="max-h-[420px] overflow-y-auto">
        {/* Empty state when searching */}
        {isQueryActive && !isSearching && searchResults && searchResults.total === 0 && (
          <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              No CRM records found for "{searchQuery}"
            </p>
            <p className="text-xs mt-1">
              Try searching by name, email, company, deal title, or task description.
            </p>
          </CommandEmpty>
        )}

        {/* Live Search Results */}
        {isQueryActive && searchResults && (
          <>
            {/* Deals Group */}
            {searchResults.results.deals.length > 0 && (
              <CommandGroup heading={`Deals (${searchResults.results.deals.length})`}>
                {searchResults.results.deals.map((deal) => (
                  <CommandItem
                    key={`deal-${deal.id}`}
                    value={`deal-${deal.title}-${deal.id}`}
                    onSelect={() => handleSelect(() => router.push(deal.url))}
                    className="cursor-pointer py-2"
                  >
                    <Briefcase className="mr-2 h-4 w-4 text-purple-500 shrink-0" />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <span className="font-medium text-foreground truncate">
                        {deal.title}
                      </span>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {deal.subtitle && (
                          <span className="text-xs font-semibold text-muted-foreground">
                            {deal.subtitle}
                          </span>
                        )}
                        {deal.badge && (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-bold uppercase py-0 h-4 border-purple-500/30 text-purple-600 dark:text-purple-400"
                          >
                            {deal.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Leads Group */}
            {searchResults.results.leads.length > 0 && (
              <CommandGroup heading={`Leads (${searchResults.results.leads.length})`}>
                {searchResults.results.leads.map((lead) => (
                  <CommandItem
                    key={`lead-${lead.id}`}
                    value={`lead-${lead.title}-${lead.subtitle}-${lead.id}`}
                    onSelect={() => handleSelect(() => router.push(lead.url))}
                    className="cursor-pointer py-2"
                  >
                    <UserRound className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{lead.title}</p>
                        {lead.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {lead.subtitle}
                          </p>
                        )}
                      </div>
                      {lead.badge && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold uppercase shrink-0 ml-2 py-0 h-4"
                        >
                          {lead.badge}
                        </Badge>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Customers Group */}
            {searchResults.results.customers.length > 0 && (
              <CommandGroup heading={`Customers (${searchResults.results.customers.length})`}>
                {searchResults.results.customers.map((cust) => (
                  <CommandItem
                    key={`cust-${cust.id}`}
                    value={`customer-${cust.title}-${cust.subtitle}-${cust.id}`}
                    onSelect={() => handleSelect(() => router.push(cust.url))}
                    className="cursor-pointer py-2"
                  >
                    <Users className="mr-2 h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{cust.title}</p>
                        {cust.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {cust.subtitle}
                          </p>
                        )}
                      </div>
                      {cust.badge && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold uppercase shrink-0 ml-2 py-0 h-4"
                        >
                          {cust.badge}
                        </Badge>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Tasks Group */}
            {searchResults.results.tasks.length > 0 && (
              <CommandGroup heading={`Tasks (${searchResults.results.tasks.length})`}>
                {searchResults.results.tasks.map((task) => (
                  <CommandItem
                    key={`task-${task.id}`}
                    value={`task-${task.title}-${task.id}`}
                    onSelect={() => handleSelect(() => router.push(task.url))}
                    className="cursor-pointer py-2"
                  >
                    <CheckSquare className="mr-2 h-4 w-4 text-amber-500 shrink-0" />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{task.title}</p>
                        {task.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {task.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {task.badge && (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold py-0 h-4"
                          >
                            {task.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Services Group */}
            {searchResults.results.services.length > 0 && (
              <CommandGroup heading={`Services (${searchResults.results.services.length})`}>
                {searchResults.results.services.map((srv) => (
                  <CommandItem
                    key={`srv-${srv.id}`}
                    value={`service-${srv.title}-${srv.id}`}
                    onSelect={() => handleSelect(() => router.push(srv.url))}
                    className="cursor-pointer py-2"
                  >
                    <Package className="mr-2 h-4 w-4 text-indigo-500 shrink-0" />
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <span className="font-medium text-foreground truncate">
                        {srv.title}
                      </span>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {srv.subtitle && (
                          <span className="text-xs font-semibold text-muted-foreground">
                            {srv.subtitle}
                          </span>
                        )}
                        {srv.badge && (
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold py-0 h-4"
                          >
                            {srv.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandSeparator />

            {/* Jump into full filtered pages */}
            <CommandGroup heading="Search In Full Module Lists">
              <CommandItem
                onSelect={() =>
                  handleSelect(() =>
                    router.push(`/dashboard/deals?search=${encodeURIComponent(searchQuery)}`)
                  )
                }
              >
                <Search className="mr-2 h-4 w-4 text-purple-500" />
                <span>Filter all Deals for "{searchQuery}"</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() =>
                    router.push(`/dashboard/leads?search=${encodeURIComponent(searchQuery)}`)
                  )
                }
              >
                <Search className="mr-2 h-4 w-4 text-blue-500" />
                <span>Filter all Leads for "{searchQuery}"</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() =>
                    router.push(`/dashboard/customers?search=${encodeURIComponent(searchQuery)}`)
                  )
                }
              >
                <Search className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Filter all Customers for "{searchQuery}"</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() =>
                    router.push(`/dashboard/tasks?search=${encodeURIComponent(searchQuery)}`)
                  )
                }
              >
                <Search className="mr-2 h-4 w-4 text-amber-500" />
                <span>Filter all Tasks for "{searchQuery}"</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {/* Default Quick Navigation & Actions when no query entered */}
        {!isQueryActive && (
          <>
            <CommandGroup heading="Quick Navigation">
              <CommandItem
                onSelect={() => handleSelect(() => router.push("/dashboard"))}
              >
                <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                <span>Dashboard Overview</span>
                <CommandShortcut>G D</CommandShortcut>
              </CommandItem>

              {can("leads:read") && (
                <CommandItem
                  onSelect={() => handleSelect(() => router.push("/dashboard/leads"))}
                >
                  <UserRound className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Leads Management</span>
                  <CommandShortcut>G L</CommandShortcut>
                </CommandItem>
              )}

              {can("customers:read") && (
                <CommandItem
                  onSelect={() =>
                    handleSelect(() => router.push("/dashboard/customers"))
                  }
                >
                  <Users className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Customers Directory</span>
                  <CommandShortcut>G C</CommandShortcut>
                </CommandItem>
              )}

              {can("deals:read") && (
                <CommandItem
                  onSelect={() => handleSelect(() => router.push("/dashboard/deals"))}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-purple-500" />
                  <span>Deals & Sales Pipeline</span>
                  <CommandShortcut>G P</CommandShortcut>
                </CommandItem>
              )}

              {can("tasks:read") && (
                <CommandItem
                  onSelect={() => handleSelect(() => router.push("/dashboard/tasks"))}
                >
                  <CheckSquare className="mr-2 h-4 w-4 text-amber-500" />
                  <span>Tasks & Follow-ups</span>
                  <CommandShortcut>G T</CommandShortcut>
                </CommandItem>
              )}

              {can("services:read") && (
                <CommandItem
                  onSelect={() =>
                    handleSelect(() => router.push("/dashboard/services"))
                  }
                >
                  <Package className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Services Catalog</span>
                </CommandItem>
              )}

              {can("users:read") && (
                <CommandItem
                  onSelect={() => handleSelect(() => router.push("/dashboard/users"))}
                >
                  <Shield className="mr-2 h-4 w-4 text-rose-500" />
                  <span>Users & Permissions</span>
                </CommandItem>
              )}

              <CommandItem
                onSelect={() =>
                  handleSelect(() => router.push("/dashboard/settings"))
                }
              >
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Settings</span>
                <CommandShortcut>G S</CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Quick Actions">
              {can("leads:create") && (
                <CommandItem
                  onSelect={() =>
                    handleSelect(() => router.push("/dashboard/leads/create"))
                  }
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Create New Lead</span>
                  <CommandShortcut>N L</CommandShortcut>
                </CommandItem>
              )}

              {can("deals:create") && (
                <CommandItem
                  onSelect={() =>
                    handleSelect(() => router.push("/dashboard/deals/create"))
                  }
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span>Create New Deal</span>
                  <CommandShortcut>N D</CommandShortcut>
                </CommandItem>
              )}

              {can("tasks:create") && (
                <CommandItem
                  onSelect={() =>
                    handleSelect(() => router.push("/dashboard/tasks/create"))
                  }
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-amber-600" />
                  <span>Create New Task</span>
                  <CommandShortcut>N T</CommandShortcut>
                </CommandItem>
              )}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Appearance & Preferences">
              <CommandItem
                onSelect={() =>
                  handleSelect(() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  )
                }
              >
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="mr-2 h-4 w-4 text-slate-700" />
                )}
                <span>Toggle Theme ({theme === "dark" ? "Light" : "Dark"})</span>
              </CommandItem>

              <CommandItem
                onSelect={() => handleSelect(() => router.push("/"))}
              >
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Go to Public Marketing Site</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
