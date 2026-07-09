"use client";
import { motion } from "framer-motion";

export default function HowToPrepare() {
  const steps = [
    {
      step: "01",
      title: "Open",
      desc: "Tear open one single-serve sachet of VANAMÉYA Instant Dry Ginger Coffee.",
      icon: (
        <svg className="w-10 h-10 text-primary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tear line representation */}
          <rect x="4" y="3" width="16" height="18" rx="2" strokeDasharray="3 3" />
          <path d="M4 8h16" />
          <path d="M6 3v2" />
          <path d="M18 3v2" />
          <path d="M12 11h.01" strokeWidth="3" />
          <path d="M12 15h.01" strokeWidth="3" />
          <path d="M8 19h8" />
        </svg>
      )
    },
    {
      step: "02",
      title: "Pour",
      desc: "Add 150ml of steaming hot water. No brewing, no straining, no filters required.",
      icon: (
        <svg className="w-10 h-10 text-primary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Kettle pouring water into cup */}
          <path d="M4 19h16" />
          <path d="M6 14v5h8v-5H6z" />
          <path d="M14 9l4-3" />
          <path d="M18 6l2 2" />
          {/* Water drops */}
          <path d="M17 11v3" strokeDasharray="2 2" />
          <path d="M15 11v3" strokeDasharray="2 2" />
          <path d="M13 5a2 2 0 012 2v2H9V7a2 2 0 012-2h2z" />
        </svg>
      )
    },
    {
      step: "03",
      title: "Enjoy",
      desc: "Stir gently and sip slowly, letting the warm, aromatic spices unfold.",
      icon: (
        <svg className="w-10 h-10 text-primary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Steaming traditional cup */}
          <path d="M5 11h14" />
          <path d="M6 11v6a4 4 0 004 4h4a4 4 0 004-4v-6" />
          <path d="M18 11h2a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
          {/* Steam lines */}
          <path d="M9 7c0-2 2-2 2-4" />
          <path d="M13 7c0-2 2-2 2-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-surface section-pad-lg px-6 border-t border-border relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Preparation</span>
          <h2 className="type-display-lg text-primary-text mb-6">Three Seconds To Pure Harmony</h2>
          <p className="type-body-lg text-secondary-text font-light max-w-xl mx-auto">
            A premium wellness ritual designed for the pace of modern life. Enjoy ancestral wellness without the complex preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Circular Icon Container */}
              <div className="w-24 h-24 rounded-full bg-accent/5 border border-accent/15 flex items-center justify-center mb-8 shadow-sm group-hover:scale-105 group-hover:bg-accent/10 group-hover:border-accent/25 transition-all duration-300 relative">
                {item.icon}
                {/* Step badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-primary-text type-caption font-bold flex items-center justify-center shadow-md">
                  {item.step}
                </span>
              </div>

              <h3 className="text-2xl text-primary-text mb-4">{item.title}</h3>
              <p className="text-sm lg:type-body text-secondary-text/90 leading-relaxed font-light max-w-xs">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
