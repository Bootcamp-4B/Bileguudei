import { Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { tmdb } from "@/lib/tmdb";
import { Button } from "./button";
import type { trailerType } from "./MovieTrailer";

interface movieType {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MyCarousel = () => {
  const [movies, setMovies] = useState<movieType[]>([]);
  const [selectedTrailer, setSelectedTrailer] = useState<trailerType | null>();

  useEffect(() => {
    tmdb.get("/movie/now_playing?language=en-US&page=1").then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const getTrailer = async (movieId: number) => {
    const response = await tmdb.get(`/movie/${movieId}/videos`);

    const trailer = response.data.results.find(
      (video: trailerType) =>
        video.type === "Trailer" && video.site === "YouTube",
    );

    setSelectedTrailer(trailer);
  };

  if (movies.length === 0) {
    return (
      <Skeleton className="h-[400px] sm:h-[500px] lg:h-[700px] w-full rounded-none" />
    );
  }

  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent className="h-[400px] sm:h-[500px] lg:h-[700px]">
        {movies.slice(0, 7).map((movie) => (
          <CarouselItem key={movie.id} className="h-full basis-full">
            <div
              id="slide-zuragtai-div"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
              className="h-full w-full bg-cover bg-center bg-no-repeat relative"
            >
              <div
                id="DescriptionBox"
                className="flex flex-col gap-4 sm:gap-7 items-start absolute w-[90%] max-w-[404px] left-4 sm:left-10 lg:left-[140px] bottom-8 lg:bottom-[158px]"
              >
                <div
                  id="title & rating heseg"
                  className="w-full flex flex-col gap-[2px]"
                >
                  <h3 className="w-full text-[16px] text-white leading-[24px]">
                    Now Playing:
                  </h3>

                  <h1 className="text-[#fff] Inter text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight lg:leading-[40px] tracking-[-0.9px]">
                    {movie.title ?? "title not found"}
                  </h1>

                  <div className="flex h-[48px] gap-1 items-center">
                    <Star fill="#FDE047" stroke="#FDE047" width={28}></Star>
                    <p className="text-[16px] leading-[24px] text-[#71717A]">
                      <span className="text-[#FAFAFA] text-[18px] font-semibold leading-[28px]">
                        {Number(movie.vote_average.toFixed(1)) ?? 0}
                      </span>
                      /10
                    </p>
                  </div>
                </div>

                <p className="w-full max-w-[302px] line-clamp-4 text-[#FAFAFA] text-[12px] font-normal leading-4">
                  {movie.overview ?? "description not found"}
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => getTrailer(movie.id)}
                      className="bg-[#F4F4F5] text-black rounded-[6px] flex h-[40px] py-2 px-4 justify-center items-center gap-2"
                    >
                      <Play></Play>
                      Watch Trailer
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    className="!w-[92vw] !max-w-[1200px] flex items-center justify-center border-none bg-transparent p-0 shadow-none"
                    showCloseButton={false}
                  >
                    <DialogTitle className="w-full">
                      {selectedTrailer && (
                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                          <ReactPlayer
                            width="100%"
                            height="100%"
                            controls
                            src={`https://www.youtube.com/watch?v=${selectedTrailer.key}`}
                          />
                        </div>
                      )}
                    </DialogTitle>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-5" />
      <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-5" />
    </Carousel>
  );
};

export default MyCarousel;
