"use client";
import { motion } from "framer-motion";

export default function WhyDryGinger() {
  const points = [
    {
      num: "01",
      title: "Morning Warmth",
      desc: "An invigorating, caffeine-conscious alternative to kickstart your digestion, clear morning grogginess, and invite crisp mental focus."
    },
    {
      num: "02",
      title: "Daily Wellness",
      desc: "A synergistic blend of native immunomodulators that supports systemic vitality and naturally strengthens your body's defensive layers."
    },
    {
      num: "03",
      title: "Natural Comfort",
      desc: "Soothing organic warmth that balances internal fire (Agni), bringing comforting groundedness to your body in any season or weather."
    },
    {
      num: "04",
      title: "Mindful Living",
      desc: "A deliberate pause in your active schedule—a simple, premium cup that reconnects you to the slow, intentional rhythms of Kerala."
    }
  ];

  return (
    <section className="w-full bg-surface section-pad-lg px-6 border-t border-border relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Daily Wellness</span>
          <h2 className="type-display-lg text-primary-text mb-6">More Than A Remedy. <br className="hidden md:inline"/> A Lifestyle.</h2>
          <p className="type-body-lg text-secondary-text font-light leading-relaxed max-w-2xl mx-auto">
            Unlike traditional medicinal teas, VANAMÉYA Instant Dry Ginger Coffee is crafted as a daily luxury ritual—a smooth, delicious beverage meant to be enjoyed everyday as part of a modern, mindful lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 flex flex-col items-start justify-between text-left group"
            >
              <div>
                <span className="type-label text-accent/55 font-semibold mb-6 block tracking-widest group-hover:text-accent transition-colors duration-300">
                  {point.num}
                </span>
                <h3 className="text-2xl text-primary-text mb-4">
                  {point.title}
                </h3>
                <p className="text-sm lg:type-body text-secondary-text/95 leading-relaxed font-light">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
