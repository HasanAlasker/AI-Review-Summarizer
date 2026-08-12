import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export function ProductCarousel({ images, alt }: Props) {
  const showNextPrev = images.length > 1;

  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={image}
                    alt={alt}
                    width={1500}
                    height={1500}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showNextPrev && <CarouselPrevious className={"hidden lg:flex"} />}
      {showNextPrev && <CarouselNext className={"hidden lg:flex"} />}
    </Carousel>
  );
}
