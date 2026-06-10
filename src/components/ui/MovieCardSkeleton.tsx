import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const MovieCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("aspect-[2/3] w-full rounded-xl", className)} />
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
