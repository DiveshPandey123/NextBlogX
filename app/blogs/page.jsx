import Menu from "@/components/Menu";
import PostList from "@/components/PostList";
import React from "react";

const page = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams || "";

  return (
    <div className="pt-[90px] lg:pt-[110px]">
      <h1 className={`p-2 text-center font-bold capitalize ${cat}`}>
        {cat} blogs
      </h1>
      <div className="flex flex-col md:flex-row gap-3 xl:gap-7 w-full">
        <div className="flex-1 min-w-0">
          <PostList page={page} cat={cat} />
        </div>
        <div className="w-full md:w-[320px] xl:w-[350px] flex-shrink-0">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default page;
