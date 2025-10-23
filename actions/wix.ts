"use server";

import { BASE_URL, WIX_APP_ID, WIX_CLIENT_SECRET } from "@/config/constants";
import { getWixClientForSiteOwner } from "@/lib/wix";
import { redirect } from "next/navigation";
import {
  BookingResponse,
  QueryServicesResponse,
  QueryStaffMembersResponse,
} from "@/types/wix";
import { AvailabilityTimeSlotsResponse } from "@/lib/types";

const WIX_SITE_OWNER_REFRESH_TOKEN =
  "OAUTH2.eyJraWQiOiJkZ0x3cjNRMCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQxZTEyM2IxLWMxYzMtNGE0YS1hMWZiLTM1ODI5YjUzYjA5OFwifSIsImlhdCI6MTc2MTE2MjIwMSwiZXhwIjoxODI0MjM0MjAxfQ.SLCpsa2qusNsWxBK1F29oZhGrPA9s9f21EDi9BZ_j3Q";

export const connectWixSite = async () => {
  const redirectUri = encodeURIComponent(`${BASE_URL}/api/wix/callback`);
  const wixAuthUrl = `https://www.wix.com/installer/install?appId=${WIX_APP_ID}&redirectUrl=${redirectUri}`;
  redirect(wixAuthUrl);
};

export const getWixSiteOwnerAccessToken = async () => {
  const response = await fetch(`https://www.wixapis.com/oauth/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: WIX_APP_ID,
      client_secret: WIX_CLIENT_SECRET,
      refresh_token: WIX_SITE_OWNER_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    console.error(response.statusText);
    return null;
  }

  const data = (await response.json()) as {
    access_token: string;
  };

  return data.access_token;
};

export const queryServices = async () => {
  const accessToken = await getWixSiteOwnerAccessToken();
  if (!accessToken) {
    throw new Error("Failed to get Wix site owner access token");
  }
  const wixClient = getWixClientForSiteOwner(accessToken);

  const response = await fetch(
    `https://www.wixapis.com/bookings/v2/services/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: { paging: { limit: 15 }, filter: { hidden: { $eq: false } } },
      }),
    }
  );
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to query services");
  }
  return (await response.json()) as QueryServicesResponse;
};

export const queryStaffMembers = async () => {
  const accessToken = await getWixSiteOwnerAccessToken();
  if (!accessToken) {
    throw new Error("Failed to get Wix site owner access token");
  }

  const response = await fetch(
    `https://www.wixapis.com/bookings/v1/staff-members/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    console.error(response.statusText);
    return null;
  }
  return (await response.json()) as QueryStaffMembersResponse;
};

export const getAvailabilityTimeSlotsForService = async (serviceId: string) => {
  const accessToken = await getWixSiteOwnerAccessToken();
  if (!accessToken) {
    throw new Error("Failed to get Wix site owner access token");
  }

  const now = new Date();
  const start = new Date(now.setUTCHours(0, 0, 0))
    .toISOString()
    .replace("Z", "");
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
  const end = new Date(endOfWeek.setUTCHours(23, 59, 59))
    .toISOString()
    .replace("Z", "");

  const response = await fetch(
    "https://www.wixapis.com/_api/service-availability/v2/time-slots",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        serviceId,
        fromLocalDate: start,
        toLocalDate: end,
        cursorPaging: {
          limit: 5,
        },
      }),
    }
  );
  if (!response.ok) {
    console.error(await response.json());
    return null;
  }
  return (await response.json()) as AvailabilityTimeSlotsResponse;
};

export const bookTimeSlot = async (
  serviceId: string,
  scheduleId: string,
  startDate: string,
  endDate: string,
  locationId: string,
  resourceId: string,
  customer: { preferedName: string; email: string }
) => {
  const accessToken = await getWixSiteOwnerAccessToken();
  if (!accessToken) {
    throw new Error("Failed to get Wix site owner access token");
  }

  const response = await fetch("https://www.wixapis.com/bookings/v2/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      booking: {
        bookedEntity: {
          slot: {
            serviceId: serviceId,
            scheduleId: scheduleId,
            startDate: startDate,
            endDate: endDate,
            location: {
              id: locationId,
              locationType: "OWNER_BUSINESS",
            },
            resource: {
              id: resourceId,
            },
          },
        },
        contactDetails: {
          firstName: customer.preferedName,
          email: customer.email,
        },
        selectedPaymentOption: "UNDEFINED",
        totalParticipants: 1,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Booking failed:", errorData);
    throw new Error(errorData.message || "Failed to book time slot");
  }

  const result = await response.json();
  console.log("Booking successful:", result);
  return result as BookingResponse;
};
