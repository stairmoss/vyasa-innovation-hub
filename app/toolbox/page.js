"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Bot,
  Code2,
  GraduationCap,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Terminal,
  Cpu,
  Star,
  ChevronRight,
  Search,
  Zap,
  Rocket,
  Heart,
} from "lucide-react";

/* ── 3 Core Rainbow Colors ──
   🔵 Ocean Blue:   #4F8FFF
   🟠 Sandalwood:   #E8A87C
   🟣 Violet:       #B06AFF
*/

const tools = [
  {
    id: "claude",
    name: "Claude AI",
    tagline: "Your Neural Co-Pilot",
    description:
      "The most capable AI assistant for coding, analysis, writing, and reasoning. Powered by Anthropic's cutting-edge models.",
    url: "https://claude.ai",
    icon: Bot,
    gradient: "from-[#E8A87C] via-[#D4926A] to-[#C07B55]",
    glowColor: "#E8A87C",
    borderColor: "rgba(232, 168, 124, 0.35)",
    emoji: "🧠",
    features: ["Code Generation", "Debugging", "Explanation", "Analysis"],
  },
  {
    id: "codespaces",
    name: "GitHub Codespaces",
    tagline: "Cloud Dev Environments",
    description:
      "Instant, full-featured cloud development environments. Code from anywhere with VS Code in your browser — zero setup required.",
    url: "https://github.com/codespaces",
    icon: Terminal,
    gradient: "from-[#4F8FFF] via-[#3B7AE8] to-[#2965CC]",
    glowColor: "#4F8FFF",
    borderColor: "rgba(79, 143, 255, 0.35)",
    emoji: "☁️",
    features: ["VS Code in Browser", "Instant Setup", "Collaboration", "Free Tier"],
  },
  {
    id: "education",
    name: "GitHub Education",
    tagline: "Student Developer Pack",
    description:
      "Unlock free access to the best developer tools, cloud credits, domains, and more — all for students. Supercharge your learning.",
    url: "https://education.github.com",
    icon: GraduationCap,
    gradient: "from-[#4F8FFF] via-[#7B6FE8] to-[#B06AFF]",
    glowColor: "#7B6FE8",
    borderColor: "rgba(123, 111, 232, 0.35)",
    emoji: "🎓",
    features: ["Free Tools", "Cloud Credits", "Pro Features", "Career Resources"],
  },
  {
    id: "learn",
    name: "freeCodeCamp",
    tagline: "Master Every Language — Free",
    description:
      "Learn HTML, CSS, JavaScript, Python, React, Node.js, Data Science and more — completely free. Earn certifications and build real projects.",
    url: "https://www.freecodecamp.org",
    icon: BookOpen,
    gradient: "from-[#B06AFF] via-[#9B4DFF] to-[#7C3AED]",
    glowColor: "#B06AFF",
    borderColor: "rgba(176, 106, 255, 0.35)",
    emoji: "🔥",
    features: ["All Languages", "Certifications", "Real Projects", "100% Free"],
  },
];

