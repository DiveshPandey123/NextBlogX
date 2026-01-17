"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
  return (
    <div className=" mt-4 lg:mt-7 flex justify-between text-white">
      <button
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
        className={`w-24 p-2 lg:p-3 ${
          !hasPrev ? " bg-[#dc143ca0] cursor-not-allowed text-slate-300" : "bg-rose-600 cursor-pointer"
        } `}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
        className={`w-24 p-2 lg:p-3 ${
          !hasNext ? " bg-[#dc143ca0] cursor-not-allowed text-slate-300" : "bg-rose-600 cursor-pointer"
        } `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
