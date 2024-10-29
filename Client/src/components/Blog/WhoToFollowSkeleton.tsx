import { Skeleton } from "../ui/skeleton";

const WhoToFollowSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-full bg-muted" />
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-44" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhoToFollowSkeleton;
