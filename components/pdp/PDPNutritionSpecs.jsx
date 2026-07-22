"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PDPNutritionSpecs() {
  const [activeTab, setActiveTab] = useState("nutrition"); // "nutrition" or "specs"

  const nutritionData = [
    { label: "Calories", value: "12 kcal" },
    { label: "Total Fat", value: "0g" },
    { label: "Sodium", value: "2mg" },
    { label: "Total Carbohydrate", value: "3g" },
    { label: "Dietary Fiber", value: "0g" },
    { label: "Total Sugars", value: "2.5g (from Palm Jaggery)" },
    { label: "Protein", value: "0g" },
  ];

  const specsData = [
    { label: "Net Weight", value: "100g (10 sachets x 10g)" },
    { label: "Package Type", value: "Premium Box with single-serve foil sachets" },
    { label: "Storage", value: "Store in a cool, dry place. Do not refrigerate." },
    { label: "Shelf Life", value: "12 Months from date of manufacture" },
    { label: "Origin", value: "Kerala, India" },
    { label: "Category", value: "Wellness Beverage / Instant Coffee" },
    { label: "FSSAI License", value: "11326009000235" },
  ];

  return (
    <section className="w-full py-20 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-border/50 mb-8">
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 py-4 text-center font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${
              activeTab === "nutrition" ? "border-accent text-primary-text" : "border-transparent text-secondary-text hover:text-primary-text"
            }`}
          >
            Nutrition Facts
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`flex-1 py-4 text-center font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${
              activeTab === "specs" ? "border-accent text-primary-text" : "border-transparent text-secondary-text hover:text-primary-text"
            }`}
          >
            Specifications
          </button>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "nutrition" ? (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="p-6 bg-white/5 border border-border/50 rounded-2xl">
                  <div className="flex justify-between items-end border-b-4 border-primary-text pb-2 mb-4">
                    <h3 className="text-2xl font-bold text-primary-text">Nutrition Facts</h3>
                    <span className="text-sm text-secondary-text font-bold">1 Sachet (10g)</span>
                  </div>
                  <div className="flex flex-col gap-0">
                    {nutritionData.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-3 border-b border-border/30 last:border-0">
                        <span className="text-primary-text font-semibold">{item.label}</span>
                        <span className="text-secondary-text font-light">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t-4 border-primary-text text-xs text-secondary-text font-light leading-relaxed">
                    * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                    Ingredients: Dry Ginger, Palm Jaggery, Black Pepper, Tulsi, Cardamom.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="p-6 bg-white/5 border border-border/50 rounded-2xl">
                  <div className="flex flex-col gap-0">
                    {specsData.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-border/30 last:border-0 gap-1 sm:gap-4">
                        <span className="text-primary-text font-semibold w-1/3 shrink-0">{item.label}</span>
                        <span className="text-secondary-text font-light sm:text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
