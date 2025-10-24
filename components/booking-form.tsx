"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { bookTimeSlot } from "@/actions/wix";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

// Form validation schema
const bookingFormSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = ({
  serviceId,
  startDate,
  endDate,
  staffMemberId: resourceId,
  locationId,
  scheduleId,
}: {
  serviceId: string;
  startDate: string;
  endDate: string;
  staffMemberId: string;
  locationId: string;
  scheduleId: string;
}) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    const { firstName, email } = data;

    toast.promise(
      bookTimeSlot(
        serviceId,
        scheduleId,
        startDate,
        endDate,
        locationId,
        resourceId,
        {
          firstName,
          email,
        }
      ),
      {
        loading: "Booking your appointment...",
        success: (result) => {
          console.log("Booking response:", result);
          form.reset();
          return "Appointment booked successfully!";
        },
        error: (error) => {
          console.error("Booking error:", error);
          return (
            error.message || "Failed to book appointment. Please try again."
          );
        },
      }
    );
  };

  return (
    <Card className="flex flex-col w-full max-w-[300px] h-[315px]">
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <form
          id="booking-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="booking-form-customer-name">
                  Full Name
                </FieldLabel>
                <Input
                  placeholder="John Doe"
                  {...field}
                  id="booking-form-customer-name"
                  aria-invalid={fieldState.invalid}
                />

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="booking-form-customer-email">
                  Email Address
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                  id="booking-form-customer-email"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner />}
            Confirm Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
