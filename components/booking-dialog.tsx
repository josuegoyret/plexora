"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookTimeSlot } from "@/actions/wix";
import { TimeSlot } from "@/lib/types";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  timeSlot: TimeSlot;
  serviceId: string;
  resourceId: string;
  children: React.ReactNode;
}

const BookingDialog = ({
  timeSlot,
  serviceId,
  resourceId,
  children,
}: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    const bookingPromise = bookTimeSlot(
      serviceId,
      timeSlot.scheduleId,
      timeSlot.localStartDate,
      timeSlot.localEndDate,
      timeSlot.location.id,
      resourceId,
      {
        preferedName: data.customerName,
        email: data.customerEmail,
      }
    );

    toast.promise(bookingPromise, {
      loading: "Booking your appointment...",
      success: (result) => {
        console.log("Booking response:", result);
        setOpen(false);
        reset();
        return "Appointment booked successfully!";
      },
      error: (error) => {
        console.error("Booking error:", error);
        return error.message || "Failed to book appointment. Please try again.";
      },
    });

    try {
      await bookingPromise;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Complete your booking for {formatDate(timeSlot.localStartDate)} at{" "}
            {formatTime(timeSlot.localStartDate)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name</Label>
            <Input
              id="customerName"
              {...register("customerName")}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.customerName && (
              <p className="text-sm text-red-600">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email Address</Label>
            <Input
              id="customerEmail"
              type="email"
              {...register("customerEmail")}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-600">
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
