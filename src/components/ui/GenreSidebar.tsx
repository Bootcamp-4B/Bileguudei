"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tmdb } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

interface genreType {
  id: number;
  name: string;
}

export const GenreSidebar = ({
  activeGenreId,
  title = "Genres",
}: {
  activeGenreId?: string;
  title?: string;
}) => {
  const [genres, setGenres] = useState<genreType[]>([]);

  useEffect(() => {
    tmdb.get("/genre/movie/list?language=en").then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  return (
    <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-[24px] font-semibold text-foreground">{title}</h3>
        <p className="text-[16px] text-muted-foreground">
          See lists of movies by genre
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => {
          const isActive = String(genre.id) === activeGenreId;
          return (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-[10px] py-[2px] text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:bg-muted",
                )}
              >
                {genre.name}
                <ChevronRight width={14} height={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
