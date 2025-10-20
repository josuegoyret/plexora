import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Shop } from "@/lib/types";

const CarouselShopCardItem = ({ shop }: { shop: Shop }) => {
  return (
    <Card
      key={shop.id}
      className="w-[260px] flex flex-col gap-3 border-none shadow-none"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
        <Image src={shop.image} alt={shop.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between p-0">
            <div className="flex flex-col gap-1">
              <div className="openai-body-emphasized">{shop.name}</div>
              <div className="openai-body-small-regular m-0">
                {shop.address}
              </div>
            </div>
            <Badge variant="ghost">{shop.rating}</Badge>
          </div>

          <p className="openai-body-small-regular text-muted line-clamp-2">
            {shop.description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {shop.nextAvailableSlots.map((slot) => (
            <Button key={slot}>{slot}</Button>
          ))}
          <Link href={`/slots/${shop.id}`}>
            <Button variant="outline" className="size-11 p-0">
              <Plus className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CarouselShopCardItem;
