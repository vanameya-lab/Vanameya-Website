"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Loader({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Only start with isLoading true if we land directly on the home page
  const [isLoading, setIsLoading] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) return;
    // Extended to allow the cinematic sequence to play out beautifully
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [isHomePage]);

  const tagline = "The Refined Essence of Nature";
  const words = tagline.split(" ");

  // Staggered word animation for the tagline
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.0, // Wait for logo to appear first
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 1.0, ease: "easeInOut" }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }, // Elegant luxury cubic bezier
    },
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          >
            {/* Subtle Animated Background Gradient */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.4, scale: 1.1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-green)_0%,_transparent_70%)] pointer-events-none opacity-30"
            />

            {/* Breathing Content Wrapper */}
            <motion.div
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center z-10 w-full px-6"
            >
              {/* Logo Entrance */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 1.0, ease: "easeInOut" } }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-[280px] md:w-[360px] lg:w-[420px] h-auto mb-10"
              >
                <Image 
                  src="/logo/Logo White.webp" 
                  alt="Vanaméya" 
                  width={500} 
                  height={180} 
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Cinematic Tagline Reveal */}
              <motion.div 
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-wrap justify-center gap-x-[0.3em] md:gap-x-[0.4em] text-center"
              >
                {words.map((word, index) => (
                  <motion.span 
                    key={index} 
                    variants={child}
                    className="font-serif tracking-[0.1em] text-accent font-light drop-shadow-md text-[clamp(1rem,3vw,1.75rem)]"
                    style={{ lineHeight: 1.4 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div 
        className={!isLoading ? "opacity-100" : "opacity-0 h-screen overflow-hidden"} 
        style={isHomePage ? { transition: "opacity 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.8s" } : {}}
      >
        {children}
      </div>
    </>
  );
}
