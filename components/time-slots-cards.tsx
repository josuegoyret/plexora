import { getAvailabilityTimeSlotsForService } from "@/actions/wix";
import TimeSlotCard from "@/components/time-slot-card";

interface TimeSlotsCardsProps {
  serviceId: string;
  resourceId: string;
}

const TimeSlotsCards = async ({
  serviceId,
  resourceId,
}: TimeSlotsCardsProps) => {
  const response = await getAvailabilityTimeSlotsForService(serviceId);

  if (!response || !response.timeSlots || response.timeSlots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No time slots available for this service.</p>
        <p className="text-sm mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {response.timeSlots.map((timeSlot, index) => (
        <TimeSlotCard
          key={`${timeSlot.localStartDate}-${index}`}
          timeSlot={timeSlot}
          serviceId={serviceId}
          resourceId={resourceId}
        />
      ))}
    </div>
  );
};

export default TimeSlotsCards;
