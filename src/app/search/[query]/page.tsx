"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { movieType } from "@/app/page";
import { GenreSidebar } from "@/components/ui/GenreSidebar";
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

export default function SearchPage() {
  const params = useParams<{ query: string }>();
  const query = decodeURIComponent(params.query ?? "");

  const [movies, setMovies] = useState<movieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    tmdb
      .get(
        `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
        setTotalResults(response.data.total_results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const goToPage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 flex flex-col gap-[32px] w-full">
      <MyNav></MyNav>
      <h1 className="text-[30px] font-bold text-foreground">Search results</h1>
      <div className="flex flex-col lg:flex-row gap-[40px]">
        <div className="flex-1 flex flex-col gap-[32px]">
          <h2 className="text-[20px] leading-[28px] text-foreground">
            {totalResults} results for "{query}"
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              <MovieCardSkeletonList count={8} />
            </div>
          ) : movies.length === 0 ? (
            <div className="flex h-[120px] w-full items-center justify-center rounded-[8px] border border-solid border-border">
              <p className="text-[16px] text-foreground">No results found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {movies.map((movie) => {
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
              })}
            </div>
          )}

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

        <GenreSidebar title="Search by genre" />
      </div>
    </div>
  );
}
