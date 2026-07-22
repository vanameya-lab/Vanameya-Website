"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItemCount, toggleCart, isInitialized } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `type-label pb-1 transition-all duration-300 ${
      isActive 
        ? "text-accent border-b border-[#c8a96b]" 
        : "text-secondary-text hover:text-accent"
    }`;
  };

  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Heritage", path: "/story" },
    { name: "Coffee", path: "/shop" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none w-full"
      >
        <div 
          className={`pointer-events-auto flex justify-between items-center transition-all duration-500 ease-out ${
            isScrolled || mobileMenuOpen
              ? "w-[calc(100%-2rem)] max-w-7xl mt-4 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl py-4 px-6 md:px-8" 
              : "w-full max-w-7xl bg-transparent border-b border-transparent py-6 px-6 md:px-8"
          }`}
        >
          <div className="text-2xl font-semibold text-accent tracking-tight relative z-[70]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>VANAMÉYA</Link>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path} 
                className={getLinkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-6 relative z-[70]">
            <Link 
              href="/shop-now" 
              className="type-label text-accent hover:opacity-80 transition-opacity cursor-pointer"
            >
              Shop Now
            </Link>
            
            <button 
              onClick={() => toggleCart()}
              className="relative text-accent hover:opacity-80 transition-opacity flex items-center p-2 -mr-2"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {isInitialized && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="md:hidden flex items-center gap-2 relative z-[70]">
            <button 
              onClick={() => toggleCart()}
              className="relative text-accent hover:opacity-80 transition-opacity p-2"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {isInitialized && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-accent hover:opacity-80 cursor-pointer p-2 -mr-2 relative"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileMenuOpen ? 'rotate-45 translate-x-[2px]' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileMenuOpen ? '-rotate-45 translate-x-[2px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col justify-center items-center px-6"
          >
            <nav className="flex flex-col items-center gap-8 text-center mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    href={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl tracking-wide ${
                      pathname === link.path ? "text-accent" : "text-primary-text"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-border w-full"
              >
                <Link 
                  href="/shop-now" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block bg-accent text-surface-elevated type-label tracking-widest uppercase py-4 px-12 rounded-full font-semibold"
                >
                  Shop Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
