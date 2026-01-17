"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBaseUrl } from "@/utils/getBaseUrl";

const Featured = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/posts/featured`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setBlog(null);
        } else {
          const data = await res.json();
          setBlog(data);
        }
      } catch {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="softText text-xl">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="softText text-xl">No featured post available</p>
      </div>
    );
  }

  if (!blog.slug) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="softText text-xl">
          Featured post is missing a slug. Please check your database.
        </p>
      </div>
    );
  }

  // Limit the description to 250 characters (plain text, no HTML tags)
  const plainTextDesc = blog.desc ? blog.desc.replace(/<[^>]+>/g, "") : "";
  const shortDesc =
    plainTextDesc.length > 250
      ? plainTextDesc.slice(0, 250) + "..."
      : plainTextDesc;

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-6">
      <div className="flex-1 relative h-[300px] rounded-xl overflow-hidden">
        <Image
          src={blog.image || "/placeholder.png"}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <Link href={`/blogs/${blog.slug}`}>
          <h2 className="text-3xl font-bold">{blog.title}</h2>
        </Link>

        <div className="softText">{shortDesc}</div>

        <Link
          href={`/blogs/${blog.slug}`}
          className="softBg px-4 py-2 rounded-lg w-fit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Featured;
