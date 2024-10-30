import { Skeleton } from "../ui/skeleton";

const StaffPicksSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-2">
          <Skeleton className="h-5 w-5 rounded-full bg-muted" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-12 rounded bg-muted" />
            <Skeleton className="h-3 w-44 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffPicksSkeleton;
