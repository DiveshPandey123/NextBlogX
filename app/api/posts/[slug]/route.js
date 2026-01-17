import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/* ===============================
   GET SINGLE POST
================================ */
export const GET = async (req, { params }) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: { cat: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("GET POST ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/* ===============================
   UPDATE POST
================================ */
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const { title, desc, image, category, slug } = await req.json();

    const post = await prisma.post.findFirst({
      where: {
        slug: params.slug,
        userEmail: session.user.email,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        title,
        desc,
        image,
        slug,
        ...(category && {
          cat: { connect: { slug: category } }, // ✅ SAFE UPDATE
        }),
      },
      include: { cat: true },
    });

    revalidatePath("/");
    revalidatePath(`/blogs/${updatedPost.slug}`);

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.error("UPDATE POST ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/* ===============================
   DELETE POST
================================ */
export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        slug: params.slug,
        userEmail: session.user.email,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await prisma.post.delete({
      where: { id: post.id },
    });

    // 🔥 THIS FIXES "delete ke baad home page pe dikh raha"
    revalidatePath("/");
    revalidatePath("/blogs");

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE POST ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
