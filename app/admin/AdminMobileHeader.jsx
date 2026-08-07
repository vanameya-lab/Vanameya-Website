"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminMobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Fulfillment Queue", path: "/admin/fulfillment" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Products", path: "/admin/products" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      <header className="md:hidden bg-surface border-b border-border/20 p-4 flex items-center justify-between shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 -ml-1 text-primary-text hover:text-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link href="/admin" className="text-lg font-heading font-semibold text-accent">
            VANAMÉYA Admin
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <LogoutButton />
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border/20 absolute top-[65px] left-0 right-0 z-50 print:hidden shadow-xl">
          <nav className="p-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-semibold hover:bg-accent/10 hover:text-accent transition-colors text-primary-text"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border/20 flex flex-col gap-3 px-4">
              <Link href="/" className="text-sm text-accent underline flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Go to Storefront
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
