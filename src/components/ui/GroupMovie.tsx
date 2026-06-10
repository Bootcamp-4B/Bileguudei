import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tmdb } from "@/lib/tmdb";
import type { movieType } from "../../app/page";
import { Button } from "./button";
import MovieCard from "./MovieCard";
import { MovieCardSkeletonList } from "./MovieCardSkeleton";

interface groupNameType {
  groupName: string;
}

export const GroupMovie = ({ groupName }: groupNameType) => {
  let apiUrl: string;
  switch (groupName) {
    case "Upcoming":
      apiUrl = "/movie/upcoming?language=en-US&page=1";
      break;

    case "Popular":
      apiUrl = "/movie/popular?language=en-US&page=1";
      break;

    case "Top rated":
      apiUrl = "/movie/top_rated?language=en-US&page=1";
      break;

    case "Now playing":
      apiUrl = "/movie/now_playing?language=en-US&page=1";
      break;

    default:
      apiUrl = "/movie/now_playing?language=en-US&page=1";
  }

  const [movies, setMovies] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tmdb
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="px-4 sm:px-6 lg:px-20 flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <h2 className="text-foreground text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          {groupName}
        </h2>
        <Link href={`/movies/${groupName.toLowerCase().replace(" ", "_")}`}>
          <Button className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 bg-background text-foreground">
            <p className="text-[14px] font-medium leading-[20px]">See more</p>
            <ArrowRight width={16} height={16}></ArrowRight>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 lg:gap-8">
        {isLoading ? (
          <MovieCardSkeletonList count={10} />
        ) : (
          movies.slice(0, 10).map((movie) => {
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
    </div>
  );
};