const languages = [
  { name: "Python", icon: "🐍", color: "#4F8FFF" },
  { name: "JavaScript", icon: "⚡", color: "#E8A87C" },
  { name: "HTML/CSS", icon: "🎨", color: "#B06AFF" },
  { name: "React", icon: "⚛️", color: "#4F8FFF" },
  { name: "Node.js", icon: "🟢", color: "#E8A87C" },
  { name: "Java", icon: "☕", color: "#B06AFF" },
  { name: "C++", icon: "⚙️", color: "#4F8FFF" },
  { name: "TypeScript", icon: "📘", color: "#E8A87C" },
  { name: "SQL", icon: "🗄️", color: "#B06AFF" },
  { name: "Rust", icon: "🦀", color: "#4F8FFF" },
  { name: "Go", icon: "🐹", color: "#E8A87C" },
  { name: "Swift", icon: "🍎", color: "#B06AFF" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

/* ── Cursor-tracking card component ── */
function ToolCard({ tool, hoveredCard, setHoveredCard }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const isHovered = hoveredCard === tool.id;

  return (
    <motion.a
      ref={cardRef}
      variants={cardVariants}
      layout
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHoveredCard(tool.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onMouseMove={handleMouseMove}
      className="group relative block rounded-3xl overflow-hidden transition-all duration-500"
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{
        border: `1px solid ${isHovered ? tool.borderColor : "rgba(255,255,255,0.06)"}`,
        background: "linear-gradient(145deg, rgba(16,16,28,0.95) 0%, rgba(10,10,20,0.98) 100%)",
      }}
    >
      {/* Cursor-following spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(450px circle at ${mouseX.get()}px ${mouseY.get()}px, ${tool.glowColor}20, transparent 50%)`,
        }}
      />

      {/* Top gradient bar with shimmer */}
      <div className="relative h-[3px] w-full overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      <div className="p-8 relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            {/* Glowing icon with pulse */}
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} p-[1.5px] transition-shadow duration-500`}
              whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              style={{
                boxShadow: isHovered
                  ? `0 0 35px ${tool.glowColor}50, 0 0 15px ${tool.glowColor}30`
                  : `0 0 20px ${tool.glowColor}15`,
              }}
            >
              <div className="w-full h-full rounded-[14px] bg-[#0c0c18] flex items-center justify-center relative overflow-hidden">
                <tool.icon className="w-6 h-6 text-white relative z-10" />
                {/* Inner glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle, ${tool.glowColor}40, transparent 70%)` }}
                />
              </div>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-white transition-colors flex items-center gap-2">
                {tool.name}
                <span className="text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 -translate-x-2">
                  {tool.emoji}
                </span>
              </h3>
              <p className={`text-xs font-mono tracking-[0.1em] uppercase bg-clip-text text-transparent bg-gradient-to-r ${tool.gradient}`}>
                {tool.tagline}
              </p>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-gray-500 group-hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            style={{
              borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.08)",
              background: isHovered ? `${tool.glowColor}10` : "rgba(255,255,255,0.03)",
            }}
          >
            <span className="text-xs font-mono">Open</span>
            <ExternalLink className="w-3 h-3" />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {tool.description}
        </p>

        {/* Feature pills with stagger animation on hover */}
        <div className="flex flex-wrap gap-2">
          {tool.features.map((feature, fi) => (
            <motion.span
              key={feature}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300"
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                background: isHovered ? `${tool.glowColor}12` : "rgba(255,255,255,0.03)",
                border: `1px solid ${isHovered ? `${tool.glowColor}30` : "rgba(255,255,255,0.06)"}`,
                color: isHovered ? tool.glowColor : "rgba(140,140,160,1)",
                transitionDelay: `${fi * 30}ms`,
              }}
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Animated chevron */}
        <motion.div
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={isHovered ? { x: [0, 6, 0] } : { x: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ChevronRight className="w-5 h-5" style={{ color: tool.glowColor }} />
        </motion.div>
      </div>

      {/* Bottom corner gradient accent */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ background: tool.glowColor }}
      />
    </motion.a>
  );
}

