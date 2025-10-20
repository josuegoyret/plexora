"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Shop } from "@/lib/types";
import CarouselShopCardItem from "./card-detailed-shop";

const CarouselInlineShops = ({ shops }: { shops: Shop[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="-ml-4">
        {shops.map((shop) => (
          <CarouselItem key={shop.id} className="pl-4 basis-[276px]">
            <CarouselShopCardItem shop={shop} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselInlineShops;
