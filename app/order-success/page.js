import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getOrder } from "@/services/order.service";
import ConfettiEffect from "@/components/ConfettiEffect";

export default async function OrderSuccessPage({ searchParams }) {
  const orderNumber = (await searchParams).order;

  // Wait for the query string promise
  if (!orderNumber) {
    return (
      <main className="w-full min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-32">
          <p>Order not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const { data: order, error } = await getOrder(orderNumber, "order_number");

  if (error || !order) {
    return (
      <main className="w-full min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-32">
          <p>Could not load order details.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-background">
      <Header />
      
      <ConfettiEffect />

      <section className="flex-1 pt-32 pb-24 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Success Animation Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" />
        
        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="w-24 h-24 bg-accent/10 border border-accent rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-accent/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-text mb-4">
            Order Confirmed
          </h1>
          <p className="text-lg text-secondary-text mb-2">
            Thank you, {order.customers?.full_name?.split(' ')[0]}.
          </p>
          <p className="text-accent text-sm uppercase tracking-widest font-bold mb-10">
            Order #{order.order_number}
          </p>

          <div className="bg-surface border border-border/20 rounded-2xl p-8 mb-10 text-left shadow-xl max-w-md mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-secondary-text border-b border-border/20 pb-4 mb-4">
              Order Details
            </h2>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/5 border border-border/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-text">{order.products?.name}</p>
                  <p className="text-xs text-secondary-text">Qty: {order.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-primary-text">₹{order.total}</p>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 flex gap-3 mt-6">
              <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-accent">Estimated Processing Time</p>
                <p className="text-xs text-accent/80">Your order will be shipped within 24-48 hours.</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-secondary-text/80 italic mb-8">
            "Thank you for preserving the tradition."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/api/invoice/${order.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest type-label rounded-xl hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download Invoice
            </a>
            <Link href="/shop-now" className="px-8 py-4 bg-transparent border-2 border-accent text-accent font-bold uppercase tracking-widest type-label rounded-xl hover:bg-accent/10 transition-colors flex items-center justify-center">
              Continue Shopping
            </Link>
            <a 
              href={`https://wa.me/919495965955?text=${encodeURIComponent(`Hi Vanaméya team, I just placed an order (${order.order_number}). Could you provide an update?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366]/10 border-2 border-[#25D366] text-[#25D366] font-bold uppercase tracking-widest type-label rounded-xl hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.779 1.218h.004c5.506 0 9.989-4.478 9.99-9.984a9.965 9.965 0 00-9.994-9.9868zm6.543 14.102c-.287.808-1.42 1.484-1.954 1.543-.473.053-.949.19-2.999-.619-2.624-1.037-4.305-3.693-4.437-3.867-.13-.176-1.066-1.416-1.066-2.701 0-1.285.672-1.916.912-2.18.24-.263.522-.329.696-.329.174 0 .348.001.5.01.162.008.38-.06.594.46.22.535.75 1.825.815 1.957.065.13.109.283.022.46-.087.175-.13.282-.26.435-.13.152-.271.34-.388.457-.13.13-.266.272-.114.533.152.26.678 1.116 1.455 1.808.999.89 1.839 1.166 2.099 1.296.26.13.413.109.565-.065.152-.175.652-.76.826-1.021.174-.26.348-.217.587-.13.24.087 1.522.717 1.782.847.26.13.435.195.5.304.065.109.065.63-.222 1.438z" /></svg>
              Contact Support
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
