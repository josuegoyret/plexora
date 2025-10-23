import { Card } from "@/components/ui/card";

const TimeSlotCardSkeleton = () => {
  return (
    <Card className="w-[300px] flex flex-col gap-3 border-none shadow-sm">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          </div>
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
        </div>

        <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
      </div>
    </Card>
  );
};

export default TimeSlotCardSkeleton;
