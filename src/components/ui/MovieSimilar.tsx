import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/ui/MovieCard";
import { MovieCardSkeletonList } from "@/components/ui/MovieCardSkeleton";
import type { movieType } from "../../app/page";

export const MovieSimilar = () => {
  const params = useParams();

  const [similarMovies, setSimilarMovies] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/similar`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
        },
      })
      .then((response) => {
        setSimilarMovies(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);
  return (
    <div className="w-[1080px] h-[440px] flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <h2 className="w-[198px] h-[32px] text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          More like this
        </h2>

        <Button className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 bg-white text-[#09090B]">
          <p className="text-[14px] font-medium leading-[20px]">See more</p>
          <ArrowRight width={16} height={16}></ArrowRight>
        </Button>
      </div>

      <div className="w-full h-[372px] flex gap-[32px]">
        {isLoading ? (
          <MovieCardSkeletonList count={5} className="w-[190px]" />
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
