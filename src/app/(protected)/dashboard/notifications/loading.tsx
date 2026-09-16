import { PageHeaderSkeleton, ListSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton withAction={false} />
      <ListSkeleton items={8} />
    </div>
  );
}
