"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CTA() {
  return (
    <section id="shop" className="w-full section-gap-lg px-6 bg-surface">
      <div className="max-w-container-max mx-auto border-t border-border pt-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Product Showcase Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-square bg-background/20 flex items-center justify-center rounded-lg relative overflow-hidden p-8 md:p-12"
          >
            <Image 
              src="/products/dry-ginger-coffee/Pack.png" 
              alt="Vanaméya Dry Ginger Coffee Pack" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
            />
          </motion.div>

          {/* Conversion Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col"
          >
            <span className="type-label text-accent mb-4 block tracking-widest uppercase">Begin Your Ritual</span>
            <h2 className="type-display-lg text-primary-text mb-6 leading-tight">
              From Kerala <br/> To Your Daily Life.
            </h2>
            <p className="type-body-lg text-secondary-text mb-8 max-w-md">
              Experience the authentic taste of Vanaméya's Premium Dry Ginger Coffee. Delivered fresh to your door in luxury packaging.
            </p>
            
            <div className="type-h2 text-primary-text mb-10">
              ₹ 850 <span className="type-body text-secondary-text line-through ml-2">₹ 950</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-10 py-5 bg-accent text-surface-elevated type-label tracking-widest uppercase hover:bg-accent-hover transition-all duration-300 w-full sm:w-auto text-center border border-accent">
                Add to Cart
              </button>
              {/* WhatsApp CTA */}
              <a href="#" className="px-10 py-5 bg-[#25D366] text-primary-text type-label tracking-widest uppercase hover:bg-[#20bd5a] transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2">
                Order via WhatsApp
              </a>
            </div>

            <ul className="space-y-3 text-body-sm text-secondary-text">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Free express shipping across India
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> 100% natural, no preservatives
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Secure Checkout
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
