import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typehooks";
import { createPost } from "../slice/post/PostSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PenLine, FileText } from "lucide-react";

const Post = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(content.length / 500));

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("Please fill in both title and content.");
      return;
    }

    const result = await dispatch(createPost({ title, content }));

    if (createPost.fulfilled.match(result)) {
      toast.success("🎉 Post published successfully!");
      setTitle("");
      setContent("");
    } else {
      const payload = result.payload as any;
      toast.error(payload?.message || "Failed to publish post.");
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-main) flex justify-center items-start pt-4 px-4 pb-10">
      <ToastContainer position="top-right" theme="dark" />

      <div className="w-full max-w-3xl">
        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 ring-1 ring-amber-400/30 flex items-center justify-center">
            <PenLine size={18} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-(--text-main)">Create New Post</h1>
            <p className="text-sm text-(--text-body)">Share your thoughts with the world.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-(--bg-card) p-6 sm:p-8 shadow-xl space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-main)">
              Title
            </label>
            <input
              type="text"
              placeholder="Give your post a great title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              maxLength={150}
              className="w-full rounded-xl border border-stone-700 bg-(--bg-main) px-4 py-3 text-(--text-main) outline-none transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60 text-lg font-semibold"
            />
            <p className="text-xs text-(--text-body) mt-1 text-right">{title.length}/150</p>
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-main)">
              Content
            </label>
            <textarea
              rows={16}
              placeholder="Write your post here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="w-full resize-y rounded-xl border border-stone-700 bg-(--bg-main) px-4 py-3 text-(--text-main) outline-none transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60 leading-relaxed"
            />

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-2 text-xs text-(--text-body)">
              <span className="flex items-center gap-1">
                <FileText size={11} />
                {wordCount} words
              </span>
              <span>·</span>
              <span>~{readTime} min read</span>
            </div>
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-stone-900 transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-amber-300/60 opacity-70"
                : "bg-amber-400 hover:bg-amber-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-900/30 active:scale-100"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-stone-900/30 border-t-stone-900 animate-spin" />
                Publishing…
              </span>
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;