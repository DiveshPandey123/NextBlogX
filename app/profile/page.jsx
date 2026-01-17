"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

// =====================
// SAFE FETCH
// =====================
const getData = async () => {
  try {
    const res = await fetch("/api/profile", {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================
  // AUTH REDIRECT (SAFE)
  // =====================
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // =====================
  // FETCH BLOGS
  // =====================
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      setLoading(true);
      const blogs = await getData();
      setData(blogs);
      setLoading(false);
    };

    fetchData();
  }, [status]);

  // =====================
  // LOADING STATE
  // =====================
  if (status === "loading" || loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl softText">Loading profile...</p>
      </div>
    );
  }

  // =====================
  // PAGE UI
  // =====================
  return (
    <div className="lg:mt-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl lg:text-3xl text-rose-500">
          Your Profile
        </h1>

        <button
          onClick={() => signOut()}
          className="px-5 py-2 softBg rounded-lg cursor-pointer"
        >
          Logout
        </button>
      </div>

      <p className="text-lg mb-4">
        Welcome <span className="font-bold">{session?.user?.name}</span> to your
        personalized profile page.
        <br />
        Share your experiences and inspire others with your thoughts.
      </p>

      {data.length > 0 && (
        <h2 className="font-semibold text-2xl mb-4">Recent Blogs</h2>
      )}

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 font-semibold">
          <p className="text-2xl text-center">You don’t have any blogs yet.</p>
          <Link href="/write" className="px-5 py-3 softBg rounded-lg">
            Start writing
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
