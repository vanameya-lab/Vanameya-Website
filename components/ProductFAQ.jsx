"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductFAQ() {
  const faqs = [
    {
      q: "What is Dry Ginger Coffee?",
      a: "Dry Ginger Coffee (traditionally known as Chukku Kaapi) is a heritage spiced wellness brew native to Kerala, India. It contains zero or negligible coffee beans, instead relying on a potent infusion of dry ginger (Chukku), black pepper, green cardamom, and palm jaggery. It has been enjoyed for generations to stimulate digestion, boost immunity, and bring warmth to the body."
    },
    {
      q: "Can it be consumed daily?",
      a: "Absolutely. In fact, VANAMÉYA Instant Dry Ginger Coffee is crafted specifically as an everyday lifestyle ritual. Sourced organically and blended without chemical preservatives or artificial sweeteners, it is a healthy, grounding addition to your morning or afternoon wellness routine."
    },
    {
      q: "When should I drink it?",
      a: "You can enjoy it at any time! Because it is caffeine-free (unlike traditional coffee), it makes an excellent morning digestif, a midday energy reset at your workspace, or a soothing, warming evening cup to unwind before bed."
    },
    {
      q: "How is it prepared?",
      a: "Preparation is effortless: tear open one single-serve sachet, pour it into a cup, add 150ml of steaming hot water, and stir gently. There's no need for boiling, filtering, or adding external sweeteners, as pure palm jaggery is already perfectly proportioned in the mix."
    },
    {
      q: "What is the storage information?",
      a: "To preserve the biological potency and aroma of the spices, store the box in a cool, dry place away from direct sunlight. Each sachet is individually air-tight sealed to ensure a fresh, luxury experience every time you open one."
    }
  ];

  return (
    <section className="w-full bg-background section-pad-lg px-6 text-primary-text relative z-20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Learn More</span>
          <h2 className="type-display-lg text-accent font-semibold">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} q={faq.q} a={faq.a} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ q, a, idx }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 text-primary-text hover:text-accent transition-colors focus:outline-none group cursor-pointer"
      >
        <span className="text-lg md:text-xl font-medium pr-8">{q}</span>
        <span className={`text-2xl text-accent transform transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-primary-text/70 font-light leading-relaxed pt-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
