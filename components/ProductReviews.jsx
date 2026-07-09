"use client";
import { motion } from "framer-motion";

export default function ProductReviews() {
  const reviews = [
    {
      name: "Priya K.",
      role: "Verified Buyer",
      stars: 5,
      quote: "The depth of flavor is incredible. The warm heat of ginger is perfectly balanced by the unrefined sweet of palm jaggery. It has completely replaced my afternoon sugary latte ritual."
    },
    {
      name: "Marc D.",
      role: "Verified Buyer",
      stars: 5,
      quote: "It feels like a luxury spa ritual in a cup. Having instant access to clean, Ayurvedic ingredients at work is a game-changer. I feel focused and my digestion feels incredibly settled."
    },
    {
      name: "Rohan M.",
      role: "Verified Buyer",
      stars: 5,
      quote: "The convenience of these sachets is unmatched. I travel frequently and always have a few in my bag. It's the most comforting and grounding drink during long flight transfers."
    }
  ];

  return (
    <section className="w-full bg-surface section-pad-lg px-6 border-t border-border relative z-20">
      <div className="max-w-container-max mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="type-label text-accent mb-4 tracking-[0.2em] block uppercase">Reviews</span>
          <h2 className="type-display-lg text-primary-text mb-6">Verified Customer Experiences</h2>
          <p className="type-body-lg text-secondary-text font-light max-w-xl mx-auto">
            Discover what our global community of wellness practitioners and slow-luxury enthusiasts are saying.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl border border-border/5 shadow-sm flex flex-col justify-between text-left relative"
            >
              {/* Decorative quotation icon */}
              <span className="absolute top-6 right-8 text-6xl text-accent/10 font-serif pointer-events-none">“</span>
              
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(rev.stars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm lg:type-body text-secondary-text leading-relaxed font-light mb-8 italic">
                  "{rev.quote}"
                </blockquote>
              </div>

              <div className="border-t border-border pt-4 mt-auto">
                <span className="text-base font-semibold text-primary-text block">{rev.name}</span>
                <span className="type-caption text-accent uppercase tracking-widest font-semibold">{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
