"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvasSequence from "./HeroCanvasSequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ frames = [] }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const moment1Ref = useRef(null);
  const moment2Ref = useRef(null);
  const moment3Ref = useRef(null);
  const sequenceRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || frames.length === 0) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalFrames = frames.length;
        if (totalFrames === 0) return;

        const playhead = { frame: 0 };
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%", // Reduced from 400% to eliminate dead scrolling space
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        });

        // Scrub image sequence over the full scroll duration
        tl.to(playhead, {
          frame: totalFrames - 1,
          snap: "frame",
          ease: "none",
          duration: 1.0, // Represents 0 to 100% of the pin
          onUpdate: () => {
            if (sequenceRef.current) {
              sequenceRef.current.renderFrame(Math.round(playhead.frame));
            }
          }
        }, 0);

        // Fade out initial text (10% to 25%)
        if (textRef.current) {
          tl.fromTo(textRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -50,
              ease: "power2.inOut",
              duration: 0.15
            }, 
            0.10
          );
        }

        // Moment 1: Morning (Fade in 25-30%, Fade out 35-45%)
        if (moment1Ref.current) {
          tl.fromTo(moment1Ref.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.05 },
            0.25
          ).to(moment1Ref.current, 
            { opacity: 0, y: -50, ease: "power2.in", duration: 0.1 },
            0.35
          );
        }

        // Moment 2: Midday (Fade in 45-50%, Fade out 55-65%)
        if (moment2Ref.current) {
          tl.fromTo(moment2Ref.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.05 },
            0.45
          ).to(moment2Ref.current, 
            { opacity: 0, y: -50, ease: "power2.in", duration: 0.1 },
            0.55
          );
        }

        // Moment 3: Evening (Fade in 65-70%, Fade out 85-95%)
        if (moment3Ref.current) {
          tl.fromTo(moment3Ref.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.05 },
            0.65
          ).to(moment3Ref.current, 
            { opacity: 0, y: -50, ease: "power2.in", duration: 0.1 },
            0.85
          );
        }

        // 90-100%: Subtle overlay fades in to bridge into the next section
        const overlay = document.querySelector('.hero-transition-overlay');
        if (overlay) {
          tl.to(overlay, {
            opacity: 1,
            ease: "none",
            duration: 0.10
          }, 0.90);
        }

      }, containerRef.current);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted, frames]);

  return (
    <div className="w-full relative">
      <section 
        ref={containerRef}
        id="hero" 
        className="relative w-full h-[100dvh] bg-background overflow-hidden"
      >
      {/* The Canvas Sequence */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <HeroCanvasSequence ref={sequenceRef} frames={frames} className="w-full h-full object-contain" />
        {/* Subtle overlay to ensure text legibility at the start */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111414]/40 via-transparent to-[#111414]/60 mix-blend-multiply" />
      </div>

      {/* Content wrapper */}
      <div className="relative w-full h-[100dvh] z-10 flex flex-col justify-start pt-24 md:pt-40 px-4 sm:px-6 md:px-12 pointer-events-none">
        <div className="relative z-20 max-w-7xl mx-auto w-full h-full">
          
          {/* Initial Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="absolute top-0 left-0 w-full flex flex-col text-left pointer-events-auto"
          >
            <div ref={textRef} className="w-full max-w-lg flex flex-col gap-4">
              <span className="type-label text-accent tracking-[0.2em] uppercase opacity-80 block drop-shadow-md">
                A Morning Practice
              </span>
              
              <h1 className="type-display-lg text-primary-text drop-shadow-xl">
                Awaken the senses.<br />
                Rooted in heritage.
              </h1>
              
              <p className="type-body-lg text-secondary-text mt-2 drop-shadow-md">
                Experience the deep, grounding ritual of traditional Kerala Dry Ginger Coffee. A harmonious blend of ancient wisdom and modern luxury.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                <Link 
                  href="/shop" 
                  className="w-full sm:w-auto bg-accent text-surface-elevated type-label tracking-widest uppercase hover:bg-accent-hover transition-all duration-300 py-4 px-8 rounded flex items-center justify-center gap-2 font-semibold cursor-pointer shadow-lg"
                >
                  Begin Ritual
                </Link>
                <Link 
                  href="/story" 
                  className="w-full sm:w-auto border border-border text-primary-text type-label tracking-widest uppercase hover:bg-white/10 transition-all duration-300 py-4 px-8 rounded flex items-center justify-center cursor-pointer backdrop-blur-sm"
                >
                  Discover the Story
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Moment 1: Morning */}
          <div ref={moment1Ref} className="absolute top-1/4 left-0 w-full max-w-md opacity-0 pointer-events-auto">
            <div className="bg-background/40 backdrop-blur-md p-8 rounded-3xl border border-border/50 shadow-2xl">
              <span className="type-label text-accent mb-4 block tracking-[0.15em] uppercase drop-shadow-sm">01 / Focus</span>
              <h3 className="type-h2 text-primary-text mb-4 drop-shadow-lg leading-tight">Natural Morning Energy</h3>
              <p className="type-body lg:type-body-lg text-secondary-text leading-relaxed drop-shadow-md">
                A warm and mindful way to begin the day, waking the senses gently without the jarring spikes or afternoon crashes of traditional caffeine.
              </p>
            </div>
          </div>

          {/* Moment 2: Midday */}
          <div ref={moment2Ref} className="absolute top-1/3 right-0 w-full max-w-md opacity-0 pointer-events-auto text-left md:text-right">
            <div className="bg-background/40 backdrop-blur-md p-8 rounded-3xl border border-border/50 shadow-2xl">
              <span className="type-label text-accent mb-4 block tracking-[0.15em] uppercase drop-shadow-sm">02 / Balance</span>
              <h3 className="type-h2 text-primary-text mb-4 drop-shadow-lg leading-tight">Everyday Wellness</h3>
              <p className="type-body lg:type-body-lg text-secondary-text leading-relaxed drop-shadow-md">
                Inspired by traditional Ayurvedic ingredients like dry ginger and black pepper that have been trusted for generations to restore balance and soothe digestion.
              </p>
            </div>
          </div>

          {/* Moment 3: Evening */}
          <div ref={moment3Ref} className="absolute top-1/4 left-0 w-full max-w-md opacity-0 pointer-events-auto">
            <div className="bg-background/40 backdrop-blur-md p-8 rounded-3xl border border-border/50 shadow-2xl">
              <span className="type-label text-accent mb-4 block tracking-[0.15em] uppercase drop-shadow-sm">03 / Unwind</span>
              <h3 className="type-h2 text-primary-text mb-4 drop-shadow-lg leading-tight">Comfort In Every Season</h3>
              <p className="type-body lg:type-body-lg text-secondary-text leading-relaxed drop-shadow-md">
                Not just a remedy for rainy days. Designed for your everyday rituals, offering a grounding moment of warmth and calm whenever you need it most.
              </p>
            </div>
          </div>

        </div>

        {/* Scroll indicator label */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        >
          <span className="type-label text-secondary-text/60 type-caption tracking-[0.3em] uppercase animate-pulse drop-shadow-md">
            Scroll to Explore
          </span>
        </motion.div>
      </div>
      
      {/* Transition Overlay */}
      <div className="hero-transition-overlay absolute inset-0 z-10 bg-background pointer-events-none opacity-0" />
      </section>
    </div>
  );
}
