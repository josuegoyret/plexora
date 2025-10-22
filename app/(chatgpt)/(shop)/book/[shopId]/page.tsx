"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMaxHeight } from "../../../../hooks";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { notFoundAction } from "@/actions/not-found";
import { Calendar, Clock } from "lucide-react";
import { formatSlotDate, formatSlotTime } from "@/utils/date";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// Form validation schema
const bookingFormSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const shopId = params.shopId as string;
  const slotId = searchParams.get("slot");

  const shop = shopId ? getShopById(shopId) : undefined;
  const slot = slotId && shopId ? getSlotById(slotId, shopId) : undefined;

  if (!shop || !slot || !shopId) return notFoundAction();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: shop.services.length > 0 ? shop.services[0].id : "",
      customerName: "",
      customerEmail: "",
    },
  });

  const selectedServiceId = form.watch("serviceId");
  const selectedService = shop.services.find((s) => s.id === selectedServiceId);

  const onSubmit = async (data: BookingFormValues) => {
    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to confirmation with booking details
    const bookingData = {
      shopName: shop.name,
      shopAddress: shop.address,
      slotId,
      date: slot.date,
      time: slot.time,
      serviceId: data.serviceId,
      serviceName: selectedService?.name,
      servicePrice: selectedService?.price,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      bookingId: `BK-${Date.now()}`,
    };

    const params = new URLSearchParams(bookingData as any);
    router.push(`/confirmation/${shopId}?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <div className="openai-h3">Complete Your Booking</div>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{formatSlotDate(slot.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{formatSlotTime(slot.time)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              id="booking-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="serviceId"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="booking-form-service-id">
                        Select Service
                      </FieldLabel>
                      <Select
                        defaultValue={field.value}
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full"
                          id="booking-form-service-id"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>

                        <SelectContent>
                          {shop.services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - ${service.price} (
                              {service.duration} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Controller
                control={form.control}
                name="customerName"
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="customerEmail"
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Spinner />}
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
