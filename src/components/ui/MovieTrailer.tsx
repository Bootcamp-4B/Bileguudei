import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "@/components/ui/skeleton";
import { tmdb } from "@/lib/tmdb";

export interface trailerType {
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
  const [trailer, setTrailer] = useState<trailerType | null>(null);

  const [movie, setMovie] = useState<movieDetailsType | null>(null);

  useEffect(() => {
    tmdb.get(`/movie/${params.id}`).then((response) => {
      setMovie(response.data);
    });
    tmdb.get(`/movie/${params.id}/videos`).then((response) => {
      const foundTrailer =
        response.data.results.find(
          (video: trailerType) =>
            video.type === "Trailer" && video.site === "YouTube",
        ) ??
        response.data.results.find(
          (video: trailerType) => video.site === "YouTube",
        );

      setTrailer(foundTrailer ?? null);
    });
  }, [params.id]);

  if (!movie) {
    return (
      <div className="w-full max-w-[1080px] gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-6 w-[120px]" />
        </div>
        <div className="w-full gap-[32px] flex flex-col lg:flex-row">
          <Skeleton className="w-full max-w-[290px] aspect-[2/3] lg:aspect-auto lg:h-[428px] lg:w-[290px] rounded-xl" />
          <Skeleton className="w-full lg:flex-1 aspect-video lg:aspect-auto lg:h-[428px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1080px] gap-5 flex flex-col">
      <div className="flex w-full items-start gap-[24px] justify-between">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-foreground w-full sm:w-[500px] text-[24px] sm:text-[36px] font-bold leading-tight sm:leading-[40px] tracking-[-0.9px] truncate">
            {movie?.title}
          </h2>
          <p className="text-foreground text-[18px]">{movie?.release_date}</p>
        </div>
        <div className="w-[83px] h-[64px] flex flex-col lg:pr-[100px]">
          <h3 className="text-foreground text-[12px] font-medium leading-[16px] h-3">
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
                <span className="text-[16px] font-normal text-muted-foreground">
                  /10
                </span>
              </p>
              <p className="text-muted-foreground text-[12px] font-normal">
                {movie?.vote_count}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full gap-[32px] flex flex-col lg:flex-row">
        {movie?.poster_path && (
          <Image
            unoptimized
            width={290}
            height={428}
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            loading="eager"
            className="w-full max-w-[290px] aspect-[2/3] lg:aspect-auto lg:h-[428px] lg:w-[290px] mx-auto lg:mx-0 shrink-0 object-cover rounded-md"
          ></Image>
        )}

        {trailer ? (
          <div className="w-full lg:flex-1 aspect-video lg:aspect-auto lg:h-[428px]">
            <ReactPlayer
              width="100%"
              height="100%"
              src={`https://www.youtube.com/watch?v=${trailer.key}`}
            />
          </div>
        ) : (
          <div className="flex w-full lg:flex-1 aspect-video lg:aspect-auto lg:h-[428px] items-center justify-center bg-muted text-muted-foreground">
            Trailer not found
          </div>
        )}

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
