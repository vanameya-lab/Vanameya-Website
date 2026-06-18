"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const [hideHero, setHideHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setHideHero(true);
      } else {
        setHideHero(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // 1:1 parallax upward translation for the text container (scrolls up naturally)
  const y = useTransform(scrollY, [0, 1000], [0, -1000]);
  
  // Parallax translation for the background image wrapper
  const bgY = useTransform(scrollY, [0, 800], [0, 100]);
  
  // Quick fade out for the bottom scroll label
  const elementsOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <section 
      id="hero" 
      className="sticky top-0 w-full h-[100dvh] z-0 flex flex-col justify-end pb-20 px-6 md:px-12 bg-[#111414] overflow-hidden"
      style={{ 
        visibility: hideHero ? "hidden" : "visible",
        pointerEvents: hideHero ? "none" : "auto"
      }}
    >
      {/* Background Hero Images - Responsive desktop/mobile with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 bg-[#111414] select-none h-[120%] w-full">
        {/* Desktop View Image */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src="/hero/dektopview.webp"
            alt="Vanaméya Chukku Kaapi Desktop Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center image-vignette opacity-80"
          />
        </div>
        
        {/* Mobile View Image */}
        <div className="block md:hidden absolute inset-0 w-full h-full">
          <Image
            src="/hero/mobileview.webp"
            alt="Vanaméya Chukku Kaapi Mobile Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center image-vignette opacity-80"
          />
        </div>

        {/* Ambient Gradient Overlays for maximum text readability and smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111414] via-[#111414]/40 to-transparent z-10 pointer-events-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-col text-left pb-6 md:pb-12"
      >
        <motion.div style={{ y }} className="w-full flex flex-col gap-4">
          <span className="text-label-caps text-[#8ed2d5] tracking-[0.2em] uppercase opacity-80 block">
            A Morning Practice
          </span>
          
          <h1 className="font-display text-[42px] sm:text-5xl md:text-[64px] text-[#e1e3e2] leading-[1.15] font-semibold tracking-tight">
            Awaken the senses.<br />
            Rooted in heritage.
          </h1>
          
          <p className="font-sans text-[#bec8c8] max-w-md text-base md:text-[16px] leading-relaxed mt-2">
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator label */}
      <motion.div style={{ opacity: elementsOpacity }} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-label-caps text-[#bec8c8]/40 text-[10px] tracking-[0.3em] uppercase">
          The Elements
        </span>
      </motion.div>
    </section>
  );
}
