"use client";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section id="story" className="w-full section-gap-lg px-6 bg-transparent">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full aspect-[4/5] bg-gradient-to-tr from-surface-dim via-surface to-warm-gold/5 rounded-2xl flex items-center justify-center relative overflow-hidden border border-earth-brown/10 group hover:border-warm-gold/20 transition-all duration-700 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-warm-gold/10 to-transparent opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase">Our Story</span>
            <h2 className="text-display-lg text-primary mb-10 leading-[1.1]">
              Preserving Tradition <br /> Through Modern Luxury.
            </h2>

            <div className="space-y-6 text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Vanaméya was born from a simple realization: the deepest wellness traditions of Kerala were being lost in the noise of modern life, or confined strictly to moments of illness.
              </p>
              <p>
                We believe that true heritage shouldn't be a remedy you reach for only when you are unwell. It should be a ritual you look forward to every single day.
              </p>
              <p>
                By sourcing the highest quality ingredients directly from artisan farmers and refining the preparation process, we are bridging the gap between ancient Ayurvedic wisdom and contemporary luxury. We are not just making Chukku Kaapi; we are reclaiming it.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-earth-brown/10">
              <span className="font-display text-2xl text-primary block mb-2">The Founders</span>
              <span className="text-label-caps text-on-surface-variant tracking-widest uppercase">Vanaméya</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
