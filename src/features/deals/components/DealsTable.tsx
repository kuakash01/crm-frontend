// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

// import { usePagination } from "@/shared/hooks/usePagination";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// import {
//   getDeals,
// } from "@/features/deals/deals.service";

// import { Deal } from "../deals.types";

// const stages = [
//   "ALL",
//   "OPEN",
//   "QUOTATION_SENT",
//   "NEGOTIATION",
//   "WON",
//   "LOST",
// ] as const;

// export default function DealsTable() {
//   const [loading, setLoading] =
//     useState(true);

//   const [deals, setDeals] =
//     useState<Deal[]>([]);

//   const [counts, setCounts] = useState({
//     ALL: 0,
//     OPEN: 0,
//     QUOTATION_SENT: 0,
//     NEGOTIATION: 0,
//     WON: 0,
//     LOST: 0,
//   });

//   const [search, setSearch] =
//     useState("");

//   const [stage, setStage] =
//     useState("ALL");

//   const [pagination, setPagination] =
//     useState({
//       page: 1,
//       limit: 10,
//       total: 0,
//       totalPages: 0,
//     });

//   const {
//     currentPage,
//     handlePageChange,
//     handleJump,
//     visiblePages,
//   } = usePagination({
//     totalPages:
//       pagination.totalPages,
//   });

//   const fetchDeals = async () => {
//     try {
//       setLoading(true);

//       const data = await getDeals({
//         stage,
//         search,
//         page: currentPage,
//         limit: pagination.limit,
//       });

//       setDeals(data.deals);
//       setCounts(data.counts);
//       setPagination(
//         data.pagination
//       );
//     } catch {
//       toast.error(
//         "Failed to load deals"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDeals();
//   }, [
//     stage,
//     search,
//     currentPage,
//   ]);

//   const handleStageChange = (
//     value: string
//   ) => {
//     setStage(value);

//     // reset to first page
//     handlePageChange(1);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         Loading deals...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Stage tabs */}

//       <Tabs
//         value={stage}
//         onValueChange={
//           handleStageChange
//         }
//       >
//         <TabsList className="flex w-full justify-start overflow-x-auto">
//           {stages.map((item) => (
//             <TabsTrigger
//               key={item}
//               value={item}
//             >
//               {item
//                 .charAt(0)
//                 .toUpperCase() +
//                 item
//                   .slice(1)
//                   .toLowerCase()
//                   .replace(
//                     "_",
//                     " "
//                   )}{" "}
//               ({counts[item] ?? 0})
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>

//       {/* Search */}

//       <div className="flex gap-3">
//         <Input
//           placeholder="Search deals..."
//           value={search}
//           onChange={(e) => {
//             setSearch(
//               e.target.value
//             );

//             // reset page when searching
//             handlePageChange(1);
//           }}
//         />

//         <Button
//           variant="outline"
//           onClick={fetchDeals}
//         >
//           Refresh
//         </Button>
//       </div>

//       {/* Empty state */}

//       {deals.length === 0 ? (
//         <div className="flex flex-col items-center gap-3 py-12 text-center">
//           <h3 className="font-medium">
//             {counts.ALL === 0
//               ? "No deals yet"
//               : "No matching deals"}
//           </h3>

//           <p className="text-sm text-muted-foreground">
//             {counts.ALL === 0
//               ? "Create your first deal to start tracking sales opportunities."
//               : "Try changing your search or selecting a different stage."}
//           </p>

//           {counts.ALL === 0 && (
//             <Link href="/dashboard/deals/create">
//               <Button>
//                 Create Deal
//               </Button>
//             </Link>
//           )}
//         </div>
//       ) : (
//         <>
//           {/* Table */}

//           <div className="overflow-x-auto rounded-lg border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   <TableHead>
//                     Title
//                   </TableHead>

//                   <TableHead>
//                     Customer
//                   </TableHead>

//                   <TableHead>
//                     Service
//                   </TableHead>

//                   <TableHead>
//                     Deal Value
//                   </TableHead>

