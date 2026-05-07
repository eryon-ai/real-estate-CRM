"use client";

import { motion } from "framer-motion";

export default function RealistingHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-6xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] md:text-[10rem] font-bold leading-[0.8] tracking-tighter mb-12"
        >
          buy.<br />
          sell.<br />
          rent.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl font-medium max-w-xl mx-auto text-black/60 leading-relaxed mb-12"
        >
          Discover curated properties and architectural masterpieces that define the modern landscape.
        </motion.p>
      </div>

      {/* Floating Decorative Image Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="absolute bottom-[-10%] right-[-5%] w-[40vw] aspect-square bg-slate-300 rounded-full blur-[100px] opacity-20 pointer-events-none"
      />
    </section>
  );
}
