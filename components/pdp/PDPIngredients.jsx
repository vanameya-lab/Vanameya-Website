"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PDPIngredients() {
  const ingredients = [
    {
      name: "Dry Ginger",
      origin: "Kerala, India",
      benefit: "Digestive Fire",
      desc: "Sun-dried ginger root known for its potent digestive and anti-inflammatory properties.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/dryginger.jpeg"
    },
    {
      name: "Palm Jaggery",
      origin: "Tamil Nadu, India",
      benefit: "Natural Energy",
      desc: "Unrefined natural sweetener packed with essential minerals and iron.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/palmjaggery.jpeg"
    },
    {
      name: "Black Pepper",
      origin: "Wayanad, Kerala",
      benefit: "Bioavailability",
      desc: "Enhances nutrient absorption and adds a warming, comforting heat.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/pepper.jpeg"
    },
    {
      name: "Coffee",
      origin: "Wayanad, Kerala",
      benefit: "Sustained Focus",
      desc: "Premium, shade-grown coffee beans roasted to perfection for a rich, bold foundation.",
      img: "/products/dry-ginger-coffee/shop_now_images/ingridients/coffee.jpeg"
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-surface relative">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="type-label text-accent mb-4 tracking-widest block uppercase font-bold">The Source</span>
          <h2 className="type-display-lg text-primary-text mb-6 text-4xl md:text-5xl">Uncompromising Ingredients</h2>
          <p className="text-lg text-secondary-text font-light max-w-2xl mx-auto">
            We source our spices directly from traditional farmers in Kerala, ensuring maximum potency, purity, and ethical practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex flex-col group"
            >
              <div className="w-full aspect-square relative rounded-3xl overflow-hidden mb-6 bg-white/5 border border-border/50 group-hover:border-accent/30 transition-colors">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  // Using placeholder image fallback for now if actual images don't exist
                  onError={(e) => {
                    e.currentTarget.src = "/products/dry-ginger-coffee/herodesktopview.png";
                    e.currentTarget.className = "object-contain p-8 opacity-50";
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                  {item.origin}
                </div>
              </div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-primary-text">{item.name}</h3>
                <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-bold rounded uppercase tracking-wider shrink-0 mt-1">
                  {item.benefit}
                </span>
              </div>
              <p className="text-secondary-text font-light leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
