"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const previewProperties = [
  {
    title: "The Glass House",
    location: "Malibu, CA",
    price: "$12,500,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Obsidian Heights",
    location: "Austin, TX",
    price: "$8,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-e32c8ec0486d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Azure Penthouse",
    location: "New York, NY",
    price: "$24,000,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function InventoryPreview() {
  return (
    <section id="inventory" className="py-32 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-amber-500 font-light tracking-widest uppercase text-xs mb-4 block">Selected Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light">Current <br /><span className="italic">Availability</span></h2>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-sm uppercase tracking-widest font-light group"
          >
            View Full Inventory 
            <div className="w-12 h-[1px] bg-white/30 group-hover:w-20 transition-all duration-500" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {previewProperties.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image 
                  src={prop.image} 
                  alt={prop.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <h3 className="text-xl font-serif font-light mb-1">{prop.title}</h3>
              <div className="flex justify-between items-center text-white/40 text-xs uppercase tracking-widest">
                <span>{prop.location}</span>
                <span className="text-white font-medium">{prop.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
