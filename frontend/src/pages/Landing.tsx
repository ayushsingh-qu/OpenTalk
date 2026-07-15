import {PenLine,BookOpen,Users,TrendingUp,Sparkles,ArrowRight,Share2,Bell,Globe,Zap,Shield} from "lucide-react";
import { Link } from "react-router";
import Logo from "../components/Logo";

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

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
    desc: "A clean editor that helps you focus only on writing.",
  },
  {
    icon: <Users size={22} />,
    title: "Find Your Audience",
    desc: "Reach readers who genuinely care about your content.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Grow Your Craft",
    desc: "Understand what works and improve every article.",
  },
  {
    icon: <Shield size={22} />,
    title: "Your Words, Your Rules",
    desc: "No unnecessary algorithms or hidden publishing tricks.",
  },
];

const TAGS = [
  "Technology",
  "Culture",
  "Design",
  "Science",
  "Finance",
  "Health",
  "Startups",
  "Art",
];

function Navbar() {
  return (
    <header className="w-full border-b border-stone-800 bg-stone-950/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo/>
  <div className="flex gap-2">
        
   <Link to={'/signin'}>
      <button className=" hover:text-amber-400 text-stone-100 px-4 py-2 rounded-lg text-sm font-semibold transition">
          Sign In
      </button>
   </Link>     
   <Link to={'/signup'}>
     <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-lg text-sm font-semibold transition">
           Sign Up
     </button>
   </Link>
        
  </div>
       
        
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-2 border border-amber-400/20 bg-amber-400/10 text-amber-300 px-4 py-2 rounded-full text-sm mb-8">
          <Sparkles size={14} />
          Your voice becomes Global
        </div>

        <h1
          className="text-5xl md:text-7xl font-black leading-tight text-stone-100 mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ideas that{" "}
          <span className="text-amber-400">deserve</span> to be heard.
        </h1>

        <p className="text-(--text-body) text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          OpenTalk is a modern platform where writers can publish ideas,
          discover stories, and connect with readers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={'/signin'}>
           <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 px-6 py-3 rounded-xl font-semibold transition">
            Start Writing
            <ArrowRight size={16} />
          </button>
          </Link>
      
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-y border-stone-800 py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="flex justify-center text-amber-400 mb-3">
              {stat.icon}
            </div>

            <h3 className="text-3xl font-bold text-stone-100">
              {stat.value}
            </h3>

            <p className="text-stone-500 text-sm mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopicsSection() {
  return (
    <section className="py-20 px-6 bg-stone-900/30">
      <div className="max-w-5xl mx-auto text-center">

        <p className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3">
          Topics
        </p>

        <h2
          className="text-4xl font-black text-stone-100 mb-12"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Follow what you love.
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {TAGS.map((tag) => (
            <button
              key={tag}
              className="px-5 py-2 rounded-full border border-stone-700 text-stone-400 hover:text-amber-300 hover:border-amber-400 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Why OpenTalk
          </p>

          <h2
            className="text-4xl font-black text-stone-100"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Built for writers.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-7 rounded-2xl border border-stone-800 bg-stone-900/40"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-stone-100 mb-2">
                {feature.title}
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo/>
        <p className="text-stone-500 text-sm text-center">
          © 2025 OpenTalk. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-stone-500">
          <Share2 size={18} className="hover:text-stone-300 cursor-pointer" />
          <Bell size={18} className="hover:text-stone-300 cursor-pointer" />
          <Globe size={18} className="hover:text-stone-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-(--bg-main) text-white">
      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <TopicsSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}