import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/ui/MovieCard";
import { MovieCardSkeletonList } from "@/components/ui/MovieCardSkeleton";
import { tmdb } from "@/lib/tmdb";
import type { movieType } from "../../app/page";

export const MovieSimilar = () => {
  const params = useParams();

  const [similarMovies, setSimilarMovies] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tmdb
      .get(`/movie/${params.id}/similar`)
      .then((response) => {
        setSimilarMovies(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);
  return (
    <div className="w-full max-w-[1080px] flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          More like this
        </h2>
        <Link href={`/${params.id}/similar`}>
          <Button className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 bg-background text-foreground">
            <p className="text-[14px] font-medium leading-[20px]">See more</p>
            <ArrowRight width={16} height={16}></ArrowRight>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full gap-4 lg:gap-8">
        {isLoading ? (
          <MovieCardSkeletonList count={5} />
        ) : (
          similarMovies.slice(0, 5).map((movie) => {
            return (
              <MovieCard
                cardChoice={2}
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
