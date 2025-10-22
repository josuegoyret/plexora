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
  const [date, setDate] = useState<Date | undefined>(availableDates[0]);

  const selectedDateStr = date?.toISOString().split("T")[0];
  const slotsForSelectedDate = selectedDateStr
    ? slotsByDate[selectedDateStr]?.filter((slot) => slot.available) || []
    : [];

  const getDisabledDates = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return !slotsByDate[dateStr]?.some((slot) => slot.available);
  };

  return (
    <div className="space-y-2">
      <div className="openai-h3">Select a Date & Time</div>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        <Card className="w-full">
          <CardContent className="pt-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={getDisabledDates}
              className="mx-auto"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="openai-h3">
              {date ? formatSlotDate(selectedDateStr!) : "Select a date"}
            </div>
          </CardHeader>
          <CardContent>
            {!date ? (
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
                    href={`/book/${shop.id}?slot=${slot.id}`}
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
  );
}
