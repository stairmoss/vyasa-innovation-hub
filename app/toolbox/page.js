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
  ChevronRight,
  Search,
  Zap,
  Rocket,
  Heart,
  Puzzle,
  Gamepad2,
  Lightbulb,
  Boxes,
  Smartphone,
  Layout,
  Presentation,
  Book,
  Image as ImageIcon,
  PenTool,
  Activity,
  Mic,
  Calendar,
  Megaphone,
  AudioWaveform,
  Video,
  MonitorPlay,
  Component,
  ScrollText,
} from "lucide-react";

const tools = [
  // ── AI ASSISTANTS & MODELS ──
  {
    id: "claude",
    name: "Claude AI",
    category: "AI Assistants",
    tagline: "Neural Reasoning Agent",
    description: "Considered a top collaborator for reasoning, long-form content, and deep analysis.",
    whatIsIt: "Your primary partner for complex problem-solving. It can generate code, analyze data, and explain complex topics in simple terms.",
    url: "https://claude.ai",
    icon: Bot,
    gradient: "from-[#C0C0C0] via-[#A0A0A0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.35)",
    features: ["Code Intelligence", "Data Analysis", "Complex Logic"],
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "Writing & Research",
    tagline: "Answer Engine",
    description: "A conversational search engine that cites sources, making it superior to traditional search for research.",
    whatIsIt: "A search engine that actually talks to you and shows exactly where it found the information. Superior to traditional search for deep research.",
    url: "https://perplexity.ai",
    icon: Search,
    gradient: "from-[#A0A0A0] via-[#FFFFFF] to-[#808080]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.2)",
    features: ["Source Citations", "Real-time Search", "Academic Mode"],
  },

  // ── VISUAL CODING & KIDS ──
  {
    id: "scratch",
    name: "Scratch",
    category: "Visual Coding",
    tagline: "Visual Scripting",
    description: "The world's largest block-based coding community.",
    whatIsIt: "MIT's visual programming language where you snap blocks together to create stories, games, and animations without typing code.",
    url: "https://scratch.mit.edu",
    icon: Puzzle,
    gradient: "from-[#FFFFFF] via-[#C0C0C0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(255, 255, 255, 0.2)",
    features: ["Block Coding", "Gaming", "Animation"],
  },
  {
    id: "hopscotch",
    name: "Hopscotch",
    category: "Visual Coding",
    tagline: "Mobile Creator",
    description: "Create games and pixel art on iPad.",
    whatIsIt: "A powerful mobile app that allows you to build complete games using visual logic boards. Perfect for learning logic on the go.",
    url: "https://www.gethopscotch.com/",
    icon: Smartphone,
    gradient: "from-[#C0C0C0] via-[#808080] to-[#A0A0A0]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.2)",
    features: ["iPad First", "Pixel Art", "Game Physics"],
  },
  {
    id: "swift-playgrounds",
    name: "Swift Playgrounds",
    category: "Visual Coding",
    tagline: "App Development",
    description: "Learn Swift, the language used for iOS apps.",
    whatIsIt: "Apple's official app for learning code. It uses interactive puzzles to teach real Swift code in a fun, gamified environment.",
    url: "https://www.apple.com/swift/playgrounds/",
    icon: Code2,
    gradient: "from-[#FFFFFF] via-[#E5E4E2] to-[#C0C0C0]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.3)",
    features: ["Real Swift Code", "App Templates", "3D Puzzles"],
  },
  {
    id: "minecraft-edu",
    name: "Minecraft Education",
    category: "Visual Coding",
    tagline: "Blocky Learning",
    description: "Using Minecraft to teach coding fundamentals.",
    whatIsIt: "A specialized version of Minecraft that includes a 'Code Builder', allowing you to use blocks or Python to modify the game world.",
    url: "https://education.minecraft.net/",
    icon: Component,
    gradient: "from-[#808080] via-[#C0C0C0] to-[#404040]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(128, 128, 128, 0.3)",
    features: ["In-game Coding", "Collaborative Worlds", "STEM Lessons"],
  },

  // ── PRESENTATION & WEB ──
  {
    id: "gamma",
    name: "Gamma AI",
    category: "Presentation & Web",
    tagline: "Instant Decks",
    description: "Best for quick, web-native interactive decks, websites, and documents.",
    whatIsIt: "Just type a topic and Gamma builds a complete, stunning presentation or website. It uses a flexible layout that looks great on any screen.",
    url: "https://gamma.app",
    icon: Presentation,
    gradient: "from-[#C0C0C0] via-[#A0A0A0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.35)",
    features: ["One-click Decks", "Responsive Layout", "Embedded Media"],
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.ai",
    category: "Presentation & Web",
    tagline: "Smart Slides",
    description: "Best for design-first, structured presentations that auto-layout as you add content.",
    whatIsIt: "A smart presentation tool that automatically rearranges your slides as you add content, ensuring every deck looks professionally designed.",
    url: "https://beautiful.ai",
    icon: Layout,
    gradient: "from-[#C0C0C0] via-[#A0A0A0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.3)",
    features: ["Auto-Design", "Smart Templates", "Brand Sync"],
  },
  {
    id: "plus-ai",
    name: "Plus AI",
    category: "Presentation & Web",
    tagline: "Slides Co-pilot",
    description: "Excellent for creating presentations directly inside Google Slides and PowerPoint.",
    whatIsIt: "Integrates directly into your existing workflow to generate and edit slides using AI while maintaining your style.",
    url: "https://www.plusdocs.com/",
    icon: Layout,
    gradient: "from-[#A0A0A0] via-[#FFFFFF] to-[#808080]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.2)",
    features: ["Inside Slides", "AI Editing", "Auto-layouts"],
  },
  {
    id: "canva-magic",
    name: "Canva Magic",
    category: "Presentation & Web",
    tagline: "Creative Suite",
    description: "An all-around creative suite that generates presentations, social graphics, and videos from text prompts.",
    whatIsIt: "Allows you to generate social graphics, presentations, and videos by simply describing what you want to achieve.",
    url: "https://canva.com",
    icon: ImageIcon,
    gradient: "from-[#FFFFFF] via-[#C0C0C0] to-[#E5E4E2]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.3)",
    features: ["Social Graphics", "Magic Media", "Video Gen"],
  },
  {
    id: "tome",
    name: "Tome",
    category: "Presentation & Web",
    tagline: "AI Storytelling",
    description: "Strong for storytelling, pitch decks, and visual narratives.",
    whatIsIt: "An AI-powered generator that builds entire narratives and pitch decks, automatically generating images to match your story.",
    url: "https://tome.app",
    icon: Book,
    gradient: "from-[#708090] via-[#C0C0C0] to-[#FFFFFF]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.3)",
    features: ["AI Copywriting", "DALL-E Images", "Pitch Decks"],
  },
  {
    id: "sketchbubble",
    name: "SketchBubble",
    category: "Presentation & Web",
    tagline: "Pro Templates",
    description: "Ready-to-use presentation templates for PowerPoint, Keynote, and Google Slides.",
    whatIsIt: "Massive library of professionally designed templates and graphics that you can drop into any presentation.",
    url: "https://www.sketchbubble.com/",
    icon: Boxes,
    gradient: "from-[#808080] via-[#C0C0C0] to-[#404040]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(128, 128, 128, 0.3)",
    features: ["10k+ Templates", "Vector Icons", "Free Assets"],
  },

  // ── PRODUCTIVITY & AUTOMATION ──
  {
    id: "zapier",
    name: "Zapier",
    category: "Productivity",
    tagline: "Workflow Engine",
    description: "Uses natural language to connect thousands of apps and automate workflows.",
    whatIsIt: "The glue for the internet. Example: 'When a lead comes in, draft an email and add them to a spreadsheet' — all automated.",
    url: "https://zapier.com",
    icon: Activity,
    gradient: "from-[#E5E4E2] via-[#C0C0C0] to-[#A0A0A0]",
    glowColor: "#E5E4E2",
    borderColor: "rgba(229, 228, 226, 0.35)",
    features: ["6000+ App Sync", "AI Automation", "Zero Code"],
  },
  {
    id: "fireflies",
    name: "Fireflies.ai",
    category: "Productivity",
    tagline: "Meeting Intel",
    description: "AI assistants that join, transcribe, and summarize meetings, identifying key action items.",
    whatIsIt: "An AI note-taker that joins your Zoom or Google Meet calls to transcribe everything and create a perfect summary with action items.",
    url: "https://fireflies.ai",
    icon: Mic,
    gradient: "from-[#A0A0A0] via-[#C0C0C0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(160, 160, 160, 0.3)",
    features: ["Auto-Transcribe", "Searchable Calls", "Action Items"],
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    category: "Productivity",
    tagline: "Voice Intelligence",
    description: "AI transcription and meeting summaries with real-time highlights.",
    whatIsIt: "Transcribes meetings in real-time, highlighting key points and allowing you to search through every spoken word across all your recorded calls.",
    url: "https://otter.ai",
    icon: Mic,
    gradient: "from-[#FFFFFF] via-[#C0C0C0] to-[#708090]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.2)",
    features: ["Real-time Notes", "Speaker ID", "Searchable Audio"],
  },
  {
    id: "reclaim-ai",
    name: "Reclaim.ai",
    category: "Productivity",
    tagline: "Smart Calendar",
    description: "A smart calendar tool that uses AI to block out time for tasks and automatically reschedule meetings.",
    whatIsIt: "An AI calendar that automatically blocks out time for your 'To-Do' list and smartly reschedules meetings to protect your focus hours.",
    url: "https://reclaim.ai",
    icon: Calendar,
    gradient: "from-[#C0C0C0] via-[#808080] to-[#A0A0A0]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.2)",
    features: ["Focus Time", "Smart Reschedule", "Habit Tracking"],
  },

  // ── MARKETING & VIDEO ──
  {
    id: "runway",
    name: "Runway",
    category: "Marketing & Video",
    tagline: "Real-time Video",
    description: "Leader in AI-powered video editing and generation.",
    whatIsIt: "A toolkit for professional film-making using AI. You can generate videos from text, remove backgrounds, or paint things out of shots.",
    url: "https://runwayml.com",
    icon: Video,
    gradient: "from-[#C0C0C0] via-[#FFFFFF] to-[#708090]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(192, 192, 192, 0.4)",
    features: ["Gen-2 Text-to-Video", "Inpainting", "Slow-Mo AI"],
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Marketing & Video",
    tagline: "Neural Audio",
    description: "High-quality AI voice generation and cloning for video and audio content.",
    whatIsIt: "The most realistic AI speech software ever created. It can generate lifelike narration or even clone your own voice for content.",
    url: "https://elevenlabs.io",
    icon: AudioWaveform,
    gradient: "from-[#E5E4E2] via-[#C0C0C0] to-[#FFFFFF]",
    glowColor: "#E5E4E2",
    borderColor: "rgba(229, 228, 226, 0.3)",
    features: ["Voice Cloning", "Multi-lingual", "Realistic Tone"],
  },
  {
    id: "jasper",
    name: "Jasper",
    category: "Marketing & Video",
    tagline: "Brand-Voice AI",
    description: "Specialized for creating brand-consistent marketing copy, blog posts, and multi-channel campaigns.",
    whatIsIt: "An enterprise AI platform that learns your brand's unique voice and helps you write blogs, social posts, and ads that always stay on message.",
    url: "https://jasper.ai",
    icon: Sparkles,
    gradient: "from-[#A0A0A0] via-[#FFFFFF] to-[#808080]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.3)",
    features: ["Brand Voice", "SEO Insights", "Ad Copy"],
  },
  {
    id: "adcreative",
    name: "AdCreative.ai",
    category: "Marketing & Video",
    tagline: "High-Performance Ads",
    description: "Generates high-converting ad visuals and videos, with AI scoring of predicted performance.",
    whatIsIt: "Uses a massive database of successful ads to generate your own banners and videos, predicting which designs will get the most clicks.",
    url: "https://adcreative.ai",
    icon: Megaphone,
    gradient: "from-[#C0C0C0] via-[#A0A0A0] to-[#E5E4E2]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.3)",
    features: ["AI Performance Score", "Banner Gen", "Conversion Focus"],
  },

  // ── SOFTWARE DEVELOPMENT ──
  {
    id: "cursor",
    name: "Cursor / Claude Code",
    category: "Software Development",
    tagline: "AI-native IDE",
    description: "AI-native IDEs that allow for building entire applications using natural language.",
    whatIsIt: "A code editor built for AI coding. It 'knows' your entire codebase and can write massive chunks of code or fix complex bugs instantly.",
    url: "https://cursor.com",
    icon: Terminal,
    gradient: "from-[#C0C0C0] via-[#A0A0A0] to-[#808080]",
    glowColor: "#C0C0C0",
    borderColor: "rgba(192, 192, 192, 0.35)",
    features: ["Codebase Indexing", "Copilot++", "Chat with Files"],
  },
  {
    id: "replit",
    name: "Replit",
    category: "Software Development",
    tagline: "Cloud Coding",
    description: "A cloud-based IDE with AI that handles coding, deployment, and prototyping.",
    whatIsIt: "Start a project and have it live on the web in seconds. Its 'AI Ghostwriter' writes code for you directly in the cloud environment.",
    url: "https://replit.com",
    icon: Cpu,
    gradient: "from-[#FFFFFF] via-[#E5E4E2] to-[#C0C0C0]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.3)",
    features: ["Instant Deploy", "Multiplayer Code", "Replit Ghostwriter"],
  },

  // ── WRITING & RESEARCH ──
  {
    id: "notebook-lm",
    name: "NotebookLM",
    category: "Writing & Research",
    tagline: "Source-Grounded AI",
    description: "Ideal for 'source-grounded' analysis, based on your own documents (PDFs, YouTube, etc.).",
    whatIsIt: "Google's AI notebook that creates a personal model based on your uploaded sources to answer questions with exact citations.",
    url: "https://notebooklm.google.com/",
    icon: BookOpen,
    gradient: "from-[#FFFFFF] via-[#C0C0C0] to-[#808080]",
    glowColor: "#FFFFFF",
    borderColor: "rgba(255, 255, 255, 0.2)",
    features: ["PDF Analysis", "Deep Research", "Podcast Mode"],
  },
  {
    id: "grammarly",
    name: "Grammarly AI",
    category: "Writing & Research",
    tagline: "Writing Co-pilot",
    description: "Extends beyond spellcheck to analyze tone, clarity, and structure for professional writing.",
    whatIsIt: "Goes beyond simple spellcheck to understand your intent, helping you adjust your tone to be more professional, friendly, or persuasive.",
    url: "https://grammarly.com",
    icon: PenTool,
    gradient: "from-[#C0C0C0] via-[#E5E4E2] to-[#A0A0A0]",
    glowColor: "#E5E4E2",
    borderColor: "rgba(229, 228, 226, 0.2)",
    features: ["Tone Detection", "Clarity Check", "AI Drafting"],
  },
];

