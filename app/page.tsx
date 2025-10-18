"use client";

import Link from "next/link";
import { useMaxHeight, useIsChatGptApp } from "./hooks";
import { barberShops } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin } from "lucide-react";

export default function Home() {
  const maxHeight = useMaxHeight() ?? undefined;
  const isChatGptApp = useIsChatGptApp();

  return (
    <div
      className="w-full p-4 md:p-6 overflow-auto"
      style={{
        maxHeight,
      }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="openai-h1">Nearby Barber Shops</h1>
          <p className="openai-body-regular text-muted-foreground">
            Browse available barber shops and book your next appointment
          </p>
        </div>

        {!isChatGptApp && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <p className="openai-body-small-regular text-blue-900 dark:text-blue-100">
                  This app is designed for ChatGPT. Open it from ChatGPT for the
                  best experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Shop Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {barberShops.map((shop) => (
            <Card key={shop.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="openai-h3">{shop.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    ⭐ {shop.rating}
                  </Badge>
                </div>
                <CardDescription className="openai-body-small-regular flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{shop.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="openai-body-small-regular text-muted-foreground mb-3">
                  {shop.description}
                </p>
                <div className="space-y-2">
                  <div className="openai-body-small-regular flex items-center gap-2">
                    <span className="openai-body-small-emphasized">
                      Price Range:
                    </span>
                    <Badge variant="outline">{shop.priceRange}</Badge>
                  </div>
                  <div className="openai-body-small-regular">
                    <span className="openai-body-small-emphasized">
                      Services:
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {shop.services.slice(0, 3).map((service) => (
                        <span
                          key={service.id}
                          className="openai-caption-regular text-muted-foreground"
                        >
                          {service.name}
                          {service !==
                            shop.services[
                              Math.min(2, shop.services.length - 1)
                            ] && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/slots?shopId=${shop.id}`} className="w-full">
                  <Button className="w-full">View Available Slots</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
