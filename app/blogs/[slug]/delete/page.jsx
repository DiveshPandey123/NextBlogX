"use client";
import { deleteOldFile } from "@/utils/helper";
import Link from "next/link";

const deletePost = async (slug) => {
  if (slug) {
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      window.location.href = "/profile";
    }
  }
};

const page = ({ params }) => {
  const { slug } = params;
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-100 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen h-screen overflow-hidden">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md p-3">
            <div className=" px-4 pb-4 sm:p-5 sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-semibold leading-6 text-red-500">
                  Delete Blog
                </h3>
                <p className="text-base text-black mt-1 font-medium">
                  You are about to permanently delete this post. This action
                  cannot be reversed and data will be lost forever.
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 sm:gap-6 font-semibold text-sm text-center">
              <button
                onClick={() => deletePost(slug)}
                className="w-full rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700 sm:w-auto sm:px-5 "
              >
                Confirm
              </button>
              <Link
                href={"/profile"}
                className="w-full rounded-md px-3 py-2 text-red-600 border-2 border-gray-400 hover:bg-gray-200 sm:w-auto sm:px-5"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
