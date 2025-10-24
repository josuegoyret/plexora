import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getShopById } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ServicesList from "@/components/services-list";
import { Suspense } from "react";
import ServiceCardSkeleton from "@/components/service-card-skeleton";
import { queryServices, queryStaffMembers } from "@/actions/wix";
import { Skeleton } from "@/components/ui/skeleton";

const ServicesPage = async ({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) => {
  const { shopId } = await params;

  const shop = shopId ? getShopById(shopId) : undefined;

  if (!shop || !shopId) return notFound();

  const servicesPromise = queryServices();
  const staffMembersPromise = queryStaffMembers();

  return (
    <div className="space-y-4">
      <div className="space-y-2.5 w-full">
        <Button variant="link" className="!px-0 h-auto" size="sm" asChild>
          <Link href={"/"}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div className="flex items-start justify-between gap-8 w-full">
          <div className="flex items-start gap-4">
            <div className="relative size-12 rounded-xs overflow-hidden">
              <Image
                src={shop.image}
                alt={shop.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="openai-body-emphasized">{shop.name}</div>
              <div className="openai-body-small-regular m-0">
                {shop.address}
              </div>
            </div>
          </div>
          <Badge variant="ghost">{shop.rating}</Badge>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="rounded-sm h-[84px]" />
            ))}
          </div>
        }
      >
        <ServicesList
          shopId={shopId}
          servicesPromise={servicesPromise}
          staffMembersPromise={staffMembersPromise}
        />
      </Suspense>
    </div>
  );
};

export default ServicesPage;
