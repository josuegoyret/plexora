import { getAvailabilityTimeSlotsForService } from "@/actions/wix";
import SlotsList from "@/components/slots-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function AvailabilityPage({
  params,
  searchParams,
}: {
  params: Promise<{ shopId: string }>;
  searchParams: Promise<{
    serviceId: string;
    staffMemberId: string;
    locationId: string;
  }>;
}) {
  const [{ shopId }, { serviceId, staffMemberId, locationId }] =
    await Promise.all([params, searchParams]);

  const today = new Date();

  const timeSlotsPromise = getAvailabilityTimeSlotsForService(serviceId, today);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5 items-start">
        <Button variant="link" className="!px-0 h-auto" size="sm" asChild>
          <Link href={`/services/${shopId}`}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div className="openai-h3">Select a Date & Time</div>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
            <Skeleton className="w-full h-[315px]" />
            <Skeleton className="w-full h-[315px]" />
          </div>
        }
      >
        <SlotsList
          shopId={shopId}
          timeSlotsPromise={timeSlotsPromise}
          initialDate={today}
          staffMemberId={staffMemberId}
          serviceId={serviceId}
          defaultLocationId={locationId}
        />
      </Suspense>
    </div>
  );
}
