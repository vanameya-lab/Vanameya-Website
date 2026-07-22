"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PDPGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef(null);

  const images = [
    { src: "/products/dry-ginger-coffee/shop_now_images/1.jpeg", alt: "Premium Dry Ginger Coffee Pack" },
    { src: "/products/dry-ginger-coffee/shop_now_images/2.jpeg", alt: "Sachet and Box Details" },
    { src: "/products/dry-ginger-coffee/shop_now_images/3.jpeg", alt: "Single Serve Sachet" },
    { src: "/products/dry-ginger-coffee/shop_now_images/4.jpeg", alt: "Coffee Preparation" },
    { src: "/products/dry-ginger-coffee/shop_now_images/nutriinfo.png", alt: "Nutrition Information" },
  ];

  useEffect(() => {
    if (!isAutoPlaying || isZoomed) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        if (scrollRef.current) {
          const width = scrollRef.current.offsetWidth;
          scrollRef.current.scrollTo({ left: next * width, behavior: 'smooth' });
        }
        return next;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isZoomed, images.length]);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    scrollToMobileImage(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIdx);
    scrollToMobileImage(prevIdx);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToMobileImage = (idx) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: idx * width, behavior: 'smooth' });
    }
  };

  const handleThumbnailClick = (idx) => {
    setCurrentIndex(idx);
    scrollToMobileImage(idx);
  };

  return (
    <div 
      className="flex flex-col-reverse lg:flex-row gap-4 w-full select-none lg:sticky lg:top-24 min-w-0"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={() => setIsAutoPlaying(false)}
      onTouchEnd={() => setIsAutoPlaying(true)}
    >
      
      {/* Thumbnail Strip */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 pb-2 lg:pb-0 lg:max-h-[500px] hide-scrollbar snap-x min-w-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:h-24 shrink-0 snap-start rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              currentIndex === idx ? "border-accent" : "border-border/30 opacity-70 hover:opacity-100 hover:border-accent/50"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80px, 96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image Area */}
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white/5 border border-border group min-w-0 lg:max-h-[500px] lg:max-w-[500px]">
        
        {/* DESKTOP: Animated & Zoomable */}
        <div className="hidden lg:block w-full h-full cursor-zoom-in">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                priority={true}
                sizes="(max-width: 1024px) 100vw, 500px"
                className={`transition-all duration-300 ${isZoomed ? "object-none scale-150" : "object-cover"}`}
                style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE: CSS Scroll Snap Carousel */}
        <div 
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="flex lg:hidden w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar touch-pan-x"
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-center relative">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx <= 1}
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Desktop Only) */}
        <button 
          onClick={handlePrev}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border/50 hover:bg-background z-10"
        >
          <svg className="w-5 h-5 text-primary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border/50 hover:bg-background z-10"
        >
          <svg className="w-5 h-5 text-primary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination Dots (Mobile Only) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 z-10 pointer-events-none">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-accent/30"
              }`} 
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}
