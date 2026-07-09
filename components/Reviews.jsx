"use client";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <section className="w-full section-gap-lg px-6 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <span className="type-label text-accent mb-6 block tracking-widest uppercase">Voices Of The Ritual</span>
        <h2 className="type-h1 text-primary-text mb-24">Trusted by those who value their time and well-being.</h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col bg-surface/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/5 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-accent/10 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-accent/5 font-serif text-8xl leading-none select-none group-hover:text-accent/10 transition-colors duration-500">"</div>
            <div className="text-accent text-xl md:text-2xl mb-8 tracking-widest relative z-10">★★★★★</div>
            <p className="type-body-lg text-secondary-text italic mb-10 leading-relaxed font-serif text-lg md:text-xl relative z-10 flex-grow">
              "The most authentic Dry Ginger Coffee I have found outside of my grandmother's kitchen. A perfect, warming start to my morning without the caffeine crash."
            </p>
            <div className="relative z-10">
              <div className="type-label text-primary-text tracking-widest uppercase">— Priya M.</div>
              <div className="text-body-sm text-secondary-text/60 mt-1">Verified Buyer</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col bg-surface/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/5 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-accent/10 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-accent/5 font-serif text-8xl leading-none select-none group-hover:text-accent/10 transition-colors duration-500">"</div>
            <div className="text-accent text-xl md:text-2xl mb-8 tracking-widest relative z-10">★★★★★</div>
            <p className="type-body-lg text-secondary-text italic mb-10 leading-relaxed font-serif text-lg md:text-xl relative z-10 flex-grow">
              "Incredibly soothing. The quality of the spices is evident from the first sip. My daily midday ritual is now incomplete without it."
            </p>
            <div className="relative z-10">
              <div className="type-label text-primary-text tracking-widest uppercase">— Rahul T.</div>
              <div className="text-body-sm text-secondary-text/60 mt-1">Verified Buyer</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
