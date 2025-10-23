import { connectWixSite } from "@/actions/wix";
import { CredentialsCard } from "@/components/credentials-card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <main>
      {/* <Button onClick={connectWixSite}>Connect My Wix Site</Button> */}
      <Suspense>
        <CredentialsCard />
      </Suspense>
    </main>
  );
};

export default DashboardPage;
