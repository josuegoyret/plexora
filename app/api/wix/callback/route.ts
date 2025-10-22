import { BASE_URL, WIX_CLIENT_ID, WIX_CLIENT_SECRET } from "@/config/constants";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Missing code or state", { status: 400 });
  }

  const response = await fetch(`https://www.wixapis.com/oauth/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: WIX_CLIENT_ID,
      client_secret: WIX_CLIENT_SECRET,
      code,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    return new Response("Failed to get access token", { status: 500 });
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
  };

  const dashboardUrl = new URL("/dashboard", BASE_URL);
  dashboardUrl.searchParams.set("access_token", data.access_token);
  dashboardUrl.searchParams.set("refresh_token", data.refresh_token);

  redirect(dashboardUrl.toString());
}
