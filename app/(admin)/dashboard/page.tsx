"use client";

import { connectWixSite } from "@/actions/wix";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  return (
    <main>
      <Button onClick={connectWixSite}>Connect My Wix Site</Button>
      {accessToken && refreshToken && (
        <Card>
          <CardContent>
            <pre>{JSON.stringify({ accessToken, refreshToken }, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default DashboardPage;
