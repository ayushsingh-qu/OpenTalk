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

// POST /api/v1/blog/post — returns { message, data: blog }
export const createBlogApi = async (title: string, content: string) => {
  const res = await api.post("/api/v1/blog/post", { title, content });
  return res.data;
};

// PUT /api/v1/blog/:id — returns { message, data: blog }
export const editBlogApi = async (id: string, title: string, content: string) => {
  const res = await api.put(`/api/v1/blog/${id}`, { title, content });
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
