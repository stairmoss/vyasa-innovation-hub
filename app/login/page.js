"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";
import ThreeGlobe from "@/components/ThreeGlobe"; // Reusing for background ambiance

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(false);
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Accept any password for demo, but shake if empty or specific "fail" trigger (optional)
            if (username && password) {
                router.push("/dashboard");
            } else {
                setIsLoading(false);
                setError(true);
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#800000] rounded-full blur-[120px] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8"
            >
                <motion.div
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="glass-card p-10 rounded-3xl border border-white/10"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#800000] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(128,0,0,0.5)] transform -rotate-[10deg]">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-wider">SECURE ACCESS</h1>
                        <p className="text-gray-400 text-sm mt-2">Identify yourself to enter the hub.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Agent ID"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#800000] focus:bg-white/5 transition-all placeholder:text-gray-600"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="Passcode"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#800000] focus:bg-white/5 transition-all placeholder:text-gray-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#800000] hover:bg-[#a00000] disabled:bg-gray-800 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Validating...
                                </span>
                            ) : (
                                <>
                                    Access Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-600 uppercase tracking-widest font-mono">Restricted Area // Level 4 Security</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
