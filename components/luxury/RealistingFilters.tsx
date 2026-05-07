"use client";

import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

export default function RealistingFilters() {
  return (
    <div className="px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-white rounded-[32px] p-2 flex flex-col md:flex-row items-center gap-2 shadow-sm border border-black/5"
      >
        <div className="flex-1 flex flex-col md:flex-row items-center gap-2 w-full">
          <FilterItem label="Listing Type" value="For Sale" />
          <FilterItem label="Property Type" value="All Types" />
          <FilterItem label="Neighborhood" value="All Locations" />
          
          <div className="flex-1 min-w-[200px] flex items-center gap-3 px-6 py-4 bg-[#F2F0E6] rounded-[24px] border border-black/5">
            <Search className="w-4 h-4 text-[#FFFFFF]/40" />
            <input 
              type="text" 
              placeholder="Search by address or zip..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-[#FFFFFF]/30"
            />
          </div>
        </div>

        <button className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/40 hover:text-[#FFFFFF] transition-colors">
          RESET FILTERS
        </button>
      </motion.div>
    </div>
  );
}

function FilterItem({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center justify-between gap-4 px-6 py-4 bg-[#F2F0E6] rounded-[24px] border border-black/5 min-w-[180px] group">
      <div className="text-left">
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#FFFFFF]/40">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
      <ChevronDown className="w-4 h-4 text-[#FFFFFF]/40 group-hover:translate-y-0.5 transition-transform" />
    </button>
  );
}
