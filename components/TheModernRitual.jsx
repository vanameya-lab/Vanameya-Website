"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TheModernRitual() {
  return (
    <section id="ritual" className="w-full py-16 md:py-28 px-6 bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-label-caps text-warm-gold mb-6 tracking-widest block uppercase">The Modern Ritual</span>
          <h2 className="text-headline-lg text-primary leading-tight">
            A rhythm of wellness <br className="hidden md:block"/> for the modern day.
          </h2>
        </div>

        <div className="flex flex-col gap-32">
          {/* Morning Warmth */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative md:col-span-7 aspect-[4/3] bg-surface-dim rounded overflow-hidden"
            >
              <Image 
                src="/images/ritual-morning.jpg"
                alt="Morning Warmth: Steaming traditional brass cup of Chukku Kaapi on a rustic wooden ledge at sunrise with mist over Kerala valley"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-5 flex flex-col justify-center"
            >
              <h3 className="text-headline-md text-primary mb-6">Morning Warmth</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Start the day with a comforting ritual inspired by generations of tradition.
              </p>
            </motion.div>
          </div>

          {/* Midday Reset */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-5 flex flex-col justify-center order-2 md:order-1"
            >
              <h3 className="text-headline-md text-primary mb-6">Midday Reset</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                A mindful alternative to sugary beverages and energy drinks.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative md:col-span-7 aspect-[4/3] bg-surface-dim rounded overflow-hidden order-1 md:order-2"
            >
              <Image 
                src="/images/ritual-midday.jpg"
                alt="Midday Reset: Traditional brass cup of hot Chukku Kaapi on a dark wood work desk next to a laptop with clean corporate layout"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Evening Comfort */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative md:col-span-7 aspect-[4/3] bg-surface-dim rounded overflow-hidden"
            >
              <Image 
                src="/images/ritual-evening.jpg"
                alt="Evening Comfort: Steaming clay cup of Chukku Kaapi on a wet stone windowsill in rainy monsoon twilight"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:col-span-5 flex flex-col justify-center"
            >
              <h3 className="text-headline-md text-primary mb-6">Evening Comfort</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Slow down, unwind and reconnect with a calmer rhythm.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
