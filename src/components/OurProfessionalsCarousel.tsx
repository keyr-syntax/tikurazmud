import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProfessionalsList } from "@/lib/ProfessionalsList";
import Image from "next/image";

export default function OurProfessionalsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <>
      <p
        id="ourprofessionals"
        className="relative mt-15 mb-4 mx-auto w-[70%] sm:max-w-[500px] text-[30px] font-semibold p-1 text-center  text-black after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[150px] after:h-[4px] after:bg-blue-600 rounded-2xl"
      >
        Our Professionals
      </p>

      <Carousel
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        className="w-full max-w-[85%]  justify-center items-center mx-auto mb-20 mt-5"
      >
        <CarouselContent>
          {ProfessionalsList.map((professional) => (
            <CarouselItem
              key={professional.id}
              className="sm:basis-1/2  lg:basis-1/3 "
            >
              <div className="flex flex-row justify-center items-center gap-3 ">
                <Card className="sm:min-w-[250px] min-h-[300px] border border-[rgba(196,186,186,0.8)] py-4 bg-[#f5f5f5]">
                  <img
                    src={professional.image}
                    alt={`photo of ${professional.name}`}
                    className="w-28 h-27 rounded-full mx-auto"
                    width={210}
                    height={140}
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                  <CardContent className="my-2 m-auto text-center">
                    <span className="text-black font-bold text-xl">
                      {professional.name}
                    </span>{" "}
                    <span className="block text-black">
                      ({professional.profession})
                    </span>
                    <span className="block text-black">
                      {professional.biography}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
