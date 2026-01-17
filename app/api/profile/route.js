import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not Authenticated" },
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  try {
    // Filter posts by userEmail
    const posts = await prisma.post.findMany({
      where: { userEmail: session.user.email },
      orderBy: { createdAt: "desc" },
      include: { cat: true },
    });
    
    if (posts.length === 0) {
      return NextResponse.json(
        { error: "Posts not found!", message: "No posts available" },
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return NextResponse.json(posts, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("PROFILE POSTS ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
