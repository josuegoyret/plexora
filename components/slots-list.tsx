"use client";

import { AvailabilityTimeSlotsResponse, TimeSlot } from "@/lib/types";
import { use, useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { formatSlotDate, formatSlotTime } from "@/utils/date";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { getAvailabilityTimeSlotsForService } from "@/actions/wix";

const SlotsList = ({
  timeSlotsPromise,
  staffMemberId,
  initialDate,
  serviceId,
  shopId,
  defaultLocationId,
}: {
  timeSlotsPromise: Promise<AvailabilityTimeSlotsResponse>;
  staffMemberId: string;
  initialDate: Date;
  serviceId: string;
  shopId: string;
  defaultLocationId: string;
}) => {
  const { timeSlots: initialTimeSlots } = use(timeSlotsPromise);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState<Date | undefined>(initialDate);

  // Handle date change and fetch new slots
  useEffect(() => {
    if (date && date.getTime() !== initialDate.getTime()) {
      setIsLoading(true);
      getAvailabilityTimeSlotsForService(serviceId, date)
        .then((response) => {
          setTimeSlots(response.timeSlots);
        })
        .catch((error) => {
          console.error("Failed to fetch time slots:", error);
          setTimeSlots([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [date, serviceId, initialDate]);

  const getDisabledDates = (date: Date) => {
    const oneDayBefore = new Date(initialDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    return date.getTime() < oneDayBefore.getTime();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <Card className="w-full">
        <CardContent className="pt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={getDisabledDates}
            className="mx-auto bg-card p-0"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="openai-h3">
            {date ? formatSlotDate(date) : "Select a date"}
          </div>
        </CardHeader>
        <CardContent>
          {!date ? (
            <div className="text-center py-8 text-muted-foreground">
              Please select a date from the calendar
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No available slots for this date
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.map((slot, i) =>
                slot.bookable ? (
                  <Button key={i} asChild className="w-full">
                    <Link
                      href={`/book/${shopId}?serviceId=${
                        slot.serviceId
                      }&staffMemberId=${staffMemberId}&scheduleId=${
                        slot.scheduleId
                      }&locationId=${
                        slot.location.id ?? defaultLocationId
                      }&startDate=${slot.localStartDate}&endDate=${
                        slot.localEndDate
                      }`}
                    >
                      {formatSlotTime(new Date(slot.localStartDate))}
                    </Link>
                  </Button>
                ) : (
                  <Button key={i} className="w-full" disabled={true}>
                    {formatSlotTime(new Date(slot.localStartDate))}
                  </Button>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotsList;
