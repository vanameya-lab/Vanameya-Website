"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Background Video/Image Placeholder - Positioned absolutely behind content */}
      <div className="absolute inset-0 z-0 bg-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface-dim/40 mix-blend-multiply pointer-events-none" />
        <div className="w-full h-full object-cover opacity-80 flex items-center justify-center bg-surface-dim/20">
          <span className="text-label-caps text-on-surface-variant/50 tracking-widest">[ Premium Cinematic Video Placeholder ]</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        <span className="text-label-caps text-warm-gold mb-8 tracking-[0.2em] block uppercase">Vanaméya Chukku Kaapi</span>
        <h1 className="text-display-lg md:text-[80px] lg:text-[100px] text-primary mb-10 leading-[1.05] tracking-tight">
          Heritage In <br className="hidden md:block"/> Every Sip.
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-16 text-lg md:text-xl leading-relaxed">
          A timeless blend of dry ginger, pepper, cardamom and palm jaggery inspired by generations of Kerala wisdom and crafted for modern living.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link href="#shop" className="px-10 py-5 bg-primary text-on-primary text-label-caps tracking-widest uppercase hover:bg-primary-container transition-all duration-300 w-full sm:w-auto text-center border border-primary">
            Begin Your Ritual
          </Link>
          <Link href="#story" className="px-10 py-5 bg-transparent text-primary text-label-caps tracking-widest uppercase hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto text-center border border-primary">
            Discover The Story
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
