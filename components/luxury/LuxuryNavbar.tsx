"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function LuxuryNavbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
          <span className="text-black font-serif font-bold text-xl leading-none">E</span>
        </div>
        <span className="font-serif text-2xl font-semibold tracking-wider text-white">ERYON</span>
      </div>

      <div className="hidden md:flex items-center gap-10 font-light text-sm tracking-widest uppercase text-white/80">
        <Link href="#inventory" className="hover:text-white transition-colors">Inventory</Link>
        <Link href="#locations" className="hover:text-white transition-colors">Locations</Link>
        <Link href="#admin" className="hover:text-white transition-colors">Dashboard</Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="#admin" className="hidden md:block text-sm uppercase tracking-widest font-light border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300">
          Access CRM
        </Link>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
    </motion.nav>
  );
}
