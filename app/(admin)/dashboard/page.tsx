"use client";

import { connectWixSite } from "@/actions/wix";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return <Button onClick={connectWixSite}>Connect My Wix Site</Button>;
};

export default DashboardPage;
