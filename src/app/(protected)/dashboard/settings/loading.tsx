import { PageHeaderSkeleton, GridSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton withAction={false} />
      <GridSkeleton cards={4} />
    </div>
  );
}
