"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/realist/Navbar";
import { ease } from "@/lib/animations";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F1E8] flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#D4B06A]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: ease.apple }}
        >
          <h1 className="text-[20vw] md:text-[15rem] font-serif font-bold leading-none tracking-tighter text-[#1A1A1A]/5 mb-4 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-10">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-4">
              Page Not Found
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-6">
              Lost in <span className="italic text-[#D4B06A]">Space</span>
            </h2>
            <p className="text-[#6F6A62] max-w-md mx-auto mb-10 text-sm">
              The property or page you are looking for has been sold, removed, or does not exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              RETURN HOME
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
