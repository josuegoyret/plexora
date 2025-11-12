import Image from "next/image";
import Link from "next/link";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-[490px] w-full fixed top-0 left-0 border border-red-500 -z-10 pointer-events-none" />
      <div className="w-full max-w-6xl mx-auto p-2 space-y-3">
        <Link href="/" className="block">
          <div className="flex items-center gap-2">
            <Image
              src="/plexora-logo.png"
              alt="Plexora"
              width={16}
              height={16}
            />
            <h1 className="openai-body-regular">Plexora</h1>
          </div>
        </Link>
        {children}
      </div>
    </>
  );
};

export default ShopLayout;
