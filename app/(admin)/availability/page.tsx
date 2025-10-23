import { Suspense } from "react";
import ServicesCards from "@/components/services-cards";
import ServiceCardSkeleton from "@/components/service-card-skeleton";

const AvailabilityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Availability Overview</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse all available services and their time slots. Click on any
          service to view detailed availability and book your appointment.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Services</h2>
        <Suspense
          fallback={
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <ServicesCards />
        </Suspense>
      </div>
    </div>
  );
};

export default AvailabilityPage;
