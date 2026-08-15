"use client"
import TaskList from "@/features/tasks/component/TaskList";
import { usePermission } from "@/shared/hooks/usePermissions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
  const { can } = usePermission();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="text-muted-foreground">
            Manage activities, follow-ups, and work assigned to your team.
          </p>
        </div>

        {can("tasks:create") && (
          <Link href="/dashboard/tasks/create">
            <Button>Create Task</Button>
          </Link>
        )}
      </div>

      {/* Stats can stay here if you want them */}

      <TaskList />
    </div>
  );
}








// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { MoreHorizontal, Search } from "lucide-react";

// import { toast } from "sonner";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

// import TaskViewSheet from "@/features/tasks/component/TaskViewSheet";

// import { getAllTasks } from "@/features/tasks/tasks.service";

// import { TasksResponse } from "@/features/tasks/tasks.types";
// import { usePermission } from "@/shared/hooks/usePermissions";

// type TaskStatus = "ALL" | "PENDING" | "COMPLETED";

// type EntityType = "ALL" | "LEAD" | "CUSTOMER" | "DEAL" | "GENERAL";

// type TaskPriority = "ALL" | "LOW" | "NORMAL" | "HIGH" | "URGENT";

// export default function TasksPage() {
//   const [loading, setLoading] = useState(true);

//   const { can } = usePermission();

//   const [data, setData] = useState<TasksResponse | null>(null);

//   const [page, setPage] = useState(1);

//   const [search, setSearch] = useState("");

//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const [status, setStatus] = useState<TaskStatus>("ALL");

//   const [entityType, setEntityType] = useState<EntityType>("ALL");

//   const [priority, setPriority] = useState<TaskPriority>("ALL");

//   /*
//    * Selected task for detail sheet
//    */
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

//   const [taskViewOpen, setTaskViewOpen] = useState(false);
//   /*
//    * Debounced search
//    */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search);
//       setPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   /*
//    * Reset page when filters change
//    */
//   useEffect(() => {
//     setPage(1);
//   }, [status, entityType, priority]);

//   /*
//    * Fetch tasks
//    */
//   useEffect(() => {
//     fetchTasks();
//   }, [page, status, entityType, priority, debouncedSearch]);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);

//       const result = await getAllTasks({
//         page,
//         limit: 10,
//         search: debouncedSearch,

//         status: status === "ALL" ? undefined : status,

//         entityType: entityType === "ALL" ? undefined : entityType,

//         priority: priority === "ALL" ? undefined : priority,
//       });

//       setData(result);
//     } catch {
//       toast.error("Failed to load tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Get complete task details
//    */
//   const handleViewTask = (taskId: number) => {
//     setSelectedTaskId(taskId);
//     setTaskViewOpen(true);
//   };

//   const getInitials = (name: string | null) => {
//     if (!name) return "?";

//     return name
//       .split(" ")
//       .map((part) => part[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   };

//   const getPriorityClass = (value: string) => {
//     switch (value) {
//       case "URGENT":
//         return "bg-red-100 text-red-700";

//       case "HIGH":
//         return "bg-orange-100 text-orange-700";

//       case "NORMAL":
//         return "bg-blue-100 text-blue-700";

//       case "LOW":
//         return "bg-muted text-muted-foreground";

//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Tasks</h1>

//           <p className="text-muted-foreground">
//             Manage activities, follow-ups, and work assigned to your team.
//           </p>
//         </div>

//         {can("tasks:create") && (
//           <Link href="/dashboard/tasks/create">
//             <Button>Create Task</Button>
//           </Link>
//         )}
//       </div>

//       {/* Stats */}

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardContent className="p-6">
//             <p className="text-sm text-muted-foreground">Total Tasks</p>

//             <h2 className="mt-2 text-3xl font-bold">
//               {data?.counts.total ?? 0}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <p className="text-sm text-muted-foreground">Pending</p>

//             <h2 className="mt-2 text-3xl font-bold text-amber-600">
//               {data?.counts.pending ?? 0}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <p className="text-sm text-muted-foreground">Completed</p>

//             <h2 className="mt-2 text-3xl font-bold text-emerald-600">
//               {data?.counts.completed ?? 0}
//             </h2>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}

//       <div className="flex flex-col gap-3 xl:flex-row">
//         {/* Search */}

//         <div className="relative flex-1">
//           <Search
//             className="
//               absolute
//               left-3
//               top-3
//               h-4
//               w-4
//               text-muted-foreground
//             "
//           />

//           <Input
//             placeholder="Search tasks, records or users..."
//             value={search}
//             onChange={(event) => setSearch(event.target.value)}
//             className="pl-9"
//           />
//         </div>

//         {/* Status */}

//         <Select
//           value={status}
//           onValueChange={(value) => setStatus(value as TaskStatus)}
//         >
//           <SelectTrigger className="w-full xl:w-[170px]">
//             <SelectValue />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="ALL">All Status</SelectItem>

//             <SelectItem value="PENDING">Pending</SelectItem>

//             <SelectItem value="COMPLETED">Completed</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Related To */}

//         <Select
//           value={entityType}
//           onValueChange={(value) => setEntityType(value as EntityType)}
//         >
//           <SelectTrigger className="w-full xl:w-[180px]">
//             <SelectValue />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="ALL">All Related To</SelectItem>

//             <SelectItem value="LEAD">Leads</SelectItem>

//             <SelectItem value="CUSTOMER">Customers</SelectItem>

//             <SelectItem value="DEAL">Deals</SelectItem>

//             <SelectItem value="GENERAL">General Tasks</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Priority */}

