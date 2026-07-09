"use client";
import { motion } from "framer-motion";

export default function WhenToEnjoy() {
  const rituals = [
    {
      title: "Morning Routine",
      subtitle: "Kickstart Digestion",
      desc: "Prepare a warm cup immediately upon waking. The gentle heat of dry ginger and black pepper wakes up your digestive enzymes (Agni) and invites clarity without caffeine jitters."
    },
    {
      title: "During Work",
      subtitle: "Sustained Workspace Focus",
      desc: "A caffeine-conscious alternative to traditional coffee or sugary energy drinks. Keep your mind grounded, sharp, and productive during long hours at your desk."
    },
    {
      title: "Rainy Evenings",
      subtitle: "Soothing Sanctuary",
      desc: "Recreate the comforting warmth of traditional monsoon evenings. Cozy up with a steaming mug as rain falls, enveloping your senses in nostalgic, spicy comfort."
    },
    {
      title: "After Meals",
      subtitle: "Post-Digestive Cleanse",
      desc: "Enjoyed traditionally after lunch or dinner. The blend of ginger and cardamom eases bloating, aids digestion, and serves as a delicious, spice-sweet digestif."
    },
    {
      title: "Travel Companion",
      subtitle: "Grounding Anywhere",
      desc: "Pack-friendly, single-serve sachets ensure that no matter where you travel—airports, hotels, or remote retreats—your grounding wellness ritual remains unchanged."
    }
  ];

  return (
    <section className="w-full bg-surface section-pad-lg px-6 border-t border-border relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Daily Wellness</span>
          <h2 className="type-display-lg text-primary-text mb-6">More Than A Remedy. <br className="hidden md:inline"/> A Lifestyle.</h2>
          <p className="type-body-lg text-secondary-text font-light leading-relaxed max-w-2xl mx-auto">
            Unlike traditional medicinal teas, VANAMÉYA Dry Ginger Coffee is crafted as a daily luxury ritual. It integrates seamlessly into any part of your day, adjusting to your natural rhythms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rituals.map((ritual, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <span className="type-caption text-accent font-bold uppercase tracking-wider block mb-2">{ritual.subtitle}</span>
                <h3 className="text-2xl text-primary-text mb-4">{ritual.title}</h3>
                <p className="text-sm lg:type-body text-secondary-text/90 leading-relaxed font-light">
                  {ritual.desc}
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* Card 6 is a creative luxury block */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="bg-accent p-8 rounded-2xl flex flex-col justify-between text-left text-primary-text shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-background/10 pointer-events-none" />
            <div className="relative z-10">
              <span className="type-label text-ink-black/60 mb-2 block tracking-widest uppercase">The Essence</span>
              <h3 className="text-3xl mb-4 leading-tight text-white drop-shadow-md">Slow Luxury. <br/> Instant Prep.</h3>
              <p className="text-sm text-white/90 font-light leading-relaxed">
                Reclaim your time and energy. A premium Ayurveda-inspired ritual prepared in three simple seconds.
              </p>
            </div>
            <div className="mt-8 border-t border-black/10 pt-6 flex items-center justify-between type-label text-xs text-ink-black/60 font-semibold tracking-wider">
              <span>VANAMÉYA</span>
              <span className="text-primary-text">Est. 2024</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
