"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="w-full h-[100dvh] z-10 flex flex-col justify-end pb-16 md:pb-20 px-4 sm:px-6 md:px-12 relative bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        style={mounted ? { opacity, y } : {}}
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-col text-left pb-4 md:pb-12"
      >
        <div className="w-full flex flex-col gap-4">
          <span className="text-label-caps text-[#8ed2d5] tracking-[0.2em] uppercase opacity-80 block">
            A Morning Practice
          </span>
          
          <h1 className="text-display-lg text-[#e1e3e2]">
            Awaken the senses.<br />
            Rooted in heritage.
          </h1>
          
          <p className="text-body-lg text-[#bec8c8] max-w-md mt-2">
            Experience the deep, grounding ritual of traditional Kerala Chukku Kaapi. A harmonious blend of ancient wisdom and modern luxury.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Link 
              href="/shop" 
              className="w-full sm:w-auto bg-[#c9c6c1] text-[#111414] text-label-caps tracking-widest uppercase hover:bg-[#e5e2dc] transition-all duration-300 py-4 px-8 rounded flex items-center justify-center gap-2 font-semibold cursor-pointer"
            >
              Begin Ritual
              <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/story" 
              className="w-full sm:w-auto border border-[#c9c6c1]/20 text-[#e1e3e2] text-label-caps tracking-widest uppercase hover:bg-white/5 transition-all duration-300 py-4 px-8 rounded flex items-center justify-center cursor-pointer"
            >
              Discover the Story
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator label */}
      <motion.div style={mounted ? { opacity } : {}} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-label-caps text-[#bec8c8]/40 text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}
