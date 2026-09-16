import { PageHeaderSkeleton, TableSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <TableSkeleton rows={8} />
    </div>
  );
}
