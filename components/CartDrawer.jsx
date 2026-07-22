"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, cartSubtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-elevated z-[90] shadow-2xl flex flex-col border-l border-border/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <h2 className="text-xl font-heading font-semibold text-primary-text">Your Cart</h2>
              <button
                onClick={() => toggleCart(false)}
                className="p-2 text-secondary-text hover:text-accent transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <svg className="w-16 h-16 text-accent mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-lg text-secondary-text">Your cart is empty.</p>
                  <Link
                    href="/shop-now"
                    onClick={() => toggleCart(false)}
                    className="text-accent underline font-semibold type-label inline-block mt-2 cursor-pointer hover:text-accent-hover transition-colors"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-border/10 bg-white/5 relative group">
                    <button
                      onClick={() => removeFromCart(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-surface border border-border/30 rounded-full flex items-center justify-center text-secondary-text hover:text-error hover:border-error transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="w-24 h-24 relative bg-black/20 rounded-lg overflow-hidden shrink-0 border border-border/20">
                      <Image 
                        src={item.product.image || "/products/dry-ginger-coffee/pack.png"} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="text-base font-semibold text-primary-text mb-1">{item.product.name}</h3>
                      <p className="text-xs text-secondary-text mb-2">
                        10 Sachets / Box • {item.type === 'subscribe' ? 'Subscription' : 'One-time'}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border/40 rounded-lg bg-black/20 h-8">
                          <button 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-2 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors"
                          >-</button>
                          <span className="w-6 text-center text-sm font-semibold text-primary-text">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-2 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors"
                          >+</button>
                        </div>
                        <span className="font-semibold text-primary-text">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border/20 bg-surface">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-secondary-text">Subtotal</span>
                  <span className="text-xl font-semibold text-primary-text">₹{cartSubtotal}</span>
                </div>
                
                <Link
                  href="/cart"
                  onClick={() => toggleCart(false)}
                  className="w-full flex items-center justify-center py-4 bg-transparent border-2 border-accent text-accent font-bold tracking-widest uppercase rounded-xl mb-3 hover:bg-accent/10 transition-colors"
                >
                  View Cart
                </Link>
                
                <Link
                  href="/checkout"
                  onClick={() => toggleCart(false)}
                  className="w-full flex items-center justify-center py-4 bg-accent text-background font-bold tracking-widest uppercase rounded-xl hover:bg-accent-hover shadow-lg transition-all"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
