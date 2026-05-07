"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import FilterBar from "@/components/realist/FilterBar";
import PropertyCard from "@/components/realist/PropertyCard";
import { AnimatedSection } from "@/components/realist/AnimatedSection";
import { properties } from "@/lib/data";
import type { FilterState } from "@/components/realist/FilterBar";

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    status: "All", type: "All", neighborhood: "All", query: "",
  });

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.status !== "All" && p.status !== filters.status) return false;
      if (filters.neighborhood !== "All" && p.neighborhood !== filters.neighborhood) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (![p.title, p.location, p.neighborhood, p.city].some((v) => v.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="pt-36 pb-16 px-6 lg:px-10 max-w-screen-xl mx-auto relative z-10 text-center flex flex-col items-center">
        <AnimatedSection className="flex flex-col items-center">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECE7DC] border border-[#D8D1C2] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#6F6A62] uppercase">Properties</p>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]" />
          </div>
          <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-sans font-medium tracking-tight text-[#1A1A1A] max-w-[800px] leading-[1.15]">
            Find a place to live, work, or dream big — <br className="hidden md:block" />
            all in one beautiful map of possibilities.
          </h1>
        </AnimatedSection>
      </div>

      <div className="mb-12 relative z-50 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <FilterBar onFilterChange={setFilters} />
      </div>

      <div className="px-6 lg:px-10 max-w-screen-xl mx-auto mb-8">
        <motion.p key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-[#6F6A62]">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
        </motion.p>
      </div>

      <div className="px-6 lg:px-10 max-w-screen-xl mx-auto pb-28">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-32">
              <p className="text-6xl mb-6 opacity-30">🔍</p>
              <h3 className="text-2xl font-serif font-bold mb-3 text-[#6F6A62]">No properties found</h3>
              <p className="text-[#6F6A62]">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
