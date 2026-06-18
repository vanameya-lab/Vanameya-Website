"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductHero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-surface pt-24 md:pt-36 pb-16 px-6 overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Product Info & Mobile Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Tag */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-label-caps text-primary text-[10px] tracking-widest font-semibold">
                Wellness Brew
              </span>
            </div>

            {/* Responsive Typography Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-display-lg text-primary mb-4 leading-[1.15] tracking-tight font-semibold">
              Instant Dry <br className="hidden md:inline"/> Ginger Coffee
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl font-display text-warm-gold mb-6 italic">
              A Daily Ritual Rooted In Kerala Tradition
            </p>
            
            <p className="text-sm sm:text-base md:text-body-lg text-on-surface-variant mb-8 leading-relaxed font-light">
              An authentic, caffeine-conscious blend of hand-harvested spices and pure palm jaggery. Sourced from the soil of Kerala, designed to ground your daily wellness routine.
            </p>

            {/* CTAs (Visible immediately above the fold on mobile) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => scrollToSection("purchase")}
                className="px-8 py-4 bg-primary text-white text-label-caps rounded-xl hover:bg-primary-container transition-all duration-300 shadow-md text-center cursor-pointer font-semibold"
              >
                Order Now
              </button>
              <button
                onClick={() => scrollToSection("ingredients")}
                className="px-8 py-4 border border-earth-brown/20 text-on-surface hover:border-primary/40 text-label-caps rounded-xl transition-all duration-300 text-center cursor-pointer"
              >
                View Ingredients
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-earth-brown/10 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] text-warm-gold font-semibold uppercase tracking-wider mb-1">Origin</span>
                <span className="text-xs md:text-sm font-medium text-primary">Kerala, India</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] text-warm-gold font-semibold uppercase tracking-wider mb-1">Purity</span>
                <span className="text-xs md:text-sm font-medium text-primary">100% Natural</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] text-warm-gold font-semibold uppercase tracking-wider mb-1">Serving</span>
                <span className="text-xs md:text-sm font-medium text-primary">Instant Sachet</span>
              </div>
            </div>

            {/* Mobile Hero Image: Displayed below CTAs/Badges for mobile-first scrolling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:hidden w-full aspect-[4/5] relative rounded-3xl overflow-hidden bg-surface-dim/20 shadow-xl mt-10 border border-primary/5"
            >
              <Image
                src="/products/dry-ginger-coffee/heromobileview.png"
                alt="VANAMÉYA Instant Dry Ginger Coffee Mobile Presentation"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Hero Image (Only visible on desktop/large screens) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block col-span-7 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-surface-dim/20 group border border-primary/5"
          >
            <Image
              src="/products/dry-ginger-coffee/herodesktopview.png"
              alt="VANAMÉYA Instant Dry Ginger Coffee Desktop Presentation"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="55vw"
            />
            <div className="absolute inset-0 bg-[#111414]/5 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
