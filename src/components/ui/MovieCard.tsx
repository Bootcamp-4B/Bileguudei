import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";

type MovieCardProps = {
  imgUrl: string;
  rating?: number;
  title: string;
};

const MovieCard = ({ imgUrl, rating = 6.9, title }: MovieCardProps) => {
  return (
    <Card className="w-[230px] gap-0 py-0">
      <div className="relative h-[340px] w-full">
        <Image alt={title} src={imgUrl} fill className="object-cover" />
      </div>

      <CardFooter className="flex flex-col items-start gap-2 px-3">
        {" "}
        <div className="flex items-center gap-1">
          <Star fill="#FDE047" stroke="#FDE047" width={18}></Star>
          <p className="pt-[3px] text-[14px]">
            <span>{rating}</span>/10
          </p>
        </div>
        <h4 className="text-[18px] h-[56px] w-full">{title}</h4>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