/* ── Floating particles component ── */
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ["#4F8FFF", "#E8A87C", "#B06AFF"][i % 3],
            opacity: 0.15 + Math.random() * 0.2,
          }}
          animate={{
            y: [0, -(30 + Math.random() * 80), 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Toolbox() {
  const [userName, setUserName] = useState("Innovator");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("vih_user_name");
    if (storedName) setUserName(storedName);
    setMounted(true);
  }, []);

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#08080f] text-white relative overflow-hidden">
      {/* ═══ ANIMATED RAINBOW BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 15%, rgba(79,143,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 25%, rgba(232,168,124,0.10) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 85%, rgba(176,106,255,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[12%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(79,143,255,0.12)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[8%] w-96 h-96 rounded-full blur-[140px]"
          style={{ background: "rgba(232,168,124,0.10)" }}
        />
        <motion.div
          animate={{ x: [0, 30, -40, 0], y: [0, -20, 35, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[12%] left-[35%] w-[450px] h-[450px] rounded-full blur-[150px]"
          style={{ background: "rgba(176,106,255,0.08)" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted && <FloatingParticles />}

      {/* ═══ RAINBOW TOP BAR ═══ */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 h-[3px] w-full bg-gradient-to-r from-[#4F8FFF] via-[#E8A87C] to-[#B06AFF] origin-left"
      />

      {/* ═══ HEADER ═══ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 border-b border-white/[0.06] backdrop-blur-2xl bg-[#08080f]/70"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-[#4F8FFF] transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-mono hidden sm:inline">HOME</span>
            </a>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8FFF] via-[#E8A87C] to-[#B06AFF] p-[1.5px] shadow-[0_0_25px_rgba(79,143,255,0.25)] overflow-hidden"
              >
                <div className="w-full h-full rounded-[10px] bg-[#08080f] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/assets/vyasa.png"
                    alt="Vyasa Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </motion.div>
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#4F8FFF] via-[#E8A87C] to-[#B06AFF]">
                  AI&apos;s Toolbox
                </h1>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  Vyasa Innovation Hub
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search with glow */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#4F8FFF] transition-colors" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4F8FFF]/40 focus:bg-white/[0.06] transition-all duration-300 w-52 focus:w-72 font-mono focus:shadow-[0_0_20px_rgba(79,143,255,0.12)]"
              />
            </div>
            {/* User badge */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F8FFF]/10 to-[#B06AFF]/10 border border-white/[0.08] hover:border-white/[0.15] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4F8FFF] to-[#B06AFF] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_12px_rgba(176,106,255,0.3)]">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{userName}</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#4F8FFF]/15 via-[#E8A87C]/15 to-[#B06AFF]/15 border border-white/[0.08] text-xs font-mono text-gray-300 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8A87C]" />
            <span className="uppercase tracking-[0.15em]">
              Curated for Innovators
            </span>
            <Zap className="w-3.5 h-3.5 text-[#4F8FFF]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F8FFF] to-[#6BA3FF] drop-shadow-[0_0_20px_rgba(79,143,255,0.3)]">
              Arsenal
            </span>{" "}
            of
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F8FFF] via-[#E8A87C] to-[#B06AFF]">
              Superpowers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            AI assistants, cloud IDEs, free education, and every programming
            language — all in one place.
          </motion.p>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { label: "Tools", value: "4+", color: "#4F8FFF" },
              { label: "Languages", value: "12", color: "#E8A87C" },
              { label: "Cost", value: "Free", color: "#B06AFF" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-black" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TOOL CARDS GRID ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 font-mono">
              No tools match &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        )}
      </section>

      {/* ═══ LANGUAGES SECTION ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Section rainbow divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#4F8FFF]/30 to-transparent mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#B06AFF]/15 to-[#4F8FFF]/15 border border-[#B06AFF]/20 text-xs font-mono text-[#B06AFF] mb-5">
            <Code2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-[0.15em]">Learn for Free</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Every Language.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E8A87C] to-[#B06AFF]">
              Zero Cost.
            </span>
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Master any programming language through freeCodeCamp&apos;s
            interactive curriculum — from absolute beginner to job-ready developer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {languages.map((lang) => (
            <motion.a
              key={lang.name}
              variants={cardVariants}
              href={`https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(lang.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${lang.color}40`;
                e.currentTarget.style.background = `${lang.color}08`;
                e.currentTarget.style.boxShadow = `0 0 30px ${lang.color}12, inset 0 1px 0 ${lang.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {lang.icon}
              </motion.span>
              <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors tracking-wider">
                {lang.name}
              </span>
              {/* Hover glow inside */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 30%, ${lang.color}10, transparent 70%)` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA to freeCodeCamp */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://www.freecodecamp.org"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#4F8FFF]/15 via-[#E8A87C]/15 to-[#B06AFF]/15 border border-[#B06AFF]/25 hover:border-[#B06AFF]/50 text-white font-bold transition-all duration-300 hover:shadow-[0_0_50px_rgba(176,106,255,0.15),0_0_25px_rgba(79,143,255,0.1)] relative overflow-hidden"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Rocket className="w-5 h-5 text-[#B06AFF] relative z-10" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F8FFF] via-[#E8A87C] to-[#B06AFF] relative z-10 text-lg">
              Start Learning — 100% Free
            </span>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#E8A87C] transition-colors relative z-10" />
          </motion.a>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 py-10">
        <div className="h-px w-full bg-gradient-to-r from-[#4F8FFF]/25 via-[#E8A87C]/25 to-[#B06AFF]/25 mb-8" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-[#4F8FFF]" />
            <span>Vyasa Innovation Hub — AI&apos;s Toolbox</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-[#E8A87C] fill-[#E8A87C]" />
            <span>by the Innovation Club</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
