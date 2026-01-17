"use client";

import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { getBaseUrl } from "@/utils/getBaseUrl";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? window.location.href
          : `${getBaseUrl()}`;

      // Web Share API (mobile support)
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("❌ Share failed:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <FaShareAlt />
      {copied ? "Copied!" : "Share"}
    </button>
  );
};

export default ShareButton;