const courses = [
  {
    name: "Scratch Masterclass",
    provider: "MIT Official",
    description: "Modern block-based coding foundations.",
    url: "https://scratch.mit.edu/ideas",
    icon: Puzzle,
    tag: "Free",
  },
  {
    name: "PictoBlox AI Course",
    provider: "STEMpedia",
    description: "AI & ML for young innovators.",
    url: "https://thestempedia.com/courses/introduction-to-ai-for-kids/",
    icon: Boxes,
    tag: "Free",
  },
  {
    name: "Swift Puzzles",
    provider: "Apple Official",
    description: "Interactive foundations of Swift.",
    url: "https://www.apple.com/swift/playgrounds/",
    icon: Code2,
    tag: "iOS Free",
  },
  {
    name: "Arduino Essentials",
    provider: "Arduino CC",
    description: "Circuit design & hardware coding guide. 100% Free.",
    url: "https://docs.arduino.cc/learn/",
    icon: Cpu,
    tag: "Free",
  },
];

const categories = [
  "All",
  "AI Assistants",
  "Visual Coding",
  "Presentation & Web",
  "Writing & Research",
  "Productivity",
  "Marketing & Video",
  "Software Development"
];



const languages = [
  { name: "Python", color: "#C0C0C0" },
  { name: "JavaScript", color: "#E5E4E2" },
  { name: "HTML/CSS", color: "#708090" },
  { name: "React", color: "#FFFFFF" },
  { name: "Node.js", color: "#C0C0C0" },
  { name: "Java", color: "#E5E4E2" },
  { name: "C++", color: "#708090" },
  { name: "TypeScript", color: "#FFFFFF" },
  { name: "SQL", color: "#C0C0C0" },
  { name: "Rust", color: "#E5E4E2" },
  { name: "Go", color: "#708090" },
  { name: "Swift", color: "#FFFFFF" },
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
              <h3 className="text-xl font-bold tracking-tight group-hover:text-white transition-colors">
                {tool.name}
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

        {/* What is it? Explanation */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">What is it?</p>
          <p className="text-xs text-gray-400 leading-relaxed italic">{tool.whatIsIt}</p>
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
            background: ["#C0C0C0", "#E5E4E2", "#FFFFFF"][i % 3],
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    const storedName = localStorage.getItem("vih_user_name");
    if (storedName) setUserName(storedName);
    setMounted(true);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });


  return (
    <div className="min-h-screen bg-[#08080f] text-white relative overflow-hidden">
      {/* ═══ ANIMATED RAINBOW BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 15%, rgba(192,192,192,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 25%, rgba(229,228,226,0.10) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 85%, rgba(255,255,255,0.06) 0%, transparent 60%)",

          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[12%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(192,192,192,0.1)" }}

        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[8%] w-96 h-96 rounded-full blur-[140px]"
          style={{ background: "rgba(229,228,226,0.08)" }}

        />
        <motion.div
          animate={{ x: [0, 30, -40, 0], y: [0, -20, 35, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[12%] left-[35%] w-[450px] h-[450px] rounded-full blur-[150px]"
          style={{ background: "rgba(255,255,255,0.05)" }}

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
        className="relative z-20 h-[3px] w-full bg-gradient-to-r from-[#C0C0C0] via-[#FFFFFF] to-[#C0C0C0] origin-left"

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
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-all duration-300 group"
            >

              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-mono hidden sm:inline">HOME</span>
            </a>
            <div className="w-px h-6 bg-white/10 hidden sm:block" />
          </div>

          <div className="flex items-center gap-3">
            {/* Search with glow */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />

              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300 w-52 focus:w-72 font-mono focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"

              />
            </div>
            {/* User badge */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/[0.08] hover:border-white/[0.2] transition-colors"

            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#708090] flex items-center justify-center text-xs font-bold text-black shadow-[0_0_12px_rgba(255,255,255,0.2)]">

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


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#A0A0A0] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Digital
            </span>{" "}
            Forge
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C0C0C0] via-[#FFFFFF] to-[#C0C0C0]">
              Intelligence
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
              { label: "Tools", value: "4+", color: "#C0C0C0" },
              { label: "Languages", value: "12", color: "#FFFFFF" },
              { label: "Cost", value: "Free", color: "#A0A0A0" },

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

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl border text-xs font-mono transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
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

      {/* ═══ ACADEMY SECTION: FREE COURSES ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C0C0C0] mb-5 uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            Free Academy
          </div>
          <h3 className="text-4xl font-black mb-4">Start Your <span className="text-white">Learning Journey.</span></h3>
          <p className="text-gray-500 max-w-lg mx-auto">Master hardware, artificial intelligence, and visual programming with these curated 100% free courses.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.a
              key={course.name}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                <course.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg text-white">{course.name}</h4>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-mono text-gray-400 capitalize">{course.tag}</span>
              </div>
              <p className="text-sm text-gray-500 font-mono mb-4">{course.provider}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{course.description}</p>
              <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                Access Course <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>


      {/* ═══ LANGUAGES SECTION ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Section rainbow divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />


        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C0C0C0] mb-5">

            <Code2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-[0.15em]">Learn for Free</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Every Language.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C0C0C0]">
              Absolute Mastery.
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
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:border-white/30 transition-colors">
              <Code2 className="w-6 h-6 text-white" />
            </div>
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

        {/* ═══ KNOWLEDGE BASE: WHAT IS GITHUB? ═══ */}
        <section className="mb-24">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-6">
                Knowledge Base
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">
                What is <span className="text-white bg-clip-text">GitHub?</span>
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                <p>
                  Think of GitHub as the <span className="text-white font-medium">World&apos;s Library of Code</span>. It is where millions of developers store, share, and collaborate on software projects.
                </p>
                <p>
                  At its core, it uses <span className="text-white font-medium">Git</span> — a system that tracks every single change made to a file. This means you can travel back in time to any version of your project, collaborate with friends without overwriting their work, and showcase your skills to the world.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {["Version Control", "Open Source", "Collaboration", "CI/CD"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-1 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/5 border border-white/10 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#0c0c18]/80 backdrop-blur-xl" />
              <div className="relative p-8 z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">The Developer ID</h4>
                    <p className="text-gray-500 text-xs font-mono">portfolio.github.com</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Your GitHub profile is your digital resume. Every "green square" on your contribution graph tells a story of your growth as a builder.
                </p>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-white font-bold group"
                >
                  Create your profile <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>



        {/* ═══ KNOWLEDGE BASE: GIT FLOW ═══ */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
              Developer Workflow
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Master the <span className="text-white">Git Flow.</span></h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Transform your local ideas into global projects. Follow these three standard steps to sync your code with any repository.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "01",
                title: "Stage Your Changes",
                desc: "Tell Git which modified files you want to include in the snapshot.",
                cmd: "git add .",
                detail: "Stages all modifications in the current directory.",
                icon: Zap
              },
              {
                step: "02",
                title: "Commit Your Code",
                desc: "Save a local snapshot of your staged changes with a message.",
                cmd: 'git commit -m "message"',
                detail: "Replace 'message' with a brief description of your work.",
                icon: PenTool
              },
              {
                step: "03",
                title: "Push to Remote",
                desc: "Send your local commits to the server (GitHub/GitLab).",
                cmd: "git push",
                detail: "Uploads your work for collaboration and backup.",
                icon: Rocket
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors font-mono">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 shadow-inner">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-[#C0C0C0] mb-4">
                  $ {item.cmd}
                </div>
                <p className="text-[10px] text-gray-600 italic font-mono">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* VS Code Pro Tip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6">
                  Pro Tip: VS Code Method
                </div>
                <h4 className="text-2xl font-black text-white mb-4">Prefer the Mouse? Use the GUI.</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  If you prefer not to use the terminal, VS Code has built-in visual tools. Open the <span className="text-white font-mono">Source Control</span> panel <span className="text-white font-mono">(Ctrl+Shift+G)</span>, stage your changes with the plus icon, and hit commit.
                </p>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-500">
                    1. Open Panel
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-500">
                    2. Stage (+)
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-500">
                    3. Commit & Sync
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 h-48 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-8 relative group">
                <Layout className="w-20 h-20 text-white/20 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA to freeCodeCamp (already updated above) */}

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
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-white font-bold transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Rocket className="w-5 h-5 text-white relative z-10" />
            <span className="text-white relative z-10 text-lg">
              Start Learning — 100% Free
            </span>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors relative z-10" />

          </motion.a>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 py-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>Vyasa Innovation Hub — Intelligence Forge</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-white fill-white/10" />
            <span>by the Innovation Club</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
