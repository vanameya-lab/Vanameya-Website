"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PDPStickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 600px (approx past hero)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyNow = () => {
    setLoading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-border/50 p-4 lg:hidden flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-safe"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-lg overflow-hidden bg-white/5 border border-border/30 shrink-0">
              <Image 
                src="/products/dry-ginger-coffee/Pack.png" 
                alt="Product" 
                fill 
                className="object-contain p-1"
                sizes="48px" 
              />
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs sm:text-sm font-semibold text-primary-text truncate">Dry Ginger Coffee</span>
              <span className="text-xs sm:text-sm font-bold text-accent">₹129</span>
            </div>
          </div>
          
          <button
            onClick={handleBuyNow}
            disabled={loading}
            className="h-12 px-6 bg-accent text-background type-label rounded-xl hover:bg-accent-hover font-bold uppercase tracking-widest flex items-center justify-center shrink-0 shadow-lg"
          >
            {loading ? "..." : "Buy Now"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
