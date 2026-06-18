"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `text-label-caps pb-1 transition-all duration-300 ${
      isActive 
        ? "text-[#8ed2d5] border-b border-[#c8a96b]" 
        : "text-[#bec8c8] hover:text-[#8ed2d5]"
    }`;
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none w-full"
    >
      <div 
        className={`pointer-events-auto flex justify-between items-center transition-all duration-500 ease-out ${
          isScrolled 
            ? "w-[calc(100%-2rem)] max-w-7xl mt-4 bg-[#111414]/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl py-4 px-6 md:px-8" 
            : "w-full max-w-7xl bg-transparent border-b border-transparent py-6 px-6 md:px-8"
        }`}
      >
        <div className="font-display text-2xl font-semibold text-[#8ed2d5] tracking-tight">
          <Link href="/">VANAMÉYA</Link>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link 
            href="/story" 
            className={getLinkClass("/story")}
          >
            Heritage
          </Link>
          <Link 
            href="/" 
            className={getLinkClass("/")}
          >
            Wellness
          </Link>
          <Link 
            href="/shop" 
            className={getLinkClass("/shop")}
          >
            Coffee
          </Link>
          <Link 
            href="/#ritual" 
            className={getLinkClass("/#ritual")}
          >
            Rituals
          </Link>
        </nav>
        
        <Link 
          href="/shop" 
          className="text-label-caps text-[#8ed2d5] hover:opacity-80 transition-opacity hidden md:block cursor-pointer"
        >
          Shop Now
        </Link>
        
        <button className="md:hidden text-[#8ed2d5] hover:opacity-80 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
