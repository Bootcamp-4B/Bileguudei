"use client";
import MyCarousel from "@/components/ui/MyCarousel";
import MyNav from "@/components/ui/MyNav";
import { GroupMovie } from "@/components/ui/GroupMovie";

export interface movieType {
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

export default function Home() {
  return (
    <div className="flex flex-col gap-[20px]">
      <MyNav></MyNav>
      <MyCarousel></MyCarousel>
      <GroupMovie groupName="Upcoming"></GroupMovie>
      <GroupMovie groupName="Popular"></GroupMovie>
      <GroupMovie groupName="Top rated"></GroupMovie>
    </div>
  );
}
