"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function ThreeGlobe() {
    const globeEl = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Auto-rotate
        if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = true;
            controls.enableRotate = true;
            controls.minDistance = 250; // Lock at starting altitude (no zoom in)
            controls.maxDistance = 1000; // Allow zoom out into space
            globeEl.current.pointOfView({ lat: 10.8505, lng: 76.2711, altitude: 2.5 }); // High level view of Kerala
        }
    }, []);

    const gData = [
        {
            lat: 10.8505,
            lng: 76.2711,
            size: 0.1,
            color: "#ffffff", // Neon white marker
            name: "Vyasa Vidya Peethom - Kerala, India",
        },
    ];

    if (!mounted) return <div className="h-[600px] w-full bg-black/20 animate-pulse" />;

    return (
        <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pointsData={gData}
                pointAltitude={0.1}
                pointColor="color"
                pointRadius="size"
                pointsMerge={true}
                animateIn={true}
                height={600}
                width={600}
                backgroundColor="rgba(0,0,0,0)"
            />
        </div>
    );
}
