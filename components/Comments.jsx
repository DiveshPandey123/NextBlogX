"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import Loading from "./Loading";

const getData = async (url) => {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error("Unable to load comments");
  } catch (error) {
    throw new Error(error.message);
  }
};

const Comments = ({ postSlug }) => {
  const { data: session, status } = useSession();
  const apiUrl = "/api/comments";
  const { data, mutate, isLoading } = useSWR(
    `${apiUrl}?postSlug=${postSlug}`,
    getData
  );

  const [desc, setDesc] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  const handleSubmit = async () => {
    if (desc.trim() !== "") {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug }),
      });
      clearComment();
    }
  };

  const clearComment = async () => {
    setEditingComment(null);
    setDesc("");
    mutate();
  };

  const handleEdit = async (comment) => {
    setEditingComment(comment);
    setDesc(comment.desc);
  };

  const handleUpdate = async () => {
    if (desc.trim() !== "") {
      const id = editingComment.id;
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug, updatedAt: new Date() }),
      });
      clearComment();
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      mutate();
    }
  };

  return (
    <>
      <h1 className=" font-bold text-xl lg:text-2xl mb-3">Comments</h1>
      {status === "authenticated" ? (
        <>
          <div className="flex gap-2 lg:gap-4 items-center">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="type your comment..."
              cols="30"
              rows="2"
              className="flex-1 max-w-[75%] p-2 softBg rounded-sm resize-none items-center outline-none"
            />
            <button
              onClick={editingComment ? handleUpdate : handleSubmit}
              className={`px-3 lg:px-6 py-2 font-semibold rounded-md text-white bg-cyan-700 `}
            >
              {editingComment ? "Update" : "Post"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center font-medium">
          <Link href="/login">Please login to post a comment</Link>
        </div>
      )}
      <div className="flex flex-col gap-5 lg:gap-7 mt-5">
        {isLoading ? (
          <Loading />
        ) : data?.length > 0 ? (
          data?.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <div className="h-10 w-fit">
                  <Image
                    src={item.user?.image}
                    alt={item.user?.name}
                    width={10}
                    height={10}
                    className="object-cover object-center border-2 border-white rounded-full contrast-100 w-10 h-10 "
                  />
                </div>
                <div className="flex flex-col softText">
                  <span className="font-medium textColor">
                    {item.user?.name}
                  </span>
                  <span className="text-sm">
                    {item?.updatedAt
                      ? "edited " +
                        formatDistanceToNowStrict(new Date(item?.updatedAt))
                      : formatDistanceToNowStrict(new Date(item?.createdAt))}
                    &nbsp;ago
                  </span>
                </div>
              </div>
              <p>{item.desc}</p>
              {session?.user?.email === item.user?.email && (
                <div className="w-fit flex gap-7 items-center text-sm text-start text-cyan-600 font-medium ">
                  <button onClick={() => handleEdit(item)}>edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500">delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <span className="text-center">No comments yet</span>
        )}
      </div>
    </>
  );
};

export default Comments;
