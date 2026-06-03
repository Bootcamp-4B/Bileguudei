import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./button";
import { Play, Star } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjODI3ZGU0ZTkzMDE5OGE1YzI4YTAyZWYwNDMxMCIsIm5iZiI6MTc3OTI5NjIzNC4yMjUsInN1YiI6IjZhMGRlN2VhMzczYmNhZjA2OGEyYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b1LM9DOJgB7NGZu04MmF9rsXfk5TcQbTg3i1yPZBrEE",
          },
        },
      )
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      });
  }, []);

  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent className="h-[700px]">
        {movies.slice(0, 7).map((movie, index) => (
          <CarouselItem key={index} className="h-full basis-full">
            <div
              id="slide-zuragtai-div"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
              className="h-full w-full bg-cover bg-center bg-no-repeat relative"
            >
              <div
                id="DescriptionBox"
                className="flex flex-col gap-7 items-start absolute w-[404px] h-[264px] left-[140px] bottom-[158px]"
              >
                <div
                  id="title & rating heseg"
                  className="w-full h-[130px] flex flex-col gap-[2px]"
                >
                  <h3 className="w-full text-[16px] text-white leading-[24px]">
                    Now Playing:
                  </h3>

                  <h1 className="text-[#fff] Inter text-[36px] font-bold leading-[40px] tracking-[-0.9px]">
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

                <p className="w-[302px] h-[122px] items-start text-[#FAFAFA] text-[12px] font-normal leading-4">
                  {movie.overview ?? "description not found"}
                </p>

                <Button className="bg-[#F4F4F5] text-black rounded-[6px] flex h-[40px] py-2 px-4 justify-center items-center gap-2">
                  <Play></Play>
                  Watch Trailer
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 top-70 z-5" />
      <CarouselNext className="right-4 top-70 z-5" />
    </Carousel>
  );
};

export default MyCarousel;
