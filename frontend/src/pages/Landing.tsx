import { useState } from "react";
import { motion, } from "framer-motion";
import { PenLine, BookOpen, Users, TrendingUp, Sparkles, ArrowRight,Star, MessageCircle, Heart, Share2, Bookmark, Bell, Search, Globe, Zap,Shield, Coffee, ChevronRight, Play} from "lucide-react";
import Navbar from "../components/Navbar";

// ---------- TYPES ----------
interface Article {
  id: number;
  author: string;
  avatar: string;
  role: string;
  title: string;
  excerpt: string;
  tag: string;
  time: string;
  likes: number;
  comments: number;
  gradient: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

// ---------- DATA ----------
const ARTICLES: Article[] = [
  {
    id: 1,
    author: "Arjun Mehta",
    avatar: "AM",
    role: "Product Designer",
    title: "Why Design Systems Are the New Brand Identity",
    excerpt:
      "In a world of infinite screens, your design system is the only consistent thing your users will ever experience.",
    tag: "Design",
    time: "5 min read",
    likes: 847,
    comments: 63,
    gradient: "from-amber-500/20 to-orange-600/10",
  },
  {
    id: 2,
    author: "Priya Nair",
    avatar: "PN",
    role: "Staff Engineer",
    title: "The Hidden Cost of Over-Engineering",
    excerpt:
      "We've all been there — a beautiful, layered abstraction that solved a problem that never existed.",
    tag: "Engineering",
    time: "8 min read",
    likes: 1203,
    comments: 91,
    gradient: "from-stone-500/20 to-neutral-600/10",
  },
  {
    id: 3,
    author: "Rohan Das",
    avatar: "RD",
    role: "Indie Maker",
    title: "Shipping Every Week Changed How I Think About Products",
    excerpt:
      "Momentum isn't just a productivity hack. It's a creative philosophy that rewires how you see work.",
    tag: "Maker",
    time: "6 min read",
    likes: 532,
    comments: 48,
    gradient: "from-teal-500/20 to-emerald-600/10",
  },
];

const STATS: Stat[] = [
  { label: "Writers Publishing", value: "42K+", icon: <PenLine size={18} /> },
  { label: "Articles Monthly", value: "180K+", icon: <BookOpen size={18} /> },
  { label: "Active Readers", value: "1.2M+", icon: <Users size={18} /> },
  { label: "Topics Explored", value: "3,800+", icon: <Globe size={18} /> },
];

const FEATURES = [
  {
    icon: <Zap size={22} />,
    title: "Write Without Friction",
    desc: "A distraction-free editor that gets out of your way and lets your ideas flow.",
  },
  {
    icon: <Users size={22} />,
    title: "Find Your Audience",
    desc: "Smart distribution puts your words in front of readers who actually care.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Grow Your Craft",
    desc: "Real-time insights on what resonates, so every piece is better than the last.",
  },
  {
    icon: <Shield size={22} />,
    title: "Your Words, Your Rules",
    desc: "No algorithm games. No paywalls you didn't choose. Just honest publishing.",
  },
];

const TAGS = [
  "Technology", "Culture", "Design", "Science", "Philosophy",
  "Finance", "Health", "Startups", "Climate", "Art", "Politics", "Food",
];

// ---------- ANIMATION VARIANTS ----------
const fadeUp:any = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ---------- COMPONENTS ----------
function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border border-white/10 flex items-center justify-center text-xs font-semibold tracking-wide text-stone-100`}
    >
      {initials}
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.15}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-sm cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
      <div className="relative z-10">
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar initials={article.avatar} gradient="from-amber-500 to-orange-600" />
          <div>
            <p className="text-sm font-medium text-stone-200">{article.author}</p>
            <p className="text-xs text-stone-500">{article.role}</p>
          </div>
          <span className="ml-auto text-[11px] font-medium text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
            {article.tag}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-bold text-stone-100 text-[15px] leading-snug mb-2 group-hover:text-amber-300 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-5">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-stone-500">
          <span className="text-xs flex items-center gap-1">
            <Coffee size={13} /> {article.time}
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-rose-400" : "hover:text-rose-400"}`}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              {article.likes + (liked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-sky-400 transition-colors">
              <MessageCircle size={14} /> {article.comments}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`transition-colors ${saved ? "text-amber-400" : "hover:text-amber-400"}`}
            >
              <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// ---------- SECTIONS ----------
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 border border-amber-400/25 bg-amber-400/8 px-4 py-2 rounded-full mb-8"
      >
        <Sparkles size={12} />
        Now with AI-powered writing assist
        <ChevronRight size={12} />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.2}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-stone-50 leading-[1.02] tracking-tight max-w-4xl mb-6"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Ideas that{" "}
        <span className="relative inline-block">
          <span className="text-amber-400">deserve</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400/60 origin-left"
          />
        </span>{" "}
        to be heard.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.35}
        className="text-stone-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
      >
        OpenTalk is where curious minds write, discover, and connect — no algorithm
        games, no noise. Just honest human writing.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.45}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20"
        >
          Start writing for free <ArrowRight size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 text-stone-300 border border-stone-700 hover:border-stone-500 hover:text-stone-100 px-7 py-3.5 rounded-xl text-sm transition-colors"
        >
          <Play size={15} fill="currentColor" /> Watch how it works
        </motion.button>
      </motion.div>

      {/* Social proof */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.55}
        className="mt-14 flex flex-col items-center gap-3"
      >
        <div className="flex -space-x-2">
          {["AK", "SR", "MP", "VG", "RN"].map((init, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-orange-600 border-2 border-stone-950 flex items-center justify-center text-[10px] font-bold text-stone-950"
            >
              {init}
            </div>
          ))}
        </div>
        <p className="text-stone-500 text-sm">
          <span className="text-stone-300 font-medium">42,000+</span> writers already publishing
        </p>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-stone-800/50">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i * 0.12}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center text-amber-400 mb-2">
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-stone-100 tracking-tight">{stat.value}</p>
            <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Trending Now
            </p>
            <h2
              className="text-4xl font-black text-stone-100 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Stories worth <br /> your time.
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-400 transition-colors font-medium"
          >
            Browse all <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TopicsSection() {
  return (
    <section className="py-20 px-6 bg-stone-900/30 border-y border-stone-800/50">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Topics
          </p>
          <h2
            className="text-4xl font-black text-stone-100 mb-12"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Follow what you love.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {TAGS.map((tag, i) => (
            <motion.button
              key={tag}
              variants={fadeUp}
              custom={i * 0.05}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2.5 rounded-full border border-stone-700 text-stone-400 text-sm font-medium hover:border-amber-400/50 hover:text-amber-300 hover:bg-amber-400/6 transition-all duration-200"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Why OpenTalk
          </p>
          <h2
            className="text-4xl font-black text-stone-100"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Built for writers, <br /> not metrics.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              custom={i * 0.12}
              whileHover={{ y: -3 }}
              className="group p-7 rounded-2xl border border-stone-800 bg-stone-900/40 hover:border-amber-400/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-400/20 transition-colors">
                {feat.icon}
              </div>
              <h3 className="font-bold text-stone-100 text-[15px] mb-2">{feat.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 border border-stone-700/60 rounded-3xl px-10 py-16 overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/12 rounded-full blur-[60px]" />
          </div>

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
              <PenLine size={22} className="text-stone-950" />
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-stone-100 mb-4 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Your voice matters. <br /> Start today.
            </h2>
            <p className="text-stone-400 text-base mb-8 max-w-md mx-auto">
              Join thousands of thinkers and writers building an audience on their own terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                Create your account <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm text-stone-400 border border-stone-700 hover:border-stone-500 hover:text-stone-200 px-8 py-3.5 rounded-xl transition-colors"
              >
                Explore as a reader
              </motion.button>
            </div>
            <p className="text-stone-600 text-xs mt-6">
              Free forever · No credit card needed · Publish in 60 seconds
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = {
    Discover: ["Explore Stories", "Trending", "Topics", "Writers to Follow"],
    Write: ["Start a Blog", "Editor Guide", "Writing Tips", "Partner Program"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Cookie Policy", "Security"],
  };

  return (
    <footer className="border-t border-stone-800/60 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <PenLine size={12} className="text-stone-950" />
              </div>
              <span className="font-bold text-stone-100">
                Open<span className="text-amber-400">Talk</span>
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              The home for every idea worth sharing.
            </p>
          </div>

          {/* Links */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-sm">
            © 2025 OpenTalk, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[Share2, Bell, Globe].map((Icon, i) => (
              <button
                key={i}
                className="text-stone-600 hover:text-stone-300 transition-colors"
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- SEARCH BAR ----------
function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 px-6 max-w-2xl mx-auto"
    >
      <div className="relative flex items-center bg-stone-900/80 border border-stone-700/80 rounded-2xl px-5 py-3.5 gap-3 focus-within:border-amber-400/50 transition-colors">
        <Search size={17} className="text-stone-500 shrink-0" />
        <input
          type="text"
          placeholder="Search stories, writers, topics..."
          className="bg-transparent text-stone-300 placeholder:text-stone-600 text-sm outline-none flex-1 min-w-0"
        />
        <kbd className="hidden sm:block text-[10px] text-stone-600 border border-stone-700 px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>
    </motion.div>
  );
}

// ---------- APP ----------
export default function Landing() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <SearchBar />
        <ArticlesSection />
        <TopicsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}