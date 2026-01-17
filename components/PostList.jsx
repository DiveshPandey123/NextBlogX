import Post from "./Post";
import React from "react";
import Pagination from "./Pagination";
import { getBaseUrl } from "@/utils/getBaseUrl";

const POST_PER_PAGE = 4;

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `${getBaseUrl()}/api/posts?page=${page}&cat=${cat || ""}`,
      { cache: "no-store" },
    );

    if (!res.ok) return { posts: [], count: 0 };
    return res.json();
  } catch {
    return { posts: [], count: 0 };
  }
};

const PostList = async ({ page = 1, cat }) => {
  const { posts, count } = await getData(page, cat);

  if (!posts.length) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="softText">No posts available</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h1 className=" mt-4 mb-4 sm:mb-4 sm:mt-6 lg:mt-9 text-xl sm:text-2xl lg:text-3xl font-bold">
        Recent Posts
      </h1>
      {posts.map((item) => (
        <Post key={item.id} item={item} />
      ))}

      <Pagination
        page={page}
        hasPrev={POST_PER_PAGE * (page - 1) > 0}
        hasNext={POST_PER_PAGE * page < count}
      />
    </div>
  );
};

export default PostList;