//                   <TableHead>
//                     Stage
//                   </TableHead>

//                   <TableHead>
//                     Assigned To
//                   </TableHead>

//                   <TableHead>
//                     Expected Close
//                   </TableHead>

//                   <TableHead className="text-right">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {deals.map((deal) => (
//                   <TableRow
//                     key={deal.id}
//                     className="transition-colors hover:bg-muted/30"
//                   >
//                     <TableCell className="font-medium">
//                       {deal.title}
//                     </TableCell>

//                     <TableCell>
//                       {deal.customer_name}
//                     </TableCell>

//                     <TableCell>
//                       {deal.service_name}
//                     </TableCell>

//                     <TableCell>
//                       ₹
//                       {Number(
//                         deal.price
//                       ).toLocaleString()}
//                     </TableCell>

//                     <TableCell>
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
//                           deal.stage ===
//                           "OPEN"
//                             ? "bg-blue-100 text-blue-700"
//                             : deal.stage ===
//                                 "QUOTATION_SENT"
//                               ? "bg-purple-100 text-purple-700"
//                               : deal.stage ===
//                                   "NEGOTIATION"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : deal.stage ===
//                                     "WON"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {deal.stage.replaceAll(
//                           "_",
//                           " "
//                         )}
//                       </span>
//                     </TableCell>

//                     <TableCell>
//                       {deal.assigned_to_name ??
//                         "Unassigned"}
//                     </TableCell>

//                     <TableCell>
//                       {deal.expected_close_date
//                         ? new Date(
//                             deal.expected_close_date
//                           ).toLocaleDateString()
//                         : "-"}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       <Link
//                         href={`/dashboard/deals/${deal.id}`}
//                       >
//                         <Button
//                           size="sm"
//                           variant="outline"
//                         >
//                           View
//                         </Button>
//                       </Link>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination */}

//           <DataTablePagination
//             total={pagination.total}
//             limit={pagination.limit}
//             totalPages={
//               pagination.totalPages
//             }
//             currentPage={
//               pagination.page
//             }
//             visiblePages={
//               visiblePages
//             }
//             itemName="deals"
//             onPageChange={
//               handlePageChange
//             }
//             onJump={handleJump}
//           />
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Eye, MoreHorizontal, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DataTablePagination from "@/shared/components/pagination/DataTablePagination";

import { usePagination } from "@/shared/hooks/usePagination";
import { usePermission } from "@/shared/hooks/usePermissions";

import QuickAssignment from "@/shared/components/user-assignment/QuickAssignment";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getDeals, assignDeals } from "@/features/deals/deals.service";

import { Deal } from "../deals.types";

