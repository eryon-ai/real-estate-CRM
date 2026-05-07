"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Active Listings", value: "84+" },
  { label: "Global Locations", value: "15" },
  { label: "Design Awards", value: "22" },
];

export default function FloatingStats() {
  return (
    <div className="absolute bottom-12 right-12 z-20 hidden lg:flex flex-col gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + (i * 0.2), duration: 0.8 }}
          className="flex flex-col items-end border-r border-white/20 pr-6"
        >
          <span className="text-2xl font-serif font-light text-white">{stat.value}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-light mt-1">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
