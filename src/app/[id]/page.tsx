"use client";
import { MovieSimilar } from "@/components/ui/MovieSimilar";
import MyNav from "@/components/ui/MyNav";
import { MovieTrailer } from "@/components/ui/MovieTrailer";
import { MovieDetails } from "@/components/ui/MovieDetails";

export default function CardDetail() {
  return (
    <div className="flex flex-col gap-10 items-center ">
      <MyNav></MyNav>
      <MovieTrailer></MovieTrailer>
      <MovieDetails></MovieDetails>
      <MovieSimilar></MovieSimilar>
    </div>
  );
}
