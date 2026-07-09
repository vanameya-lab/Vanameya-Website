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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center text-left w-full max-w-full"
          >
            {/* Tag */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full type-label text-primary-text type-caption tracking-widest font-semibold">
                Wellness Brew
              </span>
            </div>

            {/* Responsive Typography Title */}
            <h1 className="text-3xl sm:text-5xl lg:type-display-lg text-primary-text mb-4 leading-[1.1] tracking-tight font-semibold flex flex-col w-full break-words">
              <span>Instant Dry</span>
              <span>Ginger Coffee</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-accent mb-6 italic w-full">
              A Daily Ritual Rooted In Kerala Tradition
            </p>
            
            <p className="text-sm sm:text-base md:type-body-lg text-secondary-text mb-8 leading-relaxed font-light w-full">
              An authentic, caffeine-conscious blend of hand-harvested spices and pure palm jaggery. Sourced from the soil of Kerala, designed to ground your daily wellness routine.
            </p>

            {/* CTAs (Visible immediately above the fold on mobile) */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-full">
              <button
                onClick={() => scrollToSection("purchase")}
                className="w-full sm:w-auto flex-1 px-4 sm:px-8 py-4 bg-accent text-background type-label rounded-xl hover:bg-accent-hover transition-all duration-300 shadow-md text-center cursor-pointer font-bold tracking-wider uppercase text-[11px] sm:text-sm whitespace-normal"
              >
                Order Now
              </button>
              <button
                onClick={() => scrollToSection("ingredients")}
                className="w-full sm:w-auto flex-1 px-4 sm:px-8 py-4 border-2 border-accent text-accent hover:bg-accent/10 type-label rounded-xl transition-all duration-300 text-center cursor-pointer font-bold tracking-wider uppercase text-[11px] sm:text-sm whitespace-normal"
              >
                View Ingredients
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-border pt-6 w-full max-w-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">Origin</span>
                <span className="text-xs sm:text-sm font-medium text-primary-text leading-tight break-words whitespace-normal">Kerala, India</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">Purity</span>
                <span className="text-xs sm:text-sm font-medium text-primary-text leading-tight break-words whitespace-normal">100% Natural</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">Serving</span>
                <span className="text-xs sm:text-sm font-medium text-primary-text leading-tight break-words whitespace-normal">Instant Sachet</span>
              </div>
            </div>

            {/* Mobile Hero Image: Displayed below CTAs/Badges for mobile-first scrolling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:hidden w-full relative rounded-3xl overflow-hidden bg-background/20 shadow-xl mt-10 border border-accent/5 flex items-center justify-center p-2"
            >
              <Image
                src="/products/dry-ginger-coffee/heromobileview.png"
                alt="VANAMÉYA Instant Dry Ginger Coffee Mobile Presentation"
                width={800}
                height={1000}
                priority
                className="w-full h-auto object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Hero Image (Only visible on desktop/large screens) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:flex col-span-7 relative w-full rounded-3xl overflow-hidden shadow-2xl bg-background/20 group border border-accent/5 items-center justify-center"
          >
            <Image
              src="/products/dry-ginger-coffee/herodesktopview.png"
              alt="VANAMÉYA Instant Dry Ginger Coffee Desktop Presentation"
              width={1200}
              height={900}
              priority
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
              sizes="55vw"
            />
            <div className="absolute inset-0 bg-background/5 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
