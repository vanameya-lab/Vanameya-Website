"use client";
import { motion } from "framer-motion";

export default function CraftedWithPurpose() {
  const ingredients = [
    { name: "Dry Ginger", desc: "The warming foundation." },
    { name: "Black Pepper", desc: "For subtle, awakening heat." },
    { name: "Cardamom", desc: "Aromatic, calming sweetness." },
    { name: "Palm Jaggery", desc: "Unrefined, earthy richness." }
  ];

  return (
    <section className="w-full section-gap-lg px-6 bg-ink-black text-surface">
      <div className="max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="type-label text-accent mb-6 block tracking-widest uppercase">Crafted With Purpose</span>
            <h2 className="type-display-lg text-surface mb-8">Pure Ingredients.<br/> No Compromises.</h2>
            <p className="type-body-lg text-surface-dim max-w-lg leading-relaxed mb-12">
              Sourced directly from artisan farmers who understand the soul of the soil. A tribute to the heritage and craftsmanship of Kerala.
            </p>
            
            <div className="flex flex-col gap-8 border-t border-surface/10 pt-8">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex flex-col">
                  <h4 className="type-h2 text-surface mb-2">{ing.name}</h4>
                  <p className="type-label text-accent tracking-widest uppercase">{ing.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full aspect-[3/4] bg-background/10 rounded flex items-center justify-center relative overflow-hidden"
          >
            <span className="type-label text-surface/50 tracking-widest">[ Premium Ingredients Visual ]</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
