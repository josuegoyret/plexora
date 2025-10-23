"use client";

import { useIsChatGptApp } from "@/app/hooks";
import { Info } from "lucide-react";

const ChatGptBanner = () => {
  const isChatGptApp = useIsChatGptApp();
  if (!isChatGptApp) return null;
  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
      <div className="flex items-center gap-3">
        <Info className="w-4 h-4" />
        <div className="flex-1 min-w-0">
          <p className="openai-body-small-regular text-blue-900 dark:text-blue-100">
            This app is designed for ChatGPT. Open it from ChatGPT for the best
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatGptBanner;
