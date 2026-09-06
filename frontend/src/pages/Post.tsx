import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typehooks";
import { createPost } from "../slice/post/PostSlice";
import { uploadBlogImageApi } from "../slice/post/PostApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PenLine, FileText, Image as ImageIcon, X, UploadCloud } from "lucide-react";

const Post = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(content.length / 500));
  const isPublishing = loading || uploadingImage;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.warning("Image size must be less than 10MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("Please fill in both title and content.");
      return;
    }

    let uploadedImageUrl: string | null = null;

    if (imageFile) {
      setUploadingImage(true);
      try {
        const uploadRes = await uploadBlogImageApi(imageFile);
        if (uploadRes.success && uploadRes.url) {
          uploadedImageUrl = uploadRes.url;
        } else {
          toast.error(uploadRes.message || "Failed to upload image to Cloudinary.");
          setUploadingImage(false);
          return;
        }
      } catch (err: any) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Image upload failed. Please check your Cloudinary configuration.";
        toast.error(message);
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }

    const result = await dispatch(
      createPost({
        title,
        content,
        imageUrl: uploadedImageUrl,
      })
    );

    if (createPost.fulfilled.match(result)) {
      toast.success("🎉 Post published successfully!");
      setTitle("");
      setContent("");
      handleRemoveImage();
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
              disabled={isPublishing}
              maxLength={150}
              className="w-full rounded-xl border border-stone-700 bg-(--bg-main) px-4 py-3 text-(--text-main) outline-none transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60 text-lg font-semibold"
            />
            <p className="text-xs text-(--text-body) mt-1 text-right">{title.length}/150</p>
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-main)">
              Cover Image <span className="text-xs text-(--text-body) font-normal">(Optional)</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              disabled={isPublishing}
            />

            {!imagePreview ? (
              <div
                onClick={() => !isPublishing && fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-stone-700 hover:border-amber-400/60 bg-(--bg-main) p-6 text-center transition-all duration-200 group flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 group-hover:bg-amber-400/20 text-amber-400 flex items-center justify-center transition-colors">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--text-main) group-hover:text-amber-400 transition-colors">
                    Click to upload a cover image
                  </p>
                  <p className="text-xs text-(--text-body) mt-1">
                    PNG, JPG, WEBP, GIF up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-stone-700 group max-h-80 bg-stone-900">
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPublishing}
                    className="flex items-center gap-1.5 rounded-lg bg-stone-900/90 text-stone-100 px-3.5 py-2 text-xs font-semibold hover:bg-stone-800 transition-all shadow-lg"
                  >
                    <ImageIcon size={14} />
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isPublishing}
                    className="flex items-center gap-1.5 rounded-lg bg-red-600/90 text-white px-3.5 py-2 text-xs font-semibold hover:bg-red-500 transition-all shadow-lg"
                  >
                    <X size={14} />
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-main)">
              Content
            </label>
            <textarea
              rows={14}
              placeholder="Write your post here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPublishing}
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
            disabled={isPublishing}
            className={`w-full rounded-xl py-3 font-semibold text-stone-900 transition-all duration-300 ${
              isPublishing
                ? "cursor-not-allowed bg-amber-300/60 opacity-70"
                : "bg-amber-400 hover:bg-amber-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-900/30 active:scale-100"
            }`}
          >
            {uploadingImage ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-stone-900/30 border-t-stone-900 animate-spin" />
                Uploading image…
              </span>
            ) : loading ? (
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