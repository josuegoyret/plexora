"use client";

import { QueryServicesResponse, QueryStaffMembersResponse } from "@/types/wix";
import { use } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TabsContent } from "@radix-ui/react-tabs";
import ServiceCard from "./service-card";

const ServicesList = ({
  servicesPromise,
  staffMembersPromise,
}: {
  servicesPromise: Promise<QueryServicesResponse>;
  staffMembersPromise: Promise<QueryStaffMembersResponse>;
}) => {
  const { services } = use(servicesPromise);
  const { staffMembers } = use(staffMembersPromise);

  const defaultStaffMember = staffMembers.find((staff) => staff.default);

  return (
    <Tabs defaultValue={defaultStaffMember?.id ?? staffMembers[0].id}>
      <TabsList>
        {staffMembers.map((staff) => (
          <TabsTrigger value={staff.id} key={staff.id}>
            <div className="flex items-center gap-2">
              <Avatar className="size-4">
                <AvatarImage src={staff.mainMedia.image.url} alt={staff.name} />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{staff.name}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {staffMembers.map((staff) => {
        const staffServices = services.filter((service) =>
          service.staffMemberIds.includes(staff.resourceId)
        );
        return (
          <TabsContent value={staff.id} key={staff.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {staffServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ServicesList;
