"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

export default function RealistingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-1">
          <div className="w-2 h-2 bg-black rounded-full" />
          REALIST
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/explore" className="text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors">EXPLORE</Link>
          <Link href="/about" className="text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors">ABOUT</Link>
          <Link href="/journal" className="text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors">JOURNAL</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <Link href="/admin" className="text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-full hover:bg-black transition-all">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
