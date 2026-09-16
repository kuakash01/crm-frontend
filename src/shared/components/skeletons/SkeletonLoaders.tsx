import { Skeleton } from "@/components/ui/skeleton";

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b dark:border-slate-700">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
      <Skeleton className="h-4 w-32 rounded" />
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
      <Skeleton className="h-4 w-4 rounded ml-auto" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full border rounded-lg dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 py-4 px-4 bg-slate-50 dark:bg-slate-900 border-b dark:border-slate-700">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded ml-auto" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 border rounded-lg dark:border-slate-700 space-y-4">
      <Skeleton className="h-8 w-40 rounded" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded" />
        <Skeleton className="h-9 w-20 rounded" />
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded" />
          <Skeleton className="h-4 w-60 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b dark:border-slate-700">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-3 w-60 rounded" />
      </div>
      <Skeleton className="h-6 w-16 rounded" />
    </div>
  );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="border rounded-lg dark:border-slate-700 divide-y dark:divide-slate-700">
      {Array.from({ length: items }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function GridCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg dark:border-slate-700 space-y-4">
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-2/3 rounded" />
      <Skeleton className="h-9 w-full rounded" />
    </div>
  );
}

export function GridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: cards }).map((_, i) => (
        <GridCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-4 w-60 rounded" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg dark:border-slate-700 space-y-3">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 border rounded-lg dark:border-slate-700 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-64 w-full rounded" />
        </div>
        <div className="p-4 border rounded-lg dark:border-slate-700 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-64 w-full rounded" />
        </div>
      </div>

      {/* Tasks and Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 border rounded-lg dark:border-slate-700 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
        <div className="p-4 border rounded-lg dark:border-slate-700 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
