"use client";
import { MovieDetails } from "@/components/ui/MovieDetails";
import { MovieSimilar } from "@/components/ui/MovieSimilar";
import { MovieTrailer } from "@/components/ui/MovieTrailer";
import MyNav from "@/components/ui/MyNav";

export default function CardDetail() {
  return (
    <div className="flex flex-col gap-10">
      <MyNav></MyNav>
      <div className="flex flex-col gap-10 items-center px-4 sm:px-6 lg:px-0">
        <MovieTrailer></MovieTrailer>
        <MovieDetails></MovieDetails>
        <MovieSimilar></MovieSimilar>
      </div>
    </div>
  );
}
