"use client";

import { useWidgetState, useCallTool, useSendMessage } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { type InquiryData } from "@/lib/inquiry-helpers";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Step1TransactionType = () => {
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>({});
  const callTool = useCallTool();
  const sendMessage = useSendMessage();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (type: "purchase" | "sale") => {
    setLoading(true);
    try {
      const newState = {
        ...inquiryState,
        transactionType: type,
      };
      setInquiryState(newState);

      // Call tool with updated data to proceed to next step
      await callTool("start_property_closing_inquiry", {
        transactionType: type,
        transactionAmount: inquiryState?.transactionAmount,
        propertyAddress: inquiryState?.propertyAddress,
        agreementSigned: inquiryState?.agreementSigned,
        contactInfo: inquiryState?.contactInfo,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const currentValue = inquiryState?.transactionType;

  return (
    <Card className="w-full md:w-[356px] flex flex-col gap-3 shadow-none p-2 pb-3">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-4">
          <div className="openai-body-regular-emphasized">Type of closing</div>
          <p className="openai-body-small-regular text-muted-foreground">
            Select the type of transaction
          </p>

          <div
            data-slot="radio-group"
            className="flex flex-col gap-3 mt-2"
            role="radiogroup"
          >
            <Field orientation="horizontal" className="cursor-pointer">
              <FieldLabel
                htmlFor="closing-type-purchase"
                className="cursor-pointer flex items-center gap-2 p-3 rounded-md border hover:bg-accent has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary"
                data-state={
                  currentValue === "purchase" ? "checked" : "unchecked"
                }
              >
                <input
                  type="radio"
                  id="closing-type-purchase"
                  value="purchase"
                  checked={currentValue === "purchase"}
                  onChange={() => handleSelect("purchase")}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  role="radio"
                  aria-checked={currentValue === "purchase"}
                  disabled={loading}
                />
                <span>Purchase</span>
              </FieldLabel>
            </Field>

            <Field orientation="horizontal" className="cursor-pointer">
              <FieldLabel
                htmlFor="closing-type-sale"
                className="cursor-pointer flex items-center gap-2 p-3 rounded-md border hover:bg-accent has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary"
                data-state={currentValue === "sale" ? "checked" : "unchecked"}
              >
                <input
                  type="radio"
                  id="closing-type-sale"
                  value="sale"
                  checked={currentValue === "sale"}
                  onChange={() => handleSelect("sale")}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  role="radio"
                  aria-checked={currentValue === "sale"}
                  disabled={loading}
                />
                <span>Sale</span>
              </FieldLabel>
            </Field>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      )}
    </Card>
  );
};

export default Step1TransactionType;
