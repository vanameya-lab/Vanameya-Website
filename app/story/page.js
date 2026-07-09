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
          <div className="absolute inset-0 bg-gradient-to-b from-[#111414]/70 via-[#111414]/30 to-[#f8faf9]/50 z-10" />
          <div className="absolute inset-0 bg-background/25 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-primary-text mt-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="type-label text-accent mb-6 tracking-[0.25em] font-semibold">
              Our Story
            </span>
            <h1 className="type-display-lg text-primary-text mb-6 leading-[1.1] max-w-4xl tracking-tight">
              The Refined Essence <br className="hidden md:inline"/> of Nature
            </h1>
            <p className="type-body-lg text-primary-text/90 max-w-2xl font-light tracking-wide">
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
              <blockquote className="text-3xl md:text-5xl text-primary-text italic leading-tight text-left border-l border-accent/30 pl-6 md:pl-8">
                "Nature doesn't need improvement — it needs preservation."
              </blockquote>
            </motion.div>

            {/* Paragraphs Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 type-body-lg text-secondary-text leading-relaxed text-left font-light"
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



      {/* Core Philosophy / Values Section */}
      <section className="w-full bg-background py-28 md:py-36 px-6 text-primary-text border-t border-border relative z-20">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="type-label text-accent mb-4 tracking-[0.2em] block">
              Core Philosophy
            </span>
            <h2 className="type-h1 text-accent font-semibold">
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
              className="flex flex-col p-6 md:border-r md:border-border md:last:border-r-0 md:pr-8 text-left"
            >
              <span className="type-label text-accent/60 font-semibold mb-4 block">01</span>
              <h3 className="text-xl text-primary-text mb-4">Authenticity</h3>
              <p className="text-sm lg:type-body text-primary-text/70 font-light leading-relaxed">
                Unyielding dedication to traditional sourcing and formulation.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col p-6 md:border-r md:border-border md:last:border-r-0 md:px-8 text-left"
            >
              <span className="type-label text-accent/60 font-semibold mb-4 block">02</span>
              <h3 className="text-xl text-primary-text mb-4">Purity</h3>
              <p className="text-sm lg:type-body text-primary-text/70 font-light leading-relaxed">
                Minimal intervention, maximum botanical integrity.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col p-6 md:border-r md:border-border md:last:border-r-0 md:px-8 text-left"
            >
              <span className="type-label text-accent/60 font-semibold mb-4 block">03</span>
              <h3 className="text-xl text-primary-text mb-4">Responsibility</h3>
              <p className="text-sm lg:type-body text-primary-text/70 font-light leading-relaxed">
                Stewards of the land, protecting what we harvest.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col p-6 md:border-r md:border-border md:last:border-r-0 md:px-8 text-left"
            >
              <span className="type-label text-accent/60 font-semibold mb-4 block">04</span>
              <h3 className="text-xl text-primary-text mb-4">Quality</h3>
              <p className="text-sm lg:type-body text-primary-text/70 font-light leading-relaxed">
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
              <span className="type-label text-accent/60 font-semibold mb-4 block">05</span>
              <h3 className="text-xl text-primary-text mb-4">Transparency</h3>
              <p className="text-sm lg:type-body text-primary-text/70 font-light leading-relaxed">
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
            className="text-2xl md:text-4xl italic text-secondary-text leading-relaxed"
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
