import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//Get Popular Blogs (most recent posts)
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      take: 6,
      orderBy: { createdAt: "desc" }, // Use createdAt instead of views
      include: { cat: true }, // Include category instead of user
    });
    return NextResponse.json(posts, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("POPULAR POSTS ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
