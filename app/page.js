import CategoryList from "@/components/CategoryList";
import FeaturedClient from "@/components/FeaturedClient";
import Menu from "@/components/Menu";
import PostList from "@/components/PostList";

// =====================
// HOME PAGE (SAFE)
// =====================
export default function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const cat = searchParams?.cat || "";

  return (
    <div className="w-full">
      {/* FEATURED */}
      <section className="mb-6">
        {/* Featured internally safe hai (fallback UI) */}
        <FeaturedClient />
      </section>

      {/* CATEGORY */}
      <section className="mb-6">
        <CategoryList />
      </section>

      {/* POSTS + MENU */}
      <section className="flex flex-col md:flex-row gap-4 xl:gap-7 w-full">
        <div className="flex-1 min-w-0">
          {/* PostList internally safe */}
          <PostList page={page} cat={cat} />
        </div>

        <div className="w-full md:w-[320px] xl:w-[350px] flex-shrink-0">
          <Menu />
        </div>
      </section>
    </div>
  );
}
