import { useState } from "react";
import { Pencil, Trash2, Clock3, FileText, CalendarDays, LogOut, X, Loader2, Save, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/typehooks";
import { clearAuth, updateUser } from "../slice/Auth/AuthSlice";
import { checkAuth } from "../slice/Auth/AuthSlice";
import { deletePost } from "../slice/post/PostSlice";
import type { Blog } from "../slice/Auth/AuthTypes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

// Edit Profile Modal
interface EditModalProps {
  initialName: string;
  initialEmail: string;
  loading: boolean;
  onSave: (data: { name?: string; email?: string; password?: string }) => void;
  onClose: () => void;
}

const EditModal = ({ initialName, initialEmail, loading, onSave, onClose }: EditModalProps) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const data: { name?: string; email?: string; password?: string } = {};
    if (name.trim() && name !== initialName) data.name = name.trim();
    if (email.trim() && email !== initialEmail) data.email = email.trim();
    if (password.trim()) data.password = password.trim();
    if (Object.keys(data).length === 0) {
      toast.info("No changes detected.");
      return;
    }
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-stone-700 bg-stone-950 shadow-2xl shadow-black/80 overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
          <h2 className="text-lg font-bold text-(--text-main)">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-stone-800 flex items-center justify-center text-(--text-body) hover:text-(--text-main) transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-(--text-main) block mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-(--text-main) outline-none text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-(--text-main) block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-(--text-main) outline-none text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-(--text-main) block mb-1.5">
              New Password <span className="text-xs text-(--text-body) font-normal">(leave blank to keep current)</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-(--text-main) outline-none text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-800">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm text-(--text-body) hover:text-(--text-main) hover:bg-stone-800 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-stone-900 text-sm font-semibold hover:bg-amber-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirm Modal 
interface DeleteConfirmProps {
  title: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ title, loading, onConfirm, onCancel }: DeleteConfirmProps) => (
  <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div className="w-full max-w-sm rounded-2xl border border-stone-700 bg-stone-950 shadow-2xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <div>
          <h3 className="font-bold text-(--text-main) mb-1">Delete Post?</h3>
          <p className="text-sm text-(--text-body)">
            "<span className="text-(--text-main) font-medium">{title}</span>" will be permanently deleted.
          </p>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl border border-stone-700 text-sm text-(--text-body) hover:bg-stone-800 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

//Profile Page 
interface UserInterface {
  name: string;
  joined: string;
  email: string;
  totalPosts: number;
  totalReadTime: number;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const { deleteLoading } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-amber-400/30 border-t-amber-400 animate-spin" />
      </div>
    );
  }

  const userInfo: UserInterface = {
    name: user.name,
    email: user.email,
    joined: user.createdAt.slice(0, 10),
    totalPosts: user.blogs.length,
    totalReadTime: Math.round(user.blogs.reduce((acc, b) => acc + b.content.length / 500, 0)),
  };

  const posts: Blog[] = user.blogs;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearAuth());
    navigate("/");
  };

  const handleEditSave = async (data: { name?: string; email?: string; password?: string }) => {
    const result = await dispatch(updateUser(data));
    if (updateUser.fulfilled.match(result)) {
      toast.success("Profile updated!");
      setEditOpen(false);
      // Re-fetch user to sync blogs
      dispatch(checkAuth());
    } else {
      const payload = result.payload as any;
      toast.error(payload?.message || "Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deletePost(deleteTarget.id));
    if (deletePost.fulfilled.match(result)) {
      toast.success("Post deleted.");
      // Refresh user so blog list in profile updates
      dispatch(checkAuth());
    } else {
      const payload = result.payload as any;
      toast.error(payload?.message || "Failed to delete post.");
    }
    setDeleteTarget(null);
  };

  return (
    <div className="w-full bg-(--bg-main) text-(--text-main) px-2 py-2">
      <ToastContainer position="top-right" theme="dark" />

      {/* Edit Modal */}
      {editOpen && (
        <EditModal
          initialName={userInfo.name}
          initialEmail={userInfo.email}
          loading={authLoading}
          onSave={handleEditSave}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          title={deleteTarget.title}
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Profile Header */}
      <div className="flex items-center gap-5 sm:gap-10 justify-center border-b border-stone-800 pb-10">

        {/* Avatar */}
        <div className="flex px-4 py-3 text-3xl sm:text-6xl font-extrabold rounded-full bg-amber-400/10 items-center justify-center ring-1 ring-amber-200/40 text-amber-400 w-16 h-16 sm:w-28 sm:h-28 shrink-0">
          {userInfo.name[0].toUpperCase()}
        </div>

        <div className="flex flex-col gap-4 min-w-0">

          {/* Name + email */}
          <div className="flex flex-col gap-1">
            <h1 className="text-lg sm:text-2xl font-bold truncate">{userInfo.name}</h1>
            <p className="text-xs sm:text-sm text-(--text-body) truncate">{userInfo.email}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
            <div className="rounded-xl bg-(--bg-card) border border-stone-800 p-2 sm:p-4 min-w-17.5">
              <div className="flex items-center gap-1 text-(--text-body) mb-2">
                <FileText size={11} /> Posts
              </div>
              <p className="text-base sm:text-xl font-bold text-(--text-main)">{userInfo.totalPosts}</p>
            </div>

            <div className="rounded-xl bg-(--bg-card) border border-stone-800 p-2 sm:p-4 min-w-17.5">
              <div className="flex items-center gap-1 text-(--text-body) mb-2">
                <Clock3 size={11} /> Read
              </div>
              <p className="text-base sm:text-xl font-bold text-(--text-main)">{userInfo.totalReadTime}m</p>
            </div>

            <div className="rounded-xl bg-(--bg-card) border border-stone-800 p-2 sm:p-4 min-w-17.5">
              <div className="flex items-center gap-1 text-(--text-body) mb-2">
                <CalendarDays size={11} /> Joined
              </div>
              <p className="text-base sm:text-xl font-bold text-(--text-main)">{userInfo.joined}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-1.5 text-xs sm:text-sm text-stone-900 font-semibold transition-all hover:bg-amber-300 hover:scale-105"
            >
              <Pencil size={14} />
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs sm:text-sm text-red-400 font-semibold transition-all hover:bg-red-500/30 hover:scale-105"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>

   {/* your-post */}
      <div className="mt-10">
        <h2 className="mb-6 text-2xl font-bold">Your Posts</h2>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-(--text-body) border border-stone-800 rounded-2xl">
            <FileText size={36} className="text-stone-700" />
            <p className="font-semibold text-(--text-main)">No posts yet</p>
            <p className="text-sm">Start writing and your posts will appear here.</p>
          </div>
        ) : (

          <div className="space-y-4">
            {posts.map((post: Blog) => {
              const readTime = Math.max(1, Math.round(post.content.length / 500));
              return (
           <Link to={`/blog/${post.id}`} className="block group">
                <div
                  key={post.id}
                  className="rounded-2xl border border-stone-800 bg-(--bg-card) p-5 sm:p-6 transition-all hover:border-stone-700"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-(--text-main) mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-(--text-body) line-clamp-3 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-(--text-body)">
                        <Clock3 size={11} />
                        <span>{readTime} min read</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setDeleteTarget(post)}
                      disabled={deleteLoading}
                      className="flex items-center gap-2 self-start md:self-center px-3 py-1.5 rounded-xl text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-all hover:scale-105 text-xs font-medium shrink-0 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
           </Link>

              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;