//         <Select
//           value={priority}
//           onValueChange={(value) => setPriority(value as TaskPriority)}
//         >
//           <SelectTrigger className="w-full xl:w-[170px]">
//             <SelectValue />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="ALL">All Priority</SelectItem>

//             <SelectItem value="URGENT">Urgent</SelectItem>

//             <SelectItem value="HIGH">High</SelectItem>

//             <SelectItem value="NORMAL">Normal</SelectItem>

//             <SelectItem value="LOW">Low</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button variant="outline" onClick={fetchTasks}>
//           Refresh
//         </Button>
//       </div>

//       {/* Content */}

//       {loading ? (
//         <Card>
//           <CardContent className="flex justify-center py-12">
//             <span className="text-sm text-muted-foreground">
//               Loading tasks...
//             </span>
//           </CardContent>
//         </Card>
//       ) : data?.tasks.length === 0 ? (
//         /* Empty state */

//         <Card>
//           <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
//             <h3 className="font-medium">
//               {data?.counts.total === 0 ? "No tasks yet" : "No matching tasks"}
//             </h3>

//             <p className="text-sm text-muted-foreground">
//               {data?.counts.total === 0
//                 ? "Create your first task to start managing activities and follow-ups."
//                 : "Try adjusting your search or filters."}
//             </p>

//             {data?.counts.total === 0 && (
//               <Link href="/dashboard/tasks/create">
//                 <Button>Create Task</Button>
//               </Link>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         /* Table */

//         <Card className="overflow-hidden p-0">
//           <Table>
//             <TableHeader className="bg-muted/30">
//               <TableRow>
//                 <TableHead className="w-14">#</TableHead>

//                 <TableHead>Task</TableHead>

//                 <TableHead>Assigned To</TableHead>

//                 <TableHead>Due Date</TableHead>

//                 <TableHead>Priority</TableHead>

//                 <TableHead>Status</TableHead>

//                 <TableHead className="w-16 text-right">{/* menu */}</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {data?.tasks.map((task, index) => (
//                 <TableRow
//                   key={task.id}
//                   className="
//                       cursor-pointer
//                       transition-colors
//                       hover:bg-muted/40
//                     "
//                   onClick={() => handleViewTask(task.id)}
//                 >
//                   {/* Number */}

//                   <TableCell className="font-medium text-muted-foreground">
//                     {(page - 1) * data.pagination.limit + index + 1}
//                   </TableCell>

//                   {/* Task */}

//                   <TableCell>
//                     <p className="max-w-[350px] truncate font-medium">
//                       {task.title}
//                     </p>
//                   </TableCell>

//                   {/* Assigned To */}

//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="
//                             flex
//                             h-8
//                             w-8
//                             shrink-0
//                             items-center
//                             justify-center
//                             rounded-full
//                             bg-primary/10
//                             text-xs
//                             font-semibold
//                             text-primary
//                           "
//                       >
//                         {getInitials(task.assigned_to_name)}
//                       </div>

//                       <span className="whitespace-nowrap">
//                         {task.assigned_to_name ?? "Unassigned"}
//                       </span>
//                     </div>
//                   </TableCell>

//                   {/* Due Date */}

//                   <TableCell>
//                     {task.due_date ? (
//                       <span className="text-sm">
//                         {new Date(task.due_date).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </span>
//                     ) : (
//                       <span className="text-muted-foreground">No due date</span>
//                     )}
//                   </TableCell>

//                   {/* Priority */}

//                   <TableCell>
//                     <Badge
//                       variant="outline"
//                       className={getPriorityClass(task.priority)}
//                     >
//                       {task.priority.charAt(0).toUpperCase() +
//                         task.priority.slice(1).toLowerCase()}
//                     </Badge>
//                   </TableCell>

//                   {/* Status */}

//                   <TableCell>
//                     <Badge
//                       variant={
//                         task.status === "COMPLETED" ? "default" : "secondary"
//                       }
//                     >
//                       {task.status === "COMPLETED" ? "Completed" : "Pending"}
//                     </Badge>
//                   </TableCell>

//                   {/* Actions */}

//                   <TableCell
//                     className="text-right"
//                     onClick={(event) => event.stopPropagation()}
//                   >
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />

//                           <span className="sr-only">Open task actions</span>
//                         </Button>
//                       </DropdownMenuTrigger>

//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => handleViewTask(task.id)}
//                         >
//                           View Task
//                         </DropdownMenuItem>

//                         <DropdownMenuItem asChild>
//                           <Link href={`/dashboard/tasks/${task.id}/edit`}>
//                             Edit Task
//                           </Link>
//                         </DropdownMenuItem>

//                         <DropdownMenuSeparator />

//                         {task.status === "PENDING" && (
//                           <DropdownMenuItem>Mark Completed</DropdownMenuItem>
//                         )}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination */}

//           {data && data.pagination.totalPages > 1 && (
//             <div className="border-t p-4">
//               <DataTablePagination
//                 total={data.pagination.total}
//                 limit={data.pagination.limit}
//                 totalPages={data.pagination.totalPages}
//                 currentPage={data.pagination.page}
//                 visiblePages={[]}
//                 itemName="tasks"
//                 onPageChange={setPage}
//                 onJump={setPage}
//               />
//             </div>
//           )}
//         </Card>
//       )}

//       {/* Task Details */}

//       <TaskViewSheet
//         open={taskViewOpen}
//         onOpenChange={setTaskViewOpen}
//         taskId={selectedTaskId}
//         onEdit={(task) => {
//           window.location.href = `/dashboard/tasks/${task.id}/edit`;
//         }}
//       />
//     </div>
//   );
// }
