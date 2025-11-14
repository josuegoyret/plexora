export type InquiryData = {
  transactionType?: "purchase" | "sale";
  transactionAmount?: number;
  propertyAddress?: string;
  agreementSigned?: boolean;
  contactInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
};

/**
 * Determines the current step based on what data is missing
 */
export function determineStep(data: Partial<InquiryData>): number {
  if (!data.transactionType) return 1;
  if (!data.transactionAmount) return 2;
  if (!data.propertyAddress) return 3;
  if (data.agreementSigned === undefined) return 4;
  if (
    !data.contactInfo?.fullName ||
    !data.contactInfo?.email ||
    !data.contactInfo?.phone
  ) {
    return 5;
  }
  return 6; // All complete
}

/**
 * Gets a user-friendly message for the current step
 */
export function getStepMessage(
  step: number,
  data: Partial<InquiryData>
): string {
  switch (step) {
    case 1:
      return "Let's start your property closing inquiry. What type of transaction is this?";
    case 2:
      return `Great! You selected ${data.transactionType}. What's the transaction amount?`;
    case 3:
      return `Transaction amount: $${data.transactionAmount?.toLocaleString()}. What's the property address?`;
    case 4:
      return `Property address: ${data.propertyAddress}. Do you have a signed Agreement of Purchase and Sale?`;
    case 5:
      return `Agreement status: ${
        data.agreementSigned ? "Signed" : "Not signed"
      }. Please provide your contact information.`;
    case 6:
      return "All information collected! Creating your inquiry...";
    default:
      return "Let's start your property closing inquiry.";
  }
}

/**
 * Validates if all required data is present
 */
export function isInquiryComplete(data: Partial<InquiryData>): boolean {
  return (
    !!data.transactionType &&
    !!data.transactionAmount &&
    !!data.propertyAddress &&
    data.agreementSigned !== undefined &&
    !!data.contactInfo?.fullName &&
    !!data.contactInfo?.email &&
    !!data.contactInfo?.phone
  );
}
