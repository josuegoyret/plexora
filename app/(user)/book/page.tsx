"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMaxHeight } from "../../hooks";
import { getShopById, getSlotById } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function BookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shopId = searchParams.get("shopId");
  const slotId = searchParams.get("slotId");
  const maxHeight = useMaxHeight() ?? undefined;

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shop = shopId ? getShopById(shopId) : undefined;
  const slot = slotId && shopId ? getSlotById(slotId, shopId) : undefined;

  // Set default service
  if (shop && !selectedServiceId && shop.services.length > 0) {
    setSelectedServiceId(shop.services[0].id);
  }

  if (!shop || !slot || !shopId) {
    return (
      <div className="w-full p-4 md:p-6" style={{ maxHeight }}>
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Invalid booking request</h1>
          <Link href="/">
            <Button variant="outline">Back to Shop List</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedService = shop.services.find((s) => s.id === selectedServiceId);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to confirmation with booking details
    const bookingData = {
      shopId,
      shopName: shop.name,
      shopAddress: shop.address,
      slotId,
      date: slot.date,
      time: slot.time,
      serviceId: selectedServiceId,
      serviceName: selectedService?.name,
      servicePrice: selectedService?.price,
      customerName,
      customerEmail,
      bookingId: `BK-${Date.now()}`,
    };

    const params = new URLSearchParams(bookingData as any);
    router.push(`/confirmation?${params.toString()}`);
  };

  const isFormValid =
    customerName.trim() !== "" &&
    customerEmail.trim() !== "" &&
    customerEmail.includes("@") &&
    selectedServiceId !== "";

  return (
    <div
      className="w-full p-4 md:p-6 overflow-auto"
      style={{
        maxHeight,
      }}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Link href={`/slots?shopId=${shopId}`}>
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
              Back to Slots
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground mt-1">
              Fill in your details to confirm your appointment
            </p>
          </div>
        </div>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{shop.name}</p>
                <p className="text-sm text-muted-foreground">{shop.address}</p>
              </div>
              <Badge variant="secondary">⭐ {shop.rating}</Badge>
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">{formatDate(slot.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{formatTime(slot.time)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              We'll send a confirmation to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Select Service</Label>
                <select
                  id="service"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  required
                >
                  {shop.services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
