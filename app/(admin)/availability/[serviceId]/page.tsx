import { Suspense } from "react";
import TimeSlotsCards from "@/components/time-slots-cards";
import TimeSlotCardSkeleton from "@/components/time-slot-card-skeleton";

interface AvailabilityPageProps {
  params: Promise<{ serviceId: string }>;
}

const AvailabilityPage = async ({ params }: AvailabilityPageProps) => {
  const { serviceId } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Service Availability</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          View available time slots for this service. Book your preferred time
          slot to secure your appointment. Time slots are updated in real-time.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Time Slots</h2>
        <Suspense
          fallback={
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <TimeSlotCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <TimeSlotsCards serviceId={serviceId} />
        </Suspense>
      </div>
    </div>
  );
};

export default AvailabilityPage;
