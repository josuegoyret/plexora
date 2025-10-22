"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "./ui/card";

export const CredentialsCard = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  if (!accessToken || !refreshToken) return null;

  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify({ accessToken, refreshToken }, null, 2)}</pre>
      </CardContent>
    </Card>
  );
};
