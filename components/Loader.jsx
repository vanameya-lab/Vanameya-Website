"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter cinematic loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-64 md:w-80 h-auto z-10"
            >
              <Image 
                src="/logo/Logo White.webp" 
                alt="Vanaméya" 
                width={400} 
                height={150} 
                priority
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </motion.div>
            
            {/* CSS Fill Loader */}
            <motion.div 
              className="mt-2 flex flex-col items-center -translate-y-4"
            >
              <div className="custom-loader-text"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div 
        className={!isLoading ? "opacity-100" : "opacity-0 h-screen overflow-hidden"} 
        style={{ transition: "opacity 1s ease-in-out" }}
      >
        {children}
      </div>
    </>
  );
}
