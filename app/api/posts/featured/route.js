import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//Get Featured Blog
export const GET = async () => {
  try {
    // Get the most recent post as featured (since views field doesn't exist in schema)
    const post = await prisma.post.findFirst({
      orderBy: { createdAt: "desc" },
      include: { cat: true }, // Include category instead of user
    });
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found!", message: "No posts available" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("FEATURED POST ERROR:", err);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: err.message || "Failed to fetch featured post"
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
