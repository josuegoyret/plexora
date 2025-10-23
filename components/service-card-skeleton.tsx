import { Card } from "@/components/ui/card";

const ServiceCardSkeleton = () => {
  return (
    <Card className="w-[260px] flex flex-col gap-3 border-none shadow-none">
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-200 animate-pulse" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between p-0">
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
            <div className="h-5 bg-gray-200 rounded animate-pulse w-28" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCardSkeleton;
