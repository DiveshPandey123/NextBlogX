import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";
import { getPlainText } from "@/utils/helper";

/* ===============================
   GET ALL POSTS (with pagination)
================================ */
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat");

    const POST_PER_PAGE = 4;

    const where = cat ? { catSlug: cat } : {};

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: POST_PER_PAGE * (page - 1),
        take: POST_PER_PAGE,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    console.error("❌ GET POSTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

/* ===============================
   CREATE NEW POST
================================ */
export const POST = async (req) => {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { title, desc, slug, image, category } = await req.json();

    if (!title || !desc || !slug || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔥 excerpt generation
    const plainText = getPlainText(desc);
    const excerpt = plainText.slice(0, 180);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        desc: excerpt,     // short preview
        content: desc,     // full blog
        image,
        userEmail: session.user.email,
        catSlug: category, // ✅ REQUIRED BY PRISMA
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("❌ POST CREATE ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
