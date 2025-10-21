"use client";

import Image from "next/image";
import { useMaxHeight } from "../hooks";
import { useIsChatGptApp } from "../hooks";
import { Info } from "lucide-react";
import Link from "next/link";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const maxHeight = useMaxHeight() ?? undefined;
  const isChatGptApp = useIsChatGptApp();
  return (
    <div
      className="w-full p-4 md:p-6 overflow-auto"
      style={{
        maxHeight,
      }}
    >
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

        {!isChatGptApp && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <p className="openai-body-small-regular text-blue-900 dark:text-blue-100">
                  This app is designed for ChatGPT. Open it from ChatGPT for the
                  best experience.
                </p>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
