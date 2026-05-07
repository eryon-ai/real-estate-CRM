"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative px-10 py-5 bg-white text-[#FFFFFF] font-medium text-sm uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-white/10"
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>
      
      <motion.button
        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        className="px-10 py-5 border border-white/20 text-[#1A1A1A] font-medium text-sm uppercase tracking-widest backdrop-blur-sm transition-all"
      >
        Private Inquiry
      </motion.button>
    </div>
  );
}
