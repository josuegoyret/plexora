"use server";

import { BASE_URL, WIX_APP_ID } from "@/config/constants";
import { redirect } from "next/navigation";

export const connectWixSite = async () => {
  const redirectUri = encodeURIComponent(`${BASE_URL}/api/wix/callback`);
  const wixAuthUrl = `https://www.wix.com/installer/install?appId=${WIX_APP_ID}&redirectUrl=${redirectUri}`;
  redirect(wixAuthUrl);
};
