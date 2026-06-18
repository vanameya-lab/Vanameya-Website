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
    <section className="w-full bg-[#111414] py-24 md:py-32 px-6 text-white border-t border-white/5 relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-label-caps text-warm-gold mb-4 tracking-[0.2em] block uppercase">Provenance & Craft</span>
          <h2 className="text-display-lg text-[#8ed2d5] mb-6">Why Choose VANAMÉYA?</h2>
          <p className="text-body-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto">
            We bridge the gap between ancient Ayurvedic wisdom and modern global luxury, keeping purity and transparency at our core.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col p-6 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 md:border-none md:bg-transparent md:rounded-none md:p-4 md:border-r md:border-white/10 md:last:border-r-0 md:pr-6 md:last:pr-0 text-left justify-start"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">0{idx + 1}</span>
              <h3 className="text-xl font-display text-white mb-4">{pillar.title}</h3>
              <p className="text-sm text-white/75 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
