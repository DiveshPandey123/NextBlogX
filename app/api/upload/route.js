import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = Date.now() + "-" + file.name.replace(/\s/g, "");
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            url: `/uploads/${fileName}`,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
};

