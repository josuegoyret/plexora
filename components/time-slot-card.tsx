import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import { TimeSlot } from "@/lib/types";
import BookingDialog from "@/components/booking-dialog";

interface TimeSlotCardProps {
  timeSlot: TimeSlot;
  serviceId: string;
  resourceId: string;
}

const TimeSlotCard = ({
  timeSlot,
  serviceId,
  resourceId,
}: TimeSlotCardProps) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isBookable =
    timeSlot.bookable &&
    !timeSlot.bookingPolicyViolations.tooEarlyToBook &&
    !timeSlot.bookingPolicyViolations.tooLateToBook &&
    !timeSlot.bookingPolicyViolations.bookOnlineDisabled;

  return (
    <Card className="w-[300px] flex flex-col gap-3 border-none shadow-sm">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">
              {formatDate(timeSlot.localStartDate)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatTime(timeSlot.localStartDate)} -{" "}
              {formatTime(timeSlot.localEndDate)}
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isBookable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isBookable ? "Available" : "Unavailable"}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            <span className="truncate">{timeSlot.location.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4" />
            <span>
              {timeSlot.remainingCapacity} / {timeSlot.totalCapacity} spots
              available
            </span>
          </div>
        </div>

        {isBookable ? (
          <BookingDialog
            timeSlot={timeSlot}
            serviceId={serviceId}
            resourceId={resourceId}
          >
            <Button className="w-full">Book Now</Button>
          </BookingDialog>
        ) : (
          <Button disabled className="w-full" variant="secondary">
            Not Available
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TimeSlotCard;
