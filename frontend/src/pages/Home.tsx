import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks/typehooks";
import { fetchBlogs } from "../slice/post/PostSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state) => state.posts);
  const [sortOrder, setSortOrder] = useState<"oldest" | "latest">("latest");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const sortedData = sortOrder === "latest" ? [...blogs].reverse() : [...blogs];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-amber-400/30 border-t-amber-400 animate-spin" />
          <p className="text-(--text-body) text-sm">Loading posts…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer position="top-right" theme="dark" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-(--text-main)">
          Latest Posts
        </h1>

        {blogs.length > 0 && (
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "oldest" ? "latest" : "oldest"))
            }
            className="rounded-lg bg-(--primary-color)/20 border border-amber-400/20 text-(--primary-color) text-xs px-3 py-1.5 transition-all duration-200 hover:bg-(--primary-color)/30 hover:scale-105"
          >
            {sortOrder === "latest" ? "Oldest First" : "Latest First"}
          </button>
        )}
      </div>

      {sortedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-3 text-(--text-body)">
          <p className="text-lg font-semibold">No posts yet.</p>
          <p className="text-sm">Be the first to share something!</p>
        </div>
      ) : (
        sortedData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.author.name}
            title={item.title}
            content={item.content}
          />
        ))
      )}
    </div>
  );
};

export default Home;