"use client";

import { useWidgetState, useWidgetProps } from "@/app/hooks";
import { determineStep, type InquiryData } from "@/lib/inquiry-helpers";
import Step1TransactionType from "./steps/step1-transaction-type";
import Step2TransactionAmount from "./steps/step2-transaction-amount";
import Step3PropertyAddress from "./steps/step3-property-address";
import Step4AgreementStatus from "./steps/step4-agreement-status";
import Step5ContactInfo from "./steps/step5-contact-info";

const StartInquiryPage = () => {
  // Get initial data from tool output (if provided conversationally)
  const toolOutput = useWidgetProps<{
    step?: number;
    inquiryData?: Partial<InquiryData>;
  }>();

  // Get persisted state
  const [inquiryState, setInquiryState] = useWidgetState<InquiryData>(() => {
    // Merge tool output with default state
    const initialData = toolOutput?.inquiryData || {};
    return {
      ...initialData,
    } as InquiryData;
  });

  // Determine which step to show
  const currentStep = toolOutput?.step || determineStep(inquiryState || {});

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1TransactionType />;
      case 2:
        return <Step2TransactionAmount />;
      case 3:
        return <Step3PropertyAddress />;
      case 4:
        return <Step4AgreementStatus />;
      case 5:
        return <Step5ContactInfo />;
      default:
        return <Step1TransactionType />;
    }
  };

  return <>{renderStep()}</>;
};

export default StartInquiryPage;
