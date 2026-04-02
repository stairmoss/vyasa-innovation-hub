"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Users, Trophy, ChevronDown, Rocket } from "lucide-react";
import TiltCard from "@/components/TiltCard";

// Dynamically import ThreeGlobe to avoid SSR issues with 3D libraries
const ThreeGlobe = dynamic(() => import("@/components/ThreeGlobe"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="w-32 h-32 border-4 border-[#b30000]/30 border-t-[#b30000] rounded-full animate-spin" />
    </div>
  ),
});

const ScrollSequence = dynamic(() => import("@/components/ScrollSequence"), {
  ssr: false,
});

const stats = [
  { id: 1, label: "Members", value: "54", icon: Users },
  { id: 2, label: "Active Teams", value: "25", icon: Trophy },
  { id: 3, label: "Projects Built", value: "26+", icon: Calendar },
];

const team = {
  mentor: {
    name: "Noble S Ranjith",
    role: "Club Mentor & Visionary",
    image: "/assets/noble-sir.png",
  },
  leaders: [
    { name: "Adarsh A", role: "Club Lead and Tech Lead", image: "/assets/adarsh.png" },
    { name: "Karthik TS", role: "Tech Lead ", image: "/assets/karthik.png" },
    { name: "Thejus R", role: "Club Lead ", image: "/assets/thejus.png" },
  ],
};

const events = [
  {
    id: 1,
    title: "Mission Updates",
    date: "Current Status",
    desc: "No upcoming events scheduled at this moment. Stay tuned for new missions!",
    status: "Standby",
  },
];

export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [userName, setUserName] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmedName = userName.trim();
    if (trimmedName) {
      localStorage.setItem("vih_user_name", trimmedName);
      // Force direct browser navigation for maximum reliability
      window.location.assign("/toolbox");
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center bg-transparent">

      {/* --- HERO SECTION (SCROLL ANIMATION) --- */}
      <ScrollSequence>
        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 z-20 flex flex-col items-center gap-3 text-gray-400 cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-mono">Discover</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </ScrollSequence>

      {/* --- GLOBE & STATS UNIFIED SECTION --- */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Side: Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full min-h-[500px] h-[50vh] md:h-[600px] relative drop-shadow-[0_0_40px_var(--primary-glow)] cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 bg-[var(--primary-accent)] blur-[100px] opacity-10 rounded-full mix-blend-screen" />
            <ThreeGlobe />
          </motion.div>

          {/* Right Side: Stats & Join Flow */}
          <div className="flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`glass-card group p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden ${idx === stats.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <stat.icon className="w-10 h-10 text-[var(--primary-accent)] mb-4 animate-pulse-glow" />
                  <h3 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 font-mono tracking-widest uppercase text-xs md:text-sm font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* JOIN US FORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-accent)]/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-30" />
              <h3 className="text-2xl font-black mb-2 tracking-tight">JOIN THE MOVEMENT</h3>
              <p className="text-gray-400 text-xs mb-6 font-mono tracking-widest uppercase opacity-60">Enter your name to initialize hub access.</p>

              <form onSubmit={handleJoin} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="NAME"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-all font-mono placeholder:text-gray-700"
                />
                <button
                  type="submit"
                  className="w-full bg-[#ffffff] hover:bg-[#eeeeee] text-black font-black py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-tighter"
                >
                  OPEN TOOLBOX
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-20 text-center z-10 relative"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            The <span className="text-[var(--primary-accent)] drop-shadow-[0_0_15px_var(--primary-glow)]">Innovators</span>
          </h2>
          <p className="max-w-2xl text-xl text-gray-400 font-light">
            Guided by vision, driven by code. Meet the architects of our digital future.
          </p>
        </motion.div>

        {/* Mentor */}
        <div className="mb-20 z-10 relative">
          <TiltCard
            image={team.mentor.image}
            name={team.mentor.name}
            role={team.mentor.role}
            isMentor={true}
          />
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative">
          {team.leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <TiltCard
                image={leader.image}
                name={leader.name}
                role={leader.role}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- EVENTS TIMELINE --- */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 mb-20 relative">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-center mb-20"
        >
          Mission <span className="text-white/30">Timeline</span>
        </motion.h2>

        <div className="relative border-l-2 border-[var(--primary-accent)]/40 ml-4 md:ml-0 space-y-16 py-4">
          {/* Glowing line overlay */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-[var(--primary-accent)]/80 via-[var(--primary-accent)]/20 to-transparent shadow-[0_0_15px_var(--primary-accent)]" />

          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative md:pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[11px] top-6 w-5 h-5 rounded-full bg-black border-4 border-[var(--primary-accent)] shadow-[0_0_15px_var(--primary-glow)] group-hover:scale-125 transition-all duration-300 group-hover:bg-[var(--primary-accent)]" />

              <div className="ml-8 md:ml-0 glass-card p-8 rounded-2xl group-hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-[var(--primary-accent)] transition-colors">{event.title}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest border shadow-lg ${event.status === "Upcoming" ? "border-green-500/50 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]" : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]"}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-[var(--primary-accent)] font-mono mb-4 text-sm tracking-widest">{event.date}</p>
                <p className="text-gray-400 text-lg">{event.desc}</p>

                <button className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-[var(--primary-accent)] text-white text-sm font-semibold rounded-lg transition-all duration-300 border border-white/10 hover:shadow-[0_0_15px_var(--primary-glow)]">
                  Mission Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
