import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  // Ensure we always return JSON, never HTML
  const jsonResponse = (data, status = 200) => {
    return NextResponse.json(data, {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  try {
    // Check if Prisma client is initialized
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return jsonResponse(
        { error: "Database connection not initialized", hint: "Please run 'npx prisma generate'" },
        500
      );
    }

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (connectError) {
      console.error("Database connection failed:", connectError);
      return jsonResponse(
        { 
          error: "Database connection failed",
          message: connectError.message || "Cannot connect to MongoDB",
          hint: "Please ensure MongoDB is running and DATABASE_URL is correct"
        },
        500
      );
    }

    const categories = await prisma.category.findMany({
      orderBy: { title: "asc" },
    });

    return jsonResponse(categories, 200);
  } catch (error) {
    console.error("CATEGORY ERROR:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Always return JSON, never HTML - this is critical!
    return jsonResponse(
      { 
        error: "Failed to fetch categories", 
        message: error.message || "Unknown error",
        errorName: error.name,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      500
    );
  }
}
