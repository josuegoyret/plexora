"use client";

import { useWidgetState, useCallTool } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { type InquiryData } from "@/lib/inquiry-helpers";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Step4AgreementStatus = () => {
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>({});
  const callTool = useCallTool();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (signed: boolean) => {
    setLoading(true);
    try {
      const newState = {
        ...inquiryState,
        agreementSigned: signed,
      };
      setInquiryState(newState);

      // Call tool with updated data to proceed to next step
      await callTool("start_property_closing_inquiry", {
        transactionType: inquiryState?.transactionType,
        transactionAmount: inquiryState?.transactionAmount,
        propertyAddress: inquiryState?.propertyAddress,
        agreementSigned: signed,
        contactInfo: inquiryState?.contactInfo,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const currentValue = inquiryState?.agreementSigned;

  return (
    <Card className="w-full md:w-[356px] flex flex-col gap-3 shadow-none p-2 pb-3">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-4">
          <div className="openai-body-regular-emphasized">Agreement status</div>
          <p className="openai-body-small-regular text-muted-foreground">
            Do you have a signed Agreement of Purchase and Sale?
          </p>

          <div
            data-slot="radio-group"
            className="flex flex-col gap-3 mt-2"
            role="radiogroup"
          >
            <Field orientation="horizontal" className="cursor-pointer">
              <FieldLabel
                htmlFor="agreement-yes"
                className="cursor-pointer flex items-center gap-2 p-3 rounded-md border hover:bg-accent has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary"
                data-state={currentValue === true ? "checked" : "unchecked"}
              >
                <input
                  type="radio"
                  id="agreement-yes"
                  value="yes"
                  checked={currentValue === true}
                  onChange={() => handleSelect(true)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  role="radio"
                  aria-checked={currentValue === true}
                  disabled={loading}
                />
                <span>Yes</span>
              </FieldLabel>
            </Field>

            <Field orientation="horizontal" className="cursor-pointer">
              <FieldLabel
                htmlFor="agreement-no"
                className="cursor-pointer flex items-center gap-2 p-3 rounded-md border hover:bg-accent has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary"
                data-state={currentValue === false ? "checked" : "unchecked"}
              >
                <input
                  type="radio"
                  id="agreement-no"
                  value="no"
                  checked={currentValue === false}
                  onChange={() => handleSelect(false)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  role="radio"
                  aria-checked={currentValue === false}
                  disabled={loading}
                />
                <span>No</span>
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

export default Step4AgreementStatus;
