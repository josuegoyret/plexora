import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const SuccessPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ shopId: string }>;
  searchParams: Promise<{ bookingId: string; email: string }>;
}) => {
  const [{ shopId }, { bookingId, email }] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1.5 items-start">
        <Button variant="link" className="!px-0 h-auto" size="sm" asChild>
          <Link href={`/services/${shopId}`}>
            <ArrowLeft className="w-4 h-4" />
            Back To Services
          </Link>
        </Button>
        <div className="openai-h3">Booking Completed</div>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center justify-center gap-1">
            <CheckCircle className="size-10 text-green-600" />
            <div className="openai-h2">Your Booking was Confirmed</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="openai-body-regular text-muted-foreground max-w-sm text-center text-pretty">
            Your appointment with ID{" "}
            <span className="font-bold">{bookingId}</span> has been successfully
            booked. A confirmation email has been sent to{" "}
            <span className="font-bold whitespace-nowrap">{email}</span>.
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/services/${shopId}`}>Book Another Appointment</Link>
          </Button>
        </CardFooter>
      </Card>
      ;
    </div>
  );
};

export default SuccessPage;
