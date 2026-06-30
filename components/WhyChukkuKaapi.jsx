"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

export default function WhyChukkuKaapi() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="w-full pt-20 pb-32 px-6 bg-transparent relative">
      <div className="max-w-5xl mx-auto flex flex-col gap-[30vh]">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase text-shadow-sm">The Benefits</span>
            <h2 className="text-display-md md:text-display-lg text-[#e1e3e2] mb-6 drop-shadow-lg">Elevate The Everyday.</h2>
            <p className="text-body-lg text-[#bec8c8] drop-shadow-md max-w-xl mx-auto">
              A purposeful blend designed to integrate seamlessly into a modern, mindful lifestyle.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col gap-[40vh] py-[10vh]">
          {/* Text Block 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-start"
          >
            <div className="max-w-xl text-left bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">01 / Focus</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Natural Morning Energy</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                A warm and mindful way to begin the day, waking the senses gently without the jarring spikes or afternoon crashes of traditional caffeine.
              </p>
            </div>
          </motion.div>

          {/* Text Block 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-end"
          >
            <div className="max-w-xl text-left md:text-right bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">02 / Balance</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Everyday Wellness</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                Inspired by traditional Ayurvedic ingredients like dry ginger and black pepper that have been trusted for generations to restore balance and soothe digestion.
              </p>
            </div>
          </motion.div>

          {/* Text Block 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-start"
          >
            <div className="max-w-xl text-left bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">03 / Unwind</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Comfort In Every Season</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                Not just a remedy for rainy days. Designed for your everyday rituals, offering a grounding moment of warmth and calm whenever you need it most.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
