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
    <section className="w-full bg-[#f8faf9] py-24 md:py-32 px-6 border-t border-earth-brown/10 relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-label-caps text-warm-gold mb-4 tracking-[0.2em] block uppercase">Ritual Moments</span>
          <h2 className="text-display-lg text-primary mb-6">Whenever You Need <br className="hidden md:inline"/> A Moment of Pause.</h2>
          <p className="text-body-lg text-on-surface-variant font-light leading-relaxed max-w-2xl mx-auto">
            Vanaméya is designed to integrate seamlessly into any part of your day. It is a modern wellness drink that adjusts to your natural rhythms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rituals.map((ritual, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-earth-brown/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <span className="text-[10px] text-warm-gold font-bold uppercase tracking-wider block mb-2">{ritual.subtitle}</span>
                <h3 className="text-2xl font-display text-primary mb-4">{ritual.title}</h3>
                <p className="text-sm lg:text-body-md text-on-surface-variant/90 leading-relaxed font-light">
                  {ritual.desc}
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* Card 6 is a creative luxury block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-primary p-8 rounded-2xl flex flex-col justify-between text-left text-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#111414]/10 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-label-caps text-[#8ed2d5] mb-2 block tracking-widest uppercase">The Essence</span>
              <h3 className="text-3xl font-display mb-4 leading-tight">Slow Luxury. <br/> Instant Prep.</h3>
              <p className="text-sm text-white/85 font-light leading-relaxed">
                Reclaim your time and energy. A premium Ayurveda-inspired ritual prepared in three simple seconds.
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between text-label-caps text-xs text-[#8ed2d5] font-semibold tracking-wider">
              <span>VANAMÉYA</span>
              <span className="text-white">Est. 2024</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