const stages = [
  "ALL",
  "OPEN",
  "QUOTATION_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;

type DealStage = (typeof stages)[number];

export default function DealsTable() {
  const { can } = usePermission();

  const [loading, setLoading] = useState(true);

  const [deals, setDeals] = useState<Deal[]>([]);

  const [counts, setCounts] = useState({
    ALL: 0,
    OPEN: 0,
    QUOTATION_SENT: 0,
    NEGOTIATION: 0,
    WON: 0,
    LOST: 0,
  });

  /* ----------------------------- */
  /* Search                         */
  /* ----------------------------- */

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* ----------------------------- */
  /* Stage                          */
  /* ----------------------------- */

  const [stage, setStage] = useState<DealStage>("ALL");

  /* ----------------------------- */
  /* Pagination                     */
  /* ----------------------------- */

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  /* ----------------------------- */
  /* Bulk assignment                */
  /* ----------------------------- */

  const [bulkMode, setBulkMode] = useState(false);

  const [selectedDeals, setSelectedDeals] = useState<number[]>([]);

  /* ----------------------------- */
  /* Fetch deals                    */
  /* ----------------------------- */

  const fetchDeals = async () => {
    try {
      setLoading(true);

      const data = await getDeals({
        stage: stage === "ALL" ? undefined : stage,

        search: debouncedSearch || undefined,

        page: currentPage,

        limit: pagination.limit,
      });

      setDeals(data.deals);
      setCounts(data.counts);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------- */
  /* Fetch when filters change      */
  /* ----------------------------- */

  useEffect(() => {
    fetchDeals();
  }, [stage, currentPage, debouncedSearch]);

  /* ----------------------------- */
  /* Debounced search               */
  /* ----------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      handlePageChange(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ----------------------------- */
  /* Stage change                   */
  /* ----------------------------- */

  const handleStageChange = (value: string) => {
    setStage(value as DealStage);

    handlePageChange(1);

    setSelectedDeals([]);
  };

  /* ----------------------------- */
  /* Bulk mode                      */
  /* ----------------------------- */

  const handleBulkMode = () => {
    setBulkMode((current) => {
      const next = !current;

      if (!next) {
        setSelectedDeals([]);
      }

      return next;
    });
  };

  /* ----------------------------- */
  /* Select all                     */
  /* ----------------------------- */

  const allSelected = deals.length > 0 && selectedDeals.length === deals.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDeals(deals.map((deal) => deal.id));
    } else {
      setSelectedDeals([]);
    }
  };

  /* ----------------------------- */
  /* Select single                  */
  /* ----------------------------- */

  const handleSelectDeal = (dealId: number, checked: boolean) => {
    if (checked) {
      setSelectedDeals((prev) => [...prev, dealId]);
    } else {
      setSelectedDeals((prev) => prev.filter((id) => id !== dealId));
    }
  };

  return (
    <div className="space-y-4">
      {/* -------------------------------- */}
      {/* Header actions                   */}
      {/* -------------------------------- */}

      {bulkMode && selectedDeals.length > 0 && (
        <div className="flex items-center justify-between border-b px-2 py-3">
          <p className="text-sm font-medium">
            {selectedDeals.length === 1
              ? "1 Deal selected"
              : `${selectedDeals.length} Deals selected`}
          </p>

          <QuickAssignment
            entityName="Deals"
            canAssign={can("deals:assign") || false}
            onAssign={async (user) => {
              try {
                await assignDeals({
                  dealIds: selectedDeals,
                  assignedTo: user.id,
                });

                toast.success(
                  selectedDeals.length === 1
                    ? "Deal assigned successfully"
                    : "Deals assigned successfully",
                );

                setSelectedDeals([]);
                setBulkMode(false);

                await fetchDeals();
              } catch {
                toast.error("Failed to assign deals.");
              }
            }}
          />
        </div>
      )}

      {/* -------------------------------- */}
      {/* Stage tabs                       */}
      {/* -------------------------------- */}

      <Tabs value={stage} onValueChange={handleStageChange}>
        <TabsList className="flex w-full justify-start overflow-x-auto">
          {stages.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item.charAt(0).toUpperCase() +
                item.slice(1).toLowerCase().replace("_", " ")}{" "}
              ({counts[item] ?? 0})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* -------------------------------- */}
      {/* Search + actions                 */}
      {/* -------------------------------- */}

      <div className="flex gap-3">
        <Input
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {can("deals:assign") && (
          <Button variant="outline" onClick={handleBulkMode}>
            {bulkMode ? "Cancel" : "Select Deals"}
          </Button>
        )}

        <Button variant="outline" onClick={fetchDeals}>
          Refresh
        </Button>
      </div>

      {/* -------------------------------- */}
      {/* Empty state                      */}
      {/* -------------------------------- */}

      {deals.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <h3 className="font-medium">
            {counts.ALL === 0 ? "No deals yet" : "No matching deals"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {counts.ALL === 0
              ? "Create your first deal to start tracking sales opportunities."
              : "Try changing your search or selecting a different stage."}
          </p>

          {counts.ALL === 0 && can("deals:create") && (
            <Link href="/dashboard/deals/create">
              <Button>Create Deal</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* -------------------------------- */}
          {/* Table                            */}
          {/* -------------------------------- */}

          {/* Table */}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-sm text-muted-foreground">
                Loading deals...
              </div>
            </div>
          ) : deals.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <h3 className="font-medium">
                {counts.ALL === 0 ? "No deals yet" : "No matching deals"}
              </h3>

              <p className="text-sm text-muted-foreground">
                {counts.ALL === 0
                  ? "Create your first deal to start tracking sales opportunities."
                  : "Try changing your search or selecting a different stage."}
              </p>

              {counts.ALL === 0 && can("deals:create") && (
                <Link href="/dashboard/deals/create">
                  <Button>Create Deal</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {/* Checkbox */}

                      {bulkMode && can("deals:assign") && (
                        <TableHead className="w-12">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(checked) => {
                              handleSelectAll(checked === true);
                            }}
                          />
                        </TableHead>
                      )}

                      <TableHead>#</TableHead>

                      <TableHead>Deal</TableHead>

                      <TableHead>Customer</TableHead>

                      <TableHead>Service</TableHead>

                      <TableHead>Deal Value</TableHead>

                      <TableHead>Stage</TableHead>

                      <TableHead>Assigned To</TableHead>

                      <TableHead>Expected Close</TableHead>

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {deals.map((deal, index) => (
                      <TableRow
                        key={deal.id}
                        className="border-b transition-colors hover:bg-muted/30"
                      >
                        {/* Checkbox */}

                        {bulkMode && can("deals:assign") && (
                          <TableCell>
                            <Checkbox
                              checked={selectedDeals.includes(deal.id)}
                              onCheckedChange={(checked) => {
                                handleSelectDeal(deal.id, checked === true);
                              }}
                            />
                          </TableCell>
                        )}

                        {/* Number */}

                        <TableCell>
                          {(currentPage - 1) * pagination.limit + index + 1}
                        </TableCell>

                        {/* Deal */}

                        <TableCell>
                          <div>
                            <p className="font-medium">{deal.title}</p>
                          </div>
                        </TableCell>

                        {/* Customer */}

                        <TableCell>{deal.customer_name || "-"}</TableCell>

                        {/* Service */}

                        <TableCell>{deal.service_name || "-"}</TableCell>

                        {/* Value */}

                        <TableCell className="font-medium">
                          ₹{Number(deal.price).toLocaleString()}
                        </TableCell>

                        {/* Stage */}

                        <TableCell>
                          <Badge
                            variant={
                              deal.stage === "WON"
                                ? "default"
                                : deal.stage === "LOST"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {deal.stage.replaceAll("_", " ")}
                          </Badge>
                        </TableCell>

                        {/* Assigned */}

                        <TableCell>
                          {deal.assigned_to_name ? (
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                {deal.assigned_to_name
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>

                              <span>{deal.assigned_to_name}</span>
                            </div>
                          ) : (
                            <Badge variant="outline">Unassigned</Badge>
                          )}
                        </TableCell>

                        {/* Expected close */}

                        <TableCell>
                          {deal.expected_close_date
                            ? new Date(
                                deal.expected_close_date,
                              ).toLocaleDateString()
                            : "-"}
                        </TableCell>

                        {/* Actions */}

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />

                                <span className="sr-only">Open actions</span>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              {/* View */}

                              <DropdownMenuItem asChild className="text-nowrap">
                                <Link href={`/dashboard/deals/${deal.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>

                              {/* Assign */}

                              {can("deals:assign") && (
                                <DropdownMenuItem
                                  className="text-nowrap"
                                  onClick={() => {
                                    setBulkMode(true);

                                    setSelectedDeals([deal.id]);
                                  }}
                                >
                                  <UserRoundPlus className="mr-2 h-4 w-4" />
                                  Assign
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* -------------------------------- */}
              {/* Pagination                       */}
              {/* -------------------------------- */}

              <DataTablePagination
                total={pagination.total}
                limit={pagination.limit}
                totalPages={pagination.totalPages}
                currentPage={currentPage}
                visiblePages={visiblePages}
                itemName="deals"
                onPageChange={handlePageChange}
                onJump={handleJump}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
