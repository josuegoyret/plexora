"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useWidgetState, useCallTool } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type InquiryData } from "@/lib/inquiry-helpers";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const propertyAddressSchema = z.object({
  address: z.string().min(1, "Property address is required"),
});

type PropertyAddressFormValues = z.infer<typeof propertyAddressSchema>;

const Step3PropertyAddress = () => {
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>({});
  const callTool = useCallTool();
  const [loading, setLoading] = useState(false);

  const form = useForm<PropertyAddressFormValues>({
    resolver: zodResolver(propertyAddressSchema),
    mode: "onSubmit",
    defaultValues: {
      address: inquiryState?.propertyAddress || "",
    },
  });

  const onSubmit = async (data: PropertyAddressFormValues) => {
    setLoading(true);
    try {
      const newState = {
        ...inquiryState,
        propertyAddress: data.address,
      };
      setInquiryState(newState);

      // Call tool with updated data to proceed to next step
      await callTool("start_property_closing_inquiry", {
        transactionType: inquiryState?.transactionType,
        transactionAmount: inquiryState?.transactionAmount,
        propertyAddress: data.address,
        agreementSigned: inquiryState?.agreementSigned,
        contactInfo: inquiryState?.contactInfo,
      });
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
        <div className="flex flex-col gap-2 p-4">
          <div className="openai-body-regular-emphasized">Property address</div>
          <p className="openai-body-small-regular text-muted-foreground">
            Enter the full property address
          </p>

          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="property-address">Address</FieldLabel>
                <Input
                  id="property-address"
                  type="text"
                  placeholder="123 Main St, Sudbury, ON"
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
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Step3PropertyAddress;
