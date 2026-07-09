"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section id="story" className="w-full section-gap-lg px-6 bg-transparent">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-border group hover:border-accent/20 transition-all duration-700"
          >
            <Image
              src="/ourstory.jpeg"
              alt="Vanaméya Founders Story"
              width={1080}
              height={1350}
              className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            {/* Subtle interactive overlay */}
            <div className="absolute inset-0 bg-accent/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center"
          >
            <span className="type-label text-accent mb-6 block tracking-widest uppercase">Our Story</span>
            <h2 className="type-display-lg text-primary-text mb-10 leading-[1.1]">
              Preserving Tradition <br /> Through Modern Luxury.
            </h2>

            <div className="space-y-6 type-body-lg text-secondary-text leading-relaxed">
              <p>
                Vanaméya was born from a simple realization: the deepest wellness traditions of Kerala were being lost in the noise of modern life, or confined strictly to moments of illness.
              </p>
              <p>
                We believe that true heritage shouldn't be a remedy you reach for only when you are unwell. It should be a ritual you look forward to every single day.
              </p>
              <p>
                By sourcing the highest quality ingredients directly from artisan farmers and refining the preparation process, we are bridging the gap between ancient Ayurvedic wisdom and contemporary luxury. We are not just making Dry Ginger Coffee; we are reclaiming it.
              </p>
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
