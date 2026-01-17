import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// =====================
// GET COMMENTS
// =====================
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    if (!postSlug) {
      return NextResponse.json([], { status: 200 });
    }

    const comments = await prisma.comment.findMany({
      where: { postSlug },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
};

// =====================
// ADD COMMENT
// =====================
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { error: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const { desc, postSlug } = await req.json();

    if (!desc || !postSlug) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        desc,
        postSlug,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
};
