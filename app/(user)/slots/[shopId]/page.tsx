"use client";

import { useState } from "react";
import { getShopById, getShopSlots } from "@/lib/mock-data";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { formatSlotDate, formatSlotTime } from "@/utils/date";
import { notFoundAction as notFound } from "@/actions/not-found";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SlotsPage() {
  const params = useParams();
  const shopId = params.shopId as string;

  const shop = shopId ? getShopById(shopId) : undefined;
  const slots = shopId ? getShopSlots(shopId) : [];

  if (!shop || !shopId) return notFound();

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, typeof slots>);

  // Get dates that have available slots
  const availableDates = Object.keys(slotsByDate)
    .filter((date) => slotsByDate[date].some((slot) => slot.available))
    .map((dateStr) => new Date(dateStr));

  // Initialize selected date to first available date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    availableDates[0]
  );

  // Get slots for selected date
  const selectedDateStr = selectedDate?.toISOString().split("T")[0];
  const slotsForSelectedDate = selectedDateStr
    ? slotsByDate[selectedDateStr]?.filter((slot) => slot.available) || []
    : [];

  // Disable dates that don't have available slots
  const disabledDates = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return !slotsByDate[dateStr]?.some((slot) => slot.available);
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-4 w-full">
        <Link href="/">
          <Button variant="link" className="px-0">
            <ArrowLeft className="w-4 h-4" />
            Back to Shops
          </Button>
        </Link>

        <div className="flex flex-col items-start justify-between gap-2 w-full">
          <div className="flex items-start justify-between gap-8 w-full">
            <div className="flex items-start gap-4">
              <div className="relative size-12 rounded-md overflow-hidden">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="openai-body-emphasized">{shop.name}</div>
                <div className="openai-body-small-regular m-0">
                  {shop.address}
                </div>
              </div>
            </div>
            <Badge variant="ghost">{shop.rating}</Badge>
          </div>

          <div></div>
          <p className="openai-body-small-regular text-muted">
            {shop.description}
          </p>
        </div>
      </div>

      {/* Main Content: Calendar & Time Slots */}
      <div className="space-y-2">
        <div className="openai-h3">Select a Date & Time</div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-shrink-0">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDates}
                className="rounded-md"
                captionLayout="dropdown"
                fromDate={new Date()}
                toDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <div className="openai-h3">
                {selectedDate
                  ? formatSlotDate(selectedDateStr!)
                  : "Select a date"}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <div className="text-center py-8 text-muted-foreground">
                  Please select a date from the calendar
                </div>
              ) : slotsForSelectedDate.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No available slots for this date
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {slotsForSelectedDate.map((slot) => (
                    <Link
                      key={slot.id}
                      href={`/book/${shop.id}&slot=${slot.id}`}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-12 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {formatSlotTime(slot.time)}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
