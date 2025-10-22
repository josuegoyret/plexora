import Image from "next/image";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-4 md:p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <Link href="/" className="block">
          <div className="flex items-center gap-2">
            <Image
              src="/plexora-logo.png"
              alt="Plexora"
              width={16}
              height={16}
            />
            <h1 className="openai-body-regular text-muted">Plexora</h1>
          </div>
        </Link>

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
