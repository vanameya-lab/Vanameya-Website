"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full px-6 py-4 flex justify-between items-center border-b border-earth-brown/10 bg-surface/90 backdrop-blur-md fixed top-0 z-50"
    >
      <div className="text-primary font-display text-2xl font-bold tracking-tight">
        <Link href="/">VANAMÉYA</Link>
      </div>
      <nav className="hidden md:flex gap-8 text-label-caps text-on-surface-variant">
        <Link href="/story" className="hover:text-primary transition-colors">Our Story</Link>
        <Link href="/#ingredients" className="hover:text-primary transition-colors">Ingredients</Link>
        <Link href="/#ritual" className="hover:text-primary transition-colors">The Ritual</Link>
      </nav>
      <Link href="/shop" className="px-6 py-2 bg-primary text-on-primary text-label-caps rounded hover:bg-primary-container transition-colors">
        Shop Now
      </Link>
    </motion.header>
  );
}
