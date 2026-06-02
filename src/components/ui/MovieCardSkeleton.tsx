import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Тогтвортой түлхүүрүүд — render болгонд шинээр үүсгэхгүйн тулд модулийн түвшинд нэг л удаа.
const SKELETON_KEYS = Array.from(
  { length: 30 },
  (_, i) => `movie-skeleton-${i}`,
);

export const MovieCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex w-[230px] flex-col gap-3", className)}>
      <Skeleton className="h-[340px] w-full rounded-xl" />
      <Skeleton className="h-5 w-12" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );
};

export const MovieCardSkeletonList = ({
  count = 10,
  className,
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <>
      {SKELETON_KEYS.slice(0, count).map((key) => (
        <MovieCardSkeleton key={key} className={className} />
      ))}
    </>
  );
};
