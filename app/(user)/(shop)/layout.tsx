"use client";

import Image from "next/image";
import { notFoundAction as notFound } from "@/actions/not-found";
import { Button } from "@/components/ui/button";
import { getShopById } from "@/lib/mock-data";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const router = useRouter();
  const shopId = params.shopId as string;

  const shop = shopId ? getShopById(shopId) : undefined;

  const handleBack = () => {
    router.back();
  };

  if (!shop || !shopId) return notFound();

  return (
    <div className="space-y-4">
      <div className="space-y-1 w-full">
        <Button variant="link" className="!px-0 h-auto" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex flex-col items-start justify-between gap-2 w-full">
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
          <p className="openai-body-small-regular text-muted">
            {shop.description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ShopLayout;
