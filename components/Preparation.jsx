"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Preparation() {
  return (
    <section className="w-full section-gap-lg px-6 bg-surface">
      <div className="max-w-container-max mx-auto text-center">
        <span className="type-label text-accent mb-6 block tracking-widest uppercase">Effortless Integration</span>
        <h2 className="type-display-lg text-primary-text mb-24">Ready In Seconds.</h2>
        
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-square bg-background/30 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
               <span className="type-h2 text-accent absolute top-4 left-4 md:top-8 md:left-8 z-10">01</span>
               <Image 
                 src="/products/dry-ginger-coffee/sachet.png" 
                 alt="Vanaméya Sachet" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 33vw"
                 className="object-contain p-10 md:p-14 hover:scale-110 transition-transform duration-700" 
               />
            </div>
            <h3 className="type-h2 text-primary-text mb-4">Open</h3>
            <p className="type-body text-secondary-text max-w-xs leading-relaxed">
              Tear the sachet to release the rich, aromatic blend of Kerala spices.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-square bg-background/30 rounded-full flex items-center justify-center mb-8 relative">
               <span className="type-h2 text-accent absolute top-4 left-4">02</span>
               <span className="type-label text-secondary-text/50">[ Pour Visual ]</span>
            </div>
            <h3 className="type-h2 text-primary-text mb-4">Pour</h3>
            <p className="type-body text-secondary-text max-w-xs leading-relaxed">
              Add hot water. No brewing, straining, or waiting required.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-square bg-background/30 rounded-full flex items-center justify-center mb-8 relative">
               <span className="type-h2 text-accent absolute top-4 left-4">03</span>
               <span className="type-label text-secondary-text/50">[ Enjoy Visual ]</span>
            </div>
            <h3 className="type-h2 text-primary-text mb-4">Enjoy</h3>
            <p className="type-body text-secondary-text max-w-xs leading-relaxed">
              A moment of perfect warmth, ready exactly when you need it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
