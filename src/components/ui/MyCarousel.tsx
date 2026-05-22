import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./button";
import { Play, Star } from "lucide-react";

interface slideType {
  imageUrl?: string;
  title?: string;
  rating?: number;
  description?: string;
}

interface slideArrayType {
  slideArray: slideType[];
}

const MyCarousel = ({ slideArray }: slideArrayType) => {
  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent className="h-[600px]">
        {slideArray.map((slide, index) => (
          <CarouselItem key={index} className="h-full basis-full">
            <div
              id="slide-zuragtai-div"
              style={{
                backgroundImage: `url(${slide.imageUrl ?? "image not found"})`,
              }}
              className="h-full w-full bg-cover bg-center bg-no-repeat relative"
            >
              <div
                id="DescriptionBox"
                className="flex flex-col gap-4 items-start absolute w-[404px] h-[264px] left-[140px] bottom-[158px]"
              >
                <div className="w-full h-[112px] flex flex-col ">
                  <h3 className="w-full text-[16px] text-white leading-[24px]">
                    Now Playing:
                  </h3>

                  <h1 className="text-[#fff] Inter text-[36px] font-bold leading-[40px] tracking-[-0.9px]">
                    {slide.title ?? "title not found"}
                  </h1>

                  <div className="flex h-[48px] gap-1 items-center">
                    <Star fill="#FDE047" stroke="#FDE047" width={28}></Star>
                    <p className="text-[16px] leading-[24px] text-[#71717A]">
                      <span className="text-[#FAFAFA] text-[18px] font-semibold leading-[28px]">
                        {slide.rating ?? 0}
                      </span>
                      /10
                    </p>
                  </div>
                </div>

                <p className="w-[302px] text-[#FAFAFA] text-[12px] font-normal leading-4">
                  {slide.description ?? "description not found"}
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
