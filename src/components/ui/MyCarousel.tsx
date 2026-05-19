import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MyCarousel = ({ slideArray }) => {
  return (
    <Carousel className="w-full overflow-hidden">
      <CarouselContent className="h-[600px]">
        {slideArray.map((slide, index) => (
          <CarouselItem key={index} className="h-full basis-full">
            <div
              style={{
                backgroundImage: `url(${slide})`,
              }}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 top-70 z-5" />
      <CarouselNext className="right-4 top-70 z-5" />
    </Carousel>
  );
};

export default MyCarousel;
