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

const transactionAmountSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount")
    .transform((val) => parseFloat(val)),
});

type TransactionAmountFormValues = z.infer<typeof transactionAmountSchema>;

const Step2TransactionAmount = () => {
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>({});
  const callTool = useCallTool();
  const [loading, setLoading] = useState(false);

  const form = useForm<TransactionAmountFormValues>({
    resolver: zodResolver(transactionAmountSchema),
    mode: "onSubmit",
    defaultValues: {
      amount: inquiryState?.transactionAmount?.toString() || "",
    },
  });

  const onSubmit = async (data: TransactionAmountFormValues) => {
    setLoading(true);
    try {
      const newState = {
        ...inquiryState,
        transactionAmount: data.amount,
      };
      setInquiryState(newState);

      // Call tool with updated data to proceed to next step
      await callTool("start_property_closing_inquiry", {
        transactionType: inquiryState?.transactionType,
        transactionAmount: data.amount,
        propertyAddress: inquiryState?.propertyAddress,
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
          <div className="openai-body-regular-emphasized">
            Transaction amount
          </div>
          <p className="openai-body-small-regular text-muted-foreground">
            Enter the purchase or sale price
          </p>

          <Controller
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transaction-amount">Amount ($)</FieldLabel>
                <Input
                  id="transaction-amount"
                  type="text"
                  placeholder="500000"
                  {...field}
                  onChange={(e) => {
                    // Allow only numbers and one decimal point
                    const value = e.target.value.replace(/[^\d.]/g, "");
                    field.onChange(value);
                  }}
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

export default Step2TransactionAmount;
