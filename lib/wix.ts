import { createClient } from "@wix/sdk";
import { bookings, services, availabilityTimeSlots } from "@wix/bookings";

export const getWixClientForSiteOwner = (accessToken: string) => {
  return createClient({
    modules: { bookings, services, availabilityTimeSlots },
    auth: {
      getAuthHeaders: async () => ({
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    },
  });
};
