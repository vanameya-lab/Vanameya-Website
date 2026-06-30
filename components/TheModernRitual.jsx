"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function TheModernRitual() {
  const containerRef = useRef(null);

  return (
    <section id="ritual" className="w-full pt-20 pb-32 px-6 bg-transparent relative" ref={containerRef}>
      <div className="max-w-5xl mx-auto flex flex-col gap-[30vh]">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase text-shadow-sm">The Modern Ritual</span>
            <h2 className="text-display-md md:text-display-lg text-[#e1e3e2] drop-shadow-lg leading-tight">
              A rhythm of wellness <br className="hidden md:block"/> for the modern day.
            </h2>
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col gap-[40vh] py-[10vh]">
          {/* Morning Warmth */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-end"
          >
            <div className="max-w-xl text-left md:text-right bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">01 / Morning</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Morning Warmth</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                Start the day with a comforting ritual inspired by generations of tradition. Awaken your senses with the grounding aroma of dry ginger and subtle spices.
              </p>
            </div>
          </motion.div>

          {/* Midday Reset */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-start"
          >
            <div className="max-w-xl text-left bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">02 / Midday</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Midday Reset</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                A mindful alternative to sugary beverages and energy drinks. Recharge your focus and soothe your digestion with a warm cup mid-afternoon.
              </p>
            </div>
          </motion.div>

          {/* Evening Comfort */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full flex md:justify-end"
          >
            <div className="max-w-xl text-left md:text-right bg-[#111414]/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase drop-shadow-sm">03 / Evening</span>
              <h3 className="text-display-sm text-[#e1e3e2] mb-6 drop-shadow-lg leading-tight">Evening Comfort</h3>
              <p className="text-body-lg text-[#bec8c8] leading-relaxed drop-shadow-md">
                Slow down, unwind and reconnect with a calmer rhythm. Let the natural warmth of Chukku Kaapi wash away the fatigue of the day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
