"use client";
import { motion } from "framer-motion";

export default function PDPBenefits() {
  const benefits = [
    {
      title: "Digestion Support",
      desc: "Dry ginger aids digestion and reduces bloating naturally.",
      icon: (
        <svg className="w-8 h-8 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "100% Natural",
      desc: "No preservatives, no refined sugar, no artificial flavors.",
      icon: (
        <svg className="w-8 h-8 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Ready In Seconds",
      desc: "Just add hot water. A traditional ritual built for modern life.",
      icon: (
        <svg className="w-8 h-8 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Travel Friendly",
      desc: "Single-serve sachets ensure freshness anywhere you go.",
      icon: (
        <svg className="w-8 h-8 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-20 px-6 bg-surface border-t border-border/50">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-border/50 hover:bg-white/10 transition-colors"
            >
              {item.icon}
              <h3 className="text-lg font-semibold text-primary-text mb-2">{item.title}</h3>
              <p className="text-sm text-secondary-text/80 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
