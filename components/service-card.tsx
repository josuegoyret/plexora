import { Card } from "@/components/ui/card";
import { getWixMediaImageUrl } from "@/utils/image";
import { Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import { Service } from "@/types/wix";
import { Button } from "./ui/button";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link
      href={`/availability/${service.id}?staffMemberId=${service.staffMemberIds[0]}`}
    >
      <Card className="flex items-center justify-between gap-6 shadow-none p-4 rounded-sm">
        <div className="flex items-center gap-4">
          <div className="relative size-10 min-w-10 aspect-square rounded-xs overflow-hidden">
            <Image
              src={getWixMediaImageUrl(service.media.mainMedia.image.url)}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="openai-body-emphasized">{service.name}</div>
            <div className="openai-body-small-regular m-0 line-clamp-1 break-all">
              {service.tagLine}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 openai-body-small-regular text-muted-foreground">
          <p className="flex items-center gap-2 whitespace-nowrap">
            <DollarSign className="size-4" />
            <span>
              {service.payment.fixed.price.currency}{" "}
              {Number(service.payment.fixed.price.value)}
            </span>
          </p>
          <p className="flex items-center gap-2 whitespace-nowrap">
            <Clock className="size-4" />
            <span>
              {service.schedule.availabilityConstraints.durations[0].minutes}{" "}
              min
            </span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
