"use client";

import { useEffect, useState } from "react";
import Comments from "@/components/Comments";
import Menu from "@/components/Menu";
import ShareButton from "@/components/ShareButton";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { format } from "date-fns";
import Image from "next/image";

// =====================
// PAGE
// =====================
const Page = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // =====================
  // FETCH BLOG
  // =====================
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/posts/${params.slug}`, {
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

    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="softText">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl softText">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =====================
          TOP SECTION
         ===================== */}
      <div className="flex flex-col-reverse sm:flex-row gap-6 pt-4">
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl lg:text-4xl font-semibold">{blog.title}</h1>

          {/* AUTHOR */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border">
              <Image
                src={blog.user?.image || "/user.png"}
                alt={blog.user?.name || "author"}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold">
                {blog.user?.name || "Anonymous"}
              </span>
              <span className="text-sm softText">
                {blog.updatedAt
                  ? `Edited on ${format(
                      new Date(blog.updatedAt),
                      "dd MMMM, yyyy"
                    )}`
                  : `Posted on ${format(
                      new Date(blog.createdAt),
                      "dd MMMM, yyyy"
                    )}`}
              </span>
            </div>
          </div>

          {/* META */}
          <div className="flex gap-6 items-center flex-wrap">
            <span className="font-medium">{blog.views || 0} views</span>

            <span className="rounded-full px-4 py-1 text-white softBg capitalize">
              {blog.catSlug}
            </span>

            <ShareButton />
          </div>
        </div>

        {/* BLOG IMAGE */}
        <div className="flex-1 h-[260px] lg:h-[340px] overflow-hidden rounded-xl">
          <Image
            src={blog.image || "/placeholder.png"}
            alt={blog.title}
            width={700}
            height={400}
            priority
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* =====================
          CONTENT + READ MORE
         ===================== */}
      <div className="flex gap-6 mt-8">
        <div className="flex-1">
          <div className="text-lg leading-relaxed">
            <div
              className={`relative ${
                !expanded ? "max-h-[420px] overflow-hidden" : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: blog.desc || "",
              }}
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

          {/* COMMENTS */}
          <div className="mt-6">
            <Comments postSlug={params.slug} />
          </div>
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default Page;