"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMaxHeight } from "../../hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const maxHeight = useMaxHeight() ?? undefined;

  const bookingId = searchParams.get("bookingId");
  const shopName = searchParams.get("shopName");
  const shopAddress = searchParams.get("shopAddress");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const serviceName = searchParams.get("serviceName");
  const servicePrice = searchParams.get("servicePrice");
  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");

  if (!bookingId || !shopName) {
    return (
      <div className="w-full p-4 md:p-6" style={{ maxHeight }}>
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">No booking found</h1>
          <Link href="/">
            <Button variant="outline">Back to Shop List</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div
      className="w-full p-4 md:p-6 overflow-auto"
      style={{
        maxHeight,
      }}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mt-2">
              Your appointment has been successfully booked
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Booking Reference: <span className="font-mono">{bookingId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Shop Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Location
              </h3>
              <div>
                <p className="font-medium text-lg">{shopName}</p>
                <p className="text-sm text-muted-foreground flex items-start gap-1.5 mt-1">
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
                  {shopAddress}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              {/* Date & Time */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-muted-foreground"
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
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">
                    {date && formatDate(date)} at {time && formatTime(time)}
                  </p>
                </div>
              </div>

              {/* Service */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">
                    {serviceName}{" "}
                    {servicePrice && (
                      <Badge variant="outline" className="ml-2">
                        ${servicePrice}
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Customer Information
              </h3>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Name:</span>{" "}
                  <span className="font-medium">{customerName}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-medium">{customerEmail}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Confirmation sent to your email
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  A confirmation email has been sent to {customerEmail}. Please
                  arrive 5 minutes early for your appointment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button variant="default" className="w-full">
              Book Another Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
