import { useState, useRef, useEffect, useCallback } from "react";
import { Home, PlusCircle, User, Search, X, Loader2 } from "lucide-react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";
import { searchUsersApi } from "../slice/post/PostApi";
import type { SearchUser } from "../slice/post/PostTypes";
import { useAppSelector } from "../hooks/typehooks";

// ─── Debounce hook ────────────────────────────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Search Dropdown ──────────────────────────────────────────────────────────
const SearchDropdown = ({ results, loading, query }: { results: SearchUser[]; loading: boolean; query: string }) => {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-stone-700 bg-stone-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden z-100">
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-(--text-body)">
          <Loader2 size={14} className="animate-spin" />
          Searching…
        </div>
      ) : results.length === 0 ? (
        <div className="py-4 px-4 text-sm text-(--text-body) text-center">
          No users found for "<span className="text-amber-400">{query}</span>"
        </div>
      ) : (
        <ul>
          {results.map((user) => (
            <li key={user.id} className="border-b border-stone-800 last:border-0">
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-800/60 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 ring-1 ring-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-(--text-main)">{user.name}</p>
                  <p className="text-xs text-(--text-body)">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // Desktop search
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mobile search overlay
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileResults, setMobileResults] = useState<SearchUser[]>([]);
  const [mobileLoading, setMobileLoading] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);
  const debouncedMobileQuery = useDebounce(mobileQuery, 300);

  const navlink = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Post", path: "/post", icon: <PlusCircle size={20} /> },
  ];

  // ── Desktop search fetch ───────────────────────────────────────────────────
  const runSearch = useCallback(async (q: string, setResults: (r: SearchUser[]) => void, setLoading: (v: boolean) => void) => {
    if (!q.trim()) { setResults([]); return; }
    try {
      setLoading(true);
      const data = await searchUsersApi(q);
      setResults(data.users ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(debouncedQuery, setSearchResults, setSearchLoading);
  }, [debouncedQuery, runSearch]);

  useEffect(() => {
    runSearch(debouncedMobileQuery, setMobileResults, setMobileLoading);
  }, [debouncedMobileQuery, runSearch]);

  // ── Close desktop dropdown on outside click ────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Focus input when opening ───────────────────────────────────────────────
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    if (mobileSearchOpen) setTimeout(() => mobileInputRef.current?.focus(), 100);
  }, [mobileSearchOpen]);

  const userInitial = user?.name?.[0]?.toUpperCase() ?? "A";

  return (
    <>
      {/* ── Desktop / Tablet Topbar ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-5 py-2">
        <div className="lg:w-[75%] w-full mx-auto flex items-center justify-between backdrop-blur-2xl bg-black/20 border border-white/10 shadow-xl shadow-black px-4 sm:px-6 py-2 rounded-2xl gap-3">

          {/* Logo */}
          <Logo />

          {/* Nav links — hidden on mobile */}
          <div className="hidden sm:flex gap-8 bg-(--bg-card) rounded-2xl px-6 py-2">
            {navlink.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 transition duration-200 hover:text-(--primary-color) ${isActive ? "text-(--primary-color)" : "text-white"}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side: search + avatar — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3">

            {/* Search bar */}
            <div ref={searchRef} className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 w-56 transition-all duration-200">
                  <Search size={14} className="text-(--text-body) shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search users…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm text-(--text-main) outline-none w-full placeholder:text-stone-600"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}>
                    <X size={13} className="text-(--text-body) hover:text-red-400 transition-colors" />
                  </button>
                  {/* Dropdown */}
                  <SearchDropdown results={searchResults} loading={searchLoading} query={searchQuery} />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-xl bg-stone-900/60 border border-stone-700/60 flex items-center justify-center text-(--text-body) hover:text-(--primary-color) hover:border-amber-400/40 transition-all duration-200"
                  aria-label="Open search"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Avatar */}
            <Link to="/profile">
              <div className="bg-amber-400/10 text-amber-400 text-sm font-bold ring-1 ring-amber-200/30 w-9 h-9 rounded-full flex items-center justify-center transition duration-200 hover:scale-110 hover:ring-amber-400/60 cursor-pointer">
                {userInitial}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Tab Bar ───────────────────────────────────────────── */}
      <div className="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] backdrop-blur-2xl border text-white border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl bg-stone-950/80">

        <Link to="/" className={`flex flex-col items-center text-xs gap-1 transition duration-200 ${location.pathname === "/" ? "text-(--primary-color)" : "text-white"}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>

        {/* Mobile search trigger */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className={`flex flex-col items-center text-xs gap-1 transition duration-200 text-white`}
          aria-label="Search"
        >
          <Search size={20} />
          <span>Search</span>
        </button>

        <Link to="/post" className={`flex flex-col items-center text-xs gap-1 transition duration-200 ${location.pathname === "/post" ? "text-(--primary-color)" : "text-white"}`}>
          <PlusCircle size={20} />
          <span>Post</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center text-xs gap-1 transition duration-200 ${location.pathname === "/profile" ? "text-(--primary-color)" : "text-white"}`}>
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>

      {/* ── Mobile Search Overlay ───────────────────────────────────────────── */}
      {mobileSearchOpen && (
        <div className="sm:hidden fixed inset-0 z-200 bg-stone-950/95 backdrop-blur-xl flex flex-col p-4 pt-6">

          {/* Search input row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 flex-1">
              <Search size={16} className="text-(--text-body) shrink-0" />
              <input
                ref={mobileInputRef}
                type="text"
                placeholder="Search users by name…"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                className="bg-transparent text-sm text-(--text-main) outline-none w-full placeholder:text-stone-600"
              />
              {mobileQuery && (
                <button onClick={() => { setMobileQuery(""); setMobileResults([]); }}>
                  <X size={14} className="text-(--text-body)" />
                </button>
              )}
            </div>
            <button
              onClick={() => { setMobileSearchOpen(false); setMobileQuery(""); setMobileResults([]); }}
              className="text-sm text-amber-400 shrink-0 px-2"
            >
              Cancel
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto rounded-xl border border-stone-800">
            {mobileLoading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-(--text-body)">
                <Loader2 size={16} className="animate-spin" />
                Searching…
              </div>
            ) : !mobileQuery ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-(--text-body)">
                <Search size={32} className="text-stone-700" />
                <p className="text-sm">Search for users by name</p>
              </div>
            ) : mobileResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2 text-(--text-body)">
                <p className="text-sm">No users found for "<span className="text-amber-400">{mobileQuery}</span>"</p>
              </div>
            ) : (
              <ul>
                {mobileResults.map((user) => (
                  <li key={user.id} className="border-b border-stone-800 last:border-0">
                    <div className="flex items-center gap-3 px-4 py-4 hover:bg-stone-800/40 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber-400/10 ring-1 ring-amber-400/30 flex items-center justify-center text-sm font-bold text-amber-400 shrink-0">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-(--text-main)">{user.name}</p>
                        <p className="text-sm text-(--text-body)">{user.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;