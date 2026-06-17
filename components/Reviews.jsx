"use client";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <section className="w-full section-gap-md px-6 bg-surface-dim/10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-label-caps text-warm-gold mb-6 block tracking-widest uppercase">Voices Of The Ritual</span>
        <h2 className="text-headline-lg text-primary mb-24">Trusted by those who value their time and well-being.</h2>
        
        <div className="grid md:grid-cols-2 gap-16 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="text-warm-gold text-2xl mb-6">★★★★★</div>
            <p className="text-body-lg text-on-surface-variant italic mb-8 leading-relaxed font-serif text-xl">
              "The most authentic Chukku Kaapi I have found outside of my grandmother's kitchen. A perfect, warming start to my morning without the caffeine crash."
            </p>
            <div className="text-label-caps text-primary tracking-widest uppercase">— Priya M.</div>
            <div className="text-body-sm text-on-surface-variant/60 mt-1">Verified Buyer</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="text-warm-gold text-2xl mb-6">★★★★★</div>
            <p className="text-body-lg text-on-surface-variant italic mb-8 leading-relaxed font-serif text-xl">
              "Incredibly soothing. The quality of the spices is evident from the first sip. My daily midday ritual is now incomplete without it."
            </p>
            <div className="text-label-caps text-primary tracking-widest uppercase">— Rahul T.</div>
            <div className="text-body-sm text-on-surface-variant/60 mt-1">Verified Buyer</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
