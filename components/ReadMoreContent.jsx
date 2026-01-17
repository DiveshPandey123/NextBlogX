"use client";

import { useState } from "react";

const ReadMoreContent = ({ html }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-lg leading-relaxed">
      <div
        className={`relative ${
          !expanded ? "max-h-[420px] overflow-hidden" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-4 px-4 py-2 rounded-md border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition"
        >
          Read more
        </button>
      )}
    </div>
  );
};

export default ReadMoreContent;
