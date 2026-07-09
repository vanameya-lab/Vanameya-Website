"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FlashCard = ({ ing, index, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative h-[200px] sm:h-[220px] w-full [perspective:1000px] cursor-pointer group ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-end p-5 rounded-3xl border border-border bg-gradient-to-br from-white/[0.04] to-transparent [backface-visibility:hidden] group-hover:border-white/20 transition-colors overflow-hidden">
          {ing.img && (
            <>
              <Image 
                src={ing.img} 
                alt={ing.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center justify-end w-full">
            <h4 className="text-xl xl:text-2xl text-primary-text mb-1 text-center font-semibold drop-shadow-md">{ing.name}</h4>
            <span className="type-caption text-accent tracking-widest font-semibold uppercase text-center drop-shadow-md mb-4">{ing.desc}</span>
            <div className="opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="type-caption uppercase tracking-widest text-primary-text/80 flex items-center gap-1.5">
                Flip to reveal
                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center p-5 sm:p-6 rounded-3xl border border-accent/30 bg-background [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_30px_rgba(212,175,55,0.05)]">
          <h4 className="text-base sm:text-lg text-accent mb-2">{ing.name}</h4>
          <p className="text-xs sm:text-sm text-secondary-text font-light leading-relaxed">
            {ing.story}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CraftedWithPurposeProduct() {
  const ingredients = [
    {
      name: "Dry Ginger",
      desc: "Wayanad Single-Origin",
      story: "The warming foundation. Cultivated in the mineral-rich soils of Wayanad, it ignites the body's internal digestive fire (Agni), enhances nutrient absorption, and clears metabolic pathways.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/dryginger.jpeg"
    },
    {
      name: "Pepper",
      desc: "Malabar Native Vines",
      story: "The bio-enhancing catalyst. Hand-harvested native black peppercorns from Malabar release a gentle heat that boosts the biological efficacy of accompanying botanicals, ensuring cellular absorption.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/pepper.jpeg"
    },
    {
      name: "Green Cardamom",
      desc: "Western Ghats Forest",
      story: "The clarifying aromatic. Highly prized Cardamom pods from the cool Western Ghats offer digestive comfort and a light, uplifting top note that harmonizes the blend's robust spice profile.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/cardamom.jpeg"
    },
    {
      name: "Palm Jaggery",
      desc: "Unrefined Nectar",
      story: "The grounding sweet. Mineral-dense, unrefined nectar extracted from palm trees binds the elements together, providing a slow-release natural energy and complex, caramelized depth.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/palmjaggery.jpeg"
    },
    {
      name: "Coffee",
      desc: "Premium Shade-Grown",
      story: "The robust foundation. Hand-picked beans roasted to perfection, adding a familiar rich depth that complements the intense spices.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/coffee.jpeg"
    }
  ];

  return (
    <section id="ingredients" className="w-full bg-ink-black text-surface py-16 md:py-24 px-6 relative z-20 border-t border-border">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column - Spices Image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 w-full aspect-square md:aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl bg-white/5"
          >
            <Image
              src="/images/botanicals_hero.png"
              alt="VANAMÉYA Raw Organic Spices: Ginger, Pepper, Cardamom, Jaggery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Soft dark overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="type-label text-accent tracking-widest block mb-2 text-xs">Provenance</span>
              <h4 className="text-lg sm:text-xl text-primary-text leading-tight">Wayanad & Western Ghats, Kerala</h4>
            </div>
          </motion.div>

          {/* Right Column - Spices Description */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center lg:text-left"
            >
              <span className="type-label text-accent mb-4 block tracking-widest uppercase text-xs">Crafted With Purpose</span>
              <h2 className="text-4xl md:text-5xl text-primary-text mb-4">Pure Ingredients.<br className="hidden md:block" /> No Compromises.</h2>
              <p className="text-sm md:text-base text-surface-dim font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We believe that premium quality is non-negotiable. Sourced consciously from organic estate farms in Kerala, our botanicals represent wellness at its peak integrity.
              </p>
            </motion.div>

            {/* Flash Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-6 border-t border-border">
              {ingredients.map((ing, i) => (
                <FlashCard 
                  key={i} 
                  ing={ing} 
                  index={i} 
                  className={i === 4 ? "sm:col-span-2 lg:col-span-2 sm:w-1/2 sm:mx-auto" : ""} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
