import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getBaseUrl } from "@/utils/getBaseUrl";

export const getCategories = async () => {
  const res = await fetch(`${getBaseUrl()}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const CategoryList = async () => {
  let data = [];

  try {
    data = await getCategories();
  } catch (error) {
    console.error("❌ CATEGORY LIST ERROR:", error.message);
  }

  return (
    <div>
      <h1 className="my-4 sm:my-6 lg:my-9 text-xl sm:text-2xl lg:text-3xl font-bold">
        Popular Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full gap-3">
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              key={item.id}
              href={`/blogs?cat=${item.slug}`}
              className={`flex gap-3 font-medium items-center capitalize h-16 w-full px-2 lg:px-4 justify-center rounded-lg ${item.slug}`}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="rounded-full w-10 h-10 object-cover"
                />
              )}
              {item.title}
            </Link>
          ))
        ) : (
          <p className="min-h-[10vh] flex items-center justify-center font-semibold">
            No categories available
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
