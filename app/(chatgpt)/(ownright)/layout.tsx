import Image from "next/image";

const OwnrightLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <div className="h-[490px] w-full fixed top-0 left-0 border border-red-500 -z-10 pointer-events-none" /> */}
      <div className="w-full max-w-6xl mx-auto p-2 space-y-3">
        <div className="flex items-center gap-2">
          <Image
            src="/ownright-logo.png"
            alt="Ownright"
            width={24}
            height={24}
            className="rounded-[6px] object-cover"
          />
          <h1 className="openai-body-regular">Ownright</h1>
        </div>

        {children}
      </div>
    </>
  );
};

export default OwnrightLayout;
