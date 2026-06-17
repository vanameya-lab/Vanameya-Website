"use client";
import { motion } from "framer-motion";

export default function WhyChukkuKaapi() {
  return (
    <section className="w-full py-16 md:py-28 px-6 bg-surface-dim/20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-display-lg text-primary mb-6">Elevate The Everyday.</h2>
          <p className="text-body-lg text-on-surface-variant">
            A purposeful blend designed to integrate seamlessly into a modern, mindful lifestyle.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Panel 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full bg-surface rounded-lg p-12 md:p-24 flex flex-col md:flex-row items-center justify-between border border-earth-brown/5 shadow-sm"
          >
            <div className="max-w-xl">
              <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase">01</span>
              <h3 className="text-headline-lg text-primary mb-6">Natural Morning Energy</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                A warm and mindful way to begin the day, waking the senses gently without the jarring spikes of traditional caffeine.
              </p>
            </div>
            <div className="mt-12 md:mt-0 md:ml-12 w-full md:w-1/3 aspect-[3/4] bg-surface-dim/50 flex items-center justify-center rounded">
               <span className="text-label-caps text-on-surface-variant/50">[ Morning Imagery ]</span>
            </div>
          </motion.div>

          {/* Panel 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full bg-surface rounded-lg p-12 md:p-24 flex flex-col md:flex-row items-center justify-between border border-earth-brown/5 shadow-sm"
          >
            <div className="order-2 md:order-1 mt-12 md:mt-0 md:mr-12 w-full md:w-1/3 aspect-[3/4] bg-surface-dim/50 flex items-center justify-center rounded">
               <span className="text-label-caps text-on-surface-variant/50">[ Wellness Imagery ]</span>
            </div>
            <div className="max-w-xl order-1 md:order-2">
              <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase">02</span>
              <h3 className="text-headline-lg text-primary mb-6">Everyday Wellness</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Inspired by traditional ingredients that have been trusted for generations to restore balance and calm.
              </p>
            </div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full bg-surface rounded-lg p-12 md:p-24 flex flex-col md:flex-row items-center justify-between border border-earth-brown/5 shadow-sm"
          >
            <div className="max-w-xl">
              <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase">03</span>
              <h3 className="text-headline-lg text-primary mb-6">Comfort In Every Season</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Not just for rainy days. Designed for everyday rituals, offering a grounding moment of warmth whenever you need it.
              </p>
            </div>
            <div className="mt-12 md:mt-0 md:ml-12 w-full md:w-1/3 aspect-[3/4] bg-surface-dim/50 flex items-center justify-center rounded">
               <span className="text-label-caps text-on-surface-variant/50">[ Comfort Imagery ]</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
