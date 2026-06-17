"use client";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-ink-black text-on-primary/60 border-t border-on-primary/10">
      <div className="max-w-container-max mx-auto grid md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
          <div className="mb-6">
            <Image src="/logo/Logo White.webp" alt="VANAMÉYA" width={200} height={50} className="object-contain h-8 w-auto opacity-90" />
          </div>
          <p className="text-body-md max-w-sm">
            Modern Luxury Heritage from the heart of Kerala.
          </p>
        </div>
        <div>
          <h4 className="text-label-caps text-on-primary mb-4">Explore</h4>
          <ul className="space-y-2 text-body-md">
            <li><Link href="/shop" className="hover:text-warm-gold transition-colors">Shop</Link></li>
            <li><Link href="/story" className="hover:text-warm-gold transition-colors">Our Story</Link></li>
            <li><Link href="/journal" className="hover:text-warm-gold transition-colors">Journal</Link></li>
            <li><Link href="/collections" className="hover:text-warm-gold transition-colors">Collections</Link></li>
            <li><Link href="/wholesale" className="hover:text-warm-gold transition-colors">Wholesale</Link></li>
            <li><Link href="/account" className="hover:text-warm-gold transition-colors">Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-label-caps text-on-primary mb-4">Connect</h4>
          <ul className="space-y-2 text-body-md">
            <li><a href="#" className="hover:text-warm-gold transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-warm-gold transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto pt-8 border-t border-on-primary/10 flex flex-col md:flex-row justify-between items-center text-label-caps text-[10px]">
        <p>&copy; {new Date().getFullYear()} Vanaméya. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
