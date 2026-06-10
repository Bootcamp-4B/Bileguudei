"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { movieType } from "@/app/page";
import MovieCard from "@/components/ui/MovieCard";
import { MovieCardSkeletonList } from "@/components/ui/MovieCardSkeleton";
import MyNav from "@/components/ui/MyNav";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { tmdb } from "@/lib/tmdb";

type PageItem = number | "left-ellipsis" | "right-ellipsis";

function getPageList(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: PageItem[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("left-ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("right-ellipsis");
  pages.push(total);
  return pages;
}

export default function CategoryPage() {
  const [movies, setMovies] = useState<movieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const params = useParams<{ category: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    tmdb
      .get(`/movie/${params.category}?language=en-US&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.category, page]);

  const goToPage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 flex flex-col gap-[32px] w-full">
      <MyNav></MyNav>
      <div className="flex justify-between">
        <h2 className="w-[114px] h-[32px] text-foreground text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          {params.category.charAt(0).toUpperCase() +
            params.category.slice(1).replace("_", " ")}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 lg:gap-8">
        {isLoading ? (
          <MovieCardSkeletonList count={20} />
        ) : (
          movies.map((movie) => {
            return (
              <MovieCard
                cardChoice={1}
                movieLink={movie.id}
                imgUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                rating={Number(movie.vote_average.toFixed(1))}
                key={movie.id}
              ></MovieCard>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="pb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              />
            </PaginationItem>

            {getPageList(page, totalPages).map((item) =>
              typeof item === "number" ? (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={item === page}
                    onClick={() => goToPage(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationEllipsis />
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
