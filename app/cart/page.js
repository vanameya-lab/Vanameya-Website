"use client";
import { useCart } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, isInitialized } = useCart();
  
  const shippingThreshold = 500;
  const shippingCharge = 50;
  
  const requiresShipping = cartSubtotal < shippingThreshold && cartSubtotal > 0;
  const shippingCost = requiresShipping ? shippingCharge : 0;
  const total = cartSubtotal + shippingCost;

  if (!isInitialized) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-background">
      <Header />
      
      <section className="flex-1 pt-32 pb-24 px-4 md:px-8 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-text mb-12">Your Bag</h1>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-y border-border/20">
            <svg className="w-24 h-24 text-accent/50 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-2xl font-semibold text-primary-text mb-2">Your bag is empty.</p>
            <p className="text-secondary-text mb-8">Let's find something to elevate your ritual.</p>
            <Link href="/shop-now" className="bg-accent text-background type-label font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-accent-hover transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 pb-4 border-b border-border/30 text-xs text-secondary-text uppercase tracking-widest font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              {cart.map((item, index) => (
                <motion.div 
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-border/20"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex gap-6">
                    <div className="w-28 h-28 relative bg-black/20 rounded-xl overflow-hidden shrink-0 border border-border/20">
                      <Image 
                        src="/products/dry-ginger-coffee/pack.png" 
                        alt={item.product.name} 
                        fill 
                        sizes="(max-width: 768px) 112px, 112px"
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-primary-text mb-1">{item.product.name}</h3>
                      <p className="text-xs text-secondary-text mb-4">
                        10 Sachets / Box • {item.type === 'subscribe' ? 'Monthly' : 'One-time'}
                      </p>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-xs text-secondary-text underline hover:text-error transition-colors text-left self-start mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-3 flex md:justify-center items-center">
                    <div className="flex items-center border border-border/40 rounded-xl bg-white/5 h-12 w-32">
                      <button 
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="flex-1 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors rounded-l-xl"
                      >-</button>
                      <span className="w-10 text-center text-base font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="flex-1 h-full flex items-center justify-center text-primary-text hover:bg-white/10 transition-colors rounded-r-xl"
                      >+</button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-3 flex md:justify-end items-center">
                    <span className="text-xl font-semibold text-primary-text">₹{item.price * item.quantity}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Order Summary Summary Panel */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-surface-elevated border border-border/20 rounded-2xl p-6 lg:p-8 shadow-xl">
                <h2 className="text-2xl font-heading font-semibold text-primary-text mb-6">Order Summary</h2>
                
                <div className="flex flex-col gap-4 text-base mb-6">
                  <div className="flex justify-between items-center text-secondary-text">
                    <span>Subtotal</span>
                    <span className="text-primary-text font-medium">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-secondary-text">
                    <span>Shipping</span>
                    <span className="text-primary-text font-medium">
                      {requiresShipping ? `₹${shippingCharge}` : "Free"}
                    </span>
                  </div>
                  {requiresShipping && (
                    <div className="text-xs text-accent bg-accent/10 p-3 rounded-lg mt-1 border border-accent/20">
                      Add ₹{shippingThreshold - cartSubtotal} more for free shipping!
                    </div>
                  )}
                </div>
                
                <div className="pt-6 border-t border-border/20 mb-8 flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-primary-text">Total</span>
                  <span className="text-3xl font-semibold text-primary-text">₹{total}</span>
                </div>
                
                <Link
                  href="/checkout"
                  className="w-full block text-center py-4 bg-accent text-background type-label font-bold tracking-widest uppercase rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm text-secondary-text">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Secure checkout powered by Razorpay
                  </div>
                  <div className="flex items-center gap-3 text-sm text-secondary-text">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Free shipping on orders above ₹{shippingThreshold}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      
      <Footer />
    </main>
  );
}
