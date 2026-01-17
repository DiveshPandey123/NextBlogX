// utils/helper.js

// ✅ PLAIN TEXT EXTRACTOR
export const getPlainText = (html = "") => {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")   // remove HTML tags
    .replace(/\s+/g, " ")      // extra spaces
    .trim();
};

// ✅ SLUG CREATOR
export const createSlug = (title) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    Date.now()
  );
};

// ✅ CLOUDINARY UPLOAD
export const handleFileUpload = async (file, slug) => {
  const data = new FormData();
  data.append("file", file);
  data.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();
  return result.secure_url;
};


// ✅ DELETE OLD IMAGE FROM CLOUDINARY
export const deleteOldFile = async (publicId) => {
  if (!publicId) return;

  try {
    const res = await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!res.ok) {
      console.error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting old file:", error);
  }
};



// ✅ REACT QUILL MODULES
export const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    // [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

