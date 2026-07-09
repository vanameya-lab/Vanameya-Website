"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function PDPRelatedProducts() {
  const [fbtAdded, setFbtAdded] = useState(false);

  const related = [
    { name: "Roasted Sesame Balls", price: "₹99", type: "Perfect Pairing", img: "/products/dry-ginger-coffee/herodesktopview.png" },
    { name: "Kerala Banana Chips", price: "₹149", type: "Traditional Snack", img: "/products/dry-ginger-coffee/Pack.png" },
    { name: "Spiced Jaggery Cubes", price: "₹199", type: "Sweet Addition", img: "/products/dry-ginger-coffee/sachet.png" }
  ];

  return (
    <section className="w-full py-24 px-6 bg-surface border-t border-border/50 overflow-hidden">
      <div className="max-w-container-max mx-auto">
        
        {/* Frequently Bought Together (Bundle) */}
        <div className="mb-24">
          <h2 className="type-display-lg text-primary-text mb-8">Frequently Bought Together</h2>
          <div className="p-8 rounded-3xl bg-white/5 border border-border/50 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-4 justify-center">
              {/* Product 1 */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/10 border border-border/50 overflow-hidden relative">
                <Image src="/products/dry-ginger-coffee/Pack.png" alt="Coffee" fill className="object-contain p-2" sizes="128px" />
              </div>
              <span className="text-2xl text-accent font-bold">+</span>
              {/* Product 2 */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/10 border border-border/50 overflow-hidden relative">
                <Image src="/products/dry-ginger-coffee/herodesktopview.png" alt="Sesame Balls" fill className="object-cover opacity-50" sizes="128px" />
              </div>
              <span className="text-2xl text-accent font-bold">+</span>
              {/* Product 3 */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/10 border border-border/50 overflow-hidden relative">
                <Image src="/products/dry-ginger-coffee/sachet.png" alt="Banana Chips" fill className="object-cover opacity-50" sizes="128px" />
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right shrink-0">
              <span className="text-secondary-text mb-2">Total Price:</span>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-primary-text">₹340</span>
                <span className="text-xl text-secondary-text/50 line-through">₹377</span>
              </div>
              <button 
                onClick={() => setFbtAdded(true)}
                disabled={fbtAdded}
                className="px-8 py-4 bg-accent text-background font-bold uppercase tracking-widest rounded-xl hover:bg-accent-hover transition-colors shadow-lg disabled:opacity-50"
              >
                {fbtAdded ? "Added to Bag" : "Add Bundle to Bag"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="type-display-lg text-primary-text">You May Also Like</h2>
            <div className="hidden sm:flex gap-2">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary-text hover:border-accent hover:text-accent transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary-text hover:border-accent hover:text-accent transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x">
            {related.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-64 sm:w-80 shrink-0 snap-start group"
              >
                <div className="w-full aspect-[4/5] bg-white/5 border border-border/50 rounded-2xl overflow-hidden relative mb-4">
                  <Image src={item.img} alt={item.name} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-100" sizes="320px" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur text-xs font-bold uppercase tracking-widest rounded-full text-primary-text shadow-sm">
                    {item.type}
                  </span>
                  <button className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 text-black font-bold uppercase tracking-widest text-sm rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Quick Add
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-primary-text mb-1">{item.name}</h3>
                <span className="text-secondary-text font-medium">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
