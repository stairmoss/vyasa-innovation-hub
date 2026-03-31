"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollSequence({ children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const imagesRef = useRef([]);
  const requestRef = useRef();

  const FRAME_COUNT = 192;
  const START_FRAME = 1;
  const PAD_LENGTH = 5;

  const getImagePath = (index) => {
    // Pad index with zeros: 1 -> "00001", 10 -> "00010"
    const paddedIndex = String(index).padStart(PAD_LENGTH, "0");
    return `/animation/${paddedIndex}.png`;
  };

  // Preload images into memory
  useEffect(() => {
    const images = [];
    let loaded = 0;

    for (let i = START_FRAME; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      images.push(img);
      img.onload = () => {
        loaded++;
        if (loaded === 1) {
          // Draw first frame immediately
          drawFrame(START_FRAME);
        }
      };
    }
    imagesRef.current = images;

    // Set canvas dimensions explicitly for high-res drawing
    if (canvasRef.current) {
        // Adjust these to match the intrinsic size of the animation
        canvasRef.current.width = 1920;
        canvasRef.current.height = 1080;
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const drawFrame = (frameIndex) => {
    if (!canvasRef.current || !imagesRef.current.length) return;
    const context = canvasRef.current.getContext("2d");
    const img = imagesRef.current[frameIndex - 1]; // Array is 0-indexed

    if (img && img.complete && img.naturalHeight !== 0) {
      // Clear canvas and draw
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Smooth framing render loop
  const renderLoop = () => {
    // Simple interpolation for smoother scrubbing if user jumps scroll quickly
    currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.2;
    
    // Draw current interpolated frame rounded
    const roundedFrame = Math.max(1, Math.min(FRAME_COUNT, Math.round(currentFrameRef.current)));
    drawFrame(roundedFrame);

    requestRef.current = requestAnimationFrame(renderLoop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress (0 to 1) to frames (1 to 192)
    const nextFrame = Math.max(
      START_FRAME,
      Math.min(FRAME_COUNT, Math.floor(latest * FRAME_COUNT) + START_FRAME)
    );
    targetFrameRef.current = nextFrame;
  });

  return (
    // The container height gives us scrollable space (e.g., 400vh)
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky wrapper to pin the canvas while scrolling */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
        
        {/* Dynamic theme blending layer behind the animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_50%)] opacity-30 pointer-events-none" />
        
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none mix-blend-screen drop-shadow-[0_0_15px_var(--primary-glow)]"
        />

        {/* Foreground gradient to blend edges seamlessly into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

        {/* Injected Content (Hero Title, Buttons, etc.) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-10">
            {children}
        </div>
      </div>
    </div>
  );
}
