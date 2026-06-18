"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ourstoryimage.png"
            alt="Misty Kerala Forest - VANAMÉYA Heritage"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradients to blend top and bottom, and enhance contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111414]/70 via-[#111414]/30 to-[#f8faf9] z-10" />
          <div className="absolute inset-0 bg-[#111414]/25 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-label-caps text-[#8ed2d5] mb-6 tracking-[0.25em] font-semibold">
              Our Story
            </span>
            <h1 className="text-display-lg text-white mb-6 leading-[1.1] max-w-4xl tracking-tight">
              The Refined Essence <br className="hidden md:inline"/> of Nature
            </h1>
            <p className="text-body-lg text-white/90 max-w-2xl font-light tracking-wide">
              Rooted in the lush soul of Kerala, VANAMÉYA is a journey back to purity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="w-full bg-surface py-24 md:py-36 px-6 relative z-20">
        <div className="max-w-container-max mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Quote Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="lg:col-span-5"
            >
              <blockquote className="text-3xl md:text-5xl font-display text-primary italic leading-tight text-left border-l border-warm-gold/30 pl-6 md:pl-8">
                "Nature doesn't need improvement — it needs preservation."
              </blockquote>
            </motion.div>

            {/* Paragraphs Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 text-body-lg text-on-surface-variant leading-relaxed text-left font-light"
            >
              <p>
                Our journey begins in the dense, vibrant forests of Kerala—the 'Vana'. Here, ancient wisdom and untouched biodiversity thrive in harmony. We believe that true luxury lies not in complex synthesis, but in the respectful extraction of nature's inherent brilliance.
              </p>
              <p>
                VANAMÉYA translates this raw botanical power into a refined essence—'Meya'. Every formulation is a deliberate act of reconnection, designed to align modern wellness rituals with the slow, deliberate rhythms of the natural world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Botanicals Section */}
      <section className="w-full bg-surface pb-28 md:pb-40 px-6">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-label-caps text-warm-gold mb-4 tracking-[0.2em] block">
              The Botanicals
            </span>
            <h2 className="text-headline-lg text-primary font-display font-semibold">
              Elemental Purity
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-dim/20"
            >
              <Image
                src="/images/botanicals_hero.png"
                alt="Traditional Kerala spices by VANAMÉYA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[#111414]/10 pointer-events-none" />
            </motion.div>

            {/* Right Column - 2x2 Botanicals Grid */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Botanical 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="pt-8 border-t border-earth-brown/10 flex flex-col justify-start"
              >
                <h3 className="text-2xl text-primary font-display flex items-baseline gap-2 mb-4">
                  Dry Ginger <span className="text-sm text-on-surface-variant/70 italic font-sans font-normal">(Chukku)</span>
                </h3>
                <p className="text-body-md text-on-surface-variant/90 leading-relaxed font-light">
                  The warming core. Revered for centuries, it ignites internal vitality and acts as a foundation for deep, systemic wellness.
                </p>
              </motion.div>

              {/* Botanical 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="pt-8 border-t border-earth-brown/10 flex flex-col justify-start"
              >
                <h3 className="text-2xl text-primary font-display mb-4">
                  Black Pepper
                </h3>
                <p className="text-body-md text-on-surface-variant/90 leading-relaxed font-light">
                  The gentle heat. Sourced from native vines, it enhances the bioavailability of accompanying botanicals, ensuring profound absorption.
                </p>
              </motion.div>

              {/* Botanical 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-8 border-t border-earth-brown/10 flex flex-col justify-start"
              >
                <h3 className="text-2xl text-primary font-display mb-4">
                  Green Cardamom
                </h3>
                <p className="text-body-md text-on-surface-variant/90 leading-relaxed font-light">
                  The aromatic lift. Hand-harvested pods that offer a clarifying, uplifting essence, balancing robust earthy tones with delicate brightness.
                </p>
              </motion.div>

              {/* Botanical 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="pt-8 border-t border-earth-brown/10 flex flex-col justify-start"
              >
                <h3 className="text-2xl text-primary font-display mb-4">
                  Palm Jaggery
                </h3>
                <p className="text-body-md text-on-surface-variant/90 leading-relaxed font-light">
                  The grounding sweet. Unrefined and mineral-rich, it binds the elements together, providing a complex, earthy foundation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy / Values Section */}
      <section className="w-full bg-[#111414] py-28 md:py-36 px-6 text-white border-t border-white/5 relative z-20">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-label-caps text-warm-gold mb-4 tracking-[0.2em] block">
              Core Philosophy
            </span>
            <h2 className="text-headline-lg text-[#8ed2d5] font-display font-semibold">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-4 lg:gap-8 items-stretch">
            {/* Value 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col p-6 md:border-r md:border-white/10 md:last:border-r-0 md:pr-8 text-left"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">01</span>
              <h3 className="text-xl font-display text-white mb-4">Authenticity</h3>
              <p className="text-sm lg:text-body-md text-white/70 font-light leading-relaxed">
                Unyielding dedication to traditional sourcing and formulation.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col p-6 md:border-r md:border-white/10 md:last:border-r-0 md:px-8 text-left"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">02</span>
              <h3 className="text-xl font-display text-white mb-4">Purity</h3>
              <p className="text-sm lg:text-body-md text-white/70 font-light leading-relaxed">
                Minimal intervention, maximum botanical integrity.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col p-6 md:border-r md:border-white/10 md:last:border-r-0 md:px-8 text-left"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">03</span>
              <h3 className="text-xl font-display text-white mb-4">Responsibility</h3>
              <p className="text-sm lg:text-body-md text-white/70 font-light leading-relaxed">
                Stewards of the land, protecting what we harvest.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col p-6 md:border-r md:border-white/10 md:last:border-r-0 md:px-8 text-left"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">04</span>
              <h3 className="text-xl font-display text-white mb-4">Quality</h3>
              <p className="text-sm lg:text-body-md text-white/70 font-light leading-relaxed">
                Exacting standards in every drop, every detail.
              </p>
            </motion.div>

            {/* Value 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col p-6 text-left md:pl-8"
            >
              <span className="text-label-caps text-warm-gold/60 font-semibold mb-4 block">05</span>
              <h3 className="text-xl font-display text-white mb-4">Transparency</h3>
              <p className="text-sm lg:text-body-md text-white/70 font-light leading-relaxed">
                Clear origins, honest practices, visible intent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing Quote Section */}
      <section className="w-full bg-surface py-32 md:py-44 px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-4xl font-display italic text-earth-brown leading-relaxed"
          >
            "VANAMÉYA represents the essence of nature — authentic, pure, and thoughtfully delivered for modern global consumers."
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
