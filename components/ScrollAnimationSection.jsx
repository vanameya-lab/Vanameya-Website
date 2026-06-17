"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FrameSequence from "./FrameSequence";
import { MAPPED_FRAME_PATHS } from "@/utils/framePaths";

// Register ScrollTrigger globally once to avoid duplicate registration issues in Next.js Strict Mode
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimationSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const pinContainerRef = useRef(null);
  const sequenceRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // Avoid hydration mismatch by waiting until component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Use gsap.context to ensure complete and clean teardown of all triggers/animations
    const ctx = gsap.context(() => {
      const totalFrames = MAPPED_FRAME_PATHS.length;
      if (totalFrames === 0) return;

      const playhead = { frame: 0 };
      const mm = gsap.matchMedia();

      // Desktop Timeline & Pinning
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, // Trigger based on the outer section position
            pin: pinContainerRef.current,  // Pin the inner h-screen container to prevent React DOM manipulation errors
            start: "top top",
            end: () => "+=" + (window.innerHeight * 3.5), // Scroll distance relative to viewport height
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Initialize cards offscreen
        gsap.set(".card-2", { y: 500, opacity: 0, scale: 0.95 });
        gsap.set(".card-3", { y: 500, opacity: 0, scale: 0.95 });

        // 1. Scrub through frames over the entire timeline (duration: 1.0)
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

        // 2. Canvas scale/perspective effect (duration: 1.0)
        tl.fromTo(canvasContainerRef.current, 
          { scale: 0.9, rotateY: 5 },
          { scale: 1.05, rotateY: 0, ease: "power1.inOut", duration: 1.0 }, 
          0
        );

        // 3. Card 2 enters at 30% scroll progress (quick slide-up from y:150 to y:30)
        tl.fromTo(".card-2", 
          { y: 150, opacity: 0, scale: 0.95 },
          { y: 30, opacity: 1, scale: 1, ease: "power2.out", duration: 0.10 }, 
          0.30
        );
        tl.to(".card-1", 
          { scale: 0.95, y: -20, opacity: 0.5, ease: "power2.out", duration: 0.10 }, 
          0.30
        );

        // 4. Card 3 enters at 65% scroll progress (quick slide-up from y:150 to y:60)
        tl.fromTo(".card-3", 
          { y: 150, opacity: 0, scale: 0.95 },
          { y: 60, opacity: 1, scale: 1, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
        tl.to(".card-2", 
          { scale: 0.95, y: 15, opacity: 0.5, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
        tl.to(".card-1", 
          { scale: 0.90, y: -40, opacity: 0.25, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
      });

      // Mobile Timeline & Pinning
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinContainerRef.current,
            start: "top top",
            end: () => "+=" + (window.innerHeight * 3.5), // Scroll distance relative to viewport height
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Initialize cards offscreen for mobile
        gsap.set(".card-2", { y: 350, opacity: 0, scale: 0.95 });
        gsap.set(".card-3", { y: 350, opacity: 0, scale: 0.95 });

        // 1. Scrub through frames (duration: 1.0)
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

        // 2. Canvas scale (duration: 1.0)
        tl.fromTo(canvasContainerRef.current, 
          { scale: 0.85 },
          { scale: 0.95, ease: "power1.inOut", duration: 1.0 }, 
          0
        );

        // 3. Card 2 enters at 30% scroll progress (quick slide-up from y:100 to y:15)
        tl.fromTo(".card-2", 
          { y: 100, opacity: 0, scale: 0.95 },
          { y: 15, opacity: 1, scale: 1, ease: "power2.out", duration: 0.10 }, 
          0.30
        );
        tl.to(".card-1", 
          { scale: 0.95, y: -10, opacity: 0.5, ease: "power2.out", duration: 0.10 }, 
          0.30
        );

        // 4. Card 3 enters at 65% scroll progress (quick slide-up from y:100 to y:30)
        // Card 3 is fully stacked by 75% scroll progress, leaving 25% scroll buffer before unpinning
        tl.fromTo(".card-3", 
          { y: 100, opacity: 0, scale: 0.95 },
          { y: 30, opacity: 1, scale: 1, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
        tl.to(".card-2", 
          { scale: 0.95, y: 10, opacity: 0.5, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
        tl.to(".card-1", 
          { scale: 0.90, y: -20, opacity: 0.25, ease: "power2.out", duration: 0.10 }, 
          0.65
        );
      });

    }, containerRef.current);

    return () => ctx.revert();
  }, [mounted]);

  const handleLoadComplete = () => {
    console.log("ScrollAnimationSection: Images loaded, refreshing ScrollTrigger");
    ScrollTrigger.refresh();
  };

  // Render a clean placeholder matching the container style during server-side render
  if (!mounted) {
    return (
      <section 
        className="relative w-full h-screen bg-surface overflow-hidden" 
        id="scroll-animation"
      />
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-surface mb-32 md:mb-0 z-30" 
      id="scroll-animation"
    >
      {/* Pinned Inner Container */}
      <div 
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between py-12 md:py-0 relative bg-surface z-30"
      >
        <div className="max-w-container mx-auto px-6 w-full h-full flex flex-col md:grid md:grid-cols-12 md:gap-8 items-center justify-between md:justify-center relative">
          
          {/* Left Column (Desktop) / Bottom Container (Mobile): Stacking Cards */}
          <div className="w-full col-span-12 md:col-span-6 lg:col-span-5 h-[45vh] md:h-[520px] flex items-center justify-center order-2 md:order-1 relative z-20">
            <div className="relative w-full h-full max-w-md">
              
              {/* Card 1: Heritage */}
              <div className="card-1 absolute inset-x-0 top-0 h-[260px] sm:h-[300px] md:h-[450px] bg-surface-dim/95 border border-primary/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between will-change-[transform,opacity] z-10">
                <div>
                  <span className="text-label-caps text-warm-gold mb-1 md:mb-3 block tracking-[0.2em] uppercase text-[10px] md:text-sm">01 / Heritage</span>
                  <h3 className="text-headline-xs sm:text-headline-sm md:text-headline-md text-primary mb-2 md:mb-4">Rooted In Tradition</h3>
                  <p className="text-body-sm md:text-body-md text-on-surface-variant leading-relaxed text-xs sm:text-sm md:text-base">
                    A recipe inspired by generations of Kerala wisdom, refined for the modern lifestyle. Our Chukku Kaapi honors ancient wellness rituals.
                  </p>
                </div>
                <div className="w-full h-20 sm:h-24 md:h-40 bg-gradient-to-tr from-warm-gold/20 via-primary/5 to-surface border border-primary/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
                  <span className="text-label-caps text-on-surface-variant/40 tracking-widest text-[9px] md:text-xs z-10">[ Heritage Image Placeholder ]</span>
                  <div className="absolute inset-0 bg-radial-gradient from-warm-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Card 2: Ingredients */}
              <div className="card-2 absolute inset-x-0 top-0 h-[260px] sm:h-[300px] md:h-[450px] bg-surface-dim/95 border border-primary/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between will-change-[transform,opacity] z-20">
                <div>
                  <span className="text-label-caps text-warm-gold mb-1 md:mb-3 block tracking-[0.2em] uppercase text-[10px] md:text-sm">02 / Ingredients</span>
                  <h3 className="text-headline-xs sm:text-headline-sm md:text-headline-md text-primary mb-2 md:mb-4">Crafted With Purpose</h3>
                  <p className="text-body-sm md:text-body-md text-on-surface-variant leading-relaxed text-xs sm:text-sm md:text-base">
                    A balanced fusion of premium dry ginger (Chukku), black pepper, cardamom, and pure palm jaggery. Sourced consciously for optimal health.
                  </p>
                </div>
                <div className="w-full h-20 sm:h-24 md:h-40 bg-gradient-to-tr from-warm-gold/20 via-primary/5 to-surface border border-primary/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
                  <span className="text-label-caps text-on-surface-variant/40 tracking-widest text-[9px] md:text-xs z-10">[ Ingredients Image Placeholder ]</span>
                  <div className="absolute inset-0 bg-radial-gradient from-warm-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Card 3: Lifestyle */}
              <div className="card-3 absolute inset-x-0 top-0 h-[260px] sm:h-[300px] md:h-[450px] bg-surface-dim/95 border border-primary/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between will-change-[transform,opacity] z-30">
                <div>
                  <span className="text-label-caps text-warm-gold mb-1 md:mb-3 block tracking-[0.2em] uppercase text-[10px] md:text-sm">03 / Lifestyle</span>
                  <h3 className="text-headline-xs sm:text-headline-sm md:text-headline-md text-primary mb-2 md:mb-4">The Modern Ritual</h3>
                  <p className="text-body-sm md:text-body-md text-on-surface-variant leading-relaxed text-xs sm:text-sm md:text-base">
                    Designed to restore balance, boost immunity, and elevate your everyday lifestyle. Ready in seconds, enjoyed every day as a daily wellness ritual.
                  </p>
                </div>
                <div className="w-full h-20 sm:h-24 md:h-40 bg-gradient-to-tr from-warm-gold/20 via-primary/5 to-surface border border-primary/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
                  <span className="text-label-caps text-on-surface-variant/40 tracking-widest text-[9px] md:text-xs z-10">[ Lifestyle Image Placeholder ]</span>
                  <div className="absolute inset-0 bg-radial-gradient from-warm-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Desktop) / Top Container (Mobile): Sticky Canvas */}
          <div className="w-full col-span-12 md:col-span-6 lg:col-span-7 h-[35vh] md:h-full flex items-center justify-center order-1 md:order-2 z-10 relative">
            <div 
              ref={canvasContainerRef} 
              className="w-[65vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] max-w-3xl aspect-square relative flex items-center justify-center will-change-transform"
            >
              <FrameSequence ref={sequenceRef} onLoadComplete={handleLoadComplete} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
