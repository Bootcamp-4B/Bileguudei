import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { tmdb } from "@/lib/tmdb";

interface crewType {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
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

export const MovieDetails = () => {
  const params = useParams();

  const [movie, setMovie] = useState<movieDetailsType | null>(null);
  const [directing, setDirecting] = useState<crewType[]>([]);
  const [writing, setWriting] = useState<crewType[]>([]);
  const [stars, setStars] = useState<crewType[]>([]);

  useEffect(() => {
    tmdb.get(`/movie/${params.id}`).then((response) => {
      setMovie(response.data);
    });
    tmdb.get(`/movie/${params.id}/credits`).then((response) => {
      const directors = response.data.crew.filter(
        (person: crewType) => person.known_for_department === "Directing",
      );

      const writers = response.data.crew.filter(
        (person: crewType) => person.known_for_department === "Writing",
      );

      setDirecting(directors);
      setWriting(writers);
      setStars(response.data.cast);
    });
  }, [params.id]);

  if (!movie) {
    return (
      <div className="w-full max-w-[1080px] flex flex-col gap-[20px]">
        <div className="flex gap-[12px]">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div
      id="MovieDescription"
      className="w-full max-w-[1080px] flex flex-col gap-[20px] "
    >
      <div id="genres" className="flex gap-[12px] items-center">
        {movie?.genres?.map((genre, index) => {
          return (
            <Badge
              className="flex text-foreground py-[2px] px-[10px] gap-[10px] border-[1px] rounded-[9999px] border-solid bg-background border-border"
              key={index + Math.random()}
            >
              {genre.name}
            </Badge>
          );
        })}
      </div>

      <p className="text-foreground text-[16px] leading-[24px]">
        {movie?.overview}
      </p>

      <div className="h-full w-full flex flex-col gap-[20px]">
        <div id="director" className="h-1/3">
          <div className="flex gap-[53px]">
            <h5 className="w-[64px] h-[28px] text-[16px] font-bold">
              Director
            </h5>
            {directing.slice(0, 3).map((person) => {
              return (
                <p
                  key={person.id + Math.random()}
                  className="w-fit h-[24px] text-[16px]"
                >
                  {person.name}
                </p>
              );
            })}
          </div>
          <Separator></Separator>
        </div>
        <div id="Writers" className="h-1/3">
          <div className="flex gap-[53px]">
            <h5 className="w-[64px] h-[28px] text-[16px] font-bold">Writers</h5>
            {writing.slice(0, 3).map((person) => {
              return (
                <p
                  key={person.id + Math.random()}
                  className="w-fit h-[24px] text-[16px]"
                >
                  {person.name}
                </p>
              );
            })}
          </div>
          <Separator></Separator>
        </div>
        <div id="Stars" className="h-1/3">
          <div className="flex gap-[53px]">
            <h5 className="w-[64px] h-[28px] text-[16px] font-bold">Stars</h5>
            {stars.slice(0, 3).map((person) => {
              return (
                <p
                  key={person.id + Math.random()}
                  className="w-fit h-[24px] text-[16px]"
                >
                  {person.name}
                </p>
              );
            })}
          </div>
          <Separator></Separator>
        </div>
      </div>
    </div>
  );
};
