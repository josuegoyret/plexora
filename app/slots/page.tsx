"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMaxHeight } from "../hooks";
import { getShopById, getShopSlots } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SlotsPage() {
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shopId");
  const maxHeight = useMaxHeight() ?? undefined;

  const shop = shopId ? getShopById(shopId) : undefined;
  const slots = shopId ? getShopSlots(shopId) : [];

  if (!shop || !shopId) {
    return (
      <div className="w-full p-4 md:p-6" style={{ maxHeight }}>
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Shop not found</h1>
          <Link href="/">
            <Button variant="outline">Back to Shop List</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, typeof slots>);

  const dates = Object.keys(slotsByDate).sort();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div
      className="w-full p-4 md:p-6 overflow-auto"
      style={{
        maxHeight,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Shops
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{shop.name}</CardTitle>
                  <CardDescription className="flex items-start gap-1.5 mt-2">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{shop.address}</span>
                  </CardDescription>
                </div>
                <Badge variant="secondary">⭐ {shop.rating}</Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Available Slots */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Time Slots</h2>

          {dates.map((date) => {
            const availableSlots = slotsByDate[date].filter(
              (slot) => slot.available
            );

            if (availableSlots.length === 0) return null;

            return (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="text-lg">{formatDate(date)}</CardTitle>
                  <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableSlots.map((slot) => (
                      <Link
                        key={slot.id}
                        href={`/book?shopId=${shopId}&slotId=${slot.id}`}
                      >
                        <Button variant="outline" className="w-full" size="sm">
                          {formatTime(slot.time)}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {dates.every(
            (date) =>
              slotsByDate[date].filter((slot) => slot.available).length === 0
          ) && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No available slots at this time. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
