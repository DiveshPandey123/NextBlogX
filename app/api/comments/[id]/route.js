import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Update a Single Comment
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json("Not Authenticated", { status: 401 });
  }
  try {
    const { id } = params;
    const { desc, updatedAt } = await req.json();
    const existingComment = await prisma.comment.findFirst({
      where: { id, userEmail: session.user.email },
    });
    if (!existingComment) {
      return NextResponse.json("Comment not found!", { status: 404 });
    }
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { desc, updatedAt },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};

// Delete a Single Comment
export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json("Not Authenticated", { status: 401 });
  }
  try {
    const { id } = params;
    const existingComment = await prisma.comment.findFirst({
      where: { id, userEmail: session.user.email },
    });
    if (!existingComment) {
      return NextResponse.json("Comment not found!", { status: 404 });
    }
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json("Comment deleted successfully", { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
