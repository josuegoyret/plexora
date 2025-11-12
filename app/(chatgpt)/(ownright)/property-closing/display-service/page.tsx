import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const DisplayServicePage = () => {
  return (
    <Card className="w-full md:w-[356px] flex flex-col gap-3 shadow-none p-2 pb-3">
      <div className="relative w-full aspect-[340/244] overflow-hidden rounded-2xl">
        <Image
          src={"/ownright-marketing.png"}
          alt={"Ownright Marketing Presentational"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="openai-h3">{"Start your property close"}</div>

          <p className="openai-body-small-regular text-muted-foreground line-clamp-2">
            {
              "We'll ask a few short questions to get you started with closing your propertly."
            }
          </p>
        </div>

        <Button className="w-full" variant="black">
          {"Start your closing"}
        </Button>
      </div>
    </Card>
  );
};

export default DisplayServicePage;
