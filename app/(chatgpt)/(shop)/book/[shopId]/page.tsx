import { notFound } from "next/navigation";
import { getShopById } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingSummary from "@/components/booking-summary";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BookingForm from "@/components/booking-form";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ shopId: string }>;
  searchParams: Promise<{
    serviceId: string;
    staffMemberId: string;
    scheduleId: string;
    startDate: string;
    endDate: string;
    locationId: string;
  }>;
}) {
  const [
    { shopId },
    { serviceId, staffMemberId, scheduleId, startDate, endDate, locationId },
  ] = await Promise.all([params, searchParams]);

  const shop = shopId ? getShopById(shopId) : undefined;

  if (!shop || !shopId) return notFound();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5 items-start">
        <Button variant="link" className="!px-0 h-auto" size="sm" asChild>
          <Link
            href={`/availability/${shopId}?serviceId=${serviceId}&staffMemberId=${staffMemberId}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div className="openai-h3">Complete Your Booking</div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Suspense
          fallback={<Skeleton className="w-full max-w-[300px] h-[315px]" />}
        >
          <BookingSummary
            shopId={shopId}
            serviceId={serviceId}
            staffMemberId={staffMemberId}
            scheduleId={scheduleId}
            startDate={startDate}
            endDate={endDate}
          />
        </Suspense>

        <Suspense
          fallback={<Skeleton className="w-full max-w-[300px] h-[315px]" />}
        >
          <BookingForm
            serviceId={serviceId}
            startDate={startDate}
            endDate={endDate}
            staffMemberId={staffMemberId}
            locationId={locationId}
            scheduleId={scheduleId}
          />
        </Suspense>
      </div>
    </div>
  );
}
