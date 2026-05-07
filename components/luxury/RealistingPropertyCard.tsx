"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface PropertyProps {
  title: string;
  price: string;
  location: string;
  image: string;
  type: "FOR SALE" | "FOR RENT";
}

export default function RealistingPropertyCard({ title, price, location, image, type }: PropertyProps) {
  const tagColor = type === "FOR SALE" ? "bg-[#D9F2D0] text-[#2D5A27]" : "bg-[#FFDAB9] text-[#7A4A2A]";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6 bg-slate-200">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${tagColor}`}>
          {type}
        </div>
      </div>

      <div className="flex justify-between items-start mb-2 px-2">
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-1">{title}</h3>
          <p className="flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]/40 uppercase tracking-widest">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        </div>
        <p className="text-lg font-bold text-[#FFFFFF]">{price}</p>
      </div>
    </motion.div>
  );
}
