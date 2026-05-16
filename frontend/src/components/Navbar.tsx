import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Menu, X} from "lucide-react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-stone-950/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <PenLine size={14} className="text-stone-950" />
          </div>
          <span className="font-bold text-lg tracking-tight text-stone-100">
            Open<span className="text-amber-400">Talk</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
          {["Explore", "Writers", "Topics", "Pricing"].map((item) => (
            <a key={item} href="#" className="hover:text-stone-100 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-stone-400 hover:text-stone-100 transition-colors font-medium">
            Sign in
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-lg transition-colors"
          >
            Start writing
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-400 hover:text-stone-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-stone-950/95 backdrop-blur-md border-b border-stone-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-stone-300">
              {["Explore", "Writers", "Topics", "Pricing", "Sign in"].map((item) => (
                <a key={item} href="#" className="hover:text-stone-100 transition-colors">
                  {item}
                </a>
              ))}
              <button className="w-full text-sm font-semibold bg-amber-400 text-stone-950 py-2.5 rounded-lg mt-1">
                Start writing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}