"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FrameSequence from "./FrameSequence";
import { MAPPED_FRAME_PATHS } from "@/utils/framePaths";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalVideoBackground() {
  const [mounted, setMounted] = useState(false);
  const sequenceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Use a small timeout to ensure the DOM and page height are fully calculated
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalFrames = MAPPED_FRAME_PATHS.length;
        if (totalFrames === 0) return;

        const mainContainer = document.getElementById("main-scroll-container");
        if (!mainContainer) return;

        const playhead = { frame: 0 };
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        tl.to(playhead, {
          frame: totalFrames - 1,
          snap: "frame",
          ease: "none",
          duration: 1.0,
          onUpdate: () => {
            if (sequenceRef.current) {
              sequenceRef.current.renderFrame(Math.round(playhead.frame));
            }
          }
        }, 0);

        tl.to(".bg-typography", {
          yPercent: -100,
          ease: "none",
          duration: 1.0
        }, 0);
      }, containerRef.current);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  const handleLoadComplete = () => {
    ScrollTrigger.refresh();
  };

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#111414] -z-50" />;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-[100dvh] -z-50 bg-[#111414] overflow-hidden"
    >
      {/* Huge Background Typography (Moves with scroll, sits behind the images) */}
      <div className="bg-typography absolute top-0 left-0 w-full h-[200vh] flex flex-col items-center justify-start pt-[30vh] gap-[40vh] z-0 pointer-events-none opacity-40">
        <h1 className="text-[18vw] leading-none font-display text-[#2a2c2c] whitespace-nowrap tracking-tighter mix-blend-overlay">CHUKKU KAAPI</h1>
        <h1 className="text-[18vw] leading-none font-display text-transparent whitespace-nowrap tracking-tighter" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>VANAMEYA</h1>
        <h1 className="text-[18vw] leading-none font-display text-[#2a2c2c] whitespace-nowrap tracking-tighter mix-blend-overlay">THE RITUAL</h1>
        <h1 className="text-[18vw] leading-none font-display text-transparent whitespace-nowrap tracking-tighter" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>HERITAGE</h1>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <FrameSequence ref={sequenceRef} onLoadComplete={handleLoadComplete} className="opacity-100 mix-blend-screen scale-[1.05]" />
      </div>

      {/* Much lighter overlay to show images clearly while keeping text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111414]/80 via-[#111414]/20 to-[#111414]/80 z-20 pointer-events-none" />
    </div>
  );
}
