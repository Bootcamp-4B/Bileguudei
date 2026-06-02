import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      apiUrl =
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
      break;

    case "Popular":
      apiUrl =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      break;

    case "Top rated":
      apiUrl =
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
      break;

    case "Now playing":
      apiUrl =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      break;

    default:
      apiUrl =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  }

  const [movies, setMovies] = useState<movieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="px-[80px] flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <h2 className="w-[114px] h-[32px] text-[#09090B] text-[24px] font-semibold leading-[32px] tracking-[-0.6px]">
          {groupName}
        </h2>
        <Link href={`/movies/${groupName.toLowerCase().replace(" ", "_")}`}>
          <Button className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 bg-white text-[#09090B]">
            <p className="text-[14px] font-medium leading-[20px]">See more</p>
            <ArrowRight width={16} height={16}></ArrowRight>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5 w-full gap-[32px] justify-items-center">
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
