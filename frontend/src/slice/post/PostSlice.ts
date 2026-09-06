import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBlogsApi,
  fetchBlogByIdApi,
  createBlogApi,
  editBlogApi,
  deleteBlogApi,
} from "./PostApi";
import type { BlogItem, CreatePostPayload, UpdatePostPayload, PostState } from "./PostTypes";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchBlogs = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllBlogsApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch blogs" });
    }
  }
);

export const fetchBlog = createAsyncThunk(
  "posts/fetchOne",
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchBlogByIdApi(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch blog" });
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (data: CreatePostPayload, { rejectWithValue }) => {
    try {
      return await createBlogApi(data.title, data.content, data.imageUrl);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to create post" });
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (data: UpdatePostPayload, { rejectWithValue }) => {
    try {
      return await editBlogApi(data.id, data.title, data.content, data.imageUrl);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to update post" });
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteBlogApi(id);
      return id; // Return the deleted id so we can remove it from state
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete post" });
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: PostState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  deleteLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── fetchBlogs ─────────────────────────────────────────────────────────
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blog ?? [];
      })
      .addCase(fetchBlogs.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ── fetchBlog (single) ─────────────────────────────────────────────────
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBlog = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload.blog ?? null;
      })
      .addCase(fetchBlog.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ── createPost ─────────────────────────────────────────────────────────
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ── updatePost ─────────────────────────────────────────────────────────
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data as BlogItem;
        if (updated) {
          const idx = state.blogs.findIndex((b) => b.id === updated.id);
          if (idx !== -1) state.blogs[idx] = updated;
        }
      })
      .addCase(updatePost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // ── deletePost ─────────────────────────────────────────────────────────
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const deletedId = action.payload as string;
        state.blogs = state.blogs.filter((b) => b.id !== deletedId);
      })
      .addCase(deletePost.rejected, (state, action: any) => {
        state.deleteLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearPostError, clearCurrentBlog } = postSlice.actions;
export default postSlice.reducer;
