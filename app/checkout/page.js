"use client";
import { useCart } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, startTransition } from "react";
import Script from "next/script";
import { processCheckout, verifyPayment } from "./actions";

const InputField = ({ label, name, type = "text", placeholder, required, className = "", value, onChange, error, autoComplete }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      autoComplete={autoComplete}
      className={`w-full bg-white/5 border ${error ? 'border-error' : 'border-border/30'} rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent transition-colors`}
    />
    {error && <span className="text-xs text-error">{error}</span>}
  </div>
);

export default function CheckoutPage() {
  const { cart, cartSubtotal, isInitialized, clearCart } = useCart();
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(processCheckout, null);
  const [formDataState, setFormDataState] = useState({
    fullName: "", phone: "", email: "",
    addressLine1: "", addressLine2: "",
    city: "", state: "", country: "India", pincode: ""
  });
  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const shippingThreshold = 500;
  const isKerala = formDataState.state.trim().toLowerCase() === 'kerala';
  const shippingCharge = isKerala ? 50 : 70;
  const requiresShipping = cartSubtotal < shippingThreshold && cartSubtotal > 0;
  const shippingCost = requiresShipping ? shippingCharge : 0;
  const total = cartSubtotal + shippingCost;

  useEffect(() => {
    if (isInitialized && cart.length === 0) {
      router.push("/cart");
    }
  }, [isInitialized, cart, router]);

  useEffect(() => {
    if (state?.success && state.razorpayOrderId && typeof window !== "undefined") {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(state.amount * 100),
        currency: "INR",
        name: "Vanameya",
        description: `Order ${state.orderNumber}`,
        order_id: state.razorpayOrderId,
        handler: async function (response) {
          setIsVerifying(true);
          setPaymentError(null);
          try {
            const verification = await verifyPayment(null, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: state.orderId
            });

            if (verification.success) {
              clearCart();
              window.location.href = `/order-success?order=${state.orderNumber}`;
            } else {
              setPaymentError(verification.error || "Payment verification failed.");
            }
          } catch (err) {
            setPaymentError("An error occurred during verification.");
          } finally {
            setIsVerifying(false);
          }
        },
        prefill: {
          name: state.customerData?.name || "",
          email: state.customerData?.email || "",
          contact: state.customerData?.contact || ""
        },
        theme: {
          color: "#834A31" // using accent color equivalent, assuming similar
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setPaymentError(response.error.description || "Payment failed. Please try again.");
      });
      rzp.open();
    }
  }, [state, clearCart, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!formDataState.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formDataState.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formDataState.phone.replace(/\D/g,''))) newErrors.phone = "Valid 10-digit phone required";
    
    if (formDataState.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataState.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formDataState.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!formDataState.city.trim()) newErrors.city = "City is required";
    if (!formDataState.state.trim()) newErrors.state = "State is required";
    
    if (!formDataState.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formDataState.pincode.trim())) newErrors.pincode = "Valid 6-digit pincode required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleAction = (payload) => {
    if (validateForm()) {
      formAction(payload);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If cart is empty and we haven't just successfully placed an order, return blank (will redirect)
  if (cart.length === 0 && !state?.success) {
    return <div className="min-h-screen bg-background" />;
  }

  // If we are successfully redirecting, show a beautiful loading state instead of a blank screen
  if (state?.success && cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary-text font-heading text-lg">Confirming your order...</p>
      </div>
    );
  }



  return (
    <main className="w-full min-h-screen flex flex-col bg-background">
      <Header />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <section className="flex-1 pt-32 pb-24 px-4 md:px-8 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-primary-text mb-8">Checkout</h1>
        
        {state?.error && (
          <div className="mb-8 p-4 bg-error/10 border border-error/20 text-error rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{state.error}</span>
          </div>
        )}

        {paymentError && (
          <div className="mb-8 p-4 bg-error/10 border border-error/20 text-error rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{paymentError}</span>
          </div>
        )}

        <form action={handleAction} className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          <input type="hidden" name="cartData" value={JSON.stringify({ items: cart, subtotal: cartSubtotal, shippingCharge: shippingCost, total })} />

          {/* Left Column: Form */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Contact Information */}
            <div className="bg-surface border border-border/20 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pb-4 border-b border-border/20">1. Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="fullName" placeholder="John Doe" required className="md:col-span-2" value={formDataState.fullName} onChange={handleChange} error={errors.fullName} autoComplete="name" />
                <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 99999 99999" required value={formDataState.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" />
                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" value={formDataState.email} onChange={handleChange} error={errors.email} autoComplete="email" />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface border border-border/20 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pb-4 border-b border-border/20">2. Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Address Line 1" name="addressLine1" placeholder="House/Flat No., Street" required className="md:col-span-2" value={formDataState.addressLine1} onChange={handleChange} error={errors.addressLine1} autoComplete="address-line1" />
                <InputField label="Address Line 2 (Optional)" name="addressLine2" placeholder="Apartment, Suite, etc." className="md:col-span-2" value={formDataState.addressLine2} onChange={handleChange} error={errors.addressLine2} autoComplete="address-line2" />
                <InputField label="City" name="city" placeholder="City" required value={formDataState.city} onChange={handleChange} error={errors.city} autoComplete="address-level2" />
                <InputField label="State" name="state" placeholder="State" required value={formDataState.state} onChange={handleChange} error={errors.state} autoComplete="address-level1" />
                <InputField label="Pincode" name="pincode" placeholder="Pincode" required value={formDataState.pincode} onChange={handleChange} error={errors.pincode} autoComplete="postal-code" />
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Country <span className="text-error">*</span></label>
                  <input type="text" name="country" value="India" readOnly className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-3 text-secondary-text cursor-not-allowed opacity-70" />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-surface border border-border/20 p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pb-4 border-b border-border/20">3. Payment</h2>
              <div className="p-6 border border-accent/20 bg-accent/5 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-primary-text mb-1">Secure Payment with Razorpay</h3>
                  <p className="text-sm text-secondary-text">You will be redirected to Razorpay to complete your secure payment after clicking Place Order.</p>
                </div>
              </div>
            </div>

          </div>
          
          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-surface-elevated border border-border/20 rounded-2xl p-6 lg:p-8 shadow-xl">
              <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pb-4 border-b border-border/20">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto hide-scrollbar">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 relative bg-black/20 rounded-lg overflow-hidden shrink-0 border border-border/20">
                      <Image src="/products/dry-ginger-coffee/pack.png" alt={item.product.name} fill sizes="64px" className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-surface border border-border text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold z-10">{item.quantity}</span>
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-primary-text truncate">{item.product.name}</h3>
                      <p className="text-[10px] text-secondary-text">10 Sachets / Box</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-text flex items-center">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3 text-sm mb-6 pt-4 border-t border-border/20">
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
              </div>
              
              <div className="pt-6 border-t border-border/20 mb-8 flex justify-between items-baseline">
                <span className="text-base font-semibold text-primary-text">Grand Total</span>
                <span className="text-2xl font-semibold text-primary-text">₹{total}</span>
              </div>
              
              <button
                type="submit"
                disabled={isPending || isVerifying}
                className="w-full flex items-center justify-center py-4 bg-accent text-background type-label font-bold tracking-widest uppercase rounded-xl hover:bg-accent-hover transition-colors shadow-lg disabled:opacity-70"
              >
                {isVerifying ? "Verifying Payment..." : isPending ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
          
        </form>
      </section>
      
      <Footer />
    </main>
  );
}
