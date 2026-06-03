"use client";
import axios from "axios";
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

export default function SimilarPage() {
  const [movies, setMovies] = useState<movieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=${page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id, page]);

  const goToPage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-[80px] flex flex-col gap-[32px] w-full">
      <MyNav></MyNav>
      <div className="flex justify-between">
        <h2 className="w-[198px] h-[32px] text-[#09090B] text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          More like this
        </h2>
      </div>
      <div className="grid grid-cols-5 w-full gap-[32px] justify-items-center">
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
