import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

const Post = ({ item }) => {
  if (!item) return null;

  const hasImage =
    typeof item.image === "string" && item.image.trim().length > 0;

  // ✅ HTML → plain text
  const plainTextDesc = item.desc ? item.desc.replace(/<[^>]+>/g, "") : "";

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 w-full">
      {/* IMAGE */}
      {hasImage && (
        <div className="flex-1 sm:h-[220px] overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title || "Blog image"}
            width={300}
            height={220}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {/* META */}
          <div className="flex items-center gap-2 text-sm softText">
            <span>
              {item.createdAt
                ? format(new Date(item.createdAt), "dd/MM/yyyy")
                : "—"}
            </span>
            <span className="font-bold">·</span>
            <span className="uppercase text-rose-600 font-medium">
              {item.catSlug || "general"}
            </span>
          </div>

          {/* TITLE */}
          <Link href={`/blogs/${item.slug}`}>
            <h2 className="text-xl font-bold hover:text-rose-600 transition">
              {item.title}
            </h2>
          </Link>

          {/* DESC (LIMITED + SAFE) */}
          {plainTextDesc && (
            <p className="text-base softText line-clamp-3">{plainTextDesc}</p>
          )}
        </div>

        {/* READ MORE — ALWAYS VISIBLE */}
        <Link
          href={`/blogs/${item.slug}`}
          className="mt-3 w-fit text-sm border-b-2 border-rose-600 textColor"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Post;
