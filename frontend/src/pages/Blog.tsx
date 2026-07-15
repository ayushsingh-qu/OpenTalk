import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/typehooks";
import { fetchBlog, clearCurrentBlog } from "../slice/post/PostSlice";
import { Clock, ArrowLeft, User } from "lucide-react";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBlog, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (id) dispatch(fetchBlog(id));
    return () => { dispatch(clearCurrentBlog()); };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-amber-400/30 border-t-amber-400 animate-spin" />
          <p className="text-(--text-body) text-sm">Loading article…</p>
        </div>
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center gap-4 text-(--text-body)">
        <p className="text-xl font-semibold text-(--text-main)">Post not found</p>
        <p className="text-sm">{error || "This post may have been deleted."}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 flex items-center gap-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 px-4 py-2 text-sm hover:bg-amber-400/20 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>
    );
  }

  const readTime = Math.max(1, Math.round(currentBlog.content.length / 500));

  return (
    <div className="max-w-3xl mx-auto py-6 px-2">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-(--text-body) hover:text-(--primary-color) transition-colors text-sm mb-8"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Article header */}
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-(--text-main) leading-tight mb-6">
          {currentBlog.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-stone-800 mb-8">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-400/10 ring-1 ring-amber-400/40 flex items-center justify-center text-sm font-bold text-amber-400">
              {currentBlog.author?.name?.[0]?.toUpperCase() ?? <User size={14} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-(--text-main)">
                {currentBlog.author?.name ?? "Anonymous"}
              </p>
              <p className="text-xs text-(--text-body)">Author</p>
            </div>
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Read time */}
          <div className="flex items-center gap-1.5 text-xs text-(--text-body)">
            <Clock size={13} />
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none">
          {currentBlog.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p
                key={i}
                className="text-(--text-body) leading-8 text-base mb-5"
              >
                {paragraph}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>
      </article>
    </div>
  );
};

export default Blog;
