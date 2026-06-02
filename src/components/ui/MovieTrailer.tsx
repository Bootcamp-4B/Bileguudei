import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "@/components/ui/skeleton";

interface trailerType {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface genreType {
  id: number;
  name: string;
}

interface production_companiesType {
  id: number;
  logo_path: string;
}

interface production_countriesType {
  iso_3166_1: string;
  name: string;
}

interface movieDetailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: production_companiesType[];
  production_countries: production_countriesType[];
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: boolean;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const MovieTrailer = () => {
  const params = useParams();
  const [trailer, setTrailer] = useState<trailerType[]>([]);

  const [movie, setMovie] = useState<movieDetailsType | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setMovie(response.data);
      });
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/videos`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
        },
      })
      .then((response) => {
        setTrailer(response.data.results);
      });
  }, [params.id]);

  if (!movie) {
    return (
      <div className="w-[1080px] h-[524px] gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-6 w-[120px]" />
        </div>
        <div className="w-full h-full gap-[32px] flex">
          <Skeleton className="w-[290px] h-[428px] rounded-xl" />
          <Skeleton className="w-[760px] h-[428px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1080px] h-[524px] gap-5 flex flex-col">
      <div className="flex w-full items-start gap-[24px] justify-between">
        {/* movie title contianer */}
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-[#09090B] w-[500px] text-[36px] font-bold leading-[40px] tracking-[-0.9px] truncate">
            {movie?.title}
          </h2>
          <p className="text-[#09090B] text-[18px]">{movie?.release_date}</p>
        </div>
        {/* rating container */}
        <div className="w-[83px] h-[64px] flex flex-col pr-[100px]">
          <h3 className="text-[#09090B] text-[12px] font-medium leading-[16px] h-3">
            Rating
          </h3>
          <div className="h-[48px] w-full flex flex-row items-center gap-1">
            <div className="w-[28px]">
              <Star
                width={28}
                height={28}
                stroke="#FDE047"
                fill="#FDE047"
              ></Star>
            </div>

            <div className="flex flex-col pt-1">
              <p className="text-[18px] font-semibold h-6">
                {movie?.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                <span className="text-[16px] font-normal text-[#71717A]">
                  /10
                </span>
              </p>
              <p className="text-[#71717A] text-[12px] font-normal">
                {movie?.vote_count}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full gap-[32px] flex">
        {movie?.poster_path && (
          <Image
            unoptimized
            width={290}
            height={428}
            alt="aa"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            loading="eager"
          ></Image>
        )}

        <ReactPlayer
          width={760}
          height={428}
          className="p-0 m-0"
          src={`https://www.youtube.com/watch?v=${trailer?.[0]?.key}`}
        />

        {/* {movie?.backdrop_path && (
          <Image
            unoptimized
            width={760}
            height={428}
            alt="bb"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            loading="eager"
          ></Image>
        )} */}
      </div>
    </div>
  );
};
