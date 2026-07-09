"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PDPPurchasePanel() {
  const [purchaseType, setPurchaseType] = useState("one-time"); // "one-time" or "subscribe"
  const [packSize, setPackSize] = useState(1); // 1, 2, or 3
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const basePrice = 129;
  const originalPrice = 149;
  const subscriptionDiscount = 0.85;

  const getPrice = (type = purchaseType, pSize = packSize, qty = quantity) => {
    let pricePerBox = type === "subscribe" ? Math.round(basePrice * subscriptionDiscount) : basePrice;
    let subtotal = pricePerBox * pSize * qty;
    if (pSize === 2) subtotal = subtotal * 0.95;
    if (pSize === 3) subtotal = subtotal * 0.93;
    return Math.round(subtotal);
  };

  const getOriginalPrice = (pSize = packSize, qty = quantity) => {
    return originalPrice * pSize * qty;
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
    const text = `Hello Vanaméya! I'd like to order:
- Instant Dry Ginger Coffee (${packSize * 10} Sachets)
- Type: ${purchaseType === "subscribe" ? "Monthly Subscription" : "One-time"}
- Quantity: ${quantity}
- Pack Size: ${packSize} Box(es)
- Total: ₹${getPrice()}
Please guide me through checkout.`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="flex flex-col text-left lg:sticky lg:top-24 w-full h-full lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pb-24 hide-scrollbar">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-accent text-primary-text px-6 py-4 rounded-xl shadow-2xl border border-border flex items-center gap-3 backdrop-blur-md w-[90%] max-w-md"
          >
            <svg className="w-5 h-5 text-accent fill-current shrink-0" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-accent type-caption font-bold tracking-wider uppercase">Best Seller</span>
          <span className="px-2 py-0.5 bg-green-900/30 border border-green-500/20 rounded text-green-400 type-caption font-bold tracking-wider uppercase">100% Natural</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-primary-text mb-2 leading-tight">Instant Dry Ginger Coffee</h1>
        <div className="flex items-center gap-3 text-sm mb-4">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <span className="text-secondary-text font-medium underline cursor-pointer hover:text-primary-text transition-colors">248 Reviews</span>
        </div>
        <p className="text-base text-secondary-text/80 font-light leading-relaxed">
          Traditional Dry Ginger Coffee refined into a luxury instant elixir. Clean, certified ingredients, small-batch blended in Kerala.
        </p>
      </div>

      {/* Pricing Section */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-semibold text-primary-text">₹{getPrice()}</span>
          <span className="text-xl text-secondary-text/50 font-light line-through">₹{getOriginalPrice()}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {purchaseType === "subscribe" && (
            <span className="px-2 py-1 bg-accent/20 border border-accent/30 rounded text-accent font-bold type-caption uppercase tracking-wider">Save 15%</span>
          )}
          {packSize === 2 && (
            <span className="px-2 py-1 bg-accent/20 border border-accent/30 rounded text-accent font-bold type-caption uppercase tracking-wider">Save 5%</span>
          )}
          {packSize === 3 && (
            <span className="px-2 py-1 bg-accent/20 border border-accent/30 rounded text-accent font-bold type-caption uppercase tracking-wider">Save 7% + Free Shipping</span>
          )}
        </div>
        <span className="text-xs text-secondary-text/60 mt-1">Inclusive of all taxes. Ships in 24 hours.</span>
      </div>

      {/* Purchase Options */}
      <div className="flex flex-col gap-3 mb-6">
        <span className="type-caption text-secondary-text font-bold uppercase tracking-wider">Purchase Option</span>
        
        <label className={`relative flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          purchaseType === "one-time" ? "border-accent bg-accent/5" : "border-border/50 hover:border-border bg-white/5"
        }`}>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${purchaseType === "one-time" ? "border-accent" : "border-border/50"}`}>
              {purchaseType === "one-time" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent" />}
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-sm sm:text-base text-primary-text font-semibold truncate">One-time purchase</span>
              <span className="text-[10px] sm:text-xs text-secondary-text/80 break-words line-clamp-2">No commitment, buy as needed</span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-semibold text-primary-text shrink-0">₹{getPrice("one-time", packSize, 1)}</span>
        </label>

        <label className={`relative flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          purchaseType === "subscribe" ? "border-accent bg-accent/5" : "border-border/50 hover:border-border bg-white/5"
        }`}>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${purchaseType === "subscribe" ? "border-accent" : "border-border/50"}`}>
              {purchaseType === "subscribe" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent" />}
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-sm sm:text-base text-primary-text font-semibold flex items-center gap-2 flex-wrap">Subscribe & Save</span>
              <span className="text-[10px] sm:text-xs text-secondary-text/80 break-words line-clamp-2">Delivered monthly, cancel anytime</span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-semibold text-primary-text shrink-0">₹{getPrice("subscribe", packSize, 1)}</span>
        </label>
      </div>

      {/* Pack Size Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="type-caption text-secondary-text font-bold uppercase tracking-wider">Pack Size</span>
          <span className="text-[10px] sm:text-xs text-accent font-semibold">{packSize * 10} Sachets Total</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { size: 1, label: "1 Box", save: "" },
            { size: 2, label: "2 Boxes", save: "Save 5%" },
            { size: 3, label: "3 Boxes", save: "Save 7%" }
          ].map((item) => (
            <button
              key={item.size}
              onClick={() => setPackSize(item.size)}
              className={`relative p-2 sm:p-3 border-2 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[50px] sm:min-h-[60px] ${
                packSize === item.size ? "border-accent bg-accent/5" : "border-border/50 hover:border-border bg-white/5"
              }`}
            >
              {item.save && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 sm:px-2 py-0.5 bg-accent text-background text-[8px] sm:text-[9px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap shadow-sm w-max max-w-[90%] truncate">
                  {item.save}
                </span>
              )}
              <span className={`block text-xs sm:text-sm font-semibold ${packSize === item.size ? "text-primary-text" : "text-secondary-text"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & CTA */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border-2 border-border/50 rounded-xl bg-white/5 h-14 shrink-0">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors rounded-l-xl"
          >-</button>
          <span className="w-8 text-center font-semibold text-primary-text">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors rounded-r-xl"
          >+</button>
        </div>
        
        <button
          onClick={handleAddToBag}
          disabled={loading}
          className="flex-1 h-14 bg-accent text-background type-label rounded-xl hover:bg-accent-hover disabled:opacity-75 transition-all duration-300 font-bold uppercase tracking-widest flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {loading ? "Adding..." : "Add to Bag"}
        </button>
      </div>

      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-14 border-2 border-accent text-accent hover:bg-accent/10 rounded-xl transition-all duration-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-8"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.779 1.218h.004c5.506 0 9.989-4.478 9.99-9.984a9.965 9.965 0 00-9.994-9.9868zm6.543 14.102c-.287.808-1.42 1.484-1.954 1.543-.473.053-.949.19-2.999-.619-2.624-1.037-4.305-3.693-4.437-3.867-.13-.176-1.066-1.416-1.066-2.701 0-1.285.672-1.916.912-2.18.24-.263.522-.329.696-.329.174 0 .348.001.5.01.162.008.38-.06.594.46.22.535.75 1.825.815 1.957.065.13.109.283.022.46-.087.175-.13.282-.26.435-.13.152-.271.34-.388.457-.13.13-.266.272-.114.533.152.26.678 1.116 1.455 1.808.999.89 1.839 1.166 2.099 1.296.26.13.413.109.565-.065.152-.175.652-.76.826-1.021.174-.26.348-.217.587-.13.24.087 1.522.717 1.782.847.26.13.435.195.5.304.065.109.065.63-.222 1.438z" /></svg>
        Order via WhatsApp
      </a>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-primary-text truncate">Free Shipping</span>
            <span className="text-[10px] sm:text-xs text-secondary-text/80 truncate">On orders over ₹500</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-primary-text truncate">Secure Payment</span>
            <span className="text-[10px] sm:text-xs text-secondary-text/80 truncate">Encrypted checkout</span>
          </div>
        </div>
      </div>

    </div>
  );
}
