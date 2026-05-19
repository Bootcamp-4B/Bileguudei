import Image from "next/image";
import MovieCard from "@/components/ui/MovieCard";
import MyCarousel from "@/components/ui/MyCarousel";
import MyNav from "@/components/ui/MyNav";

export default function Home() {
  const slides = ["/slide1.jpg", "/slide2.jpg"];
  return (
    <div className="flex flex-col gap-[30px]">
      <MyNav></MyNav>
      <MyCarousel slideArray={slides}></MyCarousel>

      <div id="Upcoming" className="flex w-full gap-[32px] px-[80px]">
        <MovieCard
          imgUrl={"/Slide 4_3 - 1.png"}
          title={"Dear Santa"}
        ></MovieCard>
        <MovieCard
          imgUrl={"/movie2.jpg"}
          title={"How To Train Your Dragon Live Action"}
        ></MovieCard>
        <MovieCard imgUrl={"/movie3.jpg"} title={"Alien Romulus"}></MovieCard>
        <MovieCard imgUrl={"/movie4.jpg"} title={"From the Ashes"}></MovieCard>
        <MovieCard imgUrl={"/movie5.jpg"} title={"Space Dogg"}></MovieCard>
      </div>
    </div>
  );
}
