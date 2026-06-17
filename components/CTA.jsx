"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CTA() {
  return (
    <section id="shop" className="w-full section-gap-lg px-6 bg-surface">
      <div className="max-w-container-max mx-auto border-t border-earth-brown/10 pt-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Product Showcase Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full aspect-square bg-surface-dim/20 flex items-center justify-center rounded-lg relative overflow-hidden p-8 md:p-12"
          >
            <Image 
              src="/products/dry-ginger-coffee/Pack.png" 
              alt="Vanaméya Chukku Kaapi Pack" 
              fill 
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
            <span className="text-label-caps text-warm-gold mb-4 block tracking-widest uppercase">Begin Your Ritual</span>
            <h2 className="text-display-lg text-primary mb-6 leading-tight">
              From Kerala <br/> To Your Daily Life.
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-8 max-w-md">
              Experience the authentic taste of Vanaméya's Premium Chukku Kaapi. Delivered fresh to your door in luxury packaging.
            </p>
            
            <div className="text-headline-md text-primary mb-10">
              ₹ 850 <span className="text-body-md text-on-surface-variant line-through ml-2">₹ 950</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-10 py-5 bg-primary text-on-primary text-label-caps tracking-widest uppercase hover:bg-primary-container transition-all duration-300 w-full sm:w-auto text-center border border-primary">
                Add to Cart
              </button>
              {/* WhatsApp CTA */}
              <a href="#" className="px-10 py-5 bg-[#25D366] text-white text-label-caps tracking-widest uppercase hover:bg-[#20bd5a] transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2">
                Order via WhatsApp
              </a>
            </div>

            <ul className="space-y-3 text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="text-warm-gold">✓</span> Free express shipping across India
              </li>
              <li className="flex items-center gap-2">
                <span className="text-warm-gold">✓</span> 100% natural, no preservatives
              </li>
              <li className="flex items-center gap-2">
                <span className="text-warm-gold">✓</span> Secure Checkout
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
