"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";

import Loading from "@/components/Loading";
import { createSlug, handleFileUpload, modules } from "@/utils/helper";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth protection
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <Loading />;

  // 🖼️ Image preview handler
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!catSlug) return toast.error("Category is required");
    if (!desc.replace(/<[^>]*>/g, "").trim())
      return toast.error("Content is required");

    setLoading(true);

    try {
      const slug = createSlug(title);
      let imageUrl = "";

      if (file) imageUrl = await handleFileUpload(file, slug);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          slug,
          category: catSlug,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to publish");

      const data = await res.json();
      toast.success("Post published 🚀");
      router.push(`/blogs/${data.slug}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 🔝 Title + Category */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title..."
          className="flex-1 text-3xl font-bold bg-transparent outline-none border-b border-gray-600 pb-2"
        />

        <select
          value={catSlug}
          onChange={(e) => setCatSlug(e.target.value)}
          className="md:w-56 p-2 bg-[#111] border border-gray-600 text-white rounded"
        >
          <option value="">Category</option>
          <option value="coding">Coding</option>
          <option value="culture">Culture</option>
          <option value="food">Food</option>
          <option value="religion">Religion</option>
          <option value="food">Food</option>
          <option value="news">News</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      {/* 🖼️ Image Upload */}
      <label className="flex items-center gap-2 mb-4 cursor-pointer text-gray-300">
        <FaPlus />
        Add Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>

      {preview && (
        <div className="mb-6">
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 rounded-xl border border-gray-700 object-cover"
          />
        </div>
      )}

      {/* ✍️ Editor */}
      <div className="rounded-xl border border-gray-700 overflow-hidden">
        <ReactQuill value={desc} onChange={setDesc} modules={modules} />
      </div>

      {/* 🚀 Publish */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-green-600 hover:bg-green-700 transition text-white px-8 py-2 rounded-full shadow-lg disabled:opacity-60"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
