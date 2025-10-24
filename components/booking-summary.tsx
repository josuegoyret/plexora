import { queryServices, queryStaffMembers } from "@/actions/wix";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatSlotDate, formatSlotTime } from "@/utils/date";
import Image from "next/image";
import { getWixMediaImageUrl } from "@/utils/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BookingSummary = async ({
  shopId,
  serviceId,
  staffMemberId,
  scheduleId,
  startDate,
  endDate,
}: {
  shopId: string;
  serviceId: string;
  staffMemberId: string;
  scheduleId: string;
  startDate: string;
  endDate: string;
}) => {
  // TODO: get single service and staff member
  const [{ services }, { staffMembers }] = await Promise.all([
    queryServices(),
    queryStaffMembers(),
  ]);

  const service = services.find((service) => service.id === serviceId);
  const staffMember = staffMembers.find(
    (staffMember) => staffMember.resourceId === staffMemberId
  );

  if (!service || !staffMember) return notFound();
  return (
    <Card className="w-full max-w-[300px] h-[315px]">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex flex-col gap-1">
            <div className="openai-body-small-regular text-muted-foreground">
              Date
            </div>
            <div className="openai-body-small-emphasized">
              {formatSlotDate(new Date(startDate))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="openai-body-small-regular text-muted-foreground">
              Time
            </div>
            <div className="openai-body-small-emphasized">
              {formatSlotTime(new Date(startDate))} (
              {service.schedule.availabilityConstraints.durations[0].minutes}{" "}
              min)
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="openai-body-small-regular text-muted-foreground">
              Staff
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="size-5 mb-0.5">
                <AvatarImage
                  src={staffMember.mainMedia.image.url}
                  alt={staffMember.name}
                />
                <AvatarFallback>
                  {staffMember.name
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="openai-body-small-emphasized">
                {staffMember.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="openai-body-small-regular text-muted-foreground">
              Price
            </div>
            <div className="openai-body-small-emphasized">
              {service.payment.fixed.price.currency}{" "}
              {Number(service.payment.fixed.price.value)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
