import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

const BlogCard = ({ item }) => {
  if (!item) return null;

  const hasImage = typeof item.image === "string" && item.image.trim() !== "";

  return (
    <div className="flex flex-col max-w-2xl gap-3 mb-5">
      {/* IMAGE */}
      {hasImage && (
        <div className="sm:h-[225px] group overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title || "Blog image"}
            width={275}
            height={250}
            className="object-cover object-center w-full h-full rounded-lg group-hover:scale-105 transition-all duration-500 ease-in cursor-pointer"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 lg:gap-3">
        {/* META */}
        <div className="flex items-center gap-1 text-sm md:text-xs lg:text-base softText">
          <span className="bg-rose-600 rounded-full h-2 w-2 mt-[2px]" />
          <span>
            {item.createdAt
              ? format(new Date(item.createdAt), "dd/MM/yyyy")
              : "—"}
          </span>
          <span className="font-bold">-</span>
          <span className="text-rose-600 font-medium uppercase">
            {item.catSlug || "general"}
          </span>
        </div>

        {/* TITLE */}
        <Link href={`/blogs/${item.slug}`}>
          <h1 className="text-xl md:text-base lg:text-2xl font-bold">
            {item.title
              ? item.title.length > 50
                ? item.title.substring(0, 50) + "..."
                : item.title
              : "Untitled Blog"}
          </h1>
        </Link>

        {/* DESC (FIXED – NO HTML, NO PUSH ISSUE) */}
        {item.desc && (
          <p className="text-base lg:text-lg softText max-h-[4.5em] overflow-hidden">
            {item.desc.replace(/<[^>]+>/g, "").slice(0, 160)}...
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-between mx-8 text-sm sm:text-base font-medium">
          <Link
            href={`/blogs/${item.slug}`}
            className="textColor flex gap-2 items-center"
          >
            <FaExternalLinkAlt size={17} /> View
          </Link>

          <Link
            href={`/blogs/${item.slug}/edit`}
            className="text-cyan-600 flex gap-1 items-center"
          >
            <BiSolidPencil size={20} /> Edit
          </Link>

          <Link
            href={`/blogs/${item.slug}/delete`}
            className="text-red-500 flex gap-1 items-center"
          >
            <MdDelete size={19} /> Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
