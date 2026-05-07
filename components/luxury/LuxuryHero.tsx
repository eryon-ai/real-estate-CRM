"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CTAButtons from "./CTAButtons";
import FloatingStats from "./FloatingStats";

export default function LuxuryHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1500" 
          alt="Luxury Estate"
          fill
          className="w-full h-full object-cover scale-105"
          priority
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-amber-500 font-light tracking-[0.3em] uppercase text-xs mb-6">
            Bespoke Architectural Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-medium text-white mb-8 tracking-tight leading-[1.1]">
            The Art of <br />
            <span className="italic font-light">Elevated Living</span>
          </h1>
          <p className="text-white/60 font-light text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Curated private estates and architectural masterpieces designed for those who demand the extraordinary.
          </p>
          
          <CTAButtons />
        </motion.div>
      </div>

      <FloatingStats />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
