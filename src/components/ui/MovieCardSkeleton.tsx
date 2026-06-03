import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const MovieCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-3 w-[230px]", className)}>
      <Skeleton className="w-full h-[340px] rounded-xl" />
      <Skeleton className="w-12 h-5" />
      <Skeleton className="w-3/4 h-5" />
    </div>
  );
};

export const MovieCardSkeletonList = ({
  count,
  className,
}: {
  count: number;
  className?: string;
}) => {
  const items = Array.from({ length: count }, (_, index) => index);
  return (
    <>
      {items.map((item) => (
        <MovieCardSkeleton key={`skeleton-${item}`} className={className} />
      ))}
    </>
  );
};
