"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function TheModernRitual() {
  const containerRef = useRef(null);

  const moments = [
    {
      step: "01 / Morning Awakening",
      title: "Kickstart the Day",
      desc: "Start the day with a comforting ritual inspired by tradition. The gentle heat of dry ginger and subtle spices wakes up your digestion without caffeine jitters."
    },
    {
      step: "02 / Midday Focus",
      title: "Sustained Clarity",
      desc: "A mindful alternative to sugary energy drinks. Keep your mind grounded, sharp, and productive during long hours at your desk."
    },
    {
      step: "03 / Evening Unwind",
      title: "Soothing Sanctuary",
      desc: "Recreate the comforting warmth of traditional monsoon evenings. Slow down and let the natural spices wash away the fatigue of the day."
    }
  ];

  return (
    <section id="ritual" className="w-full section-gap-lg px-6 bg-transparent relative" ref={containerRef}>
      <div className="max-w-5xl mx-auto flex flex-col gap-[20vh] md:gap-[30vh]">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <span className="type-label text-accent mb-6 block tracking-[0.2em] uppercase text-shadow-sm">The Modern Ritual</span>
            <h2 className="type-display-md md:type-display-lg text-primary-text drop-shadow-lg leading-tight">
              A Rhythm of Wellness <br className="hidden md:block"/> for the Modern Day.
            </h2>
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col gap-[20vh] md:gap-[30vh] py-[5vh] md:py-[10vh]">
          {moments.map((moment, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className={`w-full flex ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
            >
              <div className={`max-w-xl text-left ${idx % 2 === 0 ? "md:text-right" : ""} bg-background/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-border shadow-2xl`}>
                <span className="type-label text-accent mb-4 block tracking-[0.15em] uppercase drop-shadow-sm">{moment.step}</span>
                <h3 className="type-h1 text-primary-text mb-6 drop-shadow-lg leading-tight">{moment.title}</h3>
                <p className="type-body-lg text-secondary-text leading-relaxed drop-shadow-md">
                  {moment.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
