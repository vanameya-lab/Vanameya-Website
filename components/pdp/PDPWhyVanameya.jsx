"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PDPWhyVanameya() {
  const points = [
    {
      title: "Kerala Heritage",
      desc: "Rooted in the ancient Ayurvedic practices of Kerala, honoring centuries of traditional wellness wisdom.",
      img: "/products/dry-ginger-coffee/herodesktopview.png" // placeholder
    },
    {
      title: "Small Batch Production",
      desc: "Crafted in limited quantities to ensure maximum freshness, flavor profile, and quality control.",
      img: "/products/dry-ginger-coffee/Pack.png" // placeholder
    },
    {
      title: "Unrefined & Pure",
      desc: "Sweetened only with pure palm jaggery. Absolutely no refined sugars or artificial additives.",
      img: "/products/dry-ginger-coffee/sachet.png" // placeholder
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-surface border-t border-border/50">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="type-label text-accent mb-4 tracking-widest block uppercase font-bold">The Difference</span>
          <h2 className="type-display-lg text-primary-text mb-6 text-4xl md:text-5xl">Why Vanaméya?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col group rounded-3xl overflow-hidden bg-white/5 border border-border/50"
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-white/10">
                <Image 
                  src={point.img}
                  alt={point.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-primary-text mb-3">{point.title}</h3>
                <p className="text-secondary-text font-light leading-relaxed">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
