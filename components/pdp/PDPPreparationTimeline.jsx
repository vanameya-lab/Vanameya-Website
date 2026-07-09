"use client";
import { motion } from "framer-motion";

export default function PDPPreparationTimeline() {
  const steps = [
    { num: "01", title: "Open", desc: "Tear open one single-serve sachet." },
    { num: "02", title: "Pour", desc: "Empty contents into your favorite mug." },
    { num: "03", title: "Add Water", desc: "Pour 150ml of steaming hot water." },
    { num: "04", title: "Stir & Enjoy", desc: "Stir gently and sip the warmth." }
  ];

  return (
    <section className="w-full py-24 px-6 bg-[#1a2e25] text-white">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="type-label text-[#d4af37] mb-4 block uppercase tracking-widest font-bold">Preparation</span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready In Seconds</h2>
          <p className="text-white/70 font-light text-lg">
            No brewing. No straining. No filters. A premium wellness ritual designed for the pace of modern life.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex justify-between relative max-w-4xl mx-auto before:content-[''] before:absolute before:top-8 before:left-0 before:w-full before:h-px before:bg-[#d4af37]/30 before:-z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center w-48"
            >
              <div className="w-16 h-16 rounded-full bg-[#1a2e25] border-2 border-[#d4af37] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="text-[#d4af37] font-bold text-xl">{step.num}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="flex md:hidden flex-col gap-10 relative before:content-[''] before:absolute before:top-0 before:left-8 before:w-px before:h-full before:bg-[#d4af37]/30 before:-z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex gap-6 items-start"
            >
              <div className="w-16 h-16 shrink-0 rounded-full bg-[#1a2e25] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="text-[#d4af37] font-bold text-xl">{step.num}</span>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
