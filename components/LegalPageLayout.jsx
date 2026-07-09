"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      <Header />

      <section className="relative w-full pt-40 pb-20 px-6 min-h-screen flex flex-col items-center overflow-hidden">
        {/* Background Base */}
        <div className="absolute inset-0 z-0 bg-background" />
        
        <div className="relative z-20 max-w-4xl w-full mx-auto mt-12 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 border-b border-border pb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl text-primary-text mb-4 tracking-tight">
              {title}
            </h1>
            {lastUpdated && (
              <p className="type-label text-primary-text/50 tracking-widest text-xs">
                Last Updated: {lastUpdated}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full text-primary-text/80 font-light leading-relaxed space-y-6 
                       [&>h2]:text-2xl [&>h2]:[&>h2]:text-accent [&>h2]:mt-10 [&>h2]:mb-4 
                       [&>h3]:text-xl [&>h3]:[&>h3]:text-accent [&>h3]:mt-8 [&>h3]:mb-3
                       [&>p]:mb-4 
                       [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6
                       [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6
                       [&>a]:text-accent [&>a]:underline hover:[&>a]:text-primary-text
                       [&>strong]:text-primary-text [&>strong]:font-semibold"
          >
            {children}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
