"use client";
import { motion } from "framer-motion";

export default function WhyChooseVanameya() {
  const pillars = [
    {
      title: "Kerala Origin",
      desc: "Sourced directly from organic homestead farms in the lush Western Ghats of Kerala, India—the historical heartland of spices."
    },
    {
      title: "Premium Ingredients",
      desc: "Single-origin spices selected at peak potency, dried naturally, and blended with unrefined mineral-rich palm jaggery."
    },
    {
      title: "Small Batch Quality",
      desc: "Consciously blended in limited runs to ensure optimal freshness, botanical integrity, and maximum flavor detail."
    },
    {
      title: "Traditional Wisdom",
      desc: "Formulated based on age-old Ayurvedic principles of spice synergy to restore systemic harmony and digestive balance."
    },
    {
      title: "Modern Convenience",
      desc: "Pre-measured, single-serve packets designed to fit effortlessly into your active workspace, travel, or home routines."
    }
  ];

  return (
    <section className="w-full bg-background section-pad-lg px-6 text-primary-text border-t border-border relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Provenance & Craft</span>
          <h2 className="type-display-lg text-accent mb-6">Why Choose VANAMÉYA?</h2>
          <p className="type-body-lg text-primary-text/70 font-light leading-relaxed max-w-xl mx-auto">
            We bridge the gap between ancient Ayurvedic wisdom and modern global luxury, keeping purity and transparency at our core.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-5 md:gap-8 pb-8 md:pb-0 relative">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              style={{ top: `calc(120px + ${idx * 24}px)` }}
              className="sticky flex flex-col p-8 border border-border rounded-2xl bg-background shadow-2xl transition-all duration-500 md:static md:w-auto md:bg-transparent md:shadow-none md:p-6 md:border md:border-transparent md:hover:bg-white/5 md:hover:border-white/10 md:hover:-translate-y-2 md:hover:shadow-2xl text-left justify-start group"
            >
              <span className="type-label text-accent/60 font-semibold mb-4 block group-hover:text-accent transition-colors duration-300">0{idx + 1}</span>
              <h3 className="text-xl text-primary-text mb-4 group-hover:text-white transition-colors duration-300">{pillar.title}</h3>
              <p className="text-sm text-primary-text/75 font-light leading-relaxed group-hover:text-primary-text transition-colors duration-300">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
