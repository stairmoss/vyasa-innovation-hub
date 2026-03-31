"use client";

import Tilt from "react-parallax-tilt";
import Image from "next/image";

export default function TiltCard({ image, name, role, isMentor = false }) {
    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.02}
            transitionSpeed={2500}
            className={`glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-[0_0_30px_var(--primary-glow)] border group ${isMentor ? "w-full max-w-md mx-auto border-[var(--primary-accent)]/30" : "w-full border-white/10"
                }`}
        >
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/20 mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:border-[var(--primary-accent)]/50 transition-all duration-500">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-3xl font-black text-gray-600">
                        {name.charAt(0)}
                    </div>
                )}
                
                {/* Inner Glow Overlay */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
            </div>

            <h3 className={`font-black tracking-tight text-white group-hover:text-[var(--primary-accent)] transition-colors ${isMentor ? "text-2xl md:text-3xl" : "text-xl"}`}>
                {name}
            </h3>

            <p className={`text-sm md:text-base font-mono mt-2 tracking-widest uppercase font-semibold ${isMentor ? "text-[--primary-accent] drop-shadow-[0_0_10px_var(--primary-glow)]" : "text-gray-400"}`}>
                {role}
            </p>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--primary-accent)] animate-pulse-glow" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-accent)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Tilt>
    );
}
