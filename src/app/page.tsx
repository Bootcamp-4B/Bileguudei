"use client";
import Image from "next/image";
import MovieCard from "@/components/ui/MovieCard";
import MyCarousel from "@/components/ui/MyCarousel";
import MyNav from "@/components/ui/MyNav";
import { GroupMovie } from "@/components/ui/GroupMovie";

export default function Home() {
  const slides = [
    {
      title: "Wicked",
      rating: 6.9,
      description:
        "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. ",
      imageUrl: "/slide1.jpg",
    },
    { imageUrl: "/slide2.jpg" },
  ];

  return (
    <div className="flex flex-col gap-[30px] ">
      <MyNav></MyNav>

      <MyCarousel slideArray={slides}></MyCarousel>

      <GroupMovie groupName="Upcoming"></GroupMovie>
      <GroupMovie groupName="Popular"></GroupMovie>
      <GroupMovie groupName="Top rated"></GroupMovie>
    </div>
  );
}
