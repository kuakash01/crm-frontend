import { PageHeaderSkeleton, TableSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
      <TableSkeleton rows={8} />
    </div>
  );
}
