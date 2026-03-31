"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function YodhaChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Greetings! I am Yodha, the AI guardian of the Innovation Club. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "qwen/qwen-2.5-coder-32b-instruct",
                    messages: [
                        { role: "system", content: "You are Yodha, an advanced AI assistant for the Vyasa Innovation Club. Brief answers. Tone: Futuristic, encouraging, tech-savvy." },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userMessage }
                    ]
                })
            });

            const data = await response.json();

            if (data.choices && data.choices[0]) {
                setMessages(prev => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
            } else {
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: "assistant", content: "Accessing neural archives... (Simulation: I can help you build React components! ask me how.)" }]);
                }, 1000);
            }

        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Connection interrupted. Re-establishing link..." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.div
                className="fixed bottom-8 right-8 z-50 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Glow behind button */}
                <div className="absolute inset-0 bg-[var(--primary-accent)] rounded-full blur-[20px] opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
                
                <div className="relative w-16 h-16 bg-gradient-to-br from-[var(--primary-accent)] to-[#4d0000] rounded-full flex items-center justify-center shadow-2xl border border-white/20 transition-all">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                <X className="text-white w-7 h-7" />
                            </motion.div>
                        ) : (
                            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                <MessageSquare className="text-white w-7 h-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-28 right-8 w-[380px] h-[550px] glass-card rounded-3xl flex flex-col overflow-hidden z-50 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[var(--primary-accent)]/90 to-black/90 p-5 flex items-center justify-between border-b border-white/10 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-accent)]/30 blur-[40px] rounded-full pointer-events-none" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                    <Bot className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black tracking-wide text-lg">YODHA AI</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                        <span className="text-xs font-mono text-green-400">System Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin bg-black/40">
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx} 
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg border ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-white/10 to-white/5 text-white rounded-tr-sm border-white/10'
                                            : 'bg-gradient-to-br from-[var(--primary-accent)]/40 to-black/60 text-white rounded-tl-sm border-[var(--primary-accent)]/30 shadow-[0_0_15px_rgba(179,0,0,0.1)]'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gradient-to-br from-[var(--primary-accent)]/30 to-black/60 p-4 rounded-2xl rounded-tl-sm flex items-center gap-3 border border-[var(--primary-accent)]/20">
                                        <Loader2 className="w-5 h-5 animate-spin text-[var(--primary-accent)]" />
                                        <span className="text-xs font-mono text-gray-300">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-black/60 border-t border-white/10 flex gap-3 backdrop-blur-xl">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Query the neural net..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--primary-accent)] focus:bg-white/10 focus:shadow-[0_0_15px_rgba(179,0,0,0.2)] transition-all placeholder:text-gray-600 font-mono"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-[52px] h-[52px] bg-gradient-to-br from-[var(--primary-accent)] to-[#660000] rounded-xl flex items-center justify-center text-white hover:brightness-125 disabled:opacity-50 transition-all border border-white/10 shadow-[0_0_10px_rgba(179,0,0,0.4)]"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
