import Link from "next/link";
import React from "react";
import { getCategories } from "./CategoryList";

const MenuCategories = async () => {
  const data = await getCategories();

  return (
    <div className="hidden sm:block">
      <h2 className="font-normal mt-4 softText">Discover by topic</h2>
      <h1 className="font-bold text-lg lg:text-xl">Categories</h1>
      <div className="my-4 grid grid-cols-2 gap-3 capitalize w-full font-medium">
        {data?.length > 0 ? (
          data?.map((item) => (
            <Link
              key={item.id}
              href={`/blogs?cat=${item.slug}`}
              className={`px-4 py-2 lg:px-4 rounded-lg ${item.slug}`}
            >
              {item.title}
            </Link>
          ))
        ) : (
          <p className="min-h-[10vh] flex w-full items-center justify-center font-semibold">
            Unable to display categories
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuCategories;
