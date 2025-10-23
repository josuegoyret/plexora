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
    <Card className="w-[260px] flex flex-col gap-3 border-none shadow-none">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
        <Image
          src={getWixMediaImageUrl(service.media.mainMedia.image.url)}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between p-0">
            <div className="flex flex-col gap-1">
              <div className="openai-body-emphasized">{service.name}</div>
              <div className="openai-body-small-regular m-0">
                {service.tagLine}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 openai-body-small-regular text-muted">
            <p className="flex items-center gap-2">
              <DollarSign className="size-4" />
              <span>
                {service.payment.fixed.price.currency}{" "}
                {Number(service.payment.fixed.price.value)}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>
                {service.schedule.availabilityConstraints.durations[0].minutes}{" "}
                min
              </span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>
                {service.locations[0].calculatedAddress?.formattedAddress
                  .split(",")[0]
                  ?.trim() ?? "Business address"}
              </span>
            </p>
          </div>
        </div>
        <Button asChild>
          <Link
            href={`/availability/${service.id}?staffMemberId=${service.staffMemberIds[0]}`}
          >
            View Availability
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
