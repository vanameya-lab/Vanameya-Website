"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      <Header />

      <section className="relative w-full pt-40 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-background" />
        
        <div className="relative z-20 max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center mt-12">
          
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col text-left text-primary-text"
          >
            <span className="type-label text-accent mb-4 tracking-[0.2em] font-semibold">
              Get in Touch
            </span>
            <h1 className="text-[42px] sm:text-5xl md:text-[56px] text-primary-text mb-6 leading-[1.1] tracking-tight">
              We'd love to <br/>hear from you
            </h1>
            <p className="type-body-lg text-primary-text/70 max-w-md font-light mb-10 leading-relaxed">
              Whether you have a question about our heritage, the Dry Ginger Coffee ritual, or just want to share your feedback.
            </p>

            <div className="space-y-6 text-primary-text/80">
              <div>
                <h4 className="type-label text-accent tracking-widest mb-2 text-sm font-semibold">Email</h4>
                <p className="type-body font-light">hello@vanameya.com</p>
              </div>
              <div>
                <h4 className="type-label text-accent tracking-widest mb-2 text-sm font-semibold">Location</h4>
                <p className="type-body font-light">Kerala, India</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-background/50 backdrop-blur-md border border-border rounded-2xl p-8 md:p-10 w-full relative z-30"
          >
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2 relative">
                <label className="type-label text-primary-text/60 tracking-widest text-xs font-semibold uppercase">Name</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-white/20 pb-2 text-primary-text outline-none focus:border-[#8ed2d5] transition-colors placeholder:text-primary-text/20"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="type-label text-primary-text/60 tracking-widest text-xs font-semibold uppercase">Email</label>
                <input 
                  type="email" 
                  className="bg-transparent border-b border-white/20 pb-2 text-primary-text outline-none focus:border-[#8ed2d5] transition-colors placeholder:text-primary-text/20"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="type-label text-primary-text/60 tracking-widest text-xs font-semibold uppercase">Message / Feedback</label>
                <textarea 
                  rows={4}
                  className="bg-transparent border-b border-white/20 pb-2 text-primary-text outline-none focus:border-[#8ed2d5] transition-colors resize-none placeholder:text-primary-text/20"
                  placeholder="How can we help?"
                />
              </div>

              <button className="mt-4 w-full bg-accent text-surface-elevated type-label tracking-widest uppercase hover:bg-accent-hover transition-all duration-300 py-4 px-8 rounded flex items-center justify-center font-semibold cursor-pointer shadow-lg shadow-black/20">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
