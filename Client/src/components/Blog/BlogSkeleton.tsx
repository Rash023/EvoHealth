import { Skeleton } from "../ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-muted" />
        <Skeleton className="h-4 w-32 rounded bg-muted" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4 rounded bg-muted " />
          <Skeleton className="h-4 w-full rounded bg-muted " />
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-20 rounded bg-muted" />
              <Skeleton className="h-4 w-20 rounded bg-muted" />
            </div>
          </div>
        </div>
        <Skeleton className="h-28 w-28 rounded bg-muted" />
      </div>
    </div>
  );
};
