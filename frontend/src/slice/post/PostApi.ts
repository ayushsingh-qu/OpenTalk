import api from "../../config";

// GET /api/v1/blog/blogs — returns { blog: BlogItem[] }
export const fetchAllBlogsApi = async () => {
  const res = await api.get("/api/v1/blog/blogs");
  return res.data;
};

// GET /api/v1/blog/:id — returns { blog: BlogItem }
export const fetchBlogByIdApi = async (id: string) => {
  const res = await api.get(`/api/v1/blog/${id}`);
  return res.data;
};

// Direct client-side signed upload to Cloudinary (fallback if backend /upload is not yet deployed)
const uploadToCloudinaryDirect = async (file: File) => {
  const cloudName = "dtzciejen";
  const apiKey = "258529623389743";
  const apiSecret = "ajKMYNXSgxfNtjUYu1FV4yVYhpY";
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "opentalk_blogs";
  const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error?.message || "Failed to upload image to Cloudinary");
  }
  return {
    success: true,
    url: json.secure_url || json.url,
    public_id: json.public_id,
  };
};

// POST /api/v1/blog/upload — uploads image to Cloudinary via backend, with seamless direct fallback
export const uploadBlogImageApi = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post("/api/v1/blog/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    // If backend /upload route returns 404 (e.g. deployed Cloudflare worker is not yet redeployed), fallback to direct upload
    return await uploadToCloudinaryDirect(file);
  }
};

// POST /api/v1/blog/post — returns { message, data: blog }
export const createBlogApi = async (title: string, content: string, imageUrl?: string | null) => {
  const res = await api.post("/api/v1/blog/post", { title, content, imageUrl });
  return res.data;
};

// PUT /api/v1/blog/:id — returns { message, data: blog }
export const editBlogApi = async (id: string, title: string, content: string, imageUrl?: string | null) => {
  const res = await api.put(`/api/v1/blog/${id}`, { title, content, imageUrl });
  return res.data;
};

// DELETE /api/v1/blog/:id — returns { message, data: blog }
export const deleteBlogApi = async (id: string) => {
  const res = await api.delete(`/api/v1/blog/${id}`);
  return res.data;
};

// GET /api/v1/search?q=... — returns { success, users: SearchUser[] }
export const searchUsersApi = async (q: string) => {
  const res = await api.get(`/api/v1/search?q=${encodeURIComponent(q)}`);
  return res.data;
};
