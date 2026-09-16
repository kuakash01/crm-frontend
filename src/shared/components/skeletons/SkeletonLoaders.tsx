import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b border-border/60">
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
    <div className="w-full border border-border/70 rounded-xl overflow-hidden bg-card/40">
      {/* Header */}
      <div className="flex items-center gap-4 py-3.5 px-4 bg-muted/40 border-b border-border/60">
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
    <div className="p-6 border border-border/70 rounded-2xl bg-card/40 space-y-4">
      <Skeleton className="h-8 w-40 rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-lg" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton({ withAction = true }: { withAction?: boolean }) {
  return (
    <div className="flex items-center justify-between pb-2">
      <div className="space-y-2">
        <Skeleton className="h-8 w-44 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>
      {withAction && <Skeleton className="h-10 w-28 rounded-xl" />}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50 pb-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6 border-border/70 space-y-4">
            <Skeleton className="h-6 w-36 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="p-6 border-border/70 space-y-4">
            <Skeleton className="h-6 w-28 rounded" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border/60">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-3 w-64 rounded" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full shrink-0" />
    </div>
  );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="border border-border/70 rounded-xl divide-y divide-border/60 overflow-hidden bg-card/40">
      {Array.from({ length: items }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function GridCardSkeleton() {
  return (
    <div className="p-5 border border-border/70 rounded-2xl bg-card/40 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-2/3 rounded" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
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

export function PipelineSkeleton() {
  const stages = ["Open", "Quotation Sent", "Negotiation", "Won", "Lost"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {stages.map((stage, idx) => (
        <div key={idx} className="flex flex-col rounded-2xl border border-border/70 bg-muted/20 p-3 space-y-3 min-w-[260px]">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <Skeleton className="h-5 w-7 rounded-full" />
          </div>
          <div className="space-y-3 flex-1">
            {Array.from({ length: idx === 0 ? 3 : idx === 1 ? 2 : 1 }).map((_, cIdx) => (
              <div key={cIdx} className="rounded-xl border border-border/60 bg-card p-3.5 space-y-2.5 shadow-xs">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
                <Skeleton className="h-5 w-20 rounded" />
                <div className="flex items-center justify-between pt-1 border-t border-border/40">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <Card className="border border-border/70 bg-card/60 rounded-2xl p-6 space-y-6">
      <div className="space-y-2 border-b border-border/60 pb-4">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-11 w-32 rounded-xl" />
        <Skeleton className="h-11 w-24 rounded-xl" />
      </div>
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </div>
      <Card className="border border-border/70 p-6 space-y-5">
        <Skeleton className="h-6 w-36 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      </Card>
      <Card className="border border-border/70 p-6 space-y-4">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-4 w-64 rounded" />
        <Skeleton className="h-10 w-36 rounded-xl" />
      </Card>
    </div>
  );
}

export function OrganizationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 rounded" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <Card className="border border-border/70 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export function TimelineSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="relative space-y-2">
          <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-3 w-48 rounded" />
        </div>
      ))}
    </div>
  );
}

export function UsersPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36 rounded-lg" />
          <Skeleton className="h-4 w-52 rounded" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/70 bg-card/60 p-5 space-y-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-11 w-full rounded-xl" />
        <TableSkeleton rows={6} />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 border border-border/70 rounded-2xl bg-card/60 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-5 border border-border/70 rounded-2xl bg-card/60 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="p-5 border border-border/70 rounded-2xl bg-card/60 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>

      {/* Tasks and Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-5 border border-border/70 rounded-2xl bg-card/60 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
        <div className="p-5 border border-border/70 rounded-2xl bg-card/60 space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
