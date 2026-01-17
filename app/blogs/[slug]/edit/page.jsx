"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import {
  createSlug,
  deleteOldFile,
  handleFileUpload,
  modules,
} from "@/utils/helper";

const getAllCategories = async () => {
  try {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error("Unable to get categories");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPost = async (slug) => {
  try {
    const res = await fetch(`/api/posts/${slug}`, { cache: "no-cache" });
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const page = ({ params }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    const fetchData = async () => {
      try {
        const blogData = await getPost(params.slug);
        setTitle(blogData.title);
        setDesc(blogData.desc);
        setImage(blogData.image);
        setSlug(blogData.slug);
        setCatSlug(blogData.catSlug);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchCategories();
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    setSlug(createSlug(title));
  }, [title]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const handleSubmit = async () => {
    try {
      let imageUrl = image;
      if (file) {
        imageUrl = await handleFileUpload(file, slug);
        // await deleteOldFile(params.slug);
      }
      const res = await fetch(`/api/posts/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          image: imageUrl,
          slug: createSlug(title),
          catSlug,
          updatedAt: new Date(),
        }),
      });
      if (res.ok) router.push("/profile");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={title}
        className="p-4 lg:p-6 text-2xl lg:text-3xl bg-transparent outline-none input mb-3"
      />
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 bgColor">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            id="imageUpload"
            type="file"
            accept="image/*"
            className={"hidden"}
          />
          <div className="flex gap-3 items-center truncate">
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-transparent border-2 cursor-pointer softBorder"
            >
              <FaPlus size={16} />
            </label>
            {file && <span className="truncate flex-1">{file.name}</span>}
          </div>
          <select
            className="softBorder border-2 rounded-md p-2 textColor bg-transparent sm:w-fit"
            name="catSlug"
            onChange={(e) => setCatSlug(e.target.value)}
            defaultValue={catSlug}
          >
            <option
              value="Select Category"
              disabled
              className="text-center p-4 textColor bgColor"
            >
              Select Category
            </option>
            {categories?.length > 0 &&
              categories?.map((item) => (
                <option
                  key={item.id}
                  value={item.slug}
                  className="text-center p-4 textColor bgColor capitalize"
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[100%] flex-1 textColor">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={desc}
            onChange={setDesc}
            placeholder="Tell your story..."
          />
        </div>
      </div>
      <button
        onClick={() => handleSubmit()}
        className=" mt-5 px-4 py-2 sm:w-fit sm:mx-auto sm:px-6 sm:font-medium rounded-3xl bg-[#1a8917] text-white "
      >
        Update
      </button>
    </div>
  );
};

export default page;
