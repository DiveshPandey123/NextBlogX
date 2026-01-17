import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getBaseUrl } from "@/utils/getBaseUrl";

const getData = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts/popular`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

const MenuPosts = async ({ title, subtitle, withImage }) => {
  const blogs = await getData();

  if (!blogs.length) {
    return (
      <div className="mt-6">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="softText mt-4">No posts found</p>
      </div>
    );
  }

  return (
    <div>
      {subtitle && <h2 className="softText">{subtitle}</h2>}
      <h1 className="font-bold text-xl">{title}</h1>

      <div className="flex flex-col gap-4 mt-4">
        {blogs.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            {withImage && (
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.title}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            )}

            <div>
              <Link href={`/blogs/${item.slug}`}>
                <h3 className="font-medium text-sm line-clamp-2">
                  {item.title}
                </h3>
              </Link>

              <span className="text-xs softText">
                {item.createdAt
                  ? format(new Date(item.createdAt), "dd MMM yyyy")
                  : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPosts;
