"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useWidgetState, useCallTool, useSendMessage } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type InquiryData } from "@/lib/inquiry-helpers";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const contactInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
});

type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;

const Step5ContactInfo = () => {
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>({});
  const callTool = useCallTool();
  const sendMessage = useSendMessage();
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: inquiryState?.contactInfo?.fullName || "",
      email: inquiryState?.contactInfo?.email || "",
      phone: inquiryState?.contactInfo?.phone || "",
    },
  });

  const onSubmit = async (data: ContactInfoFormValues) => {
    setLoading(true);
    try {
      const newState = {
        ...inquiryState,
        contactInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
      };
      setInquiryState(newState);

      // Call tool with complete data
      await callTool("start_property_closing_inquiry", {
        transactionType: inquiryState?.transactionType,
        transactionAmount: inquiryState?.transactionAmount,
        propertyAddress: inquiryState?.propertyAddress,
        agreementSigned: inquiryState?.agreementSigned,
        contactInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
      });

      // Send message to indicate completion
      await sendMessage(
        "I've completed all the required information for my property closing inquiry."
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full md:w-[356px] flex flex-col gap-3 shadow-none p-2 pb-3">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="openai-body-regular-emphasized">
            Contact information
          </div>
          <p className="openai-body-small-regular text-muted-foreground">
            Please provide your contact details
          </p>

          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="John Doe"
                  {...field}
                  disabled={loading}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                  disabled={loading}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...field}
                  disabled={loading}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <div className="p-4">
          <Button
            type="submit"
            className="w-full"
            variant="black"
            disabled={loading}
          >
            {loading && <Spinner />}
            Submit Inquiry
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Step5ContactInfo;
