"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { notFoundAction as notFound } from "@/actions/not-found";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const shopId = params.shopId as string;

  const bookingId = searchParams.get("bookingId");
  const shopName = searchParams.get("shopName");
  const shopAddress = searchParams.get("shopAddress");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const serviceName = searchParams.get("serviceName");
  const servicePrice = searchParams.get("servicePrice");
  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");

  if (!bookingId || !shopName) return notFound();

  return (
    <Card className="mt-8">
      <CardContent className="flex flex-col items-center justify-center pt-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <CheckCircle className="size-10 text-green-600" />
          <div className="openai-h2">Booking Confirmed!</div>
        </div>
        <div className="openai-body-regular text-muted max-w-sm text-center text-pretty">
          Your appointment has been successfully booked. A confirmation email
          has been sent to your email address.
        </div>
      </CardContent>
    </Card>
  );
}
