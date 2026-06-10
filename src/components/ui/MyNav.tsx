"use client";
import { ArrowRight, Film, Moon, Search, Star, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { movieType } from "@/app/page";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { tmdb } from "@/lib/tmdb";

interface genreType {
  id: number;
  name: string;
}

const MyNav = () => {
  const [genres, setGenres] = useState<genreType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedMovies, setSearchedMovies] = useState<movieType[]>([]);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    tmdb.get("/genre/movie/list?language=en").then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchedMovies([]);
      return;
    }

    const timeOut = setTimeout(() => {
      tmdb
        .get(
          `/search/movie?query=${encodeURIComponent(searchValue)}&language=en-US&page=1`,
        )
        .then((response) => {
          setSearchedMovies(response.data.results);
        });
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchValue]);

  const runSearch = () => {
    if (searchValue.trim() === "") return;
    router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
    setSearchedMovies([]);
  };

  return (
    <nav className="flex w-full h-[50px] px-4 items-end justify-center">
      <div className="flex justify-between items-center gap-3 w-full max-w-[1280px] h-[36px]">
        <Link href={"/"}>
          <div className="flex items-center gap-2 pt-2">
            <Film width={20} height={20} stroke="#4338CA"></Film>
            <h2 className="text-[#4338CA] text-4 italic Inter font-bold leading-[20px] tracking-[0.32px]">
              Movie Z
            </h2>
          </div>
        </Link>

        <div className="relative flex items-center gap-3">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-[36px] border border-solid border-border">
                  Genre
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-3 gap-1 p-2 w-[500px]">
                    {genres.map((genre) => (
                      <li key={genre.id}>
                        <NavigationMenuLink asChild>
                          <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="w-[150px] sm:w-[240px] md:w-[379px]">
            <div className="h-[36px] px-3 flex items-center gap-2.5 rounded-[8px] border-[1px] border-solid border-border">
              <Search width={16} height={16} opacity={0.5}></Search>
              <input
                placeholder="Search.."
                className="w-full outline-none"
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") runSearch();
                }}
              />
            </div>
          </div>

          {searchedMovies.length > 0 && (
            <div className="absolute top-[52px] left-1/2 z-50 w-[92vw] max-w-[577px] -translate-x-1/2 rounded-[8px] border border-solid border-border bg-background px-5 pt-6 pb-4 shadow-lg">
              <div className="flex flex-col">
                {searchedMovies.slice(0, 5).map((movie) => {
                  return (
                    <div key={movie.id}>
                      <Link
                        href={`/${movie.id}`}
                        className="flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
                        onClick={() => {
                          setSearchValue("");
                          setSearchedMovies([]);
                        }}
                      >
                        <div className="relative h-[100px] w-[67px] shrink-0 overflow-hidden rounded-md bg-muted">
                          {movie.poster_path && (
                            <Image
                              alt={movie.title}
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              fill
                              unoptimized
                              sizes="67px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                          <div className="flex flex-col">
                            <h3 className="truncate font-['Inter'] text-xl font-semibold leading-7 tracking-[-0.5px] text-foreground">
                              {movie.title}
                            </h3>
                            <div className="flex items-center gap-1 pt-0.5">
                              <Star
                                width={16}
                                height={16}
                                fill="#FDE047"
                                stroke="#FDE047"
                              ></Star>
                              <p className="font-['Inter'] text-xs font-normal leading-4 text-muted-foreground">
                                <span className="font-['Inter'] text-sm font-medium leading-5 text-foreground">
                                  {Number(movie.vote_average.toFixed(1))}
                                </span>
                                /10
                              </p>
                            </div>
                          </div>

                          <div className="flex w-full items-center justify-between">
                            <p className="font-['Inter'] text-sm font-medium leading-5 text-foreground">
                              {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : "No date"}
                            </p>
                            <span className="flex h-9 items-center gap-2 rounded-md px-4 py-2 font-['Inter'] text-sm font-medium leading-5 text-foreground">
                              See more
                              <ArrowRight width={16} height={16}></ArrowRight>
                            </span>
                          </div>
                        </div>
                      </Link>
                      <Separator className="my-2" />
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={runSearch}
                className="flex h-10 items-center gap-2 rounded-md px-4 py-2 font-['Inter'] text-sm font-medium leading-5 text-foreground"
              >
                See all results for "{searchValue}"
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-[36px] h-[36px] rounded-[10px] border-[1px] border-solid border-border cursor-pointer"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun width={20} height={20} />
          ) : (
            <Moon width={20} height={20} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default MyNav;
