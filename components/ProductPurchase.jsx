"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPurchase() {
  const [purchaseType, setPurchaseType] = useState("one-time"); // "one-time" or "subscribe"
  const [packSize, setPackSize] = useState(1); // 1, 2, or 3 boxes
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const basePrice = 599; // in INR
  const usdBasePrice = 24; // in USD
  const subscriptionDiscount = 0.85; // 15% off

  const getPrice = () => {
    let price = basePrice;
    if (purchaseType === "subscribe") {
      price = Math.round(basePrice * subscriptionDiscount);
    }
    return price * packSize * quantity;
  };

  const getUsdPrice = () => {
    let price = usdBasePrice;
    if (purchaseType === "subscribe") {
      price = Math.round(usdBasePrice * subscriptionDiscount);
    }
    return price * packSize * quantity;
  };

  const handleAddToBag = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastMessage("Added to Bag! Your premium wellness ritual is reserved.");
      setTimeout(() => setToastMessage(""), 4000);
    }, 1200);
  };

  const getWhatsAppLink = () => {
    const text = `Hello Vanaméya! I would like to order:
- Instant Dry Ginger Coffee Box (${packSize * 15} Sachets)
- Purchase Option: ${purchaseType === "subscribe" ? "Monthly Subscription (15% Off)" : "One-time Purchase"}
- Quantity: ${quantity}
- Total Price: ₹${getPrice()} ($${getUsdPrice()})
Please guide me through the checkout process.`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="purchase" className="w-full bg-surface section-pad-lg px-4 md:px-6 relative z-20 border-t border-border">
      <div className="max-w-container-max mx-auto relative">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-accent text-primary-text px-6 py-4 rounded-xl shadow-2xl border border-border flex items-center gap-3 backdrop-blur-md w-[90%] md:w-auto"
            >
              <svg className="w-5 h-5 text-accent fill-current flex-shrink-0" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 w-full flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl bg-surface-elevated border border-accent/5 flex items-center justify-center p-4 md:p-6"
            >
              <Image
                src="/products/dry-ginger-coffee/Pack.png"
                alt="VANAMÉYA Instant Dry Ginger Coffee Box Packaging"
                fill
                className="object-contain p-2 md:p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
            
            {/* Elegant details line instead of crowded redundant grids */}
            <div className="mt-6 text-center lg:text-left">
              <p className="text-xs text-secondary-text/75 font-light tracking-wide flex items-center justify-center lg:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Includes 15 air-tight, single-serve wellness sachets.
              </p>
            </div>
          </div>

          {/* Right Column: Checkout Options */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="type-label text-accent mb-3 block tracking-widest uppercase">Select & Checkout</span>
            <h2 className="type-display-lg text-primary-text mb-2">Instant Dry Ginger Coffee</h2>
            <p className="type-body text-secondary-text/70 mb-6 lg:mb-8 font-light">
              Traditional Dry Ginger Coffee refined into a luxury instant elixir. Clean, certified ingredients, small-batch blended.
            </p>

            {/* Price Display */}
            <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-8">
              <span className="text-4xl md:text-5xl font-semibold text-primary-text">
                ₹{getPrice()}
              </span>
              <span className="text-lg md:text-xl text-secondary-text/60 font-light">
                / ${getUsdPrice()} USD
              </span>
              {purchaseType === "subscribe" && (
                <span className="px-2.5 py-1 bg-accent/20 border border-accent/30 rounded text-accent font-semibold type-caption uppercase tracking-wider">
                  Save 15%
                </span>
              )}
            </div>

            {/* Purchase Options Selector */}
            <div className="flex flex-col gap-3 md:gap-4 mb-8">
              <span className="type-caption text-accent font-bold uppercase tracking-wider block">Purchase Option</span>
              
              {/* Option 1: One-time */}
              <div 
                onClick={() => setPurchaseType("one-time")}
                className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  purchaseType === "one-time" 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-accent/20 bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    purchaseType === "one-time" ? "border-accent" : "border-border/20"
                  }`}>
                    {purchaseType === "one-time" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <div>
                    <span className="font-semibold text-primary-text text-sm md:text-base block">One-time purchase</span>
                    <span className="type-caption md:text-xs text-secondary-text/75 font-light">No subscription, buy as needed</span>
                  </div>
                </div>
                <span className="font-semibold text-primary-text text-sm md:text-base">₹599 / $24</span>
              </div>

              {/* Option 2: Subscription */}
              <div 
                onClick={() => setPurchaseType("subscribe")}
                className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  purchaseType === "subscribe" 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-accent/20 bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    purchaseType === "subscribe" ? "border-accent" : "border-border/20"
                  }`}>
                    {purchaseType === "subscribe" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <div>
                    <span className="font-semibold text-primary-text text-sm md:text-base block flex flex-wrap items-center gap-1 md:gap-2">
                      Subscribe & Save 15%
                    </span>
                    <span className="type-caption md:text-xs text-secondary-text/75 font-light">Delivered monthly, cancel anytime</span>
                  </div>
                </div>
                <span className="font-semibold text-primary-text text-sm md:text-base">₹509 / $20</span>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="mb-8">
              <span className="type-caption text-accent font-bold uppercase tracking-wider block mb-4">Select Pack Size</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <button
                  onClick={() => setPackSize(1)}
                  type="button"
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 font-semibold cursor-pointer ${
                    packSize === 1 
                      ? "border-accent bg-accent/5 text-primary-text" 
                      : "border-border/15 bg-white/5 text-secondary-text hover:border-accent/20"
                  }`}
                >
                  <span className="block text-lg">1 Box</span>
                  <span className="type-caption font-normal tracking-wide text-secondary-text/70 uppercase">15 Sachets</span>
                </button>
                
                <button
                  onClick={() => setPackSize(2)}
                  type="button"
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 font-semibold cursor-pointer ${
                    packSize === 2 
                      ? "border-accent bg-accent/5 text-primary-text" 
                      : "border-border/15 bg-white/5 text-secondary-text hover:border-accent/20"
                  }`}
                >
                  <span className="block text-lg">2 Boxes</span>
                  <span className="type-caption font-normal tracking-wide text-secondary-text/70 uppercase">30 Sachets</span>
                </button>

                <button
                  onClick={() => setPackSize(3)}
                  type="button"
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 font-semibold cursor-pointer relative ${
                    packSize === 3 
                      ? "border-accent bg-accent/5 text-primary-text" 
                      : "border-border/15 bg-white/5 text-secondary-text hover:border-accent/20"
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-accent rounded-full text-primary-text type-caption font-bold uppercase tracking-wider shadow-sm">
                    Best Value
                  </span>
                  <span className="block text-lg">3 Boxes</span>
                  <span className="type-caption font-normal tracking-wide text-secondary-text/70 uppercase">45 Sachets</span>
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between border-t border-border pt-8 mb-10">
              <span className="type-caption text-accent font-bold uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-border/20 rounded-xl overflow-hidden bg-white/5">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-background/30 font-semibold text-primary-text transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-6 py-2 text-primary-text font-semibold border-x border-border/15">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-background/30 font-semibold text-primary-text transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Checkout Action CTAs */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToBag}
                disabled={loading}
                className="w-full py-4 bg-accent text-primary-text type-label rounded-xl hover:bg-accent-hover disabled:opacity-75 transition-all duration-300 shadow-md text-center flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-primary-text" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 border-2 border-accent text-accent hover:bg-accent/10 type-label rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 font-semibold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.779 1.218h.004c5.506 0 9.989-4.478 9.99-9.984a9.965 9.965 0 00-9.994-9.9868zm6.543 14.102c-.287.808-1.42 1.484-1.954 1.543-.473.053-.949.19-2.999-.619-2.624-1.037-4.305-3.693-4.437-3.867-.13-.176-1.066-1.416-1.066-2.701 0-1.285.672-1.916.912-2.18.24-.263.522-.329.696-.329.174 0 .348.001.5.01.162.008.38-.06.594.46.22.535.75 1.825.815 1.957.065.13.109.283.022.46-.087.175-.13.282-.26.435-.13.152-.271.34-.388.457-.13.13-.266.272-.114.533.152.26.678 1.116 1.455 1.808.999.89 1.839 1.166 2.099 1.296.26.13.413.109.565-.065.152-.175.652-.76.826-1.021.174-.26.348-.217.587-.13.24.087 1.522.717 1.782.847.26.13.435.195.5.304.065.109.065.63-.222 1.438z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Future account/subscription indicators */}
            <div className="mt-8 pt-6 border-t border-border type-caption text-secondary-text/65 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout. Subscriptions & Account features coming soon.</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
                </svg>
                <span>Easy monthly deliveries. Cancel, pause or adjust anytime.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
